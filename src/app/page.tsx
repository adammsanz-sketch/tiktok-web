'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Video, Sparkles, Mail, Phone } from 'lucide-react';
import { useSound } from '../hooks/use-sound';

// A client component to render the moving sparkles to avoid SSR issues with window
function SparkleParticles() {
  const [isClient, setIsClient] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = navigator.maxTouchPoints > 0;
    setCount(prefersReduced ? 0 : isTouch ? 8 : 16);
  }, []);

  if (!isClient || count === 0) {
    return null;
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-500/10 rounded-full"
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
          animate={{ y: [null, Math.random() * window.innerHeight], x: [null, Math.random() * window.innerWidth] }}
          transition={{ duration: 12 + Math.random() * 12, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </>
  );
}


export default function BioLinkPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { playClick, playHover } = useSound();
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const affiliateLinks = [
    { id: 1, title: '🔥 Affiliate Hub', url: '/affiliate-hub', internal: true },
    { id: 2, title: '⚙️ Sanztech Workflow', url: '/dashboard', internal: true },
    { id: 3, title: '⚙️ Template Automation', url: '/shop', internal: true },
  ];

  const heroAvatarUrl = '/adam-profile.jpg.png';

  return (
    <div className="relative min-h-screen w-full bg-[#0a0e1a] text-white overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SparkleParticles />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-[hsl(var(--gold))]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--gold))] to-[#b8941f] flex items-center justify-center">
              <Video className="w-6 h-6 text-black" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-[hsl(var(--gold))]">sanztech</h1>
              <p className="text-[10px] text-gray-400">automation.solution</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="px-3 py-1 rounded bg-gray-800 text-sm">
              {soundEnabled ? 'Sound: ON' : 'Sound: OFF'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <section className="text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[hsl(var(--gold))] overflow-hidden mb-3">
              <Image
                src={heroAvatarUrl}
                alt="Adamsanz"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                unoptimized
                onError={(e) => { (e.target as HTMLImageElement).src = '/avatar.svg'; }}
                priority
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Adamsanz</h2>
            <p className="text-yellow-400 text-sm md:text-base">Mind Hustler of KL</p>
          </motion.div>

          <motion.p className="text-gray-300 max-w-2xl mx-auto mb-8" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            Budak KL main otak & AI, bantu orang hidup dari content, bukan sekadar survive.
          </motion.p>
          <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
            {affiliateLinks.map((link) => (
              <motion.div key={link.id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                {link.internal ? (
                  <Link
                    href={link.url}
                    className="block w-full px-6 py-4 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm border border-gray-800 hover:border-[hsl(var(--gold))] rounded-xl text-center font-semibold"
                    onMouseEnter={soundEnabled && canHover ? playHover : undefined}
                    onClick={soundEnabled ? playClick : undefined}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{link.title}</motion.div>
                  </Link>
                ) : (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full px-6 py-4 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm border border-gray-800 hover:border-[hsl(var(--gold))] rounded-xl text-center font-semibold"
                    onMouseEnter={soundEnabled && canHover ? playHover : undefined}
                    onClick={soundEnabled ? playClick : undefined}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{link.title}</motion.div>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900/40 rounded-xl border border-gray-800">
            <Sparkles className="w-6 h-6 text-[hsl(var(--gold))] mb-2" />
            <h3 className="text-xl font-semibold mb-1">Automation</h3>
            <p className="text-gray-400">Jimat masa dengan sistem automasi.</p>
          </div>
          <div className="p-6 bg-gray-900/40 rounded-xl border border-gray-800">
            <Mail className="w-6 h-6 text-[hsl(var(--gold))] mb-2" />
            <h3 className="text-xl font-semibold mb-1">Contact</h3>
            <p className="text-gray-400">sanztechsolution@gmail.com</p>
          </div>
          <div className="p-6 bg-gray-900/40 rounded-xl border border-gray-800">
            <Phone className="w-6 h-6 text-[hsl(var(--gold))] mb-2" />
            <h3 className="text-xl font-semibold mb-1">WhatsApp</h3>
            <p className="text-gray-400">+60 11-6396 9241</p>
            <a
              href="https://wa.me/601163969241?text=Hi%20Sanztech%2C%20saya%20berminat%20tentang%20automation."
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block px-4 py-2 rounded bg-[hsl(var(--gold))] text-black font-semibold"
              onMouseEnter={soundEnabled ? playHover : undefined}
              onClick={soundEnabled ? playClick : undefined}
            >
              WhatsApp Now
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
