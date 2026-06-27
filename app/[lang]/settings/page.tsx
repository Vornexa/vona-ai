import { redirect } from "@/lib/i18n/navigation";

export default async function SettingsIndex() {
  redirect({ href: "/settings/model", locale: "en" });
}
