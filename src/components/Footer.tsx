import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Mobile: stacked. md: row */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-3 md:max-w-xs">
            <Link href="/" className="flex items-center gap-2 w-max select-none">
              <svg width="28" height="28" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <radialGradient id="ftg1" cx="35%" cy="40%" r="65%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="100%" stopColor="#FFD93D" />
                  </radialGradient>
                  <radialGradient id="ftg2" cx="65%" cy="60%" r="65%">
                    <stop offset="0%" stopColor="#00D4AA" />
                    <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.55" />
                  </radialGradient>
                </defs>
                <circle cx="13" cy="15" r="10" fill="url(#ftg1)" opacity="0.92" />
                <circle cx="21" cy="19" r="10" fill="url(#ftg2)" opacity="0.72" />
              </svg>
              <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Doodle<span style={{ color: '#FF6B6B' }}>Lab</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reimagine anything.
            </p>
            <p className="text-xs text-white/30 mt-2">
              2025 Doodle Lab. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4" style={{ fontFamily: 'Space Mono, monospace' }}>
                Product
              </p>
              <ul className="flex flex-col gap-3">
                <li><Link href="/" className="text-sm text-muted-foreground hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/gallery" className="text-sm text-muted-foreground hover:text-white transition-colors">Gallery</Link></li>
                <li><Link href="/how-to" className="text-sm text-muted-foreground hover:text-white transition-colors">How To</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4" style={{ fontFamily: 'Space Mono, monospace' }}>
                Company
              </p>
              <ul className="flex flex-col gap-3">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-white transition-colors">About</Link></li>
                <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-white transition-colors">Cookies</Link></li>
                <li><Link href="/signup" className="text-sm text-muted-foreground hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-xs text-white/20" style={{ fontFamily: 'Space Mono, monospace' }}>
            Built with Lab 1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
