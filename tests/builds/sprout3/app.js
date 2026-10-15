import { autoInit, reduced } from './motion.js';

autoInit();

/* Hero: the two plants message you, once, after the page has painted. Text never moves. */
const heroBubbles = [...document.querySelectorAll('.bubble--hero')];
heroBubbles.forEach((b, i) => setTimeout(() => b.classList.add('is-in'), reduced ? 0 : 700 + i * 650));

/* Bubbles elsewhere and the shelf pop in when they enter the viewport. */
const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add('is-in');
  io.unobserve(e.target);
}), { rootMargin: '0px 0px -15% 0px' });
document.querySelectorAll('[data-pop], .shelf-row').forEach((el) => io.observe(el));
document.querySelectorAll('.shelf-row li').forEach((li, i) => li.style.setProperty('--i', i));

/* The cast: tap a plant and it talks. */
const say = document.getElementById('say');
const sayName = say.querySelector('.say-name');
const sayLine = say.querySelector('.say-line');
const plants = [...document.querySelectorAll('.plant')];
plants.forEach((btn) => btn.addEventListener('click', () => {
  plants.forEach((p) => p.setAttribute('aria-pressed', String(p === btn)));
  sayName.textContent = btn.dataset.name;
  sayLine.textContent = btn.dataset.line;
  if (!reduced) {
    sayLine.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
    btn.querySelector('img').animate(
      [{ rotate: '0deg' }, { rotate: '-4deg' }, { rotate: '3deg' }, { rotate: '-1.5deg' }, { rotate: '0deg' }],
      { duration: 620, easing: 'ease-out' });
  }
}));
