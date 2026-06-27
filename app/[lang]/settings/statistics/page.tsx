import { setRequestLocale } from "next-intl/server";
import { StatisticsTab } from "@/components/settings/statistics-tab";

export default async function StatisticsSettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  return <StatisticsTab />;
}
