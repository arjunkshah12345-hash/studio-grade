import { autoInit, reduced } from './motion.js';

autoInit();

const prompt = document.getElementById('prompt');
const example = prompt.dataset.example;
const smooth = reduced ? 'auto' : 'smooth';

/* 1. The typed placeholder: runs once, stops the moment the visitor takes over (§75). */
(function typePlaceholder() {
  if (reduced) return;
  let i = 0, stopped = false;
  const stop = () => { stopped = true; prompt.placeholder = example; };
  prompt.addEventListener('focus', stop, { once: true });
  prompt.placeholder = '';
  const tick = () => {
    if (stopped) return;
    i += 1;
    prompt.placeholder = example.slice(0, i) + (i < example.length ? '|' : '');
    if (i < example.length) setTimeout(tick, /[,.]/.test(example[i - 1]) ? 240 : 30 + Math.random() * 30);
  };
  setTimeout(tick, 600);
})();

function focusPrompt() {
  prompt.scrollIntoView({ block: 'center', behavior: smooth });
  prompt.focus({ preventScroll: true });
  const end = prompt.value.length; prompt.setSelectionRange(end, end);
}

/* 2. Prompt starters fill the route card and hand focus back to it. */
document.querySelectorAll('[data-prompt]').forEach((b) => b.addEventListener('click', () => {
  prompt.value = b.dataset.prompt;
  focusPrompt();
}));
document.querySelectorAll('[data-focus-prompt]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  focusPrompt();
}));

/* 3. Submitting shows the static, clearly labelled sample plan. */
const result = document.getElementById('plan-result');
const card = result.querySelector('.res-card');
function plan(form) {
  const btn = form.querySelector('.rc-go');
  const label = btn.querySelector('.rc-go-label');
  const ta = form.querySelector('textarea');
  if (btn.classList.contains('is-loading')) return;
  if (!ta.value.trim()) ta.value = example;
  if (form.id !== 'plan') prompt.value = ta.value;
  btn.classList.add('is-loading'); btn.setAttribute('aria-disabled', 'true'); label.textContent = 'Planning';
  setTimeout(() => {
    btn.classList.remove('is-loading'); btn.removeAttribute('aria-disabled'); label.textContent = 'Plan my day';
    result.hidden = false;
    result.classList.remove('is-in'); void result.offsetWidth; result.classList.add('is-in');
    card.focus({ preventScroll: true });
    card.scrollIntoView({ block: 'start', behavior: smooth });
  }, reduced ? 0 : 1100);
}
document.querySelectorAll('form.rc').forEach((f) => f.addEventListener('submit', (e) => { e.preventDefault(); plan(f); }));
document.querySelectorAll('.rc-input').forEach((ta) => ta.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); plan(ta.form); }
}));

/* 4. Footer: today's sunset in Fort William, worked out on the device (NOAA sunrise equation). */
(function sunset() {
  const el = document.getElementById('sunset');
  if (!el) return;
  const lat = +el.dataset.lat, lon = +el.dataset.lon, r = Math.PI / 180;
  const jd = Date.now() / 864e5 + 2440587.5;
  const n = Math.round(jd - 2451545 + 0.0008);
  const js = n - lon / 360;
  const M = (357.5291 + 0.98560028 * js) % 360;
  const C = 1.9148 * Math.sin(M * r) + 0.02 * Math.sin(2 * M * r) + 0.0003 * Math.sin(3 * M * r);
  const L = (M + C + 180 + 102.9372) % 360;
  const jt = 2451545 + js + 0.0053 * Math.sin(M * r) - 0.0069 * Math.sin(2 * L * r);
  const dec = Math.asin(Math.sin(L * r) * Math.sin(23.4397 * r));
  const cosW = (Math.sin(-0.833 * r) - Math.sin(lat * r) * Math.sin(dec)) / (Math.cos(lat * r) * Math.cos(dec));
  if (Math.abs(cosW) > 1) return;
  const set = new Date((jt + Math.acos(cosW) / r / 360 - 2440587.5) * 864e5);
  const t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }).format(set);
  el.textContent = `Sunset in Fort William today: ${t}. Plan to be off the hill well before it.`;
})();
