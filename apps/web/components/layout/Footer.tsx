"use client";

import { useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogoGroup } from "./LogoGroup";

// ──────────────────────────────────────────────
// Page-specific theme configuration
// ──────────────────────────────────────────────

interface FooterTheme {
  accent: string;
  accentSecondary: string;
  label: string;
  labelTH: string;
  quote: string;
  quoteTH: string;
  storyTitle: string;
  storyTitleTH: string;
  storyItems: { en: string; th: string }[];
  ctaText: string;
  ctaTextTH: string;
  ctaHref: string;
  visualType: "credits" | "clapperboard" | "scanlines" | "spotlight" | "skyline" | "ticker" | "filmstrip";
}

function getFooterTheme(pathname: string): FooterTheme {
  // Films pages
  if (pathname.startsWith("/films")) {
    return {
      accent: "#EC1C72",
      accentSecondary: "#F76532",
      label: "Films",
      labelTH: "ภาพยนตร์",
      quote: "Every frame tells a thousand stories",
      quoteTH: "ทุกเฟรมเล่าเรื่องพันเรื่อง",
      storyTitle: "Thai Cinema Milestones",
      storyTitleTH: "เหตุการณ์สำคัญของภาพยนตร์ไทย",
      storyItems: [
        { en: "1923 — First Thai film \"Double Luck\" screened", th: "พ.ศ. 2466 — ภาพยนตร์ไทยเรื่องแรก \"โชคสองชั้น\" ฉายรอบปฐมทัศน์" },
        { en: "1970 — Golden Age of Thai cinema begins", th: "พ.ศ. 2513 — ยุคทองของภาพยนตร์ไทยเริ่มต้น" },
        { en: "2010 — Uncle Boonmee wins Palme d'Or at Cannes", th: "พ.ศ. 2553 — ลุงบุญมีระลึกชาติ คว้ารางวัลปาล์มทองคำที่คานส์" },
        { en: "2024 — Thai content reaches global audiences", th: "พ.ศ. 2567 — คอนเทนต์ไทยเข้าถึงผู้ชมทั่วโลก" },
      ],
      ctaText: "Explore Thai Films",
      ctaTextTH: "สำรวจภาพยนตร์ไทย",
      ctaHref: "/films",
      visualType: "clapperboard",
    };
  }

  // Series pages
  if (pathname.startsWith("/series")) {
    return {
      accent: "#F76532",
      accentSecondary: "#F6A51B",
      label: "Series",
      labelTH: "ละครโทรทัศน์",
      quote: "Stories that live in every living room",
      quoteTH: "เรื่องราวที่มีชีวิตในทุกบ้าน",
      storyTitle: "Thai Series by the Numbers",
      storyTitleTH: "ละครไทยในตัวเลข",
      storyItems: [
        { en: "737+ TV series in our database", th: "ละครโทรทัศน์กว่า 737 เรื่องในฐานข้อมูล" },
        { en: "Spanning over 5 decades of broadcasting", th: "ครอบคลุมกว่า 5 ทศวรรษของการออกอากาศ" },
        { en: "From free TV to streaming platforms", th: "จากฟรีทีวีสู่แพลตฟอร์มสตรีมมิง" },
        { en: "Thai series now exported to 15+ countries", th: "ละครไทยส่งออกไปกว่า 15 ประเทศ" },
      ],
      ctaText: "Browse All Series",
      ctaTextTH: "ดูละครทั้งหมด",
      ctaHref: "/series",
      visualType: "scanlines",
    };
  }

  // Persons pages
  if (pathname.startsWith("/persons")) {
    return {
      accent: "#F6A51B",
      accentSecondary: "#EC1C72",
      label: "People",
      labelTH: "บุคลากร",
      quote: "Behind every great scene, there is a great artist",
      quoteTH: "เบื้องหลังทุกฉากที่ยิ่งใหญ่ มีศิลปินที่ยิ่งใหญ่",
      storyTitle: "Honoring Thai Talent",
      storyTitleTH: "ยกย่องบุคลากรไทย",
      storyItems: [
        { en: "5,888+ professionals in the industry", th: "บุคลากรกว่า 5,888 คนในอุตสาหกรรม" },
        { en: "Directors, actors, cinematographers, composers", th: "ผู้กำกับ นักแสดง ตากล้อง นักแต่งเพลง" },
        { en: "From legends to emerging new voices", th: "จากตำนานสู่เสียงใหม่ที่กำลังเติบโต" },
        { en: "Every person tells a unique story", th: "ทุกคนมีเรื่องราวที่ไม่เหมือนใคร" },
      ],
      ctaText: "Discover Thai Talent",
      ctaTextTH: "ค้นพบบุคลากรไทย",
      ctaHref: "/persons",
      visualType: "spotlight",
    };
  }

  // Companies pages
  if (pathname.startsWith("/companies")) {
    return {
      accent: "#702874",
      accentSecondary: "#EC1C72",
      label: "Industry",
      labelTH: "บริษัท",
      quote: "Building the future of Thai entertainment",
      quoteTH: "สร้างอนาคตของวงการบันเทิงไทย",
      storyTitle: "Thai Entertainment Industry",
      storyTitleTH: "อุตสาหกรรมบันเทิงไทย",
      storyItems: [
        { en: "681+ production & distribution companies", th: "บริษัทผลิตและจัดจำหน่ายกว่า 681 แห่ง" },
        { en: "From indie studios to major productions", th: "จากสตูดิโออินดี้สู่โปรดักชันระดับใหญ่" },
        { en: "Supporting Thailand as a filming destination", th: "สนับสนุนประเทศไทยเป็นจุดหมายถ่ายทำ" },
        { en: "Growing 12% year-over-year", th: "เติบโต 12% ต่อปี" },
      ],
      ctaText: "Explore Companies",
      ctaTextTH: "สำรวจบริษัท",
      ctaHref: "/companies",
      visualType: "skyline",
    };
  }

  // News pages
  if (pathname.startsWith("/news")) {
    return {
      accent: "#00B8FF",
      accentSecondary: "#EC1C72",
      label: "News",
      labelTH: "ข่าวสาร",
      quote: "The pulse of Thai content industry",
      quoteTH: "ชีพจรของอุตสาหกรรมคอนเทนต์ไทย",
      storyTitle: "Stay Connected",
      storyTitleTH: "ติดตามข่าวสาร",
      storyItems: [
        { en: "Latest industry news & events", th: "ข่าวสารและกิจกรรมล่าสุดในอุตสาหกรรม" },
        { en: "Festival announcements & awards", th: "ประกาศเทศกาลและรางวัล" },
        { en: "Policy updates & incentive programs", th: "อัปเดตนโยบายและมาตรการส่งเสริม" },
        { en: "International collaborations", th: "ความร่วมมือระหว่างประเทศ" },
      ],
      ctaText: "Read Latest News",
      ctaTextTH: "อ่านข่าวล่าสุด",
      ctaHref: "/news",
      visualType: "ticker",
    };
  }

  // Home / Default
  return {
    accent: "#EC1C72",
    accentSecondary: "#F6A51B",
    label: "Home",
    labelTH: "หน้าแรก",
    quote: "The heart of Thai cinema",
    quoteTH: "หัวใจของภาพยนตร์ไทย",
    storyTitle: "Content Thailand",
    storyTitleTH: "คอนเทนต์ไทยแลนด์",
    storyItems: [
      { en: "Thailand's most comprehensive film & content database", th: "ฐานข้อมูลภาพยนตร์และคอนเทนต์ที่ครบถ้วนที่สุดของไทย" },
      { en: "562+ films, 737+ series, 5,888+ professionals", th: "ภาพยนตร์กว่า 562 เรื่อง ละคร 737 เรื่อง บุคลากร 5,888 คน" },
      { en: "Powered by the Department of Cultural Promotion", th: "ดำเนินการโดย กรมส่งเสริมวัฒนธรรม" },
      { en: "Supporting Thai creative economy since 2024", th: "สนับสนุนเศรษฐกิจสร้างสรรค์ไทยตั้งแต่ 2567" },
    ],
    ctaText: "Start Exploring",
    ctaTextTH: "เริ่มสำรวจ",
    ctaHref: "/films",
    visualType: "credits",
  };
}

// ──────────────────────────────────────────────
// Visual storytelling components per page type
// ──────────────────────────────────────────────

// Home: Cinematic end credits roll
function CreditsVisual({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative py-8 overflow-hidden">
      {/* Cinematic top/bottom bars */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-1"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--ct-text-faint)]">
            A Project by
          </p>
          <p className="text-sm font-thai" style={{ color: `${accent}cc` }}>
            กรมส่งเสริมวัฒนธรรม กระทรวงวัฒนธรรม
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px my-6 mx-auto max-w-xs"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }}
        />

        {/* Credits-style rolling names */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] max-w-sm mx-auto"
        >
          {[
            ["Database", "ฐานข้อมูล"],
            ["Design", "ออกแบบ"],
            ["Development", "พัฒนาระบบ"],
            ["Content", "เนื้อหา"],
          ].map(([en, th], i) => (
            <motion.div
              key={en}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              className="flex justify-between items-center"
            >
              <span className="font-mono uppercase tracking-wider text-[var(--ct-text-faint)]">{en}</span>
              <span className="font-thai text-[var(--ct-text-muted)]">{th}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Films: Clapperboard + timeline
function ClapperboardVisual({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative py-6 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        {/* Clapperboard top */}
        <motion.div
          initial={{ rotateX: -30, opacity: 0 }}
          animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Diagonal stripes header */}
          <div className="h-8 rounded-t-lg overflow-hidden relative" style={{ background: `${accent}15` }}>
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${accent}10 8px, ${accent}10 16px)`,
            }} />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${accent}80` }}>SCENE</span>
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${accent}80` }}>TAKE</span>
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${accent}80` }}>ROLL</span>
            </div>
          </div>

          {/* Timeline milestones */}
          <div className="relative py-4 px-4" style={{ borderLeft: `2px solid ${accent}20`, borderRight: `2px solid ${accent}20` }}>
            <div className="flex justify-between items-center">
              {[
                { year: "1923", yearTH: "๒๔๖๖" },
                { year: "1970", yearTH: "๒๕๑๓" },
                { year: "2010", yearTH: "๒๕๕๓" },
                { year: "2024", yearTH: "๒๕๖๗" },
              ].map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-2.5 h-2.5 rounded-full mb-1" style={{ background: accent, opacity: 0.3 + (i * 0.2) }} />
                  <span className="text-[10px] font-mono" style={{ color: `${accent}90` }}>{item.year}</span>
                </motion.div>
              ))}
            </div>
            {/* Timeline line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-[calc(50%-0.5px)] left-4 right-4 h-px origin-left"
              style={{ background: `linear-gradient(90deg, ${accent}20, ${accent}40, ${accent}20)` }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Series: TV scanlines effect
function ScanlinesVisual({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative py-6 overflow-hidden">
      {/* TV screen frame */}
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl overflow-hidden"
          style={{ border: `1px solid ${accent}20`, background: `${accent}05` }}
        >
          {/* Scanlines overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent}03 2px, ${accent}03 4px)`,
          }} />

          <div className="relative px-6 py-5 flex items-center justify-between">
            {/* Channel indicator */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${accent}80` }}>ON AIR</span>
            </div>

            {/* Mini TV stats */}
            <div className="flex gap-6">
              {[
                { num: "737+", label: "Series" },
                { num: "50+", label: "Years" },
                { num: "15+", label: "Countries" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-sm font-mono font-bold" style={{ color: `${accent}cc` }}>{stat.num}</div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--ct-text-faint)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Signal bars */}
            <div className="flex items-end gap-0.5">
              {[3, 5, 7, 9].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  className="w-1 origin-bottom rounded-full"
                  style={{ height: h, background: `${accent}${40 + i * 20}` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Persons: Spotlight / curtain call
function SpotlightVisual({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative py-8 overflow-hidden">
      {/* Spotlight beam from top center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accent}08 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-xl mx-auto text-center">
        {/* Curtain call stars */}
        <div className="flex justify-center gap-8 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.15 + i * 0.1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill={accent}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[11px] font-mono tracking-wider text-[var(--ct-text-faint)] uppercase"
        >
          5,888+ artists &bull; Directors &bull; Actors &bull; Cinematographers &bull; Composers
        </motion.p>
      </div>
    </div>
  );
}

// Companies: Skyline silhouette
function SkylineVisual({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const buildings = useMemo(() => [
    { w: 20, h: 24, delay: 0.1 },
    { w: 14, h: 32, delay: 0.15 },
    { w: 18, h: 20, delay: 0.2 },
    { w: 12, h: 40, delay: 0.25 },
    { w: 22, h: 28, delay: 0.3 },
    { w: 16, h: 36, delay: 0.35 },
    { w: 20, h: 22, delay: 0.4 },
    { w: 14, h: 30, delay: 0.45 },
    { w: 18, h: 26, delay: 0.5 },
    { w: 12, h: 38, delay: 0.55 },
    { w: 20, h: 20, delay: 0.6 },
    { w: 16, h: 34, delay: 0.65 },
  ], []);

  return (
    <div ref={ref} className="relative py-4 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        {/* Skyline */}
        <div className="flex items-end justify-center gap-1 h-12">
          {buildings.map((b, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: b.delay, ease: "easeOut" }}
              className="origin-bottom rounded-t-sm"
              style={{
                width: b.w,
                height: b.h,
                background: `linear-gradient(180deg, ${accent}${15 + i * 3} 0%, ${accent}08 100%)`,
                border: `1px solid ${accent}15`,
                borderBottom: "none",
              }}
            >
              {/* Window lights */}
              {b.h > 25 && (
                <div className="flex flex-wrap gap-0.5 p-1 mt-1">
                  {Array.from({ length: Math.floor(b.h / 10) }).map((_, j) => (
                    <div
                      key={j}
                      className="w-1 h-1 rounded-[1px]"
                      style={{ background: `${accent}${20 + j * 10}` }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        {/* Ground line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }}
        />
      </div>
    </div>
  );
}

// News: Ticker tape
function TickerVisual({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const headlines = [
    "BREAKING NEWS",
    "THAI FILM INDUSTRY",
    "CONTENT THAILAND",
    "AWARDS & FESTIVALS",
    "FILM INCENTIVE",
    "INDUSTRY UPDATE",
    "NEW RELEASES",
    "GLOBAL REACH",
  ];

  return (
    <div ref={ref} className="relative py-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative"
        style={{ borderTop: `1px solid ${accent}20`, borderBottom: `1px solid ${accent}20`, background: `${accent}05` }}
      >
        <div className="flex items-center h-8">
          {/* LIVE badge */}
          <div className="flex-shrink-0 px-3 h-full flex items-center gap-1.5" style={{ background: `${accent}15` }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider" style={{ color: accent }}>LIVE</span>
          </div>

          {/* Scrolling ticker */}
          <div className="flex-1 overflow-hidden relative">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-6 whitespace-nowrap px-4"
            >
              {[...headlines, ...headlines].map((h, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono tracking-wider" style={{ color: `${accent}70` }}>{h}</span>
                  <span className="w-1 h-1 rounded-full" style={{ background: `${accent}40` }} />
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Default: Film strip
function FilmStripVisual({ accent }: { accent: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const offset = useTransform(smoothX, [0, 1], [-60, 60]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
    },
    [mouseX]
  );

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative h-10 overflow-hidden cursor-crosshair">
      <motion.div style={{ x: offset }} className="flex gap-2 absolute inset-0 items-center justify-center">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-5 rounded-[2px] flex-shrink-0"
            style={{
              background: i % 4 === 0 ? `${accent}12` : i % 4 === 1 ? `${accent}08` : i % 4 === 2 ? `${accent}10` : `${accent}06`,
              border: `1px solid ${accent}15`,
            }}
            whileHover={{ scale: 1.3, borderColor: `${accent}40` }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>
      {/* Perforations */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full" style={{ background: `${accent}15` }} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full" style={{ background: `${accent}15` }} />
        ))}
      </div>
    </div>
  );
}

// Render the correct visual based on page
function StoryVisual({ type, accent }: { type: FooterTheme["visualType"]; accent: string }) {
  switch (type) {
    case "credits": return <CreditsVisual accent={accent} />;
    case "clapperboard": return <ClapperboardVisual accent={accent} />;
    case "scanlines": return <ScanlinesVisual accent={accent} />;
    case "spotlight": return <SpotlightVisual accent={accent} />;
    case "skyline": return <SkylineVisual accent={accent} />;
    case "ticker": return <TickerVisual accent={accent} />;
    case "filmstrip": return <FilmStripVisual accent={accent} />;
  }
}

// ──────────────────────────────────────────────
// Spotlight mouse-following background
// ──────────────────────────────────────────────

function SpotlightBg({ accent }: { accent: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
      mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-auto"
      style={{
        background: useTransform(
          [smoothX, smoothY],
          ([x, y]) =>
            `radial-gradient(500px circle at ${x}% ${y}%, ${accent}06 0%, transparent 60%)`
        ),
      }}
    />
  );
}

// ──────────────────────────────────────────────
// Story Section — The unique part per page
// ──────────────────────────────────────────────

function StorySection({ theme, t: translate }: { theme: FooterTheme; t: (th: string, en: string) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4"
    >
      {/* Section header with accent line */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 max-w-[40px]" style={{ background: `${theme.accent}40` }} />
        <h3 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: `${theme.accent}90` }}>
          {translate(theme.storyTitleTH, theme.storyTitle)}
        </h3>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.accent}20, transparent)` }} />
      </div>

      {/* Story items — presented as elegant list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-5 max-w-3xl">
        {theme.storyItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            className="flex items-start gap-2"
          >
            <div
              className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: theme.accent, opacity: 0.5 + i * 0.15 }}
            />
            <p className="text-[11px] text-[var(--ct-text-muted)] font-body leading-relaxed">
              {translate(item.th, item.en)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-xs font-mono italic tracking-wide"
        style={{ color: `${theme.accent}50` }}
      >
        &ldquo;{translate(theme.quoteTH, theme.quote)}&rdquo;
      </motion.p>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// CI Decorative Flame Swirl Band
// ──────────────────────────────────────────────

function CIFlameSwirl() {
  return (
    <div className="relative h-20 sm:h-24 overflow-hidden">
      {/* Multi-layer gradient swirl mimicking CI flame logo */}
      <svg
        viewBox="0 0 1440 96"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ci-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F6A51B" stopOpacity="0.7" />
            <stop offset="25%" stopColor="#F76532" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#EC1C72" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#702874" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#14133D" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ci-grad-2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F6A51B" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#F76532" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#EC1C72" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#702874" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="ci-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#702874" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#EC1C72" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#F76532" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F6A51B" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Primary swooping arc — the main CI swirl */}
        <path
          d="M0,96 C200,96 300,20 500,30 C700,40 800,80 1000,50 C1200,20 1350,60 1440,40 L1440,96 Z"
          fill="url(#ci-grad-1)"
        />
        {/* Secondary arc — creates depth */}
        <path
          d="M0,96 C180,60 350,40 550,55 C750,70 900,30 1100,45 C1300,60 1400,80 1440,70 L1440,96 Z"
          fill="url(#ci-grad-2)"
        />
        {/* Tertiary subtle accent */}
        <path
          d="M0,96 C100,80 300,50 500,65 C700,80 900,45 1100,55 C1300,65 1400,90 1440,85 L1440,96 Z"
          fill="url(#ci-grad-3)"
        />
      </svg>

      {/* Thin gold accent line following the main curve */}
      <svg
        viewBox="0 0 1440 96"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,80 C200,80 300,15 500,25 C700,35 800,75 1000,45 C1200,15 1350,55 1440,35"
          fill="none"
          stroke="url(#ci-grad-1)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Footer Component
// ──────────────────────────────────────────────

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const theme = getFooterTheme(pathname);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.05 });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "color-mix(in srgb, var(--ct-bg-page), black 15%)" }}
    >
      {/* CI Flame Swirl decorative band at top */}
      <CIFlameSwirl />

      {/* CI swirl pattern background — multi-color ambient glow */}
      <div className="absolute inset-0 ci-swirl-pattern pointer-events-none" />

      {/* Interactive spotlight background */}
      <SpotlightBg accent={theme.accent} />

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      {/* CI flame arc at bottom */}
      <div className="absolute inset-0 ci-flame-arc pointer-events-none" />

      {/* ═══════ UNIQUE VISUAL per page ═══════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <StoryVisual type={theme.visualType} accent={theme.accent} />
      </motion.div>

      {/* ═══════ STORY SECTION per page ═══════ */}
      <StorySection theme={theme} t={t} />

      {/* ═══════ MAIN FOOTER LINKS ═══════ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Divider before links */}
        <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}15, transparent)` }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-4">
              <LogoGroup variant="footer" />
            </div>
            <p className="text-[var(--ct-text-muted)] text-sm font-body leading-relaxed">
              {t(
                "กองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม กระทรวงวัฒนธรรม",
                "Bureau of Film & Video, Department of Cultural Promotion, Ministry of Culture"
              )}
            </p>
          </motion.div>

          {/* Database */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-[var(--ct-text-primary)] font-thai font-semibold mb-3 text-sm">
              {t("ฐานข้อมูล", "Database")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/films", label: t("ภาพยนตร์", "Films") },
                { href: "/series", label: t("ละครโทรทัศน์", "TV Series") },
                { href: "/persons", label: t("บุคลากร", "Personnel") },
                { href: "/companies", label: t("บริษัท", "Companies") },
                { href: "/library", label: t("คลังข้อมูล", "Library") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] text-sm transition-colors font-body inline-flex items-center gap-2"
                  >
                    <span
                      className="w-0 h-px group-hover:w-3 transition-all duration-300"
                      style={{ background: theme.accent }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-[var(--ct-text-primary)] font-thai font-semibold mb-3 text-sm">
              {t("บริการ", "Services")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/news", label: t("ข่าวสารและกิจกรรม", "News & Events") },
                { href: "/film-incentive", label: "Film Incentive" },
                { href: "/statistics", label: t("สถิติอุตสาหกรรม", "Industry Statistics") },
                { href: "/search", label: t("ค้นหาขั้นสูง", "Advanced Search") },
                { href: "/sitemap", label: t("แผนผังเว็บไซต์", "Sitemap") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] text-sm transition-colors font-body inline-flex items-center gap-2"
                  >
                    <span
                      className="w-0 h-px group-hover:w-3 transition-all duration-300"
                      style={{ background: theme.accent }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-[var(--ct-text-primary)] font-thai font-semibold mb-3 text-sm">
              {t("เกี่ยวกับ", "About")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: t("เกี่ยวกับเรา", "About Us") },
                { href: "/about/mission", label: t("พันธกิจองค์กร", "Mission") },
                { href: "/about/partners", label: t("หน่วยงานพันธมิตร", "Partners") },
                { href: "/about/location", label: t("แผนที่ / ที่ตั้ง", "Location / Map") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] text-sm transition-colors font-body inline-flex items-center gap-2"
                  >
                    <span
                      className="w-0 h-px group-hover:w-3 transition-all duration-300"
                      style={{ background: theme.accent }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-[var(--ct-text-primary)] font-thai font-semibold mb-3 text-sm">
              {t("ติดต่อเรา", "Contact")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/contact", label: t("ติดต่อเรา", "Contact Us") },
                { href: "/apply", label: t("สมัครมาตรการ", "Apply") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] text-sm transition-colors font-body inline-flex items-center gap-2"
                  >
                    <span
                      className="w-0 h-px group-hover:w-3 transition-all duration-300"
                      style={{ background: theme.accent }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-[var(--ct-text-faint)] text-xs font-body space-y-1">
              <p>14 {t("ถนนเทียมร่วมมิตร แขวงห้วยขวาง", "Thiam Ruam Mit Rd, Huai Khwang")}</p>
              <p>{t("กรุงเทพฯ 10310", "Bangkok 10310")}</p>
              <p>info@contentthailand.com</p>
            </div>
          </motion.div>
        </div>

        {/* ═══════ BOTTOM BAR ═══════ */}
        <motion.div
          className="mt-10 pt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* CI gradient divider — full palette sweep */}
          <div
            className="h-[2px] mb-6 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent 0%, #F6A51B40 15%, #F7653260 30%, #EC1C7280 50%, #70287460 70%, #14133D40 85%, transparent 100%)" }}
          />

          {/* Policy links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-4">
            {[
              { href: "/policy/website", label: t("นโยบายเว็บไซต์", "Website Policy") },
              { href: "/policy/pdpa", label: t("นโยบายคุ้มครองข้อมูลส่วนบุคคล", "PDPA") },
              { href: "/policy/security", label: t("นโยบายความมั่นคงปลอดภัย", "Security Policy") },
              { href: "/policy/disclaimer", label: t("การปฏิเสธความรับผิด", "Disclaimer") },
              { href: "/policy/cookies", label: t("นโยบายคุกกี้", "Cookie Policy") },
            ].map((item, i) => (
              <span key={item.href} className="flex items-center gap-4">
                <Link
                  href={item.href}
                  className="text-[var(--ct-text-faint)] hover:text-[var(--ct-text-secondary)] text-[11px] font-thai transition-colors"
                >
                  {item.label}
                </Link>
                {i < 4 && <span className="text-[var(--ct-text-faint)]">|</span>}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[var(--ct-text-faint)] text-xs font-body">
              &copy; {new Date().getFullYear()}{" "}
              {t("กรมส่งเสริมวัฒนธรรม", "Dept. of Cultural Promotion")} | ContentThailand.{" "}
              {t("สงวนลิขสิทธิ์", "All rights reserved.")}
            </p>

            {/* Page indicator badge — shows current section */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
              <span
                className="text-[10px] font-mono tracking-wider uppercase"
                style={{ color: `${theme.accent}80` }}
              >
                {theme.label}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
