import type { Variants, Transition } from "framer-motion";

// Duration reference (cinematic timing)
export const duration = {
  instant: 0.1,
  quick: 0.2,
  normal: 0.3,
  smooth: 0.4,
  dramatic: 0.5,
  reveal: 0.6,
  cinematic: 0.8,
  count: 2.0,
} as const;

// Spring configs
export const spring = {
  gentle: { type: "spring", stiffness: 100, damping: 15 } as Transition,
  bouncy: { type: "spring", stiffness: 200, damping: 10 } as Transition,
  smooth: { type: "spring", stiffness: 120, damping: 20 } as Transition,
} as const;

// Fade variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const stagger = {
  container: (staggerDelay = 0.05): Variants => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }),
  item: fadeUp,
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98 },
};
