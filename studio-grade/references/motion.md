# Motion: tokens, primitives, policy

On every award winner, juries scored Animations/Transitions as the highest dev sub-score (7.4–9.6). The motion behind those scores is **specific and quiet**: one house ease, short UI timings, reveals that *focus* rather than travel, and overshoot only on tiny elements.

## 0. What actually moves (measured live on 106 sites, October 2026)

Probe: load each site, read the hero heading at ~100ms and again at 4s, then count which below-the-fold elements start hidden waiting for a scroll reveal (the probe script and raw results are kept with the unpublished research).

| | Measured | So |
|---|---|---|
| Hero heading visible within ~100ms | **71 of 95 (75%)** | the headline is there on the first frame |
| Hero heading animates in on load | 18 of 95 (19%) | a load-in headline is a device, not a default |
| Hero heading split into word/char spans | 19 of 95 (20%) | split text is for Loud, editorial and immersive pages |
| Below-fold paragraphs hidden before scroll | 878 of 3,549 (25%) | body copy mostly just sits there |
| Sites that reveal most of their body text | 16 of 75 (21%) | |
| Below-fold images/video hidden before scroll | 775 of 2,539 (31%) | media is what reveals |
| Cards and containers hidden before scroll | 704 of 2,012 (35%) | groups reveal, not lines |
| Sites with no scroll reveals at all | 21 of 78 (27%) | "no reveals" is a legitimate choice |
| Load a JS animation library | 54 of 106 | GSAP on 41 (`power2`/`power3`/`expo` eases), spring UI (Framer Motion/Motion) on 20, Lenis on 29 |
| First screen visibly changes between 0.35s and 3.2s | 40 of 104 | most first screens are simply *there* |

**Rules that follow:**
- **Text is still by default.** The h1, sublines and body copy are present from the first frame. Animate the hero heading only if the direction calls for it (Loud, editorial, immersive), or as the **hero load sequence** (§5.10: scene first, h1 word by word, lede, CTA, product rises; readable by ~1.4s), and then only in the hero. Never split body text or reveal paragraphs line by line.
- **Motion goes to the things that aren't text:** images and video (clip or scale reveals, ≤ 0.8s), card groups (one fade and 8–12px rise per group, staggered 60–90ms), the product (UI vignettes playing their one action, live data), and interaction (hover, press, the cursor).
- **When text does reveal, it fades:** opacity only, or opacity plus ≤ 8px, at 0.3–0.5s, with no blur on reading text. Blur-to-sharp (§5.1) is for media and the hero object. The one exception is the hero h1 inside the §5.10 sequence, where each word resolves from ≤ 8px blur in ≤ 0.6s.
- **The engine is JavaScript, used lightly:** GSAP (or the native Web Animations API) for timelines and scroll-linked moments, springs for UI. A page with no reveals at all is fine, and often better for the Quiet register.

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

### 5.1 Blur-to-sharp (the #1 primitive in immersive, editorial and tech heroes; for media and the hero object, not reading text: see §0)
```css
[data-reveal]{opacity:0;filter:blur(8px);transform:translateY(10px)}
[data-reveal].is-in{opacity:1;filter:blur(0);transform:none;
  transition:opacity .8s var(--ease-out),filter .8s var(--ease-out),transform .8s var(--ease-out);
  transition-delay:calc(var(--i,0) * 90ms)}
```
**Light-up** (quiet commerce, drawn imagery): `--reveal-filter:saturate(0) brightness(1.06);--reveal-transform:none`, so the image arrives from grey into colour with no movement.

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

**A pinned element must never share its scroll range with other content.** A sticky poster stays put while everything after it in the same section scrolls *over* it: room lists, charts and the next headline slide across the pinned text (this shipped once). Give the pin its own track, and put the follow-on content after the track, so the poster has scrolled away before that content arrives:
```html
<section class="chapter">
  <div class="pin" style="height:175vh"><div class="poster" style="position:sticky;top:12vh">…headline + copy…</div></div>
  <ol class="rooms">…arrives after the poster has left…</ol>
</section>
```
When content must read over an illustrated stage, give it a soft scrim in the ground colour (a vertical gradient at about 85%). **Over a full-bleed live stage (a fixed canvas), veil the reading side of the viewport instead of each block:** one fixed gradient in the ground colour (≈62% → 0 across the left 70%), so the other side of the stage stays clean to carry data. Per-block scrims drift across a sky like dark clouds. HUDs and readouts over scrolling copy must stay under 200px tall, or the audit treats them as pinned posters. **Reduced motion for a scroll-scrubbed canvas:** skip the intro and snap to the nearest anchor's state (discrete, no lerp). Use crossfades, not scrubs. Don't let text sit on bright artwork. The audit fails text drawn over other text as `layout.textOverlap` and names the slice.

### 5.9 Letter-split titles without breaking semantics
Splitting an h1 into letter spans inflates word counts for screen readers and audits. Keep the real text in the heading, and draw the letters as presentation:
```html
<h1 class="spread"><span class="sr-only">Nocturne</span><span class="letters" aria-hidden="true"><i>N</i><i>O</i>…</span></h1>
```

### 5.10 The hero load sequence (Rahul Luthra's reel, 2026; the sanctioned way to animate a hero h1)
Four unrelated heroes in one reel (a docs tool, a wallet app, an AI dating coach, an AI resources tool) shared one choreography, and it's the reason a load-in headline can feel premium rather than slow:

| Step | What | Timing |
|---|---|---|
| 0 | The **scene** (photo, illustration, gradient, mesh) and the nav are complete on the first frame | 0ms |
| 1 | The **h1 resolves word by word**: opacity 0→1, blur 8px→0, rise 6px→0 | starts 120ms; 60–80ms per word; each word 600ms |
| 2 | The **lede** fades as one block (never word by word) | +120ms after the last word starts |
| 3 | The **CTA row** (and the proof pill) fades as one group | +120ms |
| 4 | The **product object** (window, phone, device) rises 40–64px from below or from behind a foreground plane (techniques §87) | +150ms; 900ms, the house `--ease` |

The h1 is fully sharp by about 1.2s for a 6-word headline (the word stagger is capped so the h1 finishes by ~1.1s whatever its length), and the whole hero settles by ~1.6s. Rules:
- **One hero per site.** Never on section headings, never on scroll, never on body copy.
- **The scene can't wait.** If the background image arrives late, the sequence plays over an empty colour and reads as broken: preload the hero image (`fetchpriority="high"`) and keep it out of the sequence.
- **It fails safe.** If the script never runs, CSS shows everything at 2.5s; with reduced motion, everything is simply there.
- **It doesn't replay.** Nothing loops or blurs out.

```html
<section class="hero" data-seq-root>
  <h1 data-seq="words">World-class docs for everything you ship.</h1>
  <p class="lede" data-seq>Drop Markdown into a folder and ship a docs site.</p>
  <div class="act" data-seq><a class="btn" href="#start">Start free</a></div>
  <figure class="device" data-seq="rise">…</figure>
</section>
<script type="module">import { heroSequence } from './motion.js'; heroSequence();</script>
```
`heroSequence()` (assets/motion.js) splits the h1 with `splitWords`, sets each delay in document order, and writes the total to `data-seq-end` on the root. The audit reads it (`motion.heroSequence`) and warns if the h1 finishes after 1.2s or the hero after 2s. `autoInit()` runs it too. Tune the hidden state with `--seq-blur`, `--seq-y` (and `--seq-rise` for `rise`), never with a more specific selector.

- **The budget starts when the script runs**, not at navigation: `is-in` waits for the module and two frames, so on a real page the device lands ~200–300ms after `data-seq-end`. Add `<link rel="modulepreload" href="motion.js">` in the head and keep the module small.
- **`rise` owns `transform`.** A device centred with `translate:-50%` must use the `translate` *property*, not `transform:translate()`, or the rise overwrites the centring.
- **To judge it, capture from navigation:** `page.goto(url, { waitUntil: 'commit' })`, then screenshots at ~100, 600, 1200 and 2500ms, logging each element's computed opacity beside the shot. Waiting for `data-seq-end` first makes every frame look finished.
- Pairs best with techniques §87: the `rise` reads as the screen coming up from behind the scene's foreground (Bulwark, gallery v6).

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
