# Personal website

Ivan Chiu's personal site, aimed at recruiters and hiring managers. The full picture lives in
`docs/vision.md`.

## Stack
- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3, Headless UI, Heroicons
- Deployed as a static export to GitHub Pages (planned; not set up yet)

## Commands
- Install: `npm install`
- Run: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Lint: `npm run lint`
- Test: none yet. Until there is a suite, "evidence" means a clean `npm run build` and
  `npm run lint`, plus a screenshot of the affected section.

## Conventions
- Single page today: everything is in `app/page.tsx` (Hero, About, Projects, Skills, Contact).
  Split into components under `app/components/` as sections grow.
- Styling uses Tailwind utilities; shared classes (`section`, `heading`) live in
  `app/globals.css`.
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
- **The repo has old uncommitted changes on `main`** (README, app files, package files, a deleted
  `next.config.ts`). Don't commit, discard or rewrite them without asking me.
- There are two PostCSS configs (`postcss.config.js` and `.mjs`). Check which one is live before
  changing styling setup.
