"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, ImageIcon, Video, Loader2, ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GradientDivider } from "@/components/motion/gradient-divider";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";

interface ShutterstockImage {
  id: string;
  description: string;
  preview: string | null;
  thumb: string | null;
  width?: number;
  height?: number;
}

interface ShutterstockVideo {
  id: string;
  description: string;
  duration: number;
  aspect: string;
  preview: string | null;
  thumb: string | null;
}

type MediaType = "images" | "videos";

interface SearchResult {
  total: number;
  page: number;
  perPage: number;
  results: (ShutterstockImage | ShutterstockVideo)[];
}

export default function StockMediaPage() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("thailand film");
  const [mediaType, setMediaType] = useState<MediaType>("images");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchMedia = useCallback(
    async (q: string, type: MediaType, p: number) => {
      if (!q.trim()) return;
      setLoading(true);
      try {
        const res = await fetch(
          `/api/shutterstock/search?query=${encodeURIComponent(q)}&type=${type}&page=${p}&per_page=20`
        );
        const data = await res.json();
        setResults(data);
      } catch {
        setResults(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    searchMedia(query, mediaType, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    searchMedia(query, mediaType, 1);
  };

  const handleTypeChange = (type: MediaType) => {
    setMediaType(type);
    setPage(1);
    searchMedia(query, type, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    searchMedia(query, mediaType, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = results ? Math.ceil(results.total / results.perPage) : 0;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--ct-bg-page)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: lang === "th" ? "หน้าแรก" : "Home", href: "/" },
            { label: lang === "th" ? "Stock Media" : "Stock Media" },
          ]}
        />

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10 mt-6">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--ct-text-primary)] mb-3">
              Stock Media
            </h1>
            <p className="font-thai text-lg text-[var(--ct-text-muted)] max-w-2xl mx-auto">
              {lang === "th"
                ? "ค้นหาภาพและวิดีโอคุณภาพสูงจาก Shutterstock สำหรับงานสร้างสรรค์"
                : "Search high-quality images and videos from Shutterstock for creative work"}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-[10px] font-mono text-[var(--ct-text-faint)] tracking-wider uppercase">
                Powered by
              </span>
              <span className="text-[11px] font-bold text-[#EE2D24]">Shutterstock</span>
            </div>
          </div>
        </ScrollReveal>

        <GradientDivider className="mb-8" />

        {/* Search + Filters */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ct-text-faint)]" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === "th" ? "ค้นหาภาพหรือวิดีโอ..." : "Search images or videos..."}
                className="pl-10 bg-[var(--ct-bg-card)] border-[var(--ct-border)] text-[var(--ct-text-primary)]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg font-thai font-semibold text-sm text-white transition-all duration-200 hover:scale-105 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #EC1C72, #F76532)" }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : lang === "th" ? (
                "ค้นหา"
              ) : (
                "Search"
              )}
            </button>
          </form>

          {/* Type Toggle */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => handleTypeChange("images")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-thai font-medium transition-all duration-200 ${
                mediaType === "images"
                  ? "bg-[#EC1C72]/10 text-[#EC1C72] border border-[#EC1C72]/30"
                  : "bg-[var(--ct-bg-hover)] text-[var(--ct-text-muted)] border border-[var(--ct-border)] hover:text-[var(--ct-text-primary)]"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              {lang === "th" ? "รูปภาพ" : "Images"}
            </button>
            <button
              onClick={() => handleTypeChange("videos")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-thai font-medium transition-all duration-200 ${
                mediaType === "videos"
                  ? "bg-[#F76532]/10 text-[#F76532] border border-[#F76532]/30"
                  : "bg-[var(--ct-bg-hover)] text-[var(--ct-text-muted)] border border-[var(--ct-border)] hover:text-[var(--ct-text-primary)]"
              }`}
            >
              <Video className="w-4 h-4" />
              {lang === "th" ? "วิดีโอ" : "Videos"}
            </button>
          </div>
        </div>

        {/* Results Count */}
        {results && (
          <div className="text-center mb-6">
            <span className="text-sm text-[var(--ct-text-faint)] font-body">
              {lang === "th"
                ? `พบ ${results.total.toLocaleString()} รายการ`
                : `${results.total.toLocaleString()} results found`}
            </span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#EC1C72]" />
          </div>
        )}

        {/* Results Grid */}
        {!loading && results && results.results.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mediaType}-${page}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                mediaType === "images"
                  ? "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              }
            >
              {results.results.map((item) => (
                <MediaCard key={item.id} item={item} type={mediaType} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!loading && results && results.results.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-[var(--ct-text-faint)]" />
            <p className="font-thai text-lg text-[var(--ct-text-muted)]">
              {lang === "th" ? "ไม่พบผลลัพธ์ ลองค้นหาคำอื่น" : "No results found. Try a different search."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && results && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 rounded-lg text-sm font-thai bg-[var(--ct-bg-hover)] border border-[var(--ct-border)] text-[var(--ct-text-muted)] disabled:opacity-30 hover:text-[var(--ct-text-primary)] transition-all"
            >
              {lang === "th" ? "ก่อนหน้า" : "Previous"}
            </button>
            <span className="text-sm text-[var(--ct-text-faint)] font-mono px-3">
              {page} / {Math.min(totalPages, 50)}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages || page >= 50}
              className="px-4 py-2 rounded-lg text-sm font-thai bg-[var(--ct-bg-hover)] border border-[var(--ct-border)] text-[var(--ct-text-muted)] disabled:opacity-30 hover:text-[var(--ct-text-primary)] transition-all"
            >
              {lang === "th" ? "ถัดไป" : "Next"}
            </button>
          </div>
        )}

        {/* Shutterstock attribution */}
        <div className="text-center mt-12 pb-8">
          <p className="text-[11px] text-[var(--ct-text-faint)] font-body">
            {lang === "th"
              ? "ภาพและวิดีโอจาก Shutterstock — ต้องมี license เพื่อใช้งานจริง"
              : "Images and videos from Shutterstock — license required for production use"}
          </p>
        </div>
      </div>
    </main>
  );
}

function MediaCard({ item, type }: { item: ShutterstockImage | ShutterstockVideo; type: MediaType }) {
  const [hovered, setHovered] = useState(false);

  if (type === "videos") {
    const video = item as ShutterstockVideo;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative rounded-xl overflow-hidden bg-[var(--ct-bg-card)] border border-[var(--ct-border)] hover:border-[#F76532]/30 transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-video">
          {video.thumb ? (
            <Image
              src={video.thumb}
              alt={video.description || "Video thumbnail"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--ct-bg-hover)] flex items-center justify-center">
              <Video className="w-8 h-8 text-[var(--ct-text-faint)]" />
            </div>
          )}

          {/* Play overlay */}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Duration badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-[10px] text-white font-mono">
              {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
            </div>
          )}
        </div>

        <div className="p-3">
          <p className="text-xs text-[var(--ct-text-muted)] line-clamp-2 leading-relaxed">
            {video.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-[var(--ct-text-faint)] font-mono">ID: {video.id}</span>
            <a
              href={`https://www.shutterstock.com/video/clip-${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#F76532] hover:underline inline-flex items-center gap-1"
            >
              Shutterstock <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  const img = item as ShutterstockImage;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative rounded-xl overflow-hidden bg-[var(--ct-bg-card)] border border-[var(--ct-border)] hover:border-[#EC1C72]/30 transition-all duration-300 break-inside-avoid"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {img.preview ? (
        <Image
          src={img.preview}
          alt={img.description || "Stock image"}
          width={img.width || 450}
          height={img.height || 300}
          className="w-full h-auto"
          unoptimized
        />
      ) : (
        <div className="aspect-[3/2] bg-[var(--ct-bg-hover)] flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-[var(--ct-text-faint)]" />
        </div>
      )}

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-xs text-white/90 line-clamp-2 mb-2">{img.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/50 font-mono">ID: {img.id}</span>
          <a
            href={`https://www.shutterstock.com/image-photo/${img.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#EC1C72] hover:underline inline-flex items-center gap-1"
          >
            Shutterstock <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
