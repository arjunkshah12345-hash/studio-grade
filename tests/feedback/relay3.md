# Relay round 3 (direction 11 · Confident · H19 · §68/§69/§76) · audit 0 fail · 1 warn · 11 pass

1. Direction 11 is called "Bright Product" but this bible is a dark macro series. Its own rule ("the ground comes from the images") gave a graphite ground and it worked. Say outright that 11 can run dark when the series is dark, so builders don't jump to direction 1.
2. §68 assumes the hero gets `cover`. A 21:9 photo at 1440×900 crops ~30% off the sides and pushes the subject under the h1. Fit-to-width at 108% (bleeding the crown off the right edge) kept the type zone clean. Add a line: with a 21:9 hero, size by width, not height.
3. §69 has no answer for "the finale crop has no clean zone" (detail.png's gears ran under the headline). Setting the photo in the right 64% of the band, with its left edge masked into a solid band sampled from the photo's leather, beat a scrim. Worth adding as the finale fallback.
4. images.py `paper` is built for print paper. Real photos have vignettes and light falloff, so mapping corners shifts the whole frame. Note: for photographic series, feather edges into a sampled ground instead.
5. §76's "nothing touches the art" was easy because the shot list reserved the top 55%. Push "reserve the footer shot's top half" into the bible template in §8.
6. Audit `a11y.contrast.media` failed one ink-3 line over dark graphite with no name for the viewport. Say whether it came from desktop or mobile.
7. Audit `layout.rhythm` WARNs (CV 0.16) on a page that mixes a full-bleed photo, a window crossing it, cards, a bleeding plate, pricing, FAQ and an image band. It measures section height, not density. Judged acceptable. Consider measuring content density too.
8. The profile line "body 13px" counted vignette text inside role="img" replicas. Exclude those, as contrast already does.
9. `max-width:min(34rem,44vw)` on the hero copy squeezed the mobile CTAs into two-line pills. Only the mobile screenshot caught it. The look step earned its keep again.
10. With no proof, the brief left the FAQ and a dashed "Placeholder" card as the honesty layer. Direction 11's "substitute, never invent" list could name this pattern for dev tools.
11. The rack-focus reveal (photo blur → sharp on load, text still) fits macro photography and motion.md §0. It could be listed as a photographic variant of blur-to-sharp.
