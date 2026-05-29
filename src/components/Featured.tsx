"use client";

import { Icon } from "./Icon";
import { FEATURED } from "@/content/profile";

export function Featured() {
  if (!FEATURED) return null;

  return (
    <section className="screen featured" id="featured" data-screen-label="03 Featured">
      <div className="bg" />
      <div className="featured-inner">
        <div>
          <p className="featured-label">{FEATURED.label}</p>
          <h2 className="featured-title">
            <span className="prefix">{FEATURED.prefixHeadline}</span>
            <span className="main">{FEATURED.mainHeadline}</span>
          </h2>
          <p className="featured-body">{FEATURED.body}</p>

          <div className="featured-stats">
            <div className="cell">
              <div className="v">{FEATURED.statCellValue}</div>
              <div className="l">{FEATURED.statCellLabel}</div>
            </div>
          </div>

          <a
            className="featured-readmore"
            href={FEATURED.readmoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{FEATURED.readmoreLabel}</span>
            <Icon name="arrowRight" size={16} />
          </a>
        </div>

        <div className="featured-collage" aria-label="Recognition photos">
          {FEATURED.collage.map((img, i) => (
            <div className={`featured-collage-tile t${i + 1}`} tabIndex={0} key={img.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
