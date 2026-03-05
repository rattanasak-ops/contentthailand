"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, Building2, Share2, Facebook, LinkIcon } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { films } from "@/lib/mock-data/films";
import { persons } from "@/lib/mock-data/persons";
import { FilmCardGrid } from "@/components/films/FilmCardGrid";

// Map films to mock crew for demo purposes
const mockCrewMap: Record<number, { personId: number; role: string }[]> = {
  1: [ // Bad Genius
    { personId: 5, role: "director" },
    { personId: 10, role: "actor" },
  ],
  2: [ // Pee Mak
    { personId: 7, role: "director" },
    { personId: 9, role: "actor" },
    { personId: 13, role: "actor" },
  ],
  3: [ // Ong Bak
    { personId: 4, role: "director" },
    { personId: 8, role: "actor" },
  ],
  4: [ // Uncle Boonmee
    { personId: 3, role: "director" },
  ],
  5: [ // How to Make Millions
    { personId: 25, role: "director" },
    { personId: 26, role: "actor" },
  ],
};

export default function FilmDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const slug = params.slug as string;

  const film = films.find((f) => f.slug === slug);

  if (!film) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-display text-4xl mb-4">404</h1>
          <p className="text-white/50 font-thai">
            {lang === "th" ? "ไม่พบภาพยนตร์" : "Film not found"}
          </p>
          <Link href="/films" className="text-pink font-thai text-sm hover:underline mt-4 inline-block">
            {lang === "th" ? "← กลับหน้าภาพยนตร์" : "← Back to films"}
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === "th" ? film.titleTh : film.titleEn;
  const subtitle = lang === "th" ? film.titleEn : film.titleTh;
  const synopsis = lang === "th" ? film.synopsisTh : film.synopsisEn;
  const altSynopsis = lang === "th" ? film.synopsisEn : film.synopsisTh;

  // Get crew for this film
  const crewEntries = mockCrewMap[film.id] || [];
  const crew = crewEntries
    .map((c) => ({
      person: persons.find((p) => p.id === c.personId),
      role: c.role,
    }))
    .filter((c) => c.person);

  // Related films (same genre)
  const relatedFilms = films
    .filter(
      (f) =>
        f.id !== film.id &&
        f.genres.some((g) => film.genres.some((fg) => fg.slug === g.slug))
    )
    .slice(0, 6);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ภาพยนตร์" : "Films", href: "/films" },
    { label: title },
  ];

  return (
    <div className="min-h-screen bg-midnight">
      {/* Cinematic Hero Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {film.posterUrl ? (
          <>
            <Image
              src={film.posterUrl}
              alt={title}
              fill
              className="object-cover blur-2xl scale-110 opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-midnight/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple/40 via-midnight to-midnight" />
        )}
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-midnight to-transparent" />
      </div>

      {/* Content area - overlapping hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 md:-mt-52 z-10">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-[200px] md:w-[280px] mx-auto md:mx-0">
            <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-br from-purple/40 to-navy border-2 border-white/10 shadow-2xl relative">
              {film.posterUrl ? (
                <Image
                  src={film.posterUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 280px"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/15 font-display text-7xl font-bold">
                    {title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-2">
              {title}
            </h1>
            <p className="text-white/40 font-body text-lg mb-6">{subtitle}</p>

            {/* Info pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber/10 text-amber rounded-full text-sm font-thai">
                <Calendar className="w-3.5 h-3.5" />
                {film.year}
              </span>
              {film.duration && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink/10 text-pink rounded-full text-sm font-thai">
                  <Clock className="w-3.5 h-3.5" />
                  {film.duration} {lang === "th" ? "นาที" : "min"}
                </span>
              )}
              {film.genres.map((g) => (
                <span
                  key={g.slug}
                  className="px-3 py-1.5 bg-purple/20 text-purple-light rounded-full text-sm font-thai"
                >
                  {lang === "th" ? g.nameTh : g.nameEn}
                </span>
              ))}
              {film.company && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/60 rounded-full text-sm font-thai">
                  <Building2 className="w-3.5 h-3.5" />
                  {film.company.nameTh}
                </span>
              )}
            </div>

            {/* Synopsis */}
            <div className="mb-8">
              <h2 className="font-thai font-bold text-white text-lg mb-3">
                {lang === "th" ? "เรื่องย่อ" : "Synopsis"}
              </h2>
              <p className="text-white/70 font-body leading-relaxed mb-4">
                {synopsis}
              </p>
              {altSynopsis && (
                <details className="group">
                  <summary className="text-pink text-sm font-thai cursor-pointer hover:underline">
                    {lang === "th" ? "อ่านภาษาอังกฤษ" : "Read in Thai"}
                  </summary>
                  <p className="text-white/50 font-body leading-relaxed mt-2">
                    {altSynopsis}
                  </p>
                </details>
              )}
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-sm font-thai mr-1">
                {lang === "th" ? "แชร์:" : "Share:"}
              </span>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cast & Crew */}
        {crew.length > 0 && (
          <section className="mt-16">
            <FilmStrip color="pink" size="md">
              <h2 className="font-thai font-bold text-xl text-white">
                {lang === "th" ? "ทีมงานและนักแสดง" : "Cast & Crew"}
              </h2>
            </FilmStrip>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
              {crew.map(({ person, role }) => (
                <Link
                  key={person!.id}
                  href={`/persons/${person!.slug}`}
                  className="group text-center"
                >
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-purple/20 to-navy border border-white/5 group-hover:border-pink/30 transition-colors flex items-center justify-center overflow-hidden mb-2">
                    <span className="text-white/15 font-display text-3xl font-bold group-hover:text-white/25 transition-colors">
                      {person!.nameTh.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-thai text-sm text-white truncate group-hover:text-pink transition-colors">
                    {lang === "th" ? person!.nameTh : person!.nameEn}
                  </h3>
                  <p className="text-white/30 text-xs font-thai">
                    {role === "director"
                      ? lang === "th"
                        ? "ผู้กำกับ"
                        : "Director"
                      : lang === "th"
                        ? "นักแสดง"
                        : "Actor"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Films */}
        {relatedFilms.length > 0 && (
          <section className="mt-16 pb-20">
            <FilmStrip color="orange" size="md">
              <h2 className="font-thai font-bold text-xl text-white">
                {lang === "th" ? "ภาพยนตร์ที่เกี่ยวข้อง" : "Related Films"}
              </h2>
            </FilmStrip>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
              {relatedFilms.map((f) => (
                <FilmCardGrid key={f.id} film={f} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
