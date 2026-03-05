"use client";

import { HeroBanner } from "@/components/home/HeroBanner";
import { StatsCounter } from "@/components/home/StatsCounter";
import { ContentCarousel } from "@/components/home/ContentCarousel";
import { FilmCard } from "@/components/home/FilmCard";
import { SeriesCard } from "@/components/home/SeriesCard";
import { NewsSection } from "@/components/home/NewsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { films } from "@/lib/mock-data/films";
import { series } from "@/lib/mock-data/series";
import { news } from "@/lib/mock-data/news";

export default function HomePage() {
  const { lang } = useLanguage();

  const latestFilms = [...films].sort((a, b) => b.year - a.year).slice(0, 8);
  const popularFilms = [...films].sort((a, b) => b.viewCount - a.viewCount).slice(0, 8);
  const latestSeries = [...series].sort((a, b) => b.year - a.year).slice(0, 8);
  const latestNews = [...news]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <div>
      {/* WOW #1 — Cinematic Hero Banner */}
      <HeroBanner />

      {/* WOW #2 — Animated Stats Counter */}
      <StatsCounter />

      {/* Latest Films Carousel */}
      <section className="py-16 bg-navy-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContentCarousel
            titleTh="ภาพยนตร์ล่าสุด"
            titleEn="Latest Films"
            color="pink"
            lang={lang}
            viewAllHref="/films"
          >
            {latestFilms.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </ContentCarousel>
        </div>
      </section>

      {/* Popular Films Carousel */}
      <section className="py-16 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContentCarousel
            titleTh="ภาพยนตร์ยอดนิยม"
            titleEn="Popular Films"
            color="orange"
            lang={lang}
            viewAllHref="/films"
          >
            {popularFilms.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </ContentCarousel>
        </div>
      </section>

      {/* Series Carousel */}
      <section className="py-16 bg-navy-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContentCarousel
            titleTh="ละครโทรทัศน์ล่าสุด"
            titleEn="Latest TV Series"
            color="orange"
            lang={lang}
            viewAllHref="/series"
          >
            {latestSeries.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </ContentCarousel>
        </div>
      </section>

      {/* Latest News */}
      <NewsSection items={latestNews} />
    </div>
  );
}
