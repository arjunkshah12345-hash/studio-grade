#!/usr/bin/env node
// Studio Grade design audit: measures a page against the norms in this skill.
// Usage: node audit.mjs <url | path/to/index.html | dir> [--out ./audit] [--json] [--quick]
// Needs Playwright:  npm i -D playwright && npx playwright install chromium
// Exit code 1 if any FAIL. Screenshots are written to --out. LOOK AT THEM.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };
const OUT = path.resolve(opt('--out', './audit'));
const AS_JSON = args.includes('--json');
const QUICK = args.includes('--quick');
const DIRECTION = +opt('--direction', 0) || 0;                    // 1–10, see references/directions.md
const REGISTER = (opt('--register', '') || '').toLowerCase();     // quiet | confident | loud
const LENGTH = { 1: [8, 11], 2: [8, 11], 3: [8, 14], 4: [12, 23], 5: [3, 9], 6: [12, 27], 7: [7, 12], 8: [10, 16], 9: [8, 16], 10: [8, 55] };
if (!target) { console.error('usage: node audit.mjs <url|file|dir> [--out dir] [--direction 1-10] [--register quiet|confident|loud] [--json] [--quick]'); process.exit(2); }

// ---------- load playwright from wherever it is installed ----------
async function loadPlaywright() {
  const tries = [() => import('playwright'), () => import('@playwright/test')];
  for (const base of [process.cwd(), path.dirname(new URL(import.meta.url).pathname)]) {
    const req = createRequire(path.join(base, 'noop.js'));
    for (const name of ['playwright', '@playwright/test']) tries.push(async () => import(pathToFileURL(req.resolve(name)).href));
  }
  for (const t of tries) { try { const m = await t(); return m.chromium ? m : m.default; } catch {} }
  console.error('Playwright not found. Install it in your project:\n  npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

// ---------- serve local files over http (ES modules + fonts need it) ----------
function serve(root) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.otf': 'font/otf', '.json': 'application/json', '.mp4': 'video/mp4', '.webm': 'video/webm', '.ico': 'image/x-icon' };
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = path.join(root, p);
    if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'content-type': types[path.extname(f).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => r(srv)));
}

let url = target, server = null;
if (!/^https?:\/\//.test(target)) {
  const abs = path.resolve(target);
  if (!fs.existsSync(abs)) { console.error('Not found: ' + abs); process.exit(2); }
  const isDir = fs.statSync(abs).isDirectory();
  const root = isDir ? abs : path.dirname(abs);
  server = await serve(root);
  url = `http://127.0.0.1:${server.address().port}/${isDir ? '' : path.basename(abs)}`;
}
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (/^slice-\d+\.jpg$/.test(f)) fs.unlinkSync(path.join(OUT, f));   // no stale slices from earlier runs

const { chromium } = await loadPlaywright();
let browser;
try { browser = await chromium.launch({ headless: true }); }
catch { browser = await chromium.launch({ headless: true, channel: 'chrome' }); }

const findings = [];   // {level:'FAIL'|'WARN'|'PASS'|'INFO', rule, msg, examples?}
const add = (level, rule, msg, examples) => findings.push({ level, rule, msg, ...(examples && examples.length ? { examples: examples.slice(0, 5) } : {}) });

// ======================================================================================
// In-page helpers (stringified into the page)
// ======================================================================================
const PAGE_LIB = () => {
  if (window.__cs) return;
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  const toRGBA = (s) => {
    if (!s || s === 'transparent') return [0, 0, 0, 0];
    if (cache.has(s)) return cache.get(s);
    let out; const m = s.match(/^rgba?\(([^)]+)\)/);
    if (m) { const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat); out = [p[0], p[1], p[2], p[3] ?? 1]; }
    else {
      const am = s.match(/\/\s*([\d.]+%?)\s*\)$/); let a = 1;
      if (am) a = am[1].endsWith('%') ? parseFloat(am[1]) / 100 : parseFloat(am[1]);
      cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = s.replace(/\/\s*[\d.]+%?\s*\)$/, ')'); cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data; out = [d[0], d[1], d[2], a];
    }
    cache.set(s, out); return out;
  };
  const over = (top, bot) => { const a = top[3] + bot[3] * (1 - top[3]); if (!a) return [0, 0, 0, 0]; return [0, 1, 2].map((i) => (top[i] * top[3] + bot[i] * bot[3] * (1 - top[3])) / a).concat(a); };
  const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const contrast = (a, b) => { const L1 = lum(a), L2 = lum(b); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
  const hsl = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); const l = (mx + mn) / 2; let h = 0, s = 0; if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return [h, s, l]; };
  const chromatic = (c) => { if (c[3] < 0.35) return false; const [, s, l] = hsl(c); const chroma = (Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2])) / 255; return s > 0.38 && chroma > 0.22 && l > 0.18 && l < 0.88; };
  const vis = (el) => { const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; const s = getComputedStyle(el); return s.visibility !== 'hidden' && s.display !== 'none'; };
  const intentionallyHidden = (el) => { const r = el.getBoundingClientRect(); if (r.width <= 2 || r.height <= 2 || r.right < 0 || r.bottom + scrollY < 0) return true; if (/skip to|skip navigation/i.test(el.textContent)) return true; return !!el.closest('[aria-hidden="true"],[hidden],[inert],.sr-only,.visually-hidden,[role="dialog"],[role="menu"],[role="tooltip"],dialog,details:not([open])'); };
  const ownText = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
  const cumOpacity = (el) => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= +getComputedStyle(e).opacity; return o; };
  const effBg = (el) => {   // composite backgrounds up the tree; null if an image/gradient sits behind
    let acc = [0, 0, 0, 0];
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage && s.backgroundImage !== 'none' && acc[3] < 0.95) return null;
      const c = toRGBA(s.backgroundColor);
      if (c[3] > 0) { acc = acc[3] ? over(acc, c) : c; if (acc[3] >= 0.99) return acc; }
    }
    const root = toRGBA(getComputedStyle(document.documentElement).backgroundColor);
    return over(acc, root[3] ? root : [255, 255, 255, 1]);
  };
  const stackBg = (el) => {   // composite what is actually painted under the text, in paint order (not DOM ancestry)
    const r = el.getBoundingClientRect(); const x = r.left + Math.min(r.width / 2, 20), y = r.top + r.height / 2;
    if (y < 0 || y >= innerHeight || x < 0 || x >= innerWidth) return null;
    let acc = [0, 0, 0, 0];
    for (const e of document.elementsFromPoint(x, y)) {
      if (el.contains(e) && e !== el) continue;
      if (/^(IMG|VIDEO|CANVAS|PICTURE|IFRAME)$/.test(e.tagName) || (e.tagName === 'svg' && e.getBoundingClientRect().width > 200)) return 'media';
      const s = getComputedStyle(e);
      if (s.backgroundImage !== 'none' && acc[3] < 0.95) return 'media';
      const c = toRGBA(s.backgroundColor);
      if (c[3] > 0) { acc = acc[3] ? over(acc, c) : c; if (acc[3] >= 0.99) return acc; }
    }
    const root = toRGBA(getComputedStyle(document.documentElement).backgroundColor);
    return over(acc, root[3] ? root : [255, 255, 255, 1]);
  };
  const mediaBehind = (el) => {
    const r = el.getBoundingClientRect(); const x = r.left + Math.min(r.width / 2, 20), y = r.top + r.height / 2;
    if (y < 0 || y > innerHeight || x < 0 || x > innerWidth) return null;
    for (const e of document.elementsFromPoint(x, y)) {
      if (e === el || el.contains(e)) continue;
      if (/^(IMG|VIDEO|CANVAS|PICTURE|IFRAME)$/.test(e.tagName) || (e.tagName === 'svg' && e.getBoundingClientRect().width > 200)) return true;
      const s = getComputedStyle(e); if (s.backgroundImage !== 'none') return true;
      if (toRGBA(s.backgroundColor)[3] > 0.95) return false;
    }
    return false;
  };
  const animatingOpacity = () => {
    const set = new Set();
    for (const a of document.getAnimations()) {
      if (a.playState !== 'running') continue;
      const t = a.effect && a.effect.target; if (!t) continue;
      const prop = a.transitionProperty || (a.effect.getKeyframes ? a.effect.getKeyframes().map((k) => Object.keys(k).join()).join() : '');
      if (/opacity|filter|all|color/.test(prop)) set.add(t);
    }
    return set;
  };
  const decorative = (el) => !!el.closest('[aria-hidden="true"],[role="img"],[role="presentation"],[inert],pre,code,kbd,samp');
  window.__cs = { stackBg, toRGBA, over, contrast, hsl, chromatic, vis, intentionallyHidden, decorative, ownText, cumOpacity, effBg, mediaBehind, animatingOpacity, checked: new WeakSet(), low: [], lowCount: 0, checkedCount: 0 };
};

// contrast pass over text currently inside the viewport
const CONTRAST_PASS = () => {
  const C = window.__cs; const busy = C.animatingOpacity();
  C.pass = (C.pass || 0) + 1;
  if (!C.cands || C.pass % 6 === 0) C.cands = [...document.querySelectorAll('body *')].filter((el) => C.ownText(el).length > 1 && !el.closest('script,style,noscript,svg'));
  for (const el of C.cands) {
    if (C.checked.has(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight || r.width < 3 || r.height < 3) continue;
    if (!C.vis(el)) continue;
    let anim = false; for (let e = el; e && e.nodeType === 1; e = e.parentElement) if (busy.has(e)) { anim = true; break; }
    if (anim) continue;
    const op = C.cumOpacity(el); if (op < 0.05) continue;                // not revealed yet / clone: re-check later
    C.checked.add(el);
    if (C.decorative(el) || el.closest('select,option')) continue;
    const sb = C.stackBg(el);
    if (sb === 'media') {                                                 // text over imagery: queue it for pixel sampling after the pass
      if (!el.closest('[aria-hidden="true"]') && (C.media ||= []).length < 30) { const s2 = getComputedStyle(el); el.setAttribute('data-sg-m', String(C.media.length)); const r0 = el.getBoundingClientRect(); const under = document.elementsFromPoint(r0.left + Math.min(r0.width / 2, 20), r0.top + r0.height / 2).find((e) => e !== el && !el.contains(e) && (/^(IMG|VIDEO|CANVAS|PICTURE|IFRAME|svg)$/i.test(e.tagName) || getComputedStyle(e).backgroundImage !== 'none')); const kind = under && !/^(IMG|VIDEO|CANVAS|PICTURE|IFRAME)$/.test(under.tagName) && !/url\(/.test(getComputedStyle(under).backgroundImage) ? 'pattern' : 'image'; C.media.push({ kind, fg: C.toRGBA(s2.color), op, size: parseFloat(s2.fontSize), bold: +s2.fontWeight >= 700, text: C.ownText(el).slice(0, 36) }); }
      continue;
    }
    const bg = sb || C.effBg(el); if (!bg) continue;
    const s = getComputedStyle(el); const fg0 = C.toRGBA(s.color);
    const fg = C.over([fg0[0], fg0[1], fg0[2], fg0[3] * op], bg);
    const ratio = C.contrast(fg, bg); const size = parseFloat(s.fontSize); const bold = +s.fontWeight >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    C.checkedCount++;
    if (ratio < (large ? 3 : 4.5)) { C.lowCount++; if (/^(P|LI|DD|BLOCKQUOTE)$/.test(el.tagName) && size >= 14 && C.ownText(el).length > 40) C.lowBody = (C.lowBody || 0) + 1; if (C.low.length < 8) C.low.push(`${ratio.toFixed(2)}:1 · ${Math.round(size)}px · "${C.ownText(el).slice(0, 40)}"`); }
  }
};

// big desktop collection
const COLLECT = () => {
  const C = window.__cs; const vw = innerWidth, vh = innerHeight;
  const all = [...document.querySelectorAll('body *')].slice(0, 9000);
  const txt = all.filter((el) => C.ownText(el).length > 1 && C.vis(el) && !el.closest('svg,script,style,noscript') && !C.intentionallyHidden(el) && C.cumOpacity(el) > 0.05);
  const st = (el) => getComputedStyle(el);
  const fam = (s) => s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
  const tally = (arr) => { const m = {}; arr.forEach((v) => { if (v != null) m[v] = (m[v] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); };
  const out = {};
  out.title = document.title; out.lang = document.documentElement.lang; out.metaDesc = !!document.querySelector('meta[name="description"]');
  out.pageVh = +(document.documentElement.scrollHeight / vh).toFixed(1);
  // ---- type
  const famT = tally(txt.map((el) => fam(st(el))));
  const displayFams = new Set(txt.filter((el) => parseFloat(st(el).fontSize) >= 40).map((el) => fam(st(el))));
  out.families = famT.filter(([f, n]) => n >= 3 || displayFams.has(f));
  out.loadedFonts = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')))];
  const info = (el) => { const s = st(el); const fs = parseFloat(s.fontSize); return { tag: el.tagName.toLowerCase(), text: el.innerText.replace(/\s+/g, ' ').trim().slice(0, 80), family: fam(s), size: fs, weight: +s.fontWeight, lh: s.lineHeight === 'normal' ? 1.2 : +(parseFloat(s.lineHeight) / fs).toFixed(2), ls: s.letterSpacing === 'normal' ? 0 : +(parseFloat(s.letterSpacing) / fs).toFixed(3), upper: s.textTransform === 'uppercase', clipText: s.backgroundClip === 'text' || s.webkitBackgroundClip === 'text', top: el.getBoundingClientRect().top + scrollY, condensed: (() => { const t = C.ownText(el); const r = el.getBoundingClientRect(); if (t.length < 3 || r.height > fs * 1.6) return /condens|compress|narrow|shoulders|oswald|gothic|anton|bebas|antonio/i.test(s.fontFamily); return r.width / (t.length * fs) < 0.47 || /condens|compress|narrow|shoulders|oswald|gothic|anton|bebas|antonio/i.test(s.fontFamily); })() }; };
  const bySize = [...txt].sort((a, b) => parseFloat(st(b).fontSize) - parseFloat(st(a).fontSize));
  out.largest = bySize.slice(0, 6).map(info);
  const h1s = [...document.querySelectorAll('h1')].filter(C.vis);
  out.h1 = h1s.map(info); out.h1Count = document.querySelectorAll('h1').length;
  const display = all.filter((el) => C.ownText(el).length > 1 && C.vis(el) && C.cumOpacity(el) > 0.05 && !el.closest('svg,script,style,noscript,.sr-only') && parseFloat(st(el).fontSize) >= 40).map(info);
  out.display = display.slice(0, 40);
  out.bodySize = (tally(txt.filter((el) => el.tagName === 'P' && C.ownText(el).length > 50 && st(el).textTransform !== 'uppercase' && !/mono|code|courier/i.test(st(el).fontFamily)).map((el) => Math.round(parseFloat(st(el).fontSize))))[0] || [null])[0];
  out.tinyText = txt.filter((el) => parseFloat(st(el).fontSize) < 11 && st(el).textTransform !== 'uppercase' && !C.decorative(el)).length;
  const labels = txt.filter((el) => { const s = st(el); return s.textTransform === 'uppercase' && parseFloat(s.fontSize) <= 14 && /[a-z]{2}/i.test(C.ownText(el)) && !/mono|code|courier|consol|menlo/i.test(s.fontFamily); });
  out.labelsTight = labels.filter((el) => { const s = st(el); const ls = s.letterSpacing === 'normal' ? 0 : parseFloat(s.letterSpacing) / parseFloat(s.fontSize); return ls < 0.02; }).map((el) => C.ownText(el).slice(0, 30));
  out.labelCount = labels.length;
  out.upperShare = +(txt.filter((el) => st(el).textTransform === 'uppercase' || (C.ownText(el).length > 8 && C.ownText(el) === C.ownText(el).toUpperCase() && /[A-Z]/.test(C.ownText(el)))).length / Math.max(1, txt.length)).toFixed(2);
  out.bigCapsSentences = txt.filter((el) => { const s = st(el); const t = C.ownText(el); return parseFloat(s.fontSize) >= 32 && (s.textTransform === 'uppercase' || (t === t.toUpperCase() && /[A-Z]/.test(t))) && t.split(/\s+/).length > 7; }).map((el) => C.ownText(el).slice(0, 50));
  out.weights = tally(txt.map((el) => st(el).fontWeight)).slice(0, 6);
  out.textShadowBig = txt.filter((el) => st(el).textShadow !== 'none' && parseFloat(st(el).fontSize) >= 24).length;
  out.textStroke = all.filter((el) => parseFloat(st(el).webkitTextStrokeWidth) > 0).length;
  // after the scroll-through every reveal should have fired: text still blurred or a reveal still invisible is stuck
  out.stuckReveal = all.filter((el) => { if (!C.vis(el) || el.closest('svg,.sr-only,[aria-hidden="true"] [aria-hidden="true"]')) return false; const s = st(el); const b = (s.filter.match(/blur\(([\d.]+)px\)/) || [])[1]; const txt = (el.innerText || '').trim().length > 1; return (txt && +b >= 1 && C.cumOpacity(el) > 0.05) || (el.matches('[data-reveal]') && txt && parseFloat(s.opacity) < 0.1); }).slice(0, 6).map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} "${el.innerText.trim().slice(0, 28)}" ${st(el).filter !== 'none' ? st(el).filter : 'opacity ' + st(el).opacity}`);
  out.gradientText = all.filter((el) => C.vis(el) && !el.closest('[aria-hidden="true"]') && (st(el).backgroundClip === 'text' || st(el).webkitBackgroundClip === 'text') && parseFloat(st(el).fontSize) >= 22 && /gradient/.test(st(el).backgroundImage)).map((el) => el.innerText.trim().slice(0, 40));
  // ---- measure (line length)
  out.longMeasure = [...document.querySelectorAll('p')].filter(C.vis).filter((p) => { const s = st(p); return p.innerText.length > 160 && p.getBoundingClientRect().width / (parseFloat(s.fontSize) * 0.5) > 92; }).map((p) => p.innerText.slice(0, 40));
  // ---- colour
  const bodyBg = C.toRGBA(st(document.body).backgroundColor)[3] ? C.toRGBA(st(document.body).backgroundColor) : C.toRGBA(st(document.documentElement).backgroundColor);
  out.paper = bodyBg[3] ? bodyBg : [255, 255, 255, 1];
  const pureBW = { blackOnWhite: 0, whiteOnBlack: 0 };
  for (const el of txt.filter((e) => e.tagName === 'P' || e.tagName === 'LI' || e.tagName === 'SPAN').slice(0, 400)) {
    const fg = C.toRGBA(st(el).color); const bg = C.effBg(el); if (!bg) continue;
    const isB = (c) => c[0] < 3 && c[1] < 3 && c[2] < 3 && c[3] > 0.97, isW = (c) => c[0] > 252 && c[1] > 252 && c[2] > 252 && c[3] > 0.97;
    if (isB(fg) && isW(bg)) pureBW.blackOnWhite++; if (isW(fg) && isB(bg)) pureBW.whiteOnBlack++;
  }
  out.pureBW = pureBW;
  // chromatic hues weighted by area (bg) and count (text, borders)
  const hueW = {}; const hueEx = {}; const pageArea = document.documentElement.scrollWidth * document.documentElement.scrollHeight;
  let chromaArea = 0; const fieldMax = {};
  const addHue = (c, w, ex) => { if (!C.chromatic(c)) return; const h = Math.round(C.hsl(c)[0] / 30) % 12; hueW[h] = (hueW[h] || 0) + w; if (!hueEx[h]) hueEx[h] = `rgb(${c.slice(0, 3).map(Math.round).join(',')}) ${ex}`; };
  for (const el of all) {
    if (!C.vis(el) || el.closest('svg') || C.decorative(el) || C.cumOpacity(el) < 0.05) continue;
    const s = st(el); const r = el.getBoundingClientRect();
    const bg = C.toRGBA(s.backgroundColor);
    const tag = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0].slice(0, 24) : '');
    if (bg[3] > 0.35 && C.chromatic(bg) && r.width * r.height > 64) { const a = Math.min(r.width * r.height, vw * vh * 3); chromaArea += a; addHue(bg, Math.max(1, a / 5000), 'bg ' + tag); const hh = Math.round(C.hsl(bg)[0] / 30) % 12; fieldMax[hh] = Math.max(fieldMax[hh] || 0, (r.width * r.height) / (vw * vh)); }
    if (C.ownText(el).length > 1 && parseFloat(s.fontSize) >= 13 && !/mono|code|courier|consol|menlo/i.test(s.fontFamily)) addHue(C.toRGBA(s.color), 1, 'text "' + C.ownText(el).slice(0, 20) + '"');
    if (parseFloat(s.borderTopWidth) > 0 && r.width > 40) addHue(C.toRGBA(s.borderTopColor), 0.5, 'border ' + tag);
  }
  const totalW = Object.values(hueW).reduce((a, b) => a + b, 0) || 1;
  const artHues = {};
  for (const n of document.querySelectorAll('svg *, [role="img"] *')) { const s = st(n); for (const v of [s.fill, s.stroke, s.backgroundColor, s.color]) { const c = C.toRGBA(v); if (c[3] > 0.35 && C.chromatic(c)) { const h = Math.round(C.hsl(c)[0] / 30) % 12; artHues[h] = (artHues[h] || 0) + 1; } } }
  out.artHues = Object.entries(artHues).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([h, n]) => `${+h * 30}°×${n}`);
  out.accentHues = Object.entries(hueW).filter(([, w]) => w / totalW > 0.1 || w > 40).sort((a, b) => b[1] - a[1]).map(([h, w]) => ({ hue: +h * 30, weight: Math.round(w), example: hueEx[h] }));
  out.chromaCoverage = +(chromaArea / pageArea * 100).toFixed(1);
  // colour-block system: ≥2 hues that each fill at least ~35% of a viewport as a field (Norton, Dropbox Brand, festival stages)
  out.fieldHues = Object.entries(fieldMax).filter(([, a]) => a >= 0.35).map(([h]) => +h * 30);
  // gradients
  out.gradients = [];
  for (const el of all) {
    const s = st(el); if (!/gradient/.test(s.backgroundImage) || !C.vis(el) || C.cumOpacity(el) < 0.2) continue;
    if ((s.maskImage && s.maskImage !== 'none') || (s.webkitMaskImage && s.webkitMaskImage !== 'none')) continue;   // masked = border/line effects
    const r = el.getBoundingClientRect(); const area = r.width * r.height / (vw * vh);
    const cols = (s.backgroundImage.match(/(rgba?\([^)]+\)|#[0-9a-f]{3,8}|oklch\([^)]+\)|hsla?\([^)]+\)|lab\([^)]+\)|color\([^)]+\))/gi) || []).map(C.toRGBA);
    const chrom = cols.filter((c) => c[3] > 0.25 && C.chromatic(c));
    const hues = [...new Set(chrom.map((c) => Math.round(C.hsl(c)[0] / 40)))];
    const coolPurple = chrom.some((c) => { const h = C.hsl(c)[0]; return h >= 215 && h <= 320; });
    if (area > 0.15 && chrom.length >= 2) out.gradients.push({ area: +area.toFixed(2), hues: hues.length, coolPurple, hero: r.top + scrollY < vh, el: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '') });
  }
  out.glows = all.filter((el) => { const s = st(el); if (s.boxShadow === 'none' || !C.vis(el)) return false; return s.boxShadow.split(/,(?![^(]*\))/).some((sh) => { const c = sh.match(/(rgba?\([^)]+\)|oklch\([^)]+\)|lab\([^)]+\))/); const nums = sh.replace(/(rgba?|oklch|lab)\([^)]+\)/, '').match(/-?[\d.]+px/g) || []; return c && C.chromatic(C.toRGBA(c[0])) && parseFloat(nums[2] || 0) >= 30; }); }).length;
  // ---- shape
  const btnLike = all.filter((el) => { if (!/^(A|BUTTON)$/.test(el.tagName) || !C.vis(el) || el.matches('[aria-pressed],[role="tab"],[role="switch"],[role="option"],[href="#main"],[href="#content"],[class*="skip" i]')) return false; /* toggles, filters and skip links aren't CTAs */ const s = st(el); const r = el.getBoundingClientRect(); if (r.bottom + scrollY <= 0) return false; const filled = C.toRGBA(s.backgroundColor)[3] > 0.05 || parseFloat(s.borderTopWidth) > 0 || /0px 0px 0px 1(\.5)?px/.test(s.boxShadow) || (el.matches('[class*="btn" i],[class*="button" i],[class*="cta" i]') && !el.closest('nav,header')); return filled && r.height >= 26 && r.height <= 80 && r.width > r.height * 1.6 && el.innerText.trim().length > 1; });
  const camp = (el) => { const rr = parseFloat(st(el).borderTopLeftRadius); const h = el.getBoundingClientRect().height; return rr >= h / 2 - 1 || rr > 200 ? 'pill' : rr <= 4 ? 'square' : 'soft'; };
  out.buttonCamps = tally(btnLike.map(camp));
  const inNav = (el) => { const top = el.getBoundingClientRect().top + scrollY; if (top < 110 && el.getBoundingClientRect().height < 48) return true; for (let p = el; p && p !== document.body; p = p.parentElement) { const pos = getComputedStyle(p).position; if ((pos === 'fixed' || pos === 'sticky') && p.getBoundingClientRect().height < 140) return true; } return false; };
  out.buttons = btnLike.slice(0, 16).map((el) => ({ text: el.innerText.trim().slice(0, 30), camp: camp(el), h: Math.round(el.getBoundingClientRect().height), top: Math.round(el.getBoundingClientRect().top + scrollY), nav: inNav(el) }));
  out.buttonCamps = tally(btnLike.filter((el) => !inNav(el)).map(camp));
  out.bigRadiusCards = all.filter((el) => { if (!C.vis(el) || /^(IMG|VIDEO|PICTURE|A|BUTTON)$/.test(el.tagName)) return false; const s = st(el); const r = el.getBoundingClientRect(); const boxed = C.toRGBA(s.backgroundColor)[3] > 0.05 || parseFloat(s.borderTopWidth) > 0 || s.boxShadow !== 'none'; return boxed && r.width > 200 && r.height > 120 && r.width < vw * 0.95 && parseFloat(s.borderTopLeftRadius) >= 28; }).length;
  out.dropShadows = all.filter((el) => { const s = st(el); if (s.boxShadow === 'none' || !C.vis(el) || /^(A|BUTTON|INPUT|SELECT)$/.test(el.tagName) || el.getBoundingClientRect().height < 64) return false; return s.boxShadow.split(/,(?![^(]*\))/).some((sh) => { if (/inset/.test(sh)) return false; const n = sh.replace(/(rgba?|oklch|lab|color)\([^)]+\)/g, '').match(/-?[\d.]+px/g) || []; return parseFloat(n[2] || 0) >= 8 && parseFloat(n[1] || 0) > 0; }); }).length;
  // ---- hero / layout
  const header = document.querySelector('header') || document.querySelector('nav');
  out.heroCtas = btnLike.filter((el) => { const r = el.getBoundingClientRect(); return r.top + scrollY < vh && !inNav(el); }).map((el) => el.innerText.trim().slice(0, 30));
  const h1 = h1s[0];
  if (h1) {
    const hr = h1.getBoundingClientRect();
    out.h1Words = h1.innerText.trim().split(/\s+/).length;
    out.h1Lines = Math.round(hr.height / (parseFloat(st(h1).lineHeight) || parseFloat(st(h1).fontSize) * 1.1));
    out.h1Centered = Math.abs(hr.left + hr.width / 2 - vw / 2) < 24 && st(h1).textAlign === 'center';
    out.badgeAboveH1 = [...document.querySelectorAll('a,span,div,p')].filter((el) => { if (!C.vis(el) || el.contains(h1)) return false; const r = el.getBoundingClientRect(); const s = st(el); return r.bottom <= hr.top + 4 && hr.top - r.bottom < 90 && r.height < 40 && r.height > 16 && parseFloat(s.borderTopLeftRadius) >= r.height / 2 - 1 && (C.toRGBA(s.backgroundColor)[3] > 0.05 || parseFloat(s.borderTopWidth) > 0) && r.width < 420; }).map((el) => el.innerText.trim().slice(0, 40)).slice(0, 2);
  }
  const h2s = [...document.querySelectorAll('h2')].filter(C.vis);
  out.h2Count = h2s.length;
  out.h2CenteredShare = h2s.length ? +(h2s.filter((h) => { const r = h.getBoundingClientRect(); return st(h).textAlign === 'center' && Math.abs(r.left + r.width / 2 - vw / 2) < 30; }).length / h2s.length).toFixed(2) : 0;
  // icon-card grids: parents with 3–6 similar children in a row, each with a small icon then heading + text
  const iconGrids = [];
  for (const p of all) {
    const kids = [...p.children].filter(C.vis); if (kids.length < 3 || kids.length > 6) continue;
    const rs = kids.map((k) => k.getBoundingClientRect()); const w0 = rs[0].width; if (w0 < 160) continue;
    const row = rs.filter((r) => Math.abs(r.top - rs[0].top) < 6 && Math.abs(r.width - w0) < w0 * 0.12).length;
    if (row < 3) continue;
    const iconish = kids.filter((k) => { const icon = k.querySelector('svg, img, i, [class*="icon" i]'); const head = k.querySelector('h3,h4,h5,strong,[class*="title" i]'); if (!icon || !head) return false; const ir = icon.getBoundingClientRect(); return ir.height > 0 && ir.height <= 72 && ir.width <= 72 && ir.top <= head.getBoundingClientRect().top && !!k.querySelector('p'); }).length;
    if (iconish >= 3) iconGrids.push((p.className && typeof p.className === 'string' ? p.className.split(' ')[0] : p.tagName.toLowerCase()) + ` (${kids.length})`);
  }
  out.iconGrids = [...new Set(iconGrids)];
  const secs = [...document.querySelectorAll('main > section, body > section, main > div > section, [class*="section" i]')].filter(C.vis).map((s) => s.getBoundingClientRect().height).filter((h) => h > 200);
  if (secs.length >= 5) { const m = secs.reduce((a, b) => a + b) / secs.length; const sd = Math.sqrt(secs.reduce((a, b) => a + (b - m) ** 2, 0) / secs.length); out.sectionCV = +(sd / m).toFixed(2); }
  // ---- copy
  const pict = /\p{Extended_Pictographic}/u;
  out.emoji = [...document.querySelectorAll('h1,h2,h3,h4,button,a,[class*="btn" i],[class*="badge" i],label')].filter(C.vis).map((e) => e.innerText.trim()).filter((t) => pict.test(t.replace(/[©®™↗→←↑↓↳⌄›»✓✕×◆●○⊕+]/g, ''))).slice(0, 6);
  out.exclaim = [...document.querySelectorAll('h1,h2')].map((e) => e.innerText.trim()).filter((t) => /!/.test(t));
  const BANNED = ['supercharge', 'unleash', 'unlock the', 'unlock your', 'revolutioniz', 'elevate your', 'empower', 'seamless', 'next-gen', 'next generation of', 'cutting-edge', 'cutting edge', 'game-changer', 'game changer', 'state-of-the-art', 'best-in-class', 'world-class', 'harness the', 'leverage', 'synergy', 'look no further', 'fast-paced', 'to the next level', 'transform your', 'take your', 'ai-powered', 'lorem ipsum', 'feature one', 'feature 1'];
  const copy = [...document.querySelectorAll('h1,h2,h3,p,a,button,li')].filter(C.vis).map((e) => e.innerText.toLowerCase());
  out.banned = [...new Set(BANNED.filter((b) => copy.some((t) => t.includes(b))))];
  out.lorem = copy.some((t) => t.includes('lorem ipsum'));
  // ---- motion
  const beziers = {}; let transitions = 0, keyframes = 0, rmQuery = false, defaultEases = 0;
  const walk = (rules) => { for (const r of rules) { if (r.media && /prefers-reduced-motion/.test(r.media.mediaText)) rmQuery = true; if (r.cssRules && r.type !== 7) walk(r.cssRules); if (r.type === 7) keyframes++; const t = r.cssText || ''; for (const m of t.matchAll(/cubic-bezier\([^)]+\)/g)) { const k = m[0].replace(/\s/g, ''); beziers[k] = (beziers[k] || 0) + 1; } if (/transition|animation/.test(t)) { transitions++; if (/(transition|animation)[^;]*\b(ease|ease-in-out|ease-in)\b(?!-out)/.test(t)) defaultEases++; } } };
  for (const ss of document.styleSheets) { try { walk(ss.cssRules); } catch {} }
  const js = [...document.scripts].map((s) => s.textContent).join(' ');
  if (/prefers-reduced-motion/.test(js) || /reduced/.test(js)) rmQuery = rmQuery || /prefers-reduced-motion/.test(js);
  const usedEases = tally(all.filter((el) => st(el).transitionDuration.split(',').some((d) => parseFloat(d) > 0)).map((el) => st(el).transitionTimingFunction.split(/,(?![^(]*\))/)[0].replace(/\s/g, '')));
  const ids = tally([...document.querySelectorAll('[id]')].map((e) => e.id)).filter(([, n]) => n > 1).map(([id, n]) => `#${id} ×${n}`);
  out.dupIds = ids.slice(0, 6);
  out.hiddenShown = [...document.querySelectorAll('[hidden]')].filter((e) => st(e).display !== 'none').map((e) => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '')).slice(0, 5);
  out.motion = { usedEases: usedEases.slice(0, 5), transitions, keyframes, beziers: Object.entries(beziers).sort((a, b) => b[1] - a[1]).slice(0, 6), reducedMotion: rmQuery, defaultEases, lenis: !!window.lenis || document.documentElement.classList.contains('lenis'), revealEls: document.querySelectorAll('[data-reveal]').length };
  const vids = [...document.querySelectorAll('video')].filter((v) => v.autoplay || v.hasAttribute('autoplay'));
  out.autoplayVideos = vids.length;
  out.pauseControl = !![...document.querySelectorAll('button,[role="button"]')].find((b) => /pause|play/i.test((b.getAttribute('aria-label') || '') + b.innerText));
  // ---- a11y basics
  out.imgNoAlt = [...document.images].filter((i) => !i.hasAttribute('alt')).length;
  out.unnamedControls = [...document.querySelectorAll('a,button')].filter((el) => C.vis(el) && !(el.innerText.trim() || el.getAttribute('aria-label') || el.getAttribute('title') || el.querySelector('img[alt]:not([alt=""]),svg title'))).length;
  out.skipLink = !![...document.querySelectorAll('a[href^="#"]')].find((a) => /skip/i.test(a.innerText));
  // never-revealed content (text still invisible after a full scroll)
  out.hiddenText = txt.filter((el) => !el.closest('nav,header') && !C.intentionallyHidden(el) && C.cumOpacity(el) < 0.05 && el.getBoundingClientRect().top + scrollY < document.documentElement.scrollHeight - 50).map((el) => C.ownText(el).slice(0, 30)).slice(0, 8);
  // default-look signature (range.md §3)
  {
    const pp = out.paper; const lightWarm = pp[0] >= 228 && pp[1] >= 226 && pp[2] >= 218 && pp[0] <= 252 && pp[0] - pp[2] >= 3;
    const monoUpper = txt.filter((el) => { const s = st(el); return /mono|code|courier|consol|menlo/i.test(s.fontFamily) && (s.textTransform === 'uppercase' || (C.ownText(el) === C.ownText(el).toUpperCase() && /[A-Z]{2}/.test(C.ownText(el)))); }).length / Math.max(1, txt.length);
    const hairlines = all.filter((el) => { if (!C.vis(el) || el.closest('table,[role="img"],[role="table"],form')) return false; const s = st(el); return ['Top', 'Bottom'].some((k) => { const w = parseFloat(s['border' + k + 'Width']); const c = C.toRGBA(s['border' + k + 'Color']); return w > 0 && w <= 1.5 && c[3] > 0 && (c[3] <= 0.3 || !C.chromatic(c)); }); }).length;
    const lineHero = [...document.querySelectorAll('svg')].some((sv) => { const r = sv.getBoundingClientRect(); if (r.top + scrollY > vh * 1.1 || r.width < vw * 0.3) return false; const strokes = [...sv.querySelectorAll('path,line,polyline,circle,rect,ellipse')].filter((n) => { const s = getComputedStyle(n); return s.stroke !== 'none' && (s.fill === 'none' || C.toRGBA(s.fill)[3] < 0.1); }).length; return strokes >= 15; });
    const tinyAccent = (out.accentHues || []).length === 1 && out.chromaCoverage < 1.5;   // zero accent hues is restraint (Totême), not the default look
    const lightWeights = display.length ? display.filter((d) => d.weight <= 500).length / display.length >= 0.8 : false;
    const sig = { warmOffWhite: lightWarm, monoUpperLabels: monoUpper >= 0.1, hairlineBands: hairlines >= 14, lineDrawingHero: lineHero, tinyAccent, lightDisplay: lightWeights };
    out.defaultLook = { sig, score: Object.values(sig).filter(Boolean).length, monoUpperShare: +monoUpper.toFixed(2), hairlines };
  }
  // nav
  out.nav = header ? { h: Math.round(header.getBoundingClientRect().height), links: header.querySelectorAll('a').length } : null;
  return out;
};

const MOBILE = () => {
  const C = window.__cs; const vw = 390;            // configured width; mobile emulation can widen innerWidth to fit overflow
  const doc = document.documentElement;
  const overflow = Math.max(doc.scrollWidth, document.body.scrollWidth, innerWidth) - vw;
  const offenders = overflow > 1 ? [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); if (r.right <= vw + 1 || r.width < 2) return false; for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') return false; } return true; }).slice(0, 4).map((el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''} → right edge ${Math.round(el.getBoundingClientRect().right)}px`) : [];
  const small = [...document.querySelectorAll('a,button,input,select,[role="button"]')].filter((el) => { if (!C.vis(el) || C.decorative(el) || el.tabIndex < 0) return false; const r = el.getBoundingClientRect(); const inline = getComputedStyle(el).display === 'inline' && el.closest('p,li'); const lab = el.closest('label'); if (lab && lab.getBoundingClientRect().height >= 40) return false; return !inline && (r.height < 24 || r.width < 24); }).map((el) => (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 24));
  const h1 = document.querySelector('h1');
  const h1Size = h1 ? parseFloat(getComputedStyle(h1).fontSize) : null;
  const tinyEls = [...document.querySelectorAll('p,li')].filter((el) => C.vis(el) && !el.closest('footer') && el.innerText.trim().length > 60 && parseFloat(getComputedStyle(el).fontSize) < 13);
  return { overflow, offenders, small: small.slice(0, 8), smallCount: small.length, h1Size, tinyBody: tinyEls.length, tinyEx: tinyEls.slice(0, 4).map((el) => `${Math.round(parseFloat(getComputedStyle(el).fontSize))}px "${el.innerText.trim().slice(0, 40)}"`) };
};

// ======================================================================================
async function scrollThrough(page, { contrast = false } = {}) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = page.viewportSize().height;
  const steps = Math.min(80, Math.ceil(h / (vh * 0.5)));
  for (let i = 0; i <= steps; i++) {
    if (contrast) await page.evaluate(CONTRAST_PASS).catch(() => {});
    await page.mouse.wheel(0, vh * 0.5);
    await page.waitForTimeout(QUICK ? 220 : 420);
  }
  await page.waitForTimeout(900);
  if (contrast) await page.evaluate(CONTRAST_PASS).catch(() => {});
}

const t0 = Date.now();

// Text from two different blocks drawn on top of each other in the viewport (sticky posters, pinned sections,
// absolutely placed copy). Bars (fixed/sticky under 200px tall) are skipped: they have their own background.
const TEXT_OVERLAP = () => {
  const C = window.__cs, vw = innerWidth, vh = innerHeight;
  const bar = (el) => { for (let p = el; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if ((s.position === 'fixed' || s.position === 'sticky') && p.getBoundingClientRect().height < 200) return true; } return false; };
  // rotated text has an axis-aligned box far bigger than its glyphs, so boxes overlap where letters don't
  const rotated = (el) => { for (let p = el; p && p !== document.body; p = p.parentElement) { const m = getComputedStyle(p).transform.match(/^matrix\(([^,]+),\s*([^,]+)/); if (m && Math.abs(+m[2]) > 0.01) return true; } return false; };
  const blockOf = (el) => el.closest('h1,h2,h3,h4,h5,h6,p,li,dt,dd,figcaption,blockquote,a,button,label,td,th') || el;
  const els = [...document.querySelectorAll('body *')].filter((el) => {
    if (el.closest('svg,script,style,noscript,.sr-only') || !C.ownText(el) || C.ownText(el).length < 2) return false;
    const r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 6 || r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return false;
    if (C.cumOpacity(el) < 0.4 || C.intentionallyHidden(el) || bar(el) || rotated(el)) return false;
    return true;
  }).slice(0, 600).map((el) => {
    // per-line fragments (a wrapped link is two boxes, not one), clipped by overflow:hidden/auto ancestors
    const clips = []; for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (s.overflowX !== 'visible' || s.overflowY !== 'visible') clips.push(p.getBoundingClientRect()); }
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const rs = [...el.getClientRects()].map((q) => {
      let r = { left: q.left, right: q.right, top: q.top, bottom: q.bottom };
      if (fs >= 40) { const h = q.bottom - q.top; r.top += h * 0.22; r.bottom -= h * 0.1; }   // display type: the glyph band, not the line box
      for (const c of clips) r = { left: Math.max(r.left, c.left), right: Math.min(r.right, c.right), top: Math.max(r.top, c.top), bottom: Math.min(r.bottom, c.bottom) };
      return r;
    }).filter((r) => r.right - r.left > 3 && r.bottom - r.top > 4);
    return { el, rs, b: blockOf(el) };
  }).filter((x) => x.rs.length);
  const hits = [];
  for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
    const A = els[i], B = els[j];
    if (A.b === B.b || A.el.contains(B.el) || B.el.contains(A.el) || A.b.contains(B.el) || B.b.contains(A.el)) continue;
    const area = (r) => (r.right - r.left) * (r.bottom - r.top);
    const hit = A.rs.some((a) => B.rs.some((b) => { const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); return w > 0 && h > 0 && (w * h) / Math.min(area(a), area(b)) > 0.3; }));
    if (hit) hits.push(`"${C.ownText(A.el).slice(0, 24)}" × "${C.ownText(B.el).slice(0, 24)}"`);
  }
  return hits;
};
const OVERLAPS = [];
let AT = 'start';
let SPINE = '';
const step = (m) => { AT = m; if (!AS_JSON) process.stderr.write(`  · ${m} (${((Date.now() - t0) / 1000).toFixed(0)}s)\n`); };
setTimeout(() => { console.error(`Audit timed out after 240s during: ${AT} (very long page or a hanging loader). Try --quick.`); process.exit(3); }, 240000).unref();
let D = {}, M = {}, RM = {};
try {
  // ---------------- desktop ----------------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { const k = () => { const st = document.createElement('style'); st.textContent = 'html,body{scroll-behavior:auto!important}'; (document.head || document.documentElement).appendChild(st); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', k); else k(); });   // smooth scrolling makes the contrast pass sample mid-scroll
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(String(e).slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) consoleErrors.push(m.text().slice(0, 160)); });
  const origin = new URL(url).origin;
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url()) && r.url().startsWith(origin)) consoleErrors.push(`HTTP ${r.status()} ${r.url().slice(0, 120)}`); });
  step('desktop 1440×900'); const navResp = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  // the raw response, not page.content(): the DOM serialiser drops comments placed before <html>, which is where Spines usually live
  const rawHtml = (await navResp?.text().catch(() => '')) || (await page.content());
  SPINE = ([...rawHtml.matchAll(/<!--([\s\S]*?)-->/g)].map((m) => m[1]).find((c) => /TYPE\s*:/.test(c)) || '');
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(QUICK ? 1200 : 2600);                // let intros finish
  step('desktop hero shot'); await page.screenshot({ path: path.join(OUT, 'desktop-hero.png') });
  await page.evaluate(PAGE_LIB);
  const firstFrame = await page.evaluate(() => { const C = window.__cs; const h1 = document.querySelector('h1'); const inView = (el) => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
    const hidden = [...document.querySelectorAll('h1, main a, main button, header ~ * a, section a')].filter((el) => C.vis(el) && inView(el) && el.innerText.trim() && !C.intentionallyHidden(el) && !(el.tagName !== 'H1' && el.closest('figure,[role="img"]')) && C.cumOpacity(el) < 0.1).map((el) => el.innerText.trim().slice(0, 30));   // controls inside a figure (Replay, play) aren't hero copy
    return { h1Hidden: !!(h1 && inView(h1) && C.cumOpacity(h1) < 0.1), hidden: [...new Set(hidden)].slice(0, 6) }; });
  { const H = await page.evaluate(() => document.documentElement.scrollHeight); const n = Math.min(12, Math.ceil(H / 900));
    const at = (i) => (Math.ceil(H / 900) <= 12 ? i * 900 : Math.round(i * (H - 900) / (n - 1)));   // long pages: evenly spaced, always incl. the end
    const overlaps = OVERLAPS; step('desktop slices'); for (let i = 0; i < n; i++) { await page.evaluate((y) => window.scrollTo(0, y), at(i)); await page.waitForTimeout(QUICK ? 450 : 900); if (!QUICK) await page.evaluate(() => Promise.race([Promise.all(document.getAnimations().filter((a) => { const t = a.effect?.getComputedTiming?.(); return t && Number.isFinite(t.endTime) && t.endTime < 6000; }).map((a) => a.finished.catch(() => {}))), new Promise((r) => setTimeout(r, 3000))])).catch(() => {}); /* finite reveals finish before the shot */ await page.screenshot({ path: path.join(OUT, `slice-${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 70 }); const ov = await page.evaluate(TEXT_OVERLAP).catch(() => []); if (ov.length) overlaps.push(`slice-${String(i + 1).padStart(2, '0')}: ${ov.slice(0, 2).join(' · ')}`); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300); }
  step('desktop scroll + contrast'); await scrollThrough(page, { contrast: true });
  step('desktop collect'); D = await page.evaluate(COLLECT); D.textOverlap = OVERLAPS;
  D.firstFrame = firstFrame;
  if (/just a moment|attention required|security verification|access denied|are you a robot/i.test((D.title || '') + ' ' + (await page.evaluate(() => document.body.innerText.slice(0, 400))))) {
    add('FAIL', 'load.blocked', 'The page served a bot or security challenge, so the results describe the challenge page, not the site. Audit a local build or a preview URL instead.');
  }
  D.contrast = await page.evaluate(() => ({ checked: window.__cs.checkedCount, low: window.__cs.lowCount, lowBody: window.__cs.lowBody || 0, examples: window.__cs.low }));
  step('contrast over imagery');
  D.mediaContrast = { checked: 0, low: [] };
  const mediaTexts = await page.evaluate(() => window.__cs.media || []);
  if (mediaTexts.length) await page.addStyleTag({ content: '[data-sg-hide],[data-sg-hide] *{color:transparent!important;-webkit-text-fill-color:transparent!important;caret-color:transparent!important}' });
  for (let i = 0; i < mediaTexts.length; i++) {
    const m = mediaTexts[i]; const sel = `[data-sg-m="${i}"]`;
    const box = await page.evaluate(async (sel) => { const el = document.querySelector(sel); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); await new Promise((r) => setTimeout(r, 200)); const r = el.getBoundingClientRect(); return { x: Math.max(0, r.left), y: Math.max(0, r.top), w: Math.min(innerWidth, r.right) - Math.max(0, r.left), h: Math.min(innerHeight, r.bottom) - Math.max(0, r.top) }; }, sel).catch(() => null);
    if (!box || box.w < 4 || box.h < 4) continue;
    await page.evaluate((sel) => document.querySelector(sel)?.setAttribute('data-sg-hide', ''), sel);
    const buf = await page.screenshot({ clip: { x: box.x, y: box.y, width: box.w, height: box.h }, type: 'png' }).catch(() => null);
    await page.evaluate((sel) => document.querySelector(sel)?.removeAttribute('data-sg-hide'), sel);
    if (!buf) continue;
    // contrast of the text colour against the worst 20% of the pixels behind it
    const ratio = await page.evaluate(async ({ b64, m }) => {
      const C = window.__cs; const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const k = Math.min(1, 240 / img.width); const cv = document.createElement('canvas'); cv.width = Math.max(1, Math.round(img.width * k)); cv.height = Math.max(1, Math.round(img.height * k));
      const g = cv.getContext('2d'); g.drawImage(img, 0, 0, cv.width, cv.height); const px = g.getImageData(0, 0, cv.width, cv.height).data; const rs = [];
      for (let j = 0; j < px.length; j += 4) { const bg = [px[j], px[j + 1], px[j + 2], 1]; rs.push(C.contrast(C.over([m.fg[0], m.fg[1], m.fg[2], m.fg[3] * m.op], bg), bg)); }
      rs.sort((a, b) => a - b); return rs[Math.floor(rs.length * 0.2)] || 21;
    }, { b64: buf.toString('base64'), m }).catch(() => null);
    if (ratio == null) continue;
    D.mediaContrast.checked++;
    const large = m.size >= 24 || (m.size >= 18.66 && m.bold);
    if (ratio < (large ? 3 : 4.5)) D.mediaContrast.low.push({ ratio: +ratio.toFixed(2), large, text: m.text, kind: m.kind });
  }
  D.consoleErrors = [...new Set(consoleErrors)].slice(0, 5);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  step('desktop full shot'); await page.screenshot({ path: path.join(OUT, 'desktop-full.jpg'), fullPage: true, type: 'jpeg', quality: 70 }).catch(() => {});
  await ctx.close();

} catch (e) {
  add('FAIL', 'load', 'Desktop pass failed: ' + String(e).slice(0, 300));
}
try {
  // ---------------- mobile ----------------
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mctx.addInitScript(() => { const k = () => { const st = document.createElement('style'); st.textContent = 'html,body{scroll-behavior:auto!important}'; (document.head || document.documentElement).appendChild(st); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', k); else k(); });   // smooth scrolling makes the contrast pass sample mid-scroll
  const mp = await mctx.newPage();
  step('mobile 390×844'); await mp.goto(url, { waitUntil: 'load', timeout: 45000 });
  await mp.waitForTimeout(QUICK ? 1200 : 2400);
  await mp.screenshot({ path: path.join(OUT, 'mobile-hero.png') });
  await mp.evaluate(PAGE_LIB);
  for (let i = 0; i < 30; i++) { await mp.evaluate(() => scrollBy(0, innerHeight * 0.6)); await mp.waitForTimeout(QUICK ? 120 : 220); }
  await mp.waitForTimeout(700);
  step('mobile measure'); M = await mp.evaluate(MOBILE);
  await mp.evaluate(() => window.scrollTo(0, 0)); await mp.waitForTimeout(400);
  step('mobile full shot'); await mp.screenshot({ path: path.join(OUT, 'mobile-full.jpg'), fullPage: true, type: 'jpeg', quality: 65 }).catch(() => {});
  await mctx.close();
} catch (e) { add('WARN', 'load', 'Mobile pass failed: ' + String(e).slice(0, 200)); }
try {
  // ---------------- reduced motion: is first-viewport content visible without scrolling/animation? ----------------
  const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await rctx.addInitScript(() => { const k = () => { const st = document.createElement('style'); st.textContent = 'html,body{scroll-behavior:auto!important}'; (document.head || document.documentElement).appendChild(st); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', k); else k(); });   // smooth scrolling makes the contrast pass sample mid-scroll
  const rp = await rctx.newPage();
  step('reduced motion'); await rp.goto(url, { waitUntil: 'load', timeout: 45000 });
  await rp.waitForTimeout(1200);
  await rp.evaluate(PAGE_LIB);
  RM = await rp.evaluate(() => { const C = window.__cs; const els = [...document.querySelectorAll('h1,h2,h3,p,a,button')].filter((el) => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 && C.vis(el) && el.innerText.trim(); }); return { firstViewport: els.length, hidden: els.filter((el) => !C.intentionallyHidden(el) && C.cumOpacity(el) < 0.1).map((el) => el.innerText.trim().slice(0, 30)).slice(0, 5) }; });
  step('reduced-motion shot'); await rp.screenshot({ path: path.join(OUT, 'reduced-motion-hero.png') });
  await rctx.close();
} catch (e) { add('WARN', 'load', 'Reduced-motion pass failed: ' + String(e).slice(0, 200)); }
step('closing browser'); await Promise.race([browser.close(), new Promise((r) => setTimeout(r, 5000))]);   // Chrome sometimes never acks close; results are already collected
if (server) server.close();

// ======================================================================================
// Rules
// ======================================================================================
if (D.families) {
  const fams = D.families.map(([f]) => f);
  const OVERUSED = ['Poppins', 'Montserrat', 'Roboto', 'Open Sans', 'Lato', 'Raleway', 'Nunito', 'Plus Jakarta Sans', 'Space Grotesk', 'Syne', 'Clash Display', 'Playfair Display', 'DM Serif Display', 'Bebas Neue', 'Anton', 'Arial', 'Helvetica', 'Times New Roman', 'Times'];
  const typeLine = (SPINE.match(/^\s*TYPE\s*:[\s\S]*?(?=^\s*[A-Z][A-Z ?]{2,}\s*:|(?![\s\S]))/m) || [''])[0];   // the TYPE key plus any continuation lines
  if (fams.length === 4 && REGISTER === 'loud' && /hand|marker|script|caveat|cursive/i.test(typeLine) && /(pixel|led|num|mono|price)/i.test(typeLine)) add('PASS', 'type.families', `4 role-locked faces declared in the Spine: ${fams.join(', ')}`);
  else if (fams.length === 4 && REGISTER === 'loud') add('WARN', 'type.families', '4 type families: allowed in the Loud register only when each face has exactly one written job (statement · body · pixel/mono for numbers · one handwritten word per heading). Confirm the jobs in the Spine (techniques.md §66).', fams);
  else if (fams.length > 3) add('FAIL', 'type.families', `${fams.length} type families in use (top tier: median 2, max 3; Loud may run 4 role-locked faces)`, fams);
  else add('PASS', 'type.families', `${fams.length} famil${fams.length === 1 ? 'y' : 'ies'}: ${fams.join(', ')}`);
  const primary = fams[0] || '';
  if (/^(Times New Roman|Times|serif|-apple-system|system-ui|sans-serif|Arial|Helvetica)$/i.test(primary)) add('FAIL', 'type.load', `Primary text family is a fallback (${primary}). The web font did not load or none was set.`);
  const over = fams.filter((f) => OVERUSED.some((o) => f.toLowerCase() === o.toLowerCase()));
  if (over.length) add('WARN', 'type.overused', `Overused default typeface(s) as a brand face: ${over.join(', ')}. See typography.md §6 for alternatives.`);
}
const big = (D.largest || [])[0];
if (big) {
  if (D.h1Count === 0) add('FAIL', 'semantics.h1', 'No <h1> on the page');
  else if (D.h1Count > 1) add('WARN', 'semantics.h1', `${D.h1Count} <h1> elements`);
  const VOICE_FACE = /caveat|hand|script|marker|kalam|patrick|indie flower|gochi|pixel|silkscreen|doto|vt323|press start|dot ?gothic|lcd|dseg|led/i;   // role voices (techniques.md §66): never tightened or weight-checked
  const disp = (D.display || []).filter((d) => d.size >= 56 && !VOICE_FACE.test(d.family || ''));
  const loose = disp.filter((d) => d.lh > 1.15);
  const pos = disp.filter((d) => d.ls > 0.012 && !d.upper);
  const deflt = disp.filter((d) => Math.abs(d.ls) < 0.004 && !d.upper);
  const bold = disp.filter((d) => d.weight >= 700 && !d.condensed);
  const sum = `largest ${Math.round(big.size)}px · lh ${big.lh} · ${big.ls}em · weight ${big.weight} · ${big.family}`;
  if (!loose.length && !pos.length && !bold.length && !deflt.length) add('PASS', 'type.display', `Display type within norms (${sum})`);
  if (loose.length) add('WARN', 'type.display.leading', `Display line-height above 1.15 on ${loose.length} element(s). Measured norm 0.85–1.05, never above 1.1.`, loose.map((d) => `${Math.round(d.size)}px lh ${d.lh} "${d.text.slice(0, 30)}"`));
  if (pos.length) add('WARN', 'type.display.tracking', `Positive tracking on large display type (${pos.length}). Sans display sits at −0.02 to −0.05em unless it is a deliberate warm/condensed stance.`, pos.map((d) => `${Math.round(d.size)}px ${d.ls}em`));
  if (deflt.length) add('WARN', 'type.display.tracking', `Default (0) tracking on ${deflt.length} display element(s) ≥56px. Tighten to about −0.02 to −0.05em (serif or condensed faces may stay near 0).`, deflt.map((d) => `${Math.round(d.size)}px ${d.family} "${d.text.slice(0, 24)}"`));
  if (bold.length) add('WARN', 'type.display.weight', `Bold (≥700) display on ${bold.length} element(s). Top tier uses 300–510; bold needs a brand reason.`, bold.map((d) => `${Math.round(d.size)}px w${d.weight}`));
  if (D.h1Words > 12) add('WARN', 'copy.h1', `h1 is ${D.h1Words} words (median 4, p90 9)`);
  if (D.h1Lines > 3) add('WARN', 'layout.h1', `h1 wraps to ~${D.h1Lines} lines at 1440px (keep ≤2, or ≤3 bottom-left editorial)`);
}
if (D.labelCount > 0 && D.labelsTight?.length) add('WARN', 'type.labels', `${D.labelsTight.length}/${D.labelCount} small uppercase labels have tracking < 0.02em. Track ≤12px caps out to +0.04–0.12em.`, D.labelsTight);
if (D.bigCapsSentences?.length) add('WARN', 'type.caps', 'Sentence-length all-caps at ≥32px. Use uppercase only for labels, or as a deliberate stance.', D.bigCapsSentences);
if (D.tinyText > 0) add('WARN', 'type.tiny', `${D.tinyText} non-uppercase text element(s) under 11px`);
if (D.textShadowBig) add('WARN', 'type.effects', `text-shadow on ${D.textShadowBig} large text element(s). Never seen on the top tier.`);
if (D.textStroke) add('WARN', 'type.effects', `Outlined/stroked text on ${D.textStroke} element(s)`);
if (D.textOverlap?.length) add('FAIL', 'layout.textOverlap', `Text drawn over other text while scrolling (${D.textOverlap.length} slice(s)). Usually a sticky poster that stays pinned while the rest of its section scrolls over it: pin it inside its own track, or let it scroll away first. Open the slices named here.`, D.textOverlap.slice(0, 5));
if (D.stuckReveal?.length) add('FAIL', 'motion.stuckReveal', 'Text is still blurred or hidden after scrolling the whole page: a reveal never finished. Usually a selector more specific than .is-in sets filter/transform; tune --reveal-filter / --reveal-transform instead (motion.md 5.1).', D.stuckReveal);
if (D.gradientText?.length) add('WARN', 'color.gradientText', 'Gradient-filled headline text. Use a two-tone heading (ink + 60% ink) instead.', D.gradientText);
if (D.longMeasure?.length) add('WARN', 'type.measure', `${D.longMeasure.length} paragraph(s) wider than ~90 characters (aim 45–75ch)`, D.longMeasure);

// range: default look
if (D.defaultLook) {
  const { sig, score } = D.defaultLook; const hit = Object.entries(sig).filter(([, v]) => v).map(([k]) => k);
  if (score >= 4) add('WARN', 'style.defaultLook', `Matches ${score}/6 traits of the skill's default look (${hit.join(', ')}). Unless the brief demands it, change at least 2 axes (ground, type genre, image medium, composition, motion). See references/range.md §3.`);
  else add('PASS', 'style.defaultLook', `Distinct from the default look (${score}/6 traits${hit.length ? ': ' + hit.join(', ') : ''})`);
}

// colour
if (D.pureBW) {
  if (D.pureBW.blackOnWhite > 3) add('WARN', 'color.pure', `Pure #000 text on pure #FFF (${D.pureBW.blackOnWhite} text blocks). Tint the ink (#171717) and/or the paper.`);
  if (D.pureBW.whiteOnBlack > 3) add('WARN', 'color.pure', `Pure #FFF text on pure #000 (${D.pureBW.whiteOnBlack}). Use #EDEDF3–#F7F8F8 on a tinted near-black.`);
}
if (D.accentHues) {
  const n = D.accentHues.length;
  const list = D.accentHues.map((h) => `${h.hue}° (w${h.weight}) e.g. ${h.example}`);
  if (n === 0) add('INFO', 'color.accent', `No accent hue in the page chrome${D.artHues?.length ? ` (illustrations/replicas use: ${D.artHues.join(', ')})` : ' (fully neutral)'}. Fine if that matches your Spine.`);
  else if (n === 1) add('PASS', 'color.accent', `One accent hue (${list[0]})`);
  else {
    const fields = D.fieldHues || [];
    const nonField = D.accentHues.filter((h) => !fields.some((f) => Math.abs(((h.hue - f + 540) % 360) - 180) <= 15));
    if (fields.length >= 2 && nonField.length <= 1) add('PASS', 'color.accent', `Colour-block system: ${fields.length} hues used as full-bleed fields${nonField.length ? ' + 1 accent' : ''}. Loud register is fine if each hue has one meaning (range.md §1).`, list);
    else if (n === 2) add('WARN', 'color.accent', 'Two accent hue families. In the Quiet register use one; in Loud, use them as section fields with one meaning each (range.md).', list);
    else add('FAIL', 'color.accent', `${n} accent hue families sprinkled through the UI. Use one accent (Quiet), or assign each hue to a full-bleed field with one meaning (Loud, range.md §1).`, list);
  }
  if (D.chromaCoverage > 25 && n > 1 && (D.fieldHues || []).length < 2) add('WARN', 'color.coverage', `Saturated colour covers ~${D.chromaCoverage}% of the page area across multiple hues`);
  else add('INFO', 'color.coverage', `Saturated background coverage ≈ ${D.chromaCoverage}% of page area`);
}
{
  const gs = D.gradients || [];
  const blob = gs.filter((g) => g.coolPurple && g.hues >= 2 && (g.hero || g.area > 0.6));
  const other = gs.filter((g) => !blob.includes(g));
  const fmt = (g) => `${g.el} · ${Math.round(g.area * 100)}% of a viewport · ${g.hues} hue(s)${g.hero ? ' · in hero' : ''}`;
  if (blob.length) add('FAIL', 'color.gradientBlob', `Large multi-hue blue/purple gradient background (${blob.length}). This is the #1 AI tell unless it is a single art-directed piece (Stripe's ribbon).`, [...new Set(blob.map(fmt))]);
  if (other.length) add('WARN', 'color.gradient', `${other.length} large chromatic gradient(s). Gradients should be functional or art-directed.`, [...new Set(other.map(fmt))]);
}
if (D.glows > 2) add('WARN', 'color.glow', `${D.glows} element(s) with coloured glow shadows (≥30px blur)`);

// contrast
if (D.contrast) {
  const c = D.contrast;
  if (c.low > 0) add(c.lowBody > 0 || c.low > 6 ? 'FAIL' : 'WARN', 'a11y.contrast', `${c.low}/${c.checked} text element(s) below WCAG AA contrast${c.lowBody ? ` (${c.lowBody} are body paragraphs)` : ''}. If they sit inside a product-UI replica, mark the replica role="img" + aria-label (imagery.md §1).`, c.examples);
  else add('PASS', 'a11y.contrast', `All ${c.checked} checked text elements on solid grounds meet AA.`);
}
if (D.mediaContrast?.checked) {
  const ml = D.mediaContrast.low;
  if (ml.length) add(ml.some((x) => !x.large) ? 'FAIL' : 'WARN', 'a11y.contrast.media', `${ml.length}/${D.mediaContrast.checked} text element(s) over imagery fall below AA against the worst 20% of the pixels behind them. ${ml.some((x) => x.kind === 'image') ? 'Over photos/canvas: re-crop or regenerate so a clean zone sits behind the type, or put the control on a solid pill (techniques.md §68); ghost buttons on photos are the usual culprit. ' : ''}${ml.some((x) => x.kind === 'pattern') ? 'Over CSS patterns/gradients: darken the text or lighten the pattern.' : ''}`, ml.map((x) => `${x.ratio}:1 ${x.kind} "${x.text}"`));
  else add('PASS', 'a11y.contrast.media', `All ${D.mediaContrast.checked} text elements over imagery meet AA (sampled from pixels)`);
}

// shape
if (D.buttonCamps) {
  const camps = D.buttonCamps.map(([k]) => k);
  if (camps.length > 1) add('WARN', 'shape.buttons', `Buttons mix radius camps (${D.buttonCamps.map(([k, n]) => `${k}×${n}`).join(', ')}). Pick one camp: 0–4px, 6–10px, or pill (nav may differ).`, D.buttons.filter((b) => !b.nav).map((b) => `${b.camp} ${b.h}px "${b.text}"${b.nav ? ' (nav)' : ''}`));
  else if (camps.length) add('PASS', 'shape.buttons', `Consistent button radius camp: ${camps[0]}`);
}
if (D.bigRadiusCards > 3 && DIRECTION !== 9 && REGISTER !== 'loud') add('WARN', 'shape.cards', `${D.bigRadiusCards} card(s) with radius ≥28px (top tier: 4–12px; 16–28 only for playful directions or media)`);
if (D.dropShadows > 6) add('WARN', 'shape.shadows', `${D.dropShadows} elements have drop shadows. Use rings, fills, or hairlines; keep real shadow for floating product windows.`);

// layout / hero
if (D.heroCtas) {
  if (D.heroCtas.length > 3) add('FAIL', 'hero.ctas', `${D.heroCtas.length} CTAs in the first viewport (max 2)`, D.heroCtas);
  else if (D.heroCtas.length === 3) add('WARN', 'hero.ctas', '3 CTAs in the first viewport (max 2: primary + ghost/text)', D.heroCtas);
  else add('PASS', 'hero.ctas', `${D.heroCtas.length} hero CTA(s)`);
}
if (D.badgeAboveH1?.length) add('WARN', 'hero.badge', 'Pill badge directly above the h1 (template tell). Use a real changelog link or a live proof chip, or drop it.', D.badgeAboveH1);
if (D.h1Centered && D.h2CenteredShare > 0.7 && D.h2Count >= 4) add('WARN', 'layout.centered', `Centered-everything: centered hero and ${Math.round(D.h2CenteredShare * 100)}% of section headings centered. Break symmetry after the hero.`);
else if (D.h2CenteredShare > 0.8 && D.h2Count >= 5) add('WARN', 'layout.centered', `${Math.round(D.h2CenteredShare * 100)}% of section headings are centered`);
if (D.iconGrids?.length) add('WARN', 'layout.iconCards', 'Icon + title + text card grid detected (the #1 template pattern). Replace with feature chapters, numbered type blocks, or real media.', D.iconGrids);
if (D.sectionCV != null && D.sectionCV < 0.18) add('WARN', 'layout.rhythm', `Section heights are nearly uniform (CV ${D.sectionCV}). Vary density: tight band, big void, full-bleed, narrow column.`);
if (D.pageVh) {
  const L = LENGTH[DIRECTION];
  if (L) add(D.pageVh < L[0] * 0.75 || D.pageVh > L[1] * 1.3 ? 'WARN' : 'INFO', 'layout.length', `Page length ${D.pageVh} viewports (direction ${DIRECTION} norm ${L[0]}–${L[1]})`);
  else add('INFO', 'layout.length', `Page length ${D.pageVh} viewports (SaaS 9–10 · luxury 3–9 · editorial/award 12–23; pass --direction for a direction-specific check)`);
}

// copy
if (D.emoji?.length) add('FAIL', 'copy.emoji', 'Emoji in headings or buttons', D.emoji);
if (D.exclaim?.length) add('WARN', 'copy.exclaim', 'Exclamation marks in h1/h2', D.exclaim);
if (D.lorem) add('FAIL', 'copy.placeholder', 'Lorem ipsum / placeholder copy present');
if (D.banned?.length) add('WARN', 'copy.hype', 'Hype or template phrases found. Rewrite with copy.md formulas.', D.banned);
if (D.title === '' || D.title == null) add('WARN', 'meta.title', 'Missing <title>');
if (!D.metaDesc) add('WARN', 'meta.description', 'Missing meta description');
if (!D.lang) add('WARN', 'a11y.lang', 'Missing <html lang>');

// motion
if (D.motion) {
  const m = D.motion;
  const used = (m.usedEases || []).filter(([e]) => e !== 'ease' || true);
  const custom = used.filter(([e]) => /cubic-bezier/.test(e));
  if (used.length && !custom.length) add('WARN', 'motion.ease', `Elements transition only with default eases (${used.map(([e, n]) => `${e}×${n}`).join(', ')}). Define a house ease, e.g. cubic-bezier(.16,1,.3,1).`);
  else if (custom.length) add(custom.length > 3 ? 'WARN' : 'PASS', 'motion.ease', `Eases in use: ${used.map(([e, n]) => `${e}×${n}`).join(', ')}${custom.length > 3 ? '. Many curves; standardise on one house ease + one in-out.' : ''}`);
  if ((m.transitions > 0 || m.keyframes > 0 || m.revealEls > 0) && !m.reducedMotion) add('WARN', 'motion.reduced', 'Animations present but no prefers-reduced-motion handling found');
  if (m.lenis) add('INFO', 'motion.smoothScroll', 'Smooth scroll (Lenis) detected. Appropriate only for editorial, place, deep-tech, and immersive directions.');
}
if (RM.hidden?.length) add('FAIL', 'motion.reducedHidden', 'With reduced motion on, first-viewport content stays invisible. Show the final state under prefers-reduced-motion (decorative UI replicas: mark them role="img").', RM.hidden);
if (D.hiddenText?.length) add('WARN', 'motion.neverRevealed', `Text still invisible after scrolling the whole page (${D.hiddenText.length}). Is a reveal script broken?`, D.hiddenText);
if (D.autoplayVideos && !D.pauseControl) add('WARN', 'a11y.video', `${D.autoplayVideos} autoplay video(s) without a visible pause/play control`);

if (D.firstFrame?.h1Hidden || D.firstFrame?.hidden?.length) add('FAIL', 'hero.firstFrame', 'Hero content is invisible in the first frame (waiting for an animation or scroll). Hero copy and CTAs must be visible on load.', D.firstFrame.hidden);
if (D.dupIds?.length) add('FAIL', 'semantics.ids', 'Duplicate id attributes (anchors and labels will break)', D.dupIds);
if (D.hiddenShown?.length) add('WARN', 'semantics.hidden', 'Elements with the hidden attribute are still displayed (a display rule overrides [hidden]). Add [hidden]{display:none!important}.', D.hiddenShown);

// a11y basics
if (D.imgNoAlt) add('WARN', 'a11y.alt', `${D.imgNoAlt} <img> without an alt attribute`);
if (D.unnamedControls) add('WARN', 'a11y.names', `${D.unnamedControls} link(s)/button(s) without an accessible name`);
if (D.consoleErrors?.length) add('WARN', 'runtime.errors', 'Console / page errors', D.consoleErrors);

// mobile
if (M.overflow != null) {
  if (M.overflow > 1) add('FAIL', 'mobile.overflow', `Horizontal overflow at 390px (${M.overflow}px)`, M.offenders);
  else add('PASS', 'mobile.overflow', 'No horizontal overflow at 390px');
  if (M.smallCount) add('WARN', 'mobile.targets', `${M.smallCount} tap target(s) under 24px at 390px (aim ≥44px for buttons)`, M.small);
  if (M.h1Size && (M.h1Size < 28)) add('WARN', 'mobile.h1', `Mobile h1 is ${Math.round(M.h1Size)}px (sentence h1 norm 32–44px)`);
  if (M.tinyBody) add('WARN', 'mobile.body', `${M.tinyBody} paragraph(s) under 13px on mobile`, M.tinyEx);
}

// ======================================================================================
const order = { FAIL: 0, WARN: 1, PASS: 2, INFO: 3 };
findings.sort((a, b) => order[a.level] - order[b.level]);
const counts = findings.reduce((m, f) => ((m[f.level] = (m[f.level] || 0) + 1), m), {});
const profile = D.largest ? {
  families: (D.families || []).map(([f, n]) => `${f}×${n}`),
  display: D.largest.slice(0, 3).map((d) => `${Math.round(d.size)}px/${d.lh}/${d.ls}em w${d.weight} "${d.text.slice(0, 28)}"`),
  bodySize: D.bodySize, weights: (D.weights || []).map(([w, n]) => `${w}×${n}`), upperShare: D.upperShare,
  paper: D.paper ? `rgb(${D.paper.slice(0, 3).map(Math.round).join(',')})` : null,
  accents: (D.accentHues || []).map((h) => h.example), buttons: (D.buttons || []).slice(0, 5).map((b) => `${b.camp} ${b.h}px "${b.text}"`),
  eases: (D.motion?.beziers || []).map(([b]) => b), nav: D.nav, pageVh: D.pageVh,
} : null;
const report = { url, outDir: OUT, ms: Date.now() - t0, counts, profile, findings, screenshots: ['desktop-hero.png', 'slice-01.jpg … (one per viewport)', 'desktop-full.jpg', 'mobile-hero.png', 'mobile-full.jpg', 'reduced-motion-hero.png'].map((f) => path.join(OUT, f)) };
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ ...report, raw: { desktop: D, mobile: M, reducedMotion: RM } }, null, 1));

if (AS_JSON) console.log(JSON.stringify(report, null, 1));
else {
  const icon = { FAIL: '✖ FAIL', WARN: '! WARN', PASS: '✔ PASS', INFO: '· INFO' };
  console.log(`\nStudio Grade audit: ${url}\n${'─'.repeat(72)}`);
  if (profile) {
    console.log('Measured profile');
    console.log(`  type     ${profile.families.join(' · ')}`);
    console.log(`  display  ${profile.display.join('\n           ')}`);
    console.log(`  body     ${profile.bodySize}px · weights ${profile.weights.join(' ')} · uppercase ${Math.round(profile.upperShare * 100)}%`);
    console.log(`  colour   paper ${profile.paper} · accents ${profile.accents.length ? profile.accents.join(' | ') : 'none'}`);
    console.log(`  buttons  ${profile.buttons.join(' · ') || '—'}`);
    console.log(`  motion   ${profile.eases.join(' ') || 'no custom eases'}`);
    console.log('─'.repeat(72));
  }
  for (const f of findings) {
    console.log(`${icon[f.level]}  [${f.rule}] ${f.msg}`);
    for (const e of f.examples || []) console.log(`           – ${e}`);
  }
  console.log('─'.repeat(72));
  console.log(`${counts.FAIL || 0} fail · ${counts.WARN || 0} warn · ${counts.PASS || 0} pass   (${(report.ms / 1000).toFixed(1)}s)`);
  console.log(`Screenshots → ${OUT}  (open desktop-hero.png, the slice-NN.jpg viewports and mobile-hero.png, and judge every one by eye)`);
  console.log('The script cannot judge taste. Also run the squint, logo, and template tests (SKILL.md Step 6).\n');
}
// exit only once stdout has flushed: on macOS a pipe is async, and an early exit drops the JSON
process.exitCode = counts.FAIL ? 1 : 0;
process.stdout.write('', () => process.exit());
