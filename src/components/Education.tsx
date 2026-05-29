"use client";

import { EDU } from "@/content/profile";

export function Education() {
  return (
    <section className="screen education" id="education" data-screen-label="05 Education">
      <div className="section-header">
        <p className="section-eyebrow">Education</p>
        <h2 className="section-title">
          {EDU.secondary
            ? "Two institutions. Two disciplines. One trajectory."
            : "The foundation behind the work."}
        </h2>
      </div>

      <div className="edu-wrap">
        <article className="edu-primary">
          <div className="edu-bg" />
          <div className="edu-primary-inner">
            <div className="edu-meta">
              <span className="edu-tag">{EDU.primary.tag}</span>
            </div>

            <h3 className="edu-degree">{EDU.primary.degree}</h3>
            <p className="edu-school">{EDU.primary.school}</p>
            <p className="edu-loc">{EDU.primary.location}</p>

            <p className="edu-note">{EDU.primary.note}</p>

            <div className="edu-badges">
              {EDU.primary.badges.map((b) => (
                <div className="edu-badge" key={b.v}>
                  <span className="v">{b.v}</span>
                  <span className="l">{b.l}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        {EDU.secondary && (
          <article className="edu-secondary">
            <div className="edu-secondary-grid">
              <div className="edu-when">
                <span className="edu-tag muted">{EDU.secondary.tag}</span>
                <span className="edu-years">{EDU.secondary.years}</span>
              </div>
              <div className="edu-detail">
                <h3 className="edu-degree-s">{EDU.secondary.degree}</h3>
                <p className="edu-school-s">{EDU.secondary.school}</p>
                <p className="edu-note-s">{EDU.secondary.note}</p>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
