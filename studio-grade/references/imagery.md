# Imagery: what fills the visual space

Across all 98 sites: **zero stock photography, zero generic 3D blobs, zero illustration packs** in top-tier work. (A generated series art-directed to the brand, §8, is not stock: it's made for this page, to a written brief.) The visual is always *the subject itself* or an ornament that is true to the domain. That is the hardest thing for an agent to do and the most important.

## Decision ladder

1. Does the product have a UI? → **Rebuild it in HTML** (§1). Every tier-1 SaaS site does this.
2. Is there a physical product, place, or person? → **Photograph or film it** (§4). No assets but an image-generation tool (Codex, gpt-image, Gemini/Imagen, Flux)? → **Generate one art-directed series** (§8). Neither? → art-directed placeholders (§5), and say so to the user.
3. Neither, or not yet? → choose the **medium from the brand and register** (range.md §2C): typography as the image (§2), an illustration cast (§6), a colour-block composition, a tactile object, a collage, or domain-specific ornament (§3). A thin line drawing with mono labels is right for deep-tech and dev tools and overused everywhere else; one per set at most.
4. Need colour and energy? → **Semantic colour fields** (color.md §1.6), not gradients.
5. Building a bright product site (direction 11)? → it **needs** an image system. Generate it (§8) or choose another direction: a direction-11 page without its image is the default AI look.

## 1. Product UI as the hero illustration (Linear, Attio, Ramp, Cursor, Sierra, BFL)

Don't use a PNG screenshot in a laptop mockup. Build a simplified, realistic app window in HTML/CSS:
- **Anatomy:** a window frame (12px radius, ring + soft shadow; see components.md), a 220–240px sidebar with 8–12 nav rows (13px, one active row on `rgba(ink,.06)`), a main pane with a real-looking object (issue, document, table, chat, chart), and optionally a floating secondary panel overlapping the main one (an agent chat, a checkout card, a command palette).
- **Content realism:** plausible names, dates, IDs, and numbers ("ENG-2214 Fix race in sync worker · 2h", "$12,480.00", "Cycle 42"). Never lorem, "John Doe", or "Feature 1". Domain-true content does half the persuasion.
- **One live state:** an agent "Thinking…" shimmer (`background-clip:text` sweep at 1.6s, the *only* acceptable gradient text), a typing caret, streaming words (`streaming-word-fade`), a card tilted 4–6° mid-drag with a raised shadow, a cursor gliding to a button, or a status changing from "In progress" to "Done".
- **Hierarchy inside the UI:** one focal pane at 100% and the others dimmed to 40–60% (or `filter:saturate(.6) brightness(.8)` on dark). Mask-fade the bottom/right edges into the page: `mask-image:linear-gradient(to bottom,#000 60%,transparent)`.
- **Placement:** below the hero text, bleeding off the fold (H1), off the right edge (H2), or inside a fake OS desktop (H3). On dark sites the UI is dark; on light sites, light UI in soft browser chrome.
- **Art layer behind the UI** (the top-tier differentiator per the kargul vs basement comparison): a landscape oil painting (Cursor), a grainy tiled wallpaper (Factory), a dotted halftone stage (Ramp), a blurred teal gradient canvas (Superhuman), a photographic blurred backdrop (Ramp's AI input). Coded UI alone reads template-grade. Coded UI over an art layer reads studio-grade.
- **Mobile:** crop to the most legible region of the same UI; don't swap in a phone mock unless the product is mobile.
- **Accessibility:** the replica is an illustration, not an interface. Wrap it as `<figure role="img" aria-label="Acme inbox with an agent drafting a reply">` and make its inner controls non-focusable (`tabindex="-1"`, or `inert`). Screen readers then get one sentence instead of 80 fake buttons. Dimmed fake-UI text is exempt from contrast rules, and the audit script skips `role="img"` subtrees.

## 2. Typography as the image

- A monumental word over or behind the subject (White Desert, Vast, Ayocin).
- A one-word hero (BFL "Image").
- A giant client or project index (Bennett & Clive).
- A rotating-noun sentence (Obama).
- A statement-only hero (Steve Jobs Archive).
- A sentence filter (Pentagram).
- Word chips (Drake), a letter-spread title (Miu Miu, SOIL).
- Giant numerals as stats (Ayocin 170px mono).

When the brand has no imagery yet, a type-led hero beats any decoration.

## 3. Domain-specific generative ornament (CSS, SVG, canvas)

Pick **one** that is *true to the domain* and repeat it as the motif. Each was seen on an award-level site:

| Ornament | Domain fit | How |
|---|---|---|
| Blueprint / tracing-paper grid | architecture, design tools, AI-for-making | two 1px linear-gradients at 24px on a cream paper (illoca `#EADFC9` with lines `#D3C9B5`) |
| Crosshair technical grid + callout chips | industrial, aerospace, logistics | techniques.md §4 + chips "AT SCALE ⊕" |
| Dashed construction lines + registration marks | infra, dev tools | techniques.md §3 (Baseten) |
| Isometric line drawings with mono labels | infra, data, systems | SVG with 1px strokes, dotted hidden edges, labels like `TRAINING INFRA`, `123MS TTFT` (Baseten, Linear FIG) |
| CV annotation boxes | vision, AI, imaging | 1px boxes + mono chips `monk_1` (BFL) |
| Dithered / halftone canvas (or a halftone stage densifying into the accent, convt) | docs, publishing, retro-tech, AI, file and media tools | Bayer or Floyd-Steinberg on a canvas, 1-bit in brand green (Mintlify), halftone dot stage (Ramp) |
| ASCII / glyph field | dev, AI infra, web3 | a 300px mono glyph string, or a scrambling glyph loader (Baseten, Igloo) |
| Contour / terrain lines | wine, land, outdoors, maps | SVG polylines of noise isolines (Symphony of Vines loader) |
| Hatch / barcode stripes | product spec, packaging | `repeating-linear-gradient` (Oryzo, Factory, AlphaSense's barcode rules) |
| Pixel-tile mask / GIS map | climate, geo, data | a canvas of square tiles dropping out + hairline grid + coloured dots (Inversa) |
| Orbital rings, dotted circles | space, networks | concentric 1px circles at 8–10% (BOSS, Vast) |
| Concentric "sun" pattern from the logo | civic, brand systems | derive arcs and rays from the logomark (Obama, Manual) |
| Coordinates, route codes, specs | travel, hardware, logistics | mono 10–12px text as texture |
| Leaf-shadow light drift | outdoor, wellness, furniture | techniques.md §54 (Floema) |
| Particle / point-cloud globe | payments, global networks | a dotted sphere on canvas (Stripe) |
| Grainy art-directed orbs | voice / audio AI *only* when tied to the concept | ElevenLabs' "voice signatures": grainy, smoky, one per voice. **Not** generic glow blobs |

Generative art must be **monochrome or accent-only**, quiet (≤ 15% contrast against the paper unless it is the subject), and cheap (CSS/SVG first, canvas second, WebGL last).

## 4. Photography and film: art direction

When real imagery exists, treat it as cinematography:
- **Subject-specific and human:** the robot on real streets (Serve), a sleeping baby for a healthcare voice agent (Sierra), founders at a table (Lightfield), the stadium full of people (Populous). Not models pointing at laptops.
- **One consistent grade per campaign:** warm 70s film (Aesop), misty muted green-grey (Magda), golden hour (Scout), cold ice greys (White Desert). Write the grade in the Spine.
- **Crop with intent:** cut at the knees when the product is trousers (Carhartt), shoot macro for objects (Oura's ring on rock with a ladybug), top-down for devices (Daylight on grass).
- **Aspect ratios:** 4:5 portrait for fashion and product, 16:9 or 21:9 for film and landscape, 3:4 for archive cards. Set `aspect-ratio` and `object-fit:cover` with a deliberate `object-position`.
- **Legibility:** scrims only where the text sits (`linear-gradient(to bottom,transparent 45%,rgba(0,0,0,.85))` bottom; Byredo's top+bottom vignette), never a flat 50% black overlay.
- **Treatments:** grayscale for third-party screenshots (Vercel); duotone for brand illustration (illoca's blue + paper); `mix-blend-mode:multiply` cut-outs on colour fields (Eames); blur-at-rest → sharp on hover (Cartier 365); LQIP blur-up while loading (AIC).
- **Film:** autoplay muted `playsinline loop` with a poster frame, **always** with pause and mute controls, and paused under reduced motion. Hero film at 80vh lets the next section peek (Aesop).

## 5. When you have no assets: art-directed placeholders

Don't fill slots with random stock or AI-gradient art. Build a placeholder that *communicates the brief*:
```html
<figure class="ph" style="aspect-ratio:4/5">
  <figcaption class="t-label">PHOTO · Founder at workbench, raking window light from left, 35mm, warm grade, crop at chest</figcaption>
</figure>
```
`.ph{background:var(--sunken);display:grid;place-items:end start;padding:16px;background-image:<subtle hatch>}`. This shows the layout honestly, gives the client an art-direction shot list, and still looks designed. Tell the user which slots need real imagery.

If an image-generation tool is available, prompt like a photographer: subject, lens, light direction, grade, crop, and what to exclude ("no text, no logos, no people looking at camera"). Generate **one consistent series**, not a mixed bag. When the photo carries the headline, compose it around the type (reserve the zone, horizon low, subject in a lower third) and reuse that one image across hero, step cards and finale (techniques.md §68–70).


**Placeholder discipline** (learned from test builds):
- Use a placeholder only where a photo will *definitely* go, and give it the final aspect ratio. **At most one full-bleed placeholder per page.** A 600px band of texture with a caption reads as an empty section.
- Every viewport that contains a placeholder must also contain real content (type, data, UI). Never let a placeholder be the only thing on screen.
- Don't fill photo slots with the motif ornament. Keep the ornament for its own jobs (see SKILL.md law 4), and keep placeholders visibly "awaiting photo" (hatch + caption).
- Prefer layouts that don't need the photo yet: type-led heroes, data, spec tables, maps and diagrams that carry *real information* (Halden's depth chart with actual soundings beats a blank landscape slot).

## 6. Illustration (Playful System, Institutional)

- Use a bespoke, consistent cast or style (Family's blob creatures, MindMarket's rubber-hose crowd, Obama's commissioned editorial illustrators, Teenage Engineering's hand-inked comics). Use a limited palette drawn from the site's colour system.
- If you can't commission it, build simple geometric characters or icons in SVG from the motif (circles, arcs, the logo's geometry), and animate them on springs.
- Avoid unDraw, Humaaans, and Blush-style generic packs, 3D clay emoji, and isometric "people at dashboards".

## 6b. Collage / cut paper (Fieldwork, Scout archive cards, Granola)

- **Material:** 3–5 flat paper colours from a *legend* (each colour means something: water, planting, hard ground), one cream "design layer", and the ground as the table (chipboard, kraft, desk).
- **Hand-cut edges:** SVG paths with slightly irregular vertices (jitter 1–3px), never perfect rectangles. Rotate pieces −4° to +4°.
- **Contact shadow, not drop shadow:** `filter: drop-shadow(0 1px 0 rgb(0 0 0/.18)) drop-shadow(0 6px 10px rgb(0 0 0/.12))`. Paper sits *on* the table; it doesn't float.
- **Grain:** one shared paper-grain overlay (SVG turbulence, 4–6% opacity) over everything, so all pieces read as the same stock.
- **Craft details:** masking-tape strips at corners (semi-transparent cream, 4% rotation), offcuts in empty corners, handwritten-style captions on paper slips ("model 1:500").
- **Motion:** pieces slide, peel and stack like hands are moving them (expo-out, 600–900ms, small rotation settle). Scrubbed sequences can flood, fill or peel layers. Keep text on *untilted* slips so it renders crisp; tilt only the paper behind it.

## 6c. Flat colour still life (quiet commerce with no packshots: Morrow test build)

When there's no photography of an object, draw it as a Hammershøi-style still life: a wall plane, a shelf plane, a window-light parallelogram on the wall, the object, and **its cast shadow**, all as flat SVG fills in one restrained palette per scene. It beats line art for fragrance, ceramics, food and objects, because colour and light carry the mood that a packshot would.
- **One light vector per scene** `v = (dx, dy)` for the window light and the shadow alike. Shadow = the convex hull of the object's footprint and the footprint shifted by `v`; tall parts (a cap) cast a second, offset hull at `v·h/H`.
- **Give the footprint real depth** (≈20 units at a ¾ view). With a thin footprint, sideways shadows collapse into sticks.
- **Glass reads as glass** with a lighter "caustic" band inside the shadow (from `v·.3` to `v·.75`) and a 1px highlight down one edge of the object.
- **A series, not one picture:** keep the shelf height, the camera and the object constant, and vary only the wall colour and light angle. Then the scenes become the product range's system (Morrow: one scene per hour of the day).
- Reveal with **light-up** (motion.md §5): from grey into colour, no movement.

## 8. Generated image series (when an image tool is available)

The user-supplied references that read as most finished (Fornax, Answerr, Mugic, Wandor) all run on **one generated image system**: a sunlit photo composed for the headline, a steel engraving, a pastel object set, a painterly landmark collage. The tool is not the hard part; consistency and art direction are.

**1. Write a style bible in the Spine before generating anything:**
```
IMAGES      : medium      steel engraving, one navy ink (#24407A) on white, fine crosshatching
              setting     a 19th-century university town; the same buildings recur
              recurring   describe any object that appears twice in full, every time ("the same small white van with a blue stripe")
              light       soft, from upper left
              palette     #24407A, #F4EFE3 (paper), nothing else
              viewpoint   eye level, slight low angle for buildings
              type zone   top 40% clear sky in the hero; left third clear in feature crops
              exclude     no text, no logos, no watermarks, no UI, no people looking at camera, no grey fills
              shot list   hero 21:9 · 3 supporting 4:3 · finale (re-crop of hero or companion) · 4–8 small objects (transparent PNG)
```
**2. Prompt every image with the whole bible**, then the shot: `[medium] of [subject], [composition and type zone], [light], palette [hexes], [viewpoint], [texture]; part of a consistent series; [exclusions]`. Generate one image per call, in order, and reuse the exact wording, so the series doesn't drift. For object sets (toys, icons, ingredients), generate **one sprite sheet** ("SIX separate objects in a 3×2 grid, wide even spacing, pure white background, objects floating, no contact shadows") and cut it apart (step 5). Shadows are easier to add back with CSS `drop-shadow` than to remove.

**Derive crops before you build:** write a crop table in the Spine (hero → mobile 4:5 crop, step cards → three regions of the 4:3 shots, finale → re-crop or companion). A single file can serve several crops with `background-position`/`object-position`. It stops you reaching for a fifth image.

**3. Choose the medium from the brand's claim** (techniques.md §72). Certifies → engraving. Plans journeys → painted travel poster or collage. Frees your time → a sunlit photo of the outcome (§68). Makes music or toys → pastel objects with faces or chunky hardware. Calm and craft → a flat still life (§6c).

**4. Check every image before using it:**
- Hands, faces and anatomy.
- Letter-like artefacts: regenerate if they're large or central; a speck under ~0.5% of the frame can be clone-retouched in the file.
- Palette match, and the **same level of detail** as the hero: a series drifts from flat poster to painterly.
- The **same recurring objects**: you asked for the van and got a box truck.
- In one-ink media, accept tint drift only if it reads as the same ink at low density.
- The type zone is actually clear: the audit's `a11y.contrast.media` measures it.

Regenerate rather than patch with CSS overlays.

**5. Ship it properly** with `scripts/images.py` (Pillow; numpy optional):
- **Sources are read-only.** Write processed files under new names (`hero-1916.webp`, `toy-fox.png`). A cut-out named `moon.png` once overwrote the footer sky called `moon.png`.
- **One paper per series:** generators return each image on a slightly different paper (four engravings came back on four creams). `images.py paper SRC OUT --to '#F3ECDF'` maps each to the bible's paper. Then plates sit seamlessly on a band of that colour.
- **Images that blend onto other grounds:** `images.py paper SRC OUT --to white` divides the paper out to white, so `mix-blend-mode:multiply` works on any tint (paper × paper is a darker box). Put the blend mode on the wrapper: a wrapper with `z-index:-1` is its own stacking context and blends with nothing.
- **Sprite sheets:** `images.py cutout SHEET --grid 3x2 --names fox,rocket,… --prefix toy-` cuts each cell from the border inward. It reopens enclosed holes (a teapot handle), drops fragments of neighbouring cells, feathers the edge and removes the white halo. It writes WebP with alpha plus a PNG fallback.
- **Sizes:** `images.py export SRC --name hero --widths 960,1916`. Generated 21:9 heroes are about 1916px wide, so ship 960/1916 and never upscale. Ask the generator for ≥2400px if a full-bleed hero must be crisp at 1440 on 2× screens. Add a separate **mobile crop** (`--crop x,y,w,h`) through `<picture><source media="(max-width:760px)">`; `object-position` on a 21:9 can't keep both subject and type zone at 390px. Use `--flat` (q90) for images with large flat paper or sky, which posterise at q80.
- **Sample the type-zone colour and use it as the section ground,** feathering the image's top edge into it with a 12–24% mask. Then the image can end at any viewport height. Mask the container, not the `img`, or a seam shows when the image is taller than its box.

Then export AVIF or WebP plus a JPG fallback at 1× and 2× (`sips`, `cwebp` or `sharp`), set `width`/`height`, `fetchpriority="high"` on the hero and `loading="lazy"` on the rest. Keep first-view image weight under ~1.5 MB. Alt text says what the image shows ("A woman working on a laptop in a park above the city"), not what it means.

**6. Honesty:** generated people are not customers, and generated places are not your office. Never caption them as real. Never generate a "screenshot" of the product UI: build the UI in HTML (§1) and put it *on* the image (techniques.md §69).

**With Codex CLI** (image generation is on by default in recent versions):
```bash
codex exec --skip-git-repo-check --sandbox workspace-write -C ./img \
  "Use your image generation tool to create ONE image: <style bible> <shot>. Save it in the current directory as hero.png. Reply only with the path." < /dev/null
```
Run the calls one after another (parallel calls drift and hit rate limits), then convert: `sips -s format jpeg -s formatOptions 82 hero.png --out hero.jpg` and `cwebp -q 80 hero.png -o hero.webp`.

## 7. Icons

- A single line icon set at a 1.5px stroke, sized to the text cap height (16–20px). Use it rarely. Top sites use far fewer icons than templates do.
- Prefer glyphs in type: `→ ↗ ↳ ⌄ + × ● ◆ ⊕ ✓`.
- Never put icons in coloured rounded squares above feature titles. If a feature list needs markers, use mono numerals (01 02 03) or `+`.
