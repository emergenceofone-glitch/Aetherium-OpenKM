/**
 * Gmail Service for sending partnership letters and managing email delivery
 * Supports Base64URL-encoded RFC 2822 messages to the Gmail REST API v1.
 */

export interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
  senderName?: string;
  senderEmail?: string;
  token: string;
}

export interface GmailSendResponse {
  id: string;
  threadId: string;
  labelIds?: string[];
}

/**
 * Creates a raw RFC 2822 email format and encodes it in URL-safe base64
 */
export function buildRawEmail({
  to,
  subject,
  body,
  senderName,
  senderEmail,
}: Omit<SendEmailParams, 'token'>): string {
  const fromHeader = senderName
    ? senderEmail
      ? `${senderName} <${senderEmail}>`
      : senderName
    : senderEmail || '';

  const headers = [
    ...(fromHeader ? [`From: ${fromHeader}`] : []),
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    body,
  ].join('\r\n');

  // Base64url encode with RFC 4648 safe characters
  return btoa(unescape(encodeURIComponent(headers)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Sends an email using the user's Gmail OAuth access token
 */
export async function sendGmailMessage(params: SendEmailParams): Promise<GmailSendResponse> {
  const rawEmail = buildRawEmail(params);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: rawEmail,
    }),
  });

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson.error?.message || JSON.stringify(errJson);
    } catch {
      errorDetail = await response.text();
    }
    throw new Error(`Gmail API error (${response.status}): ${errorDetail || response.statusText}`);
  }

  return response.json();
}

/**
 * Creates a draft in the user's Gmail account
 */
export async function createGmailDraft(params: SendEmailParams): Promise<{ id: string; message: any }> {
  const rawEmail = buildRawEmail(params);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        raw: rawEmail,
      },
    }),
  });

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson.error?.message || JSON.stringify(errJson);
    } catch {
      errorDetail = await response.text();
    }
    throw new Error(`Gmail Draft error (${response.status}): ${errorDetail || response.statusText}`);
  }

  return response.json();
}
