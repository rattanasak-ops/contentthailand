"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Building2, Globe, Calendar, Film, Tv, Facebook, Share2, MessageCircle, Link as LinkCopy, ExternalLink, TrendingUp, Play } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/lib/mock-data/companies";
import { films } from "@/lib/mock-data/films";
import { series } from "@/lib/mock-data/series";
import { FilmCardGrid } from "@/components/films/FilmCardGrid";
import { NumberCounter } from "@/components/motion/number-counter";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const typeLabel: Record<string, { th: string; en: string; color: string }> = {
  production: { th: "บริษัทผลิต", en: "Production", color: "#702874" },
  distribution: { th: "จัดจำหน่าย", en: "Distribution", color: "#E65100" },
  streaming: { th: "สตรีมมิง", en: "Streaming", color: "#00695C" },
  broadcaster: { th: "สถานีโทรทัศน์", en: "Broadcaster", color: "#1565C0" },
};

export default function CompanyDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const slug = params.slug as string;
  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    return (
      <div className="min-h-screen bg-[var(--ct-bg-page)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[var(--ct-text-primary)] font-display text-6xl mb-4">404</h1>
          <p className="text-[var(--ct-text-muted)] font-thai text-lg">{lang === "th" ? "ไม่พบบริษัท" : "Company not found"}</p>
          <Link href="/companies" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#702874] text-white rounded-xl font-thai text-sm hover:bg-[#702874]/80 transition-colors">
            {lang === "th" ? "← กลับไปหน้าบริษัท" : "← Back to Companies"}
          </Link>
        </div>
      </div>
    );
  }

  const name = lang === "th" ? company.nameTh : company.nameEn;
  const altName = lang === "th" ? company.nameEn : company.nameTh;
  const companyFilms = films.filter((f) => f.companyId === company.id);
  const companySeries = series.filter((s) => s.companyId === company.id);
  const totalWorks = companyFilms.length + companySeries.length;
  const yearsActive = company.founded ? new Date().getFullYear() - company.founded : 0;
  const typeInfo = typeLabel[company.type] || { th: company.type, en: company.type, color: "#702874" };

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "บริษัท" : "Companies", href: "/companies" },
    { label: name },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool">
      {/* === CINEMATIC HERO === */}
      <div className="relative h-[40vh] md:h-[45vh] overflow-hidden">
        {/* Background: film poster or gradient */}
        {companyFilms[0]?.posterUrl ? (
          <>
            <div className="absolute inset-0 scale-110">
              <Image src={companyFilms[0].posterUrl} alt={name} fill className="object-cover object-top" />
            </div>
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ct-bg-page)] via-[var(--ct-bg-page)]/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 120% 80% at 30% 20%, ${typeInfo.color}30 0%, transparent 60%)` }} />
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 70% 70%, ${typeInfo.color}15 0%, transparent 50%)` }} />
          </>
        )}

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + i * 2,
                height: 4 + i * 2,
                background: `${typeInfo.color}40`,
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${typeInfo.color} 1px, transparent 1px), linear-gradient(90deg, ${typeInfo.color} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--ct-bg-page)] to-transparent" />
        <div className="absolute inset-0 film-grain" />
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-52 md:-mt-60 z-10 pb-24">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        {/* Company Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-2xl overflow-hidden mb-10"
          style={{
            backgroundColor: "var(--ct-bg-elevated)",
            border: "1px solid var(--ct-border)",
            boxShadow: `0 25px 80px -20px ${typeInfo.color}20`,
          }}
        >
          <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Logo with glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex-shrink-0 mx-auto md:mx-0"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{ background: `${typeInfo.color}15` }} />
                  <div
                    className="relative w-[130px] h-[130px] md:w-[160px] md:h-[160px] rounded-2xl overflow-hidden flex items-center justify-center bg-white shadow-xl"
                    style={{ border: `2px solid ${typeInfo.color}20` }}
                  >
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-16 h-16" style={{ color: typeInfo.color }} />
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex-1 min-w-0 text-center md:text-left"
              >
                {/* Type badge */}
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-thai font-semibold mb-3"
                  style={{ backgroundColor: `${typeInfo.color}15`, color: typeInfo.color }}
                >
                  <Building2 className="w-3 h-3" />
                  {typeInfo[lang]}
                </motion.span>

                <h1 className="font-thai text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--ct-text-primary)] mb-2 leading-tight">
                  {name}
                </h1>
                <p className="text-[var(--ct-text-muted)] font-body text-lg md:text-xl mb-6">{altName}</p>

                {/* Quick info pills */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {company.founded && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ct-bg-hover)] text-[var(--ct-text-secondary)] rounded-lg text-sm font-thai">
                      <Calendar className="w-3.5 h-3.5" />
                      {lang === "th" ? `ก่อตั้ง พ.ศ. ${company.founded + 543}` : `Est. ${company.founded}`}
                    </span>
                  )}
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ct-bg-hover)] text-[var(--ct-text-secondary)] rounded-lg text-sm font-thai hover:text-[var(--ct-text-primary)] transition-colors group">
                      <Globe className="w-3.5 h-3.5" />
                      {lang === "th" ? "เว็บไซต์" : "Website"}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="border-t border-[var(--ct-border)] bg-[var(--ct-bg-surface)]">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--ct-border)]">
              <StatItem icon={<Film className="w-5 h-5" />} value={companyFilms.length} label={lang === "th" ? "ภาพยนตร์" : "Films"} color={typeInfo.color} />
              <StatItem icon={<Tv className="w-5 h-5" />} value={companySeries.length} label={lang === "th" ? "ซีรีส์" : "Series"} color={typeInfo.color} />
              <StatItem icon={<Play className="w-5 h-5" />} value={totalWorks} label={lang === "th" ? "ผลงานทั้งหมด" : "Total Works"} color={typeInfo.color} />
              <StatItem icon={<TrendingUp className="w-5 h-5" />} value={yearsActive} label={lang === "th" ? "ปีในวงการ" : "Years Active"} suffix="+" color={typeInfo.color} />
            </div>
          </div>
        </motion.div>

        {/* About section */}
        {company.description && (
          <ScrollReveal>
            <div className="rounded-2xl p-6 md:p-8 mb-10" style={{ backgroundColor: "var(--ct-bg-elevated)", border: "1px solid var(--ct-border)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: typeInfo.color }} />
                <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">
                  {lang === "th" ? "เกี่ยวกับบริษัท" : "About the Company"}
                </h2>
              </div>
              <p className="text-[var(--ct-text-secondary)] font-body text-base md:text-lg leading-relaxed">
                {company.description}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Share bar */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-3 mb-14 px-2">
            <span className="text-[var(--ct-text-faint)] text-sm font-thai">{lang === "th" ? "แชร์หน้านี้:" : "Share this page:"}</span>
            <ShareButton onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} icon={<Facebook className="w-4 h-4" />} hoverColor="#1877F2" label="Facebook" />
            <ShareButton onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(name)}&url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} icon={<Share2 className="w-4 h-4" />} hoverColor="#1DA1F2" label="X" />
            <ShareButton onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} icon={<MessageCircle className="w-4 h-4" />} hoverColor="#06C755" label="LINE" />
            <ShareButton onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(lang === "th" ? "คัดลอกลิงก์แล้ว" : "Link copied!"); }} icon={<LinkCopy className="w-4 h-4" />} hoverColor="#F59E0B" label={lang === "th" ? "คัดลอก" : "Copy"} />
          </div>
        </ScrollReveal>

        {/* === FILMS SECTION === */}
        {companyFilms.length > 0 && (
          <ScrollReveal>
            <section className="mb-16 ct-section-b rounded-2xl px-4 py-6 -mx-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ backgroundColor: `${typeInfo.color}15` }}>
                  <Film className="w-5 h-5" style={{ color: typeInfo.color }} />
                </div>
                <div>
                  <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">
                    {lang === "th" ? "ภาพยนตร์" : "Films"}
                  </h2>
                  <p className="text-[var(--ct-text-faint)] text-xs font-thai">
                    {companyFilms.length} {lang === "th" ? "เรื่อง" : "titles"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {companyFilms.map((f, i) => (
                  <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}>
                    <FilmCardGrid film={f} />
                  </motion.div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === SERIES SECTION === */}
        {companySeries.length > 0 && (
          <ScrollReveal>
            <section className="mb-16 ct-section-c rounded-2xl px-4 py-6 -mx-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange/10">
                  <Tv className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">
                    {lang === "th" ? "ละครโทรทัศน์ / ซีรีส์" : "TV Series"}
                  </h2>
                  <p className="text-[var(--ct-text-faint)] text-xs font-thai">
                    {companySeries.length} {lang === "th" ? "เรื่อง" : "titles"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {companySeries.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}>
                    <Link
                      href={`/series/${s.slug}`}
                      className="group flex items-center gap-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg p-4"
                      style={{ backgroundColor: "var(--ct-bg-elevated)", border: "1px solid var(--ct-border)" }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                        <span className="text-orange font-display font-bold text-lg">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-thai font-semibold text-sm text-[var(--ct-text-primary)] group-hover:text-orange transition-colors truncate">
                          {lang === "th" ? s.titleTh : s.titleEn}
                        </h3>
                        <p className="text-[var(--ct-text-faint)] text-xs font-body mt-0.5">
                          {s.year} · {s.episodes} {lang === "th" ? "ตอน" : "ep"}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[var(--ct-text-faint)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* === OTHER COMPANIES === */}
        <ScrollReveal>
          <section>
            <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] mb-6">
              {lang === "th" ? "บริษัทอื่นๆ" : "Other Companies"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {companies.filter((c) => c.id !== company.id).slice(0, 5).map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}>
                  <Link
                    href={`/companies/${c.slug}`}
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{ backgroundColor: "var(--ct-bg-elevated)", border: "1px solid var(--ct-border)" }}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm">
                      {c.logoUrl ? (
                        <img src={c.logoUrl} alt={c.nameEn} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--ct-bg-hover)]">
                          <Building2 className="w-6 h-6 text-[var(--ct-text-faint)]" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-thai text-[var(--ct-text-secondary)] group-hover:text-[#702874] transition-colors text-center line-clamp-2">
                      {lang === "th" ? c.nameTh : c.nameEn}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}

/* === SUB-COMPONENTS === */

function StatItem({ icon, value, label, color, suffix = "" }: { icon: React.ReactNode; value: number; label: string; color: string; suffix?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-5 px-3">
      <div className="mb-1" style={{ color }}>{icon}</div>
      <div className="text-2xl md:text-3xl font-display font-bold text-[var(--ct-text-primary)]">
        <NumberCounter target={value} duration={1.5} suffix={suffix} />
      </div>
      <span className="text-[var(--ct-text-faint)] text-xs font-thai">{label}</span>
    </div>
  );
}

function ShareButton({ onClick, icon, hoverColor, label }: { onClick: () => void; icon: React.ReactNode; hoverColor: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-105"
      style={{ backgroundColor: "var(--ct-bg-hover)" }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${hoverColor}20`; e.currentTarget.style.color = hoverColor; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ct-bg-hover)"; e.currentTarget.style.color = ""; }}
    >
      {icon}
      <span className="text-xs font-thai hidden sm:inline">{label}</span>
    </button>
  );
}
