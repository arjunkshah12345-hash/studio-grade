/* Leave the Lights · page behaviour: reveals, the sky + HUD, nav theme, the letter form. */
import { autoInit, reduced } from './motion.js';

const root = document.documentElement;
autoInit();

/* ---------------- the sky ---------------- */
const hud = document.getElementById('hud');
const rail = document.getElementById('rail');
const $ = (k) => hud.querySelector(`[data-hud="${k}"]`);
const NAMES = ['', 'Excellent dark-sky site', 'Typical truly dark site', 'Rural sky', 'Rural/suburban transition', 'Suburban sky',
  'Bright suburban sky', 'Suburban/urban transition', 'City sky', 'Inner-city sky'];
const MWTXT = ['', 'to the horizon', 'highly structured', 'dark lanes', 'clear, little detail', 'weak, washed out', 'overhead only', 'barely', 'invisible', 'invisible'];
const set = (el, txt, good) => { if (el.textContent !== txt) el.textContent = txt; if (good !== undefined) el.classList.toggle('is-good', good); };

function paint(s) {
  if (s.covered) { hud.dataset.mode = 'none'; rail.classList.add('is-off'); return; }
  hud.dataset.mode = s.booting ? 'scale' : s.hudMode;
  hud.classList.toggle('is-booting', s.booting);
  rail.classList.toggle('is-off', s.hudMode !== 'scale' || s.booting);
  const n = Math.min(9, Math.max(1, Math.round(s.bEff)));
  set($('n'), String(n));
  set($('name'), NAMES[n]);
  set($('lim'), `mag ${s.lim.toFixed(1)}`, s.lim >= 6.5);
  set($('umi'), `${s.umi} of 7 stars`, s.umi === 7);
  set($('mw'), MWTXT[n], n <= 4);
  set($('m31'), s.lim < 4.75 ? 'hidden' : s.lim < 5.4 ? 'a faint smudge' : s.lim < 6.4 ? 'visible' : 'obvious', s.lim >= 6.4);
  set($('up'), s.shield < .5 ? 'yes' : 'none', s.shield >= .5);
  set($('cct'), s.cct > 3500 ? '4000 K, cold' : '3000 K, warm', s.cct <= 3500);
  set($('dim'), s.dim > .75 ? 'full' : 'dimmed', s.dim <= .75);
  if (s.booting) set($('boot').querySelector('span'), `${s.lampsOn} of ${s.lamps}`);
  else set($('boot').querySelector('span'), '');
  rail.style.setProperty('--r', ((9 - Math.min(9, Math.max(1, s.b))) / 8).toFixed(4));
}

const canvas = document.getElementById('sky');
try {
  const { initSky } = await import('./sky.js');
  if (!canvas.getContext) throw new Error('no canvas');
  root.classList.add('has-sky');
  const api = initSky({ canvas, reduced, onState: paint });
  // the instant the sky is drawn for, in Brekkøy's time zone
  const when = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Oslo' }).format(api.skyInstant());
  document.querySelectorAll('[data-sky-time]').forEach((el) => { el.textContent = when; });
} catch (e) {
  root.classList.remove('has-sky');
  root.classList.add('no-sky');
}

/* ---------------- nav sits on the amber field over the letter ---------------- */
const nav = document.getElementById('nav');
const field = document.getElementById('letter');
const navTheme = () => { const r = field.getBoundingClientRect(); const h = nav.offsetHeight / 2; nav.classList.toggle('on-field', r.top <= h && r.bottom >= h); };
addEventListener('scroll', navTheme, { passive: true }); navTheme();

/* ---------------- the letter ---------------- */
const form = document.getElementById('sign');
const done = document.getElementById('signed');
const msgs = {
  name: (v) => (v.trim().length < 2 ? 'We need your name to put it on the letter.' : ''),
  email: (v) => (!v.trim() ? 'Add an email so we can confirm it’s really you.' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'That email looks off. Check for a typo?'),
  area: (v) => (!v ? 'Pick the neighbourhood closest to you.' : ''),
};
function check(input) {
  const rule = msgs[input.name]; if (!rule) return true;
  const err = rule(input.value); const out = document.getElementById(`e-${input.name}`);
  out.textContent = err;
  if (err) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  return !err;
}
form.querySelectorAll('input,select').forEach((el) => el.addEventListener('blur', () => { if (el.value || el.hasAttribute('aria-invalid')) check(el); }));
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fields = ['name', 'email', 'area'].map((n) => form.elements[n]);
  const bad = fields.filter((f) => !check(f));
  if (bad.length) { bad[0].focus(); return; }
  const data = Object.fromEntries(new FormData(form));
  // PLACEHOLDER: wire the real endpoint here, e.g.
  // await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  done.querySelector('[data-signed-name]').textContent = data.name.trim();
  form.hidden = true; done.hidden = false; done.focus();
});
