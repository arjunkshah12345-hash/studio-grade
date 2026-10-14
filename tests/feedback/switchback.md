# Switchback (dir 11 Bright Product · Confident · H20) — skill feedback

Result: 0 FAIL · 2 WARN (both judged false positives) · 10 PASS · 10.3 viewports.

## Direction 11
- The recipe works when the image series carries colour. What lifted this build most was **extending the painting with its own sampled colours**: hero bg = the flat sky hex (#B0D6E8), footer field = the ridge's flat sky (#E4C395). Then the image can sit at the bottom at any viewport height. Add to §11/§75: "sample the type-zone colour and use it as the section ground; feather the image top with a 12–24% mask."
- Bookending the page as morning sky → sunset sandstone gave it a story ("Back before dark"). Suggest it in §11 as "bookend with two fields from the series, not two crops".
- Mono-free labels + a soft serif (Fraunces SOFT 100 at 400) read as finished. Young Serif was too heavy at 80px. Worth naming Fraunces-soft as a tested option beside Newsreader.
- The anatomy is long. Integrations row + why + 3-step + 3 rows + proof + pricing + FAQ + finale came to 12.3 viewports at first. Say "pick 2 of: why statement, 3-step, journey map" or the page goes over the 8–12 norm.
- No-proof brands need a stand-in for "honest proof". A plain safety/limits section ("Planning help, not a guarantee", numbered truths + a 999 card) filled that slot better than a fake quote would. Suggest "limits as proof" for safety, health and finance products.

## Imagery §8
- Step 5 needs a note: generated 21:9 heroes come out at ~1916px wide, so there is no true 2× for a 1440 desktop. Ship 960/1916 and say so; don't upscale.
- Add a "mobile re-crop" bullet. A dedicated portrait-ish crop (path + walker, 856×571) beat object-position on the 21:9. `<source media>` art direction belongs in §8.5.
- The 4:3 shots drifted from flat poster gouache to more detailed brushwork (cairn, bothy). The §8.4 check should include "same level of detail as the hero", not only palette.
- One file can be used several ways via `image-set()` with background-position/size crops (starter cards). This avoided new generations. Worth a line.

## Technique §75
- The domain object (a tear-off route card) is easy and strong: a radial-gradient mask notch + dashed perforation + a tinted stub that holds the submit. **Gotcha:** the mask clips box-shadow, so the shadow must be `filter:drop-shadow` on a wrapper.
- **Bug class:** tokens.css `[data-reveal]` sets `filter:none`, which silently deletes any `filter:drop-shadow` on the revealed element (my pricing and finale cards lost their shadows). Document it in tokens.css next to the existing blur warning, or put the reveal on a wrapper.
- The skill should say what submit shows. A static "Sample plan" labelled in the result itself ("this preview shows the example route whatever you type") worked, and it fed the journey map below.
- A typed placeholder must keep ≥4.5:1. ink@.64 on white is the floor; say so.

## Audit false positives / gaps
- `hero.badge` flags the **nav CTA pill** ("Plan my day") as a badge above the h1 when the nav sits inside the hero `<header>`. Exclude `nav` descendants.
- `shape.shadows` WARNs on 12 soft card shadows, but §11 prescribes `--shadow-card` for vignettes and starters. Relax it for `--direction 11` (or count only heavy shadows).
- `color.accent` reported the caution orange (#A84A22) as the accent and ignored the pine (#2F5D50) on every button: low-chroma accents are missed.
- The `motion` profile lists every ease declared in tokens.css even when unused. That's noise; list only the eases actually used in transitions.
- The audit's mobile-full.jpg looked like the page rendered twice (stitching?); my own fullPage capture was correct.
