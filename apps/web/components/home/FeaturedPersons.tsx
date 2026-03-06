"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { persons } from "@/lib/mock-data/persons";
import { ChevronRight } from "lucide-react";
import { StaggerChildren, StaggerItem } from "@/components/motion";

const featured = persons.slice(0, 8);

export function FeaturedPersons() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "var(--ct-bg-page)" }}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(246,165,27,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--ct-text-primary)] font-thai">
              {lang === "th" ? "บุคลากรเด่น" : "Featured Personnel"}
            </h2>
            <p className="text-[var(--ct-text-faint)] text-sm mt-1 font-thai">
              {lang === "th" ? "ผู้กำกับและนักแสดงชั้นนำของวงการภาพยนตร์ไทย" : "Leading directors and actors in Thai cinema"}
            </p>
          </div>
          <Link href="/persons" className="group flex items-center gap-1 text-[#F6A51B] hover:text-[#F6A51B]/80 text-sm font-thai transition-colors">
            {lang === "th" ? "ดูทั้งหมด" : "View All"}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Person Grid */}
        <StaggerChildren staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-5">
          {featured.map((person) => (
            <StaggerItem key={person.id}>
              <Link href={`/persons/${person.slug}`} className="group block text-center">
                <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-[var(--ct-border)] group-hover:ring-[#F6A51B]/50 transition-all duration-300">
                  {person.photoUrl ? (
                    <Image
                      src={person.photoUrl}
                      alt={person.nameEn}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F6A51B]/20 to-[#702874]/20 flex items-center justify-center">
                      <span className="text-[var(--ct-text-faint)] font-display text-2xl font-bold">{person.nameEn.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-[var(--ct-text-primary)] text-xs md:text-sm font-thai font-medium leading-tight group-hover:text-[#F6A51B] transition-colors line-clamp-1">
                  {lang === "th" ? person.nameTh : person.nameEn}
                </h3>
                <p className="text-[var(--ct-text-faint)] text-[10px] md:text-xs mt-0.5 font-thai capitalize">
                  {person.roles[0] === "director" ? (lang === "th" ? "ผู้กำกับ" : "Director") : (lang === "th" ? "นักแสดง" : "Actor")}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
