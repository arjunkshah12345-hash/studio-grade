# Kestrel (Deep-Tech Spec): builder feedback, round 1
Final audit: 0 fail · 0 warn · 7 pass

Instructions
1. Direction choice conflicts: "scan/compare/convert → 1, 2, 5, 7" vs "industrial → 8". Direction 8 assumes Lenis and pinned scrubs; the builder used native scroll.
2. Direction 8 has no no-assets path (hero = cinematic object). "Technical drawing as hero" is missing from the 14 archetypes.
3. Label tracking has three values (.18em in direction 8, +0.04–0.12 in the SKILL checklist, +0.02–0.1 in typography.md). Hero h1 sizes disagree (56–72 vs 70–76).
4. Direction token names (--radius, --grid-cols, --dark, --font-num…) don't match tokens.css (--r-btn, --cols).
5. tokens.css --font-text Inter and --font-serif Newsreader leak into .t-body, .t-lead, and .btn. Defaults should chain to --font-display.
6. The 40% tier (.dimmer .42) fails AA at 13px. Mark it decoration or large text only.
7. The opacity-index list at 20% fails contrast. Say to aria-hide inactive items or give them an accessible alternative.
8. The proof rules push inventing facts. Mark invented proof as a placeholder and tell the user.
9. No page length for direction 8.
10. Technique snippets hardcode rgba and hex; data-URI SVGs can't read CSS vars.

motion.js
1. reveal() rootMargin -18% means bottom-of-first-viewport content (the H7 headline) never reveals without a scroll. Reveal first-viewport content on load.
2. splitWords and scrollFill put aria-label on a <p> (prohibited) and aria-hide the words, so screen readers lose the paragraph.
3. letterRoll flattens children.
4. tokens.css should include [hidden]{display:none!important}.

Audit
1. mobile.overflow missed a 455px scrollWidth (absolute chips) with a visibly clipped CTA.
2. hero.ctas passed while the hero was opacity 0 in its own screenshot; check opacity at capture.
3. Accent detection reports "none" when the accent sits inside role=img; the INFO then gives wrong advice.
4. The profile is skewed by mono labels (body 11px, uppercase 49%); stat numerals count as display.
5. motion.ease counts declared, not used, eases.
6. Not caught: duplicate IDs, a `hidden` attribute overridden by display CSS, colliding SVG labels.
