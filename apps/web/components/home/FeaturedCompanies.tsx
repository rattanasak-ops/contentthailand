"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/lib/mock-data/companies";
import { films } from "@/lib/mock-data/films";
import { ChevronRight, Film, ArrowRight } from "lucide-react";
import { StaggerChildren, StaggerItem } from "@/components/motion";

const featured = companies.slice(0, 6);

function getFilmCount(companyId: number) {
  return films.filter((f) => f.companyId === companyId).length;
}

export function FeaturedCompanies() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--ct-bg-page), var(--ct-bg-surface) 30%)" }}>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(112,40,116,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--ct-text-primary)] font-thai">
              {lang === "th" ? "บริษัทผู้ผลิตชั้นนำ" : "Leading Production Companies"}
            </h2>
            <p className="text-[var(--ct-text-faint)] text-sm mt-1 font-thai">
              {lang === "th" ? "บริษัทผู้ผลิตภาพยนตร์และวีดิทัศน์ที่จดทะเบียนในระบบ" : "Registered film and video production companies"}
            </p>
          </div>
          <Link href="/companies" className="group flex items-center gap-1 text-[#702874] hover:text-[#702874]/80 text-sm font-thai transition-colors">
            {lang === "th" ? "ดูทั้งหมด" : "View All"}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Companies Grid */}
        <StaggerChildren staggerDelay={0.07} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured.map((company) => {
            const filmCount = getFilmCount(company.id);
            return (
              <StaggerItem key={company.id}>
                <Link
                  href={`/companies/${company.slug}`}
                  className="group block rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--ct-bg-elevated)",
                    border: "1px solid var(--ct-border)",
                  }}
                >
                  <div className="p-5 text-center">
                    {/* Logo */}
                    <div className="w-20 h-20 mx-auto mb-3 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-white">
                      {company.logoUrl ? (
                        <img
                          src={company.logoUrl}
                          alt={company.nameEn}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--ct-bg-hover)] flex items-center justify-center">
                          <span className="text-2xl font-bold text-[var(--ct-text-faint)]">
                            {company.nameEn.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-[var(--ct-text-primary)] text-sm font-thai font-semibold leading-tight group-hover:text-[#702874] transition-colors line-clamp-2 min-h-[2.5rem]">
                      {lang === "th" ? company.nameTh : company.nameEn}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-[var(--ct-text-faint)] text-xs">
                        <Film className="w-3 h-3" />
                        {filmCount} {lang === "th" ? "เรื่อง" : "films"}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 text-[#702874] text-xs font-thai">
                        {lang === "th" ? "ดูรายละเอียด" : "View Details"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
