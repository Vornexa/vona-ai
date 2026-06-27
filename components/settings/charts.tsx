"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface BarSeriesProps {
  series: { label: string; value: number }[];
  max?: number;
  unit?: string;
}

export function BarSeries({ series, max, unit }: BarSeriesProps) {
  const peak = max ?? Math.max(1, ...series.map((s) => s.value));
  return (
    <div className="space-y-3">
      {series.map((s, i) => {
        const pct = Math.min(100, Math.round((s.value / peak) * 100));
        return (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-xs text-muted-foreground">
              {s.label}
            </span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 * i }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <span className="w-24 shrink-0 text-right text-xs font-medium tabular-nums text-foreground">
              {s.value.toLocaleString()}
              {unit ? ` ${unit}` : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface BarChartProps {
  values: number[];
  labels: string[];
  unit?: string;
}

export function BarChart({ values, labels, unit }: BarChartProps) {
  const max = Math.max(1, ...values);
  return (
    <div className="flex h-44 items-end gap-2">
      {values.map((v, i) => {
        const pct = Math.max(6, Math.round((v / max) * 100));
        return (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
              {v.toLocaleString()}
              {unit ? unit : ""}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${pct}%` }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 * i }}
              className="w-full rounded-t-md bg-primary"
            />
            <span className="text-[11px] text-muted-foreground">{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

interface DonutProps {
  data: { label: string; value: number; color?: string }[];
  centerLabel: string;
  centerValue: string;
}

interface DonutSegment {
  key: number;
  dash: number;
  gap: number;
  offset: number;
  color: string;
}

export function Donut({ data, centerLabel, centerValue }: DonutProps) {
  const radius = 56;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;

  const { segments, total } = useMemo(() => {
    const sum = data.reduce((acc, item) => acc + item.value, 0) || 1;
    let cumulative = 0;
    const segs: DonutSegment[] = data.map((item, idx) => {
      const portion = item.value / sum;
      const dash = circumference * portion;
      const offset = -cumulative;
      cumulative += dash;
      return {
        key: idx,
        dash,
        gap: circumference - dash,
        offset,
        color:
          item.color ??
          ["var(--primary)", "var(--accent)", "#22c55e", "#f97316"][idx % 4],
      };
    });
    return { segments: segs, total: sum };
  }, [data, circumference]);

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={stroke}
          />
          {segments.map((segment, idx) => (
            <motion.circle
              key={segment.key}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              strokeDasharray={`${segment.dash} ${segment.gap}`}
              strokeDashoffset={segment.offset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">{centerLabel}</span>
          <span className="text-xl font-semibold text-foreground tabular-nums">
            {centerValue}
          </span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {data.map((item, idx) => {
          const portion = Math.round((item.value / total) * 100);
          return (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{
                  backgroundColor: segments[idx]?.color ?? "var(--primary)",
                }}
              />
              <span className="flex-1 text-foreground">{item.label}</span>
              <span className="text-muted-foreground tabular-nums">{portion}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
}

export function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
