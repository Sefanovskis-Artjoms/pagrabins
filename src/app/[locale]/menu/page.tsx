import { setRequestLocale } from "next-intl/server";
import { MenuCategoryNav } from "./_components/MenuCategoryNav/MenuCategoryNav";
import { MenuList } from "./_components/MenuList/MenuList";
import { ScrollProgressBar } from "./_components/ScrollProgressBar/ScrollProgressBar";
import "./page.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollProgressBar />
      <MenuCategoryNav />
      <div className="page__container menu-page__container">
        <MenuList />
      </div>
    </>
  );
}
