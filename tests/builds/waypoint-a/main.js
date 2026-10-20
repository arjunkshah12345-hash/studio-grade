import { autoInit, reduced } from './motion.js';

autoInit();

/* Nav hairline once the page moves */
const nav = document.querySelector('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Hero course: draws once the hero sequence has settled (motion.md §5.10, then the overprint) */
const heroRoot = document.querySelector('[data-seq-root]');
const heroCourse = document.querySelector('.course--hero');
if (heroCourse) {
  [...heroCourse.children].forEach((el, i) => el.style.setProperty('--d', i));
  const end = reduced ? 0 : Number(heroRoot?.dataset.seqEnd || 0) + 150;
  setTimeout(() => heroCourse.classList.add('is-drawn'), end);
}

/* Courses below the fold draw once, when they come into view */
const drawOnView = (els) => {
  if (reduced || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-drawn')); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-drawn'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -25% 0px' });
  els.forEach((e) => io.observe(e));
};
const fin = document.querySelector('.course--fin');
if (fin) [...fin.children].forEach((el, i) => el.style.setProperty('--d', i));
drawOnView([...document.querySelectorAll('.course--week, .course--fin')]);

/* Week sheet ↔ control circles */
const week = document.querySelector('.course--week');
document.querySelectorAll('.sheet tr[data-row]').forEach((tr) => {
  const ctl = week?.querySelector(`[data-ctl="${tr.dataset.row}"]`);
  const on = () => { tr.classList.add('is-hot'); ctl?.classList.add('is-hot'); };
  const off = () => { tr.classList.remove('is-hot'); ctl?.classList.remove('is-hot'); };
  tr.addEventListener('mouseenter', on); tr.addEventListener('mouseleave', off);
});

/* Chapter A: the answer is "read" once, then appears */
const stream = document.querySelector('[data-stream]');
if (stream && !reduced && 'IntersectionObserver' in window) {
  stream.classList.add('is-reading');
  const io = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { io.disconnect(); setTimeout(() => stream.classList.remove('is-reading'), 900); }
  }, { rootMargin: '0px 0px -30% 0px' });
  io.observe(stream);
}

/* Slack / Teams chrome toggle */
const chanLabel = document.querySelector('[data-chrome-label]');
document.querySelectorAll('[data-chrome]').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('[data-chrome]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  chanLabel.textContent = b.dataset.label;
}));

/* Pricing: one control circle per engineer (§83), n × USD 20 */
const range = document.getElementById('eng');
const dots = document.querySelector('[data-dots]');
const total = document.querySelector('[data-total]');
if (range && dots && total) {
  const max = Number(range.max);
  for (let i = 0; i < max; i++) dots.appendChild(document.createElement('i'));
  const fmt = new Intl.NumberFormat('en-US');
  const set = () => {
    const n = Number(range.value);
    [...dots.children].forEach((d, i) => { d.hidden = i >= n; });
    total.innerHTML = `<span class="num">${n}</span> ${n === 1 ? 'engineer' : 'engineers'} × USD 20 = <b class="num">USD ${fmt.format(n * 20)}</b> a month`;
    range.setAttribute('aria-valuetext', `${n} engineers, USD ${fmt.format(n * 20)} a month`);
  };
  range.addEventListener('input', set); set();
}
