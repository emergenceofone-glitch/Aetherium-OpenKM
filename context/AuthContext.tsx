'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { googleSignIn, logout as firebaseLogout, initAuth } from '@/lib/firebase';

export interface UserProfile {
  email?: string;
  name?: string;
  picture?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GMAIL_SCOPES = [
  'email',
  'profile',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://mail.google.com/',
].join(' ');

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Google User Profile using OAuth access token
  const fetchUserInfo = async (accessToken: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser({
          email: data.email,
          name: data.name || data.given_name || data.email,
          picture: data.picture,
        });
      }
    } catch (e) {
      console.warn('Failed to fetch user profile from Google userinfo API:', e);
    }
  };

  // Check initial authentication state
  useEffect(() => {
    const unsubscribe = initAuth(
      async (firebaseUser, accessToken) => {
        if (accessToken) {
          setToken(accessToken);
          if (firebaseUser) {
            setUser({
              email: firebaseUser.email || undefined,
              name: firebaseUser.displayName || undefined,
              picture: firebaseUser.photoURL || undefined,
            });
          } else {
            await fetchUserInfo(accessToken);
          }
        }
        setIsLoading(false);
      },
      () => {
        setToken(null);
        setUser(null);
        setIsLoading(false);
      }
    );

    // Safety timeout in case auth listener doesn't fire immediately
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const signIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;

    // Prefer Google Identity Services (GSI) initTokenClient if client_id is present
    if (typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2 && clientId) {
      return new Promise<void>((resolve, reject) => {
        try {
          const client = (window as any).google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: GMAIL_SCOPES,
            callback: async (response: any) => {
              if (response.error !== undefined) {
                const errMsg = response.error_description || response.error || 'Authentication canceled or failed';
                setError(errMsg);
                setIsLoading(false);
                reject(new Error(errMsg));
                return;
              }

              const accessToken = response.access_token;
              setToken(accessToken);
              await fetchUserInfo(accessToken);
              setIsLoading(false);
              resolve();
            },
            error_callback: (err: any) => {
              const errMsg = err?.message || 'Google Identity Services prompt failed';
              setError(errMsg);
              setIsLoading(false);
              reject(new Error(errMsg));
            },
          });

          client.requestAccessToken({ prompt: 'consent' });
        } catch (gsiErr: any) {
          console.warn('GSI invocation error, falling back to Firebase Auth:', gsiErr);
          // Fallback to Firebase Google Sign In
          googleSignIn()
            .then(async (res) => {
              if (res?.accessToken) {
                setToken(res.accessToken);
                if (res.user) {
                  setUser({
                    email: res.user.email || undefined,
                    name: res.user.displayName || undefined,
                    picture: res.user.photoURL || undefined,
                  });
                } else {
                  await fetchUserInfo(res.accessToken);
                }
              }
              setIsLoading(false);
              resolve();
            })
            .catch((err: any) => {
              setError(err?.message || 'Sign in failed');
              setIsLoading(false);
              reject(err);
            });
        }
      });
    }

    // Fallback if GSI script is still loading or clientId is not yet configured
    try {
      const result = await googleSignIn();
      if (result?.accessToken) {
        setToken(result.accessToken);
        if (result.user) {
          setUser({
            email: result.user.email || undefined,
            name: result.user.displayName || undefined,
            picture: result.user.photoURL || undefined,
          });
        } else {
          await fetchUserInfo(result.accessToken);
        }
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setError(err?.message || 'Sign in encountered an error. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await firebaseLogout();
      // Revoke GSI token if available
      if (token && typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2?.revoke) {
        try {
          (window as any).google.accounts.oauth2.revoke(token, () => {
            console.log('Google token revoked');
          });
        } catch (e) {
          console.warn('Revoke warning:', e);
        }
      }
      setToken(null);
      setUser(null);
    } catch (err: any) {
      console.warn('Sign out warning:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        error,
        signIn,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
