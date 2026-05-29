"use client";

import React from "react";
import { TOKEN_VOCAB } from "@/content/profile";

const ACCENT_RGB = "62,106,225";
const NODE_LINK_RADIUS = 128;

declare global {
  interface Window {
    __setBgFade?: (v: number) => void;
  }
}

export function BgCanvas() {
  const sharpRef = React.useRef<HTMLCanvasElement>(null);
  const blurRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sharp = sharpRef.current;
    const blur = blurRef.current;
    if (!sharp || !blur) return;
    const sctx = sharp.getContext("2d")!;
    const bctx = blur.getContext("2d")!;

    let W = 0, H = 0, dpr = 1, raf = 0;
    let nodes: Array<{ x: number; y: number; vx: number; vy: number; accent: boolean }> = [];
    let tokens: Array<{ text: string; x: number; y: number; vy: number; vx: number; sz: number; accent: boolean; a: number }> = [];
    let fade = 1;

    function sizeCanvases() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      [sharp!, blur!].forEach((cv) => {
        cv.width = Math.floor(W * dpr);
        cv.height = Math.floor(H * dpr);
        cv.style.width = W + "px";
        cv.style.height = H + "px";
      });
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    function makeToken(seedFull: boolean) {
      return {
        text: TOKEN_VOCAB[Math.floor(Math.random() * TOKEN_VOCAB.length)],
        x: Math.random() * W,
        y: seedFull ? Math.random() * H : H + 20 + Math.random() * 40,
        vy: -(0.035 + Math.random() * 0.095),
        vx: (Math.random() - 0.5) * 0.08,
        sz: 11 + Math.random() * 6,
        accent: Math.random() < 0.16,
        a: 0.18 + Math.random() * 0.16,
      };
    }

    function spawn() {
      const NODE_COUNT = Math.max(40, Math.min(80, Math.floor((W * H) / 22000)));
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.30,
        vy: (Math.random() - 0.5) * 0.30,
        accent: Math.random() < 0.12,
      }));
      const TOK_COUNT = Math.max(14, Math.min(20, Math.floor((W * H) / 90000)));
      tokens = Array.from({ length: TOK_COUNT }, () => makeToken(true));
    }

    function draw() {
      raf = 0;
      if (fade < 0.02) {
        sctx.clearRect(0, 0, W, H);
        bctx.clearRect(0, 0, blur!.width, blur!.height);
        if (!reduced) raf = requestAnimationFrame(draw);
        return;
      }

      sctx.clearRect(0, 0, W, H);
      sctx.lineWidth = 1;
      const R2 = NODE_LINK_RADIUS * NODE_LINK_RADIUS;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2);
            const al = (1 - d / NODE_LINK_RADIUS) * 0.20 * fade;
            sctx.strokeStyle = "rgba(255,255,255," + al.toFixed(3) + ")";
            sctx.beginPath();
            sctx.moveTo(a.x, a.y);
            sctx.lineTo(b.x, b.y);
            sctx.stroke();
          }
        }
      }

      sctx.textBaseline = "alphabetic";
      for (const t of tokens) {
        t.y += t.vy;
        t.x += t.vx;
        if (t.y < -20) { t.y = H + 20; t.x = Math.random() * W; t.text = TOKEN_VOCAB[Math.floor(Math.random() * TOKEN_VOCAB.length)]; }
        if (t.x < -160) t.x = W + 40;
        if (t.x > W + 160) t.x = -40;
        sctx.font = t.sz.toFixed(0) + 'px ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace';
        const alpha = t.a * fade;
        sctx.fillStyle = t.accent
          ? "rgba(" + ACCENT_RGB + "," + (alpha * 1.4).toFixed(3) + ")"
          : "rgba(255,255,255," + alpha.toFixed(3) + ")";
        sctx.fillText(t.text, t.x, t.y);
      }

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = W; else if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; else if (n.y > H) n.y = 0;
        const r = n.accent ? 1.9 : 1.3;
        sctx.fillStyle = n.accent
          ? "rgba(" + ACCENT_RGB + "," + (0.90 * fade).toFixed(3) + ")"
          : "rgba(255,255,255," + (0.55 * fade).toFixed(3) + ")";
        sctx.beginPath();
        sctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        sctx.fill();
      }

      bctx.clearRect(0, 0, blur!.width, blur!.height);
      bctx.drawImage(sharp!, 0, 0);

      if (!reduced) raf = requestAnimationFrame(draw);
    }

    sizeCanvases();
    spawn();
    draw();

    const onResize = () => { sizeCanvases(); spawn(); };
    window.addEventListener("resize", onResize);

    window.__setBgFade = (v: number) => {
      const x = typeof v === "number" ? v : 1;
      fade = Math.max(0, Math.min(1, x));
    };

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      try { delete window.__setBgFade; } catch (_) {}
    };
  }, []);

  return (
    <>
      <canvas ref={sharpRef} className="bg-canvas bg-canvas-sharp" aria-hidden="true" />
      <canvas ref={blurRef} className="bg-canvas bg-canvas-blur" aria-hidden="true" />
    </>
  );
}
