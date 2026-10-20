import { autoInit, reduced } from './motion.js';

autoInit();   // runs the hero load sequence (§5.10) and the [data-reveal] groups

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* nav hairline once the page moves */
const nav = $('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* one picker, three places: hero, dock, finale share their state (§75, §86) */
const forms = $$('[data-pick]');
const trackerKey = { 'Linear': 'linear', 'GitHub Issues': 'github', 'Jira': 'jira' };
const sync = (field, value, from) => {
  $$(`select[data-field="${field}"]`).forEach((s) => { if (s !== from) s.value = value; });
  if (field === 'to') {   // the visitor's tracker follows them down the page: the draft and the opened issue use it
    $$('[data-tracker-name]').forEach((n) => { n.textContent = value; });
    $(`[data-tracker="${trackerKey[value]}"]`)?.click();
  }
};
forms.forEach((f) => {
  f.addEventListener('change', (e) => { const s = e.target.closest('select'); if (s) sync(s.dataset.field, s.value, s); });
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = f.querySelector('[data-field="from"]').value, to = f.querySelector('[data-field="to"]').value;
    const msg = `Sift is a fictional product, so nothing connects. In a real setup you'd sign in to ${from} next, then ${to}.`;
    $$('[data-pick-note]').forEach((n) => { n.textContent = msg; n.classList.add('is-msg'); });
    const note = f.closest('.hero-side, .fin-text')?.querySelector('[data-pick-note]') || $('#start [data-pick-note]');
    if (f.matches('[data-dock]')) note.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
  });
});

/* the dock: away while the hero picker or the finale picker is on screen, and over the footer */
const dock = $('[data-dock]'), heroPick = $('#pick-hero'), finPick = $('#pick-fin'), foot = $('.foot');
let dq = 0;
const dockUpdate = () => {
  dq = 0;
  if (dock.contains(document.activeElement)) return;
  const h = heroPick.getBoundingClientRect(), f = finPick.getBoundingClientRect(), ft = foot.getBoundingClientRect();
  const away = h.bottom > 0 || (f.top < innerHeight && f.bottom > 0) || ft.top < innerHeight;
  dock.classList.toggle('is-away', away);
  dock.inert = away;
};
addEventListener('scroll', () => { if (!dq) dq = requestAnimationFrame(dockUpdate); }, { passive: true });
addEventListener('resize', dockUpdate); dockUpdate();

/* vignettes play their one action once (directions.md §11) */
const count = (el) => {
  const to = +el.dataset.count; if (reduced) { el.textContent = to; return; }
  const t0 = performance.now(), d = 900;
  const step = (t) => { const p = Math.min(1, (t - t0) / d); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
  el.textContent = 0; requestAnimationFrame(step);
};
const play = {
  pile: (v) => { v.classList.add('play'); setTimeout(() => v.classList.add('is-sorted'), reduced ? 0 : 1300); },
  group: (v) => { v.classList.add('play'); $$('[data-count]', v).forEach(count); },
  draft: (v) => {
    v.classList.add('play'); if (reduced) return done(v);
    setTimeout(() => v.classList.add('pressed'), 1400);
    setTimeout(() => { v.classList.remove('pressed'); done(v); }, 1650);
  },
  issue: (v) => v.classList.add('play'),
};
function done(v) {
  v.classList.add('done');
  $('[data-state]', v).textContent = `Confirmed · opening in ${$('[data-tracker-name]', v).textContent}`;
  $('[data-who]', v).textContent = 'Maya said yes';
}
const vio = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  play[e.target.dataset.vignette]?.(e.target); vio.unobserve(e.target);
}), { rootMargin: '0px 0px -20% 0px' });
$$('[data-vignette]').forEach((v) => vio.observe(v));

/* tracker switch on the opened issue */
const looks = {
  linear: { id: 'WEB-312', state: 'Todo', name: 'Linear' },
  github: { id: '#1287', state: 'Open', name: 'GitHub Issues' },
  jira: { id: 'SUP-88', state: 'To do', name: 'Jira' },
};
const issue = $('.issue');
$$('[data-tracker]').forEach((b) => b.addEventListener('click', () => {
  const k = b.dataset.tracker, l = looks[k];
  $$('[data-tracker]').forEach((x) => x.setAttribute('aria-pressed', x === b));
  issue.dataset.issue = k;
  $('[data-issue-id]', issue).textContent = l.id;
  $('[data-issue-state]', issue).textContent = l.state;
  $$('[data-tracker-name]').forEach((n) => { n.textContent = l.name; });
  if (!$('[data-vignette="draft"]').classList.contains('done')) return;
  $('[data-state]').textContent = `Confirmed · opening in ${l.name}`;
}));

/* the example week: one slip per ticket (§83) */
$$('[data-slips]').forEach((row) => {
  const n = +row.dataset.slips;
  for (let j = 0; j < n; j++) {
    const i = document.createElement('i');
    i.style.setProperty('--j', j);
    i.style.setProperty('--rr', `${((j * 37) % 9) - 4}deg`);
    row.append(i);
  }
});
const week = $('.week-board');
new IntersectionObserver(([e], o) => { if (e.isIntersecting) { week.classList.add('is-in'); o.disconnect(); } }, { rootMargin: '0px 0px -15% 0px' }).observe(week);

/* stacked chapters (§85): an earlier panel's content recedes as the next panel slides over it */
const chaps = $$('.chap');
let sq = 0;
const stackUpdate = () => {
  sq = 0;
  chaps.forEach((c, i) => {
    const next = chaps[i + 1];
    if (!next || getComputedStyle(c).position !== 'sticky') { c.style.removeProperty('--cover'); return; }
    // fade only over the last 160px before the next panel's content reaches this panel's content
    const bottom = Math.max(...[...c.children].map((x) => x.getBoundingClientRect().bottom));
    const top = Math.min(...[...next.children].map((x) => x.getBoundingClientRect().top));
    const o = Math.min(1, Math.max(0, (top - bottom) / 160));
    c.style.setProperty('--cover', o.toFixed(3));
  });
};
addEventListener('scroll', () => { if (!sq) sq = requestAnimationFrame(stackUpdate); }, { passive: true });
addEventListener('resize', stackUpdate); stackUpdate();
