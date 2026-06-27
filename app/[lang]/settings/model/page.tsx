import { setRequestLocale } from "next-intl/server";
import { AiModelTab } from "@/components/settings/ai-model-tab";

export default async function ModelSettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  return <AiModelTab />;
}
