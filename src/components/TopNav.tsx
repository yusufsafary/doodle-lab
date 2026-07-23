import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { DoodleLabLogo } from '@/components/DoodleLabLogo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'How To', href: '/how-to' },
  { label: 'About', href: '/about' },
];

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
        <DoodleLabLogo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${location === link.href ? 'text-white' : 'text-muted-foreground hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
            Get Started
          </Link>
        </div>

        {/* Hamburger: mobile only */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="block w-5 h-0.5 bg-white rounded-full" />
          <span className="block w-5 h-0.5 bg-white rounded-full" />
          <span className="block w-4 h-0.5 bg-white rounded-full" />
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col px-6 pt-6 pb-12">
          {/* Top row */}
          <div className="flex items-center justify-between mb-12">
            <DoodleLabLogo />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <line x1="1" y1="1" x2="15" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="15" y1="1" x2="1" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-4xl font-bold tracking-tight text-white/80 hover:text-white py-2 transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="flex flex-col gap-3 pt-8 border-t border-white/10">
            <Link href="/login" className="w-full text-center py-3 rounded-xl border border-white/20 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="w-full text-center py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
