"use client";

import { BarChart3, TrendingUp, Film, Tv, Users, Building2, Eye } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const yearlyStats = [
  { year: 2564, films: 42, series: 85, persons: 620, companies: 55 },
  { year: 2565, films: 56, series: 92, persons: 780, companies: 68 },
  { year: 2566, films: 68, series: 108, persons: 950, companies: 82 },
  { year: 2567, films: 75, series: 120, persons: 1100, companies: 95 },
  { year: 2568, films: 82, series: 132, persons: 1250, companies: 110 },
];

const genreDistribution = [
  { genre: "ดราม่า", genreEn: "Drama", count: 185, pct: 33 },
  { genre: "แอ็คชั่น", genreEn: "Action", count: 95, pct: 17 },
  { genre: "คอมเมดี้", genreEn: "Comedy", count: 78, pct: 14 },
  { genre: "สยองขวัญ", genreEn: "Horror", count: 72, pct: 13 },
  { genre: "โรแมนติก", genreEn: "Romance", count: 56, pct: 10 },
  { genre: "สารคดี", genreEn: "Documentary", count: 42, pct: 7 },
  { genre: "อื่นๆ", genreEn: "Others", count: 34, pct: 6 },
];

const topCompanyTypes = [
  { type: "Production", typeTh: "ผลิตภาพยนตร์", count: 320, pct: 47 },
  { type: "Post Production", typeTh: "โพสต์โปรดักชั่น", count: 185, pct: 27 },
  { type: "Distribution", typeTh: "จัดจำหน่าย", count: 98, pct: 14 },
  { type: "VFX/Animation", typeTh: "วีเอฟเอ็กซ์/แอนิเมชัน", count: 78, pct: 12 },
];

export default function StatisticsPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "สถิติ" : "Statistics" },
  ];

  const summaryCards = [
    { icon: Film, label: lang === "th" ? "ภาพยนตร์" : "Films", value: "562", color: "text-pink", bg: "bg-pink/10" },
    { icon: Tv, label: lang === "th" ? "ละครโทรทัศน์" : "TV Series", value: "737", color: "text-orange", bg: "bg-orange/10" },
    { icon: Users, label: lang === "th" ? "บุคลากร" : "Personnel", value: "5,888", color: "text-amber", bg: "bg-amber/10" },
    { icon: Building2, label: lang === "th" ? "บริษัท" : "Companies", value: "681", color: "text-purple-light", bg: "bg-purple/10" },
    { icon: Eye, label: lang === "th" ? "ผู้เข้าชม" : "Visitors", value: "1.25M", color: "text-pink", bg: "bg-pink/10" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-amber" />
              {lang === "th" ? "สถิติอุตสาหกรรม" : "Industry Statistics"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3">
            {lang === "th"
              ? "ภาพรวมข้อมูลอุตสาหกรรมภาพยนตร์และวีดิทัศน์ของประเทศไทย"
              : "Overview of Thailand's film and video industry data"}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-5 text-center">
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <p className="font-display text-2xl font-bold text-[var(--ct-text-primary)]">{card.value}</p>
                <p className="text-[var(--ct-text-muted)] text-xs font-thai mt-1">{card.label}</p>
              </div>
            );
          })}
        </div>

        {/* Dashboard Section */}
        <div className="mb-10">
          <FilmStrip color="pink" size="md">
            <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-pink" />
              {lang === "th" ? "Dashboard" : "Dashboard"}
            </h2>
          </FilmStrip>

          {/* Yearly Trend Table */}
          <div className="mt-6 bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] overflow-hidden">
            <div className="p-4 border-b border-[var(--ct-border)]">
              <h3 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm">
                {lang === "th" ? "จำนวนข้อมูลรายปี" : "Yearly Data Count"}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--ct-border)]">
                    <th className="text-left text-[var(--ct-text-muted)] font-thai font-medium px-4 py-3">{lang === "th" ? "ปี" : "Year"}</th>
                    <th className="text-right text-[var(--ct-text-muted)] font-thai font-medium px-4 py-3">{lang === "th" ? "ภาพยนตร์" : "Films"}</th>
                    <th className="text-right text-[var(--ct-text-muted)] font-thai font-medium px-4 py-3">{lang === "th" ? "ละคร" : "Series"}</th>
                    <th className="text-right text-[var(--ct-text-muted)] font-thai font-medium px-4 py-3">{lang === "th" ? "บุคลากร" : "Personnel"}</th>
                    <th className="text-right text-[var(--ct-text-muted)] font-thai font-medium px-4 py-3">{lang === "th" ? "บริษัท" : "Companies"}</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyStats.map((row) => (
                    <tr key={row.year} className="border-b border-[var(--ct-border)] hover:bg-[var(--ct-bg-hover)] transition-colors">
                      <td className="px-4 py-3 text-amber font-mono font-bold">{row.year}</td>
                      <td className="px-4 py-3 text-right text-[var(--ct-text-secondary)] font-body">{row.films}</td>
                      <td className="px-4 py-3 text-right text-[var(--ct-text-secondary)] font-body">{row.series}</td>
                      <td className="px-4 py-3 text-right text-[var(--ct-text-secondary)] font-body">{row.persons.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-[var(--ct-text-secondary)] font-body">{row.companies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trend Section */}
        <div className="mb-10">
          <FilmStrip color="orange" size="md">
            <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange" />
              {lang === "th" ? "Trend อุตสาหกรรม" : "Industry Trends"}
            </h2>
          </FilmStrip>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Genre Distribution */}
            <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
              <h3 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm mb-4">
                {lang === "th" ? "สัดส่วนประเภทภาพยนตร์" : "Film Genre Distribution"}
              </h3>
              <div className="space-y-3">
                {genreDistribution.map((g) => (
                  <div key={g.genre}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--ct-text-secondary)] font-thai">{lang === "th" ? g.genre : g.genreEn}</span>
                      <span className="text-[var(--ct-text-muted)] font-mono">{g.count} ({g.pct}%)</span>
                    </div>
                    <div className="h-2 bg-[var(--ct-bg-page)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink to-orange rounded-full transition-all"
                        style={{ width: `${g.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Type Distribution */}
            <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
              <h3 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm mb-4">
                {lang === "th" ? "ประเภทบริษัท" : "Company Types"}
              </h3>
              <div className="space-y-3">
                {topCompanyTypes.map((c) => (
                  <div key={c.type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--ct-text-secondary)] font-thai">{lang === "th" ? c.typeTh : c.type}</span>
                      <span className="text-[var(--ct-text-muted)] font-mono">{c.count} ({c.pct}%)</span>
                    </div>
                    <div className="h-2 bg-[var(--ct-bg-page)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber to-orange rounded-full transition-all"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Growth Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              {
                title: lang === "th" ? "อัตราการเติบโตภาพยนตร์" : "Film Growth Rate",
                value: "+9.3%",
                desc: lang === "th" ? "เพิ่มขึ้นจากปีก่อน" : "Year-over-year increase",
                color: "text-pink",
              },
              {
                title: lang === "th" ? "ละครโทรทัศน์ใหม่" : "New TV Series",
                value: "+10%",
                desc: lang === "th" ? "เพิ่มขึ้นจากปีก่อน" : "Year-over-year increase",
                color: "text-orange",
              },
              {
                title: lang === "th" ? "บุคลากรใหม่ในระบบ" : "New Personnel Registered",
                value: "+13.6%",
                desc: lang === "th" ? "เพิ่มขึ้นจากปีก่อน" : "Year-over-year increase",
                color: "text-amber",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-5">
                <p className="text-[var(--ct-text-muted)] text-xs font-thai mb-2">{item.title}</p>
                <p className={`font-display text-3xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-[var(--ct-text-faint)] text-xs font-thai mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
