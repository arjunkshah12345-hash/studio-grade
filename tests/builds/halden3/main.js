import { autoInit } from './motion.js';

autoInit();

/* ---------- season status (Europe/Oslo) ---------- */
const TZ = 'Europe/Oslo';
const osloMonth = Number(new Intl.DateTimeFormat('en-GB', { month: 'numeric', timeZone: TZ }).format(new Date())); // 1–12
const inSeason = osloMonth >= 3 && osloMonth <= 11;
const statusText = !inSeason ? 'Closed for winter. Opens in March'
  : osloMonth === 11 ? 'Open now. Last month of the season'
  : 'Open now, until the end of November';
document.querySelectorAll('[data-status]').forEach((el) => { el.textContent = statusText; });
if (!inSeason) document.querySelectorAll('.status').forEach((el) => el.classList.add('is-off'));
const nowCell = document.querySelectorAll('.months .m')[osloMonth - 1];
if (nowCell) {
  nowCell.classList.add('is-now');
  const st = nowCell.querySelector('.m-state');
  if (st) st.textContent = 'Now';
  nowCell.setAttribute('aria-label', `${nowCell.querySelector('.m-name').textContent}: ${inSeason ? 'open' : 'closed'}, this month`);
}

/* ---------- nav hairline once the page moves ---------- */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ---------- booking ---------- */
const RATE = 2400;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const fmtCell = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const fmtLong = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const nok = new Intl.NumberFormat('en-GB');
const words = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'];
const count = (n, one, many) => `${n < words.length ? words[n] : n} ${n === 1 ? one : many}`;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const today = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const closedMonth = (m) => m === 11 || m === 0 || m === 1;          // December to February
const bookableNight = (d) => d >= today && !closedMonth(d.getMonth());
const key = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const nightsBetween = (a, b) => Math.round((b - a) / 864e5);
const rangeOpen = (a, b) => { for (let d = new Date(a); d < b; d = addDays(d, 1)) if (!bookableNight(d)) return false; return true; };

const firstView = (() => {
  const d = new Date(today.getFullYear(), today.getMonth(), 1);
  while (closedMonth(d.getMonth())) d.setMonth(d.getMonth() + 1);
  return d;
})();
const lastView = new Date(today.getFullYear() + 1, 10, 1);          // through next November
const wide = matchMedia('(min-width: 761px)');

const forms = [...document.querySelectorAll('[data-booking]')];
forms.forEach(setupForm);

function setupForm(form) {
  const state = { in: null, out: null, field: 'in', view: new Date(firstView), hover: null };
  const out = form.querySelector('.book-out');
  const cells = { in: form.querySelector('[data-field="in"]'), out: form.querySelector('[data-field="out"]') };
  const vals = { in: form.querySelector('[data-v="in"]'), out: form.querySelector('[data-v="out"]') };
  const rooms = form.querySelector('select[name="rooms"]');
  Object.values(vals).forEach((v) => v.classList.add('is-empty'));

  const cal = document.createElement('div');
  cal.className = 'cal'; cal.hidden = true;
  cal.setAttribute('role', 'dialog'); cal.setAttribute('aria-label', 'Choose your nights');
  cal.innerHTML = `<div class="cal-head"><p class="cal-hint"></p><div class="cal-nav">
    <button type="button" data-step="-1" aria-label="Earlier months">←</button>
    <button type="button" data-step="1" aria-label="Later months">→</button>
    <button type="button" class="cal-x" aria-label="Close the calendar">×</button></div></div><div class="cal-months"></div>`;
  form.querySelector('.book-row').after(cal);
  const hint = cal.querySelector('.cal-hint');
  const monthsEl = cal.querySelector('.cal-months');

  function perView() { return wide.matches ? 2 : 1; }

  function render() {
    const n = perView();
    monthsEl.style.setProperty('--cal-n', n);
    hint.textContent = state.field === 'in' ? 'Pick the day you arrive' : 'Now the day you leave';
    let html = '';
    for (let i = 0; i < n; i++) {
      const m = new Date(state.view.getFullYear(), state.view.getMonth() + i, 1);
      const closed = closedMonth(m.getMonth());
      html += `<div class="cal-month${closed ? ' is-closed' : ''}"><p class="cal-title">${MONTHS[m.getMonth()]} ${m.getFullYear()}</p>
        <div class="cal-dow" aria-hidden="true">${DOW.map((d) => `<span>${d}</span>`).join('')}</div><div class="cal-days">`;
      const lead = (m.getDay() + 6) % 7;
      for (let b = 0; b < lead; b++) html += '<span></span>';
      const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= days; day++) {
        const d = new Date(m.getFullYear(), m.getMonth(), day);
        let ok;
        if (state.field === 'out' && state.in) ok = d > state.in && rangeOpen(state.in, d);
        else ok = bookableNight(d);
        const cls = ['d'];
        if (state.in && +d === +state.in) cls.push('is-in');
        if (state.out && +d === +state.out) cls.push('is-out');
        const end = state.out || (state.field === 'out' ? state.hover : null);
        if (state.in && end && d > state.in && d < end) cls.push('is-range');
        html += `<button type="button" class="${cls.join(' ')}" data-date="${key(d)}" aria-label="${fmtLong.format(d)}"${ok ? '' : ' disabled'}${cls.length > 1 ? ' aria-pressed="true"' : ''}>${day}</button>`;
      }
      html += '</div>';
      if (closed) html += `<p class="cal-closed">Closed in ${MONTHS[m.getMonth()]}.<br>The season runs March to November.</p>`;
      html += '</div>';
    }
    monthsEl.innerHTML = html;
    const [prev, next] = cal.querySelectorAll('[data-step]');
    prev.disabled = state.view <= firstView;
    next.disabled = new Date(state.view.getFullYear(), state.view.getMonth() + n - 1, 1) >= lastView;
  }

  function sync() {
    for (const f of ['in', 'out']) {
      vals[f].textContent = state[f] ? fmtCell.format(state[f]) : 'Add date';
      vals[f].classList.toggle('is-empty', !state[f]);
      cells[f].classList.toggle('is-active', !cal.hidden && state.field === f);
    }
  }

  function open(field) {
    closeAll(form);
    state.field = field === 'out' && !state.in ? 'in' : field;
    if (state[state.field]) state.view = new Date(state[state.field].getFullYear(), state[state.field].getMonth(), 1);
    if (state.view < firstView) state.view = new Date(firstView);
    cal.hidden = false; render(); sync();
    const first = cal.querySelector('.d.is-in, .d.is-out, .d:not(:disabled)');
    first?.focus({ preventScroll: true });
  }
  function close() { if (cal.hidden) return; cal.hidden = true; state.hover = null; sync(); }
  form._open = open; form._close = close;

  cells.in.addEventListener('click', () => (cal.hidden || state.field !== 'in' ? open('in') : close()));
  cells.out.addEventListener('click', () => (cal.hidden || state.field !== 'out' ? open('out') : close()));

  cal.addEventListener('click', (e) => {
    if (e.target.closest('.cal-x')) { close(); cells[state.field].focus(); return; }
    const step = e.target.closest('[data-step]');
    if (step) {
      const n = perView();
      state.view = new Date(state.view.getFullYear(), state.view.getMonth() + n * Number(step.dataset.step), 1);
      if (state.view < firstView) state.view = new Date(firstView);
      render(); return;
    }
    const b = e.target.closest('.d');
    if (!b || b.disabled) return;
    const [y, m, d] = b.dataset.date.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (state.field === 'in') {
      state.in = date; state.out = null; state.field = 'out'; out.textContent = '';
      render(); sync();
      cal.querySelector(`[data-date="${b.dataset.date}"]`)?.focus({ preventScroll: true });
    } else {
      state.out = date; close(); report(false);
      form.querySelector('.book-go').focus({ preventScroll: true });
    }
  });
  cal.addEventListener('mouseover', (e) => {
    const b = e.target.closest('.d');
    if (!b || state.field !== 'out' || !state.in || state.out) return;
    const [y, m, d] = b.dataset.date.split('-').map(Number);
    const h = new Date(y, m - 1, d);
    if (+h === +state.hover) return;
    state.hover = h;
    cal.querySelectorAll('.d').forEach((x) => {
      const [yy, mm, dd] = x.dataset.date.split('-').map(Number);
      const xd = new Date(yy, mm - 1, dd);
      x.classList.toggle('is-range', !x.disabled && xd > state.in && xd < h);
    });
  });
  cal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { close(); cells[state.field].focus(); }
  });
  rooms.addEventListener('change', () => { if (state.in && state.out) report(false); });

  function report(submitted) {
    if (!state.in || !state.out) return;
    const nights = nightsBetween(state.in, state.out);
    const r = Number(rooms.value);
    const price = nok.format(nights * r * RATE);
    out.textContent = `${cap(count(nights, 'night', 'nights'))}, ${count(r, 'room', 'rooms')}: from NOK ${price}.`
      + (submitted ? ' Halden is a fictional hotel, so nothing is held. This is where live availability would show.' : ' Press Check dates to see what is free.');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.in) return open('in');
    if (!state.out) return open('out');
    close(); report(true);
  });
}

function closeAll(except) { forms.forEach((f) => { if (f !== except) f._close?.(); }); }

document.addEventListener('pointerdown', (e) => { forms.forEach((f) => { if (!f.contains(e.target)) f._close?.(); }); });
wide.addEventListener('change', () => forms.forEach((f) => f._close?.()));

/* "Check dates" links: open the masthead if it's on screen, otherwise the finale form */
document.querySelectorAll('[data-book]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  const hero = forms[0], fin = forms[forms.length - 1];
  const r = hero.getBoundingClientRect();
  if (r.top < innerHeight - 120 && r.bottom > 0) { hero._open('in'); return; }
  fin.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  setTimeout(() => fin._open('in'), 450);
}));
