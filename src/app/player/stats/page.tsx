"use client";

import { useState } from "react";
import { ChevronLeft, Save, Zap, Trophy } from "lucide-react";
import PerformanceLine from "@/components/charts/PerformanceLine";

const DEMO_PER = [
  { game: "G1", per: 18.2 }, { game: "G2", per: 15.8 }, { game: "G3", per: 22.4 },
  { game: "G4", per: 19.1 }, { game: "G5", per: 24.6 }, { game: "G6", per: 20.3 }, { game: "G7", per: 21.8 },
];

export default function StatsPage() {
  const [opponent, setOpponent] = useState("");
  const [minutes, setMinutes] = useState("");
  const [points, setPoints] = useState("");
  const [rebounds, setRebounds] = useState("");
  const [assists, setAssists] = useState("");
  const [steals, setSteals] = useState("");
  const [blocks, setBlocks] = useState("");
  const [turnovers, setTurnovers] = useState("");
  const [fgMade, setFgMade] = useState("");
  const [fgAtt, setFgAtt] = useState("");
  const [threeMade, setThreeMade] = useState("");
  const [threeAtt, setThreeAtt] = useState("");
  const [ftMade, setFtMade] = useState("");
  const [ftAtt, setFtAtt] = useState("");
  const [saved, setSaved] = useState(false);

  // Calculate PER
  const calcPER = () => {
    const min = parseFloat(minutes) || 0;
    if (min === 0) return 0;
    const pts = parseInt(points) || 0;
    const reb = parseInt(rebounds) || 0;
    const ast = parseInt(assists) || 0;
    const stl = parseInt(steals) || 0;
    const blk = parseInt(blocks) || 0;
    const to = parseInt(turnovers) || 0;
    const missedFG = (parseInt(fgAtt) || 0) - (parseInt(fgMade) || 0);
    const missedFT = (parseInt(ftAtt) || 0) - (parseInt(ftMade) || 0);
    const raw = (pts + reb + ast + stl + blk - missedFG - missedFT - to) / min;
    return Math.round(raw * 15 * 10) / 10;
  };

  const per = calcPER();

  const fields = [
    { label: "Minutes", value: minutes, set: setMinutes },
    { label: "Points", value: points, set: setPoints },
    { label: "Rebounds", value: rebounds, set: setRebounds },
    { label: "Assists", value: assists, set: setAssists },
    { label: "Steals", value: steals, set: setSteals },
    { label: "Blocks", value: blocks, set: setBlocks },
    { label: "Turnovers", value: turnovers, set: setTurnovers },
  ];

  const shootingFields = [
    { label: "FG Made", value: fgMade, set: setFgMade },
    { label: "FG Att", value: fgAtt, set: setFgAtt },
    { label: "3PT Made", value: threeMade, set: setThreeMade },
    { label: "3PT Att", value: threeAtt, set: setThreeAtt },
    { label: "FT Made", value: ftMade, set: setFtMade },
    { label: "FT Att", value: ftAtt, set: setFtAtt },
  ];

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <header className="mb-6 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => window.history.back()} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Match Stats</h1>
        </div>
      </header>

      {/* Live PER Display */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="glass-card gold-border p-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap size={18} style={{ color: "var(--gold)" }} />
            <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Live PER</span>
          </div>
          <div className="stat-value text-5xl mb-1">{per}</div>
          <p className="text-[10px]" style={{ color: per >= 20 ? "var(--success)" : per >= 15 ? "var(--gold)" : "var(--danger)" }}>
            {per >= 25 ? "🏆 MVP Level" : per >= 20 ? "⭐ All-Star" : per >= 15 ? "📊 Above Average" : per > 0 ? "📉 Below Average" : "Input stats..."}
          </p>
        </div>
      </section>

      {/* Opponent */}
      <section className="mb-4 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <div className="glass-card p-4">
          <label className="text-[10px] uppercase tracking-wider font-semibold mb-1.5 block" style={{ color: "var(--text-muted)" }}>
            <Trophy size={12} className="inline mr-1" />Lawan
          </label>
          <input className="input-dark" placeholder="Nama tim lawan" value={opponent} onChange={(e) => setOpponent(e.target.value)} />
        </div>
      </section>

      {/* Box Score */}
      <section className="mb-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="glass-card gold-border p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-secondary)" }}>Box Score</h3>
          <div className="grid grid-cols-3 gap-2">
            {fields.map((f) => (
              <div key={f.label}>
                <label className="text-[9px] uppercase tracking-wider font-semibold mb-1 block text-center" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                <input type="number" className="input-dark text-center text-sm font-bold" placeholder="0" value={f.value} onChange={(e) => f.set(e.target.value)} min="0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shooting Splits */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
        <div className="glass-card gold-border p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-secondary)" }}>Shooting Splits</h3>
          <div className="grid grid-cols-3 gap-2">
            {shootingFields.map((f) => (
              <div key={f.label}>
                <label className="text-[9px] uppercase tracking-wider font-semibold mb-1 block text-center" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                <input type="number" className="input-dark text-center text-sm font-bold" placeholder="0" value={f.value} onChange={(e) => f.set(e.target.value)} min="0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Save */}
      <section className="mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <button className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-base" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          {saved ? <>✅ Tersimpan!</> : <><Save size={18} /> Simpan Match Stats</>}
        </button>
      </section>

      {/* PER History */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
        <PerformanceLine data={DEMO_PER} />
      </section>
    </div>
  );
}
