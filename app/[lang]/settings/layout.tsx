"use client";

import { SettingsShell } from "@/components/settings/settings-shell";
import { useSettings } from "@/lib/settings/store";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, , , reset] = useSettings();
  return (
    <div className="min-h-screen bg-background">
      <SettingsShell onReset={reset}>{children}</SettingsShell>
    </div>
  );
}
