'use client';

import React, { useState } from 'react';
import { Mail, Send, FileEdit, CheckCircle2, AlertCircle, RefreshCw, KeyRound, UserCheck, Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { sendGmailMessage, createGmailDraft } from '@/lib/gmailService';

interface GmailMailerProps {
  initialRecipient?: string;
  initialSubject?: string;
  initialBody?: string;
  senderName?: string;
  onSent?: (result: any) => void;
}

export default function GmailMailer({
  initialRecipient = 'sixty60-regional@example.com',
  initialSubject = 'Pilot: Shared E-Bike Hub - Reduced Theft & Downtime for Sixty60 Fleet + Community Access',
  initialBody = '',
  senderName = 'OpenKM Mobility Working Group',
  onSent,
}: GmailMailerProps) {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(
    initialBody ||
      `Dear Sixty60 Regional Operations Manager,\n\nWe propose 1 pilot dual-use hub at Kuyasa MyCiTi Feeder / Makhaza Taxi Rank Side-Road where your riders get secure charging, hot battery swap, and safe lock-up between drops.\n\nIn return, your existing maintenance presence keeps 5 commuter e-bikes operational for MyCiTi + taxi feeder trips.\n\nSincerely,\n${senderName}`
  );

  const { user, token, isAuthenticated, isLoading: isAuthLoading, signIn, signOut } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const handleSignIn = async () => {
    setStatusMessage(null);
    try {
      await signIn();
      setStatusMessage({ type: 'success', text: 'Connected to Google Identity Services successfully.' });
    } catch (err: any) {
      console.warn('Gmail Auth Error:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to authenticate. Please allow popups and retry.',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setStatusMessage({ type: 'info', text: 'Disconnected from Google account.' });
  };

  const handleSendMessage = async () => {
    if (!token) {
      await handleSignIn();
      return;
    }
    if (!recipient.trim() || !recipient.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid recipient email address.' });
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    try {
      const res = await sendGmailMessage({
        to: recipient.trim(),
        subject: subject.trim(),
        body: body.trim(),
        senderName: senderName || user?.name,
        senderEmail: user?.email,
        token,
      });

      setStatusMessage({
        type: 'success',
        text: `Proposal email successfully dispatched via Gmail API (Message ID: ${res.id.slice(0, 10)}...)`,
      });

      if (onSent) onSent(res);
    } catch (err: any) {
      console.error('Failed to send email:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Error communicating with Gmail API. Re-authentication may be required.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCreateDraft = async () => {
    if (!token) {
      await handleSignIn();
      return;
    }

    setIsDrafting(true);
    setStatusMessage(null);

    try {
      const res = await createGmailDraft({
        to: recipient.trim(),
        subject: subject.trim(),
        body: body.trim(),
        senderName: senderName || user?.name,
        senderEmail: user?.email,
        token,
      });

      setStatusMessage({
        type: 'success',
        text: `Draft created in your Gmail account (Draft ID: ${res.id.slice(0, 10)}...)`,
      });
    } catch (err: any) {
      console.error('Failed to create draft:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to save draft in Gmail.',
      });
    } finally {
      setIsDrafting(false);
    }
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="px-5 py-4 bg-[#0a101d] text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#005C99] flex items-center justify-center text-white">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[13px] font-bold tracking-tight">Gmail API Partnership Dispatcher</div>
            <div className="text-[10px] text-[#94a3b8] font-mono">Direct RFC 2822 REST Delivery</div>
          </div>
        </div>

        {/* Auth Status & Trigger */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#065f46]/40 text-[#34d399] border border-[#059669]">
                <UserCheck className="w-3.5 h-3.5" />
                {user?.email || 'Authorized'}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-[11px] font-mono text-[#94a3b8] hover:text-white underline cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              disabled={isAuthLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isAuthLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <KeyRound className="w-3.5 h-3.5" />
              )}
              {isAuthLoading ? 'Connecting...' : 'Authorize Gmail'}
            </button>
          )}
        </div>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div
          className={`px-4 py-2.5 text-[12px] flex items-center gap-2 border-b ${
            statusMessage.type === 'success'
              ? 'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]'
              : statusMessage.type === 'error'
              ? 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]'
              : 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10b981]" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-[#ef4444]" />
          )}
          <span className="flex-1">{statusMessage.text}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-[11px] font-mono opacity-60 hover:opacity-100 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Mailer Form Body */}
      <div className="p-5 space-y-4 text-[12px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-[10px] text-[#64748b] uppercase tracking-wider mb-1">
              To (Recipient Email)
            </label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. sixty60-ops@shoprite.co.za"
              className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#1e293b] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005C99]/30"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-[#64748b] uppercase tracking-wider mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#1e293b] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005C99]/30"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="font-mono text-[10px] text-[#64748b] uppercase tracking-wider">
              Email Proposal Body (Plaintext RFC 2822)
            </label>
            <span className="text-[10px] font-mono text-[#94a3b8]">{body.length} characters</span>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg p-3 text-[#1e293b] font-mono text-[11.5px] leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005C99]/30 resize-y"
          />
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#f1f5f9]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748b]">
            <Sparkles className="w-3.5 h-3.5 text-[#005C99]" />
            <span>Transmits directly via user&apos;s authenticated Google Workspace session.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCreateDraft}
              disabled={!token || isDrafting || isSending}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155] border border-[#cbd5e1] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isDrafting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileEdit className="w-3.5 h-3.5" />}
              {isDrafting ? 'Saving...' : 'Save as Gmail Draft'}
            </button>

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!token || isSending || isDrafting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold bg-[#005C99] hover:bg-[#00487a] text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              {isSending ? 'Sending via Gmail...' : 'Send Proposal Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
