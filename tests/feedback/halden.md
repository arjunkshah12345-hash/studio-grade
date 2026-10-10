# Halden (Cinematic Place): builder feedback, round 1
Final audit: 0 fail · 0 warn · 8 pass

Bugs
- tokens.css dark theme on sections (fixed). Ship a ready-made .field / [data-theme] section pattern.
- no-js: tokens.css depends on <html class="no-js"> but nothing tells you to add it. Over file:// (modules blocked), [data-reveal] stays invisible. Make reveals default-visible, or say so in Step 3.

Gaps and contradictions
- Cinematic Place hero assumes a photo; it needs a "no photos yet" variant (type + domain diagram).
- Monument face: condensed (Oswald) vs ultra-light serif. Say which suits which brand (condensed = expedition, light serif = boutique).
- "Booking zero scrolls away" (sticky nav CTA) vs "≤2 hero CTAs". State that nav CTAs don't count.
- The Spine template still says "≥3×"; update it to "3–5 uses, list each with its role".
- Placeholder discipline conflicts with the old §5 .ph snippet and the art-layer advice. Merge them into §5.
- Exempt generated SVG internals from "every value from a token".
- .t-lead uses --font-serif, which silently becomes the display serif in 3-family systems.
- Missing: native date inputs (mm/dd/yyyy looks wrong), tiny-text diagrams at 390 (crop the viewBox), and how much invented copy is OK.

Audit
- type.display skips aria-hidden text, so the 345px monument was never measured. Measure decorative display type.
- motion.ease flaky / reads literal cubic-bezier, not computed transitions.
- No motion.reduced line appeared in the output.
- mobile.targets should measure the label box for inputs and skip inline links (WCAG 2.5.8).
- mobile.body should name the offending element.
- No empty-viewport / content-density check, so the empty placeholder band wasn't caught.
- layout.length should compare against the chosen direction's range (the audit doesn't know the direction; add --direction).
