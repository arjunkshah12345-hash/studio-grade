import { reveal, reduced } from './motion.js';

reveal();

/* nav hairline once the page moves */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ---------- What fits: two children, or up to 80 kg (motif that counts) ---------- */
const CAP = 80;
const fits = document.querySelector('.fits');
const read = document.getElementById('fits-read');
const glyphs = document.getElementById('glyphs');
const shop = document.getElementById('shop-kg');
const shopOut = document.getElementById('shop-out');
const kids = [...document.querySelectorAll('.kid')];
const seats = [...document.querySelectorAll('[data-seat]')];
const modes = [...document.querySelectorAll('[data-mode]')];
const POOL = Math.ceil(CAP / Number(shop.min));
for (let i = 0; i < POOL; i++) glyphs.append(document.createElement('i'));
const gl = [...glyphs.children];

function renderKids() {
  const on = seats.map((b) => b.getAttribute('aria-pressed') === 'true');
  kids.forEach((k, i) => k.classList.toggle('is-out', !on[i]));
  const n = on.filter(Boolean).length;
  read.textContent = n === 2 ? 'Two children, in two seats.' : n === 1 ? 'One child, one seat to spare.' : 'No children aboard. Both seats stay ready.';
}
function renderShop() {
  const kg = Number(shop.value);
  shopOut.value = `${kg} kg`; shopOut.textContent = `${kg} kg`;
  fits.style.setProperty('--empty', String(1 - kg / CAP));
  const n = CAP / kg, full = Math.floor(n), frac = n - full;
  gl.forEach((g, i) => {
    g.hidden = i >= Math.ceil(n - 1e-9);
    g.classList.toggle('part', i === full && frac > 0.01);
    if (i === full) g.style.setProperty('--f', `${Math.round(frac * 100)}%`);
  });
  read.textContent = full === 1 ? `${kg} kg of 80. One shop like yours per load.` : `${kg} kg of 80. Room for ${full} shops like yours.`;
}
function setMode(mode) {
  fits.dataset.mode = mode;
  modes.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.mode === mode)));
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== mode; });
  mode === 'kids' ? renderKids() : renderShop();
}
modes.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
document.querySelector('.seg').addEventListener('keydown', (e) => {
  if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  const next = fits.dataset.mode === 'kids' ? 'shop' : 'kids';
  setMode(next); modes.find((b) => b.dataset.mode === next).focus();
});
seats.forEach((b) => b.addEventListener('click', () => { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); renderKids(); }));
shop.addEventListener('input', renderShop);
setMode('kids');

/* ---------- Range: trips per charge from the 70 km figure ---------- */
const RANGE = 70;
const trip = document.getElementById('trip-km');
const tripOut = document.getElementById('trip-out');
const tripRow = document.getElementById('trip-row');
const tripRead = document.getElementById('trip-read');
const TPOOL = Math.ceil(RANGE / Number(trip.min));
for (let i = 0; i < TPOOL; i++) tripRow.append(document.createElement('i'));
const tp = [...tripRow.children];
function renderTrip() {
  const km = Number(trip.value);
  tripOut.textContent = `${km} km`;
  const n = RANGE / km, full = Math.floor(n), frac = n - full;
  tp.forEach((t, i) => {
    t.hidden = i >= Math.ceil(n - 1e-9);
    t.classList.toggle('part', i === full && frac > 0.01);
    if (i === full) t.style.setProperty('--f', `${Math.round(frac * 100)}%`);
  });
  tripRead.textContent = full === 1 ? 'About one round trip on one charge.' : `About ${full} round trips on one charge.`;
}
trip.addEventListener('input', renderTrip); renderTrip();

/* ---------- Rain cover diagram ---------- */
const coverBtn = document.getElementById('cover-btn');
const dia = document.querySelector('.rain-diagram');
const coverState = dia.querySelector('.cover-state');
coverBtn.addEventListener('click', () => {
  const up = dia.dataset.cover !== 'up';
  dia.dataset.cover = up ? 'up' : 'down';
  coverBtn.setAttribute('aria-pressed', String(up));
  coverBtn.textContent = up ? 'Roll the cover up' : 'Put the cover up';
  coverState.textContent = up ? 'Cover over the seats' : 'Cover rolled up';
});

/* ---------- Step vignettes play their one action once ---------- */
const vigs = document.querySelectorAll('.step .vig');
if (reduced || !('IntersectionObserver' in window)) vigs.forEach((v) => v.classList.add('is-play'));
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-play'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -20% 0px' });
  vigs.forEach((v) => io.observe(v));
}

/* ---------- Booking form (demo: Loam is fictional) ---------- */
const days = document.getElementById('book-days');
const fmtDay = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });
const fmtDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });
const d = new Date(); d.setDate(d.getDate() + 1);
let added = 0;
while (added < 4) {
  if (d.getDay() !== 0) {
    const lab = document.createElement('label');
    const inp = Object.assign(document.createElement('input'), { type: 'radio', name: 'day', value: `${fmtDay.format(d)} ${fmtDate.format(d)}`, checked: added === 0 });
    const sp = document.createElement('span');
    sp.innerHTML = `${fmtDay.format(d)}<small>${fmtDate.format(d)}</small>`;
    lab.append(inp, sp); days.append(lab); added++;
  }
  d.setDate(d.getDate() + 1);
}
const form = document.getElementById('book-form');
const msg = document.getElementById('book-msg');
const pc = document.getElementById('pc');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!pc.value.trim()) {
    msg.classList.add('is-err');
    msg.textContent = 'Add your postcode so we know where to bring the bike.';
    pc.setAttribute('aria-invalid', 'true'); pc.focus(); return;
  }
  pc.removeAttribute('aria-invalid'); msg.classList.remove('is-err');
  const day = form.querySelector('input[name=day]:checked').value;
  const slot = form.querySelector('input[name=slot]:checked').value;
  msg.textContent = `You picked ${day}, ${slot}. Loam is a fictional product, so no booking was made.`;
});
