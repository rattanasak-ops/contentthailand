"use client";

import { useState } from "react";
import { FileText, Upload, CheckCircle2, Download } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FilmIncentivePage() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "สมัครมาตรการ" : "Apply", href: "/apply" },
    { label: lang === "th" ? "มาตรการถ่ายทำภาพยนตร์" : "Film Incentive" },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-midnight pt-8 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="font-thai font-bold text-2xl text-white mb-3">
              {lang === "th" ? "ส่งใบสมัครเรียบร้อยแล้ว" : "Application Submitted Successfully"}
            </h2>
            <p className="text-white/50 font-thai text-sm max-w-md mx-auto mb-6">
              {lang === "th"
                ? "ขอบคุณสำหรับการสมัคร ทีมงานจะตรวจสอบข้อมูลและติดต่อกลับภายใน 15 วันทำการ"
                : "Thank you for your application. Our team will review and contact you within 15 business days."}
            </p>
            <p className="text-white/30 font-mono text-xs">
              Reference: CT-FI-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 9000) + 1000)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-8">
          <FilmStrip color="pink" size="lg">
            <h1 className="font-thai font-bold text-xl md:text-2xl text-white">
              {lang === "th" ? "มาตรการส่งเสริมการถ่ายทำภาพยนตร์ต่างชาติ" : "Foreign Film Production Incentive"}
            </h1>
          </FilmStrip>
          <p className="text-white/50 text-sm font-thai mt-3 ml-1">
            {lang === "th"
              ? "กรอกแบบฟอร์มด้านล่างเพื่อสมัครมาตรการส่งเสริมการถ่ายทำภาพยนตร์ต่างชาติในประเทศไทย"
              : "Fill in the form below to apply for the foreign film production incentive in Thailand."}
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
          <div className="bg-navy/40 rounded-xl border border-white/5 p-6">
            <h2 className="font-thai font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-pink/20 text-pink text-xs flex items-center justify-center font-bold">1</span>
              {lang === "th" ? "ข้อมูลบริษัท" : "Company Information"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "ชื่อบริษัท" : "Company Name"} *</label>
                <input required className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "ประเทศ" : "Country"} *</label>
                <input required className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "ชื่อผู้ติดต่อ" : "Contact Person"} *</label>
                <input required className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "อีเมล" : "Email"} *</label>
                <input required type="email" className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "โทรศัพท์" : "Phone"} *</label>
                <input required className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "เว็บไซต์" : "Website"}</label>
                <input className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Section 2: Project Info */}
          <div className="bg-navy/40 rounded-xl border border-white/5 p-6">
            <h2 className="font-thai font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-pink/20 text-pink text-xs flex items-center justify-center font-bold">2</span>
              {lang === "th" ? "ข้อมูลโครงการ" : "Project Information"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "ชื่อโครงการภาพยนตร์" : "Film Project Title"} *</label>
                <input required className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "ประเภทภาพยนตร์" : "Film Type"} *</label>
                  <select required className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-thai focus:border-pink/50 focus:outline-none">
                    <option value="">{lang === "th" ? "เลือกประเภท" : "Select type"}</option>
                    <option value="feature">{lang === "th" ? "ภาพยนตร์ขนาดยาว" : "Feature Film"}</option>
                    <option value="short">{lang === "th" ? "ภาพยนตร์สั้น" : "Short Film"}</option>
                    <option value="documentary">{lang === "th" ? "สารคดี" : "Documentary"}</option>
                    <option value="series">{lang === "th" ? "ซีรีส์" : "Series"}</option>
                    <option value="commercial">{lang === "th" ? "โฆษณา" : "Commercial"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "งบประมาณโดยประมาณ (THB)" : "Estimated Budget (THB)"} *</label>
                  <input required type="number" className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "วันที่เริ่มถ่ายทำ" : "Shooting Start Date"} *</label>
                  <input required type="date" className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "วันที่สิ้นสุดถ่ายทำ" : "Shooting End Date"} *</label>
                  <input required type="date" className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "สถานที่ถ่ายทำในประเทศไทย" : "Shooting Locations in Thailand"} *</label>
                <textarea required rows={3} className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none resize-none" />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-thai mb-1">{lang === "th" ? "รายละเอียดเพิ่มเติม" : "Additional Details"}</label>
                <textarea rows={4} className="w-full bg-midnight/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:border-pink/50 focus:outline-none resize-none" />
              </div>
            </div>
          </div>

          {/* Section 3: Documents */}
          <div className="bg-navy/40 rounded-xl border border-white/5 p-6">
            <h2 className="font-thai font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-pink/20 text-pink text-xs flex items-center justify-center font-bold">3</span>
              {lang === "th" ? "แนบเอกสาร" : "Attach Documents"}
            </h2>
            <div className="space-y-3">
              {[
                { th: "สำเนาหนังสือจดทะเบียนบริษัท", en: "Company Registration Certificate" },
                { th: "บทภาพยนตร์ (Script/Treatment)", en: "Script/Treatment" },
                { th: "แผนการถ่ายทำ (Production Plan)", en: "Production Plan" },
                { th: "งบประมาณโดยละเอียด (Budget Breakdown)", en: "Detailed Budget Breakdown" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 bg-midnight/40 rounded-lg p-3 border border-dashed border-white/10">
                  <Upload className="w-4 h-4 text-white/30 flex-shrink-0" />
                  <span className="text-white/50 text-sm font-thai flex-1">{lang === "th" ? doc.th : doc.en}</span>
                  <label className="cursor-pointer px-3 py-1 bg-white/5 hover:bg-white/10 text-white/50 text-xs font-thai rounded-lg transition-colors">
                    {lang === "th" ? "เลือกไฟล์" : "Choose file"}
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink to-[#F76532] text-white text-sm font-thai font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <FileText className="w-4 h-4" />
              {lang === "th" ? "ส่งใบสมัคร" : "Submit Application"}
            </button>
            <p className="text-white/30 text-xs font-thai">
              {lang === "th" ? "* จำเป็นต้องกรอก" : "* Required fields"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
