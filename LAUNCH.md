# Launch

Live since 2026-10-10.

- **Repo:** https://github.com/arjunkshah12345-hash/studio-grade (public, MIT)
- **Install:** `npx skills add arjunkshah12345-hash/studio-grade`. Tested from GitHub: the CLI finds exactly 1 skill (`studio-grade`).
- **Site:** https://studio-grade.vercel.app (Vercel project `studio-grade`, deployed from `web/dist`)
- **Audit:** the skill's own audit gives 0 fail and 0 warn on every page in production, at 1440 and 390px.

## Ship a site change

```bash
node tools/web/build.mjs                                  # → web/dist
cd web/dist && vercel deploy --prod --yes --name studio-grade
```

## Add a project to the work

1. Build it in `tests/builds/<slug>/` with an agent that reads only the skill. Keep the Design Spine comment at the top of the HTML.
2. Serve the repo root on 4317 and run `node tools/web/shoot.mjs`. Save its audit JSON as `web/src/media/audit-<slug>.json`.
3. Add it to `PROJECTS` in `tools/web/build.mjs` and whitelist the folder in `.gitignore`. Then rebuild and deploy.

## Since launch

- 2026-10-10: a real install from GitHub (`npx skills add … -a claude-code -y`) copies the full skill. `skills update` pulls new commits. The installed audit runs from its install location. skills.sh lists skills from install telemetry, so the listing should appear once installs register.
- Audit additions, each from a bug found in a real build: `motion.stuckReveal` (text still blurred after scrolling), `layout.textOverlap` (text drawn over text at any scroll slice; per line fragment, clipped, display type measured by its glyph band, rotated text skipped), and a 5s cap on closing Chrome (the rare 240s hang).
- Halden: posters pin in their own tracks, the hero has an intro, and the daylight chart has a scrim.

## Launch assets (2026-10-11)

- Release **v1.0.0** with the 35s launch film (1080p MP4) attached: https://github.com/arjunkshah12345-hash/studio-grade/releases/tag/v1.0.0
- The film plays on the site at /#film (9.9MB web encode, poster frame, click to play, no autoplay)
- skills.sh: https://skills.sh/arjunkshah12345-hash/studio-grade/studio-grade (listed; security audits Gen · Socket · Snyk pass)
- Post copy, images and the film: `launch/` (local only; not committed)

## Next

- [x] skills.sh listing is live (it fills from installs; nothing to submit). Share the OG card: `web/src/og.png`.
- [ ] Optional custom domain: point it at the Vercel project, then update `SITE` in `tools/web/build.mjs`.
