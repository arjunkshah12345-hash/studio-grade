# kestrel3 · skill feedback

- Direction 8 still points agents at "the technical drawing as hero (Kestrel's 68 m blade)" when there are no photos. With a generated series it should say plainly: open on the photo, put the information design *on* it (annotation boxes, flight path), not beside it.
- Biggest gap: overlays on a full-bleed `object-fit:cover` photo. Nothing in imagery.md or techniques.md says how to keep a box on the drone at every viewport. What worked: a "stage" div sized like cover with container units (`width:max(100cqw,100cqh*r)`, offset by `(100cqw - w) * px`), overlays in % of the source image. Worth adding as a technique next to §34/§69.
- §34 annotation boxes on generated photos is a strong motif for any inspection/vision product, but the "invent no numbers" rule collides with it: a sample report wants sizes. Suggest a stock pattern: hatched dashed `ph-chip` for placeholder values ("— mm") plus a "Sample layout" stamp on the artifact (§73).
- Derived numbers: a calculator that multiplies a brief fact (11 min × blades) by user input is honest proof with no invented figures. layout.md §5.18 could say this is the safe way to make a calculator when no prices or fleet data exist.
- range.md default-look check: "mono uppercase labels" can be escaped in deep-tech by using the text family's condensed width as sign-plate caps (Barlow Condensed). Worth listing as the direction-8 alternative to mono.
- Audit `color.accent` reports "no accent in chrome" as INFO when the accent is deliberately reserved for marks drawn on photos. Fine, but it could read the Spine's PALETTE line and confirm it instead.
- Audit `body 12px` in the profile came from caps labels, not body copy; the profile line is misleading when labels outnumber paragraphs.
- Audit `mobile.targets` flagged the wordmark link (inline-flex, 20px tall). A note in components.md: give the brand link padding-block so it's ≥ 24px.
- The generated footer shot (clear blue sky) drifted from the overcast hero. Making the page "clear up" from grey to sky over the finale turned the drift into a narrative; imagery.md §8 could suggest that when one shot's light differs.
- Page lands at 8 viewports vs the direction-8 norm of 10–16; for an evidence-led B2B buyer I judged shorter better. The norm could note B2B deep-tech sits nearer SaaS length.
