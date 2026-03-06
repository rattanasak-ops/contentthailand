"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Facebook, Share2, MessageCircle, Link as LinkCopy, Mail, Film } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { persons } from "@/lib/mock-data/persons";
import { films } from "@/lib/mock-data/films";

// Map person -> films (reverse of mockCrewMap in film detail)
const personFilmMap: Record<number, { filmId: number; role: string }[]> = {
  5: [{ filmId: 1, role: "director" }],        // Nattawut - Bad Genius
  10: [{ filmId: 1, role: "actor" }],           // Chutimon - Bad Genius
  7: [{ filmId: 2, role: "director" }],         // Banjong - Pee Mak
  9: [{ filmId: 2, role: "actor" }],            // Mario - Pee Mak
  13: [{ filmId: 2, role: "actor" }],           // Davika - Pee Mak
  4: [{ filmId: 3, role: "director" }],         // Prachya - Ong Bak
  8: [{ filmId: 3, role: "actor" }],            // Tony Jaa - Ong Bak
  3: [{ filmId: 4, role: "director" }],         // Apichatpong - Uncle Boonmee
  25: [{ filmId: 5, role: "director" }],        // Pat - How to Make Millions
  26: [{ filmId: 5, role: "actor" }],           // Billkin - How to Make Millions
  1: [{ filmId: 15, role: "actor" }],           // Ananda - Phra Ruang
  2: [{ filmId: 24, role: "actor" }],           // Sunny - Paradise of Thorns
  6: [{ filmId: 23, role: "actor" }],           // Nadech - Uranus2324
  11: [{ filmId: 6, role: "actor" }],           // Baifern - Food Truck
  12: [{ filmId: 22, role: "actor" }],          // Bright - Why We Love
  14: [{ filmId: 10, role: "actor" }],          // Bella - Nak Loves Mak
  15: [{ filmId: 17, role: "actor" }],          // Chicha - Jenny I Love You
  16: [{ filmId: 14, role: "actor" }],          // Yaya - Love or Lie
  17: [{ filmId: 20, role: "actor" }],          // Mew - Halabala
  18: [{ filmId: 7, role: "actor" }],           // Gulf - A Useful Ghost
  19: [{ filmId: 28, role: "actor" }],          // Aokbab - My Ex's Wedding
  20: [{ filmId: 25, role: "actor" }],          // Jannine - My Boo
  21: [{ filmId: 16, role: "actor" }],          // Win - Home Sweet Home
  22: [{ filmId: 9, role: "director" }],        // Wisit - ThaRae
  23: [{ filmId: 29, role: "director" }],       // Kongdej - Operation Undead
  24: [{ filmId: 12, role: "director" }],       // Parkpoom - Attack 13
  27: [{ filmId: 11, role: "director" }],       // Nontawat - Bangkok Joyride 5
  28: [{ filmId: 8, role: "director" }],        // Anucha - Sokaphiwat
};

export default function PersonDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const slug = params.slug as string;
  const person = persons.find((p) => p.slug === slug);

  if (!person) {
    return (
      <div className="min-h-screen bg-[var(--ct-bg-page)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[var(--ct-text-primary)] font-display text-4xl mb-4">404</h1>
          <p className="text-[var(--ct-text-muted)] font-thai">{lang === "th" ? "ไม่พบบุคลากร" : "Person not found"}</p>
          <Link href="/persons" className="text-pink font-thai text-sm hover:underline mt-4 inline-block">{lang === "th" ? "← กลับ" : "← Back"}</Link>
        </div>
      </div>
    );
  }

  const name = lang === "th" ? person.nameTh : person.nameEn;
  const altName = lang === "th" ? person.nameEn : person.nameTh;
  const bio = lang === "th" ? person.biographyTh : person.biographyEn;

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "บุคลากร" : "Personnel", href: "/persons" },
    { label: name },
  ];

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)]">
      {/* Cinematic hero backdrop */}
      <div className="relative h-[25vh] md:h-[35vh] overflow-hidden">
        {person.photoUrl ? (
          <>
            <div className="absolute inset-0 scale-105">
              <Image src={person.photoUrl} alt={name} fill className="object-cover object-top" />
            </div>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--ct-bg-page)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ct-bg-page)]/90 via-[var(--ct-bg-page)]/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(246, 165, 27, 0.06) 0%, transparent 70%)" }} />
        )}
        <div className="absolute inset-0 film-grain" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10 pb-20">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0 w-[200px] mx-auto md:mx-0"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber/20 to-[var(--ct-bg-elevated)] border-2 border-[var(--ct-border)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden relative ring-2 ring-amber/10">
              {person.photoUrl ? (
                <Image src={person.photoUrl} alt={name} fill className="object-cover" sizes="200px" />
              ) : (
                <span className="text-[var(--ct-text-faint)] font-display text-7xl font-bold">{name.charAt(0)}</span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 min-w-0"
          >
            <h1 className="font-display text-3xl md:text-4xl text-[var(--ct-text-primary)] font-bold mb-1">{name}</h1>
            <p className="text-[var(--ct-text-muted)] font-body text-lg mb-4">{altName}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {person.roles.map((r) => (
                <span key={r} className="px-3 py-1.5 bg-pink/10 text-pink rounded-full text-sm font-thai">
                  {r === "director" ? (lang === "th" ? "ผู้กำกับ" : "Director") : r === "actor" ? (lang === "th" ? "นักแสดง" : "Actor") : r === "producer" ? (lang === "th" ? "โปรดิวเซอร์" : "Producer") : r}
                </span>
              ))}
              {person.birthYear && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber/10 text-amber rounded-full text-sm font-thai">
                  <Calendar className="w-3.5 h-3.5" />{lang === "th" ? `เกิดปี ${person.birthYear + 543}` : `Born ${person.birthYear}`}
                </span>
              )}
              {person.birthplace && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ct-bg-hover)] text-[var(--ct-text-secondary)] rounded-full text-sm font-thai">
                  <MapPin className="w-3.5 h-3.5" />{person.birthplace}
                </span>
              )}
            </div>

            {bio && (
              <div className="mb-8">
                <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-3">{lang === "th" ? "ประวัติ" : "Biography"}</h2>
                <p className="text-[var(--ct-text-secondary)] font-body leading-relaxed">{bio}</p>
              </div>
            )}

            {/* Share + Request Update */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--ct-border)]">
              <span className="text-[var(--ct-text-faint)] text-xs font-thai mr-1">{lang === "th" ? "แชร์:" : "Share:"}</span>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#1877F2]/20 hover:text-[#1877F2] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><Facebook className="w-4 h-4" /></button>
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(name)}&url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-hover)] hover:text-[var(--ct-text-primary)] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><Share2 className="w-4 h-4" /></button>
              <button onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#06C755]/20 hover:text-[#06C755] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><MessageCircle className="w-4 h-4" /></button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(lang === "th" ? "คัดลอกลิงก์แล้ว" : "Link copied!"); }} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-amber/20 hover:text-amber rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><LinkCopy className="w-4 h-4" /></button>
              <div className="flex-1" />
              <button
                onClick={() => toast.success(lang === "th" ? "ส่งคำขอแก้ไขข้อมูลเรียบร้อยแล้ว" : "Update request submitted")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple/10 text-purple hover:bg-purple/20 rounded-lg text-xs font-thai transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {lang === "th" ? "แจ้งแก้ไขข้อมูล" : "Request Update"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Filmography Section */}
        {(() => {
          const mappedFilmIds = (personFilmMap[person.id] || []).map((e) => e.filmId);
          const personFilms = films.filter((f) => mappedFilmIds.includes(f.id)).slice(0, 6);

          if (personFilms.length === 0) return null;

          return (
            <div className="mt-12">
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-xl mb-6 flex items-center gap-2">
                <Film className="w-5 h-5 text-pink" />
                {lang === "th" ? "ผลงาน" : "Filmography"}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {personFilms.map((film) => (
                  <Link key={film.id} href={`/films/${film.slug}`} className="group">
                    <div className="aspect-[2/3] rounded-lg bg-gradient-to-br from-purple/20 to-[var(--ct-bg-elevated)] overflow-hidden relative mb-2">
                      {film.posterUrl && (
                        <Image src={film.posterUrl} alt={film.titleEn} fill className="object-cover group-hover:scale-105 transition-transform" sizes="150px" />
                      )}
                    </div>
                    <p className="text-[var(--ct-text-secondary)] text-xs font-thai line-clamp-1 group-hover:text-pink transition-colors">
                      {lang === "th" ? film.titleTh : film.titleEn}
                    </p>
                    <p className="text-[var(--ct-text-faint)] text-[10px]">{film.year}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
