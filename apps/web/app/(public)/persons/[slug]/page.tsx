"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Facebook, Share2, MessageCircle, Link as LinkCopy, Mail, Film } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { persons } from "@/lib/mock-data/persons";
import { films } from "@/lib/mock-data/films";

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
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-[200px] mx-auto md:mx-0">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-purple/30 to-[var(--ct-bg-elevated)] border-2 border-[var(--ct-border)] flex items-center justify-center overflow-hidden relative">
              {person.photoUrl ? (
                <Image src={person.photoUrl} alt={name} fill className="object-cover" sizes="200px" />
              ) : (
                <span className="text-[var(--ct-text-faint)] font-display text-7xl font-bold">{name.charAt(0)}</span>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
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
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(name)}&url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")} className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-hover)] hover:text-white rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"><Share2 className="w-4 h-4" /></button>
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
          </div>
        </div>

        {/* Filmography Section */}
        {(() => {
          const personFilms = films.filter((f) =>
            f.crew?.some((c) => c.personId === person.id) ||
            (person.roles.includes("director") && f.company)
          ).slice(0, 6);

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
