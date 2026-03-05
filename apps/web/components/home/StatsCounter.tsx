"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { formatNumber } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Film, Tv, Users, Eye } from "lucide-react";

const stats = [
  {
    icon: Film,
    end: 562,
    labelTh: "ภาพยนตร์",
    labelEn: "Films",
    badgeTh: "+12 เดือนนี้",
    badgeEn: "+12 this month",
  },
  {
    icon: Tv,
    end: 737,
    labelTh: "ละครโทรทัศน์",
    labelEn: "TV Series",
    badgeTh: "+8 เดือนนี้",
    badgeEn: "+8 this month",
  },
  {
    icon: Users,
    end: 5888,
    labelTh: "บุคลากร",
    labelEn: "Personnel",
    badgeTh: "+45 เดือนนี้",
    badgeEn: "+45 this month",
  },
  {
    icon: Eye,
    end: 1254036,
    labelTh: "ผู้เข้าชม",
    labelEn: "Visitors",
    badgeTh: "+15,230 เดือนนี้",
    badgeEn: "+15,230 this month",
  },
];

function StatCard({
  icon: Icon,
  end,
  labelTh,
  labelEn,
  badgeTh,
  badgeEn,
}: (typeof stats)[0]) {
  const { value, ref } = useCountUp(end);
  const { lang } = useLanguage();

  return (
    <div
      ref={ref}
      className="relative bg-navy/80 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-pink/20 transition-colors group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-pink/10 text-pink group-hover:bg-pink/20 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-white/50 text-sm font-thai">
          {lang === "th" ? labelTh : labelEn}
        </span>
      </div>
      <div className="font-display text-3xl md:text-4xl text-amber font-bold">
        {formatNumber(value)}
      </div>
      <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full font-thai">
        {lang === "th" ? badgeTh : badgeEn}
      </span>
    </div>
  );
}

export function StatsCounter() {
  return (
    <section className="py-20 bg-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.labelEn} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
