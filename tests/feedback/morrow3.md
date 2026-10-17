# morrow3: skill feedback

- Direction 5 had the right rules but no recipe for a page that already has generated photography: its "No packshots?" bullet goes straight to SVG still lifes (§6c, from the rejected Morrow). Add a "with a photo series" branch: walls as grounds, the bottle small in a big room.
- Biggest win was not in the skill: the bible asked for a blank label, so the page writes each hour on the label in HTML (mix-blend multiply, cqw sizing on a container-type stage). It became the motif (hero links, captions, vial inventory, finale). Worth a technique: "fill the blank in the photo with live type"; it needs the bible to reserve a flat blank zone on the object.
- Measuring the label boxes needed ad-hoc Python (flood fill from a seed point). images.py could gain `locate SRC --seed x,y` that prints a % box for overlays.
- imagery.md §8 "sample the type-zone colour" worked better as a 10-stop horizontal gradient than one hex: window light makes walls darken across the frame. Say so, and add `images.py sample SRC --rows 0,12 --steps 10` to print the CSS gradient.
- Sampled hex values looked much darker than the images felt in preview (#968E84 reads pale in a thumbnail). Tell agents to trust the numbers when checking contrast on a mid-tone wall.
- Direction 5's "hero text 18–31px, never 64+" vs a Confident register: I stayed at 56px and put the scale into the 128px hour numerals. One line in range.md on where the bold device goes when the direction caps the hero would help.
- Audit caught a real bug the screenshots hid: a hover ::before with negative inset widened the page 4px on mobile. The overflow message named header.nav (fixed, full width), which pointed the wrong way. Report pseudo-elements, or say "something under body is 394px".
- motion.text flagged 6/13 paragraphs revealing because data-reveal-group sat on a text list. Good catch; components.md could say lists of text rows are not "card groups".
- `picture` stays inline by default and left a 2px descender gap under bled images; add `picture{display:block}` to tokens.css next to img.
- Footer rule (§76) and the placeholder chip pattern were easy to follow. A dashed "Placeholder" chip read as honest and didn't break the luxury tone.
- Missing: guidance for the "now" detail when the brand is about time (the hour now in Copenhagen tag); §52 only covers clocks.
