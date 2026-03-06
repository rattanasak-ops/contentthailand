"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Film,
  Tv,
  User,
  Building2,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Clapperboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SearchBar } from "@/components/shared/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";

/* ──────────────────────── Types ──────────────────────── */

type TabType = "all" | "films" | "series" | "persons" | "companies";
type SortType = "relevance" | "year" | "name";
type ContentType = "films" | "series" | "persons" | "companies";

interface SearchResultData {
  films: Array<{
    id: number;
    slug: string;
    titleTh: string;
    titleEn: string;
    year: number;
    posterUrl?: string | null;
    _highlightTh: string;
    _highlightEn: string;
    synopsisTh?: string;
    synopsisEn?: string;
  }>;
  series: Array<{
    id: number;
    slug: string;
    titleTh: string;
    titleEn: string;
    year: number;
    coverUrl?: string | null;
    _highlightTh: string;
    _highlightEn: string;
    channel?: string;
  }>;
  persons: Array<{
    id: number;
    slug: string;
    nameTh: string;
    nameEn: string;
    roles: string[];
    photoUrl?: string | null;
    _highlightTh: string;
    _highlightEn: string;
  }>;
  companies: Array<{
    id: number;
    slug: string;
    nameTh: string;
    nameEn: string;
    logoUrl?: string | null;
    _highlightTh: string;
    _highlightEn: string;
    type?: string;
  }>;
  total: number;
}

interface Genre {
  id: string;
  th: string;
  en: string;
}

/* ──────────────────────── Constants ──────────────────────── */

const genres: Genre[] = [
  { id: "drama", th: "ดราม่า", en: "Drama" },
  { id: "action", th: "แอ็กชัน", en: "Action" },
  { id: "comedy", th: "ตลก", en: "Comedy" },
  { id: "horror", th: "สยองขวัญ", en: "Horror" },
  { id: "romance", th: "โรแมนซ์", en: "Romance" },
  { id: "thriller", th: "ทริลเลอร์", en: "Thriller" },
  { id: "documentary", th: "สารคดี", en: "Documentary" },
  { id: "animation", th: "แอนิเมชัน", en: "Animation" },
];

const yearRange = [2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;
const thaiYearOffset = 543;

const contentTypes: { key: ContentType; th: string; en: string; icon: typeof Film }[] = [
  { key: "films", th: "ภาพยนตร์", en: "Films", icon: Film },
  { key: "series", th: "ละคร", en: "Series", icon: Tv },
  { key: "persons", th: "บุคลากร", en: "Persons", icon: User },
  { key: "companies", th: "บริษัท", en: "Companies", icon: Building2 },
];

const sortOptions: { key: SortType; th: string; en: string }[] = [
  { key: "relevance", th: "ความเกี่ยวข้อง", en: "Relevance" },
  { key: "year", th: "ปี", en: "Year" },
  { key: "name", th: "ชื่อ", en: "Name" },
];

/* ──────────────────────── Animations ──────────────────────── */

const fadeSlideUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const filterPanelVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
};

/* ──────────────────────── Main ──────────────────────── */

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang } = useLanguage();
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<TabType>("all");

  // Advanced filters
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContentTypes, setSelectedContentTypes] = useState<ContentType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState<number>(2020);
  const [yearTo, setYearTo] = useState<number>(2026);
  const [sortBy, setSortBy] = useState<SortType>("relevance");

  const activeFilterCount =
    selectedContentTypes.length + selectedGenres.length + (sortBy !== "relevance" ? 1 : 0) + (yearFrom !== 2020 || yearTo !== 2026 ? 1 : 0);

  useEffect(() => {
    if (!q) {
      setResults(null);
      return;
    }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}&type=${tab}`)
      .then((r) => r.json())
      .then((data: SearchResultData) => setResults(data))
      .finally(() => setLoading(false));
  }, [q, tab]);

  const toggleContentType = useCallback((key: ContentType) => {
    setSelectedContentTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }, []);

  const toggleGenre = useCallback((id: string) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedContentTypes([]);
    setSelectedGenres([]);
    setYearFrom(2020);
    setYearTo(2026);
    setSortBy("relevance");
  }, []);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ค้นหา" : "Search" },
  ];

  const tabs: {
    key: TabType;
    labelTh: string;
    labelEn: string;
    icon: typeof Search;
    count: number;
  }[] = [
    { key: "all", labelTh: "ทั้งหมด", labelEn: "All", icon: Search, count: results?.total || 0 },
    { key: "films", labelTh: "ภาพยนตร์", labelEn: "Films", icon: Film, count: results?.films.length || 0 },
    { key: "series", labelTh: "ละคร", labelEn: "Series", icon: Tv, count: results?.series.length || 0 },
    { key: "persons", labelTh: "บุคลากร", labelEn: "Personnel", icon: User, count: results?.persons.length || 0 },
    { key: "companies", labelTh: "บริษัท", labelEn: "Companies", icon: Building2, count: results?.companies.length || 0 },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool pt-8 pb-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-purple/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[400px] bg-orange/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Breadcrumb items={breadcrumbs} />
        </motion.div>

        {/* Search input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 max-w-2xl"
        >
          <SearchBar variant="hero" />
        </motion.div>

        {/* Advanced Filters Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 max-w-2xl"
        >
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-thai transition-all duration-200 border border-[var(--ct-border)] hover:border-pink/30 hover:bg-[var(--ct-bg-hover)]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[var(--ct-text-muted)] group-hover:text-pink transition-colors" />
            <span className="text-[var(--ct-text-secondary)]">
              {lang === "th" ? "ตัวกรองขั้นสูง" : "Advanced Filters"}
            </span>
            {activeFilterCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-1 w-5 h-5 rounded-full bg-gradient-to-r from-pink to-orange text-white text-[10px] flex items-center justify-center font-bold"
              >
                {activeFilterCount}
              </motion.span>
            )}
            <motion.span
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto text-[var(--ct-text-faint)]"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </button>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                variants={filterPanelVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-5 rounded-xl bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] space-y-5">
                  {/* Content Type */}
                  <div>
                    <h3 className="text-xs font-thai font-semibold text-[var(--ct-text-muted)] uppercase tracking-wider mb-3">
                      {lang === "th" ? "ประเภทเนื้อหา" : "Content Type"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {contentTypes.map((ct, idx) => {
                        const selected = selectedContentTypes.includes(ct.key);
                        const IconComp = ct.icon;
                        return (
                          <motion.button
                            key={ct.key}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => toggleContentType(ct.key)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-thai transition-all duration-200 border ${
                              selected
                                ? "bg-gradient-to-r from-pink/20 to-orange/20 border-pink/40 text-pink shadow-[0_0_12px_rgba(236,28,114,0.15)]"
                                : "border-[var(--ct-border)] text-[var(--ct-text-muted)] hover:border-[var(--ct-border-hover)] hover:text-[var(--ct-text-secondary)]"
                            }`}
                          >
                            <IconComp className="w-3 h-3" />
                            {lang === "th" ? ct.th : ct.en}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Genre */}
                  <div>
                    <h3 className="text-xs font-thai font-semibold text-[var(--ct-text-muted)] uppercase tracking-wider mb-3">
                      {lang === "th" ? "ประเภทภาพยนตร์" : "Genre"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {genres.map((g, idx) => {
                        const selected = selectedGenres.includes(g.id);
                        return (
                          <motion.button
                            key={g.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.04 }}
                            onClick={() => toggleGenre(g.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-thai transition-all duration-200 border ${
                              selected
                                ? "bg-gradient-to-r from-orange/20 to-amber/20 border-orange/40 text-orange shadow-[0_0_12px_rgba(247,101,50,0.15)]"
                                : "border-[var(--ct-border)] text-[var(--ct-text-muted)] hover:border-[var(--ct-border-hover)] hover:text-[var(--ct-text-secondary)]"
                            }`}
                          >
                            {lang === "th" ? g.th : g.en}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Year Range + Sort */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Year Range */}
                    <div className="flex-1">
                      <h3 className="text-xs font-thai font-semibold text-[var(--ct-text-muted)] uppercase tracking-wider mb-3">
                        {lang === "th" ? "ช่วงปี" : "Year Range"}
                      </h3>
                      <div className="flex items-center gap-2">
                        <select
                          value={yearFrom}
                          onChange={(e) => setYearFrom(Number(e.target.value))}
                          className="flex-1 bg-[var(--ct-bg-surface)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-sm font-body text-[var(--ct-text-primary)] focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/20"
                        >
                          {yearRange.map((y) => (
                            <option key={y} value={y}>
                              {lang === "th" ? `${y + thaiYearOffset}` : `${y}`}
                            </option>
                          ))}
                        </select>
                        <span className="text-[var(--ct-text-faint)] text-xs">-</span>
                        <select
                          value={yearTo}
                          onChange={(e) => setYearTo(Number(e.target.value))}
                          className="flex-1 bg-[var(--ct-bg-surface)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-sm font-body text-[var(--ct-text-primary)] focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/20"
                        >
                          {yearRange.map((y) => (
                            <option key={y} value={y}>
                              {lang === "th" ? `${y + thaiYearOffset}` : `${y}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Sort */}
                    <div className="flex-1">
                      <h3 className="text-xs font-thai font-semibold text-[var(--ct-text-muted)] uppercase tracking-wider mb-3">
                        <ArrowUpDown className="w-3 h-3 inline mr-1" />
                        {lang === "th" ? "จัดเรียง" : "Sort By"}
                      </h3>
                      <div className="flex gap-2">
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setSortBy(opt.key)}
                            className={`px-3 py-2 rounded-lg text-xs font-thai transition-all duration-200 border ${
                              sortBy === opt.key
                                ? "bg-purple/20 border-purple/40 text-purple-light shadow-[0_0_10px_rgba(112,40,116,0.15)]"
                                : "border-[var(--ct-border)] text-[var(--ct-text-muted)] hover:border-[var(--ct-border-hover)]"
                            }`}
                          >
                            {lang === "th" ? opt.th : opt.en}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clear button */}
                  {activeFilterCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pt-2 border-t border-[var(--ct-border)]"
                    >
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-1.5 text-xs font-thai text-[var(--ct-text-muted)] hover:text-pink transition-colors"
                      >
                        <X className="w-3 h-3" />
                        {lang === "th" ? "ล้างตัวกรองทั้งหมด" : "Clear all filters"}
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {q && (
          <>
            {/* Title */}
            <motion.div
              {...fadeSlideUp}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-6"
            >
              <h1 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">
                {lang === "th"
                  ? `ผลการค้นหา: "${q}"`
                  : `Search results: "${q}"`}
                {results && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[var(--ct-text-muted)] font-normal text-base ml-2"
                  >
                    ({results.total} {lang === "th" ? "รายการ" : "results"})
                  </motion.span>
                )}
              </h1>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex gap-1 mb-8 overflow-x-auto pb-1 relative"
            >
              {tabs.map((t) => {
                const IconComp = t.icon;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-thai whitespace-nowrap transition-all duration-200 ${
                      tab === t.key
                        ? "text-pink"
                        : "text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] hover:bg-[var(--ct-bg-hover)]"
                    }`}
                  >
                    {tab === t.key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-pink/15 rounded-lg"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <IconComp className="w-3.5 h-3.5" />
                      {lang === "th" ? t.labelTh : t.labelEn}
                      {t.count > 0 && (
                        <span className="text-[10px] bg-[var(--ct-bg-hover)] px-1.5 py-0.5 rounded-full">
                          {t.count}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  {/* Cinematic spinner */}
                  <div className="relative w-16 h-16 mx-auto mb-6">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink border-r-purple"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full border-2 border-transparent border-b-orange border-l-amber"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Clapperboard className="w-5 h-5 text-pink/60" />
                    </div>
                  </div>
                  <p className="text-[var(--ct-text-muted)] font-thai text-sm">
                    {lang === "th" ? "กำลังค้นหา..." : "Searching..."}
                  </p>
                </motion.div>
              ) : results && results.total === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Search className="w-14 h-14 text-[var(--ct-text-faint)] mx-auto mb-4" />
                  </motion.div>
                  <p className="text-[var(--ct-text-muted)] font-thai text-lg mb-2">
                    {lang === "th"
                      ? `ไม่พบ "${q}"`
                      : `No results for "${q}"`}
                  </p>
                  <p className="text-[var(--ct-text-faint)] font-thai text-sm max-w-md mx-auto">
                    {lang === "th"
                      ? "ลองค้นหาด้วยคำอื่น หรือปรับตัวกรองใหม่"
                      : "Try a different search term or adjust your filters"}
                  </p>
                </motion.div>
              ) : results ? (
                <motion.div
                  key="results"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="space-y-8"
                >
                  {/* Films */}
                  {results.films.length > 0 && (tab === "all" || tab === "films") && (
                    <ResultSection
                      icon={<Film className="w-4 h-4" />}
                      title={lang === "th" ? "ภาพยนตร์" : "Films"}
                      count={results.films.length}
                      accentClass="text-pink"
                    >
                      {results.films.map((f, idx) => (
                        <motion.div key={f.id} variants={staggerItem} transition={{ duration: 0.3 }}>
                          <Link
                            href={`/films/${f.slug}`}
                            className="group flex gap-3 p-3 rounded-lg hover:bg-[var(--ct-bg-hover)] transition-all duration-200 hover:translate-x-1"
                          >
                            <div className="w-12 h-16 flex-shrink-0 rounded bg-gradient-to-br from-purple/30 to-[var(--ct-bg-page)] overflow-hidden relative">
                              {f.posterUrl ? (
                                <Image src={f.posterUrl} alt="" fill className="object-cover" sizes="48px" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Film className="w-4 h-4 text-[var(--ct-text-faint)]" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3
                                className="font-thai text-sm text-[var(--ct-text-primary)] group-hover:text-pink transition-colors truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
                                dangerouslySetInnerHTML={{
                                  __html: lang === "th" ? f._highlightTh : f._highlightEn,
                                }}
                              />
                              <p className="text-[var(--ct-text-faint)] text-xs font-body">
                                {lang === "th" ? f.titleEn : f.titleTh} ({f.year})
                              </p>
                              {f.synopsisTh && idx < 3 && (
                                <p className="text-[var(--ct-text-muted)] text-xs font-body mt-1 line-clamp-1">
                                  {lang === "th" ? f.synopsisTh : f.synopsisEn}
                                </p>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </ResultSection>
                  )}

                  {/* Series */}
                  {results.series.length > 0 && (tab === "all" || tab === "series") && (
                    <ResultSection
                      icon={<Tv className="w-4 h-4" />}
                      title={lang === "th" ? "ละครโทรทัศน์" : "TV Series"}
                      count={results.series.length}
                      accentClass="text-orange"
                    >
                      {results.series.map((s) => (
                        <motion.div key={s.id} variants={staggerItem} transition={{ duration: 0.3 }}>
                          <Link
                            href={`/series/${s.slug}`}
                            className="group flex gap-3 p-3 rounded-lg hover:bg-[var(--ct-bg-hover)] transition-all duration-200 hover:translate-x-1"
                          >
                            <div className="w-12 h-16 flex-shrink-0 rounded bg-gradient-to-br from-orange/20 to-[var(--ct-bg-page)] overflow-hidden relative">
                              {s.coverUrl ? (
                                <Image src={s.coverUrl} alt="" fill className="object-cover" sizes="48px" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Tv className="w-4 h-4 text-[var(--ct-text-faint)]" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3
                                className="font-thai text-sm text-[var(--ct-text-primary)] group-hover:text-orange transition-colors truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
                                dangerouslySetInnerHTML={{
                                  __html: lang === "th" ? s._highlightTh : s._highlightEn,
                                }}
                              />
                              <p className="text-[var(--ct-text-faint)] text-xs font-body">
                                {lang === "th" ? s.titleEn : s.titleTh} ({s.year})
                                {s.channel && ` \u2022 ${s.channel}`}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </ResultSection>
                  )}

                  {/* Persons */}
                  {results.persons.length > 0 && (tab === "all" || tab === "persons") && (
                    <ResultSection
                      icon={<User className="w-4 h-4" />}
                      title={lang === "th" ? "บุคลากร" : "Personnel"}
                      count={results.persons.length}
                      accentClass="text-amber"
                    >
                      {results.persons.map((p) => (
                        <motion.div key={p.id} variants={staggerItem} transition={{ duration: 0.3 }}>
                          <Link
                            href={`/persons/${p.slug}`}
                            className="group flex gap-3 p-3 rounded-lg hover:bg-[var(--ct-bg-hover)] transition-all duration-200 hover:translate-x-1"
                          >
                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-amber/20 to-[var(--ct-bg-page)] overflow-hidden relative">
                              {p.photoUrl ? (
                                <Image src={p.photoUrl} alt="" fill className="object-cover" sizes="48px" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-[var(--ct-text-faint)]" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3
                                className="font-thai text-sm text-[var(--ct-text-primary)] group-hover:text-amber transition-colors truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
                                dangerouslySetInnerHTML={{
                                  __html: lang === "th" ? p._highlightTh : p._highlightEn,
                                }}
                              />
                              <p className="text-[var(--ct-text-faint)] text-xs font-body">
                                {p.roles.join(", ")}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </ResultSection>
                  )}

                  {/* Companies */}
                  {results.companies.length > 0 && (tab === "all" || tab === "companies") && (
                    <ResultSection
                      icon={<Building2 className="w-4 h-4" />}
                      title={lang === "th" ? "บริษัท" : "Companies"}
                      count={results.companies.length}
                      accentClass="text-purple-light"
                    >
                      {results.companies.map((c) => (
                        <motion.div key={c.id} variants={staggerItem} transition={{ duration: 0.3 }}>
                          <Link
                            href={`/companies/${c.slug}`}
                            className="group flex gap-3 p-3 rounded-lg hover:bg-[var(--ct-bg-hover)] transition-all duration-200 hover:translate-x-1"
                          >
                            <div className="w-12 h-12 flex-shrink-0 rounded bg-gradient-to-br from-purple/30 to-[var(--ct-bg-page)] overflow-hidden relative">
                              {c.logoUrl ? (
                                <Image src={c.logoUrl} alt="" fill className="object-contain p-1" sizes="48px" unoptimized={c.logoUrl.startsWith("http")} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Building2 className="w-4 h-4 text-[var(--ct-text-faint)]" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3
                                className="font-thai text-sm text-[var(--ct-text-primary)] group-hover:text-purple-light transition-colors truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
                                dangerouslySetInnerHTML={{
                                  __html: lang === "th" ? c._highlightTh : c._highlightEn,
                                }}
                              />
                              <p className="text-[var(--ct-text-faint)] text-xs font-body">
                                {lang === "th" ? c.nameEn : c.nameTh}
                                {c.type && ` \u2022 ${c.type}`}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </ResultSection>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </>
        )}

        {/* No query state */}
        {!q && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative inline-block mb-8"
            >
              <div className="relative">
                <Search className="w-16 h-16 text-[var(--ct-text-faint)]" />
                {/* Pulsing ring */}
                <motion.div
                  className="absolute -inset-3 rounded-full border border-pink/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -inset-6 rounded-full border border-purple/10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </div>
            </motion.div>

            <h2 className="text-[var(--ct-text-secondary)] font-thai text-xl mb-3">
              {lang === "th" ? "ค้นหาฐานข้อมูลภาพยนตร์ไทย" : "Search the Thai Film Database"}
            </h2>
            <p className="text-[var(--ct-text-faint)] font-thai text-sm mb-8 max-w-md mx-auto">
              {lang === "th"
                ? "พิมพ์ชื่อภาพยนตร์ ละคร ผู้กำกับ นักแสดง หรือบริษัทผลิต"
                : "Search for films, series, directors, actors, or production companies"}
            </p>

            {/* Quick search suggestions */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
              {[
                { th: "พี่มาก..พระโขนง", en: "Pee Mak" },
                { th: "ต้มยำกุ้ง", en: "Tom Yum Goong" },
                { th: "บุพเพสันนิวาส", en: "Love Destiny" },
                { th: "GDH 559", en: "GDH 559" },
                { th: "โทนี่ จา", en: "Tony Jaa" },
              ].map((suggestion, idx) => (
                <motion.button
                  key={suggestion.en}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.08 }}
                  onClick={() => router.push(`/search?q=${encodeURIComponent(lang === "th" ? suggestion.th : suggestion.en)}`)}
                  className="px-3 py-1.5 rounded-full text-xs font-thai border border-[var(--ct-border)] text-[var(--ct-text-muted)] hover:border-pink/30 hover:text-pink hover:bg-pink/5 transition-all duration-200"
                >
                  {lang === "th" ? suggestion.th : suggestion.en}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────── Result Section ──────────────────────── */

function ResultSection({
  icon,
  title,
  count,
  accentClass,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  accentClass: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={staggerItem}>
      <div className="flex items-center gap-2 mb-3">
        <span className={accentClass}>{icon}</span>
        <h2 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm">
          {title}{" "}
          <span className="text-[var(--ct-text-faint)] font-normal">({count})</span>
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--ct-border)] to-transparent" />
      </div>
      <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] divide-y divide-[var(--ct-border)] overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

/* ──────────────────────── Export ──────────────────────── */

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
