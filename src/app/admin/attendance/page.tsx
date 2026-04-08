"use client";

import { useState } from "react";
import { CalendarCheck, Search, CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";

const ATTENDANCE_DATA = [
  { id: 1, name: "Ahmad Rizky", pos: "SG", jersey: 7, status: "present", time: "06:45", notes: "-" },
  { id: 2, name: "Budi Santoso", pos: "PF", jersey: 14, status: "present", time: "06:50", notes: "-" },
  { id: 3, name: "Cahyo Wibowo", pos: "PG", jersey: 3, status: "present", time: "06:55", notes: "-" },
  { id: 4, name: "Dimas Pratama", pos: "C", jersey: 15, status: "excused", time: "-", notes: "Physiotherapy" },
  { id: 5, name: "Eko Saputra", pos: "SF", jersey: 11, status: "late", time: "07:15", notes: "Traffic" },
  { id: 6, name: "Fajar Nugroho", pos: "PG", jersey: 22, status: "present", time: "06:40", notes: "-" },
  { id: 7, name: "Gilang Ramadan", pos: "SG", jersey: 8, status: "absent", time: "-", notes: "No info" },
  { id: 8, name: "Hendra Wijaya", jersey: 33, pos: "C", status: "present", time: "06:58", notes: "-" },
];

export default function AttendancePage() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const stats = {
    present: ATTENDANCE_DATA.filter(p => p.status === "present").length,
    late: ATTENDANCE_DATA.filter(p => p.status === "late").length,
    excused: ATTENDANCE_DATA.filter(p => p.status === "excused").length,
    absent: ATTENDANCE_DATA.filter(p => p.status === "absent").length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Manajemen Absensi</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Pantau kehadiran pemain pada sesi latihan dan pertandingan</p>
      </header>

      {/* Attendance Summary */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        {[
          { label: "Hadir", value: stats.present, icon: CheckCircle2, color: "var(--success)" },
          { label: "Terlambat", value: stats.late, icon: Clock, color: "var(--warning)" },
          { label: "Izin", value: stats.excused, icon: AlertTriangle, color: "var(--text-muted)" },
          { label: "Alpa", value: stats.absent, icon: XCircle, color: "var(--danger)" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15`, color: s.color }}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="stat-value text-xl">{s.value}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Toolbar */}
      <section className="mb-6 flex flex-wrap gap-4 items-center animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <input type="date" className="input-dark w-full lg:w-auto" value={date} onChange={(e) => setDate(e.target.value)} />
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input className="input-dark pl-10" placeholder="Cari pemain..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button className="btn-gold flex items-center gap-2 whitespace-nowrap"><CalendarCheck size={16} /> Update Semua</button>
      </section>

      {/* Attendance Table */}
      <section className="glass-card gold-border animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <th className="p-4 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>Pemain</th>
                <th className="p-4 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>Posisi</th>
                <th className="p-4 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>Status</th>
                <th className="p-4 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>Waktu Check-in</th>
                <th className="p-4 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>Catatan</th>
                <th className="p-4 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ATTENDANCE_DATA.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((p) => (
                <tr key={p.id} className="transition-colors border-b" style={{ borderColor: "var(--border-subtle)" }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--gold-muted)", color: "var(--gold)" }}>{p.name.charAt(0)}</div>
                      <div className="text-sm font-medium">{p.name} <span className="text-[10px] text-gray-500 ml-1">#{p.jersey}</span></div>
                    </div>
                  </td>
                  <td className="p-4"><span className="badge badge-gold">{p.pos}</span></td>
                  <td className="p-4">
                    <select className="bg-transparent text-xs font-semibold outline-none" style={{ color: p.status === "present" ? "var(--success)" : p.status === "late" ? "var(--warning)" : "var(--danger)" }}>
                      <option value="present">HADIR</option>
                      <option value="late">TERLAMBAT</option>
                      <option value="excused">IZIN</option>
                      <option value="absent">ALPA</option>
                    </select>
                  </td>
                  <td className="p-4 text-xs font-mono">{p.time}</td>
                  <td className="p-4 text-[11px]" style={{ color: "var(--text-muted)" }}>{p.notes}</td>
                  <td className="p-4">
                    <button className="text-[10px] font-bold uppercase transition-all hover:text-white" style={{ color: "var(--gold)" }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
