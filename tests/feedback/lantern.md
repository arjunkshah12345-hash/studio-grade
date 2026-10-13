# Lantern (3 Warm Paper · Quiet): feedback on the skill

Final audit: 0 fail · 0 warn · 10 pass. The screenshots caught more real bugs than the report did.

## Conflicting or unclear rules
1. directions.md §3 says "the sans / serif / mono trio… mono for metadata (12px uppercase)" and sets `--font-mono:"IBM Plex Mono"`. range.md §2B says "Mono uppercase labels are a device of directions 1, 2, and 8". So the Warm Paper recipe leads straight into default-look trait 3.
   Fix: in §3, write "mono optional; default to text-face labels (sans sentence case or italic serif)".
2. directions.md §3 sets `--display-lh:1.1`, and hero (d) is "a 54px serif statement at line-height 1.3". SKILL.md says "never above 1.1".
   Fix: add an explicit exception for serif statement paragraphs (1.2–1.3) and say whether the audit exempts them.
3. range.md §3: "If your Spine matches 4 or more of these, change at least 2". It doesn't say whether you count before or after the changes. Quiet Warm Paper also pins 3 traits by definition (off-white, light display, tiny accent).
   Fix: "Count the final Spine. Quiet Warm Paper sits at 3/6 by design; spend the changes on labels, metadata bands and the hero medium."
4. copy.md says strike-and-rewrite "is the joke format, so use it once per page". Law 4 says use the motif 3–5 times. When the motif *is* a proof mark, the two rules collide.
   Fix: "once per page in body copy; motif uses inside figures don't count."
5. SKILL.md Step 2 says `SIGNATURES : 2–3 named moves from references/techniques.md`, but Warm Paper's own signatures (underlined links in the headline, the ink-drying reveal, spec tables) are only partly numbered there.
   Fix: cross-reference each direction signature to its techniques.md § number.

## Missing code
6. tokens.css `img,video,svg,canvas{display:block;max-width:100%}` capped my absolutely positioned pen-mark SVGs (an underline and a ring wider than their inline host), so they rendered half-size.
   Fix: add `svg[aria-hidden="true"]{max-width:none}`, or note in imagery.md that overlay SVGs need `max-width:none`.
7. There is no recipe for hand-drawn annotation over live text (circle, underline, wavy line, margin note). It's the natural motif for research, editorial and legal brands. `pathLength` dashes combined with `non-scaling-stroke` and `preserveAspectRatio="none"` are unreliable; a `clip-path` wipe works. Add a techniques.md entry, and note that a correction must sit inline after the struck word: an absolutely positioned `ins` collides with the line above when the word wraps to a line start.
8. tokens.css `.ph{… repeating-linear-gradient(45deg,…) … color:var(--ink-3)}` fails the new `a11y.contrast.media` rule. My hatched placeholder chips hit 4.41:1 on paper-2 with ink-3 and passed only at ink-2.
   Fix: change `.ph` and the placeholder guidance to ink-2.
9. A "typeset chart" is a listed medium, but there's no chart recipe. The HTML-labels-over-SVG method from §64 is what made the chart legible at 390px.
   Fix: link a short "chart as image" recipe from imagery.md §3.

## Audit false positives and blind spots
10. `hero.firstFrame` FAILed on a "↺ Replay" control at opacity 0 inside the hero `<figure>`. That isn't hero copy or a CTA.
    Fix: check only the h1, the hero paragraph and CTAs outside `figure`, or downgrade it to WARN for controls inside figures.
11. `a11y.contrast.media` treats a 6%-ink CSS hatch as "imagery" and suggests "re-crop or regenerate", which makes no sense for a CSS pattern.
    Fix: give gradient/pattern grounds their own message ("darken the text or lighten the pattern").
12. `defaultLook.hairlineBands` only counts `border-top`/`border-bottom`. SKILL.md itself recommends box-shadow rings, so following its advice evades the detector.
    Fix: also count `inset 0 ±1px 0` box-shadows.
13. Slices catch time-based sequences mid-flight. The chart's 2.2s linear wipe showed half-drawn, and the first hero shot (at 4s) missed the last proof mark.
    Fix: wait for `document.getAnimations()` to finish before each slice, or support a `data-audit-settle` hook.
14. mobile-full.jpg repeated the nav and hero under the footer, a stitching artifact that reads like a layout bug.
    Fix: flag it in the output, or capture by scrolling the viewport.
