"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, ArrowLeft, Facebook, Share2, MessageCircle, Link as LinkCopy } from "lucide-react";
import { toast } from "sonner";
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
      <div className="min-h-screen bg-[var(--ct-bg-page)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[var(--ct-text-primary)] font-display text-4xl mb-4">404</h1>
          <p className="text-[var(--ct-text-muted)] font-thai">{lang === "th" ? "ไม่พบข่าว" : "News not found"}</p>
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
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <article>
          <div className="flex gap-2 mb-4">
            {item.tags.map((tag) => <span key={tag} className="px-2 py-0.5 bg-purple/20 text-purple-light text-xs rounded font-thai">{tag}</span>)}
          </div>

          <h1 className="font-thai font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">{title}</h1>

          <div className="flex items-center gap-4 text-[var(--ct-text-muted)] text-sm font-thai mb-8">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatThaiDate(item.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{formatNumber(item.viewCount)} {lang === "th" ? "ครั้ง" : "views"}</span>
          </div>

          {/* Cover image */}
          <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-purple/20 to-[var(--ct-bg-elevated)] mb-8 overflow-hidden relative">
            {item.coverUrl ? (
              <Image src={item.coverUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[var(--ct-text-faint)] font-display text-8xl font-bold">{title.charAt(0)}</span>
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-[var(--ct-text-secondary)] font-body leading-relaxed text-base whitespace-pre-line">{content}</p>
          </div>

          {/* Share Section */}
          <div className="mt-10 pt-6 border-t border-[var(--ct-border)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[var(--ct-text-faint)] text-sm font-thai">{lang === "th" ? "แชร์:" : "Share:"}</span>
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#1877F2]/20 hover:text-[#1877F2] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110" title="Facebook"><Facebook className="w-4 h-4" /></button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-hover)] hover:text-white rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110" title="X"><Share2 className="w-4 h-4" /></button>
                <button onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#06C755]/20 hover:text-[#06C755] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110" title="LINE"><MessageCircle className="w-4 h-4" /></button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(lang === "th" ? "คัดลอกลิงก์แล้ว" : "Link copied!"); }} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-amber/20 hover:text-amber rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110" title={lang === "th" ? "คัดลอกลิงก์" : "Copy link"}><LinkCopy className="w-4 h-4" /></button>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 text-pink font-thai text-sm hover:underline">
                <ArrowLeft className="w-4 h-4" />
                {lang === "th" ? "กลับหน้าข่าวสาร" : "Back to news"}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
