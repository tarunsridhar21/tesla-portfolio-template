"use client";

import React from "react";
import { Icon } from "./Icon";
import { XP, XP_AGGREGATE } from "@/content/profile";

export function Experience() {
  const [expanded, setExpanded] = React.useState<Set<number>>(() => new Set());
  const toggle = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="screen experience" id="experience" data-screen-label="04 Experience">
      <div className="section-header">
        <p className="section-eyebrow">Experience</p>
        <h2 className="section-title">
          Work that left a measurable mark.
        </h2>
      </div>

      <div className="experience-list">
        {XP.map((x, i) => {
          const isOpen = expanded.has(i);
          return (
            <div className={"xp" + (isOpen ? " is-open" : "")} key={i}>
              <div className="xp-when">
                {x.when}
                {i === 0 && (
                  <>
                    <br />
                    <span className="now">Most recent</span>
                  </>
                )}
              </div>
              <div className="xp-head">
                <h3 className="role">{x.role}</h3>
                <p className="org">{x.org}</p>
                <p className="where">{x.where}</p>
              </div>
              <div className="xp-body">
                <button
                  type="button"
                  className="xp-toggle"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`xp-body-${i}`}
                >
                  <span>{isOpen ? "Hide details" : "Show details"}</span>
                  <span className="xp-toggle-chev" aria-hidden="true">↓</span>
                </button>
                <div
                  id={`xp-body-${i}`}
                  className={"xp-body-wrap" + (isOpen ? " open" : "")}
                  aria-hidden={!isOpen}
                >
                  <div className="xp-body-inner">
                    <ul>
                      {x.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                    <div className="impact">
                      {x.impact.map((c, j) => (
                        <span key={j} className="chip">{c}</span>
                      ))}
                    </div>
                    {x.link && (
                      <a
                        className="xp-readmore"
                        href={x.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isOpen ? 0 : -1}
                      >
                        <span>{x.link.label}</span>
                        <Icon name="arrowRight" size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ribbon-row">
        <div className="ribbon-inner">
          <span className="label">In Aggregate</span>
          <div className="items">
            <span className="item">
              <span className="num">{XP_AGGREGATE.roles}</span>roles
            </span>
            <span className="item">
              <span className="num">{XP_AGGREGATE.countries}</span>
              {XP_AGGREGATE.countries === "1" ? "country" : "countries"}
            </span>
            {XP_AGGREGATE.stat3Value !== "—" && (
              <span className="item">
                <span className="num">{XP_AGGREGATE.stat3Value}</span>
                {XP_AGGREGATE.stat3Label}
              </span>
            )}
            {XP_AGGREGATE.stat4Value !== "—" && (
              <span className="item">
                <span className="num">{XP_AGGREGATE.stat4Value}</span>
                {XP_AGGREGATE.stat4Label}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
