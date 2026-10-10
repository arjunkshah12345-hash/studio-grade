# H: User-supplied references

## convt.app: local file converter (macOS/Windows/Linux, Rust + GPUI)

Measured 2026-10-07 with `tools/analyze.mjs` (1440×900 + 390 mobile). Data: `sites/convt-app/data.json` and `shots/`. Credit: in-house/indie (no agency credit found). Built with Next-like static output; no GSAP/Lenis; CSS keyframes only.

**Why it's a reference.** It's the best example in the set of a *small indie utility* executed at the top tier. There is one idea (convert files locally, nothing uploaded), and it is shown concretely on every section with real files, real sizes, and real engines. It does this with zero stock imagery and no brand budget.

### Hero
- Centered stack on near-black `#0A0B0B`: h1 "Convert any file / with a right-click." in **Geist Variable 500, 68px / 72px (1.06), −0.04em**, ink `#EDEFEE`. A 2-line subline at 17px, grey `#A1A6A3`: "Images, video, audio and documents, converted on your own computer. Nothing gets uploaded."
- CTAs: a green primary with a download glyph, "Download for macOS" (h40, radius 10, 15px/500), plus a dark secondary "Star on GitHub". Below them sits a Product Hunt badge (social proof as a third object; the one template-ish note).
- **Subject = a before→after transformation pair**: two dark file cards (radius 14) with the *same* cat photo, each with a filename + mono size footer. `miso.heic` · `4.8 MB` (grey) → green circular arrow button → `miso.webp` · **`612 KB`** in accent green. The product's value is shown as a literal diff of the file size. Intro keyframes `brand-source-in` → `brand-result-in` → `convt-progress` animate the conversion.
- **Halftone dot-matrix stage** behind the pair: a 1200px rounded panel (radius 16) whose dot pattern is sparse grey at the top and densifies into accent green at the bottom (a dithered gradient). The ornament is a pixel/conversion metaphor.

### Sections (5.4 viewports, short and dense)
1. Hero + transformation stage.
2. "40 formats, one menu." (44px/48px, −0.035em, centered) → **4 domain-object cards**: Images (a photo), Video (a mini player with 0:12 / 0:42 scrubber), Audio (a green waveform + `voice-memo.m4a 1:04`), Documents (stacked document pages). Each card's visual *is a tiny rendering of the object type*, not an icon. Title left, count right (`14`, `5`, `7`, `14`), then mono format chips (`JPG PNG WEBP HEIC…`, 12px on `#161918`, radius 4).
3. "Built on FFmpeg, LibreOffice and PDFium." left-aligned 44px heading with a grey paragraph right-aligned in the opposite column (asymmetric break after the centered hero). Then an **engine tree diagram**: a node chip "convt  picks the engine" connected by 1px accent-green branch lines with dot terminals to 4 cards. Each card has a mono transformation line `clip.mov → clip.mp4`, a title (FFmpeg / LibreOffice / PDFium / image + resvg), a 2–3 line description, a hairline, a mono uppercase label (VIDEO · AUDIO), and a mono format list. The halftone stage repeats behind it (**motif ×2**).
4. "Buy it once, or go Pro." Two pricing cards. The featured card gets a **1px accent ring, not a glow**, plus a Monthly/Yearly segmented control, price 44px −0.04em with "once" / "per month" in small grey, and a footnote "$8 a month if you pay yearly. Save 33%." Lists use plain ✓ glyphs. The CTA is full width (primary green on the featured card, dark on the other).
5. "Convert files from your own code." An API card with a code editor (`convert.ts`, line numbers, mono, muted syntax colours) and a "Read the docs" button.
6. Finale "Stop uploading your files to convert them." (56px −0.04em) + download CTA, then the footer: "Local file conversion for macOS, Windows and Linux. Open source under AGPL-3.0." with PRODUCT / DEVELOPERS / COMPANY columns and "Built with Rust and GPUI".

### Tokens (measured)
- Type: Geist Variable (74 nodes) + **Geist Mono Variable (99 nodes; more mono than sans)**. Mono carries file names, sizes, formats, labels, and code. Weights are 400 (140) / 500 (27) / 600 (6). Sizes 68 · 56 · 44 · 22 · 20 · 17 · 14 · 13 · 12 · 11. Tracking −0.04em at 56–68, −0.035em at 44, −0.02em at 17–22, **+0.06em at 11px uppercase labels**. Uppercase share 4%.
- Colour (dark): paper `#0A0B0B`, surfaces `#111312` / `#161918` / `#1C201E`, line `#2E3331` / `rgba(255,255,255,.08)`, ink `#EDEFEE`, ink-2 `#A1A6A3`, ink-3 `#838985`, **accent green `#22A867`** (button fill, as an oklab vertical gradient `oklab(.688 -.14 .06)` → `oklab(.606 -.129 .06)`), accent text `#7FD3A6`. Code-only hues: amber `#F2C46D`, blue `#9CC9FF`. A full light theme also ships in tokens (`--page #fff`, `--ink #0a0a0a`, `--green #127a47`).
- Shadow tokens: tactile, layered, not floaty:
  - primary button: `inset 0 1px 0 rgba(255,255,255,.28), 0 0 0 1px #157F4A, 0 1px 2px rgba(10,60,35,.25), 0 4px 12px rgba(10,60,35,.14)`
  - secondary button: `inset 0 1px 0 rgba(255,255,255,.06), 0 0 0 1px #2E3331, 0 1px 2px rgba(0,0,0,.4)`
  - floating demo card: `0 0 0 1px rgba(255,255,255,.08), 0 24px 48px rgba(0,0,0,.4)`
  - light theme: `--shadow-button: #0000000a 0 -1px 0 inset, #00000014 0 0 0 1px, #0000000f 0 1px 2px`
- Radii: 6px (45, the base), 4px chips, 10px buttons, 14px cards, 16px stage panels.
- Layout: container 1240px, 4-col / 2-col grids with 16px gaps, nav 80px static (logo · 3 centered links · Sign in + Download).
- Motion: `--ease-out: cubic-bezier(.23,1,.32,1)`, `--ease-in-out: cubic-bezier(.77,0,.175,1)`, UI at 0.14–0.2s, reveals at 0.8–1s, brand intro at 1.4s. No smooth scroll and no libraries.

### Copy voice
Mechanism in the headline ("with a right-click"), numbers as claims ("40 formats, one menu."), a privacy truth ("Nothing gets uploaded."), honest pricing ("Buy it once, or go Pro."), and an enemy named in the finale ("Stop uploading your files to convert them."). There are no adjectives doing the selling.

### Signature moves to steal
1. **Transformation pair** (before → after with real filenames and sizes, the gain in accent).
2. **Halftone stage that dithers into the accent**, repeated behind 2 sections.
3. **Domain-object cards** (each category card shows a miniature of the object: photo, player, waveform, pages) + count + mono chips. This is the legitimate replacement for icon cards.
4. **Engine/architecture tree** with hairline accent branches and dot terminals.
5. **Tactile layered button shadows** (inner top highlight + 1px ring + two soft drops).
6. **Featured pricing card = 1px accent ring**, with a footnoted yearly saving.

### Deviations from the cluster norms (honest)
Centered hero and centered section heads (it compensates with a strong, concrete subject), plus a Product Hunt badge as a third hero object. Fine for an indie utility launch; on an enterprise page, prefer a left-aligned hero and drop the badge.
