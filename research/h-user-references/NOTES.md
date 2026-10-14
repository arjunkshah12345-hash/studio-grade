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

---

## ignura.com: "the launch studio for apps, London" (Astro; Playful System, Loud)

Measured 2026-10-12 at 1440 and 390px (`sites/ignura-com/`). Page 9.7 viewports.

- **Type: four voices, each with one job.** Fraunces 640 is the statement face: the h1 "Ignite your launch" is 107.5px, lh 0.98, −0.032em; h2s run 32–68px at −0.014 to −0.031em. Caveat 600 handwriting is used for exactly one emphasised word or phrase per heading, always in the accent: "*sticks around*", "*lift-off*", "*actually*", "*made*". Pixelify Sans (100 nodes) handles prices, UI labels and stamps. Geist Mono handles code and inline UI tokens. Geist is the body face at 15–21px.
- **Colour:** paper `rgb(253 251 247)`, ink `rgb(22 22 22)`, secondary `rgb(102 94 85)`. Fire orange `#FF6A1F` is the brand and the main CTA. Fields: yellow `#FFD45C`, peach `#F3B08E`, sky `#A9CDEF`, grass green. Each colour is a place in the world (sky, ground, fire), not a decoration.
- **Image:** a bespoke cast of characters with faces, each one a service. A fire is "Ignite", a campfire is "Burn, monthly", a rocket is "Launch day", a phone is "UGC batch", a folder is "All our work". Sections sit on landscape horizons and torn-paper bands (180 clip-path uses). Hard offset shadows (`0 4.68px 0 #161616`) give a toy-plastic feel.
- **Inline UI tokens in copy:** "You built the `thing▍`." puts the word in a black terminal pill with a caret. "Months of 2am vibe`coding`, and it works: on `localhost:3000▍`, in `TestFlight`…". "~~screen recording~~ launch film" strikes out and rewrites. "Launch day slips: the ~~14th~~, the ~~28th~~, 'soon'."
- **Pricing as an object:** two tickets, *Ignite* ("the whole launch", from $21,000, one-off, a "4 weeks" tag) and *Burn* ("keeps the fire going after launch day", from $6,000 a month, "one month's notice"). They have perforated stubs and punch-hole radio buttons, a "Now booking November launches" live pill, and a £/$ toggle.
- **Process as a journey map:** "Four weeks, start to lift-off." A winding road crosses the landscape with numbered stations: teardown + plan → film + UGC → polish, shots, page → launch day.
- **Craft:** a "Read the film" transcript under the hero film ("the words on screen and the key sounds, in order"). An opt-in sound toggle in the nav ("room tone"). A persistent "Ask Iggy" mascot chat pill. "worked with ⟨logo⟩" stickers that change per section. A handwritten "Our team has worked with" over the logo row.
- **Motion:** two eases, a springy `cubic-bezier(.34,1.56,.64,1)` (×33, small pops) and expo-out `(.16,1,.3,1)` (×29). UI at .2s, reveals at .5s, character idle loops at 2.4–3.4s (blink, hop, bob, flicker), ambient at 10s.
- **Nav:** a sticky 58px pill with icon-labelled links (Work · Services · Pricing), a Discord icon, a yellow "Message" and an ink "Book a free call".

## jawadjalal.com: personal site of Ignura's founder (Next.js; Warm Paper, Quiet)

Measured 2026-10-12 (`sites/jawadjalal-com/`). Page 5.3 viewports.

- **Layout: the page is a document.** A single ~720px column with 1px column borders sits on a faint graph-paper page. A dot-matrix band forms the header. A scroll-spy table of contents sits far left (About · Now · Projects · Skills · Elsewhere · Contact · Where it overlaps).
- **The hero is a profile card, not a monument:** an avatar, "Jawad Jalal" at **24px** (Chillax 600), "Designer & Founder" in ink-2, and three small buttons (Send an email · DM on X · Read the CV). Type is dense: 12–15px dominates.
- **Type:** Satoshi for text (172 nodes) and Chillax for display (31), plus Geist Mono and Pixelify for the "JAWAD" wordmark.
- **Colour:** in oklch. Paper `oklch(.992 .002 95)`, ink `oklch(.195 .004 95)`, and secondary text at `oklch(.72 .006 95)`, a light grey that recedes so key nouns pop. Tiny accents appear only on status dots and inline chips.
- **Inline chips in prose, lowercase voice:** "i'm jawad, a ✎`designer` and founder in london 🌐 (yc soon). i started making things for money at thirteen…". Key nouns get an icon and a tinted chip, and the rest is grey.
- **Dotted-leader ledger:** "ignura ········· founder · 6 figure arr", "menufit ········· design · 7 figure arr, 2m users". Operational truth, set as a ledger.
- **Hover preview cards:** hovering a project row floats a card preview of the product.
- **"Where it overlaps":** a 4-circle Venn (Product Design · Brand Identity · Frontend & Build · 3D & Art Direction) with his avatar at the intersection.
- **Finale + footer:** "Still reading? That means something clicked. Let's talk." with one button, then a ghost "JAWAD" wordmark at 192px in 9% ink, cut off by the page edge.
- **Craft:** a custom cursor with a "hi" label, a light/dark toggle, and every surface on a 1px ink-10% ring (×47) instead of shadows. UI easing `(.4,0,.2,1)` at .15–.3s.

### Honest read: what to take, what to leave (studio-grade audit, 2026-10-12)

- **ignura.com** (`--register loud --direction 9`): 2 fails, 10 warns. It runs 6 type families, 9 text elements are below AA, 22 controls have no accessible name, it has text-shadow and stroked text, and it's centered throughout. **Take** the ideas: inline UI tokens, pricing as tickets, metaphor naming, the journey map, role-locked voices capped at 4, and "Read the film". **Leave** the excess faces, the unlabelled icon buttons and the contrast misses.
- **jawadjalal.com** (`--register quiet --direction 3`): 1 fail, 7 warns. 96 of 160 text elements are below AA because the receding grey is about 2.3:1, and 16 controls have no accessible name. The short page and 20px mobile h1 are intrinsic to the personal-README archetype. **Take** the framed document column, profile-card hero, dotted-leader ledger, Venn and ghost wordmark. **Leave** the failing grey; the skill's version uses ink at 60–65%.

---

## Fornax: "the front office that turns calls, emails and forms into finished work" (screenshot only)

Supplied by the user on 2026-10-12 as a single presentation image (`shots/fornax.jpg`), with no URL. **Nothing here is measured**: values are read from the image, not from computed styles.

- **Photo composed for the type.** The hero is one generated, sunlit photograph: clear blue sky over the top ~45%, a city skyline and lake on a low horizon, a tree canopy breaking in top-right, and the subject (a woman working on a laptop on a picnic blanket) in the lower-right third. The centered serif headline "Work goes in cold. / Comes out finished." sits in the sky in white, with no scrim, because the sky *is* the scrim. The nav lies on the sky with a 1px white hairline under it and a white pill CTA.
- **The photo bookends the page.** The same photograph, re-cropped into a rounded ~24px card, is the finale ("Hand off the busywork. Keep the good part.") with an inline email capture and "14 day free trial. No card needed."
- **UI vignettes on crops of the photo.** The three steps are cards whose top half is a crop of the hero (sky gradient, a corner of the tree) with a real UI fragment floating on it. Input: missed call, emailed quote request, web form, each with a timestamp. Processing: an extracted lead with Wants / Available / Budget and "Reply drafted". Output: a calendar slot booked, "Confirmation sent · SMS", "Contact updated · HubSpot". It is a transformation told in three frames, and the photo becomes the brand's colour field across the page. Persona rows ("For solo operators who are done being their own receptionist") repeat the move at larger size.
- **Type:** a warm book serif at regular weight for display (a Tiempos/Newsreader-like face), and a neutral grotesk for UI and body. The "Why Fornax" statement is two-tone: the first sentence in ink, the rest in grey.
- **Proof that doesn't fake customers:** the logo row is framed as integrations ("Works inside the tools your business already runs on.": Gmail, HubSpot, Slack, QuickBooks, Outlook). The testimonials are labelled "From early access" with a note that the numbers come from early-access businesses.
- **Ghost wordmark** at full width, filled with a sky-blue → paper gradient and cut off by the page's bottom edge.

### Honest read: take / leave
- **Take:** the photo composed for the headline; the photo reused as the finale; UI vignettes on photo crops as the three-step transformation; the in → out headline; integrations as proof; the wordmark tinted with the photo's sky.
- **Leave:** the white ghost secondary button on a pale sky (fails contrast) and its typo ("See How Its Works"); the wordmark that spells FORMAX for a brand called Fornax; Title Case card titles under sentence-case heads; two sections that appear twice; centered heads on every section. The person with a laptop in a park sits right on the "not models pointing at laptops" line. It works only because the photo shows the *outcome* (the work is handled, so you're in the park), not the product.

---

## Answerr, Mugic, Wandor (three supplied screenshots, unmeasured)

Supplied by the user on 2026-10-13 as presentation images (`shots/answerr.jpg`, `mugic.jpg`, `wandor.jpg`), without URLs. Values are read from the images.

### Answerr: "Anyone can use AI. Can you prove you use it well?" (an AI-readiness credential)
- **One engraving system carries the brand.** Navy steel-engraving illustration (crosshatched clouds, a domed university, a library interior, graduate portraits in circles, compliance icons) in one ink on white. It is the language of banknotes and diplomas, so the image style *is* the metaphor: certified, official, hard to forge. It appears in the hero band, a case-study panel, a portrait grid, the badge grid and the footer.
- **Security-print framing:** fine vertical hairline strips (guilloché-like) frame the hero band and divide the finale, like the margin of a certificate.
- **The output is the hero artifact:** a credential card over the engraving: "Verified", the person's name, 87/100, a radar chart, five sub-scores, a "Top 8%" archetype, a verification URL (`answerr.ai/aiq/certified/sarah`) and "Issued by Answerr". It shows what a person *carries away*, not the app.
- **Stepped scale diagram:** "From one person to an entire institution" as three tiles stepping diagonally down (individual earns AIQ → readiness measured at scale → institution deploys), each with a label at its corner.
- **Two-sided headlines:** "Institutions buy it. People carry it." · "The old contract / The new contract" side by side.
- **Footer as skyline:** the engraved capitol building rises from the bottom edge, with the footer columns and "All systems operational" sitting above it.
- Type: a book serif display (centered), a grotesk for body, small uppercase labels with ■ navy square bullets.

### Mugic: "Bring the music you imagine in your head to life" (AI music)
- **The input is an object.** The hero prompt box is drawn as a pastel radio/synth: a speaker-grille dot-matrix panel, chunky round buttons (attach · Generate ✦ · shuffle), a toy-plastic bottom edge, a faint doodle pattern of instruments. The pricing card is the same device with a jack cable plugged in below and equalizer bars framing both sides.
- **Prompt starters as onboarding:** "You don't need the right words. Just the feeling." Mood cards (Dreamy · Nostalgic · Energetic) each hold an illustration, a speaker button to preview, a sample prompt in quotes and "Use prompt →".
- **Each feature owns a pastel field** (peach Generate, mint Shape, pink Export), and the testimonial marquee uses the same fields.
- **Constructed wordmark finale:** "Mugic" spelled in the footer with letters built from music glyphs (an M of beamed notes, an i whose dot is a note head), in the section pastels.

### Wandor: "Where will you go next?" (AI trip planner)
- **Painterly landmark collage as hero ground:** sky and clouds, the prompt box in the sky, and a sticker-cut collage of world landmarks rising from below. The hero's bottom edge follows the collage's wavy die-cut silhouette instead of a straight line.
- **Bookended by the world:** the footer ends in a second, different landmark collage (Sagrada Família, Opera House, Eiffel Tower, Big Ben, pyramids), and the final CTA repeats the hero's prompt box with the same placeholder.
- **UI on illustrated grounds:** product screens float on painted landscapes (as Fornax does with photo crops), and the main app screenshot is framed by an illustrated floral garland.
- **Inline stickers in prose:** "No two people experience 🗿 a place the same way…" with small illustrated objects set in the sentence, the visual cousin of inline UI tokens.
- An aeroplane-window porthole as a single object; a typewriter-serif logotype; a teal pill CTA.

### Honest read: take / leave
- **Take:** an illustration style that *is* the brand's metaphor (engraving = certified); showing the output artifact (credential) rather than the app; the stepped scale diagram; two-sided headlines; the input drawn as a domain object; prompt starters that fill the hero input; the hero input repeated as the finale; finale illustrations rising from the bottom edge (skyline, collage, constructed wordmark); shaped hero edges that follow the illustration.
- **Leave (and they repeat across all four supplied screenshots, Fornax included):**
  - **Duplicated sections.** Answerr, Mugic and Wandor each show a section twice, as Fornax did.
  - **Pasted copy:** Mugic's subheading repeats its heading word for word, and its FAQ intro is copied from the mood section.
  - **Typos in claims:** "HIPPA" for HIPAA in Answerr's compliance grid (and Fornax's "Its" and "FORMAX").
  - **Title Case headings:** "Bring The Music You Imagine In Your Head To Life", "It Comes In Cold".
  - **Vague or unverifiable proof:** "MILLIONS" and "U.S." as stats; named testimonials and a named college study with no source.
  - **Labels that map to nothing:** Wandor's uppercase labels in three unrelated colours.
  - **Unaligned zig-zags:** feature rows with wide gaps between the text and the device.
  The audit now catches the first and fourth (`copy.integrity`, `copy.case`), and anti-slop.md has a pre-ship copy check for the rest.


---

## BugScout: "Find & fix JavaScript bugs in seconds" (screenshot, unmeasured)

Supplied 2026-10-13 (`shots/bugscout.jpg`), hero only.
- **Split header:** a slate-navy grotesk h1 at ~76px in the left half; the grey lede and two pill CTAs (a gradient indigo "Get Bugscout for free" with a glow, and a white "Install Extension") top-aligned in the right column.
- **Staggered tray:** a light-grey rounded tray holds three white cards with the middle card dropped lower. Each card has an abstract UI vignette and a caption: a prompt box wired by three short lines to a sparkle node ("Let AI show you the fix"); three checked "Debugger" rows ("Session Replay Integration"); a step list with dashed connectors to image nodes ("Real-Time error detection").
- **Take:** the split header and the staggered tray, which became techniques.md §77 and layout H21.
- **Leave:** Title Case h1 and captions mixed with sentence case; filler content in the vignettes ("Debugger" three times); the gradient pill with a coloured glow.

## What the six supplied references have in common (became direction 11, Bright Product)

Fornax, Answerr, Mugic, Wandor, BugScout and, louder, Ignura: a bright page, one generated image system that bookends it, product shown as small UI vignettes, a serif or friendly display, and warm task-verb copy. Every one also had copy and craft errors (duplicated sections, Title Case, filler UI, ghost buttons on photos), which is why the direction's Avoid list is long.


---

## mkdir.directory: "Curated design inspiration directories." (Astro + GSAP + Lenis; measured 2026-10-14)

`sites/mkdir-directory/`. 3.9 viewports.
- **The list is the page:** a two-line intro, then 30 directories ranked by votes, each name at 48px in Geist 500 (−0.96px). Tiny mono rank numbers sit in the left gutter and mono vote counts (▲ 300) at the right. Rows tint grey on hover, and small thumbnails of the linked sites appear near the cursor.
- **Type and colour:** Geist and Geist Mono only; 12px and 48px make up 60 of 73 text nodes. Ink `rgb(22 24 31)` and grey `rgb(107 111 123)` on `rgb(250 250 252)`. No radii, no backgrounds and no CTAs measured.
- **Wordmark as a window:** the footer's giant "mkdir" is cut out of the page onto a live black-and-white marbling texture (2 canvases).
- **Voice:** "picked by hand and kept short on purpose", "Free galleries only. No paywall, no sign-up.", "Vote for the ones you use and the order updates on your next visit. One vote per directory." Honest form states: "is in the review queue" / "is already on the list".
- Motion: UI at .15–.2s with four eases; GSAP + SplitText for the intro, Lenis for scrolling.
- **Take:** the whole page as one ranked list (techniques §78), the wordmark window (§79), and the restraint (two families, two colours). **Leave:** nothing notable. Check the grey's contrast at 12px before copying it (it's about 5:1 on that paper, which passes).
