'use client';

import { useCallback, useMemo } from 'react';

export function useSound() {
  // Memoize the Audio object so it's not recreated on every render
  const clickSound = useMemo(() => {
    // Check if window is defined to prevent SSR errors
    if (typeof window !== 'undefined') {
      return new Audio('https://storage.googleapis.com/monorepo-source-images/d8c55a5b-010f-4886-b4d2-f67f2b1d5a7b_original.wav');
    }
    return null;
  }, []);

  const playSound = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      // Rewind to the start if it's already playing
      audio.currentTime = 0;
      audio.play().catch(error => {
        // Catch and log any errors that might occur during playback
        console.error('Failed to play sound:', error);
      });
    }
  }, []);

  const playClick = useCallback(() => {
    playSound(clickSound);
  }, [playSound, clickSound]);

  const playHover = useCallback(() => {
    // A hover sound can be added here in the future
  }, []);

  return { playClick, playHover };
}
