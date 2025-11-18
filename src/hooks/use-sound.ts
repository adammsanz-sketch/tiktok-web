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
    // Assuming you will add a click sound file at this path
    // playSound('/sounds/click.mp3');
  }, []);

  const playHover = useCallback(() => {
    // Assuming you will add a hover sound file at this path
    // playSound('/sounds/hover.mp3');
  }, []);

  return { playClick, playHover };
}
