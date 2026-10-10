# Cluster C — Immersive / WebGL / Experiential studios: LIVE CLIENT WORK

Researcher notes, 2026-10-07. Evidence = `tools/analyze.mjs` runs (data.json + screenshots in `sites/<slug>/`) on live client sites, plus portfolio/Awwwards pages for the client→agency attribution and live URLs.

> **Read this first: most of these sites never got past their preloader in headless Chrome.**
> WebGL-first client sites gate all content behind an asset loader. In software-rendered headless Chrome, 8 of the first 14 client runs stayed on the loader (or a "click to enter"/sound gate) for the full ~3 s intro plus the whole scroll pass. That is a finding in its own right, not a tooling failure to hide:
> - What we *can* measure reliably on these sites: **preloader design, entry gates, fonts loaded, type tokens of the visible chrome, CSS easing/duration tokens, GSAP/Lenis/spring values mined from the JS bundles, and the colors.**
> - What we *could not* see for most of them: the 3D scenes themselves. Where I describe 3D content, I mark the source (Awwwards jury notes/agency case page) and say I didn't see it.
> - Sites that rendered real content: **Atlas Motion (Lusion), illoca (Unseen), BOSS Dubai (Dogstudio, loader + 3D logo + gate), Active Theory homepage (full WebGL), 100 Lost Species (Immersive Garden, intro only), Miu Miu (Merci-Michel, gate only)**.
> - Lesson for the skill: **if an agent builds an immersive site, the loader *is* the first impression, and often the only one** for slow devices, bots, link-preview crawlers and impatient users. Design it like a hero.

---

## 1. Sites analyzed

| # | Client / project | Live URL | Agency | Category | Stack (measured hints + attribution) | Rendered in headless? |
|---|---|---|---|---|---|---|
| 1 | Atlas Motion Systems (BLDC motors, defense/robotics) | https://atlasmotion.com | Lusion | B2B hardware brand site | Astro + three.js (custom engine, no GSAP in bundle), SplitText-like char splitting, 3 canvases, sticky ×8 | **Yes** — loader + hero + several sections |
| 2 | Oryzo AI ("AI coaster", self-initiated spoof product) | https://oryzo.ai | Lusion | Product launch microsite (self-initiated) | Astro + three.js, 6 canvases, 55.5 viewports tall | No — stuck on loader |
| 3 | EverSwap (DeFi protocol) | https://everswap.com | Lusion | Fintech/crypto product site | Astro + three.js, 6 canvases | No — loader stalled at 35% then reset |
| 4 | Choo-Choo World (wooden train-track builder) | https://choochooworld.com | Lusion | Browser toy / game | three.js, Lenis-style `lerp:.1` | No — loader bar at ~10% |
| 5 | David Whyte — Companion Portal intro | https://davidwhyte.com/experience/ | Immersive Garden | Author/membership; "watercolor experience" | three.js + GSAP (heavy) + Lenis + SplitText, custom cursor, WordPress | Partial — loader, signature reveal; the watercolor WebGL did not show |
| 6 | Chartogne-Taillet (Champagne house) | https://chartogne-taillet.com/en | Immersive Garden | Luxury wine | GSAP (in bundle), no DOM content captured | No — blank cream page (#FDFCF5) |
| 7 | 100 Lost Species (digital memorial) | https://www.100lostspecies.com/ | Immersive Garden + 60fps | Culture / cause | GSAP (linear-heavy timelines), Contentful | Partial — intro gate + shard vortex frame |
| 8 | Cartier Watches & Wonders 2026 | https://www.cartier.com/en-fr/watchesandwonders | Immersive Garden | Luxury product launch inside e-com shell | three.js/GLSL/Blender per Awwwards; Motion springs in bundle | No — geo "Welcome" modal blocked every frame |
| 9 | GQ × Audemars Piguet — The Extraordinary Lab | https://www.gq.com/sponsored/story/the-extraordinary-lab | Immersive Garden | Sponsored editorial experience | WebGL, Nuxt, Blender (Awwwards) | No — "GQ × AP" splash only |
| 10 | The Symphony of Vines (Château Oublié) | https://symphonyofvines.com (→ symphonyofvines.unseen.co) | Unseen Studio | Wine brand cinematic story | three.js, GSAP, Cinema 4D | No — wordmark + contour-line loader |
| 11 | Hubtown (Mumbai real-estate developer) | https://hubtown.co.in | Unseen Studio | Corporate real estate | Nuxt + three.js + Theatre.js + GSAP ScrollTrigger + Lenis | No — segmented loader cycling |
| 12 | illoca (AI design engine for architects) | https://illoca.unseen.co | Unseen Studio | SaaS / AI product launch | Nuxt + three.js + Theatre.js + Lenis (`lerp:.06`) + GSAP | **Yes** — loader → aperture reveal → hero |
| 13 | 365 — A Year of Cartier (yearbook) | https://365ayearof.cartier.com/en/ | 14islands | Luxury editorial | Next.js + three.js + Lenis + Framer Motion springs | No — gold-card loader (0→68%) looping |
| 14 | Miu Miu — "A House That We Shaped" bag campaign | https://immersivebags.miumiu.com | Merci-Michel | Fashion campaign microsite | three.js + split text | Partial — sound/enter gate only |
| 15 | BOSS Dubai Immersive Experience (Halo store reopening) | https://boss-halo-store.dogstudio.co/ | Dogstudio (DEPT) | Fashion retail launch, 360° panorama | Custom WebGL canvas + GSAP (power3.inOut) | **Yes** — loader + 3D logo + Dubai question gate |
| 16 | *(agency homepage)* Active Theory | https://activetheory.net | Active Theory | Studio site | Proprietary engine (Hydra), baked Cycles lightmaps, WebGL particles | **Yes** — WebGL rendered fully |

Addendum runs: #15 and #16 were added after the first draft (see §2.15–2.16). I didn't analyze vault.xyz. Active Theory's recent client work is almost all ephemeral or gated: museum.xbox.com returns 404 and I couldn't find a live 2025–26 client URL. Their homepage data file (`activetheory.net/assets/data/uil.*.json`) lists the scene assets. Every environment is lit with **Cycles-baked lightmaps plus PBR MRO/normal maps**, per-scene camera presets (`CAMERA_Element_*_position/lookAt/fov/wobbleStrength/lerpSpeed`) and matcaps. That tells you how they get "film-quality" WebGL cheaply: bake the light, then stream textures.

---

## 2. Per-site teardowns

### 2.1 Atlas Motion — Lusion (atlasmotion.com) ★ best-measured site in the cluster
- **Preloader (0–1.8 s):** dark #181818 field with a faint full-viewport **architectural grid** (1px lines ~#2a2a2a; the page is built on a **24-col grid, 20px gap**). Center: a **radial "spoke" ring** (looks like a motor stator or turbine; the ring of ticks rotates/fills) above the wordmark ATLAS in wide-tracked caps. Two micro-labels, **MOTION** (upper-left of the logo) and **SYSTEMS** (lower-right), each paired with a small white bar. The bars and labels **swap sides between frames**, so the brand name gets "assembled" as a kinetic diagram. A loader that reads like a spec sheet.
- **Hero (3.2 s):** headline in two offset blocks, **"THE PHYSICAL LAYER"** top-left and **"OF AUTONOMY"** indented right underneath (staggered, not centered, so the line break works as a layout move). SuisseIntl 500, uppercase, cream #EEE8E8 on #181818. Grid lines stay visible behind the type. Nav top-left: logo plus four **outlined micro-tabs** (PROCESS · THESIS · WRITING · CONTACT US), each a 1px-bordered box with ~9px caps. Top-right: a single solid cream pill **ORDER NOW**. A thin vertical **scroll progress bar** at the right edge is also visible.
- **Below hero:** a body block ("Atlas builds motors for drones and robots, developed for your product and manufactured on our production lines as you scale.") set **ragged with an indented last-line shape**, at 16px/-0.034em. Then **"THE RIGHT MOTOR FOR THE MISSION."** small, centered, alone on black (a breath section). Then a scroll-scrubbed **word-by-word fill** paragraph ("Autonomous **platforms**…": already-read words go cream, unread ones stay ~50% #CCCBBD), then a split headline whose letters assemble ("BU… / …ION.").
- **Chapter "BUILT TO RAMP WITH YOU":** full-bleed matte-painting landscape (pink-dusk mountains) with a **3D drone** (rendered model) hovering mid-frame. Headline right-aligned in two lines over the sky; the paragraph sits lower-left on the image, also with word-fill.
- **Numbered process:** "01 INTEGRATE / EVALUATE / MANUFACTURE / INNOVATE". Single words at **144px, weight 500, -0.030em (−4.3px), line-height 0.9**. Index numerals at 34px/300.
- Later scroll frames returned to the logo/loader screen. Most likely the analyzer's wheel scrolling reached the end and triggered a route/page transition that replays the brand sting (not verified).
- **Typography (measured):** one family, **SuisseIntl** (300 body, 500 display). Sizes **13 / 14 / 16 / 24 / 32 / 34 / 144px**. Tracking negative everywhere: **−0.034em @16, −0.030em @14–144**. Body is weight **300**, so light body under heavy caps display. Uppercase share 13%.
- **Color:** #181818 bg, #EEE8E8 text, #FFFDE0 warm highlight, rgba(204,203,189,0.5) for un-revealed words, #121211 panels. One mix-blend: `hard-light`. `blur(4.8px)` ×27 is used on in-transition elements.
- **Motion tokens:** CSS `cubic-bezier(0.22,1,0.36,1)` (easeOutQuint-ish) and `cubic-bezier(0.76,0,0.24,1)` (strong in-out for panels). Durations are short for UI (0.12–0.42 s). No GSAP in the bundle; Lusion runs its own animation and engine code.
- **Nav micro-detail:** link labels are rendered as **doubled per-letter spans** (the DOM text reads "P\nP\nR\nR\nO\nO…"). Each letter is stacked twice for a **vertical letter-roll hover**: on hover every glyph slides up 100% to reveal its clone, staggered per char. Lusion uses the same pattern on oryzo.ai.
- **Copy voice:** declarative, industrial, sentence-case body under shouty caps. Example: "We turn new motion system designs into real, testable hardware in weeks, not months."

### 2.2 Oryzo AI — Lusion (oryzo.ai)
- Self-initiated spoof (a cork coaster "reimagined for the AI era"). Lusion uses it as a lead-gen piece; the final heading is *"WE CAUGHT YOUR ATTENTION WITH A NON-EXISTENT PRODUCT. IF WE CAN SELL A COASTER, IMAGINE WHAT WE CAN DO FOR YOUR BRAND."*
- **Preloader (all frames, desktop + mobile):** olive-green field (~#4A5B3C visually) with a dotted construction grid. Center is a **coaster drawn as a vector "Bézier construction diagram"**: dashed circle outlines, orange anchor points and handles (#DC5000) on all four sides, and a translucent **pie-sweep fill** that rotates as the progress indicator. The loader is literally the product's CAD drawing, so you are "watching it be designed" while it loads.
- Page is **55.5 viewports tall**, a very long scroll-driven product film (scenes not visible headless).
- **Type:** halyard-display-variable 500, **all-caps (uppercase share 100%)**; 12px UI and **40.8px headlines with 0.9 line-height** (36.72px). Secondary fonts are loaded for specific moments: Literata (serif) and DM Mono.
- **Color:** #100904 near-black brown, #FFEDD7 cream text, #DC5000 orange accent, #382416 button fill. The product's cork-and-coffee palette runs through all of it.
- **Decorative system:** `repeating-linear-gradient(90deg, #FFEDD7 0 2px, transparent 2px 4px)` ×15, i.e. **CSS hatch/stripe patterns** used as texture and dividers, plus vertical variants. Heavy `blur(8.55px)` ×91 on elements waiting to reveal: **blur-to-sharp is the reveal primitive.**
- **CTAs:** pill (36px radius, 14.4×24 padding, 12px caps) in #382416 with a 2px orange border that appears on hover. A tiny dashed-border pill "COPY URL" (1px dashed #FFEDD7).
- Nav uses the same doubled-letter roll hover (INTRO / FEATURES / PRODUCT / CONTACT). One CSS bezier stands out: `cubic-bezier(0.3,0,0.66,-0.3)`, an **anticipation/back-in** curve for exits.
- Keyframes found: `hero-card-dot-blink`, `bikini-btn-pulse-animation`, `grip-instruction-wheel-dash`. These are tiny looping UI affordances (blinking status dot, "scroll" wheel dash).
- Split text: `lines,chars` ×16, `chars` ×6, `lines` ×6, `words` ×3.

### 2.3 EverSwap — Lusion (everswap.com)
- **Preloader:** deep green #1F3428-ish field; a **rotated-square (diamond) emblem** that gains inner strokes as it loads; **percentage counter in a light serif** centered low (0% → 17 → 25 → 29 → 33 → 35%). In headless it reset to 0% and never completed.
- **Type (DOM-measured even though hidden):** display **Feature Display weight 200** (hairline) at **103.9px with line-height 0.8** (83.1px), plus 76px; body **Britti Sans** 300/400/600 at 15–19px. Headlines are split into single-word lines: "One / Pool / Flows / LPs / Borrowers / Traders / ReDeFined / Climb with EverSwap". Each is a scroll chapter.
- **Color:** #FBFFF4 (green-tinted white) text, #203727 deep green. One accent family only.
- Blur reveal again: `blur(4.5px)`, `blur(5.19px)`, `blur(18.9px)`.
- Logo marquee keyframes `logo-list-animA/B` (two offset tracks).
- **Lesson:** a crypto product presented with a **hairline serif-ish display at 104px and a green-on-green palette**, not neon. That restraint is the luxury signal.

### 2.4 Choo-Choo World — Lusion (choochooworld.com)
- A toy, not a landing page. The UI layer is the useful part: it shows how a studio does **"tactile toy UI" in pure CSS**.
- **Loader:** chunky multicolor bubble wordmark ("CHOO CHOO! WORLD", each letter a different saturated color, letters wobble) above a **pill progress bar** with an inset glow (orange fill on a light-blue track).
- **Buttons:** stacked hard shadows such as `0 6px 0 #91C5E8, inset 0 -2px 10px rgba(120,207,255,.6)`. A **solid offset shadow (no blur) plus inner glow** makes plastic-toy keycaps. Gradients are vertical candy pairs: `#DB07FE→#7211BE`, `#07B9FE→#1160BE`, `#FFC806→#EB7100`.
- **Easing:** `cubic-bezier(0.34,1.56,0.64,1)` ×48 (easeOutBack, overshoot ~10%), the signature "pop". Also `cubic-bezier(0,0.51,0.58,0.99)`, `cubic-bezier(0.5,-0.41,0.02,1)` (anticipation), and durations 0.4/0.5/0.7/1.6 s. Keyframes: `wiggle-animation`, `pop-animation`, `polaroid-in/out`, `scale-pop-animation`, `wiggle-logo`.
- Fonts: Fredoka SemiBold (display), Karla (UI).
- Graceful-failure copy is built in: headings "Not supported device", "Not supported browser", "Not supported WebGL", "Please rotate your device". **Every immersive site needs these states.**

### 2.5 David Whyte Companion Portal "experience" — Immersive Garden (davidwhyte.com/experience/)
- **Preloader:** warm paper #EFEAE2 (an off-white rather than pure white). A **thin circular progress ring** (~1px stroke arc that grows clockwise) with "Loading" in tiny sans inside, and below it a 2-line serif teaser in ~12px: *"Access David's library to discover his poems, essays, courses and short films"*. The loader carries the value proposition.
- **Brand sting:** a cut to **pure black** with David Whyte's **handwritten signature** drawn in white (a stroke-draw reveal), with a short hairline under it. That works as a cinematic title card. Then the page returns to paper.
- **Type:** **Canela Text weight 100** (hairline serif) for display at **86px** ("David Whyte") and **52px** H2 ("Become a companion to David Whyte's work"), lh 1.24. **Roobert** 300/400 for UI and body at 12/14/16/18px. Tracking normal; the one exception is −0.025em @20.
- **Motion (richest bundle in the cluster):** CSS `cubic-bezier(0.19,1,0.22,1)` ×83 (**easeOutExpo**, the house curve), `cubic-bezier(0.455,0.03,0.515,0.955)` (easeInOutQuad), `(0.25,0.46,0.45,0.94)`, `(0.23,1,0.32,1)`, `(0.77,0,0.175,1)` (easeInOutQuart, for panel wipes). Durations: **0.8 s (×44), 0.3, 1.0, 0.6, 1.2, 1.8, 3 s**.
- **GSAP:** `power2.out` ×40, `power3.out` ×33, `power4.out` ×17, `power3.inOut`, `sine.inOut`, `expo.inOut`. Durations .6/.8/.4/1.2. Staggers: **.1, .02 (chars), {each:.1, from:"end"}, {each:.2, from:"center"}, {each:.03, from:"end"}**. Reverse-order and center-out staggers are their signature. ScrollTrigger starts: "top 92%", "top 55%", "top 10%", "bottom top". SplitText `lines`, `lines, words`, `chars,lines`.
- **Lenis** with `lerp:1` in one config (i.e., smoothing effectively off for some instance; a mixed setup).
- **Custom cursor** (`cursor-w`, hidden on mobile/tablet). Fixed `loader-experience` layer.
- **CTA:** white 4px-radius buttons "Subscribe – $75 / year", "Gift – $75 / year" at 16px, padding 16×29. The commerce is plain and legible beneath the poetry.
- **Accent:** a single warm ochre #D8914C.
- Layout: **24-col grid, 0 gap**.
- Copy: quiet, second-person, literary. "An online archive of a lifetime's work, talks and films."

### 2.6 Chartogne-Taillet — Immersive Garden (chartogne-taillet.com/en)
- Blank cream (#FDFCF5) in all frames. The DOM was empty at capture, so this is a fully JS/WebGL-rendered site waiting on assets or an age gate.
- From the bundle: GSAP eases **power1.out ×17, back.out(2) ×17**, power1.inOut, power4.inOut/out; long durations **3 s ×37, 2 s ×29, 2.5, 4, 5 s**. That suggests slow, painterly, ambient timelines (vineyard/landscape) plus springy UI (back.out(2)). Stagger `{from:"edges", amount:.2}`.
- Meta copy shows the voice: "In the 7th century, the villages' wine growers, situated in Merfy, drew on the heritage of the Benedictine monks…". Heritage-first, centuries as the unit of time.

### 2.7 100 Lost Species — Immersive Garden + 60fps (100lostspecies.com)
- **Concept (Awwwards description):** "In 100 seconds, 100 lost species are remembered, before the site itself disappears". A memorial that **self-destructs on a timer**. Time is the interaction model.
- **Intro gate (seen):** pure black. A tiny **square-framed line-icon** at the top cycles through species pictograms (bird, beetle, insect…). Centered title in **Reckless Neue light (100/300)**, about 3 lines: *"100 Lost Species, / A Journey Through / Extinction"*, rendered at roughly 56–64px. Below it, a 2-line ~11px sans paragraph (Enduro 300): *"Lost species but not forgotten. It's not just a list, it's a digital memorial, a wake-up call for humanity…"*. Then a **boxed 3-digit counter "036" → "100"** that doubles as the progress indicator and the enter button. Credit line: "A website by **Immersive Garden** and **60fps**".
- **Transition (seen in one frame):** a **vortex of rectangular image shards** spiraling around the title (cards at different depths and opacities, arranged on a ring) as the experience starts. Then the title fades to ~20% and the counter resets to "000".
- **GSAP:** `linear` ×108. Most tweens are linear because they're **time-based** (the 100-second clock) rather than eased. Also power2.inOut ×14. Durations **3 s ×56, 2 s ×33, 2.5 s ×22**. Staggers .15/.03/.05/.01.
- **Lesson:** a cause site can be a single gesture. Linear easing is right for clocks and inevitability; it would be wrong for UI.

### 2.8 Cartier Watches & Wonders 2026 — Immersive Garden (cartier.com/…/watchesandwonders)
- Not captured: Cartier's geo modal ("WELCOME — Orders made on this Cartier e-boutique will be delivered to France addresses only…") sat on top in every frame. The page **lives inside the cartier.com e-commerce shell** (full mega-nav, 258 links), so the immersive layer is embedded, not a standalone microsite.
- **Measured tokens:** body bg **#7C6758** (warm taupe, the immersive canvas color behind the modal). Custom W&W 2026 fonts **BrilliantCutProWW2026 500** and **FancyCutCondProWW2026 300**. The hero line "WATCHES & WONDERS" is set at **54px condensed light caps**, and "WATCHMAKER OF SHAPES, MASTER OF CRAFTS" at 24px. UI tracking **0.067em @12px** (×72): luxury caps are always tracked open. Accent red #C10016 (the Cartier red as a 2px rule on the modal top).
- Motion: `cubic-bezier(0.4,0.9,0.3,1)` ×24 (fast-out, soft land). Springs `stiffness:500, damping:25`, `stiffness:550`. Grain/noise flagged present. Custom cursor present. `mix-blend: multiply` ×1.
- Awwwards tags: Three.js, GLSL, Blender, Scrolling, Gestures.

### 2.9 GQ × AP "The Extraordinary Lab" — Immersive Garden (gq.com sponsored)
- Only the splash was captured: black, a tiny **"GQ × AP"** co-brand lockup centered (~14px). A custom cursor and a fixed `splashScreen`. Header chrome is just **BACK** and **SOUND** (GT-America 500, 11px caps).
- `background-clip:text` ×1 and a gradient sweep `linear-gradient(90deg, #fff, #fff 25%, rgba(255,255,255,.4) 50%, …)`, i.e. a **shimmer-sweep text** (a "loading" shine moving across the label).
- CSS eases are the full Penner set: `(.12,0,.39,0)` sine-in, `(.61,1,.88,1)` sine-out, `(.65,0,.35,1)` cubic-inOut, `(.83,0,.17,1)` expo-inOut, `(.33,1,.68,1)` cubic-out. Plus `cubic-bezier(0.29,0,0.34,1)`.
- 9 iframes: it's embedded in GQ's ad/CMS frame. Brand experiences inside publisher shells must survive hostile host pages.

### 2.10 The Symphony of Vines — Unseen Studio (symphonyofvines.com)
- **Loader (seen):** near-black **#0A0901**. Centered small stacked wordmark, *"The / SYMPHONY / OF VINES"*, with "The" in italic above the caps. Beneath it, a **thin jagged contour line** (a terrain cross-section in dim bronze) spans ~70% of the width; it is the progress line and foreshadows the terrain.
- **Per Awwwards:** "interactive cinematic journey… creation story of Château Oublié's terroir, which spans millennia". **Mouse-responsive terrain deformation, animated rivers**, chapter titles. Animations/Transitions dev score 9.0.
- **DOM chrome (measured):** fixed header with "Unseen Studio" plus email; a **chapter-selector** (fixed, desktop only); **chapter-subtitles** (serif, 20→32px); a **skip-chapter** button; a fixed "world-apart-intro" at 100lvh; and a `story__end` section. In short: **film chrome** (chapters, subtitles, skip) on a website.
- **Type:** display **Palace** (a high-contrast didone) at **150px caps, −0.030em, lh 0.8** ("SYMPHONY OF VINES"); **PalaceItalic 105px −0.043em** for "The"; 96px "END". Body is **Bellefair** 15px. NeueMontreal italic is used for small labels. Overall: a serif-italic + serif-caps pairing at huge sizes with tight negative tracking.
- **Color:** #E1D9D1 bone text, #9C6E49 bronze accent, #0A0901 black, #F4F0EC paper (end/about state).
- **Motion:** CSS `cubic-bezier(0.76,0,0.24,1)` (easeInOutQuart), `(0.16,1,0.3,1)` (easeOutExpo-ish), `(0.25,1,0.5,1)`, `(0.37,0,0.63,1)` (sine inOut). Ambient loops of **12 s, 14 s, 30 s, 50 s** (slow drifting elements). GSAP power2.inOut/out, `elastic` ×2. Durations 3–6 s for scene beats.

### 2.11 Hubtown — Unseen Studio (hubtown.co.in)
- **Loader (seen):** navy-black **#020A18**. Small left-aligned block at about 1/4 height: a row of **13 tiny squares** acting as a **segmented progress bar** (lit squares sweep like a scanner), "LOADING CONTENT" under it, and a "22%" readout above-right. All in **Commit Mono 8–9px, uppercase, +0.16em tracking**, color #D5E0FF. The loader looks like a HUD or architectural survey instrument. It never completed headless.
- **Per Awwwards:** intro sequence with video, **mouse-reveal on maps**, zoom transitions, map navigation.
- **Stack:** Nuxt + three.js + **Theatre.js** (keyframed camera paths) + GSAP + Lenis.
- **GSAP (rich):** `power2.out` ×48, `power2.inOut` ×30, `power2.in` ×17, `back.in(1.8)` / `back.out(2.0)` ×3, expo.inOut. Durations **1 s ×131** (a single house duration), .5, 1.15, .66, 1.33. **Stagger .033 ×19** (≈ 1/30 s per char). ScrollTrigger `"top 80%"` ×46 is the standard reveal trigger, plus `top bottom`, `bottom top+=50%`.
- CSS `cubic-bezier(0.2,0,0,1)` ×18 (Material "emphasized" curve). `backdrop-filter` ×5 (frosted panels over 3D). sticky ×6. A vertical fixed side indicator (`fixed top-1/2 -translate-y-1/2`), i.e. **section dots/progress on the side**.
- **Lesson:** a corporate real-estate developer, presented as a navigable 3D city map with a mono HUD. The "serious" category becomes immersive through **cartography**, not spectacle.

### 2.12 illoca — Unseen Studio (illoca.unseen.co) ★ rendered, highly transferable
- **Background:** cream **#EADFC9 / #E5D6BC** with a **1px blueprint grid**: `linear-gradient(90deg,#D3C9B5 1px,transparent 0), linear-gradient(#E3D9C3 1px,transparent 0)`. Tracing paper. Tiny mono coordinates sit top-left (`coords`, Architect Pro 12px) and hello@illoca.com top-right in a handwritten font.
- **Loader:** the logo, a **2×2 tile glyph** (stacked lines / up-chevron / circle / quarter-shape, in #3B60C5 blue), centered, assembling tile by tile.
- **Aperture reveal (seen):** the logo gives way to a **small landscape window** (~14% of the viewport) showing the hero illustration. Four fixed grid panels (`js-hole-left/right/top/bottom`) then **retract outward** until the image is full-bleed under the headline. It's a 4-sided clip/mask "hole" expanding, a portal you zoom into.
- **Hero:** *"Design at the speed of thought"* in **F37 Analog 500 at 111px**, #373737. The last word "thought" is **mid-reveal in a gradient fade**, and **handwritten annotations** flank the headline ("ARCHITECTURAL" underlined at left; a scribbled "not software" struck at right), like an architect's markup on a print. The hero image is a **flat duotone illustration** (Klein-ish blue #3B60C5 + paper): an architect at a desk in a sunlit studio, rendered/animated (three.js + Theatre.js per stack). A tiny caption sits on the image's bottom-right: "The intelligent canvas that thinks with you, not for you."
- **Nav:** a floating centered white bar (logo · Features · Pricing · FAQs · **Try for free** in #283F7D with a small orange square icon). Link labels are doubled ("Features\nFeatures"), i.e. the **vertical roll hover**.
- **Type:** Graphik 400/500 UI at **12px, −0.02em**. Geist Mono labels; F37 Analog display (111px H1, 76.5px H3). Tracking −0.02 to −0.03em.
- **Color:** #3B60C5 blue, #283F7D deep blue CTA, #FDF8F0 / #FEF9F1 paper whites, #C2B192 tan, #373737 ink. A two-color identity with paper neutrals.
- **CTAs:** 3px radius (architectural, near-square), 36px tall. The big pricing cards are 124px tall.
- **Motion:** GSAP expo/power4/power2. Durations .8/.6/1. Char stagger **.03**. **Lenis `lerp:.06`** (heavier, smoother than the default .1).
- **Cookie bar:** a tiny mono strip bottom-left with ✓ Accept (blue square) / ✕ Reject (red square). Even the consent UI is on-brand.
- Later frames show the logo on blank paper again, possibly a pinned brand interlude or the analyzer triggering a transition (unverified).
- Copy: *"Design was never meant to happen through buttons, commands, and rigid workflows."* Product copy from a studio: manifesto first, features second (Augmented Sketch / Adaptive Massing / Prompted Plans / Agentic Refinement / Instant Facades), then pricing ($29.99/person/month).

### 2.13 365 — A Year of Cartier — 14islands (365ayearof.cartier.com)
- **Loader (seen):** warm white **#FAF8F6**. The Cartier script logotype sits above a **gold #BA9B53 portrait rectangle** (3:4, like a jewel box or an image placeholder) that **grows in size as the counter climbs** (0 → 11 → 45 → 55 → 68). The counter is a tiny serif numeral below. The rectangle's scale is the progress bar, and it is the same shape the first image will occupy (a **loader that becomes the first image**). It looped in headless.
- **DOM (measured):** headings use **mixed italic/roman uppercase serif** inline: "LOVE that SETS you FREE", "INDEPENDENCE MANIFESTO" with *INDEPENDENCE* in italic. That's an editorial **alternating-style headline** at **48px, 300 weight**. Labels at **10px, 500, +0.01em, uppercase** (×66). Uppercase share 98%. Fonts: Cartier's **BrilliantCutPro / FancyCutPro** (fallback measured as Noto Serif SC).
- **Grid:** **5 columns, 10px gap**, 10px side margins, i.e. nearly edge-to-edge (an archive/contact-sheet feel).
- **Stack:** Next.js, three.js canvas (the hover-image distortion layer `hoverHtml`), Lenis (`smoothWheel`, `wheelMultiplier:1`), and **Framer Motion springs**: `stiffness:100, damping:20/30/10`, `stiffness:500 damping:25`. TransitionOverlay (page transitions), LoadingScreen top/bg layers. Image filter at rest `blur(4px) brightness(0.85)` ×25, which clears on hover/focus.
- **Grain/noise present.** CSS has the whole Penner family. JS bezier arrays `[.25,.1,.35,1]`, `[.4,0,.1,1]`.
- Awwwards notes: infinite scroll, **mirror interactions**, custom loader, article pages with video.

### 2.14 Miu Miu "A House That We Shaped" — Merci-Michel (immersivebags.miumiu.com)
- **Gate (seen):** solid **ultramarine navy** (#0B0F5E-ish; the visual bg comes from the WebGL/preloader layer). Top center: a speaker icon with "FOR AN OPTIMAL EXPERIENCE / PLEASE TURN ON YOUR SOUND" (tiny caps). Center: **justified block type**. "MIUMIU ··· PRESENTS" pushed to the left and right edges, then "A ··· HOUSE", "THAT ··· WE", "S H A P E D" with the letters **letter-spaced to fill the full measure**. Work Sans 700, 54px, uppercase, **+0.074em**; the subhead uses +0.148em @27px. Below: 2-line small sans "Explore the new bag collection and discover something special" and a **tiny white "Enter" button** with an icon.
- Intro choreography (seen across frames): the type block **builds and dissolves line by line** (at one point only "MIUMIU PRESENTS" remains; at another the subtitle is at ~50% opacity), with a small spinner at the bottom while the 3D loads.
- **CSS eases:** `cubic-bezier(0.23,1,0.32,1)` ×37 (easeOutQuint), `(0.55,0,0.1,1)` ×21 (the "Swift-out" curve), `(0.16,1,0.3,1)` ×20 (easeOutExpo), `(0.19,1.51,0.29,0.99)` ×8 (**overshoot pop**), `(0.36,0.07,0.19,0.97)` ×9 (the classic **shake** curve, likely for an error/"no" wiggle), `(0.71,0.01,0.81,-0.51)` (anticipation exit). Durations 0.5 s ×38, 0.3, 0.4, **1.6 s ×12**.
- UI: a persistent `button-sound` toggle (fixed). Small 0.5px-shadow button.
- Lesson: the fashion campaign's entry screen is **pure typography plus a sound prompt**. No image at all until you opt in.

### 2.15 BOSS Dubai Immersive Experience — Dogstudio/DEPT (boss-halo-store.dogstudio.co) ★ rendered
- **Loader (seen):** warm taupe field built from gradients, `radial-gradient(circle, #FFEED6 0%, #D9C3AE 100%)` and `linear-gradient(207deg, #D1BDA1, #FFFBF4)`, with a #85705E vignette. Enormous **faint concentric circles** (1px, ~10% white) extend past the viewport. Center: a **thin circle (~125px) with "BOSS" inside and a single white dot orbiting the ring as progress**. Below: "75%" (tiny), a small **ornamental diamond divider** (line–◇–line), and "Welcome to BOSS Experience" at ~9px. 75 → 86 → 93 → 100% across 0.35–1.8 s.
- **Reveal (seen):** the BOSS wordmark appears as **extruded 3D letters made of fractured plaster/marble pieces** that assemble (cracks still visible, warm rim light, floating dust particles, heavy vignette). Under it, an onboarding **question gate**: "Are you living in Dubai?" with two **1px-outlined square buttons YES · NO** (~11px caps). That's personalization before entry.
- After the gate, the loader returned at 0% → 7% → 36% (second asset load for the 360° Aura Skypool panorama, which per Awwwards is the main scene). I didn't see the panorama.
- **Type:** AvertaPE only. **800 weight at 50px, uppercase, −0.030em (−1.5px), lh 0.9** for scene titles ("AURA SKYPOOL DUBAI", "CAPSULE COLLECTION"). Labels **11px 700 caps at +0.16em**. Uppercase share 86%.
- **Edge-fade gradients:** `linear-gradient(90deg, transparent, #fff 115%)` ×5 and its mirror ×5, i.e. **hairline rules that fade in from one end**, used as dividers/ornaments.
- **Motion:** CSS `cubic-bezier(0.25,0.46,0.45,0.94)` ×48 (easeOutQuad), `(0.165,0.84,0.44,1)` ×18 (easeOutQuart), `(0.77,0,0.175,1)` ×5. GSAP **power3.inOut ×18** (camera/scene moves) with **1.5 s ×13** as the house duration, plus 1, 2, 3.2 s. Grain flagged present.
- Chrome: Back · Menu (Halo Portal / Capsule Collection / Aura Skypool Dubai). Product copy is short and tactile: "Luxury linen wide-leg utility trousers for stylish versatility."
- Awwwards dev audit: animations 8.6/10, accessibility 6.2/10. Typical trade-off for this category.

### 2.16 Active Theory homepage (activetheory.net) — agency site, used for technique only ★ WebGL rendered
- This is the only site in the cluster where headless Chrome rendered the full WebGL, so it's the best evidence of what a "full" immersive scene looks like frame by frame.
- **Intro (seen):** near-black teal-tinted void. A **glass/chrome ring with the "a" logo** spins edge-on → face-on with an iridescent (blue-violet) Fresnel rim. **Bokeh particles** (pink, teal, green, warm white) burst outward. Thin **glass "pendulum" strands** hang from the ring. A **floating glass jellyfish/lamp** object drifts. Volumetric **green caustic light** floods the lower half. Teal ambient glow sits in the top-left corner.
- **Nav (seen):** a single top-right **capsule**, "WORK ——— CONTACT", two labels joined by a hairline in nbarchitekt (a geometric display face) at ~10px, with a glow under the pill. That's the whole nav.
- **Transition (seen, later frames):** cut to pure black with a **HUD dial**: a hatched semicircle filling into a full hatched disk, with a counter "/26" → "/60" → "/75". It completes into a **radial "sun" of blue curved strokes** around a hatched circle with "/75" at the center. Chapter loading is shown as a sci-fi instrument.
- **DOM:** `FXScroll` fixed layer; `mix-blend-mode: color-dodge` ×4 and `plus-lighter` ×1 (additive glows over the canvas); backdrop-filter ×1; keyframes `cursor-blink`, `dot-flashing`, `ticker` (terminal-style text effects). CSS bezier `cubic-bezier(0.17,0.4,0.02,0.99)`. Ambient loop 9 s. "Toggle Audio" link present. Prev/next `<<` `>>` buttons: 5px radius, 1px rgba(255,255,255,.6) border, 10% white fill.
- **Asset file (`assets/data/uil.*.json`, fetched):** every environment has **Cycles-baked COMBINED lightmaps + PBR MRO + normal maps** per mesh group (ROCK_L, SAND, PILLARS, TREE_leaves, WALLS_CEILING…), **matcaps**, instanced meshes (`bush_instances.bin`), a `caustic_plane.bin`, a `jellyfish.bin`, and **per-scene camera presets** (`position`, `lookAt`, `fov`, `moveXY` mouse-parallax amount, `wobbleStrength`, `lerpSpeed`). The "film look" is pre-baked offline; runtime only blends textures and lerps cameras.
- Meta copy (voice): "We blend story, art & technology as an in-house team of passionate makers. Our industry-leading web toolset consistently delivers award-winning work through quality & performance."

---

## 3. Cross-site patterns (with numbers)

**Entry and loading**
- **13/14 sites have a designed preloader or gate**; 0/14 show raw content immediately. Loader archetypes seen:
  1. **Brand-object-as-progress:** Oryzo (CAD drawing of the coaster), Atlas (stator ring), Cartier 365 (gold card growing), Symphony (terrain contour line), illoca (logo tiles assembling).
  2. **Instrument/HUD:** Hubtown (13-segment mono bar + %), EverSwap (diamond + serif %), 100 Lost Species (boxed 3-digit counter).
  3. **Thin ring:** David Whyte (1px arc with "Loading" inside).
  4. **Content gate:** Miu Miu (sound prompt + Enter), GQ×AP (co-brand splash), 100 Lost Species (counter doubling as enter).
- Loader typography is **tiny: 8–12px**, mono or light serif, tracked +0.05 to +0.16em when caps. Loaders occupy <10% of the viewport and leave 90% empty field.
- Loader backgrounds are **never pure #000 or #FFF** except where the brand demands it (100 Lost Species black, GQ black). Typical values: #181818, #100904, #020A18, #0A0901, #1F3428, #4A5B3C, #EFEAE2, #FAF8F6, #FDFCF5, #EADFC9.
- **Sound prompts/toggles:** 4/14 (Miu Miu, GQ×AP, Symphony, Unseen generally) phrase it as a recommendation ("For an optimal experience, please turn on your sound"), never autoplay-with-audio.

**Typography**
- **Display sizes:** 54–150px on desktop (Miu Miu 54, Cartier W&W 54, illoca 111, EverSwap 104, Atlas 144, Symphony 150, David Whyte 86, Cartier 365 48).
- **Display line-height:** 0.8–0.9 for caps/single words (EverSwap 0.8, Symphony 0.8, Atlas 0.9, Oryzo 0.9); about 1.24 for serif sentences (David Whyte).
- **Display tracking:** −0.03 to −0.045em on large type (Atlas −0.030em@144, Symphony −0.030em@150 / −0.043em@105). **Positive +0.067 to +0.16em on small caps labels** (Cartier 0.067em@12, Hubtown 0.16em@9, Miu Miu 0.074em@54 when justified).
- **Weight extremes:** hairline display (Canela 100, Feature Display 200, Reckless 100/300) **or** solid 500–700 caps. Middle weights at display size are rare.
- **UI text tiny:** 9–12px dominates (Cartier W&W 12px ×98, Cartier 365 10px ×66, illoca 12px ×55, Hubtown 8–9px). Body copy is 14–18px.
- **One family + one accent face** is the norm: Atlas uses 1 family; illoca uses Graphik + F37 Analog + mono + handwriting for annotations; David Whyte uses Canela + Roobert.
- **Mono for metadata/HUD:** Hubtown (Commit Mono), illoca (Geist Mono, Architect Pro), Oryzo (DM Mono).
- **Split-text everywhere:** char staggers of **0.02–0.033 s**, line staggers 0.1–0.15 s.

**Color**
- 2–3 colors plus neutrals. Accent use is surgical (one orange #DC5000 on Oryzo, one ochre #D8914C on David Whyte, one red rule on Cartier).
- Warm off-whites (#EFEAE2, #FAF8F6, #FDF8F0, #FFEDD7, #EEE8E8, #E1D9D1) for "white" text and paper. **Text is almost never #FFFFFF on dark.**
- Tinted darks (brown #100904, navy #020A18, green #203727, olive) instead of neutral black.

**Motion tokens (most frequent)**
- CSS: **`cubic-bezier(0.19,1,0.22,1)`** easeOutExpo (David Whyte ×83, Cartier 365), **`(0.23,1,0.32,1)`** easeOutQuint (Miu Miu ×37), **`(0.16,1,0.3,1)`** (Symphony, Miu Miu), **`(0.22,1,0.36,1)`** (Atlas, Cartier W&W), **`(0.76,0,0.24,1)`** in-out for panels/wipes (Atlas, Symphony), **`(0.77,0,0.175,1)`** (David Whyte), **`(0.34,1.56,0.64,1)`** pop/overshoot (Choo-Choo ×48), **`(0.2,0,0,1)`** (Hubtown ×18), **`(0.4,0.9,0.3,1)`** (Cartier W&W ×24).
- GSAP: **power2.out / power3.out / power4.out** dominate entrances; **power2.inOut / power3.inOut / expo.inOut** for camera and section transitions; **back.out(2)** for small UI pops; **linear** for clocks, ambient loops and scrubbed scroll.
- Durations: UI hover **0.2–0.4 s**; reveals **0.6–1.2 s** (0.8 s is the single most common); section/camera transitions **1–1.5 s**; ambient loops **3–50 s**.
- Staggers: **0.02–0.035 s per char**, **0.1–0.15 s per line/item**, plus `from:"end"`, `from:"center"`, `from:"edges"` variants.
- Scroll trigger starts: **"top 80%"** (Hubtown ×46) and **"top 90–92%"** for reveals; "top top" for pins.
- Smooth scroll: **Lenis in 5/14** (David Whyte, Cartier 365, Hubtown, illoca, Choo-Choo), with `lerp` 0.06–0.1 and `wheelMultiplier:1`. No Locomotive anywhere: **Lenis has fully replaced Locomotive.**
- Springs (Framer Motion, 14islands/Cartier): `stiffness 100 / damping 20–30` for layout, `stiffness 500–550 / damping 25–30` for snappy UI.

**Reveal primitives**
- **Blur-to-sharp:** Oryzo `blur(8.55px)` ×91, EverSwap `blur(4.5–18.9px)`, Atlas `blur(4.8px)` ×27, Cartier 365 `blur(4px) brightness(.85)` ×25. This is the #1 reveal state in this cluster, more common than translateY fades.
- **Word-by-word color fill on scroll** (Atlas).
- **Mask/aperture expansion** (illoca's 4-panel hole; Cartier 365 gold card scaling to image).
- **Letter-roll hover** with doubled glyphs (Lusion ×2, Unseen illoca).

**Chrome**
- Nav is minimal: logo + 3–5 links + 1 CTA. Links are often **boxed micro-tabs** (Atlas) or a floating bar (illoca). Experiences (Symphony, GQ, Miu Miu) reduce chrome to **Back / Sound / Skip / chapter dots**.
- Side progress indicators: Atlas right-edge bar, Hubtown fixed side nav.
- Custom cursor: 3/14 (David Whyte, Cartier W&W, GQ×AP), always hidden on touch.

---

## 4. Signature techniques worth stealing (no 6-month WebGL budget)

### 4.1 Brand-object preloader (CSS/SVG only)
Make the progress indicator a drawing of the product or brand object, not a generic spinner.
```html
<div class="loader" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
  <svg viewBox="0 0 200 200" class="loader__obj">
    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-dasharray="2 4" opacity=".5"/>
    <circle class="loader__sweep" cx="100" cy="100" r="60" fill="none" stroke="var(--accent)" stroke-width="40"
            pathLength="100" stroke-dasharray="0 100" transform="rotate(-90 100 100)"/>
    <!-- bezier handles: small squares + lines at N/E/S/W like oryzo -->
  </svg>
  <p class="loader__teaser">Access the library of poems, essays and films</p>
</div>
```
- Progress: `stroke-dasharray: <p> 100`, tweened with `transition: stroke-dasharray .4s cubic-bezier(.22,1,.36,1)`.
- Exit: the object scales 1→1.08 and fades over 0.6 s with `cubic-bezier(0.76,0,0.24,1)`, the field cross-fades to the hero bg, then the hero headline starts 0.15 s later.
- Teaser line underneath (David Whyte pattern): 12px, 60% opacity, max 2 lines.
- **Minimum display 800 ms, maximum about 2.5 s**, then reveal what you have. Never let it hang (every headless failure here was a loader that hung).

### 4.2 Segmented HUD loader (Hubtown)
13 squares at 6×6px with a 6px gap; mono 9px caps at +0.16em; "LOADING CONTENT" below and "22%" right-aligned above. Light squares in sequence (`.is-on` for i < pct×13). Add a ping-pong scanner animation when progress is indeterminate. Colors: #D5E0FF on #020A18, unlit squares at 20% opacity.

### 4.3 Loader → first image (Cartier 365)
A colored 3:4 rectangle centered, scaled from 0.6 to 1.0 with progress, with a counter below. On complete, the **same element FLIPs** to the first image's rect (fills with image via clip-path or opacity) and the page builds around it. Implement with the FLIP technique: measure the target rect, `transform: translate/scale`, duration 1.0–1.2 s, `cubic-bezier(0.19,1,0.22,1)`.

### 4.4 Aperture / "hole" reveal (illoca)
Four fixed panels (top/right/bottom/left) cover the viewport, leaving a centered window around 30vw × 17vw. Animate them outward:
```css
.hole{position:fixed;inset:0;pointer-events:none;z-index:50}
.hole__l,.hole__r{position:absolute;top:0;bottom:0;width:35vw;background:var(--paper) var(--grid)}
.hole__l{left:0}.hole__r{right:0}
.hole__t,.hole__b{position:absolute;left:0;right:0;height:41.5vh;background:var(--paper) var(--grid)}
.hole__t{top:0}.hole__b{bottom:0}
.is-open .hole__l{transform:translateX(-100%)} .is-open .hole__r{transform:translateX(100%)}
.is-open .hole__t{transform:translateY(-100%)} .is-open .hole__b{transform:translateY(100%)}
.hole>*{transition:transform 1.2s cubic-bezier(.76,0,.24,1)}
```
Simpler single-element version: `clip-path: inset(41% 35% 41% 35%)` → `inset(0)` over 1.2 s on the hero media.
- Combine with a **blueprint-grid background** (`linear-gradient(90deg, #D3C9B5 1px, transparent 0) 0 0/24px 24px, linear-gradient(#E3D9C3 1px, transparent 0) 0 0/24px 24px`).

### 4.5 Blur-to-sharp reveals (the cluster's default)
```css
[data-reveal]{opacity:0;filter:blur(8px);transform:translateY(12px)}
[data-reveal].in{opacity:1;filter:blur(0);transform:none;
  transition:opacity .8s cubic-bezier(.22,1,.36,1),filter .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
```
- Blur radius 4–9px for text and up to 18px for large media. Translate ≤ 12px: these studios barely move things, they *focus* them.
- Trigger at IntersectionObserver `rootMargin: "0px 0px -20% 0px"` (≈ ScrollTrigger "top 80%").
- Per-word version: split into words, stagger 0.03 s.

### 4.6 Scroll-scrubbed word fill (Atlas)
Split the paragraph into word spans with color `rgba(204,203,189,.5)`. Map scroll progress through the section (start "top 80%", end "bottom 40%") to the count of words set to full color (#EEE8E8). With CSS scroll-driven animations where supported:
```css
.fill span{color:rgb(204 203 189/.5);animation:fill linear both;animation-timeline:view();animation-range:entry 20% cover 50%}
@keyframes fill{to{color:#EEE8E8}}
```
(Give each span an offset `animation-range` via inline style, or use JS: `n = floor(progress * words.length)`.)

### 4.7 Letter-roll hover (Lusion, Unseen)
Duplicate each label: `<a><span class="roll"><span>P</span><span>P</span></span>…</a>`. Each char pair sits in a 1em-tall `overflow:hidden` box. On hover, `translateY(-100%)` with `transition: transform .45s cubic-bezier(.76,0,.24,1)` and `transition-delay: calc(var(--i) * 18ms)`. Hide the duplicate from screen readers (`aria-hidden` on clones; put the real label in `aria-label`).

### 4.8 Justified/letter-spread title block (Miu Miu)
Each line is `display:flex; justify-content:space-between` with words as children. The last word is split into letters so it fills the full measure. Width ~240–460px, centered; 54px Work Sans 700 caps at +0.074em. Build the lines in with a 0.12 s line stagger and `cubic-bezier(0.23,1,0.32,1)` over 0.8 s. Cheap, fashion-grade, no imagery needed.

### 4.9 Stroke-drawn signature title card (David Whyte)
Black full-screen cut. An SVG signature path with `stroke-dasharray: L; stroke-dashoffset: L → 0` over 1.6–2.0 s `cubic-bezier(0.455,0.03,0.515,0.955)`, then a 1px rule grows under it (0.6 s), hold 0.4 s, then cross-fade to paper over 0.8 s.

### 4.10 Shard vortex transition (100 Lost Species), CSS 3D version
Place 24–40 small image cards on a ring with `transform: rotate(θ) translateX(R) rotateY(90deg)` inside a `perspective: 1200px` container. Animate the ring's `rotateZ` and the cards' `translateZ` from −800px to 0, with per-card stagger 0.03 s, over 2–3 s `power2.inOut`. Fade the title to 20% under it. Use linear easing for anything representing time.

### 4.11 Toy-plastic UI (Choo-Choo World)
`box-shadow: 0 6px 0 #91C5E8, inset 0 -2px 10px rgba(120,207,255,.6)`; on press, `translateY(4px)` and shadow `0 2px 0`. Gradient `linear-gradient(#07B9FE, #1160BE)`. Pop-in with `cubic-bezier(0.34,1.56,0.64,1)` over 0.4–0.5 s. Wiggle keyframes ±4° over 0.6 s.

### 4.12 Hatch textures (Oryzo)
`repeating-linear-gradient(90deg, #FFEDD7 0 2px, transparent 2px 4px)` for barcode/hatch dividers and progress fills. A free "printed spec" texture.

### 4.13 Lightweight WebGL when you do need it
- Lusion and Active Theory get their look from **baked lighting** (Blender/Cycles lightmaps + matcaps), not real-time lights. For a small team: export a GLB with baked textures, render with three.js `MeshBasicMaterial({ map: baked })`, no lights, and cap DPR at `Math.min(devicePixelRatio, 1.5)`.
- Camera moves as **presets per section** (position/lookAt/fov), lerped with factor 0.05–0.1 per frame, tied to scroll progress (Active Theory's `lerpSpeed`, Unseen/Hubtown via Theatre.js).
- Keep HTML type **outside the canvas** (every site here renders headings as DOM over the canvas). That's better for SEO, accessibility, crisp text and the analyzer's ability to read it.
- Image hover distortion (Cartier 365 `hoverHtml` canvas): a single fullscreen plane per hovered image, with a fragment shader doing an RGB-shift/ripple driven by mouse velocity. Fallback: CSS `filter: blur(4px) brightness(.85)` at rest → `none` on hover over 0.5 s.

### 4.14 Grain overlay
Grain is present on Cartier 365 and Cartier W&W. Use a fixed `::after` with a 128px noise PNG (or SVG `feTurbulence baseFrequency=.8`), `opacity:.06–.1`, `mix-blend-mode: multiply` on light / `overlay` on dark, and `pointer-events:none`. Animate `background-position` in steps(6) over 1 s for film flicker, and disable it under reduced-motion.

### 4.15 Orbiting-dot ring loader + question gate (BOSS / Dogstudio)
- A 1px circle (~120px) with the wordmark inside; one 5px dot travels the circumference (`offset-path: circle(60px)`; `offset-distance: calc(var(--p) * 1%)`). Add 3–4 huge faint concentric circles (1px, 8–10% white) bleeding off-screen for depth. Percent at 9–10px, an ornament divider (`line ◇ line`), and a welcome line.
- On 100%: the dot completes, the ring fades over 0.6 s (`cubic-bezier(.165,.84,.44,1)`), the hero object scales 0.96→1 over 1.5 s (`power3.inOut`), then **one question with two outlined 1px buttons** ("Are you living in Dubai? YES · NO"). It personalizes the content *and* gives the user a deliberate entry click, which also unlocks audio legally.

### 4.16 HUD chapter dial (Active Theory)
- Pure black. A 64–120px circle filled with a 45° hatch (`repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 5px)`) revealed by `clip-path` from a semicircle to a full disk. A mono counter "/26 → /75" at its center. On complete, 8–12 curved SVG strokes burst radially (stroke-dashoffset draw, 0.6 s, stagger 0.03 s). This works as a between-chapter loader that feels like part of the world, not a delay.

### 4.17 Edge-fade hairlines
`background: linear-gradient(90deg, transparent, #fff 115%)` on a 1px-tall element (and the mirrored −90deg version) gives ornamental dividers that dissolve into the field (BOSS ×10). Pairs well with a centered ◇.

---

## 5. When to use immersive, and when not

- **Use it** for launches with a single hero object (product, place, collection), cultural/cause pieces, and luxury campaigns where dwell time is the KPI (Cartier, Miu Miu, Symphony of Vines). Also when the 3D *is* the information (Hubtown's city map, illoca's architecture).
- **Don't use it** for anything where people need to scan, compare or convert quickly: pricing, docs, multi-product catalogs. Note that illoca keeps pricing/FAQ as plain DOM, and Cartier W&W lives inside the regular e-com shell.
- **The loader cost is real.** 8/14 sites never got past it in a software-rendered browser, so low-end devices, bots and previews may see only the loader. Mitigations:
  - Render the headline and value prop in HTML immediately; let the 3D fade in behind it.
  - Cap the loader at about 2.5 s, then progressive-enhance.
  - Put the meta description and teaser text *in* the loader (David Whyte, 100 Lost Species do).
  - Provide explicit "Not supported WebGL / rotate device" states (Choo-Choo World).
- **Sound:** always opt-in with a visible toggle; state the recommendation in copy.
- **Reduced motion:** I couldn't verify `prefers-reduced-motion` handling on these sites. The only reduced-motion trace measured was Atlas's `0.001ms` durations ×6, the standard "kill transitions" override. **Recommendation:** under reduced motion, skip the loader choreography, drop smooth scroll (Lenis off), swap scrubbed camera moves for crossfades, and keep blur reveals as simple opacity.
- **Mobile:** these studios ship the same identity on mobile (Oryzo's mobile loader is the same drawing recomposed vertically). Custom cursors are hidden on touch. Assume heavier scenes are cut or replaced with video on mobile.

---

## 6. What these sites never do

- Never show a generic spinner or a "Loading…" bar without brand meaning.
- Never use pure #FFFFFF text on pure #000000 backgrounds (except deliberate memorial/editorial black).
- Never use more than one accent color; never use gradients as decoration (the only gradients are functional: toy buttons, hatch textures, grid lines, shimmer).
- Never center-stack hero copy *and* image *and* CTA like a SaaS template. Headlines are offset (Atlas), justified (Miu Miu), annotated (illoca) or alone.
- Never use mid-weight (400–500) serif display at 100px+; it's hairline (100–300) or bold caps.
- Never use bouncy easing on large surfaces. Overshoot (`back.out`, `0.34,1.56`) is reserved for small UI pops; big moves use expo/quart in-out.
- Never autoplay sound.
- Never render primary headings inside the WebGL canvas (all are DOM overlays).
- Never use Locomotive Scroll (zero hits); never use heavy box-shadows or glassmorphism cards (backdrop-filter appears only on Hubtown's panels over 3D).
- Never pack the nav: 3–5 items max, often fewer for campaign pieces (Back / Sound).

---

## 7. Rankings: best 4 references

1. **illoca (Unseen Studio)** — the most transferable. Paper-and-blueprint art direction, 2-color identity, aperture reveal, handwritten annotations on a 111px headline, letter-roll nav, Lenis 0.06, and plain-DOM pricing/FAQ. It shows how to make an AI SaaS launch feel like an agency piece without being blocked by its own WebGL.
2. **Atlas Motion (Lusion)** — best-measured type system: one family, −0.03em tracking from 13 to 144px, 24-col visible grid, offset two-block headline, word-fill scroll text, boxed micro-tab nav, and a kinetic-diagram loader. A model for B2B/hardware.
3. **David Whyte Companion (Immersive Garden)** — best motion vocabulary (easeOutExpo ×83, center/end staggers, SplitText lines), hairline Canela on warm paper, stroke-signature title card, and a loader that sells. A model for literary, membership and personal brands.
4. **365 — A Year of Cartier (14islands)** — loader-becomes-first-image, mixed italic/roman uppercase serif headlines, 5-col 10px-gap edge-to-edge archive grid, blur-at-rest images, and Framer springs. A model for luxury editorial.

Honorable mentions: **Miu Miu (Merci-Michel)** for the pure-typography gate; **100 Lost Species (IG)** for concept (a site that disappears after 100 seconds, with linear time-based easing); **Hubtown (Unseen)** for the mono HUD loader and Theatre.js map navigation; **BOSS Dubai (Dogstudio)** for the orbiting-dot loader → fractured 3D wordmark → one-question gate sequence; **Active Theory homepage** as the reference for what a fully rendered baked-light WebGL scene and HUD chapter loader look like.
