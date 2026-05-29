"use client";

import React from "react";
import { Icon } from "./Icon";
import { IDENTITY, ROLES, SOCIAL } from "@/content/profile";

interface HeroProps {
  palette?: "cool" | "warm" | "noir";
}

export function Hero({ palette = "warm" }: HeroProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const LONGEST_ROLE = React.useMemo(
    () => ROLES.reduce((a, b) => (b.length > a.length ? b : a), ""),
    []
  );
  const [roleIdx, setRoleIdx] = React.useState(0);
  const [flipping, setFlipping] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setFlipping(true);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const onFlipEnd = (e: React.AnimationEvent) => {
    if (e.animationName !== "heroCubeFlipUp") return;
    setRoleIdx((i) => (i + 1) % ROLES.length);
    setFlipping(false);
  };

  const current = ROLES[roleIdx];
  const next = ROLES[(roleIdx + 1) % ROLES.length];

  return (
    <section className="screen hero" id="hero" data-screen-label="01 Hero">
      <div className={"canvas gradient-" + palette} />

      <div className="hero-content" ref={contentRef}>
        <p className="hero-eyebrow reveal r1">Hello,</p>
        <h1 className="hero-title reveal r2">I&apos;m {IDENTITY.firstName}.</h1>
        <p className="hero-location reveal r3">
          <span className="hero-cube">
            <span className="hero-cube-ghost" aria-hidden="true">
              A {LONGEST_ROLE}.
            </span>
            <span
              className={"hero-cube-inner dir-up" + (flipping ? " flipping" : "")}
              onAnimationEnd={onFlipEnd}
            >
              <span className="hero-cube-face front">
                A {current}
                <span className="hero-cube-period">.</span>
              </span>
              <span className="hero-cube-face bottom">
                A {next}
                <span className="hero-cube-period">.</span>
              </span>
            </span>
          </span>
        </p>
      </div>

      <div className="hero-socials-positioner">
        <div className="hero-socials reveal r4">
          <a
            className="hero-social"
            href={SOCIAL.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Icon name="linkedin" size={20} />
            <span>LinkedIn</span>
          </a>
          <a
            className="hero-social"
            href={SOCIAL.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Icon name="github" size={20} />
            <span>GitHub</span>
          </a>
          <a
            className="hero-social"
            href={IDENTITY.cvFile}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
          >
            <Icon name="download" size={20} />
            <span>Résumé</span>
          </a>
        </div>
      </div>
    </section>
  );
}
