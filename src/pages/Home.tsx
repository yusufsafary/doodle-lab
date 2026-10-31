import { useState } from 'react';
import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BnbChainLogo, ElementLogo } from '@/components/BinanceLogo';
import { MintSection } from '@/components/MintSection';
import { subjectOf } from '@/config/dlab';

const STYLE_TILES = [
  { style: 'Fantasy', id: 4 },
  { style: 'Realistic', id: 1 },
  { style: 'Anime', id: 2 },
  { style: 'Abstract', id: 3 },
];

export default function Home() {
  const [activeStyle, setActiveStyle] = useState(STYLE_TILES[0]);
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-coral/10 blur-[150px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-yellow/10 blur-[100px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <TopNav />

      <main className="pt-32 md:pt-40 px-4 md:px-6 max-w-6xl mx-auto w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter"
          >
            <span className="text-gradient-lab animate-gradient block">Create with us.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-muted-foreground font-mono"
          >
            Reimagine anything with Lab 1.0
          </motion.p>
        </div>

      </main>

      {/* Mint tepat di bawah hero: tanpa scroll panjang */}
      <MintSection />

      <div className="px-4 md:px-6 max-w-6xl mx-auto w-full relative z-10 flex-1 pb-16">
        {/* Bar mitra resmi: BNB Chain + Element Market */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 backdrop-blur-sm"
        >
          <span className="flex items-center gap-2.5">
            <BnbChainLogo className="h-6 w-6 shrink-0" />
            <span className="text-sm text-white/85">
              Built on <span className="font-bold text-white">BNB Chain</span>
            </span>
          </span>
          <span aria-hidden className="hidden h-6 w-px bg-white/10 sm:block" />
          <span className="flex items-center gap-2.5">
            <ElementLogo className="h-6 w-6 shrink-0 object-contain" />
            <span className="text-sm text-white/85">
              Doodle Market on <span className="font-bold text-white">Element</span>
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">
              Soon
            </span>
          </span>
        </motion.div>

        {/* Produk utama: studio sebagai utilitas, ringkas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Product
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                <span className="text-gradient-lab animate-gradient">Studio</span>
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                Doodle Lab is a working studio. Give it a photograph or a written prompt and
                it returns an original drawing in seconds, in four manners: Abstract,
                Fantasy, Realistic, and Anime. Every piece can be downloaded or shared. The
                engine that draws here is the same one that draws the collection below.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/studio"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary/90"
                >
                  Start creating
                </Link>
                <Link
                  href="/gallery"
                  className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  Browse collection
                </Link>
              </div>
            </div>
            <div className="shrink-0 md:w-[300px]">
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  key={activeStyle.id}
                  src={`${import.meta.env.BASE_URL}metadata/art/${activeStyle.id}.svg`}
                  alt={`Doodle Lab #${activeStyle.id}, ${activeStyle.style} manner`}
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm">
                  Lab 1.0
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  Seed #{activeStyle.id} · {subjectOf(activeStyle.id)} · {activeStyle.style}{' '}
                  manner
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {STYLE_TILES.map((t) => (
                  <button
                    key={t.style}
                    type="button"
                    onClick={() => setActiveStyle(t)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      activeStyle.style === t.style
                        ? 'bg-primary text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {t.style}
                  </button>
                ))}
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                Tap a manner. One engine, four hands.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
