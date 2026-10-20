import { reveal, reduced } from './motion.js';

reveal();

/* Nav hairline once the page moves */
const nav = document.querySelector('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Hero: the first-week route draws once, like ink going down */
const heroMap = document.querySelector('[data-hero-map]');
requestAnimationFrame(() => requestAnimationFrame(() => heroMap.classList.add('is-drawn')));

/* Second look: hover a region and its owner's hut wakes up */
heroMap.querySelectorAll('.m-region').forEach((r) => {
  const key = r.dataset.region;
  const hut = heroMap.querySelector(`.m-hut[data-for="${key}"]`);
  r.addEventListener('pointerenter', () => { r.classList.add('is-lit'); hut?.classList.add('is-lit'); });
  r.addEventListener('pointerleave', () => { r.classList.remove('is-lit'); hut?.classList.remove('is-lit'); });
});

/* Route card: stations appear in walking order when the card arrives */
const journey = document.querySelector('.journey');
if (journey) {
  if (reduced || !('IntersectionObserver' in window)) journey.classList.add('is-in');
  else new IntersectionObserver((es, io) => es.forEach((e) => {
    if (e.isIntersecting) { journey.classList.add('is-in'); io.disconnect(); }
  }), { rootMargin: '0px 0px -25% 0px' }).observe(journey);
}

/* PLAY: ask the map */
const ANSWERS = {
  refunds: {
    q: 'Where do failed refunds get retried?',
    a: 'On the job queue. A failed refund is put back on the queue and retried, and Payments is paged if it keeps failing.',
    file: 'services/payments/refunds/retry.ts:88–104', pr: '#4127', prt: 'Move refund retries onto the job queue', owner: '@dana · Payments',
  },
  signin: {
    q: 'Who owns sign-in?',
    a: 'Identity does. @ines wrote or reviewed most of this year’s changes to the session code, so start with her.',
    file: 'services/auth/session/login.ts:41–77', pr: '#3982', prt: 'Fall back to SSO when a session expires', owner: '@ines · Identity',
  },
  queues: {
    q: 'Why are there two job queues?',
    a: 'Slow exports were moved onto their own queue so they stop holding up refunds. The decision is written up in a design record.',
    file: 'docs/adr/0031-second-queue.md:5–19', pr: '#3790', prt: 'Split slow exports onto their own queue', owner: '@kofi · Platform',
  },
};
const WHERE = { slack: '#onboarding', teams: 'Onboarding · General' };

const ask = document.querySelector('[data-ask]');
if (ask) {
  const chat = ask.querySelector('[data-chat]');
  const set = (sel, v) => { chat.querySelector(sel).textContent = v; };
  const draw = (key, animate) => {
    const g = ask.querySelector(`[data-route="${key}"]`);
    const path = g.querySelector('.route'); const pin = g.querySelector('.ask-pin');
    if (!animate || reduced) { path.style.transition = 'none'; path.style.setProperty('--off', 0); pin.style.setProperty('--pin', 1); return; }
    path.style.transition = 'none'; path.style.setProperty('--off', 1); pin.style.setProperty('--pin', 0);
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 1.1s linear';
    path.style.setProperty('--off', 0);
    setTimeout(() => pin.style.setProperty('--pin', 1), 950);
  };
  const choose = (key, animate = true) => {
    ask.dataset.q = key;
    const d = ANSWERS[key];
    const swap = () => {
      set('[data-ask-q]', d.q); set('[data-ask-a]', d.a); chat.querySelector('[data-ask-file]').innerHTML = d.file.replaceAll('/', '/<wbr>');
      set('[data-ask-pr]', d.pr); set('[data-ask-prt]', d.prt); set('[data-ask-owner]', d.owner);
      chat.classList.remove('is-swapping');
    };
    if (animate && !reduced) { chat.classList.add('is-swapping'); setTimeout(swap, 700); } else swap();
    draw(key, animate);
  };
  ask.querySelectorAll('input[name="q"]').forEach((i) => i.addEventListener('change', () => choose(i.value)));

  ask.querySelectorAll('[data-app-btn]').forEach((b) => b.addEventListener('click', () => {
    const app = b.dataset.appBtn;
    ask.dataset.app = app;
    ask.querySelectorAll('[data-app-btn]').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    chat.querySelector('[data-where]').textContent = WHERE[app];
  }));

  /* The first question plays once when the map comes into view */
  if (reduced || !('IntersectionObserver' in window)) draw('refunds', false);
  else {
    const first = ask.querySelector('[data-route="refunds"]');
    first.querySelector('.route').style.setProperty('--off', 1);
    first.querySelector('.ask-pin').style.setProperty('--pin', 0);
    new IntersectionObserver((es, io) => es.forEach((e) => {
      if (e.isIntersecting) { draw(ask.dataset.q, true); io.disconnect(); }
    }), { rootMargin: '0px 0px -30% 0px' }).observe(ask.querySelector('.crop--ask'));
  }
}
