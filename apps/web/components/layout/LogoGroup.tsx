"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface LogoGroupProps {
  variant?: "navbar" | "footer" | "hero";
}

export function LogoGroup({ variant = "navbar" }: LogoGroupProps) {
  const { t } = useLanguage();

  const isNavbar = variant === "navbar";
  const isFooter = variant === "footer";
  const isHero = variant === "hero";

  return (
    <div className="flex items-center gap-4 flex-shrink-0">
      {/* === Content Thailand === */}
      <Link href="/" className="group/ct flex items-center gap-2.5">
        {/* Flame icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-pink/0 blur-lg transition-all duration-700 group-hover/ct:bg-pink/25 group-hover/ct:scale-[1.8]" />
          <Image
            src="/logos/content-thailand-icon.svg"
            alt="Content Thailand"
            width={isHero ? 56 : 40}
            height={isHero ? 56 : 40}
            className="relative z-10 transition-all duration-500 group-hover/ct:scale-110 group-hover/ct:-rotate-3 group-hover/ct:drop-shadow-[0_0_14px_rgba(236,28,114,0.5)]"
          />
        </div>

        {/* Brand text — stacked: CONTENT on top, THAILAND below */}
        <div className="flex flex-col leading-none">
          <span
            className={`font-display font-bold tracking-[0.15em] text-[var(--ct-text-primary)] transition-all duration-500 group-hover/ct:text-orange ${
              isHero ? "text-lg" : "text-sm"
            }`}
          >
            CONTENT
          </span>
          <span
            className={`font-display font-bold tracking-[0.15em] text-[#702874] transition-all duration-500 group-hover/ct:text-pink ${
              isHero ? "text-lg" : "text-sm"
            }`}
          >
            THAILAND
          </span>
          {/* Underline sweep */}
          <div className="h-[1.5px] w-0 bg-gradient-to-r from-orange via-pink to-purple transition-all duration-700 ease-out group-hover/ct:w-full mt-0.5" />
          {(isFooter || isHero) && (
            <span className="text-[var(--ct-text-muted)] text-[10px] mt-0.5 transition-colors duration-500 group-hover/ct:text-[var(--ct-text-secondary)]">
              {t(
                "ฐานข้อมูลภาพยนตร์และวีดิทัศน์แห่งชาติ",
                "National Film & Video Database"
              )}
            </span>
          )}
        </div>
      </Link>

      {/* === Divider === */}
      {isNavbar && (
        <div className="hidden sm:block h-10 w-px bg-[var(--ct-border)]" />
      )}

      {/* === Ministry of Culture === */}
      {isNavbar && (
        <Link
          href="https://www.m-culture.go.th"
          target="_blank"
          rel="noopener noreferrer"
          className="group/moc hidden sm:flex items-center gap-2.5 opacity-70 transition-all duration-500 hover:opacity-100"
        >
          {/* Emblem */}
          <Image
            src="/logos/ministry-emblem.svg"
            alt={t("ตราประจำกระทรวงวัฒนธรรม", "Ministry of Culture Emblem")}
            width={32}
            height={36}
            className="transition-transform duration-500 group-hover/moc:scale-110"
          />
          {/* Text - Thai on top, English below */}
          <div className="flex flex-col leading-tight">
            <span className="text-purple-light font-thai text-[13px] font-semibold transition-colors duration-300 group-hover/moc:text-pink">
              กระทรวงวัฒนธรรม
            </span>
            <span className="text-[var(--ct-text-muted)] text-[11px] transition-colors duration-300 group-hover/moc:text-[var(--ct-text-secondary)]">
              Ministry of Culture
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}
