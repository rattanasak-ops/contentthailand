"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Tv, Building2 } from "lucide-react";
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
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-display text-4xl mb-4">404</h1>
          <p className="text-white/50 font-thai">{lang === "th" ? "ไม่พบละคร" : "Series not found"}</p>
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
    <div className="min-h-screen bg-midnight">
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange/20 via-midnight to-midnight" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/[0.03] font-display text-[180px] font-bold select-none">{title.charAt(0)}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-midnight to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 z-10">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-[240px] md:w-[320px] mx-auto md:mx-0">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-orange/20 to-navy border-2 border-white/10 shadow-2xl flex items-center justify-center">
              <span className="text-white/15 font-display text-6xl font-bold">{title.charAt(0)}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl md:text-4xl text-white font-bold mb-2">{title}</h1>
            <p className="text-white/40 font-body text-lg mb-6">{subtitle}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber/10 text-amber rounded-full text-sm font-thai"><Calendar className="w-3.5 h-3.5" />{show.year}{show.endYear && show.endYear !== show.year ? `–${show.endYear}` : ""}</span>
              {show.episodes && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange/10 text-orange rounded-full text-sm font-thai"><Tv className="w-3.5 h-3.5" />{show.episodes} {lang === "th" ? "ตอน" : "episodes"}</span>}
              {show.channel && <span className="px-3 py-1.5 bg-white/5 text-white/60 rounded-full text-sm font-thai">{show.channel}</span>}
              {show.genres.map((g) => <span key={g.slug} className="px-3 py-1.5 bg-purple/20 text-purple-light rounded-full text-sm font-thai">{lang === "th" ? g.nameTh : g.nameEn}</span>)}
              {show.company && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/60 rounded-full text-sm font-thai"><Building2 className="w-3.5 h-3.5" />{show.company.nameTh}</span>}
            </div>

            <div className="mb-8">
              <h2 className="font-thai font-bold text-white text-lg mb-3">{lang === "th" ? "เรื่องย่อ" : "Synopsis"}</h2>
              <p className="text-white/70 font-body leading-relaxed mb-4">{synopsis}</p>
              {altSynopsis && (
                <details className="group">
                  <summary className="text-orange text-sm font-thai cursor-pointer hover:underline">{lang === "th" ? "อ่านภาษาอังกฤษ" : "Read in Thai"}</summary>
                  <p className="text-white/50 font-body leading-relaxed mt-2">{altSynopsis}</p>
                </details>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pb-20">
            <FilmStrip color="orange" size="md">
              <h2 className="font-thai font-bold text-xl text-white">{lang === "th" ? "ละครที่เกี่ยวข้อง" : "Related Series"}</h2>
            </FilmStrip>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {related.map((s) => (
                <Link key={s.id} href={`/series/${s.slug}`} className="group bg-navy/60 rounded-xl border border-white/5 overflow-hidden hover:border-orange/30 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-purple/20 to-midnight flex items-center justify-center">
                    <span className="text-white/10 font-display text-3xl font-bold">{(lang === "th" ? s.titleTh : s.titleEn).charAt(0)}</span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-thai font-semibold text-sm text-white truncate group-hover:text-orange transition-colors">{lang === "th" ? s.titleTh : s.titleEn}</h3>
                    <p className="text-white/30 text-xs font-body">{s.year}</p>
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
