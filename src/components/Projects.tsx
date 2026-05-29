"use client";

import { PROJECTS } from "@/content/profile";
import type { Project } from "@/content/profile";

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className={
        "project-card" +
        (p.wide ? " span-wide" : "") +
        (p.collage ? " has-collage" : "") +
        (p.darkText ? " dark-text" : "")
      }
    >
      <div className={"bg " + p.palette} />
      <div className="project-text">
        <div className="project-top">
          <span className="label">{p.label}</span>
          <span className="meta">
            {p.award && <span className="awarded">★ Awarded</span>}
            <span className="when">{p.meta}</span>
          </span>
        </div>
        <div className="project-bottom">
          <h3 className="title">{p.title}</h3>
          <p className="desc">{p.desc}</p>
          <div className="tags">
            {p.tags.map((t) => (
              <span key={t} className="t">{t}</span>
            ))}
          </div>
          {p.link && (
            <a className="project-link" href={p.link} target="_blank" rel="noopener noreferrer">
              {p.link.includes("github.com") ? "View on GitHub" : "Read the story"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="9 7 17 7 17 15" />
              </svg>
            </a>
          )}
        </div>
      </div>
      {p.collage && (
        <div className="proj-collage" aria-label="Project photos">
          {p.collage.map((c, i) => (
            <div className={"proj-collage-tile t" + (i + 1)} key={c.src} tabIndex={0}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt={c.alt} loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section className="screen projects" id="projects" data-screen-label="06 Projects">
      <div className="section-header">
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-title">Selected work, across disciplines.</h2>
        <p className="section-sub">
          Hackathons, capstones, research, and industry — each chosen for the
          leverage real data produced on a real outcome.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard p={p} key={i} />
        ))}
      </div>
    </section>
  );
}
