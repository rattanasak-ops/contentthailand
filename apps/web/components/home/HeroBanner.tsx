"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { SearchBar } from "@/components/shared/SearchBar";

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export function HeroBanner() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-primary film-grain">
      {/* Film strip scrolling decoration - top */}
      <div className="absolute top-6 left-0 right-0 overflow-hidden opacity-20 z-[2]">
        <div className="flex animate-film-scroll whitespace-nowrap">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={`t${i}`} className="text-white/40 text-lg mx-1">◼</span>
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={`t2${i}`} className="text-white/40 text-lg mx-1">◼</span>
          ))}
        </div>
      </div>

      {/* Film strip scrolling decoration - bottom */}
      <div className="absolute bottom-20 left-0 right-0 overflow-hidden opacity-20 z-[2]">
        <div className="flex whitespace-nowrap" style={{ animation: "filmScroll 20s linear infinite reverse" }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={`b${i}`} className="text-white/40 text-lg mx-1">◼</span>
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={`b2${i}`} className="text-white/40 text-lg mx-1">◼</span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Film Strip Decoration */}
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <FilmStrip color="orange" size="lg">
            <span className="text-white/50 text-sm font-thai tracking-widest uppercase">
              National Film &amp; Video Database
            </span>
          </FilmStrip>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight mb-4"
        >
          CONTENT{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #F76532, #F6A51B)" }}
          >
            THAILAND
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-thai text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
        >
          ฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ
        </motion.p>

        {/* Search Bar */}
        <motion.div variants={fadeUp} className="relative max-w-xl mx-auto">
          <SearchBar variant="hero" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-white/40" />
      </motion.div>
    </section>
  );
}
