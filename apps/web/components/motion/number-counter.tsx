"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface NumberCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;
}

export function NumberCounter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
  once = true,
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (value) => {
        setDisplayValue(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  const formatted = new Intl.NumberFormat().format(displayValue);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
