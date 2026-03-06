"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn, duration } from "./presets";

type Direction = "up" | "down" | "left" | "right" | "scale";

const directionMap: Record<Direction, Variants> = {
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
};

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration: dur = duration.smooth,
  threshold = 0.15,
  once = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      variants={directionMap[direction]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: dur, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
