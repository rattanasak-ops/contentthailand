"use client";

import Link from "next/link";
import { FileText, Film, Monitor, ArrowRight, CheckCircle2 } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const programs = [
  {
    slug: "film-incentive",
    icon: Film,
    color: "pink",
    titleTh: "มาตรการส่งเสริมการถ่ายทำภาพยนตร์ต่างชาติในประเทศไทย",
    titleEn: "Foreign Film Production Incentive in Thailand",
    descTh: "สิทธิประโยชน์ทางภาษีสูงสุด 30% สำหรับการถ่ายทำภาพยนตร์ต่างชาติในประเทศไทย รวมถึงการอำนวยความสะดวกด้านสถานที่และทีมงาน",
    descEn: "Up to 30% tax incentive for foreign film productions shooting in Thailand, including location and crew facilitation support.",
    benefits: {
      th: ["คืนภาษีสูงสุด 30%", "อำนวยความสะดวกด้านใบอนุญาต", "ฐานข้อมูลสถานที่ถ่ายทำทั่วไทย", "เชื่อมต่อกับทีมงานมืออาชีพในไทย"],
      en: ["Up to 30% cash rebate", "Permit facilitation", "Thailand-wide location database", "Connect with Thai professional crew"],
    },
  },
  {
    slug: "digital-content",
    icon: Monitor,
    color: "orange",
    titleTh: "มาตรการส่งเสริมการจ้างผลิตดิจิทัลคอนเทนต์ของต่างชาติ",
    titleEn: "Foreign Digital Content Production Incentive",
    descTh: "สนับสนุนการผลิตดิจิทัลคอนเทนต์ เช่น แอนิเมชัน VFX เกม และสื่อดิจิทัลอื่นๆ โดยทีมงานในประเทศไทย",
    descEn: "Support for digital content production including animation, VFX, gaming, and other digital media by Thai-based teams.",
    benefits: {
      th: ["สิทธิประโยชน์ด้านภาษี", "สนับสนุนด้าน VFX และ Animation", "เข้าถึงบุคลากรด้านดิจิทัลของไทย", "ส่งเสริม Co-Production"],
      en: ["Tax benefits", "VFX & Animation support", "Access to Thai digital talent", "Co-Production promotion"],
    },
  },
];

export default function ApplyPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "สมัครมาตรการ" : "Apply" },
  ];

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-white">
              {lang === "th" ? "สมัครมาตรการส่งเสริม" : "Apply for Incentive Programs"}
            </h1>
          </FilmStrip>
          <p className="text-white/50 text-sm font-thai mt-3 ml-1 max-w-2xl">
            {lang === "th"
              ? "กระทรวงวัฒนธรรมเปิดรับสมัครมาตรการส่งเสริมสำหรับผู้ผลิตภาพยนตร์และดิจิทัลคอนเทนต์ต่างชาติ เลือกมาตรการที่เหมาะสมและกรอกใบสมัครออนไลน์"
              : "The Ministry of Culture offers incentive programs for foreign film and digital content producers. Select the appropriate program and submit your application online."}
          </p>
        </div>

        <div className="space-y-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            const title = lang === "th" ? prog.titleTh : prog.titleEn;
            const desc = lang === "th" ? prog.descTh : prog.descEn;
            const benefits = lang === "th" ? prog.benefits.th : prog.benefits.en;

            return (
              <div
                key={prog.slug}
                className={`bg-navy/40 rounded-2xl border border-white/5 overflow-hidden hover:border-${prog.color}/30 transition-all`}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${prog.color}/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${prog.color}`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-thai font-bold text-lg text-white mb-2">{title}</h2>
                      <p className="text-white/50 text-sm font-body leading-relaxed">{desc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 ml-16">
                    {benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 text-${prog.color}/60 flex-shrink-0`} />
                        <span className="text-white/60 text-sm font-thai">{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ml-16">
                    <Link
                      href={`/apply/${prog.slug}`}
                      className={`inline-flex items-center gap-2 px-6 py-2.5 bg-${prog.color}/10 text-${prog.color} rounded-xl text-sm font-thai font-semibold hover:bg-${prog.color}/20 transition-colors`}
                    >
                      <FileText className="w-4 h-4" />
                      {lang === "th" ? "กรอกใบสมัคร" : "Submit Application"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
