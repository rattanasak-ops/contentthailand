"use client";

import { Target, Compass, Award, Heart, Globe } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const missions = {
  th: [
    { icon: Target, title: "รวบรวมและจัดเก็บข้อมูล", desc: "รวบรวมและจัดเก็บข้อมูลภาพยนตร์และวีดิทัศน์ของประเทศไทยอย่างเป็นระบบ ครอบคลุม และเป็นปัจจุบัน" },
    { icon: Globe, title: "เผยแพร่สู่สาธารณะ", desc: "เผยแพร่ข้อมูลสู่สาธารณะเพื่อการศึกษา วิจัย และการอ้างอิง ทั้งในระดับประเทศและระดับสากล" },
    { icon: Award, title: "ส่งเสริมอุตสาหกรรม", desc: "สนับสนุนและส่งเสริมอุตสาหกรรมภาพยนตร์และวีดิทัศน์ไทยให้มีศักยภาพในการแข่งขันระดับสากล" },
    { icon: Heart, title: "อนุรักษ์มรดกทางวัฒนธรรม", desc: "อนุรักษ์และเผยแพร่มรดกทางวัฒนธรรมด้านภาพยนตร์และวีดิทัศน์ไทย เพื่อคนรุ่นหลัง" },
  ],
  en: [
    { icon: Target, title: "Collect & Store Data", desc: "Systematically collect and store Thai film and video data in a comprehensive and up-to-date manner" },
    { icon: Globe, title: "Public Dissemination", desc: "Publish data for education, research, and reference at both national and international levels" },
    { icon: Award, title: "Industry Promotion", desc: "Support and promote the Thai film and video industry to be competitive internationally" },
    { icon: Heart, title: "Cultural Heritage", desc: "Preserve and disseminate Thailand's film and video cultural heritage for future generations" },
  ],
};

export default function MissionPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "เกี่ยวกับเรา" : "About", href: "/about" },
    { label: lang === "th" ? "พันธกิจองค์กร" : "Mission" },
  ];

  const currentMissions = lang === "th" ? missions.th : missions.en;

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <Compass className="w-7 h-7 text-orange" />
              {lang === "th" ? "พันธกิจองค์กร" : "Our Mission"}
            </h1>
          </FilmStrip>
        </div>

        {/* Vision */}
        <div className="bg-[var(--ct-bg-elevated)] rounded-2xl border border-[var(--ct-border)] p-8 mb-10">
          <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] mb-4">
            {lang === "th" ? "วิสัยทัศน์" : "Vision"}
          </h2>
          <p className="text-[var(--ct-text-secondary)] font-body leading-relaxed text-lg">
            {lang === "th"
              ? "\"เป็นศูนย์กลางข้อมูลภาพยนตร์และวีดิทัศน์ที่ครบถ้วน น่าเชื่อถือ และเข้าถึงได้ง่ายที่สุดในประเทศไทย เพื่อส่งเสริมอุตสาหกรรมบันเทิงไทยสู่ระดับสากล\""
              : "\"To be the most comprehensive, trusted, and accessible film and video data center in Thailand, promoting the Thai entertainment industry internationally.\""}
          </p>
        </div>

        {/* Missions */}
        <div className="mb-10">
          <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] mb-6">
            {lang === "th" ? "พันธกิจ" : "Mission Statements"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentMissions.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-orange" />
                    </div>
                    <h3 className="font-thai font-bold text-[var(--ct-text-primary)] text-sm">{m.title}</h3>
                  </div>
                  <p className="text-[var(--ct-text-muted)] font-body text-sm leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic Alignment */}
        <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
          <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
            {lang === "th" ? "ความสอดคล้องกับยุทธศาสตร์" : "Strategic Alignment"}
          </h2>
          <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
            <p>
              {lang === "th"
                ? "ContentThailand ดำเนินงานสอดคล้องกับยุทธศาสตร์กระทรวงวัฒนธรรม ยุทธศาสตร์ที่ 2: ส่งเสริมเศรษฐกิจฐานรากด้วยมิติทางวัฒนธรรมและพัฒนาศักยภาพอุตสาหกรรมวัฒนธรรมให้สามารถแข่งขันได้ในตลาดโลก"
                : "ContentThailand operates in alignment with the Ministry of Culture Strategy 2: Promoting grassroots economy through cultural dimensions and developing cultural industry capabilities to compete in the global market."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
