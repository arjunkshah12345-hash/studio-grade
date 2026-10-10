# F — Fashion, Luxury, Beauty, Hospitality, DTC Commerce: Live Client-Work Teardown

Evidence base: live client sites run through `tools/analyze.mjs` on 2026-10-06/07 (1440x900 desktop, 390 mobile). All numbers below are measured unless marked *(observed)* (seen in screenshots) or *(credit source)*. Raw data lives in `sites/<slug>/data.json` + `sites/<slug>/shots/`.

Capture caveats (be honest about the evidence):
- Headless Chrome could not play some hero videos: Aesop shows a grey "video camera" placeholder instead of film; Magda Butrym shows a buffering spinner over the first frame. Layout/typography are still valid.
- Aman: lazy-loaded imagery never rendered in headless — only type/layout/colour were captured, photos are blank cream areas.
- Byredo, Ace Hotel, Akris, Aesop: cookie/consent layers sit over parts of the screenshots (Byredo measured only 1.6 viewports because of the consent wall). Aesop mobile was blocked by a Cloudflare challenge.
- Roger Vivier (Build in Amsterdam client): first run hit the brand's own 404 template (its chrome, nav, type and grid were captured and are described from screenshots); second run was blocked by Akamai "Access Denied". Treated as a partial teardown — nav/type/404 grid only.

---

## Sites analyzed

| # | Brand | URL | Agency / credit | Category | Stack (measured hints) |
|---|---|---|---|---|---|
| 1 | Aesop | aesop.com/us | Work & Co designed & built the e-com platform (2017; HOW Intl. Design Award) — current site is its descendant *(credit: work.co/clients/aesop)* | Beauty / skincare | Salesforce Commerce-style SFRA classes (`experience-component`, `c-carousel`), no GSAP/Lenis |
| 2 | Totême | toteme-studio.com | We Make Websites (Shopify Plus replatform; "pared-back, minimalist aesthetic + large editorial imagery"; +11% CR, +16% AOV) *(wemakewebsites.com/shopify-plus-portfolio/toteme)* | Fashion | Shopify |
| 3 | Magda Butrym | magdabutrym.com | Design: Ania et Lucie; build: Commerce-UI (headless Shopify, Next.js, Prismic, Imgix, Vercel) *(commerce-ui.com/work/magda-butrym-website)* | Luxury fashion, video-first | Next + Shopify |
| 4 | Akris | us.akris.com | Build in Amsterdam (AKRIS listed in BiA case index) *(buildinamsterdam.com/cases)* | Swiss luxury fashion | Shopify |
| 5 | Suitsupply | suitsupply.com/en-us | Build in Amsterdam ("Suitsupply 2026" case in BiA index) | Menswear / tailoring | Shopify |
| 6 | Roger Vivier (partial) | rogervivier.com | Build in Amsterdam (case in BiA index) | Luxury shoes/bags | Next.js |
| 7 | Kinfolk | kinfolk.com | Built by Six (madebysix.com) — HTML comment credit in source; custom Kinfolk typefaces (Schick Toikka) per print rebrand by Alex Hunting Studio | Culture / editorial + shop | Lenis + Barba/Swup page transitions, GSAP eases |
| 8 | Aman | aman.com | Design & content overhaul: Colville-Walker (2017–2026 creative partner); platform: Inviqa *(creativepool / casestudies.com)* | Hospitality luxury | Custom, no motion libs |
| 9 | Ace Hotel | acehotel.com | Atelier Ace (in-house creative agency) + rehabstudio (earlier site/booking engine) *(lbbonline)* | Hospitality / culture | Custom, Theatre.js hint |
| 10 | Byredo | byredo.com/us_en | Vaimo (luxury commerce platform build; earlier Inviqa Magento 2) *(vaimo.com/work/byredo)* | Fragrance / beauty | Next.js |
| 11 | Totême PDP | toteme-studio.com/products/silky-shearling-coat-dark-brown | We Make Websites | Fashion PDP | Shopify |
| 12 | Carhartt WIP USA | us.carhartt-wip.com/en-us | Commerce-UI (Shopify Hydrogen + Sanity + Searchspring; "looks minimalistic, almost brutalist… under the hood, a highly engineered system") *(commerce-ui.com case)* | Streetwear / workwear | Shopify (Hydrogen) |

12 captures across 11 brands (Roger Vivier partial).

---

## Per-site teardowns

### 1. Aesop — aesop.com/us (Work & Co lineage)
- **Page**: 7,921px = 8.8 viewports. Promo bar 57px charcoal `#333` with cream text; header 57px relative (not sticky), logo wordmark centered, two link clusters (Stores / Customer service left; Email sign up / Account / My cart right), second row of 11 category links centered + boxed search field (1px cream border, 52px tall) — the nav floats transparent over the hero film.
- **Hero**: 720px-tall full-bleed video carousel (not 100vh — it deliberately stops at 80% of the viewport so the cream page and the next heading peek in). Bottom 40% has `linear-gradient(transparent → #000)` scrim. Content centered at bottom: 13px "Introducing" kicker → 31px/41px Suisse Intl 400 title "The Fragrant Fables" → 16px subline → 390px-wide ghost button (1px cream border, 0 radius, 48px tall, "Explore the story →"). Play/mute round 40px icon buttons bottom-left; slide indicator = 3 short bars, active one darker, centered.
- **Section sequence** *(observed)*: hero film carousel → "Curated Sets" centered serif heading + one-line dek → 3-up product carousel with arrows → 50/50 split (film left 651px, right side: kicker "Eaux de Parfum", serif heading "A scent—and story—for all", tab row Fresh/Floral/Woody/Ambery at 24px with 2px underline on active, 3-up product carousel) → staggered editorial splits (image 848px bleeding off the left edge, copy column ~400px on the right; next one mirrored, image bleeding off the right edge) with long empty cream space between them → full-bleed store film "Aesop Upper West Side / A neighbourly presence" → footer (1,027px tall!).
- **Type**: Suisse Intl 400 (119 uses) + Suisse Intl Medium + **Zapf Humanist** (Optima-like flared serif) used *only* for section h2s (31px/41px) — 9 uses total. Body is 14px (105 uses), product name 14px 700, notes line 14px #666. Largest measured text is 36px. **No uppercase anywhere (0%)**, tracking normal. The whole site never exceeds 36px type — luxury through restraint.
- **Colour**: body `#FFFEF2` (warm cream, not white), text `#333333`, secondary `#666666`, accent `rgb(148,92,38)` = `#945C26` (amber-brown, the bottle colour) used only for tiny "New addition"/"Online exclusive" flags (12px). Dark panels `#333`/`#252525`. Shadows only on floating UI (`0 0 4px rgba(51,51,51,.2)`).
- **Product card** *(observed)*: product shot on cream (no card bg, no border), 12px brown flag top-left, bookmark icon top-right, centered 14px bold name, 14px #666 descriptor ("Petitgrain, Eucalyptus, Geranium"), price, then a full-width charcoal 48px "Add all to cart" bar with 0 radius. Cards are ~376px wide with ~20px gutter in a 1200px container (side margin 120–135px).
- **CTAs**: two kinds only — ghost (1px border, transparent, 13px/24px padding, 48px tall, label + → arrow) and solid charcoal bar. Radius 0 everywhere (the only radii are 50% on round icon buttons).
- **Motion**: CSS only. Durations 0.3s (45), 0.2s (29), 0.5s (20). Beziers: `cubic-bezier(0.215,0.61,0.355,1)` (easeOutCubic), `cubic-bezier(0,0.2,0,1)`. Keyframes named fadeIn/slideUpIn/rightSlideIn — utilitarian. No scroll-jacking.
- **Copy voice**: literary, wry. "Each fragrance a fable. Each fable a question. Each question an invitation to pause and ponder." / "One product which anyone can relate to—and that everyone will appreciate. Consider bathroom embarrassment, banished." (Post-Poo Drops). Em-dashes used constantly ("A scent—and story—for all").
- **Signature moves**: cream page + charcoal text instead of white/black; serif reserved for section titles only; split modules where the image bleeds to one viewport edge while text sits on the inner grid; editorial film photography (period-costume vignettes, warm 70s grade) next to product-on-cream packshots.

### 2. Totême — toteme-studio.com (We Make Websites)
- **Page**: only **3.4 viewports** tall. The homepage is a lookbook index, not a sales funnel.
- **Hero**: NOT full-bleed. A single portrait image ~432x606px centered on pure white (left edge at 504px of 1440 — i.e. it occupies 30% of the width), starting 120px below the top. Under it: "Men's Collection" 18px/22.5px weight **300**, then "Fall Winter 26" 12px with a short 1px underline that only spans part of the word (*observed* — a sliver underline as active-link marker). Everything else is white space.
- **Then**: 2-up, zero-gutter, edge-to-edge image tiles (720px each, ~900px tall ≈ 4:5), caption centered near the bottom of each tile in white 18px/300 + 12px category link ("The New Silhouette / New In", "The New Shearling / Outerwear", "Slouch Waist / Dresses", "Mercer / Bags"). 4 tiles total. Then footer.
- **Nav**: fixed 72px, transparent, logo wordmark centered (TOTEME, ~100px wide), left "Women / Men / About" 12px, right "Search / Account" + bookmark + bag icons. No mega-menu visible at rest; menus slide down (`menu-slide-down` keyframe).
- **Type**: single family "Toteme Sans" (custom geometric grotesk), weights **300** (39 uses) and 400 (3). Sizes 12 (32 uses), 16, 18 — that's the whole scale. Largest text on the homepage is 18px. Tracking normal, no uppercase except the logo.
- **Colour**: `#FFFFFF` bg, text `#090909`, one grey `#5A5A5A`. Zero accents. Photography (cream walls, parquet, black/ivory clothing) supplies all colour.
- **Grid**: footer is a strict 4-column quarter grid (columns start at 32 / 376 / 720 / 1064px) with 32px outer margin; links 12px, 31px row pitch. "Join mailing list" sits alone bottom-left.
- **Motion**: `cubic-bezier(.16,1,.3,1)` (expo-out), `cubic-bezier(.25,1,.5,1)`, `cubic-bezier(0.22,0.61,0.36,1)`; durations 0.3s (56), 0.2s, 1s (13 — image fades). `NudgeImage`, `scrollHint` keyframes. 19 backdrop-filter elements (blurred menu panels).
- **Mobile** *(observed)*: identical idea — same centered portrait (~326px wide with 32px side margins), 120px+ top whitespace, centered 18px caption. Hamburger + search left, logo centered, bookmark + bag right.
- **Floating chat button**: 48px black circle with the TOTEME monogram, bottom-right — branded even the utility widget.
- **Signature moves**: the "small image in a big white room" hero; two-word captions; the site is shorter than most landing pages' hero sections.

### 3. Magda Butrym — magdabutrym.com (design Ania et Lucie, build Commerce-UI)
- **Page**: 5.1 viewports. Body `rgb(252,250,247)` = `#FCFAF7` (barely-warm white); product panels `#F5F2ED`.
- **Hero**: full-viewport landscape film (Polish Podhale mountains, misty, muted green-grey grade). A 36px white announcement bar above. Transparent header over film with 15px white links left (Shop / Highlights / Explore / search icon) and right (US/USD, Boutique, Assistance, Bag + 0 in a white 20px circle). Logo "MAGDA BUTRYM" is a thin wide-tracked serif wordmark ~330px wide centered. In the hero foot: a **giant ghosted repeat of the wordmark** at ~10% opacity spanning the full width behind the caption *(observed)*; caption "Podhale Leather" 20px/20px sans 400 white + "Discover Now" 13px with 1px underline. Play + mute icons bottom-right.
- **Scroll**: hero film collapses to ~450px band → "shop the look" strip: 6 cut-out product packshots on `#F4F4F4`/`#F5F2ED` tiles, no names, no prices (*observed*), centred in a ~1150px row → 2-up full-bleed campaign videos (each 720 wide, full height) with motion-blurred editorial photography, captions bottom-centred "Outerwear Icons / Shop Outerwear", "Romance in Form / Discover Dresses".
- **Type**: Next-font sans (geometric, Gill-ish) 13px (28 uses), 16, 20; serif + italic loaded for editorial. One weight (400) site-wide. No tracking changes, no uppercase except logo.
- **CTA**: text links only — 13px with `border-bottom:1px solid` underline (no buttons on the homepage at all). Radii only on the bag count pill (9999px) and play icon.
- **Motion**: `cubic-bezier(.2,.4,.2,1)`, `cubic-bezier(0.25,0.46,0.45,0.94)`; 0.3s/0.2s; 1.1s & 0.8s for media fades. The app-like feel comes from Next prefetch + instant transitions (case study: "near-instant page transitions", "video-first product pages").
- **Gradients**: `linear-gradient(transparent, #000)` x6 behind captions on video tiles; `linear-gradient(0deg, transparent, rgba(0,0,0,.3))` behind the header for legibility.
- **Signature moves**: landscape-as-hero (no product in the first frame at all); ghost wordmark watermark; product strip with *no* text — pure object line-up as a visual rhythm break between films.

### 4. Akris — us.akris.com (Build in Amsterdam)
- **Page**: 5.5 viewports; 2,092 `img` nodes (huge product feed with lazy images).
- **Nav**: static 64px white bar, hamburger + search left, **A-K-R-I-S-** wordmark (letters joined by hyphen-bars) centered, account / saved / bag icons right. Minimal: only 5 links in the header; everything else is in the drawer.
- **Hero**: full-width runway film (Défilé SS27, magenta-to-plum grade) ~450px tall *(observed)*, caption bottom-left inside the film: "DÉFILÉ SPRING SUMMER 2027" white + "DISCOVER MORE >" grey, both **Courier Prime** 12px uppercase. Pause/mute icons bottom-right.
- **Then**: big white gap (~120px) → label row "FALL 2026  DISCOVER MORE >" left-aligned to a **centred 690px image column** (375→1065px — 48% of viewport) → portrait campaign image 690x~1000 → "Fall 2026  SHOP ALL >" label at the 20px outer margin → **4-up edge-to-edge product grid**, 1–2px hairline gaps, light grey `#F3F3F3→#E6E6E6` 160° gradient tiles behind cut-outs, "NEW" chip (grey bg, mono 11px) top-left of each tile.
- **Type**: Courier Prime monospace is the whole UI voice — 12px (40 uses), 11px, 14px; tracking `0.041em@12`, `0.064em@11` on uppercase labels. Typewriter mono on a Swiss luxury house = archival/atelier signal.
- **Colour**: black on white; product tiles in a soft grey gradient `linear-gradient(160deg, #F3F3F3 3.92%, #E6E6E6 94.8%)` (11 uses) — studio-sweep effect without photography of a sweep.
- **CTAs**: uppercase mono text + chevron ">" — no boxed buttons on the homepage. Newsletter "SUBSCRIBE" 48px.
- **Motion**: `cubic-bezier(0.25,0.46,0.45,0.94)`, `cubic-bezier(0.65,0,0.28,1.28)` (slight overshoot), `cubic-bezier(0.75,0,0.23,0.99)`; durations .25s (26), .5s, .8s, 1.4–1.5s (long image reveals; `reveal`, `animateAmbient` keyframes).
- **Signature moves**: monospace typewriter labels; centred narrow image column alternating with full-bleed edge-to-edge product grid; hyphen-joined wordmark echoed by "label  label  >" spacing.

### 5. Suitsupply — suitsupply.com/en-us (Build in Amsterdam)
- **Page**: 7.3 viewports. Fixed 52px white-on-image header: hamburger + search left, SUITSUPPLY wordmark centered (~130px), account + bag icons right — only icons, 2 links.
- **Hero**: 100vh full-bleed campaign photo (Jazz-stage set: red curtain, sequinned singers, model in pinstripe three-piece) — high-saturation, staged, cinematic. Caption bottom-left at 20px margin: "New Arrivals" GT America **30px/36px weight 500, tracking -0.015em**, white. No button, no subline. The label *is* the CTA (whole tile is the link).
- **Sequence** *(from data)*: stacked full-viewport category tiles each with the same bottom-left 30px label: New Arrivals → Suits → Knitwear & Sweaters → Pants → Polos & T-Shirts → Shirts → Coats & Vests; then a 4-col services row (20px gap) with 14px copy ("Skip the fitting room with Size Passport.", "Alterations by our expert in-store tailors."), store finder, newsletter.
- **Type**: GT America only; weights 300 (40), 500 (36), 400; sizes 14 (53 uses) and 30 (18). Two-size system. Tracking -0.015em on 18/30px.
- **Colour**: imagery-led; UI `#2D2E2C` (warm near-black) and white. 4px radius on the few buttons.
- **Motion**: almost none in CSS (0.1–0.3s); 38 clip-path elements (image reveals/crops).
- **Signature moves**: "category = full-screen photo + one bottom-left label"; the homepage is a vertical slideshow of campaign images that are each a link.

### 6. Roger Vivier — rogervivier.com (Build in Amsterdam) — partial
- Captured template only (404 page of the real site; second run Akamai-blocked). Still instructive:
- **Nav** *(observed)*: dusty-rose promo bar `rgb(164,76,92)` = `#A44C5C` 40px with 13px serif text and underlined link; the white header below has a **20px top-left/right radius** (`20px 20px 0 0`) so it sits on the promo bar like a card tab. Nav links in **small caps serif** ("Shop", "Maison Roger Vivier", "Wishlist", "My account", "Shopping bag") at 12–14px with `0.03em` tracking; script logo "Roger Vivier PARIS" in crimson centered.
- **Type**: ABC Gaisyr (Dinamo; loaded as "Unlicensed Trial" build — note) 350/400/500 + italic for display and nav; NB International 400 for UI. h2 "Discover the collection" 38px/41.8px weight **350**, tracking 0.013em. 24px/27.6px weight 350 for footer heads ("Find a boutique >"). Lots of 12px at 0.008em.
- **Grid**: 3-up category images ~323x404 (4:5) with 10px gutters in a ~990px centred block; labels below in bold small caps with 1px underline ("THE SHOES", "THE BAGS", "THE ACCESSORIES").
- **Motion (CSS mined)**: by far the richest ease set in this cluster: `cubic-bezier(0.165,0.84,0.44,1)` (easeOutQuart, 126 uses), `cubic-bezier(0.23,1,0.32,1)` (easeOutQuint, 114), `cubic-bezier(0.19,1,0.22,1)` (easeOutExpo, 58), `cubic-bezier(0.5,0.05,0.1,1)` (14), `cubic-bezier(0.86,0,0.07,1)` (easeInOutQuint). Durations 0.3s (63), 0.6s (59), 0.8s (56), 1s (42), 2s (24). Keyframes `text-reveal`, `zoomOut`, `card-fade-100/60/20`, `line-1..5`. Custom cursor present.
- **Footer**: black, white 24px serif "Find a boutique >", address set in italic serif right-aligned.

### 7. Kinfolk — kinfolk.com (Six)
- **Page**: 17.6 viewports — a magazine homepage, the longest in the cluster.
- **Hero**: type-and-object, not full-bleed. Centered "ISSUE 61 / THE PLAY ISSUE" in Kinfolk Serif Deck, uppercase, ~50–60px, then the actual magazine cover (~313x405) floating on white, then "Buy | Read" text links at 15px. Logo "KINFOLK" wide-tracked serif top-left; the only header control is a two-line hamburger (two 50px hairlines) top-right. A 3px black rule runs across the very top of the page.
- **Sections** *(observed + headings)*: issue hero → full-bleed photo bands → story cards on a sage band `rgb(219,222,213)` = `#DBDED5` (42 uses): 3-up 328px cards with 20px gutters, 13px "Fashion, Issue 61" category line, then 15px UPPERCASE title ("THE FLOW STATE") + sentence-case dek ("Mind. Body. Clothes: The total absorption of creative play."), dimmed grey on hover → newsletter row "Never miss out—sign up for newsletters from Kinfolk" in 32px serif with 2px black underline rule and an inline email field → fixed black bottom bar "Discover unlimited access to Kinfolk" + ghost "Subscribe Now" (1px white border, 2px radius).
- **Type**: 4 custom faces: Kinfolk-Sans (153), Serif-Deck (69), Serif-Text (28), Serif-Display. Sizes 15 (124 uses), 32 (50), 13 (50), 25, 60, 50. Tracking is *tuned per size*: `0.010em@15`, `-0.005em@32`, `0.030em@13`, `-0.005em@60`, `0.060em@13` for caps labels, `-0.010em@50`. Line-height 1.0 on 60px display. 25% of text uppercase (labels + headline kickers).
- **Grid**: 30-column grid with 20px gaps (28 instances) and 26-col variants; 34px outer margin; 1296px container.
- **Motion**: Lenis `smoothWheel`, Barba/Swup page transitions, GSAP eases `power3.out`, `power4`, `expo`; ScrollTrigger starts `top bottom`, `top 25%`, `bottom 75%`. CSS bezier `cubic-bezier(0.25,1,0.5,1)` (67 uses — easeOutQuart-ish) at 0.4–0.5s. Restrained: fades and slides, no pinning spectacle.
- **Copy voice**: deck lines are single declarative sentences: "The artist Carsten Höller wants to play." "Skater Sage Elsesser's essentials." "The case for doing the difficult thing."
- **Signature moves**: the magazine object as hero; UPPERCASE title + sentence-case dek pairing; sage-green content band; 30-col grid; per-size tracking table.

### 8. Aman — aman.com (Colville-Walker design; Inviqa build)
- **Page**: 6.7 viewports (imagery failed to lazy-load in headless — layout only).
- **Nav**: sticky; hamburger + "Menu" + search left, **ĀMAN** wordmark with macron centered (~150px), "English" language select with 1px underline, and a solid charcoal **"Reserve"** button `#313131` on cream text, 0 radius, 42px tall, 140px wide — the only filled button on the page.
- **Colour**: body `rgb(243,238,231)` = `#F3EEE7` (sand/linen); panels `#FDF9F5`, `#E6E2DB`; text `#313131` headings, `#585858` body. No accent colour at all.
- **Type**: Lyon Display 300 + Lyon Text 400 (Commercial Type serif) for headings — h2 31px/45px (lh 1.45!) tracking 0.016em; card h3 ~20px; body/dek Lyon Text ~14px. **Whitney SSm** 13px for UI with `0.023em`; uppercase kicker labels Whitney 10–12px tracked **0.198em** ("EXCLUSIVE HIDEAWAYS", "WELLNESS RETREATS", "CITY ESCAPES") — widest tracking in the cluster. "Discover more" text links 13px with 1px underline offset ~6px.
- **Layout** *(observed)*: section intro top-left at 24px margin ("Seasonal Experiences" + 2-line dek ~420px wide) and the card carousel starts at ~530px, so text and cards are offset diagonally; 3 cards per view at ~330px with ~44px gap, the third card half-faded at the viewport edge (peek). A 2px progress line (thin grey track, dark segment) under the carousel instead of dots.
- **Motion**: `cubic-bezier(0.19,1,0.22,1)` (expo-out), `cubic-bezier(0.23,1,0.32,1)`; 0.4s dominant (44). Keyframes slide-in-*/fade-in, `header-slide-out-top` (header hides on scroll down).
- **Copy voice**: "Set amid wild nature, Amanvari emerges where the distinct desert, mountain and ocean landscapes of Baja's East Cape converge." / "Time together is made effortless…". Place-names as headlines ("Amanvari, Mexico").

### 9. Ace Hotel — acehotel.com (Atelier Ace + rehabstudio)
- **Page**: 6 viewports.
- **Header** *(observed)*: two-tier, utilitarian, 96px fixed: boxed "ACE HOTEL" logo (bordered), "Locations" dropdown in Tiempos serif 22px, EN; then a **booking strip built into the header** — 5 bordered cells (LOCATION / CHECK IN / CHECK OUT / GUESTS / HAVE A CODE?) with 10px uppercase labels (`0.018em`) over 14px values, and a solid orange `rgb(255,148,76)` = `#FF944C` "BOOK NOW" block 59px tall in condensed gothic. Second row: 14px sentence-case links (Offers, Shop, Goings on, A-List, Private Spaces, Eat + Drink, Artist In Residence, Ace Reader, Ace Radio).
- **Hero**: full-bleed video (staff jacket "A FRIENDLY PLACE"), centered **Toronto Gothic** condensed caps "WELCOME TO ACE HOTEL" at **140px / lh 133px (0.95) / -0.010em**, white. Pause button 64px white circle bottom-right, chevron scroll hint center.
- **Then**: centered manifesto paragraph (~660px measure, 16px with 30px line-height ≈ 1.9) "…we think really good restaurants, public art and lobby parties are important… We're glad you're here." → light grey `#EAEAEA` band with paper/noise texture: "LOCATIONS" 70px gothic + 14px dek inline to its right → horizontal carousel of location cards (photo with hand-drawn per-location logotype overlaid in white), round 64px white arrow buttons → Offers, Goings on (dark `#231F20` band), Ace Reader, The A-list.
- **Type**: Bianco Sans (UI/body, 311 uses, 14px), Toronto Gothic (display, 70/140px, -0.01em), Tiempos Headline 500 (one serif accent: "Locations"). 29% uppercase.
- **Colour**: off-black `#231F20`, white, `#EAEAEA`, olive `rgb(112,121,81)` = `#707951`, orange `#FF944C` only on BOOK NOW. Borders: 1px bottom rules everywhere (70 instances) — the site is built of hairline table rules.
- **CTAs**: 0 radius; "VIEW OFFER" 48px ghost with 1px border, 14px uppercase; carousel arrows fully round (139986px radius = pill).
- **Motion**: `cubic-bezier(0,1,0,1)` (very sharp ease-out), 250ms dominant (54 uses).
- **Signature moves**: booking widget as the masthead; condensed poster gothic over film; per-property hand-lettered logotypes on cards; hairline-rule information design.

### 10. Byredo — byredo.com/us_en (Vaimo)
- **Hero** *(observed)*: full-bleed macro video (silk ribbon over an orange-to-blue gradient sky), giant white stencil **BYREDO** logotype ~380px wide centered high in the frame, "MENU" with hamburger+search glyph top-left, "CART (0)" top-right — both 12px uppercase tracked `0.025em`. A **floating product card** bottom-right (400x150): white packshot tile left, frosted grey right with 12px uppercase "PERFUME EXTRACT / HAVANA TONKA / $465 / SIZE 70 ML" and a bag icon in a white circle → shoppable hero. Vertical slide indicator (thin lines) on the right edge, mute/pause bottom-left.
- **Gradient scrim**: `linear-gradient(rgba(0,0,0,.76) 0%, transparent 172px, transparent 85%, rgba(0,0,0,.76) 100%)` — top and bottom vignettes only where UI sits.
- **Type**: byredoSans only, 400 (61) / 700 (1); **81% of text uppercase**, 12px (43 uses) at `0.025em`, 8px micro labels at `0.025–0.05em`, 16px. The most uppercase-heavy site of the cluster — the stencil logo sets the mood and the UI follows.
- **Colour**: black/white UI; `#F5F5F5` panels; greys `#4D564F`, `#767676`. Radii small (2–6px) except circles.
- **Grids**: 2- and 3-col with **8px gaps**; container 1180px.
- **Motion**: Material-standard `cubic-bezier(0.4,0,0.2,1)` (17), 0.15–0.5s.
- **Caveat**: consent wall cut capture at 1.6 viewports; below-fold not measured.

### 11. Totême PDP — silky shearling coat (We Make Websites)
- **Layout** *(observed)*: classic 2-column PDP at 1440: image column 640px wide starting at x=80 (portrait 4:5+, studio grey sweep background, model shot first), info column 400px wide starting at x=880 — i.e. the info column is *narrower than half* and floats with ~160px air on both sides. Info is **centred** for name/price/wishlist/swatches, then left-aligned for sizes/description/accordions.
- **Stack (top→bottom)**: name 14px/300 "Silky shearling coat dark brown" (sentence case, colour in the name) → price "5 600 $" (European spacing) → bookmark icon → 2 colour swatches as **mini product photos** (50x70, active one with a 1px underline bar) → size row "30 32 34 36 38 40 42 ~~44~~" as plain 12px numerals (sold-out struck through) + right-aligned "Large to size" fit note → **"Add To Cart" ghost button: full 400px width, 46px tall, 1px #090909 border, white fill, 0 radius, 12px weight 300** → `#F6F5F3` store-availability bar with pin icon → 3-line description with inline "Read more" underline → 4 hairline accordion rows (Details / Size & Fit / Certificates & Traceability / Returns & Exchanges) with › chevrons, 35px pitch.
- **Measured**: still one family (Toteme Sans), 300 weight for 57/60 text nodes, sizes 12/14/16 only; 27 sticky elements (info column sticks while images scroll); 28 backdrop-filter elements; the only border on the page is the ATC button.
- **Lesson**: even the money button is a *ghost* button at weight 300. Confidence = not shouting.

### 12. Carhartt WIP USA — us.carhartt-wip.com (Commerce-UI)
- **Hero** *(observed)*: ~810px full-bleed lifestyle photo (cropped at the knees — product is the trouser, so the face is cut off), transparent header with white Helvetica 14px bold links (Men / Women / Accessories / Lookbook / Editorials / Stores; Search / Log In / Bag as words, not icons). Centred-low caption: "The Payson Pant" **Helvetica 48px/52.8px bold, tracking normal** + "Shop Men's Pants →" 14px bold. Scrim `linear-gradient(transparent 20%, rgba(0,0,0,.7))`.
- **Header** turns solid white on scroll (60px), logo left (not centred — streetwear departs from the luxury centred wordmark).
- **Product rail**: section header row — "New Arrivals" 20px bold left, "Shop Now →" 14px bold right, both on the 40px margin — then **4-up grid, 20px gaps, 40px outer margin, tiles ~325x450 on `#EFEFEF`** (18 uses) with cut-out flat-lay packshots centred. Colour swatches as 100%-radius dots (64 instances). Secondary text `#737373`.
- **Type**: HelveticaLTPro only, 700 (110) / 400 (70); 14px for 169 of 180 nodes, then 20/32/48. Zero uppercase, zero tracking. Brutally simple two-weight Helvetica system.
- **Category tiles**: 32px bold white labels on image tiles ("T-Shirts", "Sweats & Hoodies", "Camo Feather Tree", "The Fall/Winter 2026 Campaign"), 3-col with 40px gap.
- **Motion**: almost none (1s image `appear` fade, 0.2s hovers). Speed comes from Hydrogen SSR, not animation.
- **Lesson**: streetwear's "brutalist" commerce = Helvetica bold, grey product tiles, arrows as the only ornament, words instead of icons in nav.

---

## Addendum: PDP + streetwear patterns (from #11–12)
- PDP info column: 400px fixed width, sticky, centred title/price block then left-aligned controls; images ~640px column left. Gap between columns ~160px at 1440.
- Swatches: luxury uses mini product photos (Totême 50x70); streetwear uses round colour dots (Carhartt).
- ATC: luxury = 1px ghost 46px full-width 0-radius; transactional bars elsewhere are charcoal (Aesop). Never a gradient or pill.
- Product tile background: `#EFEFEF` (Carhartt), `#F3F3F3→#E6E6E6` gradient (Akris), `#F5F2ED` warm (Magda), page colour (Aesop cream). Cut-out packshots centred with ~15% padding.
- Product grids: 4-up is the default for commerce rails (Carhartt 20px gap/40px margin; Akris 2px gap/0 margin); 3-up for curated sets (Aesop, RV).

---

## Cross-site patterns (numeric)

**Page length**
- Luxury fashion homepages are short: Totême 3.4 vp, Magda Butrym 5.1, Akris 5.5, Suitsupply 7.3. Beauty/hospitality with storytelling: Aesop 8.8, Aman 6.7, Ace 6.0. Editorial/magazine: Kinfolk 17.6. → Commerce homepage = 3–9 viewports; only editorial exceeds 10.

**Hero patterns (4 archetypes, all seen)**
1. Full-bleed film/photo with tiny caption bottom-left or bottom-centre (Suitsupply, Magda Butrym, Byredo, Ace, Akris). Hero heights: 100vh (Suitsupply, Byredo, Ace, Magda), 720px fixed (Aesop, i.e. 80vh so content peeks), ~450–515px band (Akris).
2. Small centred portrait in white space (Totême: image = 30% of viewport width, 120px top offset).
3. Object-on-white + uppercase serif title (Kinfolk issue cover).
4. Booking/commerce widget as masthead (Ace).
- Hero caption sizes: 18px (Totême), 20px (Magda), 30px (Suitsupply), 31px (Aesop). Only Ace goes poster-sized (140px), and it is the "culture/irreverent" brand. **Luxury hero text is 18–31px — never 64px+.**
- No hero has more than: 1 kicker + 1 title + 1 dek + 1 CTA. Most have just title + text link.

**Typography**
- Families per site: 1 (Totême, Suitsupply, Byredo, Akris) to 3–4 (Kinfolk, Ace, Aesop, Aman). When a serif appears beside a sans, it is reserved for headings (Aesop Zapf Humanist 9 uses vs Suisse 185; Aman Lyon for h2/h3 only; Ace Tiempos used once).
- Body/UI size: 12–15px dominant (Totême 12, Byredo 12, Akris 12, Magda 13, Aman 13, Aesop 14, Suitsupply 14, Ace 14, Kinfolk 15). **16px is not the default in luxury — 12–14px is.**
- Section headings: 30–38px (Aesop 31, Aman 31, Suitsupply 30, Roger Vivier 38, Kinfolk 32). Display only on editorial/culture: Kinfolk 50–60px, Ace 70/140px.
- Weights: light/regular dominate. Totême 300, Roger Vivier 350, Aman Lyon Display 300, Magda 400 only, Kinfolk 400 only (251 of 251!). Bold appears only for product names (Aesop 700) or not at all. **No 800/900 weights anywhere in the cluster.**
- Tracking: uppercase labels get +0.025em (Byredo) to +0.06em (Akris mono, Kinfolk caps) up to +0.198em (Aman 10px kickers). Large serif headings get ~0 to +0.016em (Aman, RV) — *not* tight negative tracking. Negative tracking only on sans display: Suitsupply -0.015em@30, Ace -0.010em@70–140, Kinfolk -0.005 to -0.010em@32–60.
- Line-heights: serif section heads loose (Aman 1.45, Aesop 1.33); display tight (Kinfolk 1.0, Ace 0.95); captions 1.0–1.25.
- Uppercase share: 0% (Aesop, Totême, Magda, Suitsupply) vs 25–29% (Kinfolk, Ace) vs 81% (Byredo). Pick one stance per brand; never mixed randomly.

**Colour**
- Background is rarely pure white in beauty/hospitality: Aesop `#FFFEF2`, Aman `#F3EEE7`, Magda `#FCFAF7`. Pure white in fashion that lets clothes speak: Totême, Akris, Suitsupply.
- Text is rarely pure black: `#333` (Aesop), `#313131`/`#585858` (Aman), `#090909` (Totême), `#2D2E2C` (Suitsupply), `#231F20` (Ace).
- Accent colour count: 0 (Totême, Aman, Suitsupply, Magda, Byredo) or exactly 1 used in <1% of pixels (Aesop amber `#945C26` for flags; Ace orange `#FF944C` for BOOK NOW only; Roger Vivier rose `#A44C5C` for promo bar). Photography provides 90%+ of colour.
- Secondary greys for metadata: `#666`, `#585858`, `#5A5A5A`, `#767676`.

**Layout / grid**
- Outer margins: 20px (Suitsupply, Akris), 24–25px (Aman), 28–32px (Totême, RV), 34px (Kinfolk), 120–135px (Aesop's 1200px container). Fashion runs edge-to-edge with tiny margins; beauty uses a contained 1200px column.
- Product/editorial tile gutters: 0px (Totême 2-up, Magda 2-up), 1–2px (Akris product grid), 8px (Byredo), 10px (RV), 20px (Aesop, Kinfolk, Suitsupply services).
- Aspect ratios: 4:5 portrait dominates (Totême tiles ~720x900, RV ~323x404, Kinfolk cards ~328x366, Akris campaign ~690x1000 ≈ 2:3). Landscape only for film.
- Asymmetric splits: Aesop image 848px vs text 400px (≈ 2:1) with the image bleeding to the viewport edge; Aman text block at left margin and carousel offset to x=530.
- Centred narrow column for a single campaign image: Totême 432px (30%), Akris 690px (48%).

**Nav**
- Centred wordmark in 8/9 sites (Kinfolk is left). Header height: 52 (Suitsupply), 57 (Aesop), 64 (Akris), 72 (Totême), 84 (Byredo), 96 (Ace two-tier).
- Transparent over hero: Totême, Magda, Byredo, Suitsupply, Aesop. Solid: Akris, Aman (cream), Ace.
- Link counts visible at rest: 2–6 items + icons. Everything else lives in a drawer/mega panel. Text links rather than icons on the left ("Women / Men / About"; "Shop / Highlights / Explore"); icons on the right (bookmark, bag).
- Promo/announcement bar 36–57px, 12–14px text, centered: Aesop (charcoal), Magda (white), Roger Vivier (rose).

**CTAs**
- Radius: 0px on Aesop, Aman, Ace, Akris, Totême, Kinfolk cart; 2px Byredo/Kinfolk; 4px Suitsupply; 8px RV small links. **No pill buttons except icon circles.**
- Hero CTAs are text links with 1px underline (Totême, Magda, Aman "Discover more", Akris "DISCOVER MORE >", Kinfolk "Buy | Read") or ghost buttons with 1px border (Aesop 48px tall, Ace 48px). Filled buttons are reserved for transactional actions: Aesop "Add all to cart" (charcoal bar), Aman "Reserve", Ace "BOOK NOW".
- CTA verbs: "Discover", "Discover more", "Explore the story", "Shop Outerwear", "Discover Dresses", "View offer". Never "Get started", "Learn more →" with emoji, "Shop now!!".

**Motion**
- Durations cluster at 0.2–0.4s for UI, 0.6–1s for image fades, 1.4–2s for slow reveals (Akris, RV).
- Ease vocabulary seen (copy these): easeOutQuart `cubic-bezier(0.165,0.84,0.44,1)`, easeOutQuint `cubic-bezier(0.23,1,0.32,1)`, easeOutExpo `cubic-bezier(0.19,1,0.22,1)` / `(.16,1,.3,1)`, `cubic-bezier(0.25,1,0.5,1)` (Kinfolk), easeOutCubic `cubic-bezier(0.215,0.61,0.355,1)` (Aesop). All ease-out; no bouncy springs (only Akris has a mild `(0.65,0,0.28,1.28)` overshoot).
- Only the editorial site (Kinfolk) uses Lenis smooth scroll + page transitions. Commerce sites use native scroll. No GSAP pinning/scroll-jacking found in any commerce site.
- Video is the motion: 6/10 heroes are video (Aesop, Magda, Akris, Byredo, Ace, and video tiles on Magda), each with explicit play/pause + mute controls (accessibility + luxury "film" framing).

---

## Signature techniques worth stealing (with implementation detail)

1. **The 80vh hero (Aesop)** — `height: 720px` at 900 viewport (or `height: 80svh`), so the next section's heading peeks. Bottom scrim `linear-gradient(to bottom, transparent 45%, rgba(0,0,0,.85))`. Caption stack centered at bottom: 13px kicker → 31px/1.33 sans 400 → 16px dek → 390px-wide ghost button `border:1px solid currentColor; height:48px; border-radius:0; padding:13px 24px 12px` with a 16px → arrow.
2. **Small image, big room (Totême)** — hero is `width: 30vw; max-width: 432px; aspect-ratio: 5/7; margin: 120px auto 0` on #fff, with an 18px/300 caption 48px below and a 12px sub-link with a partial underline (`background: linear-gradient(currentColor,currentColor) 0 100%/40% 1px no-repeat`). Instantly reads as luxury because it refuses to fill the screen.
3. **Zero-gutter 2-up campaign tiles with centred caption (Totême, Magda)** — `display:grid; grid-template-columns:1fr 1fr; gap:0`, tiles `aspect-ratio:4/5` (or `height:100vh` for video), caption absolutely positioned `bottom: 64–100px; left:50%; translate:-50%`, white 18–20px weight 300–400 + 12–13px underlined link. Add `linear-gradient(transparent, rgba(0,0,0,.35))` only on the bottom 30%.
4. **Category-as-fullscreen-slide (Suitsupply)** — stack 100vh image links; single label bottom-left at 20px margin, 30px/1.2 weight 500, letter-spacing -0.015em. No button, no dek. The whole `<a>` is the tile.
5. **Ghost wordmark watermark (Magda Butrym)** — the logotype repeated at ~100% viewport width, `opacity:.08–.12`, behind the hero caption; `mix-blend-mode` not needed.
6. **Cut-out product line-up with no text (Magda)** — 6 packshots on `#F5F2ED` tiles in a single row between two films; acts as visual punctuation and a "shop the look" without UI noise.
7. **Monospace atelier labels (Akris)** — `font-family: "Courier Prime"`, 11–12px, `text-transform: uppercase; letter-spacing: .04–.064em`, pairs "FALL 2026   DISCOVER MORE >" with 24px gap; chevron as glyph not icon.
8. **Studio-sweep product tiles without photography (Akris)** — `background: linear-gradient(160deg, #F3F3F3 4%, #E6E6E6 95%)` behind transparent PNG cut-outs; 4-up grid with `gap:2px` edge to edge; grey "NEW" chip `padding:2px 6px; font: 11px mono`.
9. **Serif-only-for-section-titles (Aesop, Aman)** — one humanist/old-style serif at 30–31px for h2, everything else a neutral grotesk at 13–14px. Serif usage < 10% of text nodes.
10. **Wide-tracked micro kickers (Aman)** — 10px uppercase, `letter-spacing: .2em`, `color:#585858`, 12–16px above a 20px serif card title, then 14px serif body, then 13px underlined "Discover more" with `text-underline-offset: 6px`.
11. **Peek carousel with progress line (Aman)** — cards ~330px with 44px gaps, third card cut by the viewport edge and faded (opacity ~.4); a 2px track (`#ccc`) with a dark segment = scroll progress, instead of dots.
12. **Asymmetric bleed split (Aesop)** — `grid-template-columns: minmax(0,848fr) minmax(0,592fr)`, the image column bleeds to the viewport edge (`margin-left: calc(50% - 50vw)`), text column has 60px inner padding, kicker 14px bold, body 16px #666 with 1.5 lh, ghost button. Alternate sides each section; leave ~200–300px cream between splits.
13. **Booking-as-masthead (Ace, hospitality)** — the header is the booking form: bordered cells, 10px uppercase labels over 14px values, single saturated block button 59px tall. Hospitality's primary action is never more than 0 scrolls away.
14. **Shoppable floating card on a film hero (Byredo)** — 400x150 card bottom-right: packshot on white left 150px, frosted panel right (`backdrop-filter: blur(12px); background: rgba(255,255,255,.4)`), 12px uppercase meta + price + size, circular bag button.
15. **Per-size tracking table (Kinfolk)** — define tracking per step: 13px caps +0.06em, 13px +0.03em, 15px +0.01em, 20px +0.02em, 32px -0.005em, 50px -0.01em, 60px -0.005em with line-height 1.0. UPPERCASE title + sentence-case dek pairing for every card.
16. **Brand-tinted neutrals** — replace #fff/#000 with the product's material: cream `#FFFEF2` + `#333` (apothecary paper), sand `#F3EEE7` + `#313131` (linen/stone), `#FCFAF7` (ivory). Accent = product colour (Aesop amber bottle `#945C26`) used only on 12px flags.
17. **Media controls as design elements** — every autoplay film gets 40–64px circular play/pause + mute buttons in a corner; they double as "this is a film" signifiers.

---

## What these sites never do (vs generic templates / AI output)

- Never a 64–96px bold sans hero headline with a gradient word. Luxury hero text is 18–31px, weight 300–500. (Exception: Ace's 140px condensed gothic — a poster typeface tied to the brand's signage, still weight 300–400.)
- Never more than one accent colour; never purple/blue gradients, glassmorphism cards or neon glows. The only gradients are black scrims for text legibility and Akris' near-invisible grey sweep.
- Never rounded-xl cards with drop shadows. Product cards have no container: image + text on the page background. Radii are 0–4px; shadows only on floating UI.
- Never pill-shaped primary CTAs, never two competing buttons side by side in a hero, never "Get started"/"Sign up free". Hero CTAs are underlined text links or a single 1px ghost button.
- Never icon-grid "features" sections, stats counters, testimonial carousels, logo walls, or FAQ accordions on the homepage.
- Never 16px+ body copy with 1.7 line-height everywhere — UI copy is 12–14px, captions often 1.0–1.25 lh; long-form gets 1.5–1.9.
- Never all-caps *and* sentence case mixed arbitrarily: each brand picks a case stance (Byredo 81% caps; Aesop/Totême 0%).
- Never heavy scroll-jacking or pinned GSAP spectacles on commerce pages; motion is 0.2–0.6s ease-out fades plus video. Smooth-scroll only appears on the editorial property (Kinfolk).
- Never fill every pixel: Totême's hero image takes 30% of the width; Aesop leaves ~300px of empty cream between splits; Akris puts a 690px image in a 1440px room.
- Never stock-looking photography: all imagery is art-directed (period-film vignettes, misty landscapes, motion-blurred runway, staged stage sets), graded consistently per campaign.
- Never emoji, exclamation marks, or "🚀 Elevate your…" copy. Voice is literary or laconic: "Consider bathroom embarrassment, banished." "We're glad you're here."
- Never a long homepage of identical alternating "image left / text right" blocks with equal sizes; when splits are used, the image is ~2x the text column and bleeds off-screen.

---

## Rankings — best 4 references and why

1. **Aesop (Work & Co lineage)** — the most complete, transferable system for a premium commerce landing page: cream/charcoal palette with a single material accent, serif-only-for-section-titles, 14px UI, 0-radius ghost + solid buttons, 80vh film hero with peek, asymmetric bleed splits, literary copy. Easy to reproduce in code and it never looks templated.
2. **Totême (We Make Websites)** — the purest demonstration of luxury-by-restraint: one font, two weights, three sizes (12/16/18), zero accent, 3.4-viewport homepage, small centred hero image, zero-gutter 2-up tiles. The best counter-example to AI over-design; with measured +11% CR it also proves restraint sells.
3. **Magda Butrym (Ania et Lucie / Commerce-UI)** — best "video-first" luxury pattern: landscape film hero, ghost wordmark, text-free cut-out product strip, full-height 2-up video tiles with centred captions, underlined-text CTAs only. Shows how to make fashion e-commerce feel like a film site while staying shoppable.
4. **Kinfolk (Six)** — best editorial/culture reference: multi-face custom serif/sans system with a per-size tracking table, 30-col grid, UPPERCASE-title + sentence-dek card anatomy, sage content bands, and the only tasteful use of Lenis + page transitions in the cluster.

Honourable mentions: **Akris (BiA)** for monospace atelier labels + gradient product tiles; **Ace Hotel** for hospitality booking-as-masthead and condensed-gothic poster type; **Aman** for the wide-tracked kicker + serif card system and peek carousel; **Suitsupply (BiA)** for the "category = full-screen image + one label" homepage.
