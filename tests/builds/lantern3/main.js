import { autoInit, reduced } from './motion.js';

autoInit();

/* Lights-up (techniques §51): each print sits unlit in grey ink, then its amber comes on.
   The hero lights shortly after load; the rest when they are a third into view. */
const lights = [...document.querySelectorAll('.lightup, .windows')];
document.querySelectorAll('.windows span').forEach((s, i) => s.style.setProperty('--n', i));
const light = (el) => el.classList.add('is-lit');
if (reduced || !('IntersectionObserver' in window)) lights.forEach(light);
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { light(e.target); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -30% 0px' });
  lights.forEach((el) => {
    if (el.closest('.hero')) setTimeout(() => light(el), 350);
    else io.observe(el);
  });
}

/* Header: hairline once the page has scrolled; nav marks the section in view */
const head = document.querySelector('.site-head');
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
let raf = 0;
const onScroll = () => {
  raf = 0;
  head.classList.toggle('is-stuck', scrollY > 8);
  let cur = null;
  for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s.id;
  navLinks.forEach((a) => {
    const on = a.getAttribute('href') === '#' + cur;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
};
addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(onScroll); }, { passive: true });
onScroll();

/* Mobile menu */
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const setMenu = (open) => { btn.setAttribute('aria-expanded', String(open)); menu.hidden = !open; btn.textContent = open ? 'Close' : 'Menu'; };
btn.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); btn.focus(); } });

/* Library filter */
const rows = [...document.querySelectorAll('.shelf tbody tr')];
document.querySelectorAll('.filter').forEach((f) => f.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((o) => o.setAttribute('aria-pressed', String(o === f)));
  const t = f.dataset.filter;
  rows.forEach((r) => { r.hidden = t !== 'all' && r.dataset.type !== t; });
}));

/* Reading-group form: no back end in this fictional build, so it confirms locally */
const form = document.getElementById('signup');
const msg = document.getElementById('signup-msg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = form.email;
  msg.classList.remove('is-error', 'is-ok');
  if (!input.value.trim() || !input.checkValidity()) {
    msg.textContent = 'That address looks incomplete. Check for an @ and a domain, like name@example.org.';
    msg.classList.add('is-error'); input.setAttribute('aria-invalid', 'true'); input.focus(); return;
  }
  input.removeAttribute('aria-invalid');
  msg.textContent = 'You’re on the list. The next date and the reading will come to ' + input.value.trim() + '.';
  msg.classList.add('is-ok');
  form.reset();
});
