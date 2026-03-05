"use client";

import { useState } from "react";
import { Users, Plus, Search } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface MockUser {
  id: number;
  name: string;
  email: string;
  role: "super_admin" | "editor" | "viewer";
  lastLogin: string;
  status: "active" | "inactive";
}

const mockUsers: MockUser[] = [
  { id: 1, name: "สมชาย ผู้ดูแล", email: "admin@contentthailand.com", role: "super_admin", lastLogin: "2026-03-05 10:30", status: "active" },
  { id: 2, name: "สมหญิง บรรณาธิการ", email: "editor1@contentthailand.com", role: "editor", lastLogin: "2026-03-05 09:15", status: "active" },
  { id: 3, name: "วิชัย แก้ไข", email: "editor2@contentthailand.com", role: "editor", lastLogin: "2026-03-04 16:45", status: "active" },
  { id: 4, name: "นภา ดูข้อมูล", email: "viewer1@contentthailand.com", role: "viewer", lastLogin: "2026-03-03 11:20", status: "active" },
  { id: 5, name: "ประเสริฐ ตรวจสอบ", email: "viewer2@contentthailand.com", role: "viewer", lastLogin: "2026-02-28 14:00", status: "inactive" },
  { id: 6, name: "อรุณ จัดการ", email: "editor3@contentthailand.com", role: "editor", lastLogin: "2026-03-05 08:00", status: "active" },
];

const roleConfig: Record<string, { label: string; className: string }> = {
  super_admin: { label: "Super Admin", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  editor: { label: "Editor", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  viewer: { label: "Viewer", className: "bg-white/5 text-white/40 border-white/10" },
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("editor");

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    toast.success("เพิ่มผู้ใช้สำเร็จ", { description: `เพิ่ม ${newName} เรียบร้อยแล้ว` });
    setDialogOpen(false);
    setNewName("");
    setNewEmail("");
    setNewRole("editor");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-thai font-bold text-2xl text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-light" />
          จัดการผู้ใช้งาน
        </h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber hover:bg-amber/80 text-midnight font-thai font-semibold">
              <Plus className="w-4 h-4 mr-1" />
              เพิ่มผู้ใช้
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-navy border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="font-thai">เพิ่มผู้ใช้ใหม่</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-white/50 text-xs font-thai block mb-1.5">ชื่อ</label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="bg-midnight/50 border-white/10 text-white font-thai" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-thai block mb-1.5">อีเมล</label>
                <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="bg-midnight/50 border-white/10 text-white font-body" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-thai block mb-1.5">บทบาท</label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger className="bg-midnight/50 border-white/10 text-white font-thai">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-navy border-white/10">
                    <SelectItem value="super_admin" className="text-white font-thai">Super Admin</SelectItem>
                    <SelectItem value="editor" className="text-white font-thai">Editor</SelectItem>
                    <SelectItem value="viewer" className="text-white font-thai">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddUser} className="w-full bg-amber hover:bg-amber/80 text-midnight font-thai font-semibold">
                เพิ่มผู้ใช้
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-navy/60 border-white/5">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="ค้นหาผู้ใช้..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                <TableHead className="text-white/50 font-thai">ชื่อ</TableHead>
                <TableHead className="text-white/50 font-thai hidden md:table-cell">อีเมล</TableHead>
                <TableHead className="text-white/50 font-thai">บทบาท</TableHead>
                <TableHead className="text-white/50 font-thai hidden lg:table-cell">เข้าสู่ระบบล่าสุด</TableHead>
                <TableHead className="text-white/50 font-thai">สถานะ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} className="border-white/[0.03] hover:bg-white/[0.02]">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
                      </div>
                      <span className="text-white text-sm font-thai">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/50 text-sm font-body hidden md:table-cell">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] font-mono ${roleConfig[user.role].className}`}>
                      {roleConfig[user.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/40 text-xs font-mono hidden lg:table-cell">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-emerald-400" : "bg-white/20"}`} />
                      <span className={`text-xs font-thai ${user.status === "active" ? "text-emerald-400" : "text-white/30"}`}>
                        {user.status === "active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                      </span>
                    </div>
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
