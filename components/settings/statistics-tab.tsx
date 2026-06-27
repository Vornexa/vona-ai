"use client";

import { useTranslations } from "next-intl";
import { BarChart3, Calendar, Download, RefreshCw, Sparkles } from "lucide-react";
import { useSettings } from "@/lib/settings/store";
import { SettingsSection } from "./settings-section";
import { SettingsTabHeader } from "./settings-tab-header";
import { BarChart, Donut, MetricCard } from "./charts";

export function StatisticsTab() {
  const t = useTranslations("Settings.statistics");
  const tt = useTranslations("Settings.tabs");
  const tc = useTranslations("Settings");
  const [settings, update] = useSettings();
  const stats = settings.statistics;
  const dayLabels = t.raw("days") as string[];

  const modelDonut = stats.modelBreakdown.map((m, idx) => ({
    label: m.label,
    value: m.tokens,
    color: ["#818cf8", "#a78bfa", "#22d3ee", "#f472b6"][idx % 4],
  }));

  const thisMonthTotal = stats.monthlyInput + stats.monthlyOutput;
  const lastMonthTotal = stats.lastMonthInput + stats.lastMonthOutput;
  const delta = lastMonthTotal
    ? Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100)
    : 0;

  const handleExport = () => {
    if (typeof document === "undefined") return;
    const blob = new Blob([JSON.stringify(stats, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vona-statistics-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    const confirmed = window.confirm("Reset all statistics to zero?");
    if (!confirmed) return;
    update((s) => {
      s.statistics = {
        ...s.statistics,
        totalTokens: 0,
        inputTokens: 0,
        outputTokens: 0,
        totalMessages: 0,
        totalConversations: 0,
        avgTokensPerDay: 0,
        monthlyInput: 0,
        monthlyOutput: 0,
        lastMonthInput: 0,
        lastMonthOutput: 0,
        modelBreakdown: s.statistics.modelBreakdown.map((m) => ({ ...m, tokens: 0 })),
        daily: s.statistics.daily.map(() => 0),
      };
    });
  };

  return (
    <div className="space-y-1">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <SettingsTabHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card-hover"
          >
            <Download className="h-3.5 w-3.5" />
            {t("exportData")}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card-hover"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {t("resetStats")}
          </button>
        </div>
      </div>

      <SettingsSection title={t("overview")} icon={BarChart3} delay={0}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label={t("totalTokens")}
            value={stats.totalTokens.toLocaleString()}
            hint={`${delta >= 0 ? "+" : ""}${delta}% vs ${t("lastMonth").toLowerCase()}`}
          />
          <MetricCard
            label={t("totalMessages")}
            value={stats.totalMessages.toLocaleString()}
          />
          <MetricCard
            label={t("totalConversations")}
            value={stats.totalConversations.toLocaleString()}
          />
          <MetricCard
            label={t("avgTokensPerDay")}
            value={stats.avgTokensPerDay.toLocaleString()}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title={t("tokenUsage")}
        subtitle={`${t("thisMonth")} vs ${t("lastMonth")}`}
        icon={Sparkles}
        delay={0.05}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{t("thisMonth")}</span>
              <span className="tabular-nums text-foreground">
                {thisMonthTotal.toLocaleString()}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <TokenRow
                label={t("inputTokens")}
                value={stats.monthlyInput}
                total={thisMonthTotal}
                color="#818cf8"
              />
              <TokenRow
                label={t("outputTokens")}
                value={stats.monthlyOutput}
                total={thisMonthTotal}
                color="#a78bfa"
              />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{t("lastMonth")}</span>
              <span className="tabular-nums text-foreground">
                {lastMonthTotal.toLocaleString()}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <TokenRow
                label={t("inputTokens")}
                value={stats.lastMonthInput}
                total={lastMonthTotal}
                color="#22d3ee"
              />
              <TokenRow
                label={t("outputTokens")}
                value={stats.lastMonthOutput}
                total={lastMonthTotal}
                color="#f472b6"
              />
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title={t("modelBreakdown")}
        icon={Sparkles}
        delay={0.1}
      >
        <Donut
          data={modelDonut}
          centerLabel={t("totalTokensLabel")}
          centerValue={stats.totalTokens.toLocaleString()}
        />
      </SettingsSection>

      <SettingsSection
        title={t("dailyActivity")}
        subtitle={t("simulatedNote")}
        icon={Calendar}
        delay={0.15}
      >
        <BarChart values={stats.daily} labels={dayLabels} />
      </SettingsSection>

      <p className="px-1 text-xs text-muted-foreground">{tc("title")} - {tt("statistics")}</p>
    </div>
  );
}

interface TokenRowProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

function TokenRow({ label, value, total, color }: TokenRowProps) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums text-foreground">
          {value.toLocaleString()} - {pct}%
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
