import { autoInit, reduced } from './motion.js';

autoInit();

/* nav hairline once the page moves */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-stuck', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* each vignette plays its one action, once, when it enters the viewport */
const vigs = [...document.querySelectorAll('.vig--consent, .vig--live, .vig--sign')];
const play = (v) => {
  if (v.classList.contains('play')) return;
  v.classList.add('play');
  const t = v.querySelector('[data-timer]');
  if (!t) return;
  if (reduced) { t.textContent = '00:41'; return; }
  let s = 0;
  setTimeout(() => {
    const id = setInterval(() => {
      s += 1;
      t.textContent = `00:${String(s).padStart(2, '0')}`;
      if (s >= 41) clearInterval(id);
    }, 160);
  }, 1300);
};
if (reduced || !('IntersectionObserver' in window)) vigs.forEach(play);
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -15% 0px' });
  vigs.forEach((v) => io.observe(v));
}

/* footer: the surgery lamp is lit in surgery hours (08:00–18:30, Mon–Fri, London) */
const lamp = document.querySelector('.lamp');
const lampText = document.querySelector('[data-lamp]');
if (lamp && lampText) {
  const update = () => {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false })
      .formatToParts(new Date()).map((p) => [p.type, p.value]));
    const mins = +parts.hour * 60 + +parts.minute;
    const open = !['Sat', 'Sun'].includes(parts.weekday) && mins >= 480 && mins < 1110;
    lamp.classList.toggle('off', !open);
    const clock = lampText.querySelector('[data-clock]');
    lampText.firstChild.textContent = open ? 'Surgery lamp lit · London ' : 'Lamp off, out of hours · London ';
    if (clock && !clock.textContent.includes(':')) clock.textContent = `${parts.hour}:${parts.minute}`;
  };
  update();
  setInterval(update, 60000);
}
