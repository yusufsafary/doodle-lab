import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Upload, Palette, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const steps = [
  {
    num: '01',
    icon: Upload,
    title: 'Upload your image',
    desc: 'Tap the upload zone on the home screen and choose any JPG or PNG from your device. The image stays on your device during processing. We do not store your originals.',
    tip: 'Best results: square images between 512x512 and 2048x2048 pixels.',
  },
  {
    num: '02',
    icon: Palette,
    title: 'Pick your style',
    desc: 'Choose from four styles: Abstract, Realistic, Anime, and Fantasy. Each style applies a different set of visual rules to your image. Try the same photo in multiple styles to see what the Lab finds.',
    tip: 'Fantasy and Anime styles work especially well on portraits.',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Generate and share',
    desc: 'Hit Generate and wait about two seconds. When your result appears, download it directly to your device or copy the share link. Generated images belong to you.',
    tip: 'Download before closing the tab. Results are not saved to a server.',
  },
];

const examplePrompts = [
  'A red bicycle leaning against a bright yellow wall',
  'An owl made entirely of stained glass',
  'A city skyline reflected in a rain puddle',
];

const faqs: { q: string; a: string }[] = [
  { q: 'Is Doodle Lab free?', a: 'Yes. You can generate images without creating an account. Creating an account lets you save and share your work.' },
  { q: 'What image formats can I upload?', a: 'JPG and PNG files up to 10 MB.' },
  { q: 'Who owns the images I create?', a: 'You do. Images you generate belong to you.' },
  { q: 'Does Doodle Lab store my uploaded images?', a: 'No. Uploaded images are processed in memory and discarded immediately after generation.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-primary transition-colors"
      >
        <span className="font-medium text-sm md:text-base">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0 text-primary" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground" />}
      </button>
      {open && (
        <p className="text-muted-foreground text-sm leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

export default function HowTo() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TopNav />

      <main className="pt-24 md:pt-32 pb-16 flex-1">

        {/* Hero */}
        <section className="px-4 md:px-6 max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-5"
          >
            Three steps.{' '}
            <span className="text-gradient-lab animate-gradient">Infinite results.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-mono text-base md:text-lg"
          >
            Here is everything you need to know to start creating with Doodle Lab.
          </motion.p>
        </section>

        {/* Steps */}
        <section className="px-4 md:px-6 max-w-3xl mx-auto mb-20 space-y-4">
          {steps.map(({ num, icon: Icon, title, desc, tip }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-muted-foreground mb-1">STEP {num}</div>
                  <h2 className="text-lg md:text-xl font-bold mb-3">{title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-xs text-primary font-mono font-bold mb-1">TIP</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Text prompts */}
        <section className="px-4 md:px-6 max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Using text prompts</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
            Switch to the TEXT tab on the home screen. Type what you want to create. Be specific.
            Instead of "a forest", try "a dark pine forest at dusk with fog between the trees".
            The Lab responds to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            {examplePrompts.map((p) => (
              <span
                key={p}
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 md:px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Questions</h2>
          <div>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
