// Renders Studio Grade launch images → launch/images/   (needs: node tools/web/build.mjs, web/dist served on :4318)
// node tools/web/launch-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const { chromium } = createRequire(path.join(ROOT, 'tools/x.js'))('playwright');
const OUT = path.join(ROOT, 'launch/images');
const TMP = path.join(ROOT, 'web/dist/_launch');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(TMP, { recursive: true });
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// the audit runs shown on the site (real output, abridged), read straight from app.js
const app = fs.readFileSync(path.join(ROOT, 'web/src/app.js'), 'utf8');
const RUNS = Function(`return ${app.slice(app.indexOf('const RUNS = ') + 13, app.indexOf('};', app.indexOf('const RUNS = ')) + 1)}`)();
const BUILDS = [['nocturne', 'Nocturne', 'Music festival'], ['sprout', 'Sprout', 'Consumer app'], ['tally', 'Tally', 'Fintech API'], ['fieldwork', 'Fieldwork', 'Landscape architecture'], ['relay', 'Relay', 'Developer tool'], ['halden2', 'Halden', 'Hospitality'], ['kestrel2', 'Kestrel K-1', 'Industrial hardware']];

const page = (w, h, css, body) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,300..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden}*{box-sizing:border-box}
.d{font-family:'Mona Sans';font-stretch:116%;font-weight:620;letter-spacing:-.045em}.mono{font-family:'JetBrains Mono'}${css}</style></head><body>${body}</body></html>`;

const mark = (c = '#fff') => `<span style="display:inline-flex;align-items:center;gap:12px;font:640 26px/1 'Mona Sans';font-stretch:116%;letter-spacing:-.03em;color:${c}"><i style="width:20px;height:20px;border-radius:4px;background:#2B2BF2;transform:rotate(-8deg);box-shadow:inset 0 0 0 3.5px #2B2BF2,inset 0 0 0 6px ${c === '#fff' ? '#fff' : '#fff'}"></i>Studio Grade</span>`;
const term = (r, title, w) => `<div class="t ${r.fail ? 'f' : 'p'}"><div class="tb"><i></i><i></i><i></i><span class="mono">${esc(title)}</span></div><pre class="mono">${r.lines.map(([k, s]) => `<span class="l-${k || 'x'}">${esc(s)}</span>`).join('\n')}</pre><span class="st mono"><small>GRADE</small>${esc(r.grade)}</span></div>`;

const IMAGES = {
  // the seven builds: what the skill makes, on its own blue
  gallery: [1600, 900, `body{background:#2B2BF2;color:#F2F2FF;padding:64px 72px}
    .top{display:flex;justify-content:space-between;align-items:center}.top .mono{font-size:16px;color:#C9CAFF}
    h1{font-size:76px;line-height:.95;margin:34px 0 36px}
    .g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.g figure{margin:0}
    .g img{width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;border-radius:6px;display:block}
    .g figcaption{display:flex;justify-content:space-between;margin-top:9px;font:600 15px/1 'Mona Sans';color:#fff}.g figcaption span{font-weight:400;color:#C9CAFF}
    .g .cta{display:grid;align-content:end;gap:10px;padding:18px;border-radius:6px;background:#0B0B10;aspect-ratio:16/10}
    .cta .mono{font-size:13px;line-height:1.5;color:#C9CAFF}.cta b{font:620 26px/1 'Mona Sans';font-stretch:116%;letter-spacing:-.03em;color:#fff}`,
    `<div class="top">${mark()}<span class="mono">every one passed its own audit</span></div>
    <h1 class="d">Seven briefs. Seven agents.<br>One skill.</h1>
    <div class="g">${BUILDS.map(([s, n, k]) => `<figure><img src="/media/${s}/hero.jpg"><figcaption>${esc(n)}<span>${esc(k)}</span></figcaption></figure>`).join('')}
    <div class="cta"><b>Install it</b><span class="mono">npx skills add<br>arjunkshah12345-hash/studio-grade</span></div></div>`],

  // the audit: a template page vs a build made with the skill
  audit: [1600, 900, `body{background:#0B0B10;color:#ECECF2;padding:64px 72px}
    .top{display:flex;justify-content:space-between;align-items:center}.top .mono{font-size:16px;color:#A9A9FF}
    h1{font-size:68px;line-height:.98;margin:30px 0 34px;color:#fff}h1 span{color:rgb(236 236 242/.5)}
    .two{display:grid;grid-template-columns:1fr 1fr;gap:28px}
    .t{position:relative;background:#000;border-radius:12px;box-shadow:0 0 0 1px rgb(255 255 255/.14);height:520px;overflow:hidden}
    .tb{display:flex;align-items:center;gap:8px;padding:16px 20px;border-bottom:1px solid rgb(255 255 255/.1)}.tb i{width:11px;height:11px;border-radius:50%;background:rgb(255 255 255/.18)}
    .tb span{margin-left:10px;font-size:14px;color:rgb(255 255 255/.55)}
    pre{margin:0;padding:22px 24px;font-size:15.5px;line-height:1.85;white-space:pre-wrap;color:rgb(255 255 255/.8)}
    .l-f{color:#FF8371}.l-w{color:#F5C46A}.l-p{color:#8FE3A8}.l-s{color:#fff;font-weight:500}
    .st{position:absolute;right:24px;bottom:24px;transform:rotate(-6deg);border:2.5px solid;border-radius:8px;padding:9px 14px;font-size:20px;font-weight:500}
    .st small{display:block;font-size:11px;letter-spacing:.14em;margin-bottom:2px}.f .st{color:#FF8371}.p .st{color:#8FE3A8}`,
    `<div class="top">${mark()}<span class="mono">node scripts/audit.mjs · 1440 + 390px</span></div>
    <h1 class="d">It grades its own work. <span>Before you see it.</span></h1>
    <div class="two">${term(RUNS.slop, 'audit.mjs  template-page/index.html')}${term(RUNS.nocturne, 'audit.mjs  nocturne/index.html')}</div>`],
};

const b = await chromium.launch({ channel: 'chrome' });
for (const [name, [w, h, css, body]] of Object.entries(IMAGES)) {
  fs.writeFileSync(path.join(TMP, name + '.html'), page(w, h, css, body));
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await p.goto(`http://127.0.0.1:4318/_launch/${name}.html`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(OUT, name + '.png') });
  await p.close(); console.log('wrote', name + '.png');
}
await b.close();
fs.rmSync(TMP, { recursive: true });
fs.copyFileSync(path.join(ROOT, 'web/src/og.png'), path.join(OUT, 'card.png'));
console.log('copied card.png (the site OG card)');
