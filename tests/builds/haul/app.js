import { autoInit, reduced } from './motion.js';

/* move board: one small box per module (412), coloured by address */
for (const grid of document.querySelectorAll('[data-board]')) {
  const total = +grid.dataset.total, moved = +grid.dataset.moved, van = +grid.dataset.van;
  const frag = document.createDocumentFragment();
  for (let k = 0; k < total; k++) {
    const i = document.createElement('i');
    if (k < moved) i.className = 'm'; else if (k < moved + van) i.className = 'v';
    i.style.setProperty('--k', k < moved + van ? k : 0);
    frag.append(i);
  }
  grid.append(frag);
  grid.setAttribute('data-play', '');
}

/* count-up numbers inside vignettes (0 → value, once) */
function countUp(el) {
  const to = +el.dataset.count; if (reduced) { el.textContent = to; return; }
  const t0 = performance.now(), dur = 1100, delay = +(el.dataset.delay || 900);
  el.textContent = '0';
  const step = (t) => {
    const p = Math.min(1, Math.max(0, (t - t0 - delay) / dur));
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* each vignette plays its one action once, when it is well into view */
const plays = [...document.querySelectorAll('[data-play]')];
const play = (el) => { el.classList.add('is-playing'); el.querySelectorAll('[data-count]').forEach(countUp); };
if (reduced || !('IntersectionObserver' in window)) plays.forEach(play);
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { play(e.target); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  plays.forEach((el) => io.observe(el));
}

/* nav: hairline + paper once the page moves */
const nav = document.querySelector('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

autoInit();
