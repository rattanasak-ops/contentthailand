"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { persons } from "@/lib/mock-data/persons";

export default function PersonDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const slug = params.slug as string;
  const person = persons.find((p) => p.slug === slug);

  if (!person) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-display text-4xl mb-4">404</h1>
          <p className="text-white/50 font-thai">{lang === "th" ? "ไม่พบบุคลากร" : "Person not found"}</p>
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
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-[200px] mx-auto md:mx-0">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-purple/30 to-navy border-2 border-white/10 flex items-center justify-center">
              <span className="text-white/15 font-display text-7xl font-bold">{name.charAt(0)}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl md:text-4xl text-white font-bold mb-1">{name}</h1>
            <p className="text-white/40 font-body text-lg mb-4">{altName}</p>

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
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/60 rounded-full text-sm font-thai">
                  <MapPin className="w-3.5 h-3.5" />{person.birthplace}
                </span>
              )}
            </div>

            {bio && (
              <div className="mb-8">
                <h2 className="font-thai font-bold text-white text-lg mb-3">{lang === "th" ? "ประวัติ" : "Biography"}</h2>
                <p className="text-white/70 font-body leading-relaxed">{bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
