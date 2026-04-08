"use client";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Area,
  ComposedChart,
} from "recharts";

interface PERDataPoint {
  game: string;
  per: number;
}

interface PerformanceLineProps {
  data: PERDataPoint[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      <p className="value">{payload[0].value.toFixed(1)}</p>
      <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
        Player Efficiency Rating
      </p>
    </div>
  );
}

export default function PerformanceLine({ data }: PerformanceLineProps) {
  const avgPER = data.length > 0
    ? (data.reduce((s, d) => s + d.per, 0) / data.length).toFixed(1)
    : "0";

  return (
    <div className="glass-card gold-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--text-secondary)" }}>
            Efficiency Rating
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            PER across games
          </p>
        </div>
        <div className="text-right">
          <p className="stat-value text-xl">{avgPER}</p>
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>AVG PER</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="perGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="game" tick={{ fill: "#8B8B9E", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 40]} tick={{ fill: "#55556A", fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<CustomTooltip />} />
          {/* League average line at 15 */}
          <Line type="monotone" dataKey={() => 15} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" dot={false} name="League Avg" />
          <Area type="monotone" dataKey="per" fill="url(#perGradient)" stroke="transparent" />
          <Line
            type="monotone"
            dataKey="per"
            stroke="#D4AF37"
            strokeWidth={2.5}
            dot={{ fill: "#D4AF37", strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: "#D4AF37", stroke: "#0A0A0F", strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded" style={{ background: "var(--gold)" }} />
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Your PER</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded opacity-30" style={{ background: "white", borderStyle: "dashed" }} />
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>League Avg (15)</span>
        </div>
      </div>
    </div>
  );
}
