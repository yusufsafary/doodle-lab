// Konfigurasi on-chain Doodle Lab Agentic Pass (DLAB) di BNB Chain.
// Alamat di bawah adalah alamat prediksi CREATE2 dari artefak deploy final
// (deploy-info-dlab.json); terkonfirmasi persis saat deploy dieksekusi.
export const DLAB = {
  nftAddress: '0x5b88F3C13647bC9DfDd611397B40059027d53f3C',
  tokenAddress: '0x1b29D8523198c06BF6Ca0298eaAf0346239644c2',
  totalSupply: 6000,
  maxPerWallet: 21, // 1 free + 20 paid
  maxPaidPerWallet: 20,
  bonusPerNft: 250000,
  bonusPool: 1500000000,
  skillUrl: 'https://doodlelab.xyz/doodle-skill.md',
} as const;

// Daftar subyek + hash yang SAMA PERSIS dengan generator artwork
// (scripts/generate-art-v2.mjs) agar label subyek di web selalu cocok
// dengan artwork dan metadata on-chain setiap token.
export const SUBJECTS = [
  'Dog', 'Cat', 'Owl', 'Fox', 'Whale', 'Mountain Lake', 'Lighthouse',
  'Hot Air Balloon', 'Rocket', 'Castle', 'Great Tree', 'City Skyline',
  'Koi', 'Butterfly', 'Sailboat', 'Panda',
] as const;

export function subjectOf(id: number): string {
  let x = (id * 2654435761) >>> 0;
  x ^= x >>> 15;
  x = (x * 2246822519) >>> 0;
  x ^= x >>> 13;
  return SUBJECTS[(x >>> 0) % SUBJECTS.length];
}

export const BSC_RPCS = [
  'https://bsc-dataseed-public.bnbchain.org',
  'https://bsc-rpc.publicnode.com',
  'https://bsc-dataseed.binance.org',
];

export const SELECTORS = {
  totalMinted: '0xa2309ff8',
  mintOpen: '0x24bbd049',
  holdsAgentId: '0x11213086',
  mintedBy: '0x3cef28d2',
  bonusRemaining: '0x982a96e3',
  balanceOf: '0x70a08231',
} as const;

export function padAddress(address: string): string {
  return address.toLowerCase().replace('0x', '').padStart(64, '0');
}

export async function ethCall(to: string, data: string): Promise<string> {
  for (const rpc of BSC_RPCS) {
    try {
      const res = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_call',
          params: [{ to, data }, 'latest'],
        }),
      });
      const json = await res.json();
      if (typeof json.result === 'string' && json.result !== '0x') return json.result;
    } catch {
      // coba RPC berikutnya
    }
  }
  throw new Error('Semua RPC gagal');
}

export function decodeUint(hex: string): bigint {
  return BigInt(hex);
}

export interface MintState {
  minted: number;
  open: boolean;
  bonusRemaining: bigint;
}

export async function readMintState(): Promise<MintState> {
  const [mintedHex, openHex, bonusHex] = await Promise.all([
    ethCall(DLAB.nftAddress, SELECTORS.totalMinted),
    ethCall(DLAB.nftAddress, SELECTORS.mintOpen),
    ethCall(DLAB.nftAddress, SELECTORS.bonusRemaining),
  ]);
  return {
    minted: Number(decodeUint(mintedHex)),
    open: decodeUint(openHex) === 1n,
    bonusRemaining: decodeUint(bonusHex),
  };
}

export interface WalletCheck {
  eligible: boolean;
  minted: number;
  freeAvailable: boolean;
  paidMinted: number;
}

export async function checkWallet(address: string): Promise<WalletCheck> {
  const [holdsHex, mintedHex] = await Promise.all([
    ethCall(DLAB.nftAddress, SELECTORS.holdsAgentId + padAddress(address)),
    ethCall(DLAB.nftAddress, SELECTORS.mintedBy + padAddress(address)),
  ]);
  const minted = Number(decodeUint(mintedHex));
  return {
    eligible: decodeUint(holdsHex) === 1n,
    minted,
    freeAvailable: minted === 0,
    paidMinted: minted === 0 ? 0 : minted - 1,
  };
}
