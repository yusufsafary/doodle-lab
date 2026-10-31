// Generator metadata + artwork Doodle Lab (DLAB).
// Artwork meniru PERSIS logika src/components/CanvasArt.tsx (PRNG, palet, dan
// urutan gambar yang sama) tetapi dirender sebagai SVG statis per token.
// Jalankan: node scripts/generate-metadata.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const TOTAL = 6000;
const BASE = 'https://yusufsafary.github.io/doodle-lab/metadata/';
const W = 400;
const H = 400;

const PALETTES = {
  Fantasy: ['#2a0845', '#6441A5', '#FF6B6B', '#FFD93D'],
  Realistic: ['#2C3E50', '#3498DB', '#E74C3C', '#ECF0F1'],
  Anime: ['#FF9A9E', '#FECFEF', '#A1C4FD', '#C2E9FB'],
  Abstract: ['#000000', '#FF6B6B', '#FFD93D', '#00D4AA'],
};
const STYLES = ['Fantasy', 'Realistic', 'Anime', 'Abstract'];

function makeRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function renderSvg(tokenId) {
  // Gaya ditentukan seed: gaya = STYLES[tokenId % 4] agar distribusi merata,
  // gambar memakai seed tokenId persis seperti CanvasArt (seed = tokenId).
  const style = STYLES[tokenId % STYLES.length];
  const colors = PALETTES[style];
  const random = makeRandom(tokenId);

  const shapeCount = 5 + Math.floor(random() * 10);
  let defs = '';
  let shapes = '';
  for (let i = 0; i < shapeCount; i++) {
    const isCircle = random() > 0.5;
    const x = random() * W;
    const y = random() * H;
    const size = 20 + random() * 100;
    const c1 = colors[1 + Math.floor(random() * (colors.length - 1))];
    const c2 = colors[1 + Math.floor(random() * (colors.length - 1))];
    defs += `<linearGradient id="g${i}" x1="${(x - size).toFixed(1)}" y1="${(y - size).toFixed(1)}" x2="${(x + size).toFixed(1)}" y2="${(y + size).toFixed(1)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c1}" stop-opacity="0.5"/><stop offset="1" stop-color="${c2}" stop-opacity="0.8"/></linearGradient>`;
    if (isCircle) {
      shapes += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size.toFixed(1)}" fill="url(#g${i})"/>`;
    } else {
      shapes += `<path d="M ${x.toFixed(1)} ${(y - size).toFixed(1)} L ${(x + size).toFixed(1)} ${(y + size).toFixed(1)} L ${(x - size).toFixed(1)} ${(y + size).toFixed(1)} Z" fill="url(#g${i})"/>`;
    }
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">` +
    `<defs>${defs}<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs>` +
    `<rect width="${W}" height="${H}" fill="${colors[0]}"/>` +
    shapes +
    `<rect width="${W}" height="${H}" filter="url(#n)" opacity="0.05"/>` +
    `</svg>`;

  return { svg, style, shapeCount, background: colors[0] };
}

mkdirSync('public/metadata/art', { recursive: true });
for (let id = 1; id <= TOTAL; id++) {
  const { svg, style, shapeCount, background } = renderSvg(id);
  writeFileSync(`public/metadata/art/${id}.svg`, svg);
  const meta = {
    name: `Doodle Lab #${id}`,
    description:
      'A one-of-a-kind procedural doodle from Doodle Lab on BNB Chain. Minting this NFT paid its minter a 250,000 $DLAB bonus.',
    image: `${BASE}art/${id}.svg`,
    attributes: [
      { trait_type: 'Style', value: style },
      { trait_type: 'Shapes', value: shapeCount },
      { trait_type: 'Background', value: background },
      { trait_type: 'Bonus', value: '250,000 DLAB' },
    ],
  };
  writeFileSync(`public/metadata/${id}.json`, JSON.stringify(meta, null, 2));
  if (id % 1000 === 0) console.log(`...${id}`);
}
console.log(`Selesai: ${TOTAL} metadata + ${TOTAL} SVG di public/metadata/`);
