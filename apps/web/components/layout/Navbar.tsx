"use client";

import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/shared/SearchBar";
import { LogoGroup } from "./LogoGroup";

interface SubItem {
  href: string;
  labelTh: string;
  labelEn: string;
}

interface NavItem {
  href: string;
  labelTh: string;
  labelEn: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  {
    href: "/films", labelTh: "ภาพยนตร์", labelEn: "Films",
    children: [
      { href: "/films", labelTh: "ภาพยนตร์ทั้งหมด", labelEn: "All Films" },
      { href: "/films?filter=genre", labelTh: "แยกตามประเภท", labelEn: "By Genre" },
      { href: "/films?filter=year", labelTh: "แยกตามปี", labelEn: "By Year" },
      { href: "/films?filter=awards", labelTh: "ภาพยนตร์รางวัล", labelEn: "Award Winners" },
    ],
  },
  {
    href: "/series", labelTh: "ละครโทรทัศน์", labelEn: "TV Series",
    children: [
      { href: "/series", labelTh: "ละครทั้งหมด", labelEn: "All Series" },
      { href: "/series?filter=onair", labelTh: "กำลังออกอากาศ", labelEn: "On Air" },
      { href: "/series?filter=platform", labelTh: "แยกตาม Platform", labelEn: "By Platform" },
    ],
  },
  {
    href: "/persons", labelTh: "บุคลากร", labelEn: "Personnel",
    children: [
      { href: "/persons", labelTh: "บุคลากรทั้งหมด", labelEn: "All Personnel" },
      { href: "/persons?role=director", labelTh: "ผู้กำกับ", labelEn: "Directors" },
      { href: "/persons?role=actor", labelTh: "นักแสดง", labelEn: "Actors" },
      { href: "/persons?role=crew", labelTh: "ทีมงาน", labelEn: "Crew" },
    ],
  },
  {
    href: "/companies", labelTh: "บริษัท", labelEn: "Companies",
    children: [
      { href: "/companies", labelTh: "บริษัททั้งหมด", labelEn: "All Companies" },
      { href: "/companies?type=production", labelTh: "บริษัทผลิต", labelEn: "Production" },
      { href: "/companies?type=post-production", labelTh: "Post Production", labelEn: "Post Production" },
      { href: "/companies?type=distribution", labelTh: "จัดจำหน่าย", labelEn: "Distribution" },
    ],
  },
  {
    href: "/library", labelTh: "คลังข้อมูล", labelEn: "Library",
    children: [
      { href: "/library", labelTh: "คลังข้อมูลทั้งหมด", labelEn: "All Resources" },
      { href: "/library?type=research", labelTh: "งานวิจัยและรายงาน", labelEn: "Research & Reports" },
      { href: "/library?type=statistics", labelTh: "สถิติอุตสาหกรรม", labelEn: "Industry Statistics" },
      { href: "/statistics", labelTh: "Dashboard สถิติ", labelEn: "Statistics Dashboard" },
    ],
  },
  {
    href: "/news", labelTh: "ข่าวสาร", labelEn: "News",
    children: [
      { href: "/news", labelTh: "ข่าวสารทั้งหมด", labelEn: "All News" },
      { href: "/news?type=activity", labelTh: "กิจกรรม", labelEn: "Activities" },
      { href: "/news?type=event", labelTh: "อีเว้นท์", labelEn: "Events" },
    ],
  },
  {
    href: "/apply", labelTh: "สมัครมาตรการ", labelEn: "Apply",
    children: [
      { href: "/apply", labelTh: "ภาพรวมมาตรการ", labelEn: "Overview" },
      { href: "/apply/film-incentive", labelTh: "มาตรการถ่ายทำในไทย", labelEn: "Film Incentive" },
      { href: "/apply/digital-content", labelTh: "Digital Content", labelEn: "Digital Content" },
      { href: "/film-incentive", labelTh: "รายละเอียดสิทธิประโยชน์", labelEn: "Benefits Detail" },
    ],
  },
  {
    href: "/about", labelTh: "เกี่ยวกับเรา", labelEn: "About",
    children: [
      { href: "/about", labelTh: "เกี่ยวกับเรา", labelEn: "About Us" },
      { href: "/about/mission", labelTh: "พันธกิจ วิสัยทัศน์", labelEn: "Mission & Vision" },
      { href: "/about/partners", labelTh: "หน่วยงานพันธมิตร", labelEn: "Partners" },
      { href: "/contact", labelTh: "ติดต่อเรา", labelEn: "Contact Us" },
      { href: "/about/location", labelTh: "แผนที่ / ที่ตั้ง", labelEn: "Location" },
    ],
  },
];

function DropdownMenu({ item, lang }: { item: NavItem; lang: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="relative px-2.5 py-2 text-[13px] text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] rounded-lg transition-colors font-thai group whitespace-nowrap"
      >
        {lang === "th" ? item.labelTh : item.labelEn}
        <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-gradient-to-r from-[#EC1C72] to-[#F76532] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-0.5 px-2.5 py-2 text-[13px] text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] rounded-lg transition-colors font-thai group whitespace-nowrap"
      >
        {lang === "th" ? item.labelTh : item.labelEn}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", open && "rotate-180")} />
        <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-gradient-to-r from-[#EC1C72] to-[#F76532] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 min-w-[200px] backdrop-blur-xl border rounded-lg py-1 z-50 bg-[var(--ct-dropdown-bg)] border-[var(--ct-border)]"
            style={{ boxShadow: "var(--ct-shadow)" }}
          >
            {item.children.map((child) => (
              <Link
                key={child.href + child.labelTh}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] hover:bg-[var(--ct-bg-hover)] transition-colors font-thai"
              >
                {lang === "th" ? child.labelTh : child.labelEn}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const { lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl border-b bg-[var(--ct-nav-bg)] border-[var(--ct-border)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Gradient bottom border on scroll */}
      <div
        className={cn("absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500", scrolled ? "opacity-100" : "opacity-0")}
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(236,28,114,0.2) 20%, rgba(247,101,50,0.3) 50%, rgba(246,165,27,0.2) 80%, transparent 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <LogoGroup variant="navbar" />

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0">
            {navItems.map((item) => (
              <DropdownMenu key={item.href + item.labelTh} item={item} lang={lang} />
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                searchOpen ? "text-[#EC1C72] bg-[#EC1C72]/10" : "text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] hover:bg-[var(--ct-bg-hover)]"
              )}
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Language toggle with sliding pill */}
            <div className="relative flex items-center bg-[var(--ct-bg-hover)] border border-[var(--ct-border)] rounded-full p-0.5">
              <motion.div
                className="absolute top-0.5 bottom-0.5 rounded-full bg-[#EC1C72]"
                style={{ width: "calc(50% - 2px)" }}
                animate={{ x: lang === "th" ? 2 : "calc(100% + 2px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <button
                onClick={() => setLang("th")}
                className={cn("relative z-10 px-3.5 py-1 text-xs font-bold rounded-full transition-colors duration-200", lang === "th" ? "text-white" : "text-[var(--ct-text-faint)] hover:text-[var(--ct-text-muted)]")}
              >TH</button>
              <button
                onClick={() => setLang("en")}
                className={cn("relative z-10 px-3.5 py-1 text-xs font-bold rounded-full transition-colors duration-200", lang === "en" ? "text-white" : "text-[var(--ct-text-faint)] hover:text-[var(--ct-text-muted)]")}
              >EN</button>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden p-2 text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] rounded-lg">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pb-4 border-t border-[var(--ct-border)] mt-2 pt-3">
                <SearchBar variant="navbar" onClose={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Nav with stagger */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden overflow-hidden"
            >
              <div className="pb-4 border-t border-[var(--ct-border)] mt-2 pt-2 max-h-[70vh] overflow-y-auto">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href + item.labelTh}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] hover:bg-[var(--ct-bg-hover)] rounded-lg font-thai transition-colors"
                        >
                          {lang === "th" ? item.labelTh : item.labelEn}
                          <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", mobileExpanded === item.href && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.href && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href + child.labelTh}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block px-3 py-2 text-sm text-[var(--ct-text-faint)] hover:text-[var(--ct-text-primary)] hover:bg-[var(--ct-bg-hover)] rounded-lg font-thai transition-colors"
                                >
                                  {lang === "th" ? child.labelTh : child.labelEn}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2.5 text-sm text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] hover:bg-[var(--ct-bg-hover)] rounded-lg font-thai transition-colors"
                      >
                        {lang === "th" ? item.labelTh : item.labelEn}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
