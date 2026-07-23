import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

const cookieRows = [
  { name: 'session_id', purpose: 'Keeps you logged in during a visit', duration: 'Session' },
  { name: 'theme_pref', purpose: 'Remembers your display preference', duration: '1 year' },
  { name: '_analytics', purpose: 'Counts page visits so we can improve the product', duration: '90 days' },
];

export default function Cookies() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TopNav />

      <main className="pt-24 md:pt-32 pb-16 flex-1 px-4 md:px-6 max-w-2xl mx-auto w-full">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">Legal</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-3">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground font-mono">Last updated: July 2026</p>
        </motion.div>

        <div className="space-y-10">

          {/* What are cookies */}
          <section>
            <h2 className="text-xl font-semibold mb-3">What are cookies</h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Cookies are small text files that a website saves on your device. They help the site
              remember your preferences and measure how people use it. Doodle Lab uses a small number
              of cookies to keep the product working.
            </p>
          </section>

          {/* Cookies we use */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Cookies we use</h2>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              {cookieRows.map(({ name, purpose, duration }, i) => (
                <div
                  key={name}
                  className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 p-4 ${i < cookieRows.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <div className="sm:w-1/4 font-mono text-sm text-primary font-bold flex-shrink-0">{name}</div>
                  <div className="sm:flex-1 text-sm text-muted-foreground leading-relaxed">{purpose}</div>
                  <div className="sm:w-1/5 text-sm text-muted-foreground sm:text-right flex-shrink-0">{duration}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Third-party cookies */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Third-party cookies</h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              We use a single analytics provider to count page views. This provider may set its own
              cookies subject to its own policy. We do not use advertising cookies or sell data to
              third parties.
            </p>
          </section>

          {/* How to manage */}
          <section>
            <h2 className="text-xl font-semibold mb-3">How to manage cookies</h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              You can clear cookies at any time through your browser settings. Clearing session cookies
              will log you out. Clearing analytics cookies will not affect how the product works.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Questions about this policy? Email us at{' '}
              <a href="mailto:hello@doodlelab.ai" className="text-primary hover:underline">
                hello@doodlelab.ai
              </a>
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
