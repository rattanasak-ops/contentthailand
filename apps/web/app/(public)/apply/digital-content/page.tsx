"use client";

import { useState } from "react";
import { FileText, Upload, CheckCircle2, Download } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DigitalContentPage() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "สมัครมาตรการ" : "Apply", href: "/apply" },
    { label: lang === "th" ? "มาตรการดิจิทัลคอนเทนต์" : "Digital Content Incentive" },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="font-thai font-bold text-2xl text-[var(--ct-text-primary)] mb-3">
              {lang === "th" ? "ส่งใบสมัครเรียบร้อยแล้ว" : "Application Submitted Successfully"}
            </h2>
            <p className="text-[var(--ct-text-muted)] font-thai text-sm max-w-md mx-auto mb-6">
              {lang === "th"
                ? "ขอบคุณสำหรับการสมัคร ทีมงานจะตรวจสอบข้อมูลและติดต่อกลับภายใน 15 วันทำการ"
                : "Thank you for your application. Our team will review and contact you within 15 business days."}
            </p>
            <p className="text-[var(--ct-text-faint)] font-mono text-xs">
              Reference: CT-DC-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 9000) + 1000)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-8">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-xl md:text-2xl text-[var(--ct-text-primary)]">
              {lang === "th" ? "มาตรการส่งเสริมการจ้างผลิตดิจิทัลคอนเทนต์" : "Digital Content Production Incentive"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 ml-1">
            {lang === "th"
              ? "กรอกแบบฟอร์มด้านล่างเพื่อสมัครมาตรการส่งเสริมการจ้างผลิตดิจิทัลคอนเทนต์ของต่างชาติ"
              : "Fill in the form below to apply for the foreign digital content production incentive."}
          </p>
        </div>

        {/* Export buttons */}
        <div className="flex gap-2 mb-6">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 text-xs font-thai rounded-lg hover:bg-green-500/20 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-thai rounded-lg hover:bg-red-500/20 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="space-y-6"
        >
          {/* Section 1: Company Info */}
          <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange/20 text-orange text-xs flex items-center justify-center font-bold">1</span>
              {lang === "th" ? "ข้อมูลบริษัท" : "Company Information"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "ชื่อบริษัท" : "Company Name"} *</label>
                <input required className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "ประเทศ" : "Country"} *</label>
                <input required className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "ชื่อผู้ติดต่อ" : "Contact Person"} *</label>
                <input required className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "อีเมล" : "Email"} *</label>
                <input required type="email" className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "โทรศัพท์" : "Phone"} *</label>
                <input required className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "เว็บไซต์" : "Website"}</label>
                <input className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Section 2: Project Info */}
          <div className="bg-[var(--ct-bg-elevated)] ct-section-b rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange/20 text-orange text-xs flex items-center justify-center font-bold">2</span>
              {lang === "th" ? "ข้อมูลโครงการ" : "Project Information"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "ชื่อโครงการ" : "Project Title"} *</label>
                <input required className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "ประเภทดิจิทัลคอนเทนต์" : "Digital Content Type"} *</label>
                  <select required className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-thai focus:border-orange/50 focus:outline-none">
                    <option value="">{lang === "th" ? "เลือกประเภท" : "Select type"}</option>
                    <option value="animation">{lang === "th" ? "แอนิเมชัน" : "Animation"}</option>
                    <option value="vfx">{lang === "th" ? "วิชวลเอฟเฟกต์ (VFX)" : "Visual Effects (VFX)"}</option>
                    <option value="game">{lang === "th" ? "เกม" : "Game"}</option>
                    <option value="metaverse">{lang === "th" ? "เมตาเวิร์ส / XR" : "Metaverse / XR"}</option>
                    <option value="other">{lang === "th" ? "อื่นๆ" : "Other"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "งบประมาณโดยประมาณ (THB)" : "Estimated Budget (THB)"} *</label>
                  <input required type="number" className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "วันที่เริ่มโครงการ" : "Project Start Date"} *</label>
                  <input required type="date" className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "วันที่สิ้นสุดโครงการ" : "Project End Date"} *</label>
                  <input required type="date" className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "รายละเอียดโครงการ" : "Project Description"} *</label>
                <textarea required rows={4} className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none resize-none" />
              </div>
              <div>
                <label className="block text-[var(--ct-text-muted)] text-xs font-thai mb-1">{lang === "th" ? "จำนวนบุคลากรไทยที่จ้าง" : "Number of Thai Staff Employed"} *</label>
                <input required type="number" className="w-full bg-[var(--ct-bg-page)] border border-[var(--ct-border)] rounded-lg px-3 py-2 text-[var(--ct-text-primary)] text-sm font-body focus:border-orange/50 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Section 3: Documents */}
          <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange/20 text-orange text-xs flex items-center justify-center font-bold">3</span>
              {lang === "th" ? "แนบเอกสาร" : "Attach Documents"}
            </h2>
            <div className="space-y-3">
              {[
                { th: "สำเนาหนังสือจดทะเบียนบริษัท", en: "Company Registration Certificate" },
                { th: "รายละเอียดโครงการ (Project Proposal)", en: "Project Proposal" },
                { th: "งบประมาณโดยละเอียด (Budget Breakdown)", en: "Detailed Budget Breakdown" },
                { th: "ตัวอย่างผลงาน (Portfolio/Demo Reel)", en: "Portfolio/Demo Reel" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 bg-[var(--ct-bg-page)] rounded-lg p-3 border border-dashed border-[var(--ct-border)]">
                  <Upload className="w-4 h-4 text-[var(--ct-text-faint)] flex-shrink-0" />
                  <span className="text-[var(--ct-text-muted)] text-sm font-thai flex-1">{lang === "th" ? doc.th : doc.en}</span>
                  <label className="cursor-pointer px-3 py-1 bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-hover)] text-[var(--ct-text-muted)] text-xs font-thai rounded-lg transition-colors">
                    {lang === "th" ? "เลือกไฟล์" : "Choose file"}
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.mp4,.mov" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#F76532] to-[#F6A51B] text-[var(--ct-text-primary)] text-sm font-thai font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <FileText className="w-4 h-4" />
              {lang === "th" ? "ส่งใบสมัคร" : "Submit Application"}
            </button>
            <p className="text-[var(--ct-text-faint)] text-xs font-thai">
              {lang === "th" ? "* จำเป็นต้องกรอก" : "* Required fields"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
