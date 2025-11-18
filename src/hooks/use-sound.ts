'use client';

import { useCallback } from 'react';

export function useSound() {
  const playSound = useCallback((src: string) => {
    try {
      const audio = new Audio(src);
      audio.play();
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  }, []);

  const playClick = useCallback(() => {
    playSound('https://storage.googleapis.com/monorepo-source-images/d8c55a5b-010f-4886-b4d2-f67f2b1d5a7b_original.wav');
  }, [playSound]);

  const playHover = useCallback(() => {
    // Assuming you will add a hover sound file at this path
    // playSound('/sounds/hover.mp3');
  }, []);

  return { playClick, playHover };
}
