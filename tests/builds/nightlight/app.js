import { autoInit, reduced } from './motion.js';

/* ---------- The toy box: pick exactly three, no AI call (templates only) ---------- */
const TOYS = [
  { id: 'fox', name: 'Fox', a: 'a small fox', the: 'the fox', trait: 'who could never quite sit still', w: 365, h: 454 },
  { id: 'rocket', name: 'Rocket', a: 'a red rocket', the: 'the rocket', trait: 'who had only ever flown around the garden', w: 323, h: 454 },
  { id: 'teapot', name: 'Teapot', a: 'a mint teapot', the: 'the teapot', trait: 'who was far too sleepy to whistle', w: 408, h: 355 },
  { id: 'moon', name: 'Moon', a: 'the moon', the: 'the moon', trait: 'who had come down early to listen', w: 380, h: 433 },
  { id: 'umbrella', name: 'Umbrella', a: 'a lilac umbrella', the: 'the umbrella', trait: 'who kept the stars dry', w: 405, h: 454 },
  { id: 'dragon', name: 'Dragon', a: 'a little green dragon', the: 'the dragon', trait: 'whose fire was only warm enough for toast', w: 391, h: 449 },
];
const byId = Object.fromEntries(TOYS.map((t) => [t.id, t]));
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const OPENINGS = [
  (A, B, C) => `Once, when the whole house had gone quiet, ${A.a} ${A.trait} found ${B.a} and ${C.a} waiting at the end of the bed.`,
  (A, B, C) => `“Just one small adventure,” whispered ${A.the}. ${cap(B.the)} and ${C.the} agreed, as long as everyone was home by sleepy time.`,
  (A, B, C) => `On the softest night of the year, ${A.a}, ${B.a} and ${C.a} set off to find the place where yawns come from.`,
  (A, B, C) => `${cap(A.a)} ${A.trait} had a plan for tonight, and it needed ${B.a}, ${C.a} and a very quiet voice.`,
  (A, B, C) => `Far past the garden, where the grass turns silver, ${A.a} met ${B.a} who was teaching ${C.the} a lullaby.`,
  (A, B, C) => `Every night, ${A.the} counted the stars. Tonight there was one extra, and ${B.the} and ${C.the} had brought it.`,
];
const PLACES = ['Quiet Hill', 'Silver Garden', 'Sleepy Sea', 'Velvet Sky', 'Long Lane Home', 'Last Lamp'];
const WORDS = { 5: 'about 550 words', 10: 'about 1,100 words', 15: 'about 1,650 words' };

const hash = (ids) => [...ids.join('')].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);
const listNames = (ts) => ts.length === 1 ? ts[0] : `${ts.slice(0, -1).join(', ')} and ${ts.at(-1)}`;

let picks = [];
const box = document.querySelector('#toybox');
const mini = document.querySelector('#minibox');
const live = box.querySelector('[data-live]');
const firstLine = box.querySelector('[data-first-line]');
const tag = firstLine.querySelector('.first-line-tag');
const text = firstLine.querySelector('.first-line-text');
const exampleText = text.textContent;

function toyImg(t, cls = '') {
  return `<img${cls ? ` class="${cls}"` : ''} src="img/toy-${t.id}.webp" alt="" width="${t.w}" height="${t.h}" draggable="false">`;
}
box.querySelector('[data-toys]').innerHTML = TOYS.map((t) =>
  `<button class="toy" type="button" aria-pressed="false" data-toy="${t.id}">${toyImg(t)}<span>${t.name}</span><span class="badge" aria-hidden="true"></span></button>`).join('');
mini.querySelector('[data-toys-mini]').innerHTML = TOYS.map((t) =>
  `<button class="mtoy" type="button" aria-pressed="false" aria-label="${t.name}" data-toy="${t.id}">${toyImg(t)}</button>`).join('');

const say = (msg) => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = msg; }); };

function render() {
  document.querySelectorAll('[data-toy]').forEach((b) => {
    const i = picks.indexOf(b.dataset.toy);
    b.setAttribute('aria-pressed', String(i > -1));
    const badge = b.querySelector('.badge'); if (badge) badge.textContent = i > -1 ? i + 1 : '';
  });
  box.querySelectorAll('.counter-dots i').forEach((d, i) => d.classList.toggle('on', i < picks.length));
  box.querySelector('[data-count]').textContent = `${picks.length} of 3`;
  box.querySelectorAll('[data-slot]').forEach((s, i) => {
    const t = byId[picks[i]];
    s.classList.toggle('filled', !!t);
    s.innerHTML = t ? `${toyImg(t)}${t.name}` : '';
  });
  const left = 3 - picks.length;
  mini.querySelector('[data-count-mini]').textContent = left === 3 ? 'Pick three' : left ? `${listNames(picks.map((p) => byId[p].name))} · ${left} more` : `${listNames(picks.map((p) => byId[p].name))}. Ready.`;
  if (picks.length === 3) {
    const [A, B, C] = picks.map((p) => byId[p]);
    const h = hash(picks);
    stopTyping();
    firstLine.classList.add('is-real');
    tag.textContent = 'First line';
    text.textContent = `“${OPENINGS[h % OPENINGS.length](A, B, C)}”`;
  } else if (firstLine.classList.contains('is-real')) {
    firstLine.classList.remove('is-real');
    tag.textContent = 'For example';
    text.textContent = exampleText;
  }
}

function toggle(id, btn) {
  const t = byId[id];
  const i = picks.indexOf(id);
  if (i > -1) {
    picks.splice(i, 1); render();
    say(`${t.name} put back. ${3 - picks.length} more to pick.`);
    return;
  }
  if (picks.length === 3) {
    btn.classList.remove('nope'); void btn.offsetWidth; btn.classList.add('nope');
    say(`That’s three already. Put one back to swap in the ${t.name.toLowerCase()}.`);
    return;
  }
  picks.push(id); render();
  if (picks.length < 3) say(`${t.name} picked. ${3 - picks.length} more to go.`);
  else say(`Three picked: ${listNames(picks.map((p) => byId[p].a))}. ${text.textContent}`);
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-toy]'); if (b) toggle(b.dataset.toy, b);
});

/* length note */
box.querySelectorAll('input[name="length"]').forEach((r) => r.addEventListener('change', () => {
  box.querySelector('[data-length-note]').textContent = WORDS[r.value];
}));
const minutes = () => box.querySelector('input[name="length"]:checked').value;

/* submit: honest result, no fake generation */
function submit(e, focusIn) {
  e.preventDefault();
  if (picks.length < 3) {
    const n = 3 - picks.length;
    say(`Pick ${n} more ${n === 1 ? 'thing' : 'things'} to make tonight’s story.`);
    const next = focusIn.querySelector('[data-toy][aria-pressed="false"]'); next?.focus();
    return;
  }
  const [A, B, C] = picks.map((p) => byId[p]);
  const title = `The ${A.name}, the ${B.name} and the ${PLACES[hash(picks) % PLACES.length]}`;
  stopTyping();
  firstLine.classList.add('is-real');
  tag.textContent = 'Saved for tonight';
  text.innerHTML = `“${title}” · ${minutes()} min, ending asleep. <a href="#pricing">Start free to hear the whole story in your voice</a>`;
  say(`Saved for tonight: ${title}, ${minutes()} minutes. Start free to hear the whole story.`);
  if (focusIn !== box) box.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
}
box.addEventListener('submit', (e) => submit(e, box));
mini.addEventListener('submit', (e) => submit(e, mini));

/* nav / pricing CTAs land on the toy box and focus the first free toy */
document.querySelectorAll('[data-focus-toybox]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  box.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  setTimeout(() => box.querySelector('[data-toy][aria-pressed="false"]')?.focus({ preventScroll: true }), reduced ? 0 : 450);
}));

/* typed example placeholder: runs once */
let typingTimer = null;
function stopTyping() { clearTimeout(typingTimer); typingTimer = null; text.querySelector('.caret')?.remove(); }
if (!reduced) {
  let i = 0;
  text.textContent = '';
  const caret = document.createElement('i'); caret.className = 'caret'; caret.setAttribute('aria-hidden', 'true');
  const step = () => {
    if (picks.length === 3) return;
    text.textContent = exampleText.slice(0, ++i); text.append(caret);
    if (i < exampleText.length) typingTimer = setTimeout(step, 22 + Math.random() * 30);
    else typingTimer = setTimeout(() => caret.remove(), 4000);
  };
  typingTimer = setTimeout(step, 700);
}

render();

/* footer: local time, a small bedtime note */
const bed = document.querySelector('[data-bedtime]');
if (bed) {
  const d = new Date(); const h = d.getHours();
  const t = d.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(' ', ' ');
  const note = h < 17 ? 'Bedtime is a while off. The toy box will wait.'
    : h < 21 ? 'Just right for a ten-minute story.'
    : 'Late one? The five-minute story is very short.';
  bed.textContent = `It’s ${t} where you are. ${note}`;
}

autoInit();
