"use client";

import { useState } from "react";
import { ScrollText, Search, Download } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface LogEntry {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  entityType: string;
  ip: string;
  status: "success" | "error";
}

const mockLogs: LogEntry[] = [
  { id: 1, timestamp: "2026-03-05 10:30:15", user: "Admin", action: "CREATE", entity: "หลานม่า", entityType: "film", ip: "192.168.1.100", status: "success" },
  { id: 2, timestamp: "2026-03-05 10:25:42", user: "Editor1", action: "UPDATE", entity: "พจน์ อานนท์", entityType: "person", ip: "192.168.1.101", status: "success" },
  { id: 3, timestamp: "2026-03-05 09:45:10", user: "Admin", action: "CREATE", entity: "มาตาลดา", entityType: "series", ip: "192.168.1.100", status: "success" },
  { id: 4, timestamp: "2026-03-05 09:30:00", user: "Admin", action: "DELETE", entity: "ข่าวเก่า 2023", entityType: "news", ip: "192.168.1.100", status: "success" },
  { id: 5, timestamp: "2026-03-05 08:15:33", user: "Editor2", action: "UPDATE", entity: "GDH 559", entityType: "company", ip: "192.168.1.102", status: "success" },
  { id: 6, timestamp: "2026-03-04 18:20:00", user: "Admin", action: "CREATE", entity: "สัปเหร่อ", entityType: "film", ip: "192.168.1.100", status: "success" },
  { id: 7, timestamp: "2026-03-04 17:10:22", user: "Editor1", action: "UPDATE", entity: "สยองขวัญ", entityType: "genre", ip: "192.168.1.101", status: "success" },
  { id: 8, timestamp: "2026-03-04 16:00:45", user: "Editor2", action: "CREATE", entity: "มิว-นิษฐา", entityType: "person", ip: "192.168.1.102", status: "success" },
  { id: 9, timestamp: "2026-03-04 14:30:11", user: "Admin", action: "CREATE", entity: "รางวัลสุพรรณหงส์ 2568", entityType: "news", ip: "192.168.1.100", status: "success" },
  { id: 10, timestamp: "2026-03-04 12:45:55", user: "Editor1", action: "UPDATE", entity: "ร่างทรง", entityType: "film", ip: "192.168.1.101", status: "success" },
  { id: 11, timestamp: "2026-03-04 10:00:00", user: "System", action: "BACKUP", entity: "Database", entityType: "system", ip: "127.0.0.1", status: "success" },
  { id: 12, timestamp: "2026-03-03 22:00:00", user: "System", action: "BACKUP", entity: "Media Files", entityType: "system", ip: "127.0.0.1", status: "error" },
  { id: 13, timestamp: "2026-03-03 15:30:00", user: "Admin", action: "LOGIN", entity: "-", entityType: "auth", ip: "192.168.1.100", status: "success" },
  { id: 14, timestamp: "2026-03-03 14:20:00", user: "Editor2", action: "LOGIN", entity: "-", entityType: "auth", ip: "192.168.1.102", status: "success" },
  { id: 15, timestamp: "2026-03-03 09:00:00", user: "System", action: "REINDEX", entity: "Search Index", entityType: "system", ip: "127.0.0.1", status: "success" },
];

const actionColor: Record<string, string> = {
  CREATE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  UPDATE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
  LOGIN: "bg-purple/10 text-purple-light border-purple/20",
  BACKUP: "bg-amber/10 text-amber border-amber/20",
  REINDEX: "bg-orange/10 text-orange border-orange/20",
};

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filtered = mockLogs.filter((log) => {
    const matchSearch =
      !search ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === "all" || log.action === actionFilter;
    return matchSearch && matchAction;
  });

  const handleExport = () => {
    toast.success("ส่งออกสำเร็จ", { description: "ดาวน์โหลดไฟล์ activity_log.csv" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-thai font-bold text-2xl text-white flex items-center gap-2">
          <ScrollText className="w-6 h-6 text-orange" />
          บันทึกกิจกรรม
        </h1>
        <Button variant="outline" onClick={handleExport} className="border-white/10 text-white/60 hover:text-white font-thai">
          <Download className="w-4 h-4 mr-1" />
          Export CSV
        </Button>
      </div>

      <Card className="bg-navy/60 border-white/5">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                placeholder="ค้นหาผู้ใช้หรือรายการ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-midnight/50 border-white/10 text-white placeholder:text-white/30 font-thai"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-midnight/50 border-white/10 text-white font-thai">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-navy border-white/10">
                <SelectItem value="all" className="text-white font-thai">ทุกประเภท</SelectItem>
                <SelectItem value="CREATE" className="text-white font-thai">CREATE</SelectItem>
                <SelectItem value="UPDATE" className="text-white font-thai">UPDATE</SelectItem>
                <SelectItem value="DELETE" className="text-white font-thai">DELETE</SelectItem>
                <SelectItem value="LOGIN" className="text-white font-thai">LOGIN</SelectItem>
                <SelectItem value="BACKUP" className="text-white font-thai">BACKUP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-navy/60 border-white/5">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-white/50 font-thai">เวลา</TableHead>
                <TableHead className="text-white/50 font-thai">ผู้ใช้</TableHead>
                <TableHead className="text-white/50 font-thai">Action</TableHead>
                <TableHead className="text-white/50 font-thai hidden md:table-cell">รายการ</TableHead>
                <TableHead className="text-white/50 font-thai hidden lg:table-cell">IP</TableHead>
                <TableHead className="text-white/50 font-thai">สถานะ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id} className="border-white/[0.03] hover:bg-white/[0.02]">
                  <TableCell className="text-white/50 text-xs font-mono">{log.timestamp}</TableCell>
                  <TableCell className="text-white text-sm font-thai">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] font-mono ${actionColor[log.action] || ""}`}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/60 text-sm font-thai hidden md:table-cell">{log.entity}</TableCell>
                  <TableCell className="text-white/30 text-xs font-mono hidden lg:table-cell">{log.ip}</TableCell>
                  <TableCell>
                    <div className={`w-2 h-2 rounded-full ${log.status === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
