// Generator artwork v2 Doodle Lab (DLAB): adegan ilustrasi bersubyek.
// Setiap token digambar sebagai adegan vektor berlapis (langit, latar,
// subyek, latar depan) dengan shading gradien agar terasa realistis dan
// relevan: 16 subyek yang bisa dikenali, 4 manner sesuai manner Studio
// (Fantasy / Realistic / Anime / Abstract dari id % 4), subyek dipilih
// deterministik dari hash(id) agar web bisa menampilkan nama subyek yang
// sama persis (port fungsi hash + daftar SUBJECTS ini ke src/config/dlab.ts).
// Jalankan: node scripts/generate-art-v2.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ART_DIR = join(ROOT, 'public', 'metadata', 'art');
const META_DIR = join(ROOT, 'public', 'metadata');
const SITE = 'https://yusufsafary.github.io/doodle-lab';
export const SUBJECTS = [
  'Dog', 'Cat', 'Owl', 'Fox', 'Whale', 'Mountain Lake', 'Lighthouse',
  'Hot Air Balloon', 'Rocket', 'Castle', 'Great Tree', 'City Skyline',
  'Koi', 'Butterfly', 'Sailboat', 'Panda',
];
export const STYLES = ['Fantasy', 'Realistic', 'Anime', 'Abstract'];

export function hashId(id) {
  let x = (id * 2654435761) >>> 0;
  x ^= x >>> 15;
  x = (x * 2246822519) >>> 0;
  x ^= x >>> 13;
  return x >>> 0;
}
export function subjectOf(id) {
  return SUBJECTS[hashId(id) % SUBJECTS.length];
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const rr = (rng, a, b) => a + rng() * (b - a);
const f1 = (n) => Math.round(n * 10) / 10;

// Palet langit per mood: [atas, tengah, bawah]
const SKIES = {
  day: ['#6ec1e8', '#a8dcf2', '#eafaf1'],
  dawn: ['#7f7fd5', '#e88ca0', '#ffd9a0'],
  dusk: ['#3d348b', '#c65d7b', '#f6a860'],
  night: ['#0b1026', '#1d2b53', '#415a8f'],
};
const MOODS_BY_MANNER = {
  Realistic: ['day', 'day', 'dawn', 'dusk'],
  Fantasy: ['dawn', 'dusk', 'night', 'dawn'],
  Anime: ['day', 'day', 'dawn', 'day'],
  Abstract: ['day', 'dusk', 'night', 'dawn'],
};

// ---------- potongan adegan umum ----------
function cloud(x, y, s, o) {
  return `<g fill="#ffffff" opacity="${o}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(52 * s)}" ry="${f1(20 * s)}"/><ellipse cx="${f1(x - 30 * s)}" cy="${f1(y + 6 * s)}" rx="${f1(34 * s)}" ry="${f1(14 * s)}"/><ellipse cx="${f1(x + 34 * s)}" cy="${f1(y + 6 * s)}" rx="${f1(36 * s)}" ry="${f1(15 * s)}"/></g>`;
}
function stars(rng, n) {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += `<circle cx="${f1(rng() * 800)}" cy="${f1(rng() * 380)}" r="${f1(rr(rng, 1.2, 2.6))}" fill="#ffffff" opacity="${f1(rr(rng, 0.35, 0.95))}"/>`;
  }
  return s;
}
function birds(rng, n, color) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = rr(rng, 90, 700), y = rr(rng, 90, 260), w = rr(rng, 12, 22);
    s += `<path d="M ${f1(x - w)} ${f1(y)} Q ${f1(x - w / 2)} ${f1(y - w * 0.7)} ${f1(x)} ${f1(y)} Q ${f1(x + w / 2)} ${f1(y - w * 0.7)} ${f1(x + w)} ${f1(y)}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
  }
  return s;
}
function hills(rng, base, c1, c2) {
  const p = (amp, yBase) => {
    const y1 = yBase - rr(rng, 0, amp), y2 = yBase - rr(rng, 0, amp), y3 = yBase - rr(rng, 0, amp);
    return `M0 ${f1(yBase + 90)} L0 ${f1(y1)} Q 200 ${f1(y1 - amp)} 400 ${f1(y2)} Q 600 ${f1(y2 - amp)} 800 ${f1(y3)} L800 ${f1(yBase + 90)} Z`;
  };
  return `<path d="${p(70, base - 46)}" fill="${c2}"/><path d="${p(54, base)}" fill="${c1}"/>`;
}
function pine(x, y, s, color) {
  return `<g fill="${color}"><rect x="${f1(x - 3 * s)}" y="${f1(y - 16 * s)}" width="${f1(6 * s)}" height="${f1(18 * s)}" fill="#6b4a2f"/><path d="M ${f1(x)} ${f1(y - 74 * s)} L ${f1(x - 22 * s)} ${f1(y - 26 * s)} L ${f1(x + 22 * s)} ${f1(y - 26 * s)} Z"/><path d="M ${f1(x)} ${f1(y - 56 * s)} L ${f1(x - 27 * s)} ${f1(y - 8 * s)} L ${f1(x + 27 * s)} ${f1(y - 8 * s)} Z"/></g>`;
}
function sparkle(x, y, s, color, o) {
  return `<path d="M ${f1(x)} ${f1(y - 12 * s)} L ${f1(x + 3 * s)} ${f1(y - 3 * s)} L ${f1(x + 12 * s)} ${f1(y)} L ${f1(x + 3 * s)} ${f1(y + 3 * s)} L ${f1(x)} ${f1(y + 12 * s)} L ${f1(x - 3 * s)} ${f1(y + 3 * s)} L ${f1(x - 12 * s)} ${f1(y)} L ${f1(x - 3 * s)} ${f1(y - 3 * s)} Z" fill="${color}" opacity="${o}"/>`;
}
function flowers(rng, y, colors, n) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = rr(rng, 30, 770), yy = y + rr(rng, -6, 26), r = rr(rng, 4, 8);
    s += `<circle cx="${f1(x)}" cy="${f1(yy)}" r="${f1(r)}" fill="${pick(rng, colors)}"/><circle cx="${f1(x)}" cy="${f1(yy)}" r="${f1(r * 0.4)}" fill="#fff7ae"/>`;
  }
  return s;
}

// Latar standar: langit + benda langit + bukit + tanah.
// habitat: 'land' | 'sea' | 'space' | 'pond' | 'city'
function backdrop(ctx, habitat) {
  const { rng, mood, manner } = ctx;
  const sky = SKIES[mood];
  if (habitat === 'pond') {
    // Kolam memenuhi seluruh bingkai: air, cahaya dari atas, riak menyebar.
    let p = `<rect width="800" height="800" fill="url(#sea)"/>`;
    p += `<ellipse cx="400" cy="-60" rx="430" ry="200" fill="#ffffff" opacity="0.10"/>`;
    for (let i = 0; i < 9; i++) {
      const y = rr(rng, 60, 750), x = rr(rng, 20, 640);
      p += `<path d="M ${f1(x)} ${f1(y)} q 26 -12 52 0 q 26 12 52 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.22"/>`;
    }
    if (manner === 'Fantasy') for (let i = 0; i < 5; i++) p += sparkle(rr(rng, 60, 740), rr(rng, 60, 740), rr(rng, 0.6, 1.1), '#fff3b0', 0.7);
    return p;
  }
  let s = `<rect width="800" height="800" fill="url(#sky)"/>`;
  if (mood === 'night') s += stars(rng, 46);
  // benda langit
  const cx = rr(rng, 560, 700), cy = rr(rng, 96, 170);
  if (mood === 'night' || (mood === 'dusk' && rng() < 0.4)) {
    s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="44" fill="#f6f1d8"/><circle cx="${f1(cx - 17)}" cy="${f1(cy - 8)}" r="38" fill="${sky[1]}" opacity="0.55"/>`;
  } else {
    s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="86" fill="#ffd93d" opacity="0.25"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="46" fill="#ffd93d"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="46" fill="url(#sunG)"/>`;
  }
  if (mood !== 'night') s += cloud(rr(rng, 110, 260), rr(rng, 80, 150), rr(rng, 0.8, 1.3), 0.9) + cloud(rr(rng, 420, 560), rr(rng, 130, 210), rr(rng, 0.6, 1), 0.75);
  if (habitat === 'land') {
    s += hills(rng, 640, '#5da464', '#478551');
    s += `<rect y="640" width="800" height="160" fill="url(#ground)"/>`;
    s += birds(rng, 3, mood === 'night' ? '#dbe7ff' : '#33506b');
  } else if (habitat === 'sea' || habitat === 'pond') {
    s += `<rect y="560" width="800" height="240" fill="url(#sea)"/>`;
    for (let i = 0; i < 7; i++) {
      const y = rr(rng, 596, 764), x = rr(rng, 20, 700);
      s += `<path d="M ${f1(x)} ${f1(y)} q 26 -12 52 0 q 26 12 52 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.35"/>`;
    }
  } else if (habitat === 'space') {
    s = `<rect width="800" height="800" fill="url(#sky)"/>` + stars(rng, 90);
    s += `<circle cx="${f1(rr(rng, 90, 180))}" cy="${f1(rr(rng, 90, 170))}" r="${f1(rr(rng, 26, 40))}" fill="${pick(rng, ['#e88ca0', '#8fd0e8', '#ffd9a0'])}" opacity="0.9"/>`;
  }
  if (manner === 'Fantasy') {
    for (let i = 0; i < 6; i++) s += sparkle(rr(rng, 60, 740), rr(rng, 60, 500), rr(rng, 0.7, 1.4), '#fff3b0', 0.85);
  }
  return s;
}

function defsFor(ctx) {
  const sky = SKIES[ctx.mood];
  return `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="0.55" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>
<radialGradient id="sunG" cx="0.38" cy="0.35" r="0.9"><stop offset="0" stop-color="#fff3b0"/><stop offset="1" stop-color="#ffb703"/></radialGradient>
<linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#69b06f"/><stop offset="1" stop-color="#3c7a44"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d9bc4"/><stop offset="1" stop-color="#1668a0"/></linearGradient>
<linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.20"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.16"/></linearGradient>
<radialGradient id="vig" cx="0.5" cy="0.42" r="0.85"><stop offset="0.72" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.20"/></radialGradient>
</defs>`;
}

// Rangka adegan: manner menentukan perlakuan akhir.
function frame(ctx, inner, opts = {}) {
  const { manner } = ctx;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">${defsFor(ctx)}`;
  s += backdrop(ctx, opts.habitat || 'land');
  const flip = ctx.rng() < 0.5 ? -1 : 1;
  const outline = manner === 'Anime' ? ' stroke="#22303c" stroke-width="5" stroke-linejoin="round"' : '';
  ctx.outline = outline;
  s += `<g transform="translate(400 0) scale(${flip} 1) translate(-400 0)">${inner}</g>`;
  if (manner === 'Abstract') {
    s += `<g opacity="0.16"><circle cx="${f1(rr(ctx.rng, 90, 300))}" cy="${f1(rr(ctx.rng, 90, 300))}" r="${f1(rr(ctx.rng, 60, 130))}" fill="#ffffff"/><path d="M ${f1(rr(ctx.rng, 480, 640))} 800 L 800 800 L 800 ${f1(rr(ctx.rng, 420, 620))} Z" fill="#ffffff"/></g>`;
  }
  if (manner === 'Anime') {
    s += sparkle(rr(ctx.rng, 90, 200), rr(ctx.rng, 90, 200), 1.2, '#ffffff', 0.95) + sparkle(rr(ctx.rng, 580, 720), rr(ctx.rng, 120, 260), 0.9, '#ffffff', 0.9);
  }
  s += `<rect width="800" height="800" fill="url(#vig)"/></svg>`;
  return s;
}

// ---------- pelukis subyek ----------
const PAINTERS = {
  Dog: {
    habitat: 'land',
    paint(ctx) {
      const { rng, outline } = ctx;
      const cw = pick(rng, [
        { main: '#c98a4b', dark: '#9c652f', light: '#f3e2c7' },
        { main: '#8d6e63', dark: '#5d4037', light: '#e8d8c8' },
        { main: '#d9d9d9', dark: '#8a8a8a', light: '#ffffff' },
        { main: '#4a4a55', dark: '#2e2e38', light: '#c9c9d4' },
      ]);
      let s = `<ellipse cx="400" cy="700" rx="180" ry="86" fill="${cw.dark}"/>`;
      s += `<path d="M400 268 C 300 268 238 348 238 448 C 238 552 312 622 400 622 C 488 622 562 552 562 448 C 562 348 500 268 400 268 Z" fill="${cw.main}"${outline}/>`;
      s += `<path d="M252 330 C 210 380 206 470 236 540 C 252 576 292 570 296 522 C 299 470 292 380 278 330 Z" fill="${cw.dark}"/>`;
      s += `<path d="M548 330 C 590 380 594 470 564 540 C 548 576 508 570 504 522 C 501 470 508 380 522 330 Z" fill="${cw.dark}"/>`;
      if (rng() < 0.55) s += `<circle cx="318" cy="392" r="52" fill="${cw.dark}" opacity="0.55"/>`;
      s += `<ellipse cx="400" cy="516" rx="82" ry="58" fill="${cw.light}"/>`;
      s += `<ellipse cx="400" cy="484" rx="30" ry="20" fill="#33302e"/>`;
      s += `<path d="M400 504 L400 524 M400 524 C 384 540 360 538 348 524 M400 524 C 416 540 440 538 452 524" stroke="#33302e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      if (rng() < 0.5) s += `<path d="M382 540 C 382 574 392 592 400 592 C 408 592 418 574 418 540 Z" fill="#ef7d9b"/>`;
      s += `<circle cx="322" cy="428" r="17" fill="#26221f"/><circle cx="478" cy="428" r="17" fill="#26221f"/>`;
      s += `<circle cx="328" cy="421" r="6" fill="#ffffff"/><circle cx="484" cy="421" r="6" fill="#ffffff"/>`;
      s += `<path d="M282 396 Q 322 378 356 394 M444 394 Q 478 378 518 396" stroke="${cw.dark}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      s += `<path d="M238 448 C 238 348 300 268 400 268 C 500 268 562 348 562 448 C 562 470 558 492 550 512 C 520 400 470 330 400 330 C 330 330 280 400 250 512 C 242 492 238 470 238 448 Z" fill="url(#shade)"/>`;
      const collar = pick(rng, ['#e63946', '#4361ee', '#f0b90b', '#2a9d8f']);
      s += `<path d="M306 596 Q 400 648 494 596 L 486 626 Q 400 672 314 626 Z" fill="${collar}"/><circle cx="400" cy="646" r="15" fill="#ffd93d" stroke="#d9a404" stroke-width="3"/>`;
      return s;
    },
  },
  Cat: {
    habitat: 'land',
    paint(ctx) {
      const { rng, outline } = ctx;
      const cw = pick(rng, [
        { main: '#f2a65a', dark: '#c97b2d', light: '#ffe8cf' },
        { main: '#9aa3ad', dark: '#6e7780', light: '#eef1f4' },
        { main: '#3f3f46', dark: '#26262b', light: '#8f8f99' },
        { main: '#f5f0e6', dark: '#cfc4ae', light: '#ffffff' },
      ]);
      let s = `<ellipse cx="400" cy="706" rx="168" ry="80" fill="${cw.dark}"/>`;
      s += `<path d="M282 356 L258 218 L368 286 Z" fill="${cw.main}"${outline}/><path d="M518 356 L542 218 L432 286 Z" fill="${cw.main}"${outline}/>`;
      s += `<path d="M288 330 L276 252 L338 292 Z" fill="#f6b8c1"/><path d="M512 330 L524 252 L462 292 Z" fill="#f6b8c1"/>`;
      s += `<circle cx="400" cy="452" r="148" fill="${cw.main}"${outline}/>`;
      s += `<path d="M352 322 L352 352 M400 312 L400 344 M448 322 L448 352" stroke="${cw.dark}" stroke-width="10" stroke-linecap="round"/>`;
      s += `<ellipse cx="400" cy="520" rx="64" ry="44" fill="${cw.light}"/>`;
      const eye = pick(rng, ['#3f9d4e', '#e0a100', '#3d7bd9']);
      s += `<ellipse cx="326" cy="446" rx="21" ry="24" fill="${eye}"/><ellipse cx="474" cy="446" rx="21" ry="24" fill="${eye}"/>`;
      s += `<ellipse cx="326" cy="446" rx="7" ry="19" fill="#1d1d1f"/><ellipse cx="474" cy="446" rx="7" ry="19" fill="#1d1d1f"/>`;
      s += `<circle cx="332" cy="436" r="5" fill="#ffffff"/><circle cx="480" cy="436" r="5" fill="#ffffff"/>`;
      s += `<path d="M388 512 L412 512 L400 526 Z" fill="#e56b81"/>`;
      s += `<path d="M400 526 C 392 540 372 542 360 532 M400 526 C 408 540 428 542 440 532" stroke="#4a3436" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      s += `<g stroke="#5b5350" stroke-width="4" stroke-linecap="round" opacity="0.8"><path d="M276 492 L196 478 M280 516 L204 520 M284 540 L220 558 M524 492 L604 478 M520 516 L596 520 M516 540 L580 558"/></g>`;
      s += `<circle cx="400" cy="452" r="148" fill="url(#shade)"/>`;
      if (rng() < 0.5) s += `<path d="M318 618 Q 400 652 482 618 L 476 642 Q 400 674 324 642 Z" fill="#4361ee"/><circle cx="400" cy="652" r="12" fill="#ffd93d"/>`;
      return s;
    },
  },
  Owl: {
    habitat: 'land',
    paint(ctx) {
      const { rng, outline } = ctx;
      const cw = pick(rng, [
        { main: '#8a6642', dark: '#5f4527', light: '#e9dcc3' },
        { main: '#7a7f9a', dark: '#4c5069', light: '#e3e6f2' },
        { main: '#a0522d', dark: '#6f3719', light: '#f0d9bd' },
      ]);
      let s = `<path d="M120 668 Q 400 628 680 668 L 680 692 Q 400 656 120 692 Z" fill="#6b4a2f"/>`;
      s += `<path d="M180 660 Q 240 620 300 646 M520 646 Q 590 616 640 652" stroke="#54381f" stroke-width="14" fill="none" stroke-linecap="round"/>`;
      s += `<ellipse cx="400" cy="470" rx="128" ry="168" fill="${cw.main}"${outline}/>`;
      s += `<path d="M282 380 C 250 470 256 560 300 622 C 276 520 282 440 306 372 Z" fill="${cw.dark}"/><path d="M518 380 C 550 470 544 560 500 622 C 524 520 518 440 494 372 Z" fill="${cw.dark}"/>`;
      s += `<ellipse cx="400" cy="528" rx="76" ry="98" fill="${cw.light}"/>`;
      for (let r = 0; r < 3; r++) for (let i = -1; i <= 1; i++) {
        s += `<path d="M ${400 + i * 38 - 13} ${478 + r * 36} Q 400 ${478 + r * 36 + 12} ${400 + i * 38 + 13} ${478 + r * 36}" stroke="${cw.dark}" stroke-width="5" fill="none" opacity="0.5"/>`;
      }
      s += `<circle cx="400" cy="372" r="86" fill="${cw.light}"/>`;
      s += `<circle cx="362" cy="376" r="30" fill="#ffffff"/><circle cx="438" cy="376" r="30" fill="#ffffff"/>`;
      s += `<circle cx="362" cy="378" r="16" fill="#23202b"/><circle cx="438" cy="378" r="16" fill="#23202b"/>`;
      s += `<circle cx="368" cy="371" r="6" fill="#ffffff"/><circle cx="444" cy="371" r="6" fill="#ffffff"/>`;
      s += `<path d="M388 408 L412 408 L400 424 Z" fill="#f0a202"/>`;
      s += `<path d="M306 292 L282 244 L332 268 Z M494 292 L518 244 L468 268 Z" fill="${cw.dark}"/>`;
      s += `<ellipse cx="400" cy="470" rx="128" ry="168" fill="url(#shade)"/>`;
      s += `<path d="M356 640 L356 662 M444 640 L444 662" stroke="#f0a202" stroke-width="9" stroke-linecap="round"/>`;
      return s;
    },
  },
  Fox: {
    habitat: 'land',
    paint(ctx) {
      const { rng, outline } = ctx;
      const main = pick(rng, ['#e8762d', '#d9622b', '#ef8f43']);
      const dark = '#8a4416', cream = '#fff3e2';
      let s = `<path d="M520 700 C 640 690 700 610 668 520 C 700 606 620 716 500 724 C 560 690 570 640 540 600 Z" fill="${main}"/>`;
      s += `<path d="M668 520 C 700 606 620 716 500 724 C 540 700 560 668 556 630 L 640 560 Z" fill="${cream}"/>`;
      s += `<ellipse cx="360" cy="662" rx="150" ry="76" fill="${main}"/>`;
      s += `<ellipse cx="360" cy="676" rx="62" ry="44" fill="${cream}"/>`;
      s += `<path d="M268 330 L238 176 L356 258 Z" fill="${main}"${outline}/><path d="M452 330 L482 176 L364 258 Z" fill="${main}"${outline}/>`;
      s += `<path d="M272 300 L258 214 L322 262 Z" fill="#5b3413"/><path d="M448 300 L462 214 L398 262 Z" fill="#5b3413"/>`;
      s += `<path d="M360 252 C 268 252 208 330 208 428 C 208 520 282 596 360 596 C 438 596 512 520 512 428 C 512 330 452 252 360 252 Z" fill="${main}"${outline}/>`;
      s += `<path d="M360 596 C 300 596 238 548 218 486 C 262 512 300 470 360 470 C 420 470 458 512 502 486 C 482 548 420 596 360 596 Z" fill="${cream}"/>`;
      s += `<ellipse cx="360" cy="512" rx="34" ry="24" fill="#2e2019"/>`;
      s += `<circle cx="292" cy="420" r="15" fill="#2e2019"/><circle cx="428" cy="420" r="15" fill="#2e2019"/>`;
      s += `<circle cx="297" cy="414" r="5" fill="#ffffff"/><circle cx="433" cy="414" r="5" fill="#ffffff"/>`;
      s += `<path d="M208 428 C 208 330 268 252 360 252 C 452 252 512 330 512 428 C 512 448 508 468 501 486 C 470 360 430 306 360 306 C 290 306 250 360 219 486 C 212 468 208 448 208 428 Z" fill="url(#shade)"/>`;
      return s;
    },
  },
  Whale: {
    habitat: 'sea',
    paint(ctx) {
      const { rng, outline } = ctx;
      const cw = pick(rng, [
        { main: '#4a7fb5', dark: '#2f5d8a', light: '#dceefb' },
        { main: '#5b8def', dark: '#3560b8', light: '#e3efff' },
        { main: '#6c7a89', dark: '#46525e', light: '#e8edf1' },
      ]);
      let s = `<path d="M636 300 C 690 250 736 244 762 262 C 742 292 736 322 744 356 C 706 366 664 348 632 322 Z" fill="${cw.dark}"/>`;
      s += `<path d="M96 420 C 130 322 250 258 420 258 C 560 258 664 320 668 386 C 670 440 606 506 470 528 C 320 552 160 520 112 470 C 94 450 88 438 96 420 Z" fill="${cw.main}"${outline}/>`;
      s += `<path d="M112 470 C 160 520 320 552 470 528 C 540 516 596 492 630 462 C 540 486 300 500 168 452 C 140 442 118 452 112 470 Z" fill="${cw.light}"/>`;
      for (let i = 0; i < 4; i++) s += `<path d="M ${190 + i * 22} 500 Q 330 534 520 500" stroke="${cw.dark}" stroke-width="5" fill="none" opacity="0.35" transform="translate(0 ${i * -11})"/>`;
      s += `<path d="M330 500 C 350 548 396 570 430 560 C 420 524 386 498 352 488 Z" fill="${cw.dark}"/>`;
      s += `<circle cx="196" cy="404" r="13" fill="#14304d"/><circle cx="201" cy="399" r="5" fill="#ffffff"/>`;
      s += `<path d="M140 452 Q 176 466 214 454" stroke="#14304d" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      s += `<g fill="#bfe6ff"><path d="M392 236 C 380 204 392 176 404 156 C 416 176 428 204 416 236 Z"/><path d="M340 244 C 322 220 324 192 332 172 C 348 190 356 218 352 244 Z"/><path d="M448 244 C 442 216 452 190 464 174 C 474 196 470 224 460 246 Z"/></g>`;
      s += `<circle cx="404" cy="252" r="7" fill="#bfe6ff"/><circle cx="352" cy="258" r="5" fill="#bfe6ff"/><circle cx="452" cy="260" r="5" fill="#bfe6ff"/>`;
      return s;
    },
  },
  'Mountain Lake': {
    habitat: 'sea',
    paint(ctx) {
      const { rng } = ctx;
      const rock = pick(rng, ['#5d6d8c', '#6b7a90', '#54627f']);
      const rockD = '#3d4a63';
      let s = `<path d="M60 560 L 300 210 L 430 400 L 520 250 L 740 560 Z" fill="${rock}"/>`;
      s += `<path d="M300 210 L 430 400 L 380 400 L 300 300 L 226 400 L 168 400 Z" fill="${rockD}" opacity="0.6"/>`;
      s += `<path d="M252 282 L 300 210 L 348 282 L 322 258 L 300 282 L 278 258 Z" fill="#ffffff"/>`;
      s += `<path d="M478 312 L 520 250 L 562 312 L 538 292 L 520 314 L 500 292 Z" fill="#ffffff"/>`;
      s += `<path d="M60 560 L 300 210 L 430 400 L 520 250 L 740 560 Z" fill="url(#shade)"/>`;
      s += pine(120, 580, 1.5, '#1f5138') + pine(196, 596, 1.1, '#276544') + pine(648, 588, 1.35, '#1f5138') + pine(584, 602, 1, '#276544');
      s += `<ellipse cx="400" cy="600" rx="150" ry="10" fill="#ffffff" opacity="0.25"/>`;
      s += `<path d="M286 622 q 30 -10 60 0 q 30 10 60 0 M 420 650 q 26 -9 52 0 q 26 9 52 0" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.4" stroke-linecap="round"/>`;
      return s;
    },
  },
  Lighthouse: {
    habitat: 'sea',
    paint(ctx) {
      const { rng, outline } = ctx;
      const beam = rng() < 0.5 ? -1 : 1;
      let s = '';
      if (ctx.mood === 'night' || ctx.mood === 'dusk') {
        s += `<polygon points="392,196 ${beam > 0 ? 790 : 10},${beam > 0 ? 120 : 110} ${beam > 0 ? 790 : 10},${beam > 0 ? 300 : 290}" fill="#ffedb0" opacity="0.30"/>`;
      }
      s += `<path d="M268 640 C 300 566 350 542 400 542 C 450 542 500 566 532 640 C 540 664 520 684 400 684 C 280 684 260 664 268 640 Z" fill="#4c4f57"/>`;
      s += `<path d="M352 560 L 366 300 L 434 300 L 448 560 Z" fill="#f4f1ea"${outline}/>`;
      s += `<path d="M358 470 L 442 470 L 446 536 L 354 536 Z M363 380 L 437 380 L 440 434 L 360 434 Z" fill="#e63946"/>`;
      s += `<rect x="356" y="262" width="88" height="14" rx="6" fill="#37404a"/>`;
      s += `<rect x="368" y="206" width="64" height="58" rx="8" fill="#ffd93d"/><rect x="368" y="206" width="64" height="58" rx="8" fill="url(#sunG)"/>`;
      s += `<path d="M356 206 L 444 206 L 400 158 Z" fill="#37404a"/>`;
      s += `<circle cx="400" cy="235" r="52" fill="#ffd93d" opacity="0.28"/>`;
      s += `<rect x="330" y="556" width="140" height="12" rx="6" fill="#37404a"/>`;
      s += `<path d="M352 560 L 366 300 L 434 300 L 448 560 Z" fill="url(#shade)"/>`;
      return s;
    },
  },
  'Hot Air Balloon': {
    habitat: 'land',
    paint(ctx) {
      const { rng, outline } = ctx;
      const cols = pick(rng, [
        ['#e63946', '#f4f1ea', '#4361ee'],
        ['#f4841f', '#ffd93d', '#e63946'],
        ['#2a9d8f', '#f4f1ea', '#f4841f'],
        ['#7b5ea7', '#f6b8c1', '#4361ee'],
      ]);
      let s = `<path d="M400 84 C 512 84 588 168 588 268 C 588 348 528 404 466 442 L 334 442 C 272 404 212 348 212 268 C 212 168 288 84 400 84 Z" fill="${cols[0]}"${outline}/>`;
      s += `<path d="M400 84 C 448 84 484 168 484 268 C 484 344 458 404 430 442 L 370 442 C 342 404 316 344 316 268 C 316 168 352 84 400 84 Z" fill="${cols[1]}"/>`;
      s += `<path d="M400 84 C 420 84 434 168 434 268 C 434 344 424 404 414 442 L 386 442 C 376 404 366 344 366 268 C 366 168 380 84 400 84 Z" fill="${cols[2]}"/>`;
      s += `<path d="M212 268 C 212 348 272 404 334 442 L 466 442 C 528 404 588 348 588 268 C 588 290 584 310 576 328 C 500 372 300 372 224 328 C 216 310 212 290 212 268 Z" fill="url(#shade)"/>`;
      s += `<path d="M340 442 L 366 512 M460 442 L 434 512" stroke="#5b4632" stroke-width="6"/>`;
      s += `<path d="M352 512 L 448 512 L 438 574 L 362 574 Z" fill="#9c6642"${outline}/>`;
      s += `<rect x="352" y="512" width="96" height="13" rx="5" fill="#6f4525"/>`;
      s += cloud(140, 300, 0.9, 0.85) + cloud(648, 380, 0.75, 0.8);
      return s;
    },
  },
};

Object.assign(PAINTERS, {
  Rocket: {
    habitat: 'space',
    paint(ctx) {
      const { rng, outline } = ctx;
      const accent = pick(rng, ['#e63946', '#4361ee', '#f4841f', '#2a9d8f']);
      let s = `<g transform="rotate(${f1(rr(rng, -9, 9))} 400 420)">`;
      s += `<path d="M400 596 C 428 640 424 684 400 716 C 376 684 372 640 400 596 Z" fill="#f4841f"/>`;
      s += `<path d="M400 612 C 416 640 414 668 400 690 C 386 668 384 640 400 612 Z" fill="#ffd93d"/>`;
      s += `<path d="M316 470 C 276 520 262 576 276 606 C 304 600 330 576 342 540 Z" fill="${accent}"/><path d="M484 470 C 524 520 538 576 524 606 C 496 600 470 576 458 540 Z" fill="${accent}"/>`;
      s += `<path d="M400 108 C 470 190 486 300 486 420 C 486 510 452 580 400 580 C 348 580 314 510 314 420 C 314 300 330 190 400 108 Z" fill="#eef1f4"${outline}/>`;
      s += `<path d="M400 108 C 436 152 460 214 472 286 L 328 286 C 340 214 364 152 400 108 Z" fill="${accent}"/>`;
      s += `<path d="M314 470 L 486 470 C 482 522 450 580 400 580 C 350 580 318 522 314 470 Z" fill="${accent}" opacity="0.9"/>`;
      s += `<circle cx="400" cy="380" r="52" fill="#8fd0e8" stroke="#37404a" stroke-width="10"/>`;
      s += `<path d="M370 352 A 38 38 0 0 1 404 344" stroke="#ffffff" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.85"/>`;
      s += `<path d="M330 300 C 322 360 322 420 330 470 C 318 420 318 360 330 300 Z" fill="url(#shade)"/>`;
      s += `</g>`;
      s += `<g fill="#ffffff" opacity="0.16"><circle cx="238" cy="640" r="30"/><circle cx="560" cy="664" r="38"/><circle cx="620" cy="620" r="22"/></g>`;
      return s;
    },
  },
  Castle: {
    habitat: 'land',
    paint(ctx) {
      const { rng, outline } = ctx;
      const roof = pick(rng, ['#7b5ea7', '#4361ee', '#b33951', '#2a6f97']);
      const wall = '#ddd6c4', wallD = '#b8ae94';
      let s = `<ellipse cx="400" cy="668" rx="290" ry="66" fill="#4c8a52"/>`;
      s += `<path d="M368 742 C 380 690 382 660 376 622 L 424 622 C 418 660 420 690 432 742 Z" fill="#e8ddba"/>`;
      const tower = (x, w, top, h) => {
        let t = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"${outline}/>`;
        t += `<path d="M ${x - 10} ${top} L ${x + w / 2} ${top - 74} L ${x + w + 10} ${top} Z" fill="${roof}"/>`;
        t += `<rect x="${x + w / 2 - 12}" y="${top + 40}" width="24" height="34" rx="11" fill="#ffedb0"/>`;
        t += `<path d="M ${x + w / 2} ${top - 74} L ${x + w / 2} ${top - 102} L ${x + w / 2 + 26} ${top - 92} L ${x + w / 2} ${top - 82}" fill="#e63946"/>`;
        return t;
      };
      s += tower(238, 84, 348, 276);
      s += tower(478, 84, 348, 276);
      s += `<rect x="316" y="396" width="168" height="228" fill="${wallD}"${outline}/>`;
      s += tower(344, 112, 268, 190);
      s += `<path d="M356 624 L 356 548 C 356 516 444 516 444 548 L 444 624 Z" fill="#4a3a28"/>`;
      s += `<rect x="382" y="452" width="36" height="44" rx="17" fill="#ffedb0"/>`;
      s += pine(150, 668, 1.25, '#1f5138') + pine(650, 668, 1.25, '#1f5138');
      return s;
    },
  },
  'Great Tree': {
    habitat: 'land',
    paint(ctx) {
      const { rng } = ctx;
      const greens = ['#3e7d3a', '#4c8a44', '#5da24f', '#356e33'];
      let s = `<path d="M368 706 C 375 620 379 540 377 428 L 425 428 C 421 540 425 620 432 706 Z" fill="#7a4f2c"/>`;
      s += `<path d="M380 476 C 342 434 310 422 280 430 C 322 466 352 492 377 506 Z" fill="#7a4f2c"/>`;
      s += `<path d="M423 452 C 480 428 532 426 568 442 L 563 460 C 520 452 468 458 426 474 Z" fill="#7a4f2c"/>`;
      s += `<path d="M377 428 C 379 540 376 620 368 706 L 400 706 C 398 610 398 520 400 428 Z" fill="#5f3c20" opacity="0.55"/>`;
      const blobs = [[400, 240, 128], [292, 300, 92], [508, 300, 92], [340, 180, 84], [466, 176, 86], [400, 330, 100], [240, 380, 62], [560, 380, 62]];
      blobs.forEach(([x, y, r], i) => { s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${greens[i % 4]}"/>`; });
      s += `<circle cx="352" cy="220" r="70" fill="#6cb85e" opacity="0.7"/><circle cx="470" cy="280" r="56" fill="#6cb85e" opacity="0.55"/>`;
      const fruit = pick(rng, ['#e63946', '#ffd93d', '#ff9f1c']);
      for (let i = 0; i < 12; i++) s += `<circle cx="${f1(rr(rng, 226, 574))}" cy="${f1(rr(rng, 150, 400))}" r="9" fill="${fruit}"/>`;
      s += `<path d="M434 470 L 560 448 M560 448 L 556 540 M560 448 L 564 540" stroke="#5f3c20" stroke-width="5"/>`;
      s += `<rect x="520" y="540" width="84" height="13" rx="6" fill="#9c6642"/>`;
      s += flowers(rng, 716, ['#ff8fab', '#ffd93d', '#c77dff', '#ffffff'], 10);
      return s;
    },
  },
  'City Skyline': {
    habitat: 'land',
    paint(ctx) {
      const { rng } = ctx;
      let s = `<rect y="300" width="800" height="500" fill="#141d33"/>`;
      const rows = [
        { base: 640, col: '#232f4d', hMin: 150, hMax: 300 },
        { base: 668, col: '#0e1626', hMin: 190, hMax: 360 },
      ];
      for (const row of rows) {
        let x = -10;
        while (x < 800) {
          const w = rr(rng, 62, 118), h = rr(rng, row.hMin, row.hMax), top = row.base - h;
          s += `<rect x="${f1(x)}" y="${f1(top)}" width="${f1(w)}" height="${f1(h)}" fill="${row.col}"/>`;
          if (rng() < 0.4) s += `<rect x="${f1(x + w / 2 - 4)}" y="${f1(top - 18)}" width="8" height="18" fill="${row.col}"/>`;
          const cols = Math.max(2, Math.floor(w / 22)), rowsN = Math.max(3, Math.floor(h / 30));
          for (let cx = 0; cx < cols; cx++) for (let cy = 0; cy < rowsN; cy++) {
            if (rng() < 0.42) s += `<rect x="${f1(x + 9 + cx * 22)}" y="${f1(top + 12 + cy * 30)}" width="10" height="14" fill="#ffd93d" opacity="${f1(rr(rng, 0.5, 1))}"/>`;
          }
          x += w + rr(rng, 4, 16);
        }
      }
      s += `<rect y="640" width="800" height="160" fill="#0a1120"/>`;
      s += `<path d="M610 640 L610 560 L646 560 L646 640 M618 560 L618 534 L638 534 L638 560" fill="#0e1626"/>`;
      return s;
    },
  },
  Koi: {
    habitat: 'pond',
    paint(ctx) {
      const { rng } = ctx;
      const fish = (cx, cy, rot, c1, c2) => {
        let g = `<g transform="translate(${cx} ${cy}) rotate(${rot})">`;
        g += `<path d="M -130 0 C -70 -52 60 -56 128 -8 C 158 -22 178 -38 190 -58 C 186 -22 178 8 190 44 C 176 24 156 8 128 0 C 60 50 -70 52 -130 0 Z" fill="${c1}"/>`;
        g += `<path d="M -60 -26 C -20 -40 30 -38 62 -18 C 34 -6 -24 -4 -60 -14 Z" fill="${c2}"/><circle cx="66" cy="-6" r="13" fill="${c2}"/><circle cx="-108" cy="-4" r="6" fill="#20303c"/><path d="M -20 34 C 0 52 26 54 44 42 C 26 30 2 28 -20 34 Z" fill="${c2}" opacity="0.85"/>`;
        g += `</g>`;
        return g;
      };
      let s = `<g fill="none" stroke="#ffffff" opacity="0.3"><circle cx="400" cy="330" r="60"/><circle cx="400" cy="330" r="96" opacity="0.6"/><circle cx="150" cy="620" r="40"/></g>`;
      s += fish(400, 330, rr(rng, -14, 14), '#f4841f', '#ffffff');
      s += fish(215, 590, rr(rng, 140, 175), '#f4f1ea', '#e63946');
      s += `<g fill="#3e8e4f"><path d="M648 600 a52 52 0 1 1 20 -50 l -20 34 Z"/><path d="M120 300 a40 40 0 1 1 16 -38 l -16 26 Z"/></g>`;
      s += `<g fill="#ff8fab"><circle cx="664" cy="566" r="11"/><circle cx="646" cy="578" r="9"/><circle cx="682" cy="578" r="9"/><circle cx="664" cy="580" r="6" fill="#ffd93d"/></g>`;
      return s;
    },
  },
  Butterfly: {
    habitat: 'land',
    paint(ctx) {
      const { rng, outline } = ctx;
      const cw = pick(rng, [
        { w1: '#7b5ea7', w2: '#c77dff', spot: '#ffd93d' },
        { w1: '#e56b9b', w2: '#ff9ec4', spot: '#ffffff' },
        { w1: '#4361ee', w2: '#7aa2ff', spot: '#ffd93d' },
        { w1: '#f4841f', w2: '#ffb35c', spot: '#7b2d12' },
      ]);
      const wing = (side) => {
        let g = `<g transform="translate(400 420) scale(${side} 1)">`;
        g += `<path d="M -14 -16 C -120 -150 -268 -128 -262 -34 C -258 28 -160 34 -20 22 Z" fill="${cw.w1}"${outline}/>`;
        g += `<path d="M -16 26 C -130 30 -216 84 -192 142 C -172 190 -64 138 -14 62 Z" fill="${cw.w2}"${outline}/>`;
        g += `<circle cx="-168" cy="-52" r="30" fill="${cw.spot}" opacity="0.9"/><circle cx="-112" cy="-16" r="16" fill="${cw.spot}" opacity="0.75"/><circle cx="-118" cy="98" r="17" fill="${cw.spot}" opacity="0.85"/>`;
        g += `</g>`;
        return g;
      };
      let s = wing(1) + wing(-1);
      s += `<ellipse cx="400" cy="428" rx="21" ry="86" fill="#33302e"/>`;
      s += `<circle cx="400" cy="330" r="24" fill="#33302e"/>`;
      s += `<path d="M388 312 C 366 278 340 262 316 258 M412 312 C 434 278 460 262 484 258" stroke="#33302e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      s += `<circle cx="316" cy="258" r="7" fill="#33302e"/><circle cx="484" cy="258" r="7" fill="#33302e"/>`;
      s += `<circle cx="391" cy="326" r="5" fill="#ffffff"/><circle cx="409" cy="326" r="5" fill="#ffffff"/>`;
      s += flowers(rng, 724, ['#ff8fab', '#ffd93d', '#c77dff', '#ffffff'], 12);
      return s;
    },
  },
  Sailboat: {
    habitat: 'sea',
    paint(ctx) {
      const { rng, outline } = ctx;
      const hullC = pick(rng, ['#b33951', '#2a6f97', '#9c6642', '#2a9d8f']);
      let s = `<path d="M404 210 L 404 486 L 560 486 Z" fill="#f4f1ea"${outline}/>`;
      s += `<path d="M388 300 L 388 486 L 268 486 Z" fill="${pick(rng, ['#ffd93d', '#ff8fab', '#8fd0e8'])}"${outline}/>`;
      s += `<rect x="394" y="176" width="12" height="330" rx="5" fill="#6f4525"/>`;
      s += `<path d="M406 182 L 448 196 L 406 210 Z" fill="#e63946"/>`;
      s += `<path d="M238 506 L 586 506 L 540 592 C 470 616 350 616 282 592 Z" fill="${hullC}"${outline}/>`;
      s += `<rect x="238" y="506" width="348" height="16" fill="#37404a" opacity="0.35"/>`;
      s += `<path d="M238 506 L 586 506 L 540 592 C 470 616 350 616 282 592 Z" fill="url(#shade)"/>`;
      s += `<g fill="#ffffff" opacity="0.5"><ellipse cx="330" cy="640" rx="70" ry="8"/><ellipse cx="520" cy="668" rx="86" ry="9"/></g>`;
      return s;
    },
  },
  Panda: {
    habitat: 'land',
    paint(ctx) {
      const { rng, outline } = ctx;
      let s = `<g stroke="#3e8e4f" stroke-width="13"><path d="M118 700 L 128 380 M168 700 L 162 420"/></g>`;
      s += `<g fill="#57ab63"><ellipse cx="112" cy="356" rx="42" ry="15" transform="rotate(-32 112 356)"/><ellipse cx="176" cy="396" rx="40" ry="14" transform="rotate(28 176 396)"/><ellipse cx="106" cy="452" rx="36" ry="13" transform="rotate(-18 106 452)"/></g>`;
      s += `<ellipse cx="400" cy="700" rx="170" ry="88" fill="#33302e"/>`;
      s += `<circle cx="272" cy="330" r="56" fill="#33302e"/><circle cx="528" cy="330" r="56" fill="#33302e"/>`;
      s += `<circle cx="400" cy="452" r="150" fill="#f7f5ef"${outline}/>`;
      s += `<ellipse cx="400" cy="700" rx="96" ry="52" fill="#f7f5ef"/>`;
      s += `<ellipse cx="330" cy="438" rx="30" ry="40" fill="#33302e" transform="rotate(-18 330 438)"/><ellipse cx="470" cy="438" rx="30" ry="40" fill="#33302e" transform="rotate(18 470 438)"/>`;
      s += `<circle cx="334" cy="432" r="11" fill="#ffffff"/><circle cx="466" cy="432" r="11" fill="#ffffff"/>`;
      s += `<circle cx="336" cy="434" r="6" fill="#1d1d1f"/><circle cx="464" cy="434" r="6" fill="#1d1d1f"/>`;
      s += `<ellipse cx="400" cy="500" rx="19" ry="13" fill="#33302e"/>`;
      s += `<path d="M400 513 C 394 528 376 532 364 524 M400 513 C 406 528 424 532 436 524" stroke="#33302e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      if (rng() < 0.45) s += `<path d="M508 560 C 540 540 576 544 596 568 C 572 592 532 592 508 574 Z" fill="#57ab63"/>`;
      s += `<circle cx="400" cy="452" r="150" fill="url(#shade)"/>`;
      return s;
    },
  },
});

// ---------- komposisi + tulis ----------
function compose(id) {
  const manner = STYLES[id % 4];
  const subject = subjectOf(id);
  const rng = mulberry32(hashId(id));
  let mood = pick(rng, MOODS_BY_MANNER[manner]);
  if (subject === 'Rocket') mood = 'night';
  if (subject === 'City Skyline') mood = pick(rng, ['night', 'dusk', 'night']);
  const ctx = { rng, manner, mood, outline: manner === 'Anime' ? ' stroke="#22303c" stroke-width="5" stroke-linejoin="round"' : '' };
  const painter = PAINTERS[subject];
  const inner = painter.paint(ctx);
  const svg = frame(ctx, inner, { habitat: painter.habitat });
  return { svg, manner, subject, mood };
}

function main() {
  mkdirSync(ART_DIR, { recursive: true });
  mkdirSync(META_DIR, { recursive: true });
  let totalBytes = 0;
  const moodName = { day: 'Day', dawn: 'Dawn', dusk: 'Dusk', night: 'Night' };
  for (let id = 1; id <= 6000; id++) {
    const { svg, manner, subject, mood } = compose(id);
    writeFileSync(join(ART_DIR, `${id}.svg`), svg);
    totalBytes += svg.length;
    const meta = {
      name: `Doodle Lab #${id}`,
      description: `An original illustrated scene from Doodle Lab on BNB Chain: ${subject} in the ${manner} manner, drawn by the studio engine from seed ${id}. Minting this NFT pays its minter a 250,000 $DLAB bonus.`,
      image: `${SITE}/metadata/art/${id}.svg`,
      attributes: [
        { trait_type: 'Style', value: manner },
        { trait_type: 'Subject', value: subject },
        { trait_type: 'Mood', value: moodName[mood] },
        { trait_type: 'Seed', value: id },
        { trait_type: 'Bonus', value: '250,000 DLAB' },
      ],
    };
    writeFileSync(join(META_DIR, `${id}.json`), JSON.stringify(meta, null, 2));
  }
  console.log(`Selesai: 6.000 artwork + metadata. Total SVG ${(totalBytes / 1e6).toFixed(1)} MB, rata-rata ${(totalBytes / 6000 / 1024).toFixed(1)} KB/file`);
}

if (process.argv[1] && process.argv[1].endsWith('generate-art-v2.mjs')) main();
export { compose };
