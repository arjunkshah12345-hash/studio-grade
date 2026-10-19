import { autoInit, reduced } from './motion.js';
autoInit();

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const onView = (el, fn, margin = '0px 0px -25% 0px') => {
  if (!el) return;
  if (reduced || !('IntersectionObserver' in window)) return fn(true);
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); fn(false); } }), { rootMargin: margin });
  io.observe(el);
};

/* nav: hairline once scrolled */
const nav = $('[data-nav]');
const setNav = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', setNav, { passive: true }); setNav();

/* ---------- hero: pr-482 is cut while you watch (about a second) ---------- */
const hero = $('[data-hero]');
const status = $('[data-hero-status]'), label = $('[data-hero-label]'), timer = $('[data-hero-timer]');
const check = $('[data-hero-check]'), checkTxt = $('[data-hero-checktxt]');
let run = 0;
function heroEnd() {
  hero.classList.remove('is-pending','is-creating'); status.classList.remove('is-busy');
  label.textContent = 'Ready'; timer.textContent = '1.0 s';
  check.querySelector('.ck').className = 'ck ck--done'; checkTxt.textContent = 'Check passed';
}
async function heroPlay() {
  const id = ++run;
  hero.classList.add('is-pending','is-creating'); status.classList.add('is-busy');
  label.textContent = 'Creating branch'; timer.textContent = '0.0 s';
  check.querySelector('.ck').className = 'ck ck--run'; checkTxt.textContent = 'Running';
  await wait(700); if (id !== run) return;
  const path = $('[data-hero-path]');
  hero.classList.remove('is-pending');          // the branch line starts to draw (1s, house ease)
  const t0 = performance.now();
  await new Promise((done) => {
    const tick = (t) => {
      if (id !== run) return done();
      const s = Math.min((t - t0) / 1000, 1);
      timer.textContent = `${s.toFixed(1)} s`;
      s < 1 ? requestAnimationFrame(tick) : done();
    };
    requestAnimationFrame(tick);
  });
  if (id !== run) return;
  heroEnd();
}
if (hero) {
  if (reduced) heroEnd(); else heroPlay();
  // the late "schema" row and the ring are tied to .is-pending; keep the pending state on first paint
}

/* ---------- 01: a new pull request opens; its branch appears and the Hobby counter fills ---------- */
const tree = $('[data-tree]');
onView(tree, async (instant) => {
  const row = $('[data-tree-new]'), st = $('[data-tree-status]'), size = $('[data-tree-size]');
  const count = $('[data-tree-count]'), slots = $$('[data-tree-slots] i');
  const finish = () => {
    row.classList.remove('is-hidden'); st.className = 'pill'; st.textContent = 'Ready';
    size.textContent = '0 MB'; count.textContent = '5'; slots[4].classList.add('f');
  };
  if (instant) return finish();
  row.classList.add('is-hidden');
  await wait(900);
  row.classList.remove('is-hidden'); row.classList.add('is-fresh');
  await wait(1100);
  finish();
  await wait(1400); row.classList.remove('is-fresh');
});
$('[data-tree-new]')?.classList.add('is-hidden');

/* ---------- 02: personal columns mask as the branch is seeded ---------- */
const GLYPHS = '#%&*+=-_/\\<>0123456789abcdef';
function scrambleTo(el, to, dur = 520) {
  const from = el.textContent; const len = Math.max(from.length, to.length); const t0 = performance.now();
  const step = (t) => {
    const p = Math.min((t - t0) / dur, 1); const k = Math.floor(p * len);
    let s = to.slice(0, k);
    for (let i = k; i < len; i++) s += (to[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]);
    el.textContent = p < 1 ? s.slice(0, Math.max(to.length, Math.round(len - (len - to.length) * p))) : to;
    if (p < 1) requestAnimationFrame(step); else el.classList.add('is-masked');
  };
  requestAnimationFrame(step);
}
onView($('[data-pair]'), async (instant) => {
  const cells = $$('.tbl--branch .mk');
  if (instant) { cells.forEach((c) => { c.textContent = c.dataset.mask; c.classList.add('is-masked'); }); return; }
  await wait(650);
  cells.forEach((c, i) => setTimeout(() => scrambleTo(c, c.dataset.mask), (i % 3) * 120 + Math.floor(i / 3) * 160));
});

/* ---------- 03: diff tabs + psql typed when it comes into view ---------- */
const tabs = $$('[data-tab]');
function selectTab(btn) {
  tabs.forEach((b) => {
    const on = b === btn; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
    document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((b, i) => {
  b.addEventListener('click', () => selectTab(b));
  b.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; selectTab(n); n.focus();
  });
});
const term = $('[data-term]');
onView(term, async (instant) => {
  if (instant) return;
  const lines = $$('.tl', term);
  const texts = lines.map((l) => l.textContent);
  lines.forEach((l) => l.classList.add('is-off'));
  await wait(400);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]; l.classList.remove('is-off');
    if (l.hasAttribute('data-cmd')) {
      const full = texts[i]; const pre = full.startsWith('$') ? 2 : full.indexOf('>') + 2;
      l.textContent = full.slice(0, pre);
      for (let k = pre; k <= full.length; k++) { l.textContent = full.slice(0, k); await wait(18); }
      await wait(260);
    } else await wait(60);
  }
});

/* ---------- 04: lifecycle line draws; host switch renames PR / MR ---------- */
const life = $('[data-life]');
$$('.stops li', life).forEach((li, i) => li.style.setProperty('--n', i));
onView(life, () => life.classList.add('is-on'), '0px 0px -30% 0px');
const hosts = $$('[data-host]');
const nouns = { github: ['pull request', 'Pull request'], gitlab: ['merge request', 'Merge request'] };
function setHost(btn) {
  hosts.forEach((b) => { const on = b === btn; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; });
  const [n, N] = nouns[btn.dataset.host];
  $$('[data-host-noun]').forEach((s) => (s.textContent = n));
  $$('[data-host-noun-cap]').forEach((s) => (s.textContent = N));
}
hosts.forEach((b, i) => {
  b.addEventListener('click', () => setHost(b));
  b.addEventListener('keydown', (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault(); const n = hosts[(i + 1) % hosts.length]; setHost(n); n.focus();
  });
});

/* ---------- pricing: Pro storage calculator (only the brief's numbers) ---------- */
const gb = $('[data-gb]');
const fmt = (n) => `$${n.toFixed(2)}`;
function calc() {
  const v = +gb.value;
  $('[data-gb-out]').textContent = `${v} GB`;
  $('[data-gb-n]').textContent = v;
  $('[data-gb-total]').textContent = fmt(25 + v * 0.3);
}
gb?.addEventListener('input', calc); if (gb) calc();
