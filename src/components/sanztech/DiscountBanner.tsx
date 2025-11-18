'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DiscountBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsVisible(false); // Hide banner when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-gradient-to-r from-yellow-500 to-amber-400 text-black p-4 rounded-lg mb-8 shadow-2xl shadow-yellow-500/20 border-2 border-yellow-300 relative"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 h-6 w-6 text-black hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex flex-col md:flex-row items-center justify-center text-center gap-4">
            <Tag className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                CONGRATULATIONS! You Qualify for a 10% Template Discount.
              </h2>
              <p className="text-sm md:text-base font-semibold">
                Valid for the Next <span className="font-bold text-lg tabular-nums">{formatTime(timeLeft)}</span> ONLY!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
