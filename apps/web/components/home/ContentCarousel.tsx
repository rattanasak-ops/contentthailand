"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";

interface ContentCarouselProps {
  titleTh: string;
  titleEn: string;
  color?: "pink" | "orange";
  lang: string;
  children: React.ReactNode;
  viewAllHref?: string;
}

export function ContentCarousel({
  titleTh,
  titleEn,
  color = "pink",
  lang,
  children,
  viewAllHref,
}: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <FilmStrip color={color} size="md">
          <h2 className="font-thai font-bold text-xl md:text-2xl text-white">
            {lang === "th" ? titleTh : titleEn}
          </h2>
        </FilmStrip>

        <div className="flex items-center gap-2">
          {viewAllHref && (
            <a
              href={viewAllHref}
              className={`text-sm font-thai ${color === "pink" ? "text-pink" : "text-orange"} hover:underline hidden sm:block`}
            >
              {lang === "th" ? "ดูทั้งหมด →" : "View all →"}
            </a>
          )}
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
}
