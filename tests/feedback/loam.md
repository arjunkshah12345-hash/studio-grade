# Loam (gallery v4) · skill feedback

Direction 11 Bright Product, Confident. Audit at the end: 0 fail, 0 warn, 11 pass. First run: 2 fails, 2 warns.

1. Bright Product's "When" line names AI tools, SaaS and apps only. A physical product with a buy path fit it better than 5, whose 18–31px hero cap fights an image-rich brief. Add "consumer hardware with a buy path" to its When line.
2. There's no recipe for "the series came back short". imagery.md §8 covers a quota running out for skylines only. What worked here: crop the subject the missing shot was meant to show (the motor is visible in hero.png; the rolled cover in box.png), then add a §81 overlay and big numerals, or a drawn diagram with one toggle. Worth a short §8 bullet.
3. §83 (a motif that counts) was the strongest move again. Both brief numbers (80 kg, 70 km) became visitor-input calculators with no invented figures. Suggest a default: one §83 widget per hard number in the brief.
4. A trap the audit caught: an SVG `<symbol id="box">` collided with `<section id="box">` (semantics.ids). Suggest prefixing symbol ids in tokens/components guidance.
5. copy.case fired on "2 We bring a bike…" because the step numeral sat inside the h3. Say in components.md that step numerals go outside the heading. The audit could also ignore a leading numeral.
6. A footer-link tap-target WARN at 390px is common to every plain footer. Add `padding-block:10px` on mobile to the §76 footer rules.
7. Mobile H6 photo card: a 21:9 hero can't hold the copy. A brick-only portrait crop (the type zone) plus a separate full-bike strip read well. Add it as the mobile variant of H6 in layout.md.
8. The finale's mobile form covered the subject when the photo filled the whole card. Put the image in flow at the crop's aspect ratio, overlay the copy on its sky, and let the form overlap the image's bottom edge by about 64px.
9. color.accent called the page a "colour-block system… Loud register is fine", though the run was Confident. Its two fields are just a bookend: the brick hero and the sky finale. The message could recognise image bookends.
