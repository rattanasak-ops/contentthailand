"use client";

import { Shield } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PdpaPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "นโยบายคุ้มครองข้อมูลส่วนบุคคล" : "Personal Data Protection" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="pink" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <Shield className="w-7 h-7 text-pink" />
              {lang === "th" ? "นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)" : "Personal Data Protection Policy (PDPA)"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3">
            {lang === "th" ? "ปรับปรุงล่าสุด: 1 มีนาคม 2569" : "Last updated: March 1, 2026"}
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "หลักการ" : "Principles"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                ContentThailand ดำเนินการภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) เราให้ความสำคัญกับการปกป้องข้อมูลส่วนบุคคลของผู้ใช้งานทุกท่าน
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "ข้อมูลส่วนบุคคลที่เก็บรวบรวม" : "Personal Data Collected"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>ข้อมูลส่วนบุคคลที่เราอาจเก็บรวบรวม ได้แก่:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-pink">-</span> ชื่อ-นามสกุล อีเมล หมายเลขโทรศัพท์ (กรณีกรอกแบบฟอร์มติดต่อหรือสมัครมาตรการ)</li>
                <li className="flex gap-2"><span className="text-pink">-</span> ข้อมูลการใช้งานเว็บไซต์ เช่น IP Address, ข้อมูล Cookie, พฤติกรรมการเข้าชม</li>
                <li className="flex gap-2"><span className="text-pink">-</span> ข้อมูลอุปกรณ์และเบราว์เซอร์ที่ใช้</li>
              </ul>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "วัตถุประสงค์ในการใช้ข้อมูล" : "Purpose of Data Usage"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-pink">1.</span> เพื่อให้บริการและพัฒนาระบบเว็บไซต์</li>
                <li className="flex gap-2"><span className="text-pink">2.</span> เพื่อตอบคำถามและให้ความช่วยเหลือผู้ใช้งาน</li>
                <li className="flex gap-2"><span className="text-pink">3.</span> เพื่อวิเคราะห์และปรับปรุงประสบการณ์การใช้งาน</li>
                <li className="flex gap-2"><span className="text-pink">4.</span> เพื่อปฏิบัติตามกฎหมายที่เกี่ยวข้อง</li>
              </ul>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "สิทธิของเจ้าของข้อมูล" : "Data Subject Rights"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>ท่านมีสิทธิตามกฎหมาย PDPA ดังต่อไปนี้:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-pink">1.</span> สิทธิในการเข้าถึงข้อมูลส่วนบุคคลของท่าน</li>
                <li className="flex gap-2"><span className="text-pink">2.</span> สิทธิในการแก้ไขข้อมูลให้ถูกต้อง</li>
                <li className="flex gap-2"><span className="text-pink">3.</span> สิทธิในการลบข้อมูลส่วนบุคคล</li>
                <li className="flex gap-2"><span className="text-pink">4.</span> สิทธิในการจำกัดการประมวลผล</li>
                <li className="flex gap-2"><span className="text-pink">5.</span> สิทธิในการโอนย้ายข้อมูล</li>
                <li className="flex gap-2"><span className="text-pink">6.</span> สิทธิในการคัดค้านการประมวลผล</li>
                <li className="flex gap-2"><span className="text-pink">7.</span> สิทธิในการถอนความยินยอม</li>
              </ul>
              <p>หากต้องการใช้สิทธิ กรุณาติดต่อ: dpo@contentthailand.com</p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "การเปิดเผยข้อมูลต่อบุคคลที่สาม" : "Third-Party Disclosure"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านต่อบุคคลที่สาม เว้นแต่ได้รับความยินยอมจากท่าน หรือเป็นกรณีที่กฎหมายกำหนด หรือเป็นการปฏิบัติตามคำสั่งศาลหรือหน่วยงานของรัฐที่มีอำนาจ
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
