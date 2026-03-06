"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { BookOpen, Download, FileText, BarChart3, Search, ArrowDownToLine } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientDivider } from "@/components/motion/gradient-divider";
import { ViewModeToggle, useViewMode } from "@/components/shared/ViewModeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Resource {
  id: number;
  slug: string;
  titleTh: string;
  titleEn: string;
  category: string;
  type: "pdf" | "report" | "stats";
  year: number;
  size: string;
  downloads: number;
}

const resources: Resource[] = [
  { id: 1, slug: "thai-film-industry-report-2025", titleTh: "รายงานสถานการณ์อุตสาหกรรมภาพยนตร์ไทย ประจำปี 2568", titleEn: "Thai Film Industry Report 2025", category: "report", type: "report", year: 2568, size: "4.2 MB", downloads: 2340 },
  { id: 2, slug: "thai-film-audience-statistics-2024", titleTh: "สถิติผู้ชมภาพยนตร์ไทยในโรงภาพยนตร์ 2567", titleEn: "Thai Film Audience Statistics 2024", category: "statistics", type: "stats", year: 2567, size: "2.8 MB", downloads: 1850 },
  { id: 3, slug: "thai-film-international-promotion-guidelines", titleTh: "แนวทางการส่งเสริมภาพยนตร์ไทยสู่ตลาดสากล", titleEn: "Guidelines for Thai Film International Promotion", category: "guide", type: "pdf", year: 2568, size: "1.5 MB", downloads: 980 },
  { id: 4, slug: "thai-media-consumption-research-2024", titleTh: "งานวิจัย: พฤติกรรมการรับชมสื่อของคนไทย 2567", titleEn: "Research: Thai Media Consumption Behavior 2024", category: "research", type: "pdf", year: 2567, size: "6.1 MB", downloads: 3200 },
  { id: 5, slug: "contentthailand-user-manual", titleTh: "คู่มือการใช้งานระบบ ContentThailand", titleEn: "ContentThailand User Manual", category: "guide", type: "pdf", year: 2568, size: "3.4 MB", downloads: 560 },
  { id: 6, slug: "film-division-annual-report-2024", titleTh: "รายงานผลการดำเนินงานกองภาพยนตร์ฯ ปี 2567", titleEn: "Film Division Annual Report 2024", category: "report", type: "report", year: 2567, size: "5.7 MB", downloads: 1120 },
  { id: 7, slug: "thai-films-international-awards", titleTh: "สถิติภาพยนตร์ไทยที่ได้รับรางวัลระดับนานาชาติ", titleEn: "Thai Films International Awards Statistics", category: "statistics", type: "stats", year: 2568, size: "1.2 MB", downloads: 4560 },
  { id: 8, slug: "film-industry-strategic-plan-2025-2029", titleTh: "แผนยุทธศาสตร์การพัฒนาอุตสาหกรรมภาพยนตร์ 2568-2572", titleEn: "Film Industry Strategic Plan 2025-2029", category: "report", type: "report", year: 2568, size: "8.3 MB", downloads: 870 },
];

const categoryLabels: Record<string, { th: string; en: string }> = {
  report: { th: "รายงาน", en: "Report" },
  statistics: { th: "สถิติ", en: "Statistics" },
  research: { th: "งานวิจัย", en: "Research" },
  guide: { th: "คู่มือ", en: "Guide" },
};

const categoryAccent: Record<string, string> = {
  report: "#EC1C72",
  statistics: "#F6A51B",
  research: "#F76532",
  guide: "#702874",
};

const typeIcon: Record<string, typeof FileText> = {
  pdf: FileText,
  report: BookOpen,
  stats: BarChart3,
};

export default function LibraryPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useViewMode("library", "list");

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "คลังความรู้" : "Library" },
  ];

  const filtered = resources.filter((r) => {
    const matchSearch = !search || r.titleTh.includes(search) || r.titleEn.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || r.category === category;
    return matchSearch && matchCategory;
  });

  const handleDownload = (e: React.MouseEvent, r: Resource) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(
      lang === "th"
        ? `กำลังดาวน์โหลด "${lang === "th" ? r.titleTh : r.titleEn}"...`
        : `Downloading "${r.titleEn}"...`
    );
  };

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <ScrollReveal direction="up">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <FilmStrip color="purple" size="lg">
                <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
                  {lang === "th" ? "คลังความรู้" : "Knowledge Library"}
                </h1>
              </FilmStrip>
              <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 ml-1">
                {lang === "th" ? "รายงาน งานวิจัย สถิติ และเอกสารเกี่ยวกับอุตสาหกรรมภาพยนตร์และวีดิทัศน์ไทย" : "Reports, research, statistics, and documents about the Thai film and video industry"}
              </p>
            </div>
            <ViewModeToggle value={viewMode} onChange={setViewMode} />
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-3 mb-6 ct-section-b rounded-2xl p-4 -mx-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ct-text-faint)]" />
              <Input
                placeholder={lang === "th" ? "ค้นหาเอกสาร..." : "Search documents..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[var(--ct-bg-elevated)] border-[var(--ct-border)] text-[var(--ct-text-primary)] placeholder:text-[var(--ct-text-faint)] font-thai focus:border-[#702874]/50 focus:ring-[#702874]/20 rounded-xl"
              />
            </div>
            <div className="flex gap-1.5 bg-[var(--ct-bg-elevated)] rounded-xl p-1 border border-[var(--ct-border)]">
              {["all", "report", "statistics", "research", "guide"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-2 rounded-lg text-xs font-thai transition-all duration-200 ${
                    category === c
                      ? "bg-[var(--ct-bg-hover)] text-[var(--ct-text-primary)] shadow-sm"
                      : "text-[var(--ct-text-muted)] hover:text-[var(--ct-text-secondary)] hover:bg-[var(--ct-bg-hover)]"
                  }`}
                >
                  {c === "all" ? (lang === "th" ? "ทั้งหมด" : "All") : (lang === "th" ? categoryLabels[c]?.th : categoryLabels[c]?.en)}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <GradientDivider variant="purple" className="mb-8" />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${category}-${search}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === "grid" ? (
              <StaggerChildren staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((r) => (
                  <StaggerItem key={r.id}><LibraryCardGrid r={r} lang={lang} onDownload={handleDownload} /></StaggerItem>
                ))}
              </StaggerChildren>
            ) : viewMode === "poster" ? (
              <StaggerChildren staggerDelay={0.04} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filtered.map((r) => (
                  <StaggerItem key={r.id}><LibraryCardPoster r={r} lang={lang} /></StaggerItem>
                ))}
              </StaggerChildren>
            ) : (
              <StaggerChildren staggerDelay={0.04} className="space-y-3">
                {filtered.map((r) => (
                  <StaggerItem key={r.id}><LibraryListItem r={r} lang={lang} onDownload={handleDownload} /></StaggerItem>
                ))}
              </StaggerChildren>
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--ct-text-faint)] font-thai">
            <FileText className="w-12 h-12 mx-auto mb-3 text-[var(--ct-text-faint)]" />
            {lang === "th" ? "ไม่พบเอกสาร" : "No documents found"}
          </div>
        )}
      </div>
    </div>
  );
}

function LibraryCardGrid({ r, lang, onDownload }: { r: Resource; lang: string; onDownload: (e: React.MouseEvent, r: Resource) => void }) {
  const Icon = typeIcon[r.type] || FileText;
  const title = lang === "th" ? r.titleTh : r.titleEn;
  const accent = categoryAccent[r.category] || "#702874";
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(200px circle at ${(x as number) * 100}% ${(y as number) * 100}%, ${accent}12, transparent 70%)`
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
      href={`/library/${r.slug}`}
      onMouseMove={handleMouseMove}
      className="group relative bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-5 overflow-hidden
        transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(112,40,116,0.1)]"
      style={{ ["--accent" as string]: accent }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ background: glowBackground }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--ct-border)] to-transparent group-hover:via-[var(--accent)]/30 transition-all duration-300" />

      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300"
        style={{ background: `linear-gradient(135deg, ${accent}20, ${accent}08)`, border: `1px solid ${accent}15` }}>
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>

      <h3 className="font-thai font-bold text-sm text-[var(--ct-text-primary)] group-hover:text-[var(--ct-text-primary)] transition-colors line-clamp-2 mb-3 relative z-10">{title}</h3>

      <div className="flex flex-wrap items-center gap-2 mb-3 relative z-10">
        <span className="px-2 py-0.5 text-[10px] rounded-md font-thai border" style={{ background: `${accent}15`, color: accent, borderColor: `${accent}20` }}>
          {lang === "th" ? categoryLabels[r.category]?.th : categoryLabels[r.category]?.en}
        </span>
        <span className="text-[var(--ct-text-faint)] text-[10px] font-mono">{r.year}</span>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-[var(--ct-text-faint)] text-[10px] font-mono">{r.size}</span>
          <span className="flex items-center gap-1 text-[var(--ct-text-faint)] text-[10px]">
            <ArrowDownToLine className="w-3 h-3" />
            <span className="font-mono">{r.downloads.toLocaleString()}</span>
          </span>
        </div>
        <button
          onClick={(e) => onDownload(e, r)}
          className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
          style={{ background: `${accent}15`, color: accent }}
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </Link>
  );
}

function LibraryCardPoster({ r, lang }: { r: Resource; lang: string }) {
  const Icon = typeIcon[r.type] || FileText;
  const title = lang === "th" ? r.titleTh : r.titleEn;
  const accent = categoryAccent[r.category] || "#702874";

  return (
    <Link
      href={`/library/${r.slug}`}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] hover:-translate-y-1 transition-all duration-300"
      style={{ borderColor: `${accent}00` }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }}>
        <Icon className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" style={{ color: `${accent}60` }} />
        <p className="text-[var(--ct-text-secondary)] text-xs font-thai font-semibold line-clamp-3">{title}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[var(--ct-bg-page)] to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-thai" style={{ color: accent }}>{lang === "th" ? categoryLabels[r.category]?.th : categoryLabels[r.category]?.en}</span>
          <span className="text-[var(--ct-text-faint)] text-[9px] font-mono">{r.size}</span>
        </div>
      </div>
    </Link>
  );
}

function LibraryListItem({ r, lang, onDownload }: { r: Resource; lang: string; onDownload: (e: React.MouseEvent, r: Resource) => void }) {
  const Icon = typeIcon[r.type] || FileText;
  const title = lang === "th" ? r.titleTh : r.titleEn;
  const accent = categoryAccent[r.category] || "#702874";

  return (
    <Link
      href={`/library/${r.slug}`}
      className="group relative bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-5 flex items-center gap-4 overflow-hidden
        transition-all duration-300 hover:bg-[var(--ct-bg-elevated)] hover:-translate-y-0.5"
    >
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(180deg, ${accent}, ${accent}40)` }} />

      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg"
        style={{ background: `linear-gradient(135deg, ${accent}20, ${accent}08)` }}>
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-thai font-bold text-[var(--ct-text-primary)] text-sm md:text-base transition-colors duration-200 mb-1.5 line-clamp-1" style={{ ["--accent" as string]: accent }}>
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-[10px] font-thai" style={{ background: `${accent}10`, color: accent, borderColor: `${accent}20` }}>
            {lang === "th" ? categoryLabels[r.category]?.th : categoryLabels[r.category]?.en}
          </Badge>
          <span className="text-[var(--ct-text-faint)] text-[10px] font-mono">{r.year}</span>
          <span className="text-[var(--ct-text-faint)] text-[10px] font-mono">{r.size}</span>
          <span className="flex items-center gap-1 text-[var(--ct-text-faint)] text-[10px]">
            <ArrowDownToLine className="w-3 h-3" />
            <span className="font-mono">{r.downloads.toLocaleString()}</span>
          </span>
        </div>
      </div>

      <button
        onClick={(e) => onDownload(e, r)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--ct-border)] text-[var(--ct-text-secondary)] text-xs font-thai flex-shrink-0 hover:border-[var(--ct-border)] hover:text-[var(--ct-text-primary)] hover:shadow-lg transition-all duration-300 group-hover:scale-105"
        style={{ background: `linear-gradient(135deg, ${accent}15, ${accent}08)` }}
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">{lang === "th" ? "ดาวน์โหลด" : "Download"}</span>
      </button>
    </Link>
  );
}
