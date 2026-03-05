"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Building2, Globe, Calendar } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/lib/mock-data/companies";
import { films } from "@/lib/mock-data/films";
import { series } from "@/lib/mock-data/series";
import { FilmCardGrid } from "@/components/films/FilmCardGrid";

export default function CompanyDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const slug = params.slug as string;
  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-display text-4xl mb-4">404</h1>
          <p className="text-white/50 font-thai">{lang === "th" ? "ไม่พบบริษัท" : "Company not found"}</p>
          <Link href="/companies" className="text-orange font-thai text-sm hover:underline mt-4 inline-block">{lang === "th" ? "← กลับ" : "← Back"}</Link>
        </div>
      </div>
    );
  }

  const name = lang === "th" ? company.nameTh : company.nameEn;
  const companyFilms = films.filter((f) => f.companyId === company.id);
  const companySeries = series.filter((s) => s.companyId === company.id);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "บริษัท" : "Companies", href: "/companies" },
    { label: name },
  ];

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="flex items-start gap-6 mb-10">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange/20 to-navy border border-white/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-8 h-8 text-orange/60" />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-white font-bold mb-1">{name}</h1>
            <p className="text-white/40 font-body">{lang === "th" ? company.nameEn : company.nameTh}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-purple/20 text-purple-light rounded-full text-sm font-thai">{company.type}</span>
              {company.founded && <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber/10 text-amber rounded-full text-sm font-thai"><Calendar className="w-3.5 h-3.5" />{company.founded}</span>}
              {company.website && <a href={company.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-white/60 rounded-full text-sm font-thai hover:text-white transition-colors"><Globe className="w-3.5 h-3.5" />{lang === "th" ? "เว็บไซต์" : "Website"}</a>}
            </div>
            {company.description && <p className="text-white/60 font-body mt-4">{company.description}</p>}
          </div>
        </div>

        {companyFilms.length > 0 && (
          <section className="mb-12">
            <FilmStrip color="pink" size="md">
              <h2 className="font-thai font-bold text-xl text-white">{lang === "th" ? "ภาพยนตร์" : "Films"} ({companyFilms.length})</h2>
            </FilmStrip>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
              {companyFilms.map((f) => <FilmCardGrid key={f.id} film={f} />)}
            </div>
          </section>
        )}

        {companySeries.length > 0 && (
          <section>
            <FilmStrip color="orange" size="md">
              <h2 className="font-thai font-bold text-xl text-white">{lang === "th" ? "ละครโทรทัศน์" : "TV Series"} ({companySeries.length})</h2>
            </FilmStrip>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {companySeries.map((s) => (
                <Link key={s.id} href={`/series/${s.slug}`} className="group bg-navy/60 rounded-xl border border-white/5 p-4 hover:border-orange/30 transition-all">
                  <h3 className="font-thai font-semibold text-sm text-white group-hover:text-orange transition-colors">{lang === "th" ? s.titleTh : s.titleEn}</h3>
                  <p className="text-white/30 text-xs font-body mt-0.5">{s.year} · {s.episodes} {lang === "th" ? "ตอน" : "ep"}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
