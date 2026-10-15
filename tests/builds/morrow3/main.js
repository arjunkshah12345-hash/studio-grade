import { reveal, reduced } from './motion.js';

reveal();

// Light-up: photographs arrive from grey into their hour's colour, then the labels print.
const lit = (el) => el.classList.add('is-lit');
const lights = [...document.querySelectorAll('[data-light]')];
if (reduced || !('IntersectionObserver' in window)) lights.forEach(lit);
else {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { lit(e.target); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -20% 0px' });
  lights.forEach((el) => io.observe(el));
}

// Nav gets a paper ground once it leaves the wall.
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

// The hour it is now in Copenhagen: the most recent of the six that has passed.
const parts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'Europe/Copenhagen' }).formatToParts(new Date());
const get = (t) => +parts.find((p) => p.type === t).value;
const mins = get('hour') * 60 + get('minute');
const rows = [...document.querySelectorAll('.hour[data-min]')];
const current = rows.filter((r) => +r.dataset.min <= mins).pop() || rows[rows.length - 1];
if (current) {
  const tag = document.createElement('span');
  tag.className = 'now';
  tag.textContent = 'The hour now in Copenhagen';
  current.querySelector('.hour-line').append(tag);
}

// The shop is fictional: say so instead of pretending to take an order.
const note = document.querySelector('.order-note');
document.querySelector('[data-order]')?.addEventListener('click', (e) => {
  e.preventDefault();
  note.textContent = 'Morrow is a fictional house, so nothing was ordered and nothing was charged.';
});
