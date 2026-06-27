import { setRequestLocale } from "next-intl/server";
import { AccountTab } from "@/components/settings/account-tab";

export default async function AccountSettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  return <AccountTab />;
}
