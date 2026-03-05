"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Eye, ArrowLeft } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatThaiDate, formatNumber } from "@/lib/utils";
import { news } from "@/lib/mock-data/news";

export default function NewsDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const slug = params.slug as string;
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-display text-4xl mb-4">404</h1>
          <p className="text-white/50 font-thai">{lang === "th" ? "ไม่พบข่าว" : "News not found"}</p>
          <Link href="/news" className="text-pink font-thai text-sm hover:underline mt-4 inline-block">{lang === "th" ? "← กลับ" : "← Back"}</Link>
        </div>
      </div>
    );
  }

  const title = lang === "th" ? item.titleTh : (item.titleEn || item.titleTh);
  const content = lang === "th" ? item.contentTh : (item.contentEn || item.contentTh);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ข่าวสาร" : "News", href: "/news" },
    { label: title },
  ];

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <article>
          <div className="flex gap-2 mb-4">
            {item.tags.map((tag) => <span key={tag} className="px-2 py-0.5 bg-purple/20 text-purple-light text-xs rounded font-thai">{tag}</span>)}
          </div>

          <h1 className="font-thai font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">{title}</h1>

          <div className="flex items-center gap-4 text-white/40 text-sm font-thai mb-8">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatThaiDate(item.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{formatNumber(item.viewCount)} {lang === "th" ? "ครั้ง" : "views"}</span>
          </div>

          {/* Cover placeholder */}
          <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-purple/20 to-navy mb-8 flex items-center justify-center">
            <span className="text-white/[0.05] font-display text-8xl font-bold">{title.charAt(0)}</span>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/70 font-body leading-relaxed text-base whitespace-pre-line">{content}</p>
          </div>

          <div className="mt-12 pt-6 border-t border-white/5">
            <Link href="/news" className="inline-flex items-center gap-2 text-pink font-thai text-sm hover:underline">
              <ArrowLeft className="w-4 h-4" />
              {lang === "th" ? "กลับหน้าข่าวสาร" : "Back to news"}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
