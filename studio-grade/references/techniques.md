# Signature techniques: 79 moves with code

Choose **2–3 per site**, and make sure they serve the motif. **System rules don't count toward the 2–3:** §63 (naming), §66 (type voices) and §67 ("Read the film") shape the whole build rather than one moment, so they sit alongside your signatures. A page that uses ten of these is a demo reel, not a design. Each entry names its origin so you can match it to a direction.

Index: **A. Structure & framing** 1–11 · **B. Type moves** 12–30 · **C. Product & proof** 31–37 · **D. Interaction & motion** 38–55 · **E. Small-product moves** 56–60 · **F. Studio and personal-site moves** 61–67 (visual signatures: 61, 62, 64, 65; system rules: 63, 66, 67) · **G. Photo-led product moves** 68–70 · **H. Editorial marks** 71 · **I. AI-product and illustration-system moves** 72–77 · **J. Directory and index moves** 78–79

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

## F. Studio and personal-site moves (ignura.com, jawadjalal.com)

### 61. Inline UI tokens in copy (ignura, jawadjalal)
Let the domain show up inside the sentence. A word becomes the thing it names: a terminal pill with a caret, an input field, a code chip, or a struck-out word with a handwritten rewrite. One or two per paragraph, never every noun.
```html
<h2>You built the <span class="tok tok--term">thing<i class="caret"></i></span>.</h2>
<p>Months of 2am vibe<code class="tok">coding</code>, and it works: on <span class="tok tok--input">localhost:3000<i class="caret"></i></span>.</p>
<p>Launch day slips: the <s>14th</s>, the <s>28th</s>, “soon”.</p>   <!-- in body copy the rewrite is set in ink; the handwritten voice belongs to headings (§66) -->
<p>i’m jawad, a <span class="tok tok--chip"><svg>…pencil…</svg>designer</span> and founder in london.</p>
```
```css
/* tokens use the build's mono voice if it has one; otherwise the body face at 500. Never add a typeface just for tokens. */
.tok{font:500 .82em/1 var(--font-mono,var(--font-text));padding:.18em .42em;border-radius:6px;background:rgb(var(--ink-rgb)/.06);white-space:nowrap}
.tok--term{background:var(--ink);color:var(--paper);padding:.08em .3em}           /* sized to the heading, not the body */
.tok--input{background:var(--surface);box-shadow:inset 0 0 0 1.5px var(--ink)}
.tok--chip{font:inherit;background:color-mix(in oklab,var(--accent) 14%,transparent);box-shadow:inset 0 -1.5px 0 var(--accent)}
.caret{display:inline-block;width:.5ch;height:1em;margin-left:.06em;background:currentColor;vertical-align:-.12em}
s{text-decoration-thickness:.08em;text-decoration-color:var(--accent);color:var(--ink-3)}
```
**Contrast:** the "grey prose, ink nouns" look only works if the grey still passes AA. jawadjalal.com's `oklch(.72 …)` grey on near-white is about 2.3:1, and 96 of 160 text elements fail. Use ink at 60–65% (about 5:1) for the receding text, and let the chips and ink weight carry the contrast.

The caret blink is a finite reveal-triggered animation, not an infinite loop on the whole page. On dev-tool and creator-tool brands this replaces product screenshots in the early sections, because the copy itself proves you know the world.

### 62. Pricing as an object (ignura)
When there are 1–3 offers, draw them as a physical thing from the brand's world (tickets, receipts, boarding passes, menu cards), not as a feature-checklist table.
- **Each offer is a ticket:** a stub torn off with a perforated edge (`border-left:2px dashed`, plus two half-circle cut-outs via `radial-gradient` masks). A punch-hole radio sits on the stub. The offer's name is in the display face, and a one-line promise is in the handwriting voice: "the whole launch" / "keeps the fire going".
- **The price is the biggest number on the card:** "from" sits small above it and the unit ("one-off" / "a month") under it, in the pixel or mono voice with `tabular-nums`.
- **Live truth beside it:** a status pill with a dot, "Now booking November launches". It's a scarcity cue *only if it's true*, so wire it to a real date or omit it. Add a currency toggle when the audience is international.
- **Tags on the ticket edge:** a rotated tag ("4 weeks") and a round sticker ("monthly · one month's notice"). Each answers one buying question.
```css
.ticket{position:relative;border-radius:18px;background:var(--c1);--hole:radial-gradient(circle at 0 50%,transparent 14px,#000 14.5px);
  -webkit-mask:var(--hole) left/51% 100% no-repeat,radial-gradient(circle at 100% 50%,transparent 14px,#000 14.5px) right/51% 100% no-repeat}
.ticket .price{font:600 clamp(2.4rem,1.6rem+2.4vw,3.6rem)/1 var(--font-num);   /* --font-num: the pixel/LED/mono numbers voice from tokens.css */font-variant-numeric:tabular-nums}
```

### 63. A naming system from the brand metaphor (ignura)
Pick the brand's central metaphor and name *everything* from it: tiers, steps, the CTA, even the 404. Ignura is fire, so the tiers are **Ignite** (one launch) and **Burn** (monthly), the process ends at "lift-off", and the service cast is a fire, a campfire, a rocket and a matchstick fuse. Write the list in the Spine: `NAMING: <metaphor> → tier A, tier B, process end, CTA verb, 404 line`. When a name needs explaining, the metaphor is wrong for that item, so use a plain word instead.

### 64. Process as a journey map (ignura)
Replace "Step 1 / 2 / 3" cards with one wide illustrated landscape.
```html
<div class="journey">
  <svg viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true"><path class="route" pathLength="1" d="M20 300 C 220 300 260 120 420 140 S 700 300 860 220 1100 60 1180 80"/></svg>
  <ol class="stations">   <!-- HTML over the SVG, so labels stay real text -->
    <li style="--x:4%;--y:83%"  class="below"><b>01</b> Teardown + plan<span>…</span></li>
    <li style="--x:35%;--y:39%" class="above"><b>02</b> Film + UGC<span>…</span></li>
    <li style="--x:71%;--y:61%" class="below"><b>03</b> Polish, shots, page<span>…</span></li>
    <li style="--x:96%;--y:22%" class="above"><b>04</b> Launch day<span>…</span></li>
  </ol>
</div>
```
```css
.journey{position:relative;aspect-ratio:10/3}
.journey svg{position:absolute;inset:0;width:100%;height:100%}
.route{fill:none;stroke:var(--ink);stroke-width:3;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.6s var(--ease)}
.journey.is-in .route{stroke-dashoffset:0}
.stations li{position:absolute;left:var(--x);top:var(--y);width:16ch;transform:translate(-50%,12px)}
.stations li.above{transform:translate(-50%,calc(-100% - 12px))}           /* alternate with the path's peaks and troughs */
.stations li:first-child{transform:translate(0,12px)} .stations li:last-child{transform:translate(-100%,calc(-100% - 12px))} /* edge stations step inward */
@media (max-width:760px){                                                   /* mobile: a vertical line, not the map shrunk */
  .journey{aspect-ratio:auto} .journey svg{display:none}
  .stations{position:relative;padding-left:28px;border-left:3px solid var(--ink)}
  .stations li{position:relative;left:auto;top:auto;width:auto;transform:none;margin:0 0 28px}
  .stations li::before{content:"";position:absolute;left:-38px;top:.2em;width:16px;height:16px;border-radius:50%;background:var(--accent)}
}
```
Put the station coordinates on the path (sample `path.getPointAtLength()` once while designing, then hard-code the % values). Keep illustration props out of the label boxes. A path winds through it (an SVG `path` drawn with `stroke-dashoffset` as it enters view), with numbered station markers. Each station has a short title and a two-line body. Put the headline above it as a promise with an end point: "Four weeks, start to *lift-off*." On mobile, turn the path vertical and stack the stations down it. Don't just shrink the wide map.

### 65. The personal README page (jawadjalal)
For a personal or founder site, the page is a document, not a landing page:
- **Frame:** a single 680–760px column with 1px borders on both sides, sitting on a faint graph-paper page (`background:linear-gradient(var(--hairline) 1px,transparent 1px) 0 0/24px 24px, linear-gradient(90deg,var(--hairline) 1px,transparent 1px) 0 0/24px 24px`). A dot-matrix band forms the header.
- **Hero = profile card:** avatar, name at **20–28px**, role in ink-2, and 2–3 small buttons (email first). The person is the subject, so no monumental h1.
- **A scroll-spy table of contents** sits in the left margin (desktop ≥1280px only), with the current section in ink and the rest at 40%.
- **Ventures as a dotted-leader ledger:** `name ·········· role · metric`, using a `flex:1` leader span with a dotted `border-bottom`. Hovering a row floats a preview card of the product.
- **Small type, still accessible:** body at 15–17px (not 12–13px), secondary text at ≥4.5:1, and buttons at ≥36px tall with a 44px tap area on mobile. The audit will still flag the short page length and the small mobile h1; for this archetype those are judged, not fixed.
- **One data-art moment** that shows how the person thinks, such as a Venn of their skills with their avatar at the centre ("Where it overlaps").
- **Finale + ghost wordmark:** a voiced one-liner ("Still reading? That means something clicked. Let's talk.") and one button. Then the name at ~190px in 8–10% ink, cut off by the page edge.

### 66. Role-locked type voices (ignura)
The Loud and Playful register may run **up to 4 faces only if each has exactly one job**. Write the jobs into the Spine:
- **Statement serif or sans:** headings.
- **Body:** the reading text.
- **Pixel or mono:** prices, numbers and UI labels.
- **Handwriting:** **one** emphasised word or phrase per heading, always in the accent colour (`<em class="hand">lift-off</em>`).

The handwriting voice is the spice, so a second handwritten phrase in the same heading means you're decorating. **When the field is the accent's own hue** (a red band with a red hand word), put the word on a carrier (a tape strip or paper chip in the paper colour) and check its contrast there. The numbers slot is either a pixel/LED face or a mono, not both; inline tokens (§61) reuse it or fall back to the body face. In Quiet and Confident registers, the ≤3-family rule stands.

### 67. "Read the film / trailer / episode" and opt-in sound (ignura)
Under any hero video or launch film, add a quiet disclosure: **Read the film**, "the words on screen and the key sounds, in order". It opens the transcript as a list. That makes the video accessible, indexable and skimmable, and signals craft. No real film yet? A silent kinetic-caption cut is fine: label it as captions-only, still ship the transcript, and give any finite autoplaying caption sequence the same pause control as a video. If the site has ambient sound, it is **off by default**, behind a labelled nav toggle (a speaker icon with a strike), and the state persists in `localStorage`.

## G. Photo-led product moves (Fornax, a user-supplied screenshot)

### 68. A photo composed for the headline (Fornax)
When the page has one photograph, compose (or generate) it *around the type*, not the other way round. Reserve a clean zone (sky, wall, water, table) for the headline, put the horizon low, and put the subject in a lower third on the side away from the CTA. The zone becomes the scrim, so no overlay is needed.
- **Generation prompt, written like a shot list:** `wide 21:9 photograph, clear late-morning sky filling the top 45%, horizon at 62% height, [subject: the outcome state, e.g. "a contractor reading on a park bench, phone face-down"] in the lower-right third, a tree canopy entering top-right, 35mm, soft warm grade, no text, no logos, subject not looking at camera`.
- **Check the zone before you set type:** sample the region behind the headline (a 1/8-scale canvas average) and require ≥4.5:1 for the body line and ≥3:1 for the display line. If it fails, regenerate or re-crop. Don't add a 40% black overlay.
- **Every control on the photo needs contrast:** a ghost "white at 20%" secondary button on a pale sky is the classic failure. Make it a solid paper pill, a dark pill, or a text link with a 1px underline.
- **Show the outcome, not the product.** A person with a laptop is stock unless the picture says what changes ("the work is handled, so you're outside"). Write that sentence in the Spine; if you can't, use type or UI instead.
- **Bookend it:** re-crop the same photo for the finale band (rounded 20–28px, inset inside the page margins) with the one CTA. Use one photograph, two crops, and no third image.
```css
.hero--photo{position:relative;min-height:min(100svh,920px);display:grid;align-content:start;padding-top:clamp(7rem,14vh,10rem);text-align:center;color:#fff;
  background:url(hero.avif) 70% 100%/cover no-repeat}            /* object-position keeps the subject in frame on mobile */
.hero--photo .nav{border-bottom:1px solid rgb(255 255 255/.35)}
@media (max-width:760px){.hero--photo{background-position:78% 100%;padding-top:6.5rem}}
```

### 69. UI vignettes on crops of the photo (Fornax)
Tell the product's transformation in three cards: **input → processing → output**. Each card's top half is a crop of any shot from the series (the 4:3 supporting shots usually beat crops of the hero) (`background:url(hero.avif) <x>% <y>%/<size>`, with a different region per card: sky, sky + leaves, horizon), and a real UI fragment floats on it. The input card holds 3 incoming items with timestamps. The processing card holds the one extracted record ("Wants · Available · Budget") with a status chip. The output card holds the booked result plus the systems updated ("Confirmation sent · SMS", "Contact updated · HubSpot"). Card titles say the arc in sentence case ("It comes in cold" → "Fornax works out the job" → "It comes out finished"). The photo becomes the brand's colour field without a single decorative gradient. Inset the vignette from the top so the photo reads in the bottom 35–40% of the card. In feature rows, let a vignette **cross the photo's edge** into the empty grid column beside it (`left:-64px`); it was the strongest composition move in testing. Pair it with §56 (transformation pair) when the product converts one thing into another.

### 70. Ghost wordmark tinted from the photo (Fornax)
A variant of §27 for photo-led sites: the closing wordmark at full width, filled with a gradient sampled from the hero (`background:linear-gradient(to bottom,<sky top>,<sky bottom> 60%,var(--paper));-webkit-background-clip:text;color:transparent`), and cut off by the page's bottom edge (`margin-bottom:-.22em;overflow:hidden` on the footer). Mark it `aria-hidden="true"`, and **spell-check it against the brand name**: the reference ships "FORMAX" for a brand called Fornax.


## H. Editorial marks

### 71. Hand-drawn annotation over live text (Lantern test build)
For research, editorial, legal and education brands, the motif can be a proofreader's pen: a circle, an underline, a wavy line, a strike with an inline correction, and a margin note in the accent. The text underneath stays real and selectable.
```html
<span class="mark">206<svg class="mark-svg" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path d="M2 14 C 30 18, 70 18, 98 12"/></svg></span>
<del>212</del> <ins class="fix">206</ins>     <!-- the correction sits inline after the struck word, never absolutely positioned -->
```
```css
.mark{position:relative;white-space:nowrap}
.mark-svg{position:absolute;left:-4%;bottom:-.28em;width:108%;height:.5em;max-width:none;overflow:visible}  /* max-width:none: tokens.css caps svg at 100% */
.mark-svg path{fill:none;stroke:var(--accent);stroke-width:1.6;stroke-linecap:round;vector-effect:non-scaling-stroke}
.mark-svg{clip-path:inset(0 100% 0 0);transition:clip-path .7s var(--ease) var(--d,0s)}   /* wipe it in left to right */
.is-in .mark-svg{clip-path:inset(0 0 0 0)}
.fix{text-decoration:none;font-style:italic;color:var(--accent)}
del{text-decoration-color:var(--accent);text-decoration-thickness:.08em}
@media (prefers-reduced-motion:reduce){.mark-svg{clip-path:none;transition:none}}
```
- Wipe the mark with `clip-path`, not `stroke-dashoffset`. With `preserveAspectRatio="none"` and `non-scaling-stroke`, dash lengths are unreliable.
- Overlay SVGs need `max-width:none`, because `tokens.css` caps `svg` at 100% of its inline host and silently halves them.
- An absolutely positioned correction collides with the line above when the word wraps to the start of a line, so keep `ins` inline.
- Use 3–5 marks across the page (the motif rule), and stage them in the order a reader would make them.

## I. AI-product and illustration-system moves (Answerr, Mugic, Wandor: user-supplied screenshots)

### 72. An illustration style that *is* the metaphor (Answerr)
Choose the illustration *technique* from what the brand claims, not from what's fashionable. If the brand certifies, use steel engraving and guilloché, the language of banknotes and diplomas. If it plans journeys, use painted travel posters. If it's about records and proof, use etching or blueprint. Then use that one technique everywhere: the hero band, case-study panels, portraits, compliance icons and the footer. **One ink on paper**, so it reads as a system, not a stock pack.
- **No assets?** Generate a consistent series: `steel engraving, banknote style, single navy ink (#24407A) on white, fine crosshatching, no grey fills, no text, [subject]`, and keep the subject list in the Spine. For small icons, draw SVGs with one stroke weight and `pattern` hatching.
- **Security-print hairlines** frame the band, like a certificate margin:
```css
.guilloche{background:repeating-linear-gradient(90deg,color-mix(in oklab,var(--series-ink) 22%,transparent) 0 1px,transparent 1px 7px);height:56px}   /* tint with the series ink; grey reads as a barcode */
.band{display:grid;grid-template-columns:clamp(24px,6vw,96px) 1fr clamp(24px,6vw,96px)}
.band::before,.band::after{content:"";background:repeating-linear-gradient(90deg,var(--hairline) 0 1px,transparent 1px 6px)}
```

### 73. Show the output artifact, not the app (Answerr)
When the product produces something a person keeps or shares (a credential, a score, a report, an itinerary, a certificate), make *that* the hero object instead of a dashboard. Give it every field the real thing has: a status ("✓ Verified"), the person or subject, the headline number with its scale (`87 /100`), a 4–6-part breakdown, a rank ("Top 8%"), the issuer, and a verification URL in mono. Set it on the brand's illustration (§72) like a document on a desk: centred over the clear zone, at most ~58% of the plate's width. On mobile, take a 5:4 crop of the plate anchored at the bottom and let the card overlap it by about a quarter, rather than shrinking the plate. **Default finale:** the same plate re-cropped *without* the artifact, with the closing headline on the now-empty wall ("Two chairs, one conversation."). It answers "what do I get?" in one look. Use an obviously fictional name and mark it `role="img"` with an `aria-label` that reads the card aloud.

### 74. Stepped scale diagram (Answerr)
"From one person to an entire institution": three square tiles stepping diagonally down-right, each one bigger in scope (individual → team → institution). Each tile has a ■ label at its top-right corner and a one-line icon drawing inside.
```css
.steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));width:min(100%,560px)}
.steps li{aspect-ratio:1;background:var(--paper-2);position:relative}
.steps li:nth-child(2){grid-column:2;grid-row:2}.steps li:nth-child(3){grid-column:3;grid-row:3}
.steps li span{position:absolute;left:calc(100% + 10px);top:0;white-space:nowrap}   /* the label sits beside the tile's top corner */
@media (max-width:760px){.steps{grid-template-columns:1fr}.steps li{grid-column:auto!important;grid-row:auto!important;margin-left:calc(var(--i)*18%)}}
```

### 75. The input is the hero, drawn as a domain object (Mugic, Wandor)
For AI tools whose core action is a prompt, the hero is a **working form**, not a screenshot of one:
- **Make it an object from the domain:** a radio or synth for music (speaker-grille dot matrix, round hardware buttons, a plastic lip), a boarding pass for travel, an index card for writing. Keep the textarea itself plain and readable.
- **A live placeholder** types one specific example ("a dreamy indie pop track with warm harmonies, delicate guitars…"), so a visitor learns what a good prompt looks like.
- **Prompt starters** below: 3–6 cards (mood, use case, persona), each with a short title, the example prompt in quotes and **"Use prompt →"**, which fills the hero input and focuses it. A preview button (▶ or 🔊) is allowed only if there's real audio.
- **Bookend it:** the same input returns as the finale CTA ("Let's make this trip yours"), so the page can be started from the bottom.
```js
document.querySelectorAll('[data-prompt]').forEach((b) => b.addEventListener('click', () => {
  const ta = document.querySelector('#prompt'); ta.value = b.dataset.prompt; ta.focus();
  ta.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}));
```
**Picker variant** (the input is a choice, not text: a toy box, a mood board): `aria-pressed` toggles, a visible "n of 3" counter, a cap with a live-region message on the extra pick ("Put one back to swap in the rocket"), and the live placeholder becomes a typed example *output* line that turns real once the picks are made. Prompt starters are redundant when the input already shows the options. **The finale form shares state with the hero form**, so the same picks appear in both; two independent forms feel broken. A typed placeholder still needs ≥4.5:1 (ink at .64 on white is the floor). If submitting can't produce a real result, show a clearly labelled **sample** result ("this preview shows the example route, whatever you type").
It needs a `<label>` (visually hidden is fine), a real submit button with a task verb ("Generate", "Plan my trip"), and `aria-live` for the result or error.

### 76. Finale illustration that rises from the bottom edge (Answerr, Wandor, Mugic)
End the page on the brand's world instead of a grey footer. The footer columns sit on paper, and below them a full-width illustration rises from the bottom edge and is cut by it:
- **A skyline from the illustration system** (Answerr's engraved capitol building).
- **A second collage that completes the hero's** (Wandor: the hero has one set of landmarks, the footer the rest of the world).
- **A constructed wordmark:** the brand name built from domain glyphs (Mugic's letters made of musical notes) in the section colours. This is a drawn cousin of §27 and §70, so spell-check it too.

**Footer structure over finale art** (reader feedback on the Haul build):
- Nothing touches the art: no text line or hairline runs into it, and there's clear air (≥ 48px) between the last line of text and the art's highest point.
- The legal line (© year, company) sits on the left under the brand, as a second line, not floating at the bottom right beside the art.
- Terms and Privacy are real links to a real page.
- Link columns share one grid; don't left-align the columns and then right-align a stray note.
- No clever colophon one-liners ("Printed in two inks…", "This page: 1 box, 0 any"). Readers didn't get them and called them AI. A footer says plain things.

**Deckled edges as section edges:** cut a strip from a plate's own brushed or torn edge and mask it into the band, so every coloured field starts and ends like a print. In the SuperCompress build it was the biggest finish gain after the hero.

The art starts **below the footer's base row**, so nothing like a clock or a copyright line sits on chimneys; with a flat-topped sky, pull the image up under the footer with a negative margin and mask its top so the columns sit on the sky itself. Keep it `aria-hidden="true"`, ≤ 40vh tall, and cropped to its central object on mobile (`object-position:50% 100%`). **Shaped edges:** when the hero ends in illustration, let its bottom edge follow the art's silhouette (`clip-path:path(...)` or an SVG `mask`) instead of a straight line, as Wandor's die-cut collage does.

### 77. Split header over a staggered vignette tray (BugScout)
A hero for a product with three capabilities and no single hero image:
- **Split header:** the h1 sits in the left ~55%. The lede and the two CTAs sit in the right column, top-aligned to the h1's cap height, not centered under it.
- **The tray:** below it, a full-width grey tray (`--paper-2`, radius 24px, 20px padding) holds three white cards. **The middle card drops** ~200px lower, so the row reads as a sequence, not a grid.
- **Each card** holds one small UI vignette (a prompt with a sparkle node wired below it, a list of checked runs, a flow with dashed connectors to image nodes) and a one-line caption in the display face at ~22px at the bottom-left.
```css
.tray{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;padding:20px;border-radius:24px;background:var(--paper-2);align-items:start}
.tray > :nth-child(2){margin-top:clamp(64px,10vw,136px)}   /* ~136px keeps the middle card readable in the first viewport */
.tray > *{min-width:0}   /* a white-space:pre diff inside a vignette otherwise blows the column wider than the tray */
.tray .card{background:var(--surface);border-radius:18px;padding:28px;display:grid;gap:28px;align-content:space-between;min-height:340px}
@media (max-width:760px){.tray{grid-template-columns:1fr}.tray > :nth-child(2){margin-top:0}}
```
**Image-beside variant:** when the hero image's empty zone is on the left, stack the copy left over the paper and put the image right, parked on the tray's top edge (Haul's van sits with its wheels on the tray). At 1440×900, about 330px of the tray shows above the fold. Put **real content in the vignettes**: the reference's three identical "Debugger" rows are filler. Write three real runs ("checkout.js · TypeError fixed · 2s", …). Each card's vignette plays its one action once on view.

## J. Directory and index moves (mkdir.directory)

### 78. The list is the page (mkdir.directory)
For a directory, index, changelog or ranking, skip the hero, cards and feature sections: a two-line intro, then **one ranked list set big**, then the footer. That's about 4 viewports.
- **Rows:** the name at ~48px in the display sans at 500 (−0.02em, line-height 1.1). A tiny mono rank number (`01`–`30`) sits in the left gutter and the count (▲ 300) at the right edge in mono 12px. Hairlines between rows.
- **Hover:** the row tints (`--paper-2`) and a small preview thumbnail follows the cursor. Use real screenshots of the linked items, so the list stays type and the image only appears on intent.
- **Ranking by the people who use it:** a vote button per row ("one vote per directory; the order updates on your next visit"). Don't reorder under the cursor.
- **Honest states** on the suggest form: "Thanks. X is in the review queue." / "X is already on the list."
- **Two families, two text colours** (ink and a grey at ≥4.5:1). The restraint is the design.
```css
.rank{list-style:none;margin:0;padding:0;counter-reset:r}
.rank li{display:grid;grid-template-columns:3ch 1fr auto;align-items:baseline;gap:12px;padding:6px 8px;border-bottom:1px solid var(--hairline);border-radius:6px;transition:background-color .2s var(--ease)}
.rank li::before{counter-increment:r;content:counter(r,decimal-leading-zero);font:500 11px/1 var(--font-mono);color:var(--ink-3)}
.rank a{font:500 clamp(1.75rem,1rem + 2.4vw,3rem)/1.1 var(--font-display);letter-spacing:-.02em;color:var(--ink);text-decoration:none}
.rank li:hover{background:var(--paper-2)}
.rank .votes{font:500 12px/1 var(--font-mono);color:var(--ink-3);font-variant-numeric:tabular-nums}
.peek{position:fixed;width:180px;aspect-ratio:16/10;border-radius:6px;pointer-events:none;opacity:0;transform:translate(16px,16px) scale(.96);transition:opacity .15s,transform .2s var(--ease)}
.peek.is-on{opacity:1;transform:translate(16px,16px)}
@media (hover:none){.peek{display:none}}
```

### 79. The wordmark as a window (mkdir.directory)
End on the name at full width, cut out of the page so a **live texture shows through the letters**: marbling, ink in water, slow noise. It's the one moment of motion on an otherwise still page. The cheap version needs no WebGL mask: draw the texture on a canvas, then lay a paper-coloured block over it with the wordmark in black and `mix-blend-mode:screen`. Screen keeps the paper white and lets the canvas show only through the black letters. (On a dark page, use a dark block, white letters and `multiply`.)
```html
<div class="window" aria-hidden="true"><canvas></canvas><p class="window-mark">mkdir</p></div>
```
```css
.window{position:relative;overflow:hidden;isolation:isolate}
.window canvas{position:absolute;inset:0;width:100%;height:100%}
.window-mark{position:relative;margin:0;background:var(--paper);color:#000;mix-blend-mode:screen;
  font:600 clamp(6rem,2rem + 18vw,22rem)/.8 var(--font-display);letter-spacing:-.05em;text-align:center}
```
Keep the texture slow (one full cycle ≥ 20s) and pause it offscreen and under reduced motion (the audit's `perf.offscreen` checks the first). Spell-check the wordmark (§70).
