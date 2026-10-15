import { reveal, reduced } from './motion.js';

reveal();

/* ---------- The two skies: one scroll-scrubbed crossfade, mirrored by a slider ---------- */
const track = document.querySelector('.track');
const stage = document.querySelector('[data-stage]');
const heroCopy = document.querySelector('.hero-copy');
const range = document.querySelector('[data-compare]');
const stateEl = document.querySelector('[data-compare-state]');
const mobile = matchMedia('(max-width:760px)');

const STATES = [
  [0.0, 'As lit now', 'Unshielded white street lights. The sky glows orange and hides almost every star.'],
  [0.3, 'Halfway', 'Shields go on and the light turns warm. The glow thins and the brightest stars come through.'],
  [0.68, 'As the letter asks', 'Shielded, warm, dimmable lights. The same rooftops, and the Milky Way over them.'],
];
let lastState = -1;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => t * t * (3 - 2 * t);

function paint(v) {                      // v: 0 = as lit now, 1 = as the letter asks
  stage.style.setProperty('--dark', ease(clamp(v)).toFixed(4));
  range.value = Math.round(v * 100);
  let i = 0; STATES.forEach((s, k) => { if (v >= s[0]) i = k; });
  range.setAttribute('aria-valuetext', STATES[i][1]);
  if (i !== lastState) { stateEl.textContent = STATES[i][2]; lastState = i; }
}

function progress() {
  const r = track.getBoundingClientRect();
  const span = r.height - innerHeight;
  return span > 0 ? clamp(-r.top / span) : 0;
}

if (reduced) {
  paint(0);
  range.addEventListener('input', () => paint(range.value / 100));
} else {
  let ticking = false;
  const tick = () => {
    ticking = false;
    const p = progress();
    // the sky starts to clear once the headline has mostly scrolled away
    paint(clamp((p - 0.22) / 0.62));
    if (!mobile.matches) heroCopy.style.setProperty('--fade', clamp((scrollY / innerHeight - 0.08) / 0.32).toFixed(3));
    else heroCopy.style.removeProperty('--fade');
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
  addEventListener('resize', tick);
  tick();
  // dragging the slider moves the page to the matching point in the scrub, so scroll stays the one source of truth
  range.addEventListener('input', () => {
    const r = track.getBoundingClientRect();
    const top = scrollY + r.top;
    const span = r.height - innerHeight;
    const p = 0.22 + (range.value / 100) * 0.62;
    scrollTo({ top: top + p * span, behavior: 'instant' });
  });
}

/* ---------- Floating CTA: after the hero, never over the letter ---------- */
const float = document.querySelector('[data-float]');
const letter = document.querySelector('#letter');
const foot = document.querySelector('.foot');
if (float && 'IntersectionObserver' in window) {
  float.hidden = false;
  const seen = new Map();
  const update = () => {
    const pastHero = track.getBoundingClientRect().bottom < innerHeight * 0.6;   // after the two skies, so it never sits on the compare panel
    const show = pastHero && !seen.get(letter) && !seen.get(foot);
    float.classList.toggle('is-on', show);
    float.tabIndex = show ? 0 : -1;
    float.setAttribute('aria-hidden', show ? 'false' : 'true');
  };
  const io = new IntersectionObserver((es) => { es.forEach((e) => seen.set(e.target, e.isIntersecting)); update(); }, { threshold: 0.05 });
  io.observe(letter); io.observe(foot);
  addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- The letter: front-end only, endpoint is a placeholder ---------- */
const form = document.querySelector('#sign');
const status = form.querySelector('[data-status]');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements.name;
  const email = form.elements.email;
  let bad = null;
  [name, email].forEach((f) => f.removeAttribute('aria-invalid'));
  if (!name.value.trim()) bad = [name, 'Add your name: it goes on the letter.'];
  else if (!email.value.trim() || !email.checkValidity()) bad = [email, 'That email doesn\'t look right. We only use it to confirm your signature.'];
  if (bad) {
    bad[0].setAttribute('aria-invalid', 'true');
    status.className = 'sheet-status is-error';
    status.textContent = bad[1];
    bad[0].focus();
    return;
  }
  status.className = 'sheet-status';
  status.textContent = `Thank you, ${name.value.trim()}. You've signed in this preview only: the sending endpoint is a placeholder, so nothing left your browser.`;
  form.querySelector('button[type="submit"]').disabled = true;
});
