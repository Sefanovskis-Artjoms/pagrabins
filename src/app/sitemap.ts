import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { AppHref } from "@/lib/seo";
import { absoluteUrl } from "@/lib/seo";

const routes: AppHref[] = ["/", "/menu"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((href) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        absoluteUrl(getPathname({ locale, href })),
      ]),
    );
    languages["x-default"] = absoluteUrl(
      getPathname({ locale: routing.defaultLocale, href }),
    );

    return {
      url: absoluteUrl(
        getPathname({ locale: routing.defaultLocale, href }),
      ),
      lastModified: new Date(),
      alternates: { languages },
    };
  });
}
