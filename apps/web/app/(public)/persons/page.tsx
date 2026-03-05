"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { persons } from "@/lib/mock-data/persons";

type RoleFilter = "all" | "director" | "actor" | "producer";

export default function PersonsPage() {
  const { lang } = useLanguage();
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const filtered = useMemo(() => {
    if (roleFilter === "all") return persons;
    return persons.filter((p) => p.roles.includes(roleFilter));
  }, [roleFilter]);

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "บุคลากร" : "Personnel" },
  ];

  return (
    <div className="min-h-screen bg-midnight pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-8">
          <FilmStrip color="pink" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-white">{lang === "th" ? "บุคลากรในวงการภาพยนตร์" : "Film Industry Personnel"}</h1>
          </FilmStrip>
          <p className="text-white/50 text-sm font-thai mt-3 ml-1">{filtered.length} {lang === "th" ? "คน" : "people"}</p>
        </div>

        <div className="flex gap-2 mb-8">
          {([["all", "ทั้งหมด", "All"], ["director", "ผู้กำกับ", "Directors"], ["actor", "นักแสดง", "Actors"], ["producer", "โปรดิวเซอร์", "Producers"]] as const).map(([key, th, en]) => (
            <button key={key} onClick={() => setRoleFilter(key)} className={`px-3 py-1.5 rounded-lg text-sm font-thai transition-colors ${roleFilter === key ? "bg-pink/20 text-pink" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
              {lang === "th" ? th : en}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((p) => {
            const name = lang === "th" ? p.nameTh : p.nameEn;
            return (
              <Link key={p.id} href={`/persons/${p.slug}`} className="group text-center">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-purple/20 to-navy border border-white/5 group-hover:border-pink/30 transition-colors flex items-center justify-center overflow-hidden mb-2">
                  <span className="text-white/15 font-display text-4xl font-bold group-hover:text-white/25 transition-colors">{name.charAt(0)}</span>
                </div>
                <h3 className="font-thai text-sm text-white truncate group-hover:text-pink transition-colors">{name}</h3>
                <p className="text-white/30 text-xs font-thai">{p.roles.map((r) => r === "director" ? (lang === "th" ? "ผู้กำกับ" : "Director") : r === "actor" ? (lang === "th" ? "นักแสดง" : "Actor") : r === "producer" ? (lang === "th" ? "โปรดิวเซอร์" : "Producer") : r).join(", ")}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
