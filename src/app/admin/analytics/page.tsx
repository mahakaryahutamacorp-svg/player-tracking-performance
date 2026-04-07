"use client";

import { BarChart3, TrendingUp, Target, Dumbbell, Route, PieChart } from "lucide-react";
import ShootingChart from "@/components/charts/ShootingChart";
import PerformanceLine from "@/components/charts/PerformanceLine";

const DEMO_TEAM_PER = [
  { game: "G1", per: 15.2 }, { game: "G2", per: 16.8 }, { game: "G3", per: 17.4 },
  { game: "G4", per: 16.1 }, { game: "G5", per: 18.6 }, { game: "G6", per: 17.3 }, { game: "G7", per: 18.2 },
];

const DEMO_SHOOTING_CORRELATION = [
  { day: "Sen", percentage: 42, made: 42, total: 100 }, 
  { day: "Sel", percentage: 40, made: 40, total: 100 }, 
  { day: "Rab", percentage: 48, made: 48, total: 100 },
  { day: "Kam", percentage: 45, made: 45, total: 100 }, 
  { day: "Jum", percentage: 52, made: 52, total: 100 }, 
  { day: "Sab", percentage: 50, made: 50, total: 100 }, 
  { day: "Min", percentage: 49, made: 49, total: 100 },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Analitik Mendalam</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Analisis data komprehensif seluruh tim dan korelasi performa</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Statistics Overview Card */}
        <div className="lg:col-span-2 glass-card gold-border p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} style={{ color: "var(--gold)" }} />
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Tren Efisiensi Tim</h2>
            </div>
            <div className="flex items-center gap-1 text-xs" style={{ color: "var(--success)" }}>
              <TrendingUp size={14} /> +12.4% vs Bulan Lalu
            </div>
          </div>
          <PerformanceLine data={DEMO_TEAM_PER} />
        </div>

        {/* Insight Card */}
        <div className="glass-card p-6 flex flex-col animate-fade-in-up" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={18} style={{ color: "var(--gold)" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Insight Pelatih</h2>
          </div>
          <div className="space-y-4 flex-1">
            <div className="p-3 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--gold)" }}>Shooting vs Win Rate</p>
              <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Peningkatan 5% dalam akurasi 3PT berkolerasi dengan 15% kenaikan margin skor.</p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--gold)" }}>Efek Fatigue</p>
              <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Pemain dengan jarak lari &gt; 8km per hari menunjukkan penurunan akurasi shooting di kuarter ke-4.</p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--gold)" }}>Top Synergy</p>
              <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Rizky (SG) dan Wibowo (PG) memiliki net rating tertinggi saat bermain bersama (+18.4).</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-2 mb-4 ml-2">
            <Target size={16} style={{ color: "var(--gold)" }} />
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Distribusi Shooting Tim</h3>
          </div>
          <ShootingChart data={DEMO_SHOOTING_CORRELATION} mode="bar" />
        </div>
        <div className="glass-card gold-border p-6 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-6" style={{ color: "var(--text-secondary)" }}>Metrik Fisik Rata-rata</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[10px] mb-2">
                <span className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}><Dumbbell size={10} /> Bench Press</span>
                <span style={{ color: "var(--gold)" }}>84.5 kg</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-secondary)" }}>
                <div className="h-full rounded-full" style={{ width: "75%", background: "var(--gold)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-2">
                <span className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}><Dumbbell size={10} /> Squat</span>
                <span style={{ color: "var(--gold)" }}>112.8 kg</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-secondary)" }}>
                <div className="h-full rounded-full" style={{ width: "65%", background: "var(--gold)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-2">
                <span className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}><Route size={10} /> Endurance (Weekly Run)</span>
                <span style={{ color: "var(--gold)" }}>28.6 km</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-secondary)" }}>
                <div className="h-full rounded-full" style={{ width: "85%", background: "var(--gold)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
