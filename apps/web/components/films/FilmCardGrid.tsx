"use client";

import Image from "next/image";
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
      className="group relative rounded-xl overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] transition-all duration-300 hover:scale-[1.02] hover:border-pink/40 hover:shadow-[0_0_30px_rgba(236,28,114,0.15)]"
    >
      {/* Poster */}
      <div className="aspect-[2/3] relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgba(112,40,116,0.3), var(--ct-bg-page))' }}>
        {film.posterUrl ? (
          <Image
            src={film.posterUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-5xl font-bold">
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Year badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber/90 text-midnight text-xs font-bold rounded-md">
          {film.year}
        </div>

        {/* Genre badges */}
        <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap">
          {film.genres.slice(0, 2).map((genre) => (
            <span
              key={genre.slug}
              className="px-1.5 py-0.5 bg-[var(--ct-bg-page)] text-[var(--ct-text-secondary)] text-[10px] rounded font-thai backdrop-blur-sm"
              style={{ backgroundColor: 'color-mix(in srgb, var(--ct-bg-page) 80%, transparent)' }}
            >
              {lang === "th" ? genre.nameTh : genre.nameEn}
            </span>
          ))}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          style={{ background: 'linear-gradient(to top, var(--ct-bg-page), color-mix(in srgb, var(--ct-bg-page) 80%, transparent), transparent)' }}>
          {synopsis && (
            <p className="text-[var(--ct-text-secondary)] text-xs font-body line-clamp-3 mb-2">
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
        <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] truncate group-hover:text-pink transition-colors">
          {title}
        </h3>
        <p className="text-[var(--ct-text-muted)] text-xs mt-0.5 font-body truncate">
          {lang === "th" ? film.titleEn : film.titleTh}
        </p>
        {film.company && (
          <p className="text-[var(--ct-text-faint)] text-[10px] mt-1 font-thai truncate">
            {film.company.nameTh}
          </p>
        )}
      </div>
    </Link>
  );
}
