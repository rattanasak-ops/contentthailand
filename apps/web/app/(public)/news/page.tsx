"use client";

import { useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientDivider } from "@/components/motion/gradient-divider";
import { ViewModeToggle, useViewMode } from "@/components/shared/ViewModeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatThaiDate } from "@/lib/utils";
import { news } from "@/lib/mock-data/news";

export default function NewsPage() {
  const { lang } = useLanguage();
  const [viewMode, setViewMode] = useViewMode("news", "grid");

  const sorted = useMemo(() =>
    [...news].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    []
  );

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ข่าวสาร" : "News" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <ScrollReveal direction="up">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <FilmStrip color="pink" size="lg">
                <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
                  {lang === "th" ? "ข่าวสารวงการ" : "Industry News"}
                </h1>
              </FilmStrip>
              <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 ml-1">
                {sorted.length} {lang === "th" ? "ข่าว" : "articles"}
              </p>
            </div>
            <ViewModeToggle value={viewMode} onChange={setViewMode} />
          </div>
        </ScrollReveal>

        <GradientDivider variant="purple" className="mb-8" />

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === "grid" ? (
              <StaggerChildren staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((item) => (
                  <StaggerItem key={item.id}><NewsCardGrid item={item} lang={lang} /></StaggerItem>
                ))}
              </StaggerChildren>
            ) : viewMode === "poster" ? (
              <StaggerChildren staggerDelay={0.04} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {sorted.map((item) => (
                  <StaggerItem key={item.id}><NewsCardPoster item={item} lang={lang} /></StaggerItem>
                ))}
              </StaggerChildren>
            ) : (
              <div className="rounded-xl overflow-hidden border border-[var(--ct-border)]">
                {sorted.map((item, i) => (
                  <NewsListItem key={item.id} item={item} lang={lang} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function NewsCardGrid({ item, lang }: { item: (typeof news)[0]; lang: string }) {
  const title = lang === "th" ? item.titleTh : (item.titleEn || item.titleTh);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(250px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(0,184,255,0.06), transparent 70%)`
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
      href={`/news/${item.slug}`}
      onMouseMove={handleMouseMove}
      className="group relative bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] overflow-hidden
        transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        hover:-translate-y-2 hover:border-[#00B8FF]/30 hover:shadow-[0_20px_60px_rgba(0,184,255,0.08),0_0_0_1px_rgba(0,184,255,0.12)]"
    >
      {/* Mouse-follow glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl z-10"
        style={{ background: glowBackground }}
      />

      {/* Top edge light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--ct-border)] to-transparent group-hover:via-[#00B8FF]/30 transition-all duration-300 z-10" />

      {/* Cover image */}
      <div className="aspect-[16/9] bg-gradient-to-br from-[#00B8FF]/10 to-[var(--ct-bg-page)] relative overflow-hidden">
        {item.coverUrl ? (
          <Image src={item.coverUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-108" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-5xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--ct-bg-elevated)] to-transparent" />
        {/* Date badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-[var(--ct-bg-page)] backdrop-blur-sm text-[var(--ct-text-secondary)] text-[10px] rounded-md font-thai flex items-center gap-1 z-10">
          <Calendar className="w-3 h-3" />
          {formatThaiDate(item.publishedAt, true)}
        </div>
      </div>

      <div className="p-4 relative z-10">
        <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] group-hover:text-[#00B8FF] transition-colors line-clamp-2 mb-2">{title}</h3>
        {item.excerptTh && <p className="text-[var(--ct-text-faint)] text-xs font-body line-clamp-2 mb-3 leading-relaxed">{item.excerptTh}</p>}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-[#00B8FF]/10 text-[#00B8FF]/70 text-[10px] rounded-md font-thai border border-[#00B8FF]/10">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function NewsCardPoster({ item, lang }: { item: (typeof news)[0]; lang: string }) {
  const title = lang === "th" ? item.titleTh : (item.titleEn || item.titleTh);
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] hover:-translate-y-1 hover:border-[#00B8FF]/30 hover:shadow-[0_10px_40px_rgba(0,184,255,0.1)] transition-all duration-300"
    >
      {item.coverUrl ? (
        <Image src={item.coverUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B8FF]/10 to-[#702874]/10 flex items-center justify-center">
          <span className="text-[var(--ct-text-faint)] font-display text-4xl">{title.charAt(0)}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ct-bg-page)] via-[var(--ct-bg-page)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-[var(--ct-text-primary)] text-xs font-thai font-semibold line-clamp-2">{title}</p>
        <div className="flex items-center gap-1 mt-1.5 text-[var(--ct-text-muted)] text-[9px] font-thai">
          <Calendar className="w-2.5 h-2.5" />
          {formatThaiDate(item.publishedAt, true)}
        </div>
      </div>
    </Link>
  );
}

function NewsListItem({ item, lang, index }: { item: (typeof news)[0]; lang: string; index: number }) {
  const title = lang === "th" ? item.titleTh : (item.titleEn || item.titleTh);
  return (
    <motion.a
      href={`/news/${item.slug}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group flex gap-4 p-4 md:p-5 hover:bg-[var(--ct-bg-hover)] border-b border-[var(--ct-border)] last:border-0 transition-colors"
    >
      <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#00B8FF]/10 to-[var(--ct-bg-page)] overflow-hidden relative group-hover:shadow-[0_0_20px_rgba(0,184,255,0.1)] transition-shadow">
        {item.coverUrl ? (
          <Image src={item.coverUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="112px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-3xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-thai font-bold text-base text-[var(--ct-text-primary)] group-hover:text-[#00B8FF] transition-colors line-clamp-2 mb-1">{title}</h3>
        {item.excerptTh && <p className="text-[var(--ct-text-faint)] text-xs font-body line-clamp-2 mb-2 leading-relaxed">{item.excerptTh}</p>}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-[var(--ct-text-faint)] text-xs font-thai">
            <Calendar className="w-3 h-3" />
            {formatThaiDate(item.publishedAt, true)}
          </div>
          <div className="flex items-center gap-1 text-[var(--ct-text-faint)] text-xs">
            <Eye className="w-3 h-3" />
            <span className="font-mono">{item.viewCount?.toLocaleString()}</span>
          </div>
          <div className="flex gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 bg-[#00B8FF]/10 text-[#00B8FF]/60 text-[10px] rounded font-thai">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}
