"use client";

import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LocationPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "เกี่ยวกับเรา" : "About", href: "/about" },
    { label: lang === "th" ? "แผนที่ / ที่ตั้ง" : "Location" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="pink" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <Navigation className="w-7 h-7 text-pink" />
              {lang === "th" ? "แผนที่ / ที่ตั้ง" : "Location / Map"}
            </h1>
          </FilmStrip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="aspect-square lg:aspect-auto rounded-xl overflow-hidden border border-[var(--ct-border)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d100.5731!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjciTiAxMDDCsDM0JzIzLjIiRQ!5e0!3m2!1sth!2sth!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={lang === "th" ? "แผนที่กองภาพยนตร์และวีดิทัศน์" : "Office Location Map"}
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-5">
                {lang === "th" ? "กองภาพยนตร์และวีดิทัศน์" : "Bureau of Film & Video"}
              </h2>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-pink flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">
                      {lang === "th" ? "ที่อยู่" : "Address"}
                    </p>
                    <p className="text-[var(--ct-text-muted)] font-body text-sm leading-relaxed">
                      {lang === "th"
                        ? "กองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม กระทรวงวัฒนธรรม\n14 ถนนเทียมร่วมมิตร แขวงห้วยขวาง เขตห้วยขวาง\nกรุงเทพมหานคร 10310"
                        : "Bureau of Film & Video\nDepartment of Cultural Promotion\nMinistry of Culture\n14 Tiam Ruam Mit Rd, Huai Khwang\nBangkok 10310, Thailand"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-amber flex-shrink-0" />
                  <div>
                    <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">
                      {lang === "th" ? "โทรศัพท์" : "Phone"}
                    </p>
                    <p className="text-[var(--ct-text-muted)] font-body text-sm">02-247-0013</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-orange flex-shrink-0" />
                  <div>
                    <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">
                      {lang === "th" ? "อีเมล" : "Email"}
                    </p>
                    <p className="text-[var(--ct-text-muted)] font-body text-sm">info@contentthailand.com</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-purple-light flex-shrink-0" />
                  <div>
                    <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">
                      {lang === "th" ? "เวลาทำการ" : "Office Hours"}
                    </p>
                    <p className="text-[var(--ct-text-muted)] font-body text-sm">
                      {lang === "th" ? "จันทร์ - ศุกร์ 08:30 - 16:30 น." : "Monday - Friday 08:30 - 16:30"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-3">
                {lang === "th" ? "การเดินทาง" : "How to Get Here"}
              </h2>
              <div className="text-[var(--ct-text-secondary)] font-body text-sm leading-relaxed space-y-3">
                <p>
                  <strong className="text-[var(--ct-text-secondary)]">{lang === "th" ? "รถไฟฟ้า MRT:" : "MRT:"}</strong>{" "}
                  {lang === "th"
                    ? "สถานีศูนย์วัฒนธรรมแห่งประเทศไทย (ทางออก 1)"
                    : "Thailand Cultural Centre Station (Exit 1)"}
                </p>
                <p>
                  <strong className="text-[var(--ct-text-secondary)]">{lang === "th" ? "รถประจำทาง:" : "Bus:"}</strong>{" "}
                  {lang === "th" ? "สาย 73, 136, 137, 185, 206" : "Lines 73, 136, 137, 185, 206"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
