# Anti-slop: every AI tell, with its fix

Use this file as a checklist when reviewing your own output or auditing a redesign. Each "tell" was conspicuously absent across the top-tier sites studied. Each "fix" is what those sites do instead.

## The canonical slop page (recognize it instantly)

> A sticky white navbar with logo + 5 links + "Get Started" → a pill badge "✨ Introducing X" → a centered 64px **bold** Inter headline with one **purple-to-blue gradient word** → a grey subhead → two equally loud buttons → "Trusted by" + full-colour logos → **three cards with an icon in a rounded square, a title, and 2 lines** → an alternating image-left/text-right feature row ×3 with drop-shadowed screenshots → a stats row "10x / 99% / 24/7" → a testimonial carousel with 5 stars → a 3-tier pricing table with a "Most popular" glow → an FAQ accordion → a gradient CTA banner "Ready to get started? 🚀" → a 4-column tiny footer. Purple glow blobs float in the background. Everything is centered and fades up on scroll.

Every element above is a fixable tell. The table below maps each one to its fix.

## Tells and fixes

| # | Tell | Fix (what the top tier does) |
|---|---|---|
| 1 | Purple→blue / rainbow gradient blobs, mesh backgrounds, "AI glow" orbs | A flat tinted paper; texture from light, lens, grain, or a domain ornament (imagery.md §3) |
| 2 | Gradient text on headline words | A two-tone heading (ink + 60% ink) or one accent last word (AlphaSense) |
| 3 | Bold 700–800 display, everything Inter at the default −0.02em | Weight 300–510; tracking scaled by size; a tuned or characterful family |
| 4 | Badge-pill "✨ New" above every hero | Omit it, or use a *real* changelog link aligned right ("New: Loops →", Linear) or a live proof chip with a number (Mintlify) |
| 5 | Centered hero stack with two equal buttons | A left or bottom-left hero; primary solid + ghost/text secondary; max 2 |
| 6 | Hero subject = an abstract 3D shape or illustration-pack figure | The product UI rebuilt in HTML, the product photographed, or type as the image |
| 7 | Three icon-in-rounded-square feature cards | Feature chapters with real media; numbered typographic blocks (01/02/03); a hairline cell grid; **domain-object cards** where each visual is a miniature of the thing (convt) |
| 8 | Alternating image/text rows of equal size | Asymmetric bleed splits (image ≈ 2× text, bleeding off-screen), sticky scroll-spy, stacking cards |
| 9 | Drop shadows on every card, `shadow-lg` everywhere | No container, or a 1px ring / 2–4% fill; real shadow only on floating product windows |
| 10 | Large radius (16–32px) on everything | One radius camp: 0–4px, 6–10px, or pill for buttons; 4–12px cards (except playful and media) |
| 11 | Full-colour "Trusted by" logo bar | Monochrome logos, mono caption or quantified sentence, ~150px air |
| 12 | "10x faster / 99% uptime / 24/7 support" | Precise, footnoted, sourced numbers ("99.999%", "1.72802563%"), or omit them |
| 13 | 5-star testimonial carousel, "Sarah J., CEO" | Named people + roles + avatars; one big serif quote, or a quote grid; opposite-direction marquee |
| 14 | Generic gradient CTA banner "Ready to get started? 🚀" | One confident finale line in the brand's voice + 1–2 buttons, then a real footer |
| 15 | Tiny 4-column footer with © and socials | A finale + 4–6 column mega footer + one craft detail (clock, marquee, status, hours) |
| 16 | Emoji as icons or in headings | Typographic glyphs (→ ↗ ● ◆ ⊕ +), mono numerals, or a single line-icon set used rarely |
| 17 | Hype verbs (Supercharge, Unleash, Elevate, Seamless…) | The category claim, the pun, the imperative, or the two-beat formula (copy.md) |
| 18 | Pure #000 on #FFF or #FFF on #000 | Tinted ink on tinted paper (`#171717` on `#FAFAFA`; `#F7F8F8` on `#08090A`) |
| 19 | 4–6 accent colours, rainbow icons | One accent at under 5% coverage, assigned to 1–2 jobs |
| 20 | Every element fades up 40px on scroll | Reveal only the first element per section; blur-in or ink-in with ≤ 12px movement; expo-out |
| 21 | Bouncy / elastic easing on cards and sections | Expo/quint-out for surfaces; overshoot only on ≤ 64px pops |
| 22 | Glassmorphism cards floating on gradients | Glass only functionally: a nav pill or a caption card over a photo, with an inset hairline highlight |
| 23 | Uniform 80–100px padding on every section, everything centered | A varied rhythm (tight band → 300px void → full-bleed → narrow column); left/asymmetric after the hero |
| 24 | Stock photos of diverse teams at laptops | Subject-specific, art-directed, consistently graded photos, or honest placeholders with shot notes |
| 25 | Lucide icons in circles next to every bullet | No icons in lists; hairline separators; `+` expanders |
| 26 | Default `ease` / `ease-in-out` transitions at 300ms everywhere | One house ease (`cubic-bezier(.16,1,.3,1)`), 150–250ms UI, 600–1000ms reveals |
| 27 | Generic spinner loader / skeletons on a marketing page | No loader (SaaS / commerce), or a branded object-as-progress loader (immersive) |
| 28 | Fake browser mockups with blurred grey bars | A real, plausible UI with domain content and one live state |
| 29 | "Lorem ipsum", "Feature One", "Acme Inc" left in | Real or plausible domain copy throughout |
| 30 | Sections with only a heading + one sentence + an icon | Fewer, denser sections with real media; cut the filler |
| 31 | Pricing cards with a glowing "Most popular" border + gradient | Hairline columns, one emphasized by an ink fill, a 2px top rule, or a 1px accent ring (convt); the price in tabular numerals |
| 32 | Dark mode = black bg + pure white text + neon purple | Tinted near-black, `#EDEDF3`–`#F7F8F8` text, one accent, 8% hairlines, top-edge glow lines |
| 33 | Same layout at mobile, just narrower; giant headline overflowing | A recomposed mobile layout; clamp() type; full-width stacked CTAs; deliberate crops |
| 34 | Outlined / stroked display text, text-shadow | Never on the top tier. Use size, weight contrast, or an overlay of type and image |
| 35 | Over-decoration: ten signature techniques at once | 2–3 signature moves serving one motif |
| 36 | Instrument Serif italic hero word + Inter (2025 AI-editorial default) | Pick a deliberate pairing for the direction (typography.md §6); serif as a second voice with a defined job |
| 37 | Scroll-jacking, smooth scroll on a SaaS page | Native scroll for SaaS and commerce; Lenis only for editorial, place, deep-tech, and immersive |
| 38 | Custom cursor blob that follows everything | None, or a small labelled cursor ("View", "Next") on media only; hidden on touch |

## The "lower-tier" tells (subtler, but juries and clients notice)

From the kargul.studio vs. basement.studio comparison (both competent; one reads tier-1):
- Gradient headline text, 700-weight uppercase display, glow borders and rim lights, five accents, everything centered → "energetic template".
- Black + Geist + rails + centered hero → "generic Vercel-template DNA". Rails are good, but they need a domain motif and an art layer to read as bespoke.
- Glow-tile iconography (icons with blurred coloured glows).
- Coded UI with no art layer behind it.

## Self-review prompts (ask before shipping)

1. Cover the logo. Could this be any other company's site? If yes, the motif and voice are too weak.
2. Squint. Is there exactly one dominant element per viewport?
3. Count the accent pixels. Is it under 5%? Count the typefaces. Is it 3 or fewer? Count the font weights. Is it 3 or fewer?
4. Read every headline aloud. Would a competitor say it unchanged?
5. What is the image in each section? Is it the subject, or decoration?
6. What is the one bespoke detail in a boring place?
7. Does it work with `prefers-reduced-motion`, at 390px, and with the keyboard?
