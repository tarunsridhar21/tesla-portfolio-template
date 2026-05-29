# Tesla Design Portfolio Template

A replicable portfolio starter built on the **Tesla Design System** using Next.js 16 and React 19. Morph stage, custom cursor, 3-D hero cube, particle canvas, palette toggle — all included. Your only job is to fill in your content.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **React 19**
- Pure CSS (Tesla Design System tokens — no Tailwind)
- Custom animations: morph stage, heading shimmer, 3D role cube, particle canvas, custom cursor

## Quick start (AI-powered — recommended)

1. Clone / unzip this folder.
2. Drop your CV PDF into `cv/` (any filename ending in `.pdf`).
3. Open this folder in **Claude Code** (any model — Sonnet recommended for speed).
4. Paste the entire contents of `PROMPT.md` as your first message.
5. Claude reads your CV, fills `src/content/profile.ts`, updates the favicon + monogram, and copies your CV to `public/uploads/cv.pdf`.
6. `npm install && npm run dev` → open [http://localhost:3000](http://localhost:3000).
7. Optionally drop real photos into `public/assets/` — see `ASSETS.md` for expected filenames.

## Quick start (manual)

1. `npm install`
2. Open `src/content/profile.ts` and fill every field from your CV.
3. Drop your CV PDF into `public/uploads/cv.pdf`.
4. `npm run dev` → open [http://localhost:3000](http://localhost:3000).
5. Replace gradient placeholder SVGs in `public/assets/` with your own photos.

## Sections

Hero · About · Featured (optional) · Experience · Education · Stack · Projects · Contact

## Design lock

The Tesla Design System tokens, CSS, fonts, motion language, icons, and layout are locked. See `CLAUDE.md` for the full rules. Content lives in `src/content/profile.ts` — that is the only file you need to edit for a fully personalised site.

## Featured section

The Featured section (awards / recognition) is **off by default**. Set `FEATURED` to a non-null object in `profile.ts` to show it. The nav automatically includes or excludes "Featured" based on this.

---

Built on the Tesla Design System · Powered by Next.js · Generated with Claude
