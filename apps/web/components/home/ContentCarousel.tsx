"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { cn } from "@/lib/utils";

interface ContentCarouselProps {
  titleTh: string;
  titleEn: string;
  color?: "pink" | "orange";
  lang: string;
  children: React.ReactNode;
  viewAllHref?: string;
}

const colorMap = {
  pink: {
    accent: "#EC1C72",
    glowColor: "rgba(236,28,114,0.08)",
  },
  orange: {
    accent: "#F76532",
    glowColor: "rgba(247,101,50,0.08)",
  },
};

export function ContentCarousel({
  titleTh,
  titleEn,
  color = "pink",
  lang,
  children,
  viewAllHref,
}: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Smooth spotlight glow that follows the mouse across the carousel
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 80, damping: 25 });
  const mouseY = useSpring(rawMouseY, { stiffness: 80, damping: 25 });

  const { accent, glowColor } = colorMap[color];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      rawMouseX.set(e.clientX - rect.left);
      rawMouseY.set(e.clientY - rect.top);
    },
    [rawMouseX, rawMouseY]
  );

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    setScrollProgress(
      scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

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
          <h2 className="font-thai font-bold text-xl md:text-2xl text-[var(--ct-text-primary)]">
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
            disabled={!canScrollLeft}
            className={cn(
              "p-2 rounded-full border transition-all duration-300",
              canScrollLeft
                ? "bg-[var(--ct-bg-hover)] border-[var(--ct-border)] text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] hover:border-[var(--ct-text-faint)]"
                : "bg-transparent border-transparent text-[var(--ct-text-faint)]/30 cursor-default"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "p-2 rounded-full border transition-all duration-300",
              canScrollRight
                ? "bg-[var(--ct-bg-hover)] border-[var(--ct-border)] text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] hover:border-[var(--ct-text-faint)]"
                : "bg-transparent border-transparent text-[var(--ct-text-faint)]/30 cursor-default"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable row with ambient spotlight */}
      <div
        ref={containerRef}
        className="relative group/carousel"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Ambient spotlight glow — follows mouse smoothly across cards */}
        <motion.div
          className="absolute z-20 pointer-events-none rounded-full mix-blend-screen"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
            width: 500,
            height: 500,
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Left fade */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-2 w-12 z-10 pointer-events-none transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "linear-gradient(to right, var(--ct-bg-page), transparent)",
          }}
        />

        {/* Right fade */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-2 w-12 z-10 pointer-events-none transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "linear-gradient(to left, var(--ct-bg-page), transparent)",
          }}
        />

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="mt-4 mx-auto max-w-[120px] h-[2px] rounded-full bg-[var(--ct-border)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accent }}
          animate={{ width: `${Math.max(20, scrollProgress * 100)}%` }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
