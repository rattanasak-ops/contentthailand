import { NextRequest, NextResponse } from "next/server";
import { films } from "@/lib/mock-data/films";
import { series } from "@/lib/mock-data/series";
import { persons } from "@/lib/mock-data/persons";
import { companies } from "@/lib/mock-data/companies";

function highlight(text: string, query: string): string {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const type = searchParams.get("type") || "all";

  if (!q || q.length < 1) {
    return NextResponse.json({
      films: [],
      series: [],
      persons: [],
      companies: [],
      total: 0,
    });
  }

  const matchedFilms =
    type === "all" || type === "films"
      ? films
          .filter(
            (f) =>
              f.titleTh.toLowerCase().includes(q) ||
              f.titleEn.toLowerCase().includes(q)
          )
          .map((f) => ({
            ...f,
            _highlightTh: highlight(f.titleTh, q),
            _highlightEn: highlight(f.titleEn, q),
          }))
      : [];

  const matchedSeries =
    type === "all" || type === "series"
      ? series
          .filter(
            (s) =>
              s.titleTh.toLowerCase().includes(q) ||
              s.titleEn.toLowerCase().includes(q)
          )
          .map((s) => ({
            ...s,
            _highlightTh: highlight(s.titleTh, q),
            _highlightEn: highlight(s.titleEn, q),
          }))
      : [];

  const matchedPersons =
    type === "all" || type === "persons"
      ? persons
          .filter(
            (p) =>
              p.nameTh.toLowerCase().includes(q) ||
              p.nameEn.toLowerCase().includes(q)
          )
          .map((p) => ({
            ...p,
            _highlightTh: highlight(p.nameTh, q),
            _highlightEn: highlight(p.nameEn, q),
          }))
      : [];

  const matchedCompanies =
    type === "all" || type === "companies"
      ? companies
          .filter(
            (c) =>
              c.nameTh.toLowerCase().includes(q) ||
              c.nameEn.toLowerCase().includes(q)
          )
          .map((c) => ({
            ...c,
            _highlightTh: highlight(c.nameTh, q),
            _highlightEn: highlight(c.nameEn, q),
          }))
      : [];

  return NextResponse.json({
    films: matchedFilms,
    series: matchedSeries,
    persons: matchedPersons,
    companies: matchedCompanies,
    total:
      matchedFilms.length +
      matchedSeries.length +
      matchedPersons.length +
      matchedCompanies.length,
  });
}
