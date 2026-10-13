# Morrow (direction 5, Quiet): feedback on the skill

Result: 0 fail · 0 warn · 9 pass. The audit's slices still caught the worst bug (see 3).

## Unclear or conflicting rules
1. directions.md §5 says: "No packshots or film yet? Draw the product as a **technical elevation**: line art of the actual object… The drawing is the image *and* the motif; that is allowed." range.md §2C says: "Technical line drawing + mono labels … (**overused by this skill's outputs: one site per set at most**)". For fragrance, the direction recipe sends every agent straight to the look that range.md bans. Fix: in §5, offer a filled alternative first: "a flat colour still life (wall, window light, shelf, the object and its cast shadow as solid planes)". Keep line elevation as the second option.
2. imagery.md has no recipe for that filled still life, though it beat line art here. Suggested addition, a cast shadow from a light vector `v`: `shadow = hull(footprint ∪ footprint+v)`, cap = `hull(capFoot+v·h1/H ∪ capFoot+v·h2/H)`, plus a lighter "caustic" band inside the shadow (`v·.3 → v·.75`) so glass reads as glass. Add the warning I learned: give the footprint real depth (≈20 units at a 3/4 view). With 8 units, sideways shadows collapse into thin sticks.
3. directions.md §5 says "Motion: CSS only… no smooth scroll, no pinning", but techniques §42 and layout §5.3 suggest sticky scroll-spy media. Is a sticky media column beside the text "pinning"? Aesop's 400px sticky PDP column suggests it's allowed. Fix: "No pinned *full-width* sequences; a sticky media column beside moving text is fine."
4. SKILL.md Step 5: "Numbers use `font-variant-numeric: tabular-nums`." In Schibsted Grotesk (and many grotesks), tabular figures widen the comma and colon: "1 ,450 DKK", "06 : 59". Fix: "tabular-nums only for numbers that change or align in a column; check punctuation width in your face; use proportional figures for prices in running text."
5. Step 2 says to put the Spine "in a comment at the top of the main file". Briefs ask for it above `<!doctype>`. That is safe (no quirks mode; I verified `document.compatMode === "CSS1Compat"`), but agents may hesitate. Fix: add one line saying so.

## Missing or buggy code
6. motion.js `scrollSpy` uses `rootMargin:'-45% 0px -45% 0px'`, so an item is active only while its panel crosses the middle 10% band. Two failures: (a) fast jumps (anchor links, the audit's 900px slices) skip panels; (b) the **last** panel never activates if the sticky stage outlives it. The audit slice showed the stage stuck on 19:30 while the text read 23:10. Fix: replace it with "last panel whose top has passed 55% of the viewport":
   `let id=panels[0].dataset.spyPanel; for(const p of panels) if(p.getBoundingClientRect().top<innerHeight*.55) id=p.dataset.spyPanel;` (run it on rAF-throttled scroll).
7. `scrollSpy` sets `aria-current="step"` on every `[data-spy-item]`, including non-interactive media layers (my stage SVGs share the list so they crossfade). Fix: only set it on `a`/`button`.
8. tokens.css has no stock hook for a "light-up" reveal on images. `--reveal-filter:saturate(0) brightness(1.06);--reveal-transform:none` worked well. Fix: list it next to blur-in in motion.md §5 as the Quiet-commerce image primitive.

## Audit false positives and blind spots
9. `style.defaultLook` counts `tinyAccent` when there is **no** accent: `(out.accentHues||[]).length <= 1`. A Totême-style build with zero accent hues gets a default-look trait for using restraint. Fix: `=== 1`, or count zero only when the paper is also warm.
10. `lineHero` only inspects SVGs at least 30% of the viewport wide (`r.width < vw*0.3`). A hero split into six narrow SVG slats (mine are ~9% each) is never examined, so a line-art slat hero would pass. Fix: union the SVG rects inside the hero before testing the width.
11. "Measured profile → motion" lists every ease declared in tokens.css (`.16,1,.3,1`, `.34,1.56,.64,1`…), even unused ones, while `motion.ease` PASS lists only the eases in use. The profile reads as if I shipped five eases. Fix: build the profile from computed transitions, not stylesheet text.
12. `color.coverage` reported "≈ 0%" with six colour fields covering ~45% of the hero, because SVG art is excluded. That is correct for chrome but misleading. Fix: report "chrome x% · art y%" separately.
13. No check compares a sticky stage's state with the text beside it (bug 6). Consider sampling one slice per sticky panel: is the active `[data-spy-item]` the one matching the panel at the viewport centre?

## Process note (not the skill)
14. Two agents built this brief into the same `tests/builds/morrow/` folder at once and overwrote each other's styles.css and index.html. Give each run its own output folder, or have runs lock it.
