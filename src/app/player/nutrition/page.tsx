"use client";

import { useState } from "react";
import {
  Apple,
  Droplets,
  Pill,
  Save,
  ChevronLeft,
  Flame,
  Check,
} from "lucide-react";

const SUPPLEMENTS = [
  "Whey Protein",
  "Creatine",
  "BCAA",
  "Vitamin D",
  "Vitamin C",
  "Fish Oil",
  "Multivitamin",
  "Magnesium",
  "Zinc",
  "Glutamine",
];

export default function NutritionPage() {
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [water, setWater] = useState("");
  const [selectedSupps, setSelectedSupps] = useState<string[]>(["Whey Protein", "Creatine", "Multivitamin"]);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const toggleSupplement = (name: string) => {
    setSelectedSupps((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const calorieTarget = 3000;
  const calorieProgress = calories ? Math.min((parseInt(calories) / calorieTarget) * 100, 100) : 0;

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
          <h1 className="text-xl font-bold tracking-tight">Nutrisi & Suplemen</h1>
        </div>
        <p className="text-xs ml-11" style={{ color: "var(--text-secondary)" }}>
          Log asupan harian — {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </header>

      {/* Calorie Tracker */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="glass-card gold-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Flame size={18} style={{ color: "var(--gold)" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
              Kalori
            </h2>
          </div>

          {/* Calorie ring */}
          <div className="flex items-center gap-6 mb-5">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#calGradient)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${calorieProgress * 2.64} ${264 - calorieProgress * 2.64}`}
                  style={{ transition: "stroke-dasharray 0.5s ease", filter: "drop-shadow(0 0 4px rgba(212,175,55,0.4))" }}
                />
                <defs>
                  <linearGradient id="calGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#E8C94A" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {calories || 0}
                </span>
                <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>kcal</span>
              </div>
            </div>
            <div className="flex-1">
              <input
                type="number"
                className="input-dark text-center text-2xl font-bold mb-2"
                placeholder="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <p className="text-[10px] text-center" style={{ color: "var(--text-muted)" }}>
                Target: {calorieTarget} kcal
              </p>
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Protein", value: protein, set: setProtein, unit: "g", color: "#D4AF37" },
              { label: "Karbo", value: carbs, set: setCarbs, unit: "g", color: "#E8C94A" },
              { label: "Lemak", value: fat, set: setFat, unit: "g", color: "#B8960E" },
            ].map((macro) => (
              <div key={macro.label}>
                <label className="text-[10px] uppercase tracking-wider font-semibold mb-1 block text-center" style={{ color: macro.color }}>
                  {macro.label}
                </label>
                <input
                  type="number"
                  className="input-dark text-center text-sm font-semibold"
                  placeholder="0"
                  value={macro.value}
                  onChange={(e) => macro.set(e.target.value)}
                />
                <p className="text-[9px] text-center mt-0.5" style={{ color: "var(--text-muted)" }}>{macro.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Water Intake */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Droplets size={16} style={{ color: "#3B82F6" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
              Air Minum
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              className="input-dark text-center text-lg font-bold flex-1"
              placeholder="0"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              step="0.5"
            />
            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Liter</span>
          </div>
        </div>
      </section>

      {/* Supplement Checklist */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <div className="glass-card gold-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Pill size={18} style={{ color: "var(--gold)" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
              Suplemen Hari Ini
            </h2>
            <span className="badge badge-gold ml-auto">{selectedSupps.length} dipilih</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SUPPLEMENTS.map((supp) => {
              const isSelected = selectedSupps.includes(supp);
              return (
                <button
                  key={supp}
                  onClick={() => toggleSupplement(supp)}
                  className="flex items-center gap-2 p-2.5 rounded-lg text-left transition-all duration-200"
                  style={{
                    background: isSelected ? "var(--gold-muted)" : "var(--bg-elevated)",
                    border: `1px solid ${isSelected ? "var(--border-gold)" : "transparent"}`,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: isSelected ? "var(--gold)" : "var(--bg-secondary)",
                      border: isSelected ? "none" : "1px solid var(--border-subtle)",
                    }}
                  >
                    {isSelected && <Check size={12} color="#0A0A0F" strokeWidth={3} />}
                  </div>
                  <span
                    className="text-xs font-medium truncate"
                    style={{ color: isSelected ? "var(--gold)" : "var(--text-secondary)" }}
                  >
                    {supp}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Apple size={14} style={{ color: "var(--text-muted)" }} />
            <label className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
              Catatan Nutrisi
            </label>
          </div>
          <textarea
            className="input-dark resize-none"
            rows={3}
            placeholder="Menu makanan, waktu makan, dll..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </section>

      {/* Save */}
      <section className="mb-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <button
          className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-base"
          onClick={handleSave}
        >
          {saved ? (
            <>✅ Tersimpan!</>
          ) : (
            <>
              <Save size={18} />
              Simpan Log Nutrisi
            </>
          )}
        </button>
      </section>
    </div>
  );
}
