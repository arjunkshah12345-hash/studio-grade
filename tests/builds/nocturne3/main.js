import { reveal, reduced } from './motion.js';

reveal();

/* §51 lights-up: the hero photo comes up from near-black; the headline is already there */
const hero = document.querySelector('.hero');
const heroImg = hero.querySelector('img');
const light = () => requestAnimationFrame(() => hero.classList.add('is-lit'));
if (reduced) hero.classList.add('is-lit');
else if (heroImg.complete) light(); else { heroImg.addEventListener('load', light, { once: true }); setTimeout(light, 1500); }

/* nav: solid once the photo has scrolled past; the clock runs 22:00 → 06:00 over the page (linear: it represents time) */
const nav = document.querySelector('.nav');
const clockEl = document.querySelector('[data-night-clock]');
const dot = document.querySelector('.nc-dot');
const hues = ['#E8473A', '#5ACFE0', '#F2A33A', '#5AA0D7'];
let raf = 0;
const onScroll = () => {
  raf = 0;
  nav.classList.toggle('is-scrolled', scrollY > 40);
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  const mins = Math.round((p * 480) / 5) * 5;            // 8 hours in 5-minute steps
  const h = (22 + Math.floor(mins / 60)) % 24, m = mins % 60;
  clockEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  const c = p >= 0.985 ? hues[3] : hues[Math.min(2, Math.floor(p * 3))];
  dot.style.background = c;
};
addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(onScroll); }, { passive: true });
onScroll();

/* masthead: pick a night, the price and the button follow */
const NIGHTS = { fri: 'Friday', sat: 'Saturday', sun: 'Sunday', all: 'the weekend' };
const mh = document.getElementById('masthead');
const kind = mh.querySelector('[data-mh-kind]'), price = mh.querySelector('[data-mh-price]'), cta = mh.querySelector('[data-mh-cta]');
const note = mh.querySelector('.mh-note');
const sync = () => {
  const v = mh.elements.night.value;
  const all = v === 'all';
  kind.textContent = all ? 'Weekend, three nights' : 'Day ticket';
  price.textContent = all ? '€150' : '€65';
  cta.textContent = all ? 'Buy the weekend' : `Buy ${NIGHTS[v]}`;
  note.textContent = '';
};
mh.addEventListener('change', sync);
const fictional = (what) => `Nocturne is a fictional festival, so nothing is sold here. You picked ${what}.`;
mh.addEventListener('submit', (e) => {
  e.preventDefault();
  const v = mh.elements.night.value;
  note.textContent = fictional(v === 'all' ? 'the weekend, €150' : `${NIGHTS[v]}, €65`);
});
sync();

/* ticket buttons answer honestly in place */
const tkStatus = document.querySelector('.tk-status');
document.querySelectorAll('[data-buy]').forEach((b) => b.addEventListener('click', () => {
  tkStatus.textContent = fictional(b.dataset.buy === 'all' ? 'the weekend, €150' : 'a day ticket, €65');
}));

/* timetable: night tabs (roving tabindex, arrow keys), sets draw along the time axis once */
const tabs = [...document.querySelectorAll('.tt-tabs [role="tab"]')];
const tt = document.querySelector('[data-tt]');
const select = (tab, focus) => {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
  if (focus) tab.focus();
  if (!reduced && tt.classList.contains('is-drawn')) {
    tt.classList.remove('is-drawn'); void tt.offsetWidth; requestAnimationFrame(() => tt.classList.add('is-drawn'));
  }
};
tabs.forEach((t, i) => {
  t.addEventListener('click', () => select(t));
  t.addEventListener('keydown', (e) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
  });
});
if (reduced || !('IntersectionObserver' in window)) tt.classList.add('is-drawn');
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { tt.classList.add('is-drawn'); io.disconnect(); }
  }), { rootMargin: '0px 0px -20% 0px' });
  io.observe(tt);
}
