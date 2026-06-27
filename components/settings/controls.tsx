"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  id?: string;
}

export function Toggle({ checked, onChange, label, id }: ToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors ${
        checked
          ? "border-primary bg-primary"
          : "border-border bg-input-bg"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-5 w-5 transform rounded-full bg-foreground shadow-sm ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

interface SegmentedProps<T extends string> {
  value: T;
  onChange: (next: T) => void;
  options: { value: T; label: string; description?: string }[];
  fullWidth?: boolean;
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  fullWidth,
}: SegmentedProps<T>) {
  return (
    <div
      className={`inline-flex rounded-xl border border-border bg-input-bg p-1 ${
        fullWidth ? "grid w-full" : ""
      }`}
      style={
        fullWidth
          ? { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }
          : undefined
      }
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="segmented-active"
                className="absolute inset-0 rounded-lg bg-card shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

interface OptionCardProps<T extends string> {
  value: T;
  selected: boolean;
  onSelect: (next: T) => void;
  label: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
  badge?: string;
}

export function OptionCard<T extends string>({
  value,
  selected,
  onSelect,
  label,
  description,
  icon: Icon,
  badge,
}: OptionCardProps<T>) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(value)}
      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
        selected
          ? "border-primary bg-primary-light"
          : "border-border bg-background hover:border-primary/40 hover:bg-card-hover"
      }`}
    >
      {Icon ? (
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            selected ? "bg-primary text-primary-foreground" : "bg-card text-primary"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {badge ? (
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
              {badge}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div
        className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-primary bg-primary"
            : "border-border bg-transparent"
        }`}
      >
        {selected ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
          />
        ) : null}
      </div>
    </motion.button>
  );
}

interface SliderProps {
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (value: number) => string;
  id?: string;
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step,
  format,
  id,
}: SliderProps) {
  const display = format ? format(value) : value.toString();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-primary"
        style={{
          background: `linear-gradient(to right, var(--primary) ${pct}%, var(--border) ${pct}%)`,
        }}
      />
      <span className="min-w-[3.5rem] rounded-md border border-border bg-input-bg px-2 py-1 text-center text-xs font-medium tabular-nums text-foreground">
        {display}
      </span>
    </div>
  );
}

interface ColorSwatchProps {
  swatches: { id: string; label: string; color: string; ring?: string }[];
  value: string;
  onChange: (next: string) => void;
}

export function ColorSwatch({ swatches, value, onChange }: ColorSwatchProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {swatches.map((s) => {
        const active = value === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            aria-label={s.label}
            className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
              active
                ? "border-foreground scale-110"
                : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: s.color }}
          >
            {active ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-2 w-2 rounded-full bg-white shadow"
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
