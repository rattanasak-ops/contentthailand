"use client";

import Link from "next/link";
import { Map, BookOpen, Award, Info, FileText } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const sitemapSections = {
  th: [
    {
      title: "ฐานข้อมูล",
      icon: BookOpen,
      color: "text-pink",
      links: [
        { label: "ภาพยนตร์", href: "/films" },
        { label: "ละครโทรทัศน์", href: "/series" },
        { label: "บุคลากร", href: "/persons" },
        { label: "บริษัท", href: "/companies" },
        { label: "คลังข้อมูล", href: "/library" },
      ],
    },
    {
      title: "บริการ",
      icon: Award,
      color: "text-orange",
      links: [
        { label: "ข่าวสารและกิจกรรม", href: "/news" },
        { label: "Film Incentive", href: "/film-incentive" },
        { label: "สถิติอุตสาหกรรม", href: "/statistics" },
        { label: "ค้นหาขั้นสูง", href: "/search" },
        { label: "แผนผังเว็บไซต์", href: "/sitemap" },
      ],
    },
    {
      title: "เกี่ยวกับ",
      icon: Info,
      color: "text-amber",
      links: [
        { label: "เกี่ยวกับเรา", href: "/about" },
        { label: "พันธกิจองค์กร", href: "/about/mission" },
        { label: "หน่วยงานพันธมิตร", href: "/about/partners" },
        { label: "ติดต่อเรา", href: "/contact" },
        { label: "แผนที่ / ที่ตั้ง", href: "/about/location" },
      ],
    },
    {
      title: "นโยบาย",
      icon: FileText,
      color: "text-purple-light",
      links: [
        { label: "นโยบายเว็บไซต์", href: "/policy/website" },
        { label: "นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)", href: "/policy/pdpa" },
        { label: "นโยบายความมั่นคงปลอดภัยเว็บไซต์", href: "/policy/security" },
        { label: "การปฏิเสธความรับผิด", href: "/policy/disclaimer" },
        { label: "นโยบายคุกกี้", href: "/policy/cookies" },
      ],
    },
  ],
  en: [
    {
      title: "Database",
      icon: BookOpen,
      color: "text-pink",
      links: [
        { label: "Films", href: "/films" },
        { label: "TV Series", href: "/series" },
        { label: "Personnel", href: "/persons" },
        { label: "Companies", href: "/companies" },
        { label: "Library", href: "/library" },
      ],
    },
    {
      title: "Services",
      icon: Award,
      color: "text-orange",
      links: [
        { label: "News & Events", href: "/news" },
        { label: "Film Incentive", href: "/film-incentive" },
        { label: "Industry Statistics", href: "/statistics" },
        { label: "Advanced Search", href: "/search" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "About",
      icon: Info,
      color: "text-amber",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Mission", href: "/about/mission" },
        { label: "Partners", href: "/about/partners" },
        { label: "Contact Us", href: "/contact" },
        { label: "Location / Map", href: "/about/location" },
      ],
    },
    {
      title: "Policies",
      icon: FileText,
      color: "text-purple-light",
      links: [
        { label: "Website Policy", href: "/policy/website" },
        { label: "Personal Data Protection (PDPA)", href: "/policy/pdpa" },
        { label: "Website Security Policy", href: "/policy/security" },
        { label: "Disclaimer", href: "/policy/disclaimer" },
        { label: "Cookie Policy", href: "/policy/cookies" },
      ],
    },
  ],
};

export default function SitemapPage() {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "แผนผังเว็บไซต์" : "Sitemap" },
  ];

  const sections = lang === "th" ? sitemapSections.th : sitemapSections.en;

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] ct-tint-cool pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)] flex items-center gap-3">
              <Map className="w-7 h-7 text-amber" />
              {lang === "th" ? "แผนผังเว็บไซต์" : "Sitemap"}
            </h1>
          </FilmStrip>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={`w-5 h-5 ${section.color}`} />
                  <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[var(--ct-text-muted)] hover:text-pink text-sm font-thai transition-colors flex items-center gap-2"
                      >
                        <span className="text-[var(--ct-text-faint)]">-</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
