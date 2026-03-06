"use client";

import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, TrendingUp, BarChart3, Download } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const yearlyData = [
  { year: "2564", yearEn: "2021", films: 38, series: 52 },
  { year: "2565", yearEn: "2022", films: 45, series: 61 },
  { year: "2566", yearEn: "2023", films: 52, series: 78 },
  { year: "2567", yearEn: "2024", films: 68, series: 95 },
  { year: "2568", yearEn: "2025", films: 42, series: 55 },
];

const maxValue = Math.max(...yearlyData.flatMap((d) => [d.films, d.series]));

function AnimatedNumber({ value, isVisible }: { value: number; isVisible: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, isVisible]);

  return <span>{display}</span>;
}

function AnimatedBar({
  value,
  color,
  colorEnd,
  index,
  rowIndex,
  isVisible,
  label,
}: {
  value: number;
  color: string;
  colorEnd: string;
  index: number;
  rowIndex: number;
  isVisible: boolean;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  const percentage = (value / maxValue) * 100;
  const delay = rowIndex * 0.12 + index * 0.06;

  return (
    <div className="flex items-center gap-2 group">
      <div className="relative flex-1 h-7 rounded-r-lg overflow-hidden bg-white/[0.03]">
        <motion.div
          className="h-full rounded-r-lg relative cursor-pointer"
          initial={{ width: 0, opacity: 0 }}
          animate={isVisible ? { width: `${percentage}%`, opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{
            width: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            opacity: { delay, duration: 0.3 },
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: `linear-gradient(90deg, ${color}, ${colorEnd})`,
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ x: "-100%" }}
            animate={isVisible ? { x: "200%" } : { x: "-100%" }}
            transition={{ delay: delay + 0.8, duration: 0.8, ease: "easeOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />

          {/* Glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-r-lg"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: `0 0 20px ${color}60, inset 0 0 15px rgba(255,255,255,0.1)`,
            }}
          />
        </motion.div>

        {/* Tooltip on hover */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
          style={{ left: `${Math.min(percentage + 2, 85)}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <div className="bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] rounded-lg px-2.5 py-1 shadow-xl whitespace-nowrap">
            <span className="text-[var(--ct-text-primary)] text-xs font-bold">{value}</span>
            <span className="text-[var(--ct-text-faint)] text-xs ml-1">{label}</span>
          </div>
        </motion.div>
      </div>

      {/* Number */}
      <motion.span
        className="text-[var(--ct-text-muted)] text-xs font-mono w-8 text-right tabular-nums"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.6, duration: 0.3 }}
      >
        <AnimatedNumber value={value} isVisible={isVisible} />
      </motion.span>
    </div>
  );
}

export function IndustrySnapshot() {
  const { lang } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: "-50px" });

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--ct-bg-page), black 8%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Chart Area - 3 cols */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)]">
              <div className="p-6 md:p-8" ref={chartRef}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-[#EC1C72]/10 flex items-center justify-center"
                      animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                    >
                      <BarChart3 className="w-5 h-5 text-[#EC1C72]" />
                    </motion.div>
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

                {/* Animated Bar Chart */}
                <div className="space-y-5">
                  {yearlyData.map((d, i) => {
                    const prevData = yearlyData[i - 1];
                    const filmGrowth = prevData ? Math.round(((d.films - prevData.films) / prevData.films) * 100) : null;

                    return (
                      <motion.div
                        key={d.year}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-12 shrink-0 text-right">
                          <span className="text-[var(--ct-text-muted)] text-sm font-mono">
                            {lang === "th" ? d.year : d.yearEn}
                          </span>
                          {filmGrowth !== null && (
                            <motion.div
                              className={`text-[10px] font-mono ${filmGrowth >= 0 ? "text-emerald-400" : "text-red-400"}`}
                              initial={{ opacity: 0 }}
                              animate={isInView ? { opacity: 1 } : {}}
                              transition={{ delay: i * 0.12 + 1, duration: 0.3 }}
                            >
                              {filmGrowth >= 0 ? "+" : ""}{filmGrowth}%
                            </motion.div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                          <AnimatedBar
                            value={d.films}
                            color="#EC1C72"
                            colorEnd="#EC1C72aa"
                            index={0}
                            rowIndex={i}
                            isVisible={isInView}
                            label={lang === "th" ? "เรื่อง" : "films"}
                          />
                          <AnimatedBar
                            value={d.series}
                            color="#F76532"
                            colorEnd="#F76532aa"
                            index={1}
                            rowIndex={i}
                            isVisible={isInView}
                            label={lang === "th" ? "เรื่อง" : "series"}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Legend */}
                <motion.div
                  className="flex items-center gap-6 mt-6 pt-4 border-t border-[var(--ct-border)]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "linear-gradient(135deg, #EC1C72, #EC1C72aa)" }}
                      animate={isInView ? { scale: [0, 1.2, 1] } : {}}
                      transition={{ delay: 1.3, duration: 0.4 }}
                    />
                    <span className="text-[var(--ct-text-muted)] text-xs font-thai">
                      {lang === "th" ? "ภาพยนตร์" : "Films"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "linear-gradient(135deg, #F76532, #F76532aa)" }}
                      animate={isInView ? { scale: [0, 1.2, 1] } : {}}
                      transition={{ delay: 1.4, duration: 0.4 }}
                    />
                    <span className="text-[var(--ct-text-muted)] text-xs font-thai">
                      {lang === "th" ? "ละครโทรทัศน์" : "TV Series"}
                    </span>
                  </div>
                </motion.div>
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
