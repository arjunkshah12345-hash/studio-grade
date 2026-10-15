import { autoInit, reduced } from './motion.js';

autoInit();

/* Media and vignettes: media fades in once; each vignette plays its one action once on view. */
const onView = (els, fn, rootMargin = '0px 0px -12% 0px') => {
  if (reduced || !('IntersectionObserver' in window)) { els.forEach((e) => fn(e, true)); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { fn(en.target, false); io.unobserve(en.target); }
  }, { rootMargin });
  els.forEach((e) => io.observe(e));
};

onView([...document.querySelectorAll('[data-media]')], (el) => el.classList.add('is-in'), '0px 0px -6% 0px');
onView([...document.querySelectorAll('[data-play]')], (el, still) => el.classList.add(still ? 'no-play' : 'is-played'), '0px 0px -20% 0px');

/* Pricing: one coin per paid contractor, USD 12 each. */
const range = document.querySelector('#calc-n');
if (range) {
  const out = document.querySelector('#calc-n-out');
  const coins = document.querySelector('.calc-coins');
  const sum = document.querySelector('.calc-sum');
  const math = document.querySelector('.calc-math');
  const fmt = new Intl.NumberFormat('en-US');
  let shown = 0;
  const render = () => {
    const n = Number(range.value);
    out.textContent = n;
    sum.textContent = `USD ${fmt.format(n * 12)}`;
    math.textContent = n === 0 ? 'nobody paid, nothing billed' : `${n} × USD 12`;
    if (n === 0) { coins.innerHTML = '<span class="none">No coins this month.</span>'; shown = 0; return; }
    if (shown === 0) coins.textContent = '';
    while (shown < n) { const c = document.createElement('i'); c.className = 'coin'; coins.append(c); shown++; }
    while (shown > n) { coins.lastElementChild.remove(); shown--; }
  };
  range.addEventListener('input', render);
  render();
}
