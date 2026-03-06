"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tv, Building2, Eye, Facebook, Share2, MessageCircle, Link as LinkCopy } from "lucide-react";
import { toast } from "sonner";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { series } from "@/lib/mock-data/series";

export default function SeriesDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const slug = params.slug as string;
  const show = series.find((s) => s.slug === slug);

  if (!show) {
    return (
      <div className="min-h-screen bg-[var(--ct-bg-page)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[var(--ct-text-primary)] font-display text-4xl mb-4">404</h1>
          <p className="text-[var(--ct-text-muted)] font-thai">{lang === "th" ? "ไม่พบละคร" : "Series not found"}</p>
          <Link href="/series" className="text-orange font-thai text-sm hover:underline mt-4 inline-block">{lang === "th" ? "← กลับ" : "← Back"}</Link>
        </div>
      </div>
    );
  }

  const title = lang === "th" ? show.titleTh : show.titleEn;
  const subtitle = lang === "th" ? show.titleEn : show.titleTh;
  const synopsis = lang === "th" ? show.synopsisTh : show.synopsisEn;
  const altSynopsis = lang === "th" ? show.synopsisEn : show.synopsisTh;

  const related = series.filter((s) => s.id !== show.id && s.genres.some((g) => show.genres.some((sg) => sg.slug === g.slug))).slice(0, 4);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ละครโทรทัศน์" : "TV Series", href: "/series" },
    { label: title },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)]">
      <div className="relative h-[35vh] md:h-[45vh] overflow-hidden">
        {show.coverUrl ? (
          <>
            <div className="absolute inset-0 scale-110">
              <Image src={show.coverUrl} alt={title} fill className="object-cover opacity-30" style={{ filter: "blur(40px) saturate(1.3)" }} priority />
            </div>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(247, 101, 50, 0.08) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--ct-bg-page)] via-[var(--ct-bg-page)] to-[var(--ct-bg-page)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange/20 via-[var(--ct-bg-page)] to-[var(--ct-bg-page)]" />
        )}
        <div className="absolute inset-0 film-grain" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 z-10">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-[240px] md:w-[320px] mx-auto md:mx-0">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-orange/20 to-[var(--ct-bg-elevated)] border-2 border-[var(--ct-border)] shadow-2xl relative overflow-hidden">
              {show.coverUrl ? (
                <Image src={show.coverUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 240px, 320px" priority />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[var(--ct-text-faint)] font-display text-6xl font-bold">{title.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl md:text-4xl text-[var(--ct-text-primary)] font-bold mb-2">{title}</h1>
            <p className="text-[var(--ct-text-muted)] font-body text-lg mb-6">{subtitle}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber/10 text-amber rounded-full text-sm font-thai"><Calendar className="w-3.5 h-3.5" />{show.year}{show.endYear && show.endYear !== show.year ? `–${show.endYear}` : ""}</span>
              {show.episodes && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange/10 text-orange rounded-full text-sm font-thai"><Tv className="w-3.5 h-3.5" />{show.episodes} {lang === "th" ? "ตอน" : "episodes"}</span>}
              {show.channel && <span className="px-3 py-1.5 bg-[var(--ct-bg-hover)] text-[var(--ct-text-secondary)] rounded-full text-sm font-thai">{show.channel}</span>}
              {show.genres.map((g) => <span key={g.slug} className="px-3 py-1.5 bg-purple/20 text-purple-light rounded-full text-sm font-thai">{lang === "th" ? g.nameTh : g.nameEn}</span>)}
              {show.company && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ct-bg-hover)] text-[var(--ct-text-secondary)] rounded-full text-sm font-thai"><Building2 className="w-3.5 h-3.5" />{show.company.nameTh}</span>}
            </div>

            <div className="mb-8">
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-3">{lang === "th" ? "เรื่องย่อ" : "Synopsis"}</h2>
              <p className="text-[var(--ct-text-secondary)] font-body leading-relaxed mb-4">{synopsis}</p>
              {altSynopsis && (
                <details className="group">
                  <summary className="text-orange text-sm font-thai cursor-pointer hover:underline">{lang === "th" ? "อ่านภาษาอังกฤษ" : "Read in Thai"}</summary>
                  <p className="text-[var(--ct-text-muted)] font-body leading-relaxed mt-2">{altSynopsis}</p>
                </details>
              )}
            </div>

            {/* Engagement & Share */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--ct-border)]">
              <div className="flex items-center gap-1.5 text-[var(--ct-text-muted)] text-sm">
                <Eye className="w-4 h-4" />
                <span className="font-mono">{show.viewCount?.toLocaleString()}</span>
                <span className="font-thai">{lang === "th" ? "ครั้ง" : "views"}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-[var(--ct-text-faint)] text-xs font-thai mr-1">{lang === "th" ? "แชร์:" : "Share:"}</span>
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#1877F2]/20 hover:text-[#1877F2] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><Facebook className="w-4 h-4" /></button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-hover)] hover:text-white rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><Share2 className="w-4 h-4" /></button>
                <button onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#06C755]/20 hover:text-[#06C755] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><MessageCircle className="w-4 h-4" /></button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(lang === "th" ? "คัดลอกลิงก์แล้ว" : "Link copied!"); }} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-amber/20 hover:text-amber rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><LinkCopy className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pb-20">
            <FilmStrip color="orange" size="md">
              <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">{lang === "th" ? "ละครที่เกี่ยวข้อง" : "Related Series"}</h2>
            </FilmStrip>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {related.map((s) => (
                <Link key={s.id} href={`/series/${s.slug}`} className="group bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] overflow-hidden hover:border-orange/30 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-purple/20 to-[var(--ct-bg-page)] relative overflow-hidden">
                    {s.coverUrl ? (
                      <Image src={s.coverUrl} alt={lang === "th" ? s.titleTh : s.titleEn} fill className="object-cover" sizes="25vw" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[var(--ct-text-faint)] font-display text-3xl font-bold">{(lang === "th" ? s.titleTh : s.titleEn).charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] truncate group-hover:text-orange transition-colors">{lang === "th" ? s.titleTh : s.titleEn}</h3>
                    <p className="text-[var(--ct-text-faint)] text-xs font-body">{s.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
