"use client";

import Link from "next/link";
import { Film, Award, FileText, CheckCircle2, ArrowRight, DollarSign, Globe, Users, ClipboardList } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const benefits = {
  th: [
    { icon: DollarSign, title: "คืนภาษีสูงสุด 30%", desc: "สิทธิประโยชน์ทางภาษีสำหรับค่าใช้จ่ายในการผลิตภาพยนตร์ในประเทศไทย" },
    { icon: Globe, title: "ฐานข้อมูลสถานที่ถ่ายทำ", desc: "เข้าถึงฐานข้อมูลสถานที่ถ่ายทำภาพยนตร์ทั่วประเทศไทย" },
    { icon: Users, title: "ทีมงานมืออาชีพ", desc: "เชื่อมต่อกับบุคลากรและบริษัทในอุตสาหกรรมภาพยนตร์ไทย" },
    { icon: ClipboardList, title: "อำนวยความสะดวก", desc: "บริการอำนวยความสะดวกด้านใบอนุญาตและการประสานงานหน่วยงานรัฐ" },
  ],
  en: [
    { icon: DollarSign, title: "Up to 30% Cash Rebate", desc: "Tax incentive for qualifying production expenditure in Thailand" },
    { icon: Globe, title: "Location Database", desc: "Access to comprehensive filming location database across Thailand" },
    { icon: Users, title: "Professional Crew", desc: "Connect with Thai film industry personnel and production companies" },
    { icon: ClipboardList, title: "Facilitation Services", desc: "Permit facilitation and government agency coordination services" },
  ],
};

const steps = {
  th: [
    { step: 1, title: "ศึกษาหลักเกณฑ์", desc: "ศึกษาคุณสมบัติ เงื่อนไข และหลักเกณฑ์ของมาตรการส่งเสริม" },
    { step: 2, title: "เตรียมเอกสาร", desc: "จัดเตรียมเอกสารประกอบการสมัคร เช่น บทภาพยนตร์ แผนการผลิต งบประมาณ" },
    { step: 3, title: "ยื่นใบสมัคร", desc: "กรอกข้อมูลและยื่นใบสมัครผ่านระบบออนไลน์พร้อมแนบเอกสาร" },
    { step: 4, title: "รอพิจารณา", desc: "คณะกรรมการพิจารณาใบสมัครและแจ้งผลภายใน 30 วันทำการ" },
    { step: 5, title: "ดำเนินการผลิต", desc: "เริ่มการผลิตภาพยนตร์ตามแผนที่ได้รับอนุมัติ" },
    { step: 6, title: "ยื่นเบิกสิทธิประโยชน์", desc: "ยื่นหลักฐานค่าใช้จ่ายเพื่อขอรับสิทธิประโยชน์ทางภาษี" },
  ],
  en: [
    { step: 1, title: "Study Criteria", desc: "Review qualifications, conditions, and criteria of the incentive program" },
    { step: 2, title: "Prepare Documents", desc: "Prepare supporting documents such as screenplay, production plan, budget" },
    { step: 3, title: "Submit Application", desc: "Fill in details and submit application online with attached documents" },
    { step: 4, title: "Await Review", desc: "Committee reviews application and notifies result within 30 business days" },
    { step: 5, title: "Begin Production", desc: "Start film production according to the approved plan" },
    { step: 6, title: "Claim Benefits", desc: "Submit expense evidence to claim the tax incentive" },
  ],
};

export default function FilmIncentivePage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: "Film Incentive" },
  ];

  const currentBenefits = lang === "th" ? benefits.th : benefits.en;
  const currentSteps = lang === "th" ? steps.th : steps.en;

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="pink" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <Award className="w-7 h-7 text-pink" />
              Film Incentive
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 max-w-2xl">
            {lang === "th"
              ? "มาตรการส่งเสริมการถ่ายทำภาพยนตร์ต่างชาติในประเทศไทย และมาตรการส่งเสริมการจ้างผลิตดิจิทัลคอนเทนต์ของต่างชาติ"
              : "Thailand's incentive programs for foreign film production and digital content production"}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-10">
          <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber" />
            {lang === "th" ? "สิทธิประโยชน์" : "Benefits"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-pink" />
                  </div>
                  <div>
                    <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">{b.title}</p>
                    <p className="text-[var(--ct-text-muted)] font-body text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Steps */}
        <div className="mb-10">
          <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange" />
            {lang === "th" ? "ขั้นตอนการยื่นขอ" : "Application Process"}
          </h2>
          <div className="space-y-4">
            {currentSteps.map((s) => (
              <div key={s.step} className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange to-amber flex items-center justify-center flex-shrink-0">
                  <span className="text-midnight font-bold text-sm">{s.step}</span>
                </div>
                <div>
                  <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">{s.title}</p>
                  <p className="text-[var(--ct-text-muted)] font-body text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Programs CTA */}
        <div className="mb-10">
          <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)] mb-6">
            {lang === "th" ? "มาตรการที่เปิดรับสมัคร" : "Available Programs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/apply/film-incentive" className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6 hover:border-pink/30 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <Film className="w-6 h-6 text-pink" />
                <h3 className="font-thai font-bold text-[var(--ct-text-primary)] text-sm">
                  {lang === "th" ? "มาตรการส่งเสริมการถ่ายทำภาพยนตร์" : "Film Production Incentive"}
                </h3>
              </div>
              <p className="text-[var(--ct-text-muted)] text-xs font-body mb-4">
                {lang === "th"
                  ? "สิทธิประโยชน์ทางภาษีสูงสุด 30% สำหรับการถ่ายทำภาพยนตร์ต่างชาติ"
                  : "Up to 30% tax incentive for foreign film productions"}
              </p>
              <span className="inline-flex items-center gap-1 text-pink text-xs font-thai font-semibold group-hover:gap-2 transition-all">
                {lang === "th" ? "กรอกใบสมัคร" : "Apply Now"} <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/apply/digital-content" className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6 hover:border-orange/30 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <Film className="w-6 h-6 text-orange" />
                <h3 className="font-thai font-bold text-[var(--ct-text-primary)] text-sm">
                  {lang === "th" ? "มาตรการส่งเสริมดิจิทัลคอนเทนต์" : "Digital Content Incentive"}
                </h3>
              </div>
              <p className="text-[var(--ct-text-muted)] text-xs font-body mb-4">
                {lang === "th"
                  ? "สนับสนุนการผลิตดิจิทัลคอนเทนต์ เช่น แอนิเมชัน VFX เกม"
                  : "Support for digital content production including animation, VFX, gaming"}
              </p>
              <span className="inline-flex items-center gap-1 text-orange text-xs font-thai font-semibold group-hover:gap-2 transition-all">
                {lang === "th" ? "กรอกใบสมัคร" : "Apply Now"} <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
