"use client";

import { useId } from "react";
import { useReducedMotion } from "motion/react";

// The hero pillar hexagon (Figma hex-a / hex-b / hex-c) drawn inline so its
// gradient border can turn: the gradient rotates around the hexagon's centre,
// so the lime highlight travels smoothly round the edge. Each pillar gets a
// different start point so they don't move in step. Static for reduced motion.

const PATH =
  "M60 3.5C62.4323 2.09571 65.1914 1.35641 68 1.35641C70.8086 1.35641 73.5677 2.09571 76 3.5L126 32.4C128.424 33.7995 130.439 35.8104 131.842 38.232C133.246 40.6535 133.99 43.401 134 46.2V105.8C133.99 108.599 133.246 111.346 131.842 113.768C130.439 116.19 128.424 118.2 126 119.6L76 148.5C73.5677 149.904 70.8086 150.644 68 150.644C65.1914 150.644 62.4323 149.904 60 148.5L10 119.6C7.57596 118.2 5.56146 116.19 4.15766 113.768C2.75386 111.346 2.00988 108.599 2 105.8V46.2C2.00988 43.401 2.75386 40.6535 4.15766 38.232C5.56146 35.8104 7.57596 33.7995 10 32.4L60 3.5Z";

// Stops and stroke opacity per Figma shape.
const SHAPES: Record<string, { opacity: number; stops: [number, string][] }> = {
  "hex-a": {
    opacity: 0.55,
    stops: [
      [0, "#ECFF18"],
      [0.148, "#E4F617"],
      [0.413, "#000"],
      [0.849, "#ECFF18"],
    ],
  },
  "hex-b": {
    opacity: 1,
    stops: [
      [0, "#ECFF18"],
      [0.148, "#E4F617"],
      [0.413, "#000"],
      [0.849, "#8B9800"],
    ],
  },
  "hex-c": {
    opacity: 0.55,
    stops: [
      [0, "#ECFF18"],
      [0.207, "#E4F617"],
      [0.413, "#000"],
      [0.849, "#ECFF18"],
    ],
  },
};

const TURN = 9; // seconds per full turn

export function HexOutline({
  shape,
  phase = 0,
  className = "",
}: {
  shape: string;
  /** 0–1: where in the turn this hexagon starts. */
  phase?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const s = SHAPES[shape] ?? SHAPES["hex-a"];

  return (
    <svg
      viewBox="0 0 136 152"
      preserveAspectRatio="none"
      overflow="visible"
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient
          id={id}
          x1="2"
          y1="-37.5"
          x2="122.5"
          y2="195"
          gradientUnits="userSpaceOnUse"
        >
          {s.stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
          {!reduce && (
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 68 76"
              to="360 68 76"
              dur={`${TURN}s`}
              begin={`${-phase * TURN}s`}
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>
      <path
        d={PATH}
        fill="#111111"
        stroke={`url(#${id})`}
        strokeOpacity={s.opacity}
      />
    </svg>
  );
}
