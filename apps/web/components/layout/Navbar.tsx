"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/shared/SearchBar";

const navItems = [
  { href: "/", labelTh: "หน้าหลัก", labelEn: "Home" },
  { href: "/films", labelTh: "ภาพยนตร์", labelEn: "Films" },
  { href: "/series", labelTh: "ละครโทรทัศน์", labelEn: "TV Series" },
  { href: "/persons", labelTh: "บุคลากร", labelEn: "Personnel" },
  { href: "/companies", labelTh: "บริษัท", labelEn: "Companies" },
  { href: "/news", labelTh: "ข่าวสาร", labelEn: "News" },
  { href: "/library", labelTh: "คลังข้อมูล", labelEn: "Library" },
];

export function Navbar() {
  const { lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-midnight/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange to-pink flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-display text-lg text-white tracking-wide hidden sm:block">
              CONTENT <span className="text-pink">THAILAND</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-thai"
              >
                {lang === "th" ? item.labelTh : item.labelEn}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Language toggle */}
            <div className="flex items-center bg-navy rounded-full p-0.5">
              <button
                onClick={() => setLang("th")}
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded-full transition-all",
                  lang === "th"
                    ? "bg-pink text-white"
                    : "text-white/50 hover:text-white"
                )}
              >
                TH
              </button>
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded-full transition-all",
                  lang === "en"
                    ? "bg-pink text-white"
                    : "text-white/50 hover:text-white"
                )}
              >
                EN
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white rounded-lg"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className="pb-4 border-t border-white/5 mt-2 pt-3">
            <SearchBar variant="navbar" onClose={() => setSearchOpen(false)} />
          </div>
        )}

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-white/5 mt-2 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg font-thai"
              >
                {lang === "th" ? item.labelTh : item.labelEn}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
