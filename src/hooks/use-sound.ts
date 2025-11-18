'use client';

import { useCallback, useMemo } from 'react';

// The audio data is now embedded as a Base64 Data URI to prevent loading errors.
const CLICK_SOUND_DATA_URI = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18AAAAA//8CAP/+//8A/wD//P/9//3/AgAEAAH//v8GAAAA//4ABgACAP/+AAMAAwABAAAAAQAAAAEAAQAAAAEAAQAAAAIAAAD//v8CAP/+/wD//f/9//3/AgAEAAH//v8GAAAA//4ABgACAP/+AAMAAwABAAAAAQAAAAEAAQAAAAEAAQAAAAIAAAD//v8CAP/+/wD//f/9//3/AgAEAAH//v8GAAAA//4ABgACAP/+AAMAAwABAAAAAQAAAAEAAQAAAAEAAQAAAAIAAAD//v8CAP/+/wD//f/9//3/AgAEAAH//v8GAAAA//4ABgACAP/+AAMAAwABAAAAAQAAAAEAAQAAAAEAAQAAAAIAAAA=';

export function useSound() {
  // Memoize the Audio object so it's not recreated on every render
  const clickSound = useMemo(() => {
    // Check if window is defined to prevent SSR errors
    if (typeof window !== 'undefined') {
      // Use the embedded Data URI as the source for the audio
      return new Audio(CLICK_SOUND_DATA_URI);
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
