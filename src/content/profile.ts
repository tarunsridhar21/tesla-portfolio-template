// ============================================================
//  profile.ts — YOUR ONLY EDIT SURFACE
//  Fill every value below from your CV. Do not touch any
//  component .tsx file or CSS file. The design is locked.
// ============================================================

// -----------------------------------------------------------
//  IDENTITY — drives nav monogram, hero greeting, contact
// -----------------------------------------------------------
export const IDENTITY = {
  /** First name only — used in hero greeting "I'm {firstName}." */
  firstName: "Your Name",
  /** Full legal / professional name — used in layout title and footer copyright */
  fullName: "Your Full Name",
  /** Exactly 2 uppercase initials — drives nav monogram and favicon */
  monogram: "YN",
  /** City only */
  locationCity: "Your City",
  /** Country only */
  locationCountry: "Your Country",
  /** Short combined string shown in About side panel */
  locationShort: "City, Country",
  /** "Open to roles" label in nav status dot */
  openToStatus: "Open to roles",
  /** Subtitle under status — comma-separated domains */
  openToSub: "Your Field · Research · Other",
  /** Single accent hex — every button, link, highlight on the page uses this one colour */
  accentHex: "#3E6AE1",
  /** Path to your CV PDF served from /public — keep as /uploads/cv.pdf */
  cvFile: "/uploads/cv.pdf",
  /** Copyright year */
  copyrightYear: "2026",
  /** Version label — shown in contact footer */
  versionTag: "v1 · Your City",
} as const;

// -----------------------------------------------------------
//  SITE METADATA — <title> and <meta description>
// -----------------------------------------------------------
export const META = {
  siteTitle: "Your Full Name",
  description:
    "One sentence describing your expertise and what you bring — this appears in Google previews.",
} as const;

// -----------------------------------------------------------
//  SOCIAL — links used in Hero, Contact, and persistent bar
// -----------------------------------------------------------
export const SOCIAL = {
  email: "you@example.com",
  phone: "+1 000 000 0000",
  linkedinUrl: "https://linkedin.com/in/yourhandle",
  linkedinHandle: "/in/yourhandle",
  githubUrl: "https://github.com/yourhandle",
  githubHandle: "@yourhandle",
} as const;

// -----------------------------------------------------------
//  ROLES — hero 3-D rotating cube, exactly 4 strings
// -----------------------------------------------------------
export const ROLES: [string, string, string, string] = [
  "Your Primary Role",
  "Your Secondary Role",
  "Your Third Role",
  "Your Fourth Role",
];

// -----------------------------------------------------------
//  ABOUT
// -----------------------------------------------------------
export const ABOUT = {
  eyebrow: "About",
  sectionTitle: "Your headline — what defines your approach.",
  /** 35–60 words, first person. Lead with a verb. Include specific evidence. */
  statement:
    "A 35–60 word statement about your work, methodology, and what you bring. Write in first person. Lead with a strong verb and a concrete deliverable. Include at least one measurable result. Avoid buzzwords.",
  sideBasedLabel: "Based",
  sideBasedValue: "City, Country",
  sideBasedSub: "Open to relocation",
  sideStatusLabel: "Status",
  sideStatusValue: "Open to roles",
  sideStatusSub: "Your Domain · Research",
  /** Path relative to /public — swap with your own JPG once built */
  photoSrc: "/assets/about-photo.svg",
  photoAlt: "Your Name at [event or occasion]",
  captionKicker: "On the calendar",
  captionValue:
    "A brief note about who you are pictured with or what this occasion represents — a mentor, guest lecture, or milestone moment.",
  captionMeta: "Event · Institution",
  /** Set to null to hide the "Read more" link */
  captionLinkHref: null as string | null,
  captionLinkLabel: "Read more",
} as const;

// -----------------------------------------------------------
//  FEATURED — recognition / award section
//  Set to null to remove this section entirely from the page
// -----------------------------------------------------------

export interface FeaturedData {
  label: string;
  prefixHeadline: string;
  mainHeadline: string;
  body: string;
  statCellValue: string;
  statCellLabel: string;
  readmoreUrl: string;
  readmoreLabel: string;
  /** Exactly 4 images — swap SVG placeholders for real photos */
  collage: [
    { src: string; alt: string },
    { src: string; alt: string },
    { src: string; alt: string },
    { src: string; alt: string },
  ];
}

export const FEATURED: FeaturedData | null = null;

// Example — uncomment and fill to activate the section:
// export const FEATURED: FeaturedData | null = {
//   label: "Featured · Recognition",
//   prefixHeadline: "Nominated for the",
//   mainHeadline: "Your Award or Recognition.",
//   body:
//     "Two to three sentences describing the award, who granted it, and what work it recognised. Name the programme, the institution, and the specific contribution.",
//   statCellValue: "Award Category",
//   statCellLabel: "Category name",
//   readmoreUrl: "https://linkedin.com/...",
//   readmoreLabel: "Read the announcement",
//   collage: [
//     { src: "/assets/featured-1.svg", alt: "Alt text for photo 1" },
//     { src: "/assets/featured-2.svg", alt: "Alt text for photo 2" },
//     { src: "/assets/featured-3.svg", alt: "Alt text for photo 3" },
//     { src: "/assets/featured-4.svg", alt: "Alt text for photo 4" },
//   ],
// };

// -----------------------------------------------------------
//  EXPERIENCE — XP entries and aggregate ribbon stats
// -----------------------------------------------------------
export interface XPLink { href: string; label: string; }
export interface XPEntry {
  when: string;
  now?: boolean;
  role: string;
  org: string;
  where: string;
  bullets: string[];
  impact: string[];
  link?: XPLink;
}

export const XP: XPEntry[] = [
  {
    when: "Month Year — Month Year",
    now: true,
    role: "Your Most Recent Role",
    org: "Company or Institution · Department if relevant",
    where: "City, Country",
    bullets: [
      "Lead with an action verb. Describe the method you used. End with a quantified outcome — number, percentage, or scale.",
      "Second accomplishment — same pattern. Be specific about scope (how many records, users, machines, etc.).",
      "Third accomplishment — what you changed, how, and with what measurable impact.",
    ],
    impact: ["Metric 1", "Metric 2", "Metric 3"],
  },
  {
    when: "Month Year — Month Year",
    role: "Your Previous Role",
    org: "Company or Institution",
    where: "City, Country",
    bullets: [
      "First bullet — action, method, outcome.",
      "Second bullet — action, method, outcome.",
      "Third bullet — action, method, outcome.",
    ],
    impact: ["Metric A", "Metric B", "Metric C"],
  },
];

/** Aggregate numbers shown in the ribbon below the XP list */
export const XP_AGGREGATE = {
  roles: String(XP.length),
  countries: "1",
  stat3Label: "students taught",
  stat3Value: "—",
  stat4Label: "funding secured",
  stat4Value: "—",
};

// -----------------------------------------------------------
//  EDUCATION
// -----------------------------------------------------------
export const EDU = {
  primary: {
    tag: "POSTGRADUATE",
    degree: "Your Degree",
    school: "Your University",
    location: "City, Country · Start Year – End Year",
    note:
      "A brief note about your programme, research focus, or the institution's global standing. Keep to 2–3 sentences.",
    badges: [
      { v: "#—", l: "Ranking or accreditation" },
    ],
  },
  /** Set to null if you have only one degree */
  secondary: {
    tag: "Undergraduate",
    years: "Year — Year",
    degree: "Your Degree",
    school: "Your University · City, Country",
    note: "Specialization or focus area",
  } as { tag: string; years: string; degree: string; school: string; note: string } | null,
};

// -----------------------------------------------------------
//  TECH STACK
// -----------------------------------------------------------
export interface StackCategory {
  name: string;
  primary: string[];
  secondary: string[];
  /** Renders as the inverted dark feature card — use for your headline tool */
  feature?: boolean;
}

export const STACK: StackCategory[] = [
  {
    name: "Languages",
    primary: ["Language A", "Language B"],
    secondary: ["Language C"],
  },
  {
    name: "Frameworks & Libraries",
    primary: ["Framework A", "Framework B"],
    secondary: ["Library C", "Library D", "Library E"],
  },
  {
    name: "Data & Databases",
    primary: ["Tool A", "Tool B"],
    secondary: ["Tool C", "Tool D"],
  },
  {
    name: "Visualisation & Reporting",
    primary: ["Tool A", "Tool B"],
    secondary: ["Tool C", "Tool D"],
  },
  {
    name: "Cloud & Infrastructure",
    primary: ["Platform A"],
    secondary: ["Tool B", "Tool C"],
  },
  {
    name: "Tools & Workflow",
    primary: ["Git", "GitHub"],
    secondary: ["Tool C", "Tool D"],
  },
  {
    name: "Your Headline Skill",
    primary: ["Primary Tool", "Secondary Tool"],
    secondary: [],
    feature: true,
  },
];

// -----------------------------------------------------------
//  PROJECTS
// -----------------------------------------------------------
export interface CollageImg { src: string; alt: string; }
export interface Project {
  label: string;
  meta: string;
  title: string;
  desc: string;
  tags: string[];
  palette: "p1" | "p2" | "p3" | "p4";
  wide?: boolean;
  award?: boolean;
  darkText?: boolean;
  link?: string;
  collage?: CollageImg[];
}

export const PROJECTS: Project[] = [
  {
    label: "Category · Context",
    meta: "Month Year · Duration or context",
    title: "Your Headline Project — descriptive subtitle",
    desc:
      "Two to three sentences: what you built, the data or problem scale, the method, and the outcome. Be specific — name the dataset, the algorithm, the percentage improvement.",
    tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
    palette: "p2",
    wide: true,
    award: false,
  },
  {
    label: "Category · Context",
    meta: "Month Year",
    title: "Second Project",
    desc:
      "Same pattern — what, at what scale, how, with what result.",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    palette: "p1",
  },
  {
    label: "Category · Context",
    meta: "Month Year",
    title: "Third Project",
    desc:
      "Same pattern.",
    tags: ["Tag 1", "Tag 2"],
    palette: "p1",
  },
  {
    label: "Category · Capstone",
    meta: "Month Year",
    title: "Fourth Project",
    desc:
      "Same pattern.",
    tags: ["Tag 1", "Tag 2"],
    palette: "p3",
  },
];

// -----------------------------------------------------------
//  CONTACT section copy
// -----------------------------------------------------------
export const CONTACT = {
  headline:
    "Open to the right problem. Let's talk.",
  footerCenter:
    "A PORTFOLIO · BUILT ON THE TESLA DESIGN SYSTEM · USING CLAUDE",
} as const;

// -----------------------------------------------------------
//  BG CANVAS — floating tokens behind the hero
//  Tailor these to your domain so the background feels authentic.
//  Keep to short code-style or data-style strings (≤ 28 chars).
// -----------------------------------------------------------
export const TOKEN_VOCAB: string[] = [
  "function()", "const x =", "import {}", "npm install", "git commit",
  "return value", "async fn", "await res", "type T =", "interface I",
  "build ✓", "test passed", "deploy →", "v1.0.0", "README.md",
  "console.log()", "fetch(url)", "useState()", "useEffect()", "props",
  "render()", "export", "module", "package.json", "tsconfig",
  "docker run", "CI / CD", "lint ✓", "error: 0", "pass: all",
  "schema", "query", "mutation", "resolve", "context",
  "git push", "main ✓", "branch", "commit", "diff",
];
