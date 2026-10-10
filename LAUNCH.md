# Launch checklist

Status on 2026-10-09: the skill and `site/` are ready. The site passes the skill's own audit with 0 fail and 0 warn at 1440 and 390px. The items below need a decision or an account.

- [ ] **Pick the public name.** Agent Skills reserve the words "claude" and "anthropic" in the `name` field, so `studio-grade` may be rejected by claude.ai and the API, and it's a trademark risk on a public directory. Rename the skill folder, the `name:` frontmatter in `SKILL.md`, and the site wordmark together.
- [ ] **Set the repo owner.** Replace `OWNER/studio-grade` in `README.md` and in the `REPO` constant at the top of `site/site.js`. Every copy button and command on the site reads from that constant.
- [ ] **Add a license**, for example MIT for the skill. The research notes record measurements of public sites, not their code or assets.
- [x] **Install tested locally (2026-10-09).** `npx skills add <repo path> --list` finds exactly 1 skill, and the frontmatter validates. A project install copied the full folder (SKILL.md, all 12 references, assets, scripts). The audit runs from the installed copy.
- [ ] **Push, then re-test from GitHub:** `npx skills add OWNER/studio-grade`.
- [ ] **Deploy `site/`** as a static folder; no build step is needed (Vercel, Netlify or Cloudflare Pages). Run `./tools/build-site.sh` first so `site/work/` and `site/shots/` are current.
- [ ] **Add the domain to the page:** set `<link rel="canonical">`, and make the `og:image` an absolute URL in `site/index.html`. `og.png` is already generated: 1200×630, the blue Institutional state.
- [ ] **Optional:** re-run `node studio-grade/scripts/audit.mjs <deployed-url> --direction 2 --register confident` against production.
