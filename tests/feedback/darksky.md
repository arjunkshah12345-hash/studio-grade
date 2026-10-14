# darksky (Leave the Lights): skill feedback
Direction 10 Immersive · Loud · final audit 0 fail · 0 warn · 10 pass (first run: 0 fail · 2 warn)

1. **The loader rule and the first-frame rule conflict.** SKILL.md Step 4 says "Hero copy and CTAs are **visible from the first frame**", while directions.md §10 says "The loader is the first impression, and often the only one" and motion.md §6 says to use a full designed loader for Immersive. A full-cover loader breaks the first rule. Fix: add to §10, "In Immersive, the loader lives inside the subject (canvas, object, horizon) and never covers the h1/CTA; Render the h1 … immediately means visible, not underneath." I built it that way: the lamps switching on are the loader (§46) over a visible h1.

2. **a11y.contrast.media misses a false negative on fixed canvases.** It sampled only 3 elements and passed. The other ~100 texts over a `position:fixed` canvas were checked "on solid grounds", because the DOM walk finds the body's #05070C behind a transparent canvas. My own pixel sampling (75th-percentile luminance under each text box, text hidden) found class descriptions at **2.1–3.0:1** over the Bortle 8–9 skyglow at 390px and **2.5:1** at 1440px. Fix: treat any fixed or absolute `canvas`/`video`/`img` that intersects a text box as media, and sample every text box in every slice, not a subset.

3. **The scrim guidance for text over a stage needs a variant.** motion.md 5.8 says "give it a soft scrim in the ground colour (a vertical gradient at about 85%)". Per-block radial scrims looked like dark clouds drifting across a sky, which reads as a rendering bug. A **viewport-fixed side veil** (ground colour, 62% → 0 across the left 72%) fixed contrast and left the right of the sky untouched to carry the data. Suggest adding: "Over a full-bleed live stage, veil the reading side of the viewport, not each block."

4. **The fixed-overlay exemption is undocumented.** The audit's `layout.textOverlap` skips text inside fixed/sticky ancestors **only if they are < 200px tall** (`bar()` in TEXT_OVERLAP). My HUD is 184px tall. At 201px it would fail every slice. Fix: document this in motion.md 5.8 ("HUDs/readouts over scrolling copy: keep them < 200px tall or they count as pinned posters"), or exempt `aria-hidden` fixed readouts.

5. **type.caps WARN in the Loud register (judged a false positive, then rewritten anyway).** "Sentence-length all-caps at ≥32px" fired on a 7-word civic-poster h2. range.md's Loud recipe ("Civic poster (Obama / Norton) … condensed caps") and typography.md §9 ("or a deliberate brand stance") allow it. Fix: with `--register loud` and a condensed display face, downgrade to INFO, or count words > 10 only.

6. **Reduced motion has no canvas recipe.** directions.md §10 says "replace camera scrubs with crossfades", but tokens.css and motion.js only handle CSS reveals; nothing says what a scroll-scrubbed canvas should do. Suggest adding a snippet to motion.md 5.8: under reduce, snap to the **nearest anchor's state** (discrete, no lerp) and skip the intro. That's what I shipped, and it reads well.

7. **Performance has no audit check.** The brief and directions.md §10 ask for a cheap, paused canvas, but the audit never measures it. I measured it by hand: 0 canvas draws over 1s idle, 0 draws while the letter covers the screen, and 16.7ms frames while scrubbing. Suggest a `perf.idle` check that wraps `requestAnimationFrame` for 1s after load and WARNs if callbacks keep firing with no input.

8. **Minor: color.accent names the skip link as the accent example** ("e.g. rgb(255,177,92) bg a.skip"). It should prefer a visible element.

9. **Minor: `--label: .6875rem` (11px) in tokens.css is too small for condensed caps.** At 11px Big Shoulders reads at about 8px. typography.md could note: "condensed label faces: 13px minimum".

10. **Process (not the skill):** a second agent wrote the same brief into `tests/builds/darksky/` at the same time, and each overwrote the other's index.html and styles.css. Consider one output folder per run id.
