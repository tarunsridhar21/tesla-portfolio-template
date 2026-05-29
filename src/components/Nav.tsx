"use client";

import { IDENTITY } from "@/content/profile";

interface Section {
  id: string;
  label: string;
}

interface NavProps {
  scrolled: boolean;
  overDark: boolean;
  onMetal: boolean;
  sections: Section[];
  active: string;
  onJump: (id: string) => void;
}

export function PortfolioNav({
  scrolled,
  overDark,
  onMetal,
  sections,
  active,
  onJump,
}: NavProps) {
  const cls = ["site-nav"];
  if (scrolled) cls.push("scrolled");
  else if (overDark) cls.push("over-dark");
  if (onMetal && !scrolled) cls.push("over-metal");
  if (onMetal && scrolled) cls.push("on-metal");

  return (
    <nav className={cls.join(" ")}>
      <a
        href="#hero"
        className="wordmark monogram"
        onClick={(e) => {
          e.preventDefault();
          onJump("hero");
        }}
      >
        {IDENTITY.monogram}
      </a>
      <div className="nav-group">
        {sections.map((s) => (
          <button
            key={s.id}
            className={"nav-btn" + (active === s.id ? " active" : "")}
            onClick={() => onJump(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="nav-right">
        <span className="nav-status">
          <span className="dot" /> {IDENTITY.openToStatus}
        </span>
      </div>
    </nav>
  );
}
