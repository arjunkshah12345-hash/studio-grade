import { reveal, reduced } from './motion.js';

reveal();

/* Each vignette plays its one action once, when it enters the viewport. */
const playables = [...document.querySelectorAll('.vig, .panel, .finale-card')];
const play = (el) => el.classList.add(el.classList.contains('panel') ? 'is-in' : 'is-playing');
if (reduced || !('IntersectionObserver' in window)) playables.forEach(play);
else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -15% 0px' });
  playables.forEach((el) => io.observe(el));
}

/* Placeholder waveform: fixed, deterministic bars (no audio yet). */
const wave = document.querySelector('.wave');
if (wave) {
  let s = 7;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 64; i++) {
    const b = document.createElement('i');
    const env = Math.sin((i / 63) * Math.PI) * .6 + .3;
    b.style.height = `${Math.round((.25 + rnd() * .75) * env * 100)}%`;
    wave.append(b);
  }
}

/* Pricing: one dot per 10 calls; filled = included (first 300), open ring = $0.60 each. */
const range = document.getElementById('calls');
const dots = document.querySelector('.dots');
if (range && dots) {
  const pool = [];
  for (let i = 0; i < 80; i++) { const d = document.createElement('i'); dots.append(d); pool.push(d); }
  const out = document.getElementById('calls-out');
  const total = document.getElementById('total');
  const breakdown = document.getElementById('breakdown');
  const money = (n) => `$${n % 1 ? n.toFixed(2) : n}`;
  const update = () => {
    const calls = +range.value;
    const extra = Math.max(0, calls - 300);
    const price = Math.round((149 + extra * 0.6) * 100) / 100;
    out.textContent = calls;
    total.textContent = money(price);
    breakdown.textContent = extra ? `$149 plus ${extra} extra calls at $0.60` : 'All included in the $149 plan';
    pool.forEach((d, i) => {
      const on = i < calls / 10;
      d.className = on ? (i < 30 ? 'in' : 'ex') : '';
    });
  };
  range.addEventListener('input', update);
  update();
}

/* Trial form: honest demo state. */
const form = document.querySelector('.trial-form');
if (form) form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  const msg = form.querySelector('.form-msg');
  if (!/^\S+@\S+\.\S+$/.test(email)) { msg.textContent = 'That email looks incomplete. Try again?'; form.email.focus(); return; }
  msg.textContent = `Callback is a fictional product, so nothing was sent to ${email}.`;
});

/* Footer: the visitor's local time. */
const t = document.querySelector('[data-local-time]');
if (t) {
  const tick = () => { t.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); };
  tick(); setInterval(tick, 30000);
}
