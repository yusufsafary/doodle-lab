# Membuat public/og.jpg (1200x630) untuk Doodle Lab.
# Artwork panel dirender dari algoritma CanvasArt yang sama persis
# (PRNG, palet, urutan gambar) memakai PIL. Jalankan: python3 scripts/make-og.py
from PIL import Image, ImageDraw, ImageFont

PALETTES = {
    'Fantasy': ['#2a0845', '#6441A5', '#FF6B6B', '#FFD93D'],
    'Realistic': ['#2C3E50', '#3498DB', '#E74C3C', '#ECF0F1'],
    'Anime': ['#FF9A9E', '#FECFEF', '#A1C4FD', '#C2E9FB'],
    'Abstract': ['#000000', '#FF6B6B', '#FFD93D', '#00D4AA'],
}
STYLES = ['Fantasy', 'Realistic', 'Anime', 'Abstract']
W = H = 400


def hx(c):
    c = c.lstrip('#')
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))


def make_random(seed):
    state = {'s': seed}

    def rnd():
        state['s'] = (state['s'] * 9301 + 49297) % 233280
        return state['s'] / 233280

    return rnd


def gradient_tile(d, c1, c2):
    """Tile gradasi diagonal c1(alpha 128) ke c2(alpha 204) ukuran d x d."""
    base = Image.linear_gradient('L').resize((d, d)).rotate(-45, resample=Image.BILINEAR, expand=False)
    chans = []
    for k in range(3):
        lut = [round(c1[k] + (c2[k] - c1[k]) * i / 255) for i in range(256)]
        chans.append(base.point(lut))
    alpha = base.point([round(128 + (204 - 128) * i / 255) for i in range(256)])
    return Image.merge('RGBA', (*chans, alpha))


def render_art(token_id):
    style = STYLES[token_id % 4]
    colors = [hx(c) for c in PALETTES[style]]
    rnd = make_random(token_id)
    img = Image.new('RGBA', (W, H), colors[0] + (255,))
    shape_count = 5 + int(rnd() * 10)
    for _ in range(shape_count):
        is_circle = rnd() > 0.5
        x, y = rnd() * W, rnd() * H
        size = 20 + rnd() * 100
        c1 = colors[1 + int(rnd() * (len(colors) - 1))]
        c2 = colors[1 + int(rnd() * (len(colors) - 1))]
        d = max(2, int(2 * size))
        tile = gradient_tile(d, c1, c2)
        mask = Image.new('L', (d, d), 0)
        md = ImageDraw.Draw(mask)
        if is_circle:
            md.ellipse([0, 0, d, d], fill=255)
        else:
            md.polygon([(d / 2, 0), (d, d), (0, d)], fill=255)
        img.paste(tile, (int(x - size), int(y - size)), mask)
    return img.convert('RGB')


def diamond(draw, cx, cy, r, color):
    draw.polygon([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)], fill=color)


def binance_mark(size=40):
    mark = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(mark)
    yellow = (240, 185, 11, 255)
    c = size / 2
    r = size * 0.16
    diamond(d, c, c, r, yellow)
    dist = r * 2.12
    for dx, dy in [(0, -dist), (0, dist), (-dist, 0), (dist, 0)]:
        diamond(d, c + dx, c + dy, r * 0.94, yellow)
    dd = r * 1.5
    for dx, dy in [(-dd, -dd), (dd, -dd), (-dd, dd), (dd, dd)]:
        diamond(d, c + dx, c + dy, r * 0.52, yellow)
    return mark


def main():
    card = Image.new('RGB', (1200, 630), (0, 0, 0))
    draw = ImageDraw.Draw(card)
    bold = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
    regular = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'

    # Panel artwork 2x2 di kanan: token asli dari koleksi
    panel = 256
    gap = 14
    x0, y0 = 1200 - 2 * panel - gap - 40, (630 - (2 * panel + gap)) // 2
    for i, tid in enumerate([7, 123, 2024, 5555]):
        art = render_art(tid).resize((panel, panel), Image.LANCZOS)
        px = x0 + (i % 2) * (panel + gap)
        py = y0 + (i // 2) * (panel + gap)
        card.paste(art, (px, py))
        ImageDraw.Draw(card).rectangle([px, py, px + panel - 1, py + panel - 1], outline=(255, 255, 255), width=2)

    # Teks kiri
    f_brand = ImageFont.truetype(bold, 92)
    draw.text((56, 150), 'Doodle', font=f_brand, fill=(255, 255, 255))
    w_doodle = draw.textlength('Doodle', font=f_brand)
    draw.text((56 + w_doodle, 150), 'Lab', font=f_brand, fill=(255, 107, 107))
    f_h = ImageFont.truetype(bold, 40)
    draw.text((56, 268), 'Doodle Agentic Pass', font=f_h, fill=(255, 255, 255))
    f_p = ImageFont.truetype(regular, 30)
    draw.text((56, 336), 'Mint free. Earn 250,000 $DLAB', font=f_p, fill=(190, 190, 190))
    draw.text((56, 376), 'per NFT.', font=f_p, fill=(190, 190, 190))

    # Lockup BNB di kiri bawah
    mark = binance_mark(44)
    card.paste(mark, (56, 630 - 120), mark)
    f_bnb = ImageFont.truetype(bold, 25)
    draw.text((116, 630 - 110), 'BUILT ON BNB CHAIN', font=f_bnb, fill=(240, 185, 11))

    card.save('public/og.jpg', quality=88)
    print('public/og.jpg written')


if __name__ == '__main__':
    main()
