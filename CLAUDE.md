# Personal website

Ivan Chiu's personal site, aimed at recruiters and hiring managers. The full picture lives in
`docs/vision.md`.

## Stack
- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4 (configured in CSS via `@theme`, PostCSS plugin `@tailwindcss/postcss`)
- Deployed as a static export to GitHub Pages (planned; not set up yet)

## Commands
- Install: `npm install`
- Run: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm run build && npm test` (smoke checks in `scripts/smoke.mjs` against `out/`).
  "Evidence" means build, lint and smoke checks pass, plus a screenshot of the affected section.

## Conventions
- Single page: `app/page.tsx` assembles sections; each section is its own component in
  `app/components/`.
- Styling uses Tailwind utilities; theme tokens (colors, fonts) live in `app/globals.css`.
- The chosen design mockup in `docs/design/` is the visual reference.
- Must stay static-exportable: no API routes, no server actions, no runtime server features.
  Images need `unoptimized` (or a static loader) for export.
- Fonts: VT323 for headings, nav and accents; a readable sans for body text. Load them with
  `next/font/google`.

## Context
- **Vision:** `docs/vision.md`. Every brief links to it. Only the orchestrator edits it, with my
  approval.
- **Wiki:** start at `docs/wiki/index.md` and follow links before searching code. Only the
  librarian writes it.
- **Agents:** project specialists live in `.claude/agents/`. Global ones (reviewer, tester,
  implementer, librarian) fill the gaps.
- **Content source:** my resume is the source of truth for facts (roles, dates, numbers). Ask me
  for the current version rather than inventing or rounding anything.

## Project-specific cautions
- **Design and theme are taste calls.** Show me a mockup or screenshot before building a section
  out fully.
- **Never put my phone number or street address on the site.** Email only.
- **The old pre-redesign site is in `git stash`** ("pre-redesign site"). Don't drop or apply it
  without asking me.
- Photos and logos in `public/` are mine and untracked; don't delete them.
