import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/login": {
      en: "/login",
      id: "/login",
    },
    "/dashboard": {
      en: "/dashboard",
      id: "/dashboard",
    },
    "/settings": {
      en: "/settings",
      id: "/settings",
    },
    "/settings/model": {
      en: "/settings/model",
      id: "/settings/model",
    },
    "/settings/account": {
      en: "/settings/account",
      id: "/settings/account",
    },
    "/settings/statistics": {
      en: "/settings/statistics",
      id: "/settings/statistics",
    },
    "/settings/appearance": {
      en: "/settings/appearance",
      id: "/settings/appearance",
    },
  },
});
