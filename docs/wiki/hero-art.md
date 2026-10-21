# Hero art: branch, moon, torii, petals

**What:** the pixel night scene in `#about`, ported from mockup C plus the moon and torii from
mockup A ([decisions](decisions.md)). Files in `app/components/hero/`, assembled by
`app/components/Hero.tsx` (server component).

- `Branch.tsx` (server): rasterizes branch segments and blossoms onto a 96x58 grid once, using
  `seededRandom(7)` from `rng.ts`, merged into one SVG path per color. Nothing to hydrate.
  It draws the 8x8 moon inside its SVG so they share pixel size.
- `NightAccents.tsx`: `MoonPixels` (an SVG `<g>`, must sit inside an `<svg>`) and `Torii`
  (21x16, placed on the hero's bottom "SCROLL" hairline).
- `Petals.tsx` (client): 11 petals from `seededRandom(11)`, values rounded to 2 decimals so server
  and client markup match. Injects its own `@keyframes hero-petal-fall`.
- **Reduced motion:** Petals reads `matchMedia` via `useSyncExternalStore`; the server snapshot is
  "reduced" (still, scattered petals), so hydration matches and motion starts after hydration.

**Gotcha:** the moon glow gradient id `hero-moon-glow` is fixed, so render only one `Branch` per page.
