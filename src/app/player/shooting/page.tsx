"use client";

import { useState } from "react";
import {
  Target,
  Dumbbell,
  Save,
  ChevronLeft,
  TrendingUp,
  Calendar,
} from "lucide-react";
import ShootingChart from "@/components/charts/ShootingChart";
import PowerChart from "@/components/charts/PowerChart";

const DEMO_SHOOTING_HISTORY = [
  { day: "01/04", made: 42, total: 100, percentage: 42 },
  { day: "02/04", made: 38, total: 100, percentage: 38 },
  { day: "03/04", made: 51, total: 100, percentage: 51 },
  { day: "04/04", made: 45, total: 100, percentage: 45 },
  { day: "05/04", made: 55, total: 100, percentage: 55 },
  { day: "06/04", made: 48, total: 100, percentage: 48 },
  { day: "07/04", made: 52, total: 100, percentage: 52 },
];

const DEMO_POWER_HISTORY = [
  { day: "Sen", bench: 80, squat: 120, deadlift: 140 },
  { day: "Rab", bench: 82, squat: 125, deadlift: 145 },
  { day: "Jum", bench: 85, squat: 130, deadlift: 150 },
  { day: "Min", bench: 82, squat: 127, deadlift: 148 },
];

export default function ShootingPage() {
  const [shotsMade, setShotsMade] = useState("");
  const [shotsTotal, setShotsTotal] = useState("100");
  const [benchPress, setBenchPress] = useState("");
  const [squat, setSquat] = useState("");
  const [deadlift, setDeadlift] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const percentage = shotsTotal && shotsMade
    ? Math.round((parseInt(shotsMade) / parseInt(shotsTotal)) * 100)
    : 0;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <header className="mb-6 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
          >
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Shooting & Power</h1>
        </div>
        <p className="text-xs ml-11" style={{ color: "var(--text-secondary)" }}>
          Input performa harian — {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </header>

      {/* Shooting Input */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="glass-card gold-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} style={{ color: "var(--gold)" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
              3-Point Shooting Drill
            </h2>
          </div>

          {/* Big percentage display */}
          <div className="text-center mb-5">
            <div className="stat-value text-5xl">{percentage}%</div>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {shotsMade || 0} / {shotsTotal || 100} shots made
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full mb-5" style={{ background: "var(--bg-elevated)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                background: percentage >= 50
                  ? "linear-gradient(90deg, var(--gold), var(--gold-light))"
                  : percentage >= 35
                  ? "linear-gradient(90deg, var(--gold-dark), var(--gold))"
                  : "linear-gradient(90deg, #8B6914, var(--gold-dark))",
                boxShadow: "0 0 10px rgba(212,175,55,0.3)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider font-semibold mb-1.5 block" style={{ color: "var(--text-muted)" }}>
                Masuk
              </label>
              <input
                type="number"
                className="input-dark text-center text-lg font-bold"
                placeholder="0"
                value={shotsMade}
                onChange={(e) => setShotsMade(e.target.value)}
                min="0"
                max={shotsTotal}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider font-semibold mb-1.5 block" style={{ color: "var(--text-muted)" }}>
                Total Bola
              </label>
              <input
                type="number"
                className="input-dark text-center text-lg font-bold"
                placeholder="100"
                value={shotsTotal}
                onChange={(e) => setShotsTotal(e.target.value)}
                min="1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Power Input */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="glass-card gold-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell size={18} style={{ color: "var(--gold)" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
              Angkatan Beban
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { label: "Bench Press", value: benchPress, set: setBenchPress },
              { label: "Squat", value: squat, set: setSquat },
              { label: "Deadlift", value: deadlift, set: setDeadlift },
            ].map((field) => (
              <div key={field.label} className="flex items-center gap-3">
                <label className="text-xs font-medium w-24 flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                  {field.label}
                </label>
                <input
                  type="number"
                  className="input-dark text-center font-semibold flex-1"
                  placeholder="0"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  min="0"
                />
                <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>kg</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
        <div className="glass-card p-4">
          <label className="text-[10px] uppercase tracking-wider font-semibold mb-1.5 block" style={{ color: "var(--text-muted)" }}>
            Catatan
          </label>
          <textarea
            className="input-dark resize-none"
            rows={3}
            placeholder="Tambah catatan latihan..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </section>

      {/* Save Button */}
      <section className="mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <button
          className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-base"
          onClick={handleSave}
        >
          {saved ? (
            <>
              <TrendingUp size={18} />
              Tersimpan!
            </>
          ) : (
            <>
              <Save size={18} />
              Simpan Data Hari Ini
            </>
          )}
        </button>
      </section>

      {/* History Charts */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} style={{ color: "var(--text-muted)" }} />
          <h2 className="text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--text-secondary)" }}>
            Riwayat 7 Hari
          </h2>
        </div>
        <ShootingChart data={DEMO_SHOOTING_HISTORY} mode="composed" />
      </section>

      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <PowerChart data={DEMO_POWER_HISTORY} />
      </section>
    </div>
  );
}
