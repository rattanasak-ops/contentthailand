"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { persons } from "@/lib/mock-data/persons";
import { ChevronRight } from "lucide-react";
import { StaggerChildren, StaggerItem } from "@/components/motion";
import type { Person } from "@/types";

const featured = persons.slice(0, 8);

/* ── PersonCard ─────────────────────────────────────────────── */

interface PersonCardProps {
  person: Person;
  lang: "th" | "en";
}

function PersonCard({ person, lang }: PersonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 3D tilt — perspective 800px, ±8 degrees
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 });

  // Mouse-follow glow (gold)
  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(120px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(246,165,27,0.18), transparent 70%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const roleLabel =
    person.roles[0] === "director"
      ? lang === "th" ? "ผู้กำกับ" : "Director"
      : lang === "th" ? "นักแสดง" : "Actor";

  return (
    <motion.div style={{ perspective: 800 }} className="flex-shrink-0">
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative block text-center p-4 rounded-2xl
            transition-[transform,box-shadow] duration-500 ease-out
            hover:-translate-y-3
            hover:shadow-[0_12px_40px_rgba(246,165,27,0.18),0_20px_60px_rgba(0,0,0,0.25)]"
        >
          {/* Mouse-follow gold glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-2xl"
            style={{ background: glowBackground }}
          />

          {/* Avatar with aurora ring */}
          <Link href={`/persons/${person.slug}`} className="block relative mx-auto mb-3 w-20 h-20 md:w-24 md:h-24">
            {/* Animated aurora ring */}
            <div
              className="absolute -inset-[3px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "conic-gradient(from 0deg, #F6A51B, #EC1C72, #702874, #F6A51B)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full group-hover:animate-aurora-rotate"
                style={{
                  background: "conic-gradient(from 0deg, #F6A51B, #EC1C72, #702874, #F6A51B)",
                }}
              />
            </div>

            {/* Inner mask (dark bg to create ring effect) */}
            <div className="absolute inset-[2px] rounded-full bg-[var(--ct-bg-page)] z-[1]" />

            {/* Avatar image */}
            <div className="absolute inset-[3px] rounded-full overflow-hidden z-[2]">
              {person.photoUrl ? (
                <Image
                  src={person.photoUrl}
                  alt={person.nameEn}
                  fill
                  className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#F6A51B]/20 to-[#702874]/20 flex items-center justify-center">
                  <span className="text-[var(--ct-text-faint)] font-display text-2xl font-bold">
                    {person.nameEn.charAt(0)}
                  </span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          {/* Name with shimmer effect on hover */}
          <Link href={`/persons/${person.slug}`} className="block relative z-[1]">
            <h3 className="text-[var(--ct-text-primary)] text-xs md:text-sm font-thai font-medium leading-tight line-clamp-1
              transition-colors duration-300
              group-hover:bg-gradient-to-r group-hover:from-[#F6A51B] group-hover:via-white group-hover:to-[#F6A51B]
              group-hover:bg-clip-text group-hover:text-transparent
              group-hover:bg-[length:200%_100%]
              group-hover:animate-text-shimmer">
              {lang === "th" ? person.nameTh : person.nameEn}
            </h3>
            <p className="text-[var(--ct-text-faint)] text-[10px] md:text-xs mt-0.5 font-thai capitalize">
              {roleLabel}
            </p>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── FeaturedPersons Section ────────────────────────────────── */

export function FeaturedPersons() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 relative overflow-hidden ct-section-purple ct-tint-gold">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(246,165,27,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--ct-text-primary)] font-thai">
              {lang === "th" ? "บุคลากรเด่น" : "Featured Personnel"}
            </h2>
            <p className="text-[var(--ct-text-faint)] text-sm mt-1 font-thai">
              {lang === "th" ? "ผู้กำกับและนักแสดงชั้นนำของวงการภาพยนตร์ไทย" : "Leading directors and actors in Thai cinema"}
            </p>
          </div>
          <Link href="/persons" className="group flex items-center gap-1 text-[#F6A51B] hover:text-[#F6A51B]/80 text-sm font-thai transition-colors">
            {lang === "th" ? "ดูทั้งหมด" : "View All"}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Person Grid */}
        <StaggerChildren staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-5">
          {featured.map((person) => (
            <StaggerItem key={person.id}>
              <PersonCard person={person} lang={lang} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
