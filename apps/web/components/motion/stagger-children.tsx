"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stagger } from "./presets";

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.05,
  threshold = 0.1,
  once = true,
  className,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      variants={stagger.container(staggerDelay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Wrapper for each child item
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={stagger.item}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
