"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Film, Tv, User, Building2 } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SearchBar } from "@/components/shared/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";

type TabType = "all" | "films" | "series" | "persons" | "companies";

interface SearchResultData {
  films: Array<{ id: number; slug: string; titleTh: string; titleEn: string; year: number; _highlightTh: string; _highlightEn: string; synopsisTh?: string; synopsisEn?: string }>;
  series: Array<{ id: number; slug: string; titleTh: string; titleEn: string; year: number; _highlightTh: string; _highlightEn: string; channel?: string }>;
  persons: Array<{ id: number; slug: string; nameTh: string; nameEn: string; roles: string[]; _highlightTh: string; _highlightEn: string }>;
  companies: Array<{ id: number; slug: string; nameTh: string; nameEn: string; _highlightTh: string; _highlightEn: string; type?: string }>;
  total: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<TabType>("all");

  useEffect(() => {
    if (!q) {
      setResults(null);
      return;
    }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}&type=${tab}`)
      .then((r) => r.json())
      .then((data) => setResults(data))
      .finally(() => setLoading(false));
  }, [q, tab]);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ค้นหา" : "Search" },
  ];

  const tabs: { key: TabType; labelTh: string; labelEn: string; icon: React.ReactNode; count: number }[] = [
    { key: "all", labelTh: "ทั้งหมด", labelEn: "All", icon: <Search className="w-3.5 h-3.5" />, count: results?.total || 0 },
    { key: "films", labelTh: "ภาพยนตร์", labelEn: "Films", icon: <Film className="w-3.5 h-3.5" />, count: results?.films.length || 0 },
    { key: "series", labelTh: "ละคร", labelEn: "Series", icon: <Tv className="w-3.5 h-3.5" />, count: results?.series.length || 0 },
    { key: "persons", labelTh: "บุคลากร", labelEn: "Personnel", icon: <User className="w-3.5 h-3.5" />, count: results?.persons.length || 0 },
    { key: "companies", labelTh: "บริษัท", labelEn: "Companies", icon: <Building2 className="w-3.5 h-3.5" />, count: results?.companies.length || 0 },
  ];

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Search input */}
        <div className="mb-8 max-w-2xl">
          <SearchBar variant="hero" />
        </div>

        {q && (
          <>
            {/* Title */}
            <div className="mb-6">
              <h1 className="font-thai font-bold text-xl text-white">
                {lang === "th"
                  ? `ผลการค้นหา: "${q}"`
                  : `Search results: "${q}"`}
                {results && (
                  <span className="text-white/40 font-normal text-base ml-2">
                    ({results.total} {lang === "th" ? "รายการ" : "results"})
                  </span>
                )}
              </h1>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-thai whitespace-nowrap transition-colors ${
                    tab === t.key
                      ? "bg-pink/20 text-pink"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t.icon}
                  {lang === "th" ? t.labelTh : t.labelEn}
                  {t.count > 0 && (
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Results */}
            {loading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 border-2 border-pink/30 border-t-pink rounded-full animate-spin mx-auto" />
              </div>
            ) : results && results.total === 0 ? (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-thai text-lg mb-2">
                  {lang === "th"
                    ? `ไม่พบ '${q}'`
                    : `No results for '${q}'`}
                </p>
                <p className="text-white/25 font-thai text-sm">
                  {lang === "th"
                    ? "ลองค้นหาด้วยคำอื่น"
                    : "Try a different search term"}
                </p>
              </div>
            ) : results ? (
              <div className="space-y-8">
                {/* Films */}
                {results.films.length > 0 && (tab === "all" || tab === "films") && (
                  <ResultSection
                    icon={<Film className="w-4 h-4" />}
                    title={lang === "th" ? "ภาพยนตร์" : "Films"}
                    count={results.films.length}
                  >
                    {results.films.map((f) => (
                      <Link
                        key={f.id}
                        href={`/films/${f.slug}`}
                        className="group flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="w-12 h-16 flex-shrink-0 rounded bg-gradient-to-br from-purple/30 to-midnight flex items-center justify-center">
                          <Film className="w-4 h-4 text-white/20" />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className="font-thai text-sm text-white group-hover:text-pink transition-colors truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
                            dangerouslySetInnerHTML={{
                              __html: lang === "th" ? f._highlightTh : f._highlightEn,
                            }}
                          />
                          <p className="text-white/30 text-xs font-body">
                            {lang === "th" ? f.titleEn : f.titleTh} ({f.year})
                          </p>
                        </div>
                      </Link>
                    ))}
                  </ResultSection>
                )}

                {/* Series */}
                {results.series.length > 0 && (tab === "all" || tab === "series") && (
                  <ResultSection
                    icon={<Tv className="w-4 h-4" />}
                    title={lang === "th" ? "ละครโทรทัศน์" : "TV Series"}
                    count={results.series.length}
                  >
                    {results.series.map((s) => (
                      <Link
                        key={s.id}
                        href={`/series/${s.slug}`}
                        className="group flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="w-12 h-16 flex-shrink-0 rounded bg-gradient-to-br from-purple/30 to-midnight flex items-center justify-center">
                          <Tv className="w-4 h-4 text-white/20" />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className="font-thai text-sm text-white group-hover:text-orange transition-colors truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
                            dangerouslySetInnerHTML={{
                              __html: lang === "th" ? s._highlightTh : s._highlightEn,
                            }}
                          />
                          <p className="text-white/30 text-xs font-body">
                            {lang === "th" ? s.titleEn : s.titleTh} ({s.year})
                          </p>
                        </div>
                      </Link>
                    ))}
                  </ResultSection>
                )}

                {/* Persons */}
                {results.persons.length > 0 && (tab === "all" || tab === "persons") && (
                  <ResultSection
                    icon={<User className="w-4 h-4" />}
                    title={lang === "th" ? "บุคลากร" : "Personnel"}
                    count={results.persons.length}
                  >
                    {results.persons.map((p) => (
                      <Link
                        key={p.id}
                        href={`/persons/${p.slug}`}
                        className="group flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-purple/30 to-midnight flex items-center justify-center">
                          <User className="w-4 h-4 text-white/20" />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className="font-thai text-sm text-white group-hover:text-pink transition-colors truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
                            dangerouslySetInnerHTML={{
                              __html: lang === "th" ? p._highlightTh : p._highlightEn,
                            }}
                          />
                          <p className="text-white/30 text-xs font-body">
                            {p.roles.join(", ")}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </ResultSection>
                )}

                {/* Companies */}
                {results.companies.length > 0 && (tab === "all" || tab === "companies") && (
                  <ResultSection
                    icon={<Building2 className="w-4 h-4" />}
                    title={lang === "th" ? "บริษัท" : "Companies"}
                    count={results.companies.length}
                  >
                    {results.companies.map((c) => (
                      <Link
                        key={c.id}
                        href={`/companies/${c.slug}`}
                        className="group flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="w-12 h-12 flex-shrink-0 rounded bg-gradient-to-br from-purple/30 to-midnight flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-white/20" />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className="font-thai text-sm text-white group-hover:text-pink transition-colors truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
                            dangerouslySetInnerHTML={{
                              __html: lang === "th" ? c._highlightTh : c._highlightEn,
                            }}
                          />
                          <p className="text-white/30 text-xs font-body">
                            {lang === "th" ? c.nameEn : c.nameTh}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </ResultSection>
                )}
              </div>
            ) : null}
          </>
        )}

        {/* No query state */}
        {!q && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <h2 className="text-white/50 font-thai text-xl mb-2">
              {lang === "th" ? "ค้นหาข้อมูล" : "Search the database"}
            </h2>
            <p className="text-white/30 font-thai text-sm">
              {lang === "th"
                ? "พิมพ์ชื่อภาพยนตร์ ละคร บุคลากร หรือบริษัท"
                : "Search for films, series, people, or companies"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultSection({
  icon,
  title,
  count,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-pink">{icon}</span>
        <h2 className="font-thai font-semibold text-white text-sm">
          {title}{" "}
          <span className="text-white/30 font-normal">({count})</span>
        </h2>
      </div>
      <div className="bg-navy/40 rounded-xl border border-white/5 divide-y divide-white/5">
        {children}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
