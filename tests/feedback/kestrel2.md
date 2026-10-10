# Kestrel v2 (Deep-Tech, LOUD rebuild): builder feedback
Final audit: 0 fail · 1 warn (type.display.weight, the assigned 900) · defaultLook 0/6

- "When register and direction disagree, the register wins" was essential: direction 8's recipe IS the default look (paper, mono labels at +0.18em, crosshair grids, decode labels).
- Contradiction: range.md lists heavy display + mixed font, but also says bold, wide, neutral grotesk is template-y. The audit weight check ignores --register loud. Make it register-aware, or say which heavy faces qualify.
- Direction 8 needs a Loud variant paragraph (safety-colour fields, poster numerals, no paper).
- "Data as art" has no recipe and ticker() can't count down. Add a reusable roll(el).set(str) digit roller.
- Colour-block systems need rules for elements that cross bands: CTA meaning on each band, nav/floating elements over changing bands, the ink-tint ceiling (~80%) on orange.
- The audit contrast check samples fixed floating layers on top of text (false fails). Exclude position:fixed layers.
- tokens.css [data-theme="light"] hard-codes warm paper #F7F6F3, which brings the default look back.
- The direction-8 length norm (10–16) suits immersive, not a conversion page.
