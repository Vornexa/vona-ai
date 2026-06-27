import { setRequestLocale } from "next-intl/server";
import { AppearanceTab } from "@/components/settings/appearance-tab";

export default async function AppearanceSettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  return <AppearanceTab />;
}
