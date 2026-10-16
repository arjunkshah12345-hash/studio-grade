import { autoInit, reduced } from './motion.js';

autoInit();

/* Slug lamps: a section's lamp is lit while that segment is on screen (the running order is "on air"). */
const slugs = [...document.querySelectorAll('main section .slug')];
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.querySelector('.slug')?.classList.toggle('is-on', e.isIntersecting);
  }, { rootMargin: '-35% 0px -45% 0px' });
  slugs.forEach((s) => io.observe(s.closest('section')));

  /* The studio lamp in the footer photograph switches on once, when it comes into view. */
  const art = document.querySelector('.foot-art');
  if (art) {
    if (reduced) art.classList.add('is-lit');
    else {
      const lio = new IntersectionObserver(([e]) => { if (e.isIntersecting) { art.classList.add('is-lit'); lio.disconnect(); } }, { threshold: 0.6 });
      lio.observe(art);
    }
  }
}

/* Format call form: honest about being a demo. */
const form = document.getElementById('call-form');
if (form) {
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = form.elements.name, email = form.elements.email;
    let bad = null;
    [name, email].forEach((f) => f.removeAttribute('aria-invalid'));
    if (!name.value.trim()) bad = name;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) bad = email;
    if (bad) {
      bad.setAttribute('aria-invalid', 'true');
      msg.className = 'form-msg is-error';
      msg.textContent = bad === name ? 'Add your name so the producer knows who they’re calling.' : 'That email doesn’t look complete. Check it and try again.';
      bad.focus();
      return;
    }
    msg.className = 'form-msg';
    msg.innerHTML = '<span class="lamp is-lit" aria-hidden="true"></span>';
    msg.append(`Pencilled in, ${name.value.trim().split(' ')[0]}. On Air is fictional, so nothing was sent; a real studio would email you a time.`);
    form.querySelector('button').disabled = true;
  });
}
