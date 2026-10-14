# Hush (direction 11, Quiet, hero = §73 artifact on the engraving): skill feedback

Final audit: 0 fail · 0 warn · 10 pass (first run: 1 fail, 3 warn).

## Direction 11
1. The recipe works well for a trust-heavy brief. The things that made it look finished were the image series, real clinical content in the vignettes, and the serif display. Add one line: "for regulated buyers (health, finance, legal), the honesty layer is content". The certificate panel with visible Placeholder chips became one of the strongest sections, not a disclaimer.
2. The anatomy assumes pricing exists. This brief had none, so I swapped §7 for "how a pilot runs" (a 4-week timeline). Say: "no pricing in the brief → replace with the buying process (pilot, onboarding), never invent prices".
3. "White page" vs the engraving's cream paper: say how they meet. Cream bands for plates, data and footer on a white page worked. Pure white next to a cream image edge looks unfinished unless the plate is framed (I used a double hairline ring and guilloché rails).
4. Contrast tiers: `--ink-3` at .6 in the d11 block is borderline. Integration names at 50% ink failed AA (3.28:1). Note that "logo row" text needs ink-3 (.62) or darker.

## imagery.md §8
5. Step 5 is missing a paper-normalisation step. The four generated images came back with four different papers (#EADDCA, #F5EEE0, #EFE3D1, #F2EBDF). A per-channel gain that maps each image's paper to the bible hex (sample paper, multiply by target/paper) made them one series and let plates sit seamlessly on a matching band colour. Add it with a 6-line PIL snippet. It's a grade, not an overlay, so it doesn't break the "don't patch" rule.
6. Add "derive the crops before you build". The §69 step cards, the mobile hero and the finale were all crops of the one hero plate (window, plant, print, room without the note). A crop table in the Spine stopped me reaching for a 5th image.
7. Flat cream areas posterise at WebP q80 (blocky sky in the footer terrace). Suggest q86+ or `-sharp_yuv` for engravings with big empty paper zones, or feather the top edge with a mask.
8. The foxglove came back hand-tinted pink in the flowers: a second hue that breaks "one ink". It was mild enough to keep. The §8 checklist should say "tint drift in one-ink media: accept if it reads as the same ink at low density, else regenerate".

## techniques §72 / §73
9. §73 plus §76 make a great bookend that the skill doesn't name: the hero sets the artifact on the room, and the finale re-crops the same room without the artifact, with the headline on the now-empty wall ("Two chairs, one conversation."). Add it to §73 as the default finale for artifact heroes.
10. §73 should say where the card goes on a 21:9 plate: centred over the clear zone, max ~58% of the plate width. On mobile, take a 5:4 crop of the plate anchored at the bottom and let the card overlap it by about 24%, rather than shrinking the plate.
11. §72 guilloché CSS: the rails look like grey barcode at 1px/7px on white. Tinting them with the image ink at about 22% alpha read as engraved. Say "tint the security-print lines with the series ink".
12. A naming idea worth adding to §63: for engraving/book-plate series, number every image as a Plate (I–IV) with an italic caption. It gave captions a voice, and honest ones ("Example note; the patient is fictional").

## Audit
13. `shape.shadows` WARN fired on direction 11's own `--shadow-card`. The recipe says vignettes float, so exempt `role="img"` replicas and d11 cards, or raise the threshold for --direction 11.
14. `mobile.body` flags 12px text inside `role="img"` replicas (the consult note). Contrast already skips role=img; this check should too, or say so explicitly.
15. `a11y.contrast.media` FAIL was real but well hidden: the footer clock ("06:50") sat on the terrace's chimneys after `object-fit` cropped the image upward. Worth adding "§76 art must start below the footer base row" to §76.
16. After my static server was killed, the audit hung for 240s on "desktop slices" and blamed a "hanging loader". Check that the URL responds first and report "server not reachable".
17. On mobile, `mobile-full.jpg` (22,858px) repeats earlier sections at the bottom (a stitching artefact), so the footer can't be judged from it. Targeted per-section screenshots were needed.
