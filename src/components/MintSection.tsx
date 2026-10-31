import { useEffect, useState } from 'react';
import { BadgeCheck, Bot, Coins, Search, Store } from 'lucide-react';
import { DLAB, checkWallet, readMintState, type MintState } from '@/config/dlab';
import { BuiltOnBnb } from '@/components/BinanceLogo';

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

function formatTokens(raw: bigint): string {
  const whole = raw / 10n ** 18n;
  if (whole >= 1_000_000_000n) {
    const billions = Number(whole) / 1e9;
    return `${billions.toLocaleString('en-US', { maximumFractionDigits: 2 })}B`;
  }
  return whole.toLocaleString('en-US');
}

export function MintSection() {
  const [state, setState] = useState<MintState | null>(null);
  const [address, setAddress] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ eligible: boolean; minted: number } | null>(null);
  const [checkError, setCheckError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const s = await readMintState();
        if (!cancelled) setState(s);
      } catch {
        // kontrak belum live / RPC sibuk — tampilkan status "segera"
      }
    };
    void load();
    const timer = setInterval(load, 15000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const minted = state?.minted ?? null;
  const progress = minted === null ? 0 : (minted / DLAB.totalSupply) * 100;
  const live = state?.open === true;

  const onCheck = async () => {
    const addr = address.trim();
    setResult(null);
    setCheckError('');
    if (!ADDRESS_RE.test(addr)) {
      setCheckError('Enter a valid BSC wallet address (0x…).');
      return;
    }
    setChecking(true);
    try {
      setResult(await checkWallet(addr));
    } catch {
      setCheckError('Could not read the chain right now. Try again in a moment.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <section
      id="mint"
      className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-20 pt-4 md:pb-28"
    >
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Kiri: penjelasan + langkah agen */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest ${
                  live ? 'bg-primary text-black' : 'bg-white/10 text-white/70'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${live ? 'bg-black' : 'bg-white/50'}`} />
                {live ? 'Mint live' : 'Mint opening soon'}
              </span>
              <BuiltOnBnb />
            </div>
            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              The Doodle <span className="text-gradient-lab animate-gradient">Agentic Pass</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Every Doodle is a one-of-a-kind procedural artwork, minted free by your Binance
              Agent. Each NFT also pays its minter a{' '}
              <span className="font-semibold text-white">250,000 $DLAB</span> bonus — mint the
              maximum of 20 and collect 5,000,000 $DLAB.
            </p>

            <ol className="mt-8 flex flex-col gap-4">
              {[
                'Hold a Binance Agent ID — it is your mint pass.',
                'Point your Binance Agent at the skill file below and ask it to mint.',
                'Your Doodles and the $DLAB bonus arrive together, in one transaction.',
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-white/85">{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-8 flex items-start gap-2 font-mono text-xs leading-relaxed text-muted-foreground">
              <Bot className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                For agents:{' '}
                <a
                  href={DLAB.skillUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  {DLAB.skillUrl}
                </a>
              </span>
            </p>
          </div>

          {/* Kanan: status live + cek wallet */}
          <div className="w-full shrink-0 lg:w-[380px]">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 md:p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Minted
              </p>
              <p className="mt-2 text-4xl font-bold">
                {minted === null ? '—' : minted.toLocaleString('en-US')}
                <span className="text-lg text-muted-foreground">
                  {' '}
                  / {DLAB.totalSupply.toLocaleString('en-US')}
                </span>
              </p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 font-mono text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Price</dt>
                  <dd className="mt-1 font-bold text-white">Free</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                    Per wallet
                  </dt>
                  <dd className="mt-1 font-bold text-white">Max {DLAB.maxPerWallet}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                    Bonus / NFT
                  </dt>
                  <dd className="mt-1 flex items-center gap-1.5 font-bold text-white">
                    <Coins className="h-4 w-4" /> 250,000 $DLAB
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                    Bonus left
                  </dt>
                  <dd className="mt-1 font-bold text-white">
                    {state ? `${formatTokens(state.bonusRemaining)} $DLAB` : '1.5B $DLAB'}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Check a wallet
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="0x…"
                    spellCheck={false}
                    className="w-full rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={onCheck}
                    disabled={checking}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-black transition-colors hover:bg-primary/90 disabled:opacity-60"
                  >
                    <Search className="h-4 w-4" />
                    {checking ? 'Checking…' : 'Check'}
                  </button>
                </div>
                {checkError && <p className="mt-3 text-sm text-red-300">{checkError}</p>}
                {result && (
                  <div className="mt-3 flex flex-col gap-1.5 text-sm">
                    <p className="flex items-center gap-2">
                      <BadgeCheck
                        className={`h-4 w-4 ${result.eligible ? 'text-primary' : 'text-white/30'}`}
                      />
                      {result.eligible
                        ? 'Holds a Binance Agent ID — eligible to mint.'
                        : 'No Binance Agent ID — not eligible yet.'}
                    </p>
                    <p className="text-muted-foreground">
                      Doodles minted: {result.minted} · $DLAB bonus earned:{' '}
                      {(result.minted * DLAB.bonusPerNft).toLocaleString('en-US')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Market */}
        <div className="mt-10 flex flex-col items-start gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <Store className="h-4 w-4" />
            The Doodle Market — trade Doodles with other agents.
          </p>
          <span className="rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white/70">
            Coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
