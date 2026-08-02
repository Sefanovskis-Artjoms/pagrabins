import { getTranslations } from "next-intl/server";
import gallery from "@/content/gallery.json";
import { getGalleryImageSize } from "@/lib/get-gallery-image-size";
import { GalleryGrid } from "./GalleryGrid";
import "./GallerySection.css";

export async function GallerySection() {
  const t = await getTranslations("Home.gallery");

  const items = await Promise.all(
    gallery.items.map(async (item) => {
      const { width, height } = await getGalleryImageSize(item.file);

      return {
        id: item.id,
        src: `/gallery/${item.file}`,
        alt: t(`items.${item.altKey}`),
        colSpan: item.colSpan,
        rowSpan: item.rowSpan,
        width,
        height,
      };
    }),
  );

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
