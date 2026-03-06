import { MetadataRoute } from "next";
import { films } from "@/lib/mock-data/films";
import { series } from "@/lib/mock-data/series";
import { persons } from "@/lib/mock-data/persons";
import { companies } from "@/lib/mock-data/companies";
import { news } from "@/lib/mock-data/news";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://contentthailand.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${BASE_URL}/films`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/series`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/persons`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/companies`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/library`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/statistics`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${BASE_URL}/apply`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/apply/film-incentive`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/apply/digital-content`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/film-incentive`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/about/mission`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${BASE_URL}/about/partners`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${BASE_URL}/about/location`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/sitemap`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/policy/website`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/policy/pdpa`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/policy/security`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/policy/disclaimer`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/policy/cookies`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const filmPages = films.map((f) => ({
    url: `${BASE_URL}/films/${f.slug}`,
    lastModified: new Date(f.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const seriesPages = series.map((s) => ({
    url: `${BASE_URL}/series/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const personPages = persons.map((p) => ({
    url: `${BASE_URL}/persons/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const companyPages = companies.map((c) => ({
    url: `${BASE_URL}/companies/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const newsPages = news.map((n) => ({
    url: `${BASE_URL}/news/${n.slug}`,
    lastModified: new Date(n.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...filmPages, ...seriesPages, ...personPages, ...companyPages, ...newsPages];
}
