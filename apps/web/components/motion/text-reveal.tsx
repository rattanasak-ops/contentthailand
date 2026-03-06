"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  type?: "word" | "char";
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  type = "word",
  staggerDelay = 0.08,
  className,
  once = true,
  tag: Tag = "h1",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const items = type === "word" ? text.split(" ") : text.split("");

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
        className="inline-flex flex-wrap"
      >
        {items.map((item, i) => (
          <motion.span
            key={`${item}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 30, rotateX: -40 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
            className="inline-block"
            style={{ perspective: "500px" }}
          >
            {item}
            {type === "word" && <span>&nbsp;</span>}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
