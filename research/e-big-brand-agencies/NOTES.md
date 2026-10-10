# Cluster E — Big blue-chip agencies: their LIVE CLIENT websites

Scope: web output of Work & Co (Accenture Song), AREA 17, Instrument, R/GA, Code and Theory, Koto, Pentagram (as client/brand partner).
The evidence is the live client sites. Agency homepages were not the focus. Pentagram.com is counted as a **client** site because AREA 17 designed and built it.
Method: `tools/analyze.mjs` at 1440×900 plus a 390px mobile pass. I looked at the screenshots and read case studies with WebFetch. All numbers below are measured unless marked "(case study)" or "(observed)".
Run date: 2026-10-07. Raw data: `research/e-big-brand-agencies/sites/<slug>/data.json` + `shots/`.

Capture caveats (honest):
- Headless capture sometimes missed lazy media. artic.edu stayed on its blurred LQIP placeholders. Oura's desktop hero video and Aesop's product packshots did not paint (Oura's mobile hero did). Where I write "observed", I mean what showed in the frame.
- OneTrust/cookie overlays dimmed several frames (Obama, Lucas, Pentagram mobile). Brand colors are taken from computed CSS, not from those dimmed pixels.
- **Blocked by bot protection (no data):** iea.org (AREA 17, Cloudflare challenge), stoneisland.com (R/GA, 403), press.princeton.edu (AREA 17, 403). The IEA capture held only the challenge page, so I deleted it. The Stone Island notes come from its case study only (see the end).

---

## Sites analyzed

| # | Client | URL | Agency (web) | Category | Stack (detected) |
|---|---|---|---|---|---|
| 1 | Obama Foundation | obama.org | Work & Co (brand: Manual) | Nonprofit / presidential center | SvelteKit, OneTrust |
| 2 | Steve Jobs Archive | stevejobsarchive.com | Work & Co (brand + typeface: LoveFrom) | Cultural archive | Next.js, Framer Motion springs |
| 3 | JW Anderson | jwanderson.com | Work & Co | Luxury fashion e-com | Shopify (headless-ish), Tailwind oklch tokens |
| 4 | Aesop | aesop.com/us | Work & Co (2017 platform; lineage since then uncertain) | Luxury retail e-com | custom, CSS keyframes |
| 5 | Art Institute of Chicago | artic.edu | AREA 17 (2018) | Encyclopedic museum | Twill CMS (Laravel), open-source |
| 6 | Fondation Cartier | fondationcartier.com | AREA 17 (2025; identity + typeface: DeValence) | Contemporary art museum | swup page transitions, Framer-style springs, A17 grid tokens |
| 7 | Lucas Museum of Narrative Art | lucasmuseum.org | AREA 17 (identity: 2x4) | New museum (opened 2026) | swup + GSAP ScrollTrigger, Twill |
| 8 | The Menil Collection | menil.org | AREA 17 | Museum | swup + GSAP, A17 fluid clamp() tokens |
| 9 | ElevenLabs | elevenlabs.io | AREA 17 (2023–24 brand + site; now evolved in-house) | AI SaaS | Next.js, shadcn tokens, A17 grid tokens |
| 10 | Pentagram | pentagram.com | AREA 17 (since 2017) | Design consultancy (portfolio at scale) | GSAP, Twill, A17 tokens |
| 11 | Oura | ouraring.com | Instrument (2025) | Consumer health hardware e-com | Next.js |
| 12 | AlphaSense | alpha-sense.com | Instrument | B2B fintech / market intelligence | Next.js + Sanity (case study) |
| 13 | Eames Institute | eamesinstitute.org | Instrument (brand: Manual) | Design nonprofit / museum | Astro (astro* view-transition keyframes) |
| 14 | Norton Museum of Art | norton.org | Koto (2026 rebrand); I could not verify whether Koto or another vendor built the web layer | Museum | custom |
| 15 | TIME | time.com | Code and Theory ("full-stack reinvention", per press) | News media | Next.js, Framer Motion springs |
| — | Stone Island | stoneisland.com | R/GA (2024) | Fashion e-com | blocked (403), case study only |
| — | IEA | iea.org | AREA 17 | Intergovernmental data | blocked (Cloudflare), case study only |

Agency coverage: Work & Co ×4, AREA 17 ×6 (+IEA blocked), Instrument ×3, Koto ×1 (brand-led), Code and Theory ×1, R/GA (case study only).

---

## Key forensic finding: agency "house fingerprints" survive in client code

This is the most useful meta-lesson. A big agency ships a **front-end system**, not a one-off page, and its DNA is measurable across clients:

- **AREA 17 grid-overlay tokens** show up on 4 different client sites: `--grid-column-bg: rgba(127,255,255,.25)`, `--env: "dev"|"production"`, `--breakpoint: "xs"|"sm"`, `--inner-gutter`, `--outer-gutter`, `--grid-columns`. These were found on **ElevenLabs, Fondation Cartier, Pentagram, Menil**. A dev-mode column overlay is part of their build kit.
- AREA 17 also uses **named typographic tokens per style**: `--f-display-1-font-size: 3.625rem; --f-display-1-line-height: 1.05; --f-display-1-letter-spacing: -.02em; --f-display-1-font-feature-settings: "case" on; --f-display-1-font-weight: 375` (Pentagram), and `--f-display-01-*` (ElevenLabs). Each text style is a bundle of family, size, line-height, tracking, weight and OpenType features. It is not a loose type scale.
- **AREA 17 house ease** `cubic-bezier(0.59, 0.01, 0.28, 1)` is the #1 curve on both artic.edu (×14, 2018) and pentagram.com (×27). It is a slow-in, long-settle "museum" ease.
- **AREA 17 fluid spacing** (Menil): spacing steps written as `clamp(min, base + vw, max)`. For example `clamp(6rem, 4rem + 5.33vw, 10rem)`, and display `clamp(3rem, .75rem + 6vw, 7.5rem)` with `line-height: 90%; letter-spacing: -.03em; text-transform: uppercase`.
- **swup** (page-transition router) appears on 3 AREA 17 museum builds (Fondation Cartier, Lucas, Menil). Big-brand sites keep server-rendered multi-page architecture (CMS, SEO, accessibility) and add soft page transitions on top. They are not SPAs.
- **Work & Co**: no shared token fingerprint. Each site's system is native to its brand (Svelte for Obama, Next + springs for SJA, Shopify for JWA). The common thread is **brutal simplicity of components**: radius 0, 1px borders, big type.

Takeaway for the skill: build a **token system first**, with named text styles, a fluid spacing scale, a grid with a dev overlay and one house ease. Then compose pages from it.

---

## Per-site teardowns

### 1. Obama Foundation — obama.org (Work & Co; identity by Manual)
- **Hero:** full-black 100svh panel. A two-column typographic sentence: on the left, a **rotating noun** ("A campus" → "A museum" → "Art" → "Sports" → "Events"); on the right, a fixed predicate "that brings change home". Both are set in Gotham Condensed at **100px / 90px line-height, −0.015em (−1.5px)**, white. "Now Open" label at the bottom-left. Above the nav sits a full-width **yellow alert band** (#FFBD12) carrying ticket-availability info and a "Get notified →" link. That is operational content treated as a design element.
- **Sequence (11.6 viewports):** alert band → black hero → Presidential Center feature (large photo 2/3 + sidebar card "Museum" with copy + outline button) → thick 12px black rule → "Experience the Center" → mission statement → a "Latest" stories block with a **solid-color tile** (#8EDDFF light blue: "Inspiration from leaders and communities around the world.") plus a 2-column story list split by 1px vertical rules → a "Programs" tile in yellow with the **rising-sun geometric pattern** (half-circles, Manual's "ripple" graphic) → "Be an insider" newsletter → a **DONATE TODAY** finale on blue #0064F0, set at 230px Gotham Condensed Bold uppercase, line-height 0.8 (184px), −0.011em.
- **Brand → web:** the custom Gotham variants (Slab/Stencil/Inline Condensed) are reserved for print and campaign use. The web uses plain **Gotham Condensed** for all headings and nav (111 nodes). Body copy is the serif **Chronicle Text G1** (35 nodes), which gives a "civic newspaper" texture. The rising-sun mark becomes a **pattern generator** inside color tiles (half-circle arcs and rays). Illustrations are commissioned (Sarah Madden, Lorenzo Gritti, per Creative Review).
- **Type scale (px):** 13 / 15 / 16 / 22 / 24 / 32 / 34 / 54 / 72 / 100 / 230. Body serif is 24px (×56 nodes). Card titles are Gotham Condensed 32px. Tracking is negative on everything: −0.033em@15 (small labels), −0.017em@72, −0.015em@100. Weight is almost always 400; condensed type does the shouting.
- **Color:** black/white ≈ 90% of surfaces. Accents: yellow #FFBD12, action blue #0064F0 (Donate), sky #8EDDFF, warm paper #F3F3EE. Secondary text is rgba(0,0,0,.6).
- **Grid:** CSS vars `--grid-columns: 4` (mobile) → 12 cols with **72px gaps** at desktop, `--grid-margin: 1.875rem` (mobile), side margin 60px desktop, max width 120rem (1920). `--nav-height: 92px` (74px measured once sticky).
- **Components:** **radius 0 on every button**. Outline button: 1px solid black, padding 16×24, 24px Gotham Condensed, 58px tall. The Donate CTA is solid #0064F0, padding 24×32, **74px tall = the full nav height**, flush right like a tab. Text links use "Learn more →" in Gotham Condensed with an arrow glyph. Category meta is "Stories • MBK Alliance" in grey sans with bullet separators.
- **A11y:** a "Skip to content" button styled as a real black button (58px). The DONATE finale keeps white on #0064F0 (≈5:1). The custom Svelte "fun-widget" uses a backdrop keyframe.
- **Motion:** `cubic-bezier(0.33,1,0.68,1)` (easeOutCubic) ×17 is dominant; Material standard `(0.4,0,0.2,1)` ×10. Durations are 0.1–0.5s. SplitText is detected, and the rotating hero word uses a Svelte `fly-in` keyframe.
- **Copy voice:** civic and imperative. "A campus that brings change home." "We need your help to turn hope into action." "Empowering the next generation of changemakers."
- **Mobile:** the yellow alert band stays on top. The nav switches to a blue bar with the logo, a Donate block and a hamburger. The hero rotating word drops to a single column at ~54px.
- **Signature moves:** a rotating-noun sentence hero; a 230px DONATE finale as the footer's first act; solid-color story tiles with logo-derived patterns; operational alerts as a top band.

### 2. Steve Jobs Archive — stevejobsarchive.com (Work & Co; LoveFrom identity)
- **Hero:** almost nothing. A 96px left margin. The logo is an "i"-like stem (the tree mark collapses to its trunk at desktop; the full tree shows on mobile). A tiny "Menu ⌄" in 14px system sans. Then ~480px of pure white before the statement: "The Steve Jobs Archive is the authoritative home for Steve's story and a resource for new generations eager to make their own mark." The statement is set in the custom **LoveFromSJA serif, 54px / 70.2px (1.3), −0.02em**, black, about 1250px measure.
- **Intro choreography:** at 350ms the statement lines are already staggering in **as greys**. Line 1 is mid-grey, line 2 lighter, line 3 near-white. They darken to black line by line, like ink drying. This is a line-stagger opacity reveal on a white page, with no movement.
- **Sequence (4.8 viewports):** two-paragraph statement → "Learn more" pill → full-bleed 1px hairline divider → repeated **editorial rows**: on the left a 22px sans eyebrow ("Publications", "Stories", "Fellowship") plus a **two-tone headline** (title in black, subtitle in #707070 grey, same 42px serif: "Letters to a Young Creator / What it takes to make something great, from people who have done it before"), a grey pill CTA; on the right a 576px media tile (video or a 3×2 portrait grid of fellows) → hairline → next row.
- **Type:** only two families. LoveFromSJA (display) and the `-apple-system` UI stack, a deliberate Apple nod. Sizes are 14 / 16 / 18 / 26 / 42 / 54. **Every size carries −0.02em tracking** (−0.01em at 26). Weight is 400 only.
- **Color:** #000 text, #707070 secondary headline, #F5F5F5 pill fill, #D0D0D0 border. Effectively monochrome. Color comes only from archival photos and video.
- **Grid:** a 30-column grid with 0 gap (fine-grained placement), 96px side margins, 1920 container.
- **Components:** pill buttons with **radius 60px, padding 10×23, 18px text, 48px tall, fill #F5F5F5, black text** (no border contrast). Circular play button. Newsletter input is a circle-arrow submit. No nav bar at all, just "Menu ⌄".
- **Motion:** Framer Motion springs `{stiffness:150, damping:25}`, `{stiffness:200, damping:25, delay:.25}`, `{duration:1.1, bounce:.15}`. Bezier arrays [.17,.17,0,1], [.4,0,.1,1], [.25,.1,.35,1]. CSS transitions 0.25s.
- **Copy:** reverent and plain. "Stay hungry, stay foolish / Celebrating Steve's timeless address." "Pixar: The Early Days / A never-before-seen 1996 interview."
- **Mobile:** 22px margins. The statement serif reflows to ~26px, and the full tree logo shows.
- **Signature moves:** a huge serif statement as the entire hero; a title-plus-grey-subtitle headline at one size; hairline row separators; grey pill CTAs; ink-drying line reveal.

### 3. JW Anderson — jwanderson.com (Work & Co e-com redesign)
- **Composition:** no hero image. A **giant vertical wordmark "JW ANDERSON"** (custom high-contrast serif, ~120px wide) is pinned to the right edge for the full viewport height and stays fixed while products scroll past. Top-left utility row in 12px uppercase: "MENU  LOGIN  BAG  ⌕". A centered announcement bar in 14px underlined serif: "JW ANDERSON DENIM. Shop Now."
- **Product grid as collage:** tiles use **mixed widths** (≈192 / 240 / 300px) and a fixed height (~240px) with **6px gutters**, left-aligned, ragged right. It reads like a pinboard or shop shelf, not a uniform 4-up grid. Under each tile: product name in **Grad serif 11px, +0.007em**, price, "· 3 colours" in italic. The "[New]" prefix is a bracketed text tag, not a badge. The pinned top row of collection links (16px serif): "The Denim Edit · Men's New In · Women's New In · Loafer Bags · All Home".
- **Type:** Grad (custom serif) 257 nodes, acumin-pro for UI (56). Sizes are tiny: **11px ×213**, 12 / 14 / 16 / 18. **Max size on the homepage is 18px**; the only big type is the wordmark (SVG). 18% uppercase (UI labels).
- **Color:** white page, black text. Tiles sit on oklch(0.9 0 0) grey until images load. Newsletter drawer in **lilac oklch(0.83 0.061 320.8)** with a hand-drawn flower illustration. Accents oklch greens and creams. Tokens are all **oklch**.
- **Components:** radius 2px (×50). Buttons are rectangles, 12px uppercase, padding 16×12, 49px tall ("SHOW RESULTS", "BOOK APPOINTMENT"). Inputs use bottom-border-only underline fields. The fixed header is 44px.
- **Copy:** dry wit. "Newsletters that smell nice. Subscribe." "You're on the list! Cheers. You will not regret it."
- **Mobile:** the wordmark rotates to horizontal across the full width under the icons. Two-up tiles. The collection links become a horizontal scroller.
- **Signature moves:** the wordmark as architecture (pinned vertical); a ragged collage product grid; 11px serif captions; zero hero; jokes in microcopy.

### 4. Aesop — aesop.com/us (Work & Co 2017 platform; current site may since have been iterated by others)
- **Composition:** a centered Aesop logo in the header, a 2-tier nav (utility 12px: Stores · Customer service | Email sign up · Account · My cart; main 14px bold: Shop all … Experience) and a boxed search field. Hero = full-bleed campaign image with a **bottom-up black gradient scrim**; centered "Introducing / The Fragrant Fables / A new chapter…" and a **wide outline CTA** (1px cream border, radius 0, 48px tall, ~390px wide).
- **Sequence (8.8 viewports):** hero → "Curated Sets" carousel on cream → 50/50 split (scrimmed image left with "Scents for the nose, stories for the mind"; right a tabbed product shelf "Fresh / Floral / Woody / Ambery" with a 2px underline active tab) → alternating image/text service rows ("Smell before you settle", "The Hand & Body Care Finder") → store feature "A neighbourly presence" → "Recommended reading" 3-up editorial cards with **read-time labels** ("Five-minute read", "Thirty-minute read") → B Corp / Leaping Bunny trust row.
- **Type:** SuisseIntl (body and UI, 14px ×100), with **Zapf Humanist** (Optima-like) reserved for section headings at 31px (Curated Sets, A neighbourly presence). Lead 36px / 50.4px. **Tracking normal everywhere** (186 nodes). Weights 400 / 700.
- **Color:** cream #FFFEF2 (text-on-dark and page), charcoal #333333 (text and buttons), #666 secondary, **sienna #945C26** for "New addition" tags, pale stone #F6F5E8. No pure white or black.
- **Grid:** 1200px container, ~135px side margins at 1440.
- **Components:** radius 0 everywhere except 50% dots. Buttons have padding 13×24×12 (an optical 1px bottom fix), 14px, 48px tall, with an outline variant and a solid #333 variant; arrow glyph inside the CTA.
- **Copy:** literary and wry. "To discover the most suitable formulations for your bathroom performances, let our handy tool take the lead." "If the sample does not agree with your olfactory sensibilities…"
- **Signature moves:** read-time labels on editorial cards; the scrim-and-outline-button hero; Optima-class humanist headings over Swiss body; cream instead of white.

### 5. Art Institute of Chicago — artic.edu (AREA 17, 2018)
- **Hero:** full-bleed video or image (captured as a blurred LQIP) with the **nav overlaid in white**. Utility row (Buy Tickets / Become a Member / Shop, 17px light) above the main nav (Visit / Exhibitions / Art & Artists / Events, 19px). Centered **"WELCOME TO THE ART INSTITUTE OF CHICAGO"** in Ideal Sans uppercase, **+0.09em@21px**. A white button "Plan Your Visit" in **AIC red #B50938 text**, radius 2px, 48px tall.
- **Below the hero:** an "Open today 10–11 members | 11–5 public  See all hours" status line, then a **lede paragraph as navigation**: "Welcome to the Art Institute of Chicago, home to a **collection of art** that spans centuries… invite you to explore our many **exhibitions**, join one of our **free daily tours**…". Set in Sabon 38px/44px **grey #949494**, with the links in **red #B50938 and underlined**. Right column: 1px-ruled list (111 S Michigan Ave / Buy Tickets / …). This is the most-borrowable idea in the set.
- **Sequence (7.2 viewports):** status line → lede-as-nav → featured exhibition (2-col: image + "NOW OPEN" eyebrow 12px +0.14em, Sabon 38 title, dates, light body) → "EXHIBITIONS" 3-up with 1px column rules → "EVENTS" 4-up → "Join Our Community" banner → "THE COLLECTION" lede + red "Explore the Collection" + outline "Buy Tickets" → "ARTICLES" (1 large centered card + 2×2 small) → shop → newsletter → footer.
- **Type:** **Ideal Sans** (H&Co) Light 300 for UI and body, 17px +0.01em (119 nodes at weight 300). **Sabon** for headings and ledes, 22 / 24 / 38px, −0.005 to −0.01em. Section labels are uppercase Ideal Sans with **+0.14em** letterspacing at 12px. Italics are used for artwork titles inside headings ("*Architecture in a Rapidly Changing World*"), which is correct museological style.
- **Color:** white and #F3F3F3/#F8F8F8 bands, text #1A1A1A, **body grey #767676** (a deliberate 4.5:1-on-white AA grey), muted warm grey #7E746D for meta, **red #B50938 as the single accent**, deep teal #1E3F49 occasionally.
- **Grid:** 1500 max, 68px side margins at 1440. Column rules are 1px #E6E6E6.
- **Motion:** `cubic-bezier(0.59,0.01,0.28,1)` ×14 (house ease), `(0.445,0.05,0.55,0.95)` easeInOutSine ×11, and a playful `(0.5,-0.6,0.5,1.6)` back-overshoot ×3 for small icons. Durations 0.15–0.6s. Images load through a `blur(10px)` LQIP (×20 filters) and resolve sharp.
- **A11y:** "Skip to Content" first link; AA grey text; underlined links within prose.
- **Signature moves:** prose-as-navigation; a status line under the hero; serif-for-meaning / sans-for-utility; italicized artwork titles; tracked-uppercase section labels with "See all …" right-aligned.

### 6. Fondation Cartier — fondationcartier.com (AREA 17, 2025; identity and typeface by DeValence)
- **Hero (observed during a between-shows period):** a closure notice set as a **48px headline paragraph** ("Durant le montage de la prochaine exposition, seule La Librairie… vous accueille…") under a 1px rule. A grey dismissible notice band on top. Wordmark lockup: "Fondation*Cartier* pour l'art contemporain", with the Cartier script logotype inline in the sans line.
- **Per-show color system (case study + observed):** each exhibition gets **one color drawn from its poster**. The Ibrahim Mahama show block is a full-bleed **green rgb(103,164,54)** field with a centered image (~894px) inside. The rest of the page is white / stone #EFEFEB / #E0DFD6. Color = show identity. The chrome stays neutral.
- **Type:** the custom **"Fondation"** sans only (83 nodes), at 300 / 400. Sizes 12 / 16 / 22 / 32 / 48 / **80px**. 80px at **line-height 1.0, −0.02em**; 48px at 1.05, −0.01em. Tokens show `105%` line-height and `-.01em` for display. Tracking is normal for text sizes.
- **Components:** small **soft-rect chips** for E-shop / Billetterie (fill rgba(0,0,0,.05), radius 4px, 5×12 padding, 32px tall). Outline "Voir les détails" (radius 6px, 1px black, 40px). Large outline CTA (radius 8px, 12×24, 52px). Sticky header 64px with **rgba(255,255,255,.85) + backdrop-filter** (13 backdrop uses). Images carry an **"i" info button** (credit/caption on demand), which keeps captions off the image.
- **Grid:** 12 cols with a 40px gap, **40px side margins**, fluid 100% width. Spacing tokens run in rem steps .25 → 7.5rem (.25, .5, .75, 1, 1.25, 1.5, 2, 2.5, 3.75, 5, 6.25, 7.5).
- **Motion:** swup page transitions; Framer-like springs `{stiffness:500, damping:25}`; CSS 0.3s Material standard ease.
- **Signature moves:** one poster-derived color per exhibition as a full-bleed field; text-only hero announcements; on-demand image credits; a neutral chrome that recedes.

### 7. Lucas Museum of Narrative Art — lucasmuseum.org (AREA 17; identity by 2x4)
- **Hero:** full-black 100vh video with centered **"Now Open"** in Suisse Works serif ~64px, white. A centered grey glass pill "Buy tickets" sits at the bottom, with a pause button (circle, bottom-right). That is an accessibility control for autoplay video.
- **Nav:** the logo lockup on the left (a split "LM" monogram plus "Lucas Museum / of Narrative Art" serif). On the right, a **white floating capsule nav** (radius 9999) holding Visit⌄ / Explore Art⌄ / About⌄ / Store, search, an account icon, and **two black pills, Membership and Tickets** (56px tall).
- **Sequence (20.2 viewports, long scroller):** video hero → "A Home for the Art That Connects Us" → **full-bleed artwork chapters with a one-line serif title**: "Drawing Us to Adventure", "Inspiring Wonder" (Maurice Sendak's Wild Things), "Escaping into Other Worlds" (fantasy illustration). Each is a 100vh artwork with a title fading in (ScrollTrigger) → "Featured Galleries" on black with 64px serif → Founding Membership → "A New Landmark in Los Angeles" (architecture) → newsletter → footer with full hours.
- **Type:** **Hellix VF** (variable sans) for UI at 16px +0.01em; **Suisse Works** serif for display at 40 / 48 / 64px, **−0.03em**, line-height 1.1. Weight 400 (450 on a few).
- **Color:** black #000 and **warm sand neutrals** #F2EDE9, #E5DACF, #FCF8F5 (70% alpha for glass buttons). Text #1D1D1D, secondary #636363. Color comes from the art itself.
- **Components:** **pills everywhere** (radius 9999 ×36), 56px tall, 0×20 padding. Cards radius 12px. Glass buttons rgba(252,248,245,.7) with backdrop-filter.
- **Motion:** GSAP ScrollTrigger plus swup. Custom curves `(0.4,0.1,0.3,1)` and `(0,0,0.3,1)`. Durations **0.34s ×35 and 0.89s ×33** (a two-speed system: UI vs reveal).
- **Rationale (case study):** "story-driven art pages"; position the museum as "an accessible cultural destination for adults and children that promised entertainment".
- **Signature moves:** artwork-as-chapter full-bleed scroll; floating capsule nav with paired black pills; a pause control on hero video; 0.34s / 0.89s duration pair.

### 8. The Menil Collection — menil.org (AREA 17)
- **Hero:** a full-bleed gallery photo (a visitor blurred in motion before a Surrealist painting). Headline bottom-left in **Freight Display 65px / 66px, white**: "Discover a space for creativity and reflection." (it rotates with "Immerse yourself in a neighborhood of art."). The "Menil" serif wordmark sits top-right. The nav is top-left in **uppercase acumin 15px +0.03em** with caret dropdowns and an outlined "BECOME A MEMBER" box.
- **Body:** wide images with a **serif caption-paragraph** below (Freight Text 31px: "Set within a residential neighborhood, the Menil Collection invites visitors to explore its art buildings and green spaces. Admission is always free."). Then a 2-up photo pair at **14px outer margins**, almost edge-to-edge.
- **Type:** Freight Text / Display (serif) for voice; acumin-variable for UI (81 nodes). Uppercase UI with +0.03em. Sizes 14 / 15 / 17 / 23 / 26 / 31 / 65.
- **Tokens (AREA 17):** fluid `clamp()` everywhere. Gutters `clamp(.75rem, .5rem + .44vw, 1rem)`. Spacing ladder up to `clamp(8rem, 6rem + 5.33vw, 12rem)`. Display `clamp(3rem, .75rem + 6vw, 7.5rem)` / 90% / −0.03em / uppercase. `font-variant-numeric: lining-nums proportional-nums`.
- **Color:** near-black #1E1F1F, cool greys #737777 / #646868, pale #EBEFEF, and one warm **#F7E7CE** (Join Today button).
- **Components:** buttons are radius 4px, 40px tall, 15px/500 uppercase. GSAP eases power2.inOut / power2.out, 0.5–0.75s.
- **Signature moves:** a near-edge-to-edge 14px margin photo grid; a serif caption-paragraph as section copy; cool-grey palette with a single warm note; fluid clamp() everything.

### 9. ElevenLabs — elevenlabs.io (AREA 17 brand + site 2023–24; since extended in-house)
- **Hero:** a top promo band (#F5F3F1) "Meet Eleven v4… [Discover]". The nav 36px tall with Products / Solutions / Customers / Resources / Enterprise / Pricing, plus Log in (white pill) and Sign up (black pill). H1 **"Bringing technology to life"** in **Waldenburg Light 300, 48px / 52px, −0.02em**, left. Right column: a 16px intro paragraph. CTAs: black pill "Sign up" and white pill "Contact sales", 44px.
- **Product demo directly under the hero:** a large rounded panel (radius 24) with a segmented control (ElevenCreative / ElevenAgents / ElevenAPI). Inside is a carousel of **grainy gradient "voice orbs"** (AREA 17's "Voice Signatures" abstract language: orange, violet, smoky) each with a play button. "Interacting is believing" (case study) means the hero *is* a working demo.
- **Blueprint frame:** the page sits inside a 1144–1176px container with **visible vertical hairlines at the container edges** and **tiny tick marks / crosshair dots at the row intersections**, like a technical drawing. Row separators are full-bleed 1px lines. This framing device makes a dense SaaS page feel engineered.
- **Bento:** product cards in 2 large + 4 small (radius 20–24, fill #F5F3F1 on #FDFCFC page, 0.5px inset ring shadows `rgba(0,0,0,.075) 0 0 0 .5px inset`). Code samples render in white cards with syntax colors (#F41A2F red keywords, #0A59D2 blue).
- **Type:** Inter for UI (254 nodes, 13–18px, **+0.01em**). Waldenburg (custom-feel grotesk) for display, 300 weight at 36–48px. Geist Mono for code and labels.
- **Color:** warm stone neutrals (#F5F3F1, #EBE8E4, #FDFCFC), black, warm greys #777169 / #A59F97. Accents only in the orbs and code. Signal colors #FF4704 / #0447FF appear only in small dots.
- **Components:** **9999px pills ×112**, cards radius 20/24, small 4px elements. Shadows are rings, not drop shadows.
- **Motion:** minimal CSS (0.15–0.3s, Material standard). `mix-blend-mode: overlay` ×29 for orb grain.
- **Signature moves:** a playable demo as the hero; abstract brand orbs instead of AI imagery ("we deliberately avoided the AI-generated imagery and characters", case study); a blueprint hairline frame with crosshair ticks; ring shadows.

### 10. Pentagram — pentagram.com (AREA 17)
- **Hero:** a full-bleed project carousel (~616px tall) with a **centered "Mad-Libs" sentence filter in a translucent chip**: "We design [Brand Identity ⌄] for [Technology ⌄]". Choosing values changes the work below. A caption bottom-left (project + one-line description, white with text-shadow) and **13 dot pagination** bottom-right.
- **Sequence (28.3 viewports, the longest):** carousel → "The Secret Life of Things" dark #222 editorial band with 52px title → a "latest projects" horizontal rail inside a dark rounded card → **sentence-style section headers**: "7 latest [Motion Graphics & Film] projects ↓" (grey words with a dark chip in the middle) → asymmetric project grids (1 large 2/3 + whitespace, then 3-up) → repeated per discipline → a sticky "We design Everything for Everyone" sentence chip that floats at the bottom of the viewport as a persistent filter.
- **Type:** a single family, **Plain** (Optimo), 480 nodes. 16px body, 13px meta, 19px item titles, 32px, 52px display at −0.02em / 1.05. Token: display weight **375** (a variable font), `font-feature-settings: "case" on`.
- **Color:** white / #222 / #000 bands. Text #1A1A1A, meta rgba(0,0,0,.56) and #767676. Chips rgba(0,0,0,.07). There is no brand accent: the work is the color.
- **Components:** chips radius 4px (×153), tag chips "Consumer Brands / Technology" 13px on .07 black. Item = image + title (19px) + one-line description (grey) + tags. Grid gutters 12px, outer margin 24px, container 1728px.
- **Motion:** GSAP power1.inOut / power4.inOut; CSS house ease `(0.59,0.01,0.28,1)` ×27; durations .3 / .4 / .5s. The dot pagination animates.
- **Signature moves:** a sentence-as-filter UI ("We design X for Y"); a sticky filter chip; sentence-style section headings with an inline chip; a single typeface across the whole system.

### 11. Oura — ouraring.com (Instrument, 2025)
- **Hero (mobile capture, desktop video did not paint):** "Oura Ring ⑤" / **"Subtle. Power."** in **Editorial New 300, 110px / 121px, −0.05em (−5.5px)**, color #4A4741. Sub: "The world's smallest smart ring is here." A **macro product photograph** (a gold ring on dark rock with a ladybug on it). A blue pill "Explore" (#2A72DE, 700) plus "HSA/FSA eligible" check-mark microcopy.
- **Sequence (7.3 viewports):** hero → centered statement "Oura gives you insights unique to your body…" + two dark pills (Why Oura / How It Works) → feature cards with **dark rounded tag chips** (HEART HEALTH / SYMPTOM RADAR / WOMEN'S HEALTH) → a testimonial trio in **Editorial New serif 24px** on #EFE6DB cards (radius 8) with circular avatars → "NEW FEATURES / Meet Health Radar" (56px serif) with the **actual app UI on phones** → "86% of Oura Members see their health improve¹" (footnoted stat) → "IN THE NEWS" dark section #1C1B1A with press cards (Guardian / Esquire / CNET) and circular ↗ buttons.
- **Brand → web:** "progressive disclosure… layers of information, animation, and micro-interactions" (case study). It uses the in-app UI and data-viz as content, which is how hardware sites prove value.
- **Type:** **AkkuratLL** (Swiss grotesk) for UI and body, 16px (104 nodes), weights 300 / 400 / 700. **Editorial New** serif for display and quotes only (8 nodes), 24–110px, always negative tracking (−0.025 to −0.05em). 12px uppercase labels at +0.1em.
- **Color:** **warm cream #F7F1E8** (16 bg), cocoa text **#4A4741** (also the dark pill fill), taupe #A8A5A0, sand #EFE6DB cards, espresso #1C1B1A dark section, a single **action blue #2A72DE** only on the primary "Explore".
- **Components:** pills (radius 9999), 48px tall, 12×24. Dark pills #4A4741 with cream text. Tag chips radius 6 on #333. Cards 8 / 12 / 24 radius. Header 90px, transparent, sticky.
- **Results (case study):** +42% daily sales, +130% mobile performance.
- **Signature moves:** an ultra-tight serif display (−0.05em) on cream; one action color reserved for the main purchase path; footnoted health claims; real app UI as imagery.

### 12. AlphaSense — alpha-sense.com (Instrument)
- **Hero:** H1 **"Confidence finds its source"** in **esKlarheit 500, 72px / 75.6px, −0.031em (−2.2px)**, #1D1D1D, left aligned, on white. Below, a **split band**: left half solid **#0040FF electric blue** with 16px white copy, a white button "Get Started for Free →" and an underlined text link "Take the Tour", plus a **vertical-line "barcode" graphic** (thin white rules of varying spacing, a brand data device). Right half: dark navy #0F111F product UI with "All sources / Deep Research" tabs.
- **Sequence (12.8 viewports):** hero → logo wall "Trusted by 7,000+ of the world's largest enterprises" → "AI workflows that speak your market's language" tabbed gallery → "Meet SuperAnalyst" dark section → "The most expansive collection of curated sources" → "500+ million premium financial and business documents" → workflow features → use-case tabs (Competitive Intelligence / Investment Confidence …) → customer stories ("Recurve Capital Saves Time…") → CTA.
- **Two-tone headline device:** "Transform intelligence into **advantage**", with the last word in #0040FF.
- **Type:** esKlarheit (display, 500/600), Inter (UI 14px), esKlarheitMono (eyebrows, 10–12px **uppercase +0.033 to +0.05em**). Scale 10 / 12 / 14 / 17 / 19 / 22 / 30 / 36 / 48 / 72. Display tracking is tight (−0.018 to −0.031em).
- **Color:** white, ink #1D1D1D, **#0040FF** primary, **#FFFF52 acid yellow** highlight (4 uses), navy #0F111F, ice #E5ECFF. Logos are `grayscale(1)` and go to `grayscale(0)` on hover.
- **Components:** buttons radius **8px**, 14×16 padding, 14px/700, 47px tall, with a → arrow. Sticky header 68px. Rows separated by 1px rgba(29,29,29,.1). 12-col grid, 24px gap, 48px margins, 1440 container. `noiseOrGrain: true` (grain texture on the blue).
- **Motion:** custom curves `cubic-bezier(0.25,0,0,1)` ×57 (a sharp ease-out), `(0.6,0,0.4,1)` ×39, `(0.7,0,0.6,1)` ×33. **Durations standardized at 0.32s ×88**, plus 0.48 / 0.7s. Floating hero keyframes `hero-float-a/b`.
- **Results (case study):** +24% conversion, 100 Lighthouse.
- **Signature moves:** a split blue/dark hero band under a type-only headline; a mono uppercase eyebrow system; a 0.32s house duration; grayscale-to-color logo wall; an acid-yellow highlight against electric blue.

### 13. Eames Institute — eamesinstitute.org (Instrument; identity by Manual)
- **Hero:** a dark announcement bar "Membership and gifts make our work possible. Join Us →". The logo is an orange circle "e" plus a two-line "Eames / Institute". Ticket, search and menu icons (no visible nav links). H1 at ~56px heavy grotesk (News Gothic 700 rendering): **"The Eames Institute of Infinite Curiosity—dramatically expands the Eames Archives"**. The second half is in **pink #F47B9C**, the same black + colored-continuation two-tone device as SJA and AlphaSense. Right column: 20px intro + a black "Learn More" button (radius 6.4px, 39px).
- **Below:** a full-width photo (radius ~6) of Akari-like paper lanterns. Sections "The Art of the Company Picnic", "The Curious 100", "The Collection" set in **Century Schoolbook 77px / 76px** (an old-fashioned serif, a nod to the Eames era).
- **Type:** Graphik (UI, 18px), Century Schoolbook (display serif, 52–77px, line-height ≈0.99), News Gothic (heavy display / labels). Three families, each with a job.
- **Color:** white / black / warm #F8E8C7 / pink #F47B9C. Images use `mix-blend-mode: multiply` ×6 (cut-outs on colored fields), with a `brightness(1.045)` hover.
- **Grid:** 22-column grid with a 48px gap (unusual, fine-grained), 45px margins.
- **A11y:** WCAG 2.1 AA components (case study). Motion uses `cubic-bezier(0.22,1,0.36,1)` (easeOutQuint), `(0.83,0,0.17,1)` (easeInOutQuint), a 10s ambient "fill-color-swing", and Astro view transitions.
- **Signature moves:** a two-tone headline; an era-appropriate serif (Century Schoolbook) beside a modern grotesk; multiply-blended object cut-outs; an announcement bar as a fundraising tool.

### 14. Norton Museum of Art — norton.org (Koto rebrand 2026; web build vendor not verified)
- **Hero:** a centered serif wordmark "NORTON" (revived archive mark, per press) in the nav, with the nav split left/right in **14px uppercase +0.05em**. A full-bleed artwork slider (Chihuly glass) with **"WELCOME TO THE NORTON" in Centra No. 2 500, 90px / 81px (0.9), −0.05em, uppercase**, bottom-left, plus a square "PLAN YOUR VISIT" button. Circular prev/next arrows bottom-right.
- **Color-block section system:** each section gets a **full-bleed brand color**: programs on **blue #6098FF**, current exhibitions on **yellow #F6BE11**, then **green #76A93D**, then neutral #F3F3F3. The text is dark brown #251E18 (not black) and the CTA border color matches the section's dark partner (#18368A on blue). Cards are #F3F3F3 panels with images and **centered uppercase titles** (32px) plus a date line and an underlined "LEARN MORE" text link (2px bottom border).
- **Type:** Centra No. 2 only (205 nodes), 500 weight dominant. **75% uppercase share**, the most "poster-like" site in the set. Sizes 14 / 18 / 22 / 32 / 90. +0.05em on small caps, −0.05em at 90px.
- **Tokens:** `--container-padding-inline: clamp(1.5rem, .566rem + 2.263vw, 2.5rem)`, a section-space ladder (`--section-space-100: clamp(4.375rem, …, 6.875rem)`), `--color: #251e18`, `--background-color: #f3f3f3`. Buttons are radius 0, 64px tall, 24×32 padding.
- **Signature moves:** a section-per-brand-color rhythm; uppercase geometric sans as the institutional voice; brown-black instead of #000; 0.9 line-height display.

### 15. TIME — time.com (Code and Theory)
- **Composition:** a classic masthead. The red **TIME** logotype (#E7131A) is centered, ~310px wide. "MENU ≡" on the left, "SUBSCRIBE" plus an avatar circle on the right. Below, a centered section nav in **14px uppercase** warm brown (#594D46). Then a dismissible promo strip ("Introducing the 2026 TIME100 Next … VIEW MORE ›"). Then a **3-column lead package**: a 632px center image flanked by two 308px side images, with top alignment offset (the center image sits ~48px higher). An ad slot sits above the masthead.
- **Palette:** warm **paper #FFFCF8** page, peach section bands #EFE3DC / #FCF3ED, ink #1B1B1B, cocoa #594D46 and #8B7162 for meta, rules #D1C5BE. **TIME red only in the logo** and alerts. A news site that feels like paper stock rather than a white CMS.
- **Type:** Graphik / graphikCompact (UI, headlines) plus **PP Editorial New** (display serif, 64 nodes) for features. Section titles are "People", "Ideas", "Health" at 64px. 26% uppercase (nav and labels). 14px base.
- **Grid:** 1440 container, **80px margins**, 12 cols with 16px gaps, 2-col 16px subgrids. Alternating band backgrounds structure 15.7 viewports of content.
- **Motion:** Framer Motion springs `{type:"spring", bounce:.05}` and `{damping:20}` for menu expansion; CSS 0.15–0.5s.
- **Signature moves:** warm paper and peach bands for a dense news grid; the brand red confined to the logo; uppercase section nav; staggered 3-image lead package.

### (Case study only) Stone Island — R/GA (2024)
Blocked in headless (403), so this is not measured. Per Creative Review, the site uses a **monospace cut of ABC Dinamo's Monument Grotesk on a single typographic scale from mobile to desktop**, "minimal UI with extensive white space", "industrial/engineered language", modular LAB/LIFE storytelling and 360° archive imagery, with an obsessive focus on load time ("white space is a true art because it doesn't allow for mistakes").

### (Case study only) International Energy Agency — AREA 17
Blocked (Cloudflare). Per the case study: brand + digital-first platform on Twill, a modular publishing environment so "any IEA team can now publish their analysis directly", integrated data APIs, and self-serve e-commerce. Visitors rose 366% (2016–22). The lesson: for content-heavy institutions the deliverable is a **publishing system**.

---

## Cross-site patterns (numeric ranges)

**Typefaces**
- 14 of 15 sites use a **custom or licensed premium face**. None use a stock Google font as the brand face (Inter appears only as UI on ElevenLabs/AlphaSense, next to a custom display face).
- **Serif + sans pairing on 11/15**: Obama (Gotham Cond + Chronicle), SJA (LoveFromSJA + system), JWA (Grad + Acumin), Aesop (Suisse + Zapf Humanist), AIC (Sabon + Ideal Sans), Lucas (Suisse Works + Hellix), Menil (Freight + Acumin), Oura (Editorial New + Akkurat), Eames (Century Schoolbook + Graphik + News Gothic), TIME (Editorial New + Graphik). Single-family systems: Fondation Cartier, Pentagram, Norton, ElevenLabs (practically), AlphaSense (esKlarheit + Inter).
- The serif is for **meaning** (statements, ledes, quotes, exhibition titles). The sans is for **utility** (nav, meta, buttons, prices).
- Body sizes: **14–18px** (Aesop 14, JWA 11–12 captions, Pentagram 16, AIC 17, Eames 18, Obama 24 serif body for big-type civic reading).
- Display sizes: **48–110px** typical (ElevenLabs 48, Fondation 80, Menil 65, AlphaSense 72, Obama 100, Norton 90, Oura 110), with **outliers at 230px** (Obama DONATE). JWA's homepage max is 18px; the wordmark carries it.
- **Display tracking:** −0.01 to −0.05em (median ≈ −0.02em). **Display line-height:** 0.8–1.1 (Obama 0.8 at 230, 0.9 at 100; Norton 0.9; Fondation 1.0; Pentagram 1.05; AlphaSense 1.05; Lucas 1.1; SJA statement 1.3 for a serif paragraph).
- **Small uppercase labels:** +0.03 to +0.14em (Menil +0.03, Norton +0.05, AlphaSense mono +0.033–0.05, Oura +0.1, AIC +0.14). Body text tracking is normal or +0.01em (Inter / Ideal Sans / Hellix +0.01em).
- Weight discipline: most sites use **just 2 weights**, often 300/400 or 400/500. Heavy 700+ is rare (Obama DONATE, Eames headline).

**Color**
- Neutral surface ≈ **85–95% of pixels**. Brand accent ≈ **1–5%**, reserved for 1–2 jobs (the primary CTA, the logo, a section field).
- Off-whites dominate over #FFF: Aesop #FFFEF2, Oura #F7F1E8, TIME #FFFCF8, Lucas #F2EDE9, ElevenLabs #FDFCFC/#F5F3F1, Obama #F3F3EE, Fondation #EFEFEB. **Off-blacks**: #1A1A1A (AIC, Pentagram), #1D1D1D (AlphaSense, Lucas), #251E18 (Norton), #4A4741 (Oura), #333 (Aesop), #1B1B1B (TIME).
- **Accent restraint examples:** TIME red only in the logo; Oura blue only on "Explore"; AIC red only on links and the primary button; Obama blue only on Donate; ElevenLabs color only in the orbs.
- When color goes big, it goes **full-bleed and semantic**: Norton section colors, Fondation per-show colors, Obama tiles, AlphaSense blue band.

**Layout**
- Side margins at 1440: **14–135px**. Cluster: 24px (Pentagram), 40px (Fondation, Norton), 48px (AlphaSense), 60–68px (Obama, AIC), 80px (TIME), 96px (SJA), 135px (Aesop). Edge-to-edge-ish (12–24px) for image-heavy fashion/portfolio; 60–96px for editorial or institutional.
- Grid gutters: 6px (JWA) / 12px (Pentagram) / 16px (TIME) / 24px (AlphaSense) / 40px (Fondation) / 48px (Eames, ElevenLabs) / **72px (Obama)**.
- Max containers 1200–1920px; several are full-fluid with margins only.
- Page length: 4.8 viewports (SJA) → 28 (Pentagram). Institutional homepages are 7–12 viewports.

**Components**
- Button radius splits into **two camps**: **0–2px** (Obama, Aesop, AIC, JWA, Norton, TIME, Menil 4px) vs **full pill** (SJA, Lucas, ElevenLabs, Oura). Radius 6–8px is rare (AlphaSense 8, Eames 6.4, Fondation 4–8).
- Button heights: **39–74px**. Most are **44–58px**, large compared with SaaS-template 36–40px. 56px (Lucas), 58px (Obama), 64px (Norton) and 74px (Obama Donate = nav height) read as institutional confidence.
- **Arrow glyph in text CTAs** ("Learn more →", "View all stories →", "Get Started for Free →") on 6/15.
- Shadows are **near-absent**. Elevation comes from rings (ElevenLabs .5px inset), color fills (Pentagram rgba(0,0,0,.07)) or hairlines. The most shadowed element on any site is the cookie banner.
- Hairline rules: 1px #E6E6E6 / rgba(0,0,0,.1) column and row dividers on AIC, SJA, Obama, ElevenLabs, AlphaSense, Fondation.

**Motion**
- Interaction durations cluster at **0.15–0.35s**. Reveal durations at **0.5–0.9s**. Several sites standardize one house duration: AlphaSense **0.32s ×88**, Lucas **0.34s ×35 + 0.89s ×33**, artic 0.25s ×42.
- Curves: Material standard `(0.4,0,0.2,1)` is the default floor on 9/15. **Custom house eases** distinguish the best builds: AREA 17 `(0.59,0.01,0.28,1)`, AlphaSense `(0.25,0,0,1)`, Obama `(0.33,1,0.68,1)`, Lucas `(0.4,0.1,0.3,1)`.
- Framer-style springs (stiffness 150–550, damping 20–30) on SJA, Fondation, TIME.
- **No scroll-jacking, no Lenis/Locomotive smooth scroll on any of the 15.** GSAP appears on only 3 (Pentagram, Menil, Lucas ScrollTrigger). Page transitions come via swup on 3.
- Intro choreography is restrained: SJA's ink-in line stagger, Obama's rotating word, Lucas's fade-in titles. **No preloaders anywhere.**

---

## Signature techniques worth stealing (with implementation)

1. **Prose-as-navigation lede (AIC):** a 30–40px serif paragraph under the hero where key nouns are links.
   ```css
   .lede{font:400 38px/44px Sabon,serif;color:#949494;max-width:52ch}
   .lede a{color:#B50938;text-decoration:underline;text-underline-offset:.12em;text-decoration-thickness:1px}
   ```
   Put an "Open today · hours · See all hours" status line directly above it.

2. **Two-tone headline (SJA, Eames, AlphaSense):** one heading, two colors, same size. Title in ink, continuation in grey or brand color.
   `<h2>Letters to a Young Creator <span class="sub">What it takes to make something great…</span></h2>` with `.sub{color:#707070;display:block}` (SJA) or inline `color:#F47B9C` (Eames) or a last-word `color:#0040FF` (AlphaSense).

3. **Ink-drying line reveal (SJA):** split the statement into lines and animate each line's `opacity .25→1` and `color #bbb→#000` with a 120–200ms stagger. Use a spring ~{stiffness:150, damping:25} or 0.6s `cubic-bezier(.17,.17,0,1)`. No translate. Respect `prefers-reduced-motion` by rendering final.

4. **Rotating-noun sentence hero (Obama):** a two-column sentence. The left cell cycles nouns ("A campus / A museum / Art / Sports / Events") with an upward fly-in of ~0.5s `(0.33,1,0.68,1)`; the right cell holds a fixed predicate. Use a condensed face at 100px / 0.9 / −0.015em on black. Wrap it in `aria-live="off"` and provide the full sentence in a visually hidden span.

5. **Sentence filter (Pentagram):** "We design [Brand Identity ⌄] for [Technology ⌄]" as the main portfolio filter, in a translucent chip (rgba(255,255,255,.9) or rgba(0,0,0,.07), radius 4, 16px). Pin a copy at the viewport bottom (`position:sticky; bottom:24px`) once the user passes the hero. Reuse the same grammar in section headers: "7 latest [Motion Graphics & Film] projects ↓".

6. **Per-item semantic color fields (Fondation Cartier, Norton):** a CMS field `accentColor` per exhibition or section that paints a full-bleed band behind a centered image (width ≈ 62% of the viewport). Keep chrome neutral. Choose text color by contrast (Norton pairs #6098FF with a #18368A border/text partner).

7. **Wordmark as architecture (JWA):** a giant SVG wordmark, rotated 90°, `position:fixed; right:12px; top:44px; height:calc(100vh - 56px)`. Content gets `padding-right:~140px`. On mobile, swap to a horizontal full-width wordmark under the icon bar.

8. **Ragged collage product grid (JWA):** `display:flex; flex-wrap:wrap; gap:6px` with tiles at a fixed height (240px) and widths from the image aspect ratio (192 / 240 / 300). Do not force a uniform column count. Captions are an 11px serif, the name, and "$1,750 · 3 colours" with the colour count in italic.

9. **Blueprint frame (ElevenLabs):** wrap content in a max-width container with `border-inline:1px solid rgba(0,0,0,.06)`. At every full-bleed row divider, draw 3px dots or crosshairs where the divider meets the container edges (pseudo-elements absolutely positioned at `left:-1.5px`/`right:-1.5px`). Cards use `box-shadow:0 0 0 .5px rgba(0,0,0,.075) inset` instead of drop shadows.

10. **Demo-as-hero (ElevenLabs):** directly under the H1, a 24px-radius panel with a segmented control (3 products) and an interactive carousel (playable orbs). The hero copy stays short (5 words) because the panel does the persuading.

11. **Token-bundle text styles (AREA 17):**
    ```css
    :root{--f-display-1-font-size:3.625rem;--f-display-1-line-height:1.05;--f-display-1-letter-spacing:-.02em;--f-display-1-font-weight:375;--f-display-1-font-feature-settings:"case" on}
    .f-display-1{font-size:var(--f-display-1-font-size);line-height:var(--f-display-1-line-height);letter-spacing:var(--f-display-1-letter-spacing);font-weight:var(--f-display-1-font-weight);font-feature-settings:var(--f-display-1-font-feature-settings)}
    ```
    Add a fluid spacing ladder like `--space-9: clamp(6rem, 4rem + 5.33vw, 10rem)` and a dev grid overlay toggled by `--env`.

12. **One house duration + one house ease:** pick it and use it everywhere (AlphaSense 0.32s `cubic-bezier(.25,0,0,1)`; AREA 17 `cubic-bezier(.59,.01,.28,1)` at 0.25–0.6s). Use a second, slower duration only for reveals (Lucas 0.89s).

13. **Big-type fundraising finale (Obama):** the footer opens with "DONATE TODAY" at ~16vw (230px at 1440) condensed uppercase, line-height 0.8, on the action color, with one sentence and a white rectangular button. Big-brand sites put the ask in the type, not in a modal.

14. **Read-time labels and footnoted claims (Aesop, Oura):** "Five-minute read", "Thirty-minute read" on editorial cards; "86% of Oura Members see their health improve¹" with a real footnote. These are trust micro-details that templates never have.

15. **Operational truth as design (Obama, Fondation, AIC, Lucas):** ticket availability bands, closure notices set as a 48px headline, "Open today" status lines, full opening hours in the footer. The site treats logistics as first-class content with first-class type.

16. **Pause control on autoplay hero video (Lucas):** a 48px circular button bottom-right (`aria-label="Pause background video"`). Also pause under `prefers-reduced-motion`.

---

## How big-brand sites differ from Awwwards-showpiece sites

- **Systems over set pieces.** The deliverable is a token system plus a CMS block library (Twill, Sanity, Shopify sections) that client teams use to publish forever ("Any IEA team can now publish…"). Pages are composed from 8–15 reusable blocks; showpiece sites are hand-built once.
- **Brand system → web translation is literal and disciplined.** The identity's typeface, colors and graphic devices appear in the build: Obama's sun pattern, ElevenLabs' voice orbs, Fondation's per-show poster color, Norton's archive wordmark. They are applied with restraint, mostly in 1–3 places per page.
- **Content density is high and beautiful.** Hours, ticket availability, events with dates, 3–4 nav levels, 69 header links on AIC, 172 on Aesop. These are handled with hierarchy (type size and weight, rules, uppercase labels), not hidden in hamburgers.
- **Accessibility is visible:** skip links styled as real buttons (Obama, Fondation, AlphaSense), AA greys (#767676), underlined links in prose, pause buttons on video, WCAG 2.1 AA component specs (Eames), reduced reliance on motion for meaning.
- **Motion is quiet.** 0.15–0.35s UI transitions, one or two reveals, no smooth-scroll hijacking, no preloaders, no cursor followers. Awwwards showpieces lead with motion; these lead with type and content.
- **Performance is a stated design value** (Stone Island "benchmark load times", AlphaSense 100 Lighthouse, Oura +130% mobile performance). LQIP blur-up (AIC) and lazy media are standard.
- **Multi-page architecture is kept**, with soft transitions (swup, Astro view transitions) for SEO, analytics, deep linking and CMS previews.
- **Copy is specific and voiced:** "Newsletters that smell nice.", "bathroom performances", "Smell before you settle", "Admission is always free.", "We design Everything for Everyone". There is little marketing filler.

---

## What these sites never do

- No purple-to-blue gradient heroes, glassmorphism dashboards or stock 3D blobs. ElevenLabs' orbs are grainy, art-directed and tied to the brand concept.
- No generic Google-font-only branding. No mixing of 3+ unrelated display faces.
- No drop-shadowed card grids. Elevation comes from fills, rings or hairlines.
- No centered-everything SaaS template rhythm (icon + title + 2 lines × 3). Grids are asymmetric (Pentagram 2/3 + void, AIC 1 large + 2×2, Obama photo 2/3 + sidebar, JWA ragged collage).
- No smooth-scroll hijack, preloader, custom cursor theatrics or scroll-locked pinned storytelling on the homepage. Only Lucas uses ScrollTrigger reveals, and lightly.
- No more than one accent color doing UI work. No accent on body text.
- No pure #000 on pure #FFF as the only palette. Off-whites or off-blacks almost always.
- No vague CTAs like "Get started" without context. CTAs name the task: "Plan Your Visit", "Explore the Collection", "Find your regimen", "Book Appointment", "Buy tickets".
- No hiding operational info. Hours, closures and ticket status are on the homepage.
- No lorem-ish hero claims ("Revolutionize your workflow"). Heroes state a place, a mission or a product truth in under 12 words ("Subtle. Power.", "Now Open", "Confidence finds its source").

---

## Rankings — best 4 references for the skill

1. **Steve Jobs Archive (Work & Co)**: the purest proof that **type + whitespace + one interaction idea** (ink-in lines) beats imagery. It is directly reproducible: a 54px serif at −0.02em / 1.3, 96px margins, two-tone headlines, grey pills, hairline rows. It is the best template for "premium editorial / foundation / founder story" briefs.
2. **Art Institute of Chicago (AREA 17)**: the best model for **content-heavy institutional homepages** that are still elegant. Prose-as-nav, a serif/sans division of labor, tracked uppercase labels, AA greys, a single red accent, LQIP blur-up. It is 8 years old and still holds up, which is a test of good systems.
3. **Obama.org (Work & Co + Manual)**: the best **brand-system → web translation** with bold type. Condensed display at 100–230px, a serif body, a rotating-noun hero, logo-derived patterns in color tiles, a 0-radius button system, operational alert bands, and an accessible donate flow.
4. **Pentagram.com (AREA 17)**: the best **portfolio/catalog at scale**. Sentence-as-filter UI, a single typeface, a named token system with a dev grid overlay, an asymmetric project grid, and a sticky filter chip. It is a reference for any "show lots of work/products" brief.

Honorable mentions: **JW Anderson** (most daring e-com: vertical wordmark, collage grid, 11px serif). **ElevenLabs** (best SaaS translation: demo-as-hero, blueprint frame, ring shadows). **Fondation Cartier** (per-show color fields). **Oura** (cream + ultra-tight serif + single action color for hardware e-com). **Norton** (full-bleed section colors for a playful institution).
