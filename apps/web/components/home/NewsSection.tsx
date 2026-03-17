"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { News } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatThaiDate } from "@/lib/utils";
import { FilmStrip } from "@/components/layout/FilmStrip";

function NewsCard({ item }: { item: News }) {
  const { lang } = useLanguage();
  const title = lang === "th" ? item.titleTh : (item.titleEn || item.titleTh);
  const excerpt = item.excerptTh;
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Mouse-follow glow — subtle purple/pink radial gradient
  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(300px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(168,85,247,0.12), rgba(236,28,114,0.06) 40%, transparent 70%)`
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-xl overflow-hidden bg-[var(--ct-bg-elevated)]
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:shadow-[0_12px_40px_rgba(168,85,247,0.18),0_0_60px_rgba(112,40,116,0.1),0_20px_50px_rgba(0,0,0,0.25)]"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]
        bg-[linear-gradient(135deg,rgba(168,85,247,0.5),rgba(236,28,114,0.4),rgba(168,85,247,0.5),rgba(236,28,114,0.4))]
        bg-[length:300%_300%] [animation:borderShift_3s_ease_infinite]">
        <div className="w-full h-full rounded-[11px] bg-[var(--ct-bg-elevated)]" />
      </div>

      {/* Static border (visible when not hovered) */}
      <div className="absolute inset-0 rounded-xl border border-[var(--ct-border)] z-0 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

      {/* Mouse-follow glow overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30 rounded-xl"
        style={{ background: glowBackground }}
      />

      {/* Card content wrapper (sits above border layers) */}
      <Link href={`/news/${item.slug}`} className="relative z-10 block">
        {/* Cover */}
        <div className="aspect-[16/9] bg-gradient-to-br from-purple/20 to-[var(--ct-bg-page)] relative overflow-hidden">
          {item.coverUrl ? (
            <Image
              src={item.coverUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[var(--ct-text-faint)] font-display text-5xl font-bold">
                {title.charAt(0)}
              </span>
            </div>
          )}

          {/* Spotlight sweep */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-in-out bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.05)_55%,transparent_70%)]" />
          </div>

          {/* Glowing tags */}
          <div className="absolute bottom-2 left-2 flex gap-1 z-10">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-purple/80 text-[var(--ct-text-primary)] text-[10px] rounded font-thai
                  transition-shadow duration-500
                  group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] line-clamp-2 group-hover:text-pink transition-colors duration-300 mb-2">
            {title}
          </h3>
          {excerpt && (
            <p className="text-[var(--ct-text-muted)] text-xs font-body line-clamp-2 mb-3">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-[var(--ct-text-faint)] text-xs">
            <Calendar className="w-3 h-3" />
            <span className="font-thai">
              {formatThaiDate(item.publishedAt)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

interface NewsSectionProps {
  items: News[];
}

export function NewsSection({ items }: NewsSectionProps) {
  const { lang } = useLanguage();

  return (
    <section className="py-20 ct-section-c ct-tint-cool">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <FilmStrip color="pink" size="md">
            <h2 className="font-thai font-bold text-xl md:text-2xl text-[var(--ct-text-primary)]">
              {lang === "th" ? "ข่าวสารล่าสุด" : "Latest News"}
            </h2>
          </FilmStrip>
          <Link
            href="/news"
            className="text-sm font-thai text-pink hover:underline"
          >
            {lang === "th" ? "ดูทั้งหมด →" : "View all →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
