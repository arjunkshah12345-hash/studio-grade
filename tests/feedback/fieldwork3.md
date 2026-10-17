# Fieldwork 3 (Editorial Motion, CONFIDENT, watercolour series): builder feedback
Final audit: 0 fail · 0 warn · 11 pass · defaultLook 3/6 (warm off-white, tiny accent, light display)

- What worked: `images.py paper --to` turned four papers (cool #EAEEF1 hero, near-white street) into one #F5F3EE, so the page ground IS the paper and the plates have no edges. It was the biggest single gain.
- imagery.md §8 says "sample the type-zone colour and use it as the ground"; with a watercolour series, sample the bare-paper zone instead and map every plate to it before choosing --paper. Say so.
- A plate whose paper third sits under text still shows a seam where the image box starts (texture vs flat hex). The fix was a paper-coloured gradient overlay on the left and bottom edges; the "mirrored 2×2 tile" advice is heavier than needed. Add the overlay as the default.
- motion.md / techniques: no recipe for a no-GSAP pinned crossfade between two shots of one place (sticky stage + --p from scroll + a rising mask-image as the waterline). It's the natural move for any "before / after" series; worth a technique entry with the reduced-motion fallback (both plates side by side).
- Leader-line annotations: SVG `<line>` coordinates can't take CSS vars, so per-breakpoint notes need JS (or an HTML rotated div). Also end the line at the label's near edge, not its centre, or it strikes through the text. Worth adding to §71.
- Annotation labels over busy painted areas fail visually but pass the audit (media contrast sampled ≥4.5:1 on a 1/8 canvas average). Busy-ness, not mean luminance, is the problem; consider a variance check.
- audit `hero.ctas` reports 1 when the secondary is a text link; fine, but say "1 solid + 1 text link" so builders know it was seen.
- audit `motion.text` counted crossfading state captions (opacity 0 by design) as paragraphs waiting for scroll; harmless here, but it could push a build over the threshold.
- Page length INFO says direction 4 wants 12–23 viewports; for a studio with one concept and no built work, 10 was right. The norm should bend to the content inventory.
- range.md's default-look check counted the off-white ground even though it was sampled from the art; maybe exempt grounds derived from the image series.
- directions.md §4 still names the earlier Fieldwork build's chipboard + Archivo look as the Confident example; a second, painted example would stop agents copying it.
