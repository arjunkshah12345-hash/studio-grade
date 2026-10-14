# The 10 Directions: full recipes

Each direction is a synthesis of measured live sites. Each one gives: when to use it, the exemplars, the token defaults, free fonts, the hero, the page anatomy, motion, signature moves, and what to avoid. Copy the token block into `tokens.css` overrides, then adapt it to the brand. **Don't blend directions.** You may borrow at most one signature move from a neighbouring direction.

Contents: 1 Engineered Dark · 2 Ledger Light · 3 Warm Paper · 4 Editorial Motion · 5 Quiet Luxury Commerce · 6 Cinematic Place · 7 Institutional · 8 Deep-Tech Spec · 9 Playful System · 10 Immersive

---

## 1. Engineered Dark

**When:** developer tools, AI agents, power-user apps, infra with a product UI worth showing. The audience is technical, so the product *is* the persuasion.
**Exemplars:** Linear (in-house), Raycast (in-house), Resend (in-house), Black Forest Labs (basement.studio), convt.app (indie utility; the small-product version of this direction).

```css
:root{
  --paper:#08090A; --surface:#0F1011; --surface-2:#141516;
  --ink:#F7F8F8; --ink-2:#8A8F98; --ink-3:#62666D;          /* never #FFF text */
  --hairline:rgba(255,255,255,.08); --hairline-2:rgba(255,255,255,.12);
  --accent:#5E6AD2;              /* ONE: CTA glow, active tab, status dot. BFL used lavender #E0DDFF, Raycast red #FF6363 */
  --font-display:"Inter Variable","Inter",sans-serif; --font-mono:"Geist Mono","JetBrains Mono",monospace;
  --display:clamp(2.75rem,1.4rem + 3.6vw,4.5rem); --display-lh:1.0; --display-ls:-0.022em; --display-wt:510;
  --h2:clamp(2rem,1.2rem + 2vw,3rem); --body:15px; --ui:13px; --label:11px;
  --radius-btn:9999px; --radius-card:12px; --container:1280px; --margin:80px; --section:128px;
  --ease:cubic-bezier(.16,1,.3,1); --ease-sheet:cubic-bezier(.32,.72,0,1);
}
```
- **Fonts:** Inter Variable at tuned in-between weights (**510** for titles, 400 body; `font-feature-settings:"cv01","ss03"`), plus Geist Mono / Berkeley Mono / JetBrains Mono for labels. Alternatives: Geist + Geist Mono. For one expressive layer, add a serif (Tiempos-like: Newsreader) **only** on manifesto subpages.
- **Hero:** a left-aligned two-line h1 at 64–72px, a one-line grey subline, and a tiny changelog link ("New: Loops →") on the same baseline far right. The CTA lives in the nav (a pill). Below it, at about 58% of viewport height, a **full-width product UI built in HTML** bleeds off the bottom, with secondary panes dimmed and one live state (an agent "Thinking…" shimmer). Alternative (Raycast/Resend): a centered h1 over a single art-directed WebGL/3D object (light bars, a black cube) that arrives *after* the text.
- **Anatomy:** hero + UI → monochrome logo row with a mono caption ("POWERING THE TEAMS BUILDING THE FUTURE") → manifesto h2, two-tone (white statement + grey continuation) → 3-up "FIG 0.1 / 0.2 / 0.3" line-art illustrations separated by 1px vertical rules → 3–4 feature chapters (big two-tone h2 + composited UI scene + 2-col list of `+` expanders) → changelog → quotes on cards → finale "Built for the future. Available today." at 72px → 6-col footer.
- **Motion:** a blur-in hero (opacity 0, blur 10px, y 8px → resolved over 800–1000ms, stagger 80–120ms; the UI frame arrives 300ms later). Ambient dot-grid "LED" keyframes at 1.6–3.2s. Hovers at 120–200ms. Native scroll. Overshoot `cubic-bezier(.45,1.45,.8,1)` only on toggles.
- **Signatures:** product UI frame (`box-shadow:0 0 0 1px rgba(0,0,0,.2), inset 0 0 0 .5px rgba(255,255,255,.08), 0 2px 32px rgba(0,0,0,.25)`); top-edge glow line on panels (Resend); FIG captions; two-tone h2; positive body tracking on dark (+0.01 to +0.02em at 14–16px, Raycast) for crispness.
- **Small-product variant (convt.app):** for a utility or indie app with no product UI worth a full window, show the product's *effect* instead. Use a **transformation pair** (`miso.heic 4.8 MB → miso.webp 612 KB`, the gain in accent) on a **halftone stage that dithers into the accent**. Category cards show a **miniature of each object** (photo, player, waveform, pages) + a count + mono chips. An **engine tree diagram** explains how it works. Two pricing cards with the featured one marked by a 1px accent ring. Measured: Geist 500 at 68px/1.06/−0.04em, Geist Mono for every file name, size, and format (more mono nodes than sans), paper `#0A0B0B`, ink `#EDEFEE`, ink-2 `#A1A6A3`, accent `#22A867`, 6px base radius, page length 5.4 viewports. Short and dense beats long for a single-purpose tool.
- **Avoid:** neon multi-color, purple gradient backgrounds, glowing icon tiles (the "Agent Arcade" tier), 700-weight uppercase display, more than one accent.

## 2. Ledger Light

**When:** B2B SaaS, fintech, APIs, infra, docs, CRMs. You need density without clutter and a feeling of being "engineered".
**Exemplars:** Stripe, Vercel, Mintlify (basement), Attio, Factory (basement), Baseten (basement), Ramp (Red Antler + Bakken & Bæck).

```css
:root{
  --paper:#FAFAFA; --surface:#FFFFFF; --sunken:#F5F5F5;
  --ink:#171717; --ink-2:rgb(23 23 23 / .6); --ink-3:rgb(23 23 23 / .4);
  --hairline:rgba(0,0,0,.08); --rail:rgba(0,0,0,.06);
  --accent:#533AFD;              /* Stripe blurple. Alternatives: Mintlify green #0C8C5E, Factory orange #EE6018, Ramp lime #E4F222 (highlighter only) */
  --font-display:"Geist","Inter",sans-serif; --font-mono:"Geist Mono",monospace;
  --display:clamp(2.5rem,1.3rem + 3.2vw,4rem); --display-lh:1.0; --display-ls:-0.03em; --display-wt:400;
  --h2:clamp(2rem,1.3rem + 1.8vw,3rem); --body:16px; --ui:14px; --label:11px;
  --radius-btn:6px; --radius-card:12px; --container:1280px; --margin:24px; --section:120px;
  --ease:cubic-bezier(.16,1,.3,1); --ease-ui:cubic-bezier(.4,0,.2,1);
}
```
- **Fonts:** Geist / Geist Mono (Vercel goes to −0.06em at 64px, weight 400; h2 weight 450). A Söhne-like light display at **weight 300** (Stripe) works well too: use Inter Tight 300 or Hanken Grotesk 300 at −0.02em. **Single-weight systems** are a strong move: Ramp sets Lausanne 400 everywhere, so hierarchy comes only from size and opacity.
- **Hero options:**
  a) Left text + **UI bleeding off the right edge** (Mintlify): a live proof chip above the h1 ("Agent traffic | 77.9155% >"), a 3-line h1, a sub with **bold keywords**, CTAs "Get started >" (dark, 4px radius, 42px tall) + "Sign up with Google".
  b) A centered stack + **install command** (Factory): h1, mono uppercase subline, 2 small square mono buttons, a `> curl -fsSL … | sh` box with a copy icon, then the product shown *inside a fake OS desktop* in an inset 6px-radius frame.
  c) Restraint (Vercel): three zones. h1 left, one geometric logo with a breathing halo in the center, a rotating tagline list on the right. Logos are pinned edge-to-edge at the hero bottom.
  d) Living metrics (Stripe, Ramp): a **ticking 8-significant-digit stat** as the eyebrow ("Global GDP running on Stripe: 1.72802563%"), then a two-tone paragraph-headline and a fused email-capture capsule.
- **Anatomy:** hero → greyscale logo grid (no heading, ~150px air) or a quantified line ("Join 20,000+ of the world's most ambitious companies") → section heads with a **2px accent tick on the left rail** + a two-tone sentence, with the section CTA right-aligned on the same baseline → a bento of product tiles (2 + 3, warm `#F4F2F0` fills, a ↗ square button top-right, real UI inside) **or** use-case chapters with grayscale customer screenshots + a one-line metric proof → a stat band (4 stats, first dark, rest grey) → customer cards in *the customer's* brand color → testimonial wall (2 rows, opposite directions, edge-faded) → finale → mega footer.
- **Signatures:** **layout rails** (full-height 1px lines at the container edges; horizontal dividers between bands; crosshair dots where they meet); the hairline bento via `gap:1px` over a hairline-colored background; the ticker row "Agents at work today" with rolling digits; **dashed construction grid** + 0 radius + mono-caps buttons (Baseten); the canonical Stripe shadow `0 30px 45px -30px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.1)` for floating cards only; optically corrected button padding `15.5px 24px 16.5px`.
- **Motion:** native scroll, CSS keyframes, digit-roll counters (`translateY(-n*1em)`, 300ms ease-out), logo marquee 48–120s, blur-in hero. No GSAP pinning.
- **Avoid:** icon-feature grids, full-color logos, gradient headline text, pastel blob backgrounds, card shadows everywhere, 3+ hero CTAs.

## 3. Warm Paper

**When:** AI labs, research orgs, thoughtful tools, founder-led or mission brands, hardware about wellbeing. The register is humane, literate, and anti-hype.
**Exemplars:** Anthropic (identity by Geist), Cursor (basement + in-house), Daylight Computer (basement, Awwwards SOTD), Steve Jobs Archive (Work & Co), Lightfield (darkroom).

```css
:root{
  --paper:#FAF9F5; --paper-2:#F0EEE6; --card:#E3DACC;
  --ink:#141413; --ink-2:rgb(20 20 19 / .6); --ink-3:#B0AEA5;
  --hairline:rgba(20,20,19,.1);
  --accent:#D97757;      /* used rarely; Cursor #F54E00 (9 nodes), Daylight amber #FF9D00 (buy path only) */
  --font-display:"Instrument Sans","Hanken Grotesk",sans-serif; --font-serif:"Newsreader","Source Serif 4",serif; --font-mono:"IBM Plex Mono",monospace;
  --display:clamp(2.5rem,1.4rem + 3vw,4.25rem); --display-lh:1.1; --display-ls:-0.01em; --display-wt:500;
  --body:17px; --lead:22px; --ui:14px; --label:12px;
  --radius-btn:8px; --radius-card:8px; --radius-media:24px; --container:1284px; --margin:78px; --section:128px;
  --ease:cubic-bezier(.16,1,.3,1);
}
```
- **Fonts:** **the sans / serif / mono trio**, each with a job. Sans for display and UI, serif for reading and lead paragraphs, metadata in the text face (sans sentence case or an italic serif). Mono is optional here: mono uppercase labels belong to directions 1, 2 and 8 (range.md §2B), so reach for them only if the brand is technical. A light serif display is also on-direction: Daylight uses Arizona Flare **300 at 60px, −0.07em**, with italic words for emphasis. Free stand-ins: Newsreader 300 or Fraunces 300 (opsz 144, soft 0).
- **Hero options:**
  a) Anthropic: a left h1 with **underlined links inside the headline**, a serif paragraph in the right column (starting at ~58%), then a rounded media card of *documentary* film that expands to full-bleed on scroll.
  b) Cursor: a *small* h1 (26px!) left, two pills, then a 1300px panel whose background is a **landscape oil painting** with precise coded product windows layered over it.
  c) Daylight: a full-viewport *photograph* inset ~18px in a 16px-radius card, h1 top-left on the photo, a video thumbnail bottom-left, a big amber buy button bottom-right with "✓ IN STOCK · SHIPS IN 3-5 BUSINESS DAYS".
  d) Steve Jobs Archive: nothing but a 54px serif statement at line-height 1.3 (the one exception to the ≤1.1 display rule: a multi-line serif *statement paragraph* may run 1.2–1.3) after ~480px of white space, revealed line by line like ink drying.
- **Anatomy:** hero → full-bleed film or painting → "Latest" cards on tan with a **spec-table footer** (mono uppercase keys DATE / CATEGORY, values right-aligned, hairline dividers) → a mission sentence left + an article list right as table rows → testimonials as quote grids of real people with roles → a founder letter at a ~560px measure → a near-black `#141413` mega footer.
- **Signatures:** spec tables as design; underlined links inside the headline; documentary or analog imagery instead of AI imagery (VU meters, instruments, landscapes); fine-art painting as wallpaper behind UI; the ink-drying line reveal; italic emphasis words in a roman headline; commerce-only accent.
- **Motion:** GSAP `power2.out` or CSS expo-out reveals, line-stagger opacity (no translate), a media card that scales from inset to full-bleed (`clip-path: inset(0 78px round 24px)` → `inset(0)` scrubbed over one viewport). Lenis only for long narrative launches (Daylight).
- **Avoid:** glowing brains, neural-net imagery, blue tech gradients, and more than one serif.

## 4. Editorial Motion

**When:** design, architecture, and production studios; portfolios; culture and premium services. Type and image carry the brand, and juries will look at the motion.
**Exemplars:** Studio D (Exo Ape), Populous (Locomotive), Bennett & Clive (Spatzek, SOTM), Atlas Motion (Lusion), The Drake (Locomotive), Exo Ape's own site.

```css
:root{
  --paper:#FFFFFF; --paper-2:#F2EDE4; --dark:#1E1D1C; --ink:#1E1D1C; --ink-2:rgb(30 29 28 / .55);
  --hairline:rgba(30,29,28,.2);
  --accent:#1C19B5;     /* Populous ultramarine, sparingly; or none */
  --font-display:"Inter Tight","Hanken Grotesk",sans-serif; --font-kicker:"Newsreader",serif; /* italic only */
  --display:clamp(4rem,1rem + 9vw,8rem); --display-lh:.75; --display-ls:-0.035em; --display-wt:300;
  --word:clamp(6rem,2rem + 14vw,16rem);   /* 1–3 word headlines */
  --h2:clamp(2.25rem,1rem + 3vw,4rem); --body:16px; --label:11px;
  --radius-btn:42px; --grid-cols:16; --gap:20px; --margin:118px; /* or tight 18–40px */
  --ease:cubic-bezier(.19,1,.22,1); --ease-inout:cubic-bezier(.77,0,.175,1); --ease-ui:cubic-bezier(1,0,0,1);
}
```
- **Fonts:** a light grotesk display (weight **300**) with very tight leading (Studio D: 128px, **line-height 0.66**, −0.031em). Plus an **italic serif kicker** used only for kickers and quotes, and a neutral grotesk for UI. Bennett & Clive uses *one* font: Inter at 150px, −0.07em, line-height 0.77.
- **Rule of scale:** a sentence headline sits at ~5–5.5vw (72–80px); a 1–3-word headline at 9–18vw. Display line-height stays between 0.66 and 1.0, never above 1.1.
- **Hero options:** headline bottom-left over full-bleed video (Populous, 80px/1.0/−0.05em); headline **trespassing into an image** (Studio D: last letters overlap a portrait media box); a client-name stack at 150px with matching video behind the active name (Bennett & Clive); a two-block offset headline in uppercase (Atlas: "THE PHYSICAL LAYER" top-left, "OF AUTONOMY" indented right).
- **Not only white + a light grotesk.** The recipe above is the Quiet version. Played Confident or Loud, Editorial Motion can sit on a mid-tone or saturated ground with a wide or condensed face (Fieldwork's chipboard + Archivo 125% + cut-paper models; Ayocin's cocoa/cream inversions with 240px caps). Keep the structure: big type, asymmetry, pinned project slides. Change the axes (range.md).
- **Anatomy:** hero → numbered services "01 Plans / 02 Vision…" (40px, weight 300) with small images **scattered asymmetrically** on a 16-col grid → full-bleed project slides (96px white title + a smaller picture-in-picture inset image + "+" circle) → a list section with hover image previews and 1px separators → a statement on a tinted band (beige, sage) → a footer marquee at 200px ("Talk to us. Talk to us.") → a human contact card with a photo.
- **Chrome:** no nav bar. Use a wordmark that **collapses to a monogram** on scroll, a "Menu ●" circle, or links as **2 stacked columns aligned to grid columns** (Populous). A **vertical section index** in the margin ("01  Services" rotated) and arrow-prefixed micro-buttons ("↳ View all", 12px, 4px radius, 1px border).
- **Motion:** Lenis (lerp 0.1), GSAP `expo.out` 1s reveals, `expo.inOut` 1–1.2s for panels, SplitText lines with stagger 0.05–0.1 **from "end" or "center"**, clip-path image reveals, letter-roll hover on nav (doubled glyphs), word-by-word scroll color fill (grey → ink), and page transitions (View Transitions / Swup / Barba). Custom cursor optional (small, labeled: "View", "Next").
- **Avoid:** rounded cards, drop shadows, SaaS badges, centered paragraphs over gradients, nav bars, and display line-height above 1.0.

## 5. Quiet Luxury Commerce

**When:** fashion, beauty, fragrance, objects, premium D2C. Restraint *is* the conversion strategy: Totême's restrained replatform measured **+11% CR**.
**Exemplars:** Aesop (Work & Co), Totême (We Make Websites), Magda Butrym (Ania et Lucie / Commerce-UI), Aman (Colville-Walker), Akris (Build in Amsterdam), Suitsupply.

```css
:root{
  --paper:#FFFEF2; --paper-2:#F6F5E8; --ink:#333333; --ink-2:#666666;   /* Aesop. Totême: #FFF / #090909 / #5A5A5A. Aman: #F3EEE7 / #313131 */
  --hairline:rgba(51,51,51,.15);
  --accent:#945C26;     /* the product's material color, ONLY on 12px flags ("New addition") */
  --font-text:"Hanken Grotesk","Inter",sans-serif; --font-head:"Tenor Sans","Cormorant Garamond",serif; --font-label:"Courier Prime",monospace;
  --hero-title:31px; --h2:31px; --body:14px; --caption:12px;
  --radius-btn:0; --radius-card:0; --container:1200px; --margin:120px; --gutter:20px;
  --ease:cubic-bezier(.215,.61,.355,1); --dur-ui:.3s; --dur-media:.8s;
}
```
- **Type rules:** **UI and body are 12–14px, not 16px.** Section heads are 30–38px. Hero text is **18–31px, never 64px+**. Weights are 300–400; bold is only for product names. Use a serif *only* for section titles (Aesop uses its Optima-like serif on 9 of ~200 nodes). Pick one case stance: 0% uppercase (Aesop, Totême) or mostly uppercase (Byredo 81%). Never mix them arbitrarily. Uppercase kickers go to +0.025em at 12px and up to +0.2em at 10px (Aman).
- **Hero archetypes:** a) an **80vh film** (so the next heading peeks) with a bottom scrim and a centered caption stack (13px kicker → 31px title → 16px dek → a 390px-wide 1px ghost button). b) **Small image, big room** (Totême): a portrait at 30vw, 120px from the top, on white, with an 18px/300 caption. c) Category = a full-screen photo with one 30px label bottom-left; the whole tile is the link (Suitsupply). d) A landscape film hero with a **ghost wordmark** watermark at ~10% opacity (Magda Butrym).
- **No packshots or film yet?** First choice: a **flat colour still life**, the object on a shelf against a wall, with window light and its cast shadow as solid planes (imagery.md §6c). Second choice: a **technical elevation**, line art of the actual object (bottle, vial, garment flat, chair) with measurements, materials and a single accent fill line, beside an 18–44px serif statement (Ostra's discovery set). The drawing is the image *and* the motif; that is allowed. Never fill the hero with an empty placeholder.
- **Anatomy:** hero → curated set carousel → **asymmetric bleed splits** (image ~2× the text column, bleeding to the viewport edge, alternating sides, 200–300px of cream between them) → zero-gutter 2-up campaign tiles with centered captions → a text-free cut-out product line-up → editorial cards with **read-time labels** → a quiet footer. The homepage is 3–9 viewports.
- **Commerce components:** product tiles with no card (packshot on page color or `#F3F3F3→#E6E6E6` 160° sweep, ~15% padding); a 4-up grid with 2–20px gutters; a PDP with a 640px image column + a **400px sticky info column**, centered name and price, swatches as mini product photos, plain-numeral sizes (sold-out struck through), and a **full-width 1px ghost "Add to cart"** at weight 300. Filled buttons only for transactional actions (charcoal bar).
- **Motion:** CSS only. 0.2–0.4s UI, 0.6–1s image fades, no smooth scroll, no pinned *full-width* sequences (a sticky media column beside moving text is fine, Aesop-style; use `motion.js` scrollSpy). For drawn imagery, a "light-up" reveal (`--reveal-filter:saturate(0) brightness(1.06);--reveal-transform:none`) is the quiet-commerce primitive. Video is the motion, always with play/pause and mute controls.
- **Avoid:** pills (except icon circles), gradients (except legibility scrims), stats, logo walls, testimonial carousels, FAQ on the homepage, icon features, and "Shop now!!".

## 6. Cinematic Place

**When:** hospitality, travel, safari, real estate, wine, destinations, experiences. The place is the hero; type is monumental or whisper-light.
**Exemplars:** White Desert (Malvah, Studio of the Year 2025), ERA Residence (The First The Last, SOTM), Tengile MalaMala (DashDigital), Ace Hotel, Symphony of Vines (Unseen).

```css
:root{
  --paper:#FFFFFF; --paper-2:#F3F3EC; --ink:#1F2A44; --ink-2:#535353;     /* White Desert navy; ERA navy #17233B; Tengile ink #373F1D */
  --accent:#FF7E15;     /* expedition orange: ONE utility tab / status marker only */
  --font-monument:"Oswald","Barlow Condensed",sans-serif; --font-serif:"Cormorant Garamond","Newsreader",serif; --font-ui:"Inter Tight",sans-serif;
  --monument:clamp(7.5rem,2rem + 18vw,20rem); --monument-lh:.9;      /* uppercase, ~0 tracking for condensed */
  --serif-head:clamp(2.5rem,1.5rem + 2.5vw,3.75rem); --body:16px; --label:11px; --label-ls:.175em;
  --radius:2px; --grid-cols:12; --gap:12px; --margin:12px; --section:160px;
  --ease:cubic-bezier(.16,1,.3,1); --ease-inout:cubic-bezier(.76,0,.24,1);
}
```
- **Fonts:** three families with strict jobs. A condensed sans for monumental words (Oswald 256–320px), a serif (with italic) for 42–60px headings and quotes, and a neutral grotesk at 14–18px for UI. The ultra-light serif variant (Tengile: PP Fragment at weight **220**, uppercase, stepped lines) also works. Free stand-ins: Cormorant Garamond 300 or Fraunces 200.
- **Hero:** a **monumental word in front of the subject** ("ANTARCTICA" at 256px anchored to the hero's bottom edge; the photo fades in *after* the type). Or a stacked condensed serif title with a **script word** overlaid (ERA). Small glass rectangular nav buttons, an italic serif tagline left, "Watch Film ▶" right, faint vertical grid lines.
- **No photos yet?** Put the monument over a **domain map or chart that carries real information**: soundings, contours, a route, a site plan (Halden's fjord chart). Book from the hero. Mark future photo slots as placeholders *below* the fold, never as the hero. **Which monument face:** condensed sans (Oswald, Big Shoulders) reads expedition, sport, civic; a hairline didone or light serif (Fraunces 200–300, Bodoni Moda) reads boutique, wine, residence.
- **Anatomy:** hero → a narrow text column over a full-bleed landscape → founder quote in italic serif + a **scanned signature** → an asymmetric photo collage with photographer credits → a camps or rooms carousel with **coordinates** (`71°32'41" S, 8°58'11" E`) → a giant semi-transparent route or place code over landscape ("CPT – WFR" at 320px) → a closing statement with coordinates in the corners. Optional: an **arch section divider** with text on an SVG path; a day/night toggle; a fixed vertical utility tab ("How it works +") in the accent. Page length 12–27 viewports.
- **Hospitality conversion:** booking is never more than zero scrolls away. Use **booking-as-masthead** (Ace: bordered cells LOCATION / CHECK IN / CHECK OUT / GUESTS + one saturated "BOOK NOW" block) or a persistent "Reserve" / "Enquire" button.
- **Motion:** Lenis, GSAP `power2.out` / `sine.inOut`, image fades 1.2s expo-out, grain overlay (6–10% opacity), page transitions, marquee of images.
- **Avoid:** SaaS chrome, pills with icons, stock-travel clichés (infinity pools at sunset with "Escape to paradise"), and more than one accent.

## 7. Institutional

**When:** museums, nonprofits, foundations, publishers, universities, civic and government, any big content site. It is about systems over set pieces, high content density, and visible accessibility.
**Exemplars:** Art Institute of Chicago (AREA 17), Obama Foundation (Work & Co + Manual), Pentagram.com (AREA 17), Fondation Cartier (AREA 17), Norton Museum (Koto), TIME (Code and Theory), Steve Jobs Archive.

```css
:root{
  --paper:#FFFFFF; --band:#F3F3F3; --ink:#1A1A1A; --ink-2:#767676;      /* #767676 = AA on white */
  --rule:#E6E6E6; --accent:#B50938;     /* AIC red: links + primary button ONLY */
  --font-serif:"Source Serif 4","Libre Caslon Text",serif; --font-sans:"Public Sans","IBM Plex Sans",sans-serif;
  --lede:clamp(1.75rem,1rem + 1.6vw,2.4rem); --display:clamp(3rem,.75rem + 6vw,7.5rem); --body:17px; --label:12px; --label-ls:.14em;
  --radius-btn:2px; --btn-h:48px; --margin:clamp(1.5rem,.566rem + 2.263vw,4.25rem); --gap:40px;
  --ease:cubic-bezier(.59,.01,.28,1);   /* AREA 17 house ease, 0.25–0.6s */
}
```
- **Rule:** **serif for meaning** (statements, ledes, titles, quotes) and **sans for utility** (nav, meta, buttons, hours, prices). Italicize artwork and publication titles. Tracked uppercase section labels (+0.14em at 12px) with "See all →" right-aligned.
- **Hero options:** a full-bleed image or video with the nav overlaid and a "Plan Your Visit" button; a **rotating-noun sentence** (Obama: "A campus / A museum / Art" + a fixed "that brings change home" at 100px condensed, on black); a sentence-as-filter ("We design [Brand Identity ⌄] for [Technology ⌄]", Pentagram); or a text-only operational announcement set as a 48px headline (Fondation Cartier).
- **Signatures:** **prose-as-navigation** (a 38px grey serif lede whose key nouns are red underlined links); a status line ("Open today 10–5 · See all hours"); an alert band for operational news; per-item semantic color fields (one poster-derived color per exhibition, full-bleed behind a centered image, with the chrome kept neutral); a big-type ask finale ("DONATE TODAY" at ~16vw, condensed, line-height 0.8, on the action color); 1px column rules; an "i" button for image credits; footnoted claims.
- **System:** named token bundles per text style (`--f-display-1-*`), a fluid `clamp()` spacing ladder, a grid overlay toggle for dev, multi-page architecture with soft page transitions (View Transitions API). Buttons are 44–64px tall. Use one radius camp: 0–2px (Obama, AIC, Norton) or pill (Lucas, SJA).
- **Motion:** quiet. 0.15–0.35s UI and 0.5–0.9s reveals. **No preloader, no smooth scroll, no cursor effects.** LQIP blur-up on images. Pause buttons on any autoplay video.
- **Accessibility is visible:** skip links styled as real buttons, AA greys, underlined links in prose, and focus rings designed rather than just retained.

## 8. Deep-Tech Spec

**When:** robotics, aerospace, climate tech, biotech, industrial AI, logistics, energy, defence-adjacent hardware. Show a cinematic real object and dress it in instrument-grade information design.
**Exemplars:** Terminal Industries (Rejouice, SOTM), ICOMAT (Rejouice), Inversa (Exo Ape), Glyphic Bio (Obys), Vast (Antinomy), Radian (UNCOMMON), Atlas Motion (Lusion), Serve Robotics (WILD).

```css
:root{
  --paper:#F5F3EF; --dark:#121714; --ink:#121714; --ink-2:rgb(18 23 20 / .55); --ink-ghost:rgb(18 23 20 / .2);
  --grid-line:rgba(0,0,0,.06);
  --accent:#ABFF02;     /* acid lime (Terminal) / #EBFC72 (Inversa) / #FF5623 (Vast: tiny status markers) / product color (Radian #FDEB07) */
  --font-display:"Inter Tight","Archivo",sans-serif; --font-mono:"JetBrains Mono","Geist Mono",monospace; --font-num:"Doto",monospace;
  --display:clamp(3rem,1.5rem + 4vw,4.75rem); --display-lh:.96; --display-ls:-0.04em; --display-wt:500;
  --ghost-word:clamp(10rem,2rem + 20vw,21rem);   /* "Haven-1" pale behind the render */
  --label:11px; --label-ls:.18em; --radius:3px; --margin:20px; --grid-cols:24; --gap:18px;
  --ease:cubic-bezier(.19,1,.22,1); --ease-inout:cubic-bezier(.77,0,.175,1);
}
```
- **Hero:** a full-bleed cinematic object (truck at dusk, carbon-fibre macro, a space station in a clean room, an e-moto in darkness) with **almost no text**: an h1 bottom-left at 70–76px (line-height ~0.9) or just "SCROLL TO EXPLORE" in spaced mono. A floating capsule nav with translucent blur and compact mono items. Radian's **lights-up reveal**: start black with only the headlight visible, then ramp up.
- **No photos or renders (the usual agent case)?** Use the **technical drawing as hero** (layout.md H16): the object drawn to scale on a crosshair grid, the job it does drawn as motion (flight path, flow, load), and its *output* annotated (defect boxes with measurements). Kestrel's 68 m blade is the reference. Native scroll is fine. Lenis and pinned scrubs are optional here, not required.
- **Anatomy:** hero → a statement with two-tone emphasis (key words in ink, the rest pale `#CFD9E0`) → **the object on a technical grid** with crosshair intersections and callout chips ("AT SCALE ⊕", "10× FASTER ⊕") → a **giant pale product name behind the render** (luminance within ~5% of the background) with a **mono spec sheet** in the corner ("CREW: 4 · MASS: 14,600 KG · ORBIT: 51.6°") and one accent status tag ("LAUNCHING 2027") → a sticky **opacity-index feature list** (active at 100% ink, the rest at 20%) beside swapping media → stats as giant mono numerals → an interactive calculator ("What's your yard costing you?") → press quotes with vertical hairlines → a dark footer.
- **Signatures:** crosshair hairline grids; chamfered-corner HUD cards (`clip-path` 45° notches); a brand-derived **notch cut** reused on panels; **scramble/decode** mono labels; pixel-tile mask transitions; coordinate callout lines; a ruler-tick scroll progress; a mascot riding a progress rail (Serve); dot-matrix numerals (Doto).
- **Motion:** Lenis, GSAP `expo.inOut` 1.2s for scenes, SplitText lines/words, pinned scrubbed sequences, decode text at about 400ms per label.
- **Avoid:** sci-fi neon cyberpunk, glowing circuit boards, stock "AI brain" art, and big UI screenshots as the first screen (these sites open on the *object*, never on the dashboard).

## 9. Playful System

**When:** consumer apps, games, communities, kids, food and drink, or a B2B brand that wants warmth. Personality comes from illustration and motion; the grid stays strict.
**Exemplars:** Family (crypto wallet), MindMarket (Louis Paquet / KOKI-KIKO, SOTM), Lando Norris (OFF+BRAND, SOTY 2025), Choo-Choo World (Lusion), Floema (Bürocratik), Ignura (launch studio, 2026), Mugic (AI music: the input as a synth, pastel feature fields; screenshot).

```css
:root{
  --paper:#F5F1E4; --ink:#2C2E2A; --ink-2:rgb(44 46 42 / .6);
  --c1:#8ED462; --c2:#F5E211; --c3:#FF705D; --c4:#2BA0FF;   /* multi-color is allowed HERE, as a system: each hue owns a feature/section */
  --font-display:"Inter",sans-serif;    /* MindMarket: Inter 500 at −0.06em feels custom. Or Bricolage Grotesque / Gabarito */
  --display:clamp(4rem,1rem + 8vw,8.75rem); --display-lh:.95; --display-ls:-0.06em; --display-wt:500; --body:20px; --body-ls:-0.02em;
  --radius-card:24px; --radius-btn:9999px;
  --ease-pop:cubic-bezier(.34,1.56,.64,1);
  /* JS springs: heavy hero {mass:4, stiffness:800, damping:80}; UI {stiffness:500, damping:25} */
}
```
- **Rules:** multi-color is allowed **only as a system**: each hue is assigned to one feature or section (Family gives each feature its own display-p3 hue). Illustration is bespoke and consistent (a flat character cast, rubber-hose figures, blob creatures), never a stock pack. Type stays disciplined: one family, tight tracking, weights 400–600. Big friendly radii are allowed here (24–64px).
- **Hero:** a centered h1 with character illustrations bursting in from the edges or the bottom on springs, word by word (Family: words appear one by one, illustrations pop on springs, CTAs last). Or a full-bleed saturated field with a huge −0.06em headline (MindMarket).
- **Signatures:** a path ribbon drawn across a photo with text on the path; cards stacking on scroll; stat counters at 144px; a mixed-font headline (one word in a second display face at the same size, as Lando does); toy-plastic buttons (`box-shadow:0 6px 0 <darker>` that press to `translateY(4px)`); wiggle and pop micro-interactions.
- **Studio / service variant (Ignura). Keep the structure; swap the world, the objects and the faces for the brand's own** (On Air, the test build: broadcast, cassette J-cards, tape, an LED face): the whole site is one illustrated world (sky, ground, fire), and every service is a character in the cast. Tiers and steps are named from the brand metaphor (Ignite / Burn / lift-off), pricing is drawn as tickets, and the process is a journey map. Copy carries inline UI tokens (`thing▍`, `localhost:3000▍`). Four role-locked type voices: statement serif, body sans, pixel for prices/UI, one handwritten word per heading in the accent (techniques.md §61–67).
- **Motion:** springs everywhere, but **critically damped on big surfaces** (Family `mass 4, stiffness 800, damping 80`). Overshoot `cubic-bezier(.34,1.56,.64,1)` only on small pops. Rive or Lottie for illustration.
- **Avoid:** Comic Sans energy, rainbow gradients, emoji as icons, uncontrolled multi-color UI (color must map to meaning), and childish copy for adult products.

## 10. Immersive

**When:** a launch built around one hero object, a campaign microsite, a cause piece, a luxury collection, or when the 3D *is* the information (a city map, architecture). **Don't** use it for anything where users need to scan, compare, or convert.
**Exemplars:** illoca (Unseen), Atlas Motion and Oryzo (Lusion), David Whyte and 100 Lost Species (Immersive Garden), 365 A Year of Cartier (14islands), BOSS Dubai (Dogstudio), Miu Miu (Merci-Michel).

- **The loader lives inside the subject and never covers the h1 or the CTA** (SKILL.md: hero copy is visible from the first frame). Lamps switching on, a horizon brightening, the object assembling: the page is readable while it happens.
- **The loader is the first impression, and often the only one.** 8 of 14 immersive sites never got past their loader in a software-rendered browser. Design it like a hero and cap it:
  - Make it a **brand object as progress**: the product drawn as a CAD diagram with a rotating pie-sweep (Oryzo), a stator ring filling (Atlas), a gold card growing that *becomes the first image* (Cartier 365), a terrain contour line (Symphony of Vines), or a logo assembling tile by tile (illoca).
  - Loader type is tiny (8–12px), mono or light serif, tracked +0.05 to +0.16em when in caps. Show a 1px ring or a segmented bar plus a % counter. Put the value proposition in a teaser line (David Whyte).
  - **Show it for at least 800ms and at most ~2.5s**, then reveal whatever is ready. Render the h1 and value prop in HTML immediately.
- **Tokens:** use tinted darks (`#181818`, `#100904`, `#020A18`, `#0A0901`) or warm papers (`#EFEAE2`, `#EADFC9`), cream text (`#EEE8E8`, `#FFEDD7`), and one surgical accent. For display, either hairline (Canela 100, Feature Display 200; free: Cormorant 300, Fraunces 100) or solid 500–700 caps. Line-height 0.8–0.9 for words. Labels 9–12px, tracked out.
- **Reveal vocabulary:** **blur-to-sharp** (the #1 primitive in this cluster: `blur(4–9px)` for text, up to 18px for media, translate ≤12px); an aperture/hole reveal (four panels retracting, or `clip-path: inset(41% 35%)` → `inset(0)` over 1.2s `cubic-bezier(.76,0,.24,1)`); a scroll-scrubbed word fill; a circle mask from the bottom; a stroke-drawn signature title card; a shard vortex; letter-roll hover.
- **Chrome:** reduce it to Back / Sound / Skip / chapter dots. Add film chrome where it fits (chapter selector, subtitles, a skip button). Make sound **always opt-in** with a stated recommendation ("For an optimal experience, turn on your sound"). An optional one-question gate ("Are you living in Dubai? YES · NO") personalizes the experience and unlocks audio.
- **WebGL rules:** bake lighting (Blender/Cycles lightmaps + matcaps, `MeshBasicMaterial`, no real-time lights); use camera presets per section lerped at 0.05–0.1; cap DPR at 1.5; keep all headings as DOM over the canvas; ship explicit "WebGL not supported / rotate device" states; offer a video or poster fallback on mobile.
- **Motion:** easeOutExpo `cubic-bezier(.19,1,.22,1)` (83× on David Whyte), 0.8s as the single most common reveal duration, char staggers 0.02–0.035s, line staggers 0.1–0.15s with `from:"end"` and `from:"center"` variants, Lenis lerp 0.06–0.1, **linear easing for anything that represents time**.
- **Reduced motion:** skip the loader choreography, turn Lenis off, replace camera scrubs with crossfades, and turn blur reveals into opacity.

## 11. Bright Product

**When:** AI tools, SaaS and consumer apps that want to feel friendly, capable and finished rather than editorial or "award-site". This is the look of most product launches in 2025–26, done properly. The page is bright, the product shows up as small real UI, and **one generated image system** gives it a world.
**Exemplars (user-supplied screenshots, unmeasured):** Fornax (a photo composed for the headline), Answerr (engraving as the brand metaphor), Mugic (the input as a pastel synth), Wandor (painterly landmark collage), BugScout (split header and staggered tray), Ignura (an illustrated world at full volume, direction 9's loud cousin).

```css
:root{
  --paper:#FFFFFF; --paper-2:#F4F4F2;              /* the tray behind card groups */
  --ink:#18202B; --ink-2:rgb(24 32 43 / .68); --ink-3:rgb(24 32 43 / .6);
  --accent:#4F46E5;                                 /* ONE brand hue: indigo, teal #0E9384, navy #24407A, lavender #7C5CF0. The image supplies the rest of the colour */
  --font-display:"Newsreader",serif;                /* a book serif at 400 (Fornax, Answerr) OR a characterful sans at 500 (Instrument Sans, Geist, Bricolage); never Inter-at-700 */
  --display:clamp(2.75rem,1.4rem + 3.8vw,4.75rem); --display-lh:1.02; --display-ls:-.02em; --display-wt:400;
  --radius-card:20px; --radius-btn:999px;
  --shadow-card:0 1px 2px rgb(16 24 40 / .05),0 10px 28px -14px rgb(16 24 40 / .16);   /* soft and low; vignettes float, the page doesn't */
}
```
- **The image system is not optional.** Generate one consistent series (imagery.md §8) in a medium chosen from the brand's claim (techniques.md §72): a sunlit photo of the outcome, an engraving, a painterly collage, pastel objects. Use it to **bookend** the page (hero and finale) and as the ground under UI vignettes (techniques.md §69). No image tool? Pick another direction rather than shipping this one bare.
- **Product as vignettes, not dashboards:** small rounded UI fragments that each show one moment: three incoming items with timestamps, one extracted record with a status chip, a booked calendar slot, a prompt with a typed example. Use real, specific content ("Quote for kitchen rewiring · 8:14"), never filler ("Debugger" ×3). Each vignette animates its one action once when it enters the viewport.
- **Hero (pick one):**
  a) **H19**, a photo composed for the headline (techniques.md §68).
  b) **H20**, the prompt as the hero, drawn as a domain object (§75).
  c) **H21**, a split header over a staggered tray of 3 vignette cards (§77).
  d) The output artifact (a credential, report or itinerary) on the illustration (§73).
- **Anatomy:**
  1. Hero.
  2. Integrations row ("Works inside the tools you already use").
  3. A two-tone "why" statement.
  4. The three-step transformation (§69).
  5. 2–3 persona or feature rows (a vignette on an image crop, alternating sides, aligned to a 12-column grid, with no dead zig-zag gaps).
  6. Honest proof ("From early access", labelled).
  7. Pricing: three cards, or an object (§62).
  8. FAQ beside a contact card.
  9. A finale bookend (a hero re-crop, or the input repeated).
  10. A footer that ends in the image system (§76).

  8–12 viewports.
- **Copy:**
  - Headline formulas: in → out ("Work goes in cold. Comes out finished."), two-sided ("Institutions buy it. People carry it."), or claim → challenge.
  - Sentence case everywhere, and task-verb CTAs ("Plan my trip", "Get early access").
  - One voice line per section.
- **Motion:** calm. Fade plus an 8px rise at 0.5–0.7s with `cubic-bezier(.2,.8,.2,1)`, a 60–80ms stagger, and a hover lift of 2px on cards. Vignettes play their one action, and a typing placeholder runs once. No smooth scroll, no pinning, no blur-in on body text.
- **What separates it from the default AI look** (white, rounded cards, one accent, which this direction sits next to): the art-directed image system, real content inside the vignettes, a serif or characterful display, and copy with a voice. Lose any of those and it's a template.
- **Avoid (every supplied reference got at least two of these wrong):** duplicated sections; Title Case headings; ghost buttons on photos; gradient pill buttons with coloured glows; labels in several colours that map to nothing; filler UI; vague stats ("MILLIONS"); unsourced named testimonials; typos in compliance acronyms; a person with a laptop that doesn't show an outcome; purple-to-blue gradient blobs.
