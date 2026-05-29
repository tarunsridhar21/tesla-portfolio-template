# Asset Reference

All image placeholders ship as dark-gradient SVGs. Replace any of them with your own photos — the filenames and dimensions below are the contract.

## `/public/assets/` — key images

| File | Dimensions | Used by | Notes |
|---|---|---|---|
| `about-photo.jpg` | 800 × 600 px min | About section | You at a notable event — guest lecture, conference, team moment |
| `featured-1.jpg` | 600 × 400 px min | Featured collage tile 1 | Main award / recognition photo |
| `featured-2.jpg` | 600 × 400 px min | Featured collage tile 2 | Nomination letter, email, or poster |
| `featured-3.jpg` | 600 × 400 px min | Featured collage tile 3 | Certificate or presentation |
| `featured-4.jpg` | 600 × 400 px min | Featured collage tile 4 | Group or ceremony photo |
| `project-1.jpg` | 800 × 500 px min | Project collage (wide card) | Action shot, team, or demo screenshot |
| `project-2.jpg` | 800 × 500 px min | Project collage | — |
| `project-3.jpg` | 800 × 500 px min | Project collage | — |
| `project-4.jpg` | 800 × 500 px min | Project collage | — |

**How to swap:** Drop your `.jpg` with the exact filename into `/public/assets/`. Update the `src` and `alt` values in `profile.ts` to match.

## `/public/uploads/`

| File | Notes |
|---|---|
| `cv.pdf` | Your CV / résumé — linked from Hero, Contact, and the persistent enquiry bar |

Drop your CV here as `cv.pdf`. `IDENTITY.cvFile` in `profile.ts` already points to `/uploads/cv.pdf`.

## Format guidelines

- JPEG preferred. Target **< 1.5 MB** per image.
- Aspect ratios: CSS clips images to fill each tile — loose ratios are fine, avoid very narrow or very wide crops.
