import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  User,
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with browser local/session/memory persistence fallback to prevent iframe IndexedDB closing errors
let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: [browserLocalPersistence, browserSessionPersistence, inMemoryPersistence],
  });
} catch {
  authInstance = getAuth(app);
}

export const auth = authInstance;

const provider = new GoogleAuthProvider();
provider.addScope('https://mail.google.com/');
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/gmail.compose');
provider.addScope('https://www.googleapis.com/auth/gmail.modify');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User | null, token: string) => void,
  onAuthFailure?: () => void
) => {
  try {
    return onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        if (cachedAccessToken) {
          if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
        } else if (!isSigningIn) {
          if (onAuthFailure) onAuthFailure();
        }
      } else if (!cachedAccessToken) {
        if (onAuthFailure) onAuthFailure();
      }
    });
  } catch (err) {
    console.warn('onAuthStateChanged init warning:', err);
    return () => {};
  }
};

export const googleSignIn = async (): Promise<{ user?: User | null; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth credential');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.warn('Firebase signInWithPopup issue, attempting Google Identity Services fallback:', error);

    // Fallback: Use Google Identity Services (GSI) initTokenClient if available in iframe
    if (typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2) {
      const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
      if (clientId) {
        return new Promise((resolve, reject) => {
          try {
            const client = (window as any).google.accounts.oauth2.initTokenClient({
              client_id: clientId,
              scope: 'https://mail.google.com/ https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify',
              callback: (response: any) => {
                if (response.error !== undefined) {
                  reject(new Error(response.error_description || response.error || 'GSI Authentication failed'));
                  return;
                }
                cachedAccessToken = response.access_token;
                resolve({ user: null, accessToken: response.access_token });
              },
            });
            client.requestAccessToken();
          } catch (gsiErr) {
            reject(error);
          }
        });
      }
    }

    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    console.warn('Sign out warning:', e);
  }
  cachedAccessToken = null;
};
