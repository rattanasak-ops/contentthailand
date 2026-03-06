"use client";

import { Shield, Cookie, FileText } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="purple" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
              {lang === "th" ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3">
            {lang === "th" ? "ปรับปรุงล่าสุด: 1 มีนาคม 2569" : "Last updated: March 1, 2026"}
          </p>
        </div>

        <div className="space-y-8">
          {/* PDPA Section */}
          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-pink" />
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg">
                {lang === "th" ? "พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)" : "Personal Data Protection Act (PDPA)"}
              </h2>
            </div>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                ContentThailand ดำเนินการภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) เราให้ความสำคัญกับการปกป้องข้อมูลส่วนบุคคลของผู้ใช้งานทุกท่าน
              </p>
              <p>
                ข้อมูลส่วนบุคคลที่เราเก็บรวบรวมได้แก่ ชื่อ-นามสกุล อีเมล และข้อมูลการใช้งานเว็บไซต์ เราจะใช้ข้อมูลเหล่านี้เพื่อให้บริการและพัฒนาระบบเท่านั้น
              </p>
              <p>
                เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านต่อบุคคลที่สาม เว้นแต่ได้รับความยินยอมจากท่าน หรือเป็นกรณีที่กฎหมายกำหนด
              </p>
            </div>
          </section>

          {/* Cookie Policy */}
          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Cookie className="w-5 h-5 text-amber" />
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg">
                {lang === "th" ? "นโยบายคุกกี้" : "Cookie Policy"}
              </h2>
            </div>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                เว็บไซต์ ContentThailand ใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานของผู้เยี่ยมชม คุกกี้ที่เราใช้แบ่งออกเป็น:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-amber">•</span> <strong className="text-[var(--ct-text-secondary)]">คุกกี้ที่จำเป็น:</strong> เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง เช่น การตั้งค่าภาษา</li>
                <li className="flex gap-2"><span className="text-amber">•</span> <strong className="text-[var(--ct-text-secondary)]">คุกกี้วิเคราะห์:</strong> เพื่อวิเคราะห์การใช้งานเว็บไซต์ เช่น Google Analytics</li>
                <li className="flex gap-2"><span className="text-amber">•</span> <strong className="text-[var(--ct-text-secondary)]">คุกกี้เพื่อการปรับแต่ง:</strong> เพื่อจดจำการตั้งค่าของผู้ใช้งาน</li>
              </ul>
              <p>
                ท่านสามารถปรับเปลี่ยนการตั้งค่าคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของท่านได้ตลอดเวลา
              </p>
            </div>
          </section>

          {/* Data Subject Rights */}
          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-orange" />
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg">
                {lang === "th" ? "สิทธิของเจ้าของข้อมูล" : "Data Subject Rights"}
              </h2>
            </div>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>ท่านมีสิทธิตามกฎหมาย PDPA ดังต่อไปนี้:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-orange">1.</span> สิทธิในการเข้าถึงข้อมูลส่วนบุคคลของท่าน</li>
                <li className="flex gap-2"><span className="text-orange">2.</span> สิทธิในการแก้ไขข้อมูลส่วนบุคคลให้ถูกต้อง</li>
                <li className="flex gap-2"><span className="text-orange">3.</span> สิทธิในการลบข้อมูลส่วนบุคคล</li>
                <li className="flex gap-2"><span className="text-orange">4.</span> สิทธิในการจำกัดการประมวลผลข้อมูล</li>
                <li className="flex gap-2"><span className="text-orange">5.</span> สิทธิในการโอนย้ายข้อมูล</li>
                <li className="flex gap-2"><span className="text-orange">6.</span> สิทธิในการคัดค้านการประมวลผลข้อมูล</li>
                <li className="flex gap-2"><span className="text-orange">7.</span> สิทธิในการถอนความยินยอม</li>
              </ul>
              <p>
                หากท่านต้องการใช้สิทธิตามที่กล่าวข้างต้น กรุณาติดต่อเราที่ dpo@contentthailand.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
