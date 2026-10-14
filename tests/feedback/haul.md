# Haul feedback (direction 11 · Confident · H21 · §77/§69/§76)

## Imagery §8
- Step 5 is missing the most important step for print/illustration series: **divide the paper out to white** before shipping. The riso art came on #F7F3EC paper; laid on a #F6F3EC page it showed a visible rectangle, and `mix-blend-mode:multiply` made it worse (paper × paper = a darker beige box). Fix used: per-channel LUT `v*255/(paper-3)` from the median corner colour, then multiply on any ground (paper, tray, finale card, footer). Add this as step 5a with the 6-line PIL snippet.
- Multiply silently fails when the `<picture>` (or any wrapper) has `position:absolute; z-index:-1`: it becomes its own stacking context and the image blends with nothing (white box in the finale). Put the blend mode on the wrapper. Worth one line in §8 and §69.
- Step 4 "any text is a regenerate" is too blunt: hero.png had a 40px letter-like scribble on the bumper in an otherwise perfect image. A feathered clone-retouch from the adjacent bumper fixed it in 5 lines; regenerating would have risked the composition and the series match. Allow a retouch when the artefact is under ~0.5% of the frame, and say "patch with overlays" (CSS) is still banned.
- The shot list asked for "the moving van" in the road shot and got a box truck. Add "the SAME vehicle as the hero (describe it fully)" to the bible's consistency rules.

## Direction 11
- The recipe's `--paper:#FFFFFF` default should yield to the image's paper when the series has a printed ground; say "ground = the series' paper colour" explicitly.
- Two inks with two jobs (pink = moved/typed, blue = interface) worked better than "ONE brand hue"; the audit still passed color.accent. Mention the two-ink riso logic as a legit variant.
- Pink #FF48B0 is 2.8:1 on the paper; text needs #C2186F (5.2:1). A "text shade of the image accent" line in the palette step would save the lookup.

## Technique §77
- §77's split (lede + CTAs in the right column) collides with a hero image composed with an empty LEFT zone. What worked: copy stacked left over the print's empty paper, the van on the right, its wheels parked on the tray's top edge (stage height = 0.79 × art height). Add this "image beside, tray below" variant, plus the vertical budget: at 1440×900 the tray shows ~330px above the fold.
- Add `.tray>*{min-width:0}` to the snippet: a `white-space:pre` diff in a vignette blew the card wider than its column at 1440 and off-screen at 390.
- 136px drop (not 200) kept the middle card readable in the first viewport.

## Audit false positives / gaps
- `shape.shadows` WARN counts the vignette windows inside `role="img"` replicas, which direction 11 prescribes (`--shadow-card`). Exempt role="img" or floating windows.
- `type.families` FAIL counted "monospace" from bare `<pre>` UA styles; real fix was `pre{font-family:var(--font-mono)}`. The message should name the element so the cause is obvious.
- `style.defaultLook` flags `hairlineBands` for FAQ/contract rules; with 3/6 it passes, but hairlines in an FAQ aren't "metadata bands".
- Nothing checks that the image paper matches the page paper; a 2–3 level mismatch is visible as a box. Sample image corners vs body bg and WARN at ΔE > 1.
