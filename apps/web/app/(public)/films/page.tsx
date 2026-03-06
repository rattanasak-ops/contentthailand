"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilmCardGrid } from "@/components/films/FilmCardGrid";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientDivider } from "@/components/motion/gradient-divider";
import { ViewModeToggle, useViewMode } from "@/components/shared/ViewModeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { films } from "@/lib/mock-data/films";
import { genres } from "@/lib/mock-data/genres";

const ITEMS_PER_PAGE = 20;

const yearOptions = Array.from(
  new Set(films.map((f) => f.year))
).sort((a, b) => b - a);

type SortOption = "newest" | "oldest" | "title-az" | "title-za" | "popular";

export default function FilmsPage() {
  const { lang } = useLanguage();
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useViewMode("films", "grid");

  const filtered = useMemo(() => {
    let result = [...films];
    if (selectedGenre !== "all") result = result.filter((f) => f.genres.some((g) => g.slug === selectedGenre));
    if (selectedYear !== "all") result = result.filter((f) => f.year === parseInt(selectedYear));
    switch (sort) {
      case "newest": result.sort((a, b) => b.year - a.year); break;
      case "oldest": result.sort((a, b) => a.year - b.year); break;
      case "title-az": result.sort((a, b) => (lang === "th" ? a.titleTh : a.titleEn).localeCompare(lang === "th" ? b.titleTh : b.titleEn, lang === "th" ? "th" : "en")); break;
      case "title-za": result.sort((a, b) => (lang === "th" ? b.titleTh : b.titleEn).localeCompare(lang === "th" ? a.titleTh : a.titleEn, lang === "th" ? "th" : "en")); break;
      case "popular": result.sort((a, b) => b.viewCount - a.viewCount); break;
    }
    return result;
  }, [selectedGenre, selectedYear, sort, lang]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ภาพยนตร์" : "Films" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)]">
      {/* Hero / Header section */}
      <div className="ct-section-a pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

          <ScrollReveal direction="up">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <FilmStrip color="pink" size="lg">
                  <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
                    {lang === "th" ? "ฐานข้อมูลภาพยนตร์" : "Film Database"}
                  </h1>
                </FilmStrip>
                <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 ml-1">
                  {lang === "th"
                    ? `แสดง ${(page - 1) * ITEMS_PER_PAGE + 1}-${Math.min(page * ITEMS_PER_PAGE, filtered.length)} จาก ${filtered.length} เรื่อง`
                    : `Showing ${(page - 1) * ITEMS_PER_PAGE + 1}-${Math.min(page * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} films`}
                </p>
              </div>
              <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Filter bar section */}
      <div className="ct-section-b ct-tint-purple py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedGenre}
                onChange={(e) => { setSelectedGenre(e.target.value); setPage(1); }}
                className="bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] text-sm rounded-xl px-4 py-2.5 font-thai focus:border-[#EC1C72]/40 focus:outline-none transition-colors"
              >
                <option value="all">{lang === "th" ? "ทุกประเภท" : "All Genres"}</option>
                {genres.map((g) => (<option key={g.slug} value={g.slug}>{lang === "th" ? g.nameTh : g.nameEn}</option>))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => { setSelectedYear(e.target.value); setPage(1); }}
                className="bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] text-sm rounded-xl px-4 py-2.5 font-thai focus:border-[#EC1C72]/40 focus:outline-none transition-colors"
              >
                <option value="all">{lang === "th" ? "ทุกปี" : "All Years"}</option>
                {yearOptions.map((y) => (<option key={y} value={y}>{y}</option>))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] text-sm rounded-xl px-4 py-2.5 font-thai focus:border-[#EC1C72]/40 focus:outline-none transition-colors"
              >
                <option value="newest">{lang === "th" ? "ใหม่สุด" : "Newest"}</option>
                <option value="oldest">{lang === "th" ? "เก่าสุด" : "Oldest"}</option>
                <option value="title-az">{lang === "th" ? "ชื่อ ก-ฮ" : "Title A-Z"}</option>
                <option value="title-za">{lang === "th" ? "ชื่อ ฮ-ก" : "Title Z-A"}</option>
                <option value="popular">{lang === "th" ? "ยอดนิยม" : "Popular"}</option>
              </select>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Content grid section */}
      <div className="ct-section-c ct-tint-pink py-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GradientDivider variant="pink" className="mb-8" />

          {/* Content grid with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${page}-${selectedGenre}-${selectedYear}-${sort}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === "grid" ? (
                <StaggerChildren staggerDelay={0.03} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {paginated.map((film) => (
                    <StaggerItem key={film.id}><FilmCardGrid film={film} /></StaggerItem>
                  ))}
                </StaggerChildren>
              ) : viewMode === "poster" ? (
                <StaggerChildren staggerDelay={0.03} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                  {paginated.map((film) => (
                    <StaggerItem key={film.id}>
                      <a href={`/films/${film.slug}`} className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] hover:-translate-y-1 hover:border-[#EC1C72]/40 hover:shadow-[0_10px_40px_rgba(236,28,114,0.15)] transition-all duration-300">
                        {film.posterUrl ? (
                          <Image src={film.posterUrl} alt={lang === "th" ? film.titleTh : film.titleEn} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#EC1C72]/10 to-[#702874]/10 flex items-center justify-center">
                            <span className="text-[var(--ct-text-faint)] font-display text-3xl">{(lang === "th" ? film.titleTh : film.titleEn).charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[var(--ct-bg-page)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[var(--ct-text-primary)] text-[10px] font-thai font-semibold truncate">{lang === "th" ? film.titleTh : film.titleEn}</p>
                          <p className="text-[#F6A51B] text-[9px] font-bold">{film.year}</p>
                        </div>
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              ) : (
                <div className="rounded-xl overflow-hidden border border-[var(--ct-border)] bg-[var(--ct-bg-surface)]">
                  {paginated.map((film, i) => (
                    <FilmListItem key={film.id} film={film} lang={lang} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--ct-text-muted)] font-thai text-lg">
                {lang === "th" ? "ไม่พบภาพยนตร์ตามเงื่อนไขที่เลือก" : "No films found matching your criteria"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination section */}
      {totalPages > 1 && (
        <div className="ct-section-d ct-tint-gold py-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-muted)] text-sm rounded-xl disabled:opacity-30 hover:border-[#EC1C72]/40 hover:text-[var(--ct-text-primary)] transition-all font-thai"
              >
                {lang === "th" ? "ก่อนหน้า" : "Previous"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 text-sm rounded-xl transition-all font-thai ${
                    p === page
                      ? "bg-[#EC1C72] text-white font-bold shadow-[0_0_20px_rgba(236,28,114,0.4)]"
                      : "bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-muted)] hover:border-[#EC1C72]/40 hover:text-[var(--ct-text-primary)]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] text-[var(--ct-text-muted)] text-sm rounded-xl disabled:opacity-30 hover:border-[#EC1C72]/40 hover:text-[var(--ct-text-primary)] transition-all font-thai"
              >
                {lang === "th" ? "ถัดไป" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilmListItem({ film, lang, index }: { film: (typeof films)[0]; lang: string; index: number }) {
  const title = lang === "th" ? film.titleTh : film.titleEn;
  const subtitle = lang === "th" ? film.titleEn : film.titleTh;
  const synopsis = lang === "th" ? film.synopsisTh : film.synopsisEn;

  return (
    <motion.a
      href={`/films/${film.slug}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group flex gap-4 p-4 md:p-5 hover:bg-[var(--ct-bg-hover)] border-b border-[var(--ct-border)] last:border-0 transition-colors"
    >
      <div className="w-16 md:w-20 h-24 md:h-[120px] flex-shrink-0 rounded-lg bg-gradient-to-br from-[#EC1C72]/10 to-[var(--ct-bg-elevated)] overflow-hidden relative group-hover:shadow-[0_0_20px_rgba(236,28,114,0.15)] transition-shadow border border-[var(--ct-border)]">
        {film.posterUrl ? (
          <Image src={film.posterUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="80px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-2xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-thai font-bold text-base md:text-lg text-[var(--ct-text-primary)] group-hover:text-[#EC1C72] transition-colors">{title}</h3>
        <p className="text-[var(--ct-text-secondary)] text-sm font-body mt-0.5">{subtitle}</p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="px-2 py-0.5 bg-[#F6A51B]/20 text-[#F6A51B] text-xs rounded-md font-bold font-mono">{film.year}</span>
          {film.duration && <span className="text-[var(--ct-text-muted)] text-xs font-thai">{film.duration} {lang === "th" ? "นาที" : "min"}</span>}
          {film.genres.slice(0, 3).map((g) => (
            <span key={g.slug} className="px-2 py-0.5 bg-[#EC1C72]/20 text-[#EC1C72] text-xs rounded-md font-thai border border-[#EC1C72]/15">{lang === "th" ? g.nameTh : g.nameEn}</span>
          ))}
        </div>
        {synopsis && <p className="text-[var(--ct-text-faint)] text-xs font-body line-clamp-2 mt-2 leading-relaxed">{synopsis}</p>}
      </div>
      <div className="hidden md:flex flex-col items-end justify-center gap-1 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-[var(--ct-text-muted)] text-xs">
          <Eye className="w-3.5 h-3.5" />
          <span className="font-mono">{film.viewCount?.toLocaleString()}</span>
        </div>
      </div>
    </motion.a>
  );
}
