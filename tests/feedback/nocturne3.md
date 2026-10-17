# Nocturne 3 (direction 6 Cinematic Place, Confident): builder feedback
Final audit: 0 fail · 0 warn · 11 pass · defaultLook 2/6 · 9.9 viewports

- The shot list carried the build: every shot reserved a clean zone (sky, dark left third, clean water), so text sat on photos with no scrims and contrast.media passed first time. Reserving zones in the bible is worth stating as a rule.
- Direction 6 doesn't say how to sell tickets. "Booking-as-masthead" (Ace) was the right move for a festival (night picker, price, buy), and the photo-crossing edge from range.md §4 made it look designed. Add a "tickets/events" note to direction 6.
- hero.ctas reported 0: the audit doesn't count a <form> submit button inside the hero as a CTA. It passed, but for the wrong reason.
- color.accent named the dawn finale ground (#5AA0D7) as "the accent", and it never saw the three stage hues (dots and 2–3px rules). Stage-per-hue marker systems need their own audit category.
- A `font` shorthand resets `font-stretch`. With a variable width axis (Archivo 125%), the wide voice silently dropped on 4 elements. typography.md should warn about this, or tokens.css bundles should carry font-stretch.
- The fieldset/legend radio group renders its legend on the border. In masthead cells, a div with role="radiogroup" + aria-labelledby is safer: worth a line in components.md.
- motion.ease counts `linear` as a curve. The skill says time should be linear (scroll clock, night bars), so linear shouldn't count against the house ease.
- images.py export refuses --widths larger than the crop and silently skips them. Print the crop size it will use instead of "skip".
- No legal-page template: every build writes its own legal.html. A 10-line asset would save time.
- The mobile full-page screenshot ends in a black band under the footer (capture height > page height). This looks like an audit artefact, not a page bug.
- The motif check (3–5 uses with different roles) can't be verified by the audit. A Spine linter that counts the MOTIF list would help.
