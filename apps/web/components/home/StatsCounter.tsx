"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  {
    end: 562,
    labelTh: "ภาพยนตร์",
    labelEn: "Films",
    badgeTh: "+12 เดือนนี้",
    badgeEn: "+12 this month",
    color: "#EC1C72",
    glowColor: "rgba(236, 28, 114, 0.12)",
  },
  {
    end: 737,
    labelTh: "ละครโทรทัศน์",
    labelEn: "TV Series",
    badgeTh: "+8 เดือนนี้",
    badgeEn: "+8 this month",
    color: "#F76532",
    glowColor: "rgba(247, 101, 50, 0.12)",
  },
  {
    end: 5888,
    labelTh: "บุคลากร",
    labelEn: "Personnel",
    badgeTh: "+45 เดือนนี้",
    badgeEn: "+45 this month",
    color: "#F6A51B",
    glowColor: "rgba(246, 165, 27, 0.12)",
  },
  {
    end: 1254036,
    labelTh: "ผู้เข้าชม",
    labelEn: "Visitors",
    badgeTh: "+15,230 เดือนนี้",
    badgeEn: "+15,230 this month",
    color: "#702874",
    glowColor: "rgba(112, 40, 116, 0.12)",
  },
];

// Custom SVG icons that are more cinematic than Lucide defaults
function StatIcon({ type, color }: { type: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    Films: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M7 2v20M17 2v20M2 7h5M17 7h5M2 12h20M2 17h5M17 17h5" />
      </svg>
    ),
    "TV Series": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M8 2l4 3 4-3" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    Personnel: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <circle cx="18" cy="9" r="2.5" />
        <path d="M21 21v-1.5a3 3 0 00-3-3h-.5" />
      </svg>
    ),
    Visitors: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  };
  return <>{icons[type]}</>;
}

function StatCard({
  end,
  labelTh,
  labelEn,
  badgeTh,
  badgeEn,
  color,
  glowColor,
  index,
}: (typeof stats)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);
  const { lang } = useLanguage();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, end, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, end]);

  const formatted = new Intl.NumberFormat().format(displayValue);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      className="relative group rounded-2xl overflow-hidden cursor-default"
    >
      {/* Glass background */}
      <div className="absolute inset-0 backdrop-blur-xl" style={{
        background: "linear-gradient(135deg, var(--ct-glass-bg) 0%, var(--ct-bg-page) 100%)",
        border: "1px solid var(--ct-border)",
        borderRadius: "1rem",
      }} />

      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />

      {/* Mouse-follow glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(250px circle at ${(x as number) * 100}% ${(y as number) * 100}%, ${glowColor}, transparent 70%)`
          ),
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{ background: `${color}12`, boxShadow: `inset 0 0 0 1px ${color}20` }}>
            <StatIcon type={labelEn} color={color} />
          </div>
          <span className="text-[var(--ct-text-muted)] text-sm font-thai font-medium">
            {lang === "th" ? labelTh : labelEn}
          </span>
        </div>

        <div className="font-display text-4xl md:text-5xl font-bold mb-3 transition-all duration-300" style={{ color }}>
          {formatted}
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-thai font-medium"
            style={{ background: `${color}12`, color }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill={color}><path d="M4 0l4 5H0L4 0z" /></svg>
            {lang === "th" ? badgeTh : badgeEn}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsCounter() {
  return (
    <section className="relative py-20 bg-[var(--ct-bg-page)] overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px]" style={{ background: "radial-gradient(ellipse, rgba(236,28,114,0.02) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px]" style={{ background: "radial-gradient(ellipse, rgba(112,40,116,0.02) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.labelEn} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
