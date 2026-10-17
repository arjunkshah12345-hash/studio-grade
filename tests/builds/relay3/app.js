import { reveal, reduced } from './motion.js';

reveal();

// vignettes play their one action once, when they come into view
const play = (sel, cls, margin = '0px 0px -15% 0px') => {
  const els = [...document.querySelectorAll(sel)];
  if (reduced || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add(cls)); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add(cls); io.unobserve(en.target); }
  }, { rootMargin: margin });
  els.forEach((e) => io.observe(e));
};
play('[data-play]', 'is-play');
play('.finale-band', 'is-in', '0px 0px -10% 0px');

// nav gains a ground once it leaves the photo
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-stuck', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
