"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/shared/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { CinematicParticles } from "./CinematicParticles";

const heroSlides = [
  {
    id: "main",
    poster: "/posters/uncle-boonmee.jpg",
    titleTh: "CONTENT THAILAND",
    subtitleTh: "รวมทุกเรื่องราวของภาพยนตร์ไทย",
    subtitleEn: "The Heart of Thai Cinema",
    descTh: "ฐานข้อมูลภาพยนตร์และวีดิทัศน์แห่งชาติ",
    descEn: "National Film & Video Database",
    accentColor: "#C9A84C",
    type: "brand" as const,
  },
  {
    id: "hlm",
    poster: "/posters/how-to-make-millions.jpg",
    filmSlug: "how-to-make-millions-2024",
    titleTh: "หลานม่า",
    titleEn: "How to Make Millions Before Grandma Dies",
    year: 2024,
    tagTh: "ปรากฏการณ์ภาพยนตร์ไทยแห่งปี ทำรายได้ทะลุ 2,000 ล้านบาท",
    tagEn: "The Thai film phenomenon of the year — over 2 billion baht worldwide",
    accentColor: "#F6A51B",
    type: "film" as const,
  },
  {
    id: "bg",
    poster: "/posters/bad-genius.jpg",
    filmSlug: "bad-genius-2017",
    titleTh: "ฉลาดเกมส์โกง",
    titleEn: "Bad Genius",
    year: 2017,
    tagTh: "ภาพยนตร์ไทยที่พิชิตใจผู้ชมทั่วโลก รีเมคใน 5 ประเทศ",
    tagEn: "The Thai film that conquered global audiences — remade in 5 countries",
    accentColor: "#EC1C72",
    type: "film" as const,
  },
  {
    id: "pm",
    poster: "/posters/pee-mak.jpg",
    filmSlug: "pee-mak-2013",
    titleTh: "พี่มาก..พระโขนง",
    titleEn: "Pee Mak",
    year: 2013,
    tagTh: "สถิติรายได้สูงสุดตลอดกาลของภาพยนตร์ไทย",
    tagEn: "Thailand's all-time highest-grossing film",
    accentColor: "#702874",
    type: "film" as const,
  },
  {
    id: "ob",
    poster: "/posters/ong-bak.jpg",
    filmSlug: "ong-bak-2003",
    titleTh: "องค์บาก",
    titleEn: "Ong-Bak",
    year: 2003,
    tagTh: "ตำนานศิลปะการต่อสู้ไทยที่โลกต้องจดจำ",
    tagEn: "The legendary Thai martial arts film that shook the world",
    accentColor: "#F76532",
    type: "film" as const,
  },
];

// Interactive letter that glows when mouse is near
function InteractiveLetter({
  char,
  index,
  delay,
  stagger,
  mouseX,
  mouseY,
  containerRef,
  color = "white",
  glowColor = "#C9A84C",
}: {
  char: string;
  index: number;
  delay: number;
  stagger: number;
  mouseX: { get: () => number };
  mouseY: { get: () => number };
  containerRef: React.RefObject<HTMLElement | null>;
  color?: string;
  glowColor?: string;
}) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const [proximity, setProximity] = useState(0);

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (!letterRef.current || !containerRef.current) {
        raf = requestAnimationFrame(update);
        return;
      }
      const rect = letterRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - containerRect.left;
      const cy = rect.top + rect.height / 2 - containerRect.top;
      const mx = mouseX.get();
      const my = mouseY.get();
      const dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
      const maxDist = 150;
      const p = Math.max(0, 1 - dist / maxDist);
      setProximity(p);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mouseX, mouseY, containerRef]);

  const glowIntensity = proximity;
  const yOffset = -proximity * 6;
  const scale = 1 + proximity * 0.08;

  return (
    <motion.span
      ref={letterRef}
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: delay + index * stagger,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="inline-block cursor-default"
      style={{
        color,
        transform: `translateY(${yOffset}px) scale(${scale})`,
        textShadow: glowIntensity > 0.05
          ? `0 0 ${20 + glowIntensity * 40}px ${glowColor}${Math.round(glowIntensity * 180).toString(16).padStart(2, "0")}, 0 0 ${60 + glowIntensity * 80}px ${glowColor}${Math.round(glowIntensity * 100).toString(16).padStart(2, "0")}, 0 ${glowIntensity * 4}px ${glowIntensity * 20}px rgba(0,0,0,0.3)`
          : "none",
        transition: "transform 0.15s ease-out, text-shadow 0.15s ease-out",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

// Magnetic wrapper - element subtly pulls toward cursor
function MagneticWrap({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </div>
  );
}

// Animated progress bar per slide
function SlideProgress({ isActive, duration }: { isActive: boolean; duration: number }) {
  return (
    <div className="relative h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
      {isActive && (
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}

const SLIDE_DURATION = 7000;

export function HeroBanner() {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const heroRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  // 3D tilt values
  const rotateX = useSpring(0, { stiffness: 60, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 60, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Cinematic spotlight gradient
  const spotlightBackground = useMotionTemplate`radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)`;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const goToSlide = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
      resetTimer();
    },
    [current, resetTimer]
  );
  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % heroSlides.length);
    resetTimer();
  }, [resetTimer]);
  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    resetTimer();
  }, [resetTimer]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);

      // 3D tilt: map mouse position to rotation (-3deg to 3deg)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = -((y - centerY) / centerY) * 2.5;
      const tiltY = ((x - centerX) / centerX) * 2.5;
      rotateX.set(tiltX);
      rotateY.set(tiltY);
    },
    [mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const slide = heroSlides[current];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden"
      style={{ backgroundColor: "#0D1B2A", perspective: "1200px" }}
    >
      {/* 3D Tilt Container */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* LAYER 1: Full-bleed poster background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`poster-${slide.id}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 lg:left-[30%]">
              <Image
                src={slide.poster}
                alt=""
                fill
                className="object-cover object-top"
                sizes="100vw"
                quality={90}
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/95 via-[35%] to-transparent lg:via-[#0D1B2A]/85 lg:via-[45%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 via-[15%] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/60 via-transparent via-[20%] to-transparent" />
            <div className="absolute inset-0 bg-black/30 lg:bg-transparent" />
            <div
              className="absolute inset-0 opacity-20 mix-blend-color"
              style={{ backgroundColor: slide.accentColor }}
            />
          </motion.div>
        </AnimatePresence>

        {/* LAYER 2: Ambient aurora glow */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%]"
            style={{ background: `radial-gradient(ellipse at center, ${slide.accentColor}18, transparent 60%)`, filter: "blur(80px)" }}
          />
          <motion.div
            animate={{ x: [0, -40, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.15, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-[20%] -right-[10%] w-[60%] h-[60%]"
            style={{ background: "radial-gradient(ellipse at center, rgba(112,40,116,0.12), transparent 60%)", filter: "blur(80px)" }}
          />
        </div>

        {/* LAYER 3: Cinematic spotlight — bright, visible */}
        <motion.div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: spotlightBackground }}
        />

        {/* LAYER 4: Particles */}
        <div className="absolute inset-0 z-[3]">
          <CinematicParticles />
        </div>

        {/* LAYER 5: Film grain + grid */}
        <div className="absolute inset-0 film-grain z-[4]" />
        <div
          className="absolute inset-0 z-[4] opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* LAYER 6: Main Content (outside 3D tilt to prevent text distortion) */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-20"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            {slide.type === "brand" ? (
              <>
                {/* Badge */}
                <MagneticWrap strength={0.15} className="inline-block mb-6 lg:mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.1] rounded-full hover:bg-white/[0.1] hover:border-[#C9A84C]/30 transition-all duration-300">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9A84C]" />
                      </span>
                      <span className="text-white/60 text-xs font-mono tracking-[0.15em] uppercase">
                        {lang === "th" ? slide.descTh : slide.descEn}
                      </span>
                    </span>
                  </motion.div>
                </MagneticWrap>

                {/* Title: CONTENT THAILAND — interactive glow letters */}
                <h1
                  className="font-display font-bold tracking-tight leading-[0.9] mb-5 lg:mb-6 whitespace-nowrap"
                  style={{ fontSize: "clamp(1.6rem, 4.5vw, 5rem)" }}
                >
                  {"CONTENT THAILAND".split("").map((char, i) => (
                    <InteractiveLetter
                      key={`ct-${i}`}
                      char={char}
                      index={i}
                      delay={0.3}
                      stagger={0.04}
                      mouseX={mouseX}
                      mouseY={mouseY}
                      containerRef={heroRef}
                      color={i < 7 ? "white" : "#C9A84C"}
                      glowColor={i < 7 ? "#ffffff" : "#C9A84C"}
                    />
                  ))}
                </h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  className="h-[3px] w-48 lg:w-56 mb-6 lg:mb-8 origin-left"
                  style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B, transparent)" }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="font-thai text-lg md:text-xl lg:text-2xl text-white/80 mb-2 max-w-xl"
                >
                  {lang === "th" ? slide.subtitleTh : slide.subtitleEn}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.4 }}
                  className="font-body text-sm lg:text-base text-white/40 mb-8 lg:mb-10"
                >
                  {lang === "th" ? "ฐานข้อมูลภาพยนตร์ไทยที่สมบูรณ์ที่สุด" : "Official Thai Film & Television Database"}
                </motion.p>

                {/* Stats with magnetic hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="flex flex-wrap gap-3 lg:gap-4 mb-8 lg:mb-10"
                >
                  {[
                    { n: "562+", l: lang === "th" ? "ภาพยนตร์" : "Films" },
                    { n: "737+", l: lang === "th" ? "ละคร" : "Series" },
                    { n: "5,888+", l: lang === "th" ? "บุคลากร" : "People" },
                    { n: "681+", l: lang === "th" ? "บริษัท" : "Companies" },
                  ].map((s, i) => (
                    <MagneticWrap key={s.l} strength={0.25}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.7 + i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-2.5 px-4 py-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-full hover:bg-white/[0.1] hover:border-[#C9A84C]/30 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        <span className="text-white font-display text-base lg:text-lg font-bold">{s.n}</span>
                        <span className="text-white/50 text-xs font-thai">{s.l}</span>
                      </motion.div>
                    </MagneticWrap>
                  ))}
                </motion.div>

                {/* Search */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="max-w-2xl"
                >
                  <SearchBar variant="hero" />
                </motion.div>
              </>
            ) : (
              <>
                {/* Film badge */}
                <MagneticWrap strength={0.15} className="inline-block mb-6 lg:mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-mono tracking-[0.15em] uppercase hover:scale-105 transition-all duration-300"
                      style={{ backgroundColor: `${slide.accentColor}15`, borderColor: `${slide.accentColor}40`, color: slide.accentColor }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === "th" ? "ภาพยนตร์เด่น" : "Featured Film"} &mdash; {slide.year}
                    </span>
                  </motion.div>
                </MagneticWrap>

                {/* Film title */}
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="font-thai font-bold text-white leading-[1] mb-3 hero-text-glow"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
                >
                  {slide.titleTh}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="font-display text-xl md:text-2xl lg:text-3xl text-white/50 mb-5 lg:mb-6 tracking-wide"
                >
                  {slide.titleEn}
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                  className="h-[3px] w-32 lg:w-40 mb-6 lg:mb-8 origin-left"
                  style={{ background: `linear-gradient(90deg, ${slide.accentColor}, transparent)` }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="font-thai text-base md:text-lg lg:text-xl text-white/70 mb-8 lg:mb-10 max-w-xl leading-relaxed"
                >
                  {lang === "th" ? slide.tagTh : slide.tagEn}
                </motion.p>

                {/* CTA with magnetic hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <MagneticWrap strength={0.2}>
                    <Link
                      href={`/films/${slide.filmSlug}`}
                      className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-thai font-semibold text-base text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}CC)`,
                        boxShadow: `0 0 30px ${slide.accentColor}40`,
                      }}
                    >
                      <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                      {lang === "th" ? "ดูรายละเอียด" : "View Details"}
                    </Link>
                  </MagneticWrap>
                  <MagneticWrap strength={0.2}>
                    <Link
                      href="/films"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-thai font-semibold text-base text-white/70 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.12] hover:text-white hover:border-white/[0.25] transition-all duration-300"
                    >
                      {lang === "th" ? "ดูภาพยนตร์ทั้งหมด" : "Browse All Films"}
                    </Link>
                  </MagneticWrap>
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Right-side poster highlight glow (desktop only) */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[50%] z-[5] pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(ellipse at 70% 50%, ${slide.accentColor}40, transparent 70%)`,
          }}
        />
      </div>

      {/* Left/Right Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-20 pointer-events-none flex items-center justify-between px-3 lg:px-6">
        <MagneticWrap strength={0.4}>
          <button
            onClick={goPrev}
            className="pointer-events-auto w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-black/50 hover:border-white/[0.2] hover:scale-110 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </MagneticWrap>
        <MagneticWrap strength={0.4}>
          <button
            onClick={goNext}
            className="pointer-events-auto w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-black/50 hover:border-white/[0.2] hover:scale-110 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </MagneticWrap>
      </div>

      {/* Slide Indicators + Progress Bars */}
      <div className="absolute bottom-12 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i)}
            className="group flex flex-col items-center gap-1.5"
            aria-label={`Slide ${i + 1}`}
          >
            <div className="w-10 sm:w-14">
              <SlideProgress isActive={i === current} duration={SLIDE_DURATION} />
            </div>
            <span className={`text-[9px] font-mono tracking-wider transition-all duration-300 ${i === current ? "text-white/60" : "text-white/20 group-hover:text-white/40"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom fade + gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/60 to-transparent z-[8]" />
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
        style={{ background: "linear-gradient(90deg, transparent 0%, #C9A84C 20%, #E8D48B 50%, #C9A84C 80%, transparent 100%)" }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
