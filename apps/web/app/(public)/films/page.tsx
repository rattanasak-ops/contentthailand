"use client";

import { useState, useMemo } from "react";
import { Grid3x3, List } from "lucide-react";
import { FilmCardGrid } from "@/components/films/FilmCardGrid";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = [...films];

    if (selectedGenre !== "all") {
      result = result.filter((f) =>
        f.genres.some((g) => g.slug === selectedGenre)
      );
    }

    if (selectedYear !== "all") {
      result = result.filter((f) => f.year === parseInt(selectedYear));
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "title-az":
        result.sort((a, b) =>
          (lang === "th" ? a.titleTh : a.titleEn).localeCompare(
            lang === "th" ? b.titleTh : b.titleEn,
            lang === "th" ? "th" : "en"
          )
        );
        break;
      case "title-za":
        result.sort((a, b) =>
          (lang === "th" ? b.titleTh : b.titleEn).localeCompare(
            lang === "th" ? a.titleTh : a.titleEn,
            lang === "th" ? "th" : "en"
          )
        );
        break;
      case "popular":
        result.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }

    return result;
  }, [selectedGenre, selectedYear, sort, lang]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ภาพยนตร์" : "Films" },
  ];

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Header */}
        <div className="mb-8">
          <FilmStrip color="pink" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-white">
              {lang === "th" ? "ฐานข้อมูลภาพยนตร์" : "Film Database"}
            </h1>
          </FilmStrip>
          <p className="text-white/50 text-sm font-thai mt-3 ml-1">
            {lang === "th"
              ? `แสดง ${(page - 1) * ITEMS_PER_PAGE + 1}-${Math.min(page * ITEMS_PER_PAGE, filtered.length)} จาก ${filtered.length} เรื่อง`
              : `Showing ${(page - 1) * ITEMS_PER_PAGE + 1}-${Math.min(page * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} films`}
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Genre filter */}
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setPage(1);
            }}
            className="bg-navy border border-white/10 text-white/80 text-sm rounded-lg px-3 py-2 font-thai focus:border-pink/50 focus:outline-none"
          >
            <option value="all">
              {lang === "th" ? "ทุกประเภท" : "All Genres"}
            </option>
            {genres.map((g) => (
              <option key={g.slug} value={g.slug}>
                {lang === "th" ? g.nameTh : g.nameEn}
              </option>
            ))}
          </select>

          {/* Year filter */}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setPage(1);
            }}
            className="bg-navy border border-white/10 text-white/80 text-sm rounded-lg px-3 py-2 font-thai focus:border-pink/50 focus:outline-none"
          >
            <option value="all">
              {lang === "th" ? "ทุกปี" : "All Years"}
            </option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-navy border border-white/10 text-white/80 text-sm rounded-lg px-3 py-2 font-thai focus:border-pink/50 focus:outline-none"
          >
            <option value="newest">
              {lang === "th" ? "ใหม่สุด" : "Newest"}
            </option>
            <option value="oldest">
              {lang === "th" ? "เก่าสุด" : "Oldest"}
            </option>
            <option value="title-az">
              {lang === "th" ? "ชื่อ ก-ฮ" : "Title A-Z"}
            </option>
            <option value="title-za">
              {lang === "th" ? "ชื่อ ฮ-ก" : "Title Z-A"}
            </option>
            <option value="popular">
              {lang === "th" ? "ยอดนิยม" : "Popular"}
            </option>
          </select>

          {/* Spacer */}
          <div className="flex-1" />

          {/* View mode toggle */}
          <div className="flex items-center bg-navy rounded-lg border border-white/10 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-pink/20 text-pink" : "text-white/40 hover:text-white"}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-pink/20 text-pink" : "text-white/40 hover:text-white"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Film grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {paginated.map((film) => (
              <FilmCardGrid key={film.id} film={film} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {paginated.map((film) => (
              <FilmListItem key={film.id} film={film} lang={lang} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 font-thai text-lg">
              {lang === "th"
                ? "ไม่พบภาพยนตร์ตามเงื่อนไขที่เลือก"
                : "No films found matching your criteria"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 bg-navy border border-white/10 text-white/60 text-sm rounded-lg disabled:opacity-30 hover:border-pink/30 hover:text-white transition-colors font-thai"
            >
              {lang === "th" ? "ก่อนหน้า" : "Previous"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 text-sm rounded-lg transition-colors font-thai ${
                  p === page
                    ? "bg-pink text-white"
                    : "bg-navy border border-white/10 text-white/50 hover:border-pink/30 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 bg-navy border border-white/10 text-white/60 text-sm rounded-lg disabled:opacity-30 hover:border-pink/30 hover:text-white transition-colors font-thai"
            >
              {lang === "th" ? "ถัดไป" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilmListItem({ film, lang }: { film: (typeof films)[0]; lang: string }) {
  const title = lang === "th" ? film.titleTh : film.titleEn;
  const subtitle = lang === "th" ? film.titleEn : film.titleTh;
  const synopsis = lang === "th" ? film.synopsisTh : film.synopsisEn;

  return (
    <a
      href={`/films/${film.slug}`}
      className="group flex gap-4 bg-navy/60 rounded-xl border border-white/5 p-3 hover:border-pink/30 transition-all"
    >
      {/* Poster mini */}
      <div className="w-16 h-24 flex-shrink-0 rounded-lg bg-gradient-to-br from-purple/30 to-midnight flex items-center justify-center overflow-hidden">
        <span className="text-white/15 font-display text-2xl font-bold">
          {title.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-thai font-semibold text-sm text-white truncate group-hover:text-pink transition-colors">
          {title}
        </h3>
        <p className="text-white/40 text-xs font-body">{subtitle}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="px-1.5 py-0.5 bg-amber/20 text-amber text-[10px] rounded font-bold">
            {film.year}
          </span>
          {film.duration && (
            <span className="text-white/30 text-[10px] font-thai">
              {film.duration} {lang === "th" ? "นาที" : "min"}
            </span>
          )}
          {film.genres.slice(0, 2).map((g) => (
            <span
              key={g.slug}
              className="text-white/30 text-[10px] font-thai"
            >
              {lang === "th" ? g.nameTh : g.nameEn}
            </span>
          ))}
        </div>
        {synopsis && (
          <p className="text-white/30 text-xs font-body line-clamp-1 mt-1.5">
            {synopsis}
          </p>
        )}
      </div>
    </a>
  );
}
