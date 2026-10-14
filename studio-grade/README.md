# Studio Grade

An agent skill for agency-grade web design, built from measured teardowns of 99 live sites shipped by ~40 top studios and in-house teams.

## Install

Claude Code (personal):
```bash
cp -R studio-grade ~/.claude/skills/studio-grade      # or symlink: ln -s "$PWD/studio-grade" ~/.claude/skills/studio-grade
```
Project-scoped: copy it to `<repo>/.claude/skills/studio-grade`.

The audit script needs Playwright in the project where you run it:
```bash
npm i -D playwright && npx playwright install chromium
node ~/.claude/skills/studio-grade/scripts/audit.mjs ./dist/index.html --out ./audit
```

## Layout

```
SKILL.md                 workflow, direction picker, measured defaults, hard bans
references/
  directions.md          10 direction recipes (tokens, fonts, hero, anatomy, motion)
  range.md               register (quiet/confident/loud), 5 range axes, default-look check
  typography.md          tracking/leading tables, pairing rules, free substitutes
  color.md               rules + 40 measured palettes
  layout.md              grids, margins, 16 hero archetypes, 22 section patterns, nav forms, mobile
  motion.md              eases, durations, springs, reveal primitives, loader/scroll policy
  components.md          buttons, cards, product-UI frame, logos, testimonials, forms, footers
  techniques.md          79 signature techniques with code
  imagery.md             product-UI-as-hero, generative ornament, photo art direction, placeholders
  copy.md                headline formulas, voice registers, CTA verbs, banned phrases
  anti-slop.md           38 AI tells, each with its fix
  evidence.md            sources, credits, aggregate measurements
assets/
  tokens.css             starter token system
  motion.js              reveal / split / ticker / letter-roll / scroll-spy / clock / scramble
scripts/
  audit.mjs              Playwright audit at 1440 and 390px with screenshots; exit 1 on FAIL
  images.py              paper matching, sprite-sheet cut-outs and sized exports for generated images
```
