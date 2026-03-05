"use client";

import { Film, Tv, Users, Building2, TrendingUp, TrendingDown, Eye, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const stats = [
  { label: "Films", value: 562, change: +12, icon: Film, color: "pink" },
  { label: "Series", value: 737, change: +8, icon: Tv, color: "orange" },
  { label: "Personnel", value: 5888, change: +45, icon: Users, color: "purple" },
  { label: "Companies", value: 312, change: +3, icon: Building2, color: "amber" },
];

const monthlyVisitors = [
  { month: "ก.ย.", visitors: 42000 },
  { month: "ต.ค.", visitors: 48000 },
  { month: "พ.ย.", visitors: 55000 },
  { month: "ธ.ค.", visitors: 62000 },
  { month: "ม.ค.", visitors: 71000 },
  { month: "ก.พ.", visitors: 68000 },
  { month: "มี.ค.", visitors: 85000 },
  { month: "เม.ย.", visitors: 92000 },
  { month: "พ.ค.", visitors: 105000 },
  { month: "มิ.ย.", visitors: 98000 },
  { month: "ก.ค.", visitors: 115000 },
  { month: "ส.ค.", visitors: 125000 },
];

const contentBreakdown = [
  { name: "ภาพยนตร์", value: 562, color: "#EC1C72" },
  { name: "ละคร/ซีรีส์", value: 737, color: "#F76532" },
  { name: "บุคลากร", value: 5888, color: "#702874" },
  { name: "บริษัท", value: 312, color: "#F6A51B" },
];

const activities = [
  { action: "เพิ่มภาพยนตร์ใหม่", target: "หลานม่า", user: "Admin", time: "5 นาทีที่แล้ว", type: "create" },
  { action: "แก้ไขข้อมูลบุคลากร", target: "พจน์ อานนท์", user: "Editor1", time: "12 นาทีที่แล้ว", type: "edit" },
  { action: "เพิ่มซีรีส์ใหม่", target: "มาตาลดา", user: "Admin", time: "1 ชม. ที่แล้ว", type: "create" },
  { action: "ลบข่าว", target: "ข่าวเก่า 2023", user: "Admin", time: "2 ชม. ที่แล้ว", type: "delete" },
  { action: "อัปเดตข้อมูลบริษัท", target: "GDH 559", user: "Editor2", time: "3 ชม. ที่แล้ว", type: "edit" },
  { action: "เพิ่มภาพยนตร์ใหม่", target: "สัปเหร่อ", user: "Admin", time: "4 ชม. ที่แล้ว", type: "create" },
  { action: "แก้ไขประเภท", target: "สยองขวัญ", user: "Editor1", time: "5 ชม. ที่แล้ว", type: "edit" },
  { action: "เพิ่มบุคลากร", target: "มิว-นิษฐา", user: "Editor2", time: "6 ชม. ที่แล้ว", type: "create" },
  { action: "เผยแพร่ข่าว", target: "รางวัลสุพรรณหงส์ 2568", user: "Admin", time: "8 ชม. ที่แล้ว", type: "create" },
  { action: "แก้ไขภาพยนตร์", target: "ร่างทรง", user: "Editor1", time: "1 วันที่แล้ว", type: "edit" },
];

const systemStatus = [
  { name: "API Server", status: "online", uptime: "99.9%" },
  { name: "Database", status: "online", uptime: "99.8%" },
  { name: "CDN / Media", status: "online", uptime: "100%" },
  { name: "Search Index", status: "online", uptime: "99.7%" },
];

const colorMap: Record<string, string> = {
  pink: "bg-pink/10 text-pink",
  orange: "bg-orange/10 text-orange",
  purple: "bg-purple/10 text-purple-light",
  amber: "bg-amber/10 text-amber",
};

const bgMap: Record<string, string> = {
  pink: "from-pink/20 to-pink/5",
  orange: "from-orange/20 to-orange/5",
  purple: "from-purple/20 to-purple/5",
  amber: "from-amber/20 to-amber/5",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-thai font-bold text-2xl text-white">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-navy/60 border-white/5">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/40 text-xs font-thai mb-1">{s.label}</p>
                  <p className="text-white font-display text-2xl font-bold">
                    {s.value.toLocaleString()}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bgMap[s.color]} flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${colorMap[s.color].split(" ")[1]}`} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {s.change > 0 ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                )}
                <span className={`text-xs font-thai ${s.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  +{s.change} เดือนนี้
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Line chart */}
        <Card className="bg-navy/60 border-white/5 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white font-thai text-base flex items-center gap-2">
              <Eye className="w-4 h-4 text-pink" />
              ผู้เข้าชมรายเดือน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyVisitors}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#1C1B4E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 12 }}
                    formatter={(value: number) => [value.toLocaleString(), "ผู้เข้าชม"]}
                  />
                  <Line type="monotone" dataKey="visitors" stroke="#EC1C72" strokeWidth={2.5} dot={{ r: 3, fill: "#EC1C72" }} activeDot={{ r: 5, fill: "#EC1C72" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Donut chart */}
        <Card className="bg-navy/60 border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-white font-thai text-base">สัดส่วนเนื้อหา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentBreakdown}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {contentBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    formatter={(value) => <span className="text-white/60 text-xs font-thai">{value}</span>}
                  />
                  <Tooltip
                    contentStyle={{ background: "#1C1B4E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 12 }}
                    formatter={(value: number) => [value.toLocaleString(), "รายการ"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity feed + System status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity feed */}
        <Card className="bg-navy/60 border-white/5 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white font-thai text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange" />
              กิจกรรมล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    a.type === "create" ? "bg-emerald-400" : a.type === "edit" ? "bg-amber" : "bg-red-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-sm font-thai">
                      <span className="text-white/90 font-semibold">{a.user}</span>{" "}
                      {a.action}{" "}
                      <span className="text-amber">{a.target}</span>
                    </p>
                  </div>
                  <span className="text-white/30 text-xs font-thai flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System status */}
        <Card className="bg-navy/60 border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-white font-thai text-base">สถานะระบบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      s.status === "online" ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" : "bg-red-400"
                    }`} />
                    <span className="text-white/70 text-sm font-body">{s.name}</span>
                  </div>
                  <Badge variant="outline" className="text-emerald-400 border-emerald-400/20 text-[10px]">
                    {s.uptime}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-white/30 text-xs font-thai">อัปเดตล่าสุด: 5 มี.ค. 2569 10:30</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
