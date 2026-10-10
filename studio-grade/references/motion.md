# Motion: tokens, primitives, policy

On every award winner, juries scored Animations/Transitions as the highest dev sub-score (7.4–9.6). The motion behind those scores is **specific and quiet**: one house ease, short UI timings, reveals that *focus* rather than travel, and overshoot only on tiny elements.

## 1. Easing tokens (frequency across 98 sites)

```css
:root{
  --ease-out:       cubic-bezier(.16,1,.3,1);     /* THE house ease: Linear, Vercel, Raycast, Ramp ×37, Anthropic, OpenAI */
  --ease-out-quint: cubic-bezier(.22,1,.36,1);    /* Factory ×26, Cursor, Resend, Dia, Atlas */
  --ease-out-expo:  cubic-bezier(.19,1,.22,1);    /* editorial reveals: David Whyte ×83, Floema ×70, Lando, Terminal */
  --ease-out-q2:    cubic-bezier(.23,1,.32,1);    /* Raycast, Mintlify, Daylight, Miu Miu ×37 */
  --ease-sheet:     cubic-bezier(.32,.72,0,1);    /* iOS sheet: Linear, Vercel, Attio drawers */
  --ease-ui:        cubic-bezier(.4,0,.2,1);      /* Material standard for micro-UI: Vercel, Resend ×136 */
  --ease-inout:     cubic-bezier(.76,0,.24,1);    /* panels, wipes, page transitions: Atlas, Symphony, ERA */
  --ease-inout-q:   cubic-bezier(.77,0,.175,1);   /* Dia, David Whyte, Populous */
  --ease-hard:      cubic-bezier(1,0,0,1);        /* Exo Ape UI: snappy expo in-out at .3–.5s */
  --ease-museum:    cubic-bezier(.59,.01,.28,1);  /* AREA 17 house ease: slow-in, long settle */
  --ease-calm:      cubic-bezier(.104,.204,.492,1); /* Garden Eight (Tokyo) ×140: the Japanese calm */
  --ease-osmo:      cubic-bezier(.625,.05,0,1);   /* Radian UI slides */
  --ease-pop:       cubic-bezier(.34,1.56,.64,1); /* small pops ONLY (≤ 64px elements) */
}
```
**Pick ONE house ease** (usually `--ease-out` or `--ease-out-expo`) and one in-out for panels. AlphaSense standardized `cubic-bezier(.25,0,0,1)` at 0.32s across 88 rules. A single house curve is itself a signature.

GSAP equivalents: `power2.out` (most common entrance), `power3.out`, `power4.out`, `expo.out`; `power2.inOut` / `expo.inOut` for scenes; `back.out(2)` only for small pops; `"none"`/`linear` for scrubbed timelines and anything that represents time.

## 2. Durations

| Use | Range | Notes |
|---|---|---|
| Hover / press / toggle | **120–200ms** (luxury 200–400) | Linear 0.12–0.2s; Vercel 150–200 |
| Menus, drawers, tabs | 250–400ms | AlphaSense 320ms house |
| Reveals (text, images) | **600–1000ms** (0.8s is the single most common) | Populous 0.9s ×293 |
| Section / page transitions | 1.0–1.5s | BOSS 1.5s, Terminal expo.inOut 1.2s |
| Hero staged entrance (total) | 1.2–3s | Factory ~2–3s; Linear ~1.2s |
| Ambient loops | 1.6–3.2s (UI shimmers), 9–60s (drifts) | Linear dot grid 1.6/2.8/3.2s; Floema leaf drift 60s |
| Marquees | 32–120s | Ramp 120s, Anthropic 48s |
| Two-speed systems | e.g. **0.34s UI + 0.89s reveal** | Lucas Museum |

## 3. Staggers

- Characters: **0.015–0.035s** (Lando 0.015–0.03; Hubtown 0.033 ≈ 1/30s).
- Words: 0.03–0.06s. Lines: 0.08–0.15s. Items/cards: 0.05–0.1s.
- **Direction variants are the craft signal:** `from:"end"`, `from:"center"`, `from:"edges"`, `from:"random"` (Exo Ape, ANAI, Bennett & Clive). Random-order staggers on grids feel organic rather than templated.

## 4. Springs (Framer Motion / Motion One)

| Feel | Config | Seen |
|---|---|---|
| Snappy UI | `{type:"spring", stiffness:500, damping:25}` | Raycast, Resend, Dia, Mintlify, Fondation Cartier |
| Firm UI | `{stiffness:400, damping:25–28}` | Stripe, BFL |
| Heavy, expensive, no overshoot | `{mass:4, stiffness:800, damping:80}` | Family hero |
| Soft layout | `{stiffness:100–150, damping:20–30}` | Apple, Steve Jobs Archive, Cartier 365 |
| Gentle settle | `{duration:1.1, bounce:.15}` | Steve Jobs Archive |
| Bouncy chips (tiny only) | `{stiffness:100, damping:8–10}` | Apple chips |

## 5. Reveal primitives (ranked by how often top studios use them)

### 5.1 Blur-to-sharp (the #1 primitive in immersive, editorial and tech heroes)
```css
[data-reveal]{opacity:0;filter:blur(8px);transform:translateY(10px)}
[data-reveal].is-in{opacity:1;filter:blur(0);transform:none;
  transition:opacity .8s var(--ease-out),filter .8s var(--ease-out),transform .8s var(--ease-out);
  transition-delay:calc(var(--i,0) * 90ms)}
```
**Tune it with variables, never with a more specific selector.** `tokens.css` reads `--reveal-filter` and `--reveal-transform`, so write `.t-poster .w{--reveal-filter:blur(12px)}`. A rule like `.js .t-poster .w[data-reveal]{filter:blur(12px)}` outranks `.is-in`, and the words stay blurred forever (this shipped once; the audit now fails it as `motion.stuckReveal`). Use blur 4–10px on text and up to 18px on media, with translate ≤ 12px. These studios barely move things; they *focus* them. Trigger at `rootMargin:"0px 0px -20% 0px"` (≈ ScrollTrigger "top 80%"). `assets/motion.js` → `reveal()` implements this.

### 5.2 Ink-in (no movement) (Steve Jobs Archive)
Split into lines and animate `opacity .2→1` and `color #bbb→ink` with a 120–200ms line stagger. Best for statements on white.

### 5.3 Word fill on scroll (Atlas, Exo Ape)
Words start at 30–50% ink and fill to 100% as scroll progresses through the paragraph (start "top 80%", end "bottom 40%"). `motion.js` → `scrollFill()`.

### 5.4 Line mask rise (Locomotive, Baseten `revealTitle`)
Each line sits inside `overflow:hidden` and its inner span goes `translateY(105%) → 0` over 0.9s easeOutCubic `cubic-bezier(.215,.61,.355,1)` with a 0.08s line stagger.

### 5.5 Clip/aperture reveals
- Image wipe: `clip-path: inset(0 0 100% 0) → inset(0)` 1.0–1.2s `--ease-inout`.
- Aperture: `clip-path: inset(41% 35% 41% 35%) → inset(0)` 1.2s `cubic-bezier(.76,0,.24,1)` (illoca).
- Circle from the bottom: `clip-path: circle(0% at 50% 100%) → circle(150% at 50% 100%)` scrubbed over ~100vh (Amaterasu).
- Media card to full-bleed: `clip-path: inset(0 var(--margin) round 24px) → inset(0 0 round 0)` scrubbed over one viewport (Anthropic, Apple).

### 5.6 Live data motion (SaaS)
Ticking stats (`tabular-nums`, per-digit roll `translateY(-n*1em)` 300ms ease-out, updating every 50–100ms) and an "Agents at work" ticker row. `motion.js` → `ticker()`.

### 5.7 Hover vocabulary
- **Letter-roll** (Lusion, Unseen, Fluid Glass): duplicate each glyph; on hover, `translateY(-100%)` over 0.45s `cubic-bezier(.76,0,.24,1)` with an 18ms per-char delay. Clones get `aria-hidden`. `motion.js` → `letterRoll()`.
- **Arrow exit / re-enter** (ANAI, SOIL, Glyphic): on hover the arrow slides out right and a clone enters from the left (0.35s).
- Button fill: the background scales from the bottom (`scaleY(0→1)`, origin bottom) under the label, 0.3s.
- Underline draw: `background-size: 0 1px → 100% 1px`, 0.3s, origin left; it leaves to the right.
- Images: scale 1 → 1.03 over 0.8s on hover, never more.

### 5.8 Pinned scroll sequence without GSAP (sticky stage + progress)
```html
<section class="seq" style="height:300vh"><div class="seq-stage" style="position:sticky;top:0;height:100vh">…</div></section>
```
```js
const seq = document.querySelector('.seq'), stage = seq.querySelector('.seq-stage');
const tick = () => { const r = seq.getBoundingClientRect(); const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
  stage.style.setProperty('--p', p.toFixed(4)); };          // drive everything from --p in CSS: transforms, clip-path, counters
addEventListener('scroll', () => requestAnimationFrame(tick), { passive: true }); tick();
```
Map `--p` to state with `calc()` (`transform: translateY(calc((1 - var(--p)) * 40%))`) or step through named states in JS (low → rising → high). Under reduced motion, drop the 300vh height and show the key state statically. Scroll-driven CSS (`animation-timeline: view()`) is a progressive enhancement over this, not a replacement.

### 5.9 Letter-split titles without breaking semantics
Splitting an h1 into letter spans inflates word counts for screen readers and audits. Keep the real text in the heading, and draw the letters as presentation:
```html
<h1 class="spread"><span class="sr-only">Nocturne</span><span class="letters" aria-hidden="true"><i>N</i><i>O</i>…</span></h1>
```

## 6. Loaders and intros: policy

| Direction | Preloader? | Hero intro |
|---|---|---|
| SaaS / product / commerce / institutional | **Never.** Render instantly. | Blur-in or ink-in, total ≤ 1.2s, content readable from frame one |
| Editorial / brand / place | Optional: tiny and typographic ("(0%)" on a rule; logo draw), ≤ 1.5s | Staged: mark → headline lines → media |
| Immersive / award pieces | Yes, designed as a hero (see directions.md §10). **Min 800ms, max ~2.5s**, then reveal what is ready | Aperture, blur, lights-up, or loader-becomes-image |

Never use a generic spinner. Never let a loader hang: 8 of 14 immersive sites never got past theirs in a software-rendered browser.

## 7. Smooth scroll and page transitions: policy

- **Lenis is only for directions 4, 6, 8, and 10** (editorial, place, deep-tech, immersive): lerp 0.06–0.1, `wheelMultiplier:1`. On SaaS (0 of 16 tech sites) and big-brand or commerce sites (0 of 15), use **native scroll**. Locomotive Scroll is obsolete (0 uses on new builds).
- **No scroll-jacking on SaaS or commerce.** Pinned scrubbed sequences belong to product chapters (Apple) or immersive pieces.
- **Page transitions:** prefer the native **View Transitions API** (`@view-transition { navigation: auto; }` for MPAs; Serve Robotics uses it). Swup or Barba for older stacks. Use a 0.4–0.6s crossfade or a panel wipe with `--ease-inout`.

## 8. Reduced motion (non-negotiable; juries undervalue it, but users need it)

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
  [data-reveal]{opacity:1!important;filter:none!important;transform:none!important}
}
```
In JS, check `matchMedia('(prefers-reduced-motion: reduce)')`. Skip loaders, disable Lenis and parallax, replace scrubs with crossfades, stop marquees and tickers (show the final value), and pause autoplay video by default or offer a pause button (always offer one).

## 9. Never

- Bouncy or elastic easing on large surfaces (section, hero, card).
- Things flying in from 100px+ away; rotations on reveal; staggered "fade-up" on every element of every section (motion fatigue). Reveal the **first element of a section**, not each paragraph.
- Motion with no meaning: floating blobs, perpetual pulsing CTAs, parallax on body text.
- Animating layout properties (`top`, `width`, `height`). Animate `transform`, `opacity`, `filter`, and `clip-path` only.
- Autoplaying sound, or scroll speed that differs from the user's wheel on content pages.
