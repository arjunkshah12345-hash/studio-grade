# darksky3 · skill feedback (Leave the Lights, direction 10 Immersive, Confident)

1. The aligned before/after pair (hero.png / dark.png, same viewpoint) is the strongest asset any brief has had. Nothing in the skill names "scrubbed crossfade of an aligned pair" as a move; §56 (transformation pair) is cards and §5.8 is the mechanics. Worth a technique entry: one sticky stage, two stacked images, opacity from scroll, a range input mirroring it (and driving scroll), reduced motion = slider only.
2. Range §3 set check works but needs the sibling spines: nocturne3 is also night + photography + cinematic, so the ground had to move to a two-colour block system (skyglow amber = now, night = asked for). Suggest the audit or gallery tooling print the axes already used in the set.
3. Hero text over a 21:9 photo at 1440x900: the sky zone ends ~52% down once `cover` crops the sides. The doc says "top 45-55% clean"; add the arithmetic (cover scale = vh / imgH) and a `min(var(--hero), 10.5vh)` clamp so short viewports don't push the subline onto the mountains. The audit's media-contrast PASSED text sitting on a dark ridge (sampled average was fine; it looked bad).
4. `text-wrap:balance` from tokens.css split a 2-line `<br>` h1 into 3 lines. Note it on hero h1s with manual breaks.
5. Mobile + sticky stage: full-page mobile screenshots show the pinned track as an empty block (artefact). Audit could note "sticky track, ignore empty band" or capture with the sticky released.
6. A light cone with no visible source (CSS wedge over the letter) read as a glow blob; cut it. Motif rule could add: a light effect needs its source on screen.
7. Direction 10 offers no loader-free path in the policy table; a pinned scrub that starts as the hero worked well with no loader. Say "the scrub can be the intro".
8. audit: `copy.emoji` FAILs on ↩ (a typographic glyph the skill recommends class-wise). Consider allowing ↩ ↑ ↓ in links.
9. images.py worked first time; `--crop` for the mobile stage needs one hint: crop the *same* region from both pair images so the crossfade holds.
