# The X-factor: one surprising picture, then a plain, excellent page

Measurements make a page **correct**. What makes it memorable is almost never a theme. It is **one picture nobody else would have chosen**, made to look real, plus **one sharp line**, with everything around them plain and very well made.

The builds that held up, and the user's own reference screenshots:
- **Tidewell** (invoices and stock for small cafés): a woman reading at a café table at golden hour. "The books close before you do." There is no ledger skin, no paper texture, no accounting puns.
- **Callback** (phone answering for trades): gloved hands at a copper pipe and a phone face-down on the floor. "Hands full. Phone answered."
- **Bulwark** (agent permissions): a *photograph* of a hotel key cabinet at night, three hooks empty. The rest of the page is ordinary product sections.
- **Sift** (ticket triage): a *rendered* wooden toy machine, tickets in and issues out, with three small labels.
- **Fornax, Answerr, Mugic, Wandor** (the user's references): bright ground, one strong image, clean sans, real product UI in cards, plain section names.

In each one the idea lives in **the hero picture and the h1**. Every other section is a normal, plain product page.

---

## What a rejected X-factor looks like (Waypoint B, 2026-10-20: "straight AI slop")

An earlier version of this file told builders to carry the idea into five places and to score their own "surprise". The result was themed dress-up, and the reviewer called it slop on sight:
- **The page dressed as the metaphor.** A parchment map with fold creases on a dark felt ground, every section a paper card with a drop shadow, pricing as three cloth book covers, storybook serif with italic captions. Dressing the page as the metaphor isn't an idea. It's the first thing any model does with "map".
- **The picture drawn by the builder.** Blob islands, dashed borders, contour rings and pins in SVG (105 shapes). However careful, builder-drawn illustration reads as clip art.
- **Puns as labels.** "Ask the map", "Key to the map", "Gazetteer", "Three sheets", "Pocket maps", "Next year's new hire walks your path." Every label you have to decode is a cost to the reader.
- **A generic generated landscape for the ending:** a moor and a waymark post, standing in for an idea.
- **Variant A failed differently:** a flat generated orienteering map in five saturated colours (yellow, green, sky blue, magenta and orange contours). It looked like a children's puzzle, with a Slack card colliding with the map in the hero.

**Lesson:** the builder's own creativity score is worthless as a judge. Both variants scored themselves well, and the reviewer rejected both. Judge against the reference row instead (X3).

---

## Step X (between Step 1 and Step 2)

### X1. Write the product's truth in one plain sentence
"Sift turns a pile of tickets into one issue per problem." It's the mechanism, not a tagline. List the input nouns (tickets, invoices, keys, calls) and the person who feels the problem (a plumber with full hands, a café owner at closing).

### X2. Write five **pictures**, not five themes
Each concept is a photograph or a rendered object, written as a shot: *"A ___ (subject), ___ (place and light), seen ___ (viewpoint). Headline: ___."*
- **The person in the moment** the product rescues: the hands are full, the shift is ending, it's the first morning.
- **A real object that does the product's job:** a key cabinet, a sorting toy, a split-flap board. It must be photographed or rendered as a real object, never drawn.
- **The product's real UI**, large and exact, on a bright ground (Quota's meter, Branchline's pull request).
- **An unexpected but true place:** where the work happens, not where the software runs.
- **The before and after,** shown in one frame.

Each concept should be shootable in reality. If it only works as a diagram, an infographic or a drawn scene, drop it.

### X3. Pick one with the reference-row test
Put a mock of the hero next to the reference row: Tidewell, Callback, Sift, Quota and the user's screenshots (`research/h-user-references/shots`). Keep the concept only if **all** of these are yes:
1. **Would it sit in that row** without looking like a different, cheaper genre (children's book, board game, fantasy map, scrapbook)?
2. **Is it real-looking?** Is the picture a photo, a physical render or real UI, with nothing you drew in SVG? (The audit fails `imagery.drawnHero` at 25+ SVG shapes in the hero.)
3. **Does it work on a plain page?** Delete every themed texture, label and pun. If the idea collapses, it was a costume, not an idea.
4. **Five-second test:** what it is, who it's for, and what to click, from the h1, the lede and the CTA alone.
5. **Ownable:** a competitor couldn't use the same picture unchanged.

### X4. Where the idea lives: two places, maybe three
1. **The hero picture and the h1.** This part is required.
2. **One product moment** in the first screen or just below it: the real answer, invoice or call log, in honest UI. This is required too.
3. **Optional, one more:** the finale image can echo the hero (the same place later that day, the cabinet with every key back). If you're unsure, don't.

**Everything else is a normal page, done excellently.** Use plain section names (How it works, Pricing, Questions, Security), plain plan names (Free, Team, Enterprise), standard nav labels, and the CTA verb of the product's actual action. You may name the product from the metaphor; the page's furniture doesn't get metaphor names.

### X5. One small interaction, optional
One interaction that runs the real mechanism (drag the engineer count and watch the invoice, pick a helpdesk and a tracker). It must be honest: it computes something real or is labelled as an example. It works with the keyboard and reduced motion, and the CTA never sits behind it. Leave it out rather than invent one.

---

## Banned: the costume list
- **Page skins:** paper, parchment, cardboard, felt, wood-grain or leather textures; fold creases, torn edges, tape, pins, stamps or postmarks; "printed" frames and title blocks; everything as a drop-shadowed card on a dark ground.
- **Drawn pictures:** SVG maps, islands, scenes, characters or diagrams as the hero or a section's main image; flat generated illustration with more than two saturated hues.
- **Theme vocabulary in the furniture:** metaphor words in the nav, section eyebrows, plan names, button labels or table headers; italic "captions" in a storybook voice; jokes that need the metaphor explained ("1:50 000 for 50,000 lines").
- **Skeuomorphic pricing:** books, tickets, cards, cans, sheets. Pricing is a clean table or three plain columns.
- **The genre swap:** a serif-and-parchment, board-game, fantasy-map, scrapbook or museum-label register on a software product, unless the brief explicitly asks for it.
- **A generic generated landscape or texture** used as the ending.

## Guardrails (these still hold)
- Clarity, honesty (no invented customers or numbers), AA contrast, reduced motion, the keyboard, and a CTA visible in the first viewport.
- The user's stated taste overrides any idea: bright, image-rich product sites like their screenshots, not dark editorial or themed pages.

## The Spine additions
```
IDEA        : <the picture, written as a shot> / h1 "<line>"  · reference-row test: 5/5 yes
PRODUCT     : <the honest product moment in or just below the first screen>
ECHO        : <optional: the one other place the idea appears, or "none">
PLAY        : <optional: the one honest interaction, or "none">
```
