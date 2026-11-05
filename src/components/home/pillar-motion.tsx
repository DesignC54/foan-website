"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Hero pillar entrance + float, driven by Motion (JS frame updates).
// CSS keyframes on these elements stopped painting in Chrome after the
// entrance, so this avoids the compositor path entirely.

export function PillarMotion({
  children,
  from,
  delay,
  floatOffset = 0,
}: {
  children: ReactNode;
  from: "left" | "right" | "below";
  delay: number;
  floatOffset?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  const start =
    from === "below"
      ? { opacity: 0, y: 28, scale: 0.8 }
      : {
          opacity: 0,
          x: from === "left" ? -120 : 120,
          scale: 0.7,
          rotate: from === "left" ? -14 : 14,
        };

  return (
    <motion.div
      initial={start}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 13,
        mass: 1,
        delay,
        opacity: { duration: 0.6, delay },
      }}
    >
      {from === "below" ? (
        children
      ) : (
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay + 1.2 + floatOffset,
          }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
