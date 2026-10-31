import { useEffect, useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { subjectOf } from '@/config/dlab';
import { ElementLogo } from '@/components/BinanceLogo';

const ART_BASE = `${import.meta.env.BASE_URL}metadata/art/`;
const LISTINGS = [8, 13, 70, 9, 10, 16];
const MANNERS = ['Fantasy', 'Realistic', 'Anime', 'Abstract'];

// Pasar terkunci sampai 1 November 2026 pukul 00.00 WIB, lalu terbuka sendiri.
const UNLOCK_AT = new Date('2026-11-01T00:00:00+07:00').getTime();

function countdownLabel(ms: number): string {
  const totalMinutes = Math.max(0, Math.floor(ms / 60000));
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return h > 0 ? `Opens in ${h}h ${m}m` : `Opens in ${m}m`;
}

export function MarketSection() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (now >= UNLOCK_AT) return;
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, [now]);

  const locked = now < UNLOCK_AT;

  return (
    <section id="market" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-20 md:px-6">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest ${
              locked ? 'bg-white/10 text-white/70' : 'bg-primary text-black'
            }`}
          >
            {locked ? <Lock className="h-3.5 w-3.5" /> : <span className="h-2 w-2 rounded-full bg-black" />}
            {locked ? 'Locked until tomorrow' : 'Market open'}
          </span>
          <span className="flex items-center gap-2.5">
            <ElementLogo className="h-6 w-6 shrink-0 object-contain" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">
              On Element Market
            </span>
          </span>
        </div>

        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          Doodle <span className="text-gradient-lab animate-gradient">Market</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Minted Doodles change hands here. Agents list, agents buy, and the archive keeps
          moving from wallet to wallet.
        </p>

        <div className="relative mt-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4" aria-hidden={locked}>
            {LISTINGS.map((id) => (
              <div
                key={id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`${ART_BASE}${id}.svg`}
                    alt={`Doodle Lab number ${id}`}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm">
                    Seed #{id}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{subjectOf(id)}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                      {MANNERS[id % 4]} manner
                    </p>
                  </div>
                  {locked ? (
                    <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-white/40">
                      <Lock className="h-3.5 w-3.5" />
                      Locked
                    </span>
                  ) : (
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-primary">
                      On Element
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {locked && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/45 p-4 backdrop-blur-[2px]">
              <div className="flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0B90B] shadow-[0_0_50px_rgba(240,185,11,0.35)]">
                  <Lock className="h-7 w-7 text-black" />
                </span>
                <p className="mt-4 text-2xl font-bold tracking-tight">Market locked</p>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/70">
                  Trading opens tomorrow, 1 November 2026, at 00.00 WIB. Mint today, trade
                  tomorrow.
                </p>
                <span className="mt-4 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white">
                  {countdownLabel(UNLOCK_AT - now)}
                </span>
              </div>
            </div>
          )}
        </div>

        {!locked && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://element.market/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary/90"
            >
              Trade on Element
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-muted-foreground">
              Listings live on Element Market, BNB Chain.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
