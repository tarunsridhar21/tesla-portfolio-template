"use client";

import React from "react";
import { Cursor } from "@/components/Cursor";
import { PortfolioNav } from "@/components/Nav";
import { MorphStage } from "@/components/MorphStage";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Featured } from "@/components/Featured";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { PaletteToggle, type Palette } from "@/components/PaletteToggle";
import { Icon } from "@/components/Icon";
import { IDENTITY, SOCIAL, FEATURED } from "@/content/profile";

const BASE_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SECTIONS = FEATURED
  ? [
      BASE_SECTIONS[0],
      { id: "featured", label: "Featured" },
      ...BASE_SECTIONS.slice(1),
    ]
  : BASE_SECTIONS;

export default function Page() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState("hero");
  const [palette, setPalette] = React.useState<Palette>("noir");
  const [showPersistentBar] = React.useState(true);
  const [accent] = React.useState(IDENTITY.accentHex);
  const [inquiry, setInquiry] = React.useState("");

  React.useEffect(() => {
    document.documentElement.style.setProperty("--tds-electric-blue", accent);
    document.documentElement.style.setProperty("--accent", accent);
  }, [accent]);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const probe = window.scrollY + window.innerHeight * 0.35;
      const all = ["hero", ...SECTIONS.map((s) => s.id)];
      let cur = "hero";
      for (const id of all) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  const darkSections = new Set(["hero", "about", "featured", "contact"]);
  const overDark = darkSections.has(active) && !scrolled;
  const onMetal = active === "hero" || active === "about";
  const hideBar = active === "hero" || active === "contact" || !showPersistentBar;
  const showPaletteToggle = active === "hero" || active === "about";

  const submitInquiry = () => {
    const msg = inquiry.trim();
    if (msg.length === 0) {
      jump("contact");
      return;
    }
    const to = SOCIAL.email;
    const subject = encodeURIComponent("Portfolio Enquiry");
    const body = encodeURIComponent(msg);
    window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
  };

  return (
    <>
      <Cursor />
      <PortfolioNav
        scrolled={scrolled}
        overDark={overDark}
        onMetal={onMetal}
        sections={SECTIONS}
        active={active}
        onJump={jump}
      />

      <main>
        <MorphStage palette={palette}>
          <Hero palette={palette} />
          <About />
        </MorphStage>
        <Featured />
        <Experience />
        <Education />
        <Stack />
        <Projects />
        <Contact />
      </main>

      <PaletteToggle
        value={palette}
        onChange={(v) => setPalette(v)}
        visible={showPaletteToggle}
      />

      <div className={"persistent-bar" + (hideBar ? " hidden" : "")}>
        <span className="icon">
          <Icon name="chat" size={20} />
        </span>
        <span className="label">{IDENTITY.openToStatus}</span>
        <input
          className="placeholder"
          placeholder="Ask about a project, role, or availability…"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitInquiry();
          }}
        />
        <span className="divider" />
        <button className="schedule" onClick={submitInquiry}>
          <span className="schedule-label">
            {inquiry.trim().length > 0 ? "Send enquiry" : "Get in touch"}
          </span>
          <span className="schedule-icon">
            <Icon name="arrowRight" size={18} />
          </span>
        </button>
      </div>
    </>
  );
}
