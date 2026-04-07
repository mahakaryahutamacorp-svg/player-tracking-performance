"use client";

import { useMemo } from "react";
import {
  Target,
  Dumbbell,
  Route,
  Zap,
  Calendar,
  ChevronRight,
  Trophy,
  Flame,
  Clock,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import PlayerRadarChart from "@/components/charts/PlayerRadarChart";
import ShootingChart from "@/components/charts/ShootingChart";
import PowerChart from "@/components/charts/PowerChart";
import PerformanceLine from "@/components/charts/PerformanceLine";
import { getGreeting } from "@/lib/utils";
import type { RadarMetric } from "@/types";

// ============================================
// DEMO DATA — Replace with Supabase queries
// ============================================
const DEMO_PLAYER = {
  full_name: "Ahmad Rizky",
  jersey_number: 7,
  position: "SG" as const,
};

const DEMO_RADAR: RadarMetric[] = [
  { category: "Shooting", value: 78, fullMark: 100 },
  { category: "Power", value: 65, fullMark: 100 },
  { category: "Endurance", value: 82, fullMark: 100 },
  { category: "Efficiency", value: 71, fullMark: 100 },
  { category: "Defense", value: 58, fullMark: 100 },
  { category: "Discipline", value: 90, fullMark: 100 },
];

const DEMO_SHOOTING = [
  { day: "Sen", made: 42, total: 100, percentage: 42 },
  { day: "Sel", made: 38, total: 100, percentage: 38 },
  { day: "Rab", made: 51, total: 100, percentage: 51 },
  { day: "Kam", made: 45, total: 100, percentage: 45 },
  { day: "Jum", made: 55, total: 100, percentage: 55 },
  { day: "Sab", made: 48, total: 100, percentage: 48 },
  { day: "Min", made: 52, total: 100, percentage: 52 },
];

const DEMO_POWER = [
  { day: "Sen", bench: 80, squat: 120, deadlift: 140 },
  { day: "Rab", bench: 82, squat: 125, deadlift: 145 },
  { day: "Jum", bench: 85, squat: 130, deadlift: 150 },
  { day: "Min", bench: 82, squat: 127, deadlift: 148 },
];

const DEMO_PER = [
  { game: "G1", per: 18.2 },
  { game: "G2", per: 15.8 },
  { game: "G3", per: 22.4 },
  { game: "G4", per: 19.1 },
  { game: "G5", per: 24.6 },
  { game: "G6", per: 20.3 },
  { game: "G7", per: 21.8 },
];

const DEMO_RECENT = [
  { type: "shooting", text: "Shooting drill: 52/100 (52%)", time: "Hari ini, 08:30", icon: Target },
  { type: "run", text: "Morning run: 5.2 km, 28:45", time: "Hari ini, 06:15", icon: Route },
  { type: "nutrition", text: "Kalori: 2,800 kcal logged", time: "Kemarin, 20:00", icon: Flame },
  { type: "attendance", text: "Hadir — Latihan Pagi", time: "Kemarin, 07:00", icon: Calendar },
];

export default function PlayerDashboard() {
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      {/* === HEADER === */}
      <header className="mb-6 animate-fade-in-up">
        <p className="text-xs font-medium mb-1" style={{ color: "var(--gold)" }}>
          {greeting} 👋
        </p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {DEMO_PLAYER.full_name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge badge-gold">#{DEMO_PLAYER.jersey_number}</span>
              <span className="badge badge-gold">{DEMO_PLAYER.position}</span>
            </div>
          </div>
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg gold-glow"
            style={{
              background: "linear-gradient(135deg, var(--gold), var(--gold-dark))",
              color: "var(--bg-primary)",
            }}
          >
            {DEMO_PLAYER.full_name.charAt(0)}
          </div>
        </div>
      </header>

      {/* === QUICK STATS ROW (Swipeable) === */}
      <section className="mb-6">
        <div className="scroll-container px-0">
          <StatsCard
            label="Shooting Avg"
            value="47.3"
            unit="%"
            change={4.2}
            icon={<Target size={18} />}
            delay={0}
          />
          <StatsCard
            label="Power Index"
            value="3.85"
            unit="x BW"
            change={2.1}
            icon={<Dumbbell size={18} />}
            accentColor="#B8960E"
            delay={100}
          />
          <StatsCard
            label="Jarak Lari"
            value="32.4"
            unit="km"
            change={8.5}
            icon={<Route size={18} />}
            accentColor="#E8C94A"
            delay={200}
          />
          <StatsCard
            label="PER Rating"
            value="20.3"
            change={5.8}
            icon={<Zap size={18} />}
            accentColor="#D4AF37"
            delay={300}
          />
        </div>
      </section>

      {/* === STREAK BANNER === */}
      <section
        className="mb-6 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <div
          className="glass-card p-4 flex items-center gap-3"
          style={{ borderLeft: "3px solid var(--gold)" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center animate-pulse-gold"
            style={{ background: "var(--gold-muted)", color: "var(--gold)" }}
          >
            <Trophy size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              🔥 12 Hari Berturut-turut!
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Hadir di semua sesi latihan. Pertahankan!
            </p>
          </div>
          <div
            className="stat-value text-lg"
          >
            12
          </div>
        </div>
      </section>

      {/* === RADAR CHART === */}
      <section
        className="mb-6 animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        <PlayerRadarChart data={DEMO_RADAR} />
      </section>

      {/* === SHOOTING CHART === */}
      <section
        className="mb-6 animate-fade-in-up"
        style={{ animationDelay: "400ms" }}
      >
        <ShootingChart data={DEMO_SHOOTING} mode="composed" />
      </section>

      {/* === POWER CHART === */}
      <section
        className="mb-6 animate-fade-in-up"
        style={{ animationDelay: "450ms" }}
      >
        <PowerChart data={DEMO_POWER} />
      </section>

      {/* === PER LINE === */}
      <section
        className="mb-6 animate-fade-in-up"
        style={{ animationDelay: "500ms" }}
      >
        <PerformanceLine data={DEMO_PER} />
      </section>

      {/* === RECENT ACTIVITY === */}
      <section
        className="mb-6 animate-fade-in-up"
        style={{ animationDelay: "550ms" }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            Aktivitas Terbaru
          </h2>
          <button className="flex items-center gap-1 text-xs" style={{ color: "var(--gold)" }}>
            Lihat Semua <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2">
          {DEMO_RECENT.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="glass-card p-3 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--gold-muted)",
                    color: "var(--gold)",
                  }}
                >
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.text}
                  </p>
                  <p className="text-[10px] flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    <Clock size={10} />
                    {item.time}
                  </p>
                </div>
                <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* === TODAY'S TARGETS === */}
      <section
        className="mb-6 animate-fade-in-up"
        style={{ animationDelay: "600ms" }}
      >
        <h2
          className="text-sm font-semibold tracking-wide uppercase mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Target Hari Ini
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Shooting Drill", value: "100 bola", done: true },
            { label: "Lari Pagi", value: "5 km", done: true },
            { label: "Log Nutrisi", value: "Target 3000 kcal", done: false },
            { label: "Gym Session", value: "Upper Body", done: false },
          ].map((target, i) => (
            <div
              key={i}
              className="glass-card p-3 relative overflow-hidden"
              style={{
                borderLeft: target.done
                  ? "3px solid var(--success)"
                  : "3px solid var(--text-muted)",
              }}
            >
              {target.done && (
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-semibold" style={{ color: "var(--success)" }}>
                    ✓ DONE
                  </span>
                </div>
              )}
              <p
                className="text-xs font-semibold mb-1"
                style={{
                  color: target.done ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {target.label}
              </p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                {target.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
