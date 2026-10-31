import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BinanceLogo } from '@/components/BinanceLogo';
import { MintSection } from '@/components/MintSection';

const SHOWCASE = [7, 123, 2024, 5555];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-coral/10 blur-[150px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-yellow/10 blur-[100px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <TopNav />

      <main className="pt-24 md:pt-32 pb-16 px-4 md:px-6 max-w-6xl mx-auto w-full relative z-10 flex-1">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
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

        {/* Agentic Pass strip: jalur cepat ke section mint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm"
        >
          <span className="flex items-center gap-2.5 text-sm text-white/85">
            <BinanceLogo className="h-5 w-5 shrink-0" />
            <span>
              <span className="font-semibold text-white">The Doodle Agentic Pass.</span> Mint
              free, earn <span className="font-semibold text-white">250,000 $DLAB</span> per NFT
            </span>
          </span>
          <button
            type="button"
            onClick={() =>
              document.getElementById('mint')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-primary/90"
          >
            Mint yours
          </button>
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
                The product
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                The <span className="text-gradient-lab animate-gradient">Studio</span>
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
                  Open the Studio
                </Link>
                <Link
                  href="/gallery"
                  className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  See the collection
                </Link>
              </div>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-2 md:w-[264px]">
              {SHOWCASE.map((id) => (
                <img
                  key={id}
                  src={`${import.meta.env.BASE_URL}metadata/art/${id}.svg`}
                  alt={`Doodle Lab #${id}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-xl border border-white/10 object-cover"
                />
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <MintSection />

      <Footer />
    </div>
  );
}
