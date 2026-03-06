"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart3, Film, Tv, Users, Building2, Eye, Download,
  Copy, Check, ChevronRight, Award, Star, Calendar, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend,
} from "recharts";
import { motion, useInView, animate } from "framer-motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── Mock Data ─── */
const yearlyStats = [
  { year: "2563", yearEn: "2020", films: 32, series: 68, persons: 480, companies: 42 },
  { year: "2564", yearEn: "2021", films: 42, series: 85, persons: 620, companies: 55 },
  { year: "2565", yearEn: "2022", films: 56, series: 92, persons: 780, companies: 68 },
  { year: "2566", yearEn: "2023", films: 68, series: 108, persons: 950, companies: 82 },
  { year: "2567", yearEn: "2024", films: 75, series: 120, persons: 1100, companies: 95 },
  { year: "2568", yearEn: "2025", films: 82, series: 132, persons: 1250, companies: 110 },
];

const genreData = [
  { name: "ดราม่า", nameEn: "Drama", value: 185, color: "#EC1C72" },
  { name: "แอ็คชั่น", nameEn: "Action", value: 95, color: "#F76532" },
  { name: "คอมเมดี้", nameEn: "Comedy", value: 78, color: "#F6A51B" },
  { name: "สยองขวัญ", nameEn: "Horror", value: 72, color: "#702874" },
  { name: "โรแมนติก", nameEn: "Romance", value: 56, color: "#EC1C72aa" },
  { name: "สารคดี", nameEn: "Documentary", value: 42, color: "#F76532aa" },
  { name: "อื่นๆ", nameEn: "Others", value: 34, color: "#888" },
];

const personnelByRole = [
  { role: "นักแสดง", roleEn: "Actors", count: 2840 },
  { role: "ผู้กำกับ", roleEn: "Directors", count: 520 },
  { role: "ผู้เขียนบท", roleEn: "Screenwriters", count: 380 },
  { role: "ตากล้อง", roleEn: "Cinematographers", count: 290 },
  { role: "ตัดต่อ", roleEn: "Editors", count: 245 },
  { role: "ดนตรี", roleEn: "Music", count: 180 },
  { role: "อื่นๆ", roleEn: "Others", count: 1433 },
];

const monthlyVisitors = [
  { month: "ม.ค.", monthEn: "Jan", visitors: 45200 },
  { month: "ก.พ.", monthEn: "Feb", visitors: 52100 },
  { month: "มี.ค.", monthEn: "Mar", visitors: 61500 },
  { month: "เม.ย.", monthEn: "Apr", visitors: 58300 },
  { month: "พ.ค.", monthEn: "May", visitors: 72400 },
  { month: "มิ.ย.", monthEn: "Jun", visitors: 68900 },
  { month: "ก.ค.", monthEn: "Jul", visitors: 85200 },
  { month: "ส.ค.", monthEn: "Aug", visitors: 91500 },
  { month: "ก.ย.", monthEn: "Sep", visitors: 78600 },
  { month: "ต.ค.", monthEn: "Oct", visitors: 95800 },
  { month: "พ.ย.", monthEn: "Nov", visitors: 102300 },
  { month: "ธ.ค.", monthEn: "Dec", visitors: 115000 },
];

const topFilms = [
  { rank: 1, title: "หลานม่า", titleEn: "How to Make Millions Before Grandma Dies", year: "2567", genre: "ดราม่า" },
  { rank: 2, title: "ธี่หยด", titleEn: "Death Whisperer", year: "2566", genre: "สยองขวัญ" },
  { rank: 3, title: "สัปเหร่อ", titleEn: "The Undertaker", year: "2566", genre: "ดราม่า" },
  { rank: 4, title: "4KINGS2", titleEn: "4KINGS2", year: "2567", genre: "แอ็คชั่น" },
  { rank: 5, title: "ขุนพันธ์ 3", titleEn: "Khun Phan 3", year: "2566", genre: "แอ็คชั่น" },
];

const topPersons = [
  { rank: 1, name: "พุทธิพงษ์ คล้ายคลึง", nameEn: "Billkin", role: "นักแสดง" },
  { rank: 2, name: "ปัทม์ วิสมิตะนันทน์", nameEn: "Pat Boonnitipat", role: "ผู้กำกับ" },
  { rank: 3, name: "อุษามณี ไวทยานนท์", nameEn: "Usamanee Vaithayanon", role: "นักแสดง" },
  { rank: 4, name: "นาดาว บางกอก", nameEn: "Nadao Bangkok", role: "โปรดิวเซอร์" },
  { rank: 5, name: "บรรจง ปิสัญธนะกูล", nameEn: "Banjong Pisanthanakun", role: "ผู้กำกับ" },
];

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── Custom Tooltip for recharts ─── */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] rounded-xl p-3 shadow-xl">
      <p className="text-[var(--ct-text-primary)] text-xs font-bold mb-1">{label}</p>
      {payload.map((entry, i: number) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{entry.value?.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function StatisticsPage() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [activeGenre, setActiveGenre] = useState<number | null>(null);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "Dashboard" : "Dashboard" },
  ];

  const summaryCards = [
    { icon: Film, label: lang === "th" ? "ภาพยนตร์" : "Films", value: 562, growth: 9.3, color: "#EC1C72", bg: "bg-[#EC1C72]/10" },
    { icon: Tv, label: lang === "th" ? "ละครโทรทัศน์" : "TV Series", value: 737, growth: 10.0, color: "#F76532", bg: "bg-[#F76532]/10" },
    { icon: Users, label: lang === "th" ? "บุคลากร" : "Personnel", value: 5888, growth: 13.6, color: "#F6A51B", bg: "bg-[#F6A51B]/10" },
    { icon: Building2, label: lang === "th" ? "บริษัท" : "Companies", value: 681, growth: 15.8, color: "#702874", bg: "bg-[#702874]/10" },
    { icon: Eye, label: lang === "th" ? "ผู้เข้าชม/เดือน" : "Visitors/mo", value: 125000, growth: 22.4, color: "#EC1C72", bg: "bg-[#EC1C72]/10" },
  ];

  const chartData = yearlyStats.map((d) => ({
    name: lang === "th" ? d.year : d.yearEn,
    [lang === "th" ? "ภาพยนตร์" : "Films"]: d.films,
    [lang === "th" ? "ละคร" : "Series"]: d.series,
  }));

  const personnelChartData = personnelByRole.map((d) => ({
    name: lang === "th" ? d.role : d.roleEn,
    [lang === "th" ? "จำนวน" : "Count"]: d.count,
  }));

  const visitorChartData = monthlyVisitors.map((d) => ({
    name: lang === "th" ? d.month : d.monthEn,
    [lang === "th" ? "ผู้เข้าชม" : "Visitors"]: d.visitors,
  }));

  const handleExport = (format: string) => {
    const msg = lang === "th"
      ? `กำลังเตรียมไฟล์ ${format}... (Demo mode)`
      : `Preparing ${format} file... (Demo mode)`;
    alert(msg);
  };

  const citationAPA = `กองภาพยนตร์และวีดิทัศน์, กรมส่งเสริมวัฒนธรรม. (${new Date().getFullYear()}). สถิติอุตสาหกรรมภาพยนตร์และวีดิทัศน์แห่งชาติ. ContentThailand. สืบค้นเมื่อ ${new Date().toISOString().split("T")[0]}, จาก https://contentthailand.com/statistics`;
  const citationAPAen = `Film Division, Department of Cultural Promotion. (${new Date().getFullYear()}). National Film and Video Industry Statistics. ContentThailand. Retrieved ${new Date().toISOString().split("T")[0]}, from https://contentthailand.com/statistics`;
  const citation = lang === "th" ? citationAPA : citationAPAen;

  const handleCopy = () => {
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EC1C72]/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[#EC1C72]" />
            </div>
            {lang === "th" ? "Dashboard สถิติอุตสาหกรรม" : "Industry Statistics Dashboard"}
          </h1>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 ml-[52px]">
            {lang === "th"
              ? "ภาพรวมข้อมูลอุตสาหกรรมภาพยนตร์และวีดิทัศน์ของประเทศไทย อัปเดตล่าสุด: มีนาคม 2568"
              : "Overview of Thailand's film and video industry data. Last updated: March 2025"}
          </p>
        </motion.div>

        {/* ──── Summary Cards ──── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-5 group hover:border-[var(--ct-border-hover)] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-mono ${card.growth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {card.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.growth}%
                  </div>
                </div>
                <p className="font-display text-2xl font-bold text-[var(--ct-text-primary)]">
                  <AnimatedCounter value={card.value} />
                </p>
                <p className="text-[var(--ct-text-muted)] text-xs font-thai mt-1">{card.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ──── Charts Row 1: Yearly Trend + Genre ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Yearly Production Chart */}
          <motion.div
            className="lg:col-span-2 bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-thai font-bold text-[var(--ct-text-primary)] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#EC1C72]" />
                  {lang === "th" ? "จำนวนผลงานใหม่รายปี" : "New Productions by Year"}
                </h2>
                <p className="text-[var(--ct-text-faint)] text-xs font-thai mt-0.5">
                  {lang === "th" ? "พ.ศ. 2563 - 2568" : "2020 - 2025"}
                </p>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ct-border)" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "var(--ct-text-muted)", fontSize: 12 }}
                    axisLine={{ stroke: "var(--ct-border)" }}
                  />
                  <YAxis
                    tick={{ fill: "var(--ct-text-muted)", fontSize: 12 }}
                    axisLine={{ stroke: "var(--ct-border)" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-noto-sans-thai)" }}
                  />
                  <Bar
                    dataKey={lang === "th" ? "ภาพยนตร์" : "Films"}
                    fill="#EC1C72"
                    radius={[4, 4, 0, 0]}
                    animationBegin={200}
                    animationDuration={1200}
                  />
                  <Bar
                    dataKey={lang === "th" ? "ละคร" : "Series"}
                    fill="#F76532"
                    radius={[4, 4, 0, 0]}
                    animationBegin={400}
                    animationDuration={1200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Genre Pie Chart */}
          <motion.div
            className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-[#F6A51B]" />
              {lang === "th" ? "สัดส่วนประเภทภาพยนตร์" : "Film Genre Distribution"}
            </h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData.map((d) => ({ ...d, displayName: lang === "th" ? d.name : d.nameEn }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="displayName"
                    animationBegin={300}
                    animationDuration={1500}
                    onMouseEnter={(_, index) => setActiveGenre(index)}
                    onMouseLeave={() => setActiveGenre(null)}
                  >
                    {genreData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                        opacity={activeGenre === null || activeGenre === index ? 1 : 0.4}
                        stroke={activeGenre === index ? entry.color : "transparent"}
                        strokeWidth={activeGenre === index ? 3 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
              {genreData.map((g, i) => (
                <div
                  key={g.name}
                  className="flex items-center gap-2 cursor-pointer"
                  onMouseEnter={() => setActiveGenre(i)}
                  onMouseLeave={() => setActiveGenre(null)}
                >
                  <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: g.color }} />
                  <span className="text-[var(--ct-text-muted)] text-[11px] font-thai truncate">
                    {lang === "th" ? g.name : g.nameEn} ({g.value})
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ──── Charts Row 2: Personnel + Visitors ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Personnel by Role */}
          <motion.div
            className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] flex items-center gap-2 mb-6">
              <Users className="w-4 h-4 text-[#F6A51B]" />
              {lang === "th" ? "จำนวนบุคลากรแต่ละตำแหน่ง" : "Personnel by Role"}
            </h2>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personnelChartData} layout="vertical" barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ct-border)" opacity={0.3} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: "var(--ct-text-muted)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--ct-border)" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "var(--ct-text-muted)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--ct-border)" }}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey={lang === "th" ? "จำนวน" : "Count"}
                    fill="url(#personnelGradient)"
                    radius={[0, 4, 4, 0]}
                    animationBegin={400}
                    animationDuration={1200}
                  />
                  <defs>
                    <linearGradient id="personnelGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F6A51B" />
                      <stop offset="100%" stopColor="#F76532" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Monthly Visitors */}
          <motion.div
            className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] flex items-center gap-2 mb-6">
              <Eye className="w-4 h-4 text-[#EC1C72]" />
              {lang === "th" ? "ผู้เข้าชมรายเดือน (ปี 2568)" : "Monthly Visitors (2025)"}
            </h2>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorChartData}>
                  <defs>
                    <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC1C72" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#EC1C72" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ct-border)" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "var(--ct-text-muted)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--ct-border)" }}
                  />
                  <YAxis
                    tick={{ fill: "var(--ct-text-muted)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--ct-border)" }}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={lang === "th" ? "ผู้เข้าชม" : "Visitors"}
                    stroke="#EC1C72"
                    strokeWidth={2}
                    fill="url(#visitorGradient)"
                    animationBegin={500}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* ──── Top Rankings ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Films */}
          <motion.div
            className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#EC1C72]" />
                {lang === "th" ? "ภาพยนตร์ยอดนิยม" : "Top Films"}
              </h2>
              <a href="/films" className="text-[#EC1C72] text-xs font-thai flex items-center gap-0.5 hover:underline">
                {lang === "th" ? "ดูทั้งหมด" : "View all"}
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-3">
              {topFilms.map((film, i) => (
                <motion.div
                  key={film.rank}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--ct-bg-hover)] transition-colors cursor-pointer group"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0
                    ${film.rank <= 3 ? "bg-[#F6A51B]/20 text-[#F6A51B]" : "bg-[var(--ct-bg-page)] text-[var(--ct-text-muted)]"}`}>
                    {film.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--ct-text-primary)] text-sm font-thai font-semibold truncate group-hover:text-[#EC1C72] transition-colors">
                      {lang === "th" ? film.title : film.titleEn}
                    </p>
                    <p className="text-[var(--ct-text-faint)] text-xs font-thai">
                      {film.year} &middot; {film.genre}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--ct-text-faint)] group-hover:text-[#EC1C72] transition-colors shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Persons */}
          <motion.div
            className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#702874]" />
                {lang === "th" ? "บุคลากรยอดนิยม" : "Top Personnel"}
              </h2>
              <a href="/persons" className="text-[#702874] text-xs font-thai flex items-center gap-0.5 hover:underline">
                {lang === "th" ? "ดูทั้งหมด" : "View all"}
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-3">
              {topPersons.map((person, i) => (
                <motion.div
                  key={person.rank}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--ct-bg-hover)] transition-colors cursor-pointer group"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0
                    ${person.rank <= 3 ? "bg-[#702874]/20 text-[#702874]" : "bg-[var(--ct-bg-page)] text-[var(--ct-text-muted)]"}`}>
                    {person.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--ct-text-primary)] text-sm font-thai font-semibold truncate group-hover:text-[#702874] transition-colors">
                      {lang === "th" ? person.name : person.nameEn}
                    </p>
                    <p className="text-[var(--ct-text-faint)] text-xs font-thai">
                      {person.role}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--ct-text-faint)] group-hover:text-[#702874] transition-colors shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ──── Yearly Data Table ──── */}
        <motion.div
          className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-4 border-b border-[var(--ct-border)] flex items-center justify-between">
            <h2 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#F6A51B]" />
              {lang === "th" ? "ตารางข้อมูลรายปี" : "Yearly Data Table"}
            </h2>
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
                {yearlyStats.map((row, i) => {
                  const prev = yearlyStats[i - 1];
                  const filmGrowth = prev ? ((row.films - prev.films) / prev.films * 100) : null;
                  return (
                    <tr key={row.year} className="border-b border-[var(--ct-border)] hover:bg-[var(--ct-bg-hover)] transition-colors">
                      <td className="px-4 py-3 text-[#F6A51B] font-mono font-bold">{lang === "th" ? row.year : row.yearEn}</td>
                      <td className="px-4 py-3 text-right text-[var(--ct-text-secondary)] font-body">
                        {row.films}
                        {filmGrowth !== null && (
                          <span className={`ml-2 text-xs ${filmGrowth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {filmGrowth >= 0 ? "+" : ""}{filmGrowth.toFixed(0)}%
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--ct-text-secondary)] font-body">{row.series}</td>
                      <td className="px-4 py-3 text-right text-[var(--ct-text-secondary)] font-body">{row.persons.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-[var(--ct-text-secondary)] font-body">{row.companies}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ──── Export & Citation ──── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Export */}
          <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-sm flex items-center gap-2 mb-4">
              <Download className="w-4 h-4 text-[#F6A51B]" />
              {lang === "th" ? "ดาวน์โหลดข้อมูล" : "Download Data"}
            </h2>
            <p className="text-[var(--ct-text-muted)] text-xs font-thai mb-4">
              {lang === "th"
                ? "ดาวน์โหลดข้อมูลสถิติอุตสาหกรรมภาพยนตร์สำหรับการวิจัยและวิเคราะห์"
                : "Download industry statistics data for research and analysis"}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleExport("Excel")}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#217346]/10 text-[#217346] rounded-lg text-sm font-thai font-semibold hover:bg-[#217346]/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                Excel (.xlsx)
              </button>
              <button
                onClick={() => handleExport("CSV")}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F6A51B]/10 text-[#F6A51B] rounded-lg text-sm font-thai font-semibold hover:bg-[#F6A51B]/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                CSV
              </button>
              <button
                onClick={() => handleExport("PDF")}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#EC1C72]/10 text-[#EC1C72] rounded-lg text-sm font-thai font-semibold hover:bg-[#EC1C72]/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>

          {/* Citation */}
          <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-sm flex items-center gap-2 mb-2">
              <Copy className="w-4 h-4 text-[#702874]" />
              {lang === "th" ? "อ้างอิงข้อมูล (APA 7th)" : "Citation (APA 7th)"}
            </h2>
            <p className="text-[var(--ct-text-muted)] text-xs font-thai mb-3">
              {lang === "th"
                ? "คัดลอกรูปแบบอ้างอิงสำหรับใช้ในงานวิจัยและเอกสารวิชาการ"
                : "Copy citation format for research papers and academic documents"}
            </p>
            <div className="bg-[var(--ct-bg-page)] rounded-lg p-3 mb-3 border border-[var(--ct-border)]">
              <p className="text-[var(--ct-text-secondary)] text-xs font-body leading-relaxed break-words">
                {citation}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#702874]/10 text-[#702874] rounded-lg text-sm font-thai font-semibold hover:bg-[#702874]/20 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied
                ? (lang === "th" ? "คัดลอกแล้ว!" : "Copied!")
                : (lang === "th" ? "คัดลอก Citation" : "Copy Citation")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
