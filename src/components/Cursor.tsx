"use client";

import React from "react";

type RGB = [number, number, number];
const PALETTE_BG: Record<string, { top: RGB; bot: RGB }> = {
  cool: { top: [199, 203, 209], bot: [42, 45, 51] },
  warm: { top: [208, 200, 192], bot: [38, 31, 26] },
  noir: { top: [42, 45, 51], bot: [10, 12, 16] },
};

export function Cursor() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = document.createElement("div");
    dot.className = "cur-dot";
    const ring = document.createElement("div");
    ring.className = "cur-ring";
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-cur", "");
    styleEl.textContent = "*{cursor:none !important;}";
    document.head.appendChild(styleEl);

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;
    let hovering = false;
    let pressing = false;
    let lastSeenHoverable: Element | null = null;

    let audioCtx: AudioContext | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function ensureAudio(): AudioContext | null {
      if (audioCtx) return audioCtx;
      try {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return null;
        audioCtx = new AC();
      } catch {
        return null;
      }
      return audioCtx;
    }
    const SFX_NOTES = [220.0, 261.63, 329.63, 392.0, 440.0, 523.25, 659.25];
    function playClickSfx(strong: boolean) {
      if (reducedMotion) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        try {
          ctx.resume();
        } catch {}
      }
      const t = ctx.currentTime;

      const pool = strong ? SFX_NOTES.slice(2) : SFX_NOTES.slice(0, 5);
      const f0 = pool[Math.floor(Math.random() * pool.length)];

      const master = ctx.createGain();
      master.gain.value = strong ? 0.085 : 0.06;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 3800;
      lp.Q.value = 0.3;
      master.connect(lp).connect(ctx.destination);

      const tone = (freq: number, level: number, attack: number, release: number, detune = 0) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        if (detune) o.detune.value = detune;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(level, t + attack);
        g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
        o.connect(g).connect(master);
        o.start(t);
        o.stop(t + attack + release + 0.05);
      };

      tone(f0, 0.9, 0.028, 0.42);
      tone(f0 * 2, 0.32, 0.04, 0.3, +6);
      tone(f0 * 3, 0.14, 0.055, 0.22, -4);
    }

    const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    const relLum = (r: number, g: number, b: number) =>
      0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255);

    function parseRgb(str: string) {
      const m = String(str).match(/rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)(?:\D+([0-9.]+))?\s*\)/);
      if (!m) return null;
      const a = m[4] !== undefined ? +m[4] : 1;
      return { r: +m[1], g: +m[2], b: +m[3], a };
    }

    function bgLuminance(x: number, y: number): number {
      const el = document.elementFromPoint(x, y);
      if (!el) return 0.5;

      const morph = el.closest && el.closest(".morph-stage");
      if (morph) {
        let pal = "cool";
        if (morph.classList.contains("palette-warm")) pal = "warm";
        else if (morph.classList.contains("palette-noir")) pal = "noir";
        const p = PALETTE_BG[pal];
        const r0 = morph.getBoundingClientRect();
        const t = Math.max(0, Math.min(1, (y - r0.top) / r0.height));
        const r = p.top[0] + (p.bot[0] - p.top[0]) * t;
        const g = p.top[1] + (p.bot[1] - p.top[1]) * t;
        const b = p.top[2] + (p.bot[2] - p.top[2]) * t;
        return relLum(r, g, b);
      }

      if (
        el.closest &&
        el.closest(
          ".featured, .contact, .edu-primary, .project-card:not(.dark-text), .hero, .hero-content"
        )
      ) {
        return 0.04;
      }

      if (el.closest && el.closest(".project-card.dark-text")) {
        return 0.78;
      }

      let node: Element | null = el;
      let depth = 0;
      while (node && depth < 12) {
        const s = getComputedStyle(node);
        const c = parseRgb(s.backgroundColor);
        if (c && c.a > 0.5) return relLum(c.r, c.g, c.b);
        node = node.parentElement;
        depth++;
      }

      return 0.85;
    }

    function applyAdaptive(x: number, y: number) {
      if (hovering || pressing) return;
      const lum = bgLuminance(x, y);
      if (lum > 0.4) {
        dot.style.background = "rgba(20,22,26,0.92)";
        ring.style.borderColor = "rgba(20,22,26,0.70)";
      } else if (lum < 0.28) {
        dot.style.background = "#ffffff";
        ring.style.borderColor = "rgba(255,255,255,0.90)";
      } else {
        dot.style.background = "#ffffff";
        ring.style.borderColor = "rgba(255,255,255,0.85)";
      }
    }

    function tick() {
      raf = 0;
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        raf = requestAnimationFrame(tick);
      }
    }

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      if (dot.style.opacity !== "1") {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      applyAdaptive(mx, my);
      if (!raf) raf = requestAnimationFrame(tick);
    }

    const HOVER_SEL = 'a, button, [role="button"], input, textarea, label, summary';
    function findHoverable(t: EventTarget | null): Element | null {
      const el = t as Element | null;
      return el && el.closest ? el.closest(HOVER_SEL) : null;
    }
    function onOver(e: PointerEvent) {
      const h = findHoverable(e.target);
      if (h && h !== lastSeenHoverable) {
        lastSeenHoverable = h;
        hovering = true;
        ring.classList.add("hov");
        dot.classList.add("hov");
      }
    }
    function onOut(e: PointerEvent) {
      const from = findHoverable(e.target);
      const to = findHoverable(e.relatedTarget);
      if (from && from === lastSeenHoverable && to !== from) {
        lastSeenHoverable = to || null;
        if (!to) {
          hovering = false;
          ring.classList.remove("hov");
          dot.classList.remove("hov");
          applyAdaptive(mx, my);
        }
      }
    }

    function onDown(e: MouseEvent) {
      pressing = true;
      ring.classList.add("pressing");
      dot.classList.add("pressing");
      const onHoverable = !!findHoverable(e && e.target);
      playClickSfx(onHoverable);
    }
    function onUp(e: MouseEvent) {
      if (!pressing) return;
      pressing = false;
      ring.classList.remove("pressing");
      dot.classList.remove("pressing");

      const ping = document.createElement("div");
      ping.className = "cur-ping";
      ping.style.left = e.clientX + "px";
      ping.style.top = e.clientY + "px";
      document.body.appendChild(ping);
      ping.addEventListener("animationend", () => ping.remove());

      applyAdaptive(mx, my);
    }

    function onEnter() {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    }
    function onLeave() {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);
    const onScroll = () => applyAdaptive(mx, my);
    window.addEventListener("scroll", onScroll, { passive: true });

    dot.style.left = mx + "px";
    dot.style.top = my + "px";
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    applyAdaptive(mx, my);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      dot.remove();
      ring.remove();
      styleEl.remove();
    };
  }, []);

  return null;
}
