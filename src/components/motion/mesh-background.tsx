"use client";

import { useEffect, useRef } from "react";

// Animated low-poly wireframe "terrain": a jittered triangle mesh whose
// heights roll slowly like a signal. Our own 2D-canvas implementation:
//   - colour comes from CSS `color` (so text-primary / text-white work and
//     it follows Dark/Light),
//   - pauses when off-screen, caps device pixel ratio for performance,
//   - draws one still frame for prefers-reduced-motion.

type Props = {
  className?: string;
  /** Approximate cell size in CSS px (smaller = denser). */
  cell?: number;
  /** Rows of the mesh. */
  rows?: number;
  /** Vertical wave amplitude in CSS px. */
  amplitude?: number;
  /** Line opacity range [min, max]; brighter on wave crests. */
  opacity?: [number, number];
  /** Fixed seed so the mesh shape is stable between renders. */
  seed?: number;
};

function rng(seed: number) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

export function MeshBackground({
  className = "",
  cell = 84,
  rows = 9,
  amplitude = 34,
  opacity = [0.14, 0.42],
  seed = 7,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let w = 0,
      h = 0,
      cols = 0,
      jitter: [number, number][] = [],
      raf = 0,
      visible = true,
      color = "#fff";

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell) + 3;
      const r = rng(seed);
      jitter = Array.from({ length: (cols + 1) * (rows + 1) }, () => [
        (r() - 0.5) * 0.7,
        (r() - 0.5) * 0.6,
      ]);
      color = getComputedStyle(canvas).color;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      const cw = (w + cell * 2) / cols;
      // Rows bunch towards the top for a sense of depth.
      const pts: { x: number; y: number; k: number }[] = [];
      for (let j = 0; j <= rows; j++) {
        const depth = j / rows;
        const yBase = h * (0.08 + 0.84 * Math.pow(depth, 1.35));
        const amp = amplitude * (0.45 + 0.55 * depth);
        for (let i = 0; i <= cols; i++) {
          const [jx, jy] = jitter[j * (cols + 1) + i];
          const x = -cell + (i + jx) * cw;
          const wave =
            Math.sin(x * 0.0042 + time * 0.35 + j * 0.5) * 0.55 +
            Math.sin(x * 0.0017 - time * 0.22 + j * 0.9) * 0.35 +
            Math.sin((x + j * 140) * 0.0031 + time * 0.16) * 0.3;
          pts.push({
            x,
            y: yBase + (jy * h) / rows / 2 - wave * amp,
            k: (wave + 1.2) / 2.4,
          });
        }
      }
      // Bucket edges by brightness so we stroke a few paths, not hundreds.
      const buckets = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      const P = (i: number, j: number) => pts[j * (cols + 1) + i];
      const edge = (a: (typeof pts)[0], b: (typeof pts)[0]) => {
        const k = Math.max(0, Math.min(3, Math.floor(((a.k + b.k) / 2) * 4)));
        buckets[k].moveTo(a.x, a.y);
        buckets[k].lineTo(b.x, b.y);
      };
      for (let j = 0; j <= rows; j++)
        for (let i = 0; i <= cols; i++) {
          if (i < cols) edge(P(i, j), P(i + 1, j));
          if (j < rows) edge(P(i, j), P(i, j + 1));
          // Alternate the diagonal so the triangles don't all lean one way.
          if (i < cols && j < rows) {
            if ((i + j) % 2) edge(P(i, j), P(i + 1, j + 1));
            else edge(P(i + 1, j), P(i, j + 1));
          }
        }
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      buckets.forEach((path, k) => {
        ctx.globalAlpha = opacity[0] + ((opacity[1] - opacity[0]) * k) / 3;
        ctx.stroke(path);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    setup();
    draw(0);
    if (!reduce) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      setup();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    // Theme switch changes the line colour.
    const mo = new MutationObserver(() => {
      color = getComputedStyle(canvas).color;
      if (reduce || !visible) draw(performance.now());
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, [cell, rows, amplitude, opacity[0], opacity[1], seed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none block ${className}`}
    />
  );
}
