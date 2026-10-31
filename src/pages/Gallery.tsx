import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { subjectOf } from '@/config/dlab';

// Koleksi asli Doodle Lab (DLAB): gaya dan subyek setiap token mengikuti
// generator artwork v2 (STYLES[tokenId % 4] dan subjectOf pada
// scripts/generate-art-v2.mjs, diport ke config/dlab).
const COLLECTION_STYLES = ['Fantasy', 'Realistic', 'Anime', 'Abstract'] as const;
const FILTERS = ['All', 'Abstract', 'Fantasy', 'Realistic', 'Anime'] as const;
const SHOWN = 48;

const works = Array.from({ length: SHOWN }, (_, i) => {
  const id = i + 1;
  return { id, style: COLLECTION_STYLES[id % COLLECTION_STYLES.length], subject: subjectOf(id) };
});

const base = import.meta.env.BASE_URL;

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All');
  const [, navigate] = useLocation();

  const filtered = useMemo(
    () => (activeFilter === 'All' ? works : works.filter((w) => w.style === activeFilter)),
    [activeFilter],
  );

  const goMint = () => {
    navigate('/');
    setTimeout(
      () => document.getElementById('mint')?.scrollIntoView({ behavior: 'smooth' }),
      450,
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TopNav />

      <main className="pt-24 md:pt-32 pb-16 px-4 md:px-6 max-w-7xl mx-auto w-full flex-1">

        {/* Header: stacked mobile, row md */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2">
              <span className="text-primary">Collection</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              6,000 illustrated scenes drawn by the Lab engine from token seeds. Sixteen
              subjects, from owls and whales to rockets and castles. Showing the first 48.
            </p>
          </div>

          {/* Filter tabs: horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0
                  ${activeFilter === filter ? 'bg-white text-black' : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid: 2 cols mobile, 3 sm, 4 lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 12) * 0.04 }}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-square"
            >
              <img
                src={`${base}metadata/art/${work.id}.svg`}
                alt={`Doodle Lab #${work.id}: ${work.subject}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Keterangan selalu terlihat: subyek + nomor + manner */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 pt-9">
                <div className="text-xs font-semibold text-white">{work.subject}</div>
                <div className="text-[11px] text-white/65">
                  #{work.id} · {work.style} manner
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end gap-2">
                  <a
                    href={`${base}metadata/${work.id}.json`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-white/20 hover:bg-white transition-colors text-white hover:text-black backdrop-blur-md"
                    aria-label={`Metadata of Doodle Lab #${work.id}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <div className="text-xs font-mono text-primary mb-0.5">{work.subject}</div>
                  <div className="font-semibold text-sm">Doodle Lab #{work.id}</div>
                  <div className="text-xs text-white/60 mt-0.5">
                    {work.style} manner · Mint bonus 250,000 $DLAB
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">
            No works in this manner yet.
          </div>
        )}

        {/* Penutup: arsip penuh + jalur mint */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            All 6,000 works are published in the collection metadata. Each one is minted
            free through a Binance Agent and carries its $DLAB allocation with it.
          </p>
          <button
            type="button"
            onClick={goMint}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary/90"
          >
            Mint a Doodle
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
