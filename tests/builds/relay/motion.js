/* Studio Grade motion helpers: dependency-free, reduced-motion aware.
   Usage: <script type="module">import { autoInit } from './motion.js'; autoInit();</script>
   Or import individual helpers. Pair with tokens.css ([data-reveal] styles).

   Data-attribute API (autoInit):
     data-reveal                 blur-in when ~20% into the viewport
     data-reveal-group           children reveal in sequence (--i stagger)
     data-split="words"          split text into words that reveal in sequence (use on headings)
     data-scroll-fill            words fill from 35% ink → full ink as you scroll through
     data-ticker="1.72802563"    live rolling number; data-rate (+per tick), data-every (ms), data-decimals
     data-letter-roll            vertical letter-roll on hover (links, buttons)
     data-clock="America/New_York"  live HH:MM clock
     data-scramble               decode-scramble mono label when revealed
     data-spy="#list"            on a container of [data-spy-panel] sections; toggles .is-active on #list [data-spy-item]
*/

export const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- reveal */
export function reveal(root = document, { rootMargin = '0px 0px -18% 0px', threshold = 0 } = {}) {
  root.querySelectorAll('[data-reveal-group]').forEach((g) => {
    [...g.children].forEach((c, i) => { if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', ''); c.style.setProperty('--i', i); });
  });
  const els = [...root.querySelectorAll('[data-reveal]:not(.is-in)')];
  if (reduced || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }, { rootMargin, threshold });
  els.forEach((e) => io.observe(e));
}

/* ---------------------------------------------------------------- split words */
export function splitWords(el, { reveal: addReveal = true, startIndex = 0 } = {}) {
  if (el.dataset.splitDone) return [...el.querySelectorAll('.w')];
  const label = el.textContent.replace(/\s+/g, ' ').trim();
  el.setAttribute('aria-label', label);
  let i = startIndex;
  const walk = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(' '); return; }
          const s = document.createElement('span');
          s.className = 'w'; s.textContent = part; s.setAttribute('aria-hidden', 'true');
          s.style.display = 'inline-block'; s.style.setProperty('--i', i++);
          if (addReveal) s.setAttribute('data-reveal', '');
          frag.append(s);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) walk(child);   // keep <span class="dim">, <em>, <a> intact
    }
  };
  walk(el);
  el.dataset.splitDone = '1';
  return [...el.querySelectorAll('.w')];
}

/* ---------------------------------------------------------------- scroll word fill (Atlas / Exo Ape) */
export function scrollFill(el, { from = 0.35 } = {}) {
  const words = splitWords(el, { reveal: false });
  if (reduced) return;
  words.forEach((w) => { w.style.opacity = from; w.style.transition = 'opacity .25s linear'; });
  let ticking = false, read = 0;
  const update = () => {
    ticking = false;
    const r = el.getBoundingClientRect(); const vh = innerHeight;
    const start = vh * 0.85, end = vh * 0.35;                         // "top 85%" → "bottom 35%"
    const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
    const n = Math.max(read, Math.round(p * words.length));   // monotonic: once read, words stay filled
    if (n === read) return; read = n;
    words.forEach((w, i) => { w.style.opacity = i < n ? 1 : from; });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ---------------------------------------------------------------- rolling-digit ticker (Stripe / Ramp) */
export function ticker(el, { value, rate = 0, every = 90, decimals } = {}) {
  value = value ?? parseFloat(el.dataset.ticker ?? el.textContent);
  rate = +(el.dataset.rate ?? rate); every = +(el.dataset.every ?? every);
  decimals = decimals ?? (el.dataset.decimals != null ? +el.dataset.decimals : ((String(el.dataset.ticker ?? '').split('.')[1] || '').length));
  const fmt = (v) => v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  el.classList.add('t-num'); el.setAttribute('aria-label', fmt(value)); el.setAttribute('role', 'text');
  if (reduced || !rate) { el.textContent = fmt(value); return; }
  el.textContent = '';
  const box = document.createElement('span'); box.setAttribute('aria-hidden', 'true');
  box.style.cssText = 'display:inline-flex;overflow:hidden;height:1.15em;line-height:1.15em;vertical-align:bottom';
  el.append(box);
  let cols = [], shape = '';
  const render = (str) => {
    const sh = str.replace(/\d/g, '0');
    if (sh !== shape) {                                   // rebuild only when digit/symbol layout changes
      shape = sh; box.textContent = ''; cols = [];
      for (const ch of str) {
        if (/\d/.test(ch)) {
          const c = document.createElement('span');
          c.style.cssText = 'display:inline-flex;flex-direction:column;transition:transform .3s cubic-bezier(.22,1,.36,1)';
          c.innerHTML = '0123456789'.split('').map((d) => `<span>${d}</span>`).join('');
          box.append(c); cols.push(c);
        } else { const s = document.createElement('span'); s.textContent = ch; box.append(s); cols.push(null); }
      }
    }
    [...str].forEach((ch, i) => { if (cols[i]) cols[i].style.transform = `translateY(${-ch * 1.15}em)`; });
  };
  render(fmt(value));
  setInterval(() => { value += rate * (0.6 + Math.random() * 0.8); render(fmt(value)); el.setAttribute('aria-label', fmt(value)); }, every);
}

/* ---------------------------------------------------------------- letter-roll hover (Lusion / Unseen) */
export function letterRoll(el) {
  if (reduced || el.dataset.rollDone) return;
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.textContent = '';
  const wrap = document.createElement('span'); wrap.setAttribute('aria-hidden', 'true');
  wrap.style.cssText = 'display:inline-flex;overflow:hidden;line-height:1.2;height:1.2em;vertical-align:bottom';
  [...text].forEach((ch, i) => {
    const c = document.createElement('span');
    c.style.cssText = `display:inline-flex;flex-direction:column;transition:transform .45s cubic-bezier(.76,0,.24,1) ${i * 18}ms`;
    const g = ch === ' ' ? ' ' : ch;
    c.innerHTML = `<span>${g}</span><span>${g}</span>`;
    wrap.append(c);
  });
  el.append(wrap);
  const on = () => wrap.childNodes.forEach((c) => (c.style.transform = 'translateY(-50%)'));
  const off = () => wrap.childNodes.forEach((c) => (c.style.transform = ''));
  el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off);
  el.addEventListener('focus', on); el.addEventListener('blur', off);
  el.dataset.rollDone = '1';
}

/* ---------------------------------------------------------------- live clock (Bennett & Clive) */
export function clock(el, timeZone = el.dataset.clock) {
  const f = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone });
  const tick = () => { el.textContent = f.format(new Date()); };
  tick(); setInterval(tick, 15000);
}

/* ---------------------------------------------------------------- scramble / decode (Inversa) */
export function scramble(el, { duration = 420 } = {}) {
  const final = el.textContent;
  if (reduced) return;
  el.setAttribute('aria-label', final);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / duration);
    const lock = Math.floor(p * final.length);
    el.textContent = final.split('').map((c, i) => (i < lock || c === ' ' ? c : chars[(Math.random() * chars.length) | 0])).join('');
    if (p < 1) requestAnimationFrame(step); else el.textContent = final;
  };
  requestAnimationFrame(step);
}

/* ---------------------------------------------------------------- scroll-spy chapter list (Attio / Dia / Radian) */
export function scrollSpy(container, list = document.querySelector(container.dataset.spy)) {
  if (!list) return;
  const panels = [...container.querySelectorAll('[data-spy-panel]')];
  const items = [...list.querySelectorAll('[data-spy-item]')];
  const set = (id) => items.forEach((it) => {
    const on = it.dataset.spyItem === id; it.classList.toggle('is-active', on);
    if (on) it.setAttribute('aria-current', 'step'); else it.removeAttribute('aria-current');
  });
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) set(e.target.dataset.spyPanel); }),
    { rootMargin: '-45% 0px -45% 0px' });
  panels.forEach((p) => io.observe(p));
}

/* ---------------------------------------------------------------- auto-init */
export function autoInit(root = document) {
  document.documentElement.classList.remove('no-js');
  root.querySelectorAll('[data-split="words"]').forEach((el) => {
    splitWords(el); el.removeAttribute('data-reveal');           // the words reveal, not the block
  });
  root.querySelectorAll('[data-scroll-fill]').forEach((el) => scrollFill(el));
  root.querySelectorAll('[data-ticker]').forEach((el) => ticker(el));
  root.querySelectorAll('[data-letter-roll]').forEach((el) => letterRoll(el));
  root.querySelectorAll('[data-clock]').forEach((el) => clock(el));
  root.querySelectorAll('[data-spy]').forEach((el) => scrollSpy(el));
  const scr = [...root.querySelectorAll('[data-scramble]')];
  if (scr.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { scramble(e.target); io.unobserve(e.target); } }));
    scr.forEach((s) => io.observe(s));
  }
  reveal(root);
}
