import { autoInit, reduced } from './motion.js';

autoInit();

/* Nav: transparent over the key art, solid night once you scroll */
const nav = document.getElementById('nav');
const dawn = document.querySelector('.dawn');
const onScroll = () => {
  nav.classList.toggle('is-stuck', scrollY > 24);
  nav.classList.toggle('on-dawn', dawn.getBoundingClientRect().top < nav.offsetHeight / 2);   // the nav clears up with the sky
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* §51 Lights-up: the lamp is lit first, then the island resolves around it */
const hero = document.querySelector('.hero');
const light = () => requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-lit')));
const heroImg = hero.querySelector('img');
if (reduced) hero.classList.add('is-lit');
else if (heroImg.complete) light();
else { heroImg.addEventListener('load', light, { once: true }); setTimeout(light, 1500); }

/* The beam toy (§83): the beam counts the boats it has reached */
const svg = document.getElementById('chart');
const beam = document.getElementById('beam');
const range = document.getElementById('bearing');
const out = document.getElementById('bearing-out');
const count = document.getElementById('toy-n');
const done = document.getElementById('toy-done');
const reset = document.getElementById('toy-reset');
const P = { x: 360, y: 390 };          // the lamp, in chart units
const HALF = 8;                         // beam half-width in degrees that counts as "seen"
const boats = [...svg.querySelectorAll('.boat')].map((g) => {
  const [, x, y] = g.getAttribute('transform').match(/translate\(([\d.]+) ([\d.]+)\)/).map(Number);
  return { g, a: Math.atan2(x - P.x, P.y - y) * 180 / Math.PI, route: svg.querySelector(`.route[data-b="${g.dataset.i}"]`), seen: false };
});
let playing = false;   // the intro sweep shows the beam; it doesn't count

function setAngle(a, count_it = true) {
  a = Math.max(-75, Math.min(75, a));
  beam.setAttribute('transform', `rotate(${a.toFixed(1)} ${P.x} ${P.y})`);
  const brg = Math.round((a + 360) % 360);
  const txt = `${String(brg).padStart(3, '0')}°`;
  out.textContent = txt;
  range.value = Math.round(a);
  range.setAttribute('aria-valuetext', `${brg} degrees`);
  if (!count_it) return;
  let changed = false;
  boats.forEach((b) => {
    if (!b.seen && Math.abs(b.a - a) <= HALF) { b.seen = true; changed = true; b.g.classList.add('is-seen'); b.route.classList.add('is-on'); }
  });
  if (changed) {
    const n = boats.filter((b) => b.seen).length;
    count.textContent = n;
    done.hidden = n < boats.length;
  }
}

range.addEventListener('input', () => { playing = false; setAngle(+range.value); });

let dragging = false;
const fromPointer = (e) => {
  const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());   // survives the mobile slice crop
  const { x, y } = pt;
  return Math.atan2(x - P.x, P.y - y) * 180 / Math.PI;
};
svg.addEventListener('pointerdown', (e) => { dragging = true; playing = false; svg.setPointerCapture(e.pointerId); setAngle(fromPointer(e)); });
svg.addEventListener('pointermove', (e) => { if (dragging) setAngle(fromPointer(e)); });
['pointerup', 'pointercancel'].forEach((t) => svg.addEventListener(t, () => { dragging = false; }));

reset.addEventListener('click', () => {
  boats.forEach((b) => { b.seen = false; b.g.classList.remove('is-seen'); b.route.classList.remove('is-on'); });
  count.textContent = '0'; done.hidden = true; setAngle(-20, false); range.focus();
});

setAngle(-20, false);

/* On first view the beam makes one slow sweep, the way the lamp turns, then waits for you */
if (!reduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    playing = true;
    const keys = [-20, -70, 70, -20], seg = 1400, t0 = performance.now();
    const ease = (t) => (t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    const step = (now) => {
      if (!playing) return;
      const t = (now - t0) / seg, i = Math.floor(t);
      if (i >= keys.length - 1) { setAngle(keys.at(-1), false); playing = false; return; }
      setAngle(keys[i] + (keys[i + 1] - keys[i]) * ease(t - i), false);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: .5 });
  io.observe(svg);
}
