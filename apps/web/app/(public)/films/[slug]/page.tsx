"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, Building2, Eye, Share2, Facebook, MessageCircle, Link as LinkCopy, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { films } from "@/lib/mock-data/films";
import { persons } from "@/lib/mock-data/persons";
import { FilmCardGrid } from "@/components/films/FilmCardGrid";

// Fun facts for demo — Persona #4 (Youth/Gen Z)
const funFactsMap: Record<number, { th: string; en: string }[]> = {
  1: [
    { th: "ฉลาดเกมส์โกง ทำรายได้ทั่วโลกกว่า 42 ล้านเหรียญสหรัฐ สูงสุดในประวัติศาสตร์หนังไทย", en: "Bad Genius grossed over $42M worldwide — the highest-grossing Thai film ever" },
    { th: "หนังเรื่องนี้ได้รับการ remake ในจีน อินเดีย และอินโดนีเซีย", en: "The film was remade in China, India, and Indonesia" },
    { th: "ฉากสอบ STIC ถ่ายทำจริงที่ซิดนีย์ ออสเตรเลีย", en: "The STIC exam scene was actually filmed in Sydney, Australia" },
  ],
  2: [
    { th: "พี่มาก ทำรายได้ในไทยกว่า 1 พันล้านบาท เป็นหนังไทยเรื่องแรกที่ทำได้", en: "Pee Mak earned over 1 billion baht — the first Thai film to do so" },
    { th: "มาริโอ้ เมาเร่อ เรียนภาษาถิ่นเพื่อรับบทนี้โดยเฉพาะ", en: "Mario Maurer learned a regional dialect specifically for this role" },
  ],
  3: [
    { th: "จา พนม ไม่ใช้สตันท์แมนเลยตลอดทั้งเรื่อง", en: "Tony Jaa performed all stunts himself — no stunt doubles used" },
    { th: "ฉากไล่ล่าในตลาดกรุงเทพฯ ถ่ายจริงแบบ long take ไม่มีตัด", en: "The Bangkok market chase scene was shot as a real long take with no cuts" },
    { th: "องค์บาก ทำให้มวยไทยเป็นที่รู้จักในระดับโลก", en: "Ong-Bak put Muay Thai on the global cinema map" },
  ],
  4: [
    { th: "คว้ารางวัลปาล์มทองคำ เทศกาลภาพยนตร์เมืองคานส์ 2010 — หนังไทยเรื่องแรกที่ทำได้", en: "Won the Palme d'Or at Cannes 2010 — the first and only Thai film to achieve this" },
    { th: "อภิชาติพงศ์ วีระเศรษฐกุล ใช้เวลาพัฒนาบทนานกว่า 3 ปี", en: "Apichatpong Weerasethakul spent over 3 years developing the screenplay" },
  ],
  5: [
    { th: "หลานม่า ทำรายได้ทั่วโลกกว่า 2 พันล้านบาท กลายเป็นหนังไทยที่ทำเงินสูงสุดตลอดกาล", en: "How to Make Millions grossed over 2 billion baht worldwide — becoming the highest-grossing Thai film of all time" },
    { th: "ภาพยนตร์เข้าฉายในกว่า 40 ประเทศ รวมถึงจีนและเกาหลีใต้", en: "The film was released in over 40 countries including China and South Korea" },
    { th: "พุทธิพงษ์ ทองเนื้อแปด คว้า 9 รางวัลนักแสดงนำชาย", en: "Billkin won 9 Best Actor awards for this role" },
  ],
};

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
      <div className="min-h-screen bg-[var(--ct-bg-page)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[var(--ct-text-primary)] font-display text-4xl mb-4">404</h1>
          <p className="text-[var(--ct-text-muted)] font-thai">
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
    <div className="min-h-screen bg-[var(--ct-bg-page)]">
      {/* Cinematic Hero Backdrop — Netflix-style */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        {film.posterUrl ? (
          <>
            <div className="absolute inset-0 scale-105">
              <Image
                src={film.posterUrl}
                alt={title}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Bottom fade to page bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--ct-bg-page)]" />
            {/* Left fade for text area */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ct-bg-page)]/90 via-[var(--ct-bg-page)]/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-purple/30 via-[var(--ct-bg-page)] to-[var(--ct-bg-page)]" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(236, 28, 114, 0.06) 0%, transparent 70%)" }} />
          </>
        )}
        {/* Film grain texture */}
        <div className="absolute inset-0 film-grain" />
      </div>

      {/* Content area - overlapping hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-44 z-10">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster — animated entrance */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0 w-[200px] md:w-[280px] mx-auto md:mx-0"
          >
            <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-br from-purple/40 to-[var(--ct-bg-elevated)] border-2 border-[var(--ct-border)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative group">
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
                  <span className="text-[var(--ct-text-faint)] font-display text-7xl font-bold">
                    {title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info — animated entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 min-w-0"
          >
            {/* Rating badge */}
            {film.viewCount > 50000 && (
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber/15 text-amber rounded-full text-xs font-thai font-semibold">
                  <Star className="w-3 h-3 fill-amber" />
                  {lang === "th" ? "ยอดนิยม" : "Popular"}
                </span>
              </div>
            )}
            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--ct-text-primary)] font-bold mb-2">
              {title}
            </h1>
            <p className="text-[var(--ct-text-muted)] font-body text-lg mb-6">{subtitle}</p>

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
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ct-bg-hover)] text-[var(--ct-text-secondary)] rounded-full text-sm font-thai">
                  <Building2 className="w-3.5 h-3.5" />
                  {film.company.nameTh}
                </span>
              )}
            </div>

            {/* Synopsis */}
            <div className="mb-8">
              <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-3">
                {lang === "th" ? "เรื่องย่อ" : "Synopsis"}
              </h2>
              <p className="text-[var(--ct-text-secondary)] font-body leading-relaxed mb-4">
                {synopsis}
              </p>
              {altSynopsis && (
                <details className="group">
                  <summary className="text-pink text-sm font-thai cursor-pointer hover:underline">
                    {lang === "th" ? "อ่านภาษาอังกฤษ" : "Read in Thai"}
                  </summary>
                  <p className="text-[var(--ct-text-muted)] font-body leading-relaxed mt-2">
                    {altSynopsis}
                  </p>
                </details>
              )}
            </div>

            {/* Engagement & Share */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[var(--ct-border)]">
              {/* View count */}
              <div className="flex items-center gap-1.5 text-[var(--ct-text-muted)] text-sm">
                <Eye className="w-4 h-4" />
                <span className="font-mono">{film.viewCount?.toLocaleString()}</span>
                <span className="font-thai">{lang === "th" ? "ครั้ง" : "views"}</span>
              </div>
              {/* Share buttons */}
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-[var(--ct-text-faint)] text-xs font-thai mr-1">
                  {lang === "th" ? "แชร์:" : "Share:"}
                </span>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")}
                  className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#1877F2]/20 hover:text-[#1877F2] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")}
                  className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[var(--ct-bg-hover)] hover:text-[var(--ct-text-primary)] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"
                  title="X / Twitter"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, "_blank", "width=600,height=400")}
                  className="p-2 bg-[var(--ct-bg-hover)] hover:bg-[#06C755]/20 hover:text-[#06C755] rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"
                  title="LINE"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(lang === "th" ? "คัดลอกลิงก์แล้ว" : "Link copied!"); }}
                  className="p-2 bg-[var(--ct-bg-hover)] hover:bg-amber/20 hover:text-amber rounded-lg text-[var(--ct-text-muted)] transition-all duration-200 hover:scale-110"
                  title={lang === "th" ? "คัดลอกลิงก์" : "Copy link"}
                >
                  <LinkCopy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fun Facts — Netflix-style "Did you know?" */}
        {funFactsMap[film.id] && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-amber/5 via-orange/5 to-pink/5 rounded-2xl border border-amber/10 p-6">
              <h3 className="flex items-center gap-2 font-thai font-bold text-amber text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                {lang === "th" ? "รู้หรือไม่?" : "Did you know?"}
              </h3>
              <ul className="space-y-3">
                {funFactsMap[film.id].map((fact, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--ct-text-secondary)] text-sm font-body">
                    <span className="text-amber/60 mt-0.5">&#9679;</span>
                    {lang === "th" ? fact.th : fact.en}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* Cast & Crew */}
        {crew.length > 0 && (
          <section className="mt-16">
            <FilmStrip color="pink" size="md">
              <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">
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
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-purple/20 to-[var(--ct-bg-elevated)] border border-[var(--ct-border)] group-hover:border-pink/30 transition-colors flex items-center justify-center overflow-hidden mb-2 relative">
                    {person!.photoUrl ? (
                      <Image src={person!.photoUrl} alt={person!.nameTh} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 16vw" />
                    ) : (
                      <span className="text-[var(--ct-text-faint)] font-display text-3xl font-bold group-hover:text-[var(--ct-text-faint)] transition-colors">
                        {person!.nameTh.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-thai text-sm text-[var(--ct-text-primary)] truncate group-hover:text-pink transition-colors">
                    {lang === "th" ? person!.nameTh : person!.nameEn}
                  </h3>
                  <p className="text-[var(--ct-text-faint)] text-xs font-thai">
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
              <h2 className="font-thai font-bold text-xl text-[var(--ct-text-primary)]">
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
