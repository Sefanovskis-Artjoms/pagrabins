import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MenuCategoryNav } from "./_components/MenuCategoryNav/MenuCategoryNav";
import { MenuList } from "./_components/MenuList/MenuList";
import { ScrollProgressBar } from "./_components/ScrollProgressBar/ScrollProgressBar";
import { type Locale } from "@/i18n/routing";
import { getLocaleAlternates, ogLocale } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./page.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const alternates = getLocaleAlternates("/menu", locale as Locale);

  return {
    title: t("menuTitle"),
    description: t("menuDescription"),
    alternates,
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      siteName: t("title"),
      title: `${t("menuTitle")} | ${t("title")}`,
      description: t("menuDescription"),
      url: alternates.canonical,
      images: [
        {
          url: siteConfig.ogImage,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("menuTitle")} | ${t("title")}`,
      description: t("menuDescription"),
      images: [siteConfig.ogImage],
    },
  };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "MenuPage" });

  return (
    <>
      <ScrollProgressBar />
      <MenuCategoryNav />
      <div className="page__container menu-page__container">
        <h1 className="menu-page__title">{t("title")}</h1>
        <MenuList />
      </div>
    </>
  );
}
