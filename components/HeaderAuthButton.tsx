'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Loader2, User } from 'lucide-react';

export default function HeaderAuthButton() {
  const { user, isAuthenticated, isLoading, signIn, signOut, error } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e7eb] bg-white text-[11px] font-mono text-[#6b7280]">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#005C99]" />
        <span className="hidden sm:inline">Connecting...</span>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        {/* User Badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-[#bfdbfe] bg-[#f0f9ff] text-[11px] font-medium text-[#0369a1] shadow-2xs">
          {user.picture ? (
            <Image
              src={user.picture}
              alt={user.name || 'User profile'}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover border border-[#93c5fd]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-[#005C99] text-white flex items-center justify-center text-[10px] font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
            </div>
          )}
          <span className="hidden sm:inline font-mono font-medium max-w-[120px] truncate text-[#0f172a]">
            {user.name || user.email?.split('@')[0]}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" title="Active Google Session"></span>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={() => signOut()}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f8fafc] text-[#475569] hover:text-[#0f172a] text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
          title="Sign out of Google Identity Services"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {error && (
        <span className="hidden lg:inline-block text-[10px] text-[#dc2626] font-mono bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca] max-w-[160px] truncate" title={error}>
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={() => signIn()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005C99] hover:bg-[#00487a] text-white text-[11px] font-semibold transition-all shadow-xs cursor-pointer active:scale-[0.98]"
        title="Sign in with Google Identity Services"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Sign In</span>
      </button>
    </div>
  );
}
