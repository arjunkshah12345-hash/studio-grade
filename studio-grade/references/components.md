# Components: measured specs

## Buttons

**Choose one radius camp for the whole site:**
- **Square camp (0–4px):** Stripe 4, Factory 3, BFL 2, Baseten 0, Aesop 0, Obama 0, AIC 2, Norton 0, Totême 0, Ace 0, Populous 4.
- **Pill camp (9999px):** Linear, Vercel (hero), Mercury, Family, OpenAI, Dia, Apple, Sierra, Lucas, Oura, ElevenLabs, Steve Jobs Archive.
- 6–10px is the "soft SaaS" middle (Ramp 6–8, Raycast 8, Anthropic 8, AlphaSense 8, Attio 10). It's fine, but stay consistent. The nav button may differ from hero buttons (Vercel: nav 6px, hero pill). Nothing else should.

| Context | Height | Padding | Text |
|---|---|---|---|
| Nav CTA | 32–36px | 0 12–16px | 13–14px / 500–510 |
| Hero CTA (SaaS) | 40–52px | 0 20–24px | 15–16px / 500 |
| Institutional / luxury | 44–64px | 13–24px × 24–32px | 14–24px |
| Commerce ATC | 46–48px, full width | — | 12–14px, weight 300–500 |

- **Optical padding:** 1px less on the bottom (Stripe `15.5px 24px 16.5px`, Aesop `13px 24px 12px`).
- **Primary + secondary only.** Primary is solid ink (or accent); secondary is a ghost (1px border or a `rgba(ink,.04–.05)` fill) or a text link. Never two loud buttons side by side.
- **Trailing glyph:** `→ › ↗ ⌄ >` is near-universal. Use `↳` as a prefix for editorial micro-buttons (Populous, Fluid Glass). A **circle-arrow chip** inset at the right end of a pill works well (Ayocin "Order Now ⊙→", MindMarket).
- Labels name the task: "Plan your visit", "Download for Mac", "Explore the collection", "Book a call", "Start building". The command itself works too: `curl -fsSL … | sh`.
- **Mono uppercase buttons** (Factory, Baseten, Terminal) for dev and deep-tech: 11–16px, tracked −0.02 to +0.08em, squarish.
- **Split button** (Anthropic "Try Claude ⌄"): label segment + chevron segment.
- Hover: a color shift of 6–10% L, or a letter-roll/fill effect, in 150–300ms. No scale-up bounces on primary buttons.

## Eyebrows / kickers

- **Mono uppercase**, 11–12px, +0.06 to +0.12em, ink at 60%. An optional **6px accent dot** before it (`● SUPPORTED MODELS`), a `◆` diamond (Fluid Glass), an index (`001 · BODY CAM`), or a **2px accent tick on the rail** (Mintlify).
- Luxury: 10px uppercase at +0.2em, `#585858` (Aman).
- Italic serif kicker over a light grotesk display (Studio D).
- Sit 16–24px above the heading. Use at most one eyebrow per section, and not on every section.

## Headings

- Two-tone (see typography.md §8). Max width ~620px for section heads. The section CTA sits right-aligned on the same baseline.
- Optional underlined links inside the headline (Anthropic).

## Cards

- Card groups (`data-reveal-group`) are for cards, tiles and media. A list of text rows is not a card group: text stays still (motion.md §0), and the audit counts revealing paragraphs.

- **Prefer no card.** Image + text on the page background (commerce, editorial). When you do need a card:
  - Radius 8–12px (dev tools), 0–4px (editorial, luxury), 16–28px (Apple, Dia, playful only).
  - Fill = paper ± 2–4% L (`#F4F2F0` on white, `#F5F3F1` on `#FDFCFC`), **or** a hairline ring `box-shadow:0 0 0 1px var(--hairline)`, or an ElevenLabs inset ring `inset 0 0 0 .5px rgba(0,0,0,.075)`. **Not** a drop shadow.
  - Content inside is real: UI, a photo, data. Title in two-tone; a ↗ square button top-right (Ramp); a spec-table footer (Anthropic).
- **Floating product window** (the one place for real shadow): Stripe `0 30px 45px -30px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.1)`; Cursor `0 28px 70px rgba(0,0,0,.14), 0 14px 32px rgba(0,0,0,.1), 0 0 0 1px rgba(0,0,0,.1)`; Dia `0 1px 2px rgba(0,0,0,.04), 0 12px 28px -12px rgba(0,0,0,.1), 0 28px 56px -28px rgba(0,0,0,.12)`.
- **Dark panel:** gradient fill `linear-gradient(137deg,#111214,#0C0D0F)` + `1px rgba(255,255,255,.06)` + a top-edge glow line (techniques.md §7).

## Product UI frame (the "screenshot" done right)

```css
.app{border-radius:12px;background:var(--surface);overflow:hidden;
  box-shadow:0 0 0 1px rgba(0,0,0,.2), inset 0 0 0 .5px rgba(255,255,255,.08), 0 2px 32px rgba(0,0,0,.25)}
.app-wrap{mask-image:linear-gradient(to bottom,#000 60%,transparent);}  /* bleed + fade */
```
Use a sidebar of 220–240px, 13px UI text, an 8% hairline, one focal pane at full opacity, and the others at 40–60%. Add one live micro-state: a "Thinking…" shimmer, a typing caret, a card tilted 4–6° mid-drag, or a cursor. Mark the whole replica `role="img"` with an `aria-label` and make it `inert` (imagery.md §1). Light-mode variant: a white window in a soft browser chrome (traffic lights), or Factory's fake OS desktop (a 22px menubar with the clock "Mon Jun 10 9:41 AM" on a grainy wallpaper).

## Logo walls

- Monochrome only: `filter:grayscale(1)`, `brightness(0) opacity(.3–.5)`, or white on dark. Normalize the optical size of each logo (cap height ~20–28px).
- One row of 6–8 evenly spaced across the container, **or** a 4×4 / 4×2 grid of tiles (`#FAF8F5` + 1px border, Mintlify; logos rotate in place).
- Caption: a mono micro-label ("POWERING THE COMPANIES BUILDING THE FUTURE") or a quantified sentence ("Join 70,000 of the world's most ambitious companies"). **No "Trusted by" in big type.**
- An optional slow marquee (48–120s) with edge fades: `mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)`.

## Testimonials

- Use real names, roles, and avatars (40px circles). Quotes are 14–17px in cards, or **one 32–48px serif quote** (Attio, Linear).
- Quote grid of known builders (Cursor 3×2: Karpathy, Collison…), tweet-style cards with timestamps (Daylight), or a two-row marquee in opposite directions.
- Never use star ratings, generic stock avatars, or "John D., CEO".

## Stats

- 3–4 items, numerals 44–65px (or 98–170px mono for statement stats), `tabular-nums`, captions 14–16px in 2 lines, hairline dividers.
- Make the numbers **precise and footnoted** ("86% of Oura Members see their health improve¹", "99.999% uptime", "1.72802563%"). Round vanity numbers ("10x faster!") read as fake.

## Pricing

- 2–3 columns, hairline or surface cards (radius matches the system). Mark the featured plan with a **1px accent ring** or an ink fill, **never a glow** or a "Most popular" gradient badge (convt, Linear).
- Price at 44–56px, −0.04em, `tabular-nums`, with the unit in small grey ("once", "per month"). Footnote the annual maths honestly ("$8 a month if you pay yearly. Save 33%.").
- Monthly/Yearly as a small segmented control inside the featured card. Plain ✓ glyphs for lists, not icon circles.
- CTAs are full width inside the cards. Use the primary style only on the featured plan.

## Forms

- **Native date inputs** render "mm/dd/yyyy" with a browser icon, which breaks a premium booking strip. Style the field (`::-webkit-calendar-picker-indicator{opacity:.6}`, `color-scheme` to match), show a formatted value ("Fri 16 Oct") in a label layer above it, and keep the native input for the picker and accessibility. Make the whole cell (label + input, ≥ 56px) the tap target.
- **Booking calendar** (hotels, venues; native inputs are banned on premium strips): a range picker with past dates disabled. The closed season is shown in the motif (misted months) with a plain note. On mobile it opens as a bottom sheet with a close button. A result line states the "from" price and says plainly that nothing is booked yet.
- **Radio groups inside masthead cells:** `fieldset`/`legend` draws the legend on the border. Use a `div role="radiogroup" aria-labelledby` instead.
- **`flex:1` inputs** in a row that becomes a column on mobile collapse to about 20px. Set `flex:1 1 auto; width:100%` at the breakpoint.
- **Diagrams with small text at 390px:** crop the SVG `viewBox` to the readable region on mobile (or swap to a mobile-specific drawing) rather than scaling 9px labels down to 4px.

- **Fused email capsule** (Mercury, Ramp): one rounded container with the input on the left and the primary button **inside** the right end (4px inset). Radius 12 or 999.
- Underline inputs (bottom-border only) for editorial and luxury (JW Anderson, Terminal calculator).
- Labels are always visible (no placeholder-only fields). Errors are inline and human ("That email looks off. Check for a typo?").
- Success states are designed moments ("You're on the list! Cheers. You will not regret it." from JW Anderson).

## Navigation

See layout.md §7 for forms. Details:
- Link hover: a color shift to full ink from 60% ink, or a letter-roll.
- Active section: a 2px underline segment (Totême: a partial underline under 40% of the word).
- Mega menus: hairline-ruled columns with 13px links, an optional featured card.
- The wordmark link is a tap target too. Give it `padding-block` so it's ≥ 24px tall; an inline-flex 20px logo fails `mobile.targets`.
- Nav over a photo hero sits in a solid capsule (§68): links straight on a photo measured 4.39:1.
- Announcement bar (36–57px, 12–14px): a real announcement with a link ("Introducing Mercury Books…", "Sierra Summit 2026 Recap"), or **operational info** (Obama's ticket band). Make it dismissible.

## Footers

- Never tiny. They open with a **finale CTA** line, then a 4–6 column mega footer of 13px links.
- Craft moments: a 200px marquee ("Talk to us. Talk to us.", Studio D), **live office clocks** (Bennett & Clive: "New York 01:27 · Los Angeles 22:27"), coordinates (White Desert), "All systems normal" status (Mintlify), certifications (`ISO 27001:2022 · SOC 2 TYPE II`, BFL), a founder card with photo and quote (Studio D), full opening hours (museums).
- A dark footer on a light page (`#141413`, `#101010` inset panel with 6px radius, Factory).

## Media controls

Every autoplay video gets 40–64px circular **pause/play** (and mute if it has sound) controls in a corner (Aesop, Lucas, Ace, Akris, Byredo). They double as "this is a film" signifiers and are required for accessibility.

## Cookie / consent

Design it. ERA set its cookie card in the display script. illoca uses a tiny mono strip with ✓ / ✕ squares. Ideally it's small, bottom-left, in the site's type, with equal-weight Accept and Reject.

## Status and metadata texture

Use these like jewelry, 1–3 per page: a live clock, coordinates, counts in parentheses ("Urban (51)"), read-time labels ("Five-minute read"), "Since 2021" / "EST 2022", version numbers, FIG numbers, patent numbers as data pills (Glyphic), stock lines ("✓ IN STOCK · SHIPS IN 3-5 BUSINESS DAYS"), an "Open today 10–5" line.


**Code lines as a list:** put `white-space:pre` on each `li`, not on the `ol`. On the `ol`, the newlines between items render as blank lines and double the vignette's height.

**Choosing a logo mark:** render a size sheet (16, 24, 32, 64 and 128px, light and dark) before choosing. It kills weak candidates fast: side-view objects read as hamburger menus at 16px, and plain leaf tiles read as eco apps.
