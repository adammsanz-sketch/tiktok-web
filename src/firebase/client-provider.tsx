'use client';

import React, { useMemo, useEffect, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const originalError = console.error;
    const originalWarn = console.warn;
    const patterns = [
      'googleapis.com',
      '/_rsc',
      'Listen/channel',
      'ERR_ABORTED',
    ];
    console.error = (...args: any[]) => {
      const s = String(args?.[0] ?? '');
      if (patterns.some(p => s.includes(p))) return;
      originalError(...args);
    };
    console.warn = (...args: any[]) => {
      const s = String(args?.[0] ?? '');
      if (patterns.some(p => s.includes(p))) return;
      originalWarn(...args);
    };
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}