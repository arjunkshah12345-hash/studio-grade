import { reveal, reduced } from './motion.js';

reveal();

/* pencil leaders: drawn from the CSS vars, so each breakpoint can move a note */
const drawLeaders = () => document.querySelectorAll('.note').forEach((n) => {
  const cs = getComputedStyle(n), line = n.querySelector('line'), h = n.getBoundingClientRect().height || 1;
  if (!line) return;
  const v = (k) => parseFloat(cs.getPropertyValue(k));
  const th = n.querySelector('.note-text').getBoundingClientRect().height / h * 100;   // label height in % of the plate
  const below = v('--y') > v('--ly');                       // the point sits below its note: end just under the text, else just over it
  line.setAttribute('x1', v('--x')); line.setAttribute('y1', v('--y'));
  line.setAttribute('x2', v('--lx')); line.setAttribute('y2', below ? v('--ly') + 4 / h * 100 : v('--ly') - th - 4 / h * 100);
});
drawLeaders();
addEventListener('resize', drawLeaders);
addEventListener('load', drawLeaders);

/* hero: the painting washes in once its image has loaded (text is already there) */
const hero = document.querySelector('.plate--hero');
const heroImg = hero?.querySelector('img');
const heroNote = hero?.querySelector('.note');
let done = false;
const ready = () => { if (done) return; done = true; requestAnimationFrame(() => hero.classList.add('is-ready')); setTimeout(() => heroNote?.classList.add('is-in'), reduced ? 0 : 900); };
if (heroImg) (heroImg.complete ? ready() : heroImg.addEventListener('load', ready, { once: true }));
setTimeout(ready, 1500);

/* pencil notes: the leader draws from the point to the note when it comes into view */
const notes = [...document.querySelectorAll('.note:not(.note--dry):not(.note--wet):not(.note--hero)')];
if (reduced || !('IntersectionObserver' in window)) notes.forEach((n) => n.classList.add('is-in'));
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -20% 0px' });
  notes.forEach((n) => io.observe(n));
}

/* the storm: one pinned plate, the wet painting rises over the dry one as you scroll */
const storm = document.querySelector('.storm');
if (storm) {
  const track = storm.querySelector('.storm-track');
  const plates = storm.querySelector('.storm-plates');
  const states = [...storm.querySelectorAll('[data-state]')];
  const dry = storm.querySelector('.note--dry');
  const wet = storm.querySelector('.note--wet');
  const sticky = CSS.supports('position', 'sticky');
  if (reduced || !sticky) {
    storm.classList.add('storm--static');
  } else {
    let last = -1, lastIn = null, raf = 0;
    const ease = (t) => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const span = r.height - innerHeight;
      const raw = Math.min(1, Math.max(0, -r.top / span));
      // hold dry for the first 18% and wet for the last 18%
      const p = ease(Math.min(1, Math.max(0, (raw - .18) / .64)));
      const inView = r.top < innerHeight * .6 && r.bottom > innerHeight * .4;
      if (Math.abs(p - last) < .002 && inView === lastIn) return;
      last = p; lastIn = inView;
      storm.style.setProperty('--p', p.toFixed(4));
      const wetOn = p > .5;
      states.forEach((s) => s.classList.toggle('is-on', (s.dataset.state === '1') === wetOn));
      dry.classList.toggle('is-in', inView && p < .08);
      wet.classList.toggle('is-in', inView && p > .92);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
  }
}
