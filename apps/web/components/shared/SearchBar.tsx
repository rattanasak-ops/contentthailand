"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Film, Tv, User, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const placeholdersTh = [
  "ค้นหาภาพยนตร์ไทย...",
  "ค้นหาละครโทรทัศน์...",
  "ค้นหาผู้กำกับ นักแสดง...",
  "ค้นหาบริษัทผลิตภาพยนตร์...",
];
const placeholdersEn = [
  "Search Thai films...",
  "Search TV series...",
  "Search directors, actors...",
  "Search production companies...",
];

export function SearchBar({ variant = "navbar", onClose }: SearchBarProps) {
  const { lang } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focused, setFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect Mac on client only (avoids hydration mismatch)
  useEffect(() => {
    setIsMac(/Mac/.test(navigator.userAgent));
  }, []);

  // Cycle placeholder text
  useEffect(() => {
    if (query) return;
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % placeholdersTh.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [query]);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

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
  const currentPlaceholder = lang === "th" ? placeholdersTh[placeholderIdx] : placeholdersEn[placeholderIdx];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input */}
      <motion.div
        className="relative"
        animate={focused && isHero ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Glow ring on focus */}
        <AnimatePresence>
          {focused && isHero && (
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink via-purple to-orange opacity-30 blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ct-text-muted)] z-10 ${isHero ? "w-5 h-5" : "w-4 h-4"}`} />
        {loading ? (
          <Loader2 className={`absolute right-3 top-1/2 -translate-y-1/2 text-pink animate-spin z-10 ${isHero ? "w-5 h-5" : "w-4 h-4"}`} />
        ) : (
          !query && !focused && isHero && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--ct-bg-surface)] border border-[var(--ct-border)] text-[var(--ct-text-faint)] text-[10px] font-mono">
                {isMac ? "\u2318" : "Ctrl"}
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--ct-bg-surface)] border border-[var(--ct-border)] text-[var(--ct-text-faint)] text-[10px] font-mono">
                K
              </kbd>
            </div>
          )
        )}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setFocused(true);
            if (results && results.total > 0) setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={currentPlaceholder}
          className={`relative w-full bg-[var(--ct-bg-elevated)] backdrop-blur-sm border text-[var(--ct-text-primary)] placeholder:text-[var(--ct-text-muted)] font-body focus:outline-none transition-all duration-300 ${
            focused
              ? "border-pink/50 ring-2 ring-pink/20 shadow-[0_0_20px_rgba(236,28,114,0.15)]"
              : "border-[var(--ct-border)]"
          } ${
            isHero
              ? "pl-12 pr-12 py-4 text-base rounded-xl"
              : "pl-9 pr-9 py-2 text-sm rounded-lg"
          }`}
        />
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && results && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] rounded-xl shadow-[var(--ct-shadow)] overflow-hidden z-50 max-h-[400px] overflow-y-auto"
          >
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
                          index={i}
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
                          index={i}
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
                          index={i}
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
                          index={i}
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
                    ? `ดูผลทั้งหมด ${results.total} รายการ \u2192`
                    : `View all ${results.total} results \u2192`}
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
  index,
}: {
  active: boolean;
  onClick: () => void;
  html: string;
  sub: string;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
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
    </motion.button>
  );
}
