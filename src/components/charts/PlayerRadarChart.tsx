"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { RadarMetric } from "@/types";

interface PlayerRadarChartProps {
  data: RadarMetric[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="custom-tooltip">
      <p className="label">{data.category}</p>
      <p className="value">
        {data.value}<span className="text-xs text-gray-400">/{data.fullMark}</span>
      </p>
    </div>
  );
}

export default function PlayerRadarChart({ data }: PlayerRadarChartProps) {
  return (
    <div className="glass-card gold-border p-4">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-sm font-semibold tracking-wide uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Ability Radar
        </h3>
        <span className="badge badge-gold">6 Metrics</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "#F0F0F5",
              fontSize: 10,
              fontWeight: 500,
              fontFamily: "Inter",
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Ability"
            dataKey="value"
            stroke="#D4AF37"
            strokeWidth={2}
            fill="#D4AF37"
            fillOpacity={0.15}
            dot={{
              r: 3,
              fill: "#D4AF37",
              stroke: "#D4AF37",
              strokeWidth: 1,
            }}
            activeDot={{
              r: 5,
              fill: "#D4AF37",
              stroke: "#0A0A0F",
              strokeWidth: 2,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
