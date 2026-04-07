"use client";

import { Users, Target, Route, Zap, TrendingUp, Calendar, Award } from "lucide-react";
import PlayerRadarChart from "@/components/charts/PlayerRadarChart";
import ShootingChart from "@/components/charts/ShootingChart";

const TEAM_STATS = [
  { label: "Total Pemain", value: "12", icon: Users, change: 0 },
  { label: "Avg Shooting", value: "44.2%", icon: Target, change: 3.1 },
  { label: "Avg Distance/Week", value: "28.6 km", icon: Route, change: 5.4 },
  { label: "Team Avg PER", value: "18.7", icon: Zap, change: 2.8 },
];

const TOP_PLAYERS = [
  { name: "Ahmad Rizky", pos: "SG", jersey: 7, per: 24.6, shooting: "52%", status: "active" },
  { name: "Budi Santoso", pos: "PF", jersey: 14, per: 22.1, shooting: "48%", status: "active" },
  { name: "Cahyo Wibowo", pos: "PG", jersey: 3, per: 21.3, shooting: "45%", status: "active" },
  { name: "Dimas Pratama", pos: "C", jersey: 15, per: 19.8, shooting: "55%", status: "injured" },
  { name: "Eko Saputra", pos: "SF", jersey: 11, per: 18.5, shooting: "41%", status: "active" },
];

const TEAM_RADAR = [
  { category: "Shooting", value: 72, fullMark: 100 }, { category: "Power", value: 68, fullMark: 100 },
  { category: "Endurance", value: 75, fullMark: 100 }, { category: "Efficiency", value: 65, fullMark: 100 },
  { category: "Defense", value: 60, fullMark: 100 }, { category: "Discipline", value: 85, fullMark: 100 },
];

const TEAM_SHOOTING = [
  { day: "Sen", made: 540, total: 1200, percentage: 45 }, { day: "Sel", made: 504, total: 1200, percentage: 42 },
  { day: "Rab", made: 564, total: 1200, percentage: 47 }, { day: "Kam", made: 528, total: 1200, percentage: 44 },
  { day: "Jum", made: 576, total: 1200, percentage: 48 }, { day: "Sab", made: 552, total: 1200, percentage: 46 },
  { day: "Min", made: 540, total: 1200, percentage: 45 },
];

const ATTENDANCE = [
  { date: "07 Apr", present: 11, absent: 1, rate: "92%" },
  { date: "06 Apr", present: 12, absent: 0, rate: "100%" },
  { date: "05 Apr", present: 10, absent: 2, rate: "83%" },
  { date: "04 Apr", present: 12, absent: 0, rate: "100%" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboard Tim</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Ringkasan performa Tim Nasional Basket</p>
      </header>

      {/* Team Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        {TEAM_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card gold-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gold-muted)", color: "var(--gold)" }}>
                  <Icon size={18} />
                </div>
                {stat.change > 0 && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: "var(--success)" }}>
                    <TrendingUp size={12} /> +{stat.change}%
                  </div>
                )}
              </div>
              <p className="stat-value text-2xl mb-1">{stat.value}</p>
              <p className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
            </div>
          );
        })}
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <PlayerRadarChart data={TEAM_RADAR} />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "250ms" }}>
          <ShootingChart data={TEAM_SHOOTING} mode="composed" />
        </div>
      </section>

      {/* Top Players Table */}
      <section className="mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <div className="glass-card gold-border p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award size={18} style={{ color: "var(--gold)" }} />
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Top Performers</h2>
            </div>
            <span className="badge badge-gold">This Week</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  {["#", "Pemain", "Pos", "PER", "Shooting", "Status"].map((h) => (
                    <th key={h} className="pb-3 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_PLAYERS.map((p, i) => (
                  <tr key={i} className="transition-colors" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td className="py-3 text-sm font-bold" style={{ color: "var(--gold)" }}>#{p.jersey}</td>
                    <td className="py-3 text-sm font-medium">{p.name}</td>
                    <td className="py-3"><span className="badge badge-gold">{p.pos}</span></td>
                    <td className="py-3 text-sm font-mono font-semibold" style={{ color: p.per >= 20 ? "var(--gold)" : "var(--text-primary)" }}>{p.per}</td>
                    <td className="py-3 text-sm font-mono">{p.shooting}</td>
                    <td className="py-3">
                      <span className={`badge ${p.status === "active" ? "badge-success" : "badge-danger"}`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Attendance Summary */}
      <section className="mb-8 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
        <div className="glass-card p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} style={{ color: "var(--gold)" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Kehadiran Terbaru</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {ATTENDANCE.map((a) => (
              <div key={a.date} className="p-3 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>{a.date}</p>
                <p className="stat-value text-xl">{a.rate}</p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{a.present} hadir • {a.absent} absen</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
