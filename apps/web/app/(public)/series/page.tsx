"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Play } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientDivider } from "@/components/motion/gradient-divider";
import { ViewModeToggle, useViewMode } from "@/components/shared/ViewModeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { series } from "@/lib/mock-data/series";
import { genres } from "@/lib/mock-data/genres";

type SortOption = "newest" | "oldest" | "title-az" | "popular";

export default function SeriesPage() {
  const { lang } = useLanguage();
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useViewMode("series", "grid");

  const filtered = useMemo(() => {
    let result = [...series];
    if (selectedGenre !== "all") {
      result = result.filter((s) => s.genres.some((g) => g.slug === selectedGenre));
    }
    switch (sort) {
      case "newest": result.sort((a, b) => b.year - a.year); break;
      case "oldest": result.sort((a, b) => a.year - b.year); break;
      case "title-az": result.sort((a, b) => (lang === "th" ? a.titleTh : a.titleEn).localeCompare(lang === "th" ? b.titleTh : b.titleEn, lang === "th" ? "th" : "en")); break;
      case "popular": result.sort((a, b) => b.viewCount - a.viewCount); break;
    }
    return result;
  }, [selectedGenre, sort, lang]);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ละครโทรทัศน์" : "TV Series" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <ScrollReveal direction="up">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <FilmStrip color="orange" size="lg">
                <h1 className="font-thai font-bold text-2xl md:text-3xl text-white">
                  {lang === "th" ? "ฐานข้อมูลละครโทรทัศน์" : "TV Series Database"}
                </h1>
              </FilmStrip>
              <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 ml-1">
                {filtered.length} {lang === "th" ? "เรื่อง" : "series"}
              </p>
            </div>
            <ViewModeToggle value={viewMode} onChange={setViewMode} />
          </div>
        </ScrollReveal>

        {/* Filter bar */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] text-sm rounded-xl px-4 py-2.5 font-thai focus:border-[#F76532]/40 focus:outline-none transition-colors"
            >
              <option value="all">{lang === "th" ? "ทุกประเภท" : "All Genres"}</option>
              {genres.map((g) => (<option key={g.slug} value={g.slug}>{lang === "th" ? g.nameTh : g.nameEn}</option>))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] text-sm rounded-xl px-4 py-2.5 font-thai focus:border-[#F76532]/40 focus:outline-none transition-colors"
            >
              <option value="newest">{lang === "th" ? "ใหม่สุด" : "Newest"}</option>
              <option value="oldest">{lang === "th" ? "เก่าสุด" : "Oldest"}</option>
              <option value="title-az">{lang === "th" ? "ชื่อ ก-ฮ" : "Title A-Z"}</option>
              <option value="popular">{lang === "th" ? "ยอดนิยม" : "Popular"}</option>
            </select>
          </div>
        </ScrollReveal>

        <GradientDivider variant="orange" className="mb-8" />

        {/* Content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedGenre}-${sort}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === "grid" ? (
              <StaggerChildren staggerDelay={0.04} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((s) => (
                  <StaggerItem key={s.id}><SeriesCardGrid s={s} lang={lang} /></StaggerItem>
                ))}
              </StaggerChildren>
            ) : viewMode === "poster" ? (
              <StaggerChildren staggerDelay={0.03} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filtered.map((s) => (
                  <StaggerItem key={s.id}><SeriesCardPoster s={s} lang={lang} /></StaggerItem>
                ))}
              </StaggerChildren>
            ) : (
              <div className="rounded-xl overflow-hidden border border-[var(--ct-border)] bg-[var(--ct-bg-surface)]">
                {filtered.map((s, i) => (
                  <SeriesListItem key={s.id} s={s} lang={lang} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--ct-text-muted)] font-thai text-lg">
              {lang === "th" ? "ไม่พบละครตามเงื่อนไขที่เลือก" : "No series found matching your criteria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SeriesCardGrid({ s, lang }: { s: (typeof series)[0]; lang: string }) {
  const title = lang === "th" ? s.titleTh : s.titleEn;
  const synopsis = lang === "th" ? s.synopsisTh : s.synopsisEn;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(250px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(247,101,50,0.08), transparent 70%)`
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

  return (
    <Link
      ref={cardRef}
      href={`/series/${s.slug}`}
      onMouseMove={handleMouseMove}
      className="group relative bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] overflow-hidden
        transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        hover:-translate-y-2 hover:border-[#F76532]/40 hover:shadow-[0_20px_60px_rgba(247,101,50,0.15),0_0_0_1px_rgba(247,101,50,0.15)]"
    >
      {/* Mouse-follow glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl z-10"
        style={{ background: glowBackground }}
      />

      {/* Top edge light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#F76532]/40 transition-all duration-300 z-10" />

      <div className="aspect-video bg-gradient-to-br from-[#F76532]/10 to-[#1C1B4E] relative overflow-hidden">
        {s.coverUrl ? (
          <Image src={s.coverUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-108" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-4xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-12 h-12 rounded-full bg-[#F76532]/80 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(247,101,50,0.4)]">
            <Play className="w-5 h-5 text-[var(--ct-text-primary)] ml-0.5" fill="white" />
          </div>
        </div>
        {s.channel && <div className="absolute top-2 left-2 px-2 py-0.5 bg-[var(--ct-bg-elevated)] text-[var(--ct-text-secondary)] text-[10px] rounded-md font-thai backdrop-blur-sm z-10 border border-[var(--ct-border)]">{s.channel}</div>}
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#F6A51B] text-[#0E0D2A] text-xs font-bold rounded-md z-10">{s.year}</div>
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1C1B4E] to-transparent" />
      </div>

      <div className="p-4 relative z-10">
        <h3 className="font-thai font-semibold text-sm text-white truncate group-hover:text-[#F76532] transition-colors">{title}</h3>
        <p className="text-[var(--ct-text-muted)] text-xs font-body mt-0.5">{lang === "th" ? s.titleEn : s.titleTh}</p>
        {synopsis && <p className="text-white/40 text-xs font-body line-clamp-2 mt-2 leading-relaxed">{synopsis}</p>}
        <div className="flex items-center gap-2 mt-3">
          {s.episodes && (
            <span className="px-2 py-0.5 bg-[#F76532]/20 text-[#F76532] text-[10px] rounded-md font-bold font-thai border border-[#F76532]/15">
              {s.episodes} {lang === "th" ? "ตอน" : "ep"}
            </span>
          )}
          {s.genres.slice(0, 2).map((g) => (
            <span key={g.slug} className="px-2 py-0.5 bg-[#F76532]/15 text-[#F76532]/80 text-[10px] rounded-md font-thai border border-[#F76532]/10">
              {lang === "th" ? g.nameTh : g.nameEn}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function SeriesCardPoster({ s, lang }: { s: (typeof series)[0]; lang: string }) {
  const title = lang === "th" ? s.titleTh : s.titleEn;
  return (
    <Link
      href={`/series/${s.slug}`}
      className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] hover:-translate-y-1 hover:border-[#F76532]/40 hover:shadow-[0_10px_40px_rgba(247,101,50,0.15)] transition-all duration-300"
    >
      {s.coverUrl ? (
        <Image src={s.coverUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F76532]/10 to-[#702874]/10 flex items-center justify-center">
          <span className="text-[var(--ct-text-faint)] font-display text-3xl">{title.charAt(0)}</span>
        </div>
      )}
      {/* Channel badge */}
      {s.channel && (
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[var(--ct-bg-elevated)] text-[var(--ct-text-secondary)] text-[9px] rounded font-thai backdrop-blur-sm border border-[var(--ct-border)]">{s.channel}</div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#14133D] via-[#14133D]/90 to-transparent">
        <p className="text-white text-xs font-thai font-semibold truncate">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#F6A51B] text-[10px] font-bold">{s.year}</span>
          {s.episodes && <span className="text-[var(--ct-text-muted)] text-[9px]">{s.episodes} {lang === "th" ? "ตอน" : "ep"}</span>}
        </div>
      </div>
    </Link>
  );
}

function SeriesListItem({ s, lang, index }: { s: (typeof series)[0]; lang: string; index: number }) {
  const title = lang === "th" ? s.titleTh : s.titleEn;
  const subtitle = lang === "th" ? s.titleEn : s.titleTh;
  const synopsis = lang === "th" ? s.synopsisTh : s.synopsisEn;

  return (
    <motion.a
      href={`/series/${s.slug}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group flex gap-4 p-4 md:p-5 hover:bg-white/[0.03] border-b border-white/[0.06] last:border-0 transition-colors"
    >
      <div className="w-28 md:w-36 h-20 md:h-24 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#F76532]/10 to-[#1C1B4E] overflow-hidden relative group-hover:shadow-[0_0_20px_rgba(247,101,50,0.15)] transition-shadow border border-white/[0.06]">
        {s.coverUrl ? (
          <Image src={s.coverUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="144px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-2xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-thai font-bold text-base md:text-lg text-white group-hover:text-[#F76532] transition-colors">{title}</h3>
        <p className="text-[var(--ct-text-muted)] text-sm font-body mt-0.5">{subtitle}</p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="px-2 py-0.5 bg-[#F6A51B]/20 text-[#F6A51B] text-xs rounded-md font-bold font-mono">{s.year}</span>
          {s.channel && <span className="text-[var(--ct-text-muted)] text-xs font-thai">{s.channel}</span>}
          {s.episodes && <span className="text-[var(--ct-text-muted)] text-xs font-thai">{s.episodes} {lang === "th" ? "ตอน" : "ep"}</span>}
          {s.genres.slice(0, 3).map((g) => (
            <span key={g.slug} className="px-2 py-0.5 bg-[#F76532]/15 text-[#F76532]/80 text-xs rounded-md font-thai border border-[#F76532]/10">{lang === "th" ? g.nameTh : g.nameEn}</span>
          ))}
        </div>
        {synopsis && <p className="text-white/40 text-xs font-body line-clamp-2 mt-2 leading-relaxed">{synopsis}</p>}
      </div>
      <div className="hidden md:flex flex-col items-end justify-center gap-1 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-white/40 text-xs">
          <Eye className="w-3.5 h-3.5" />
          <span className="font-mono">{s.viewCount?.toLocaleString()}</span>
        </div>
      </div>
    </motion.a>
  );
}
