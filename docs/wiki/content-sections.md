# Content sections: where to edit

**What:** each section renders from a data array at the top of its component. Edit the data,
not the markup. Facts (roles, dates, numbers) come only from Ivan's resume; ask for it rather
than inventing or rounding.

| Section | File | Data |
|---|---|---|
| Experience (#experience) | `app/components/Experience.tsx` | `jobs` (newest first) |
| Projects (#projects) | `app/components/Projects.tsx` | `projects` (`name, problem, built, stack, result?`), `agentRoles`; featured "How I build with AI agents" card is inline markup |
| Skills (#skills) | `app/components/Skills.tsx` | `courses`, `skillGroups`, `spoken` |
| Contact (#contact) | `app/components/Contact.tsx` | `EMAIL` const, `links` array |

- Experience: wrap standout numbers in the `Metric` helper (currently 10M+ users, 92%, $20K).
  Projects underlines `result` and the featured card's number with inline spans instead.
- Contact: email, GitHub, LinkedIn only. No form, no phone number, no street address, no PDF.
- The [smoke checks](running-tests.md) assert experience order and key facts, so update
  `scripts/smoke.mjs` when those change.
