"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatThaiDate } from "@/lib/utils";
import { news } from "@/lib/mock-data/news";

export default function NewsPage() {
  const { lang } = useLanguage();

  const sorted = [...news].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ข่าวสาร" : "News" },
  ];

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-8">
          <FilmStrip color="pink" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-white">{lang === "th" ? "ข่าวสารวงการ" : "Industry News"}</h1>
          </FilmStrip>
        </div>

        <div className="space-y-6">
          {sorted.map((item) => {
            const title = lang === "th" ? item.titleTh : (item.titleEn || item.titleTh);
            return (
              <Link key={item.id} href={`/news/${item.slug}`} className="group flex gap-4 bg-navy/40 rounded-xl border border-white/5 p-4 hover:border-pink/20 transition-all">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-gradient-to-br from-purple/20 to-midnight flex items-center justify-center">
                  <span className="text-white/10 font-display text-3xl font-bold">{title.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-thai font-semibold text-white group-hover:text-pink transition-colors line-clamp-2 mb-1">{title}</h3>
                  {item.excerptTh && <p className="text-white/40 text-xs font-body line-clamp-2 mb-2">{item.excerptTh}</p>}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-white/30 text-xs font-thai">
                      <Calendar className="w-3 h-3" />
                      {formatThaiDate(item.publishedAt, true)}
                    </div>
                    <div className="flex gap-1">
                      {item.tags.slice(0, 2).map((tag) => <span key={tag} className="px-1.5 py-0.5 bg-purple/20 text-purple-light text-[10px] rounded font-thai">{tag}</span>)}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
