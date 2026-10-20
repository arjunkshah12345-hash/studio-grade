import { heroSequence, reveal, reduced } from './motion.js';

heroSequence();   // motion.md §5.10: scene first, h1 word by word, lede, CTAs, the device rises from behind the desk
reveal();

/* nav: hairline once the page moves */
const nav = document.querySelector('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* the one live state: pause the "Asking @dana" shimmer when it is off screen */
const live = document.querySelector('[data-live]');
if (live && 'IntersectionObserver' in window && !reduced) {
  new IntersectionObserver(([e]) => live.classList.toggle('is-paused', !e.isIntersecting)).observe(live);
}

/* sign the book: the visitor's name is written on the ledger's blank page (§82) */
const form = document.querySelector('[data-book]');
const ink = document.querySelector('[data-ink-out]');
const name = form.querySelector('[data-ink]');
const write = () => { ink.textContent = name.value.trim().slice(0, 32); };
name.addEventListener('input', write);
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const mail = form.querySelector('[type=email]');
  if (!name.value.trim()) { name.focus(); return; }
  if (!mail.checkValidity() || !mail.value) { mail.focus(); return; }
  write();
  const ok = form.querySelector('.book-ok');
  ok.hidden = false;
  ok.innerHTML = '<b>Signed, ' + name.value.trim().replace(/[<>&]/g, '') + '.</b> Bulwark is fictional, so nobody will write back. This is where your demo would start.';
});

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* stacked chapters (§85): a panel's content fades once the next panel slides over it */
const chaps = [...document.querySelectorAll('.chap')];
const stackTick = () => {
  if (matchMedia('(max-width:1023px)').matches) { chaps.forEach((c) => c.classList.remove('is-covered')); return; }
  chaps.forEach((c, i) => {
    const next = chaps[i + 1]; if (!next) return;
    c.classList.toggle('is-covered', next.getBoundingClientRect().top < (() => { const r = c.getBoundingClientRect(); return r.top + r.height * 0.9; })());
  });
};
let st = 0;
addEventListener('scroll', () => { if (!st) st = requestAnimationFrame(() => { st = 0; stackTick(); }); }, { passive: true });
addEventListener('resize', stackTick); stackTick();
