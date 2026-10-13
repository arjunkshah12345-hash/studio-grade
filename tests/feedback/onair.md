# On Air (podcast studio): feedback on studio-grade, focused on §61–67

Build: Direction 9 Playful System, Loud. Ground is a colour-block system (signal red = on air, night = studio, tape cream = notes). Faces: Bricolage Grotesque condensed, Instrument Sans, Doto, Permanent Marker. Objects are CSS/SVG (lamp, mixing desk, cassette J-cards, audiogram monitor). Final audit: 0 FAIL, 3 WARN (all judged), 7 PASS.

## What worked
- **§62 Pricing as an object**: the clearest of the new techniques. "Draw them as a physical thing from the brand's world" led straight to cassette J-cards (spine, Side A/B tracklist, LED price, stickers). The "live truth only if it's true, else omit" line stopped me inventing "Now booking January".
- **§63 Naming**: clear and quick to apply. The brief's Pilot/Season were already broadcast words, so the metaphor came from them.
- **§61 contrast note** (ink at 60–65%, not 0.72 grey): useful. Without it I'd have greyed the prose.
- **range.md §3 default-look check** plus "DIFFERENT FROM DEFAULT BY": easy to apply. The audit agreed (1/6).

## Contradictions
1. **§61 vs §66 on handwriting.** §61's example puts the hand voice in body copy (`<p>… <em class="hand">“soon”</em>`), and copy.md calls strike-and-rewrite "the joke format". §66 says handwriting is "**one** emphasised word or phrase per heading". I followed §66 and struck the word without a handwritten rewrite. Fix: in §61, either say "the rewrite uses the hand voice only in a heading; in body, rewrite in ink", or allow one body hand phrase per page and say so in §66.
2. **§61 code uses `var(--font-mono)`, but §66 has no mono slot.** Under the 4-face lock, "pixel or mono" is for numbers and prices. A dot-matrix face (Doto) can't be read at token size ("zoom.us/j/…"), and adding a mono would be a 5th face. Fix: say ".tok uses the body face at 500 unless the build already has a mono voice. Never add a face for tokens."
3. **§66 "always in the accent colour" breaks on a Loud field of the accent's own hue.** A red marker word on the red hero is invisible, and red on cream only passes when the accent is darkened (#C42A1B: 4.6:1). Fix: add "if the field is the accent's hue, the hand word sits on a carrier (tape strip, paper chip) in the paper colour". I used a masking-tape strip, which also became a craft detail.
4. **"2–3 signatures (no more)" vs the Ignura bundle.** SKILL.md Step 2 and the techniques.md header both say 2–3. directions.md §9's Ignura variant prescribes §61–67 together. Fix: label §63, §66 and §67 "system rules (don't count toward the 2–3)". Only §61, §62, §64 and §65 are visual signatures.
5. **Stale counts.** The techniques.md header still reads "60 moves", and its Index stops at E (no F). SKILL.md says 67.
6. **The Spine template has no NAMING line.** §63 asks for one, but the SKILL.md Step 2 block doesn't list it, so agents that copy the template will skip it. Add `NAMING : <metaphor> → tiers · steps · CTA verb · 404`.

## Missing code / under-specified
7. **§64 journey map is prose only.** It's the hardest of the seven to build. Needed: (a) `pathLength="1"` + `stroke-dasharray:1; stroke-dashoffset:1`; (b) labels as absolutely positioned HTML over the SVG with `left/top` in % of the viewBox, above/below alternating with peaks and troughs, edge stations translated inward; (c) the vertical mobile version (a CSS line + `::before` lamps). On my first pass a prop (the mic) sat on the first station's label. Add a sentence: "keep props out of label boxes".
8. **§67 assumes a real film with sound.** It says nothing about what to do with no media: I built a captions-only audiogram and marked its audio as a placeholder. Add: "no film? A silent kinetic-caption cut is fine, but label it as captions-only and still ship the transcript". Also state that a finite autoplaying caption sequence needs the same pause control as video. Rename it "Read the <film/trailer/episode>".
9. **§62's `.ticket` uses `var(--font-pixel)`, which tokens.css doesn't define.** Either add `--font-pixel` to tokens.css or use `--font-led/--font-num` consistently with §66.
10. **Ignura is close to a clone recipe.** directions.md §9 and range.md §5 give paper ground, sky/grass/fire, a Fraunces-style serif, Caveat, tickets and a journey map. Add one line: "Keep the structure; swap the world, the objects and the faces for the brand's own" (mine: broadcast, cassette, tape, LED). Otherwise every studio brief will come out as Ignura.

## Audit
11. **False FAIL from `html{scroll-behavior:smooth}`.** a11y.contrast reported footer text at 1.11:1. The contrast pass reads rects while the page is still smooth-scrolling, so it sampled the cream band above the footer. Removing smooth scroll cleared it, and nothing else changed. Fix the audit: inject `html{scroll-behavior:auto!important}` before scrolling, or scroll with `behavior:'instant'`.
12. **The audit flags what §62 and §66 prescribe.** `type.display.tracking` warns on Permanent Marker hand words at 0em ("tighten to −0.02"), but handwriting shouldn't be tightened. `type.display.weight` warns on Doto prices at w900, which is the pixel face's dot size and what §62's `font:600 … var(--font-pixel)` implies. Fix: under `--register loud`, exempt cursive, handwriting and dot/pixel families (or the families named for the hand and pixel roles) from tracking and weight checks.
13. `type.families` at 4 faces under Loud gives a WARN that says "confirm the jobs in the Spine". That's correct, but it will warn on every compliant §66 build. Consider PASS when the Spine comment contains the four role lines.

## Small
- range.md §4's mid-tone ink rule (88/80%) was what made body text pass on the red field (82%: 4.7:1). §1's Loud rules should link to it, because a saturated field is a mid-tone ground for contrast purposes.
- tokens.css's `--reveal-filter`/`--reveal-transform` hooks made "springy, not blur" a two-line change. Mention them in range.md §2E for non-calm motion feels.
