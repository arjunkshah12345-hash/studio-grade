import { autoInit, reduced } from './motion.js';

autoInit();

/* ---------- lamp rows: one lamp per unit of Antropi's stated figure, lit in sequence once in view ---------- */
document.querySelectorAll('.lamprow[data-lit]').forEach((row) => {
  const n = parseInt(getComputedStyle(row).getPropertyValue('--n'), 10) || 10;
  const lit = +row.dataset.lit;
  for (let i = 0; i < n; i++) {
    const l = document.createElement('i');
    l.style.setProperty('--k', i);
    if (i < lit) l.className = 'on';
    row.append(l);
  }
});
const strip = document.querySelector('[data-lamps]');
if (strip) {
  if (reduced || !('IntersectionObserver' in window)) strip.classList.add('is-lit');
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { strip.classList.add('is-lit'); io.disconnect(); } }), { rootMargin: '0px 0px -10% 0px' });
    io.observe(strip);
  }
}

/* ---------- week grid calculator: 168 lamps, the visitor's hours vs 95% of the week ---------- */
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
function buildGrid(el) {
  const cells = [];
  el.append(document.createElement('span'));
  for (let h = 0; h < 24; h++) {
    const s = document.createElement('span'); s.className = 'h';
    s.textContent = h % 6 === 0 ? String(h).padStart(2, '0') : '';
    el.append(s);
  }
  for (let d = 0; d < 7; d++) {
    const lab = document.createElement('span'); lab.className = 'd'; lab.textContent = DAYS[d]; el.append(lab);
    for (let h = 0; h < 24; h++) { const c = document.createElement('i'); el.append(c); cells.push(c); }
  }
  return cells; // index = day * 24 + hour
}
const gYou = document.getElementById('g-you');
const gA = document.getElementById('g-a');
if (gYou && gA) {
  const you = buildGrid(gYou);
  const a = buildGrid(gA);
  // 95% of 168 ≈ 160 lit; the 8 dark hours are spread evenly (no claim about what fills them)
  const A_HOURS = 160;
  a.forEach((c, i) => c.classList.toggle('on', !(i % 21 === 20)));

  const hrs = document.getElementById('hrs');
  const hrsO = document.getElementById('hrs-o');
  const hint = document.getElementById('hrs-hint');
  const mach = document.getElementById('mach');
  const youN = document.getElementById('you-n');
  const out = document.getElementById('calc-out');
  const fmt = new Intl.NumberFormat('en-US');

  const hintFor = (h) => {
    if (h === 40) return '40 hours is one eight-hour shift, five days.';
    if (h === 80) return '80 hours is two eight-hour shifts, five days.';
    if (h === 120) return '120 hours is three shifts, five days.';
    if (h === 168) return 'Every hour of the week.';
    return `${h} hours out of 168.`;
  };

  const update = () => {
    const h = Math.max(0, Math.min(168, +hrs.value || 0));
    let m = Math.round(+mach.value);
    if (!Number.isFinite(m) || m < 1) m = 1;
    if (m > 200) m = 200;
    hrsO.textContent = h;
    hint.textContent = hintFor(h);
    youN.textContent = `${h} h`;
    // weekdays get equal blocks starting 06:00; overflow goes to weekends
    const lit = new Set();
    const wk = Math.min(h, 120);
    const per = Math.floor(wk / 5), extra = wk % 5;
    for (let d = 0; d < 5; d++) { const k = per + (d < extra ? 1 : 0); for (let i = 0; i < k; i++) lit.add(d * 24 + ((6 + i) % 24)); }
    const we = h - wk; const perW = Math.floor(we / 2), exW = we % 2;
    for (let d = 5; d < 7; d++) { const k = perW + (d - 5 < exW ? 1 : 0); for (let i = 0; i < k; i++) lit.add(d * 24 + ((6 + i) % 24)); }
    you.forEach((c, i) => c.classList.toggle('on', lit.has(i)));

    const gap = Math.max(0, A_HOURS - h);
    const mWord = m === 1 ? 'machine' : 'machines';
    out.innerHTML = gap > 0
      ? `At Antropi's stated 95%, a machine cuts about <b>160</b> of the week's 168 hours. That's <b>${fmt.format(gap)}</b> more than yours, or <b>${fmt.format(gap * m)} more spindle-hours a week</b> across ${m} ${mWord}.`
      : `Your machines already cut ${h} of 168 hours a week, at or above Antropi's stated 95%. Ask the demo what the cell changes for labor instead.`;
  };
  hrs.addEventListener('input', update);
  mach.addEventListener('input', update);
  mach.addEventListener('change', () => { mach.value = Math.max(1, Math.min(200, Math.round(+mach.value) || 1)); update(); });
  document.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
    mach.value = Math.max(1, Math.min(200, (Math.round(+mach.value) || 1) + +b.dataset.step)); update();
  }));
  document.getElementById('calc').addEventListener('submit', (e) => e.preventDefault());
  update();
}

/* ---------- demo form: a concept, so it says plainly that nothing was sent ---------- */
const form = document.getElementById('demo-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('demo-note');
    const name = form.elements.name.value.trim();
    note.classList.add('is-sent');
    note.innerHTML = `${name ? `Thanks, ${name.replace(/[<>&"]/g, '')}. ` : ''}Nothing was sent: this is a concept page. To reach Antropi, use <a href="https://www.antropi.world/request-demo">antropi.world/request-demo</a>.`;
  });
}
