"use client";

import { HeroBanner } from "@/components/home/HeroBanner";
import { StatsCounter } from "@/components/home/StatsCounter";
import { ContentCarousel } from "@/components/home/ContentCarousel";
import { FilmCard } from "@/components/home/FilmCard";
import { SeriesCard } from "@/components/home/SeriesCard";
import { NewsSection } from "@/components/home/NewsSection";
import { FeaturedPersons } from "@/components/home/FeaturedPersons";
import { FeaturedCompanies } from "@/components/home/FeaturedCompanies";
import { IndustrySnapshot } from "@/components/home/IndustrySnapshot";
import { CTAIncentive } from "@/components/home/CTAIncentive";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GradientDivider } from "@/components/motion/gradient-divider";
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

      <GradientDivider variant="pink" />

      {/* Latest Films Carousel */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 bg-[var(--ct-bg-elevated)]">
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
      </ScrollReveal>

      <GradientDivider variant="orange" />

      {/* Popular Films Carousel */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 bg-[var(--ct-bg-page)]">
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
      </ScrollReveal>

      <GradientDivider variant="amber" />

      {/* Series Carousel */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 bg-[var(--ct-bg-elevated)]">
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
      </ScrollReveal>

      <GradientDivider variant="purple" />

      {/* Industry Snapshot Dashboard Preview — TOR 4.4.11 */}
      <ScrollReveal direction="up" delay={0.1}>
        <IndustrySnapshot />
      </ScrollReveal>

      <GradientDivider variant="amber" />

      {/* Featured Persons — TOR 4.4.4 */}
      <ScrollReveal direction="up" delay={0.1}>
        <FeaturedPersons />
      </ScrollReveal>

      <GradientDivider variant="pink" />

      {/* Featured Companies — TOR 4.4.5 */}
      <ScrollReveal direction="up" delay={0.1}>
        <FeaturedCompanies />
      </ScrollReveal>

      <GradientDivider variant="orange" />

      {/* Latest News */}
      <ScrollReveal direction="up" delay={0.1}>
        <NewsSection items={latestNews} />
      </ScrollReveal>

      {/* CTA — Film Incentive Application TOR 4.4.8 */}
      <CTAIncentive />
    </div>
  );
}
