# Tesla Portfolio — CV to Live Site

Paste this entire file as your first Claude Code message after dropping your CV PDF in `cv/`.

---

## 0. Constraints

You are inside a Next.js 16 / React 19 portfolio built on the Tesla Design System. Design is locked. Your job: populate `src/content/profile.ts` from the CV.

**AGENTS.md warning:** Next.js 16 has breaking changes. Consult `node_modules/next/dist/docs/` before any structural change.

**Permitted edits only:**
1. `src/content/profile.ts`
2. `src/app/icon.tsx` — replace `"YN"` with the candidate's monogram
3. `public/favicon.svg` — replace `YN` with monogram, update accent hex on `<text>` element
4. `cp "cv/<file>.pdf" public/uploads/cv.pdf`

Do not touch any `.css`, component `.tsx`, or config file.

---

## 1. Read the CV

```
ls cv/
```

Read the full PDF. Capture: name, roles, location, contact (email, phone, LinkedIn, GitHub), all XP (dates, org, role, bullets, metrics), education (degrees, schools, dates, focus), tech skills, projects (title, context, scale, outcome, links), any awards, and tone of voice.

---

## 2. Fill profile.ts

Replace every placeholder. Do not rename exports or change types.

### IDENTITY

- `firstName` — first name only
- `fullName` — full name, no title
- `monogram` — exactly 2 uppercase initials (first + last)
- `locationCity`, `locationCountry`, `locationShort` — from CV
- `openToStatus` — `"Open to roles"` unless CV says otherwise
- `openToSub` — comma-separated domains e.g. `"Data Science · ML · Research"`
- `accentHex` — one hex colour. Data/quant: `"#3E6AE1"`. Design: `"#E04D2C"`. Engineering: `"#2A7D4F"`. Unsure: `"#3E6AE1"`. Must read well on dark backgrounds.
- `cvFile` — always `"/uploads/cv.pdf"`
- `copyrightYear` — current year as string
- `versionTag` — `"v1 · {city}"`

### META

- `siteTitle` — full name
- `description` — one sentence, max 160 chars, lead with strongest capability, no buzzwords

### SOCIAL

Extract email, phone, LinkedIn URL + handle, GitHub URL + handle. Use `""` for anything missing.

### ROLES — exactly 4 strings

Job-title noun phrases, 2–5 words, derived from CV evidence. First = primary / most recent. Example: `["Data Scientist", "ML Engineer", "Research Analyst", "Prompt Engineer"]`. Never verb phrases.

### ABOUT

- `sectionTitle` — one sentence, max 12 words, standout trait, no superlatives
- `statement` — 35–60 words, first person, starts with action verb, one real metric from CV, matches candidate voice, zero buzzwords ("passionate", "innovative", "leverage" are banned)
- Side facts from CV and `openToSub`
- `photoSrc` — `"/assets/about-photo.svg"` (leave placeholder)
- `photoAlt` — descriptive string for what photo will show
- `captionKicker` — `"On the calendar"`
- `captionValue` — notable mentor/event from CV in one sentence, or `"Replace this caption when you add your photo."`
- `captionMeta` — real event and institution or `"Event · Institution"`
- `captionLinkHref` — LinkedIn post URL from CV, or `null`

### FEATURED

If CV has an award, prize, or nomination: uncomment the example object and fill it. Otherwise: leave `FEATURED = null`.

When filling: `label = "Featured · Recognition"`. `prefixHeadline` = preamble before award name. `mainHeadline` = award name + period. `body` = 2–3 sentences (awarding body, category, work). `collage` srcs = `"/assets/featured-1.svg"` through `"/assets/featured-4.svg"`. `readmoreUrl` = LinkedIn link or `"#"`.

### XP — 2 to 4 entries, most recent first

Each entry: exactly 3 bullets (action verb + method + quantified outcome — preserve candidate's exact numbers), exactly 3 impact chips (2–6 word metrics), `now: true` on first entry only, `link` only if CV references a post.

`XP_AGGREGATE`: `roles` = count; `countries` = distinct countries; `stat3`/`stat4` = strongest aggregate stats or `"—"`.

### EDU

- `primary` — highest or most recent degree. `tag` = `"POSTGRADUATE"` or `"UNDERGRADUATE"`. 1–2 badges based on CV facts only. Do not fabricate rankings.
- `secondary` — prior degree or `null`

### STACK — exactly 7 categories

One has `feature: true` (headline skill). Each has `primary` (tools in XP bullets/projects) and `secondary` (mentioned in CV). No tools not evidenced in CV.

### PROJECTS — 3 to 4 entries

`palette` must be one of `"p1"|"p2"|"p3"|"p4"`. Vary them. `award: true` only if project won a prize. `desc`: 2–3 specific sentences — dataset size, algorithm, metric, outcome. Include `collage` key only if the user will have photos. `link`: GitHub or article URL from CV.

### CONTACT

- `headline` — one direct sentence. Example: `"Looking for the next problem worth modelling. Let's talk."` Tune the verb to the domain.
- `footerCenter` — `"A PORTFOLIO · BUILT ON THE TESLA DESIGN SYSTEM · USING CLAUDE"` — keep exactly.

### TOKEN_VOCAB

30–40 short strings (max 28 chars). Tailor to candidate's domain. Keep at least 10 generic programming tokens.

---

## 3. Update monogram and favicon

1. `src/app/icon.tsx` — find `"YN"`, replace with monogram.
2. `public/favicon.svg` — replace `YN` with monogram; replace `fill="#3E6AE1"` on the `<text>` element with the accent hex.

---

## 4. Copy CV

```bash
cp "cv/<filename>.pdf" public/uploads/cv.pdf
```

---

## 5. Verify

```bash
npm install
npm run build
```

Fix TypeScript errors in `profile.ts` only. Common causes: `ROLES` not exactly 4 strings; `palette` not `"p1"|"p2"|"p3"|"p4"`; `FEATURED` shape wrong (check `FeaturedData` interface); `EDU.secondary` wrong shape or not `null`. Do not modify types — fix the data.

---

## 6. Final report

```
Build: 0 errors
Monogram: XX  |  Accent: #XXXXXX
CV: public/uploads/cv.pdf

Sections: Hero · About · [Featured if present] · Experience · Education · Stack · Projects · Contact
Roles: A / B / C / D
XP: N entries  |  Education: Degree + Degree (or none)
Stack: 7 categories  |  Projects: N cards

Photos still needed (ASSETS.md):
  - public/assets/about-photo.jpg
  [if FEATURED active] - public/assets/featured-1 through featured-4
  [if collage project] - public/assets/project-1 through project-4

Missing from CV:
  [list any SOCIAL fields left as ""]
```

---

## Quality rules

- Specificity beats eloquence. `"Reduced error in 60% of programs"` beats `"Improved quality significantly"`.
- Do not invent metrics, awards, institutions, or skills not in the CV.
- Banned words: passionate, innovative, leverage, dynamic, synergy, cutting-edge.
- Contact headline must feel earned and domain-specific.

## Anti-examples

| Wrong | Why |
|---|---|
| Editing `.css` | Design locked |
| Tools not on CV in STACK | Fabrication |
| ROLES with 3 or 5 strings | Breaks tuple type |
| `palette: "p5"` | Invalid |
| "passionate about" in copy | Buzzword |
| Editing any `.tsx` component | Design locked |
