"use client";

import { STACK } from "@/content/profile";

export function Stack() {
  return (
    <section className="screen stack" id="stack" data-screen-label="05 Tech Stack">
      <div className="section-header">
        <p className="section-eyebrow">Tech Stack</p>
        <h2 className="section-title">
          The instruments. Quietly chosen, kept sharp.
        </h2>
        <p className="section-sub">
          Primary tools shown in accent. Adjacent tooling kept current — picked
          up as the problem requires.
        </p>
      </div>

      <div className="stack-grid">
        {STACK.map((s) => {
          const total = s.primary.length + s.secondary.length;
          return (
            <div className={"stack-card" + (s.feature ? " feature" : "")} key={s.name}>
              <div className="stack-card-head">
                <h3 className="name">{s.name}</h3>
                <span className="count">{String(total).padStart(2, "0")} · tools</span>
              </div>
              <div className="stack-chips">
                {s.primary.map((c) => (
                  <span key={c} className="stack-chip primary">{c}</span>
                ))}
                {s.secondary.map((c) => (
                  <span key={c} className="stack-chip">{c}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
