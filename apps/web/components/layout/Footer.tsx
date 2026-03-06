"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogoGroup } from "./LogoGroup";

// Film reel animation that responds to mouse
function FilmReelInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const offset = useTransform(smoothX, [0, 1], [-100, 100]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
    },
    [mouseX]
  );

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative h-12 overflow-hidden cursor-crosshair">
      <motion.div style={{ x: offset }} className="flex gap-3 absolute inset-0 items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-8 h-6 rounded-sm flex-shrink-0"
            style={{
              background: i % 3 === 0 ? "rgba(236,28,114,0.15)" : i % 3 === 1 ? "rgba(247,101,50,0.12)" : "rgba(246,165,27,0.1)",
              border: "1px solid var(--ct-border)",
            }}
            whileHover={{ scale: 1.3, borderColor: "rgba(236,28,114,0.4)" }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>
      {/* Film reel perforations */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--ct-border)]" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--ct-border)]" />
        ))}
      </div>
    </div>
  );
}

// Spotlight that follows mouse cursor
function SpotlightEffect() {
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
            `radial-gradient(400px circle at ${x}% ${y}%, rgba(236,28,114,0.04) 0%, transparent 60%)`
        ),
      }}
    />
  );
}

// Page-specific footer themes
function getFooterTheme(pathname: string) {
  if (pathname.startsWith("/films")) return { accent: "#EC1C72", label: "Films", quote: "Every frame tells a story" };
  if (pathname.startsWith("/series")) return { accent: "#F76532", label: "Series", quote: "Stories that never end" };
  if (pathname.startsWith("/persons")) return { accent: "#F6A51B", label: "People", quote: "Behind every scene" };
  if (pathname.startsWith("/companies")) return { accent: "#702874", label: "Industry", quote: "Building Thai cinema" };
  if (pathname.startsWith("/news")) return { accent: "#00B8FF", label: "News", quote: "The pulse of Thai content" };
  return { accent: "#EC1C72", label: "Home", quote: "The heart of Thai cinema" };
}

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const theme = getFooterTheme(pathname);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--ct-bg-page), black 15%)" }}>
      {/* Gradient divider at top */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, transparent 0%, ${theme.accent}30 30%, ${theme.accent}60 50%, ${theme.accent}30 70%, transparent 100%)` }} />

      {/* Interactive spotlight background */}
      <SpotlightEffect />

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      {/* Interactive film reel decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <FilmReelInteractive />
      </motion.div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            {/* Dynamic quote based on page */}
            <p className="mt-4 text-xs font-mono tracking-wide italic" style={{ color: `${theme.accent}60` }}>
              &ldquo;{theme.quote}&rdquo;
            </p>
          </motion.div>

          {/* ฐานข้อมูล / Database */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-[var(--ct-text-primary)] font-thai font-semibold mb-3 text-sm">{t("ฐานข้อมูล", "Database")}</h3>
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
                    <span className="w-0 h-px group-hover:w-3 transition-all duration-300" style={{ background: theme.accent }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* บริการ / Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-[var(--ct-text-primary)] font-thai font-semibold mb-3 text-sm">{t("บริการ", "Services")}</h3>
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
                    <span className="w-0 h-px group-hover:w-3 transition-all duration-300" style={{ background: theme.accent }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* เกี่ยวกับ / About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-[var(--ct-text-primary)] font-thai font-semibold mb-3 text-sm">{t("เกี่ยวกับ", "About")}</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: t("เกี่ยวกับเรา", "About Us") },
                { href: "/about/mission", label: t("พันธกิจองค์กร", "Mission") },
                { href: "/contact", label: t("ติดต่อเรา", "Contact Us") },
                { href: "/about/location", label: t("แผนที่ / ที่ตั้ง", "Location / Map") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] text-sm transition-colors font-body inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-px group-hover:w-3 transition-all duration-300" style={{ background: theme.accent }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-10 pt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Gradient line */}
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}20, transparent)` }} />

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
                <Link href={item.href} className="text-[var(--ct-text-faint)] hover:text-[var(--ct-text-secondary)] text-[11px] font-thai transition-colors">
                  {item.label}
                </Link>
                {i < 4 && <span className="text-[var(--ct-text-faint)]">|</span>}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[var(--ct-text-faint)] text-xs font-body">
              &copy; {new Date().getFullYear()} {t("กรมส่งเสริมวัฒนธรรม", "Dept. of Cultural Promotion")} | ContentThailand. {t("สงวนลิขสิทธิ์", "All rights reserved.")}
            </p>

            {/* Page indicator badge */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: theme.accent }} />
              <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: `${theme.accent}80` }}>
                {theme.label}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
