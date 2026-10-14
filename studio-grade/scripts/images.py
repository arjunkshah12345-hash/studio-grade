#!/usr/bin/env python3
"""Studio Grade image helper for generated series (imagery.md §8). Needs Pillow; numpy makes cutout better.

  python3 images.py paper  SRC OUT --to '#F3ECDF'      map the image's paper to the bible's paper (one series, one paper)
  python3 images.py paper  SRC OUT --to white          divide the paper out to white, for mix-blend-mode:multiply on any ground
  python3 images.py cutout SHEET --grid 3x2 --out DIR --names fox,rocket,teapot,moon,umbrella,dragon [--prefix toy-]
  python3 images.py export SRC --out DIR --name hero [--widths 960,1916] [--crop x,y,w,h] [--flat]

Sources are read-only: every command refuses to write over its input, and cutout/export always write new names.
"""
import argparse, os, sys
from PIL import Image, ImageDraw, ImageFilter

try:
    import numpy as np
except ImportError:  # cutout still works, without hole removal and edge un-premultiplying
    np = None


def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def paper_of(im, patch=24):
    """Median colour of the four corner patches: the generator's paper."""
    w, h = im.size
    px = []
    for x0, y0 in ((0, 0), (w - patch, 0), (0, h - patch), (w - patch, h - patch)):
        c = im.crop((x0, y0, x0 + patch, y0 + patch))
        px += list(c.get_flattened_data() if hasattr(c, 'get_flattened_data') else c.getdata())
    return tuple(sorted(p[c] for p in px)[len(px) // 2] for c in range(3))


def guard(src, out):
    if os.path.abspath(src) == os.path.abspath(out):
        sys.exit(f'refusing to overwrite the source {src}: write processed files under new names')


def cmd_paper(a):
    guard(a.src, a.out)
    im = Image.open(a.src).convert('RGB')
    p = paper_of(im)
    if a.to == 'white':  # v * 255 / (paper - 3): the paper (and anything lighter) becomes pure white
        lut = [min(255, round(v * 255 / max(1, p[c] - 3))) for c in range(3) for v in range(256)]
    else:
        t = hex_rgb(a.to)
        lut = [min(255, round(v * t[c] / max(1, p[c]))) for c in range(3) for v in range(256)]
    im.point(lut).save(a.out, quality=95) if a.out.lower().endswith(('.jpg', '.jpeg')) else im.point(lut).save(a.out)
    print(f'paper {"#%02X%02X%02X" % p} → {a.to}: {a.out}')


def bg_like(rgb):
    """Background test: near white, or a neutral light grey (contact shadows on a white sheet)."""
    r, g, b = rgb
    d = 255 - min(rgb)
    sat = max(rgb) - min(rgb)
    return d < 12 or (min(rgb) > 120 and sat < 30 and abs(g - b) < 10 and d < 110)


def components(binary, open_px=5, limit=200):
    """Yield (mask, size) for the connected regions of an 'L' image (255 = in), largest regions only.

    The image is opened first (erode, then dilate by open_px) so texture specks don't become
    thousands of regions; each yielded mask is the region grown back and clipped to the original."""
    full = np.array(binary) == 255
    opened = binary.filter(ImageFilter.MinFilter(open_px))
    work = opened.copy(); arr = np.array(work)
    for _ in range(limit):
        idx = np.flatnonzero(arr == 255)
        if not idx.size:
            return
        y, x = divmod(int(idx[0]), arr.shape[1])
        ImageDraw.floodfill(work, (x, y), 64, thresh=0)
        arr = np.array(work); core = arr == 64; arr[core] = 1; work = Image.fromarray(arr)
        grown = np.array(Image.fromarray((core * 255).astype('uint8')).filter(ImageFilter.MaxFilter(open_px + 2))) == 255
        region = grown & full
        yield region, int(region.sum())


def cutout_cell(cell, min_hole=400, keep=0.12):
    w, h = cell.size
    mask = Image.new('L', (w + 2, h + 2), 255)  # 255 = background-like, padded so the border is connected
    if np is not None:
        a = np.array(cell).astype('int16'); g, b = a[..., 1], a[..., 2]
        mn = a.min(axis=2); d = 255 - mn; sat = a.max(axis=2) - mn
        m = Image.fromarray(np.where((d < 12) | ((mn > 120) & (sat < 30) & (np.abs(g - b) < 10) & (d < 110)), 255, 0).astype('uint8'))
    else:
        m = Image.new('L', (w, h), 0)
        m.putdata([255 if bg_like(p) else 0 for p in (cell.get_flattened_data() if hasattr(cell, 'get_flattened_data') else cell.getdata())])
    mask.paste(m, (1, 1))
    ImageDraw.floodfill(mask, (0, 0), 128, thresh=0)  # background reachable from the border
    mask = mask.crop((1, 1, w + 1, h + 1))
    alpha = mask.point(lambda v: 0 if v == 128 else 255)
    if np is not None:
        al = np.array(alpha)
        # enclosed background-like islands bigger than min_hole are holes (a teapot handle), not highlights
        for comp, n in components(mask.point(lambda v: 255 if v == 255 else 0)):
            if n > min_hole:
                al[comp] = 0
        # keep the object, drop fragments of neighbouring cells and stray specks
        parts = list(components(Image.fromarray(np.where(al > 0, 255, 0).astype('uint8')), open_px=3, limit=40))
        if parts:
            big = max(n for _, n in parts)
            keep_mask = np.zeros(al.shape, dtype=bool)
            for comp, n in parts:
                if n >= keep * big:
                    keep_mask |= comp
            al[~keep_mask] = 0      # fragments, specks and anything too thin to survive the opening go
        alpha = Image.fromarray(al)
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))  # erode 1px, feather
    out = cell.convert('RGBA'); out.putalpha(alpha)
    if np is not None:  # un-premultiply the edge against white so there's no pale halo on dark grounds
        a = np.array(out).astype('float32'); al = a[..., 3:4] / 255.0
        edge = (al > 0.02) & (al < 0.98)
        rgb = a[..., :3]
        fixed = np.clip((rgb - (1 - al) * 255) / np.maximum(al, 0.02), 0, 255)
        a[..., :3] = np.where(edge, fixed, rgb)
        out = Image.fromarray(a.astype('uint8'), 'RGBA')
    bbox = out.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    if bbox:
        pad = 8
        out = out.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad)))
    return out


def cmd_cutout(a):
    sheet = Image.open(a.src).convert('RGB')
    cols, rows = (int(v) for v in a.grid.lower().split('x'))
    names = a.names.split(',') if a.names else [f'{i + 1:02d}' for i in range(cols * rows)]
    os.makedirs(a.out, exist_ok=True)
    W, H = sheet.size; cw, ch = W // cols, H // rows
    for i in range(cols * rows):
        if i >= len(names):
            break
        c, r = i % cols, i // cols
        obj = cutout_cell(sheet.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)))
        base = os.path.join(a.out, f'{a.prefix}{names[i]}')
        for ext in ('.png', '.webp'):
            guard(a.src, base + ext)
        obj.save(base + '.png', optimize=True)
        obj.save(base + '.webp', quality=88, method=6)  # WebP keeps alpha; ship the PNG as the fallback
        print(f'{names[i]}: {obj.size[0]}×{obj.size[1]} → {base}.png/.webp')


def cmd_export(a):
    im = Image.open(a.src)
    if a.crop:
        x, y, w, h = (int(v) for v in a.crop.split(','))
        im = im.crop((x, y, x + w, y + h))
    alpha = im.mode in ('RGBA', 'LA') or 'transparency' in im.info
    im = im.convert('RGBA' if alpha else 'RGB')
    os.makedirs(a.out, exist_ok=True)
    widths = [int(v) for v in a.widths.split(',')] if a.widths else [im.size[0]]
    q = 90 if a.flat else 82  # flat paper/sky areas posterise at lower quality
    for w in widths:
        if w > im.size[0]:
            print(f'skip {w}px: source is {im.size[0]}px wide (never upscale)'); continue
        r = im if w == im.size[0] else im.resize((w, round(im.size[1] * w / im.size[0])), Image.LANCZOS)
        base = os.path.join(a.out, f'{a.name}-{w}')
        guard(a.src, base + '.webp')
        r.save(base + '.webp', quality=q, method=6)
        if alpha:
            r.save(base + '.png', optimize=True)
        else:
            r.save(base + '.jpg', quality=q, optimize=True, progressive=True)
        print(f'{base}.webp + {".png" if alpha else ".jpg"} ({r.size[0]}×{r.size[1]})')


ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
sp = ap.add_subparsers(dest='cmd', required=True)
p = sp.add_parser('paper'); p.add_argument('src'); p.add_argument('out'); p.add_argument('--to', required=True); p.set_defaults(fn=cmd_paper)
p = sp.add_parser('cutout'); p.add_argument('src'); p.add_argument('--grid', required=True); p.add_argument('--out', required=True)
p.add_argument('--names'); p.add_argument('--prefix', default='obj-'); p.set_defaults(fn=cmd_cutout)
p = sp.add_parser('export'); p.add_argument('src'); p.add_argument('--out', required=True); p.add_argument('--name', required=True)
p.add_argument('--widths'); p.add_argument('--crop'); p.add_argument('--flat', action='store_true'); p.set_defaults(fn=cmd_export)
a = ap.parse_args(); a.fn(a)
