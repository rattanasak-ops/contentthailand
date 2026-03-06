"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/lib/mock-data/companies";
import { films } from "@/lib/mock-data/films";
import { ChevronRight, Building2, Film } from "lucide-react";

const featured = companies.slice(0, 6);

function getFilmCount(companyId: number) {
  return films.filter((f) => f.companyId === companyId).length;
}

export function FeaturedCompanies() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 bg-[#1C1B4E]/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(112,40,116,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-thai">
              {lang === "th" ? "บริษัทผู้ผลิตชั้นนำ" : "Leading Production Companies"}
            </h2>
            <p className="text-white/40 text-sm mt-1 font-thai">
              {lang === "th" ? "บริษัทผู้ผลิตภาพยนตร์และวีดิทัศน์ที่จดทะเบียนในระบบ" : "Registered film and video production companies"}
            </p>
          </div>
          <Link href="/companies" className="group flex items-center gap-1 text-[#702874] hover:text-[#702874]/80 text-sm font-thai transition-colors">
            {lang === "th" ? "ดูทั้งหมด" : "View All"}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/companies/${company.slug}`}
                className="group block rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  background: "linear-gradient(135deg, rgba(28,27,78,0.6) 0%, rgba(14,13,42,0.8) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="p-5 text-center">
                  {/* Logo */}
                  <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden group-hover:bg-white/10 transition-colors">
                    {company.logoUrl ? (
                      <Image
                        src={company.logoUrl}
                        alt={company.nameEn}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    ) : (
                      <Building2 className="w-8 h-8 text-white/30" />
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-white text-sm font-thai font-medium leading-tight group-hover:text-[#702874] transition-colors line-clamp-2 min-h-[2.5rem]">
                    {lang === "th" ? company.nameTh : company.nameEn}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-white/40 text-xs">
                      <Film className="w-3 h-3" />
                      {getFilmCount(company.id)} {lang === "th" ? "เรื่อง" : "films"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
