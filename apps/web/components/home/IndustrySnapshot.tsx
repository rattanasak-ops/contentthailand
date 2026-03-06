"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, TrendingUp, BarChart3, Download } from "lucide-react";

const yearlyData = [
  { year: "2564", yearEn: "2021", films: 38, series: 52 },
  { year: "2565", yearEn: "2022", films: 45, series: 61 },
  { year: "2566", yearEn: "2023", films: 52, series: 78 },
  { year: "2567", yearEn: "2024", films: 68, series: 95 },
  { year: "2568", yearEn: "2025", films: 42, series: 55 },
];

const maxValue = Math.max(...yearlyData.flatMap((d) => [d.films, d.series]));

export function IndustrySnapshot() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--ct-bg-page), black 8%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Chart Area - 3 cols */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)]">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EC1C72]/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-[#EC1C72]" />
                    </div>
                    <div>
                      <h3 className="text-[var(--ct-text-primary)] font-bold font-thai">
                        {lang === "th" ? "ภาพรวมอุตสาหกรรม" : "Industry Overview"}
                      </h3>
                      <p className="text-[var(--ct-text-faint)] text-xs font-thai">
                        {lang === "th" ? "จำนวนผลงานใหม่รายปี" : "New content by year"}
                      </p>
                    </div>
                  </div>
                  <Link href="/statistics" className="group flex items-center gap-1 text-[#EC1C72] hover:text-[#EC1C72]/80 text-sm font-thai transition-colors">
                    {lang === "th" ? "ดู Dashboard" : "Full Dashboard"}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Simple Bar Chart */}
                <div className="space-y-4">
                  {yearlyData.map((d, i) => (
                    <motion.div
                      key={d.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <span className="text-[var(--ct-text-muted)] text-sm font-mono w-10 shrink-0">
                        {lang === "th" ? d.year : d.yearEn}
                      </span>
                      <div className="flex-1 flex flex-col gap-1.5">
                        {/* Films bar */}
                        <div className="flex items-center gap-2">
                          <div className="h-5 rounded-r-md relative overflow-hidden" style={{
                            width: `${(d.films / maxValue) * 100}%`,
                            background: "linear-gradient(90deg, #EC1C72, #EC1C72cc)",
                          }}>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                          </div>
                          <span className="text-[var(--ct-text-muted)] text-xs font-mono">{d.films}</span>
                        </div>
                        {/* Series bar */}
                        <div className="flex items-center gap-2">
                          <div className="h-5 rounded-r-md relative overflow-hidden" style={{
                            width: `${(d.series / maxValue) * 100}%`,
                            background: "linear-gradient(90deg, #F76532, #F76532cc)",
                          }}>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                          </div>
                          <span className="text-[var(--ct-text-muted)] text-xs font-mono">{d.series}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[var(--ct-border)]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#EC1C72]" />
                    <span className="text-[var(--ct-text-muted)] text-xs font-thai">
                      {lang === "th" ? "ภาพยนตร์" : "Films"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#F76532]" />
                    <span className="text-[var(--ct-text-muted)] text-xs font-thai">
                      {lang === "th" ? "ละครโทรทัศน์" : "TV Series"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights - 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Growth Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-[#EC1C72]" />
                <span className="text-[#EC1C72] font-bold text-sm font-thai">
                  {lang === "th" ? "เติบโต +42%" : "+42% Growth"}
                </span>
              </div>
              <p className="text-[var(--ct-text-secondary)] text-sm font-thai leading-relaxed">
                {lang === "th"
                  ? "จำนวนภาพยนตร์ไทยที่ผลิตในปี 2567 เพิ่มขึ้น 42% เมื่อเทียบกับปี 2565 สะท้อนการเติบโตของอุตสาหกรรม"
                  : "Thai film production in 2024 increased 42% compared to 2022, reflecting industry growth"}
              </p>
            </motion.div>

            {/* Export Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-6 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <Download className="w-5 h-5 text-[#F6A51B]" />
                <span className="text-[#F6A51B] font-bold text-sm font-thai">
                  {lang === "th" ? "ส่งออกข้อมูล" : "Export Data"}
                </span>
              </div>
              <p className="text-[var(--ct-text-secondary)] text-sm font-thai leading-relaxed mb-4">
                {lang === "th"
                  ? "ดาวน์โหลดข้อมูลสถิติอุตสาหกรรมภาพยนตร์ในรูปแบบ Excel หรือ PDF สำหรับการวิจัยและวิเคราะห์"
                  : "Download industry statistics in Excel or PDF for research and analysis"}
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-[#F6A51B]/10 text-[#F6A51B] text-xs font-thai hover:bg-[#F6A51B]/20 transition-colors">
                  Excel
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#F6A51B]/10 text-[#F6A51B] text-xs font-thai hover:bg-[#F6A51B]/20 transition-colors">
                  PDF
                </button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 flex-1 bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)]"
            >
              <h4 className="text-[var(--ct-text-primary)] font-bold text-sm font-thai mb-3">
                {lang === "th" ? "ข้อมูลเด่น" : "Key Insights"}
              </h4>
              <ul className="space-y-2 text-[var(--ct-text-muted)] text-sm font-thai">
                <li className="flex items-start gap-2">
                  <span className="text-[#702874] mt-1">&#9679;</span>
                  {lang === "th" ? "ประเภทหนังยอดนิยม: ดราม่า (32%)" : "Top genre: Drama (32%)"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#702874] mt-1">&#9679;</span>
                  {lang === "th" ? "บริษัทผู้ผลิตมากที่สุด: GDH 559" : "Top producer: GDH 559"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#702874] mt-1">&#9679;</span>
                  {lang === "th" ? "ปีที่ผลิตมากที่สุด: 2567" : "Peak production year: 2024"}
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
