"use client";

import { useState, useMemo } from "react";
import { Tv, Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { series } from "@/lib/mock-data/series";

type SortKey = "titleTh" | "year" | "episodes";
type SortDir = "asc" | "desc";
const PAGE_SIZE = 10;

export default function SeriesTablePage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...series];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.titleTh.toLowerCase().includes(q) || s.titleEn.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "titleTh") cmp = a.titleTh.localeCompare(b.titleTh, "th");
      else if (sortKey === "year") cmp = a.year - b.year;
      else if (sortKey === "episodes") cmp = (a.episodes ?? 0) - (b.episodes ?? 0);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [search, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
    setPage(1);
  };

  const SortButton = ({ label, sk }: { label: string; sk: SortKey }) => (
    <button onClick={() => handleSort(sk)} className="flex items-center gap-1 hover:text-white transition-colors">
      {label}
      <ArrowUpDown className={`w-3 h-3 ${sortKey === sk ? "text-amber" : ""}`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-thai font-bold text-2xl text-white flex items-center gap-2">
          <Tv className="w-6 h-6 text-orange" />
          จัดการละครโทรทัศน์
        </h1>
        <Badge variant="outline" className="text-white/40 border-white/10 font-thai">
          {series.length} รายการ
        </Badge>
      </div>

      <Card className="bg-navy/60 border-white/5">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="ค้นหาละคร..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 bg-midnight/50 border-white/10 text-white placeholder:text-white/30 font-thai"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-navy/60 border-white/5">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-white/50 font-thai w-12">#</TableHead>
                <TableHead className="text-white/50 font-thai"><SortButton label="ชื่อเรื่อง" sk="titleTh" /></TableHead>
                <TableHead className="text-white/50 font-thai hidden md:table-cell"><SortButton label="ปี" sk="year" /></TableHead>
                <TableHead className="text-white/50 font-thai hidden md:table-cell"><SortButton label="จำนวนตอน" sk="episodes" /></TableHead>
                <TableHead className="text-white/50 font-thai hidden lg:table-cell">ช่อง</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((s, i) => (
                <TableRow key={s.id} className="border-white/[0.03] hover:bg-white/[0.02]">
                  <TableCell className="text-white/30 text-sm font-mono">{(page - 1) * PAGE_SIZE + i + 1}</TableCell>
                  <TableCell>
                    <p className="text-white text-sm font-thai font-medium">{s.titleTh}</p>
                    <p className="text-white/30 text-xs font-body">{s.titleEn}</p>
                  </TableCell>
                  <TableCell className="text-white/60 text-sm font-mono hidden md:table-cell">{s.year}</TableCell>
                  <TableCell className="text-white/60 text-sm font-mono hidden md:table-cell">{s.episodes} ตอน</TableCell>
                  <TableCell className="text-white/40 text-sm font-thai hidden lg:table-cell">{s.channel}</TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-white/30 font-thai">ไม่พบข้อมูล</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-sm font-thai">
            แสดง {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} จาก {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="text-white/40 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button key={p} variant="ghost" size="sm" onClick={() => setPage(p)} className={`w-8 h-8 text-xs font-mono ${p === page ? "bg-amber/20 text-amber" : "text-white/40 hover:text-white"}`}>
                {p}
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="text-white/40 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
