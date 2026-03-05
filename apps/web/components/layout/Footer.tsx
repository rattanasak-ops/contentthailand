"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { FilmStrip } from "./FilmStrip";
import { LogoGroup } from "./LogoGroup";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-midnight border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <LogoGroup variant="footer" />
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed">
              {t(
                "กองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม กระทรวงวัฒนธรรม",
                "Bureau of Film & Video, Department of Cultural Promotion, Ministry of Culture"
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-thai font-semibold mb-3 text-sm">
              {t("เมนูหลัก", "Main Menu")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/films", label: t("ภาพยนตร์", "Films") },
                { href: "/series", label: t("ละครโทรทัศน์", "TV Series") },
                { href: "/persons", label: t("บุคลากร", "Personnel") },
                { href: "/companies", label: t("บริษัท", "Companies") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/40 hover:text-pink text-sm transition-colors font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-thai font-semibold mb-3 text-sm">
              {t("ข้อมูลเพิ่มเติม", "Resources")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/news", label: t("ข่าวสาร", "News") },
                { href: "/library", label: t("คลังข้อมูล", "Library") },
                { href: "/about", label: t("เกี่ยวกับเรา", "About") },
                { href: "/contact", label: t("ติดต่อเรา", "Contact") },
                { href: "/privacy", label: t("นโยบายความเป็นส่วนตัว", "Privacy Policy") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/40 hover:text-pink text-sm transition-colors font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-thai font-semibold mb-3 text-sm">
              {t("ติดต่อ", "Contact")}
            </h3>
            <div className="space-y-2 text-white/40 text-sm font-body">
              <p>{t("กองภาพยนตร์และวีดิทัศน์", "Bureau of Film & Video")}</p>
              <p>{t("กรมส่งเสริมวัฒนธรรม", "Dept. of Cultural Promotion")}</p>
              <p>{t("กระทรวงวัฒนธรรม", "Ministry of Culture")}</p>
              <p className="text-pink">contentthailand.com</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <FilmStrip color="muted" size="sm">
            <p className="text-white/30 text-xs font-body">
              © {new Date().getFullYear()} ContentThailand.{" "}
              {t("สงวนลิขสิทธิ์", "All rights reserved.")}
            </p>
          </FilmStrip>
        </div>
      </div>
    </footer>
  );
}
