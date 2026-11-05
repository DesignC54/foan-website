"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

// Large statements light up word by word as they scroll through the viewport
// (dim → full), tied to scroll position so it reads at the visitor's pace.
// Server HTML contains the full sentence, so it's readable without JS.

function Word({
  word,
  i,
  total,
  progress,
}: {
  word: string;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = i / total;
  const opacity = useTransform(
    progress,
    [start, Math.min(1, start + 2 / total)],
    [0.22, 1],
  );
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

export function ScrollWords({
  text,
  className = "",
  as = "h2",
}: {
  text: string;
  className?: string;
  as?: "h2" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "end 50%"],
  });
  const words = text.split(" ");
  const Tag = as;

  if (reduce) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          i={i}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </Tag>
  );
}
