"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Section {
  id: string;
  labelTh: string;
  labelEn: string;
}

const SECTIONS: Section[] = [
  { id: "hero", labelTh: "หน้าแรก", labelEn: "Home" },
  { id: "stats", labelTh: "สถิติ", labelEn: "Stats" },
  { id: "latest-films", labelTh: "ภาพยนตร์ล่าสุด", labelEn: "Latest Films" },
  { id: "popular-films", labelTh: "ยอดนิยม", labelEn: "Popular" },
  { id: "series", labelTh: "ละคร", labelEn: "Series" },
  { id: "dashboard", labelTh: "Dashboard", labelEn: "Dashboard" },
  { id: "persons", labelTh: "บุคลากร", labelEn: "Persons" },
  { id: "companies", labelTh: "บริษัท", labelEn: "Companies" },
  { id: "news", labelTh: "ข่าวสาร", labelEn: "News" },
  { id: "cta", labelTh: "สมัคร", labelEn: "Apply" },
];

export function PageNavigator() {
  const { lang } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.3, rootMargin: "-10% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Show navigator only after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-1"
          aria-label="Page navigation"
        >
          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300 mb-2"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

          {/* Section dots */}
          <div className="flex flex-col items-center gap-0.5 py-2 px-1.5 bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-full">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <div key={section.id} className="relative">
                  <button
                    onClick={() => scrollTo(section.id)}
                    onMouseEnter={() => setHoveredDot(section.id)}
                    onMouseLeave={() => setHoveredDot(null)}
                    className="relative w-7 h-7 flex items-center justify-center group"
                    aria-label={lang === "th" ? section.labelTh : section.labelEn}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-2.5 h-2.5 bg-[#EC1C72] shadow-[0_0_8px_rgba(236,28,114,0.5)]"
                          : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50 group-hover:w-2 group-hover:h-2"
                      }`}
                    />
                  </button>

                  {/* Tooltip on hover */}
                  <AnimatePresence>
                    {hoveredDot === section.id && (
                      <motion.div
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2.5 py-1 bg-[#1C1B4E]/95 backdrop-blur-sm border border-white/10 rounded-md whitespace-nowrap"
                      >
                        <span className="text-white/80 text-[11px] font-thai">
                          {lang === "th" ? section.labelTh : section.labelEn}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Scroll to bottom */}
          <button
            onClick={scrollToBottom}
            className="w-8 h-8 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300 mt-2"
            aria-label="Scroll to bottom"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
