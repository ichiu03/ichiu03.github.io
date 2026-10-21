# Refactor candidates

Duplication noted by review after the redesign. Not urgent; pick up if a section is touched.

- **SectionHead:** header markup (title + vertical kanji label) is copied in Experience, Projects,
  Skills, Contact. Projects writes the font as `font-['Hiragino_Mincho_ProN',...]` while the others
  use `[font-family:...]`; unify when extracting.
- **Seal:** defined in `Nav.tsx` (`Seal`, `SEAL_CLIP`), `Contact.tsx` and `Footer.tsx` (`sealClip`),
  and again in `app/icon.svg`.
- **Chip styles:** `chip` const in `Skills.tsx` vs `Chips` in `Projects.tsx`.
- **Metric underline:** `Metric` helper in `Experience.tsx` vs inline `shadow-[inset...]` spans in
  `Projects.tsx`.
- **Button classes:** the primary/secondary pixel button class strings repeat in `Hero.tsx` and
  `Projects.tsx`.
