"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import {
  Globe, Shield, Smartphone, BarChart3, Users, Share2, Zap,
  CheckCircle2, XCircle, Star, ChevronRight, Award, TrendingUp
} from "lucide-react";

// Benchmark data
const benchmarks = [
  {
    name: "IMDb",
    country: "USA",
    traffic: 5,
    uiux: 2,
    dataAuthority: 4,
    government: false,
    bilingual: true,
    mobile: 3,
    industryStats: 3,
    community: 4,
    viral: 3,
    pros: ["ฐานข้อมูลใหญ่ที่สุดในโลก", "Search ครอบคลุม", "Awards database ดีมาก"],
    cons: ["UI รก outdated", "API แพงมาก ($150K+)", "Navigation ไม่ดี"],
  },
  {
    name: "TMDb",
    country: "USA",
    traffic: 4,
    uiux: 4,
    dataAuthority: 3,
    government: false,
    bilingual: true,
    mobile: 4,
    industryStats: 2,
    community: 4,
    viral: 3,
    pros: ["Community-driven", "Visual สวย (2M+ posters)", "API ฟรี"],
    cons: ["ข้อมูลไม่ verified", "ไม่ใช่ official source", "Awards ไม่ครบ"],
  },
  {
    name: "BFI",
    country: "UK",
    traffic: 3,
    uiux: 4,
    dataAuthority: 5,
    government: true,
    bilingual: true,
    mobile: 3,
    industryStats: 4,
    community: 2,
    viral: 2,
    pros: ["Government standard", "7M still frames", "Education + Archive"],
    cons: ["Navigation ซับซ้อน", "Mobile UX ไม่ดี"],
  },
  {
    name: "KoBiz",
    country: "South Korea",
    traffic: 2,
    uiux: 2,
    dataAuthority: 5,
    government: true,
    bilingual: true,
    mobile: 2,
    industryStats: 5,
    community: 2,
    viral: 1,
    pros: ["Industry data ลึกมาก", "Bilingual ดี", "Market statistics ละเอียด"],
    cons: ["UI เก่ามาก", "โหลดช้า"],
  },
  {
    name: "NFB",
    country: "Canada",
    traffic: 2,
    uiux: 4,
    dataAuthority: 4,
    government: true,
    bilingual: true,
    mobile: 4,
    industryStats: 2,
    community: 2,
    viral: 2,
    pros: ["Clean design", "WCAG compliant สูง", "Streaming ในตัว"],
    cons: ["Scope แคบ (สารคดี)", "ขาด community"],
  },
  {
    name: "Letterboxd",
    country: "New Zealand",
    traffic: 3,
    uiux: 5,
    dataAuthority: 2,
    government: false,
    bilingual: false,
    mobile: 5,
    industryStats: 1,
    community: 5,
    viral: 5,
    pros: ["Social film diary", "Viral by design", "UI สวยมาก"],
    cons: ["ไม่ official", "ไม่มี industry data"],
  },
];

const contentThailand = {
  name: "ContentThailand",
  country: "Thailand",
  traffic: 3,
  uiux: 5,
  dataAuthority: 5,
  government: true,
  bilingual: true,
  mobile: 5,
  industryStats: 4,
  community: 3,
  viral: 4,
};

const dimensions = [
  { key: "traffic" as const, label: "Traffic", icon: Globe },
  { key: "uiux" as const, label: "UI/UX Design", icon: Zap },
  { key: "dataAuthority" as const, label: "Data Authority", icon: Shield },
  { key: "mobile" as const, label: "Mobile Responsive", icon: Smartphone },
  { key: "industryStats" as const, label: "Industry Stats", icon: BarChart3 },
  { key: "community" as const, label: "Community/Social", icon: Users },
  { key: "viral" as const, label: "Viral Potential", icon: Share2 },
];

function StarRating({ count, max = 5, color = "#F6A51B" }: { count: number; max?: number; color?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          fill={i < count ? color : "transparent"}
          stroke={i < count ? color : "rgba(255,255,255,0.15)"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function BenchmarkPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(112,40,116,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ct-text-primary)] font-thai mb-4">
              Global Benchmark Analysis
            </h1>
            <p className="text-[var(--ct-text-secondary)] text-lg max-w-2xl mx-auto font-thai mb-8">
              เปรียบเทียบ ContentThailand กับฐานข้อมูลภาพยนตร์ระดับโลก 6 แห่ง
            </p>
            {/* Design Formula */}
            <div className="inline-block rounded-2xl px-8 py-4" style={{
              background: "linear-gradient(135deg, rgba(236,28,114,0.1), rgba(246,165,27,0.1))",
              border: "1px solid rgba(236,28,114,0.2)",
            }}>
              <p className="text-[var(--ct-text-muted)] text-xs mb-2 font-thai">Design Formula</p>
              <p className="text-[var(--ct-text-primary)] font-bold text-lg md:text-xl">
                <span className="text-[#702874]">BFI</span> Authority +{" "}
                <span className="text-[#F76532]">KoBiz</span> Industry +{" "}
                <span className="text-[#EC1C72]">TMDb</span> Visual +{" "}
                <span className="text-[#F6A51B]">Letterboxd</span> Emotion
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr>
                  <th className="text-left text-[var(--ct-text-muted)] text-xs font-thai p-3 w-40">Dimension</th>
                  {/* ContentThailand first */}
                  <th className="text-center p-3 w-32">
                    <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(236,28,114,0.15), rgba(246,165,27,0.15))", border: "1px solid rgba(236,28,114,0.3)" }}>
                      <p className="text-[var(--ct-text-primary)] font-bold text-sm">ContentThailand</p>
                      <p className="text-[#EC1C72] text-[10px]">OURS</p>
                    </div>
                  </th>
                  {benchmarks.map((b) => (
                    <th key={b.name} className="text-center p-3 w-28">
                      <p className="text-[var(--ct-text-secondary)] text-sm font-bold">{b.name}</p>
                      <p className="text-[var(--ct-text-faint)] text-[10px]">{b.country}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dimensions.map((dim) => (
                  <tr key={dim.key} className="border-t border-[var(--ct-border)]">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <dim.icon className="w-4 h-4 text-[var(--ct-text-faint)]" />
                        <span className="text-[var(--ct-text-secondary)] text-sm">{dim.label}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center">
                        <StarRating count={contentThailand[dim.key]} color="#EC1C72" />
                      </div>
                    </td>
                    {benchmarks.map((b) => (
                      <td key={b.name} className="p-3 text-center">
                        <div className="flex justify-center">
                          <StarRating count={b[dim.key] as number} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Government Standard */}
                <tr className="border-t border-[var(--ct-border)]">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[var(--ct-text-faint)]" />
                      <span className="text-[var(--ct-text-secondary)] text-sm">Government Standard</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                  </td>
                  {benchmarks.map((b) => (
                    <td key={b.name} className="p-3 text-center">
                      {b.government ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400/60 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400/40 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                {/* Bilingual */}
                <tr className="border-t border-[var(--ct-border)]">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[var(--ct-text-faint)]" />
                      <span className="text-[var(--ct-text-secondary)] text-sm">Bilingual TH/EN</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                  </td>
                  {benchmarks.map((b) => (
                    <td key={b.name} className="p-3 text-center">
                      {b.bilingual ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400/60 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400/40 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Where We Win */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--ct-text-primary)] font-thai mb-8 flex items-center gap-3">
            <Award className="w-6 h-6 text-[#F6A51B]" />
            ContentThailand ชนะตรงไหน?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "UI/UX Design",
                score: "5/5",
                detail: "ออกแบบใหม่ทั้งหมดด้วย Next.js + Tailwind CSS ตาม WCAG 2.1 AA ชนะ IMDb (2/5) และ KoBiz (2/5)",
                color: "#EC1C72",
                beats: "IMDb, KoBiz, BFI"
              },
              {
                title: "Data Authority (Government)",
                score: "5/5",
                detail: "เป็นฐานข้อมูลทางการของรัฐบาลไทย มีความน่าเชื่อถือเทียบเท่า BFI และ KoBiz",
                color: "#702874",
                beats: "IMDb, TMDb, Letterboxd"
              },
              {
                title: "Mobile Responsive",
                score: "5/5",
                detail: "Mobile-first design รองรับทุกอุปกรณ์ ชนะ BFI (3/5) และ KoBiz (2/5) ที่ mobile UX ไม่ดี",
                color: "#F76532",
                beats: "IMDb, BFI, KoBiz"
              },
              {
                title: "Viral Potential",
                score: "4/5",
                detail: "Share Card, DNA Quiz, Social integration ออกแบบให้ viral ได้เหมือน Letterboxd",
                color: "#F6A51B",
                beats: "IMDb, BFI, KoBiz, NFB"
              },
              {
                title: "Industry Stats + Dashboard",
                score: "4/5",
                detail: "Dashboard เปรียบเทียบรายปี, Export Excel/PDF, Interactive charts ใกล้เคียง KoBiz",
                color: "#EC1C72",
                beats: "IMDb, TMDb, Letterboxd, NFB"
              },
              {
                title: "Bilingual + ASEAN First",
                score: "5/5",
                detail: "ฐานข้อมูลภาพยนตร์ภาครัฐที่ดีที่สุดในอาเซียน ไม่มีประเทศใดในอาเซียนที่มีระบบเทียบเท่า",
                color: "#702874",
                beats: "ASEAN ทั้งหมด"
              },
            ].map((win) => (
              <motion.div
                key={win.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl p-6"
                style={{
                  background: `${win.color}08`,
                  border: `1px solid ${win.color}20`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[var(--ct-text-primary)] font-bold text-sm">{win.title}</h3>
                  <span className="text-lg font-bold font-mono" style={{ color: win.color }}>{win.score}</span>
                </div>
                <p className="text-[var(--ct-text-muted)] text-sm font-thai mb-3">{win.detail}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" style={{ color: win.color }} />
                  <span className="text-xs font-thai" style={{ color: win.color }}>ชนะ: {win.beats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Position */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 text-center" style={{
            background: "linear-gradient(135deg, rgba(236,28,114,0.08), rgba(246,165,27,0.08))",
            border: "1px solid rgba(236,28,114,0.15)",
          }}>
            <h2 className="text-2xl font-bold text-[var(--ct-text-primary)] font-thai mb-4">
              Strategic Insight
            </h2>
            <p className="text-[var(--ct-text-secondary)] text-lg font-thai leading-relaxed max-w-2xl mx-auto">
              ContentThailand มีโอกาสเป็น <span className="text-[#F6A51B] font-bold">ฐานข้อมูลภาพยนตร์ภาครัฐที่ดีที่สุดในอาเซียน</span> เพราะ:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: Shield, label: "ความน่าเชื่อถือจากภาครัฐ", ref: "เหมือน BFI + KoBiz" },
                { icon: BarChart3, label: "Industry Data ครบ", ref: "เหมือน KoBiz" },
                { icon: Zap, label: "Design สวย ใช้ง่าย", ref: "เหมือน TMDb + NFB" },
                { icon: Share2, label: "Emotional + Viral", ref: "เหมือน Letterboxd" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="w-8 h-8 text-[#F6A51B] mx-auto mb-2" />
                  <p className="text-[var(--ct-text-primary)] text-sm font-thai font-medium">{item.label}</p>
                  <p className="text-[var(--ct-text-faint)] text-xs font-thai mt-1">{item.ref}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back */}
      <div className="text-center pb-16">
        <Link href="/about" className="inline-flex items-center gap-2 text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] text-sm font-thai transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" />
          {lang === "th" ? "กลับหน้าเกี่ยวกับเรา" : "Back to About"}
        </Link>
      </div>
    </div>
  );
}
