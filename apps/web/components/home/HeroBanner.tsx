"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Play, Clapperboard } from "lucide-react";
import { SearchBar } from "@/components/shared/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";

const featuredFilms = [
  {
    slug: "bad-genius-2017",
    titleTh: "ฉลาดเกมส์โกง",
    titleEn: "Bad Genius",
    year: 2017,
    poster: "/posters/bad-genius.jpg",
    tagTh: "ภาพยนตร์ไทยที่โด่งดังไกลระดับโลก",
    tagEn: "Thailand's globally acclaimed thriller",
  },
  {
    slug: "how-to-make-millions-2024",
    titleTh: "หลานม่า",
    titleEn: "How to Make Millions Before Grandma Dies",
    year: 2024,
    poster: "/posters/how-to-make-millions.jpg",
    tagTh: "ปรากฏการณ์ภาพยนตร์ไทยแห่งปี",
    tagEn: "The Thai film phenomenon of the year",
  },
  {
    slug: "pee-mak-2013",
    titleTh: "พี่มาก..พระโขนง",
    titleEn: "Pee Mak",
    year: 2013,
    poster: "/posters/pee-mak.jpg",
    tagTh: "ภาพยนตร์ไทยทำรายได้สูงสุดตลอดกาล",
    tagEn: "Thailand's highest-grossing film of all time",
  },
  {
    slug: "ong-bak-2003",
    titleTh: "องค์บาก",
    titleEn: "Ong-Bak",
    year: 2003,
    poster: "/posters/ong-bak.jpg",
    tagTh: "ตำนานศิลปะการต่อสู้ไทยที่โลกต้องจดจำ",
    tagEn: "The legendary Thai martial arts film",
  },
];

const bgPosters = [
  "/posters/bad-genius.jpg",
  "/posters/how-to-make-millions.jpg",
  "/posters/pee-mak.jpg",
  "/posters/ong-bak.jpg",
  "/posters/uncle-boonmee.jpg",
  "/posters/uranus2324.jpg",
  "/posters/halabala.jpg",
  "/posters/home-sweet-home.jpg",
  "/posters/red-envelope.jpg",
  "/posters/sokaphiwat.jpg",
  "/posters/my-boo.jpg",
  "/posters/chinatown-chacha.jpg",
];

// Word-by-word reveal component for cinematic title
function WordReveal({ words, className, delay = 0 }: { words: string[]; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 40, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.12,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          style={{ perspective: "600px" }}
        >
          {word}
          {i < words.length - 1 && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </span>
  );
}

// Featured film card with 3D tilt on hover
function FeaturedCard({ film, lang }: { film: typeof featuredFilms[0]; lang: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <Link
        href={`/films/${film.slug}`}
        className="group flex items-center gap-4 bg-[var(--ct-bg-hover)] backdrop-blur-md border border-[var(--ct-border)] rounded-2xl p-4 pr-5 hover:border-[#EC1C72]/30 transition-all duration-300 max-w-md relative overflow-hidden"
      >
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EC1C72]/5 to-[#F76532]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Poster thumbnail */}
        <div className="relative w-16 h-[88px] flex-shrink-0 rounded-xl overflow-hidden ring-1 ring-[var(--ct-border)] group-hover:ring-[#EC1C72]/30 transition-all">
          <Image
            src={film.poster}
            alt={lang === "th" ? film.titleTh : film.titleEn}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="64px"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        </div>

        {/* Film info */}
        <div className="flex-1 min-w-0 relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <Clapperboard className="w-3 h-3 text-[#EC1C72]" />
            <span className="text-[#EC1C72] text-[11px] font-thai font-semibold tracking-wide uppercase">
              {lang === "th" ? "ภาพยนตร์แนะนำ" : "Featured Film"}
            </span>
          </div>
          <h3 className="text-[var(--ct-text-primary)] font-thai font-bold text-base truncate group-hover:text-[#EC1C72] transition-colors">
            {lang === "th" ? film.titleTh : film.titleEn}
          </h3>
          <p className="text-[var(--ct-text-faint)] text-xs font-body mt-1 line-clamp-1">
            {lang === "th" ? film.tagTh : film.tagEn}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-[#F6A51B]/20 text-[#F6A51B] text-[10px] font-bold rounded-md">
              {film.year}
            </span>
            <span className="text-[var(--ct-text-faint)] text-[10px]">|</span>
            <span className="text-[#EC1C72] text-[11px] font-thai font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              {lang === "th" ? "ดูรายละเอียด" : "View Details"} <span className="text-xs">&rarr;</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function HeroBanner() {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredFilms.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const film = featuredFilms[current];

  return (
    <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden" style={{ backgroundColor: "var(--ct-bg-page)" }}>
      {/* LAYER 1: Poster Wall with Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-1 opacity-[0.12]">
          {bgPosters.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 1 }}
              className="relative aspect-[2/3] overflow-hidden"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="200px" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* LAYER 2: Overlays for readability */}
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to right, var(--ct-bg-page), var(--ct-bg-page), color-mix(in srgb, var(--ct-bg-page), transparent 30%))" }} />
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to top, var(--ct-bg-page), transparent, color-mix(in srgb, var(--ct-bg-page), transparent 20%))" }} />
      <div className="absolute inset-0 z-[1]" style={{ background: "var(--ct-bg-page)", opacity: 0.82 }} />

      {/* LAYER 3: Ambient Glow Effects (breathing animation) */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%]"
          style={{ background: "radial-gradient(ellipse at center, rgba(236,28,114,0.06) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[10%] -right-[10%] w-[50%] h-[50%]"
          style={{ background: "radial-gradient(ellipse at center, rgba(112,40,116,0.05) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[0%] left-[30%] w-[40%] h-[40%]"
          style={{ background: "radial-gradient(ellipse at center, rgba(247,101,50,0.04) 0%, transparent 70%)" }}
        />
      </div>

      {/* LAYER 4: Film Grain */}
      <div className="absolute inset-0 film-grain z-[3]" />

      {/* LAYER 5: Featured Backdrop (right side, faded) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.2, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute right-0 top-0 w-1/2 h-full z-[4] hidden md:block"
        >
          <Image src={film.poster} alt="" fill className="object-cover object-top" sizes="50vw" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--ct-bg-page), color-mix(in srgb, var(--ct-bg-page), transparent 20%), transparent)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--ct-bg-page), transparent, color-mix(in srgb, var(--ct-bg-page), transparent 40%))" }} />
          <div className="absolute inset-y-0 left-0 w-32" style={{ background: "linear-gradient(to right, var(--ct-bg-page), transparent)" }} />
        </motion.div>
      </AnimatePresence>

      {/* LAYER 6: Main Content with Parallax */}
      <motion.div style={{ y: contentY }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2 bg-[var(--ct-bg-hover)] backdrop-blur-sm border border-[var(--ct-border)] rounded-full text-sm font-thai text-[var(--ct-text-muted)] hover:border-[#EC1C72]/20 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC1C72] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EC1C72]" />
              </span>
              <span className="text-[var(--ct-text-muted)] text-[11px] font-mono tracking-[0.1em] uppercase">
                {lang === "th" ? "ฐานข้อมูลภาพยนตร์และวีดิทัศน์แห่งชาติ" : "National Film & Video Database"}
              </span>
            </span>
          </motion.div>

          {/* Title - Word by Word Cinematic Reveal */}
          <div className="mb-3">
            <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] text-[var(--ct-text-primary)] font-bold tracking-tight leading-[0.95]">
              <WordReveal words={["CONTENT"]} delay={0.5} />
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #EC1C72, #F76532, #F6A51B)" }}>
                <WordReveal words={["THAILAND"]} delay={0.7} />
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="font-thai text-lg md:text-xl text-[var(--ct-text-muted)] mb-4 max-w-lg"
          >
            {lang === "th" ? "เห็นทุกเรื่องราว ค้นพบทุกแรงบันดาลใจ" : "See Every Story. Discover Every Inspiration."}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="font-body text-sm text-[var(--ct-text-faint)] mb-10"
          >
            {lang === "th" ? "ฐานข้อมูลสื่อเนื้อหาไทยที่ใหญ่ที่สุด" : "Thailand's Largest Content Database"}
          </motion.p>

          {/* Featured Film Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-6"
            >
              <FeaturedCard film={film} lang={lang} />
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex gap-2.5 mb-10"
          >
            {featuredFilms.map((f, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="group relative rounded-full transition-all duration-500 overflow-hidden"
                style={{ width: i === current ? "40px" : "20px", height: "6px" }}
                aria-label={lang === "th" ? f.titleTh : f.titleEn}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  i === current
                    ? "bg-gradient-to-r from-[#EC1C72] to-[#F6A51B]"
                    : "bg-[var(--ct-text-faint)] group-hover:bg-[var(--ct-text-muted)]"
                }`} />
              </button>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="max-w-xl"
          >
            <SearchBar variant="hero" />
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient Line Divider at Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(236,28,114,0.3) 20%, rgba(247,101,50,0.5) 50%, rgba(246,165,27,0.3) 80%, transparent 100%)" }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-[var(--ct-text-faint)] text-[10px] font-mono tracking-[0.2em] uppercase">
          {lang === "th" ? "เลื่อนลง" : "Scroll"}
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-[var(--ct-text-faint)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
