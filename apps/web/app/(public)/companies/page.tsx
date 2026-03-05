"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, Globe } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/lib/mock-data/companies";

export default function CompaniesPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "บริษัท" : "Companies" },
  ];

  const typeLabels: Record<string, { th: string; en: string }> = {
    production: { th: "ผลิตภาพยนตร์", en: "Production" },
    distribution: { th: "จัดจำหน่าย", en: "Distribution" },
    streaming: { th: "สตรีมมิ่ง", en: "Streaming" },
    broadcaster: { th: "สถานีโทรทัศน์", en: "Broadcaster" },
  };

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-8">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-white">{lang === "th" ? "บริษัทในวงการ" : "Industry Companies"}</h1>
          </FilmStrip>
          <p className="text-white/50 text-sm font-thai mt-3 ml-1">{companies.length} {lang === "th" ? "บริษัท" : "companies"}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c) => {
            const name = lang === "th" ? c.nameTh : c.nameEn;
            const tl = typeLabels[c.type] || { th: c.type, en: c.type };
            return (
              <Link key={c.id} href={`/companies/${c.slug}`} className="group bg-navy/60 rounded-xl border border-white/5 p-6 hover:border-orange/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange/20 to-midnight border border-white/5 flex items-center justify-center mb-4 overflow-hidden relative">
                  {c.logoUrl ? (
                    <Image src={c.logoUrl} alt={name} fill className="object-contain p-2" sizes="56px" />
                  ) : (
                    <Building2 className="w-6 h-6 text-orange/60" />
                  )}
                </div>
                <h3 className="font-thai font-semibold text-white group-hover:text-orange transition-colors mb-1">{name}</h3>
                <p className="text-white/40 text-xs font-body mb-3">{lang === "th" ? c.nameEn : c.nameTh}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light text-[10px] rounded font-thai">{lang === "th" ? tl.th : tl.en}</span>
                  {c.founded && <span className="text-white/30 text-[10px] font-thai">{lang === "th" ? `ก่อตั้ง ${c.founded + 543}` : `Est. ${c.founded}`}</span>}
                </div>
                {c.description && <p className="text-white/30 text-xs font-body line-clamp-2">{c.description}</p>}
                {c.website && (
                  <div className="mt-3 flex items-center gap-1 text-white/20 text-[10px]">
                    <Globe className="w-3 h-3" />
                    <span className="truncate">{c.website.replace("https://www.", "")}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
