import { setRequestLocale } from "next-intl/server";
import { ChatMain } from "@/components/chat/chat-main";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <ChatMain />;
}
