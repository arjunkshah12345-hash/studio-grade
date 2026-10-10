import { autoInit, reduced } from './motion.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* header gets a hairline once the page scrolls */
const top = $('.top');
const onScroll = () => top && top.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* copy-to-clipboard install commands */
$$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
  const s = $('.cmd-s', b);
  try { await navigator.clipboard.writeText(b.dataset.copy); s.textContent = 'Copied'; } catch { s.textContent = 'Select it'; }
  setTimeout(() => (s.textContent = 'Copy'), 1600);
}));

/* the grade stamp presses on when it enters the viewport (motif) */
const stamps = $$('.stamp:not(.term-stamp)');
stamps.forEach((s) => s.setAttribute('data-press', ''));
if (reduced || !('IntersectionObserver' in window)) stamps.forEach((s) => s.classList.add('is-pressed'));
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('is-pressed'), 180); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  stamps.forEach((s) => io.observe(s));
}

/* count-up numbers */
const counters = $$('[data-count]');
if (counters.length && !reduced) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, t0 = performance.now(), dur = 1100;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - (1 - p) ** 4)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: 0.6 });
  counters.forEach((c) => { c.textContent = '0'; io.observe(c); });
}

/* home: reel pause control */
const reel = $('.reel');
if (reel) {
  const btn = $('.reel-pause', reel);
  const set = (p) => { reel.classList.toggle('is-paused', p); btn.setAttribute('aria-pressed', p); btn.textContent = p ? 'Play' : 'Pause'; };
  btn.addEventListener('click', () => set(!reel.classList.contains('is-paused')));
  if (reduced) btn.hidden = true;
}

/* home: the audit terminal (real output, abridged) */
const out = $('#term-out');
if (out) {
  const RUNS = {
    slop: { fail: true, grade: '7 fail · 18 warn', lines: [
      ['f', '✖ FAIL  color.accent       3 accent hues sprinkled through the UI'],
      ['f', '✖ FAIL  color.gradientBlob purple→blue gradient behind the hero'],
      ['f', '✖ FAIL  hero.ctas          4 CTAs in the first viewport (max 2)'],
      ['f', '✖ FAIL  copy.emoji         “Supercharge your workflow… 🚀”'],
      ['f', '✖ FAIL  mobile.overflow    590px wider than a 390px phone'],
      ['w', '! WARN  layout.iconCards   icon + title + text card grid'],
      ['w', '! WARN  type.display       700 weight, 1.3 leading, 0em tracking'],
      ['w', '! WARN  copy.hype          supercharge · unlock the · seamless'],
      ['', ''], ['s', '7 fail · 18 warn · 2 pass']] },
    nocturne: { fail: false, grade: '0 fail · 0 warn', lines: [
      ['p', '✔ PASS  style.defaultLook  0 of 6 default-look traits'],
      ['p', '✔ PASS  color.accent       colour-block system, one meaning per hue'],
      ['p', '✔ PASS  a11y.contrast      242 of 242 text elements meet AA'],
      ['p', '✔ PASS  hero.firstFrame    hero copy visible from the first frame'],
      ['p', '✔ PASS  type.display       314px condensed caps, leading 0.86'],
      ['p', '✔ PASS  mobile.overflow    no overflow at 390px'],
      ['p', '✔ PASS  motion.ease        one house ease, one in-out'],
      ['', ''], ['s', '0 fail · 0 warn · 9 pass']] },
  };
  const term = $('#term'), stamp = $('.term-stamp'), grade = $('#term-grade');
  let tm = 0;
  const run = (name) => {
    clearInterval(tm); out.textContent = ''; stamp.classList.remove('is-pressed');
    const r = RUNS[name]; term.classList.toggle('is-fail', r.fail); grade.textContent = r.grade; let k = 0;
    const add = () => { const [t, s] = r.lines[k++]; const d = document.createElement('span'); d.className = 'ln-' + (t || 'x'); d.textContent = s; out.append(d, '\n');
      if (k >= r.lines.length) { clearInterval(tm); requestAnimationFrame(() => stamp.classList.add('is-pressed')); } };
    if (reduced) { while (k < r.lines.length) add(); return; }
    tm = setInterval(add, 130);
  };
  $$('.tabs [role="tab"]').forEach((t) => t.addEventListener('click', () => { $$('.tabs [role="tab"]').forEach((x) => x.setAttribute('aria-selected', x === t)); run(t.dataset.run); }));
  new IntersectionObserver(([e], io) => { if (e.isIntersecting) { run('slop'); io.disconnect(); } }, { threshold: 0.35 }).observe(term);
}

/* work: filter by register, with a FLIP move so rows glide instead of jumping */
const list = $('.w-list');
if (list) {
  const rows = $$('.w-row', list);
  $$('.chip').forEach((c) => c.addEventListener('click', () => {
    $$('.chip').forEach((x) => x.setAttribute('aria-pressed', x === c));
    const f = c.dataset.filter;
    const first = new Map(rows.map((r) => [r, r.getBoundingClientRect().top]));
    rows.forEach((r) => { r.hidden = !(f === 'all' || r.dataset.register === f); });
    if (reduced) return;
    rows.filter((r) => !r.hidden).forEach((r) => {
      const dy = (first.get(r) ?? 0) - r.getBoundingClientRect().top;
      const wasHidden = !first.get(r) && first.get(r) !== 0;
      r.animate(dy ? [{ transform: `translateY(${dy}px)` }, { transform: 'none' }] : [{ opacity: 0, filter: 'blur(6px)' }, { opacity: 1, filter: 'none' }],
        { duration: 600, easing: 'cubic-bezier(.16,1,.3,1)' });
      void wasHidden;
    });
  }));
}

/* case: drag-to-scroll screen strip + counter */
const strip = $('.strip');
if (strip) {
  const count = $('[data-strip-count]');
  const items = $$('li', strip);
  const update = () => {
    const x = strip.scrollLeft + 1; let k = 0;
    items.forEach((li, i) => { if (li.offsetLeft - strip.offsetLeft <= x + li.offsetWidth / 2) k = i; });
    if (count) count.textContent = String(k + 1).padStart(2, '0');
  };
  strip.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  let down = false, sx = 0, sl = 0, moved = false;
  strip.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = strip.scrollLeft; strip.classList.add('is-drag'); strip.setPointerCapture(e.pointerId); });
  strip.addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; strip.scrollLeft = sl - dx; });
  const end = () => { if (!down) return; down = false; strip.classList.remove('is-drag'); };
  strip.addEventListener('pointerup', end); strip.addEventListener('pointercancel', end);
  strip.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); strip.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * items[0].offsetWidth, behavior: reduced ? 'auto' : 'smooth' }); } });
}

autoInit();
