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
import { PageNavigator } from "@/components/shared/PageNavigator";
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
      {/* Page Navigator — floating sidebar */}
      <PageNavigator />

      {/* WOW #1 — Cinematic Hero Banner */}
      <div id="hero">
        <HeroBanner />
      </div>

      {/* WOW #2 — Animated Stats Counter */}
      <div id="stats">
        <StatsCounter />
      </div>

      <GradientDivider variant="pink" />

      {/* Latest Films Carousel */}
      <div id="latest-films">
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
      </div>

      <GradientDivider variant="orange" />

      {/* Popular Films Carousel */}
      <div id="popular-films">
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
      </div>

      <GradientDivider variant="amber" />

      {/* Series Carousel */}
      <div id="series">
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
      </div>

      <GradientDivider variant="purple" />

      {/* Industry Snapshot Dashboard Preview */}
      <div id="dashboard">
        <ScrollReveal direction="up" delay={0.1}>
          <IndustrySnapshot />
        </ScrollReveal>
      </div>

      <GradientDivider variant="amber" />

      {/* Featured Persons */}
      <div id="persons">
        <ScrollReveal direction="up" delay={0.1}>
          <FeaturedPersons />
        </ScrollReveal>
      </div>

      <GradientDivider variant="pink" />

      {/* Featured Companies */}
      <div id="companies">
        <ScrollReveal direction="up" delay={0.1}>
          <FeaturedCompanies />
        </ScrollReveal>
      </div>

      <GradientDivider variant="orange" />

      {/* Latest News */}
      <div id="news">
        <ScrollReveal direction="up" delay={0.1}>
          <NewsSection items={latestNews} />
        </ScrollReveal>
      </div>

      {/* CTA — Film Incentive Application */}
      <div id="cta">
        <CTAIncentive />
      </div>
    </div>
  );
}
