import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "./_components/Footer/Footer";
import { Header } from "./_components/Header/Header";
import { RestaurantJsonLd } from "./_components/RestaurantJsonLd/RestaurantJsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { getLocaleAlternates, ogLocale } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "@/fonts/fonts.css";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const alternates = getLocaleAlternates("/", locale as Locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    icons: {
      icon: {
        url: "/icons/icon.svg",
        type: "image/svg+xml",
      },
    },
    alternates,
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
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
      title: t("title"),
      description: t("description"),
      images: [siteConfig.ogImage],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return (
    <html lang={locale} className="site">
      <body className="site__body">
        <RestaurantJsonLd
          locale={locale}
          name={t("title")}
          description={t("description")}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="site__main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
