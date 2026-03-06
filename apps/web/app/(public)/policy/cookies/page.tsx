"use client";

import { Cookie, Settings, BarChart3, Shield } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookiePolicyPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "นโยบายคุกกี้" : "Cookie Policy" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <Cookie className="w-7 h-7 text-amber" />
              {lang === "th" ? "นโยบายคุกกี้" : "Cookie Policy"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3">
            {lang === "th" ? "ปรับปรุงล่าสุด: 1 มีนาคม 2569" : "Last updated: March 1, 2026"}
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "คุกกี้คืออะไร?" : "What are Cookies?"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                คุกกี้ (Cookies) คือไฟล์ข้อมูลขนาดเล็กที่ถูกจัดเก็บบนอุปกรณ์ของท่าน (คอมพิวเตอร์ สมาร์ทโฟน แท็บเล็ต) เมื่อท่านเข้าเยี่ยมชมเว็บไซต์ ContentThailand คุกกี้ช่วยให้เว็บไซต์จดจำข้อมูลเกี่ยวกับการเข้าเยี่ยมชมของท่าน ทำให้การเข้าใช้งานครั้งต่อไปง่ายและมีประโยชน์มากขึ้น
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "ประเภทคุกกี้ที่เราใช้" : "Types of Cookies We Use"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-4">
              <div className="bg-[var(--ct-bg-page)] rounded-lg p-4 border border-[var(--ct-border)]">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-pink" />
                  <h3 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm">
                    {lang === "th" ? "คุกกี้ที่จำเป็น (Strictly Necessary)" : "Strictly Necessary Cookies"}
                  </h3>
                </div>
                <p className="text-xs">
                  คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์ เช่น การตั้งค่าภาษา การยอมรับคุกกี้ Session ID ไม่สามารถปิดการใช้งานได้
                </p>
              </div>
              <div className="bg-[var(--ct-bg-page)] rounded-lg p-4 border border-[var(--ct-border)]">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-amber" />
                  <h3 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm">
                    {lang === "th" ? "คุกกี้วิเคราะห์ (Analytics)" : "Analytics Cookies"}
                  </h3>
                </div>
                <p className="text-xs">
                  คุกกี้เพื่อวิเคราะห์การใช้งานเว็บไซต์ เช่น Google Analytics เพื่อเข้าใจพฤติกรรมผู้เข้าชมและปรับปรุงการให้บริการ
                </p>
              </div>
              <div className="bg-[var(--ct-bg-page)] rounded-lg p-4 border border-[var(--ct-border)]">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-4 h-4 text-orange" />
                  <h3 className="font-thai font-semibold text-[var(--ct-text-primary)] text-sm">
                    {lang === "th" ? "คุกกี้เพื่อการปรับแต่ง (Functional)" : "Functional Cookies"}
                  </h3>
                </div>
                <p className="text-xs">
                  คุกกี้เพื่อจดจำการตั้งค่าของผู้ใช้งาน เช่น ขนาดตัวอักษร ระดับความคมชัด การตั้งค่าการเข้าถึง (Accessibility)
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "การจัดการคุกกี้" : "Managing Cookies"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                ท่านสามารถปรับเปลี่ยนการตั้งค่าคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของท่านได้ตลอดเวลา ทั้งนี้ หากท่านปิดการใช้งานคุกกี้บางประเภท อาจส่งผลต่อประสบการณ์การใช้งานเว็บไซต์
              </p>
              <p>
                นอกจากนี้ ท่านสามารถตั้งค่าคุกกี้ผ่าน Cookie Consent Banner ที่แสดงเมื่อเข้าเยี่ยมชมเว็บไซต์ครั้งแรก
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
