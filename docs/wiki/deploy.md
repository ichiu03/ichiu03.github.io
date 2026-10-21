# Deploy: GitHub Pages

**What:** push to `main` (or manual dispatch) runs `.github/workflows/deploy.yml`:
`npm ci`, `npm run build`, upload `out/`, `actions/deploy-pages`.

- Root user site `ichiu03.github.io`, so no `basePath` in `next.config.ts`.
- `public/.nojekyll` must exist, or Pages' Jekyll skips the `_next/` folder.
- One-time repo setting: Settings > Pages > Source = "GitHub Actions".
- Static export limits: see [architecture](architecture.md).
- Photos and logos in `public/` are untracked, so they won't exist in CI. Commit any image the
  site actually references (none are referenced yet). Smoke check 11 catches missing assets.
