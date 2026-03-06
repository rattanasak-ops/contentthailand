"use client";

import { ShieldCheck, Lock, Server, Eye } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SecurityPolicyPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "นโยบายความมั่นคงปลอดภัย" : "Security Policy" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-orange" />
              {lang === "th" ? "นโยบายความมั่นคงปลอดภัยเว็บไซต์" : "Website Security Policy"}
            </h1>
          </FilmStrip>
          <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3">
            {lang === "th" ? "ปรับปรุงล่าสุด: 1 มีนาคม 2569" : "Last updated: March 1, 2026"}
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-orange" />
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg">
                {lang === "th" ? "การเข้ารหัสข้อมูล" : "Data Encryption"}
              </h2>
            </div>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                เว็บไซต์ ContentThailand ใช้มาตรฐาน SSL/TLS (Secure Socket Layer / Transport Layer Security) ในการเข้ารหัสข้อมูลระหว่างการรับส่งข้อมูลผ่านเครือข่ายอินเทอร์เน็ต เพื่อป้องกันการดักจับข้อมูลจากบุคคลที่สาม
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-amber" />
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg">
                {lang === "th" ? "ระบบป้องกันการบุกรุก" : "Intrusion Prevention"}
              </h2>
            </div>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>เรามีมาตรการรักษาความปลอดภัย ดังนี้:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-amber">-</span> ระบบ Firewall สำหรับป้องกันการบุกรุกเครือข่าย</li>
                <li className="flex gap-2"><span className="text-amber">-</span> ระบบตรวจจับและป้องกันการโจมตี (IDS/IPS)</li>
                <li className="flex gap-2"><span className="text-amber">-</span> ระบบป้องกันไวรัสและมัลแวร์</li>
                <li className="flex gap-2"><span className="text-amber">-</span> ระบบสำรองข้อมูล (Backup) เป็นประจำ</li>
                <li className="flex gap-2"><span className="text-amber">-</span> การตรวจสอบช่องโหว่ด้านความปลอดภัย (Vulnerability Assessment) อย่างสม่ำเสมอ</li>
              </ul>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-pink" />
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg">
                {lang === "th" ? "การเก็บข้อมูลจราจร (Log File)" : "Traffic Log"}
              </h2>
            </div>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                เว็บไซต์มีการเก็บข้อมูลจราจรทางคอมพิวเตอร์ (Log File) ตามพระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550 และที่แก้ไขเพิ่มเติม โดยเก็บรักษาไว้ไม่น้อยกว่า 90 วัน
              </p>
            </div>
          </section>

          <section className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-4">
              {lang === "th" ? "การแจ้งเหตุละเมิดความปลอดภัย" : "Security Breach Notification"}
            </h2>
            <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
              <p>
                หากท่านพบเหตุการณ์ที่อาจเป็นการละเมิดความปลอดภัยของเว็บไซต์ กรุณาแจ้งให้เราทราบทันทีที่ security@contentthailand.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
