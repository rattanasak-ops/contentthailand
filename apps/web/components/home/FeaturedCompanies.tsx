"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/lib/mock-data/companies";
import { films } from "@/lib/mock-data/films";
import { ChevronRight, Film, ArrowRight } from "lucide-react";
import { StaggerChildren, StaggerItem } from "@/components/motion";

const featured = companies.slice(0, 6);

function getFilmCount(companyId: number) {
  return films.filter((f) => f.companyId === companyId).length;
}


/* ── CompanyCard ── */
interface CompanyCardProps {
  company: (typeof companies)[number];
  filmCount: number;
  lang: string;
}

function CompanyCard({ company, filmCount, lang }: CompanyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 3D tilt — perspective 800px, ±6 degrees
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });

  // Mouse-follow glow
  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(200px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(112,40,116,0.2), transparent 70%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div style={{ perspective: 800 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative rounded-xl p-[2px] will-change-transform transition-all duration-500 ease-out
            hover:-translate-y-3
            hover:shadow-[0_12px_40px_rgba(112,40,116,0.2),0_0_60px_rgba(112,40,116,0.1),0_20px_50px_rgba(0,0,0,0.25)]"
          style={{
            background: "var(--ct-border)",
          }}
        >
          {/* Animated gradient border — visible on hover (uses transform rotate for cross-browser support) */}
          <div
            className="absolute inset-[-1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
          >
            <div
              className="absolute inset-[-50%] animate-[spin_3s_linear_infinite]"
              style={{
                background: "conic-gradient(from 0deg, #702874, #EC1C72, #F76532, #EC1C72, #702874)",
              }}
            />
          </div>

          {/* Inner card body */}
          <Link
            href={`/companies/${company.slug}`}
            className="relative block rounded-[10px] overflow-hidden z-10"
            style={{ backgroundColor: "var(--ct-bg-elevated)" }}
          >
            {/* Mouse-follow glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 rounded-[10px]"
              style={{ background: glowBackground }}
            />

            {/* Glassmorphism overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-[10px] backdrop-blur-[2px]"
              style={{ background: "rgba(255,255,255,0.03)" }}
            />

            <div className="relative p-5 text-center z-20">
              {/* Logo */}
              <div className="w-20 h-20 mx-auto mb-3 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-white">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company.nameEn}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--ct-bg-hover)] flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--ct-text-faint)]">
                      {company.nameEn.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="text-[var(--ct-text-primary)] text-sm font-thai font-semibold leading-tight group-hover:text-[#702874] transition-colors duration-300 line-clamp-2 min-h-[2.5rem]">
                {lang === "th" ? company.nameTh : company.nameEn}
              </h3>

              {/* Film count badge with glow */}
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-[var(--ct-text-faint)] border border-transparent transition-all duration-500
                  group-hover:border-[rgba(112,40,116,0.3)] group-hover:text-[#702874]
                  group-hover:shadow-[0_0_12px_rgba(112,40,116,0.3),0_0_4px_rgba(236,28,114,0.2)]
                  group-hover:animate-pulse">
                  <Film className="w-3 h-3" />
                  {filmCount} {lang === "th" ? "เรื่อง" : "films"}
                </span>
              </div>

              {/* Hover arrow */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-1 text-[#702874] text-xs font-thai group-hover:gap-2 transition-[gap] duration-300">
                  {lang === "th" ? "ดูรายละเอียด" : "View Details"}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function FeaturedCompanies() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 relative overflow-hidden ct-section-b ct-tint-purple">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(112,40,116,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--ct-text-primary)] font-thai">
              {lang === "th" ? "บริษัทผู้ผลิตชั้นนำ" : "Leading Production Companies"}
            </h2>
            <p className="text-[var(--ct-text-faint)] text-sm mt-1 font-thai">
              {lang === "th" ? "บริษัทผู้ผลิตภาพยนตร์และวีดิทัศน์ที่จดทะเบียนในระบบ" : "Registered film and video production companies"}
            </p>
          </div>
          <Link href="/companies" className="group flex items-center gap-1 text-[#702874] hover:text-[#702874]/80 text-sm font-thai transition-colors">
            {lang === "th" ? "ดูทั้งหมด" : "View All"}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Companies Grid */}
        <StaggerChildren staggerDelay={0.07} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured.map((company) => {
            const filmCount = getFilmCount(company.id);
            return (
              <StaggerItem key={company.id}>
                <CompanyCard company={company} filmCount={filmCount} lang={lang} />
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
