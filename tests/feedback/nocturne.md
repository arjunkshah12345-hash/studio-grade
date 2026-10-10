# Nocturne (Institutional, LOUD, range test): builder feedback
Final audit (after the register-aware audit fix): 0 fail · 0 warn · 9 pass · defaultLook 0/6

- range.md helped: the Loud recipes (civic poster, 0px tall buttons, text as a dark tint of the field's hue) and the measured condensed-caps exemplars gave permission and numbers to go loud.
- Axes overlap with directions.md: direction 7's own recipe (white paper, serif for meaning, quiet motion) contributed little under Loud. Directions should say how they change per register.
- The audit failed 3 meaning-per-hue fields while range.md endorses them (fixed: colour-block detection).
- h1 checks punish letter-split titles (word count inflated, lines measured against the parent). Document the CSS-generated letters + sr-only name pattern.
- typography.md has no tracking advice for heavy condensed caps at 300px.
- There's no ready-made non-mono label style in tokens.css for directions where mono labels are discouraged.
