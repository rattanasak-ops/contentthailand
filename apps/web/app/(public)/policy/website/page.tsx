"use client";

import { Globe } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WebsitePolicyPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "นโยบายเว็บไซต์" : "Website Policy" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="purple" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <Globe className="w-7 h-7 text-purple-light" />
              {lang === "th" ? "นโยบายเว็บไซต์" : "Website Policy"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3">
            {lang === "th" ? "ปรับปรุงล่าสุด: 1 มีนาคม 2569" : "Last updated: March 1, 2026"}
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "วัตถุประสงค์" : "Purpose"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                เว็บไซต์ ContentThailand (https://contentthailand.com) เป็นเว็บไซต์ของกองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม กระทรวงวัฒนธรรม จัดทำขึ้นเพื่อเป็นฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ ให้บริการแก่ประชาชน ผู้ประกอบการ นักวิจัย และผู้สนใจทั่วไป
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "ข้อกำหนดการใช้งาน" : "Terms of Use"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>การเข้าใช้งานเว็บไซต์นี้ ถือว่าท่านยอมรับข้อกำหนดและเงื่อนไขการใช้งาน ดังนี้:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-purple-light">1.</span> ข้อมูลที่นำเสนอบนเว็บไซต์จัดทำขึ้นเพื่อวัตถุประสงค์ในการให้ข้อมูลเท่านั้น</li>
                <li className="flex gap-2"><span className="text-purple-light">2.</span> ห้ามทำซ้ำ ดัดแปลง หรือเผยแพร่เนื้อหาจากเว็บไซต์นี้เพื่อวัตถุประสงค์ทางการค้า โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร</li>
                <li className="flex gap-2"><span className="text-purple-light">3.</span> การอ้างอิงข้อมูลจากเว็บไซต์นี้ ต้องระบุแหล่งที่มาอย่างชัดเจน</li>
                <li className="flex gap-2"><span className="text-purple-light">4.</span> กระทรวงวัฒนธรรมสงวนสิทธิ์ในการเปลี่ยนแปลง แก้ไข หรือลบเนื้อหาบนเว็บไซต์ได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า</li>
              </ul>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "ทรัพย์สินทางปัญญา" : "Intellectual Property"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                เนื้อหา ข้อมูล รูปภาพ กราฟิก และส่วนประกอบอื่นๆ ที่ปรากฏบนเว็บไซต์นี้ เป็นทรัพย์สินทางปัญญาของกระทรวงวัฒนธรรม ได้รับความคุ้มครองตามกฎหมายลิขสิทธิ์ของประเทศไทย
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "การเชื่อมต่อกับเว็บไซต์ภายนอก" : "External Links"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                เว็บไซต์นี้อาจมีการเชื่อมต่อไปยังเว็บไซต์ภายนอก ซึ่งกระทรวงวัฒนธรรมไม่มีส่วนรับผิดชอบต่อเนื้อหา นโยบาย หรือการดำเนินการของเว็บไซต์เหล่านั้น
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
