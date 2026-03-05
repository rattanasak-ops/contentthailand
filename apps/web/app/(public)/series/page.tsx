"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { series } from "@/lib/mock-data/series";
import { genres } from "@/lib/mock-data/genres";

type SortOption = "newest" | "oldest" | "title-az" | "popular";

export default function SeriesPage() {
  const { lang } = useLanguage();
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");

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
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-8">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-white">
              {lang === "th" ? "ฐานข้อมูลละครโทรทัศน์" : "TV Series Database"}
            </h1>
          </FilmStrip>
          <p className="text-white/50 text-sm font-thai mt-3 ml-1">
            {filtered.length} {lang === "th" ? "เรื่อง" : "series"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="bg-navy border border-white/10 text-white/80 text-sm rounded-lg px-3 py-2 font-thai focus:border-orange/50 focus:outline-none">
            <option value="all">{lang === "th" ? "ทุกประเภท" : "All Genres"}</option>
            {genres.map((g) => <option key={g.slug} value={g.slug}>{lang === "th" ? g.nameTh : g.nameEn}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="bg-navy border border-white/10 text-white/80 text-sm rounded-lg px-3 py-2 font-thai focus:border-orange/50 focus:outline-none">
            <option value="newest">{lang === "th" ? "ใหม่สุด" : "Newest"}</option>
            <option value="oldest">{lang === "th" ? "เก่าสุด" : "Oldest"}</option>
            <option value="title-az">{lang === "th" ? "ชื่อ ก-ฮ" : "Title A-Z"}</option>
            <option value="popular">{lang === "th" ? "ยอดนิยม" : "Popular"}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => {
            const title = lang === "th" ? s.titleTh : s.titleEn;
            const synopsis = lang === "th" ? s.synopsisTh : s.synopsisEn;
            return (
              <Link key={s.id} href={`/series/${s.slug}`} className="group bg-navy/60 rounded-xl border border-white/5 overflow-hidden hover:border-orange/30 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-purple/20 to-midnight relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/10 font-display text-4xl font-bold">{title.charAt(0)}</span>
                  </div>
                  {s.channel && <div className="absolute top-2 left-2 px-2 py-0.5 bg-navy/80 text-white/70 text-[10px] rounded font-thai backdrop-blur-sm">{s.channel}</div>}
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber/90 text-midnight text-xs font-bold rounded-md">{s.year}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-thai font-semibold text-sm text-white truncate group-hover:text-orange transition-colors">{title}</h3>
                  <p className="text-white/40 text-xs font-body mt-0.5">{lang === "th" ? s.titleEn : s.titleTh}</p>
                  {synopsis && <p className="text-white/30 text-xs font-body line-clamp-2 mt-2">{synopsis}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    {s.episodes && <span className="text-white/30 text-[10px] font-thai">{s.episodes} {lang === "th" ? "ตอน" : "ep"}</span>}
                    {s.genres.slice(0, 2).map((g) => <span key={g.slug} className="text-white/20 text-[10px] font-thai">{lang === "th" ? g.nameTh : g.nameEn}</span>)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
