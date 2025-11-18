'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ProofPoint = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.5 }}
    className="bg-secondary/50 p-6 rounded-xl border border-border/50 backdrop-blur-sm"
  >
    <div className="flex items-center gap-4">
      <div className="bg-primary/10 p-3 rounded-full border border-primary/30">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
    </div>
    <p className="mt-4 text-muted-foreground">{children}</p>
  </motion.div>
);

export default function AffiliateHubPage() {
  const affiliateToolImageUrl = 'https://picsum.photos/seed/pipedrive/1200/600';

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <main className="container mx-auto px-4">
        {/* SECTION 1: HERO */}
        <section className="py-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-[0_2px_8px_hsl(var(--primary)/0.5)]"
          >
            JANGAN KLIK SINI JIKA TAK NAK PROFIT BERGANDA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
          >
            Ini adalah hub utama anda untuk mendapatkan akses **Alat Automasi PERCUMA** yang menjadi asas kepada semua Template Blueprint premium dari Sanztech.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative mt-12 max-w-5xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl border-4 border-primary/50 shadow-2xl shadow-primary/20">
              <Image
                src={affiliateToolImageUrl}
                alt="Affiliate Tool Screenshot"
                width={1200}
                height={600}
                data-ai-hint="dashboard crm"
                className="object-cover w-full"
              />
               <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-gradient-to-br from-primary to-yellow-600 text-primary-foreground px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-lg font-bold shadow-lg rotate-[-10deg] animate-pulse">
                AKSES PERCUMA
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          </motion.div>
        </section>

        {/* SECTION 2: PROOF */}
        <section className="py-20">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kenapa Alat Ini WAJIB?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Ia bukan sekadar alat. Ia adalah enjin automasi yang menjimatkan masa dan wang anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProofPoint icon={Zap} title="Asas Automasi">
              Setiap template blueprint kami dibina di atas platform ini. Tanpanya, template tidak akan berfungsi. Ia adalah kunci untuk sistem automasi anda.
            </ProofPoint>
            <ProofPoint icon={ShieldCheck} title="Percuma & Selamat">
              Dapatkan akses penuh selama 30 hari tanpa sebarang kos. Tiada risiko, cuma peluang untuk anda lihat sendiri kuasanya.
            </ProofPoint>
            <ProofPoint icon={CheckCircle} title="Jimat & Efisien">
              Tak perlu langgan pelbagai perisian mahal. Alat ini menggabungkan semua fungsi penting, menjimatkan ratusan ringgit setiap bulan. (*Street Survival Proof*)
            </ProofPoint>
          </div>
        </section>

        {/* SECTION 3: CTA */}
        <section className="py-20 text-center bg-secondary/30 rounded-t-3xl border-t border-border/50">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Dapatkan Akses Segera Sekarang.</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Mulakan langkah pertama untuk automasi penuh perniagaan anda.</p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button 
                size="lg" 
                className="w-full max-w-md h-14 text-lg font-bold shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50"
                asChild
              >
                <a href="https://www.pipedrive.com/en/trial?irgwc=1&ir_campaignid=39115&ir_adid=644026&ir_partner=Sanztech" target="_blank" rel="noopener noreferrer">
                  DAFTAR FREE TRIAL SEGERA & MULA GUNAKAN TEMPLATE
                </a>
              </Button>
              <Link href="/workflow" className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                Dah Daftar? Lihat My Workflow Sekarang
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
