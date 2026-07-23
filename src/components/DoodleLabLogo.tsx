import { Link } from 'wouter';

export function DoodleLabLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';
  return (
    <Link href="/" className="flex items-center gap-2 w-max select-none">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="dlg1" cx="35%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#FFD93D" />
          </radialGradient>
          <radialGradient id="dlg2" cx="65%" cy="60%" r="65%">
            <stop offset="0%" stopColor="#00D4AA" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.55" />
          </radialGradient>
        </defs>
        <circle cx="13" cy="15" r="10" fill="url(#dlg1)" opacity="0.92" />
        <circle cx="21" cy="19" r="10" fill="url(#dlg2)" opacity="0.72" />
        <circle cx="17" cy="14" r="4.5" fill="white" opacity="0.12" />
      </svg>
      <span className={`font-bold tracking-tight ${textSize}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        Doodle<span style={{ color: '#FF6B6B' }}>Lab</span>
      </span>
      <span
        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#00D4AA] text-black leading-none"
        style={{ fontFamily: 'Space Mono, monospace' }}
      >
        AI
      </span>
    </Link>
  );
}
