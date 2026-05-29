"use client";

import React from "react";
import { BgCanvas } from "./BgCanvas";

export function useReducedMotion() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const h = () => setR(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return r;
}

interface MorphStageProps {
  palette?: "cool" | "warm" | "noir";
  children: React.ReactNode;
}

export function MorphStage({ palette = "cool", children }: MorphStageProps) {
  const [hp, setHp] = React.useState(0);
  const [ap, setAp] = React.useState(0);
  const [sp, setSp] = React.useState(0);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = Math.max(0, -r.top);

      const smooth = (x: number) => x * x * (3 - 2 * x);

      const hRaw = Math.max(0, Math.min(1, scrolled / (vh * 0.9)));
      const aRaw = Math.max(0, Math.min(1, (scrolled - vh * 0.18) / (vh * 0.72)));
      setHp(reduced ? (hRaw > 0.5 ? 1 : 0) : smooth(hRaw));
      setAp(reduced ? (aRaw > 0.5 ? 1 : 0) : smooth(aRaw));

      const total = document.documentElement.scrollHeight - vh;
      setSp(total > 0 ? window.scrollY / total : 0);

      if (window.__setBgFade) {
        const x = Math.max(0, Math.min(1, hRaw / 0.70));
        const sm = x * x * (3 - 2 * x);
        window.__setBgFade(1 - sm);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const style = {
    ["--hp" as string]: hp.toFixed(4),
    ["--ap" as string]: ap.toFixed(4),
  } as React.CSSProperties;

  const progressStyle = {
    ["--sp" as string]: sp.toFixed(4),
  } as React.CSSProperties;

  return (
    <>
      <div
        ref={stageRef}
        className={"morph-stage palette-" + palette + (reduced ? " reduced" : "")}
        style={style}
      >
        <div className="morph-bg" />
        <BgCanvas />
        {children}
      </div>
      <div className="morph-progress" style={progressStyle} />
    </>
  );
}
