"use client";

import { Film, Target, Eye, Users, Calendar } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const timeline = [
  { year: 2556, title: "ก่อตั้งกองภาพยนตร์และวีดิทัศน์", desc: "กรมส่งเสริมวัฒนธรรมจัดตั้งกองภาพยนตร์และวีดิทัศน์เพื่อดูแลส่งเสริมอุตสาหกรรมภาพยนตร์ไทย" },
  { year: 2561, title: "เริ่มโครงการฐานข้อมูลกลาง", desc: "ริเริ่มโครงการพัฒนาฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ" },
  { year: 2566, title: "ContentThailand v1.0", desc: "เปิดใช้งานระบบ ContentThailand เวอร์ชัน 1.0 สำหรับสาธารณะ" },
  { year: 2568, title: "ปรับปรุงระบบครั้งใหญ่", desc: "พัฒนาระบบใหม่ด้วยเทคโนโลยีทันสมัย รองรับการใช้งานที่เพิ่มขึ้น" },
];

const teamMembers = [
  { name: "ดร.สมศักดิ์ วัฒนธรรม", role: "ผู้อำนวยการกองภาพยนตร์และวีดิทัศน์" },
  { name: "นางสาวพรรณี ศิลปะ", role: "รองผู้อำนวยการ" },
  { name: "นายวิชัย เทคโนโลยี", role: "หัวหน้ากลุ่มพัฒนาระบบ" },
  { name: "นางสมหญิง ข้อมูล", role: "หัวหน้ากลุ่มจัดการเนื้อหา" },
];

export default function AboutPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "เกี่ยวกับเรา" : "About" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="pink" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
              {lang === "th" ? "เกี่ยวกับ ContentThailand" : "About ContentThailand"}
            </h1>
          </FilmStrip>
        </div>

        {/* Intro */}
        <div className="bg-[var(--ct-bg-elevated)] rounded-2xl border border-[var(--ct-border)] p-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-6 h-6 text-pink" />
            <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">
              {lang === "th" ? "ฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ" : "Thailand National Film & Video Database"}
            </h2>
          </div>
          <p className="text-[var(--ct-text-secondary)] font-body leading-relaxed">
            {lang === "th"
              ? "ContentThailand เป็นระบบฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ พัฒนาโดยกองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม กระทรวงวัฒนธรรม เพื่อรวบรวม จัดเก็บ และเผยแพร่ข้อมูลภาพยนตร์และวีดิทัศน์ของประเทศไทยอย่างเป็นระบบ ครอบคลุมทั้งภาพยนตร์ ละครโทรทัศน์ บุคลากรในวงการ และบริษัทผู้ผลิต"
              : "ContentThailand is the national film and video database system developed by the Film and Video Division, Department of Cultural Promotion, Ministry of Culture. It systematically collects, stores, and publishes data about Thai films, TV series, industry personnel, and production companies."}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-amber" />
              <h3 className="font-thai font-bold text-[var(--ct-text-primary)]">{lang === "th" ? "วิสัยทัศน์" : "Vision"}</h3>
            </div>
            <p className="text-[var(--ct-text-muted)] font-body text-sm leading-relaxed">
              {lang === "th"
                ? "เป็นศูนย์กลางข้อมูลภาพยนตร์และวีดิทัศน์ที่ครบถ้วน น่าเชื่อถือ และเข้าถึงได้ง่ายที่สุดในประเทศไทย เพื่อส่งเสริมอุตสาหกรรมบันเทิงไทยสู่ระดับสากล"
                : "To be the most comprehensive, trusted, and accessible film and video data center in Thailand, promoting the Thai entertainment industry internationally."}
            </p>
          </div>
          <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-orange" />
              <h3 className="font-thai font-bold text-[var(--ct-text-primary)]">{lang === "th" ? "พันธกิจ" : "Mission"}</h3>
            </div>
            <ul className="text-[var(--ct-text-muted)] font-body text-sm leading-relaxed space-y-2">
              <li>{lang === "th" ? "• รวบรวมและจัดเก็บข้อมูลภาพยนตร์และวีดิทัศน์อย่างเป็นระบบ" : "• Systematically collect and store film and video data"}</li>
              <li>{lang === "th" ? "• เผยแพร่ข้อมูลสู่สาธารณะเพื่อการศึกษาและวิจัย" : "• Publish data for education and research"}</li>
              <li>{lang === "th" ? "• สนับสนุนการพัฒนาอุตสาหกรรมภาพยนตร์ไทย" : "• Support Thai film industry development"}</li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: "562+", label: lang === "th" ? "ภาพยนตร์" : "Films" },
            { value: "737+", label: lang === "th" ? "ละครโทรทัศน์" : "TV Series" },
            { value: "5,888+", label: lang === "th" ? "บุคลากร" : "Personnel" },
            { value: "1.25M", label: lang === "th" ? "ผู้เข้าชม" : "Visitors" },
          ].map((s) => (
            <div key={s.label} className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-4 text-center">
              <p className="font-display text-2xl text-amber font-bold">{s.value}</p>
              <p className="text-[var(--ct-text-muted)] text-xs font-thai mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-10">
          <FilmStrip color="purple" size="md">
            <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">{lang === "th" ? "ประวัติความเป็นมา" : "History"}</h2>
          </FilmStrip>
          <div className="mt-6 space-y-6 relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-px before:bg-[var(--ct-bg-hover)]">
            {timeline.map((t) => (
              <div key={t.year} className="flex gap-4 pl-4">
                <div className="w-8 h-8 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center flex-shrink-0 -ml-4 z-10">
                  <Calendar className="w-3.5 h-3.5 text-purple-light" />
                </div>
                <div>
                  <p className="text-amber font-mono text-sm font-bold mb-0.5">{t.year}</p>
                  <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm">{t.title}</p>
                  <p className="text-[var(--ct-text-muted)] font-body text-xs mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <FilmStrip color="orange" size="md">
            <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] flex items-center gap-2">
              <Users className="w-5 h-5 text-orange" />
              {lang === "th" ? "ทีมงาน" : "Team"}
            </h2>
          </FilmStrip>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {teamMembers.map((m) => (
              <div key={m.name} className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple/30 to-[var(--ct-bg-elevated)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--ct-text-faint)] font-display font-bold">{m.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-[var(--ct-text-primary)] font-thai text-sm font-semibold">{m.name}</p>
                  <p className="text-[var(--ct-text-muted)] font-thai text-xs">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
