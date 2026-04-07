"use client";

import { User, ChevronLeft, Mail, Ruler, Weight, Award, Calendar, LogOut, Settings, Shield } from "lucide-react";
import PlayerRadarChart from "@/components/charts/PlayerRadarChart";
import type { RadarMetric } from "@/types";

const PLAYER = {
  full_name: "Ahmad Rizky", email: "ahmad.rizky@timnas.id", jersey_number: 7,
  position: "Shooting Guard", height_cm: 188, weight_kg: 82, role: "player", created_at: "2024-01-15",
};

const RADAR: RadarMetric[] = [
  { category: "Shooting", value: 78, fullMark: 100 }, { category: "Power", value: 65, fullMark: 100 },
  { category: "Endurance", value: 82, fullMark: 100 }, { category: "Efficiency", value: 71, fullMark: 100 },
  { category: "Defense", value: 58, fullMark: 100 }, { category: "Discipline", value: 90, fullMark: 100 },
];

const ACHIEVEMENTS = [
  { label: "Streak Terbaik", value: "18 hari" }, { label: "Total Latihan", value: "142 sesi" },
  { label: "Best Shooting", value: "68%" }, { label: "Total Jarak Lari", value: "286 km" },
];

export default function ProfilePage() {
  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <header className="mb-6 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => window.history.back()} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Profil</h1>
        </div>
      </header>

      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="glass-card gold-border p-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold gold-glow-strong" style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-dark))", color: "var(--bg-primary)" }}>
              {PLAYER.full_name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--bg-primary)", border: "2px solid var(--gold)" }}>
              <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>#{PLAYER.jersey_number}</span>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-1">{PLAYER.full_name}</h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="badge badge-gold">{PLAYER.position}</span>
            <span className="badge badge-gold"><Shield size={10} /> Tim Nasional</span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{PLAYER.email}</p>
        </div>
      </section>

      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="grid grid-cols-2 gap-3">
          {[{ icon: Ruler, label: "Tinggi", value: `${PLAYER.height_cm} cm` }, { icon: Weight, label: "Berat", value: `${PLAYER.weight_kg} kg` }].map((s) => {
            const Icon = s.icon;
            return (<div key={s.label} className="glass-card p-4 text-center"><Icon size={18} className="mx-auto mb-2" style={{ color: "var(--gold)" }} /><p className="stat-value text-lg">{s.value}</p><p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</p></div>);
          })}
        </div>
      </section>

      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-secondary)" }}>Pencapaian</h2>
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((a) => (<div key={a.label} className="glass-card p-3"><div className="flex items-center gap-2 mb-1"><Award size={14} style={{ color: "var(--gold)" }} /><p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>{a.label}</p></div><p className="stat-value text-base">{a.value}</p></div>))}
        </div>
      </section>

      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <PlayerRadarChart data={RADAR} />
      </section>

      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-secondary)" }}>Informasi Akun</h2>
        <div className="space-y-2">
          {[{ icon: Mail, label: "Email", value: PLAYER.email }, { icon: User, label: "Role", value: "PLAYER" }, { icon: Calendar, label: "Bergabung", value: "15 Januari 2024" }].map((info) => {
            const Icon = info.icon;
            return (<div key={info.label} className="glass-card p-3 flex items-center gap-3"><Icon size={16} style={{ color: "var(--text-muted)" }} /><div className="flex-1"><p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{info.label}</p><p className="text-xs font-medium">{info.value}</p></div></div>);
          })}
        </div>
      </section>

      <section className="mb-8 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
        <div className="space-y-2">
          <button className="btn-ghost w-full flex items-center justify-center gap-2 py-3"><Settings size={16} /> Pengaturan</button>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium" style={{ background: "rgba(255,71,87,0.1)", color: "var(--danger)", border: "1px solid rgba(255,71,87,0.2)" }}><LogOut size={16} /> Keluar</button>
        </div>
      </section>
    </div>
  );
}
