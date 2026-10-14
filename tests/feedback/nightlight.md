# Nightlight feedback (dir 11 Bright Product, Confident, H20 toy box)
## Direction 11
- The token block should include `--reveal-filter:none; --reveal-transform:translateY(8px)`. The direction bans blur-in, but tokens.css defaults to blur, so every dir-11 build has to remember to override it.
- H20 + a 16:9 hero with a 40% clean wall: the h1 and subline fit on the wall, but a working form (about 340px) doesn't. The form has to sit over the subject, cover the floor and cross the frame edge (range §4 "crossing"). Say this, and tell the shot list to keep the sides (bed, window) as the readable subject, because the centre will be covered.
- First-frame rule versus H20: at 1440×900 and 1280×720 the form's submit lands right on the fold. Give a budget: form ≤ 340px tall, with the submit row inside the first viewport, or the hero CTA rule quietly fails.
- Anatomy item 2 ("integrations row") doesn't fit consumer or kids products. Offer "a promise strip" (No ads · No chat · Reviewed) as the consumer variant. It did the trust job well here.
- Anatomy item 6 ("honest proof") has nothing to show when no reviews exist. Offer "a sample of the output" as the substitute (here, a story page plus a labelled audio placeholder).
## Imagery §8
- Step 5 naming hazard: I cut the sprite into files named after the subjects (`moon.png`) and overwrote the shot named `moon.png` (the 21:9 footer sky). The folder isn't in git, so I restored it from a 1200px lossless downscale. Rule: never write processed files under source names. Use a prefix (`toy-*.png`) and treat originals as read-only.
- "Threshold near-white to alpha" isn't enough for a clay sprite sheet. Cream objects (rocket body, d≈29 from white) get bitten, hole-filling closes real holes (teapot handle), and contact shadows survive as grey slivers. What worked: per cell, flood-fill the background from the cell border over (d<12 OR warm low-saturation grey: g−b<11, sat<48, min>140). Then drop enclosed near-white islands over 400px, erode 1px, feather with a Gaussian (σ 0.8), and un-premultiply edge pixels against white. Ship that script with the skill.
- Add "no contact shadows, objects floating" to sprite-sheet prompts. Shadows are cheaper to add back with CSS `drop-shadow` than to remove.
- Step 5 says WebP + JPG. Cut-outs need WebP with alpha (`cwebp -alpha_q`) + a PNG fallback. Say so explicitly.
- Flat clay sky areas show faint block texture once they're full-width (the plasticine grain plus compression). Sample the page background from the image, export at q≥90, and mask the image's top 30–45% into that colour.
## Technique §75
- It assumes a text prompt. For a picker input, add: aria-pressed toggles, a visible n-of-3 counter, a cap with a live-region message on the 4th pick ("Put one back to swap in the rocket"), and the "live placeholder" as a typed example *output* line that turns real after three picks. Prompt-starter cards are redundant when the input is already the examples.
- Bookend: say the finale form should share state with the hero form (the same picks show in both). Two independent forms feel broken.
- Mobile: when the hero image is taller than its clipping container, a mask on the `img` never reaches the container edge, which leaves a hard seam. Mask the container instead.
## §62 / §76
- §62 transferred well as a library card. The motif (three slots) became a 7-night stamp grid, which explains "3 a week vs every night" without any words.
- §76: with a flat-topped sky image, pull it up under the footer (negative margin) and mask the top so the footer columns sit on the sky itself.
## Audit false positives / bugs
- shape.shadows WARN: dir 11 prescribes `--shadow-card` for vignettes. Make it INFO for direction 11, or exempt `role="img"` vignettes.
- shape.cards (≥28px) isn't direction-aware: dir 9 allows 24–64px and the dir-11 object (toy box) is 40px.
- color.accent: with `--register confident` it still says "Loud register is fine", and it counts navy buttons plus the lilac hero as "2 full-bleed fields".
- The mobile pass timed out once on `waitUntil:'load'` (Google Fonts). Use `domcontentloaded` + `document.fonts.ready` with a timeout.
- mobile-full.jpg stitched the hero again mid-page (fullPage + isMobile), which is misleading. A scroll-and-capture fallback would avoid it.
