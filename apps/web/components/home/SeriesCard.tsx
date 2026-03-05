"use client";

import Image from "next/image";
import Link from "next/link";
import type { TvSeries } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface SeriesCardProps {
  series: TvSeries;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const { lang } = useLanguage();
  const title = lang === "th" ? series.titleTh : series.titleEn;
  const synopsis = lang === "th" ? series.synopsisTh : series.synopsisEn;

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group relative flex-shrink-0 w-[280px] md:w-[320px] rounded-xl overflow-hidden bg-navy border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-orange/40 hover:shadow-[0_0_30px_rgba(247,101,50,0.15)]"
    >
      {/* Cover - 16:9 */}
      <div className="aspect-video bg-gradient-to-br from-purple/20 to-navy relative overflow-hidden">
        {series.coverUrl ? (
          <Image
            src={series.coverUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 280px, 320px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 font-display text-3xl font-bold">
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Channel badge */}
        {series.channel && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-navy/80 text-white/70 text-[10px] rounded font-thai backdrop-blur-sm z-10">
            {series.channel}
          </div>
        )}

        {/* Year + Episodes */}
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          <span className="px-2 py-0.5 bg-amber/90 text-midnight text-xs font-bold rounded-md">
            {series.year}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-10">
          {synopsis && (
            <p className="text-white/80 text-xs font-body line-clamp-2 mb-1">
              {synopsis}
            </p>
          )}
          <span className="text-orange text-xs font-thai font-semibold">
            {lang === "th" ? "ดูรายละเอียด →" : "View details →"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-thai font-semibold text-sm text-white truncate group-hover:text-orange transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-white/40 text-xs font-body truncate">
            {lang === "th" ? series.titleEn : series.titleTh}
          </p>
          {series.episodes && (
            <span className="text-white/30 text-[10px] font-thai flex-shrink-0">
              {series.episodes} {lang === "th" ? "ตอน" : "ep"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
