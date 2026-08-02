import { getTranslations } from "next-intl/server";
import gallery from "@/content/gallery.json";
import { GalleryGrid } from "./GalleryGrid";
import "./GallerySection.css";

export async function GallerySection() {
  const t = await getTranslations("Home.gallery");

  const items = gallery.items.map((item) => ({
    id: item.id,
    src: `/gallery/${item.file}`,
    alt: t(`items.${item.altKey}`),
    colSpan: item.colSpan,
    rowSpan: item.rowSpan,
    width: item.width,
    height: item.height,
  }));

  return (
    <section className="gallery page__container" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="gallery__title">
        {t("title")}
      </h2>
      <GalleryGrid
        columns={gallery.columns}
        items={items}
        labels={{
          close: t("lightbox.close"),
          previous: t("lightbox.previous"),
          next: t("lightbox.next"),
        }}
      />
    </section>
  );
}
