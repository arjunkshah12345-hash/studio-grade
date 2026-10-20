# The X-factor: the idea a measurement can't give you

Everything else in this skill is measured: type scales, colour shares, motion timings, what 99 studio sites actually do. Measurements make a page **correct**. They don't make it **memorable**. The sites people screenshot and send to a friend have one more thing: a creative idea that only this brand could have, carried with total commitment.

Examples from the references:
- **Oryzo (Lusion)** sells a cork coaster as if it were an AI product launch, with 55 viewports of keynote-grade WebGL for a coaster. The joke *is* the craft.
- **Jawad Jalal's earlier portfolio** is a trip, not a page: scroll moves you sideways along cards on a desk, the nav is a metro line, his name turns into "DESIGN", and the room's lights go down for "Your move." (techniques §94).
- **Ignaru** draws "a growth engine in a box" as a literal toy machine: leads go in the hopper, emails fan out the end (§84).
- **ChadwickAI** sells an AI dating coach with a Renaissance oil painting, duotoned. The gap between the classical image and the app is the punchline (§91).
- **Bulwark** (a gallery build) turns AI-agent permissions into a hotel key cabinet at night; the three empty hooks are the agents currently out.

None of these break the skill's discipline. They use it to carry an idea.

---

## Step X (between Step 1 and Step 2): find the idea before the layout

### X1. Write the product's truth in one plain sentence
"Sift turns a pile of tickets into one issue per problem." Not a tagline: the mechanism. The idea has to come out of this sentence, or it's decoration. **List the input nouns too** (tickets, pull requests, invoices, keys): ideas usually rhyme with what goes *in*. Waypoint's map came from "a year of pull requests = the paths people already walked".

### X2. Generate five concepts, each from a different lens
Write one line per concept: *"The site is ___, so the hero is ___, and the visitor gets to ___."*

| Lens | Ask | Example |
|---|---|---|
| **Literal object** | What physical thing does the product's job? | the toy machine (Ignaru), the key cabinet (Bulwark) |
| **Borrowed format** | What existing format could the whole page pretend to be? | a keynote (Oryzo), a museum audio guide, a flight manifest, a recipe card, a court transcript, a field notebook, a trading card set, a patch note, a train timetable |
| **Unexpected world** | Which distant world rhymes with the product? | Renaissance painting for a dating coach (ChadwickAI), a hotel front desk for permissions, a lighthouse for monitoring |
| **The visitor's own stuff** | Can the page use the visitor's input, time, place or device? | type your repo name and the map draws it; the page knows it's 2 a.m. where you are |
| **The journey** | Is there a trip from a problem to a resolution that the scroll can *be*? | a sideways trip along a desk ending with the lights down (Jawad), a descent from noise to signal |

### X3. Score them and pick one: the boldest that still sells
Score each concept 1–5 on four questions, and pick the highest *total* with **Surprise ≥ 4 and Clarity ≥ 4**:
- **Surprise:** would a designer who has seen a thousand SaaS pages stop scrolling?
- **Truth:** does it come from the product's mechanism (X1), so that it explains the product better than a plain page would?
- **Clarity:** in five seconds, does the visitor still know what it is, who it's for and what to click?
- **Ownability:** could a competitor use the same idea? If yes, it's a genre, not an idea.

**Honesty gate:** if the concept's play would show a result the page can't really compute ("type your repo and we map it"), it's a sample: label it as an example, or pick another concept.

Write the winner and its score in the Spine (`IDEA:`). Kill the other four: one idea, fully committed, beats three half-ideas.

### X4. Commit to it in five places, each in its own way
The idea must show up in all five, and the motif rules still apply (change role and scale each time):
1. **The hero:** the idea is visible in the first frame, not explained in a paragraph. **If the idea is a symbolic format** (a map, a score, a circuit, a timetable), put its key or legend in the hero: the legend is what makes it readable in five seconds.
2. **One thing to play with:** an interaction that runs the product's mechanism in miniature: pull the lever, drop a ticket in the hopper, hang a key back on its hook, drag the slider and watch the invoice change. A toy, not a tour: it does one thing, takes under five seconds and gives a satisfying result. It must work with the keyboard and with reduced motion (it simply shows the end state).
3. **The language:** names, labels, the CTA verb, the empty states and the 404 come from the idea's world (techniques §63, naming), but every heading still says what the product does in plain words.
4. **One detail that rewards a second look:** something a visitor finds rather than is shown: a hover state that answers back, a footer line that continues the joke, the visitor's local time in the scene, the number on the key tag matching the pricing tier.
5. **The ending:** the idea pays off. The machine finishes its run, the lights go down, the last key is handed over, the transcript is signed. The finale is the idea's punchline, not a repeat of the hero.

### X5. Break one rule on purpose, and say which
A creative page breaks exactly **one** of this skill's defaults, deliberately, because the idea needs it: the h1 set inside the object's own title block (a map's cartouche, a record label, a ticket stub) instead of a split header, sideways travel, a hero with no visible headline for a second, one huge interactive object instead of a split header, a single typeface used at three wildly different scales, a page that changes with the visitor's time of day. Name it in the Spine (`BROKEN RULE: … because …`). Breaking two rules is noise; breaking none is a template.

---

## Guardrails (the X-factor never pays for)
- **Clarity.** The five-second test still passes: what it is, who it's for, what to do. If the idea needs explaining, it's the wrong idea.
- **The audit.** Contrast, overflow, reduced motion and keyboard access are not negotiable. A creative page that fails AA is just a broken page.
- **Honesty.** The idea can be playful; the facts can't. Invented customers or numbers are still forbidden, however good the joke.
- **Speed to the CTA.** The primary action is visible in the first viewport and reachable without playing with anything.
- **Taste.** Clip art, stock 3D blobs, confetti, a cursor trail and a mascot waving are not ideas. If the concept could be described as "fun animations", start X2 again.

## Evidence: the A/B test (gallery, 2026-10-20)
Same brief (Waypoint, an AI guide that onboards engineers to a codebase), same image budget, same audit. **A** used the measured skill only; **B** added this step. Both reached a map metaphor, because the skill already pushes for a motif. Both passed the audit with 0 fails and 0 warns. The difference was commitment:
- **A** (orienteering map) put a correct split header beside a decorated map and a Slack card. Clear and well made, but the map was decoration around a standard page.
- **B** (a printed walking map) *was* the map: the h1 sat in the map's title block with its legend; "Ask the map" drew a route to the exact line and its owner; the owners became a gazetteer, the first week a route card, the plans three pocket maps (the Free sheet's scale is 1:50 000, matching its 50,000-line limit); the ending was a moor trail with Friday's waypoint on the waymark: "Next year's new hire walks your path."
X4 (five places) did the most work: without it, pricing and the ending would have been generic cards.

## The Spine additions
```
IDEA        : <the site is ___ / so the hero is ___ / and the visitor gets to ___>  (Surprise _/5 · Truth _/5 · Clarity _/5 · Ownability _/5)
PLAY        : <the one interaction that runs the mechanism in miniature>
SECOND LOOK : <the detail a visitor finds>
ENDING      : <how the idea pays off in the finale>
BROKEN RULE : <the one default broken, and why the idea needs it>
```
