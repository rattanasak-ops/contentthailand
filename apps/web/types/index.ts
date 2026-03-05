// ContentThailand — TypeScript Interfaces
// All models have: id, slug, titleTh/nameTh, titleEn/nameEn, status, createdAt, updatedAt

export interface Film {
  id: number;
  slug: string;
  titleTh: string;
  titleEn: string;
  year: number;
  duration: number | null;
  synopsisTh: string | null;
  synopsisEn: string | null;
  posterUrl: string | null;
  backdropUrl: string | null;
  trailerUrl: string | null;
  imdbId: string | null;
  status: "published" | "draft" | "archived";
  viewCount: number;
  companyId: number | null;
  company?: Company;
  genres: Genre[];
  crew: FilmCrew[];
  awards: Award[];
  createdAt: string;
  updatedAt: string;
}

export interface TvSeries {
  id: number;
  slug: string;
  titleTh: string;
  titleEn: string;
  year: number;
  endYear: number | null;
  episodes: number | null;
  channel: string | null;
  synopsisTh: string | null;
  synopsisEn: string | null;
  coverUrl: string | null;
  backdropUrl: string | null;
  trailerUrl: string | null;
  status: "published" | "draft" | "archived";
  viewCount: number;
  companyId: number | null;
  company?: Company;
  genres: Genre[];
  crew: SeriesCrew[];
  createdAt: string;
  updatedAt: string;
}

export interface Person {
  id: number;
  slug: string;
  nameTh: string;
  nameEn: string;
  roles: string[];
  biographyTh: string | null;
  biographyEn: string | null;
  photoUrl: string | null;
  birthYear: number | null;
  birthplace: string | null;
  nationality: string;
  websiteUrl: string | null;
  imdbUrl: string | null;
  filmCrew?: FilmCrew[];
  seriesCrew?: SeriesCrew[];
  awards?: Award[];
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  slug: string;
  nameTh: string;
  nameEn: string;
  type: "production" | "distribution" | "streaming" | "broadcaster";
  logoUrl: string | null;
  website: string | null;
  description: string | null;
  founded: number | null;
  films?: Film[];
  series?: TvSeries[];
  createdAt: string;
  updatedAt: string;
}

export interface Genre {
  id: number;
  slug: string;
  nameTh: string;
  nameEn: string;
}

export interface FilmCrew {
  filmId: number;
  personId: number;
  role: string;
  person?: Person;
  film?: Film;
}

export interface SeriesCrew {
  seriesId: number;
  personId: number;
  role: string;
  person?: Person;
  series?: TvSeries;
}

export interface Award {
  id: number;
  name: string;
  category: string | null;
  year: number;
  festival: string | null;
  isWinner: boolean;
  filmId: number | null;
  personId: number | null;
  film?: Film;
  person?: Person;
  createdAt: string;
}

export interface News {
  id: number;
  slug: string;
  titleTh: string;
  titleEn: string | null;
  contentTh: string;
  contentEn: string | null;
  excerptTh: string | null;
  coverUrl: string | null;
  tags: string[];
  status: "published" | "draft" | "archived";
  viewCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type Lang = "th" | "en";

export interface ApiResponse<T> {
  data: T;
  meta: { total: number; page: number; limit: number } | null;
  error: null;
}

export interface ApiError {
  data: null;
  meta: null;
  error: { message: string; code: string };
}

export interface SearchResults {
  films: Film[];
  series: TvSeries[];
  persons: Person[];
  companies: Company[];
}

export interface StatsData {
  films: { total: number; thisMonth: number };
  series: { total: number; thisMonth: number };
  persons: { total: number; thisMonth: number };
  companies: { total: number };
  totalViews: number;
}
