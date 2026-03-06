"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Film, Tv, User, Building2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchResult {
  films: Array<{ id: number; slug: string; titleTh: string; titleEn: string; year: number; _highlightTh: string; _highlightEn: string }>;
  series: Array<{ id: number; slug: string; titleTh: string; titleEn: string; year: number; _highlightTh: string; _highlightEn: string }>;
  persons: Array<{ id: number; slug: string; nameTh: string; nameEn: string; roles: string[]; _highlightTh: string; _highlightEn: string }>;
  companies: Array<{ id: number; slug: string; nameTh: string; nameEn: string; _highlightTh: string; _highlightEn: string }>;
  total: number;
}

interface SearchBarProps {
  variant?: "hero" | "navbar";
  onClose?: () => void;
}

export function SearchBar({ variant = "navbar", onClose }: SearchBarProps) {
  const { lang } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch results
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 1) {
      setResults(null);
      setOpen(false);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((data: SearchResult) => {
        setResults(data);
        setOpen(true);
        setActiveIndex(-1);
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Build flat list for keyboard nav
  const flatItems = useMemo(
    () =>
      results
        ? [
            ...results.films.map((f) => ({ type: "film" as const, href: `/films/${f.slug}`, label: lang === "th" ? f.titleTh : f.titleEn })),
            ...results.series.map((s) => ({ type: "series" as const, href: `/series/${s.slug}`, label: lang === "th" ? s.titleTh : s.titleEn })),
            ...results.persons.map((p) => ({ type: "person" as const, href: `/persons/${p.slug}`, label: lang === "th" ? p.nameTh : p.nameEn })),
            ...results.companies.map((c) => ({ type: "company" as const, href: `/companies/${c.slug}`, label: lang === "th" ? c.nameTh : c.nameEn })),
          ].slice(0, 8)
        : [],
    [results, lang]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && flatItems[activeIndex]) {
          router.push(flatItems[activeIndex].href);
          setOpen(false);
          onClose?.();
        } else if (query) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
          setOpen(false);
          onClose?.();
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    },
    [activeIndex, flatItems, query, router, onClose]
  );

  const goToResult = (href: string) => {
    router.push(href);
    setOpen(false);
    setQuery("");
    onClose?.();
  };

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ct-text-muted)] ${isHero ? "w-5 h-5" : "w-4 h-4"}`} />
        {loading && (
          <Loader2 className={`absolute right-3 top-1/2 -translate-y-1/2 text-pink animate-spin ${isHero ? "w-5 h-5" : "w-4 h-4"}`} />
        )}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results && results.total > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={lang === "th" ? "ค้นหาภาพยนตร์ ละคร บุคลากร..." : "Search films, series, people..."}
          className={`w-full bg-[var(--ct-bg-elevated)] backdrop-blur-sm border border-[var(--ct-border)] text-[var(--ct-text-primary)] placeholder:text-[var(--ct-text-muted)] font-body focus:outline-none focus:border-pink/50 focus:ring-2 focus:ring-pink/20 transition-all ${
            isHero
              ? "pl-12 pr-12 py-4 text-base rounded-xl"
              : "pl-9 pr-9 py-2 text-sm rounded-lg"
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && results && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] rounded-xl shadow-[var(--ct-shadow)] overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {results.total === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-[var(--ct-text-muted)] font-thai text-sm">
                {lang === "th"
                  ? `ไม่พบ '${query}' — ลองค้นหาด้วยคำอื่น`
                  : `No results for '${query}' — try a different term`}
              </p>
            </div>
          ) : (
            <>
              {/* Films */}
              {results.films.length > 0 && (
                <ResultGroup
                  icon={<Film className="w-3.5 h-3.5" />}
                  label={lang === "th" ? "ภาพยนตร์" : "Films"}
                >
                  {results.films.slice(0, 3).map((f, i) => {
                    const globalIdx = i;
                    return (
                      <ResultItem
                        key={f.id}
                        active={activeIndex === globalIdx}
                        onClick={() => goToResult(`/films/${f.slug}`)}
                        html={lang === "th" ? f._highlightTh : f._highlightEn}
                        sub={`${f.year}`}
                      />
                    );
                  })}
                </ResultGroup>
              )}

              {/* Series */}
              {results.series.length > 0 && (
                <ResultGroup
                  icon={<Tv className="w-3.5 h-3.5" />}
                  label={lang === "th" ? "ละครโทรทัศน์" : "TV Series"}
                >
                  {results.series.slice(0, 3).map((s, i) => {
                    const globalIdx = results.films.slice(0, 3).length + i;
                    return (
                      <ResultItem
                        key={s.id}
                        active={activeIndex === globalIdx}
                        onClick={() => goToResult(`/series/${s.slug}`)}
                        html={lang === "th" ? s._highlightTh : s._highlightEn}
                        sub={`${s.year}`}
                      />
                    );
                  })}
                </ResultGroup>
              )}

              {/* Persons */}
              {results.persons.length > 0 && (
                <ResultGroup
                  icon={<User className="w-3.5 h-3.5" />}
                  label={lang === "th" ? "บุคลากร" : "Personnel"}
                >
                  {results.persons.slice(0, 3).map((p, i) => {
                    const globalIdx =
                      results.films.slice(0, 3).length +
                      results.series.slice(0, 3).length +
                      i;
                    return (
                      <ResultItem
                        key={p.id}
                        active={activeIndex === globalIdx}
                        onClick={() => goToResult(`/persons/${p.slug}`)}
                        html={lang === "th" ? p._highlightTh : p._highlightEn}
                        sub={p.roles.join(", ")}
                      />
                    );
                  })}
                </ResultGroup>
              )}

              {/* Companies */}
              {results.companies.length > 0 && (
                <ResultGroup
                  icon={<Building2 className="w-3.5 h-3.5" />}
                  label={lang === "th" ? "บริษัท" : "Companies"}
                >
                  {results.companies.slice(0, 2).map((c, i) => {
                    const globalIdx =
                      results.films.slice(0, 3).length +
                      results.series.slice(0, 3).length +
                      results.persons.slice(0, 3).length +
                      i;
                    return (
                      <ResultItem
                        key={c.id}
                        active={activeIndex === globalIdx}
                        onClick={() => goToResult(`/companies/${c.slug}`)}
                        html={lang === "th" ? c._highlightTh : c._highlightEn}
                        sub=""
                      />
                    );
                  })}
                </ResultGroup>
              )}

              {/* Footer */}
              <button
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(query)}`);
                  setOpen(false);
                  onClose?.();
                }}
                className="w-full px-4 py-3 text-center text-sm font-thai text-pink hover:bg-[var(--ct-bg-hover)] transition-colors border-t border-[var(--ct-border)]"
              >
                {lang === "th"
                  ? `ดูผลทั้งหมด ${results.total} รายการ →`
                  : `View all ${results.total} results →`}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ResultGroup({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--ct-bg-hover)] border-b border-[var(--ct-border)]">
        <span className="text-pink">{icon}</span>
        <span className="text-[var(--ct-text-muted)] text-xs font-thai font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function ResultItem({
  active,
  onClick,
  html,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  html: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[var(--ct-bg-hover)] transition-colors ${
        active ? "bg-[var(--ct-bg-hover)]" : ""
      }`}
    >
      <span
        className="text-sm text-[var(--ct-text-primary)] font-thai truncate [&_mark]:bg-transparent [&_mark]:text-amber [&_mark]:font-bold"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {sub && <span className="text-[var(--ct-text-faint)] text-xs font-body ml-2 flex-shrink-0">{sub}</span>}
    </button>
  );
}
