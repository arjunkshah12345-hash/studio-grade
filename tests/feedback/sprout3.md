# Sprout3 feedback (direction 11 · Confident · H19 · §68/§62/§76)
Final audit: 0 fail · 0 warn · 11 pass · defaultLook 2/6

- imagery §8 cutout: monstera and pothos came back with white fenestration holes and gaps between leaves (about 10k px on the monstera). "Reopens enclosed holes" missed them. What fixed it: label near-white, low-chroma components and clear only those over 60px, so the 3–5px bead-eye highlights survive. Worth adding as a `--holes` pass, with a check on a dark ground (holes are invisible on white).
- §8: the hero came with a strip of white window frame down its left edge. Add "check all four edges for frame or wall artefacts before export; trim with --crop".
- `export --widths` skips a width larger than the crop ("never upscale") but writes nothing, so the mobile crop silently didn't exist on the first run. Fall back to the crop's own width, or exit non-zero.
- Direction 11 + H19 is the default for photo heroes, and three of the bar builds use Fraunces SOFT. A short list of non-serif display options for direction 11 (Gabarito, rounded geometric) would help builds in a set keep apart.
- The motif "the plant speaks" (notification bubbles anchored by their tails to faces in the photo) did most of the template-test work. imagery §1 could name "vignettes anchored to the image's subjects" as a variant of §69.
- §76 deckled edges: an SVG feTurbulence + feDisplacementMap strip (baseFrequency .9/.08, scale 16) gives a fibrous felt edge without cutting from a plate. But its `left/right:-2%` bleed caused the only FAIL (8px mobile overflow). Note `overflow-x:clip` on the band.
- §62 tickets/tags: rotating the card rotates its text too. Tilt a `::before` paper layer and keep the content upright (which is §6b's rule as well); say so in §62.
- Audit gap: nothing detects an empty `<img>` (a 40px avatar showing only its background colour). A "visible img with near-uniform pixels" check would have caught it.
- Audit: `color.accent` picked the butter pad (#F6E6A6) as the accent. With need colours used as pads, it can't tell meaning colours from UI accents.
