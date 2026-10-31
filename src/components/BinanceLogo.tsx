import { cn } from '@/lib/utils';

export function BinanceLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#F0B90B" className={className} role="img" aria-label="Binance">
      <path d="M16.624 13.9202l2.7175 2.7154-7.353 7.353-7.353-7.352 2.7175-2.7164 4.6355 4.6595 4.6356-4.6595zm4.6366-4.6366L24 12l-2.7154 2.7164L18.5682 12l2.6924-2.7164zm-9.272.001l2.7163 2.6914-2.7164 2.7174v-.001L9.2721 12l2.7164-2.7154zm-9.2722-.001L5.4088 12l-2.6914 2.6924L0 12l2.7164-2.7164zM11.9885.0115l7.353 7.329-2.7174 2.7154-4.6356-4.6356-4.6355 4.6595-2.7174-2.7154 7.353-7.353z" />
    </svg>
  );
}

export function BuiltOnBnb({ className = '' }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <BinanceLogo className="h-5 w-5" />
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/80">
        Built on BNB Chain
      </span>
    </span>
  );
}

// Logo resmi BNB Chain (mark kubus dari simple-icons "bnbchain", warna brand #F0B90B)
export function BnbChainLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#F0B90B" className={className} role="img" aria-label="BNB Chain">
      <path d="M5.631 3.676 12.001 0l6.367 3.676-2.34 1.358L12 2.716 7.972 5.034l-2.34-1.358Zm12.737 4.636-2.34-1.358L12 9.272 7.972 6.954l-2.34 1.358v2.716l4.026 2.318v4.636L12 19.341l2.341-1.359v-4.636l4.027-2.318V8.312Zm0 7.352v-2.716l-2.34 1.358v2.716l2.34-1.358Zm1.663.96-4.027 2.318v2.717l6.368-3.677V10.63l-2.34 1.358v4.636Zm-2.34-10.63 2.34 1.358v2.716l2.341-1.358V5.994l-2.34 1.358-2.342 1.358ZM9.657 19.926v2.716L12 24l2.341-1.358v-2.716l-2.34 1.358-2.343-1.358Zm-4.027-4.262 2.341 1.358v-2.716l-2.34-1.358v2.716Zm4.027-9.67L12 7.352l2.341-1.358-2.34-1.358-2.343 1.358Zm-5.69 1.358L6.31 5.994 3.968 4.636l-2.34 1.358V8.71l2.34 1.358V7.352Zm0 4.636-2.34-1.358v7.352l6.368 3.677v-2.717l-4.028-2.318v-4.636Z" />
    </svg>
  );
}

// Logo resmi Element Market (ikon kubus hijau dari element.market)
export function ElementLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}element-logo.png`}
      alt="Element Market"
      loading="lazy"
      className={className}
    />
  );
}
