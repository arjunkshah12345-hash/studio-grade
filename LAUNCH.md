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

## Next

- [ ] Submit to the skills.sh directory once installs register. Share the OG card: `web/src/og.png`.
- [ ] Optional custom domain: point it at the Vercel project, then update `SITE` in `tools/web/build.mjs`.
