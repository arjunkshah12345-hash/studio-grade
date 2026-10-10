# Cluster A — SaaS / startup / AI / dev-tool design studios

Evidence base = LIVE client sites shipped by studios, measured with `tools/analyze.mjs` at 1440x900
(+ `tools/asaas_probe.mjs`, a slow-scroll helper that measures h1s whose text is split into
single-char spans, which analyze.mjs skips). Raw data: `research/a-saas-studios/sites/<slug>/data.json`,
`shots/`, `probe/`.

Caveats, stated up front:
- Many scroll-triggered media (feature-card videos, canvases) did not paint in headless capture;
  blank regions in screenshots are noted as such, not described as "whitespace by design".
- Studio attribution: verified from studio case-study pages (basement.studio/showcase,
  bakkenbaeck.com/case/sierra, kargul.studio/work/*). Sites evolve after hand-off; noted per site.
- "est." = estimated from screenshot pixels, not from computed style.

## Studios surveyed (portfolio research)

| Studio | Tier / focus | Verified client sites (live) | Notes |
|---|---|---|---|
| **basement.studio** (Buenos Aires / US) | Top tier for AI + dev-tool marketing sites in 2024–26 | factory.ai (2025), daylightcomputer.com (2024, Awwwards SOTD + FWA SOTD + Awwwards Dev award), bfl.ai (2025), mintlify.com (2026, full redesign), baseten.co (2025, rebrand + site), cursor.com ("Websites & Features" 2025), also Rox, Speakeasy, World Labs, Until Labs, Harvey (2023), Cal.com (2022), Trunk, Vercel Ship / Next.js Conf | Their showcase lists 26 projects; services split into Visual Branding / Websites & Features / Marketing Execution / IRL. Case studies are thin on specifics (rationale only: Factory = "industrial aesthetic, geometric precision, infrastructure-like quality"; Baseten = "block by block", ASCII patterns for developers, brightened green + new pink). |
| **Bakken & Bæck** (Oslo/Amsterdam) | Top tier, brand+web+product for AI | sierra.ai (2024: brand, web, product), also Parallel, Lassie, Phantom, CoinTracker; product work for Legora, World Labs, DeepMind (brand) | Sierra stack per case study: Next.js, Tailwind, Framer Motion, React Aria, Rive, Sanity, Cloudflare. Logo Ben Barry; motion NeverSitStill; sound Plan8. |
| **Ragged Edge** (London) | Top-tier brand studio (Wise, Granola, Marshmallow) | granola.ai brand (2025: hand-drawn logo, slab serif + grotesk, custom "Granola Script" with NaN foundry, cut-and-paste "findings" illustrations) | Case study does not claim the website build; not analyzed (would be brand-only evidence). |
| **kargul.studio** | "Lower-level but good" reference; startup design+dev partner (Next.js, Framer, Webflow; Rive) | agentarcade.io (landing + product), ZeroLeaks (landing + product, Next.js + Rive), Breez, UniOps, Clokora; client logos Whop, Jupiter, Cluely, folk, Superwall (no case studies — cannot verify they built those sites) | Case-study language: "ultra clean and minimal", "micro-interactions woven throughout", Rive + After Effects custom illustration. |
| **MetaLab** | Product-UI first (Midjourney, Suno, Uber, Slack archive, Pitch) | No current marketing site verifiable as theirs | Excluded from site analysis: their AI case studies are product UI. |
| **Fantasy** | Product/experience (Priceline Penny, BNY Eliza, Amper) | Amper case = product, no live URL | Excluded. |
| **Clay (clay.global)** | Enterprise web (Slack, Stripe, Marqeta, Grayscale) | Portfolio page has no case-study links/dates; couldn't verify current ownership of the live sites | Excluded for verification reasons. |

## Sites analyzed

| # | Client | URL | Agency | Category | Stack / libs detected (heuristic) |
|---|---|---|---|---|---|
| 1 | Factory | https://factory.ai | basement.studio (2025) | AI coding agents, enterprise | Next.js, Tailwind, SplitText-style char split, GSAP-ish eases in bundle (power2), CSS keyframes; Geist / Geist Mono / Geist Pixel |
| 2 | Daylight Computer | https://daylightcomputer.com | basement.studio (2024) | Hardware startup (paper-like tablet), D2C launch | Next.js, Lenis, split text, CSS modules; ABC Arizona Flare + ABC Room |
| 3 | Black Forest Labs | https://bfl.ai | basement.studio (2025) | Frontier generative-AI lab / API | Next.js, three.js canvas, Framer Motion springs; Instrument Sans + IBM Plex Mono |
| 4 | Mintlify | https://www.mintlify.com | basement.studio (2026) | Dev-tool / docs SaaS | Next.js, Rive, 15 canvases (dither illustrations), Framer Motion springs; Inter + Arizona Flare + "paperMono" |
| 5 | Baseten | https://www.baseten.co | basement.studio (2025) | AI inference infra | Next.js, Lottie, CSS line-reveal keyframes; Neue Alte Grotesk + Chivo Mono |
| 6 | Cursor | https://cursor.com | basement.studio (2025, "Websites & Features"; Cursor also has in-house design) | AI code editor | Next.js; CursorGothic + Berkeley Mono + EB Garamond |
| 7 | Sierra | https://sierra.ai | Bakken & Bæck (2024) | Enterprise conversational AI | Next.js, Tailwind, Framer Motion springs, Rive; GT America |
| 8 | Agent Arcade | https://agentarcade.io | kargul.studio (case study: landing + product, Next.js, Rive/AE) | Consumer AI-trading app (fintech B2C) | Next.js, Lenis (lerp .1), GSAP eases in bundle, CSS keyframes `aa-*`, 5 canvases; Geist + Geist Mono |
| 9 | ZeroLeaks | https://zeroleaks.ai | kargul.studio (case study: site + product, Next.js + Rive) | AI-security B2B SaaS | Next.js, Rive, SVG blur filters; Geist Sans + Geist Mono |

(Sites 5–7: measured data first, then a visual addendum after screenshot review — see each section.)

---

## Per-site teardowns

### 1. Factory — factory.ai (basement.studio)

**Hero composition.** Centered, symmetrical, light. Order top→bottom: 88px line-art logomark (the
Factory "flower"), h1 `MAKE YOUR SOFTWARE IMPROVE ITSELF` on two lines, mono uppercase subline
`BUILD YOUR AUTONOMOUS SOFTWARE FACTORY` in warm gray, two buttons side by side
(`DOWNLOAD ⌄` black fill + `CONTACT SALES →` 1px outline), then a copyable shell command box
`> curl -fsSL https://app.factory.ai/cli | sh` (420px wide, #EBEBEB fill, copy icon at right). Below the
fold line (y≈680) starts a 1392px-wide, 6px-radius media frame inset 24px from viewport edges:
a grainy gray tiled "wallpaper" with a fake macOS menubar (`Factory File Edit View Window … Mon Jun 10
9:41 AM`) and the dark desktop app window centered in it — the product presented *as a desktop app on
a desktop*, not as a floating screenshot.

**Section sequence.**
1. Hero (above).
2. Logo wall: 4×4 grid of grayscale logos (NVIDIA, RBC, T-Mobile, Adobe, Blackstone, adyen, Klarna,
   HP, Wipro, Comarch, DoorDash, Medline, Under Armour, Profound, Groq, Chainguard). No borders, no
   "Trusted by" heading; ~150px empty space above and below. `filter: grayscale(1)` x60 in CSS.
3. Positioning: centered h2 `The foundation for your software factory` (44px) + one-line sub,
   then 3 equal bordered cards (white, 1px #B8B3B0, 6px radius, ~205px tall) each with orange mono
   index `01/02/03`, uppercase h3 (`CONTROL`, `GOVERNANCE`, `VALUE`, 28px), a 16px medium subtitle
   (`Sovereign, Model-Independent Intelligence`) and 16px gray body.
4. "SUPPORTED MODELS" panel: full-width #EBEBEB rounded block. Eyebrow = orange 6px dot + mono
   uppercase 12px label. Left: h2 36px `Move freely between open and closed models` + gray body;
   right: two rows of outlined model-name chips (Claude, Gemini, Grok, Kimi, DeepSeek, Mistral / GPT,
   GPT-OSS, GLM, Qwen, Llama) scrolling as a marquee with edge fades
   (`linear-gradient(to right in oklab, #EBEBEB 0, transparent 100%)`), footnote
   `+ Any LLM via OpenAI, Anthropic, or custom endpoints`.
5. Product grid: left-aligned h2 36px `Build your software factory` + 2-line sub, then 8 features in
   a 4-col grid (Analytics, Droid Computers, Agent Readiness, Mission Control, Automations, Model
   Routing, Code Review, AutoWiki): media tile on top (did not paint in headless), h3 24px, gray 16px
   3-line description. No icons, no cards — just type on the grid.
6. Closing CTA: a 540px-wide dark (#1F1D1C) card, left-aligned (not centered!), white logomark, h2
   36px `Ready to build the software of the future?`, outline button `START BUILDING →`.
7. Footer: dark #101010 panel with 6px radius, inset 24px like the hero frame; 3 link columns
   right-aligned (Resources / Company / Legal).

**Typography (measured).**
- Families: Geist (110 text nodes), Geist Mono (buttons, eyebrows, subline, indices), Geist Pixel
  Square loaded (`--font-pixel`) for accents.
- h1: Geist 500, **60.48px** (≈4.2vw), line-height 1.0, letter-spacing **-0.04em** (-2.42px),
  uppercase, centered, 656px wide.
- h2: 44px/49px (1.12) -0.025em (centered statement) and 36px/36px (1.0) -0.02em (section titles).
- h3: 28px uppercase -0.02em lh 1.0; 24px lh 1.0 normal tracking for feature titles.
- Body 16px; most UI text 14px (73 nodes) / 12px (nav links 12px!). Weight is **400 almost
  everywhere** (120 of 120 measured nodes) — hierarchy comes from size and case, not weight.
- Mono buttons/labels: 12–16px uppercase, -0.02em.

**Color.** Page #F5F5F5, sunken #EBEBEB, raised #FFF, ink #020202, dark surfaces #101010 / #1F1D1C.
Warm-gray neutral ramp (`--neutral-100 #d6d3d2 … --neutral-1000 #1f1d1c`) — grays lean brown, not
blue. Single accent **#EE6018** (`--accent-200`; ramp #ef6f2e/#ee6018/#d15010) used only for tiny
things: index numbers and eyebrow dots (3 text nodes on the whole page). Diagonal hatch fill:
`repeating-linear-gradient(45deg, transparent 0 2px, #A49D9A 2px 3px, transparent 3px …)`.

**Grid / spacing.** `--content-column: 1440px`, `--content-gutter: 1rem`; 12-col grid, 24px gap;
side margin 24px at 1440 (content nearly edge-to-edge — the frame does the containment). Section
top padding ~96px; large empty bands (~150–250px) between sections.

**Nav & CTAs.** Fixed, transparent, 72px tall. Logo (mark + wide-tracked wordmark) left; 7 text links
12px with `>` chevrons on mega-menu items; globe icon; `LOG IN / SIGN UP` (black, mono, 3px radius,
25px tall) and `CONTACT SALES` (outline 1px #A49D9A). Hero buttons 31px tall, 0 14px padding, 3px
radius, mono uppercase 16px. Buttons are deliberately small and squarish.

**Motion.** Intro frames: at 350ms, 900ms, 1800ms the hero headline/logo/CTAs are *absent* (only nav
+ a dark radial-gradient frame); by 3200ms everything is in and the media frame has lit up from
near-black to the gray wallpaper. So: deliberate ~2–3s staged entrance, char-split headline
(splitTypes `chars`; staggers `.05`, `.008`). CSS easing dominated by
`cubic-bezier(0.22,1,0.36,1)` (26 uses) with 0.1–0.32s durations; GSAP eases `power2.out`,
`power2.inOut`; keyframes `pageTransitionIn`, `sectionFadeIn`, `desktopAppFadeUp`,
`megamenuSlideDown`, `slidePattern`, `carouselSlide`.

**Signature moves.** (a) Product shown as a real desktop (menubar + wallpaper) inside an inset rounded
frame. (b) Mono uppercase for every action and label vs. proportional sans for statements — a
"terminal meets editorial" split. (c) One accent color used at <1% of pixels. (d) The curl install
line in the hero — dev-tool credibility in one line. (e) Footer and hero both as inset rounded panels
→ the page feels "framed".

**Copy voice.** Imperative, systems language: "MAKE YOUR SOFTWARE IMPROVE ITSELF"; "Plan, build,
review, and ship software with autonomous agents across desktop, terminal, web, and CLI."; "Switch
providers in a config change. Run several in parallel for redundancy. Bring your own endpoint or your
own weights. Factory never locks you to a vendor." Short declaratives, no exclamation marks.

**Mobile.** Mark-only logo + globe + hamburger. h1 ~30px still uppercase, 2 lines; mono subline
shrinks to ~10px; CTAs become `GET STARTED` + `CONTACT SALES →` side by side; curl box dropped; media
frame follows with 16px margins; logo wall becomes 2 columns.

---

### 2. Daylight Computer — daylightcomputer.com (basement.studio, Awwwards SOTD)

**Hero composition.** A full-viewport *photograph* in a rounded card inset ~18px from the viewport on
a cream page (#FAF5F2) — top-down shot of the tablet lying on grass with fallen leaves and leaf
shadows. Text sits *on the photo*, top-left: h1 `The computer, de-invented` (white) at x=66, y=114,
then a 21px two-line sub `Meet DC-1. A new kind of computer, designed for deep focus and wellbeing.`
Bottom-left: a 290×180 video thumbnail card with a 2–3px amber (#FF9D00) border and an amber play
triangle (film of a person on a bench). Bottom-right: a very large amber `ORDER NOW` button (≈320×65,
14.5px radius) with a micro-label above it `✓ IN STOCK · SHIPS IN 3-5 BUSINESS DAYS`.
Nav: top-left a square app-icon-style logo tile (rounded, light); top-right a frosted "glass" pill
cluster (backdrop-filter; 13 elements use it) containing `Home  Product  FAQ` + amber `ORDER NOW`
(47px tall, 8px radius). Under the nav cluster a promo drawer slides down:
`Meet Daylight Kids / ACCESORIES INCLUDED / TAKE A PEEK ↗` with a gold circular "LIMITED daylight
KIDS BUNDLE" sticker overlapping the corner.

**Intro sequence (frames).** 350ms: photo, headline, CTA all present but the device screen is blank
sand; 1800ms: unchanged; ~3–5s: a botanical engraving fades onto the device screen ("screen turns
on") and the Kids promo drawer drops from the nav. The choreography is about the *product waking up*,
not about text flying in.

**Section sequence (from scroll + probe).**
1. Photo hero.
2. Manifesto h2 in display serif, word-split (each word its own span):
   `We refuse to accept a future where our devices are exhausting, addictive, and distracting` →
   `Introducing Daylight — a healthier, more human-friendly computer`.
3. Use-case rail: horizontally scrolling cards (`Reading`, `Note-taking`, `Writing`…) — 460×258
   images, 16px radius, title in 18px bold-ish + gray description in a second column. Rail starts at
   x≈345 (asymmetric left indent), bleeds off the right edge.
4. `A distraction-free space for learning & creativity` (65px, the largest h2) with a "Live Paper
   display" explainer column on the right.
5. Pinned horizontal panel: left cream column with product imagery, right a full-height sky/grass
   gradient photo with eyebrow `outdoor computing 👁` and h2 `it's a *computer* you can use *outside*`
   (italic words inside roman sentence). Then `No eye-strain / Extended battery / Backlight optional`.
6. `Dive deeper into Daylight`, `DC-1 AT A GLANCE` spec block.
7. Testimonials on dark olive-black (#18190F): a huge display line `What people are saying`
   (est. ~130px, spanning the full width) with tweet-like cards (olive glass, rgba(67,70,38,.9),
   timestamped `10:26 AM • May 22, 2024`) floating *over* the headline and partially covering it.
8. `Daylight is a Public Benefit Co.` — a long founder letter set in 18–21px on dark, ~560px measure.
9. Footer 1004px tall: `ORDER NOW / Ships within 3-5 business days`, nav, "A more caring computer
   company", newsletter.
Page length: **20.9 viewports** — long-form narrative, like a product film.

**Typography (measured).**
- Display: **ABC Arizona Flare** 300 (light!) roman + italic; h1 60px / lh 1.0 / **-0.07em**
  (-4.2px); h2 60–65px / lh 0.97 / -0.07em. Italic used for emphasis words mid-sentence.
- UI/body: **ABC Room** 300/400/500 — 21px (25 nodes) and 18px (24) with **-0.05em** tracking;
  16px at -0.067em; 12–13px labels at -0.05 to -0.083em. Tight tracking is applied to *body* text
  too, not just display — distinctive and deliberate.
- ABC Room Extended for small caps-like labels. Uppercase share 18% (labels, buttons).
- Fluid type system in CSS vars: `--text-scale-screen-min: 640`, `--text-scale-screen-max: 1920`,
  `--text-scale-percentage: calc((100vw - 640px) / 1280 * 16)`.

**Color.** Cream #FAF5F2 (page), ink #17190F (olive-black, not pure black), sand #E8DED8, amber
**#FF9D00** reserved for commerce (ORDER NOW, video border, play icon, focus rings
`rgba(249,157,4,.565)`), olive glass rgba(67,70,38,.9) / rgba(88,91,61,.9) for cards on dark.
Photography supplies all other color (greens, leaf pinks).

**Spacing system.** vw-based tokens: `--spacing-vw-N = N × 1.0667vw` (1→1.07vw … 32→34.1vw).
Container 1167px; grids 3-col (gaps 12/18/60px), 4-col (20/48px), 5-col.

**Motion.** Lenis smooth scroll; sticky x4 (pinned horizontal sections); split words; ease token
`--ease-out-quint: cubic-bezier(0.23,1,0.32,1)`; Tailwind defaults (0.4,0,0.2,1) for UI; durations
150–350ms for UI, 1s for reveals. A fixed full-screen `mix-blend-multiply` overlay layer sits above
the page (texture/tint layer). Custom cursor present.

**Signature moves.** (a) Hero = a real art-directed photograph in an inset rounded "screen", text
directly on it. (b) Light-weight (300) serif display with very tight tracking — warm, literary, the
opposite of tech-bold. (c) Accent color only on the buy path. (d) Testimonial cards physically
overlapping a giant headline. (e) Italic words inside headlines for voice. (f) Stock/shipping
micro-copy next to the buy button.

**Copy voice.** Humane, contrarian: "The computer, de-invented"; "A more caring computer";
"We refuse to accept a future where our devices are exhausting, addictive, and distracting";
"Say goodbye to eye-strain—designed for full sunlight and nighttime".

**Mobile.** Same photo card with ~8px inset and ~16px radius; h1 wraps to 2 lines (~40px); nav
collapses to glass pill with `ORDER NOW` + hamburger; video thumb stays bottom-left; device image
recentered.

---

### 3. Black Forest Labs — bfl.ai (basement.studio)

**Hero composition.** Dark (#111) full-viewport, everything centered: small label `FLUX 3` (24px)
stacked tight over a single huge word `Image` (Instrument Sans 500, **106.8px**, lh 0.9,
**-0.045em**), then mono subline `Control every pixel.` (IBM Plex Mono ~20px, wide), then two
buttons: `Learn more →` (lavender **#E0DDFF** fill, black text, ~2px radius, ~50px tall) and
`Try it` (1px outline on dark), then a tertiary text link `Talk to us about commercial weights →` in
gray. Background: faint concentric ellipse rings (three.js canvas, 1 canvas) — barely visible.
A logo marquee strip (Microsoft, Adobe, Mistral AI, Magnific, OpenArt…) sits at the bottom edge of the
first viewport. On mobile the hero additionally shows floating image fragments wrapped in
**bounding boxes with mono labels** (`monk_1`, `monk_group_1`, `poster_2`) on teal (#29C592) and
lavender chips — a computer-vision annotation motif (teal bg measured on 60 elements).

**Section sequence.**
1. Hero (FLUX 3 / Image).
2. Logo marquee.
3. `One model, multiple modalities.` — left: h2 (~40px) + vertical tab list
   `→ Video / Audio / Image / Action-Prediction` (active = white + arrow, inactive = 40% gray, ~24px);
   right: gray 18px description, 854×480 video player (cheetah clip) with round play/mute buttons,
   thumbnail rail on the far right, pager `‹ 1 / 9 ›` with circular buttons.
4. Full-width dark film block with a small centered white `Play ▶` button.
5. `Ready to run.` — sticky left column (h2 63px, -0.05em, 22px gray lead, 15px small print);
   right: a stack of **white cards sliding over each other** (sticky stacking) — `API`,
   `Open Weights`, `Enterprise`, `Playground`. Each card: 53px title (-0.05em), a mono uppercase
   feature list (`PREMIUM QUALITY / EASE OF USE / BUILT FOR SCALE`, 15px +0.05em), a 21px paragraph
   in the right half, underlined arrow links (`→ Pricing → Documentation → Dashboard`) and a lavender
   CTA bottom-right. Behind the cards: dark painterly brush-texture imagery (green/lavender strokes).
6. Switch to white: `See what's new` (63px) + `→ Explore All Announcements`; news cards with collage
   imagery (robotics frames with HUD overlays).
7. Closing line `What hasn't been can now be.` (53px), footer with mono uppercase link lists and
   `ISO 27001:2022 · SOC 2 TYPE II`.
Nav: logo left, 17px links with chevrons, `Contact Sales` outlined box (~52px tall). After scroll an
announcement bar appears (`Introducing FLUX 3 Image - 50% off until 10/8 · Learn more`, ×) and a
lavender `Get started →` button joins the nav.

**Typography (measured).** Instrument Sans 400–700 (display + UI) + IBM Plex Mono 400/500 (109 nodes
— *more mono nodes than sans*). Display tracking: -0.045em @107px, -0.05em @53–63px, -0.04em @27px,
-0.03em @39px. Mono: +0.05em @15px, +0.02em @11px, +0.01em @16–17px. Uppercase share 25%.
Body 15–17px; small labels 10–11px mono.

**Color.** Black/#0F0F0F/#111 grounds, white cards, text white at 65% opacity for secondary,
lavender #E0DDFF primary CTA, teal #29C592 annotation chips, gray-green #556659 for mono labels on
white, deep green #07130E for headings on light sections.

**Shape / effects.** Radius 2px dominant (35 elements), 0 2px 2px 0 on joined controls — almost sharp.
Layered soft "glow" shadow on the stacked cards (5 layers: `0 1.3px 1px -1.2px … 0 22.5px 16.9px -5px`
in rgba(161,161,161,.15–.58)). Blur filters 4/8px for depth on background media. Noise/grain flag on.

**Motion.** Framer Motion springs `stiffness:400, damping:28` and `stiffness:500, damping:24`; bezier
array `[.22,1,.36,1]`; CSS `cubic-bezier(.25,.1,.25,1)`, `(0.25,1,0.5,1)`; durations .15/.3/.5/.6s;
keyframes `marquee`, `logo-scroll`, `underline-animation`, `f3i-row-in`, `f3i-caret`
(typing caret in a console demo), `flux3-console-media-in`. Hero word likely cycles per modality
(the sections are modality-tabbed; I only saw "Image").

**Signature moves.** One giant word as the hero (the product name is the visual). Mono-heavy UI that
reads like model cards / spec sheets. Sticky left statement + stacking product cards on the right.
CV-annotation bounding boxes as decoration (on-brand for a vision lab). Lavender as a non-default
accent on black.

**Copy voice.** Terse, confident: "Control every pixel."; "Ready to run."; "Whether you're scaling
through API, running open weights on your infrastructure, or just experimenting – our models work
wherever you do."; "What hasn't been can now be."

**Mobile.** Hero becomes `FLUX 3 / Image` (~56px) with the annotation boxes visible around it;
CTAs side-by-side; announcement bar wraps to 2 lines on top.

---

### 4. Mintlify — mintlify.com (basement.studio, 2026)

**Hero composition.** White page, content in a **1088px column framed by visible 1px vertical
hairlines** that run the whole page (rails at x≈176 and x≈1263), crossed by horizontal hairlines
(#F1F0EE) at section boundaries — a blueprint/ledger frame. Left half: a status chip
`Agent traffic | 77.9155% >` (label in black, live number in green mono on pale-green tint
rgba(31,167,122,.08)), h1 `The intelligent documentation platform` (3 lines), sub
`Self-updating documentation for **startups**, **enterprises**, and **agents**.` (gray with bold
black keywords), CTAs `Get started >` (near-black, 4px radius, 42px tall, padding 12/12/12/16) +
`Sign up with Google` (white, 1px 7%-black border, Google G icon). Right: a real docs-product UI
screenshot (sidebar nav + Quickstart cards with pale-green isometric illustrations) starting at
x≈590, y≈415 and **bleeding off the right edge**, with a lime/green gradient glow behind its top edge
(`linear-gradient(106deg, rgba(68,174,255,.5), rgba(24,226,153,.5) 35%, rgba(186,255,36,.5) 65% …)`)
and green wave-line canvas art (visible on mobile).

**Section sequence.**
1. Hero.
2. Social proof split: left statement `Join **20,000+** of the world's most ambitious companies
   building for agents.` (gray with black emphasis, ~24px) + `Read customer stories >`; right a 4×2
   grid of cream logo tiles (#FAF8F5, 1px border) whose logos rotate (some tiles blank mid-swap).
3. Live ticker row: `Agents at work today` + marquee of metrics with green mono counters
   (`Content updates 21,548`, `Pages read 10,759,862`, `Search requests 129,951`…; keyframes
   `digit-in`, `stats-scroll`, `signal-ping`, `signal-flicker`).
4. `One platform for your entire knowledge stack. Agents that keep work moving 24/7.` + bento:
   row of 2 (wide + narrow) and row of 3 cream cards, then 1 full-width, each ~410px tall with an
   animated canvas illustration (dithered; did not paint headless) and a 16px label bottom-left
   (`Agent-native platform`, `Self-updating knowledge`, `Control who has access`, `Connect with your
   systems`, `Collaborate with your team & agents`, `Build on top of your existing setup`).
5. `Powering businesses of all sizes.` + customer-story carousel of **brand-colored cards**
   (Anthropic burnt orange ~#C44120 with pale-pink media half; Coinbase periwinkle) carrying big
   white stats (`2M Monthly active developers`, `4+ Products serviced`, `+50x Faster deployment`) and a
   white `Read the story >` button; prev/next square buttons + `For enterprises >`.
6. `Built to scale with the agent web.` + 3 stat columns with dividers (`300M+ visitors in the past
   year`, `2B+ agents in the past year`, `99.99% uptime across all services`), tiny line icons.
7. `Enabling the next generation of startups.` + startup logo carousel with one-line stories and
   green `Read Lovable's story >` links.
8. `Trusted by teams building for agents.` + testimonial cards (avatar tile, name, role, quote —
   Brian Armstrong, Guillermo Rauch, HubSpot) with a `Pause testimonials` control.
9. `Latest updates`, closing `The knowledge platform built for agents`, footer with status
   `All systems normal`.

**Section header formula (repeated 5×).** A 2px × ~24px **green tick on the left rail** + a two-tone
headline: first sentence in near-black, continuation in gray (#6F7774-ish), Inter 500 36px, -0.02em,
lh ~1.1, max ~620px, with the section CTA right-aligned on the same baseline.

**Typography (measured).** Inter 500 dominant (130 nodes 500 vs 56 at 400). h1 is the only serif:
**Arizona Flare 400, 50px, lh 52px (1.04), -0.04em**. Section heads 35–36px -0.01/-0.02em; stat
numerals 44px -0.02em; body 14px (102 nodes) and 16px; 12px labels at +0.02em. Mono ("paperMono")
for counters. No uppercase anywhere (uppercase share 0).

**Color.** White ground, cream cards #FAF8F5/#F9F6F3, ink lab(2.4) ≈ #0A0A0A, gray text at 60% ink,
brand green ≈ #0C8C5E / text green lab(51 -41 15) ≈ #1FA77A; tint rgba(31,167,122,.08). Customer
cards borrow customer brand colors (#C44120, #0052FF-family).

**Grid.** 24-col grid, 16px gap (25 instances); container 1088px; 3/4/5-col sub-grids gap 12–16px.
Radii 4px (buttons), 6px, 12px (cards).

**Motion.** Eases: `cubic-bezier(0.23,1,0.32,1)` (16), `cubic-bezier(0,0,0,1)`,
`cubic-bezier(0.19,1,0.22,1)` (expo-out), `cubic-bezier(.77,0,.175,1)` (in-out quart),
`cubic-bezier(.34,1.56,.64,1)` (back-out overshoot for small pops). Durations 0.1–0.3s for UI,
0.5–1.05s for reveals, 2.5s loops. Framer springs `stiffness:500, damping:25`. Stagger 0.085s.
Rive present.

**Signature moves.** (a) Visible layout rails = "engineered" feel at zero cost. (b) Live data in the
hero chip and ticker (product proof as motion). (c) Two-tone headlines (statement + gray elaboration).
(d) Serif only for the h1 — one expressive moment, rest is disciplined Inter. (e) Product UI cropped
by the viewport edge (implies scale).

**Copy voice.** Category-defining + proof: "The intelligent documentation platform";
"Self-updating documentation for startups, enterprises, and agents."; "Powering a quarter of the
last YC batch to 40% of the Forbes AI 50."

**Mobile.** h1 ~40px 3 lines; chip + CTAs kept; UI screenshot below with green wave lines; a floating
`Ask assistant` pill pinned bottom-right.

---

### 5. Baseten — baseten.co (basement.studio, brand + site 2025)

Measured (visual notes in addendum below):
- Fonts: **Neue Alte Grotesk** 400/600 + **Chivo Mono** 400. h1 `Inference is everything`
  **88px / 600 / lh 80px (0.91) / -0.02em**; second h1-level `The fastest inference takes more than
  GPUs.` and h2s at **64px / 600 / lh 70px / -0.03em**; body 16px; labels 13–14px -0.02em.
- A decorative Chivo Mono span at **300px** (`giItT1WQy@!-/#`, line-height 450px) — the ASCII/glyph
  pattern from the rebrand ("ASCII patterns to resonate with developer audiences" — case study).
- Color: white + mint-gray #F5F8F4 surfaces, black text, **neon green #19E76E** accent (15 bgs),
  sage #B9C6B3/#E1EADD, dashed hairline grid via `repeating-linear-gradient(... #D9D9D9 0 50%,
  transparent 0)` (dashed lines drawn in CSS).
- **Zero radius** everywhere (only one 9999px element). Buttons uppercase 16px 400, black/white,
  36px (nav) and 48px (hero) tall: `GET STARTED`, `TALK TO AN ENGINEER`, `START DEPLOYING`.
- 201 elements with clip-path (mask reveals); keyframes `lineRevealHorizontal`,
  `lineRevealVertical`, `revealTitle`, `marqueeScroll`, `highlight-grow`; Lottie for icons;
  mix-blend multiply x15.
- Container 1296px, 12-col 24px gap plus odd-column grids (7, 9, 10 cols, 0 gap) for block patterns.
- Copy: "Inference is everything"; "The fastest model runtimes, cross-cloud high availability, and
  seamless developer workflows."; "Scale fast — in our cloud or yours."

### 6. Cursor — cursor.com (basement.studio "Websites & Features" 2025; also heavy in-house)

Measured (visual notes in addendum):
- Fonts: **CursorGothic** (custom), **Berkeley Mono**, **EB Garamond** 400 + 500 italic, Lato (in
  embedded UI). Weight 400 for 358 of ~400 nodes.
- h1 is tiny: `Cursor is your coding agent for building ambitious software.` **26px / lh 1.25 /
  -0.0125em**. The page's largest type is the closing h2 `Try Cursor now.` **72px / -0.03em**; mid
  h2 `The new way to build software.` 36px; feature h3s 22px with 60%-opacity continuation text.
- Color: warm paper #F7F7F4 page, #F2F1ED / #EBEAE5 / #E6E5E0 surfaces, ink **#26251E** (warm
  near-black), text tiers via ink at 60/55/50/40% opacity, accent orange **#F54E00** (9 nodes),
  blue #65AFE0/#278DCC inside product mocks.
- Product windows carry a deep 3-layer shadow: `0 28px 70px rgba(0,0,0,.14), 0 14px 32px
  rgba(0,0,0,.1), 0 0 0 1px ink/10%`.
- Container 1300px, 24-col grid 10px gap; section top padding 67.2px; radii 4px (85) + pills.
- Motion: bezier arrays `[.25,.1,.25,1]`, `[.16,1,.3,1]`, `[.32,.72,0,1]`; CSS
  `cubic-bezier(0.22,1,0.36,1)`, overshoot `cubic-bezier(0.2,0.9,0.3,1.15)`; durations clustered
  .12–.34s; keyframes `streaming-word-fade`, `mobile-chat-enter`, `mobileRecordingWaveform`,
  `gallery-marquee-item-slide-up` — the product demos are coded, animated UI replicas.
- Fixed 52px nav on page color; links 14px with `↓` glyph for menus; `Contact sales` pill outline.

### 7. Sierra — sierra.ai (Bakken & Bæck, 2024)

Measured (visual notes in addendum):
- One family: **GT America** 400 (120 of 121 nodes) — a single weight for everything.
- Hero line `Better outcomes. / Built on Sierra.` **65px / lh 72px / -0.02em** in white over media;
  h2 44px/48px -0.01em; secondary h2 38px/46px; body 14–16px.
- Color: warm grays — text #302E2D and #716F6C (58 nodes, the main body color), surfaces #F6F5F3,
  CTA **deep green #006838** pills; client logos rendered `brightness(0) opacity(.3)` (30) for a
  uniform gray logo wall.
- Buttons: full pills, 40px (14px text, 0 16px) and 56px (16px text, 0 24–32px).
- A product widget carries an enormous, very soft blue-tinted stacked shadow:
  `0 391px 109px rgba(15,79,138,.01), 0 310px 100px .03, 0 180px 84px .1, 0 75px 63px .15,
  0 28px 34px .15`.
- Container 1160px, 12-col 16px gap; sections 80px top padding; sticky nav 120px incl. a
  `Sierra Summit 2026 Recap` announcement row.
- Motion: Framer springs (`stiffness 300 damping 28`, `200/30`, `500/25`), keyframes
  `reasoning-step`, `speaking-pulse`, `marquee`; coded chat/voice demos ("Hi Kay, it's Dr. Patel's
  office…").

#### Visual addendum — Baseten / Cursor / Sierra (from screenshots)

**Baseten hero & structure.** Neon-green (#19E76E) announcement bar on top
(`Use your OpenAI commitments on Baseten open models. LEARN MORE >`, mono link). Nav: stepped
pixel-block logomark + lowercase wordmark, 16px links with tiny chevrons, `LOG IN` (white, 1px border)
and `GET STARTED` (black) square buttons, mono uppercase. The whole page is drawn on a **dashed
construction grid**: every text block in the hero sits in its own dashed-outline cell, dashed lines
run past the container to the viewport edges, and tiny solid pink (#F5A3F0-ish) and green rectangles
mark cell corners like registration marks. Hero is left-half only: h1 `Inference is everything`
(88px/0.91, 2 lines), 22px lead, `GET STARTED >` (black, 48px) + `TALK TO AN ENGINEER >` (outline);
the right half was empty in capture (1 canvas present — likely the ASCII/glyph animation from the
300px Chivo Mono span). Below: a 5-col logo grid in dashed cells (logos fade in one at a time —
only Wayfair visible at capture; mobile shows Abridge, Clay, Cursor, Decagon, Harvey, HubSpot,
Lovable, Notion, OpenEvidence). Product sections = dashed-bordered columns, each with h3 24px,
16px body, outline `LEARN MORE >`, and a **bespoke isometric line illustration** (green cubes,
cylinders, dashed connectors, pink accents, mono-label tags like `TRAINING INFRA`, `DATA`,
`624 REQUEST/M`, `123MS TTFT`, `YOUR CLOUD [toggle]`). Model list rows (`GLM-5.3`, `DeepSeek V4 Pro
0813`, `Kimi K3` → `TRY IT >`). Section heads 64px/600 left with the CTA right-aligned
(`Scale fast — in our cloud or yours.` + `LEARN MORE >`); centered head `The fastest inference
takes more than GPUs.` Mobile: grid lines persist; full-width stacked square CTAs; 3-col logo grid.
Signature: *the grid is the brand* — dashed construction lines + square everything + mono caps +
one neon green, with pink as a second-tier accent.

**Cursor hero & structure.** Warm paper ground (#F7F7F4). Hero is *left-aligned and small*:
h1 26px two lines (`Cursor is your coding agent for / building ambitious software.`), then pill
buttons `Download for macOS ↓` (ink #26251E fill, ~44px tall) + `Request a demo →` (#E6E5E0 fill).
Below, a 1300×~820 media panel whose background is a **landscape oil painting** (muted
lavender/ochre), with coded product windows on top: "Cursor Desktop" (task sidebar
`IN PROGRESS 2 / READY FOR REVIEW 3`, chat, live browser preview of a fake "Acme Labs" site set in
EB Garamond) overlapped by a "Cursor CLI" terminal window (Berkeley Mono). Then a centered 14px line
`Trusted every day by teams that build world-class software` over **8 logo tiles** (#F2F1ED, 1px
border, ~100px tall: Stripe, Datadog, Linear, NVIDIA, Figma, Ramp, Decagon, Adobe). Feature sections
are large #F2F1ED panels: left column with text *bottom-aligned* (h3 22px ink + continuation in 60%
ink, orange `Learn about … →` link), right a painting-backed media well with a coded window
(Mission Control PRD, Slack thread + `cursor-agent` terminal: `Thought 3s`, `Reading 3 files,
1 search`). A `curl https://cursor.com/install -fsS | bash` copy box appears in-section (same move
as Factory). `The new way to build software.` (36px centered) heads a 3×2 grid of quote cards
(quote 17px, avatar 40px circle, name + role in gray: Diana Hu/YC, Jensen Huang, Andrej Karpathy,
Patrick Collison, shadcn, Greg Brockman). `Stay on the frontier` card row, changelog, closing
`Try Cursor now.` 72px. Mobile: single `Get started →` pill; product panel retained.
Signature: art-historical painting as wallpaper behind ultra-precise UI replicas; type stays small
and calm; the product is the hero.

**Sierra hero & structure.** Royal-blue (#345EB2) announcement bar
(`Sierra Summit 2026 Recap: Personal Agent Protocol, Tandem Voice, new models…`). White nav, 120px
total with bar: flower-mark logo + spaced caps wordmark in Sierra green, 14px gray links centered,
`Sign in` text + green `Learn more` pill (40px). Hero = full-bleed cinematic photograph (mobile
capture: close-up of a sleeping baby) with white 65px two-line headline
`Better outcomes. / Built on Sierra.`, cream pill `Learn more`, and a frosted call-transcript card at
the bottom (`Hi Kay, it's Dr. Patel's office. Emma's due for her 6 month well-child appointment.`)
— the voice agent shown *in a human moment*, not as UI chrome. (Desktop capture showed the blurred
image placeholder only.) Value props as a **bento of muted gradient cards**: one 1112×500 sage→moss
card (`Increase the lifetime value of your customers` / `Go beyond customer service to drive revenue
growth.`) + three 360px cards (steel blue `Empower every team`, mauve `Unify your channels`,
terracotta `Pay for a job well done`), 24px white text top-left, ~16px radius. A dotted-grid section
with pale blue haze hosts product demos (`reasoning-step`, `speaking-pulse` keyframes). Logos
grayed via `brightness(0) opacity(.3)`. Mobile: photo hero full-height, transcript card at bottom.
Signature: one typeface at one weight; emotion through photography; color through earthy card
gradients; pills + deep green as the only "brand" UI color.

### 8. Agent Arcade — agentarcade.io (kargul.studio) — the "good but lower tier" benchmark

**Hero.** Dark #121212 with a faint 64px square grid and visible vertical rails at the container
edges (1200px container). Centered stack: two pill badges (`NEW` yellow chip + `The Arcade is live`
with a pink→orange gradient border glow; `Now on Android >` outline), h1 in **Geist 700 uppercase
104px, lh 0.95, -0.055em**: line 1 `EVERY AGENT.` white, line 2 `ONE LIVE CHART.` **gradient-filled
text** (pink→orange→yellow; `linear-gradient(90deg, #FBE754, #E833A3)` family). Sub 18px 60% white,
2 CTAs (`Enter the Arcade` with a glowing magenta/orange inner-gradient border, `View Leaderboard`
dark), then a mono uppercase wide-tracked ticker `● TOTAL TRADED BY AGENTS $11,672,254.32` with
rolling digits. Below: a big perspective-tilted trading-chart UI (BTC price, agent markers with
`LONG 5× -3.2%` tags, "IN PLAY 12 AGENTS" list with Copy/Counter buttons) inside a rounded frame
with a magenta→orange rim light and a radial glow behind.
**Intro.** 350ms frame: headline blurred (filter blur) and line 2 dim; resolves to sharp by ~900ms
— blur-to-focus text reveal.
**Sections.** Numbered steps with a left progress rail (`01 · HOT MARKETS / See where agents are
trading` … `04 · SNIPER`), active step white, inactive 40% white, rail segment colored
yellow→magenta; right a sticky chart card with "SNIPE" button. Leaderboard table (#rank, avatar,
name, magenta win-rate bar, mono %, green `+132.5%`, ↑ buttons, yellow `See the full
leaderboard →`). `FEATURES` eyebrow + two-tone centered head (`Built for **humans** who want the
**AI edge**` — white keywords inside gray). Pricing: `Subscription fees are ~~dead~~` (red
strike-through on the gray word), two big cards: green-tinted `$0 / month` free tier with 2-col
check list; amber-glow `0.10% per trade` card with an interactive trade-size slider
(`$450 → You pay $0.45`), comparison table `HOW IT COMPARES`. `The Arcade in your pocket.`
(phone), FAQ, closing `AGENTIC TRADING IS HERE.` (96px uppercase 700).
**Measured.** Weights: **700 on 222 nodes**, 500 on 169 — bold-dominant. Tracking -0.05em at 68px,
-0.055em at 104px; mono labels +0.1 to +0.2em at 9–12px. Colors: green #70D77E (91 text nodes),
red #EC5B60, yellow #FBE754, magenta #E833A3/#D62DF3, orange #EF8F37 — **five accents**.
Radii 5–13px buttons, 24px cards. Inset 1px hairline box-shadows (`-1px 0 0 #1A1A1E inset`) for
grid lines. Page 15.5 viewports.
**Read.** Competent and energetic, but it uses exactly the moves the top tier avoids: gradient
headline text, 700-weight uppercase display, glow borders, 5 accent colors, everything centered.
It fits a consumer trading "arcade" brief; it would read as cheap on an enterprise/dev-tool brand.

### 9. ZeroLeaks — zeroleaks.ai (kargul.studio)

**Hero.** Black. Hairline frame: rails at the 1150px container edges plus horizontal hairlines
(#141414) with small **corner-bracket markers** where lines cross. Centered h1
`Continuous red / teaming for AI agents` (Geist 500, 48–56px, lh 1.14, -0.024em), sub 16px gray
(`ZeroLeaks attacks your agent through its tools, memory, and credentials on every change.`),
CTAs `Try Pro free for 14 days` (white fill, 8px radius, 44px) + `Documentation` (black, 1px #141414
border). Directly under the fold line: the full product dashboard (Overview, 4 stat cells
`Total scans 8 / Health 61% / Findings 8 / Informational 0`, a ring gauge `61% HEALTH`, attack
timeline with `Low`/`Medium` pills) sitting *inside* the rails.
**Intro.** Word-by-word blur-in (keyframes `hero-word`, `hero-rise`): at 350ms "Continuous red
teaming for" sharp, "AI agents" still blurred; sub + CTAs blurred; dashboard not yet in. Ease
`cubic-bezier(0.23,1,0.32,1)` (19 uses), plus `(0.32,0.72,0,1)` (iOS drawer), `(0.19,1,0.22,1)`.
**Sections.** Logo row (Orchid, Reppo). `Open source` eyebrow + two-tone head `Built on real
attacks.` (white) + gray continuation. `How it works` — narrow 706px centered column between
rails, two-tone head `Scan on demand, or on every change.` + gray paragraph-as-headline, then a
dark 3D render (white shield on a dotted orbital ring with satellite chips) with a 1px bottom
border in the brand tri-gradient `linear-gradient(95deg, #0093FF, #FFA933 47%, #FF4458 90%)`;
2-col feature cells with outlined icon tiles. `Why ZeroLeaks` — left two-tone head + accordion list
(hairline separators, active item expanded with body text); right an icon-tile triptych where the
center tile has an SVG-filter glow in the tri-gradient (`url(#pfx-blur-…)` filters,
keyframes `pfx-glow`, `pfx-sweep`, `pfx-ripple`). Pricing `$149` etc.
**Measured.** Geist 400/500 only (109/50); text gray lab(67.5) ≈ #A3A3A3 for body (112 nodes),
#FAFAFA for headings; surfaces #030303/#080808/#141414; radii pill (nav CTA), 6–8px. One gradient,
used only as 1px lines and glows.
**Read.** Much closer to the top tier than Agent Arcade: rails, two-tone heads, real dashboard,
one restrained gradient. What still separates it from basement-level work: generic Vercel-template
DNA (black + Geist + rails is now very common), centered-everything hero, glow-tile iconography.

### Tier gap: Kargul vs. basement / Bakken & Bæck (what actually differs)

| Dimension | Kargul (Agent Arcade / ZeroLeaks) | Top tier (Factory, Mintlify, BFL, Daylight, Sierra) |
|---|---|---|
| Display weight | 700 uppercase (AA) / 500 (ZL) | 300–500; 400 most common |
| Accent count | 5 (AA) / 1 tri-gradient (ZL) | exactly 1, often <1% coverage |
| Gradient text | yes (AA) | none in marketing headings |
| Ornament | glows, rim lights, glow icon tiles | domain-specific: OS menubar, CV bounding boxes, ASCII glyphs, construction grid, oil paintings, photography |
| Typeface | Geist (default Vercel stack) | brand-specific or licensed: ABC Arizona/Room, GT America, Neue Alte Grotesk, CursorGothic, Instrument Sans; Geist used with a pixel cut + mono split (Factory) |
| Layout | centered stacks throughout | centered hero, then asymmetric/left-aligned sections, sticky columns, bleeding media |
| Imagery | coded UI + glow | coded UI *plus* an art layer (painting, photo, texture) behind it |
| Motion | blur-in words, glows, Lenis | staged entrances, product "waking up", live counters, sticky stacks; native scroll on SaaS |
Both tiers share: hairline rails, two-tone headings, product UI as hero, mono eyebrows, expo-out
eases `cubic-bezier(0.23,1,0.32,1)` / `(0.22,1,0.36,1)`.

---

## Cross-site patterns (this cluster)

Numbers are at 1440px viewport unless noted.

**Hero**
- Hero h1 size is *moderate*, not huge: 50 / 60 / 60 / 65 / 88px (Mintlify, Factory, Daylight,
  Sierra, Baseten). Only BFL goes >100px, and it does so with a *single word*. Cursor's h1 is 26px.
  → Range: **50–88px**, or one-word 100–110px. The "giant 160px hero headline" is NOT this cluster.
- Hero line-height: **0.9–1.04** for display (Factory 1.0, Daylight 1.0, Mintlify 1.04, Baseten 0.91,
  BFL 0.9). Sierra 1.1.
- Display tracking: **-0.02em to -0.07em**. Grotesks sit at -0.02 to -0.05em (Factory -0.04,
  BFL -0.045/-0.05, Baseten -0.02/-0.03, Sierra -0.02); light serifs go tighter (Daylight -0.07,
  Mintlify serif -0.04).
- Hero copy = h1 + one sub-line (≤ 2 lines, 16–22px) + **2 CTAs** (primary solid + secondary outline)
  + optional tertiary text link (BFL) or proof chip (Mintlify) or install command (Factory).
- Hero visual is **the product or the physical object, art-directed**: real desktop app on a
  wallpaper (Factory), real photograph (Daylight), real docs UI cropped by viewport (Mintlify), coded
  UI demos (Cursor, Sierra). Abstract 3D blobs/gradient orbs: absent.
- Two layouts dominate: centered stack (Factory, BFL) and left-text / right-UI-bleed (Mintlify).
  Daylight = text-on-photo top-left with CTA bottom-right (corners used, center left to the image).

**Type system**
- 1 workhorse sans + 1 mono is the norm (Factory Geist+Geist Mono, BFL Instrument Sans+Plex Mono,
  Baseten Neue Alte Grotesk+Chivo Mono, Cursor CursorGothic+Berkeley Mono, Mintlify Inter+paperMono).
  A serif appears as a *single expressive layer* (Mintlify h1, Cursor EB Garamond italic) or as the
  whole display voice for consumer/hardware (Daylight Arizona Flare 300).
- **Weights are low**: 400 dominant everywhere (Factory 100% 400, Cursor 90%, Sierra 99%); display at
  400–500 (600 only Baseten). Bold 700 display: absent.
- Body 14–16px for UI copy, 16–21px for lead paragraphs. Small labels 10–13px.
- Mono uppercase for eyebrows, buttons, spec lists, counters; tracked **+0.02 to +0.05em** (BFL) or
  slightly negative (Factory -0.02em). Uppercase share 0–25% of text nodes.
- Two-tone headlines (black statement + gray continuation) at Mintlify, Cursor (60% ink), Sierra-style
  gray body. Text color tiers done by **opacity of one ink** (Cursor 60/55/50/40%, BFL white 65%).

**Color**
- Grounds are off-white/warm: #F5F5F5 (Factory), #FAF5F2 (Daylight), #F7F7F4 (Cursor), #FAF8F5
  cream cards (Mintlify), #F5F8F4 mint-gray (Baseten), #F6F5F3 (Sierra). Pure #FFF page only on
  Mintlify/BFL light sections. Dark grounds are near-black, not pure: #101010, #111, #17190F, #26251E.
- Inks are warm near-blacks: #020202, #17190F, #26251E, #302E2D.
- **Exactly one accent** (Baseten adds pink as a minor second), used sparingly: Factory #EE6018 (indices, dots), Daylight #FF9D00 (buy path
  only), Cursor #F54E00, Baseten #19E76E, Mintlify ≈#1FA77A, BFL lavender #E0DDFF, Sierra #006838.
  Accent coverage is tiny (Factory: 3 text nodes).
- Gradients: rare and never neon. Functional uses: marquee edge fades, image scrims, one glow behind
  a product shot (Mintlify). The one decorative use is Sierra's bento: muted, earthy diagonal
  gradients (sage→moss, steel blue, mauve, terracotta) as card grounds — desaturated, not
  purple→blue.

**Layout / spacing**
- Containers: 1088 (Mintlify), 1160 (Sierra), 1167 (Daylight), 1296 (Baseten), 1300 (Cursor),
  1392–1440 (Factory, edge-to-edge with 24px margins), 1624–1680 (BFL). → typical **1100–1300px**,
  or full-bleed with 24px gutters for "framed panel" designs.
- Grids: 12-col 16–24px gap or **24-col** 10–16px gap (Mintlify, Cursor, BFL).
- Section padding modest in CSS (64–112px top) but visual gaps between sections are large
  (~150–250px) because content blocks are short. Pages are 9–10 viewports long (Factory 10.1,
  BFL 9.9, Mintlify 9.4, Baseten 9.2, Cursor 9.1, Sierra 9.6); narrative product launches go to ~21
  (Daylight).
- Framing devices: inset rounded panels (Factory hero/footer, Daylight hero), visible hairline rails
  (Mintlify), dashed CSS grid lines (Baseten).

**Shape**
- Radii are small: 0px (Baseten), 2–3px (BFL, Factory buttons), 4px (Mintlify, Cursor), 6px cards.
  Pills only at Sierra and for Cursor secondary buttons. Big 16px radii only on photo/media cards
  (Daylight).
- Borders 1px at 4–8% ink or warm gray (#B8B3B0). Shadows: mostly none; when used they are long,
  soft, multi-layer, on product windows only (Cursor, Sierra, BFL cards).

**Buttons**
- Heights 31–50px (Factory 31, Mintlify 42, Cursor 27–34, BFL ~50, Baseten 36/48, Sierra 40/56).
  Daylight's commerce CTA is the outlier at 65px.
- Text 14–16px, weight 400–500; uppercase mono at Factory/Baseten/Daylight; sentence case at
  Mintlify/Cursor/BFL/Sierra. Trailing glyph `>`, `→`, `⌄` is near-universal.

**Motion**
- Dominant ease family = **expo/quint-out**: `cubic-bezier(0.22,1,0.36,1)` (Factory 26, Cursor 9,
  Sierra 4, BFL as array), `cubic-bezier(0.23,1,0.32,1)` (Daylight token, Mintlify 16),
  `cubic-bezier(0.19,1,0.22,1)`, `[.16,1,.3,1]`.
- UI durations **0.1–0.35s**; reveal durations 0.5–1.05s; loops 2.5–3s.
- Framer-Motion springs: stiffness 300–550, damping 24–30 (BFL 400/28, 500/24; Mintlify 500/25;
  Sierra 300/28, 200/30).
- Small overshoot reserved for micro-pops: `cubic-bezier(.34,1.56,.64,1)` (Mintlify),
  `cubic-bezier(0.2,0.9,0.3,1.15)` (Cursor).
- Smooth scroll (Lenis) only on the narrative consumer site (Daylight). The SaaS sites use native
  scroll. GSAP rare/limited; CSS keyframes + Framer Motion are the norm.
- Motion is spent on: staged hero entrances (Factory ~2–3s), product "waking up" (Daylight screen),
  live counters/tickers (Mintlify), coded product demos (Cursor, Sierra, BFL console), marquees
  (logos, model chips), sticky stacking/pinned panels (BFL, Daylight).

---

## Signature techniques worth stealing (implementation-level)

1. **Framed-page panel (Factory).** Hero media and footer are panels inset from the viewport.
   ```css
   .frame { margin: 0 24px; border-radius: 6px; overflow: hidden; }
   footer.frame { background:#101010; color:#EBEBEB; padding: 96px 24px 32px; }
   ```
   Put the product screenshot *inside a fake OS* (menubar row 22px tall, 11px system text, clock at
   right) over a grainy tiled wallpaper. Reads as "real software", not marketing art.

2. **Install line in the hero (Factory; Cursor repeats it in a feature section).** Under the CTAs:
   `<code>` block, 420px, bg #EBEBEB, 12–13px mono, prefix `>` in gray, copy icon right, radius 0–3px.

3. **Mono for actions, sans for statements.** Buttons/eyebrows/indices in mono uppercase 12–16px
   (Factory -0.02em; BFL +0.05em at 15px), all headings in a grotesk at weight 400–500. Never bold.

4. **Single accent at <1% coverage.** Pick one hot color (#EE6018 / #F54E00 / #FF9D00) and use it
   only on: index numerals `01 02 03`, 6px status dots before eyebrows, and the commerce CTA.

5. **Eyebrow formula.** `<span class="dot"></span> SUPPORTED MODELS` — 6px circle in accent + 12px
   mono uppercase in 60% ink, 16px gap above the h2.

6. **Rails layout (Mintlify).**
   ```css
   .page { max-width:1088px; margin:0 auto; border-inline:1px solid #F1F0EE; }
   .section { border-top:1px solid #F1F0EE; }
   .section-head::before { content:""; position:absolute; left:-1px; width:2px; height:24px;
     background:#1FA77A; }   /* tick sitting on the rail */
   ```
   Head = `<h2>Black sentence. <span style="color:rgb(10 10 10 / .55)">Gray elaboration.</span></h2>`,
   Inter 500 36px/1.1, -0.02em, max-width ~620px; the section CTA right-aligned on the same row.

7. **Live proof chip (Mintlify).** Bordered chip above the h1: label + mono number on a 8%-accent
   tint, number ticks with a `digit-in` keyframe (translateY 100%→0, 0.3s, cubic-bezier(.23,1,.32,1)).
   Repeat as a ticker row of metrics with a CSS marquee.

8. **UI bleeding off the viewport (Mintlify).** Product screenshot starts at ~41% of width and is
   cropped by the right viewport edge; 1px border at 7% ink, 12px top-left radius, soft lime glow
   behind the top edge via a 106deg multi-stop gradient at 50% alpha blurred 24px.

9. **One-word hero (BFL).** `FLUX 3` label 24px directly over `Image` at ~107px/0.9/-0.045em,
   mono subline beneath. Optional: cycle the word per modality with a 0.5s clip/opacity swap.

10. **Sticky statement + stacking cards (BFL).** Left column `position:sticky; top:20vh` with the
    h2; right column cards `position:sticky; top:calc(120px + i*48px)` so each new card slides over
    the last, each card with: 53px title, mono spec list, paragraph, arrow links, CTA bottom-right.
    Card shadow: layered soft glow (`0 1.3px 1px -1.2px …, 0 22.5px 16.9px -5px rgba(161,161,161,.15)`).

11. **Annotation boxes as ornament (BFL).** Images wrapped in 1px boxes with a mono label chip
    (`monk_1`) stuck to the top-left corner, chip bg teal #29C592, 11px mono, 2px radius.
    Domain-specific ornament beats generic sparkles.

12. **Photo-hero with corner-anchored UI (Daylight).** Full-viewport photo card (inset 18px, radius
    16px), h1 top-left, video thumbnail bottom-left (accent 2px border), oversized buy button
    bottom-right with a micro-status line above it (`✓ IN STOCK · SHIPS IN 3-5 BUSINESS DAYS`).
    Nav is a frosted pill top-right: `backdrop-filter: blur(16px); background: rgba(255,255,255,.1)`.

13. **Light serif display with negative body tracking (Daylight).** Display: light (300) serif at
    60px, lh 1.0, -0.07em; italic for 1–2 words per headline. Body grotesk at -0.05em (18–21px).
    Only works with a tightly-fitted grotesk; test with real copy.

14. **Overlapping testimonial cards (Daylight).** A full-width ~130px headline ("What people are
    saying") with tweet-style cards absolutely positioned over it, partially covering letters; cards
    in olive glass `rgba(67,70,38,.9)` with timestamp links.

15. **Brand-colored customer cards (Mintlify).** Carousel cards filled with the *customer's* brand
    color (Anthropic orange), big white stat numerals 44px, white button. Gives color without
    breaking your own palette.

16. **Gray, uniform logo walls.** `filter: grayscale(1)` (Factory) or `brightness(0) opacity(.3)`
    (Sierra); 4-col grid, no borders, no heading, ~150px air above/below.

17. **Coded product demos instead of video.** Cursor/Sierra/BFL animate HTML replicas of the
    product (streaming words, typing caret, chat bubbles, waveform) with 0.12–0.34s steps. Crisp at
    any DPI, themable, and they look like the real product.

18. **Expo-out everywhere.** Global token: `--ease-out: cubic-bezier(0.22,1,0.36,1)`; UI 150–300ms,
    reveals 600–1000ms; springs `{type:"spring", stiffness:400–500, damping:25–28}` for
    interactive pops.

19. **CSS dashed grid lines (Baseten).**
    `background: repeating-linear-gradient(to right, #D9D9D9 0 4px, transparent 0 8px)` on 1px
    tall/ wide elements to draw dashed construction lines; combine with 0px radius, uppercase square
    buttons.

## What these sites never do (vs. typical AI-generated landing pages)

Scope: top-tier sites 1–7. Kargul's Agent Arcade breaks several of these on purpose (see Tier gap) —
which is exactly why it reads one tier lower.


- No purple-to-blue gradient hero, no glowing orbs/blobs, no glassmorphism bento "for decoration"
  (glass appears only functionally: Daylight's nav pill, Sierra's call-transcript card over a photo).
- No bold 700–800 display weight. No gradient-filled *headlines*: `background-clip:text` = 0 on 6 of 7
  sites; Cursor's 6 instances are inside its coded product demo (a `shimmer` keyframe on "thinking"
  status text), not marketing headings. No text-stroke anywhere.
- No emoji in headings, no "🚀 Supercharge your workflow" copy, no "Revolutionize/Unleash/Empower"
  hype verbs. Headlines are concrete ("Inference is everything", "Ready to run.").
- No generic icon-in-a-rounded-square feature grids with 3 identical cards as the main content.
  Factory's 3 cards are numbered and typographic; features elsewhere are type + real media.
- No large border-radius (24–32px) on buttons/cards; no drop shadows on every card.
- No centered-everything page: after the hero most sections go left-aligned/asymmetric (Factory's
  closing card is left-aligned, Daylight rail starts at x=345, BFL sticky left column).
- No stock photos of people at laptops; no off-the-shelf illustration packs. Imagery is product UI,
  product photography, cinematic photography (Sierra), or bespoke art (Baseten's own isometric line
  drawings in brand green/pink with mono labels, BFL brush textures, Mintlify dither canvases,
  Cursor's oil-painting wallpapers).
- No multiple competing accent colors; no rainbow feature icons.
- No scroll-jacking on SaaS sites (native scroll; Lenis only on Daylight's narrative launch).
- No testimonial carousels with 5 stars; testimonials are tweets/quotes with names, timestamps.

## Rankings (best references for the skill)

1. **Factory (factory.ai)** — the most transferable "premium dev-tool" system: framed panels,
   mono/sans split, warm-gray neutrals + one orange, product-in-OS hero, restrained 400 weights,
   staged entrance. Easy to reproduce with Geist.
2. **Mintlify (mintlify.com)** — best structural pattern library for B2B SaaS: rails layout, two-tone
   section heads with accent tick, live proof chip, bleeding UI screenshot, brand-colored customer
   cards, stat rows.
3. **Black Forest Labs (bfl.ai)** — best dark AI-lab reference: one-word hero, mono spec-sheet UI,
   sticky stacking cards, lavender accent, annotation-box ornament.
4. **Daylight (daylightcomputer.com)** — best consumer/hardware launch reference: photographic hero
   with corner-anchored UI, light serif display, commerce-only accent, long-form narrative with pinned
   horizontal sections.
5. **Cursor (cursor.com)** — "quiet confidence": 26px h1, warm paper + one orange, coded product
   windows over oil-painting wallpapers, quote grid of famous builders. Best model for letting the
   product carry the page.
6. **Sierra (sierra.ai)** — enterprise AI made human: one typeface at one weight, cinematic photo
   hero with a transcript card, muted gradient bento, deep-green pills.
7. **Baseten (baseten.co)** — strongest "the grid is the brand" system: dashed construction lines,
   0px radius, mono caps buttons, neon green + pink, bespoke isometric diagrams.
8. ZeroLeaks (kargul) — solid template-grade execution of the rails/black/Geist idiom.
9. Agent Arcade (kargul) — useful mainly as the *contrast case* (what to tone down).
