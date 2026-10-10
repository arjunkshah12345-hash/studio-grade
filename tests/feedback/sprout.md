# Sprout (Playful, LOUD, range test): builder feedback
Final audit: 0 fail · 1 warn (shape.cards: phone frame, round stage, circular stickers) · defaultLook 0/6

- range.md helped a lot: "loud is one colour logic played big", the saturated-field + cast recipe, and the default-look check. Without it the skill pulls hard toward paper, mono and hairlines.
- Audit vs loud:
  - 30° hue buckets cap a colour-per-section system at about 2 chromatic fields (a dark forest field only passes because it falls below the chromatic lightness threshold).
  - shape.cards isn't direction-aware (Playful allows 24–64px).
  - layout.rhythm ignores sections under 200px, so the "tight band" advice can't move the score.
- Missing: CSS linear() spring tokens (motion.md has only JS spring numbers); rounded-type pairings and tracking (M PLUS Rounded 1c needs −0.012em).
- tokens.css still ships default-look leftovers: .t-label is mono uppercase and .eyebrow has a dot. A loud build has to undo them. Ship a sentence-case label variant.
