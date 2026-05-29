# Portfolio Template — Design System Lock

This portfolio was built on the **Tesla Design System** using Claude Design and Next.js.
The design is locked. **You may only:**

1. Edit content values in `src/content/profile.ts`.
2. Swap image files under `/public/assets/` and `/public/uploads/` (filenames must match those referenced in `profile.ts`).
3. Add new **animations** that compose with the existing motion language.

You may **not** invent new colors, fonts, icon shapes, layout patterns, or
components without explicit user approval. Match what is already in
`src/app/styles/portfolio.css` and `src/app/styles/colors_and_type.css`.
If a need genuinely falls outside the system, stop and ask.

## The only edit surface

For your first run: open `src/content/profile.ts` and fill every field from your CV.
All components import from that file — you do not need to touch any `.tsx` component.

## Source of truth

- Content data: `src/content/profile.ts` — every personal value on the site
- Tokens: `src/app/styles/colors_and_type.css` (Tesla Design System tokens)
- Component CSS: `src/app/styles/portfolio.css` (every class used by the design)
- Components: `src/components/*.tsx` — 1:1 ports of the original design
- Page orchestration: `src/app/page.tsx`
- Public assets: `public/assets/*`, `public/uploads/*`

## Design tokens — DO NOT change

### Color
- **Accent (single chromatic):** Electric Blue `#3E6AE1` (`--tds-electric-blue`). You may change the accent via `IDENTITY.accentHex` in `profile.ts` — that is the *only* user-tweakable colour. Do not introduce a second accent.
- **Surfaces:** white `#FFFFFF`, light ash `#F4F4F4`, carbon dark `#171A20`, frosted glass `rgba(255,255,255,0.75)`.
- **Text:** primary `#171A20`, body `#393C41`, tertiary `#5C5E62`, placeholder `#8E8E8E`.
- **Borders:** `#EEEEEE`, `#D0D1D2`.
- **Status dot:** green `#22c55e` / `#4ade80` pulse.
- **Morph palettes (cool / warm / noir):** defined in `.palette-*`. Extend only by adding to that set.

### Typography
- Family: **Inter** (Google Fonts), Tesla "Universal Sans" substitute. Weights 400 + 500 only.
- Scale: `--tds-fs-hero` 40px · `--tds-fs-promo` 22px · `--tds-fs-product` 17px · `--tds-fs-body` 14px. Use `clamp()` recipes already in `portfolio.css`.

### Motion
- Easing: `cubic-bezier(0.5, 0, 0, 0.75)` (`--tds-ease`). Duration `0.33s`.
- Keyframes: `revealUp`, `heading-shimmer`, `hero-zigzag`, `morphSheen`, `morphDrift`, `dotPulse`, `dotHalo` — reuse, do not duplicate.
- Always gate new motion with `@media (prefers-reduced-motion: reduce)`.

### Icons
- ONLY inline SVGs in `src/components/Icon.tsx`: `menu close chat arrowRight download mail pin phone github linkedin award sparkle`.
- 24×24 viewBox, `stroke="currentColor"`, `strokeWidth={1.5}`. Feather-style.

### Buttons
- Exactly two styles: `.btn-primary` and `.btn-secondary`. Do not add a third.

### Layout
- Max content width: `--tds-max-width` 1383px. Nav height: 56px.

## Component map

| Section | Component | What to edit |
|---|---|---|
| Nav monogram, status dot | `Nav.tsx` | `IDENTITY.monogram`, `IDENTITY.openToStatus` in `profile.ts` |
| Hero greeting, role cube, socials | `Hero.tsx` | `IDENTITY.firstName`, `ROLES`, `SOCIAL` in `profile.ts` |
| About statement + photo | `About.tsx` | `ABOUT` in `profile.ts`; swap `/public/assets/about-photo.jpg` |
| Featured recognition | `Featured.tsx` | `FEATURED` in `profile.ts` (set `null` to hide) |
| Experience entries | `Experience.tsx` | `XP`, `XP_AGGREGATE` in `profile.ts` |
| Education | `Education.tsx` | `EDU` in `profile.ts` |
| Tech stack chips | `Stack.tsx` | `STACK` in `profile.ts` |
| Project cards | `Projects.tsx` | `PROJECTS` in `profile.ts` |
| Contact + footer | `Contact.tsx` | `SOCIAL`, `CONTACT`, `IDENTITY` in `profile.ts` |
| BgCanvas tokens | `BgCanvas.tsx` | `TOKEN_VOCAB` in `profile.ts` |

## Running

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
