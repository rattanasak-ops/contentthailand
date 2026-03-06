"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dna, Rocket, GraduationCap, Share2, TrendingUp, Users, Target,
  Smartphone, Instagram, Youtube, Sparkles, Award, School, ChevronRight,
  Play, BarChart3, Calendar, Heart, Zap, Eye
} from "lucide-react";
import Link from "next/link";

// ============================================================
// Campaign #1: DNA Quiz
// ============================================================
function CampaignDNA() {
  useLanguage();
  const [selectedDNA, setSelectedDNA] = useState<number | null>(null);

  const dnaTypes = [
    { name: "Romance", icon: Heart, film: "มะหมา 4 ขา", color: "#EC1C72", desc: "รักอบอุ่น ครอบครัว" },
    { name: "Horror", icon: Eye, film: "ชัตเตอร์", color: "#702874", desc: "ระทึกขวัญ สยองขวัญ" },
    { name: "Action", icon: Zap, film: "องค์บาก", color: "#F76532", desc: "ตื่นเต้น บู๊" },
    { name: "Comedy", icon: Sparkles, film: "ไบค์แมน", color: "#F6A51B", desc: "ขำขัน สนุก" },
    { name: "Drama", icon: Award, film: "มนต์รักทรานซิสเตอร์", color: "#EC1C72", desc: "ลึกซึ้ง อารมณ์" },
    { name: "Indie", icon: Sparkles, film: "ดาวคะนอง", color: "#702874", desc: "ศิลปะ แตกต่าง" },
    { name: "Nostalgia", icon: Heart, film: "สตรีเหล็ก", color: "#F76532", desc: "คลาสสิก ยุคทอง" },
    { name: "Adventure", icon: Rocket, film: "ชั่วฟ้าดินสลาย", color: "#F6A51B", desc: "ผจญภัย กว้างไกล" },
  ];

  return (
    <div className="space-y-10">
      {/* Campaign Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EC1C72]/10 mb-4">
          <Dna className="w-4 h-4 text-[#EC1C72]" />
          <span className="text-[#EC1C72] text-sm font-bold">CAMPAIGN #1</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-[var(--ct-text-primary)] font-thai mb-2">
          ค้นหาตัวเองในโลกภาพยนตร์ไทย
        </h3>
        <p className="text-[var(--ct-text-secondary)] text-lg font-thai">Find Your Thai Cinema DNA</p>
      </div>

      {/* Quiz Preview */}
      <div className="rounded-2xl overflow-hidden" style={{
        background: "linear-gradient(135deg, color-mix(in srgb, var(--ct-bg-elevated) 80%, transparent) 0%, color-mix(in srgb, var(--ct-bg-page) 90%, transparent) 100%)",
        border: "1px solid rgba(236,28,114,0.2)",
      }}>
        <div className="p-8">
          <h4 className="text-[var(--ct-text-primary)] font-bold text-xl font-thai mb-6 flex items-center gap-2">
            <Play className="w-5 h-5 text-[#EC1C72]" />
            ตัวอย่าง Interactive Quiz
          </h4>

          {/* Mock Quiz Question */}
          <div className="rounded-xl bg-[var(--ct-bg-hover)] p-6 mb-6">
            <p className="text-[#EC1C72] text-sm font-bold mb-2">Q1 / 5</p>
            <p className="text-[var(--ct-text-primary)] text-lg font-thai mb-4">คุณชอบบรรยากาศแบบไหน?</p>
            <div className="grid grid-cols-2 gap-3">
              {["ชีวิตชนบท", "เมือง", "ความลึกลับ", "ตลกขำขัน"].map((opt, i) => (
                <button key={i} className="p-3 rounded-xl text-left text-[var(--ct-text-secondary)] font-thai text-sm transition-all hover:bg-[#EC1C72]/20 hover:text-[var(--ct-text-primary)] border border-[var(--ct-border)] hover:border-[#EC1C72]/40">
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* DNA Results Preview */}
          <h4 className="text-[var(--ct-text-primary)] font-bold text-lg font-thai mb-4">8 DNA Types ที่ผู้ใช้จะได้:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dnaTypes.map((dna, i) => (
              <motion.button
                key={dna.name}
                onClick={() => setSelectedDNA(selectedDNA === i ? null : i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl text-center transition-all border ${selectedDNA === i ? "border-opacity-60" : "border-[var(--ct-border)]"}`}
                style={{
                  borderColor: selectedDNA === i ? dna.color : undefined,
                  background: selectedDNA === i ? `${dna.color}15` : "rgba(255,255,255,0.03)",
                }}
              >
                <dna.icon className="w-6 h-6 mx-auto mb-2" style={{ color: dna.color }} />
                <p className="text-[var(--ct-text-primary)] text-sm font-bold">{dna.name}</p>
                <p className="text-[var(--ct-text-muted)] text-xs font-thai mt-1">{dna.desc}</p>
                <p className="text-[var(--ct-text-faint)] text-[10px] font-thai mt-1">{dna.film}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Share Card Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--ct-bg-elevated) 80%, transparent) 0%, color-mix(in srgb, var(--ct-bg-page) 90%, transparent) 100%)",
          border: "1px solid rgba(246,165,27,0.2)",
        }}>
          <h4 className="text-[var(--ct-text-primary)] font-bold font-thai mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#F6A51B]" />
            ตัวอย่าง Share Card
          </h4>
          {/* Mock Share Card */}
          <div className="aspect-square max-w-[280px] mx-auto rounded-xl overflow-hidden" style={{
            background: "linear-gradient(135deg, var(--ct-bg-page), #702874)",
            border: "4px solid #F6A51B",
          }}>
            <div className="p-6 flex flex-col items-center justify-center h-full text-center">
              <p className="text-[#F6A51B] text-xs font-bold mb-2">DNA ภาพยนตร์ไทยของฉัน</p>
              <p className="text-[var(--ct-text-primary)] text-2xl font-bold font-thai mb-1">สาย Drama</p>
              <p className="text-[var(--ct-text-secondary)] text-sm font-thai mb-4">อารมณ์ลึก</p>
              <div className="w-16 h-16 rounded-full bg-[var(--ct-bg-hover)] flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-[#EC1C72]" />
              </div>
              <p className="text-[var(--ct-text-muted)] text-xs font-thai">เหมือน มนต์รักทรานซิสเตอร์</p>
              <p className="text-[#F6A51B] text-[10px] mt-4">contentthailand.com</p>
            </div>
          </div>
          <p className="text-[var(--ct-text-muted)] text-xs text-center mt-3 font-thai">Ratio: 1:1 (IG) / 9:16 (Stories/TikTok)</p>
        </div>

        {/* KPIs */}
        <div className="space-y-4">
          <h4 className="text-[var(--ct-text-primary)] font-bold font-thai flex items-center gap-2">
            <Target className="w-5 h-5 text-[#EC1C72]" />
            เป้าหมาย KPIs
          </h4>
          {[
            { label: "Quiz completions", value: "100,000+", icon: Users },
            { label: "Share cards สร้าง", value: "50,000+", icon: Share2 },
            { label: "Website visits", value: "150,000+", icon: TrendingUp },
            { label: "#DNAหนังไทย Trending", value: "Top 10", icon: TrendingUp },
            { label: "Media coverage", value: "10+ สำนักข่าว", icon: BarChart3 },
          ].map((kpi) => (
            <div key={kpi.label} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--ct-bg-hover)]">
              <kpi.icon className="w-4 h-4 text-[#EC1C72] shrink-0" />
              <span className="text-[var(--ct-text-secondary)] text-sm font-thai flex-1">{kpi.label}</span>
              <span className="text-[var(--ct-text-primary)] font-bold text-sm">{kpi.value}</span>
            </div>
          ))}

          {/* Timeline */}
          <div className="mt-6 p-4 rounded-xl bg-[var(--ct-bg-hover)]">
            <h5 className="text-[var(--ct-text-primary)] font-bold text-sm font-thai mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F6A51B]" />
              Timeline
            </h5>
            <div className="space-y-2 text-sm font-thai">
              <div className="flex gap-3">
                <span className="text-[#EC1C72] font-bold w-20 shrink-0">Week 1-2</span>
                <span className="text-[var(--ct-text-secondary)]">Seed: Celeb share 10-20 คน</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#F76532] font-bold w-20 shrink-0">Week 3-4</span>
                <span className="text-[var(--ct-text-secondary)]">Amplify: Paid + TikTok Creators</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#F6A51B] font-bold w-20 shrink-0">Week 5-8</span>
                <span className="text-[var(--ct-text-secondary)]">Sustain: Leaderboard + PR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Campaign #2: Grand Opening
// ============================================================
function CampaignGrandOpening() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F76532]/10 mb-4">
          <Rocket className="w-4 h-4 text-[#F76532]" />
          <span className="text-[#F76532] text-sm font-bold">CAMPAIGN #2</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-[var(--ct-text-primary)] font-thai mb-2">
          หนังไทยในมือคุณ
        </h3>
        <p className="text-[var(--ct-text-secondary)] text-lg font-thai">ทะเบียนหนัง 7,868 เรื่อง เปิดแล้ว</p>
      </div>

      {/* Countdown Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { day: "T-7", title: "Teaser", desc: "Short film 30 วิ: เดินในคลังฟิล์มเก่า", color: "#702874", details: "โพสต์ใน Facebook กรมส่งเสริมวัฒนธรรม + กระทรวงวัฒนธรรม" },
          { day: "T-3", title: "Reveal", desc: "7,868 เรื่อง รอให้คุณค้นพบ", color: "#F76532", details: "Infographic: timeline ภาพยนตร์ไทยตั้งแต่ปี 2470 - ปัจจุบัน" },
          { day: "T-0", title: "LAUNCH DAY", desc: "Live stream การเปิดตัว", color: "#EC1C72", details: "รัฐมนตรีวัฒนธรรม click เปิดเว็บ + Real-time counter" },
        ].map((phase) => (
          <motion.div
            key={phase.day}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-6 text-center" style={{
              background: `linear-gradient(135deg, ${phase.color}15, color-mix(in srgb, var(--ct-bg-page) 90%, transparent))`,
              border: `1px solid ${phase.color}30`,
            }}
          >
            <div className="text-5xl font-bold font-mono mb-2" style={{ color: phase.color }}>{phase.day}</div>
            <h4 className="text-[var(--ct-text-primary)] font-bold text-lg mb-2">{phase.title}</h4>
            <p className="text-[var(--ct-text-secondary)] text-sm font-thai mb-3">{phase.desc}</p>
            <p className="text-[var(--ct-text-muted)] text-xs font-thai">{phase.details}</p>
          </motion.div>
        ))}
      </div>

      {/* Short Film Series */}
      <div className="rounded-2xl overflow-hidden" style={{
        background: "linear-gradient(135deg, color-mix(in srgb, var(--ct-bg-elevated) 80%, transparent) 0%, color-mix(in srgb, var(--ct-bg-page) 90%, transparent) 100%)",
        border: "1px solid rgba(247,101,50,0.2)",
      }}>
        <div className="p-8">
          <h4 className="text-[var(--ct-text-primary)] font-bold text-xl font-thai mb-6 flex items-center gap-2">
            <Youtube className="w-5 h-5 text-[#F76532]" />
            Hero Content: Short Film Series &quot;ตามหา...&quot;
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { ep: 1, title: "ตามหาหนังเรื่องแรกของผู้กำกับดัง", style: "Documentary" },
              { ep: 2, title: "ตามหานักแสดงที่หายไป", style: "Mystery" },
              { ep: 3, title: "ตามหาหนังที่แม่เคยดู", style: "Emotional" },
            ].map((ep) => (
              <div key={ep.ep} className="rounded-xl bg-[var(--ct-bg-hover)] p-5">
                <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-[#F76532]/20 to-transparent flex items-center justify-center mb-3">
                  <Play className="w-10 h-10 text-[#F76532]/60" />
                </div>
                <p className="text-[#F76532] text-xs font-bold mb-1">EP.{ep.ep}</p>
                <p className="text-[var(--ct-text-primary)] text-sm font-thai font-medium">{ep.title}</p>
                <p className="text-[var(--ct-text-muted)] text-xs mt-1">{ep.style} | 3-5 นาที</p>
              </div>
            ))}
          </div>
          <p className="text-[var(--ct-text-muted)] text-xs font-thai mt-4 text-center">
            Production Budget: 200,000 THB (6 episodes) | Target: 1M+ views รวม
          </p>
        </div>
      </div>

      {/* Partnership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { tier: "TIER 1", title: "Government Partners", items: ["กรมส่งเสริมวัฒนธรรม", "การท่องเที่ยวแห่งประเทศไทย (TAT)", "กรมประชาสัมพันธ์"], cost: "ฟรี", color: "#F6A51B" },
          { tier: "TIER 2", title: "Industry Partners", items: ["สมาคมผู้กำกับภาพยนตร์", "Major Cineplex / SF Cinema", "Netflix Thailand"], cost: "ฟรี + Co-brand", color: "#F76532" },
          { tier: "TIER 3", title: "Media Partners", items: ["Workpoint, GMM25, One31", "Positioning Magazine", "Blognone, The Standard"], cost: "Media", color: "#EC1C72" },
        ].map((tier) => (
          <div key={tier.tier} className="rounded-xl p-5" style={{
            background: `${tier.color}08`,
            border: `1px solid ${tier.color}20`,
          }}>
            <p className="text-xs font-bold mb-1" style={{ color: tier.color }}>{tier.tier}</p>
            <h5 className="text-[var(--ct-text-primary)] font-bold text-sm mb-3">{tier.title}</h5>
            <ul className="space-y-1.5">
              {tier.items.map((item) => (
                <li key={item} className="text-[var(--ct-text-muted)] text-xs font-thai flex items-start gap-2">
                  <span style={{ color: tier.color }}>&#9679;</span>{item}
                </li>
              ))}
            </ul>
            <p className="text-[var(--ct-text-faint)] text-[10px] mt-3 font-thai">Cost: {tier.cost}</p>
          </div>
        ))}
      </div>

      {/* Launch KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Concurrent users วันเปิด", value: "5,000+", color: "#EC1C72" },
          { label: "Page views 24 ชม.แรก", value: "50,000+", color: "#F76532" },
          { label: "Unique visitors เดือน 1", value: "100,000+", color: "#F6A51B" },
          { label: "PR Value (earned)", value: "2M+ THB", color: "#702874" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl p-4 text-center" style={{
            background: `${kpi.color}08`,
            border: `1px solid ${kpi.color}20`,
          }}>
            <div className="text-2xl font-bold mb-1" style={{ color: kpi.color }}>{kpi.value}</div>
            <p className="text-[var(--ct-text-muted)] text-xs font-thai">{kpi.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Campaign #3: Youth Challenge
// ============================================================
function CampaignYouth() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6A51B]/10 mb-4">
          <GraduationCap className="w-4 h-4 text-[#F6A51B]" />
          <span className="text-[#F6A51B] text-sm font-bold">CAMPAIGN #3</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-[var(--ct-text-primary)] font-thai mb-2">
          เด็กไทยเล่าหนังไทย
        </h3>
        <p className="text-[var(--ct-text-secondary)] text-lg font-thai">Youth Film Storytelling Challenge</p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { step: 1, title: "ค้นหา", desc: "ค้นหาหนังไทยที่ไม่เคยรู้จักบน ContentThailand", icon: Eye },
          { step: 2, title: "สร้าง", desc: "สร้าง Content อธิบายหนังเรื่องนั้นใน 60 วินาที", icon: Smartphone },
          { step: 3, title: "โพสต์", desc: "โพสต์ด้วย #เด็กไทยเล่าหนังไทย", icon: Instagram },
          { step: 4, title: "Vote", desc: "คลิปยอด Like สูงสุดชนะรางวัล", icon: Heart },
        ].map((s) => (
          <motion.div
            key={s.step}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-6 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(246,165,27,0.08) 0%, color-mix(in srgb, var(--ct-bg-page) 90%, transparent) 100%)",
              border: "1px solid rgba(246,165,27,0.15)",
            }}
          >
            <div className="absolute top-3 right-4 text-6xl font-bold text-[var(--ct-text-faint)] font-mono">{s.step}</div>
            <s.icon className="w-8 h-8 text-[#F6A51B] mx-auto mb-3" />
            <h4 className="text-[var(--ct-text-primary)] font-bold font-thai mb-2">STEP {s.step}: {s.title}</h4>
            <p className="text-[var(--ct-text-muted)] text-sm font-thai">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Prizes */}
      <div className="rounded-2xl overflow-hidden" style={{
        background: "linear-gradient(135deg, color-mix(in srgb, var(--ct-bg-elevated) 80%, transparent) 0%, color-mix(in srgb, var(--ct-bg-page) 90%, transparent) 100%)",
        border: "1px solid rgba(246,165,27,0.2)",
      }}>
        <div className="p-8">
          <h4 className="text-[var(--ct-text-primary)] font-bold text-xl font-thai mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F6A51B]" />
            รางวัล
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl p-6 text-center" style={{ background: "linear-gradient(135deg, #F6A51B15, transparent)", border: "1px solid #F6A51B30" }}>
              <div className="text-3xl mb-2">&#127942;</div>
              <h5 className="text-[#F6A51B] font-bold text-lg mb-2">Grand Prize</h5>
              <p className="text-[var(--ct-text-primary)] font-bold text-xl font-thai">50,000 THB</p>
              <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-2">+ Workshop กับผู้กำกับชื่อดัง 1 วัน</p>
              <p className="text-[var(--ct-text-faint)] text-xs font-thai mt-1">+ Featured ใน ContentThailand</p>
            </div>
            <div className="rounded-xl p-6 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="text-3xl mb-2">&#129352;</div>
              <h5 className="text-[var(--ct-text-primary)] font-bold text-lg mb-2">Runner Up</h5>
              <p className="text-[var(--ct-text-primary)] font-bold text-xl font-thai">10,000 THB x5</p>
              <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-2">+ Certificate จากกรมส่งเสริมวัฒนธรรม</p>
            </div>
            <div className="rounded-xl p-6 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="text-3xl mb-2">&#127775;</div>
              <h5 className="text-[var(--ct-text-primary)] font-bold text-lg mb-2">Most Creative</h5>
              <p className="text-[var(--ct-text-primary)] font-bold text-xl font-thai">Tablet x3</p>
              <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-2">+ Certificate</p>
            </div>
          </div>
        </div>
      </div>

      {/* School Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h4 className="text-[var(--ct-text-primary)] font-bold font-thai mb-4 flex items-center gap-2">
            <School className="w-5 h-5 text-[#702874]" />
            School Partnership
          </h4>
          <ul className="space-y-2 text-sm font-thai">
            {[
              "50 โรงเรียนมัธยมนำร่อง",
              "มหาวิทยาลัย: จุฬาฯ, ม.กรุงเทพ, ศิลปากร, ABAC",
              "ครูได้ Lesson Plan ฟรี",
              "ใช้เป็นกิจกรรมชมรมภาพยนตร์",
              "โรงเรียนที่นักเรียนชนะ ได้รับการเยี่ยมชมจากผู้กำกับจริง",
            ].map((item) => (
              <li key={item} className="text-[var(--ct-text-secondary)] flex items-start gap-2">
                <span className="text-[#702874] mt-0.5">&#9679;</span>{item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-[var(--ct-text-primary)] font-bold font-thai flex items-center gap-2">
            <Target className="w-5 h-5 text-[#F6A51B]" />
            Target KPIs
          </h4>
          {[
            { label: "TikTok/Reels submissions", value: "1,000+ คลิป" },
            { label: "Schools involved", value: "50+ โรงเรียน" },
            { label: "Total video views", value: "5,000,000+" },
            { label: "Unique creators", value: "1,000+ คน" },
            { label: "CT visits จาก Campaign", value: "50,000+" },
            { label: "Young users (15-24) เพิ่ม", value: "+300%" },
          ].map((kpi) => (
            <div key={kpi.label} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--ct-bg-hover)]">
              <span className="text-[var(--ct-text-secondary)] text-sm font-thai flex-1">{kpi.label}</span>
              <span className="text-[#F6A51B] font-bold text-sm">{kpi.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Campaign Budget & Calendar
// ============================================================
function CampaignOverview() {
  return (
    <div className="space-y-10">
      {/* Annual Calendar */}
      <div className="rounded-2xl overflow-hidden" style={{
        background: "linear-gradient(135deg, color-mix(in srgb, var(--ct-bg-elevated) 80%, transparent) 0%, color-mix(in srgb, var(--ct-bg-page) 90%, transparent) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div className="p-8">
          <h4 className="text-[var(--ct-text-primary)] font-bold text-xl font-thai mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#EC1C72]" />
            Campaign Calendar 12 เดือน
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { m: "1-2", title: "Development", color: "#702874", detail: "พัฒนา Quiz, Share Card" },
              { m: "3", title: "Pre-Launch", color: "#702874", detail: "Teaser, Media Briefing" },
              { m: "4", title: "GRAND LAUNCH", color: "#EC1C72", detail: "Campaign #2 เปิดตัว" },
              { m: "5-6", title: "DNA Quiz", color: "#F76532", detail: "Campaign #1 + Paid" },
              { m: "7-8", title: "Mid-Year", color: "#F6A51B", detail: "Report + Case Study" },
              { m: "9-10", title: "Youth", color: "#F6A51B", detail: "Campaign #3 School" },
              { m: "11", title: "Awards", color: "#EC1C72", detail: "ประกาศผล + Report" },
              { m: "12", title: "Plan Y2", color: "#702874", detail: "สรุป KPIs + แผนปีหน้า" },
            ].map((month) => (
              <div key={month.m} className="rounded-xl p-4" style={{
                background: `${month.color}08`,
                border: `1px solid ${month.color}20`,
              }}>
                <p className="text-xs font-bold font-mono mb-1" style={{ color: month.color }}>เดือน {month.m}</p>
                <p className="text-[var(--ct-text-primary)] text-sm font-bold font-thai">{month.title}</p>
                <p className="text-[var(--ct-text-muted)] text-[10px] font-thai mt-1">{month.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { campaign: "#1 DNA Quiz", items: ["Paid Ads FB/IG: 50K", "TikTok Creator: 50K", "Design Assets: 20K"], total: "120,000", color: "#EC1C72" },
          { campaign: "#2 Grand Opening", items: ["Short Film: 200K", "Event/Press: 50K", "PR + Paid: 80K"], total: "330,000", color: "#F76532" },
          { campaign: "#3 Youth", items: ["Prize Money: 120K", "School Partnership: 30K", "Campaign Assets: 20K"], total: "170,000", color: "#F6A51B" },
        ].map((b) => (
          <div key={b.campaign} className="rounded-xl p-5" style={{
            background: `${b.color}08`,
            border: `1px solid ${b.color}20`,
          }}>
            <h5 className="font-bold text-sm mb-3" style={{ color: b.color }}>Campaign {b.campaign}</h5>
            <ul className="space-y-1.5 mb-4">
              {b.items.map((item) => (
                <li key={item} className="text-[var(--ct-text-muted)] text-xs font-thai">{item}</li>
              ))}
            </ul>
            <div className="pt-3 border-t border-[var(--ct-border)]">
              <p className="text-[var(--ct-text-primary)] font-bold text-lg font-thai">{b.total} THB</p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="rounded-2xl p-6 text-center" style={{
        background: "linear-gradient(135deg, rgba(236,28,114,0.1) 0%, rgba(246,165,27,0.1) 100%)",
        border: "1px solid rgba(236,28,114,0.2)",
      }}>
        <p className="text-[var(--ct-text-secondary)] text-sm font-thai mb-2">งบแคมเปญรวม</p>
        <p className="text-4xl font-bold text-[var(--ct-text-primary)] font-thai">620,000 THB</p>
        <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-2">21% ของงบ 2.9M — ครอบคลุมทุกแคมเปญ</p>
      </div>
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================
export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { lang } = useLanguage();

  const tabs = [
    { label: "#1 DNA Quiz", icon: Dna, color: "#EC1C72" },
    { label: "#2 Grand Opening", icon: Rocket, color: "#F76532" },
    { label: "#3 Youth Challenge", icon: GraduationCap, color: "#F6A51B" },
    { label: "Budget & Calendar", icon: BarChart3, color: "#702874" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(236,28,114,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ct-bg-hover)] mb-6">
              <Sparkles className="w-4 h-4 text-[#F6A51B]" />
              <span className="text-[var(--ct-text-secondary)] text-sm font-thai">Viral Campaign Strategy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--ct-text-primary)] font-thai mb-4">
              3 แคมเปญสร้างกระแส
            </h1>
            <p className="text-[var(--ct-text-secondary)] text-lg max-w-2xl mx-auto font-thai">
              เราไม่แค่ส่งมอบเว็บไซต์ เราส่งมอบ Movement ด้านวัฒนธรรมภาพยนตร์ไทย
            </p>

            {/* Target Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
              {[
                { value: "200K+", label: "Visitors/เดือน" },
                { value: "50K+", label: "Social Mentions" },
                { value: "20+", label: "สำนักข่าว" },
                { value: "2.9M", label: "THB (รวมทุกอย่าง)" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4 bg-[var(--ct-bg-hover)]">
                  <p className="text-2xl font-bold text-[var(--ct-text-primary)]">{s.value}</p>
                  <p className="text-[var(--ct-text-muted)] text-xs font-thai">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-30 bg-[var(--ct-bg-page)] backdrop-blur-xl border-b border-[var(--ct-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-thai whitespace-nowrap transition-all ${
                  activeTab === i
                    ? "text-[var(--ct-text-primary)] font-bold"
                    : "text-[var(--ct-text-muted)] hover:text-[var(--ct-text-secondary)]"
                }`}
                style={{
                  background: activeTab === i ? `${tab.color}15` : "transparent",
                  border: activeTab === i ? `1px solid ${tab.color}30` : "1px solid transparent",
                }}
              >
                <tab.icon className="w-4 h-4" style={{ color: activeTab === i ? tab.color : undefined }} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ct-section-b">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 0 && <CampaignDNA />}
            {activeTab === 1 && <CampaignGrandOpening />}
            {activeTab === 2 && <CampaignYouth />}
            {activeTab === 3 && <CampaignOverview />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back to home */}
      <div className="text-center pb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] text-sm font-thai transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" />
          {lang === "th" ? "กลับหน้าหลัก" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}
