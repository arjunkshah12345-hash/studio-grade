# D — Editorial / Typographic / Awwwards-craft studios: LIVE CLIENT WORK

Cluster: Locomotive (Montréal), Exo Ape (NL), darkroom.engineering (ex-Studio Freight), Obys, Rejouice, Cuberto, Monopo.
Method: `tools/analyze.mjs` on each live client URL (data.json + screenshots in `sites/<slug>/`). Where an intro gate or
virtual scroller stalled the analyzer's screenshots (Studio D, Amaterasu, Glyphic, Inversa), supplemental frames were
captured with `tools/dec-shoot.mjs` (files prefixed `x-` in the same `shots/` folder: longer wait, optional click-to-enter,
wheel-driven scroll). Attribution verified by footer credit in the DOM where present ("Handcrafted by Exo Ape",
"Crafted by Exo Ape", "Designed by Obys") or by the agency's own case-study list / Awwwards profile.

STATUS: complete. Every teardown below combines data.json measurements with viewed screenshots (hero, intro frames,
scroll frames). Where headless rendering failed to load images/video (FIND hero, Scout lower sections, ICOMAT first 6 s,
Fluid Glass hero video) that is stated rather than guessed. Noovo and Pangram were not screenshot-reviewed in depth
(lower-confidence attribution) and are kept short.

---

## Sites analyzed

| # | Client | URL | Agency (evidence) | Category | Stack (measured hints) |
|---|---|---|---|---|---|
| 1 | Populous | https://populous.com | Locomotive (case study locomotive.ca/en/work/populous) | Architecture (stadiums) | WordPress, Swup page transitions, Lenis (lerp .1), Locomotive-style `u-anim` utilities, CSS keyframes |
| 2 | The Drake | https://www.thedrake.ca | Locomotive (case study; Awwwards SOTD) | Hospitality / culture | Swup, Lenis, Locomotive Scroll classes |
| 3 | Studio D | https://studiod.nu/en | Exo Ape (footer "Handcrafted by Exo Ape"; SOTD Jan 2024) | Urbanism / landscape / architecture | Nuxt, GSAP (expo eases), custom virtual scroll, theatre.js hint, grain overlay |
| 4 | Inversa | https://inversa.com | Exo Ape (footer "Crafted by Exo Ape"; SOTD Dec 2025) | Climate-tech / ecology | Nuxt, Lenis-style virtual scroll, SplitText, canvas pixel-mask transitions |
| 5 | Amaterasu | https://amaterasu.ai | Exo Ape (footer "CRAFTED BY EXO APE"; SOTD Nov 2024) | Deep-tech / mental health | Nuxt, Three.js (2 canvases), click-to-enter gate, blur text reveals |
| 6 | Fluid Glass | https://fluid.glass | Exo Ape (footer "Crafted by Exo Ape"; SOTD Mar 2026) | Architectural glazing (B2B luxury) | Nuxt, virtual scroll, SplitText, GSAP power3 |
| 7 | Pixelflakes | https://www.pixelflakes.com | Exo Ape (Awwwards SOTD Oct 2023) | Architectural visualisation studio | Nuxt, virtual scroll, GSAP expo |
| 8 | Glyphic Biotechnologies | https://www.glyphic.bio | Obys (footer "Designed by Obys"; SOTD Nov 2025) | Biotech | Next.js, Three.js (3D molecules), Lenis, SplitText, % preloader |
| 9 | ATMOS / AYOCIN | https://ayocin.com | Obys (Awwwards SOTD Dec 2024) | Consumer hardware / wellness | Swup, Lenis, GSAP, SplitText lines |
| 10 | Terminal Industries | https://terminal-industries.com | Rejouice (Awwwards SOTM Sep 2025) | Logistics AI / B2B SaaS | Nuxt, Lenis, GSAP expo.inOut + CustomEase "fastInOut" |
| 11 | ICOMAT | https://icomat.co.uk | Rejouice (Awwwards SOTD Apr 2026) | Aerospace composites / deep-tech | Next.js, Three.js (5 canvases), Lenis, GSAP + SplitText (lines/words) |
| 12 | Noovo | https://noovolife.com | Rejouice (Awwwards SOTD Feb 2025) — attribution of current build not re-verified | Camper vans / DTC | Next.js, no GSAP detected |
| 13 | FIND Real Estate | https://www.findrealestate.com | Cuberto (Awwwards HM Mar 2026) | Real estate (NYC) | Next.js, Lenis |
| 14 | Makers Fund | https://www.makersfund.com | monopo (Awwwards HM) | Venture capital / finance | Next.js, GSAP, R3F canvas, Lenis lerp .1/.05 |
| 15 | Lightfield | https://lightfield.app | darkroom.engineering (listed on darkroom.engineering/work) | AI CRM / SaaS | Next.js, Lenis, Framer-Motion springs |
| 16 | Scout Motors | https://www.scoutmotors.com | Locomotive (case study locomotive.ca/en/work/scout-motors) | Automotive | Astro, Lenis, SplitText, canvases |
| 17 | Pangram Pangram Foundry | https://pangrampangram.com | Locomotive case study exists; current Shopify build likely re-themed — treat as weak reference | Type foundry / commerce | Shopify, GSAP |
| A1 | Exo Ape (agency) | https://www.exoape.com | — | agency homepage | Nuxt, GSAP linear/scrub, SplitText lines |
| A2 | Locomotive (agency) | https://locomotive.ca/en | — | agency homepage | Lenis + Locomotive Scroll, Three.js, Framer-style springs, SplitText chars/words |

Not analyzable: autexacoustics.com (Obys) — navigation timeout 45 s.

---

## Per-site teardowns

### 1. Populous — populous.com (Locomotive) — architecture
- **Intro**: blank white at 350/900 ms with a tiny spinner bottom-right (≈700,430 in half-scale frame) → at 1.8 s the hero
  video appears under a ~40% white veil (keyframe `revealMediaHeroBackground`) → at 3.2 s veil gone, header + headline in.
  CSS keyframe names: `homeHeroEntry`, `slideInUp`, `slideInUpTiny`, `scaleIn`, `transitionDefaultIn/Out` (Swup page transitions).
- **Hero**: full-bleed autoplay video of their stadiums (Tottenham aerial, BMO Centre w/ BMX event), headline bottom-left,
  3 lines, white. "We design the / places where people / love to be together." — **80px / 80px (lh 1.0), weight 400,
  tracking −0.05em (−4px), Suisse Int'l**. Only weight 400/500 on the whole page.
- **Nav** is the signature: no bar. Logo top-left; links set as **two stacked columns of three** ("Explore / Projects /
  Disciplines" and "Sustainability / Digital Future / Careers") placed on the grid columns at x≈730 and x≈1042, plus "Search"
  and a two-line burger. On scroll it collapses to a single "P" monogram square + burger.
- **Sequence**: hero video → News & Perspectives (horizontal Splide carousel, cards w/ 4px-radius "News" tag, date 12px,
  title 21px −0.05em) → "Explore some of our best work around the world" on a deep-navy **3D globe** section (36px/43px
  −0.05em) → Featured Projects: alternating small 1/2-width image with caption row ("Tottenham Hotspur Stadium …… 2019")
  and full-bleed images (Sphere) with title left + white pill "↳ View Project" right → Disciplines list → sustainability
  (image + small text top-right) → "We Can't Do It Without You" careers → giant "Have a question? Want to work with us?"
  80px black → 900px-tall footer.
- **Disciplines list**: label "Disciplines" in col 1, list in col 2 (x≈365–667), each item 21px −0.05em with 1px hairline
  separators — a pinned/sticky section (scroll shots show it holding while a crowd image strip passes above). Keyframes
  `listPreview`/`listPreviewOut` → hover shows a floating image preview.
- **Type scale**: 80 / 36 / 27 / 21 / 16 / 12 / 10. Micro-labels 12px & 10px with **+0.04em**; 4% uppercase only.
  TiemposFine 200/300 (serif) is loaded but not dominant on home — reserved for other templates.
- **Grid**: 4 cols gap 20px & 2 cols gap 20px; side margin **106px** at 1440 (≈7.4vw); container 1440.
- **Color**: #010101 / #FFFFFF / #E6E6E6, accent #1C19B5 (ultramarine, used sparingly on borders/tags).
- **Buttons**: 12px/500, padding 6×12, radius 4px, 1px border, always prefixed with an arrow glyph "↳ View all", "↳ Start",
  "← Previous", "→ Next". This "↳" prefix is a strong editorial tic.
- **Motion**: CSS `cubic-bezier(0.215,0.61,0.355,1)` (easeOutCubic) used 842× with **0.9s** dominant (293×), 0.6/0.75s
  secondary; `cubic-bezier(0.76,0,0.24,1)` and `(0.77,0,0.175,1)` for in-out; GSAP power4.out/power3.out; Lenis lerp 0.1;
  SplitText "lines"; 133 elements with clip-path (image reveals); custom cursor with `mix-blend-mode:difference`.
- **Mobile**: same headline at ~32px, 3 lines bottom-left over portrait crop of the video, logo wordmark + 2-bar burger.
- **Copy voice**: warm, plain, human — "amplify the joy felt in shared human moments."

### 2. The Drake — thedrake.ca (Locomotive) — hospitality/culture
- **Intro**: header renders immediately (logo box + nav boxes), full-bleed dusk video (silhouettes drinking wine); headline
  "Meet The Drake" not present in frames up to 3.2 s — it arrives later (seen at ~5.5 s) as **word chips**.
- **Signature typographic device**: every display word sits in its own **white box with 1px border and ~5px radius**,
  boxes butted together ("Meet│The│Drake", "Explore│Our│Locations", "Take│Your / Shot│Of│Art"). Display font Sequel Sans
  Medium Disp at weight 415, **110px / 93px (lh 0.85), −0.03em**; 64px/64px −0.03em; 49px; 37px −0.02em; 29px −0.01em.
  The italic of the same family is used for one word ("Discover *Our* Properties").
- **Hand-drawn overlays**: green/red marker-scribble underlines over headline words, a cursive "Toronto" script logo over
  a photo pair, line-art illustrations (duffel bag, bouquet). Personality layer over a strict system.
- **Micro type**: **Maison Mono 10px uppercase** (the most frequent text style, 76 instances) for nav, captions, dates,
  meta; 56% of all text nodes uppercase. Long descriptive paragraphs also set in mono uppercase small.
- **Nav**: a cluster of bordered boxes (logo box "THE / DRAKE" underlined, "PICK A LOCATION ⌖", then a row ABOUT / OUR
  HOTELS / FOOD + DRINK / ART + CULTURE / BLOG / GIFT CARDS / CAREERS / CONTACT US), right: "MENU ≡" and "BOOK →" boxes.
  Buttons: 12px uppercase, padding 14×12, radius 0, 1px #222223 border, h 44. On scroll it collapses to "D" + "PICK A
  LOCATION" + "MENU / BOOK".
- **Hero bottom rail**: 3 numbered property thumbnails "01 THE DRAKE HOTEL, TORONTO / 02 … / 03 …" separated by hairlines,
  with circular prev/next arrow buttons bottom-right — a carousel index as UI.
- **Sections**: intro paragraph in white display type over a bar interior photo whose card has a **single huge rounded
  corner** (top-right arc, ~300px radius) → "Explore Our Locations" split with a vertical hairline divider, location
  cards (photo + mono paragraph + EXPLORE box + circle-arrow) → burgundy band (#672B3C) "Discover Our Properties" →
  property photo grid with word-chip titles → lavender (#B5B7D8) band → "Take Your Shot Of Art" → "What's On" events
  carousel (food+drink tags in tiny bordered mono labels).
- **Color**: #222223 ink, #FFFFFF, burgundy #672B3C, lavender #B5B7D8, green #20A556 (scribbles), warm #F0EEEB.
- **Grid**: 12 cols gap 20px; side margins 32px (tight, edge-to-edge feel); container up to 1920.
- **Motion**: `cubic-bezier(0.5,0,0,1)`, durations mostly 0.4s/1s; Lenis; Swup page transitions.
- **Mobile**: header becomes a 3-cell boxed grid (THE DRAKE │ MENU ≡ │ BOOK →) with a full-width "PICK A LOCATION" row.
- **Copy**: "Where nights turn into stories"; "Drake Art is everywhere … every available corner — wall, nook, or hallway —
  into a pop-up gallery." (case study: "atmosphere over amenities", "a cultural publication as much as a digital destination").

### 3. Studio D — studiod.nu/en (Exo Ape) — urbanism/architecture  ★ top reference
- **Intro**: the analyzer's frames stayed black #060606 for 6+ s (fixed `.intro` layer, `lenis-stopped`). With a 12 s wait:
  white page, small "Studio D" wordmark top-left, "Menu ●" (black 32px circle with ≡) top-right; hero media crossfades
  through several renders (house → canal → aerial) behind the text.
- **Hero composition**: italic serif kicker *"Urbanism, landscape & architecture"* (Ivar Text Italic, ~16px) above a
  2-line headline "Spatial design / at eye level" — **PolySans Slim 300, 128px with line-height 85px (0.66!), −0.031em
  (−4px)**. A portrait media box (≈340×375 at half-scale → ~680×750 real) sits right of centre and the headline's last
  letters ("desig**n**") **run over the image** — text intrudes into the picture. "Play showreel ⊙" centered on the media.
  A **vertical rotated label** at bottom-left "01  Services" (section counter running sideways in the margin).
- **Scroll**: wordmark "Studio D" collapses to "D". Services: three numbered blocks "01 Plans / 02 Vision & strategy /
  03 Research by design" (40px, 300 weight) each with 2-line description and a pill button (42px tall, radius 42px, 1px
  rgba(30,29,28,.2) border, 16px text, padding 0 24px). Small square renders are **scattered asymmetrically** across a
  16-column grid (gap 20px) — never aligned in a row.
- **Featured projects**: full-bleed render per project, white title 96px −0.031em ("Hoge Bongerd", "Smitskamp Gorssel",
  "Cobercokwartier") at left, tiny category label "Architecture" above, a **second, smaller inset image** floating right
  (picture-in-picture, ≈420×430) overlapping the title, a "+" circle button. Vertical side label switches to "02 Featured projects".
- **Then**: "More projects / Discover our full portfolio." (italic serif kicker + 64px/40px display) next to a single
  image; "Raising quality through collaboration." on warm beige; "Societal themes that guide our direction." on sage.
- **Footer**: dark warm #1E1D1C, **infinite marquee "Talk to us. Talk to us." at 200px, −0.05em, cream #F2EDE4**, then a
  founder card (round photo, "Daan van den Berg / Founder / Urbanist", *italic serif quote* "We are dedicated to finding
  the right solutions for you.", "Get in touch" pill), 4-col footer row with hairline, "Handcrafted by Exo Ape".
- **Type system**: 3 families — PolySans Slim 300 (display), Neue Haas Unica (UI/body 14–16px), Ivar Display + **Ivar
  Text Italic** (kickers/quotes only). Sizes 200 / 128 / 96 / 64 / 40 / 36 / 24 / 22 / 16 / 14. No uppercase at all.
- **Motion (JS-mined)**: GSAP **expo.out ×23, expo.inOut ×18, duration 1 (×32) / .8**, staggers
  `{each:.1, from:"end"}`, `{each:.05, from:"start"}`, `{each:.1, from:"center"}`; ScrollTrigger "top center". CSS uses
  `cubic-bezier(1,0,0,1)` (hard expo in-out) 0.3/0.5s for UI. Grain/noise overlay present; custom cursor.
- **Color**: #FFFFFF, ink #1E1D1C, cream #F2EDE4, near-black #060606, + section tints (warm beige, sage).

### 4. Inversa — inversa.com (Exo Ape) — ecology/climate-tech
- **Later chapters (seen)**: the photo gives way to a **line-art field specialist** (1px lime/grey outline figure) that
  turns between frames, flanked by **chamfered-corner HUD cards** (45° notched corners, 1px border) — "• MODEL277",
  "• AI CONFIRMATION … 90% CERTAINTY" with a line-drawn python, "• INVASIVE HOTSPOTS" isometric lime heat-map, "• DATA
  SOURCES / SATELLITES". Feature captions numbered **"001 · BODY CAM" (captured mid-scramble as "BODY CALR"), "002 · PREDICTIVE HEATMAP"** in JetBrains Mono
  lime, 4-line body underneath. A lime band closes with an oversized open-quote glyph and a "001 / 003" counter + rule.
- The "SCROLL" ring indicator rides along with the content (sits on the figure's hip) — a persistent scroll affordance.
- **Hero**: full-bleed aerial photograph of a river delta; 72px/64.8px (0.9) NB International Pro 400, −0.03em, cream
  #F4F3E8: "Invasions move fast. / Be faster." left-aligned at ~y 140. Lime CTA "EXPLORE ORIGIN" — JetBrains Mono 12.6px
  uppercase, weight 300, radius 3.6px, h 41, bg #EBFC72, text #13140E. Tiny "INVERSA" wordmark top-left, "Menu ⌖" top-right.
  A circular "SCROLL" ring indicator (lime arc progress) in mid-frame and a thin vertical progress bar on the right edge.
- **Scroll story**: one pinned hero image is progressively **pixel-masked**: square tiles of the image drop out from the
  edges (stepped, 8-bit-like) leaving a ragged tile island on #13140E, then a **grid of hairline squares and coloured dots
  (lime, coral #F1664D)** overlays it like a GIS command map with a "FIELD SPECIALIST" lime tag and a red "HOTSPOT" pulse.
  Section labels in mono uppercase with a bullet "• DAMAGED ECOSYSTEMS", "• ONE CLICK INVASIVE MANAGEMENT".
- **Text scramble**: captured mid-animation the mono labels read "DAMAGED ECOSYYWDAK", "ONE CLICK INVASIVE MANBBKULMB" —
  i.e., **decode/scramble text reveal** on mono labels (keyframes `blink`, `flash`, `flicker`).
- **Sections**: home-hero (3600px pinned), values (#F4F3E8, "Inversa is where economics, ecology, and efficiency meet."),
  harvester (#12120C), quotes on lime #EBFC72 with 72px quote text in #13140E.
- **Grid/background**: CSS background of 1px hairline grid lines at 5% cream opacity; repeating-linear-gradient stripes in lime.
- **Motion**: CSS `cubic-bezier(1,0,0,1)` + 1s (×23) and 0.25s; Lenis-style virtual scroll; SplitText.
- 33% uppercase text (all the mono labels).

### 5. Amaterasu — amaterasu.ai (Exo Ape) — deep-tech/mental health
- **Gate**: WebGL fluid gradient (navy #183969 → teal #75CDD6) with a "flower of life" of hairline circles and a central
  ring "CLICK TO ENTER" (tiny 10px uppercase +0.16em). Nothing proceeds until click (audio/experience opt-in).
- **Hero after click**: profile portrait (woman, eyes closed) tinted teal; headline right-aligned to the portrait's face:
  "Empower / your mental / health journey" **TWK Lausanne 200, 60px/60px, −0.033em**, white; small indigo pill CTA
  "+ START YOUR JOURNEY"; spaced wordmark "AMATERASU" (10px, +0.16em) top-centre; right column 10px description.
- **Signature reveals**: (a) **per-word blur-to-sharp** text reveal — captured with words graduated from sharp to
  blur(10px) along the line (filters blur 3/5/10/50px measured); (b) a **circle mask expanding from the bottom** of a white
  section until the circular gradient fills the viewport; (c) numbered chapters "01 / 02 / 03" inside a small circular
  progress ring that travels around the canvas; (d) a horizontal process diagram of large hairline circles joined by
  arrows ("EVALUATION → ASSESSMENT CONTINUED → DIAGNOSTIC → RE-DO INITIAL ASSESSMENT").
- **Type**: Lausanne 200/250 only (thin), body 26px/32px (large, airy), micro 10px +0.16em uppercase, NeoSansPro for labels.
- 12 cols gap 20px; margins 40px. Copy: "Our minds are a deep reflection of nature, yet our internal world has driven too
  far from natural order." Story-first, no feature grid.

### 6. Fluid Glass — fluid.glass (Exo Ape) — architectural glazing 
- **Intro (seen)**: warm paper #F3F0EC with a tiny rotating black cube (keyframe `cube-rotate`) → a darker #E4E0DC
  panel with the logo centered and a black slab rising from the bottom edge (curtain wipe) → dark hero.
- **Hero (seen)**: centered wordmark "Fluid Glass" top, "↳ GET A QUOTE" mono top-right; 2-line centered statement at the
  bottom third (57.6px white); hero video did not render headless (dark #212325 field).
- **Floating dock nav**: a small dark capsule fixed at bottom-centre: logo icon │ current page "HOME" │ burger — the nav
  lives at the bottom of the viewport, not the top.
- Section kickers "◆ GLAZING SPECIALISTS", "◆ ABOUT FLUID GLASS", "◆ PRODUCT COLLECTION" — diamond bullet + mono 11px
  +0.08em, sitting on a full-width hairline; body text right-aligned in a narrow 5-col block. Manifesto paragraphs centered
  at display size with a single black "↳ WHO WE ARE" button under them. "↳" arrow prefix on every button (also cookie
  ACCEPT/DENY) — same tic as Populous.
- Aeonik Pro 400 display **57.6px/57.6px −0.03em**; **Aeonik Mono 11px +0.08em uppercase is the most frequent style
  (265 nodes)**; 52% uppercase. Long manifesto paragraphs set at display size split into lines ("We bring architecture to
  life through / craft and innovation. Trusted by / architects who demand precision, / beauty, and care.").
- **Grid: 24 columns, gap 18px, side margin 36px.** Radius 0 on buttons; 112 circular (50%) elements (dots/indicators).
- Buttons: 10.8px mono uppercase, padding 13.5×21.6, bg #0B1012 / white-20% on dark; **label text duplicated in DOM
  ("WHO WE ARE WHO WE ARE")** = vertical roll-over hover (two stacked copies, translateY −100% on hover).
- Colors: ink #212325, deep #0B1012, warm paper #F3F0EC; text at 80% opacity for secondary.
- Motion: GSAP power3.inOut ×18 / power3.out, durations .6/1.2/1, stagger .05/.02; CSS `cubic-bezier(1,0,0,1)` 0.5s.
- Sections: home-header → text-cta → product-collection (Doors / Windows / Additional / Structural) → banner-showroom
  (dark #212325, 1800px pinned) → featured projects (Orchard House, Ashmead Barn, Keepers Cottage…) → assets-duo →
  google-reviews → banner-cta. Footer "Crafted by Exo Ape".

### 7. Pixelflakes — pixelflakes.com (Exo Ape) — archviz studio 
- **Seen**: stone background (#C8C2BB→#E4DDD4), spaced-caps wordmark "PIXELFLAKES" top-left, nav as a **stacked
  4-line column** (Gallery / Case Studies / About / Contact, 16px) at grid col 4, square dark 60px menu button top-right.
  Statement with a **hanging first-line indent** ("            Pixelflakes is an architectural / marketing firm [■] composed
  of / creatives…") and the **brand mark inline as a glyph inside the sentence**. Wordmark collapses to the square mark on
  scroll. Full-width video of a designer at work, caption row under it: "We champion → Artistic value" where the last
  words **roll vertically** (slot-machine word swap: Creativity / Artistic value…) above a hairline. "• SELECTED WORK"
  dot-label; project images placed asymmetrically (one large left, one small lower-right), dark "• VIEW" tag on hover.
- At Hauss Std 400, display 64px/70px −0.039em; 32px/40px −0.031em; body 15–16px +0.013em. Statement: "We specialise in
  architectural visualisation, animation and interactive." — the menu items themselves are 64px ("Gallery / Case Studies
  / About / Contact"). "We champion → Creativity" rotating-word line.
- **15-column grid, gap 20px, side margin 30px.** Body bg #040508 (dark), panels #242320 / #E4DDD4 (warm stone).
- GSAP expo.inOut ×32, expo.out ×25, durations 1 / .5 / .75, staggers .05/.1; CSS `cubic-bezier(1,0,0,1)` 0.5s.

### 8. Glyphic Biotechnologies — glyphic.bio (Obys) — biotech  ★
- **Later frames (seen)**: full-bleed macro of bead strands with step labels in translucent chips ("2 MOLECULAR EXPANSION" /
  "ORDERED EXPANSION OF AMINO ACIDS"); a **rain of vertical amino-acid letter columns** (L K Y C H L L V…) in grey on white;
  then the giant wordmark "Glyphic / Biotechnologies" (~190px, ink) with a **3D bead ring floating over the letters**;
  info row: "2 │ ● GLYPHIC BIOTECHNOLOGIES │ paragraph │ Since 2021" on hairlines. Small "glyphic//bio" chip above the wordmark.
- **Preloader**: pale #F0F4F7 field, centered "glyphic//bio" wordmark sitting on a full-width hairline, and a
  **parenthesised percentage counter "(0%)"** bottom-centre. (Headless never progressed past 0% at 7 s — heavy 3D assets;
  with 30 s wait the site loaded.)
- **Hero**: soft-focus 3D render of pastel bead-chains (protein strands) with floating sequence labels ("LKYCHLLVL",
  "SSPY", "TGYV" — mono tags with a dot + leader line). Headline top-left "Protein Sequencing / by Expansion / (ProSE™)"
  **70px/70px, weight 500, −0.04em**, ink #2C2D32; second column 22px intro; dark "Turn the Page →" button where the arrow
  is a separate square cell; nav as **small grey pill tabs** (Technology / About Us / Careers) centred, "Contact Us →" right.
- **Giant wordmark**: "Glyphic Biotechnologies" at **190px/180px, −0.05em** (with transparent fill — likely a
  clip/outlined or video-masked treatment).
- **Section system**: big numeral "1" at left + 70px title "Introducing ProSE™" offset to col 4; below, a 2-column
  sticky-scroll: left = 3D strand morphing per step (WebGL), right = accordion steps "[1] Sample Preparation /
  [2] Molecular Expansion / [3] Amino Acid Sequencing" (34px; inactive steps at #E8E9F5 very light; number in a dark
  square chip), hairline rules between, "● TECHNOLOGY" dot-label and year "2026" in corners.
- **Type**: single family ("fontPrimary", grotesk) 500/400; 15/14 body; 22, 34, 70, 190 display; −0.02 → −0.05em tracking.
- **Color**: #2C2D32 ink, greys #696A6F / #A4A4A4, lavender-white #E8E9F5, #F3F4F7 panels; radius 4–5px chips.
- **Motion**: CSS `cubic-bezier(0.68,-0.55,0.27,1.55)` (back-in-out overshoot) ×30, `cubic-bezier(0.77,0,0.18,1)` ×12,
  durations .5/.55/.8/.9s; keyframes arrowRoll/arrowRollRight (arrow-replace hover); 120 clip-path elements; 28 backdrop
  filters; Lenis; SplitText.
- Patents shown as data pills ("11,499,979 Jan 8, 2019") — evidence-as-UI.

### 9. AYOCIN ATMOS — ayocin.com (Obys) — wellness hardware 
- **Hero (seen)**: product-as-architecture — **"ATMOS LAMP®" wordmark spans the full width (~240px, cream #FCF6EC) and the
  lamp render stands IN FRONT of it**, covering the middle letters (type behind object = depth). Background: soft shadow
  of leaves on a warm wall. The viewport is ruled into bands by hairlines (under nav, under wordmark, above footer row).
  Corners carry metadata: "• Improving your health & well-being" (left), icon list "Air purification / Full spectrum
  lighting / Red light therapy" (right), "© 2026", "SCROLL DOWN", "• ATMOS". Bottom-left 36px statement "Bringing natural
  / light and fresh air / inside your home." Nav centered 14px; "Order Now" dark pill with a **white circle holding the
  arrow** inset at the right end.
- **Then**: full-bleed misty forest; centered 60px statements swap per scroll step ("Nature is part of who we are…" →
  "However, we're becoming more isolated from nature than ever before") with a **frosted glass card** (backdrop-blur,
  icon in a hairline circle, 12px text) docked right.
- Systemia 500 **240px/192px (0.8) UPPERCASE** section titles ("HEALTH STATION", "GET THE SUN INSIDE", "OUR MISSION");
  Azeret Mono **170px numerals with −0.08em** ("80", "00" — a counting stat); 60px/60px narrative lines; 36 / 14 / 12.
- Warm palette: cocoa #2E2521 ↔ cream #FCF6EC, alternating section inversions; blurred light blobs (blur 64–80px) for sun glow.
- 12 cols gap 18px, margin 18px. Pill CTA "Order Now" radius 20px, padding 10/60/10/20 (space reserved for an arrow icon).
- GSAP power2.inOut/none(scrub), durations 1/2/1.5, staggers .1/.15, ScrollTrigger "top bottom", "top top", "top center-=50";
  SplitText lines; CSS `cubic-bezier(0.77,0,0.18,1)` ×29. 20 sticky elements (stacked sticky narrative).

### 10. Terminal Industries — terminal-industries.com (Rejouice) — logistics AI 
- **Hero (seen)**: cinematic side-profile of a semi truck at dusk (peach sky → black ground), almost no text — only
  "SCROLL TO EXPLORE" in spaced mono inside the trailer. **Floating capsule nav** (grey translucent, backdrop-blur,
  radius 8px, inset ~226px from the sides): logo, 4 dropdowns + About, phone icon square, three stacked-2-line uppercase
  CTA tiles (lime "EXPLORE PRODUCT", white "REQUEST DEMO", grey "CONTACT US").
- **Notches**: section edges have a **tab/notch cut** (the hero image's bottom edge steps down in the middle; the dark
  savings panel has a notch tab on top) — a brand shape echoing a loading dock.
- Statement "Powering the yards behind / the brands you know" 70px centered; **logo wall on a hairline grid with "+"
  crosshairs at intersections**, one cell tinted lime-glow; drone top-down yard video with mono data labels
  ("• AMERICAN FREIGHT") — computer-vision HUD; two-tone heading "One Modular Platform (grey) Infinite Possibilities (ink)";
  calculator form with underline inputs vs dark-green result panel "$ 641,626"; FAQ with mono filter chips.
- Suisse Int'l 400/450/600 + **Geist Mono** labels at **0.18em tracking, 11–13px**; display 70px/70px −0.051em; 46px.
  Body 14px **+0.03em** (positive tracking on small UI text), 18px +0.02em.
- Palette: deep teal-black **#052424**, acid lime **#ABFF02** CTA, greys. CTA "EXPLORE PRODUCT" 11px/600, radius 8px.
- Sections labelled "notch-section" — panels with a notch cut-out shape. Logo wall, product grid, interactive savings
  calculator ("What's your yard costing you?"), FAQ.
- GSAP **expo.inOut ×10 (1.2s)**, CustomEase "fastInOut", expo.out, stagger `{each:.04, from:"end"}`; CSS
  `cubic-bezier(0.19,1,0.22,1)` (expo-out) ×39 & `(0.16,1,0.3,1)`; SVG filters url(#…) on 4 elements (displacement/gooey).

### 11. ICOMAT — icomat.co.uk (Rejouice) — aerospace composites 
- **Intro (seen)**: ~6 s of flat #F8F8F8 (loader hidden class), then a dark #080808 hero: monochrome macro render of
  **steered carbon-fibre sheets** sweeping diagonally; headline bottom-left "Engineer / Without Limits™" (~73px white);
  2-tone intro paragraph right-of-centre (first sentence white, second grey). Nav is a compact dark capsule of mono 11px
  items + a white "BUILD W/ ICOMAT" chip; logo top-left.
- **3D product on a technical grid**: the composite part floats over a hairline grid with dot/cross intersections and
  callout chips "AT SCALE ⊕", "ZERO DEFECTS ⊕", "10× FASTER ⊕" (mono 11px, dark chips, circled plus). Scroll is pinned
  through this sequence (several identical frames while the scene scrubs).
- Lay Grotesk Semibold display 73px/70px (0.96) −0.015em and 48px −0.01em; **AkkuratMono 11–12px +0.02em** labels;
  **Doto** (dot-matrix variable font) for numerals ("O1…O7"). Body 18px +0.011em.
- Statement split where key words are ink #080808 and the rest pale #CFD9E0: "ICOMAT invented RTS. Rapid Tow Shearing."
  then "End-to-end production" greyed — **two-tone headline emphasis**.
- Giant CTA "BUILD WITH ICOMAT" — 107px tall, radius 35.7px, padding 43.6×54.5, bg #080808.
- Heaviest motion vocabulary in the set: GSAP power2.out ×46, power3.out ×21, back.out(2) ×10; durations 1/.5/.8/.7;
  staggers .05/.03/{amount:1}/{each:.045, ease:"power3.in"}; SplitText **lines ×38, words ×24**; ScrollTrigger "top bottom" ×24.
- Colors: #F8F8F8 paper, #080808, #CFD9E0 steel-blue grey.

### 12. Noovo — noovolife.com (Rejouice; current build not re-verified)
- General Sans; 70px/63px (0.9) −0.04em hero lines "Welcome to the / great indoors."; dense negative tracking even on
  small text (−0.036em@14, −0.05em@20). Saffron #FFB31A/#FFAC00 CTAs, ink #131211, paper #F9F7F4; pill buttons radius 30px.
  48 elements with `mix-blend-mode: plus-lighter`. More DTC-commerce than editorial.

### 13. FIND Real Estate — findrealestate.com (Cuberto) — real estate 
- **Seen**: the hero imagery did not render in headless (white field under the nav) — not assessed. Nav: "F1ND" wordmark,
  centered 15px links with chevrons, outlined "BETA" micro-pill + black "Sign In" pill.
- **Buy / Sell / Rent rows** on #151717: three full-width rows separated by hairlines; left: circled number (1)(2)(3) +
  5-line 14px white paragraph; centre: the word at 180px −0.05em; on hover the word gets a 2px underline and a **giant
  thin arrow →** appears at the right. A service menu as typography.
- **Two-tone statements**: "This isn't just (ink) about real estate. (grey)", "Don't Rent Your Career. (ink) Own it. (grey)",
  and a paragraph whose first sentence is ink and the rest #B3B3B3. Listing cards: radius 12px, 1px border, price 24px.
- Instrument Sans + **Lora** (serif accent). Hero: "Buy / Sell / Rent" rotating at **180px/171px, −0.05em**, white over
  imagery (4500px hero = pinned scroll sequence); "Find What Moves You" 105px/700. "Blog & *Resources*" with the 2nd word
  in grey #B3B3B3 (two-tone heading).
- Pills radius 100px, cards radius 12px; margins 75px; `cubic-bezier(0.16,1,0.3,1)` (expo-out) ×23 plus playful overshoot
  `cubic-bezier(0.34,3.56,0.64,1)` on micro-interactions.

### 14. Makers Fund — makersfund.com (monopo) — VC/finance 
- **Seen**: preloader = the Makers hex mark in coral on deep indigo (#27214A-ish), centered. Hero: white with faint pink/blue
  radial glows; uppercase 70px statement left with **gradient-filled keywords** (BUILDERS, ENTERTAINMENT — coral→blue via
  background-clip:text); right: **3D glass/crystal hexagon logo** (R3F) rotating; "Scroll to discover ⊙↓" right; a
  vertical **"News" drawer tab** on an electric-blue strip at the right edge with thumbnails peeking. Two-bar gradient burger.
- Styrene A 700 **UPPERCASE 70px/70px −0.03em** statements mixed with a lowercase lead-in "We Support / INNOVATIVE,
  AMBITIOUS FOUNDERS"; HK Grotesk 20px body. Ink #23232B on #FCFCFC; electric blue #393ADC; gradient #FF4F52→#393ADC
  used as **background-clip:text** (5 elements).
- GSAP power2.easeOut .4s (×28), grid staggers `{from:0, amount:.6, grid:[9,0], axis:"y"}`; Lenis lerp .1/.05; R3F canvas.

### 15. Lightfield — lightfield.app (darkroom.engineering) — AI CRM 
- **Seen**: small floating capsule nav (logo + 5 links + "Log in" + black "Request demo"); a manifesto written as a narrow
  ~520px essay column (14–15px, generous paragraph spacing) — letter-from-the-founders tone; documentary photo of the
  founders at a table; section header "What customers do with Lightfield" with mono index "SOLUTIONS … 1.0" pinned to the
  right edge. Editorial restraint applied to SaaS (no gradients, no hero mockup on first screen).
- Product-dense SaaS: Inter + untitledSans + DM Mono 10px +0.1em uppercase labels; headings only 28px/33.6px −0.03em —
  restraint: no giant display type; text colour by opacity (lab 0 / .85, .6, .5).
- 1px hairlines everywhere (118× `1px solid rgba(0,0,0,.06)`), radius 1–6px, 5- and 7-column table grids.
- Framer-Motion springs: `stiffness:500, damping:25`, `visualDuration:.2, bounce:.25`, `stiffness:100, damping:10`;
  `cubic-bezier(0.16,1,0.3,1)`, `(0.87,0,0.13,1)`; keyframes `fade-blur-in`, `word-fade-in`, `cursor-blink`.

### 16. Scout Motors — scoutmotors.com (Locomotive) — automotive 
- **Hero (seen)**: cinematic video (two vehicles in golden-hour grassland); **nav split into two white cards** (main: script
  logo + TRAVELER SUV / TERRA TRUCK mono; second: RESERVE + grey burger) joined by small orange/grey tick marks; headline
  bottom-centre "Scouts always come back." ~72px white with a hairline under it, legal line 14px centered, "EST 2022" mono
  bottom-right. Section 2: "An off-road / icon reborn." with an orange hand-drawn underline under "off-road".
- **Archive section**: grainy paper texture, giant navy "An Icon" display type with **fanned archival photo cards**
  (white-bordered prints numbered 01–04, rotated along an arc) laid over the type; a red "1961" outlined date tag and a
  short history paragraph. Floating orange card "Be one of the pioneers. / RESERVE NOW" bottom-right.
  (Further frames were grey — lazy media did not load headless.)
- Custom Scout Sans family (regular / medium / semicond-bold / wide-medium) + IBM Plex Mono. Display **270px/222px
  (0.82) −0.02em** "An Icon / From / Day One" (last line orange #FF5432), and a **504px "RESERVE"** wordmark.
- Navy #11232F, orange #FF5432, warm grey #EDE9E8. 2px radius. CSS `cubic-bezier(0.38,0.005,0.215,1)` ×83 at 0.4/0.3/0.6s.
- 100px side margins; 2-col gap 4px image grids (near-gapless).

### 17. Pangram Pangram — pangrampangram.com (weak reference)
- Commerce template: 20px-radius full-width image cards with a centered font name (e.g., Neue Gstaad 121px), "New" red
  pills (#FF2F00), "Aa" specimen tiles, logo wall. Useful only as a counter-example of how far a templated Shopify skin
  drifts from the agency craft level; specimen-tile idea ("Aa" at 100px in a grey card) is fine.

### A1. Exo Ape homepage (agency, for comparison)
- Lausanne 300 at **250px/183px (0.73) −0.046em** "Digital / Design / Experience"; "Play / Reel" 144px/110px; 24px/32px
  intro. 12 cols gap 32px, margins 120px. GSAP linear ×40 (scrubbed), duration 1 ×79, stagger .1 ×18; SplitText lines.
  Palette #0D0E13 / #E4E0DB / sand #E0CCBB.

### A2. Locomotive homepage (agency)
- LocomotiveNew (custom) 110px project names in a list (Lightship / Wolverine Worldwide / The Drake Hotel / Dulcedo /
  Scout Motors / All Work), Helvetica Now Display 26px body/nav, 70px headings. Pure #000/#FFF. Framer-style springs
  `{stiffness:.95, damping:.65, mass:10}`; GSAP power1.inOut, staggers .04/.02; SplitText chars+words; 12 cols gap 20px,
  40px margins. Emoji-laden irreverent copy ("🔶 Locomotive® Digital-first Design Agency🍺🔞").

---

## Cross-site patterns (numeric)

**Display type**
- Hero display size at 1440w: 58–80px for "sentence" headlines (Populous 80, Inversa 72, Glyphic 70, Terminal 70, ICOMAT 73,
  Makers 70, Noovo 70, Fluid 58, Amaterasu 60, Pixelflakes 64); 110–270px for "word" headlines (Drake 110, Studio D 128,
  FIND 180, Glyphic 190, Studio D footer 200, Ayocin 240, Exo Ape 250, Scout 270; outlier Scout 504 "RESERVE").
  → Rule: a sentence headline lives at ~5–5.5vw; a 1–3-word headline at 9–18vw.
- Line-height on display: **0.66–1.0**. Median ≈ 0.9. (Studio D 0.66, Exo Ape 0.73, Ayocin 0.8, Scout 0.82, Drake 0.85,
  Inversa 0.9, Noovo 0.9, FIND 0.95, Glyphic 0.95, ICOMAT 0.96, Populous 1.0, Terminal 1.0, Glyphic hero 1.0, Pixelflakes 1.09.) Never ≥1.1.
- Tracking on display: **−0.03 to −0.05em** (Populous −0.05, Studio D −0.031/−0.05, Glyphic −0.04/−0.05, FIND −0.05,
  Exo Ape −0.046, Terminal −0.051, Inversa −0.03, Fluid −0.03, Drake −0.03, Makers −0.03, Noovo −0.04, Pixelflakes −0.039).
  Lighter tracking (−0.015/−0.02) only for semibold/condensed customs (ICOMAT, Scout).
- Display weight: **300–500** dominates (PolySans Slim 300, Lausanne 200/300, Suisse 400, Aeonik 400, Sequel 415,
  Glyphic 500). Bold 700 display appears only in Makers Fund (uppercase) and FIND's secondary line.
- Second tier: 36–48px (Populous 36 −0.05, ICOMAT 48 −0.01, Terminal 46 −0.01, Fluid 36 −0.02, Ayocin 36).
- Body: 14–18px; long-form intro 22–26px (Glyphic 22, Amaterasu 26/32, Exo Ape 24/32).

**Micro-labels** (the editorial "metadata layer")
- Monospace uppercase micro labels on 9 of 17 sites: Maison Mono 10px (Drake), JetBrains Mono 12.6px (Inversa), Aeonik
  Mono 11px **+0.08em** (Fluid), Geist Mono 11–13px **+0.18em** (Terminal), AkkuratMono 11–12px +0.02em (ICOMAT),
  DM Mono 10px +0.1em (Lightfield), IBM Plex Mono (Scout), Azeret Mono numerals (Ayocin), Doto dot-matrix numerals (ICOMAT).
- Non-mono small labels: 10–12px, **+0.04 to +0.16em** tracking (Populous 12px +0.04, Amaterasu 10px +0.16).
- Serif italic as the *kicker/quote* voice (Studio D Ivar Text Italic; Drake italic word; FIND Lora). Serif is an
  accent, never the body.
- Numbering: "01 / 02 / 03" (Drake property rail, Studio D services + vertical "01 Services", Amaterasu chapter ring),
  big bare numeral "1" (Glyphic), "O1…O7" dot-matrix (ICOMAT), "(0%)" parenthesised preloader (Glyphic).

**Grid & spacing**
- Column counts: 12 (most), **15 (Pixelflakes), 16 (Studio D), 24 (Fluid Glass)** — Exo Ape uses dense grids for
  asymmetric placement. Gutters 15–32px (mode 20px).
- Side margins at 1440: tight 18–48px (Ayocin 18, Glyphic 20, ICOMAT 20, Pixelflakes 30, Drake 32, Fluid 36, Locomotive 40,
  Lightfield 48) or generous 100–120px (Scout 100, Populous 106, Studio D 118, Exo Ape 120). Nothing in between ~50–90
  except FIND 75 and Terminal 70.

**Color**
- One ink + one paper + ≤2 accents. Inks are rarely pure black: #1E1D1C, #222223, #2C2D32, #13140E, #052424, #212325,
  #23232B, #2E2521, #0D0E13. Papers rarely pure white: #F2EDE4, #F4F3E8, #F3F0EC, #FCF6EC, #F8F8F8, #F9F7F4, #E4DDD4.
- Accents are single, saturated, used <5% of area: lime #EBFC72 / #ABFF02, orange #FF5432, ultramarine #1C19B5,
  burgundy #672B3C, saffron #FFB31A, electric blue #393ADC.

**Motion**
- Eases: expo family dominates craft studios — GSAP **expo.out / expo.inOut** (Exo Ape, Terminal), CSS
  **cubic-bezier(1,0,0,1)** (Exo Ape UI), `cubic-bezier(0.19,1,0.22,1)` / `(0.16,1,0.3,1)` (expo-out: Terminal, FIND,
  Lightfield), easeOutCubic `cubic-bezier(0.215,0.61,0.355,1)` (Populous, Locomotive), quart in-out
  `cubic-bezier(0.77,0,0.175,1)` (Populous, Glyphic, Ayocin).
- Durations: reveals **0.9–1.2s** (Populous .9, Exo Ape 1, Terminal 1.2, ICOMAT 1); UI hovers 0.2–0.5s.
- Staggers: **0.02–0.1s per item**; Exo Ape staggers often `from:"end"` or `from:"center"`.
- Text splits: lines (most common), words (ICOMAT, Amaterasu blur), chars (Locomotive homepage). Mono labels get
  scramble/decode (Inversa).
- Smooth scroll: Lenis on 14/17; lerp 0.1 where measured (Populous, Makers), Makers also 0.05. Exo Ape builds use a
  fixed `.scroll.lenis` container (virtual scroll; document height = 1 viewport).
- Page transitions: Swup on Locomotive's WP builds (Populous, Drake) and Ayocin.
- Custom cursor on 12/17.

**Composition & chrome (seen across screenshots)**
- **Type + object layering**: product/3D object placed in front of a full-width wordmark (Ayocin lamp over "ATMOS LAMP®",
  Glyphic bead ring over "Biotechnologies", Scout photo fan over "An Icon", Studio D headline over the image). 4 of the
  top references use it.
- **Hairline-ruled viewports**: the hero is divided by 1px rules into bands with metadata in the corners (Ayocin, Glyphic
  info rows, Fluid kickers on rules, Populous discipline list, Drake rails). Corners hold "© 2026", "SCROLL DOWN",
  "Since 2021", "EST 2022", section indices.
- **Technical-grid backdrops with crosshair intersections** for B2B/deep-tech: Terminal logo wall, ICOMAT 3D part,
  Inversa GIS grid; callout chips with ⊕ or • markers.
- **Nav forms** (none is a classic full-width bar): floating capsule (Terminal, ICOMAT, Lightfield), bottom-centre dock
  (Fluid Glass), split cards (Scout), bordered cells (Drake), grid-column text index (Populous, Pixelflakes), single
  wordmark + round/square menu button (Studio D, Inversa, Exo Ape).
- **Wordmark collapse to monogram** on scroll: Studio D, Populous, Drake, Pixelflakes.
- **Preloaders** are tiny and typographic: Populous spinner, Glyphic "(0%)" on a rule, Fluid rotating cube + curtain,
  Makers hex mark on indigo, Amaterasu click-to-enter ring. None exceed one mark + one number.
- **Hero text position**: bottom-left (Populous, ICOMAT, Drake, Ayocin statement, Inversa end-state), bottom-centre
  (Scout, Fluid), top-left (Glyphic), or overlapping media (Studio D). Vertically-centred-on-everything heroes are absent.
- **Two-tone emphasis** (ink + 30–40% grey in the same sentence): ICOMAT, FIND, Terminal, Lightfield (opacity .85/.5).

---

## Signature techniques worth stealing (implementation detail)

1. **Headline that trespasses into the image** (Studio D). Grid: headline spans cols 2–9 of 16, image cols 8–13; give
   the text `position:relative; z-index:2; mix-blend-mode:normal` and let the last 1–2 letters overlap the image by
   40–80px. Display: 128px, line-height 0.66–0.75 (descenders will collide — intentionally), −0.03em, weight 300.
2. **Italic-serif kicker over a light grotesk** (Studio D): `font: italic 16px/1.3 "Ivar Text"` above a 300-weight
   grotesk display; reuse the italic for quotes and "More projects" labels. One accent family, one role.
3. **Vertical section index in the margin** (Studio D): `position:fixed; left:18px; bottom:24px; writing-mode:vertical-rl;
   transform:rotate(180deg); font-size:11px` showing "01  Services" → "02  Featured projects" → "03  Portfolio"
   → "04  About us", swapped on ScrollTrigger enter.
4. **Logo collapse on scroll** ("Studio D" → "D", "POPULOUS" → "P" square, "THE DRAKE" → "D"): clip the wordmark width
   from 100% to the first glyph with `clip-path: inset(0 calc(100% - 1ch) 0 0)` over 0.5s `cubic-bezier(1,0,0,1)`.
5. **Picture-in-picture project slide** (Studio D): full-bleed image + a second ~30vw inset image of the same project
   offset right, white 96px title overlapping both, tiny category label above, "+" circle. On scroll, inset parallaxes
   at ~0.15× faster than the background.
6. **Infinite footer marquee at 200px** (Studio D "Talk to us. Talk to us."): `white-space:nowrap; animation: marquee
   20–30s linear infinite` on a duplicated span, cream on warm near-black, followed by a human contact card with photo.
7. **Word-chip headlines** (Drake): split headline into words; each `<span>` gets `background:#fff; border:1px solid
   currentColor; border-radius:5px; padding:0 .08em; margin-right:-1px` with line-height 0.85 so chips butt vertically.
   Reveal each chip with `clip-path: inset(0 100% 0 0) → inset(0)` stagger 0.06s.
8. **Boxed-cell navigation** (Drake): nav items as adjacent bordered cells (1px, radius 0, 12px mono uppercase, 14×12
   padding, h 44). Works for hospitality/culture brands needing many entry points without a hamburger.
9. **Grid-column nav** (Populous): split top-level links into 2 stacked columns of 3 aligned to grid columns instead of a
   horizontal row. Reads as editorial index, not a menu bar.
10. **Arrow-prefixed micro-buttons** (Populous): "↳ View all", "→ Next" at 12px/500, padding 6×12, radius 4, 1px border.
11. **Pixel-tile mask transition** (Inversa): pinned image; on scroll, square tiles (e.g., 40px cells in a canvas or CSS
    grid of divs with `opacity`/`scale(0)`) drop out from the edges inward with random stagger, revealing a hairline GIS
    grid + data dots. Pair with mono labels that **scramble-decode** (random A–Z per char for ~400ms, resolving left→right).
12. **Blur-word reveal** (Amaterasu): SplitText words; `from {filter: blur(10px); opacity:0}` to `{blur(0); opacity:1}`,
    stagger 0.04–0.06, scrubbed to scroll so a line is partly sharp, partly blurred mid-scroll.
13. **Circle-mask section entrance** (Amaterasu): `clip-path: circle(0% at 50% 100%) → circle(150% at 50% 100%)` scrubbed
    over ~100vh, revealing a WebGL gradient section from the bottom edge.
14. **Parenthesised % preloader** (Glyphic): wordmark centered on a full-width 1px rule, "(0%)" → "(100%)" bottom-centre,
    14px; exit by sliding the rule/wordmark up with expo.inOut 1s.
15. **Sticky accordion steps + 3D object** (Glyphic): left half sticky WebGL object morphing per step; right half list of
    steps, active at ink #2C2D32, inactive at #E8E9F5, numbered in a dark square chip; hairline separators.
16. **Two-tone headline emphasis** (ICOMAT, FIND): key phrase in ink, remainder in pale (#CFD9E0 / #B3B3B3) — the hierarchy
    is in colour, not size.
17. **Roll-over button labels** (Fluid Glass): render label twice inside an `overflow:hidden` span; on hover translate
    both −100% with 0.5s `cubic-bezier(1,0,0,1)`.
18. **Dense 15/16/24-column grids** for asymmetric scattering of small images (Exo Ape): place 3–5 small squares at
    different column starts and vertical offsets; never align them in a row.
19. **Giant numerals in mono** (Ayocin "80"/"00" at 170px −0.08em Azeret Mono; ICOMAT Doto "O1…O7"): stats as typography.
20. **Easing kit**: reveal `expo.out 1s` / `cubic-bezier(0.19,1,0.22,1)`; panel/page `expo.inOut 1–1.2s` or
    `cubic-bezier(0.77,0,0.175,1)`; UI hover `cubic-bezier(1,0,0,1) .3–.5s` or easeOutCubic `.3s`; stagger .05–.1.

21. **Object-in-front-of-wordmark hero** (Ayocin): wordmark `font-size: 16.5vw; line-height:.8; width:100%;
    text-transform:uppercase` in a `z-index:1` layer; product PNG/WebGL in `z-index:2`, centered, bottom-anchored, height
    ~90vh so it covers the middle letters; hairline rules (`border-top:1px solid rgba(255,255,255,.3)`) above and below the
    wordmark; four corner metadata labels at 12–14px.
22. **Floating dock nav at the bottom** (Fluid Glass): `position:fixed; bottom:24px; left:50%; translate:-50%;` dark
    capsule ~250×44: icon │ current-page label (mono 11px) │ burger; opens a full-screen menu.
23. **Notched section edges** (Terminal): `clip-path: polygon(0 0,100% 0,100% calc(100% - 24px),60% calc(100% - 24px),
    calc(60% - 24px) 100%, 40% 100% ...)` — a single brand-derived cut shape reused on images and panels.
24. **Chamfered HUD cards** (Inversa): `clip-path: polygon(16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,
    0 100%,0 16px)` + 1px border via an inner pseudo-element; mono "• LABEL" top-left, value top-right.
25. **Crosshair hairline grid** (Terminal/ICOMAT): `background-image: linear-gradient(to right, rgba(0,0,0,.06) 1px,
    transparent 1px), linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px); background-size: 112px 112px;` plus small "+"
    SVGs at intersections; highlight one cell with a radial accent glow on hover.
26. **Service rows as giant words** (FIND): 3 rows, each `display:grid; grid-template-columns: 40px 220px 1fr 120px;`
    number in a 24px circle, short paragraph, 180px word, arrow that slides in (`translateX(-40px)→0, opacity 0→1`, 0.6s
    `cubic-bezier(0.16,1,0.3,1)`) with 2px underline under the word on hover.
27. **Slot-machine word swap** (Pixelflakes "We champion → Creativity / Artistic value"): fixed-height `overflow:hidden`
    span, stacked words, `translateY(-100% * i)` every 2–3 s with `expo.inOut 1s`.
28. **Inline brand glyph in a sentence** (Pixelflakes): `<span class="glyph">` sized `1em × 1em` inline-block SVG mark in
    the middle of the 64px statement; first line indented with `text-indent: 2–3 columns`.
29. **Fanned archive cards over display type** (Scout): 4 photos with white 8px borders, `rotate(-24deg … 24deg)`,
    `transform-origin: 50% 300%` so they fan on an arc; scrub the rotation with scroll.

---

## What these sites never do
- Never center a long hero paragraph over a gradient blob; never use the "badge → H1 → subhead → two buttons" SaaS stack
  (only Lightfield, the SaaS outlier, approaches it — and even there headings are 28px, not 64px).
- Never use drop shadows on cards (box-shadow essentially absent; the one measured exception is Terminal's floating
  calculator panel, `0 40px 80px rgba(0,0,0,.25)` + 6% inset top highlight); depth comes from overlap, scale and blend.
- Accents stay scarce: 1 hue on most sites (Inversa lime, Terminal lime, Scout orange, Populous ultramarine); where
  there are more (Drake burgundy/lavender/green, Makers coral→blue) they are used as whole-section bands or a single
  gradient, never sprinkled on UI. Pure #000-on-#FFF body is rare (Locomotive's own site, Populous #010101).
- Never set display type with positive tracking or line-height above ~1.1 (max measured: Pixelflakes 64/70 = 1.09).
- Never use generic icon grids ("3 features with icons"). Features are numbered text blocks (01/02/03) with an image each.
- Never use stock-photo-style people shots without art direction: imagery is the client's own architecture/product/renders,
  often full-bleed video.
- Never put the nav in a heavy filled bar; nav is either floating text, small bordered cells, or a single "Menu" circle.
- Never show a big product-UI screenshot as the first screen, even for SaaS/deep-tech (Terminal opens on a truck,
  ICOMAT on carbon fibre, Glyphic on molecules, Lightfield on an essay + founders).
- Never use generic gradient-mesh backgrounds as decoration; when gradients appear they are the subject (Amaterasu fluid
  WebGL) or confined to text fill (Makers).
- Preloaders never use a decorated progress-bar widget or skeleton screens; they are one mark and/or one number
  (heavy-3D sites like Glyphic/ICOMAT do hold a plain field for several seconds while assets load).
- Rarely use rounded "card" UI; radii are 0–5px except deliberate pills (Studio D 42px, FIND 100px).

---

## Rankings — best references
1. **Studio D (Exo Ape)** — the purest editorial system: light 300 display with 0.66 leading, italic-serif kicker,
   headline overlapping media, vertical margin index, PiP project slides, marquee footer. Directly teachable.
2. **The Drake (Locomotive)** — proves editorial craft can carry personality: word-chip headlines, mono metadata layer,
   boxed nav, hand-drawn overlays, burgundy/lavender bands. Best for hospitality/culture.
3. **Glyphic (Obys)** — best "deep-tech made editorial": % preloader, 3D hero with mono data tags, numbered sticky
   accordion with WebGL object, giant wordmark.
4. **Inversa (Exo Ape)** — best scroll-story choreography: pixel-tile mask, GIS grid overlay, scramble mono labels, single
   lime accent on near-black olive.
Honourable: Ayocin (object-over-wordmark hero, ruled metadata corners — best product-launch reference), Terminal
Industries (how to make B2B logistics SaaS feel editorial: cinematic hero, crosshair grids, notch shapes, mono labels),
Populous (restraint + grid-column nav for a big corporate client), Amaterasu (blur-word + circle mask).

Weakest/least useful: Pangram Pangram (current templated Shopify build), Noovo (DTC-commerce, not re-verified),
Lightfield (good restraint but little transferable visual craft beyond hairlines + mono labels).
