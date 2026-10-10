# G — Objective Award Sweep 2023–2026: who wins, and what their client work actually does

Cluster: g-award-sweep · Compiled 2026-10-07 · Analyzer: `tools/analyze.mjs` (1440×900 headless Chrome; real wheel scroll) · 15 live client sites captured (`sites/<slug>/data.json` + `shots/`).

**How to read this.** "Measured" = from data.json (computed styles, CSS + JS mining). "Seen" = from screenshots I looked at. "Jury" = Awwwards site-page scores and descriptions (fetched Oct 2026). If I didn't verify something, I say so. Award sources are Awwwards SOTY/SOTM/SOTD lists, the Annual Awards winners page, and CSSDA WOTY 2024/2025 nominee pages. The FWA site returned HTTP 500 and Webby category pages didn't resolve, so FWA and Webby data is thin here. I did not survey Godly, Land-book or Siteinspire (no time after the rate-limit interruption). The gap is noted in §9.

**Capture caveats (be honest):** five sites gate the experience behind a WebGL loader or a "start" button, so the headless run captured only the preloader: **landonorris.com** ("LOAD NORRIS" gate; the mobile shot hit ERR_CONNECTION_CLOSED), **igloo.inc** (pure canvas, no DOM text, so all data is empty), **elva-labs.com** (stuck at "070%"), **anaiwood.com/en** (stuck at the "ANAI 0" loader), **pasqua.it** ("START THE EXPERIENCE" gate). For these the DOM/CSS/JS data (fonts, sizes, eases, staggers) is still real because the page DOM was present. Where I only saw the loader, I describe only the loader. **otsuka-air.jp** (SHIFTBRAIN /zeroz) produced only a hero shot and no data.json, so it is excluded.

---

## 0. TL;DR for the skill author

1. **What actually wins in 2024–26 is restrained, not loud:** 1–2 typefaces, a 2–4 colour palette with one saturated accent, oversized display type (110–320px), slightly negative tracking (−0.02 to −0.07em), full-bleed photography or video, Lenis smooth scroll and an expo-out ease. Most winners in this sweep are calm, editorial, image-led luxury and hospitality sites (White Desert, ERA, Tengile, Floema) or confident brand-led tech (Serve, Radian, MindMarket). The WebGL spectacles (Igloo, Lando, Elva) are the minority, even though they take the SOTY trophies.
2. **On every winner I pulled, "Animations/Transitions" is the highest dev sub-score (7.4–9.6), and Accessibility, Semantics and Markup are the lowest (6.4–7.4).** Juries pay for motion craft. They forgive weak a11y, but you shouldn't.
3. **Award juries weight Design 40%, Usability 30%, Creativity 20%, Content 10%.** Creativity is usually the top design sub-score (7.2–8.7), and the content score rises when the copy has a voice.
4. **The most common single ease across these sites is `cubic-bezier(0.19,1,0.22,1)` (expo-out).** It appeared on Lando, Floema (×70), Tengile (×16) and Radian. Next most common are quart-inOut `(0.76,0,0.24,1)` and quart-out `(0.25,1,0.5,1)`. In GSAP the defaults are `power2.out` and `expo.inOut`, with char staggers of 0.015–0.05s.
5. **Studios to study (not covered by the other clusters):** The First The Last, Malvah (Studio of the Year 2025), OFF+BRAND (SOTY 2025), abeto (SOTY 2024 + Developer SOTY 2025), Louis Paquet / KOKI-KIKO (Independent of the Year 2025), Bürocratik, Daybreak, DashDigital, Studio 28K, Spatzek, WILD, UNCOMMON, Garden Eight, Shhh, SHIFTBRAIN, HOLOGRAPHIK, Vide Infra, makemepulse, Adoratorio, MONOGRID, FLOT NOIR and Antinomy.

---

## 1. Award ledger (verified 2026-10)

### Awwwards Annual Awards: winners page (current cycle = 2025 awards)
| Category | Winner | Studio | Votes |
|---|---|---|---|
| Site of the Year | Lando Norris (landonorris.com) | **OFF+BRAND.** | 43 |
| Site of the Year — Users' Choice | Lando Norris | OFF+BRAND. | 596 |
| Developer Site of the Year | Messenger (messenger.abeto.co) | **abeto** | 54 |
| E-commerce of the Year | Scout Motors | Locomotive (other cluster) | 28 |
| Agency of the Year | **Immersive Garden** (other cluster) | — | 39 |
| Studio of the Year | **Malvah** (Cape Town; first South African winner, per LBB) | — | 27 |
| Independent of the Year | **Louis Paquet** | — | 41 |

### Awwwards Sites of the Year list (winners and nominees by year)
- **2025:** Lando Norris (OFF+BRAND), Messenger (abeto)
- **2024:** Igloo Inc (abeto + Bureaux), Don't Board Me (The First The Last), Opal Tadpole (Claudio Guglieri)
- **2023:** Lusion v3 (Lusion), Noomo Agency (Noomo), Mana Yerba Mate (Louis Paquet)
- **2022:** KPR (Resn), The Other Side of Truth (The First The Last), Persepolis Reimagined (Monks)
- Studio of the Year: 2023 = **Obys**. 2025 = **Malvah**. For 2024, one search summary claimed "Green Chameleon", but I could not verify it on Awwwards. **Treat it as unverified.**

### Awwwards Sites of the Month, Feb 2024 → Aug 2026 (complete list as fetched)
| Month | Site | Studio |
|---|---|---|
| Aug 2026 | ERA Residence | **The First The Last** |
| Jul 2026 | Lama Lama | Lama Lama (self) |
| Jun 2026 | Son Daven | **The First The Last** |
| May 2026 | Floema | **Bürocratik** |
| Apr 2026 | Oryzo AI | Lusion* |
| Mar 2026 | GQ & AP The Extraordinary Lab | Immersive Garden* |
| Feb 2026 | The Renaissance Edition (Shopify Editions Winter '26) | **Shopify Design** (in-house) |
| Jan 2026 | Bruno's Portfolio | Bruno Simon |
| Dec 2025 | MindMarket | **Louis Paquet / KOKI-KIKO** |
| Oct 2025 | Ponpon Mania | Patrick Heng |
| Sep 2025 | Terminal Industries | REJOUICE* |
| Aug 2025 | Cartier Watches & Wonders 2025 | Immersive Garden* |
| Jul 2025 | Tracing Art (Getty) | Resn* |
| Jun 2025 | Montfort | Immersive Garden* |
| May 2025 | Anime.js | Julian Garnier |
| Apr 2025 | Navigate | Resn* |
| Mar 2025 | Siena Film Foundation | Niccolò Miranda |
| Feb 2025 | Dropbox Brand | **Daybreak Studio** |
| Jan 2025 | Immersive Garden site | Immersive Garden* |
| Dec 2024 | David Whyte Experience | Immersive Garden* |
| Nov 2024 | The Line Studio | The Line Studio |
| Oct 2024 | Kriss.ai | **Studio 28K** |
| Sep 2024 | Watson | Watson Design Group |
| Aug 2024 | Zentry | Resn* |
| Jun 2024 | Slosh Seltzer | Active Theory* |
| May 2024 | Inkfish | **DashDigital** |
| Apr 2024 | Akaru | Akaru |
| Mar 2024 | Bennett & Clive | **Spatzek Studio** |
| Feb 2024 | Active Theory V6 | Active Theory* |
| Jan 2024 | AIM — AI Modernism of Kharkiv | Obys* |
| Dec 2023 | The Fabulous Cartier Journey | Merci-Michel* |
| Jun 2023 | Pasqua Wines | **Adoratorio Studio** |
| May 2023 | C2 Montréal | Louis Paquet / KOKI-KIKO |

`*` = agency covered by another cluster.

**Read:** across 33 SOTMs, Immersive Garden (6) and Resn (4) dominate. The First The Last now has 2 SOTMs in a row plus 2 SOTY nominations, which makes it the fastest-rising non-excluded studio.

### CSS Design Awards WOTY nominees
- **2024:** Contra Calculator, Qudrix, RSPCA Animal Futures, Oakley Project 2075, SavoirFaire, ATMOS Lamp/AYOCIN, wodniack.dev, Immersive Garden, Following Wildfire, Active Theory V6, Clear Street, mike-fernandez.dev, Cartier W&W 2024, Bigpicture Co (bpco.kr), Bonhomme 10th, Slosh Seltzer, Dictionary of Free Speech, LV Collectibles, Buttermax, Longines Spirit Flyback, **Bennett & Clive**, Noomo Labs, Organimo, Hatom.
- **2025:** Lacoste Members Experience (Merci-Michel), ComPsych Brand Hub (konpo), Juice Agency, Keikku (Made by Büro), merodev.net, Bruno Simon, Symphony of Vines, Nite Riot, KOKUYO Curiosity is Life (mount inc.), Atoll Digital, composites.archi, Exat Typeface (Hot Type), **burocratik.com**, The Monolith Project, Charles Leclerc, Iventions (SERIOUS.BUSINESS), **Dropbox Brand (Daybreak)**.

### SOTD frequency sample
I read 15 pages of the Awwwards SOTD list, about 440 entries spanning Jul 2024 → Oct 2026. These studios repeat most often in the sample: Locomotive, Malvah, The First The Last, makemepulse, HOLOGRAPHIK, Vide Infra, Merci-Michel, Louis Paquet, ET Studio, FLOT NOIR, Immersive Garden, DashDigital, Studio 28K, ToyFight, Noomo, ++hellohello, Adoratorio, MONOGRID, Unseen, Obys, UNCOMMON, Fiddle.Digital, Somefolk, Buzzworthy, Cuchillo, Beaucoup., OFF+BRAND, Exo Ape, Antinomy, Edoardo Lunardi, Jordan Gilroy and Dylan Brouwer.

---

## 2. Top-40 web design studios, 2023–2026, ranked by award count and quality

Method: annual-award titles > SOTY nominations > SOTM > SOTD frequency in my ~440-entry sample > CSSDA WOTY nominations. Only one studio within a group is a tie-break call. `[X]` = covered by another cluster (kept in the list for completeness).

| # | Studio | City | Specialty | Notable clients / sites | Award evidence (2023–26) |
|---|---|---|---|---|---|
| 1 | Immersive Garden [X] | Paris | Luxury WebGL storytelling | Cartier, Omega, LV, Aramco, GQ×AP, Montfort | Agency of the Year 2025; 6 SOTM (Dec24, Jan25, Jun25, Aug25, Mar26 + Aten7 Jul23); many SOTD |
| 2 | Resn [X] | Wellington/Amsterdam | Experiential WebGL | Getty (Tracing Art, Sculpting Harmony), Zentry, Navigate, Squarespace | SOTY 2022 (KPR); 4 SOTM 2023–25 |
| 3 | OFF+BRAND. | Manchester/London | Personal-brand and talent sites, Webflow + WebGL | Lando Norris, Trevor Noah, Steven.com | **SOTY 2025 + Users' Choice**; SOTD Lando 8.18 |
| 4 | abeto | Barcelona | Real-time 3D / WebGL dev | Igloo Inc, Messenger | **SOTY 2024 (Igloo) + Developer SOTY 2025** |
| 5 | Lusion [X] | Bristol | WebGL product experiences | Oryzo AI, EverSwap | SOTY 2023 (Lusion v3); SOTM Apr26 |
| 6 | Malvah | Cape Town | Brand + bold minimal web | White Desert, Seventeen, KODE Immersive, Estrela, Up&Up, Robot, dhk | **Studio of the Year 2025**; 12 SOTD 2024–26 (most with Dev award) |
| 7 | The First The Last | Kyiv/London | Luxury real estate and lifestyle, Webflow + GSAP | ERA Residence, Son Daven, Jesko Jets, DaVincii, Don't Board Me | SOTY nominee 2022 + 2024; **SOTM Jun26 + Aug26**; 5+ SOTD |
| 8 | Louis Paquet / KOKI-KIKO | Montréal | Illustration-led brand sites, Rive | MindMarket, Mana Yerba Mate, C2 Montréal, Cerebrium, Telescope | **Independent of the Year 2025**; SOTY nominee 2023; 2 SOTM; ~6 SOTD in sample |
| 9 | Active Theory [X] | LA/Amsterdam | WebGL campaigns | Slosh, Spotify Wrapped Party, Santioni | 2 SOTM 2024 |
| 10 | Merci-Michel [X] | Paris | Branded web games | Cartier, Lacoste ×4, Miu Miu, Cdiscount | SOTM Dec23; 7+ SOTD in sample |
| 11 | Obys [X] | Kyiv | Editorial / typographic | Glyphic Bio, AIM | Studio of the Year 2023; SOTM Jan24 |
| 12 | Locomotive [X] | Montréal | Brand + dev craft | Scout Motors, Wolverine, Lightship | E-com of the Year 2025; ~10 SOTD in sample |
| 13 | REJOUICE [X] | Paris/Barcelona | Bold tech brand | Terminal Industries, ICOMAT, Noovo | SOTM Sep25 |
| 14 | Noomo Agency | Valencia/Bucharest | WebGL + brand | Vibrant Wellness, Vogue Business×Archrival | SOTY nominee 2023; CSSDA WOTY nominee 2024; 4 SOTD |
| 15 | makemepulse | Paris/Lyon | Luxury web experiences | Audemars Piguet 150y, Ruinart, Brunello Cucinelli AI, UNESCO, Apechain | 6 SOTD in sample |
| 16 | HOLOGRAPHIK | Mexico City | Web3/crypto + artist brand | Sui, Slush, Permian, Paul Kalkbrenner, David Alaba | 6 SOTD in sample |
| 17 | Vide Infra | Kyiv/Dubai | Real-estate luxury | Sobha, Springs, Silver Pinewood, AIR, LIKOVA | 6 SOTD in sample; Studio of the Year nominee (self-reported) |
| 18 | Bürocratik | Coimbra (PT) | Brand + Nuxt/WebGL | Floema, Jeton | **SOTM May26**; CSSDA WOTY 2025 nominee |
| 19 | Daybreak Studio | Toronto | Brand systems / brand sites | Dropbox Brand, Superpower | **SOTM Feb25**; CSSDA WOTY 2025 nominee |
| 20 | DashDigital | Cape Town | Hospitality / film | Inkfish, Tengile MalaMala, Freshman, GS Productions | **SOTM May24**; 4 SOTD |
| 21 | Studio 28K | Montréal/remote | AI, energy and tech storytelling | Kriss.ai, Hut 8, ON Energy, 21 Hrs on the Moon | **SOTM Oct24**; 3 SOTD |
| 22 | Spatzek Studio | Vienna | Type-led minimal | Bennett & Clive | **SOTM Mar24**; CSSDA WOTY 2024 nominee |
| 23 | Adoratorio Studio | Brescia | Luxury fashion/wine, web games | Pasqua, Max Mara ×2, Colonia Zacamil | **SOTM Jun23**; 3 SOTD |
| 24 | Unseen Studio [X] | Bristol | Brand + WebGL | Illoca, Hubtown, OceanX | SOTM Feb23; 4 SOTD |
| 25 | MONOGRID | Milan | Luxury fashion campaigns | Gucci, Max Mara ×2 | 3 SOTD |
| 26 | FLOT NOIR | Paris | Film / sport / architecture | Dembélé Ballon d'Or, RISK, MERSI, House of Corto | 5 SOTD |
| 27 | ET Studio | Italy | Minimal portfolios and brands | Wembi, SILEENT, 9to5 | 6 SOTD |
| 28 | Exo Ape [X] | Amsterdam/Berlin | Editorial motion | Inversa, Fluid Glass, Ottografie | 3 SOTD |
| 29 | Studio Freight / darkroom [X] | NYC | Dev-led brand | Sharplink, Dragonfly | 2 SOTD |
| 30 | WILD | Vienna | Product/tech brand | Serve Robotics, Wild Week | SOTD Jun26 |
| 31 | UNCOMMON | Netherlands | Webflow product launches | Radian, PieterKoopt, IRONHILL, Mat Voyce | 4 SOTD |
| 32 | Antinomy Studio | (int'l) | Deep-tech / space | Vast, Waabi | 2 SOTD (Mar–Apr 2026) |
| 33 | ToyFight | Manchester | Playful product brand | Butter, Flim, Ink Games, OGAKI | 4 SOTD |
| 34 | ++hellohello | Bay Area/Europe | Reports, festivals | State of AI in Design, Alethia, Superlocal | 4 SOTD |
| 35 | Shopify Design (in-house) | — | Product editions | Renaissance Edition, Live Globe, Supply | **SOTM Feb26** + 2 SOTD |
| 36 | Garden Eight | Tokyo | Calm Japanese craft, Nuxt/three | ANAI wood, aircord, Photoyoshi | 3 SOTD + Dev 2024–25 (SOTM 2021 The Shift) |
| 37 | Lazarev. | SF/Kyiv | AI product brand | Elva | SOTD Jun26 |
| 38 | SHIFTBRAIN / Shhh / mount inc. | Tokyo | Japanese brand WebGL | Otsuka /zeroz, SOIL, KOKUYO | SOTD each; KOKUYO = CSSDA WOTY 2025 nominee |
| 39 | Fiddle.Digital | (int'l) | Experimental dev | Obsidian Assembly, StringTune, Kaleida | 3 SOTD |
| 40 | Somefolk / Buzzworthy / Beaucoup. (tie) | UK / US / FR | Brand sites | Example, TitanGate; Bucks Sauce; Partizan, Orage | 3–4 SOTD each |

Also notable but sub-list: Synchronized Studio, Cuchillo, Edoardo Lunardi (indie), Jordan Gilroy (indie), Dylan Brouwer (indie), Patrick Heng (SOTM Oct25), Niccolò Miranda (SOTM Mar25), Watson DG (SOTM Sep24), Claudio Guglieri (SOTY nom 2024, Opal), Monks (SOTY 2022), Tubik, Digital Panda, Utsubo (JP), Trionn (SOTD Jul26), Oimachi (SOTD Aug26, 7.31).

---

## 3. Sites analyzed

| # | Client | URL | Agency | Award (Awwwards) | Category | Stack (measured hints + Awwwards tags) |
|---|---|---|---|---|---|---|
| 1 | Lando Norris | landonorris.com | OFF+BRAND. | **SOTY 2025**; SOTD 8.18 (D 8.12 / U 7.9 / C 8.71 / Ct 8.18; Anim 8.6) | Sports / personal brand | Webflow, GSAP (eases mined), SplitText, Lenis config, 20 canvases (WebGL) |
| 2 | Igloo Inc | igloo.inc | abeto + Bureaux | **SOTY 2024**; SOTD 7.92 (Anim **9.6**) | Web3 corporate | Pure WebGL canvas; no DOM text captured |
| 3 | ERA Residence | era-residence.com | The First The Last | **SOTM Aug 2026**; SOTD 7.61 | Real estate luxury | Webflow, GSAP + ScrollTrigger, Lenis, Barba, SplitText |
| 4 | Floema | floema.com/en | Bürocratik | **SOTM May 2026**; SOTD 7.65 | Urban furniture / B2B | Nuxt, Lenis, WebGL canvases, SplitText |
| 5 | Dropbox Brand | brand.dropbox.com | Daybreak Studio | **SOTM Feb 2025**; SOTD 7.67 (Responsive 8.6) | Brand guidelines | Webflow, custom cursor, CSS motion |
| 6 | Kriss.ai | kriss.ai | Studio 28K | **SOTM Oct 2024**; SOTD 7.45 | AI healthtech | SvelteKit, canvas, backdrop-filter glass |
| 7 | MindMarket | mindmarket.com | Louis Paquet / KOKI-KIKO | **SOTM Dec 2025**; SOTD 7.85 | Research agency (B2B) | Astro + Swup, Lenis, Rive, GSAP |
| 8 | White Desert | white-desert.com | Malvah (Studio of Year 2025) | SOTD Sep 2026 7.31 (WPO 8.0) | Luxury travel | Next.js, Contentful, GSAP, Lenis, grain |
| 9 | Serve Robotics | serverobotics.com | WILD + Mach Studio | SOTD Jun 2026 7.3 | Robotics | React/Tailwind/Sanity (Awwwards), Lenis, View Transitions keyframes, Radix |
| 10 | Elva | elva-labs.com | Lazarev. | SOTD Jun 2026 7.43 | AI app | three.js, GSAP, springs |
| 11 | ANAI | anaiwood.com/en | Garden Eight (Tokyo) | SOTD May 2024 7.25 | Sawmill / B2B | Nuxt, GSAP, three, SplitText |
| 12 | Tengile MalaMala | tengilemalamala.com | DashDigital + Ingamana | SOTD Oct 2026 7.22 (A11y 7.4) | Safari hospitality | Next.js, Sanity, Lenis, GSAP + Framer-motion springs |
| 13 | Bennett & Clive | bennettandclive.com | Spatzek Studio | **SOTM Mar 2024**; SOTD 7.71 (WPO 8.4) | Production company | Nuxt, Lenis, GSAP SplitText |
| 14 | Pasqua Wines | pasqua.it | Adoratorio | **SOTM Jun 2023**; SOTD 7.78 | Wine | Nuxt, three.js, grain |
| 15 | Radian | rideradian.com | UNCOMMON | SOTD Jul 2026 7.23 | E-moto launch / pre-order | Webflow, GSAP + ScrollTrigger, Lenis, Barba |
| 16 | SOIL (JPASN Japanese theatre export) | soil-net.jp | **Shhh** (Tokyo) | SOTD Nov 7 2025 | Culture / performing arts | Lenis, SplitText, Theatre.js hint |
| 17 | Seventeen | seventeenagency.com | Malvah | SOTD Dec 10 2025 (+Dev) | Creative agency (client of Malvah) | Webflow, GSAP + ScrollTrigger, Lenis, Barba, three, Lottie |
| 18 | Vast (space stations) | vastspace.com | **Antinomy Studio** | SOTD Apr 1 2026 | Deep tech / aerospace | Webflow, GSAP, Lenis (lerp .3), Barba, three, SplitText |

(Rows 16–18 were added after the first write-up to fill the Japanese-studio and bold-Malvah gaps. See §4.16–4.18.)

---

## 4. Per-site teardowns

### 4.1 Lando Norris — OFF+BRAND. (SOTY 2025)
- **Intro (seen):** a full-screen acid-lime `#D2FF00` loader. The "LN" monogram morphs/rotates in the centre (the frames show L7 → ⅃ → L,). A small "LOAD NORRIS" pill sits below it. In headless it never auto-advanced, so this is an entry gate and part of the brand theatre.
- **Sections (DOM):** hero → marquee → horizontal track ("is-horizontal-track") → "ON TRACK / OFF TRACK" split (otot) → Helmets "Hall of Fame" gallery (Discoball, Dark Glitter, Porcelain, Chrome, Beachball…) → "lando.exe" → collabs → social callout → light footer `#F4F4ED`. Length 12.6 viewports.
- **Type (measured):** two families. **Brier 700** is a display face for emphasis words, used at 110px / lh 0.83 / −0.023em, uppercase, in `#B2C73A` olive-lime. **Mona Sans Variable** (200–900) carries everything else: 105px manifesto line, weight 400, −0.008em, uppercase; h2 93px / 700 / −0.036em; body 12–17px. Uppercase share is 56%. They mix fonts *inside a single headline* ("WORLD DRIVERS' **CHAMPION**", where CHAMPION is set in Brier).
- **Colour:** body `#282C20` (deep olive-black, not pure black), text `#F4F4ED`, accent `#D2FF00`, secondary `#B2C73A`, `#111112`. One radial gradient makes a lime glow ring.
- **Motion (JS mined):** power2.out ×36, expo.inOut ×12, power3.out ×10, elastic.out(1,0.75) ×5 (for playful pops), back.inOut. Durations cluster at 0.5 / 0.6 / 2s. **Char staggers are tiny (0.015–0.03)**, with `{amount: 0.015*len, from:"center"}` for centre-out text. Lenis lerp 0.1. ScrollTrigger starts are "top bottom" and "top 90%". CSS ease `cubic-bezier(0.19,1,0.22,1)` and `(0.65,0.05,0,1)`. 49 clip-path elements suggest mask reveals. Blend modes are saturation, plus-lighter and difference.
- **CTA:** lime fill, 7.2px radius, 40–50px tall, 14px text, labels like "VISIT THE STORE" and "BUSINESS ENQUIRIES".
- **Copy voice:** "REDEFINING LIMITS, FIGHTING FOR WINS, BRINGING IT ALL IN ALL WAYS." and "ALWAYS BRINGING THE FIGHT."
- **Signature moves:** a brand colour pulled from the client's helmet as a single neon accent on near-black olive; a mixed-font headline; a helmet archive as a collectible gallery.
- **Jury:** Creativity 8.71 (highest). 10/10 from Nick Chukreiev.

### 4.2 Igloo Inc — abeto + Bureaux (SOTY 2024)
- Captured only a grey `#A0A5B1` canvas with a scrambling ASCII-glyph loader line ("=---==+==-"). There is no DOM text, no fonts and 0 imgs, so it is entirely a WebGL app.
- **Jury:** Animations **9.6** (highest dev sub-score in this sweep), Responsive 8.4, but Semantics 6.6, A11y 6.6 and Markup 6.4. Described as "infinite scroll, transitions, 3D". Palette `#B6BAC5` / `#383E4E` (ice greys).
- **Lesson:** a SOTY can be won with near-zero semantic HTML if the real-time 3D is exceptional. Don't copy that trade-off for client marketing sites. The steal-able parts are the ASCII/glyph scramble loader and the cold monochrome palette.

### 4.3 ERA Residence — The First The Last (SOTM Aug 2026)
- **Hero (seen):** a full-bleed architectural render under a saturated blue sky. "ERA / RESIDENCE" is set in a condensed high-contrast serif (ambroise-francois-std), stacked and centred, with *Estepona* overlaid in a flourish script (sloop-script-three). Flanking micro-lines read "A PLACE … TO RETURN TO". There is a rotating circular-text badge logo top-left, a stacked text nav top-right ("SELECT AN APARTMENT / BOOK A CALL / CONTACT"), a vertical "SCROLL" rail on the left, a progress counter, and a day/night toggle ("BY DAY — BY NIGHT").
- **Sequence (seen):** a powder-blue `#B5CEDB` arch rises over the photo carrying the curved-text title "THREE REASONS TO CHOOSE ERA" (SVG textPath). Then a cream `#F3F3EC` concept block: centred uppercase serif paragraph at 36px, bougainvillea cut-outs bleeding in from the corners, and a small floral glyph as section punctuation. Then "GROUND FLOOR + BASEMENT", a floor-plan slider with an 01—02 pager. A horizontal-scroll gallery, aubergine `#340C24` night sections, an amenities list and a modal. Length **27.3 viewports**.
- **Type (measured):** Maison Neue Extended (12px body at −0.024em; 10px labels at **+0.048em**; 8px labels at **+0.32em**). Serif display at 36px (−0.008em) and 57px (−0.016em, lh 0.88). The script is used once, huge (173px, the cookie card "Cookies"). 65% uppercase.
- **Colour:** navy `#17233B` text, cream `#F3F3EC`, powder blue `#B5CEDB`, aubergine `#340C24`, white.
- **Grid:** 10-col with 14.4px gap (also 8/6/4-col nests). Arch radius `720px 720px 0 0`. 2px radii elsewhere. A 5-layer soft "smooth shadow" stack on one card.
- **Motion:** GSAP + ScrollTrigger + Lenis + Barba (page transitions). CSS eases (0.76,0,0.24,1), (0.25,1,0.5,1), (0.5,0,0.75,0). 51 elements with 3D transforms (horizontal track + cards). Marquee keyframe at 32s.
- **Signature moves:** an arch as section divider, text on a path, a script word over a serif, a day/night theme toggle, a bespoke cookie card set in the display script, and flowers as frame-breaking cut-outs.
- **Copy:** "DESIGNED AS A COMMUNITY, NOT A COMPLEX." and "A place to return to."

### 4.4 Floema — Bürocratik (SOTM May 2026)
- **Intro (seen):** blank warm paper `#F2EFEA`. Then a single centred 51–57px line "Spaces for people, made for life." with nothing else. The nav is a row of **white pill buttons** (PRODUCTS / ABOUT / SUSTAINABILITY / JOURNAL) top-right, and a logo with search icon top-left.
- **Sequence (seen):** the line gives way to a full-bleed muted photo (dark overlay) of their signage in real places: hotel square, boardwalk, golf clubhouse. A thin progress rule labelled "Made to Last" and "Scroll to Explore ↓", and a floating glass card bottom-right ("Urban Catalogue — Download Now", catalogue thumbnail). Per-category scenes switch catalogue (Urban → Golf). Then a centred category index: icon + 57px word + count in parens + an interleaved product thumbnail tile ("Urban (51)", "Nature (41)", "RePlastic (73)", "Golf (62)", "Details (00)"), over drifting leaf shadows (keyframe `leafShadowDrift`). Length 16 vp.
- **Type:** **one family**, Zimula 400 only. Display 51/57px at **−0.04em**, lh 1.05. UI 12–19px at −0.02em. 6% uppercase. No bold anywhere.
- **Colour:** `#F2EFEA` paper, `#241F21` ink, `#E9E778` pale yellow accent, `#988F8B` muted.
- **Motion:** CSS-heavy. `cubic-bezier(0.19,1,0.22,1)` ×70 at 0.5s is the house ease. Springy overshoot `(0.34,1.56,0.64,1)` and `(0.175,0.885,0.32,1.275)` for UI pops. GSAP expo.inOut 0.6–0.9s for scene changes. Lenis. Jury mentions "scroll video zooming" and "3D material interactions".
- **Radii:** 12px cards, 30px, pills. Side margin 32px.
- **Signature moves:** counts in parentheses as typographic texture; ambient leaf-shadow animation (a "light through trees" CSS drift); catalogue CTA cards that float persistently over the scenes.
- **Copy:** "We think outdoor furniture should look and feel good while doing good for our planet" and "Made to last, designed to endure."

### 4.5 Dropbox Brand — Daybreak Studio (SOTM Feb 2025)
- **Hero (seen):** a white canvas with a faint blue **visible construction grid** (hairlines). The first statement sits inside one grid cell, top-left: "At Dropbox, our Brand Guidelines help us infuse everything we make with identity." in Dropbox Blue `#0061FE`. Logo bottom-left of the cell, chevron bottom-right.
- **Sequence (seen):** on scroll, coloured blocks (orange, cyan, blue) slide in along grid lines. The blue cell holds the second statement in white. Then a **colour-block bento** of chapter tiles: Framework (navy `#283750`), Voice & Tone (yellow `#FAD24B` with giant quote marks), Logo (cyan `#3DD3EE`), Typography (orange-red with huge "Aa"), Color, Iconography (lime with padlock), Imagery (plum `#682760`), Motion (lilac, with a bezier-curve diagram). Each tile pairs its own dark-tone text with its background (e.g. `#B4C8E1` on `#283750`, `#684505` on `#FAD24B`).
- **Type:** Dropbox Sharp Grotesk Variable (250–900) at 34px / 500 / −0.02em, lh 0.8. Atlas Grotesk for text; Noto Sans Mono for specs. Small and confident: the biggest text is only 34px.
- **Motion:** pure CSS. A wide family of custom beziers: (0.5,0,0.3,1), (0.2,0.1,0,1), (0.15,0.5,0.05,1), (.6,0,0,1). Durations 0.7–1.5s. Keyframes drawIn/scaleToClose. Custom cursor.
- **Jury:** Responsive 8.6, Anim 8.4. Featured "Typography widgets, motion easing demo, iconography slot machine."
- **Signature moves:** the grid made visible as the design language; tiles whose text is a dark tint of the tile hue (never black or white); an interactive easing demo inside a brand site.

### 4.6 Kriss.ai — Studio 28K (SOTM Oct 2024)
- **Intro (seen):** a mauve-to-rose vertical gradient (`#D1CACC` → dusty rose). A huge **percentage counter "16%"** in semi-transparent white sits bottom-right.
- **Hero (seen):** a centred bold "Hi, I'm Kriss." and "An AI chatbot for dentists", with a small "Learn More" button wrapped in **corner-bracket frames** (viewfinder corners). The nav is a frosted-glass pill bar (Home/Setup/Plans/About/FAQ) with a solid black "Book Demo" segment, also bracketed. Bottom-left hint: "Scroll or click hotspots to explore the experience".
- **Sequence (seen):** a typewriter line "I'm integrated into your website to help with…", a chat bubble "I will live down here on your website. Click to try me!" docked bottom-right, and a glass info card "Patient Consultation" with a green "Explore Features →" bar plus a ← → pager. It is a 1-viewport "experience" app (SvelteKit), with a 3D scene behind the glass (Awwwards tags: 3D, zoom transition, hotspot hover).
- **Type:** a custom "Krissai" face at 38px / 16px. Text is dark green `#1A3D1C` (not black).
- **Effects:** backdrop-filter ×9 (glass), a teal shadow `rgba(65,179,165,.08) 10px 10px 40px`, and a 6px radius with split radii on segmented controls.
- **Signature moves:** a corner-bracket focus frame as the UI motif, a loader counter as typography, and the product (the chatbot) demonstrated live as the site's own guide.

### 4.7 MindMarket — Louis Paquet / KOKI-KIKO (SOTM Dec 2025; Independent of Year 2025)
- **Intro (seen):** a cream `#F5F1E4` screen where the green "m" logo draws itself (stroke animation).
- **Hero (seen):** a full-bleed lime-green `#8ED462` field. "Real human insights" at 140px / Inter 500 / **−0.06em** / lh 0.95, centred, then "One global partner". A crowd of **flat, rubber-hose-ish character illustrations** (blue/yellow/coral/lilac) bursts up from the bottom. A floating white rounded nav bar with a "Get a quote" pill and a round toggle.
- **Sequence (seen):** green organic blobs morph between sections. White cards hold the problem/solution copy ("No more chaos." / "Speak their language.") with coral and blue pill CTAs that carry circular arrow chips. A **yellow ribbon path draws across a photo** with the text "Connecting you to your audience" running along the stroke (Rive path animation). Stat counters at 144px (60+ / 400 / 50+). An editorial article grid with rounded 25px photo cards and region tag chips. A logo rail. Length 15.3 vp.
- **Type:** **Inter only (500 for everything)**. The display at −0.06em and the body at 20px −0.04em make it feel custom. Proof that tracking, not typeface choice, does the work.
- **Colour:** `#8ED462` green, `#F5E211` yellow, `#FF705D` coral, `#2BA0FF` blue, `#2C2E2A` ink, `#F5F1E4` cream.
- **Motion:** Rive (illustrations and path), Swup page transitions on Astro, Lenis, "cards stacking on scroll" (jury), sticky ×7. CSS overshoot `(.17,.67,.3,1.33)`, GSAP elastic.out(1,0.3).
- **Radii:** big friendly (63.75px, 50px, 25.5px, pills). 16-col grid, gap 20px.
- **Copy:** "Managing multiple vendors, juggling time zones… it adds up fast." and "No misalignment, no friction."

### 4.8 White Desert — Malvah (SOTD Sep 2026)
- **Intro (seen):** a grey screen where the giant word **"ANTARCTICA"** (Oswald condensed, 256px, white, uppercase) is already set at the bottom edge before the photo. Then an Emperor penguin portrait fades in behind it, so the type stays in front of the image.
- **Hero details:** small grey-glass rectangular nav buttons (Experience / Operation / About top-left; Rates / Enquire top-right), logo centred. An italic serif tagline left ("Luxury and adventure in the most remote place on Earth"), a "Watch Film ▶" link right, and faint vertical grid lines over everything.
- **Sequence (seen):** "OUR SEASON" in a narrow text column over a full-bleed mountain photo. A founder's quote in italic serif (Cardinal Classic) with a scanned signature. A trip list. A camps carousel ("ECHO" pod card on a cracked-ice texture with coordinates `[71°32'41" S, 8°58'11" E]`). "CPT – WFR" (the flight route) in 320px semi-transparent type over a glacier. "TO THE END OF THE EARTH" closing, with coordinates for Cape Town and Wolf's Fang Runway in the corners. A fixed **orange vertical "How it works +" tab** (`#FF7E15`) on the right edge. Length 23.1 vp.
- **Type:** three families, each with a strict job. Oswald for monumental words (256–320px, lh 0.9–1.0). Cardinal Classic Long (serif, incl. italic) for 42–60px headings and quotes. Inter Tight 500 for 14–18px UI and body. Labels at +0.175em.
- **Colour:** white, navy `#1F2A44`, grey `#535353`, a single safety-orange `#FF7E15` accent (expedition gear). Grain on.
- **Grid:** 12-col with 12px gap; container `calc(100% - 24px)`, i.e. a 12px gutter (almost edge-to-edge). Radii 2–6px.
- **Motion:** GSAP (power2.out, sine.inOut), Lenis, page-enter/exit keyframes, `cubic-bezier(0.16,1,0.3,1)` and (0.76,0,0.24,1). Glass buttons use inset hairline shadows (`0.35px 0.35px 0 rgba(255,255,255,.2) inset`). Backdrop-filter ×21. SVG filters ×5 (distortion).
- **Signature moves:** monumental word behind or over the subject; coordinates and route codes as decorative data; a single orange utility tab; signature scan as trust device.
- **Jury:** WPO 8.0 (fast despite imagery).

### 4.9 Serve Robotics — WILD + Mach Studio (SOTD Jun 2026)
- **Intro (seen):** deep teal `#0B3332`/`#0F4233`. Two ring "eyes" (the robot's face) fade from dim to mint `#61E5C0`.
- **Hero (DOM):** "The future is here" at 114px Roobert 500, −0.021em, lh 1.0 over hero video.
- **Sequence (seen):** "Meet the cutest low-emissions delivery robot known to humans" in two-tone text (dark words / mint words), centred between two **blurred mint glowing rings** (the eyes again, at scale). "Small team, big vision" framed by corner brackets. A sticky left progress rail with a tiny robot icon riding down it, beside value blocks ("Safe", "Sustainable") and photo cards of the robot on real streets. Stats at 98px ("~0 G/KM", "~13 GAL"). Length 21.5 vp.
- **Type:** Roobert 400/500 only. Body 18px −0.01em, display 60–114px −0.02em.
- **Colour:** white, ink `#083031`, `#0F4233`, mint `#61E5C0`, `#CEE8E1`. oklab colours in CSS (modern Tailwind v4).
- **Motion:** CSS view-transition keyframes (`view-transition-fade-in/out`) mean the native **View Transitions API** is used for page changes. Radix accordion. Lenis. No GSAP detected.
- **Signature moves:** the product's face (two circles) reused as loader, glow and icon throughout; a scroll-progress rail with a mascot riding it. Copy is human and wry: "Why move a 2-pound burrito in a 2-ton car?" (meta).

### 4.10 Elva — Lazarev. (SOTD Jun 2026)
- **Intro (seen):** near-black `#131313`. The word "loading" is huge (116px) and **heavily blurred** at left, with a crisp 13px "loading" label over it. The same treatment for the counter "070%" at right. The centre logo morphs from "elva" wordmark → a glass sphere/blob icon. It stalled at 70% headless.
- **DOM:** headlines in Neue Haas Grotesk Display 400 at 101–122px, normal tracking. Copy: "Stop editing. Keep shooting.", "Meet Elva. A filmmaking crew in your phone.", "Every video holds a feeling. But it gets lost in raw clips that never get seen." Mobile users are told "please view this website on a desktop device", a known jury penalty.
- **Motion (mined):** GSAP with ease "none" ×98 (scrubbed timelines), power2.out, elastic.out(1,0.75). **Springs**: stiffness 50/damping 10, 100/15, 300/25, 100/85 (the "glass-blob persona with 30+ behavioural states"). `blur(10px)` ×53 and `blur(20px)` ×26, so **blur-to-focus is the main reveal device**. three.js.
- **Signature move:** blur as a typographic state (out-of-focus big + in-focus small copies of the same word).

### 4.11 ANAI — Garden Eight, Tokyo (SOTD May 2024)
- **Intro (seen):** pure white, a light-grey spaced serif "ANAI" wordmark and a tiny "0" counter. It stalled at 0 in headless (three.js asset load).
- **DOM:** "Cultivate for Posterity" in **PP Eiko 160px, weight 400, lh 1.0, normal tracking** (a delicate hairline serif). Section heads "Brands" and "Oguni-Sugi" at 150px. Body PP Neue Montreal 16/28px. Everything weight 400, only 16% uppercase.
- **Colour:** white `#FFFFFF`, ink `#212721` (green-black), grey `#878A8C`. A 135° hard-stop gradient (`#212721 40% → #C7C8C6 60%`) is used as a wipe.
- **Motion (CSS):** a bespoke ease `cubic-bezier(0.104,0.204,0.492,1)` used **140 times** (a gentle, long-tailed ease-out, the Japanese "calm" signature), plus (0.472,0.04,0.526,1) symmetric. Durations 0.35s / 0.5s / 1s. GSAP power1.out ×36 (soft). **Random-order staggers** `{amount:.25–.5, from:"random"}` and centre staggers. A family of directional arrow keyframes (`anim-arrow-forward-in/out`, `backward`, `down`), i.e. the arrow exits one way and re-enters from the other on hover. 40-col micro-grid. Margins 120px.
- **Lesson (Japanese school):** quiet hairline serif at huge size, softest eases, random-order staggers and meticulously animated micro-icons.

### 4.12 Tengile MalaMala Collection — DashDigital + Ingamana (SOTD Oct 2026)
- **Intro (seen):** solid olive `#5C6E21` with a small spinner. Then the hero: warm grey video frame, "UNMATCHED / ABUNDANCE" in **PP Fragment at ultra-light weight (220)**, uppercase, stepped (second line indented right), with a tiny "Play Video" label. A right-aligned short lede in serif and a pair of small square buttons "Explore Collection | →". Nav is just "ENQUIRE" (left), logo (centre), "MENU" (right), 38px tall.
- **Sequence (seen):** asymmetric editorial photo collage: an elephant herd large right, a leopard small left, a 12px body paragraph in a narrow column top-left, and a photographer credit ("RUSSELL MACLAUGHLIN, NATIONAL GEOGRAPHIC"). A long olive serif paragraph at 48px / 220 weight ("Our lodges and camps each offer a distinct expression of the wilderness…"). Scattered small thumbnails in a loose staggered constellation. A full-bleed wild dogs image with a "Next" cursor label. A "COMMUNITY" section. Length 12.9 vp.
- **Type:** PP Fragment (variable; weights 220/310 measured) for display 32–48px. Inter 400/500 at 14–16px, −0.01em. Light-weight large serif paragraphs replace headlines.
- **Colour:** `#F5EEE9` bg, `#373F1D` ink, `#5C6E21` olive, `#E3E1D4`, `#FBF8F6`, `#00443B` deep green.
- **Motion:** GSAP (power2/power4.inOut, expo) + Framer-Motion springs (500/25) + Lenis. SplitText "lines, words, chars". Bezier arrays `[.25,.46,.45,.94]` and `[.32,.72,0,1]`. Marquee of images. Map pin idle animation.
- **Grid:** 12-col 16px gap, 16px side margin. Radii 2px.
- **Jury:** most balanced dev profile (all 7.4–7.6, a11y 7.4, the best a11y here).

### 4.13 Bennett & Clive — Spatzek Studio (SOTM Mar 2024)
- **Intro (seen):** white with "BENNETT & CLIVE" in one line, full-width, black.
- **Sequence (seen):** it cuts to black with a **giant right-aligned stack of client names** (ADIDAS, CALVIN KLEIN, HOURGLASS, NIKE, EILISH, THE OUTSET, MAC) at 150px. The names scroll up through the viewport while the active one jumps to the top-left and the matching **video plays full-bleed behind** (Nike sneakers seen). The fixed mini-header splits the wordmark across the screen ("BENNETT … & … CLIVE") with `mix-blend-mode: difference`. The CTA page is "Let's / raise / your … idea." with the words scattered across the grid. A capabilities list (Post Production, Editorial & Finishing…). A staggered roster of collaborators (Sephora, Mert & Marcus, Stella McCartney, Juergen Teller). Footer with live clocks: "New York 01:27 · Los Angeles 22:27 · Miami 01:27".
- **Type:** **one font (InterWeb)**, 400 weight for the giant names. Tracking is −0.07em at 150px (lh 0.77!), −0.05em at 75/45/15px. Uppercase used for names only.
- **Colour:** #000/#FFF only; video supplies all colour.
- **Motion:** custom ease `cubic-bezier(0.32,0.94,0.6,1)` ×35 at 0.6–0.8s. GSAP power2.inOut. Random-from stagger `{each:.08, from:"random"}`. SplitText lines. Lenis. 13 sticky elements.
- **Copy:** "GLOBAL PRODUCTION FOR BRANDS AND AGENCIES. THOUGHTFUL. PRECISE. THE OPPOSITE OF CHAOTIC."
- **Jury:** Creativity 8.13; WPO 8.4.

### 4.14 Pasqua Wines — Adoratorio (SOTM Jun 2023)
- **Intro (seen):** olive-khaki `#6E6548`. "PASQUA WINES" in Acid Grotesk is revealed from a line mask, with "PRESENTS" below in Wulkan Display (a high-contrast serif). Then a **painted vineyard landscape (oil-painting texture)** fades in with film grain. "PLEASE WAIT" → "START THE EXPERIENCE" pill, i.e. sound/3D experience gate.
- **DOM:** "HOUSE OF THE UNCONVENTIONAL". 105px display with grotesk + serif paired *within one headline*. Rotate-device prompt on mobile.
- **Motion:** CSS cubic-out `(0.215,0.61,0.355,1)` ×83 at 0.75s and quart-inOut `(0.77,0,0.175,1)` ×22. GSAP power2.out, expo.inOut 0.6–1.2s, staggers 0.05. Grain keyframe "noise". three.js. Hard-light blend.
- **Signature:** fine-art painting as hero media plus grain, which reads as heritage and still feels avant-garde.

### 4.15 Radian — UNCOMMON (SOTD Jul 2026)
- **Intro (seen):** total darkness with only the **headlight glowing**. Lights come up to reveal the yellow `#FDEB07` e-moto front-on, studio grey. Hero copy is bottom-left: mono kicker "THE RADIAN EXR", "A new era of enduro starts here." (60px Instrument Sans 500, −0.025em, lh 1.0), and two pills "Explore the bike ⊕" (white) and "Configure now ⊕" (yellow). Nav: "Discover EXR" left, spaced wordmark "RADIAN" centre, links + yellow "Pre-order ⊕" right.
- **Sequence (seen):** a sticky product sequence. "Radian EXR" left, bike image right, and a list of features ("Swap in 30 seconds", "Power, instantly", "Less maintenance", "Tune your ride", "Confident by design"). The active item is ink and the rest at **20% opacity**, scrolling through like a teleprompter. Then "Ready for racing" on dark `#121714`, a video card connected by a **thin hairline callout line with GPS coordinates**, and a forest gallery. A full-bleed moss shot with a **ruler-tick progress scale** at the left edge. "Be the first on the line" at 96px. Length 12.6 vp.
- **Type:** Instrument Sans 400/500 plus IBM Plex Mono 500 for kickers and specs. Tracking −0.025em at 36–96px.
- **Colour:** `#F5F3EF` bone, `#121714` green-black, `#FDEB07` yellow (product colour = UI accent).
- **Motion:** Osmo-style eases `cubic-bezier(0.625,0.05,0,1)` and `(0.509,0.188,0.041,0.989)`, plus expo-out. GSAP + ScrollTrigger + Barba + Lenis. Grain. Pill radius 720px.
- **Signature moves:** a lights-up product reveal; opacity-dimmed feature list as scroll index; coordinate callout lines; ruler-scale progress.

---

## 5. What award juries reward (patterns across winners, with numbers)

**Scoring structure (Awwwards):** Design 40% · Usability 30% · Creativity 20% · Content 10%. The Dev award is scored separately across six categories. Across the 14 sites with scores:
- SOTD totals: **7.22–8.18** (SOTY-level ≥ 7.9).
- Creativity is the top design sub-score on 9/14. Lando's 8.71 is the highest.
- **Animations/Transitions is the highest dev sub-score on 13/14 (7.4–9.6).**
- Accessibility (6.4–7.4) and Markup (6.4–7.8) are the lowest. Juries tolerate weak a11y; the skill should not.
- WPO is high on the fastest editorial sites (Bennett 8.4, White Desert 8.0), so performance is rewarded when the site is image-heavy but disciplined.

**Measured design ranges across the 12 sites with full DOM:**
| Variable | Range | Typical |
|---|---|---|
| Typeface families | 1–3 | **1–2** (5 sites use a single family: Floema, Bennett, MindMarket, Serve, Elva) |
| Largest display size @1440 | 34px (Dropbox) – 320px (White Desert) | **110–160px** |
| Display tracking | normal (serifs/condensed) to −0.07em | grotesk: **−0.02 to −0.06em**; serif/condensed: 0 |
| Display line-height | 0.77 – 1.1 | **0.83–1.0** |
| Display weight | 220 (light serif) – 700 | **400–500** (bold is rare; Lando is the exception) |
| Body size | 12–20px | 14–18px, tracking −0.01 to −0.04em |
| Small caps/labels | 8–14px uppercase | **+0.05 to +0.32em** tracking (opposite of display) |
| Palette | 2–7 colours | 1 ink + 1 paper + **1 saturated accent** |
| "Black" | rarely #000 | `#282C20`, `#241F21`, `#121714`, `#131313`, `#17233B`, `#212721`, `#083031` |
| "White" | rarely #FFF on editorial | `#F2EFEA`, `#F3F3EC`, `#F5EEE9`, `#F5F3EF`, `#F5F1E4`, `#F4F4ED` |
| Side margin | 12px – 120px | **16–48px** (edge-hugging) |
| Grid | 10–16 col | 12-col, 12–16px gap |
| Radii | 2px – pill | **2–8px** for cards; pills (500–720px) for buttons |
| Page length | 8 – 27 viewports | **12–23 vp** |
| Smooth scroll | Lenis on 9/15 | lerp 0.1, wheelMultiplier 1 |
| Hover durations | 0.2–0.4s | **0.3s** |
| Reveal durations | 0.5–1.2s | 0.6–0.8s |
| Char stagger | 0.015–0.05s | 0.02s |
| Item stagger | 0.05–0.1s | 0.08s, or `from:"random"`/`"center"` |

**Recurring jury-pleasing patterns:**
1. A **designed loader** that's on-brand (monogram morph, drawn logo, robot eyes, headlight, counter-as-type). 11/15 had a visible intro state.
2. **One idea carried everywhere.** Serve's eyes are the loader, glow, icon and rail mascot; Lando's helmet lime is accent, CTA and glow; Kriss's corner brackets are on the buttons, nav and cards.
3. **Hero = one statement + one image/video,** with the type often *overlapping* the subject (White Desert, ERA).
4. **Typographic texture devices:** counts in parentheses (Floema), coordinates and route codes (White Desert, Radian), live clocks (Bennett), scroll counters (ERA), mono kickers (Radian).
5. **Page transitions** (Barba, Swup or View Transitions) on 5/15. The jury lists "Page transitions" as a featured element.
6. **Bespoke details in boring places:** the cookie card in the display script (ERA), a CTA catalogue card (Floema), a signature scan (White Desert), arrow micro-animations (ANAI).

---

## 6. Signature techniques worth stealing (with implementation detail)

1. **Monumental word behind or over the subject (White Desert).** H1 is a condensed sans at `clamp(120px, 18vw, 320px)`, `line-height:.9`, uppercase, white, anchored to the hero's bottom edge (`position:absolute; bottom:-0.12em`). Load the photo after the type. Fade it `opacity 0→1` over 1.2s with `cubic-bezier(.16,1,.3,1)` so the word is seen first. Later sections reuse the device at 30–40% opacity over landscape ("CPT – WFR").
2. **Opacity-index feature list (Radian).** A sticky left column lists 5–7 features at 48px. Inactive items get `color: rgb(ink / .2)` and the active one is full ink. ScrollTrigger (one per item, `start:"top center"`) toggles the active state with a 0.3s colour transition while the right column swaps media.
3. **Client-name stack with background video (Bennett & Clive).** Right-aligned list, 150px, `letter-spacing:-.07em; line-height:.77`. On scroll, the active name pins top-left and its `<video muted playsinline>` crossfades in behind. Mini header with `mix-blend-mode:difference` stays readable on both black and video.
4. **Blur-state typography (Elva).** Render the same word twice: 116px with `filter: blur(10–20px)` and opacity .3, plus a 13px crisp label. Reveal a section by tweening `filter: blur(20px)→0` + `opacity` over 0.8s power2.out. Cheap, cinematic and very 2026.
5. **Arch section divider + text on path (ERA).** `border-radius: 720px 720px 0 0` on a full-width section that translates up over the previous pinned image (ScrollTrigger scrub). The title sits on an SVG `<textPath>` following the arch's curve.
6. **Grid-made-visible brand system (Dropbox).** Draw 1px `rgba(0,97,254,.12)` grid lines as a background layer. Content snaps to cells, colour blocks slide along grid tracks (translate in 0.7–1.2s, `cubic-bezier(.2,.1,0,1)`), and tiles use a dark tint of their own hue for text.
7. **Mascot progress rail (Serve).** A fixed 1px vertical line at `left: 16px` with a 16px icon whose `top` maps to section scroll progress; tint it with the brand mint.
8. **Viewfinder corner brackets (Kriss, Serve).** Four 8×8px L-shaped pseudo-elements (`border-top/left: 1px`) around buttons, nav and cards. On hover they expand outward by 4px in 0.3s. Signals "precision / AI / camera".
9. **Counts in parentheses + inline thumbnail (Floema).** `Urban (51)` at 57px with a 64px square product image inserted between word and count. The image scales in from 0.6 with `cubic-bezier(0.34,1.56,0.64,1)`.
10. **Ambient light (Floema).** A large blurred leaf-shadow PNG over the paper background, `animation: leafShadowDrift 60s linear infinite alternate` (translate and rotate a few degrees). Makes a static page feel outdoors.
11. **Path-ribbon headline (MindMarket).** A Rive or SVG stroke path drawn across a photo with `stroke-dashoffset` scrubbed by scroll; text on the path ("Connecting you to your audience").
12. **Lights-up product reveal (Radian).** The hero video/frames start black with only the emissive part visible. Ramp the exposure (CSS `filter: brightness(.05)→1` over 1.6s expo-out) and then fade the UI in with 0.08s staggers.
13. **Random-order stagger for grids (ANAI, Bennett).** `gsap.from(items,{opacity:0,y:20,stagger:{each:.08,from:"random"},ease:"power1.out",duration:1})` feels organic and less "template" than left-to-right.
14. **Mixed-font headline (Lando, Pasqua, ERA).** One display face for the sentence, a second (heavier, or script, or serif italic) for one or two words. Keep the size identical so the swap reads as emphasis, not hierarchy.
15. **Live clocks / coordinates footer (Bennett, White Desert).** `Intl.DateTimeFormat` per office city and lat/long strings in 10–12px uppercase at +0.1em. Cheap credibility texture.
16. **House eases to standardise on:**
    - `--ease-out-expo: cubic-bezier(0.19,1,0.22,1)` for reveals
    - `--ease-out-quint: cubic-bezier(0.16,1,0.3,1)` for images
    - `--ease-in-out-quart: cubic-bezier(0.76,0,0.24,1)` for page/section wipes
    - `--ease-osmo: cubic-bezier(0.625,0.05,0,1)` for UI slides
    - `--ease-calm: cubic-bezier(0.104,0.204,0.492,1)` for the Japanese calm feel
    - `--ease-pop: cubic-bezier(0.34,1.56,0.64,1)` for small overshoot pops

---

## 7. 2025–2026 trend read

**Current (seen repeatedly in 2025–26 winners):**
- **Warm off-white paper and tinted near-black**, never #FFF/#000 on editorial sites. Olive, aubergine and navy as "black" (ERA, Lando, Tengile, Radian).
- **One acid or saturated accent** taken from the product or brand object (helmet lime, bike yellow, robot mint, expedition orange).
- **Light-weight large serifs** (PP Fragment 220, PP Eiko 400, condensed didones) for luxury and hospitality, paired with neutral grotesks for UI. Serif comeback is strongest in real estate, travel and wine.
- **Single-family grotesk systems** with aggressive negative tracking (Inter at −0.06em). "No bold" systems where everything is 400/500.
- **Edge-hugging layouts** (12–32px margins) with the full 1440 width used and giant type touching the edges.
- **Glass in small doses** for nav and cards (backdrop-filter on White Desert, Kriss, Serve, Floema): small, functional and with inset hairline highlights. Not full glassmorphism UI.
- **Blur-to-focus** as a reveal (Elva; White Desert SVG filters).
- **Native platform motion is creeping in:** View Transitions (Serve), CSS-only sophisticated easing (Dropbox), Tailwind v4 oklab colours. GSAP + Lenis is still the default on 9/15.
- **Rive** for illustration motion (MindMarket). **Springs** for product personas (Elva).
- **Coordinates, counters, mono kickers and route codes** as "data texture".
- **Branded loaders are back and longer** (several gates/"start experience"). Juries like them; users and crawlers don't (the headless capture failed on 5/15).

**Fading / dated:**
- **Bento grids of feature cards** appear only as a brand-guideline index (Dropbox) and are absent from winning marketing homepages here. Treat bento as dated for heroes and features; acceptable as navigation.
- Heavy glassmorphism, purple-blue gradient blobs and "AI glow" backgrounds: none of the 2025–26 winners use them (Kriss 2024 is the closest, and it is muted mauve).
- Brutalism with raw borders: not present among winners; brutal *typography* (Bennett) survives, but on a clean layout.
- Custom cursors: present on 5/15 but small (labels like "Next"), not giant blob followers.
- Variable fonts: used (Mona Sans, Dropbox Sharp, PP Fragment), but not as a visible animated "variable weight wave" gimmick.
- Scroll-driven CSS (`animation-timeline`): not detected on any site here. GSAP ScrollTrigger still rules.

---

## 8. What these sites never do
- Never use more than 3 typefaces (and 5/15 use only one).
- Never set display type with positive tracking or bold-by-default. Display weight is 400–500 unless the brand typeface is a display cut.
- Never centre-stack a hero of headline + subhead + two buttons + trust logos (the SaaS template). Heroes are one line, or one word over an image.
- Never use stock-gradient backgrounds, emoji icons, or generic 3-column "feature card with icon" rows.
- Never use pure #000 text on pure #FFF on editorial or luxury sites. (Bennett is the deliberate exception: pure B/W with video.)
- Never use large border radii on photos (2–12px; MindMarket's playful 25px is the max), except purposeful arches or circles.
- Never use drop shadows for depth (box-shadow nearly absent; depth comes from overlap, blur and parallax).
- Never use a generic loader spinner. Loaders are branded (logo draw, counter, monogram morph, eyes). Tengile's tiny spinner on olive is the only plain one.
- Never have uniform section rhythm. Pinned scenes, full-bleed photos, narrow text columns and giant type alternate.
- Never write generic copy. Every site has a voice line ("THE OPPOSITE OF CHAOTIC.", "Why move a 2-pound burrito in a 2-ton car?", "DESIGNED AS A COMMUNITY, NOT A COMPLEX.").

---

## 9. Rankings — best 5 references for the skill (and why)

1. **White Desert (Malvah)** is the best all-round template for "agency-grade premium". It has monumental type over a subject, a strict 3-font role system, a 12-col 12px-gutter grid, one orange accent, coordinates as texture, glass nav, grain, fast WPO and Studio-of-the-Year authorship. Highly reproducible with Next + GSAP + Lenis.
2. **ERA Residence (The First The Last)** is the luxury-editorial playbook: arch dividers, text on path, serif + script pairing, day/night toggle, bespoke cookie card. Two consecutive SOTMs for the studio. Shows how far you can push ornament without clutter.
3. **Bennett & Clive (Spatzek)** shows the maximum effect from minimum means: one font, B/W, giant −0.07em type, video behind names, difference-blend header. The best reference for type-led portfolios or agency sites.
4. **Radian (UNCOMMON)** is the best product-launch reference: lights-up reveal, opacity-index feature list, mono kickers, coordinate callouts and product-colour CTA. Webflow-buildable, so realistic for a coding agent.
5. **MindMarket (Louis Paquet / KOKI-KIKO)** is the best B2B-with-personality reference: Inter only, −0.06em display, illustrated cast, Rive path ribbon and stacked cards. Proof that a "boring" research firm can win SOTM.

Honourable: Floema (single-font calm + ambient light + category index), Dropbox Brand (visible-grid system), Serve (one-motif brand), Lando (SOTY; neon accent and mixed-font headlines).

**Gaps / to-do (not done):** Godly, Land-book and Siteinspire "most saved" lists not surveyed. FWA of the Year and Webby website winners not verified (FWA returned HTTP 500). Japanese school: ANAI was loader-gated and otsuka-air.jp produced no data, but **SOIL (Shhh) was captured fully** (§4.16). Igloo, Lando, Elva and Pasqua were only captured at their loaders.

---

## Appendix A — Gap-fill teardowns (analyzed after the first write-up)

### 4.16 SOIL — Shhh (Tokyo) · Awwwards SOTD Nov 2025
- **Hero (seen):** a white page under a thin uppercase 9px nav strung across the full width ("HOME: · WORKS · JOURNAL · NEWS · ABOUT · CONTACT · MENU", evenly justified). Below it, **"S O I L" in a high-contrast serif, letter-spaced to span the whole 1440 width** (each letter pinned to a column), between two heavy black rules. Under that is a news slider: a centred portrait photo with the headline split *around* the photo on ruled lines ("JAPAN ▢ SELECTION / IN / 2026"). Successive lines fade grey, like text written on ledger paper. Tiny pause/play and ← → controls.
- **Sequence (seen):** a numbered **accordion index of productions** separated by thick 6–8px black rules ("1. THE LIFE OF HOKUSAI … 8. TALES OF THE ELSEWHERE ISLANDS"). The open item shows a two-line uppercase title, a poster image with a "View More View More…" marquee ticker across it, and a spec table on hairlines ("Performing Group: / Genre: / Status:"). Then a journal grid of 4 cards with date + category on a rule ("2026.8.11 — Interview"). The page ends on a black contact section: "REACH OUT TO US" centred serif with hairline rules, a diagonal hairline crossing the section, and a giant "CONTACT" at 140px.
- **Type (measured):** SeasonMix (serif display) at 84px / 500 / **−0.04em**, lh 1.0, uppercase, for production titles; 140px for CONTACT (−0.04em). akzidenz-grotesk-next-pro 500/700 at 14–20px, −0.03em, for UI and specs. Only 9% uppercase overall (the uppercase is concentrated in titles).
- **Colour:** `#1C1D1E` ink, `#FFFFFF`, `#B4B7BB` grey. Monochrome; the photography carries colour.
- **Grid:** 4-col with a 0.93% gap; **20px side margins**. Radii 2–4px.
- **Motion (CSS):** `cubic-bezier(0.16,1,0.3,1)` (expo-out-ish) and `(0.33,1,0.68,1)` cubic-out. Keyframes `lineShow/lineHide` (rules draw in), `clipIn/clipOut` (image wipes), `arrowR/arrowRIn` (arrow exit/re-enter, same idea as ANAI), `blink`, `loop` (marquee). 0.3s hovers, 0.8–1.2s reveals. Lenis. 8 sticky elements.
- **Signature moves (Japanese editorial school):** rules as the main structural element (thick for sections, hair for rows); a justified, letter-spaced wordmark spanning the grid; headline text flowing around an inline photo; spec tables with colon labels; arrows that animate out and back in.

### 4.17 Seventeen — Malvah · SOTD Dec 2025 + Developer award
- **Intro (seen):** a warm grey `#AFAEA7` screen with a small white "17"-ish monogram.
- **Hero (seen):** white. A **vertical totem of solid colour bars** (red `#C13437`, navy `#275D82`, green, lime, ochre, teal, pink, blue, brown, lilac, mint) stacked centrally, each a different width, forming a stepped diamond. On scroll the stack collapses into a narrow column and individual bars jut out left/right as you pass through it, like a sorted spectrum or a stack of project "spines". Left-middle is a 7-item service list (Campaign, Branding, Strategy, Design, Motion, Live Action, Experience) in 14px grey, where the active items turn black. Top-left monogram, top-right grey-tag buttons "✱ About Contact". Bottom-right "A Creative Agency". A tiny animated "eye-lash" glyph right-middle. A project label on a grey tag ("Elemis — Beauty beneath the surface") changes per bar.
- **Type (measured):** **one font, Bagoss Condensed 400, at 14px and 18px only.** No display type at all; the colour bars *are* the headline.
- **Colour:** white field, grey UI tags `#AFAEA7`, black text. Each bar's colour is presumably keyed to a project (I saw only the label for Elemis, so the mapping is unverified).
- **Stack (measured):** Webflow, GSAP + ScrollTrigger, Lenis, Barba, three.js and Lottie. Custom cursor. A 17-col grid with 5px gap is the bar layout. Length = 1 viewport (scroll is hijacked into the bar animation).
- **Lesson:** an agency homepage with **zero large type**. The navigation device (colour-spine index) is the brand idea. This was the Malvah piece cited in the Studio-of-the-Year coverage ("colourful bold blocks for Seventeen").

### 4.18 Vast — Antinomy Studio · SOTD Apr 2026
- **Hero (seen):** a full-bleed video of the Haven-1 station in a clean room, then a close-up of hatch hardware. "Building next-generation space infrastructure" sits bottom-left in white at 76px **Owners 500, lh 0.86**, tight. A small "|| Watch full video" control. The nav is a white bar with the spaced geometric "VAST" wordmark, plain links, and a single solid "Create your mission" button. It becomes a floating inset white panel on scroll.
- **Sequence (seen):** a taupe `#B3ABA3` statement panel with a 36–48px white paragraph ("Vast is developing next-generation space stations… incremental, hardware-rich and low-cost approach.") and "+" corner marks. Then **"Haven-1" at 346px in barely-there `#ECE8E3` on cream**, with the station render floating over the giant word, a dotted orbital circle drawn behind, and a mono spec block in the corner ("CREW: 4 · HEIGHT: 10.1 M · HABITABLE VOLUME: 45 M³ · MASS: 14,600 KG · ORBIT: 51.6°, 425 KM") with an orange `#FF5623` "LAUNCHING 2027" tag. Then "Haven-1 hardware development progress", a press-quote carousel with vertical hairline dividers, a logo row (SpaceNews, CNBC, Reuters, Nikkei Asia), and update cards with mono date + orange square bullet. A black newsletter footer.
- **Type (measured):** Owners (display 48–346px, 400/500) + Owners Text + **Phonic** (mono-ish labels at 10–12px, +0.01em). Display tracking is *normal to slightly positive* (+0.01em at 48px), unusual among the winners. 35% uppercase (labels).
- **Colour:** `#2A2C2F` ink, white, warm taupe `#897F75` / `#B3ABA3`, cream `#ECE8E3`, safety orange `#FF5623` (used only on tiny markers).
- **Motion (JS):** **expo.out ×32 at 1s** is the house ease; sine.out ×22; power3.inOut for wipes. Staggers 0.05–0.07. Lenis lerp .3 (snappier than the usual .1). Barba transitions. CSS `cubic-bezier(0.62,0.05,0.01,0.99)` and quart-inOut. 59 backdrop-filter elements (glass video controls/nav). `filter: brightness(0) saturate(1)` ×102 recolours logos to flat black.
- **Signature moves:** a giant pale product name behind the product render; a technical spec sheet in mono as decoration; one orange marker colour for status; mission-style CTA copy ("Create your mission").

### Updated cross-site notes from A.16–A.18
- Japanese editorial (Shhh, Garden Eight) leans on **rules, spec tables, letter-spaced wordmarks and directional arrow micro-animations**. Its eases are soft expo/cubic-out, and its margins are 20–120px.
- Two more confirmations of the "single accent used only for tiny status markers" rule: White Desert `#FF7E15` and Vast `#FF5623`.
- "Giant pale word behind the hero object" now appears 3× (White Desert CPT–WFR, Vast Haven-1, Lando helmets section). It is a strong, reusable 2025–26 move: 250–350px, colour within ~5% luminance of the background.
- Agency homepages that won (Seventeen, Bennett & Clive) **replace the hero headline with an interactive index of their work**.
