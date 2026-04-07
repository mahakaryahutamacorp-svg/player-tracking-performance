"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface PowerDay {
  day: string;
  bench: number;
  squat: number;
  deadlift: number;
}

interface PowerChartProps {
  data: PowerDay[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p className="label mb-2">{label}</p>
      {payload.map((entry: { name: string; value: number; color: string }, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{entry.name}</span>
          <span className="text-xs font-semibold ml-auto" style={{ color: "var(--gold)" }}>{entry.value} kg</span>
        </div>
      ))}
    </div>
  );
}

export default function PowerChart({ data }: PowerChartProps) {
  return (
    <div className="glass-card gold-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--text-secondary)" }}>
            Power Training
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Bench • Squat • Deadlift
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="15%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: "#8B8B9E", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#55556A", fontSize: 10 }} axisLine={false} tickLine={false} width={35} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(212,175,55,0.05)" }} />
          <Legend
            iconType="circle"
            iconSize={6}
            wrapperStyle={{ fontSize: "10px", color: "var(--text-secondary)", paddingTop: "8px" }}
          />
          <Bar dataKey="bench" name="Bench" fill="#D4AF37" radius={[3, 3, 0, 0]} maxBarSize={16} />
          <Bar dataKey="squat" name="Squat" fill="#B8960E" radius={[3, 3, 0, 0]} maxBarSize={16} />
          <Bar dataKey="deadlift" name="Deadlift" fill="#8B6914" radius={[3, 3, 0, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
