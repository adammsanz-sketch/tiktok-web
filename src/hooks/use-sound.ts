'use client';

import { useCallback, useMemo, useEffect } from 'react';

export function useSound() {
  const clickSound = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new Audio('/sounds/success-340660.mp3');
    }
    return null;
  }, []);

  const hoverSound = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new Audio('/sounds/whoosh-bamboo-389752.mp3');
    }
    return null;
  }, []);

  useEffect(() => {
    if (clickSound) {
      clickSound.preload = 'auto';
      clickSound.load();
    }
    if (hoverSound) {
      hoverSound.preload = 'auto';
      hoverSound.load();
    }
  }, [clickSound, hoverSound]);

  const playSound = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  const playClick = useCallback(() => {
    playSound(clickSound);
  }, [playSound, clickSound]);

  const playHover = useCallback(() => {
    playSound(hoverSound);
  }, [playSound, hoverSound]);

  return { playClick, playHover };
}
