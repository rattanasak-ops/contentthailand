"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { Film } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilmCardProps {
  film: Film;
}

export function FilmCard({ film }: FilmCardProps) {
  const { lang } = useLanguage();
  const title = lang === "th" ? film.titleTh : film.titleEn;
  const synopsis = lang === "th" ? film.synopsisTh : film.synopsisEn;
  const cardRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 3D tilt — gentle enough to feel premium, not nauseating
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });

  // Single radial glow that follows cursor — defined once, not in JSX
  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(250px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(236,28,114,0.15), transparent 70%)`
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

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ perspective: 800 }}
      className="flex-shrink-0 snap-start"
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Link
          ref={cardRef}
          href={`/films/${film.slug}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative block w-[200px] md:w-[220px] rounded-xl overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] will-change-transform
            transition-[transform,box-shadow,border-color,filter] duration-500 ease-out
            hover:-translate-y-3
            hover:border-[rgba(236,28,114,0.4)]
            hover:shadow-[0_12px_40px_rgba(236,28,114,0.25),0_0_80px_rgba(112,40,116,0.15),0_20px_60px_rgba(0,0,0,0.3)]
            [&:hover]:[animation:borderGlowPulse_2s_ease-in-out_infinite]"
        >
          {/* Radial glow follows mouse — single layer, GPU-friendly */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 rounded-xl"
            style={{ background: glowBackground }}
          />

          {/* Top edge accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-[#EC1C72] to-transparent" />

          {/* Poster */}
          <div className="aspect-[2/3] bg-gradient-to-br from-[#702874]/20 to-[var(--ct-bg-elevated)] relative overflow-hidden">
            {film.posterUrl ? (
              <Image
                src={film.posterUrl}
                alt={title}
                fill
                className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-110"
                sizes="(max-width: 768px) 200px, 220px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#EC1C72]/10 to-[#702874]/10 flex items-center justify-center">
                <span className="text-[var(--ct-text-faint)] font-display text-5xl font-bold">{title.charAt(0)}</span>
              </div>
            )}

            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-in-out bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.05)_55%,transparent_60%)]" />
            </div>

            {/* Year badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#F6A51B] text-[#0E0D2A] text-[11px] font-bold rounded-lg z-10
              transition-shadow duration-500 shadow-lg group-hover:shadow-[0_0_16px_rgba(246,165,27,0.5)]">
              {film.year}
            </div>

            {/* Genre badges */}
            <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
              {film.genres.slice(0, 2).map((genre) => (
                <span key={genre.slug} className="px-2 py-0.5 text-[var(--ct-text-secondary)] text-[10px] rounded-md font-thai backdrop-blur-md border border-[var(--ct-border)] group-hover:border-[rgba(236,28,114,0.3)] transition-[border-color] duration-300" style={{ backgroundColor: "color-mix(in srgb, var(--ct-bg-page), transparent 30%)" }}>
                  {lang === "th" ? genre.nameTh : genre.nameEn}
                </span>
              ))}
            </div>

            {/* Hover overlay with synopsis */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4 z-10" style={{ background: "linear-gradient(to top, var(--ct-bg-page) 5%, color-mix(in srgb, var(--ct-bg-page), transparent 20%) 40%, transparent 80%)" }}>
              {synopsis && (
                <p className="text-[var(--ct-text-secondary)] text-xs font-body line-clamp-3 mb-3 leading-relaxed">{synopsis}</p>
              )}
              <span className="inline-flex items-center gap-1 text-[#EC1C72] text-xs font-thai font-semibold group-hover:gap-2 transition-[gap] duration-300">
                {lang === "th" ? "ดูรายละเอียด" : "View details"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="p-3.5">
            <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] truncate group-hover:text-[#EC1C72] transition-colors duration-300">{title}</h3>
            <p className="text-[var(--ct-text-faint)] text-xs mt-1 font-body truncate">{lang === "th" ? film.titleEn : film.titleTh}</p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
