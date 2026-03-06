"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientDivider } from "@/components/motion/gradient-divider";
import { ViewModeToggle, useViewMode, type ViewMode } from "@/components/shared/ViewModeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/lib/mock-data/companies";

function CompanyCard({ c, lang, viewMode }: { c: typeof companies[0]; lang: string; viewMode: ViewMode }) {
  const name = lang === "th" ? c.nameTh : c.nameEn;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const typeLabels: Record<string, { th: string; en: string }> = {
    production: { th: "ผลิตภาพยนตร์", en: "Production" },
    distribution: { th: "จัดจำหน่าย", en: "Distribution" },
    streaming: { th: "สตรีมมิ่ง", en: "Streaming" },
    broadcaster: { th: "สถานีโทรทัศน์", en: "Broadcaster" },
  };
  const tl = typeLabels[c.type] || { th: c.type, en: c.type };

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(200px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(112,40,116,0.08), transparent 70%)`
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

  if (viewMode === "list") {
    return (
      <Link
        href={`/companies/${c.slug}`}
        className="group flex items-center gap-4 p-4 bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] hover:border-[#702874]/30 hover:-translate-y-0.5 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-xl bg-white border border-[var(--ct-border)] flex items-center justify-center overflow-hidden flex-shrink-0">
          {c.logoUrl ? (
            <img src={c.logoUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#702874] font-bold text-sm">{name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] group-hover:text-[#702874] transition-colors truncate">{name}</h3>
          <p className="text-[var(--ct-text-faint)] text-xs font-body truncate">{lang === "th" ? c.nameEn : c.nameTh}</p>
        </div>
        <span className="px-2 py-0.5 bg-[#702874]/15 text-[#702874] text-[10px] rounded-md font-thai flex-shrink-0 border border-[#702874]/10">
          {lang === "th" ? tl.th : tl.en}
        </span>
        {c.founded && (
          <span className="text-[var(--ct-text-faint)] text-[10px] font-thai flex-shrink-0">
            {lang === "th" ? `${c.founded + 543}` : c.founded}
          </span>
        )}
      </Link>
    );
  }

  if (viewMode === "poster") {
    return (
      <Link
        href={`/companies/${c.slug}`}
        className="group relative aspect-square rounded-2xl overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] hover:border-[#702874]/30 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {c.logoUrl ? (
            <img src={c.logoUrl} alt={name} className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <span className="text-[var(--ct-text-faint)] font-display text-6xl font-bold group-hover:text-[#702874]/20 transition-colors">{name.charAt(0)}</span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ct-bg-page)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] truncate">{name}</h3>
          <p className="text-[var(--ct-text-muted)] text-xs font-body mt-0.5">{lang === "th" ? tl.th : tl.en}</p>
        </div>
      </Link>
    );
  }

  // Grid mode (default)
  return (
    <Link
      ref={cardRef}
      href={`/companies/${c.slug}`}
      onMouseMove={handleMouseMove}
      className="group relative bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6 overflow-hidden
        transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        hover:-translate-y-2 hover:border-[#702874]/30 hover:shadow-[0_20px_60px_rgba(112,40,116,0.1),0_0_0_1px_rgba(112,40,116,0.12)]"
    >
      {/* Mouse-follow glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ background: glowBackground }}
      />

      {/* Top edge light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--ct-border)] to-transparent group-hover:via-[#702874]/30 transition-all duration-300" />

      {/* Logo */}
      <div className="w-16 h-16 rounded-xl bg-white border border-[var(--ct-border)] flex items-center justify-center mb-5 overflow-hidden group-hover:scale-105 group-hover:border-[#702874]/20 transition-all duration-300">
        {c.logoUrl ? (
          <img src={c.logoUrl} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <span className="text-[#702874]/40 font-bold text-xl">{name.charAt(0)}</span>
        )}
      </div>

      <h3 className="font-thai font-semibold text-[var(--ct-text-primary)] group-hover:text-[#702874] transition-colors mb-1 relative z-10">{name}</h3>
      <p className="text-[var(--ct-text-faint)] text-xs font-body mb-3 relative z-10">{lang === "th" ? c.nameEn : c.nameTh}</p>

      <div className="flex items-center gap-2 mb-3 relative z-10">
        <span className="px-2 py-0.5 bg-[#702874]/15 text-[#702874] text-[10px] rounded-md font-thai border border-[#702874]/10">
          {lang === "th" ? tl.th : tl.en}
        </span>
        {c.founded && (
          <span className="text-[var(--ct-text-faint)] text-[10px] font-thai">
            {lang === "th" ? `ก่อตั้ง ${c.founded + 543}` : `Est. ${c.founded}`}
          </span>
        )}
      </div>

      {c.description && <p className="text-[var(--ct-text-faint)] text-xs font-body line-clamp-2 relative z-10">{c.description}</p>}

      {c.website && (
        <div className="mt-3 flex items-center gap-1.5 text-[var(--ct-text-faint)] text-[10px] group-hover:text-[#702874]/50 transition-colors relative z-10">
          <Globe className="w-3 h-3" />
          <span className="truncate">{c.website.replace("https://www.", "")}</span>
        </div>
      )}
    </Link>
  );
}

export default function CompaniesPage() {
  const { lang } = useLanguage();
  const [viewMode, setViewMode] = useViewMode("companies", "grid");

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "บริษัท" : "Companies" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)]">
      {/* Header / Filter area */}
      <div className="ct-section-b pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

          <ScrollReveal direction="up">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <FilmStrip color="orange" size="lg">
                  <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
                    {lang === "th" ? "บริษัทในวงการ" : "Industry Companies"}
                  </h1>
                </FilmStrip>
                <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 ml-1">
                  {companies.length} {lang === "th" ? "บริษัท" : "companies"}
                </p>
              </div>
              <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </div>
          </ScrollReveal>

          <GradientDivider variant="purple" />
        </div>
      </div>

      {/* Main grid content */}
      <div className="ct-section-purple ct-tint-purple pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren
            staggerDelay={0.05}
            className={
              viewMode === "list"
                ? "flex flex-col gap-3"
                : viewMode === "poster"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            }
          >
            {companies.map((c) => (
              <StaggerItem key={c.id}>
                <CompanyCard c={c} lang={lang} viewMode={viewMode} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </div>
  );
}
