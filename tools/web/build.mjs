// Builds the Studio Grade website → web/dist/
// node tools/web/build.mjs   (run tools/web/shoot.mjs first for media)
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SRC = path.join(ROOT, 'web/src');
const DIST = path.join(ROOT, 'web/dist');
const SKILL = path.join(ROOT, 'studio-grade');
const REPO = 'arjunkshah12345-hash/studio-grade';
const INSTALL = `npx skills add ${REPO}`;
const SITE = 'https://studio-grade.vercel.app';

/* ------------------------------------------------------------------ projects */
const PROJECTS = [
  { slug: 'tidewell', name: 'Tidewell', kind: 'Café back office', brief: 'Tidewell reads a café’s supplier invoices, keeps count of the stock and drafts the weekly order for the owner to approve. For owners of one to three shops who do the books at night.', line: 'A golden-hour photograph composed around the headline; the product as small, real vignettes on crops of the series.', accent: '#22573F' },
  { slug: 'hush', name: 'Hush', kind: 'AI scribe for GPs', brief: 'An AI scribe for family doctors: it listens with the patient’s consent, drafts the note in the practice’s format, and nothing is saved until the doctor approves it.', line: 'A signed consult note set on a sepia engraving of the consulting room; every certification visibly a placeholder.', accent: '#7A2E22' },
  { slug: 'nightlight', name: 'Nightlight', kind: 'Bedtime stories', brief: 'A child picks three things from a toy box and Nightlight writes a gentle story with them, read aloud in a voice a parent records once. Always ends with the child asleep.', line: 'A clay bedroom and a working toy box: pick three, hear how the story starts.', accent: '#2B2F6B' },
  { slug: 'switchback', name: 'Switchback', kind: 'Hill-day planner', brief: 'Describe the hill day you want in Scotland and Switchback returns a route with timings, the weather window, escape routes and the last safe turn-back point. Planning help, not a guarantee.', line: 'A tear-off route card in a gouache Highland glen, morning sky to sunset ridge.', accent: '#2F5D50' },
  { slug: 'haul', name: 'Haul', kind: 'TypeScript migration', brief: 'Haul moves a JavaScript codebase to TypeScript one module at a time, runs the tests and opens small reviewed pull requests, so the move happens without a freeze.', line: 'A two-ink risograph moving day, and a tray of real vignettes: box 21, 212 tests, PR #418.', accent: '#3255A4' },
  // earlier builds: type- and drawing-led, ten other directions
  { slug: 'nocturne3', name: 'Nocturne', kind: 'Music festival', brief: 'A three-night festival of electronic and experimental music in Rotterdam’s old port warehouses: 41 artists on three stages, 22:00 to 06:00. Tickets are the one job.', line: 'Night photographs of the port warehouses; a ticket picker on the hero, a stage per chapter, dawn at the end.', accent: '#E0352B' },
  { slug: 'sprout3', name: 'Sprout', kind: 'Consumer app', brief: 'A plant-care app for people who keep killing their plants. Photograph a plant and it becomes a character that tells you when it’s thirsty, cold or stuck in the dark.', line: 'Needle-felted plants on a pink wall, each speaking up in a notification bubble.', accent: '#2F4A2C' },
  { slug: 'tally3', name: 'Tally', kind: 'Fintech API', brief: 'A payroll API that pays contractors in 90 countries in local currency, with tax forms and classification handled. For engineers and finance leads.', line: 'Frosted-glass coins arcing off a glass globe; a live payout card and a coin-per-contractor price slider.', accent: '#1D3CF2' },
  { slug: 'fieldwork3', name: 'Fieldwork', kind: 'Landscape architecture', brief: 'A 22-person Rotterdam studio designing parks, waterfronts and streets that hold rainwater, looking for commissions and recruits.', line: 'Architects’ watercolours: one square in two weathers, with pencil notes.', accent: '#2C4F6B' },
  { slug: 'relay', name: 'Relay', kind: 'Developer tool', brief: 'An AI code reviewer that reads every pull request, comments on the line, and learns a team’s conventions. For staff engineers and their managers.', line: 'A real pull-request review is the hero.', accent: '#F2A93B' },
  { slug: 'halden3', name: 'Halden', kind: 'Hospitality', brief: 'A fourteen-room hotel on a Norwegian fjord with a sauna on the water and a twenty-seat farm kitchen. Open March to November.', line: 'Nordic film photography; a booking bar on the fjord and a season calendar with the winter in mist.', accent: '#1B1E22' },
  { slug: 'onair', name: 'On Air', kind: 'Podcast studio', brief: 'A four-person Manchester studio that takes a founder from first recording to a launched show: a six-week Pilot or a monthly Season. No clients, quotes or listener numbers to show yet.', line: 'Pricing as cassette J-cards, an ON AIR lamp that lights as you scroll.', accent: '#E8432A' },
  { slug: 'lantern', name: 'Lantern', kind: 'Research lab', brief: 'A twelve-person nonprofit lab in Edinburgh studying when and why AI models change their answers under pressure. Papers, open datasets and a quarterly drift report. No real papers or funders to show yet.', line: 'A transcript where the model gives up the right answer, marked up in red pencil.', accent: '#B83C1E' },
  { slug: 'morrow3', name: 'Morrow', kind: 'Fragrance house', brief: 'A Copenhagen fragrance house with six scents, each named for an hour of the day, and a discovery set credited against a full bottle.', line: 'One bottle in window light at every hour; the page prints the hours on the labels.', accent: '#B98A4E' },
  { slug: 'darksky3', name: 'Leave the Lights', kind: 'Civic campaign', brief: 'A one-page campaign asking a northern city to adopt a dark-sky lighting ordinance: shielded, warm, dimmable street lights. The page is the argument.', line: 'The same fjord town under orange skyglow and under the Milky Way, scrubbed on scroll.', accent: '#B5805D' },
  { slug: 'kestrel2', name: 'Kestrel K-1', kind: 'Industrial hardware', brief: 'An autonomous drone that inspects wind-turbine blades: eleven minutes a blade, defects to 0.2 mm, a report the same day. For wind-farm operations directors.', line: 'An inspection drawn as it happens.', accent: '#F0541E' },
];

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const N = WORDS[PROJECTS.length] || String(PROJECTS.length);
const Ncap = N[0].toUpperCase() + N.slice(1);
const read = (p) => fs.readFileSync(p, 'utf8');
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function parseSpine(html) {
  const m = html.match(/<!--([\s\S]*?)-->/); if (!m) return {};
  const out = {}; let key = null;
  for (const raw of m[1].split('\n')) {
    const line = raw.replace(/\s+$/, '');
    const k = line.match(/^\s*([A-Z][A-Z ?/]+?)\s*:\s?(.*)$/);
    if (k && k[1].length <= 14) { key = k[1].trim().replace(/\?$/, ''); out[key] = k[2].trim(); }
    else if (key && line.trim() && !/^DESIGN SPINE/.test(line.trim())) out[key] += ' ' + line.trim();
  }
  return out;
}
for (const p of PROJECTS) {
  const html = read(path.join(ROOT, 'tests/builds', p.slug, 'index.html'));
  p.spine = parseSpine(html);
  p.register = (p.spine.REGISTER || '').match(/Quiet|Confident|Loud/i)?.[0] || '';
  p.register = p.register ? p.register[0].toUpperCase() + p.register.slice(1).toLowerCase() : '';
  if (!p.register) p.register = { relay: 'Confident' }[p.slug] || 'Confident';   // Relay predates the REGISTER line
  p.direction = (p.spine.DIRECTION || '').split(/[.—–:(]/)[0].replace(/^\s*\d+\s*/, (d) => d).trim();   // drop '(studio / service variant)'-style asides
  p.dirNo = (p.spine.DIRECTION || '').match(/^\s*(\d+)/)?.[1]?.padStart(2, '0') || '';
  p.dirName = (p.spine.DIRECTION || '').replace(/^\s*\d+\s*/, '').split(/[.—–(]/)[0].trim();
  p.palette = [...new Set(((p.spine.PALETTE || '') + ' ' + (p.spine.AXES || '')).match(/#[0-9A-Fa-f]{6}\b/g) || [])].slice(0, 6);
  try { const a = JSON.parse(read(path.join(SRC, 'media', `audit-${p.slug}.json`))); p.audit = a.counts; p.defaultLook = (a.findings.find((f) => f.rule === 'style.defaultLook')?.msg.match(/(\d)\/6/) || [])[1]; } catch { p.audit = null; }
  try { p.meta = JSON.parse(read(path.join(SRC, 'media', p.slug, 'meta.json'))); } catch { p.meta = { slices: 0, vh: '' }; }
}

/* ------------------------------------------------------------------ partials */
const stamp = (a, extra = '') => {
  if (!a) return '';
  return `<span class="stamp ${extra}" aria-label="Audit: ${a.FAIL || 0} fail, ${a.WARN || 0} warn"><span class="stamp-k">Audited</span><span class="stamp-v">${a.FAIL || 0} fail · ${a.WARN || 0} warn</span></span>`;
};
const cmd = (cls = '') => `<button class="cmd ${cls}" type="button" data-copy="${INSTALL}"><span class="cmd-p" aria-hidden="true">$</span><code>${INSTALL}</code><span class="cmd-s" aria-live="polite">Copy</span></button>`;
const nav = (here) => `
<header class="top">
  <a class="logo" href="/" aria-label="Studio Grade, home"><span class="logo-mark" aria-hidden="true"></span>Studio Grade</a>
  <nav class="top-nav" aria-label="Main">
    ${[['/work/', 'Work'], ['/method/', 'Method'], ['/evidence/', 'Evidence']].map(([h, t]) => `<a href="${h}"${here === t ? ' aria-current="page"' : ''} data-letter-roll>${t}</a>`).join('')}
  </nav>
  <a class="btn btn--blue top-cta" href="/#install">Install</a>
</header>`;
const foot = () => `
<footer class="foot">
  <div class="foot-top">
    <p class="foot-big">Give it a brief.</p>
    ${cmd('cmd--light')}
  </div>
  <div class="foot-grid">
    <div><a class="logo" href="/"><span class="logo-mark" aria-hidden="true"></span>Studio Grade</a><p class="foot-p">An agent skill for studio-grade web design. Measured from 99 live sites; MIT licensed.</p></div>
    <nav aria-label="Footer"><a href="/work/">Work</a><a href="/method/">Method</a><a href="/evidence/">Evidence</a><a href="https://github.com/${REPO}">GitHub</a><a href="https://skills.sh">skills.sh</a></nav>
    <div class="foot-grade"><span class="stamp stamp--self"><span class="stamp-k">This site</span><span class="stamp-v" data-self-grade>0 fail · 0 warn</span></span><p class="foot-p">Built with the skill, and audited by it at 1440 and 390px.</p></div>
  </div>
  <div class="foot-fine"><p>The 99 sites studied belong to their owners and the studios that made them. We measured public pages; none of their work is reproduced here.</p><p><span data-clock="Europe/Amsterdam"></span> Rotterdam · <span data-clock="America/Los_Angeles"></span> San Francisco</p></div>
</footer>`;
const layout = ({ title, desc, page, here, body, og = '/og.png', canonical = '/' }) => `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${canonical}">
<meta property="og:type" content="website"><meta property="og:url" content="${SITE}${canonical}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}${og}"><meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script>document.documentElement.classList.replace('no-js','js')</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,300..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css"><link rel="stylesheet" href="/styles.css">
</head>
<body data-page="${page}">
<a class="btn btn--blue skip" href="#main">Skip to content</a>
${nav(here)}
<main id="main">
${body}
</main>
${foot()}
<script type="module" src="/app.js"></script>
</body>
</html>
`;

/* ------------------------------------------------------------------ pages */
const shot = (p, cls = '', eager = false) => `<img class="${cls}" src="/media/${p.slug}/hero.jpg" alt="${esc(p.name)}: the first screen of the build" width="2880" height="1800" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="view-transition-name:shot-${p.slug}">`;
const total = PROJECTS.length;
const all = PROJECTS.map((p) => p.audit).filter(Boolean);
const sumF = all.reduce((a, b) => a + (b.FAIL || 0), 0);

function home() {
  const reel = [...PROJECTS, ...PROJECTS].map((p, k) => `
      <li class="reel-item"${k >= total ? ' aria-hidden="true"' : ''}><a href="/work/${p.slug}/"${k >= total ? ' tabindex="-1"' : ''}>
        <span class="reel-frame"><img src="/media/${p.slug}/hero.jpg" alt="${k >= total ? '' : esc(p.name)}" width="2880" height="1800" loading="${k < 3 ? 'eager' : 'lazy'}" decoding="async"></span>
        <span class="reel-cap"><b>${esc(p.name)}</b><span>${esc(p.register)} · ${esc(p.dirName)}</span></span></a></li>`).join('');
  const feat = ['tidewell', 'nightlight', 'hush'].map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean);
  return layout({
    title: 'Studio Grade: agents that design like studios',
    desc: 'An agent skill for studio-grade web design. Measured from 99 live sites by basement, Exo Ape, Work & Co, AREA 17 and more. Picks a direction, sets a register, and audits its own work.',
    page: 'home', here: '', canonical: '/',
    body: `
<section class="hero">
  <h1 class="hero-h" data-split="words">Agents that design like&nbsp;studios.</h1>
  <div class="hero-row">
    <p class="hero-sub" data-reveal>Studio Grade is an agent skill measured from 99 live sites by basement, Exo&nbsp;Ape, Work&nbsp;&amp;&nbsp;Co, AREA&nbsp;17 and 36 more. Your agent picks a direction, decides how loud to be, and audits its own work before you see it.</p>
    <div class="hero-actions" data-reveal style="--i:1">${cmd()}<a class="btn btn--line" href="/work/">See the work</a></div>
  </div>
</section>

<section class="reel" aria-label="Sites built with the skill">
  <div class="reel-head"><p>${Ncap} briefs, ${N} agents. Every one built with the skill and passed by its audit.</p><a href="/work/" class="reel-all">All work <span aria-hidden="true">→</span></a></div>
  <div class="reel-track" tabindex="0" aria-label="Scrolling reel of the work. Hover or focus to pause.">
    <ul class="reel-list">${reel}</ul>
  </div>
  <button class="reel-pause" type="button" aria-pressed="false">Pause</button>
</section>

<section class="statement wrap">
  <p class="statement-k" data-reveal>The problem</p>
  <h2 class="statement-h" data-scroll-fill>Every AI-built site looks the same, because it’s the average of everything. This skill was measured from the best of it, and it can tell when it’s being average.</h2>
</section>

<section class="film" id="film" aria-labelledby="film-h">
  <div class="film-in wrap">
    <div class="film-head"><h2 id="film-h" class="film-h" data-reveal>The launch film</h2><p class="film-meta" data-reveal style="--i:1">35 seconds · built with HyperFrames from the real builds and real audit output</p></div>
    <figure class="film-frame" data-reveal style="--i:2">
      <video class="film-video" controls playsinline preload="none" poster="/media/film/poster.jpg" width="1920" height="1080">
        <source src="/media/film/studio-grade-launch.mp4" type="video/mp4">
        <a href="/media/film/studio-grade-launch.mp4">Download the launch film (MP4)</a>
      </video>
    </figure>
  </div>
</section>

<section class="feat wrap" aria-labelledby="feat-h">
  <div class="sec-head"><h2 id="feat-h" class="sec-h" data-reveal>Selected work</h2><a class="link" href="/work/">All ${total} projects <span aria-hidden="true">→</span></a></div>
  <div class="feat-grid">
    ${feat.map((p, k) => `
    <a class="feat-card feat-card--${k}" href="/work/${p.slug}/">
      <span class="feat-frame">${shot(p)}</span>
      <span class="feat-meta"><span class="feat-name">${esc(p.name)}</span><span class="feat-kind">${esc(p.kind)} · ${esc(p.register)}</span>${stamp(p.audit, 'stamp--sm')}</span>
      <span class="feat-line">${esc(p.line)}</span>
    </a>`).join('')}
  </div>
</section>

<section class="how wrap" aria-labelledby="how-h">
  <div class="how-left">
    <p class="kicker">How it works</p>
    <h2 id="how-h" class="sec-h" data-reveal>Before a line of code, the agent commits to a spine.</h2>
    <p class="sec-p" data-reveal>A direction measured from real studio work, a register for how loud to be, five range axes so it doesn’t look like the last site, and a motif to carry through. Then tokens, then sections, then the audit.</p>
    <a class="link" href="/method/">The method <span aria-hidden="true">→</span></a>
  </div>
  <figure class="spine-card" aria-label="${esc(PROJECTS[0].name)}’s design spine, as written by the agent before it built the site">
    <figcaption><span>${PROJECTS[0].slug}/index.html</span><span>Design spine</span></figcaption>
    <dl>${['DIRECTION', 'REGISTER', 'IMAGES', 'MOTIF', 'VOICE'].filter((k) => PROJECTS[0].spine[k]).map((k) => `<div data-reveal><dt>${k}</dt><dd>${esc((PROJECTS[0].spine[k] || '').replace(/\s+/g, ' ').slice(0, 220))}</dd></div>`).join('')}</dl>
  </figure>
</section>

<section class="audit-sec" aria-labelledby="au-h">
  <div class="wrap audit-grid">
    <div>
      <p class="kicker kicker--light">The audit</p>
      <h2 id="au-h" class="sec-h" data-reveal>It grades its own work.</h2>
      <p class="sec-p" data-reveal>Thirty-plus measured rules at 1440 and 390 pixels: type, contrast, colour logic, the template tells, mobile overflow, reduced motion, hero visibility, and the default look. Then it opens a screenshot of every screen and looks.</p>
      <div class="tabs" role="tablist" aria-label="Audit examples"><button role="tab" aria-selected="true" aria-controls="term" data-run="slop">A template page</button><button role="tab" aria-selected="false" aria-controls="term" data-run="tidewell">Tidewell</button></div>
    </div>
    <div class="term" id="term" role="tabpanel"><div class="term-bar"><i></i><i></i><i></i><span>node scripts/audit.mjs index.html</span></div><pre class="term-out" id="term-out" aria-live="polite"></pre><span class="term-stamp stamp" aria-hidden="true"><span class="stamp-k">Grade</span><span class="stamp-v" id="term-grade">—</span></span></div>
  </div>
</section>

<section class="ev-teaser wrap" aria-labelledby="ev-h">
  <div class="sec-head"><h2 id="ev-h" class="sec-h" data-reveal>Measured, not guessed.</h2><a class="link" href="/evidence/">The evidence <span aria-hidden="true">→</span></a></div>
  <div class="nums">
    <div class="num"><b data-count="99">99</b><span>live sites measured, from computed styles to the motion values in their JavaScript</span></div>
    <div class="num"><b data-count="67">67</b><span>pixels: the median size of the largest type on a top site. Not 120.</span></div>
    <div class="num"><b data-count="4">4</b><span>words in the median hero headline</span></div>
    <div class="num"><b data-count="0">0</b><span>of 16 top product sites hijack your scroll</span></div>
  </div>
</section>

<section class="install wrap" id="install" aria-labelledby="in-h">
  <h2 id="in-h" class="install-h" data-reveal>One command.</h2>
  <div class="install-row">${cmd('cmd--big')}<p class="sec-p">Works with Claude Code, Cursor, Codex, Windsurf, Gemini, Copilot and every other agent on skills.sh. The audit needs Playwright in your project: <code class="inline">npm i -D playwright</code>.</p></div>
</section>`,
  });
}

function workIndex() {
  const rows = PROJECTS.map((p, k) => `
    <li class="w-row" data-register="${esc(p.register.toLowerCase())}" style="--acc:${p.accent}">
      <a href="/work/${p.slug}/" class="w-link">
        <span class="w-no">${String(k + 1).padStart(2, '0')}</span>
        <span class="w-name">${esc(p.name)}</span>
        <span class="w-kind">${esc(p.kind)}</span>
        <span class="w-reg"><span class="reg-dot" aria-hidden="true"></span>${esc(p.register)} · ${esc(p.dirName)}</span>
        <span class="w-thumb">${shot(p, 'w-img')}</span>
      </a>
    </li>`).join('');
  return layout({
    title: 'Work · Studio Grade', desc: `${Ncap} sites designed and built by agents with the Studio Grade skill, each passed by its audit.`, page: 'work', here: 'Work', canonical: '/work/',
    body: `
<section class="page-head wrap">
  <h1 class="page-h" data-split="words">Work</h1>
  <p class="page-sub" data-reveal>${Ncap} briefs given to ${N} agents that read only the skill. The newest five come first: Bright Product sites, each with its own image series generated with Codex to a written style bible (a photograph, an engraving, clay, gouache and a risograph print). The rest are type- and drawing-led builds across the other ten directions. Each passed the skill’s audit at 1440 and 390&nbsp;pixels.</p>
  <div class="filters" role="group" aria-label="Filter by register" data-reveal>
    ${['All', ...['Loud', 'Confident', 'Quiet'].filter((r) => PROJECTS.some((p) => p.register === r))].map((f, i) => `<button type="button" class="chip" aria-pressed="${i === 0}" data-filter="${f.toLowerCase()}">${f}<span class="chip-n">${f === 'All' ? total : PROJECTS.filter((p) => p.register === f).length}</span></button>`).join('')}
  </div>
</section>
<ol class="w-list">${rows}</ol>`,
  });
}

function caseStudy(p, k) {
  const next = PROJECTS[(k + 1) % total];
  const spineKeys = ['DIRECTION', 'REGISTER', 'AXES', 'DEFAULT', 'MOTIF', 'TYPE', 'PALETTE', 'HERO', 'IMAGERY', 'MOTION', 'SIGNATURES', 'CONVERSION', 'VOICE'];
  const slices = Array.from({ length: p.meta.slices || 0 }, (_, i) => `<li><img src="/media/${p.slug}/s-${String(i + 1).padStart(2, '0')}.jpg" alt="${esc(p.name)}, screen ${i + 1} of ${p.meta.slices}" width="1440" height="900" loading="lazy" decoding="async"></li>`).join('');
  return layout({
    title: `${p.name} · Studio Grade`, desc: `${p.name}: ${p.brief}`, page: 'case', here: 'Work', canonical: `/work/${p.slug}/`, og: `/media/${p.slug}/hero.jpg`,
    body: `
<article class="case" style="--acc:${p.accent}">
  <header class="case-head wrap">
    <a class="back" href="/work/"><span aria-hidden="true">←</span> All work</a>
    <p class="case-no">${String(k + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')} · ${esc(p.kind)}</p>
    <h1 class="case-h" data-split="words">${esc(p.name)}</h1>
    <div class="case-intro">
      <p class="case-brief" data-reveal>${esc(p.brief)}</p>
      <dl class="case-facts" data-reveal style="--i:1">
        <div><dt>Direction</dt><dd>${esc(p.dirNo)} · ${esc(p.dirName)}</dd></div>
        <div><dt>Register</dt><dd>${esc(p.register)}</dd></div>
        <div><dt>Default look</dt><dd>${p.defaultLook ?? '—'} of 6 traits</dd></div>
        <div><dt>Length</dt><dd>${esc(p.meta.vh)} screens</dd></div>
      </dl>
    </div>
  </header>
  <div class="case-hero wrap">
    <a class="case-frame" href="/builds/${p.slug}/" target="_blank" rel="noopener" aria-label="Open the live ${esc(p.name)} build in a new tab">${shot(p, '', true)}</a>
    <div class="case-cta">${stamp(p.audit, 'stamp--lg')}<a class="btn btn--blue" href="/builds/${p.slug}/" target="_blank" rel="noopener">Open the live build <span aria-hidden="true">↗</span></a></div>
  </div>

  <section class="case-sec wrap" aria-labelledby="sp-h">
    <div class="case-side"><h2 id="sp-h" class="side-h">The spine</h2><p class="side-p">Written by the agent before any code, and kept at the top of the build’s HTML.</p></div>
    <dl class="spine">${spineKeys.filter((x) => p.spine[x]).map((x) => `<div data-reveal><dt>${x === 'DEFAULT' ? 'DEFAULT LOOK' : x}</dt><dd>${esc(p.spine[x])}</dd></div>`).join('')}</dl>
  </section>

  ${p.palette.length ? `<section class="case-sec wrap" aria-labelledby="pa-h"><div class="case-side"><h2 id="pa-h" class="side-h">Palette</h2></div><ul class="pal">${p.palette.map((h) => `<li data-reveal><span class="pal-sw" style="background:${h}"></span><code>${h}</code></li>`).join('')}</ul></section>` : ''}

  <section class="case-screens" aria-labelledby="sc-h">
    <div class="wrap screens-head"><h2 id="sc-h" class="side-h">Every screen</h2><p class="side-p"><span data-strip-count>01</span> / ${String(p.meta.slices || 0).padStart(2, '0')} · drag or scroll</p></div>
    <ul class="strip" tabindex="0" aria-label="Screens of the ${esc(p.name)} build">${slices}</ul>
  </section>

  <section class="case-sec case-mobile wrap" aria-labelledby="mo-h">
    <div class="case-side"><h2 id="mo-h" class="side-h">On a phone</h2><p class="side-p">390 pixels wide. Recomposed, not shrunk.</p></div>
    <figure class="phone"><img src="/media/${p.slug}/mobile.jpg" alt="${esc(p.name)} on a 390-pixel phone" width="780" height="1688" loading="lazy" decoding="async"></figure>
  </section>

  <a class="next" href="/work/${next.slug}/"><span class="next-k">Next project</span><span class="next-name">${esc(next.name)}</span><span class="next-kind">${esc(next.kind)} · ${esc(next.register)}</span></a>
</article>`,
  });
}

function method() {
  const dirs = [
    ['01', 'Engineered Dark', 'Developer tools, AI products, power users', 'Linear, Raycast, Resend'],
    ['02', 'Ledger Light', 'B2B SaaS, fintech, APIs, docs', 'Stripe, Vercel, Mintlify, Ramp'],
    ['03', 'Warm Paper', 'AI labs, founder-led, mission brands', 'Anthropic, Cursor, Daylight'],
    ['04', 'Editorial Motion', 'Studios, architecture, portfolios, culture', 'Exo Ape, Locomotive, Bennett & Clive'],
    ['05', 'Quiet Luxury', 'Fashion, beauty, fragrance, objects', 'Aesop, Totême, Aman'],
    ['06', 'Cinematic Place', 'Hospitality, travel, real estate, wine', 'White Desert, ERA, Ace Hotel'],
    ['07', 'Institutional', 'Museums, nonprofits, publishers, civic', 'Art Institute of Chicago, Obama Foundation'],
    ['08', 'Deep-Tech Spec', 'Robotics, aerospace, climate, biotech', 'Terminal Industries, Vast, Radian'],
    ['09', 'Playful System', 'Consumer apps, community, games', 'Family, MindMarket, Lando Norris'],
    ['10', 'Immersive', 'Launches, campaigns, one hero object', 'Lusion, Immersive Garden, Unseen'],
  ];
  const steps = [
    ['Direction and register', 'Pick one of eleven directions (ten measured from real studio work, one built from user-supplied product references), then how loud to play it: quiet, confident or loud. Choose five range axes (ground, type genre, image medium, composition, motion) so the site can’t default to the last one.'],
    ['The spine', 'Commit in writing to direction, motif, type, scale, palette, grid, hero, imagery, conversion, motion and voice. If a line could describe any site, it isn’t a spine.'],
    ['Tokens first', 'Every size, colour, radius, ease and duration comes from a token. Each text style is a bundle of family, size, line-height, tracking and weight, the way AREA 17 builds.'],
    ['Compose', 'One statement and one subject per hero. Features become chapters with real media, not icon cards. Break the symmetry after the fold. End on a confident line and a real footer.'],
    ['Craft pass', 'Tracking scaled by size, two-tone heads, optical button padding, reduced motion, honest proof, and one bespoke detail in a boring place.'],
    ['Audit, look, fix', 'Run the script, open the screenshot of every screen, fix, run again. The eye catches what the script can’t; in testing it caught more real bugs than the report.'],
  ];
  return layout({
    title: 'Method · Studio Grade', desc: 'How Studio Grade works: ten measured directions, three registers, a design spine, tokens, composition rules and a self-audit.', page: 'method', here: 'Method', canonical: '/method/',
    body: `
<section class="page-head wrap">
  <h1 class="page-h" data-split="words">Method</h1>
  <p class="page-sub" data-reveal>Six steps, every build. The taste lives in measured rules; the brief supplies the rest.</p>
</section>
<ol class="steps wrap">${steps.map(([h, t], i) => `<li class="step" data-reveal><span class="step-n">${String(i + 1).padStart(2, '0')}</span><h2 class="step-h">${h}</h2><p>${t}</p></li>`).join('')}</ol>

<section class="regs" aria-labelledby="rg-h">
  <div class="wrap"><h2 id="rg-h" class="sec-h" data-reveal>Three registers. One discipline.</h2><p class="sec-p" data-reveal>Discipline is about count (one idea, one type system, one colour logic), not volume. The same headline, at three volumes:</p></div>
  <div class="regs-grid wrap">
    <figure class="reg reg--quiet" data-reveal><div class="reg-art"><p>Design like the studios that win.</p></div><figcaption><b>Quiet</b> Off-white or white, one accent under 5% of pixels, space does the work. After Totême, Aesop, Anthropic.</figcaption></figure>
    <figure class="reg reg--confident" data-reveal style="--i:1"><div class="reg-art"><p>Design like the studios that win.</p><span class="reg-band"></span></div><figcaption><b>Confident</b> One bold device at full scale, everything else disciplined. After Stripe, Ramp, Linear.</figcaption></figure>
    <figure class="reg reg--loud" data-reveal style="--i:2"><div class="reg-art"><p>Design like the studios that win.</p></div><figcaption><b>Loud</b> Colour as the ground, type as a poster, one meaning per hue. After MindMarket, Norton, Lando Norris.</figcaption></figure>
  </div>
</section>

<section class="dirs wrap" aria-labelledby="di-h">
  <div class="sec-head"><h2 id="di-h" class="sec-h" data-reveal>Ten measured directions</h2></div>
  <table class="dir-table">
    <thead><tr><th scope="col">No.</th><th scope="col">Direction</th><th scope="col">Use for</th><th scope="col">Measured from</th></tr></thead>
    <tbody>${dirs.map((d) => `<tr><td>${d[0]}</td><th scope="row">${d[1]}</th><td>${d[2]}</td><td>${d[3]}</td></tr>`).join('')}</tbody>
  </table>
</section>

<section class="inside wrap" aria-labelledby="ins-h">
  <div><h2 id="ins-h" class="sec-h" data-reveal>What’s inside</h2><p class="sec-p" data-reveal>A SKILL.md your agent reads first, twelve references it loads only when needed, a token system, dependency-free motion helpers, and the audit.</p>${cmd()}</div>
  <pre class="tree" aria-label="Files in the skill"><b>studio-grade/</b>
├─ SKILL.md            <span>workflow, directions, bans</span>
├─ references/
│  ├─ directions.md    <span>11 recipes</span>
│  ├─ range.md         <span>quiet · confident · loud</span>
│  ├─ typography.md    <span>tracking tables, free faces</span>
│  ├─ color.md         <span>40 measured palettes</span>
│  ├─ layout.md        <span>21 heroes, 22 sections</span>
│  ├─ motion.md        <span>eases, springs, policy</span>
│  ├─ techniques.md    <span>79 moves with code</span>
│  ├─ imagery.md       <span>no-photo strategies</span>
│  └─ copy · anti-slop · components · evidence
├─ assets/             <span>tokens.css · motion.js</span>
└─ scripts/audit.mjs   <span>the self-audit</span></pre>
</section>`,
  });
}

function evidence() {
  const studios = [
    ['Linear', 'in-house', 'Inter Variable 510 · −0.022em · #08090A', '#08090A', '#F7F8F8'],
    ['Stripe', 'in-house', 'Söhne 300 at display size · #533AFD', '#533AFD', '#F6F5FF'],
    ['Vercel', 'in-house', 'Geist at −0.06em · grayscale + one blue', '#FAFAFA', '#171717'],
    ['basement.studio', 'Factory, Mintlify, Cursor', 'one orange on three text nodes', '#EE6018', '#1A0B02'],
    ['Exo Ape', 'Studio D, Inversa', 'Lausanne 300 · 250px · line-height 0.73', '#E4E0DB', '#0D0E13'],
    ['Locomotive', 'Populous, The Drake', '80px · −0.05em · one ease on 842 rules', '#1C19B5', '#F2F2FF'],
    ['Work & Co', 'Steve Jobs Archive, Obama', '230px condensed DONATE on #0064F0', '#0064F0', '#F4F1EA'],
    ['AREA 17', 'Art Institute of Chicago, Pentagram', 'house ease (.59,.01,.28,1)', '#B50938', '#FFF3F5'],
    ['Malvah', 'White Desert', 'Oswald at 320px · one expedition orange', '#1F2A44', '#F5F3EF'],
    ['OFF+BRAND', 'Lando Norris', '#D2FF00 on olive-black #282C20', '#282C20', '#D2FF00'],
    ['Louis Paquet', 'MindMarket', 'Inter 500 at −0.06em on a lime field', '#8ED462', '#1E2A12'],
    ['Lusion', 'Atlas Motion, Oryzo', 'the loader is the product’s CAD drawing', '#100904', '#FFEDD7'],
    ['Immersive Garden', 'David Whyte, Cartier', 'easeOutExpo on 83 rules', '#EFEAE2', '#1D1B17'],
    ['Bakken & Bæck', 'Sierra', 'GT America at one weight, 120 of 121 nodes', '#006838', '#EFFFF5'],
  ];
  const clusters = [
    ['SaaS and AI studios', 9, 'Product UI rebuilt in HTML is the hero; one accent at under 1% of pixels.'],
    ['Tech gold standard', 18, 'Display at weight 300–510, two-tone heads, hairlines at 8% ink, no smooth scroll.'],
    ['Immersive and WebGL', 16, 'The loader is the first impression; 8 of 14 never got past it headless.'],
    ['Editorial craft', 19, 'Display line-height 0.66–1.0; headlines trespass into images.'],
    ['Big-brand agencies', 15, 'Systems over set pieces: named token bundles, one house ease.'],
    ['Fashion and luxury', 12, 'Hero text 18–31px, never 64+; restraint measured +11% conversion.'],
    ['Award winners 2023–26', 18, 'Juries pay for motion craft and forgive weak accessibility; we don’t.'],
    ['User references', 9, 'convt.app, ignura.com, jawadjalal.com, mkdir.directory and five supplied screenshots (Fornax, Answerr, Mugic, Wandor, BugScout): inline UI tokens, pricing as an object, a photo composed for the headline, the input drawn as a domain object. We keep the ideas, not the mistakes.'],
  ];
  return layout({
    title: 'Evidence · Studio Grade', desc: 'The research behind Studio Grade: 99 live sites by 40 studios, measured from computed styles and the motion values in their JavaScript.', page: 'evidence', here: 'Evidence', canonical: '/evidence/',
    body: `
<section class="page-head wrap">
  <h1 class="page-h" data-split="words">Evidence</h1>
  <p class="page-sub" data-reveal>Every rule in the skill has a measurement behind it. We loaded 99 live sites in a real browser at 1440 and 390 pixels, read their computed styles, and mined their JavaScript for easing curves, springs and staggers.</p>
</section>
<section class="nums nums--big wrap">
  <div class="num"><b data-count="99">99</b><span>live sites, 8 clusters, about 40 studios</span></div>
  <div class="num"><b>−.015<small>em</small></b><span>median display tracking; 53 of 94 sites track tighter</span></div>
  <div class="num"><b data-count="2">2</b><span>typefaces on the median site; 3 at most</span></div>
  <div class="num"><b data-count="13">13</b><span>of 14 immersive sites gate on a designed loader; 0 of 15 big-agency sites do</span></div>
</section>
<section class="clusters wrap" aria-labelledby="cl-h">
  <h2 id="cl-h" class="sec-h" data-reveal>Eight clusters</h2>
  <ol class="cl-list">${clusters.map((c, i) => `<li data-reveal><span class="cl-n">${String(i + 1).padStart(2, '0')}</span><span class="cl-name">${c[0]}</span><span class="cl-count">${c[1]} site${c[1] === 1 ? '' : 's'}</span><span class="cl-find">${c[2]}</span></li>`).join('')}</ol>
</section>
<section class="studios-sec" aria-labelledby="st-h">
  <div class="wrap"><h2 id="st-h" class="sec-h" data-reveal>Studios, and what we measured</h2><p class="sec-p" data-reveal>Hover a row to see the colour we measured on their work.</p></div>
  <ul class="studios">${studios.map(([n, c, f, bg, fg]) => `<li class="st-row" style="--bg:${bg};--fg:${fg}"><span class="st-name">${n}</span><span class="st-client">${c}</span><span class="st-find">${f}</span></li>`).join('')}</ul>
</section>
<section class="credits wrap"><p>The sites studied belong to their owners and the studios that made them. We measured public pages; no code, imagery or assets from them are reproduced here or in the skill. The full notes are in the repository’s <a class="link" href="https://github.com/${REPO}/tree/main/research">research folder</a>.</p></section>`,
  });
}

/* ------------------------------------------------------------------ write */
fs.rmSync(DIST, { recursive: true, force: true });
const out = (rel, s) => { const f = path.join(DIST, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
out('index.html', home());
out('work/index.html', workIndex());
PROJECTS.forEach((p, k) => out(`work/${p.slug}/index.html`, caseStudy(p, k)));
out('method/index.html', method());
out('evidence/index.html', evidence());
out('404.html', layout({ title: 'Not found · Studio Grade', desc: 'Page not found.', page: 'nf', here: '', body: `<section class="page-head wrap"><h1 class="page-h">Not graded.</h1><p class="page-sub">That page doesn’t exist. <a class="link" href="/">Back to the start</a> or <a class="link" href="/work/">see the work</a>.</p></section>` }));
for (const f of ['styles.css', 'app.js', 'favicon.svg', 'og.png']) if (fs.existsSync(path.join(SRC, f))) fs.copyFileSync(path.join(SRC, f), path.join(DIST, f));
fs.copyFileSync(path.join(SKILL, 'assets/tokens.css'), path.join(DIST, 'tokens.css'));
fs.copyFileSync(path.join(SKILL, 'assets/motion.js'), path.join(DIST, 'motion.js'));
fs.cpSync(path.join(SRC, 'media'), path.join(DIST, 'media'), { recursive: true, filter: (s) => !s.endsWith('.json') || s.endsWith('meta.json') });
for (const p of PROJECTS) {
  const from = path.join(ROOT, 'tests/builds', p.slug), to = path.join(DIST, 'builds', p.slug);
  fs.cpSync(from, to, { recursive: true, filter: (s) => !/\/(audit[^/]*|_audit|node_modules)(\/|$)/.test(s) });
}
fs.writeFileSync(path.join(DIST, 'vercel.json'), JSON.stringify({ cleanUrls: false, trailingSlash: true, headers: [{ source: '/media/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }] }, null, 1));
console.log('built', fs.readdirSync(DIST).join(' '), '| projects:', PROJECTS.map((p) => `${p.slug}(${p.register},${p.audit ? (p.audit.FAIL || 0) + 'f' : '?'})`).join(' '));
