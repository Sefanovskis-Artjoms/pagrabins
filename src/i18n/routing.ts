import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["lv", "en"],
  defaultLocale: "lv",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/menu": {
      lv: "/edienkarte",
      en: "/menu",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
