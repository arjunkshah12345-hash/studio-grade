# Typography: measured rules, tracking tables, free substitutes

Type is the single biggest lever. On the studied sites, hierarchy came from **size, tracking, opacity and space**, almost never from weight or decoration.

## 1. The numbers (measured at 1440px)

| Measure | p10 | p25 | **median** | p75 | p90 |
|---|---|---|---|---|---|
| Largest text on page | 30px | 48px | **67px** | 110px | 173px |
| Tracking of largest text | −0.05em | −0.03em | **−0.015em** | 0 | 0 |
| Line-height of largest text | 0.90 | 0.97 | **1.00** | 1.10 | 1.33 |
| Body size | 14px | 14px | **15px** | 16px | 18px |
| Words in h1 | 2 | 3 | **4** | 5 | 9 |
| Share of text nodes uppercase | 0 | 0 | **4%** | 18% | 56% |
| Distinct families (≥3 uses) | 1 | 1 | **2** | 3 | 3 |

53 of 94 sites use negative tracking on display type. **Words in an h1: median 4.**

## 2. Tracking by size (sans; synthesized table)

| Size | Tracking | Notes |
|---|---|---|
| ≥ 160px | −0.04 to −0.07em | Exo Ape −0.046 at 250, Bennett & Clive −0.07 at 150, MindMarket −0.06 at 140 |
| 96–160px | −0.03 to −0.05em | Atlas −0.030 at 144, Studio D −0.031 at 128, FIND −0.05 at 180 |
| 56–96px | −0.02 to −0.04em | Linear −0.022 at 64, Vercel −0.06 at 64 (engineered outlier), Factory −0.04 at 60 |
| 32–56px | −0.015 to −0.03em | Stripe −0.025 at 56, Family −0.031 at 44, Superhuman −0.027 at 49 |
| 20–32px | −0.01 to −0.02em | Vercel −0.04/−0.05 at 24 (outlier) |
| 15–18px body | −0.013 to +0.01em | Apple −0.022 at 17, Family −0.013 at 17. Dark mode: **+0.01 to +0.02em** (Raycast) |
| 13–14px UI | −0.01 to 0em | Linear −0.010, Family −0.006 |
| 10–12px labels, uppercase | **+0.04 to +0.12em** | mono labels +0.02 to +0.1; luxury kickers up to **+0.2em** (Aman 0.198) |
| 8–9px micro (loaders, HUD) | +0.16 to +0.32em | Hubtown +0.16, ERA +0.32 at 8px |

Exceptions:
- **Serif display:** near 0 to −0.02em for normal weights. Light and hairline serifs can go very tight (Daylight Arizona Flare 300: −0.07em at 60px; Oura Editorial New 300: −0.05em at 110px). Large *luxury* serif heads sit at 0 to **+0.016em** (Aman, Roger Vivier).
- **Condensed / gothic:** about 0 to −0.015em (Obama Gotham Condensed −0.015 at 100, Ace Toronto Gothic −0.01 at 140, White Desert Oswald ~0).
- **Positive display tracking** for warmth is legitimate but rare (Mercury +0.01 to +0.015em, Vast +0.01). Use it only on purpose.
- **Letter-spread titles** (Miu Miu): each word justified across the measure at +0.074em. A fashion device, not a default.

Apple's **optical tracking table** (copy it when you use SF-like faces): 80px −0.015 · 48px −0.003 · 28px **+0.007** · 24px +0.009 · 21px +0.011 · 17px −0.022 · 12px −0.01.

## 3. Line-height

- **Word / monumental display:** 0.66–0.9 (Studio D 0.66, Exo Ape 0.73, Bennett 0.77, Obama DONATE 0.8, EverSwap 0.8). Descender collisions are deliberate.
- **Sentence display:** 0.95–1.1 (Linear, Vercel, Ramp, Resend 1.0; Stripe, Raycast, Family, Anthropic 1.1).
- **Section h2:** 1.0–1.15.
- **Large serif statements:** 1.2–1.3 (Steve Jobs Archive 54px/1.3; David Whyte Canela 1.24).
- **Luxury serif section heads:** loose, 1.33–1.45 (Aesop, Aman).
- **Body:** 1.5–1.6. **Long-form manifesto:** up to 1.9 at 16px (Ace Hotel).
- **Captions and UI:** 1.2–1.3.
- **Never set display line-height above 1.1.** The highest value measured across all display type was 1.09.

## 4. Weight

- Display weights are **mid or light, not bold**: Stripe 300 · Vercel, Ramp and Resend 400 · Vercel h2 450 · Mercury 480 · Linear 510 · Superhuman 460/540 · Family, OpenAI and Attio 500 · Raycast and Apple 600. On editorial sites, PolySans Slim **300**, Lausanne 200–300, Canela **100**, PP Fragment **220**.
- **Bold 700+ display appears on fewer than 10% of top sites.** Where it does, it is a brand display cut (Obama condensed DONATE, Lando's Brier) or a deliberate register (a consumer "arcade"). Agent Arcade, the "lower tier" benchmark, sets 700 on 222 nodes.
- **In-between variable weights (450, 460, 480, 510, 540) are a tell of tuned systems.** With variable fonts, use them: `font-variation-settings` or `font-weight:510`.
- **Single-weight systems read as "designed"**: Ramp (Lausanne 400 only), Factory (400 on 120/120 nodes), Sierra (GT America 400 on 120/121), Kinfolk (400 on 251/251), Floema (Zimula 400 only), MindMarket (Inter 500 only).
- Most systems use **2 weights** total.

## 5. Families and pairing

- **Median 2 families**, max 3. The usual patterns:
  1. **1 sans + 1 mono** (dev, SaaS, deep-tech): Factory, BFL, Baseten, Cursor, Mintlify, Linear.
  2. **Sans (utility) + serif (meaning)** (institutions, luxury, warm brands): AIC, Obama, Aesop, Aman, Oura, TIME, Menil. 11 of 15 big-agency sites.
  3. **Sans + serif + mono trio** (Anthropic, Kinfolk, Attio).
  4. **One family only**: Pentagram, Fondation Cartier, Norton, Totême, Suitsupply, Bennett & Clive, Floema.
- **The serif is a second voice, never UI text.** Use it for lead paragraphs (Anthropic), testimonial quotes (Attio Tiempos 48px), section titles only (Aesop: 9 of ~200 nodes), manifesto subpages (Linear /method), or the only h1 (Mintlify).
- **Mono is for metadata:** eyebrows, figure captions, stats, footnotes, spec labels, install commands, indices. 9 of 12 core tech sites have one. **Use it as a voice for dev, SaaS, deep-tech and editorial metadata only.** In luxury, hospitality, consumer, civic and playful directions, label with the text face (small caps, sentence case, italic serif). Mono uppercase labels everywhere is half of the default look (range.md §3).
- **Type genre is a choice** (range.md §2B): condensed gothic caps, wide/extended, didone, soft/rounded, heavy display with mixed fonts, and typewriter mono are all measured on top sites. A tight neo-grotesk is the default, not the only answer.
- **Italic** is for emphasis words inside a roman headline (Daylight "a *computer* you can use *outside*"), for kickers and quotes (Studio D Ivar Text Italic), and for artwork or publication titles (AIC).
- **Mixed-font headline** (Lando, Pasqua, ERA): one word in a second display face at **the same size**, so the swap reads as emphasis, not hierarchy.

## 6. Free substitutes for the premium faces the studios use

Top sites mostly license premium or custom faces (14 of 15 big-agency sites; 10 of 16 tech sites). Agents usually need free ones. The **closest free stand-ins** below are by character, and the choice is a judgment call. Google Fonts (GF), Fontshare (FS, free for commercial use) and GitHub/Vercel (OFL).

| Premium face (seen on) | Character | Free stand-in |
|---|---|---|
| Söhne (Stripe), Suisse Int'l (Populous, Atlas, Aesop), Neue Haas (Elva) | Neo-grotesk, neutral, Swiss | **Inter Tight**, **Hanken Grotesk**, Switzer (FS), Geist |
| GT America (Sierra, Suitsupply), Graphik (Pentagram, Eames) | American grotesk, warm-neutral | **Instrument Sans**, Figtree, Public Sans |
| Lausanne / TWK Lausanne (Ramp, Exo Ape, Amaterasu) | Light-weight grotesk, airy | **Inter Tight 300**, Manrope 300, General Sans (FS) |
| PolySans Slim (Studio D), Aeonik (Fluid Glass) | Geometric-grotesk, light display | **Host Grotesk 300**, Outfit 300 (use carefully; overused at 600), Satoshi (FS, overused) |
| Geist / Geist Mono (Vercel, Factory) | already free (OFL) | **Geist**, **Geist Mono** |
| Berkeley Mono (Linear, Cursor), Commit Mono | Coding mono with character | **JetBrains Mono**, **Commit Mono** (OFL), IBM Plex Mono |
| ABC Favorit Mono, Aeonik Mono, Maison Mono | Grotesk-flavoured mono labels | **Geist Mono**, DM Mono, Azeret Mono |
| Courier Prime (Akris) | Typewriter mono | **Courier Prime** (GF, free) |
| Tiempos Headline/Text (Linear /method, Attio, Ace) | Contemporary editorial serif | **Newsreader**, **Source Serif 4** (optical sizes) |
| Canela, Editorial New (Oura, TIME), PP Eiko (ANAI) | Hairline / high-contrast display serif | **Cormorant Garamond 300**, **Fraunces 100–300** (opsz 144, SOFT 0, WONK 0), Gloock |
| ABC Arizona Flare (Daylight, Mintlify) | Light flared serif, literary | **Fraunces 300**, Newsreader 300 Display, Young Serif |
| Lyon Display (Aman), Sabon (AIC), Freight (Menil) | Classic book serif | **Libre Caslon Text**, **EB Garamond**, Crimson Pro |
| Zapf Humanist / Optima (Aesop) | Flared humanist sans-serif | **Tenor Sans**, Marcellus |
| Gotham Condensed (Obama), Toronto Gothic (Ace) | Condensed gothic | **Oswald** (White Desert uses it), Barlow Condensed, Big Shoulders Display, Antonio |
| Centra No.2 (Norton), Plain (Pentagram) | Geometric institutional | **Work Sans**, Albert Sans, Figtree |
| PP Fragment (Tengile), Bodoni-likes (ERA, Symphony) | Light / high-contrast didone | **Bodoni Moda**, Libre Bodoni, Cormorant |
| Mona Sans (Lando) | already free (GitHub, OFL) | **Mona Sans**, Hubot Sans |
| Doto (ICOMAT numerals) | already free | **Doto** (GF), dot-matrix numerals only |
| Chivo Mono (Baseten), Azeret Mono (Ayocin) | already free | **Chivo Mono**, **Azeret Mono** |
| Extended / wide grotesk (ERA Maison Neue Extended, Scout wide) | architecture, fashion, auto, real estate | **Archivo** (width axis to 125%), **Mona Sans** / **Hubot Sans** (wdth axis), Unbounded (very wide; display only) |
| Soft / rounded (Family, Choo-Choo) | consumer, kids, food, friendly | **Fredoka** (display), **M PLUS Rounded 1c** (text, track −0.012em), Nunito only if tuned (overused at default) |
| Heavy condensed caps (Obama, Ace, White Desert) | civic, sport, festival | **Big Shoulders Display** 700–900, **Oswald**, **Antonio**, Barlow Condensed |

Tracking for heavy condensed caps: −0.01 to −0.02em at 150–320px with line-height 0.8–0.88; at 40–100px, 0 to −0.01em; labels in the same family at +0.06em. Letter-spread titles (justified across the measure) override this.

**Overused AI defaults: avoid as the brand face** unless they are deliberately tuned. Poppins, Montserrat, Roboto, Open Sans, Lato, Raleway, Nunito, Plus Jakarta Sans, Space Grotesk, Syne, Clash Display, Playfair Display, DM Serif Display, Lora, Bebas Neue, Anton. Also avoid the 2025 "AI editorial" combination of *Instrument Serif italic hero word + Inter at default tracking*.
**Inter is allowed** but only tuned, as the top sites use it. Set custom weights (510), size-scaled tracking (−0.022em at 64px; MindMarket −0.06em at 140px), `font-feature-settings:"cv01","cv11","ss03"`, and pair it with a characterful mono or serif.

## 7. Text-style bundles (AREA 17 method)

Define each style as a bundle and use only bundles:
```css
.t-display{font:var(--display-wt) var(--display)/var(--display-lh) var(--font-display);letter-spacing:var(--display-ls);font-feature-settings:"ss01";text-wrap:balance}
.t-h2{font:var(--h2-wt,450) var(--h2)/1.05 var(--font-display);letter-spacing:var(--h2-ls,-.02em);text-wrap:balance}
.t-lead{font:400 var(--lead)/1.4 var(--font-serif,var(--font-display));letter-spacing:-.01em;text-wrap:pretty}
.t-body{font:400 var(--body)/1.55 var(--font-text,var(--font-display));text-wrap:pretty}
.t-ui{font:450 var(--ui)/1.35 var(--font-display);letter-spacing:-.006em}
.t-label{font:500 var(--label)/1.2 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;font-feature-settings:"case"}
.t-num{font-variant-numeric:tabular-nums lining-nums}
```

## 8. Two-tone headings (the most-copied device in the tech cluster)

The statement in ink and the elaboration in ink at 55–65%, at the **same size, same weight, same line**. Seen on Linear, Stripe, Vercel, Raycast, Ramp, Attio, Superhuman, Mintlify, Cursor, ICOMAT, FIND, Terminal and the Steve Jobs Archive.
```html
<h2 class="t-h2">A new species of product tool. <span class="dim">Purpose-built for planning and building with agents.</span></h2>
```
`.dim{color:var(--ink-2)}`. Variants: the last word in the accent (AlphaSense "Transform intelligence into **advantage**"); keywords in ink inside a grey sentence (Mintlify "for **startups**, **enterprises**, and **agents**"); title + grey subtitle stacked at one size (Steve Jobs Archive).

## 9. Micro-typography checklist

- `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs. Never leave a one-word widow in a hero.
- `font-variant-numeric: tabular-nums` for any number that changes (counters, prices in tables, timers). **Check the zero under `tnum`:** some faces (Mona Sans) switch to a slashed zero, so prices read "2,4ØØ". Use proportional figures for display numerals, and switch faces or add `font-feature-settings:"zero" 0` where the face allows it.
- `text-wrap:balance` re-breaks a heading that has manual `<br>`s into three lines. tokens.css turns it off for `h1:has(br)`; do the same for any custom heading class.
- The `font:` shorthand resets `font-stretch`. With a width-axis face (Archivo 125%, Mona Sans wide), set `--display-stretch` / `--label-stretch` in tokens.css; the bundles re-apply them. Any of your own rules that uses the shorthand needs a `font-stretch` after it.
- `font-feature-settings: "case"` on uppercase labels so punctuation centers.
- Real typographic characters: em dashes (—), en dashes for ranges (10–5), curly quotes, the ellipsis (…), × for multiplication, the arrows → ↗ ↳.
- Use `hanging-punctuation: first` on large quotes, or pull the opening quote into the margin manually.
- Measure is 45–75 characters for body and ~52ch for ledes. Manifesto columns are ~520–560px.
- Uppercase is only for ≤12–14px labels, *or* a deliberate brand stance (Byredo 81%, Norton 75%). Never 40px+ sentence-length all-caps by accident.
- Fluid sizes: `clamp(min, base + vw, max)`. Sentence h1 ≈ `clamp(2.5rem, 1.3rem + 3.2vw, 4.5rem)`. Word display ≈ `clamp(5rem, 1rem + 13vw, 16rem)`. On mobile (390px) the sentence h1 lands at 36–44px across 3–4 lines.
