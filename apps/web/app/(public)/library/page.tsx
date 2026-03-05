"use client";

import { useState } from "react";
import { BookOpen, Download, FileText, BarChart3, Search } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Resource {
  id: number;
  titleTh: string;
  titleEn: string;
  category: string;
  type: "pdf" | "report" | "stats";
  year: number;
  size: string;
}

const resources: Resource[] = [
  { id: 1, titleTh: "รายงานสถานการณ์อุตสาหกรรมภาพยนตร์ไทย ประจำปี 2568", titleEn: "Thai Film Industry Report 2025", category: "report", type: "report", year: 2568, size: "4.2 MB" },
  { id: 2, titleTh: "สถิติผู้ชมภาพยนตร์ไทยในโรงภาพยนตร์ 2567", titleEn: "Thai Film Audience Statistics 2024", category: "statistics", type: "stats", year: 2567, size: "2.8 MB" },
  { id: 3, titleTh: "แนวทางการส่งเสริมภาพยนตร์ไทยสู่ตลาดสากล", titleEn: "Guidelines for Thai Film International Promotion", category: "guide", type: "pdf", year: 2568, size: "1.5 MB" },
  { id: 4, titleTh: "งานวิจัย: พฤติกรรมการรับชมสื่อของคนไทย 2567", titleEn: "Research: Thai Media Consumption Behavior 2024", category: "research", type: "pdf", year: 2567, size: "6.1 MB" },
  { id: 5, titleTh: "คู่มือการใช้งานระบบ ContentThailand", titleEn: "ContentThailand User Manual", category: "guide", type: "pdf", year: 2568, size: "3.4 MB" },
  { id: 6, titleTh: "รายงานผลการดำเนินงานกองภาพยนตร์ฯ ปี 2567", titleEn: "Film Division Annual Report 2024", category: "report", type: "report", year: 2567, size: "5.7 MB" },
  { id: 7, titleTh: "สถิติภาพยนตร์ไทยที่ได้รับรางวัลระดับนานาชาติ", titleEn: "Thai Films International Awards Statistics", category: "statistics", type: "stats", year: 2568, size: "1.2 MB" },
  { id: 8, titleTh: "แผนยุทธศาสตร์การพัฒนาอุตสาหกรรมภาพยนตร์ 2568-2572", titleEn: "Film Industry Strategic Plan 2025-2029", category: "report", type: "report", year: 2568, size: "8.3 MB" },
];

const categoryLabels: Record<string, { th: string; en: string }> = {
  report: { th: "รายงาน", en: "Report" },
  statistics: { th: "สถิติ", en: "Statistics" },
  research: { th: "งานวิจัย", en: "Research" },
  guide: { th: "คู่มือ", en: "Guide" },
};

const typeIcon: Record<string, typeof FileText> = {
  pdf: FileText,
  report: BookOpen,
  stats: BarChart3,
};

export default function LibraryPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "คลังความรู้" : "Library" },
  ];

  const filtered = resources.filter((r) => {
    const matchSearch = !search || r.titleTh.includes(search) || r.titleEn.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || r.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-8">
          <FilmStrip color="purple" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-white">
              {lang === "th" ? "คลังความรู้" : "Knowledge Library"}
            </h1>
          </FilmStrip>
          <p className="text-white/50 text-sm font-thai mt-3 ml-1">
            {lang === "th" ? "รายงาน งานวิจัย สถิติ และเอกสารเกี่ยวกับอุตสาหกรรมภาพยนตร์และวีดิทัศน์ไทย" : "Reports, research, statistics, and documents about the Thai film and video industry"}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder={lang === "th" ? "ค้นหาเอกสาร..." : "Search documents..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-navy/40 border-white/10 text-white placeholder:text-white/30 font-thai"
            />
          </div>
          <div className="flex gap-2">
            {["all", "report", "statistics", "research", "guide"].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-2 rounded-lg text-xs font-thai transition-all ${
                  category === c ? "bg-purple/20 text-purple-light" : "text-white/40 hover:text-white/60"
                }`}
              >
                {c === "all" ? (lang === "th" ? "ทั้งหมด" : "All") : (lang === "th" ? categoryLabels[c]?.th : categoryLabels[c]?.en)}
              </button>
            ))}
          </div>
        </div>

        {/* Resources list */}
        <div className="space-y-3">
          {filtered.map((r) => {
            const Icon = typeIcon[r.type] || FileText;
            const title = lang === "th" ? r.titleTh : r.titleEn;
            const catLabel = categoryLabels[r.category];
            return (
              <div key={r.id} className="group bg-navy/40 rounded-xl border border-white/5 p-5 hover:border-purple/20 transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple/20 to-midnight flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-purple-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-thai font-semibold text-white text-sm group-hover:text-purple-light transition-colors mb-1 line-clamp-1">{title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-thai bg-purple/10 text-purple-light border-purple/20">
                      {lang === "th" ? catLabel?.th : catLabel?.en}
                    </Badge>
                    <span className="text-white/30 text-[10px] font-mono">{r.year}</span>
                    <span className="text-white/30 text-[10px] font-mono">{r.size}</span>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber/10 text-amber text-xs font-thai hover:bg-amber/20 transition-colors flex-shrink-0">
                  <Download className="w-3.5 h-3.5" />
                  {lang === "th" ? "ดาวน์โหลด" : "Download"}
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/30 font-thai">
              {lang === "th" ? "ไม่พบเอกสาร" : "No documents found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
