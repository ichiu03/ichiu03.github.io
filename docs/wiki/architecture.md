# Architecture

**What:** a single-page Next.js 15 (App Router) site, statically exported to `out/`.

- `app/page.tsx` assembles `Nav`, then `<main>` with `Hero` (#about), `Experience`, `Projects`,
  `Skills`, `Contact`, then `Footer`. One component per section in `app/components/`.
- `app/layout.tsx`: metadata (title "Ivan Chiu · Software Engineer"), fonts (see [theme](theme.md)).
- `app/icon.svg`: the hanko seal favicon.
- Only `Nav.tsx` and `hero/Petals.tsx` are client components; everything else renders at build time.
- **Nav** (`app/components/Nav.tsx`) is `absolute` over the hero, not sticky, so the branch reaches
  the top of the page. Desktop links sit on `bg-ink/75` plates to stay readable over the
  branch/moon. Below 760px a Menu toggle shows a list via the `hidden` attribute; it closes on
  link tap or Escape.
- **Breakpoints:** Nav and Hero switch at `min-[760px]:` (the mockup's breakpoint); section layouts
  in Experience/Projects use Tailwind's `md:` (768px).

**Why static:** hosted on GitHub Pages, so no API routes, server actions, or image optimization
(`next.config.ts` sets `output: "export"`, `images.unoptimized`). See [deploy](deploy.md).

Related: [hero art](hero-art.md), [content sections](content-sections.md).
