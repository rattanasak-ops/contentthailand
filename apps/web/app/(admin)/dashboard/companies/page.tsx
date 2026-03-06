"use client";

import { useState, useMemo } from "react";
import { Building2, Search, ChevronLeft, ChevronRight } from "lucide-react";
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
import { companies } from "@/lib/mock-data/companies";

const PAGE_SIZE = 10;

export default function CompaniesTablePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search) return companies;
    const q = search.toLowerCase();
    return companies.filter(
      (c) => c.nameTh.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-thai font-bold text-2xl text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-orange" />
          จัดการบริษัท
        </h1>
        <Badge variant="outline" className="text-white/40 border-white/10 font-thai">
          {companies.length} บริษัท
        </Badge>
      </div>

      <Card className="bg-navy/60 border-white/5">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="ค้นหาบริษัท..."
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
                <TableHead className="text-white/50 font-thai">ชื่อบริษัท</TableHead>
                <TableHead className="text-white/50 font-thai hidden md:table-cell">ประเภท</TableHead>
                <TableHead className="text-white/50 font-thai hidden lg:table-cell">ก่อตั้ง</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((c, i) => (
                <TableRow key={c.id} className="border-white/[0.03] hover:bg-white/[0.02]">
                  <TableCell className="text-white/30 text-sm font-mono">{(page - 1) * PAGE_SIZE + i + 1}</TableCell>
                  <TableCell>
                    <p className="text-white text-sm font-thai font-medium">{c.nameTh}</p>
                    <p className="text-white/30 text-xs font-body">{c.nameEn}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-[10px] font-thai bg-purple/10 text-purple-light border-purple/20">
                      {c.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/60 text-sm font-mono hidden lg:table-cell">
                    {c.founded || "-"}
                  </TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-white/30 font-thai">ไม่พบข้อมูล</TableCell>
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <Button key={pg} variant="ghost" size="sm" onClick={() => setPage(pg)} className={`w-8 h-8 text-xs font-mono ${pg === page ? "bg-amber/20 text-amber" : "text-white/40 hover:text-white"}`}>
                {pg}
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
