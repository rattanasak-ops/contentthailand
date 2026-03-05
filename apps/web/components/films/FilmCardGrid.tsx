"use client";

import Link from "next/link";
import type { Film } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilmCardGridProps {
  film: Film;
}

export function FilmCardGrid({ film }: FilmCardGridProps) {
  const { lang } = useLanguage();
  const title = lang === "th" ? film.titleTh : film.titleEn;
  const synopsis = lang === "th" ? film.synopsisTh : film.synopsisEn;

  return (
    <Link
      href={`/films/${film.slug}`}
      className="group relative rounded-xl overflow-hidden bg-navy border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-pink/40 hover:shadow-[0_0_30px_rgba(236,28,114,0.15)]"
    >
      {/* Poster */}
      <div className="aspect-[2/3] bg-gradient-to-br from-purple/30 to-midnight relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/15 font-display text-5xl font-bold">
            {title.charAt(0)}
          </span>
        </div>

        {/* Year badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber/90 text-midnight text-xs font-bold rounded-md">
          {film.year}
        </div>

        {/* Genre badges */}
        <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap">
          {film.genres.slice(0, 2).map((genre) => (
            <span
              key={genre.slug}
              className="px-1.5 py-0.5 bg-midnight/80 text-white/70 text-[10px] rounded font-thai backdrop-blur-sm"
            >
              {lang === "th" ? genre.nameTh : genre.nameEn}
            </span>
          ))}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {synopsis && (
            <p className="text-white/80 text-xs font-body line-clamp-3 mb-2">
              {synopsis}
            </p>
          )}
          <span className="text-pink text-xs font-thai font-semibold">
            {lang === "th" ? "ดูรายละเอียด →" : "View details →"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-thai font-semibold text-sm text-white truncate group-hover:text-pink transition-colors">
          {title}
        </h3>
        <p className="text-white/40 text-xs mt-0.5 font-body truncate">
          {lang === "th" ? film.titleEn : film.titleTh}
        </p>
        {film.company && (
          <p className="text-white/30 text-[10px] mt-1 font-thai truncate">
            {film.company.nameTh}
          </p>
        )}
      </div>
    </Link>
  );
}
