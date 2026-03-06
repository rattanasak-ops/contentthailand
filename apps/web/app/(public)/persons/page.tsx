"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientDivider } from "@/components/motion/gradient-divider";
import { ViewModeToggle, useViewMode } from "@/components/shared/ViewModeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { persons } from "@/lib/mock-data/persons";

type RoleFilter = "all" | "director" | "actor" | "producer";

const roleLabels: Record<string, { th: string; en: string }> = {
  director: { th: "ผู้กำกับ", en: "Director" },
  actor: { th: "นักแสดง", en: "Actor" },
  producer: { th: "โปรดิวเซอร์", en: "Producer" },
};

export default function PersonsPage() {
  const { lang } = useLanguage();
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [viewMode, setViewMode] = useViewMode("persons", "grid");

  const filtered = useMemo(() => {
    if (roleFilter === "all") return persons;
    return persons.filter((p) => p.roles.includes(roleFilter));
  }, [roleFilter]);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "บุคลากร" : "Personnel" },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <ScrollReveal direction="up">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <FilmStrip color="pink" size="lg">
                <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
                  {lang === "th" ? "บุคลากรในวงการภาพยนตร์" : "Film Industry Personnel"}
                </h1>
              </FilmStrip>
              <p className="text-[var(--ct-text-muted)] text-sm font-thai mt-3 ml-1">
                {filtered.length} {lang === "th" ? "คน" : "people"}
              </p>
            </div>
            <ViewModeToggle value={viewMode} onChange={setViewMode} />
          </div>
        </ScrollReveal>

        {/* Role filter */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {([["all", "ทั้งหมด", "All"], ["director", "ผู้กำกับ", "Directors"], ["actor", "นักแสดง", "Actors"], ["producer", "โปรดิวเซอร์", "Producers"]] as const).map(([key, th, en]) => (
              <button
                key={key}
                onClick={() => setRoleFilter(key)}
                className={`relative px-4 py-2 rounded-xl text-sm font-thai transition-all duration-300 ${
                  roleFilter === key
                    ? "bg-[#F6A51B]/15 text-[#F6A51B] border border-[#F6A51B]/20 shadow-[0_0_15px_rgba(246,165,27,0.1)]"
                    : "text-[var(--ct-text-muted)] hover:text-[var(--ct-text-secondary)] hover:bg-[var(--ct-bg-hover)] border border-transparent"
                }`}
              >
                {lang === "th" ? th : en}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <GradientDivider variant="amber" className="mb-8" />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${roleFilter}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === "grid" ? (
              <StaggerChildren staggerDelay={0.03} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
                {filtered.map((p) => (
                  <StaggerItem key={p.id}><PersonCardGrid p={p} lang={lang} /></StaggerItem>
                ))}
              </StaggerChildren>
            ) : viewMode === "poster" ? (
              <StaggerChildren staggerDelay={0.03} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {filtered.map((p) => (
                  <StaggerItem key={p.id}><PersonCardPoster p={p} lang={lang} /></StaggerItem>
                ))}
              </StaggerChildren>
            ) : (
              <div className="rounded-xl overflow-hidden border border-[var(--ct-border)]">
                {filtered.map((p, i) => (
                  <PersonListItem key={p.id} p={p} lang={lang} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PersonCardGrid({ p, lang }: { p: (typeof persons)[0]; lang: string }) {
  const name = lang === "th" ? p.nameTh : p.nameEn;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(200px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(246,165,27,0.08), transparent 70%)`
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

  return (
    <Link
      ref={cardRef}
      href={`/persons/${p.slug}`}
      onMouseMove={handleMouseMove}
      className="group relative text-center
        transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        hover:-translate-y-2"
    >
      {/* Avatar */}
      <div className="relative aspect-square rounded-xl bg-gradient-to-br from-[#702874]/20 to-[var(--ct-bg-page)] border border-[var(--ct-border)] group-hover:border-[#F6A51B]/30 transition-all duration-300 overflow-hidden mb-3 group-hover:shadow-[0_15px_40px_rgba(246,165,27,0.1)]">
        {/* Mouse glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{ background: glowBackground }}
        />
        {p.photoUrl ? (
          <Image src={p.photoUrl} alt={name} fill className="object-cover group-hover:scale-108 transition-transform duration-500" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-4xl font-bold group-hover:text-[var(--ct-text-faint)] transition-colors">{name.charAt(0)}</span>
          </div>
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--ct-bg-page)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-thai text-sm text-[var(--ct-text-primary)] truncate group-hover:text-[#F6A51B] transition-colors">{name}</h3>
      <p className="text-[var(--ct-text-faint)] text-xs font-thai mt-0.5">
        {p.roles.map((r) => lang === "th" ? (roleLabels[r]?.th || r) : (roleLabels[r]?.en || r)).join(", ")}
      </p>
    </Link>
  );
}

function PersonCardPoster({ p, lang }: { p: (typeof persons)[0]; lang: string }) {
  const name = lang === "th" ? p.nameTh : p.nameEn;
  return (
    <Link
      href={`/persons/${p.slug}`}
      className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-[var(--ct-bg-elevated)] border border-[var(--ct-border)] hover:-translate-y-1 hover:border-[#F6A51B]/30 hover:shadow-[0_10px_40px_rgba(246,165,27,0.1)] transition-all duration-300"
    >
      {p.photoUrl ? (
        <Image src={p.photoUrl} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="150px" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F6A51B]/10 to-[#702874]/10 flex items-center justify-center">
          <span className="text-[var(--ct-text-faint)] font-display text-3xl">{name.charAt(0)}</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[var(--ct-bg-page)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[var(--ct-text-primary)] text-[10px] font-thai font-semibold truncate">{name}</p>
        <p className="text-[#F6A51B] text-[9px]">{p.roles.map((r) => lang === "th" ? (roleLabels[r]?.th || r) : (roleLabels[r]?.en || r)).join(", ")}</p>
      </div>
    </Link>
  );
}

function PersonListItem({ p, lang, index }: { p: (typeof persons)[0]; lang: string; index: number }) {
  const name = lang === "th" ? p.nameTh : p.nameEn;
  const altName = lang === "th" ? p.nameEn : p.nameTh;
  const bio = lang === "th" ? p.biographyTh : p.biographyEn;

  return (
    <motion.a
      href={`/persons/${p.slug}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group flex gap-4 p-4 md:p-5 hover:bg-[var(--ct-bg-hover)] border-b border-[var(--ct-border)] last:border-0 transition-colors"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full bg-gradient-to-br from-[#702874]/20 to-[var(--ct-bg-page)] overflow-hidden relative group-hover:shadow-[0_0_20px_rgba(246,165,27,0.1)] transition-shadow border border-[var(--ct-border)] group-hover:border-[#F6A51B]/30">
        {p.photoUrl ? (
          <Image src={p.photoUrl} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="64px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--ct-text-faint)] font-display text-xl font-bold">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-thai font-bold text-base text-[var(--ct-text-primary)] group-hover:text-[#F6A51B] transition-colors">{name}</h3>
        <p className="text-[var(--ct-text-faint)] text-sm font-body">{altName}</p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          {p.roles.map((r) => (
            <span key={r} className="px-2 py-0.5 bg-[#F6A51B]/15 text-[#F6A51B] text-[10px] rounded-md font-thai border border-[#F6A51B]/10">
              {lang === "th" ? (roleLabels[r]?.th || r) : (roleLabels[r]?.en || r)}
            </span>
          ))}
          {p.birthYear && <span className="text-[var(--ct-text-faint)] text-[10px] font-mono">{p.birthYear}</span>}
        </div>
        {bio && <p className="text-[var(--ct-text-faint)] text-xs font-body line-clamp-1 mt-1.5 leading-relaxed">{bio}</p>}
      </div>
    </motion.a>
  );
}
