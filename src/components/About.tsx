"use client";

import { Icon } from "./Icon";
import { ABOUT } from "@/content/profile";

export function About() {
  return (
    <section className="screen about" id="about" data-screen-label="02 About">
      <div className="about-rise">
        <div className="section-header">
          <p className="section-eyebrow">{ABOUT.eyebrow}</p>
          <h2 className="section-title">{ABOUT.sectionTitle}</h2>
        </div>

        <div className="about-grid">
          <p className="about-statement">{ABOUT.statement}</p>

          <div className="about-side">
            <div className="about-fact">
              <span className="k">{ABOUT.sideBasedLabel}</span>
              <span className="v">
                {ABOUT.sideBasedValue}
                <small>{ABOUT.sideBasedSub}</small>
              </span>
            </div>
            <div className="about-fact">
              <span className="k">{ABOUT.sideStatusLabel}</span>
              <span className="v">
                {ABOUT.sideStatusValue}
                <small>{ABOUT.sideStatusSub}</small>
              </span>
            </div>
          </div>
        </div>

        <figure className="about-photo">
          <div className="about-photo-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ABOUT.photoSrc}
              alt={ABOUT.photoAlt}
              loading="lazy"
            />
          </div>
          <figcaption className="about-photo-caption">
            <span className="k">{ABOUT.captionKicker}</span>
            <span className="v">{ABOUT.captionValue}</span>
            <span className="m">{ABOUT.captionMeta}</span>
            {ABOUT.captionLinkHref && (
              <a
                className="about-photo-link"
                href={ABOUT.captionLinkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{ABOUT.captionLinkLabel}</span>
                <Icon name="arrowRight" size={14} />
              </a>
            )}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
