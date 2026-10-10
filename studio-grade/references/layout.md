# Layout: grids, rhythm, hero archetypes, section patterns

## 1. Containers and margins (measured at 1440px)

Side margins fall into **three camps**. Pick one deliberately:
- **Edge-hugging, 12–48px:** fashion, editorial, award sites, "framed panel" SaaS. White Desert 12, Ayocin 18, SOIL 20, Akris 20, Vercel 24, Factory 24, Pentagram 24, Drake 32, Totême 32, Fluid Glass 36, Fondation Cartier 40, AlphaSense 48.
- **SaaS standard, 64–104px:** Ramp 64, Obama 60, AIC 68, Linear 80, Anthropic 78, TIME 80, Stripe 104, Resend 104 (content 1266–1312px).
- **Generous, 106–208px:** editorial and luxury calm. Populous 106, Studio D 118, Exo Ape 120, Aesop 120–135, Family 184, Mercury ~208 (content 1072–1200px).

Nothing good lives in the ambiguous 50–60px zone *by accident*. Content containers usually sit at **1200–1312px**, or are fluid with margins only.

## 2. Grids

- **12-col** is the default (gutter 16–24px SaaS, 20px editorial, 12px edge-hugging, 40–72px institutional).
- **Dense grids** (15/16/24/30-col) are for asymmetric placement: Studio D 16-col, Fluid Glass 24-col / 18px, Pixelflakes 15-col, Kinfolk 30-col, Steve Jobs Archive 30-col / 0 gap, Mintlify and Cursor 24-col. Use them when images should scatter and never align in a row.
- **Hairline grids:** `display:grid; gap:1px; background:var(--hairline)` with children on `var(--paper)`. This gives shared 1px borders with no doubling (Attio).
- **Visible grid as design:** rails at the container edges (Stripe, Attio, Mintlify, ElevenLabs, ZeroLeaks), dashed construction lines (Baseten), crosshair intersections (Terminal, ICOMAT), a faint vertical grid over the hero (White Desert), a blue construction grid (Dropbox Brand). This is one of the cheapest ways to make a page feel engineered. Use it at 4–8% ink.
- Ship a **dev grid overlay** toggle (AREA 17's `--grid-column-bg: rgba(127,255,255,.25)`) while building.

## 3. Vertical rhythm

- Section padding is **96–144px** (Resend and Superhuman 96, Family 120, Linear 128, Apple 144, Raycast hero 224). The *visual* gap between chapters is **160–300px**, because content blocks are short and the whitespace does the hierarchy.
- Use a fluid spacing ladder (AREA 17 / Menil): `--space-7: clamp(4rem, 3rem + 2.67vw, 6rem); --space-8: clamp(6rem, 4rem + 5.33vw, 10rem); --space-9: clamp(8rem, 6rem + 5.33vw, 12rem)`.
- **Vary density.** A tight stat band → a 300px void → a full-bleed image → a narrow text column. A uniform rhythm across sections is a template tell.
- **Page length (viewports at 900px):** SaaS 9–10 (Factory 10.1, Mintlify 9.4, Cursor 9.1); luxury commerce 3–9 (Totême 3.4); institutional 7–12; award and editorial 12–23; long-form launches and real estate up to 21–28.

## 4. Hero archetypes (pick one; each is measured)

| # | Archetype | Spec | Seen on |
|---|---|---|---|
| H1 | **Left text + product UI below** | h1 left at x = margin, top ~280px; UI frame starts ~58% down, full container width, bleeds below the fold; mask-fade at the bottom | Linear, Ramp, Attio |
| H2 | **Left text + UI bleeding off the right edge** | text in the left 45%; the UI starts at ~41% of the width and is cropped by the viewport edge; soft glow behind its top edge | Mintlify |
| H3 | **Centered stack + install line + framed product** | logomark → h1 (≤2 lines) → mono subline → 2 small buttons → `curl` box → an inset 6px-radius frame with the app on a fake OS desktop | Factory |
| H4 | **One word** | small label over a single huge word (~107px, 0.9 lh, −0.045em) + a mono subline | Black Forest Labs |
| H5 | **Monumental word over subject** | condensed 256–320px word anchored to the hero bottom; the photo fades in after the type | White Desert, Ayocin (object in front of the wordmark), Vast |
| H6 | **Photo card with corner-anchored UI** | full-viewport photo inset 18px, radius 16; h1 top-left; video thumbnail bottom-left; buy button bottom-right + stock line | Daylight |
| H7 | **Headline bottom-left over film** | 72–80px, 3 lines, white, bottom-left; nav overlaid; scroll hint | Populous, ICOMAT, Vast, Inversa |
| H8 | **Statement only** | a 54px serif statement after ~480px of whitespace; line-by-line ink-in | Steve Jobs Archive, Fondation Cartier |
| H9 | **Small image, big room** | a portrait image at 30vw centered 120px from the top on white; 18px caption | Totême |
| H10 | **80vh film + bottom caption** | 80svh so the next heading peeks; a bottom scrim; kicker → 31px title → dek → wide ghost button | Aesop |
| H11 | **Rotating noun sentence** | "[A campus] that brings change home" in two columns; the left word cycles | Obama |
| H12 | **Demo-as-hero** | a 5-word h1 + a playable product panel directly under it (segmented control, orbs, composer) | ElevenLabs, OpenAI |
| H13 | **Index as hero** | the work list *is* the hero (client names with video behind, a colour-spine index) | Bennett & Clive, Seventeen |
| H14 | **Branded loader → reveal** | the loader is a brand object; an aperture or blur reveal into the hero | illoca, Atlas, Cartier 365 |
| H15 | **Transformation pair** | centered or left h1 + ≤2 CTAs; below, two object cards (before → after) with mono filename + metric, the improved metric in accent, an arrow node between them, on a textured stage | convt.app |
| H16 | **Technical drawing as hero** | the product or its subject drawn to scale (SVG) across the full width on a hairline grid; the action drawn as a path or flow; outputs annotated with measured callouts; h1 bottom-left, ≤2 CTAs | Kestrel (test build), Baseten isometrics |

Hero constraints on every archetype: h1 **≤ 2 lines on desktop** (3 max for editorial bottom-left), **≤ 2 CTAs**, and **one** subject. Text sits on the left, the bottom-left, or overlapping the subject; a vertically centered stack is reserved for H3 and H4, which compensate with a strong subject.

## 5. Section pattern library

Use these instead of "three cards in a row".

1. **Feature chapter** (Linear, Vercel): a big two-tone h2 left + a composited product scene + a 2-column list of `+` expanders or 4 feature names. Each chapter is ~1000–1200px tall.
2. **Sticky statement + stacking cards** (BFL): the left column `position:sticky; top:20vh` holds the h2. On the right, cards `position:sticky; top:calc(120px + i*48px)` slide over one another.
3. **Scroll-spy chapter list** (Attio, Dia, Radian): a sticky left list of 3–7 items (active = ink + 2px bar, inactive = 20–40% ink, mono numerals 01/02/03); the right column crossfades the media (300–400ms).
4. **Bento**: acceptable in SaaS feature sections only, *with real UI inside*. Use 2 + 3 or 1 large + 4 small, 8–12px radius, warm fills, a ↗ square button, and two-tone titles. Award juries treat bento as dated for heroes, so never use it as the hero.
5. **Stat band**: 3–4 stats, numeral 44–65px with tabular-nums, 2-line caption, vertical hairline dividers; the first number in ink and the rest grey (Stripe); an accent underline on the active stat. Or **giant mono numerals** (Ayocin 170px at −0.08em).
6. **Logo wall**: monochrome, 7 across in one row, or a 4×4 grid with no borders and no heading, ~150px air around it. Caption with a mono micro-label or a quantified sentence.
7. **Testimonials**: either **one huge serif quote** (Attio 48px Tiempos), a **quote grid of real, named builders** with roles (Cursor: 3×2), or a **2-row opposite-direction marquee** with edge fades (Ramp, Resend). Never 5-star carousels.
8. **Customer proof chapter** (Vercel): headline + a grayscale screenshot of the customer's real site + one quantified sentence.
9. **Accordion case studies** (Stripe): one big editorial photo + a list of other customers with `+`.
10. **Asymmetric bleed split** (Aesop): image ~2× the text column, bleeding to the viewport edge, alternating sides, with 200–300px of air between splits.
11. **Zero-gutter 2-up tiles** (Totême, Magda): 4:5 or 100vh tiles, captions centered near the bottom.
12. **List with hover preview** (Populous): a label in col 1 and a list in col 2 with hairline separators; a floating image preview follows the cursor on hover.
13. **Service rows as giant words** (FIND): number in a circle | short paragraph | a 180px word | an arrow that slides in on hover.
14. **Picture-in-picture project slide** (Studio D): a full-bleed image + an inset image of the same project + a 96px title overlapping both.
15. **Spec table** (Anthropic, SOIL, Vast): mono uppercase keys, right-aligned values, hairline rows. Use it as card footers, product specs, or event details.
16. **Prose-as-navigation lede** (AIC): a 38px grey serif paragraph whose key nouns are underlined accent links.
17. **Opacity-index feature list** (Radian): a teleprompter-like sticky list where only the active item is in full ink.
18. **Calculator / interactive proof** (Terminal, Agent Arcade): underline inputs + a dark result panel with a big tabular number.
19. **Founder letter** (Daylight, Lightfield): an 18–21px serif or sans at a ~520–560px measure, with a signature scan.
20. **Domain-object cards** (convt): 3–4 category cards where each visual is a *miniature of the object* (a photo, a tiny video player with scrubber, a waveform, a stack of pages), with the title left, a count right, and mono chips. This is the legitimate alternative to icon cards.
21. **Architecture tree** (convt): a root node chip ("convt picks the engine") with 1px accent branch lines and dot terminals fanning out to 3–4 cards. Each card has a mono transformation line (`clip.mov → clip.mp4`), a title, a description, a hairline, and a mono spec list.
22. **Finale CTA**: one confident line at 56–96px (or a 16vw condensed ask), one sentence, 1–2 buttons, then the mega footer.

## 6. Composition moves that read as "designed"

- **Type and object layering:** put the product in front of a full-width wordmark (Ayocin), the headline trespassing into an image (Studio D), archival cards fanned over display type (Scout), or testimonial cards overlapping a giant headline (Daylight).
- **Bleed:** media cropped by the viewport edge implies scale (Mintlify, Aesop, Daylight's rail starting at x=345).
- **Offsets:** stepped headline lines (Atlas "OF AUTONOMY" indented right; Tengile), diagonal text/carousel offset (Aman), a hanging first-line indent (Pixelflakes).
- **Ruled viewports:** divide the hero into bands with 1px rules and put metadata in the corners ("© 2026", "SCROLL DOWN", "Since 2021", "EST 2022").
- **Frames:** inset rounded panels for the hero media and footer (Factory, 24px inset, 6px radius) make the page feel framed and deliberate.

## 7. Navigation forms

| Form | Spec | Use for |
|---|---|---|
| Transparent bar → hairline on scroll | 52–73px; links 13–14px grey; one pill CTA right | SaaS (Linear, Vercel) |
| Floating capsule | inset 16px from the top, ~1200px wide, 12–16px radius, 1px border, backdrop-blur | Raycast, Terminal, ICOMAT, Lightfield |
| Floating centered bar | logo + 3 links + CTA, white on paper | illoca, MindMarket |
| Bottom dock | fixed bottom-center capsule ~250×44: icon │ current page │ burger | Fluid Glass |
| Wordmark + Menu circle | logo collapses to a monogram on scroll | Studio D, Inversa, Exo Ape |
| Grid-column index | links as 2 stacked columns aligned to grid columns | Populous, Pixelflakes |
| Boxed cells | adjacent 1px-bordered cells, 12px mono caps, 44px tall | The Drake, Atlas micro-tabs |
| Centered wordmark | left text links, right icons (bag, account) | luxury commerce (8 of 9) |
| Booking masthead | the header is the booking form | hospitality (Ace) |
| Sticky local nav | product name + section links + persistent Buy pill | product pages (Apple) |

Rules: 3–7 visible items. Everything else goes in a drawer or mega panel. The primary CTA in the nav sits at h32–36 with 13–14px text.

## 8. Mobile (390px): its own composition

- h1 36–44px for sentences across 3–4 lines; word display ~15–18vw.
- CTAs stacked and full-width (or two half-width pills side by side, as Mercury does). Height ≥ 44px.
- **Recompose, don't shrink.** Product UI is cropped to its most legible region rather than swapped for a phone mock (Linear). Illustrations collapse into a row (Family). The wordmark rotates from vertical to horizontal (JW Anderson). Hero imagery gets a portrait crop.
- Margins are 16–24px. Logo grids go to 2–3 columns. Sticky CTAs persist (Ramp ticker, Mintlify "Ask assistant" pill).
- Hide custom cursors and heavy WebGL on touch; swap in a poster or video.
- Test for horizontal overflow; giant display type is the usual culprit, so use `clamp()` with a vw term and `overflow-wrap:anywhere` on long words.
