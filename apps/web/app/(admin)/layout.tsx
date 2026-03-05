"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Tv,
  Users,
  Building2,
  Newspaper,
  ScrollText,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/films", label: "Films", icon: Film },
  { href: "/dashboard/series", label: "Series", icon: Tv },
  { href: "/dashboard/persons", label: "Personnel", icon: Users },
  { href: "/dashboard/companies", label: "Companies", icon: Building2 },
  { href: "/dashboard/news", label: "News", icon: Newspaper },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/logs", label: "Logs", icon: ScrollText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const sidebar = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink to-orange flex items-center justify-center">
            <Film className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-white font-bold text-lg">
            CT<span className="text-amber">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-thai transition-all relative ${
                active
                  ? "bg-amber/10 text-amber font-semibold"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-amber rounded-r" />
              )}
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-purple/30 flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Admin</p>
            <p className="text-white/30 text-[10px] truncate">admin@contentthailand.com</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-white/30 hover:text-white/60 text-xs font-thai transition-colors mt-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          Back to Site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 bg-navy border-r border-white/5 fixed inset-y-0 left-0 z-30">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-navy border-r border-white/5 z-50 transform transition-transform md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white/40 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebar}
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Top bar */}
        <header className="h-16 bg-navy/60 border-b border-white/5 flex items-center px-4 md:px-6 sticky top-0 z-20 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-white/60 hover:text-white mr-3"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-white/80 font-thai text-sm font-semibold">
            ContentThailand Admin
          </h2>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
