"use client";

import { Building2, ExternalLink } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const partners = {
  th: [
    {
      category: "หน่วยงานภาครัฐ",
      items: [
        { name: "กระทรวงวัฒนธรรม", desc: "หน่วยงานหลักด้านวัฒนธรรมของประเทศไทย", url: "https://www.m-culture.go.th" },
        { name: "กรมส่งเสริมวัฒนธรรม", desc: "หน่วยงานที่ดูแลการส่งเสริมวัฒนธรรมไทย", url: "https://www.culture.go.th" },
        { name: "กองภาพยนตร์และวีดิทัศน์", desc: "หน่วยงานรับผิดชอบโดยตรงด้านภาพยนตร์และวีดิทัศน์", url: "https://www.fvd.culture.go.th" },
        { name: "สำนักงานส่งเสริมเศรษฐกิจสร้างสรรค์ (CEA)", desc: "ส่งเสริมเศรษฐกิจสร้างสรรค์และอุตสาหกรรมสร้างสรรค์ของไทย", url: "https://www.cea.or.th" },
      ],
    },
    {
      category: "สมาคมวิชาชีพ",
      items: [
        { name: "สมาคมผู้กำกับภาพยนตร์ไทย", desc: "สมาคมวิชาชีพของผู้กำกับภาพยนตร์ในประเทศไทย", url: "#" },
        { name: "สมาคมผู้สร้างภาพยนตร์แห่งประเทศไทย", desc: "สมาคมผู้ผลิตภาพยนตร์ไทย", url: "#" },
        { name: "สมาพันธ์สมาคมภาพยนตร์แห่งชาติ", desc: "องค์กรรวมสมาคมด้านภาพยนตร์ระดับชาติ", url: "#" },
      ],
    },
    {
      category: "สถาบันการศึกษาและวิจัย",
      items: [
        { name: "หอภาพยนตร์ (องค์การมหาชน)", desc: "สถาบันที่ทำหน้าที่อนุรักษ์และเผยแพร่ภาพยนตร์ไทย", url: "https://www.fapot.or.th" },
        { name: "จุฬาลงกรณ์มหาวิทยาลัย — คณะนิเทศศาสตร์", desc: "สถาบันการศึกษาด้านนิเทศศาสตร์และภาพยนตร์ชั้นนำ", url: "#" },
        { name: "มหาวิทยาลัยศิลปากร — คณะเทคโนโลยีสารสนเทศและการสื่อสาร", desc: "สถาบันที่มีหลักสูตรด้านภาพยนตร์และสื่อดิจิทัล", url: "#" },
      ],
    },
    {
      category: "พันธมิตรระหว่างประเทศ",
      items: [
        { name: "ASEAN Film Archive Network", desc: "เครือข่ายหอจดหมายเหตุภาพยนตร์อาเซียน", url: "#" },
        { name: "Asia-Pacific Film Commission", desc: "เครือข่ายคณะกรรมการภาพยนตร์เอเชีย-แปซิฟิก", url: "#" },
      ],
    },
  ],
  en: [
    {
      category: "Government Agencies",
      items: [
        { name: "Ministry of Culture", desc: "Thailand's principal cultural agency", url: "https://www.m-culture.go.th" },
        { name: "Department of Cultural Promotion", desc: "Agency overseeing Thai cultural promotion", url: "https://www.culture.go.th" },
        { name: "Bureau of Film and Video", desc: "Agency directly responsible for film and video affairs", url: "https://www.fvd.culture.go.th" },
        { name: "Creative Economy Agency (CEA)", desc: "Promoting Thailand's creative economy and industries", url: "https://www.cea.or.th" },
      ],
    },
    {
      category: "Professional Associations",
      items: [
        { name: "Thai Film Directors Association", desc: "Professional association for Thai film directors", url: "#" },
        { name: "Thai Film Producers Association", desc: "Association of Thai film producers", url: "#" },
        { name: "National Film Federation", desc: "National umbrella organization for film associations", url: "#" },
      ],
    },
    {
      category: "Educational & Research Institutions",
      items: [
        { name: "Film Archive (Public Organization)", desc: "Institution for preserving and promoting Thai films", url: "https://www.fapot.or.th" },
        { name: "Chulalongkorn University — Faculty of Communication Arts", desc: "Leading institution for communication arts and film studies", url: "#" },
        { name: "Silpakorn University — Faculty of ICT", desc: "Institution with film and digital media programs", url: "#" },
      ],
    },
    {
      category: "International Partners",
      items: [
        { name: "ASEAN Film Archive Network", desc: "ASEAN film archive network", url: "#" },
        { name: "Asia-Pacific Film Commission", desc: "Asia-Pacific film commission network", url: "#" },
      ],
    },
  ],
};

export default function PartnersPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "เกี่ยวกับเรา" : "About", href: "/about" },
    { label: lang === "th" ? "หน่วยงานพันธมิตร" : "Partners" },
  ];

  const currentPartners = lang === "th" ? partners.th : partners.en;

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="purple" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <Building2 className="w-7 h-7 text-purple-light" />
              {lang === "th" ? "หน่วยงานพันธมิตร" : "Partner Organizations"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3">
            {lang === "th"
              ? "หน่วยงานที่ร่วมมือกับ ContentThailand ในการส่งเสริมอุตสาหกรรมภาพยนตร์และวีดิทัศน์ไทย"
              : "Organizations collaborating with ContentThailand to promote the Thai film and video industry"}
          </p>
        </div>

        <div className="space-y-8">
          {currentPartners.map((group) => (
            <section key={group.category}>
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-5 hover:border-[#702874]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm mb-1">
                          {item.name}
                        </h3>
                        <p className="text-[var(--ct-text-muted)] text-xs font-body leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      {item.url !== "#" && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 p-2 rounded-lg text-[var(--ct-text-faint)] hover:text-purple-light hover:bg-[#702874]/10 transition-colors"
                          aria-label={`Visit ${item.name}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
