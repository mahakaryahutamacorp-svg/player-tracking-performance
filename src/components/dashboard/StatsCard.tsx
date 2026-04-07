"use client";

import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon: ReactNode;
  accentColor?: string;
  delay?: number;
}

export default function StatsCard({
  label,
  value,
  unit,
  change,
  icon,
  accentColor = "var(--gold)",
  delay = 0,
}: StatsCardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === null) return null;
    if (change > 0) return <TrendingUp size={12} style={{ color: "var(--success)" }} />;
    if (change < 0) return <TrendingDown size={12} style={{ color: "var(--danger)" }} />;
    return <Minus size={12} style={{ color: "var(--text-muted)" }} />;
  };

  const getTrendColor = () => {
    if (change === undefined || change === null) return "var(--text-muted)";
    if (change > 0) return "var(--success)";
    if (change < 0) return "var(--danger)";
    return "var(--text-muted)";
  };

  return (
    <div
      className="glass-card gold-border p-4 min-w-[160px] scroll-item animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon Row */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            background: `${accentColor}15`,
            color: accentColor,
          }}
        >
          {icon}
        </div>
        {change !== undefined && (
          <div
            className="flex items-center gap-1 text-[11px] font-semibold"
            style={{ color: getTrendColor() }}
          >
            {getTrendIcon()}
            <span>{change > 0 ? "+" : ""}{change}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="stat-value text-2xl mb-1">
        {value}
        {unit && (
          <span className="text-xs font-normal ml-1" style={{ color: "var(--text-muted)", WebkitTextFillColor: "var(--text-muted)" }}>
            {unit}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>
        {label}
      </p>
    </div>
  );
}
