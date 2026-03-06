"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { News } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatThaiDate } from "@/lib/utils";
import { FilmStrip } from "@/components/layout/FilmStrip";

function NewsCard({ item }: { item: News }) {
  const { lang } = useLanguage();
  const title = lang === "th" ? item.titleTh : (item.titleEn || item.titleTh);
  const excerpt = item.excerptTh;

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] overflow-hidden hover:border-purple/30 transition-all duration-300"
    >
      {/* Cover */}
      <div className="aspect-[16/9] bg-gradient-to-br from-purple/20 to-[var(--ct-bg-page)] relative overflow-hidden">
        {item.coverUrl ? (
          <Image src={item.coverUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-5xl font-bold">
              {title.charAt(0)}
            </span>
          </div>
        )}
        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-purple/80 text-[var(--ct-text-primary)] text-[10px] rounded font-thai"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] line-clamp-2 group-hover:text-pink transition-colors mb-2">
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
