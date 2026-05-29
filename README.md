# Tesla Design Portfolio Template

Turn your CV into a production-ready personal portfolio in minutes — no design work, no manual coding. Built on the **Tesla Design System** with Next.js 16 and React 19.

> **Best results with Claude Code.** The AI-powered path reads your CV and fills the entire site automatically. [Get Claude Code →](https://claude.ai/code)

---

## What you get

- Morph stage hero with a 3D rotating role cube
- Custom cursor and particle canvas background
- Palette toggle (light / dark)
- Heading shimmer animations
- 8 fully designed sections: Hero · About · Featured · Experience · Education · Stack · Projects · Contact
- Featured section (awards / recognition) is off by default — one config line turns it on
- Zero Tailwind — pure Tesla Design System CSS tokens

---

## Quickstart with Claude Code (recommended)

This is the fastest path. Claude reads your CV and fills the entire site for you.

### Step 1 — Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Or download the desktop app at [claude.ai/code](https://claude.ai/code).

### Step 2 — Clone this repo

```bash
git clone https://github.com/tarunsridhar21/tesla-portfolio-template.git
cd tesla-portfolio-template
```

### Step 3 — Drop your CV in

Copy your CV PDF into the `cv/` folder. Any filename works as long as it ends in `.pdf`.

```
cv/
└── your-cv.pdf   ← put it here
```

### Step 4 — Open in Claude Code

```bash
claude
```

When Claude Code starts, paste the **entire contents of `PROMPT.md`** as your first message. That's it — Claude will:

- Read your CV
- Fill every field in `src/content/profile.ts`
- Update the favicon and monogram with your initials
- Copy your CV to `public/uploads/cv.pdf`
- Run `npm run build` and fix any TypeScript errors

### Step 5 — Launch the site

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — your site is live.

### Step 6 — Add your photos (optional)

Drop real photos into `public/assets/` to replace the gradient placeholders. See `ASSETS.md` for the exact filenames and dimensions.

---

## Manual path (no AI)

If you prefer to fill the content yourself:

1. `npm install`
2. Open `src/content/profile.ts` — every field has a comment explaining what to put there.
3. Copy your CV to `public/uploads/cv.pdf`.
4. `npm run dev` → [http://localhost:3000](http://localhost:3000)
5. Optionally swap in real photos — see `ASSETS.md`.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| UI | React 19 |
| Styling | Pure CSS — Tesla Design System tokens |
| Animations | Morph stage, 3D cube, particle canvas, shimmer, custom cursor |

---

## Design lock

The Tesla Design System tokens, CSS, fonts, motion, icons, and layout are **locked**. The only file you edit for content is `src/content/profile.ts`. See `CLAUDE.md` for the full rules.

---

## File map

```
tesla-portfolio-template/
├── cv/                        ← drop your CV PDF here
├── public/
│   ├── assets/                ← swap in your own photos
│   └── uploads/cv.pdf         ← Claude copies your CV here automatically
├── src/
│   └── content/
│       └── profile.ts         ← the only file you edit
├── PROMPT.md                  ← paste this into Claude Code to auto-fill the site
├── ASSETS.md                  ← photo filenames and dimensions
└── CLAUDE.md                  ← design lock rules
```

---

Built on the Tesla Design System · Powered by Next.js · Generated with Claude Code
