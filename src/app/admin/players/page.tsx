"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown, ChevronRight } from "lucide-react";
import Link from "next/link";

const PLAYERS = [
  { id: 1, name: "Ahmad Rizky", jersey: 7, pos: "SG", per: 24.6, shooting: 52, power: 3.85, distance: 32.4, attendance: 95, trend: "up" },
  { id: 2, name: "Budi Santoso", jersey: 14, pos: "PF", per: 22.1, shooting: 48, power: 4.12, distance: 28.1, attendance: 92, trend: "up" },
  { id: 3, name: "Cahyo Wibowo", jersey: 3, pos: "PG", per: 21.3, shooting: 45, power: 3.20, distance: 35.6, attendance: 100, trend: "stable" },
  { id: 4, name: "Dimas Pratama", jersey: 15, pos: "C", per: 19.8, shooting: 55, power: 4.50, distance: 22.3, attendance: 75, trend: "down" },
  { id: 5, name: "Eko Saputra", jersey: 11, pos: "SF", per: 18.5, shooting: 41, power: 3.65, distance: 30.2, attendance: 88, trend: "up" },
  { id: 6, name: "Fajar Nugroho", jersey: 22, pos: "PG", per: 17.2, shooting: 39, power: 3.10, distance: 38.0, attendance: 96, trend: "stable" },
  { id: 7, name: "Gilang Ramadan", jersey: 8, pos: "SG", per: 16.8, shooting: 43, power: 3.45, distance: 29.8, attendance: 90, trend: "down" },
  { id: 8, name: "Hendra Wijaya", jersey: 33, pos: "C", per: 15.5, shooting: 58, power: 4.80, distance: 18.5, attendance: 85, trend: "up" },
  { id: 9, name: "Irfan Hakim", jersey: 5, pos: "SF", per: 20.4, shooting: 46, power: 3.70, distance: 31.0, attendance: 98, trend: "up" },
  { id: 10, name: "Joko Susilo", jersey: 10, pos: "PG", per: 19.0, shooting: 42, power: 3.30, distance: 36.2, attendance: 100, trend: "stable" },
  { id: 11, name: "Kevin Putra", jersey: 24, pos: "PF", per: 17.8, shooting: 47, power: 4.25, distance: 25.4, attendance: 92, trend: "up" },
  { id: 12, name: "Lukman Harun", jersey: 1, pos: "SG", per: 16.2, shooting: 40, power: 3.55, distance: 27.8, attendance: 88, trend: "down" },
];

type SortKey = "per" | "shooting" | "power" | "distance" | "attendance";

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("per");
  const [filterPos, setFilterPos] = useState("");

  const filtered = PLAYERS
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => !filterPos || p.pos === filterPos)
    .sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-6 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Komparasi Pemain</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Bandingkan performa seluruh anggota tim</p>
      </header>

      {/* Filters */}
      <section className="mb-6 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input className="input-dark pl-10" placeholder="Cari pemain..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: "var(--text-muted)" }} />
          {["", "PG", "SG", "SF", "PF", "C"].map((pos) => (
            <button key={pos} className="px-3 py-2 rounded-lg text-xs font-medium transition-all" onClick={() => setFilterPos(pos)}
              style={{ background: filterPos === pos ? "var(--gold-muted)" : "var(--bg-elevated)", color: filterPos === pos ? "var(--gold)" : "var(--text-secondary)", border: `1px solid ${filterPos === pos ? "var(--border-gold)" : "transparent"}` }}>
              {pos || "All"}
            </button>
          ))}
        </div>
      </section>

      {/* Sort Tabs */}
      <section className="mb-4 flex gap-2 overflow-x-auto animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        {([["per", "PER"], ["shooting", "Shooting %"], ["power", "Power"], ["distance", "Endurance"], ["attendance", "Attendance"]] as [SortKey, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setSortKey(key)} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
            style={{ background: sortKey === key ? "var(--gold-muted)" : "transparent", color: sortKey === key ? "var(--gold)" : "var(--text-muted)", border: `1px solid ${sortKey === key ? "var(--border-gold)" : "var(--border-subtle)"}` }}>
            <ArrowUpDown size={10} /> {label}
          </button>
        ))}
      </section>

      {/* Players List */}
      <section className="space-y-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        {filtered.map((p, rank) => (
          <div key={p.id} className="glass-card p-4 flex items-center gap-4 hover:border-[var(--border-gold)] transition-all cursor-pointer">
            <div className="text-center w-8 flex-shrink-0">
              <span className="text-lg font-bold" style={{ color: rank < 3 ? "var(--gold)" : "var(--text-muted)" }}>{rank + 1}</span>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-dark))", color: "var(--bg-primary)" }}>
              {p.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold truncate">{p.name}</p>
                <span className="badge badge-gold text-[9px]">#{p.jersey}</span>
                <span className="badge badge-gold text-[9px]">{p.pos}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>PER: <strong style={{ color: "var(--gold)" }}>{p.per}</strong></span>
                <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>SHT: {p.shooting}%</span>
                <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>PWR: {p.power}x</span>
                <span className="text-[10px] font-mono hidden sm:inline" style={{ color: "var(--text-muted)" }}>RUN: {p.distance}km</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="hidden lg:block text-right">
                <div className="w-16 h-1.5 rounded-full" style={{ background: "var(--bg-elevated)" }}>
                  <div className="h-full rounded-full" style={{ width: `${p.attendance}%`, background: p.attendance >= 90 ? "var(--success)" : p.attendance >= 80 ? "var(--gold)" : "var(--danger)" }} />
                </div>
                <p className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>{p.attendance}% hadir</p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
