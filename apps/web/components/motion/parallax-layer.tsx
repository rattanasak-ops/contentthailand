"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0.1 = slow, 1.0 = fast
  direction?: "vertical" | "horizontal";
  className?: string;
  offset?: [string, string]; // start, end of scroll range
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  direction = "vertical",
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const x = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <motion.div
        style={direction === "vertical" ? { y } : { x }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
