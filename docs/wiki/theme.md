# Theme: tokens, fonts, accents

**What:** Tailwind CSS 4 configured in CSS. There is no `tailwind.config`; tokens live in
`app/globals.css`. Dark-only, no light theme.

- **Colors:** `@theme` `--color-*` tokens become `bg-*/text-*/border-*/fill-*` utilities
  (ink, ink-raised, line, washi, mist, sakura, sakura-lt, sakura-dk, vermilion, bark, bark-lt, moon).
  Palette is from mockup C; `moon` is from mockup A. Values: see `app/globals.css`.
- **Fonts:** `next/font/google` in `app/layout.tsx` sets `--font-vt323` and `--font-inter` on
  `<html>`. `@theme inline` maps them to `font-pixel` and `font-sans`. It must stay `inline`,
  otherwise the utilities point at variables that don't resolve where they're used.
- VT323 has weight 400 only, so pixel headings use `font-normal`; don't add bold to them.
- **Kanji labels** (経歴/制作/技能/連絡) use a Mincho stack via an arbitrary property,
  `[font-family:'Hiragino_Mincho_ProN','Yu_Mincho',serif]` (underscores are spaces in Tailwind 4).
- **Reduced motion:** a global `prefers-reduced-motion` rule in `globals.css` clamps animations
  and transitions. Petals handle it separately (see [hero art](hero-art.md)).

**Accent rationing (why):** vermilion only on tiny marks (seal, hero period and dash, metric
underlines, markers); sakura only for accents. This keeps the look restrained and "not too
feminine" (see [decisions](decisions.md)). Pure vermilion on ink is about 4.7:1, fine for small text.
