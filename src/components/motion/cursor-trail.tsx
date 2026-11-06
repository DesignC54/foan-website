"use client";

import { useEffect, useRef } from "react";

// Halftone cursor trail: a fixed grid of dots that light up where the cursor
// passes, largest at the pointer, then shrink away. Our own implementation.
//   - Dots use the accent token (lime in Dark, olive in Light).
//   - Mouse/trackpad only: skipped on touch screens and for reduced motion.
//   - The animation loop only runs while there is something to draw.

const GAP = 14; // grid spacing in CSS px
const RADIUS = 90; // reach of the cursor in CSS px
const MAX_DOT = 2.4; // largest dot radius
const DECAY = 0.93; // per-frame fade (~0.6s at 60fps)

export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0,
      rows = 0,
      grid = new Float32Array(0),
      raf = 0,
      running = false,
      last: { x: number; y: number } | null = null,
      color = "#e9fe00";

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth,
        h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
      grid = new Float32Array(cols * rows);
      color = getComputedStyle(canvas).color;
    };

    // Raise the intensity of cells around (x, y), soft circular falloff.
    const stamp = (x: number, y: number) => {
      const r = Math.ceil(RADIUS / GAP);
      const cx = Math.round(x / GAP),
        cy = Math.round(y / GAP);
      for (let j = Math.max(0, cy - r); j <= Math.min(rows - 1, cy + r); j++)
        for (
          let i = Math.max(0, cx - r);
          i <= Math.min(cols - 1, cx + r);
          i++
        ) {
          const d = Math.hypot(i * GAP - x, j * GAP - y) / RADIUS;
          if (d >= 1) continue;
          const v = (1 - d) * (1 - d);
          const k = j * cols + i;
          if (v > grid[k]) grid[k] = v;
        }
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.beginPath();
      let alive = false;
      for (let k = 0; k < grid.length; k++) {
        const v = grid[k];
        if (v < 0.02) {
          grid[k] = 0;
          continue;
        }
        alive = true;
        const x = (k % cols) * GAP,
          y = Math.floor(k / cols) * GAP;
        const r = 0.5 + v * MAX_DOT;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
        grid[k] = v * DECAY;
      }
      ctx.fill();
      if (alive) raf = requestAnimationFrame(frame);
      else running = false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const p = { x: e.clientX, y: e.clientY };
      // Fill gaps on fast movements so the trail stays continuous.
      if (last) {
        const dist = Math.hypot(p.x - last.x, p.y - last.y);
        const steps = Math.min(20, Math.floor(dist / (GAP * 0.75)));
        for (let s = 1; s < steps; s++)
          stamp(
            last.x + ((p.x - last.x) * s) / steps,
            last.y + ((p.y - last.y) * s) / steps,
          );
      }
      stamp(p.x, p.y);
      last = p;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const onLeave = () => (last = null);
    const onTheme = new MutationObserver(
      () => (color = getComputedStyle(canvas).color),
    );

    setup();
    window.addEventListener("resize", setup);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    onTheme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onTheme.disconnect();
    };
  }, []);

  // Above page content, below the header (z-50) and mobile menu (z-60).
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="text-accent-text pointer-events-none fixed inset-0 z-[45] size-full opacity-55"
    />
  );
}
