"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
  LineChart,
  Line,
  Area,
  ComposedChart,
} from "recharts";

interface ShootingDay {
  day: string;
  made: number;
  total: number;
  percentage: number;
}

interface ShootingChartProps {
  data: ShootingDay[];
  mode?: "bar" | "line" | "composed";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      <p className="value">{payload[0].value}%</p>
      {payload[0]?.payload?.made !== undefined && (
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {payload[0].payload.made}/{payload[0].payload.total} shots
        </p>
      )}
    </div>
  );
}

export default function ShootingChart({ data, mode = "composed" }: ShootingChartProps) {
  const getBarColor = (percentage: number) => {
    if (percentage >= 50) return "#D4AF37";
    if (percentage >= 35) return "#B8960E";
    return "#8B6914";
  };

  return (
    <div className="glass-card gold-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            3-Point Shooting
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Last 7 days • 100 ball drill
          </p>
        </div>
        <div className="text-right">
          <p className="stat-value text-xl">
            {data.length > 0
              ? Math.round(
                  data.reduce((s, d) => s + d.percentage, 0) / data.length
                )
              : 0}
            %
          </p>
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            AVG
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        {mode === "bar" ? (
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#8B8B9E", fontSize: 10, fontFamily: "Inter" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#55556A", fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(212,175,55,0.05)" }} />
            <Bar dataKey="percentage" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {data.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.percentage)} />
              ))}
            </Bar>
          </BarChart>
        ) : mode === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#8B8B9E", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#55556A", fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="percentage" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: "#D4AF37", strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: "#D4AF37", stroke: "#0A0A0F", strokeWidth: 2 }} />
          </LineChart>
        ) : (
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#8B8B9E", fontSize: 10, fontFamily: "Inter" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#55556A", fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(212,175,55,0.2)" }} />
            <Area type="monotone" dataKey="percentage" fill="url(#goldGradient)" stroke="transparent" />
            <Bar dataKey="percentage" radius={[4, 4, 0, 0]} maxBarSize={24} fillOpacity={0.8}>
              {data.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.percentage)} />
              ))}
            </Bar>
            <Line type="monotone" dataKey="percentage" stroke="#E8C94A" strokeWidth={2} dot={false} />
          </ComposedChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
