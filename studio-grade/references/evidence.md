# Evidence: where the numbers come from

Method: each live client site was loaded in headless Chrome at 1440×900 (plus a 390px mobile pass), scrolled with real wheel events so Lenis and ScrollTrigger fired, and screenshotted at intro frames (350 / 900 / 1800 / 3200ms) and through the scroll. The analyzer read computed styles from about 6,000 elements per page (type, colour, radii, grids, effects) and mined CSS and JS bundles for cubic-beziers, GSAP eases, durations, staggers, spring configs, and Lenis settings. Credits were verified against studio case studies, footer credits, or Awwwards profiles. Research ran 2026-10-06/07. **99 live sites, 8 clusters** (98 from the seven research clusters + convt.app as a user-supplied reference).

## Aggregate measurements (n ≈ 94–98)

- **Largest text:** p10 30 · p25 48 · **median 67** · p75 110 · p90 173 px
- **Letter-spacing of largest text:** p10 −0.05 · p25 −0.03 · **median −0.015** · p75 0 · p90 0 em. Negative on 53 of 94.
- **Line-height of largest text:** p10 0.90 · p25 0.97 · **median 1.00** · p75 1.10 · p90 1.33
- **Body size:** p10 14 · p25 14 · **median 15** · p75 16 · p90 18 px
- **Words in h1:** p10 2 · p25 3 · **median 4** · p75 5 · p90 9
- **Uppercase share of text nodes:** median 4% (p75 18%, p90 56%)
- **Distinct families:** median 2 (p90 3)
- **Body background:** 19 dark (<60 L), 45 light (>200). Of the light ones, 18 off-white (230–252) and 25 pure white.
- **Page length:** median 8.1 viewports (p25 3, p75 14.5, p90 20.2)
- **Most common radii:** 4px (23 sites), 2px, 6px, 50%, 9999px, 8px, 12px
- **Most common CSS eases:** `(0.4,0,0.2,1)` (34), `(0,0,0.2,1)` (17), `(0.22,1,0.36,1)` (16), `(0.215,0.61,0.355,1)` (15), `(0.16,1,0.3,1)` (14), `(0.19,1,0.22,1)` (13), `(0.23,1,0.32,1)` (11), `(0.76,0,0.24,1)` (6), `(0.77,0,0.175,1)` (6)
- **Most common GSAP eases:** none/linear (scrub), `power2.out`, `power2.inOut`, `power4`, `expo`, `power3.out`, `expo.inOut`
- **Springs:** `stiffness 500 / damping 25` (10 sites), `stiffness 100 / damping 10–20`, `mass 4 / stiffness 800 / damping 80`
- **Stack signals:** canvas 41, Next.js 36, split-text 27, Lenis 26, three.js 21, Nuxt 13, Swup 8, Shopify 7, Webflow 5, Astro 5, Theatre.js 4, Barba 3, Rive 3, Locomotive (legacy) 4
- **Cluster contrasts:** Lenis on 0 of 16 tech sites and 0 of 15 big-agency sites, but 14 of 17 editorial and 9 of 15 award sites. Preloaders on 13 of 14 immersive sites and 0 of 15 big-agency sites.

## Sites and credits by cluster

**A. SaaS / AI studios:** factory.ai (basement.studio) · daylightcomputer.com (basement, Awwwards SOTD) · bfl.ai (basement) · mintlify.com (basement, 2026) · baseten.co (basement) · cursor.com (basement + in-house) · sierra.ai (Bakken & Bæck) · agentarcade.io and zeroleaks.ai (kargul.studio, the lower-tier contrast).

**B. Tech gold standard (mostly in-house):** linear.app · stripe.com · vercel.com · raycast.com · mercury.com · anthropic.com (identity by Geist) · family.co · ramp.com (Red Antler brand; Bakken & Bæck product graphics) · resend.com · attio.com · diabrowser.com · apple.com/macbook-pro · openai.com · superhuman.com · teenage.engineering · rive.app.

**C. Immersive / WebGL:** atlasmotion.com, oryzo.ai, everswap.com, choochooworld.com (Lusion) · davidwhyte.com/experience, chartogne-taillet.com, 100lostspecies.com, Cartier Watches & Wonders, GQ×AP Extraordinary Lab (Immersive Garden) · symphonyofvines.com, hubtown.co.in, illoca.unseen.co (Unseen Studio) · 365ayearof.cartier.com (14islands) · immersivebags.miumiu.com (Merci-Michel) · BOSS Dubai (Dogstudio/DEPT) · activetheory.net.

**D. Editorial craft:** populous.com, thedrake.ca, scoutmotors.com (Locomotive) · studiod.nu, inversa.com, amaterasu.ai, fluid.glass, pixelflakes.com (Exo Ape) · glyphic.bio, ayocin.com (Obys) · terminal-industries.com, icomat.co.uk, noovolife.com (Rejouice) · findrealestate.com (Cuberto) · makersfund.com (monopo) · lightfield.app (darkroom.engineering).

**E. Big-brand agencies:** obama.org, stevejobsarchive.com, jwanderson.com, aesop.com (Work & Co) · artic.edu, fondationcartier.com, lucasmuseum.org, menil.org, elevenlabs.io, pentagram.com (AREA 17) · ouraring.com, alpha-sense.com, eamesinstitute.org (Instrument) · norton.org (Koto rebrand) · time.com (Code and Theory).

**F. Fashion / luxury / commerce:** aesop.com (Work & Co lineage) · toteme-studio.com (We Make Websites, +11% CR) · magdabutrym.com (Ania et Lucie / Commerce-UI) · us.akris.com, suitsupply.com, rogervivier.com (Build in Amsterdam) · kinfolk.com (Six) · aman.com (Colville-Walker) · acehotel.com (Atelier Ace) · byredo.com (Vaimo) · us.carhartt-wip.com (Commerce-UI).

**G. Award sweep 2023–26:** landonorris.com (OFF+BRAND, SOTY 2025) · igloo.inc (abeto + Bureaux, SOTY 2024) · era-residence.com (The First The Last, SOTM Aug 2026) · floema.com (Bürocratik, SOTM May 2026) · brand.dropbox.com (Daybreak, SOTM Feb 2025) · kriss.ai (Studio 28K, SOTM Oct 2024) · mindmarket.com (Louis Paquet / KOKI-KIKO, SOTM Dec 2025) · white-desert.com (Malvah, Studio of the Year 2025) · serverobotics.com (WILD) · elva-labs.com (Lazarev.) · anaiwood.com (Garden Eight) · tengilemalamala.com (DashDigital) · bennettandclive.com (Spatzek, SOTM Mar 2024) · pasqua.it (Adoratorio, SOTM Jun 2023) · rideradian.com (UNCOMMON) · soil-net.jp (Shhh) · seventeenagency.com (Malvah) · vastspace.com (Antinomy).

**H. User-supplied references:** convt.app (indie Rust utility; the small-product reference for Engineered Dark: transformation pair, halftone stage, domain-object cards, engine tree, tactile button shadows).

## What the award juries reward

Awwwards weights Design 40%, Usability 30%, Creativity 20%, and Content 10%. Animations/Transitions was the top dev sub-score on 13 of 14 winners (7.4–9.6). Accessibility and Markup were the lowest (6.4–7.4). The skill keeps the craft and refuses the accessibility trade-off.

## Honest limits

- Several WebGL sites never got past their loaders in headless capture. For those, the loader, DOM type, and mined motion values are measured; the 3D scenes are described from jury notes, not observation.
- Fonts on top sites are mostly licensed. The free substitutes in typography.md are judgment calls by character, not measurements.
- Sites evolve after hand-off. Credits reflect the studio's case study at the time of research.
