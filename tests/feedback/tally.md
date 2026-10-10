# Tally (Ledger Light, CONFIDENT, range test): builder feedback
Final audit: 0 fail · 0 warn · 9 pass · defaultLook 2/6

- range.md helped: "mono labels belong to 1/2/8, not the brand voice" led to sentence-case labels. "Product UI + an art layer" is why the dot-map exists.
- The Confident register is underspecified: range.md has Loud recipes but none for Confident, where most SaaS lands. Add band size, on-band text colours, and how the product crosses the band edge.
- The hairlineBands trait fires on legitimate data tables. Exclude table rows and role=img.
- Audit blind spots:
  - Contrast walks DOM ancestors, so an absolutely positioned header over a band reads as on white (false FAIL).
  - Fallback `monospace` (UA styles on pre/code) only shows up as a third family.
  - SVG <use> glyphs rendering blank aren't detected.
- The slices were the most valuable part of the loop.
