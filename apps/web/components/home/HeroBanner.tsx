"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { SearchBar } from "@/components/shared/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";

const featuredFilms = [
  {
    slug: "bad-genius-2017",
    titleTh: "ฉลาดเกมส์โกง",
    titleEn: "Bad Genius",
    year: 2017,
    poster: "/posters/bad-genius.jpg",
    tagTh: "ภาพยนตร์ไทยที่โด่งดังไกลระดับโลก",
    tagEn: "Thailand's globally acclaimed thriller",
  },
  {
    slug: "how-to-make-millions-2024",
    titleTh: "หลานม่า",
    titleEn: "How to Make Millions Before Grandma Dies",
    year: 2024,
    poster: "/posters/how-to-make-millions.jpg",
    tagTh: "ปรากฏการณ์ภาพยนตร์ไทยแห่งปี",
    tagEn: "The Thai film phenomenon of the year",
  },
  {
    slug: "pee-mak-2013",
    titleTh: "พี่มาก..พระโขนง",
    titleEn: "Pee Mak",
    year: 2013,
    poster: "/posters/pee-mak.jpg",
    tagTh: "ภาพยนตร์ไทยทำรายได้สูงสุดตลอดกาล",
    tagEn: "Thailand's highest-grossing film of all time",
  },
  {
    slug: "ong-bak-2003",
    titleTh: "องค์บาก",
    titleEn: "Ong-Bak",
    year: 2003,
    poster: "/posters/ong-bak.jpg",
    tagTh: "ตำนานศิลปะการต่อสู้ไทยที่โลกต้องจดจำ",
    tagEn: "The legendary Thai martial arts film",
  },
];

// Background poster collage
const bgPosters = [
  "/posters/bad-genius.jpg",
  "/posters/how-to-make-millions.jpg",
  "/posters/pee-mak.jpg",
  "/posters/ong-bak.jpg",
  "/posters/uncle-boonmee.jpg",
  "/posters/uranus2324.jpg",
  "/posters/halabala.jpg",
  "/posters/home-sweet-home.jpg",
  "/posters/red-envelope.jpg",
  "/posters/sokaphiwat.jpg",
  "/posters/my-boo.jpg",
  "/posters/chinatown-chacha.jpg",
];

export function HeroBanner() {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredFilms.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const film = featuredFilms[current];

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-midnight">
      {/* Background poster collage */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-1 opacity-[0.08] z-0">
        {bgPosters.map((src, i) => (
          <div key={i} className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/60 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/80 z-[1]" />

      {/* Featured film backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute right-0 top-0 w-1/2 h-full z-[2] hidden md:block"
        >
          <Image
            src={film.poster}
            alt=""
            fill
            className="object-cover object-top"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/50" />
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#F76532]/20 to-[#F6A51B]/20 border border-[#F76532]/30 rounded-full text-sm font-thai text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#F76532] animate-pulse" />
              National Film &amp; Video Database
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight mb-3"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-thai text-lg md:text-xl text-white/60 mb-8"
          >
            ฐานข้อมูลกลางภาพยนตร์และวีดิทัศน์แห่งชาติ
          </motion.p>

          {/* Featured film info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href={`/films/${film.slug}`}
                className="group flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-[#F76532]/40 transition-all max-w-md"
              >
                <div className="relative w-14 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={film.poster}
                    alt={lang === "th" ? film.titleTh : film.titleEn}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F6A51B] text-xs font-thai mb-1">
                    {lang === "th" ? "ภาพยนตร์แนะนำ" : "Featured Film"}
                  </p>
                  <h3 className="text-white font-thai font-semibold text-sm truncate group-hover:text-[#F76532] transition-colors">
                    {lang === "th" ? film.titleTh : film.titleEn}
                  </h3>
                  <p className="text-white/40 text-xs font-body mt-0.5">
                    {lang === "th" ? film.tagTh : film.tagEn}
                  </p>
                </div>
                <Play className="w-5 h-5 text-white/30 group-hover:text-[#F76532] transition-colors flex-shrink-0" />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="flex gap-2 mb-8">
            {featuredFilms.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-gradient-to-r from-[#F76532] to-[#F6A51B]"
                    : "w-4 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="max-w-xl"
          >
            <SearchBar variant="hero" />
          </motion.div>
        </div>
      </div>

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
