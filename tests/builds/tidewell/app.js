import { autoInit } from './motion.js';

// the step vignettes and the week play their one action when they arrive
document.querySelectorAll('.row-media .vig, .weekbox').forEach((el) => el.setAttribute('data-reveal', ''));
autoInit();

// footer: the day rail follows London time, and the line knows when it's order night
const live = document.querySelector('.rail--live');
const day = document.querySelector('.foot-day');
const parts = () => Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  .formatToParts(new Date()).map((p) => [p.type, p.value]));
const tick = () => {
  const p = parts();
  const mins = +p.hour * 60 + +p.minute;
  if (live) live.style.setProperty('--t', (mins / 1440).toFixed(3));
  if (!day) return;
  if (p.weekday === 'Thursday' && mins < 22 * 60) day.textContent = 'It’s Thursday: your order closes at 22:00.';
  else if (p.weekday === 'Thursday') day.textContent = 'This week’s order has gone out.';
  else day.textContent = `It’s ${p.weekday}. The next order is drafted Thursday.`;
};
tick(); setInterval(tick, 30000);
