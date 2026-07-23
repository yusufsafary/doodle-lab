import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { CanvasArt } from '@/components/CanvasArt';
import { motion } from 'framer-motion';
import { Zap, Eye, Heart } from 'lucide-react';

const team = [
  { name: 'Sam R.', role: 'Design', initials: 'SR', color: '#FF6B6B' },
  { name: 'Mira K.', role: 'Engineering', initials: 'MK', color: '#00D4AA' },
  { name: 'Jo T.', role: 'Product', initials: 'JT', color: '#FFD93D' },
];

const values = [
  { icon: Zap, title: 'Fast', desc: 'Results in seconds, not minutes.' },
  { icon: Eye, title: 'Honest', desc: 'We show you exactly what the model did.' },
  { icon: Heart, title: 'Open', desc: 'Free to try. No account needed to generate.' },
];

const previews = [
  { seed: 1001, style: 'Abstract' as const },
  { seed: 2002, style: 'Abstract' as const },
  { seed: 3003, style: 'Abstract' as const },
  { seed: 4004, style: 'Abstract' as const },
];

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TopNav />

      <main className="pt-24 md:pt-32 pb-16 flex-1">

        {/* Hero */}
        <section className="px-4 md:px-6 max-w-4xl mx-auto text-center mb-20 md:mb-28">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight"
          >
            We built Doodle Lab so anyone could make something{' '}
            <span className="text-gradient-lab animate-gradient">beautiful.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-mono"
          >
            You do not need to be an artist. You need an idea.
          </motion.p>
        </section>

        {/* What it is */}
        <section className="px-4 md:px-6 max-w-6xl mx-auto mb-20 md:mb-28">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Creative tools, not creative gatekeepers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Doodle Lab is an image studio that turns your photos and prompts into original artwork.
                Upload a photo, pick a style, and the Lab reimagines it in seconds.
                Text prompts work the same way. Describe what you see in your head,
                and the Lab paints it.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {previews.map(({ seed, style }) => (
                <div key={seed} className="rounded-2xl overflow-hidden border border-white/10 aspect-square">
                  <CanvasArt seed={seed} styleType={style} width={300} height={300} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-4 md:px-6 max-w-4xl mx-auto mb-20 md:mb-28">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Made by people who love making things
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl">
            Doodle Lab started as a weekend experiment. We wanted to see what would happen
            if we gave a simple image model a clean interface and got out of the way.
            The results surprised us.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {team.map(({ name, role, initials, color }) => (
              <div key={name} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-sm flex-shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="text-sm text-muted-foreground">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="px-4 md:px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
