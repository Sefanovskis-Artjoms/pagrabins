import { setRequestLocale } from "next-intl/server";
import { GallerySection } from "./_components/GallerySection/GallerySection";
import { HeroSection } from "./_components/HeroSection/HeroSection";
import { VisitSection } from "./_components/VisitSection/VisitSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <VisitSection />
      <GallerySection />
    </>
  );
}
