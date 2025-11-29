'use client';

import { useCallback, useMemo, useEffect } from 'react';

export function useSound() {
  const clickSound = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const probe = new Audio();
    const candidates = [
      { type: 'audio/mpeg', src: '/sounds/success-340660.mp3' },
      { type: 'audio/wav', src: '/sounds/mixkit-fast-double-click-on-mouse-275.wav' },
    ];
    const src = candidates.find(c => probe.canPlayType(c.type))?.src ?? candidates[0].src;
    return new Audio(src);
  }, []);

  const hoverSound = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const probe = new Audio();
    const candidates = [
      { type: 'audio/mpeg', src: '/sounds/whoosh-bamboo-389752.mp3' },
      { type: 'audio/wav', src: '/sounds/mixkit-fast-double-click-on-mouse-275.wav' },
    ];
    const src = candidates.find(c => probe.canPlayType(c.type))?.src ?? candidates[0].src;
    return new Audio(src);
  }, []);

  const successSound = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const probe = new Audio();
    const candidates = [
      { type: 'audio/mpeg', src: '/sounds/success-340660.mp3' },
      { type: 'audio/wav', src: '/sounds/mixkit-fast-double-click-on-mouse-275.wav' },
    ];
    const src = candidates.find(c => probe.canPlayType(c.type))?.src ?? candidates[0].src;
    return new Audio(src);
  }, []);

  const errorSound = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const probe = new Audio();
    const candidates = [
      { type: 'audio/mpeg', src: '/sounds/error-126627.mp3' },
      { type: 'audio/wav', src: '/sounds/mixkit-fast-double-click-on-mouse-275.wav' },
    ];
    const src = candidates.find(c => probe.canPlayType(c.type))?.src ?? candidates[0].src;
    return new Audio(src);
  }, []);

  // Do not preload to avoid network noise in dev when files are absent

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

  const playSuccess = useCallback(() => {
    playSound(successSound);
  }, [playSound, successSound]);

  const playError = useCallback(() => {
    playSound(errorSound);
  }, [playSound, errorSound]);

  return { playClick, playHover, playSuccess, playError };
}
