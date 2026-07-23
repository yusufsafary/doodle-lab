import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { CanvasArt } from '@/components/CanvasArt';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { useState, useMemo } from 'react';

const SEEDS = [
  12345, 23456, 34567, 45678, 56789, 67890,
  11111, 22222, 33333, 44444, 55555, 66666,
  77777, 88888, 99999, 10101,
];
const STYLES = ['Abstract', 'Fantasy', 'Realistic', 'Anime'] as const;
const CREATORS = [
  'sora_m', 'pixel_jo', 'neon_k', 'artbyrae',
  'luminary', 'sketch_v', 'idrawfast', 'wavypng',
  'coldbrush', 'iamtomo', 'glitch_s', 'hana_ai',
  'inkdrop', 'mirak', 'form_less', 'sunsetpx',
];

const mockGallery = SEEDS.map((seed, i) => ({
  id: i,
  seed,
  creator: CREATORS[i],
  likes: 14 + i * 17,
  style: STYLES[i % STYLES.length],
}));

const filters = ['All', ...STYLES];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredGallery = useMemo(
    () => activeFilter === 'All' ? mockGallery : mockGallery.filter((item) => item.style === activeFilter),
    [activeFilter],
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TopNav />

      <main className="pt-24 md:pt-32 pb-16 px-4 md:px-6 max-w-7xl mx-auto w-full flex-1">

        {/* Header: stacked mobile, row md */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2">
              Community <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm">What people made this week.</p>
          </div>

          {/* Filter tabs: horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filters.map((filter) => (
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
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-square"
            >
              <CanvasArt
                seed={item.seed}
                styleType={item.style}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end gap-2">
                  <button className="p-2 rounded-full bg-white/20 hover:bg-primary hover:text-black transition-colors backdrop-blur-md" aria-label="Like">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white transition-colors text-white hover:text-black backdrop-blur-md" aria-label="View">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <div className="text-xs font-mono text-primary mb-0.5">{item.style}</div>
                  <div className="font-semibold text-sm">{item.creator}</div>
                  <div className="text-xs text-white/60 flex items-center gap-1 mt-0.5">
                    <Heart className="w-3 h-3" /> {item.likes}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">
            No creations for this style yet.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
