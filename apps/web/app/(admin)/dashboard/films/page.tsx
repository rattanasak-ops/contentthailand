"use client";

import { useState, useMemo } from "react";
import { Film, Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { films } from "@/lib/mock-data/films";
import type { Film as FilmType } from "@/types";

type SortKey = "titleTh" | "year" | "viewCount" | "status";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 10;

const statusColor: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  draft: "bg-amber/10 text-amber border-amber/20",
  archived: "bg-white/5 text-white/40 border-white/10",
};

const statusLabel: Record<string, string> = {
  published: "เผยแพร่",
  draft: "แบบร่าง",
  archived: "เก็บถาวร",
};

export default function FilmsTablePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [editFilm, setEditFilm] = useState<FilmType | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editTitleEn, setEditTitleEn] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editStatus, setEditStatus] = useState<string>("published");

  const filtered = useMemo(() => {
    let result = [...films];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.titleTh.toLowerCase().includes(q) ||
          f.titleEn.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((f) => f.status === statusFilter);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "titleTh") cmp = a.titleTh.localeCompare(b.titleTh, "th");
      else if (sortKey === "year") cmp = a.year - b.year;
      else if (sortKey === "viewCount") cmp = a.viewCount - b.viewCount;
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  };

  const openEdit = (film: FilmType) => {
    setEditFilm(film);
    setEditTitle(film.titleTh);
    setEditTitleEn(film.titleEn);
    setEditYear(String(film.year));
    setEditStatus(film.status);
  };

  const handleSave = () => {
    toast.success("บันทึกสำเร็จ", {
      description: `อัปเดตข้อมูล "${editTitle}" เรียบร้อยแล้ว`,
    });
    setEditFilm(null);
  };

  const SortButton = ({ label, sortKey: sk }: { label: string; sortKey: SortKey }) => (
    <button
      onClick={() => handleSort(sk)}
      className="flex items-center gap-1 hover:text-white transition-colors"
    >
      {label}
      <ArrowUpDown className={`w-3 h-3 ${sortKey === sk ? "text-amber" : ""}`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-thai font-bold text-2xl text-white flex items-center gap-2">
          <Film className="w-6 h-6 text-pink" />
          จัดการภาพยนตร์
        </h1>
        <Badge variant="outline" className="text-white/40 border-white/10 font-thai">
          {films.length} รายการ
        </Badge>
      </div>

      {/* Filters */}
      <Card className="bg-navy/60 border-white/5">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                placeholder="ค้นหาภาพยนตร์..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 bg-midnight/50 border-white/10 text-white placeholder:text-white/30 font-thai"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-40 bg-midnight/50 border-white/10 text-white font-thai">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-navy border-white/10">
                <SelectItem value="all" className="text-white font-thai">ทุกสถานะ</SelectItem>
                <SelectItem value="published" className="text-white font-thai">เผยแพร่</SelectItem>
                <SelectItem value="draft" className="text-white font-thai">แบบร่าง</SelectItem>
                <SelectItem value="archived" className="text-white font-thai">เก็บถาวร</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-navy/60 border-white/5">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-white/50 font-thai w-12">#</TableHead>
                <TableHead className="text-white/50 font-thai">
                  <SortButton label="ชื่อภาพยนตร์" sortKey="titleTh" />
                </TableHead>
                <TableHead className="text-white/50 font-thai hidden md:table-cell">
                  <SortButton label="ปี" sortKey="year" />
                </TableHead>
                <TableHead className="text-white/50 font-thai hidden lg:table-cell">
                  <SortButton label="ยอดชม" sortKey="viewCount" />
                </TableHead>
                <TableHead className="text-white/50 font-thai">
                  <SortButton label="สถานะ" sortKey="status" />
                </TableHead>
                <TableHead className="text-white/50 font-thai text-right">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((film, i) => (
                <TableRow key={film.id} className="border-white/[0.03] hover:bg-white/[0.02]">
                  <TableCell className="text-white/30 text-sm font-mono">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white text-sm font-thai font-medium">{film.titleTh}</p>
                      <p className="text-white/30 text-xs font-body">{film.titleEn}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/60 text-sm font-mono hidden md:table-cell">
                    {film.year}
                  </TableCell>
                  <TableCell className="text-white/60 text-sm font-mono hidden lg:table-cell">
                    {film.viewCount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] font-thai ${statusColor[film.status]}`}>
                      {statusLabel[film.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(film)}
                      className="text-amber/70 hover:text-amber hover:bg-amber/10 font-thai text-xs"
                    >
                      แก้ไข
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-white/30 font-thai">
                    ไม่พบข้อมูล
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-sm font-thai">
            แสดง {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} จาก {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-white/40 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant="ghost"
                size="sm"
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-xs font-mono ${
                  p === page ? "bg-amber/20 text-amber" : "text-white/40 hover:text-white"
                }`}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-white/40 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Edit Sheet */}
      <Sheet open={!!editFilm} onOpenChange={(open) => !open && setEditFilm(null)}>
        <SheetContent className="bg-navy border-white/5 text-white w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white font-thai flex items-center gap-2">
              <Film className="w-5 h-5 text-pink" />
              แก้ไขภาพยนตร์
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-5 mt-6">
            <div>
              <label className="text-white/50 text-xs font-thai block mb-1.5">ชื่อภาษาไทย</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-midnight/50 border-white/10 text-white font-thai"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs font-thai block mb-1.5">ชื่อภาษาอังกฤษ</label>
              <Input
                value={editTitleEn}
                onChange={(e) => setEditTitleEn(e.target.value)}
                className="bg-midnight/50 border-white/10 text-white font-body"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs font-thai block mb-1.5">ปี พ.ศ.</label>
              <Input
                value={editYear}
                onChange={(e) => setEditYear(e.target.value)}
                className="bg-midnight/50 border-white/10 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs font-thai block mb-1.5">สถานะ</label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger className="bg-midnight/50 border-white/10 text-white font-thai">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy border-white/10">
                  <SelectItem value="published" className="text-white font-thai">เผยแพร่</SelectItem>
                  <SelectItem value="draft" className="text-white font-thai">แบบร่าง</SelectItem>
                  <SelectItem value="archived" className="text-white font-thai">เก็บถาวร</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {editFilm && (
              <div className="pt-2 space-y-2">
                <p className="text-white/30 text-xs font-thai">
                  สร้างเมื่อ: {editFilm.createdAt}
                </p>
                <p className="text-white/30 text-xs font-thai">
                  แก้ไขล่าสุด: {editFilm.updatedAt}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-amber hover:bg-amber/80 text-midnight font-thai font-semibold"
              >
                บันทึก
              </Button>
              <Button
                variant="ghost"
                onClick={() => setEditFilm(null)}
                className="text-white/50 hover:text-white font-thai"
              >
                ยกเลิก
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
