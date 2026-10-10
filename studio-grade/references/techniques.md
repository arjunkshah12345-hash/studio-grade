# Signature techniques: 60 moves with code

Choose **2–3 per site**, and make sure they serve the motif. A page that uses ten of these is a demo reel, not a design. Each entry names its origin so you can match it to a direction.

Index: **A. Structure & framing** 1–11 · **B. Type moves** 12–30 · **C. Product & proof** 31–37 · **D. Interaction & motion** 38–55 · **E. Small-product moves** 56–60

---

## A. Structure & framing

### 1. Layout rails with crosshair dots (Stripe, Attio, Mintlify, ElevenLabs)
```css
.page{max-width:1280px;margin-inline:auto;border-inline:1px solid var(--hairline);position:relative}
.band{border-top:1px solid var(--hairline);position:relative}
.band::before,.band::after{content:"";position:absolute;top:-3px;width:5px;height:5px;background:var(--paper);
  border:1px solid var(--ink-3);border-radius:50%}
.band::before{left:-3px}.band::after{right:-3px}
.head-tick::before{content:"";position:absolute;left:-1px;width:2px;height:24px;background:var(--accent)} /* Mintlify tick on the rail */
```

### 2. Hairline grid via 1px gap (Attio)
```css
.cells{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline)}
.cells>*{background:var(--paper);padding:32px}
```

### 3. Dashed construction grid (Baseten)
```css
.dash-x{height:1px;background:repeating-linear-gradient(to right,#D9D9D9 0 4px,transparent 0 8px)}
.dash-y{width:1px;background:repeating-linear-gradient(to bottom,#D9D9D9 0 4px,transparent 0 8px)}
.reg::after{content:"";position:absolute;width:6px;height:6px;background:var(--accent-2,#F5A3F0);top:-3px;left:-3px} /* registration mark */
```
Pair it with 0 radius, mono uppercase square buttons, and one neon accent.

### 4. Crosshair grid background (Terminal, ICOMAT)
```css
.xgrid{background-image:linear-gradient(to right,rgba(0,0,0,.06) 1px,transparent 1px),linear-gradient(rgba(0,0,0,.06) 1px,transparent 1px);background-size:112px 112px}
.xgrid .plus{position:absolute;width:9px;height:9px;translate:-4px -4px;
  background:linear-gradient(currentColor,currentColor) center/1px 100% no-repeat,linear-gradient(currentColor,currentColor) center/100% 1px no-repeat;opacity:.35}
```
Highlight one cell on hover with a radial accent glow at 12% alpha.

### 5. Framed page panels (Factory)
```css
.frame{margin:0 24px;border-radius:6px;overflow:hidden}
footer.frame{background:#101010;color:#EBEBEB;padding:96px 24px 32px;margin-bottom:24px}
```

### 6. Ruled viewport with corner metadata (Ayocin, Glyphic)
Split the hero into bands with `border-top:1px solid rgb(var(--ink-rgb)/.3)`. Put 12–14px labels in the four corners: `• Improving your health` / `© 2026` / `SCROLL DOWN` / `• ATMOS`.

### 7. Top-edge glow line on dark panels (Resend, Raycast)
```css
.panel{position:relative;border:1px solid transparent;border-radius:16px;
  background:linear-gradient(42deg,#141517,#191B1E) padding-box,
             linear-gradient(42deg,rgba(24,25,28,.88) 45%,rgba(215,239,248,.28)) border-box}
.panel::before{content:"";position:absolute;top:-1px;left:12%;right:12%;height:1px;
  background:linear-gradient(90deg,transparent,color-mix(in oklab,var(--accent) 80%,transparent),transparent)}   /* use your accent, not a new hue */
```

### 8. Shadow-ring borders (Vercel, Family, Linear)
`box-shadow:0 0 0 1px rgba(0,0,0,.08), 0 0 0 4px var(--paper);` gives a border that doesn't shift layout and stacks cleanly with a separation ring.

### 9. Chamfered HUD cards (Inversa)
```css
.hud{--c:16px;clip-path:polygon(var(--c) 0,100% 0,100% calc(100% - var(--c)),calc(100% - var(--c)) 100%,0 100%,0 var(--c));
  background:var(--line);padding:1px}
.hud>div{clip-path:inherit;background:var(--dark);padding:20px}   /* 1px "border" via the padded parent */
```
Add a mono `• LABEL` top-left and a value top-right.

### 10. Notched section edges (Terminal Industries)
`clip-path:polygon(0 0,100% 0,100% calc(100% - 24px),62% calc(100% - 24px),calc(62% - 24px) 100%,0 100%)`. Use **one** brand-derived cut shape, reused on images and panels.

### 11. Arch divider + text on path (ERA Residence)
```html
<section class="arch"><svg viewBox="0 0 1000 300" class="arch-title"><path id="a" d="M100,300 A400,400 0 0 1 900,300" fill="none"/>
<text><textPath href="#a" startOffset="50%" text-anchor="middle">THREE REASONS TO CHOOSE ERA</textPath></text></svg></section>
```
`.arch{border-radius:720px 720px 0 0;background:#B5CEDB;margin-top:-30vh}`. Scrub it upward over the previous pinned image.

---

## B. Type moves

### 12. Live ticking stat eyebrow (Stripe, Ramp, Mintlify)
`<p class="t-label">Global GDP running on Acme: <span class="chip t-num" data-ticker="1.72802563" data-rate="0.00000011">1.72802563</span>%</p>`
`.chip{background:rgba(0,0,0,.04);padding:2px 6px;border-radius:4px}`. Use `motion.js → ticker()` (per-digit roll). Precision is the point: 8 significant digits.

### 13. "At work today" ticker row (Ramp, Mintlify)
A marquee of `Label  12,345` pairs in mono with rolling digits and a pulsing 6px status dot (`signal-ping` 2s). Ramp makes it a sticky bottom bar.

### 14. One-word hero (Black Forest Labs)
`<p class="t-label" style="font-size:24px">FLUX 3</p><h1 style="font-size:clamp(4rem,7.4vw,7rem);line-height:.9;letter-spacing:-.045em;font-weight:500">Image</h1>`, then a mono subline. Optionally cycle the word with a 0.5s clip swap.

### 15. Monumental word over subject (White Desert)
```css
.monument{position:absolute;inset:auto 0 -.12em;font:400 clamp(7.5rem,2rem + 18vw,20rem)/.9 var(--font-monument);
  text-transform:uppercase;color:#fff;text-align:center;z-index:2}
.hero img{opacity:0;transition:opacity 1.2s var(--ease-out) .3s}.hero.is-ready img{opacity:1}
```
The word is seen first and the photo resolves behind it.

### 16. Object in front of the wordmark (Ayocin)
The wordmark sits in `z-index:1` at `font-size:16.5vw; line-height:.8; width:100%`. The product cut-out (PNG with alpha, or a 3D render) goes in `z-index:2`, bottom-anchored, ~90vh tall, covering the middle letters. Hairline rules run above and below the wordmark.

### 17. Giant pale word behind the product (Vast, White Desert, Lando)
A product name at 250–350px, colour within ~5% luminance of the background (`#ECE8E3` on `#F5F3EF`), a render floating over it, a dotted orbital circle behind, and a mono spec block in a corner.

### 18. Headline trespassing into the image (Studio D)
On a 16-col grid, the headline spans cols 2–9 and the image cols 8–13. The text gets `position:relative;z-index:2`, so its last 1–2 letters overlap the image by 40–80px. Display at 128px, line-height 0.66–0.75, weight 300.

### 19. Rotating noun / slot-machine word (Obama, Pixelflakes)
```html
<h1 class="rot"><span class="rot-win" aria-hidden="true"><span>A campus</span><span>A museum</span><span>Art</span></span> that brings change home
<span class="sr-only">A campus, a museum and art that bring change home</span></h1>
```
`.rot-win{display:inline-grid;height:1em;overflow:hidden;vertical-align:bottom}` and cycle `translateY(-100% * i)` every 2–3s with `--ease-inout` over 0.8–1s. Stop it under reduced motion.

### 20. Word-chip headlines (The Drake)
Wrap each word in `<span>` with `background:#fff;border:1px solid currentColor;border-radius:5px;padding:0 .08em;margin-right:-1px;line-height:.85`. Reveal each chip with `clip-path:inset(0 100% 0 0)→inset(0)`, staggered 0.06s.

### 21. Mixed-font headline (Lando, Pasqua, ERA)
`WORLD DRIVERS' <em class="alt">CHAMPION</em>`, where `.alt` is a second display face (heavier, serif italic, or script) **at the same size**. One or two words per page, never more.

### 22. Prose-as-navigation lede (Art Institute of Chicago)
```css
.lede{font:400 clamp(1.75rem,1rem + 1.6vw,2.4rem)/1.16 var(--font-serif);color:#949494;max-width:52ch}
.lede a{color:var(--accent);text-decoration:underline;text-underline-offset:.12em;text-decoration-thickness:1px}
```
Place an "Open today 10–5 · See all hours" status line above it.

### 23. Sentence filter (Pentagram)
"We design [Brand Identity ⌄] for [Technology ⌄]": each bracket is a `<select>` styled as a chip (`rgba(0,0,0,.07)`, radius 4, 16px). Pin a copy at the bottom of the viewport (`position:sticky;bottom:24px`) after the hero. Reuse the grammar in section heads: "7 latest [Motion] projects ↓".

### 24. Counts in parentheses + inline thumbnail (Floema)
`Urban <img class="inline-thumb" alt=""> <span class="dim">(51)</span>` at 57px. The thumb is 64px square, `display:inline-block;vertical-align:middle`, and scales in from 0.6 with `--ease-pop`.

### 25. Vertical section index in the margin (Studio D)
```css
.vindex{position:fixed;left:18px;bottom:24px;writing-mode:vertical-rl;transform:rotate(180deg);font:500 11px/1 var(--font-mono);letter-spacing:.08em}
```
"01  Services" → "02  Featured projects", swapped as each section enters.

### 26. Wordmark collapses to a monogram (Studio D, Populous, Drake, Anthropic)
`.wordmark{clip-path:inset(0 0 0 0);transition:clip-path .5s var(--ease-hard)} .is-scrolled .wordmark{clip-path:inset(0 calc(100% - 1.1ch) 0 0)}`

### 27. Ghost wordmark watermark (Magda Butrym)
The logotype repeated at ~100vw width, `opacity:.08–.12`, behind the hero caption.

### 28. Justified / letter-spread title (Miu Miu, SOIL)
Make each line `display:flex;justify-content:space-between`, and split the last word into letters so it fills the measure. SOIL pins each letter of "S O I L" to a grid column between two heavy black rules.

### 29. Scramble / decode mono labels (Inversa)
For ~400ms, show random A–Z per character, resolving left→right (each char locks after `i*25ms`). Apply it only to ≤ 24-char mono labels. Under reduced motion, show the final text.

### 30. Footer marquee at 200px (Studio D)
`.marquee{white-space:nowrap;font:300 200px/1 var(--font-display);letter-spacing:-.05em}` with a duplicated span animated `translateX(-50%)` linearly over 20–30s, in cream on warm near-black. A human contact card with a photo follows it.

---

## C. Product & proof

### 31. Product in a fake OS desktop (Factory)
An inset 6px-radius frame → a grainy wallpaper (CSS noise over `#8a8a8a`) → a 22px menubar (`Acme  File  Edit  View  Window …  Mon Jun 10  9:41 AM`, 11px system font) → the app window centered. The product reads as real software, not marketing art.

### 32. UI bleeding off the viewport (Mintlify)
The product image starts at ~41% of the width with `margin-right:calc(50% - 50vw)` (or absolute positioning past the container) and is cropped by the viewport. It has a 1px border at 7% ink, a 12px top-left radius, and a soft glow behind its top edge: `linear-gradient(106deg,rgba(68,174,255,.5),rgba(24,226,153,.5) 35%,rgba(186,255,36,.5) 65%)` blurred 24px at 50% alpha.

### 33. Install line in the hero (Factory, Cursor)
```html
<div class="cmd"><span class="dim">&gt;</span> <code>curl -fsSL https://acme.dev/install | sh</code><button aria-label="Copy install command">⧉</button></div>
```
`.cmd{width:420px;background:var(--sunken);font:13px/1 var(--font-mono);padding:12px 14px;border-radius:3px;display:flex;gap:8px;align-items:center}`. Copying should show "Copied" for 1.2s.

### 34. Annotation boxes as ornament (Black Forest Labs)
Wrap images in 1px boxes with a mono label chip on the top-left corner (`monk_1`, `poster_2`): chip bg teal `#29C592`, 11px mono, 2px radius. This is a domain-true ornament for vision and AI.

### 35. FIG captions + spec tables (Linear, Anthropic)
"FIG 0.1" mono labels above isometric line drawings (dotted hidden edges). Card footers become spec tables: `display:grid;grid-template-columns:auto 1fr;` with mono uppercase keys (DATE / CATEGORY), right-aligned values and hairline rows.

### 36. Customer-brand cards (Mintlify)
A carousel of cards each filled with *the customer's* brand colour (Anthropic orange), a 44px white stat numeral, and a white "Read the story >" button. It adds colour without breaking your palette.

### 37. Grayscale customer-site proof (Vercel)
A chapter heading + the customer's real site in a browser frame at `filter:grayscale(1)` + one quantified sentence ("Notion powers millions of agent conversations daily on Acme.").

---

## D. Interaction & motion

### 38. Blur-in hero stagger (Linear, Attio, ZeroLeaks)
Order: headline → subline → CTAs → product frame (+300ms). Each element goes from opacity 0, `blur(10px)`, `translateY(8px)` to resolved over 900ms `--ease-out`, staggered 100ms. Word-by-word variant: split the h1 into words and stagger 40ms. `motion.js → reveal()` and `splitWords()`.

### 39. Ink-drying line reveal (Steve Jobs Archive)
Split into lines and animate from `color:#bbb; opacity:.25` to ink over 0.6s `cubic-bezier(.17,.17,0,1)`, staggered 150ms. No translate.

### 40. Scroll word fill (Atlas, Exo Ape)
Words begin at `rgb(var(--ink-rgb)/.35)` and switch to full ink as `progress * words.length` passes each index. `motion.js → scrollFill()`.

### 41. Letter-roll hover (Lusion, Unseen, Fluid Glass)
`motion.js → letterRoll(el)` duplicates the glyphs. On hover each char translates −100% over 0.45s `cubic-bezier(.76,0,.24,1)` with a `calc(var(--i)*18ms)` delay. The clones are `aria-hidden`.

### 42. Scroll-spy chapter list / opacity index (Attio, Dia, Radian)
A sticky list where the active item is ink + a 2px left bar and the rest sit at 20–40% ink, with mono numerals `01 02 03`. The right column crossfades media in 300–400ms. `motion.js → scrollSpy()`.

### 43. Sticky statement + stacking cards (Black Forest Labs)
```css
.stack-wrap{display:grid;grid-template-columns:5fr 7fr;gap:48px}
.stack-wrap h2{position:sticky;top:20vh;align-self:start}
.stack-card{position:sticky;top:calc(120px + var(--i) * 48px);min-height:60vh;border-radius:4px;background:var(--surface)}
```

### 44. Media card → full-bleed on scroll (Anthropic, Apple)
`clip-path: inset(0 var(--margin) round 24px)` → `inset(0 0 round 0)`, scrubbed over one viewport. With CSS scroll-driven animation: `animation: grow linear both; animation-timeline: view(); animation-range: entry 0% cover 50%;`. Guard it with `@supports (animation-timeline: view())` and keep the static framed version as the fallback.

### 45. Aperture reveal (illoca)
`clip-path:inset(41% 35% 41% 35%)` → `inset(0)` over 1.2s `cubic-bezier(.76,0,.24,1)`, on the hero media, after the loader. Put a blueprint grid on the surrounding paper.

### 46. Branded loader (Oryzo, Glyphic, Atlas)
Use the product drawn as an SVG construction diagram with a pie-sweep fill (`stroke-dasharray:<p> 100` on a thick circle), or a wordmark on a full-width 1px rule with "(0%)" bottom-center. Tiny type (8–12px). Min 800ms, max 2.5s. Exit: the object scales 1→1.08 and fades over 0.6s `--ease-inout`, then the hero starts 150ms later.

### 47. Persistent bottom CTA dome (Dia)
```css
.dome{position:fixed;left:-20vw;bottom:-120px;width:140vw;height:220px;border-radius:50% 50% 0 0/100% 100% 0 0;
  background:var(--paper);box-shadow:0 -7px 18px -8px rgba(73,54,34,.09);display:grid;place-items:start center;padding-top:28px;z-index:40}
```
A 440×56 black pill sits centered in it with a caption beneath.

### 48. Fused email capsule (Mercury, Ramp)
```html
<form class="capsule"><label class="sr-only" for="e">Work email</label><input id="e" type="email" placeholder="What's your work email?"><button>Get started</button></form>
```
`.capsule{display:flex;padding:4px;border-radius:12px;background:var(--sunken);box-shadow:0 0 0 1px var(--hairline)} .capsule input{flex:1;background:none;border:0;padding:0 14px} .capsule button{border-radius:8px;height:44px;padding:0 18px}`

### 49. Viewfinder corner brackets (Kriss.ai, Serve)
```css
.brk{position:relative}.brk::before,.brk::after{content:"";position:absolute;width:8px;height:8px;border:1px solid currentColor;transition:inset .3s var(--ease-out)}
.brk::before{inset:-6px auto auto -6px;border-right:0;border-bottom:0}.brk::after{inset:auto -6px -6px auto;border-left:0;border-top:0}
.brk:hover::before{inset:-10px auto auto -10px}.brk:hover::after{inset:auto -10px -10px auto}
```
Use it as the motif on buttons, nav, and cards (all four corners via an extra wrapper).

### 50. Mascot progress rail (Serve Robotics)
A fixed 1px vertical line at `left:16px` with a 16px brand icon whose `top` maps to scroll progress. Tint it with the accent.

### 51. Lights-up reveal (Radian)
Hero media starts at `filter:brightness(.05)` with only the emissive part visible (a light, a screen). Ramp to `brightness(1)` over 1.6s `--ease-out-expo`, then fade the UI in with 80ms staggers.

### 52. Live clocks and coordinates (Bennett & Clive, White Desert)
```js
const t = new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'America/New_York'}).format(new Date());
```
10–12px uppercase at +0.1em: "NEW YORK 01:27 · LOS ANGELES 22:27". Coordinates: `71°32'41" S, 8°58'11" E`.

### 53. Grain overlay
```css
body::after{content:"";position:fixed;inset:-50%;pointer-events:none;z-index:100;opacity:.07;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
```
Use `overlay` on dark. Animating `background-position` in `steps(6)` gives film flicker; disable it under reduced motion.

### 54. Ambient light drift (Floema)
A large, blurred leaf-shadow layer (an SVG of leaf shapes with `filter:blur(24px)`, multiply at 12%) over the paper, with `animation:drift 60s linear infinite alternate` (translate ±3%, rotate ±2°). It makes a static page feel outdoors.

### 55. Toy-plastic buttons (Choo-Choo World), Playful System only
```css
.toy{background:linear-gradient(#07B9FE,#1160BE);border-radius:16px;box-shadow:0 6px 0 #0B4A8F,inset 0 -2px 10px rgba(120,207,255,.6);transition:transform .12s,box-shadow .12s}
.toy:active{transform:translateY(4px);box-shadow:0 2px 0 #0B4A8F,inset 0 -2px 10px rgba(120,207,255,.6)}
```

---

## E. Small-product moves (convt.app)

### 56. Transformation pair (convt)
Show the product's effect as a literal before → after with real file names and the metric that improves.
```html
<div class="pair" role="img" aria-label="miso.heic, 4.8 MB, converted to miso.webp, 612 KB">
  <figure class="file"><img src="miso.jpg" alt=""><figcaption><span>miso.heic</span><span class="t-label t-num">4.8 MB</span></figcaption></figure>
  <span class="pair-arrow" aria-hidden="true">→</span>
  <figure class="file"><img src="miso.jpg" alt=""><figcaption><span>miso.webp</span><span class="t-label t-num gain">612 KB</span></figcaption></figure>
</div>
```
`.file{border-radius:14px;padding:10px;background:var(--surface);box-shadow:0 0 0 1px var(--hairline),0 24px 48px rgb(0 0 0/.4)} .gain{color:var(--accent)} .pair-arrow{width:48px;height:48px;border-radius:50%;background:var(--accent);display:grid;place-items:center}`. Animate it: the source card in → the arrow pulses → the result in → the metric ticks down. Works for any transformer: compressors, translators, formatters, cleaners, upscalers, summarizers.

### 57. Halftone stage that dithers into the accent (convt)
A rounded panel whose dot grid is sparse grey at the top and densifies into the accent at the bottom:
```css
.stage{border-radius:16px;position:relative;overflow:hidden;background:linear-gradient(to bottom,transparent 30%,color-mix(in oklab,var(--accent) 55%,transparent))}
.stage::before{content:"";position:absolute;inset:0;
  background:radial-gradient(circle,rgb(255 255 255/.22) 1px,transparent 1.6px) 0 0/6px 6px;
  -webkit-mask-image:linear-gradient(to bottom,rgb(0 0 0/.25),#000 70%);mask-image:linear-gradient(to bottom,rgb(0 0 0/.25),#000 70%)}
```
For a true dither, render a Bayer-matrix canvas once (see imagery.md §3). Repeat the stage behind 2 sections so it becomes the motif.

### 58. Domain-object cards (convt)
Instead of an icon per category, draw a miniature of the object in ~200px: a cropped photo; a tiny player (thumbnail + ▶ + `0:12 ━━━── 0:42`); a waveform (40 bars of random height in accent, the second half at 30% opacity, + `voice-memo.m4a 1:04` in mono); stacked document pages (two rotated cards with grey text lines). The card footer has the title left, a count right (`14`), and mono chips (`JPG PNG WEBP`, 12px, radius 4, on the sunken surface).

### 59. Architecture tree (convt)
```html
<div class="tree"><div class="root"><img src="mark.svg" alt=""> convt <span class="dim t-label">picks the engine</span></div>
  <svg class="branches" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true"><path d="M500 0V30M125 60V40q0-10 10-10H865q10 0 10 10V60M375 60V40M625 60V40" fill="none" stroke="var(--accent)" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>
  <div class="leaves">…4 cards…</div></div>
```
Add a 5px accent dot at each branch terminal. Each leaf card starts with a mono transformation line (`deck.pptx → deck.pdf`). Draw the branches with `stroke-dashoffset` when revealed (0.8s, house ease).

### 60. Tactile layered button shadows (convt)
```css
.btn--primary{background:linear-gradient(oklch(68% .15 155),oklch(60% .14 155));color:#fff;
  box-shadow:inset 0 1px 0 rgb(255 255 255/.28),0 0 0 1px oklch(48% .12 155),0 1px 2px rgb(10 60 35/.25),0 4px 12px rgb(10 60 35/.14)}
.btn--secondary{background:var(--surface);box-shadow:inset 0 1px 0 rgb(255 255 255/.06),0 0 0 1px var(--hairline-2),0 1px 2px rgb(0 0 0/.4)}
/* light theme: inset 0 -1px 0 rgb(0 0 0/.04), 0 0 0 1px rgb(0 0 0/.08), 0 1px 2px rgb(0 0 0/.06) */
```
An inner top highlight + a 1px ring + two tight drops makes buttons feel pressable without looking skeuomorphic. The gradient is a ~8% L step in the same hue, which is not decoration.
