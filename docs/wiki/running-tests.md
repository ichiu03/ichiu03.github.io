# Running tests

`npm run build && npm test` runs `scripts/smoke.mjs` against `out/` (11 checks: index exists,
sections + footer, `#` anchors resolve, contact links with `rel` noopener, no phone number,
no PDFs, experience order, key facts, title and icon, no Next.js boilerplate, local assets resolve).
Also run `npm run lint`. "Evidence" for a change = build, lint, smoke pass, plus a screenshot.

- `SMOKE_OUT=<dir>` points the checks at another export folder (used to test the checks).
- React inserts `<!-- -->` between adjacent text parts, so text checks strip comments first;
  do the same in any new text check.
- Content edits may need check 7 (order) or 8 (facts) updated; see [content sections](content-sections.md).
