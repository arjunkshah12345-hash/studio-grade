import { autoInit, reduced } from './motion.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const usd = (n, d = 2) => 'USD ' + n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const usdNeg = (n) => '−' + usd(n);

/* ---------------------------------------------------------------- the meter drum */
function digitsOf(value, pad, dec) {
  let s = String(Math.max(0, Math.round(value)));
  if (s.length < pad) s = s.padStart(pad, '0');
  return { s, dec };
}
function buildMeter(el, value) {
  const pad = +(el.dataset.pad || String(Math.round(value)).length);
  const dec = +(el.dataset.dec || 0);
  const { s } = digitsOf(value, pad, dec);
  el.textContent = '';
  const intLen = s.length - dec;
  const drums = [];
  [...s].forEach((ch, i) => {
    if (i > 0 && i < intLen && (intLen - i) % 3 === 0) { const c = document.createElement('span'); c.className = 'msep'; c.textContent = ','; el.append(c); }
    if (dec && i === intLen) { const c = document.createElement('span'); c.className = 'msep'; c.textContent = '.'; el.append(c); }
    const d = document.createElement('span'); d.className = 'drum';
    const strip = document.createElement('span'); strip.className = 'strip no-t';
    for (let k = 0; k < 20; k++) { const n = document.createElement('span'); n.textContent = k % 10; strip.append(n); }
    d.append(strip); el.append(d); drums.push({ d, strip, cur: +ch });
    strip.style.setProperty('--p', +ch);
  });
  drums[drums.length - 1].d.classList.add('drum--last');
  el._drums = drums; el._pad = pad;
  requestAnimationFrame(() => drums.forEach((x) => x.strip.classList.remove('no-t')));
  markLead(el, s);
  return el;
}
function markLead(el, s) {
  let lead = true;
  el._drums.forEach((x, i) => { if (s[i] !== '0' || i >= s.length - 1 - (+(el.dataset.dec || 0))) lead = false; x.d.classList.toggle('is-lead', lead); });
}
function setMeter(el, value) {
  const { s } = digitsOf(value, el._pad, 0);
  const str = s.slice(-el._drums.length).padStart(el._drums.length, '0');
  el._drums.forEach((x, i) => {
    const b = +str[i]; const a = x.cur;
    if (a === b) return;
    x.cur = b;
    if (reduced) { x.strip.classList.add('no-t'); x.strip.style.setProperty('--p', b); return; }
    if (b > a) { x.strip.style.setProperty('--p', b); return; }
    x.strip.style.setProperty('--p', b + 10);
    const done = () => { x.strip.classList.add('no-t'); x.strip.style.setProperty('--p', x.cur); void x.strip.offsetHeight; x.strip.classList.remove('no-t'); };
    x.strip.addEventListener('transitionend', done, { once: true });
  });
  markLead(el, str);
}

$$('[data-meter]').forEach((el) => buildMeter(el, +el.dataset.meter));

/* ---------------------------------------------------------------- hero: live example meter */
{
  const meter = $('#hero-meter'), total = $('#hero-total'), list = $('#hero-events'), btn = $('#hero-pause');
  let tokens = 48213906, paused = false, onScreen = true, timer = null;
  const seed = [744, 1630, 212, 3388, 905, 1477, 560, 2210, 131, 1204, 386, 2951];
  let k = 0, sec = 9;
  const tick = () => {
    const add = seed[k++ % seed.length];
    tokens += add; sec += 1 + (k % 2);
    setMeter(meter, tokens);
    total.textContent = usd(tokens / 1e6 * 2.5);
    const li = document.createElement('li');
    const mm = String(2 + Math.floor(sec / 60)).padStart(2, '0'), ss = String(sec % 60).padStart(2, '0');
    li.innerHTML = `<time>14:${mm}:${ss}</time><code>POST /v1/events</code><span>tokens <b>+${add.toLocaleString('en-US')}</b></span><span class="ev-c">cus_8812</span>`;
    list.prepend(li);
    while (list.children.length > 3) list.lastElementChild.remove();
  };
  const run = () => { clearInterval(timer); timer = null; if (!paused && onScreen && !document.hidden) timer = setInterval(tick, 1600); };
  if (reduced) { btn.hidden = true; }
  else {
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; run(); }).observe(meter);
    document.addEventListener('visibilitychange', run);
    btn.addEventListener('click', () => {
      paused = !paused; btn.setAttribute('aria-pressed', paused); btn.setAttribute('aria-label', paused ? 'Play the example meter' : 'Pause the example meter');
      btn.querySelector('.pz-t').textContent = paused ? 'Play' : 'Pause'; run();
    });
    run();
  }
}

/* ---------------------------------------------------------------- cabinet meters roll up once */
{
  const cabs = $$('.cab .meter');
  cabs.forEach((m) => { m._target = +m.dataset.meter; setMeter(m, 0); });
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    setTimeout(() => setMeter(e.target, e.target._target), 250);
  }), { rootMargin: '0px 0px -15% 0px' });
  cabs.forEach((m) => io.observe(m));
}

/* ---------------------------------------------------------------- equation: plan switch recomputes the invoice */
{
  const usage = { tok: 48213906, req: 1920446, seat: 14, gpu: 31250.4 };
  const plans = {
    scale: { name: 'Scale · v14', tok: 2.5, req: 0.04, seat: 20, gpu: 0.0011 },
    starter: { name: 'Starter · v9', tok: 3, req: 0.05, seat: 25, gpu: 0.0014 },
  };
  const rateTxt = {
    tok: (r) => `${usd(r)} <small>/ 1M</small>`, req: (r) => `${usd(r)} <small>/ 1k</small>`,
    seat: (r) => `${usd(r)} <small>/ seat</small>`, gpu: (r) => `${usd(r, 4)} <small>/ s</small>`,
  };
  const r2 = (n) => Math.round(n * 100) / 100;
  const apply = (key, flash) => {
    const p = plans[key];
    $('[data-plan-name]').textContent = p.name;
    const lines = { tok: r2(usage.tok / 1e6 * p.tok), req: r2(usage.req / 1e3 * p.req), seat: r2(usage.seat * p.seat), gpu: r2(usage.gpu * p.gpu) };
    lines.total = r2(lines.tok + lines.req + lines.seat + lines.gpu);
    Object.keys(rateTxt).forEach((u) => { $(`[data-rate="${u}"]`).innerHTML = rateTxt[u](p[u]); });
    Object.entries(lines).forEach(([u, v]) => {
      const b = $(`[data-line="${u}"]`); b.textContent = usd(v);
      if (flash && !reduced) { b.classList.remove('is-flash'); void b.offsetWidth; b.classList.add('is-flash'); }
    });
    if (flash && !reduced) $$('[data-rate]').forEach((b) => { b.classList.remove('is-flash'); void b.offsetWidth; b.classList.add('is-flash'); });
    $('#ratecard').setAttribute('aria-label', `Example rate card, ${p.name}: ${usd(p.tok)} per million tokens, ${usd(p.req)} per thousand requests, ${usd(p.seat)} per seat and ${usd(p.gpu, 4)} per GPU-second.`);
    $('#eq-invoice').setAttribute('aria-label', `Example invoice for Acme Labs on the ${key} plan: tokens ${usd(lines.tok)}, requests ${usd(lines.req)}, seats ${usd(lines.seat)}, GPU-seconds ${usd(lines.gpu)}, total due ${usd(lines.total)}, sent through Stripe.`);
  };
  $$('.seg-b').forEach((b) => b.addEventListener('click', () => {
    $$('.seg-b').forEach((x) => x.setAttribute('aria-pressed', x === b)); apply(b.dataset.plan, true);
  }));
  apply('scale', false);
  const row = $('.eq-row');
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); setTimeout(() => row.classList.add('is-paid'), reduced ? 0 : 1400); } }, { rootMargin: '0px 0px -25% 0px' });
  io.observe(row);
}

/* ---------------------------------------------------------------- dashboard chart (example data) */
{
  const chart = $('#chart');
  const units = ['tok', 'req', 'seat', 'gpu'];
  const col = { tok: 'var(--u-tok)', req: 'var(--u-req)', seat: 'var(--u-seat)', gpu: 'var(--u-gpu)' };
  // deterministic example series: weekday rhythm, slight growth
  const rnd = (i, s) => (Math.sin(i * 12.9898 + s * 78.233) * 43758.5453) % 1;
  for (let d = 1; d <= 19; d++) {
    const wk = [0, 6].includes((d + 2) % 7) ? 0.55 : 1;
    const v = {
      tok: (5.2 + d * 0.12 + Math.abs(rnd(d, 1)) * 1.6) * wk,
      req: (3.2 + Math.abs(rnd(d, 2)) * 1.2) * wk,
      seat: 1.6,
      gpu: (1.2 + Math.abs(rnd(d, 3)) * 2.4) * wk,
    };
    const c = document.createElement('div'); c.className = 'col'; c.style.setProperty('--i', d);
    units.forEach((u) => { const s = document.createElement('i'); s.style.cssText = `--u:${col[u]};height:${v[u] * 6.4}%`; c.append(s); });
    const lab = document.createElement('span'); lab.textContent = d; c.append(lab);
    if (d === 19) c.classList.add('is-today');
    chart.append(c);
  }
}

/* ---------------------------------------------------------------- API tabs + copy */
{
  const tabs = $$('[role="tab"]');
  const select = (t) => {
    tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; select(n); n.focus();
    });
  });
  const copy = $('#copy');
  copy.addEventListener('click', async () => {
    const pane = $$('.pane').find((p) => !p.hidden);
    try { await navigator.clipboard.writeText(pane.innerText); copy.textContent = 'Copied'; } catch { copy.textContent = 'Select and copy'; }
    setTimeout(() => { copy.textContent = 'Copy'; }, 1200);
  });
}

/* ---------------------------------------------------------------- pricing calculator: one graduation per USD 10,000 */
{
  const range = $('#usage'), meter = $('#calc-meter'), grad = $('#grad');
  const N = 100;
  for (let i = 0; i < N; i++) grad.append(document.createElement('i'));
  const ticks = [...grad.children];
  const q = (k) => $(`[data-q="${k}"]`);
  const update = () => {
    const u = +range.value;
    const free = Math.min(u, 10000), base = Math.max(0, u - 10000), fee = Math.round(base * 0.005 * 100) / 100;
    setMeter(meter, u);
    range.style.setProperty('--fill', (u / +range.max * 100) + '%');
    range.setAttribute('aria-valuetext', usd(u, 0));
    const n = Math.ceil(u / 10000);
    ticks.forEach((t, i) => { t.classList.toggle('free', i === 0); t.classList.toggle('on', i > 0 && i < n); });
    q('usage').textContent = usd(u);
    q('free').textContent = free ? usdNeg(free) : usd(0);
    q('base').textContent = usd(base);
    q('fee').textContent = usd(fee);
    q('keep').textContent = usd(u - fee);
    q('rate').textContent = u ? (fee / u * 100).toFixed(2) + '%' : '0.00%';
  };
  range.addEventListener('input', update);
  update();
}

/* ---------------------------------------------------------------- finale: the meter's first token */
{
  const m = $('#fin-meter');
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); setTimeout(() => setMeter(m, 1), reduced ? 0 : 700); } }, { rootMargin: '0px 0px -20% 0px' });
  io.observe(m);
}

/* ---------------------------------------------------------------- nav hairline on scroll */
{
  const nav = $('.nav');
  const on = () => nav.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', on, { passive: true }); on();
}

autoInit();
