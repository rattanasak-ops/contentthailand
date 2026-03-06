"use client";

import { AlertTriangle } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DisclaimerPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "การปฏิเสธความรับผิด" : "Disclaimer" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-amber" />
              {lang === "th" ? "การปฏิเสธความรับผิด" : "Disclaimer"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3">
            {lang === "th" ? "ปรับปรุงล่าสุด: 1 มีนาคม 2569" : "Last updated: March 1, 2026"}
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "ข้อจำกัดความรับผิดชอบ" : "Limitation of Liability"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                ข้อมูลที่นำเสนอบนเว็บไซต์ ContentThailand จัดทำขึ้นเพื่อวัตถุประสงค์ในการให้ข้อมูลทั่วไปเท่านั้น กระทรวงวัฒนธรรมพยายามอย่างเต็มที่ในการรักษาความถูกต้องและความเป็นปัจจุบันของข้อมูล อย่างไรก็ตาม กระทรวงวัฒนธรรมไม่รับประกันหรือรับรองความถูกต้อง ความครบถ้วน หรือความเป็นปัจจุบันของข้อมูลดังกล่าว
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "การใช้ข้อมูล" : "Use of Information"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                การใช้ข้อมูลจากเว็บไซต์นี้เป็นความรับผิดชอบของผู้ใช้งานเอง กระทรวงวัฒนธรรมจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้หรือการไม่สามารถใช้ข้อมูลจากเว็บไซต์นี้ ไม่ว่าจะเป็นความเสียหายโดยตรง ความเสียหายโดยอ้อม ความเสียหายพิเศษ หรือความเสียหายที่เป็นผลสืบเนื่อง
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "ลิงก์ภายนอก" : "External Links"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                เว็บไซต์นี้อาจมีลิงก์ไปยังเว็บไซต์ภายนอกที่ดำเนินการโดยบุคคลที่สาม กระทรวงวัฒนธรรมไม่มีอำนาจควบคุมเนื้อหาของเว็บไซต์เหล่านั้น และจะไม่รับผิดชอบต่อเนื้อหา นโยบายความเป็นส่วนตัว หรือแนวปฏิบัติของเว็บไซต์เหล่านั้น
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "การเปลี่ยนแปลงข้อมูล" : "Changes to Information"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                กระทรวงวัฒนธรรมสงวนสิทธิ์ในการเปลี่ยนแปลง แก้ไข หรือลบเนื้อหาบนเว็บไซต์ได้ตลอดเวลาโดยไม่ต้องแจ้งให้ทราบล่วงหน้า ท่านควรตรวจสอบข้อมูลอย่างสม่ำเสมอเพื่อให้ได้ข้อมูลที่เป็นปัจจุบัน
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
