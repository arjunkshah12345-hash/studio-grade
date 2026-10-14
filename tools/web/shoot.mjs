// Captures case-study media for each build → web/src/media/<slug>/{hero.jpg, mobile.jpg, s-01..s-08.jpg, meta.json}
// Usage (server must serve the repo root on :4317): node tools/web/shoot.mjs nocturne sprout ...
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'web/src/media');
let b; try { b = await chromium.launch(); } catch { b = await chromium.launch({ channel: 'chrome' }); }
const noSmooth = (p) => p.addInitScript(() => { const k = () => { const st = document.createElement('style'); st.textContent = 'html,body{scroll-behavior:auto!important}'; (document.head || document.documentElement).appendChild(st); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', k); else k(); });   // smooth scroll makes screenshots tear
const settle = async (p) => { await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(+process.env.SHOOT_WAIT || 2200); };   // SHOOT_WAIT=6000 for heroes that animate in for longer
for (const slug of process.argv.slice(2)) {
  const url = `http://127.0.0.1:4317/tests/builds/${slug}/index.html`;
  const dir = path.join(OUT, slug); fs.mkdirSync(dir, { recursive: true });
  const c1 = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p1 = await c1.newPage(); await noSmooth(p1); await p1.goto(url); await settle(p1);
  await p1.screenshot({ path: path.join(dir, 'hero.jpg'), type: 'jpeg', quality: 80 }); await c1.close();
  const c2 = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p2 = await c2.newPage(); await noSmooth(p2); await p2.goto(url); await settle(p2);
  const H = await p2.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 450) { await p2.mouse.wheel(0, 450); await p2.waitForTimeout(140); }
  const n = Math.min(8, Math.max(3, Math.round(H / 900)));
  for (let i = 0; i < n; i++) {
    const y = Math.round((i + 1) * (H - 900) / n);
    await p2.evaluate((y) => window.scrollTo(0, y), y); await p2.waitForTimeout(1000);
    await p2.screenshot({ path: path.join(dir, `s-${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 76 });
  }
  const meta = await p2.evaluate(() => ({ title: document.title, vh: +(document.documentElement.scrollHeight / innerHeight).toFixed(1) }));
  meta.slices = n; await c2.close();
  const c3 = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p3 = await c3.newPage(); await noSmooth(p3); await p3.goto(url); await settle(p3);
  await p3.screenshot({ path: path.join(dir, 'mobile.jpg'), type: 'jpeg', quality: 78 }); await c3.close();
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta));
  console.log('shot', slug, meta);
}
await b.close();
