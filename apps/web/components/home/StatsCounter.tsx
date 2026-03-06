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
    gradient: "linear-gradient(135deg, #EC1C72, #FF6B9D)",
    glowColor: "rgba(236, 28, 114, 0.25)",
    particleColor: "#EC1C72",
  },
  {
    end: 737,
    labelTh: "ละครโทรทัศน์",
    labelEn: "TV Series",
    badgeTh: "+8 เดือนนี้",
    badgeEn: "+8 this month",
    color: "#F76532",
    gradient: "linear-gradient(135deg, #F76532, #FFB347)",
    glowColor: "rgba(247, 101, 50, 0.25)",
    particleColor: "#F76532",
  },
  {
    end: 5888,
    labelTh: "บุคลากร",
    labelEn: "Personnel",
    badgeTh: "+45 เดือนนี้",
    badgeEn: "+45 this month",
    color: "#F6A51B",
    gradient: "linear-gradient(135deg, #F6A51B, #FFD700)",
    glowColor: "rgba(246, 165, 27, 0.25)",
    particleColor: "#F6A51B",
  },
  {
    end: 1254036,
    labelTh: "ผู้เข้าชม",
    labelEn: "Visitors",
    badgeTh: "+15,230 เดือนนี้",
    badgeEn: "+15,230 this month",
    color: "#A855F7",
    gradient: "linear-gradient(135deg, #A855F7, #D8B4FE)",
    glowColor: "rgba(168, 85, 247, 0.25)",
    particleColor: "#A855F7",
  },
];

function StatIcon({ type, color }: { type: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    Films: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M7 2v20M17 2v20M2 7h5M17 7h5M2 12h20M2 17h5M17 17h5" />
      </svg>
    ),
    "TV Series": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M8 2l4 3 4-3" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    Personnel: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <circle cx="18" cy="9" r="2.5" />
        <path d="M21 21v-1.5a3 3 0 00-3-3h-.5" />
      </svg>
    ),
    Visitors: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  };
  return <>{icons[type]}</>;
}

function AnimatedBorder({ color, gradient }: { color: string; gradient: string }) {
  return (
    <>
      {/* Animated rotating gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        <div
          className="absolute inset-0 animate-[spin_4s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${color}, transparent, transparent)`,
            transformOrigin: "center",
          }}
        />
      </div>
      {/* Inner background to mask the border effect */}
      <div
        className="absolute inset-[1px] rounded-2xl"
        style={{ background: "var(--ct-bg-page, #0F0B1E)" }}
      />
    </>
  );
}

function ShimmerEffect({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${color}08 45deg, transparent 90deg, transparent 360deg)`,
        }}
      />
    </div>
  );
}

function FloatingParticles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ background: color, opacity: 0.4 }}
          animate={{
            x: [0, (i + 1) * 30, 0],
            y: [0, -(i + 1) * 20, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
          initial={{ left: `${20 + i * 25}%`, bottom: "20%" }}
        />
      ))}
    </div>
  );
}

function StatCard({
  end,
  labelTh,
  labelEn,
  badgeTh,
  badgeEn,
  color,
  gradient,
  glowColor,
  particleColor,
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
      duration: 2.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, end]);

  const formatted = new Intl.NumberFormat().format(displayValue);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseMove={handleMouseMove}
      className="relative group rounded-2xl overflow-visible cursor-default"
    >
      {/* Large background glow on hover */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"
        style={{ background: glowColor }}
      />

      <div className="relative rounded-2xl overflow-hidden">
        <AnimatedBorder color={color} gradient={gradient} />
        <ShimmerEffect color={color} />
        <FloatingParticles color={particleColor} />

        {/* Mouse-follow spotlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl z-[1]"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(300px circle at ${(x as number) * 100}% ${(y as number) * 100}%, ${glowColor}, transparent 70%)`
            ),
          }}
        />

        {/* Glass content layer */}
        <div className="relative z-10 p-7 md:p-8">
          {/* Icon + Label row */}
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                boxShadow: `inset 0 0 0 1px ${color}25, 0 0 20px ${color}10`,
              }}
            >
              <StatIcon type={labelEn} color={color} />
            </motion.div>
            <span className="text-[var(--ct-text-muted)] text-sm font-thai font-semibold tracking-wide uppercase">
              {lang === "th" ? labelTh : labelEn}
            </span>
          </div>

          {/* Big number with gradient */}
          <div className="mb-4">
            <motion.span
              className="font-display text-5xl md:text-6xl font-black tracking-tight inline-block"
              style={{
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: `drop-shadow(0 0 30px ${glowColor})`,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {formatted}
            </motion.span>
          </div>

          {/* Badge */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-thai font-semibold backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${color}18, ${color}08)`,
                color,
                border: `1px solid ${color}20`,
                boxShadow: `0 0 12px ${color}10`,
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill={color}>
                <path d="M4 0l4 5H0L4 0z" />
              </svg>
              {lang === "th" ? badgeTh : badgeEn}
            </span>
          </motion.div>
        </div>

        {/* Bottom edge glow line */}
        <div
          className="absolute bottom-0 left-[10%] right-[10%] h-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export function StatsCounter() {
  return (
    <section className="relative py-24 md:py-32 ct-section-a ct-tint-purple overflow-hidden">
      {/* Premium ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(236,28,114,0.04) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)",
          }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(246,165,27,0.03) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Section title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--ct-text-primary)] mb-3">
            <span
              style={{
                background: "linear-gradient(135deg, #F6A51B, #FFD700, #F6A51B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {/* Thai: ฐานข้อมูลอุตสาหกรรม */}
              Industry Database
            </span>
          </h2>
          <p className="text-[var(--ct-text-muted)] text-base md:text-lg max-w-2xl mx-auto font-thai">
            ศูนย์รวมข้อมูลอุตสาหกรรมคอนเทนต์ไทยที่ครบถ้วนที่สุด
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {stats.map((stat, i) => (
            <StatCard key={stat.labelEn} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
