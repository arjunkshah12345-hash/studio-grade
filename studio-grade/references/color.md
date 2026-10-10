# Color: discipline, measured palettes, dark mode

## 1. The rules (each holds across the clusters)

1. **(Quiet and Confident register.) Neutral surfaces cover 85–95% of pixels. The accent covers 1–5% and does one or two jobs.** In the Loud register, colour is the ground (see rule 6 and `range.md`). Choosing the ground is a decision; off-white is only one of six options (range.md §2A). Measured jobs include the primary CTA (Oura blue, Obama Donate blue, Ace BOOK NOW orange), index numerals and eyebrow dots (Factory: 3 text nodes on the whole page), the buy path only (Daylight amber), tiny status markers (White Desert orange, Vast orange), and links (AIC red). TIME's red appears only in the logo.
2. **Exactly one accent hue.** Five accents (Agent Arcade) is the measured "lower tier" tell. A second, minor accent is allowed only as a registration-mark detail (Baseten pink) or as **full-bleed section fields** (see rule 6).
3. **Never pure black on pure white, or the reverse.** Inks are tinted near-blacks and papers are tinted off-whites. Pure white pages are fine for fashion that lets clothes speak (Totême, Akris), but body text is still `#090909`–`#333`.
4. **Tint toward the brand's material.** Use cream and charcoal for an apothecary (Aesop `#FFFEF2` / `#333`), linen and stone for a resort (Aman `#F3EEE7` / `#313131`), olive-black for a lime-helmeted driver (Lando `#282C20`), green-black for a sawmill (ANAI `#212721`), teal-black for logistics (Terminal `#052424`), navy-black for a HUD (Hubtown `#020A18`). The accent is often **the product's own colour**: Radian's bike yellow, Serve's robot mint, Aesop's amber bottle, Lando's helmet lime.
5. **Text tiers are one ink at different opacities**, not unrelated greys: 100 / 60 / 40% (Cursor 60/55/50/40, BFL white at 65%, Lightfield .85/.6/.5). This keeps every tier in the same hue family on any background.
6. **When colour goes big, it goes full-bleed and semantic.** Norton gives each section its own field (programs blue `#6098FF`, exhibitions yellow `#F6BE11`, green `#76A93D`). Fondation Cartier draws one poster colour per exhibition. Obama uses colour story tiles. Dropbox Brand tiles each pair a field with **a dark tint of the same hue for text** (`#684505` on `#FAD24B`; `#B4C8E1` on `#283750`), never black or white.
7. **Customer or brand-coloured cards** (Mintlify) let you add colour without breaking your palette: a carousel card filled with *the customer's* brand colour and white stats.
8. **Gradients are functional or art-directed, never decorative.** Allowed uses: legibility scrims on photos, marquee edge fades, 1px glow lines, one art-directed shader (Stripe's ribbon), muted earthy card grounds (Sierra: sage→moss, steel blue, mauve, terracotta), a grey studio sweep behind cut-outs (Akris `linear-gradient(160deg,#F3F3F3 4%,#E6E6E6 95%)`). **Banned:** purple→blue hero blobs, rainbow mesh, gradient headline text, neon glows.
9. **Hairlines are 1px at 6–12% ink.** Light mode: `rgba(0,0,0,.06–.1)`. Dark mode: `rgba(255,255,255,.06–.12)` (Linear uses .08 68×). Resend uses a cool blue-white alpha `rgba(214,235,253,.19)` instead of a neutral one.
10. **Logos are monochrome**: `filter: grayscale(1)` (Factory), `brightness(0) opacity(.3)` (Sierra), or `brightness(0) saturate(1)` (Vast). Grey to colour on hover is acceptable (AlphaSense).

## 2. Measured palettes (copy, then adapt)

### Dark
| Site | Paper | Surface | Ink | Ink-2 | Hairline | Accent |
|---|---|---|---|---|---|---|
| Linear | `#08090A` | `#0F1011` | `#F7F8F8` | `#8A8F98` / `#62666D` | `rgba(255,255,255,.08)` | none in chrome; CTA is `#E5E5E6` |
| Raycast | `#07080A` | `linear-gradient(137deg,#111214,#0C0D0F)` | `#FFFFFF` | `#9C9C9D` | `rgba(255,255,255,.06)` | `#FF6363` |
| Resend | `#000000` | `linear-gradient(42deg,#141517,#191B1E)` | `#F0F0F0` | `#A1A4A5` | `rgba(214,235,253,.19)` | purple glow `rgba(131,84,254,.21)` |
| Black Forest Labs | `#111111` | `#0F0F0F` | `#FFFFFF` | white @65% | — | lavender `#E0DDFF`, teal chips `#29C592` |
| Mercury | `#171721` | `#1E1E2A` / `#272735` | `#EDEDF3` | `#C3C3CC` | `rgba(175,178,206,.36)` | periwinkle `#5266EB` |
| Lando Norris | `#282C20` olive | `#111112` | `#F4F4ED` | — | — | `#D2FF00` (+ `#B2C73A`) |
| Atlas Motion | `#181818` | `#121211` | `#EEE8E8` | `rgba(204,203,189,.5)` | grid `#2A2A2A` | `#FFFDE0` warm highlight |
| Inversa | `#13140E` | `#12120C` | `#F4F3E8` | — | cream @5% grid | lime `#EBFC72`, coral `#F1664D` dots |
| Terminal Industries | `#052424` teal-black | — | — | — | — | acid lime `#ABFF02` |
| Hubtown loader | `#020A18` navy | — | `#D5E0FF` | @20% | — | — |
| Oryzo | `#100904` brown | `#382416` | `#FFEDD7` | — | — | `#DC5000` |
| Serve Robotics | `#0B3332` / `#0F4233` | — | `#083031` on light | — | — | mint `#61E5C0` |
| convt | `#0A0B0B` | `#111312` / `#161918` / `#1C201E` | `#EDEFEE` | `#A1A6A3` / `#838985` | `rgba(255,255,255,.08)`, `#2E3331` | green `#22A867` (text `#7FD3A6`) |

### Light and paper
| Site | Paper | Surface | Ink | Ink-2 | Hairline | Accent |
|---|---|---|---|---|---|---|
| Vercel | `#FAFAFA` | `#FFFFFF` | `#171717` | `#4D4D4D` / `#8F8F8F` | ring `rgba(0,0,0,.08)` | link `#0070F3` only |
| Stripe | `#FFFFFF` | `#F8FAFD` / `#E5EDF5` | navy `#061B31` | slate `#50617A` | `#E5EDF5` | blurple `#533AFD` |
| Factory | `#F5F5F5` | `#FFFFFF` / sunken `#EBEBEB` | `#020202` | warm grey ramp `#D6D3D2…#1F1D1C` | `#B8B3B0` | `#EE6018` (3 nodes) |
| Cursor | `#F7F7F4` | `#F2F1ED` / `#EBEAE5` | `#26251E` | ink @60/55/50/40% | — | `#F54E00` |
| Anthropic | ivory `#FAF9F5` | oat `#F0EEE6`, tan `#E3DACC` | `#141413` | `#B0AEA5` | — | none on homepage |
| Daylight | cream `#FAF5F2` | sand `#E8DED8` | olive-black `#17190F` | — | — | amber `#FF9D00` (buy path only) |
| Mintlify | `#FFFFFF` | cream `#FAF8F5` | `#0A0A0A` | ink @60% | rails `#F1F0EE` | green `#0C8C5E` / `#1FA77A` |
| Baseten | `#FFFFFF` | mint-grey `#F5F8F4` | `#000000` | sage `#B9C6B3` | dashed `#D9D9D9` | neon `#19E76E` + pink |
| Ramp | `#FFFFFF` | warm stone `#F4F2F0` | `#0A0908` | ink @60% | `rgba(33,33,33,.1)` | lime `#E4F222` (highlighter) |
| Dia | cream `#FBFAF6` | — | `rgba(0,0,0,.85)` | `rgba(0,0,0,.42)` | `rgba(0,0,0,.3)` | yellows `#FFDC5C`, `#FFCB30` |
| Sierra | `#F6F5F3` | — | `#302E2D` | `#716F6C` | — | deep green `#006838` |
| Studio D | `#FFFFFF` | cream `#F2EDE4` | `#1E1D1C` | — | `rgba(30,29,28,.2)` | none (section tints beige/sage) |
| Floema | paper `#F2EFEA` | — | `#241F21` | `#988F8B` | — | pale yellow `#E9E778` |
| illoca | paper `#FDF8F0` | blueprint `#EADFC9` | `#373737` | tan `#C2B192` | grid `#D3C9B5` | blue `#3B60C5` (+ CTA `#283F7D`) |

### Luxury, place and institution
| Site | Paper | Ink | Ink-2 | Accent / fields |
|---|---|---|---|---|
| Aesop | `#FFFEF2` | `#333333` | `#666666` | amber `#945C26` (12px flags) |
| Totême | `#FFFFFF` | `#090909` | `#5A5A5A` | none |
| Aman | linen `#F3EEE7` (panels `#FDF9F5`, `#E6E2DB`) | `#313131` | `#585858` | none; charcoal "Reserve" |
| Magda Butrym | `#FCFAF7` (panels `#F5F2ED`) | white on film | — | none |
| Oura | cream `#F7F1E8` (cards `#EFE6DB`, dark `#1C1B1A`) | cocoa `#4A4741` | taupe `#A8A5A0` | blue `#2A72DE` (Explore only) |
| White Desert | `#FFFFFF` | navy `#1F2A44` | `#535353` | orange `#FF7E15` (one tab) |
| ERA Residence | cream `#F3F3EC` | navy `#17233B` | — | powder blue `#B5CEDB`, aubergine `#340C24` sections |
| Tengile | `#F5EEE9` | `#373F1D` | — | olive `#5C6E21`, deep green `#00443B` |
| Ace Hotel | `#FFFFFF` / `#EAEAEA` | `#231F20` | — | olive `#707951`; orange `#FF944C` (BOOK NOW only) |
| Art Institute of Chicago | `#FFFFFF` / `#F3F3F3` | `#1A1A1A` | `#767676` (AA) | red `#B50938` (links + primary) |
| Obama Foundation | black / white, `#F3F3EE` | `#000` | `rgba(0,0,0,.6)` | yellow `#FFBD12` alert; blue `#0064F0` Donate; sky `#8EDDFF` tiles |
| Norton | `#F3F3F3` | brown-black `#251E18` | — | full-bleed fields `#6098FF`, `#F6BE11`, `#76A93D` |
| TIME | paper `#FFFCF8`, peach bands `#EFE3DC` | `#1B1B1B` | cocoa `#594D46` | red `#E7131A` only in the logo |
| Kinfolk | `#FFFFFF` | `#000`-ish | — | sage band `#DBDED5` |

## 3. Building a palette from a brief (procedure)

1. **Find the material.** What is the product physically or metaphorically made of? Paper, linen, carbon, cork, glass, soil, ice, steel. Pick the paper from it (L 94–98 for light; L 4–10 for dark), tinted 1–4% toward its hue.
2. **Ink:** the same hue family, L 8–20 (light mode) or L 93–97 (dark mode). Check that body contrast is at least 7:1, and at least 4.5:1 for ink-2.
3. **Ink tiers:** ink at 60% and 40%. Hairline at 8–10%. Sunken surface = paper ± 2–3% L.
4. **Accent:** the product's own colour, or the one the category doesn't use. Saturated and assigned **in writing** to its 1–2 jobs in the Design Spine. Check it as a button fill with its label (≥4.5:1). Lime and yellow accents take *dark* text.
5. **Optional section fields:** up to 3 full-bleed tints for chapters, each with a text colour that is a dark tint of the same hue.
6. **Use OKLCH** for ramps so steps are perceptually even:
```css
--paper: oklch(98.2% 0.006 85);   /* warm paper */
--ink:   oklch(18% 0.01 85);
--ink-2: oklch(18% 0.01 85 / .6);
--hairline: oklch(18% 0.01 85 / .1);
--accent: oklch(68% 0.19 45);     /* one orange */
```

## 4. Dark mode specifics

- **Scoped themes (a dark section on a light page):** custom properties that reference other custom properties resolve where they are *declared*. With `--ink: rgb(var(--ink-rgb))` on `:root`, overriding `--ink-rgb` on a section does **not** change `--ink`. Re-declare every derived token in the theme scope, and set `color` and `background-color` there too. `assets/tokens.css` does this with `[data-theme="dark"]` and `[data-theme="light"]`. The audit catches the failure as ~1:1 contrast.

- Paper is `#07080A`–`#111` with a slight hue tint (blue-black, olive-black, brown-black). Surfaces step up by about 2–4% L: `#0F1011`, `#141516`.
- Text is `#EDEDF3`–`#F7F8F8`, **not #FFF**. Secondary text is `#8A8F98`–`#A1A4A5`, or white at 60–65%.
- Body text tracking +0.01 to +0.02em reads crisper on dark (Raycast).
- Elevation comes from a lighter surface + a 1px top highlight `inset 0 1px 0 rgba(255,255,255,.06)` + a top-edge glow line on key panels. Not from drop shadows (they're invisible on dark).
- Accent glows: one radial, behind one element, at ≤35% alpha (Raycast's glowing ⌘ key: `0 0 40px 8px rgba(255,99,99,.35)`).

## 5. Texture

- **Grain** (Cartier, White Desert, Pasqua, AlphaSense's blue, Raycast's light bars): a fixed `::after` with SVG `feTurbulence` noise, `opacity:.05–.1`, `mix-blend-mode:multiply` (light) or `overlay` (dark), `pointer-events:none`. Disable it under reduced motion if animated.
- **Texture from light and lens, not noise on flat colour**: defocused natural light (Dia), dawn landscapes (Mercury), leaf shadows drifting over paper (Floema's `leafShadowDrift`), macro film (Anthropic).
- **Hatch and halftone:** `repeating-linear-gradient(45deg, transparent 0 2px, #A49D9A 2px 3px)` (Factory), `repeating-linear-gradient(90deg,#FFEDD7 0 2px,transparent 2px 4px)` (Oryzo), dot-matrix halftone stages (Ramp).
