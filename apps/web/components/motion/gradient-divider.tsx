"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GradientDividerProps {
  className?: string;
  variant?: "default" | "pink" | "orange" | "amber" | "purple";
}

const gradients = {
  default:
    "linear-gradient(90deg, transparent 0%, rgba(236,28,114,0.3) 20%, rgba(247,101,50,0.5) 50%, rgba(246,165,27,0.3) 80%, transparent 100%)",
  pink:
    "linear-gradient(90deg, transparent 0%, rgba(236,28,114,0.4) 30%, rgba(236,28,114,0.6) 50%, rgba(236,28,114,0.4) 70%, transparent 100%)",
  orange:
    "linear-gradient(90deg, transparent 0%, rgba(247,101,50,0.4) 30%, rgba(247,101,50,0.6) 50%, rgba(247,101,50,0.4) 70%, transparent 100%)",
  amber:
    "linear-gradient(90deg, transparent 0%, rgba(246,165,27,0.4) 30%, rgba(246,165,27,0.6) 50%, rgba(246,165,27,0.4) 70%, transparent 100%)",
  purple:
    "linear-gradient(90deg, transparent 0%, rgba(112,40,116,0.4) 30%, rgba(112,40,116,0.6) 50%, rgba(112,40,116,0.4) 70%, transparent 100%)",
};

export function GradientDivider({
  className = "",
  variant = "default",
}: GradientDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`relative py-2 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px w-full origin-center"
        style={{ background: gradients[variant] }}
      />
    </div>
  );
}
