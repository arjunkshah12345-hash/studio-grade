import { autoInit, reduced } from './motion.js';

autoInit();

/* nav: hairline + blur once the hero has scrolled */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 24);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* tracking boxes lock on: the hero on load, the rest on view */
const tracks = [...document.querySelectorAll('.track')];
const hero = document.querySelector('.hero__track');
if (reduced) tracks.forEach((t) => t.classList.add('is-on'));
else {
  requestAnimationFrame(() => setTimeout(() => hero.classList.add('is-on'), 350));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-on'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -25% 0px' });
  tracks.filter((t) => t !== hero).forEach((t) => io.observe(t));
}

/* sample report dates: flown and filed today */
const today = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
document.querySelectorAll('[data-today]').forEach((el) => { el.textContent = today; });

/* blade hours: turbines × blades × 11 minutes */
const tIn = document.getElementById('turbines');
const big = document.getElementById('calc-big');
const sub = document.getElementById('calc-sub');
const formTurbines = document.getElementById('f-turbines');
const clamp = (n) => Math.min(999, Math.max(1, Math.round(n) || 1));
const fmt = (min) => {
  const h = Math.floor(min / 60), m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
};
const calc = () => {
  const t = clamp(+tIn.value);
  const b = +document.querySelector('input[name="blades"]:checked').value;
  const blades = t * b;
  big.textContent = fmt(blades * 11);
  sub.textContent = `of blade flight for ${blades.toLocaleString('en-GB')} ${blades === 1 ? 'blade' : 'blades'}`;
  formTurbines.value = t;
};
tIn.addEventListener('input', calc);
tIn.addEventListener('change', () => { tIn.value = clamp(+tIn.value); calc(); });
document.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
  tIn.value = clamp(+tIn.value + +b.dataset.step); calc();
}));
document.querySelectorAll('input[name="blades"]').forEach((r) => r.addEventListener('change', calc));
calc();

/* trial form: honest, local only */
const form = document.getElementById('trial-form');
const msg = document.getElementById('form-msg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements.name, email = form.elements.email;
  let bad = null;
  [name, email].forEach((f) => f.removeAttribute('aria-invalid'));
  if (!name.value.trim()) bad = name;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) bad = email;
  if (bad) {
    bad.setAttribute('aria-invalid', 'true'); bad.focus();
    msg.textContent = bad === name ? 'Add your name so we know who to reply to.' : 'That email address looks incomplete.';
    return;
  }
  const first = name.value.trim().split(/\s+/)[0];
  msg.textContent = `Thanks, ${first}. Kestrel K-1 is a fictional product, so this request was not sent or stored anywhere.`;
});
