"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { TvSeries } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface SeriesCardProps {
  series: TvSeries;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const { lang } = useLanguage();
  const title = lang === "th" ? series.titleTh : series.titleEn;
  const synopsis = lang === "th" ? series.synopsisTh : series.synopsisEn;
  const cardRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

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
      href={`/series/${series.slug}`}
      onMouseMove={handleMouseMove}
      className="group relative flex-shrink-0 w-[280px] md:w-[320px] rounded-xl overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] snap-start
        transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        hover:-translate-y-2 hover:border-[#F76532]/30 hover:shadow-[0_20px_60px_rgba(247,101,50,0.12),0_0_0_1px_rgba(247,101,50,0.15)]"
    >
      {/* Mouse-follow glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 rounded-xl"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(250px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(247,101,50,0.08), transparent 70%)`
          ),
        }}
      />

      {/* Top edge light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10 group-hover:via-[#F76532]/30 transition-all duration-300" />

      {/* Cover - 16:9 */}
      <div className="aspect-video bg-gradient-to-br from-[#702874]/20 to-[#14133D] relative overflow-hidden">
        {series.coverUrl ? (
          <Image
            src={series.coverUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 768px) 280px, 320px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#F76532]/10 to-[#702874]/10 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-4xl font-bold">{title.charAt(0)}</span>
          </div>
        )}

        {/* Channel badge */}
        {series.channel && (
          <div className="absolute top-3 left-3 px-2.5 py-1 text-[var(--ct-text-secondary)] text-[10px] rounded-md font-thai backdrop-blur-md border border-[var(--ct-border)] z-10" style={{ backgroundColor: "color-mix(in srgb, var(--ct-bg-page), transparent 30%)" }}>
            {series.channel}
          </div>
        )}

        {/* Year badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#F6A51B] text-[#0E0D2A] text-[11px] font-bold rounded-lg z-10 shadow-lg">
          {series.year}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-[400ms] flex flex-col justify-end p-4 z-10" style={{ background: "linear-gradient(to top, var(--ct-bg-page), color-mix(in srgb, var(--ct-bg-page), transparent 40%), transparent)" }}>
          {synopsis && (
            <p className="text-[var(--ct-text-secondary)] text-xs font-body line-clamp-2 mb-2 leading-relaxed">{synopsis}</p>
          )}
          <span className="inline-flex items-center gap-1 text-[#F76532] text-xs font-thai font-semibold group-hover:gap-2 transition-all">
            {lang === "th" ? "ดูรายละเอียด" : "View details"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] truncate group-hover:text-[#F76532] transition-colors duration-300">{title}</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <p className="text-[var(--ct-text-faint)] text-xs font-body truncate">{lang === "th" ? series.titleEn : series.titleTh}</p>
          {series.episodes && (
            <span className="text-[var(--ct-text-faint)] text-[10px] font-thai flex-shrink-0 px-1.5 py-0.5 bg-[var(--ct-bg-hover)] rounded">
              {series.episodes} {lang === "th" ? "ตอน" : "ep"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
