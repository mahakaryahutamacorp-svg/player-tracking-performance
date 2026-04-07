"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, CalendarCheck, Activity } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/players", label: "Pemain", icon: Users },
  { href: "/admin/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/admin/attendance", label: "Absensi", icon: CalendarCheck },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-secondary)" }}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-dark))" }}>
            <Activity size={20} color="#0A0A0F" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-sm font-bold">Player Tracking</h1>
            <p className="text-[10px]" style={{ color: "var(--gold)" }}>Master Admin</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "" : ""}`}
                style={{ background: isActive ? "var(--gold-muted)" : "transparent", color: isActive ? "var(--gold)" : "var(--text-secondary)" }}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mx-3 mb-4 rounded-xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
          <p className="text-xs font-semibold mb-1">Coach Mode</p>
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Akses penuh ke seluruh data tim</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-secondary)" }}>
          <div className="flex items-center gap-2">
            <Activity size={20} style={{ color: "var(--gold)" }} />
            <span className="text-sm font-bold">Admin</span>
          </div>
          <span className="badge badge-gold">Coach</span>
        </header>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2" style={{ background: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border-subtle)" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-3 py-1" style={{ color: isActive ? "var(--gold)" : "var(--text-muted)" }}>
                <Icon size={18} />
                <span className="text-[9px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
