"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  Clapperboard,
  Sparkles,
  Globe,
  BookOpen,
  Heart,
  ChevronRight,
  Play,
  Film,
  Tv,
  Users,
  Building2,
  Zap,
  Eye,
  Target,
  Database,
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

// ─── Mouse Position Hook ───
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

// ─── Animated Counter (fast easing) ───
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── 3D Tilt Card ───
function TiltCard({
  children,
  className = "",
  glowColor = "#EC1C72",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const background = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}22, transparent 60%)`;

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rotateX.set((y - 0.5) * -15);
      rotateY.set((x - 0.5) * 15);
      glowX.set(x * 100);
      glowY.set(y * 100);
    },
    [rotateX, rotateY, glowX, glowY]
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, glowX, glowY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 800,
        background,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Reveal Section (compact, spring-powered) ───
function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ───
const timeline = [
  {
    year: 2556,
    title: "ก่อตั้งกองภาพยนตร์และวีดิทัศน์",
    desc: "กรมส่งเสริมวัฒนธรรมจัดตั้งกองภาพยนตร์และวีดิทัศน์เพื่อดูแลส่งเสริมอุตสาหกรรมภาพยนตร์ไทย",
    color: "#702874",
    icon: Clapperboard,
  },
  {
    year: 2561,
    title: "เริ่มโครงการฐานข้อมูลกลาง",
    desc: "ริเริ่มโครงการพัฒนาฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ",
    color: "#EC1C72",
    icon: Database,
  },
  {
    year: 2566,
    title: "ContentThailand v1.0",
    desc: "เปิดใช้งานระบบ ContentThailand เวอร์ชัน 1.0 สำหรับสาธารณะ",
    color: "#F76532",
    icon: Globe,
  },
  {
    year: 2568,
    title: "ปรับปรุงระบบครั้งใหญ่",
    desc: "พัฒนาระบบใหม่ด้วยเทคโนโลยีทันสมัย รองรับการใช้งานที่เพิ่มขึ้น พร้อมมาตรการส่งเสริมการลงทุน",
    color: "#F6A51B",
    icon: Zap,
  },
];

export default function AboutPage() {
  const { lang } = useLanguage();
  const mouse = useMousePosition();
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse spotlight position (relative to hero)
  const [heroRect, setHeroRect] = useState({ top: 0, left: 0 });
  useEffect(() => {
    const update = () => {
      if (heroRef.current) {
        const r = heroRef.current.getBoundingClientRect();
        setHeroRect({ top: r.top, left: r.left });
      }
    };
    update();
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  const spotlightX = mouse.x - heroRect.left;
  const spotlightY = mouse.y - heroRect.top;

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "เกี่ยวกับเรา" : "About" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--ct-bg-page)] overflow-hidden">
      {/* ═══ HERO — Full-screen with mouse spotlight ═══ */}
      <section
        ref={heroRef}
        className="relative h-[100vh] min-h-[500px] max-h-[900px] flex items-center justify-center overflow-hidden"
      >
        {/* Parallax BG */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-[-10%]">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0926] via-[#1a0a2e] to-[#0d0b2e]" />

          {/* Large cinematic gradient shapes */}
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#702874]/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#EC1C72]/20 rounded-full blur-[120px]" />
          <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-[#F76532]/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-[#F6A51B]/12 rounded-full blur-[80px]" />

          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }} />
        </motion.div>

        {/* Mouse spotlight — follows cursor */}
        <div
          className="pointer-events-none absolute z-[2] transition-opacity duration-300"
          style={{
            left: spotlightX - 200,
            top: spotlightY - 200,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(247,101,50,0.12) 0%, rgba(236,28,114,0.06) 40%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(30px)",
          }}
        />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-3"><Breadcrumb items={breadcrumbs} /></div>

          {/* Animated flame logo — BIGGER */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="mx-auto mb-4 w-28 h-28 md:w-36 md:h-36 relative"
          >
            {/* Pulsing glow behind logo */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-30%] bg-gradient-to-br from-[#702874] via-[#EC1C72] to-[#F6A51B] rounded-full blur-[40px]"
            />
            <div className="relative w-full h-full flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/content-thailand-icon.svg"
                alt=""
                className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_30px_rgba(236,28,114,0.5)]"
              />
            </div>
          </motion.div>

          {/* Title — big and bold */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 80 }}
            className="font-thai font-bold text-5xl md:text-7xl lg:text-8xl mb-3 leading-[1.1]"
          >
            <span className="bg-gradient-to-r from-[#EC1C72] via-[#F76532] to-[#F6A51B] bg-clip-text text-transparent">
              Content
            </span>
            <span className="text-[var(--ct-text-primary)]">Thailand</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-base md:text-lg text-[var(--ct-text-secondary)] font-body max-w-xl mx-auto leading-relaxed mb-6"
          >
            {lang === "th"
              ? "ฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ"
              : "Thailand's National Film & Video Database"}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link
              href="/films"
              className="group flex items-center gap-2 bg-gradient-to-r from-[#EC1C72] to-[#F76532] text-white px-7 py-3.5 rounded-full font-thai font-bold text-base hover:shadow-[0_0_40px_rgba(236,28,114,0.4)] transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5" />
              {lang === "th" ? "สำรวจฐานข้อมูล" : "Explore Database"}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="mt-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 rounded-full bg-[#F6A51B]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ STATS — Compact, punchy ═══ */}
      <section className="relative -mt-12 z-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {[
              { value: 562, suffix: "+", label: lang === "th" ? "ภาพยนตร์" : "Films", icon: Film, color: "#EC1C72" },
              { value: 737, suffix: "+", label: lang === "th" ? "ละคร" : "Series", icon: Tv, color: "#702874" },
              { value: 5888, suffix: "+", label: lang === "th" ? "บุคลากร" : "Personnel", icon: Users, color: "#F76532" },
              { value: 681, suffix: "+", label: lang === "th" ? "บริษัท" : "Companies", icon: Building2, color: "#F6A51B" },
            ].map((s, i) => (
              <TiltCard key={s.label} glowColor={s.color} className="rounded-xl border border-white/[0.06] backdrop-blur-md bg-[var(--ct-bg-elevated)]/80 p-3 md:p-5 text-center cursor-default">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
                >
                  <s.icon className="w-5 h-5 md:w-7 md:h-7 mx-auto mb-1.5" style={{ color: s.color }} />
                  <p className="font-display text-2xl md:text-4xl font-bold leading-none" style={{ color: s.color }}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[var(--ct-text-muted)] text-[10px] md:text-xs font-thai mt-1">{s.label}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT — Full-bleed visual + text ═══ */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            {/* Visual — LARGE 3-column span */}
            <RevealSection className="lg:col-span-3 relative">
              <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden group cursor-default">
                {/* Stacked gradient layers — cinema feel */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#702874] via-[#3a1550] to-[#1a0a2e]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#EC1C72]/30 via-transparent to-[#F76532]/20" />

                {/* Animated floating icons */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[15%] left-[12%]"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#EC1C72]/20 backdrop-blur-sm border border-[#EC1C72]/30 flex items-center justify-center">
                    <Film className="w-8 h-8 md:w-12 md:h-12 text-[#EC1C72]" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, -3, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-[10%] right-[15%]"
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-[#F76532]/20 backdrop-blur-sm border border-[#F76532]/30 flex items-center justify-center">
                    <Tv className="w-7 h-7 md:w-10 md:h-10 text-[#F76532]" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [-8, 12, -8], rotate: [0, 4, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute bottom-[15%] left-[25%]"
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-[#F6A51B]/20 backdrop-blur-sm border border-[#F6A51B]/30 flex items-center justify-center">
                    <Users className="w-7 h-7 md:w-10 md:h-10 text-[#F6A51B]" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -15, 5], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-[20%] right-[10%]"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#702874]/30 backdrop-blur-sm border border-[#702874]/30 flex items-center justify-center">
                    <Building2 className="w-8 h-8 md:w-12 md:h-12 text-[#702874]" />
                  </div>
                </motion.div>

                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/content-thailand-icon.svg"
                      alt=""
                      className="w-20 h-20 md:w-32 md:h-32 drop-shadow-[0_0_60px_rgba(236,28,114,0.4)]"
                    />
                  </motion.div>
                </div>

                {/* Connecting lines (subtle) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="#EC1C72" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="#F76532" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="35%" y2="75%" stroke="#F6A51B" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#702874" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                {/* Mouse hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#EC1C72]/10 to-transparent" />
              </div>
            </RevealSection>

            {/* Text — compact 2-column span */}
            <RevealSection delay={0.15} className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-[#EC1C72]/10 text-[#EC1C72] px-3 py-1 rounded-full text-xs font-thai font-semibold mb-4">
                <Clapperboard className="w-3.5 h-3.5" />
                {lang === "th" ? "เกี่ยวกับเรา" : "About Us"}
              </div>
              <h2 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] mb-4 leading-tight">
                {lang === "th" ? (
                  <>ฐานข้อมูลภาพยนตร์<br /><span className="bg-gradient-to-r from-[#F76532] to-[#F6A51B] bg-clip-text text-transparent">แห่งชาติของไทย</span></>
                ) : (
                  <>Thailand&apos;s National<br /><span className="bg-gradient-to-r from-[#F76532] to-[#F6A51B] bg-clip-text text-transparent">Film Database</span></>
                )}
              </h2>
              <p className="text-[var(--ct-text-secondary)] font-body leading-relaxed text-sm mb-4">
                {lang === "th"
                  ? "ContentThailand เป็นระบบฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ พัฒนาโดยกองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม กระทรวงวัฒนธรรม เพื่อรวบรวม จัดเก็บ และเผยแพร่ข้อมูลอย่างเป็นระบบ"
                  : "ContentThailand is the national film and video database developed by the Film and Video Division, Department of Cultural Promotion, Ministry of Culture."}
              </p>
              <p className="text-[var(--ct-text-muted)] font-body leading-relaxed text-xs">
                {lang === "th"
                  ? "ครอบคลุมทั้งภาพยนตร์ ละครโทรทัศน์ บุคลากรในวงการ และบริษัทผู้ผลิต เพื่อเป็นแหล่งข้อมูลที่น่าเชื่อถือสำหรับนักวิจัย นักศึกษา ผู้ผลิต และผู้สนใจทั่วไป"
                  : "Covering films, TV series, industry personnel, and production companies — a trusted resource for researchers, students, producers, and the general public."}
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══ VISION & MISSION — Side by side tilt cards ═══ */}
      <section className="relative py-14">
        <div className="absolute inset-0 bg-gradient-to-r from-[#702874]/8 via-transparent to-[#F76532]/8" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <RevealSection>
            <div className="text-center mb-10">
              <h2 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
                {lang === "th" ? "วิสัยทัศน์และพันธกิจ" : "Vision & Mission"}
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RevealSection delay={0.05}>
              <TiltCard
                glowColor="#702874"
                className="rounded-2xl border border-[#702874]/20 bg-[var(--ct-bg-elevated)] p-6 h-full cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#702874] to-[#EC1C72] flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(112,40,116,0.3)]">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-thai font-bold text-lg text-[var(--ct-text-primary)] mb-3">
                  {lang === "th" ? "วิสัยทัศน์" : "Vision"}
                </h3>
                <p className="text-[var(--ct-text-secondary)] font-body leading-relaxed text-sm">
                  {lang === "th"
                    ? "เป็นศูนย์กลางข้อมูลภาพยนตร์และวีดิทัศน์ที่ครบถ้วน น่าเชื่อถือ และเข้าถึงได้ง่ายที่สุดในประเทศไทย เพื่อส่งเสริมอุตสาหกรรมบันเทิงไทยสู่ระดับสากล"
                    : "To be the most comprehensive, trusted, and accessible film and video data center in Thailand, promoting the Thai entertainment industry internationally."}
                </p>
              </TiltCard>
            </RevealSection>

            <RevealSection delay={0.1}>
              <TiltCard
                glowColor="#F76532"
                className="rounded-2xl border border-[#F76532]/20 bg-[var(--ct-bg-elevated)] p-6 h-full cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F76532] to-[#F6A51B] flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(247,101,50,0.3)]">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-thai font-bold text-lg text-[var(--ct-text-primary)] mb-3">
                  {lang === "th" ? "พันธกิจ" : "Mission"}
                </h3>
                <ul className="text-[var(--ct-text-secondary)] font-body leading-relaxed text-sm space-y-2">
                  {(lang === "th"
                    ? [
                        "รวบรวมและจัดเก็บข้อมูลภาพยนตร์และวีดิทัศน์อย่างเป็นระบบ",
                        "เผยแพร่ข้อมูลสู่สาธารณะเพื่อการศึกษาและวิจัย",
                        "สนับสนุนการพัฒนาอุตสาหกรรมภาพยนตร์ไทย",
                        "ส่งเสริมมาตรการจูงใจถ่ายทำในประเทศไทย",
                      ]
                    : [
                        "Systematically collect and store film and video data",
                        "Publish data for education and research",
                        "Support Thai film industry development",
                        "Promote film production incentives in Thailand",
                      ]
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#F76532] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══ VALUES — 4 compact cards with big icons ═══ */}
      <section className="relative py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <h2 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] text-center mb-8">
              {lang === "th" ? "คุณค่าที่เรายึดมั่น" : "Our Values"}
            </h2>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Sparkles, title: lang === "th" ? "ส่งเสริมศิลปวัฒนธรรม" : "Arts & Culture", color: "#702874", gradient: "from-[#702874] to-[#EC1C72]" },
              { icon: Globe, title: lang === "th" ? "เชื่อมโยงสู่สากล" : "Global Connection", color: "#EC1C72", gradient: "from-[#EC1C72] to-[#F76532]" },
              { icon: BookOpen, title: lang === "th" ? "องค์ความรู้ที่เข้าถึงได้" : "Accessible Knowledge", color: "#F76532", gradient: "from-[#F76532] to-[#F6A51B]" },
              { icon: Heart, title: lang === "th" ? "รักษามรดกวัฒนธรรม" : "Cultural Heritage", color: "#F6A51B", gradient: "from-[#F6A51B] to-[#702874]" },
            ].map((v, i) => (
              <RevealSection key={i} delay={i * 0.06}>
                <TiltCard glowColor={v.color} className="rounded-xl border border-white/[0.06] bg-[var(--ct-bg-elevated)] p-4 md:p-5 text-center cursor-default h-full">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <v.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="font-thai font-semibold text-xs md:text-sm text-[var(--ct-text-primary)] leading-snug">
                    {v.title}
                  </h3>
                </TiltCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE — Horizontal on desktop, vertical on mobile ═══ */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#702874]/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <RevealSection>
            <h2 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] text-center mb-10">
              {lang === "th" ? "เส้นทางของเรา" : "Our Journey"}
            </h2>
          </RevealSection>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block">
            {/* Line */}
            <div className="relative h-1 bg-gradient-to-r from-[#702874] via-[#EC1C72] via-[#F76532] to-[#F6A51B] rounded-full mb-8">
              {timeline.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${(i / (timeline.length - 1)) * 100}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className="w-5 h-5 rounded-full border-[3px] border-[var(--ct-bg-page)]" style={{ backgroundColor: timeline[i].color }} />
                </motion.div>
              ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-3">
              {timeline.map((t, i) => (
                <RevealSection key={t.year} delay={i * 0.1}>
                  <TiltCard glowColor={t.color} className="rounded-xl overflow-hidden cursor-default">
                    <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${t.color}20, ${t.color}08)`, border: `1px solid ${t.color}30` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: t.color }}>
                          <t.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-mono text-sm font-bold" style={{ color: t.color }}>{t.year}</span>
                      </div>
                      <h3 className="font-thai font-bold text-sm text-[var(--ct-text-primary)] mb-1">{t.title}</h3>
                      <p className="text-[var(--ct-text-muted)] font-body text-xs leading-relaxed">{t.desc}</p>
                    </div>
                  </TiltCard>
                </RevealSection>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#702874] via-[#EC1C72] via-[#F76532] to-[#F6A51B]" />
            {timeline.map((t, i) => (
              <RevealSection key={t.year} delay={i * 0.1}>
                <div className="relative flex gap-4 mb-6 pl-5">
                  <div className="absolute left-5 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: t.color }}
                    >
                      <t.icon className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  <div className="ml-8 flex-1 p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${t.color}18, transparent)`, border: `1px solid ${t.color}25` }}>
                    <span className="font-mono text-xs font-bold" style={{ color: t.color }}>{t.year}</span>
                    <h3 className="font-thai font-bold text-sm text-[var(--ct-text-primary)] mt-0.5">{t.title}</h3>
                    <p className="text-[var(--ct-text-muted)] font-body text-xs mt-1">{t.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ORGANIZATIONS — Full-width gradient cards ═══ */}
      <section className="relative py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <h2 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] text-center mb-8">
              {lang === "th" ? "หน่วยงานเบื้องหลัง" : "Behind ContentThailand"}
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: lang === "th" ? "กระทรวงวัฒนธรรม" : "Ministry of Culture", desc: lang === "th" ? "กำหนดนโยบายด้านวัฒนธรรม" : "Cultural policy.", color: "#702874", icon: "/logos/ministry-emblem.svg" },
              { name: lang === "th" ? "กรมส่งเสริมวัฒนธรรม" : "Dept. of Cultural Promotion", desc: lang === "th" ? "ส่งเสริมและพัฒนาวัฒนธรรม" : "Promote culture.", color: "#EC1C72", icon: "/logos/ministry-emblem.svg" },
              { name: lang === "th" ? "กองภาพยนตร์และวีดิทัศน์" : "Film & Video Division", desc: lang === "th" ? "พัฒนาและดูแล ContentThailand" : "Developer of ContentThailand.", color: "#F76532", icon: "/logos/content-thailand-icon.svg" },
            ].map((org, i) => (
              <RevealSection key={i} delay={i * 0.08}>
                <TiltCard glowColor={org.color} className="rounded-xl overflow-hidden cursor-default h-full">
                  <div className="relative p-5 rounded-xl h-full" style={{ background: `linear-gradient(135deg, ${org.color}, ${org.color}90)` }}>
                    <div className="w-14 h-14 mb-3 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={org.icon} alt="" className="w-9 h-9" />
                    </div>
                    <h3 className="font-thai font-bold text-base text-white mb-1">{org.name}</h3>
                    <p className="text-white/75 font-body text-xs">{org.desc}</p>
                  </div>
                </TiltCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA — Compact, powerful ═══ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#702874]/30 via-[#EC1C72]/15 to-[#F76532]/30" />
          <motion.div
            animate={{ x: ["-10%", "10%", "-10%"], y: ["-5%", "5%", "-5%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[50%] h-[50%] bg-[#EC1C72]/10 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ x: ["10%", "-10%", "10%"], y: ["5%", "-5%", "5%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[#F6A51B]/10 rounded-full blur-[100px]"
          />
        </div>

        <RevealSection>
          <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-thai font-bold text-2xl md:text-4xl text-[var(--ct-text-primary)] mb-4">
              {lang === "th" ? "พร้อมสำรวจโลกภาพยนตร์ไทย?" : "Ready to Explore Thai Cinema?"}
            </h2>
            <p className="text-[var(--ct-text-secondary)] font-body text-sm mb-8 max-w-lg mx-auto">
              {lang === "th"
                ? "ค้นหาข้อมูลภาพยนตร์ ละคร บุคลากร และบริษัทในอุตสาหกรรมบันเทิงไทยได้ทันที"
                : "Search for films, series, personnel, and companies in the Thai entertainment industry."}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/films" className="group flex items-center gap-2 bg-gradient-to-r from-[#EC1C72] to-[#F76532] text-white px-7 py-3.5 rounded-full font-thai font-bold hover:shadow-[0_0_40px_rgba(236,28,114,0.4)] transition-all duration-300 hover:scale-105">
                <Film className="w-5 h-5" />
                {lang === "th" ? "ดูภาพยนตร์" : "Films"}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link href="/series" className="group flex items-center gap-2 bg-gradient-to-r from-[#702874] to-[#EC1C72] text-white px-7 py-3.5 rounded-full font-thai font-bold hover:shadow-[0_0_40px_rgba(112,40,116,0.4)] transition-all duration-300 hover:scale-105">
                <Tv className="w-5 h-5" />
                {lang === "th" ? "ดูละคร" : "Series"}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link href="/persons" className="group flex items-center gap-2 bg-gradient-to-r from-[#F76532] to-[#F6A51B] text-white px-7 py-3.5 rounded-full font-thai font-bold hover:shadow-[0_0_40px_rgba(247,101,50,0.4)] transition-all duration-300 hover:scale-105">
                <Users className="w-5 h-5" />
                {lang === "th" ? "บุคลากร" : "People"}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      <div className="h-6" />
    </div>
  );
}
