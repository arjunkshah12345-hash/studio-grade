# Antropi (gallery v4) · skill feedback

1. `images.py export --crop` only takes integer pixels, but the help says "Zones are x,y,w,h in pixels, or as fractions". `--crop .5,.08,.5,.92` crashes with a traceback. Either accept fractions as `sample`/`paper` do, or say "pixels only" in the export help.
2. For a 21:9 photo with a dark ceiling, `margin-top: calc(-100vw / ratio * k)` (pull the image up under the copy by k of its height) worked better than §81's cover stage. The image always shows at full width, overlays are plain % of the image box, and the copy can't land on the machines at short viewports. Worth adding to §68/§81 as the "image under copy" variant.
3. The §83 counting motif fits stated percentages very well (19 of 20 lamps for 95%, 1 of 10 for 90% less labor). Add a short rule: label each row in words ("19 hours in every 20"), never "19 of 20 lamps lit". My first label described the drawing instead of the claim.
4. "x times faster" figures don't map cleanly onto a lamp row. A two-row 1-vs-10 worked, but it's ambiguous. Give one sanctioned pattern for ratio claims.
5. Real-company redesigns need a section in the skill: link the nav to the company's real pages, keep the form honest ("this concept sends nothing; real requests go to …"), quote figures as "as stated by X", and add a legal page. I had to make all of this up from the brief.
6. Opacity-index lists (§42, layout §5.17) say inactive items sit at 20–40% ink, but that fails `a11y.contrast` at once (2.5:1). Say "≥ ink-3 (.62) for text; dim only the bar or the numeral".
7. The hairline-gap trick (`gap:1px; background:hairline`) leaks the photo through when the grid crosses an image edge. Note: use a solid hairline colour when the grid overlaps media.
8. `h1:has(br)` turns off balance, so a desktop `<br>` leaves a one-word line at 390px. Suggest `br{display:none}` in the mobile query as the default pairing.
9. Deep-Tech "With a generated photo series" worked well: condensed caps from one variable family (Archivo at wdth 75) gave a sign-plate voice with one family. Say that one width-axis family is enough here.
10. The tokens.css motion profile still reports the unused default eases (.16/.76/.4/.34) in the audit's "motion" line even when the build overrides `--ease`. It's harmless but noisy.
