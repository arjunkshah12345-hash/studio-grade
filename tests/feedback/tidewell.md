# Tidewell feedback (direction 11, H19, Confident) — audit 0 fail · 2 warn · 10 pass

## Direction 11
- H19 assumes one landscape photo works at every width. A 21:9 hero has its clean sky on one side only; at 390px any crop that keeps the subject puts the headline over foliage. Add a mobile recipe to §68/H19: text on paper, then a portrait crop of the subject (what I shipped), or shoot a second 4:5 frame in the shot list.
- H19 says "white h1, no scrim". Golden-hour skies are pale, so white fails. Say "ink or white, whichever the sampled zone allows", and give the ink case first for warm or pale skies.
- §68's nav CSS (white links + white hairline) breaks when the top-right of the photo is busy (shutters, vines): the links measured 1.1:1. Recommend a solid paper capsule for links + CTA on photo heroes.
- The anatomy has no slot for the brief's secondary CTA target ("See a week in X"). A "sample week/run" strip (7 day cards on the tray) worked well and reuses the motif; add it as an option for item 6 when there is no proof.
- Item 2 (integrations row) assumes logos. With placeholder partner names, logos would be fake; suggest category + names set in the display face + a "placeholder" note.
- §69 says crop *the hero* for the three cards; with a generated series, the 4:3 shots plus a crop of the finale photo are better grounds. Say "any shot from the series", and add: vignette top-inset, the photo visible below it (the bottom 35–40% is where the photo reads).
- Recipe gives no guidance for vignettes crossing a photo edge in feature rows (left:-64px into an empty grid column). It was the strongest composition move here; worth naming.

## Imagery §8
- Step 5 has no sizing rule for 21:9 heroes: 1916px source upscales to ~2050px at 1440 cover-fit. Say "generate the hero ≥2400px wide or accept softness"; also give a mobile crop step (PIL crop → cwebp) since sips can't crop by box easily.
- The bible template has no "setting" line, but the brief's bible leads with setting; add it.
- "Keep first-view weight under 1.5 MB" — worth noting that cwebp -q78 on these photos gives 90–160 KB, so there's no reason to ship PNG anywhere.

## Audit
- shape.shadows WARN conflicts with the direction 11 recipe, which prescribes --shadow-card on cards; scope the rule by direction or exempt role="img" vignettes and cards within the recipe token.
- color.gradient WARNs on the §70 ghost wordmark (an art-directed, prescribed gradient). Exempt aria-hidden text with background-clip:text when the Spine lists §70.
- layout.length reports 7.9 viewports as INFO against 8–12; fine, but direction 11 pages with an inset hero frame measure short. Consider 7–12.
- mobile.targets flagged an INPUT under 24px: a real bug (flex:1 in a column flex container collapses the input to 0). Good catch; the message could name it ("flex-basis 0 in a column flexbox").
- The audit served whatever was on the port: another agent's server held my chosen port, and the report silently measured a different site. Print the page <title> or Spine DIRECTION line at the top of the report.
- A grid item with only absolutely positioned children collapses to 0 width when the parent has align-items:center (my mobile step cards lost their images). No check caught it; consider flagging <img> with 0×0 boxes in the viewport.
