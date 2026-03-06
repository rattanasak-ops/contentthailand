"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, Download, FileText, BarChart3, Calendar, ArrowLeft, Share2, Facebook, MessageCircle, Link as LinkCopy } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

interface Resource {
  id: number;
  slug: string;
  titleTh: string;
  titleEn: string;
  category: string;
  type: "pdf" | "report" | "stats";
  year: number;
  size: string;
  descriptionTh: string;
  descriptionEn: string;
  contentTh: string;
  contentEn: string;
}

const resources: Resource[] = [
  {
    id: 1, slug: "thai-film-industry-report-2025",
    titleTh: "รายงานสถานการณ์อุตสาหกรรมภาพยนตร์ไทย ประจำปี 2568",
    titleEn: "Thai Film Industry Report 2025",
    category: "report", type: "report", year: 2568, size: "4.2 MB",
    descriptionTh: "รายงานสรุปภาพรวมสถานการณ์อุตสาหกรรมภาพยนตร์ไทย ประจำปี 2568 จัดทำโดยกองภาพยนตร์และวีดิทัศน์",
    descriptionEn: "Comprehensive overview report of the Thai film industry for 2025, prepared by the Bureau of Film and Video.",
    contentTh: "รายงานฉบับนี้ครอบคลุมข้อมูลสำคัญเกี่ยวกับอุตสาหกรรมภาพยนตร์ไทย ได้แก่ จำนวนภาพยนตร์ที่ผลิต รายได้จากการจำหน่ายตั๋ว สถิติการถ่ายทำภาพยนตร์ต่างชาติในประเทศไทย แนวโน้มการเติบโตของอุตสาหกรรม และข้อเสนอแนะเชิงนโยบาย\n\nหัวข้อหลัก:\n- สรุปภาพรวมตลาดภาพยนตร์ไทย\n- สถิติการผลิตภาพยนตร์ไทย\n- รายได้และการจัดจำหน่าย\n- ภาพยนตร์ต่างชาติถ่ายทำในไทย\n- การส่งออกภาพยนตร์ไทย\n- แนวโน้มและทิศทาง",
    contentEn: "This report covers key data about the Thai film industry including production numbers, box office revenue, foreign film shooting statistics, growth trends, and policy recommendations.\n\nKey Topics:\n- Thai Film Market Overview\n- Thai Film Production Statistics\n- Revenue and Distribution\n- Foreign Films Shot in Thailand\n- Thai Film Exports\n- Trends and Directions",
  },
  {
    id: 2, slug: "thai-film-audience-statistics-2024",
    titleTh: "สถิติผู้ชมภาพยนตร์ไทยในโรงภาพยนตร์ 2567",
    titleEn: "Thai Film Audience Statistics 2024",
    category: "statistics", type: "stats", year: 2567, size: "2.8 MB",
    descriptionTh: "ข้อมูลสถิติผู้ชมภาพยนตร์ไทยในโรงภาพยนตร์ทั่วประเทศ ปี 2567",
    descriptionEn: "Audience statistics for Thai films in cinemas nationwide, 2024.",
    contentTh: "รายงานสถิติผู้ชมภาพยนตร์ไทยฉบับนี้รวบรวมข้อมูลจากโรงภาพยนตร์ทั่วประเทศ แสดงจำนวนผู้ชม รายได้ และส่วนแบ่งตลาดของภาพยนตร์ไทยเทียบกับภาพยนตร์ต่างชาติ",
    contentEn: "This audience statistics report compiles data from cinemas nationwide, showing attendance, revenue, and market share of Thai films versus foreign films.",
  },
  {
    id: 3, slug: "thai-film-international-promotion-guidelines",
    titleTh: "แนวทางการส่งเสริมภาพยนตร์ไทยสู่ตลาดสากล",
    titleEn: "Guidelines for Thai Film International Promotion",
    category: "guide", type: "pdf", year: 2568, size: "1.5 MB",
    descriptionTh: "คู่มือแนวทางการส่งเสริมภาพยนตร์ไทยสู่ตลาดสากล โดยกระทรวงวัฒนธรรม",
    descriptionEn: "Guidelines for promoting Thai films in international markets, by the Ministry of Culture.",
    contentTh: "คู่มือแนวทางปฏิบัติสำหรับผู้ผลิตภาพยนตร์ไทยที่ต้องการส่งผลงานเข้าร่วมเทศกาลภาพยนตร์ระดับนานาชาติ และจัดจำหน่ายในตลาดต่างประเทศ",
    contentEn: "A practical guide for Thai filmmakers looking to submit their work to international film festivals and distribute in foreign markets.",
  },
  {
    id: 4, slug: "thai-media-consumption-research-2024",
    titleTh: "งานวิจัย: พฤติกรรมการรับชมสื่อของคนไทย 2567",
    titleEn: "Research: Thai Media Consumption Behavior 2024",
    category: "research", type: "pdf", year: 2567, size: "6.1 MB",
    descriptionTh: "งานวิจัยเชิงลึกเกี่ยวกับพฤติกรรมการรับชมสื่อของคนไทยในยุคดิจิทัล",
    descriptionEn: "In-depth research on Thai media consumption behavior in the digital era.",
    contentTh: "งานวิจัยฉบับนี้ศึกษาพฤติกรรมการรับชมสื่อของคนไทยทั้งออฟไลน์และออนไลน์ ครอบคลุมโรงภาพยนตร์ โทรทัศน์ และแพลตฟอร์มสตรีมมิ่ง",
    contentEn: "This research studies Thai media consumption behavior both offline and online, covering cinemas, television, and streaming platforms.",
  },
  {
    id: 5, slug: "contentthailand-user-manual",
    titleTh: "คู่มือการใช้งานระบบ ContentThailand",
    titleEn: "ContentThailand User Manual",
    category: "guide", type: "pdf", year: 2568, size: "3.4 MB",
    descriptionTh: "คู่มือการใช้งานเว็บไซต์ ContentThailand สำหรับผู้ใช้งานทั่วไปและเจ้าหน้าที่",
    descriptionEn: "User manual for the ContentThailand website for general users and staff.",
    contentTh: "คู่มือฉบับนี้อธิบายวิธีการใช้งานเว็บไซต์ ContentThailand ตั้งแต่การค้นหาข้อมูล การเข้าดูรายละเอียดภาพยนตร์ ละครโทรทัศน์ บุคลากร และบริษัท",
    contentEn: "This manual explains how to use the ContentThailand website, from searching data to viewing details of films, TV series, personnel, and companies.",
  },
  {
    id: 6, slug: "film-division-annual-report-2024",
    titleTh: "รายงานผลการดำเนินงานกองภาพยนตร์ฯ ปี 2567",
    titleEn: "Film Division Annual Report 2024",
    category: "report", type: "report", year: 2567, size: "5.7 MB",
    descriptionTh: "รายงานประจำปีของกองภาพยนตร์และวีดิทัศน์ สรุปผลการดำเนินงานปี 2567",
    descriptionEn: "Annual report of the Bureau of Film and Video, summarizing 2024 operations.",
    contentTh: "รายงานประจำปีฉบับนี้สรุปผลการดำเนินงานของกองภาพยนตร์และวีดิทัศน์ กระทรวงวัฒนธรรม ประจำปี 2567",
    contentEn: "This annual report summarizes the operations of the Bureau of Film and Video, Ministry of Culture, for the year 2024.",
  },
  {
    id: 7, slug: "thai-films-international-awards",
    titleTh: "สถิติภาพยนตร์ไทยที่ได้รับรางวัลระดับนานาชาติ",
    titleEn: "Thai Films International Awards Statistics",
    category: "statistics", type: "stats", year: 2568, size: "1.2 MB",
    descriptionTh: "รวบรวมสถิติรางวัลภาพยนตร์ไทยที่ได้รับจากเทศกาลภาพยนตร์นานาชาติ",
    descriptionEn: "Collection of Thai film award statistics from international film festivals.",
    contentTh: "ข้อมูลรวบรวมรางวัลภาพยนตร์ไทยจากเทศกาลภาพยนตร์นานาชาติที่สำคัญ ตั้งแต่ปี 2540 จนถึงปัจจุบัน",
    contentEn: "A compilation of Thai film awards from major international film festivals from 1997 to present.",
  },
  {
    id: 8, slug: "film-industry-strategic-plan-2025-2029",
    titleTh: "แผนยุทธศาสตร์การพัฒนาอุตสาหกรรมภาพยนตร์ 2568-2572",
    titleEn: "Film Industry Strategic Plan 2025-2029",
    category: "report", type: "report", year: 2568, size: "8.3 MB",
    descriptionTh: "แผนยุทธศาสตร์ 5 ปี สำหรับการพัฒนาอุตสาหกรรมภาพยนตร์และวีดิทัศน์ของประเทศไทย",
    descriptionEn: "5-year strategic plan for the development of Thailand's film and video industry.",
    contentTh: "แผนยุทธศาสตร์ฉบับนี้กำหนดทิศทางการพัฒนาอุตสาหกรรมภาพยนตร์และวีดิทัศน์ของประเทศไทย ระยะ 5 ปี (พ.ศ. 2568-2572) ครอบคลุมยุทธศาสตร์การพัฒนาบุคลากร การส่งเสริมการผลิต การตลาดระหว่างประเทศ และการใช้เทคโนโลยี",
    contentEn: "This strategic plan sets the direction for Thailand's film and video industry development over 5 years (2025-2029), covering talent development, production promotion, international marketing, and technology adoption.",
  },
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

export default function LibraryDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const slug = params.slug as string;

  const resource = resources.find((r) => r.slug === slug);

  if (!resource) {
    return (
      <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[var(--ct-text-primary)] font-display text-4xl mb-4">404</h1>
          <p className="text-[var(--ct-text-muted)] font-thai">
            {lang === "th" ? "ไม่พบเอกสาร" : "Document not found"}
          </p>
          <Link href="/library" className="text-pink font-thai text-sm hover:underline mt-4 inline-block">
            {lang === "th" ? "← กลับคลังความรู้" : "← Back to library"}
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === "th" ? resource.titleTh : resource.titleEn;
  const description = lang === "th" ? resource.descriptionTh : resource.descriptionEn;
  const content = lang === "th" ? resource.contentTh : resource.contentEn;
  const catLabel = categoryLabels[resource.category];
  const Icon = typeIcon[resource.type] || FileText;

  const relatedResources = resources
    .filter((r) => r.id !== resource.id && r.category === resource.category)
    .slice(0, 3);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "คลังความรู้" : "Library", href: "/library" },
    { label: title },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        {/* Header */}
        <div className="bg-[var(--ct-bg-elevated)] rounded-2xl border border-[var(--ct-border)] p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple/20 to-[var(--ct-bg-page)] flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-purple-light" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-purple/10 text-purple-light text-[10px] rounded font-thai">
                  {lang === "th" ? catLabel?.th : catLabel?.en}
                </span>
                <span className="text-[var(--ct-text-faint)] text-[10px] font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {resource.year}
                </span>
                <span className="text-[var(--ct-text-faint)] text-[10px] font-mono">{resource.size}</span>
              </div>
              <h1 className="font-thai font-bold text-xl md:text-2xl text-[var(--ct-text-primary)] mb-2">{title}</h1>
              <p className="text-[var(--ct-text-muted)] text-sm font-body">{description}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6 ml-[72px]">
            <button
              onClick={() => toast.success(lang === "th" ? "กำลังดาวน์โหลด..." : "Downloading...")}
              className="flex items-center gap-2 px-5 py-2 bg-amber/10 text-amber text-sm font-thai rounded-xl hover:bg-amber/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              {lang === "th" ? "ดาวน์โหลด" : "Download"} ({resource.size})
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--ct-text-faint)] text-xs font-thai mr-1">{lang === "th" ? "แชร์:" : "Share:"}</span>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#1877F2]/20 hover:text-[#1877F2] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110" title="Facebook"><Facebook className="w-4 h-4" /></button>
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-hover)] hover:text-[var(--ct-text-primary)] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110" title="X"><Share2 className="w-4 h-4" /></button>
              <button onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#06C755]/20 hover:text-[#06C755] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110" title="LINE"><MessageCircle className="w-4 h-4" /></button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(lang === "th" ? "คัดลอกลิงก์แล้ว" : "Link copied!"); }} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-amber/20 hover:text-amber rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110" title={lang === "th" ? "คัดลอกลิงก์" : "Copy link"}><LinkCopy className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[var(--ct-bg-elevated)] rounded-2xl border border-[var(--ct-border)] p-6 md:p-8 mb-8">
          <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
            {lang === "th" ? "เนื้อหาเอกสาร" : "Document Content"}
          </h2>
          <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed whitespace-pre-line">
            {content}
          </div>
          <div className="mt-6 p-4 bg-[var(--ct-bg-page)] rounded-xl border border-[var(--ct-border)] text-center">
            <p className="text-[var(--ct-text-faint)] text-xs font-thai mb-2">
              {lang === "th" ? "ดาวน์โหลดเอกสารฉบับเต็มเพื่ออ่านรายละเอียดทั้งหมด" : "Download the full document for complete details"}
            </p>
            <button className="flex items-center gap-2 px-5 py-2 bg-amber/10 text-amber text-sm font-thai rounded-xl hover:bg-amber/20 transition-colors mx-auto">
              <Download className="w-4 h-4" />
              {lang === "th" ? "ดาวน์โหลดฉบับเต็ม" : "Download Full Document"}
            </button>
          </div>
        </div>

        {/* Related */}
        {relatedResources.length > 0 && (
          <div>
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "เอกสารที่เกี่ยวข้อง" : "Related Documents"}
            </h2>
            <div className="space-y-3">
              {relatedResources.map((r) => {
                const rTitle = lang === "th" ? r.titleTh : r.titleEn;
                const RIcon = typeIcon[r.type] || FileText;
                return (
                  <Link
                    key={r.id}
                    href={`/library/${r.slug}`}
                    className="group flex items-center gap-4 bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-4 hover:border-purple/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple/20 to-[var(--ct-bg-page)] flex items-center justify-center flex-shrink-0">
                      <RIcon className="w-4 h-4 text-purple-light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-thai text-sm text-[var(--ct-text-primary)] truncate group-hover:text-purple-light transition-colors">{rTitle}</h3>
                      <span className="text-[var(--ct-text-faint)] text-[10px] font-mono">{r.year} - {r.size}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-8">
          <Link href="/library" className="inline-flex items-center gap-1.5 text-pink text-sm font-thai hover:underline">
            <ArrowLeft className="w-4 h-4" />
            {lang === "th" ? "กลับคลังความรู้" : "Back to Library"}
          </Link>
        </div>
      </div>
    </div>
  );
}
