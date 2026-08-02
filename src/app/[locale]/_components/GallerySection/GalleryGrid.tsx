"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  colSpan: number;
  rowSpan: number;
  width: number;
  height: number;
};

type Props = {
  columns: number;
  items: GalleryItem[];
  labels: {
    close: string;
    previous: string;
    next: string;
  };
};

const HISTORY_STATE_KEY = "gallery-lightbox";

function getImageSizes(colSpan: number, columns: number) {
  if (colSpan >= columns / 2) {
    return "(min-width: 1024px) 50vw, 100vw";
  }

  return "(min-width: 1024px) 25vw, 50vw";
}

function LazyInView({
  children,
  className,
  rootMargin = "300px 0px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (show) return children;

  return <div ref={ref} className={className} aria-hidden />;
}

export function GalleryGrid({ columns, items, labels }: Props) {
  const [index, setIndex] = useState(-1);
  const openRef = useRef(false);
  const historyEntryRef = useRef(false);
  const closingFromBackRef = useRef(false);

  const slides = useMemo(
    () =>
      items.map((item) => ({
        src: item.src,
        alt: item.alt,
        width: item.width,
        height: item.height,
        description: item.alt,
        thumbnail: item.src,
      })),
    [items],
  );

  const close = useCallback(() => {
    openRef.current = false;
    setIndex(-1);
  }, []);

  const openAt = useCallback((slideIndex: number) => {
    openRef.current = true;
    setIndex(slideIndex);
  }, []);

  const handleEntered = useCallback(() => {
    if (historyEntryRef.current) return;

    window.history.pushState({ [HISTORY_STATE_KEY]: true }, "");
    historyEntryRef.current = true;
  }, []);

  const handleExited = useCallback(() => {
    if (historyEntryRef.current && !closingFromBackRef.current) {
      window.history.back();
    }

    historyEntryRef.current = false;
    closingFromBackRef.current = false;
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (!openRef.current) return;

      closingFromBackRef.current = true;
      openRef.current = false;
      setIndex(-1);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <div
        className="gallery__grid"
        style={{ "--gallery-columns": columns } as CSSProperties}
      >
        {items.map((item, slideIndex) => (
          <figure
            key={item.id}
            className="gallery__item"
            style={{
              gridColumn: `span ${item.colSpan}`,
              gridRow: `span ${item.rowSpan}`,
              aspectRatio: `${item.colSpan} / ${item.rowSpan}`,
            }}
          >
            <button
              type="button"
              className="gallery__item-trigger"
              aria-label={item.alt}
              onClick={() => openAt(slideIndex)}
            >
              <LazyInView className="gallery__lazy-placeholder">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="gallery__image"
                  sizes={getImageSizes(item.colSpan, columns)}
                />
              </LazyInView>
            </button>
          </figure>
        ))}
      </div>

      <Lightbox
        className="gallery-lightbox"
        open={index >= 0}
        index={index}
        close={close}
        slides={slides}
        plugins={[Zoom, Captions, Thumbnails]}
        labels={{
          Close: labels.close,
          Previous: labels.previous,
          Next: labels.next,
        }}
        carousel={{ finite: false, imageFit: "contain" }}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
          closeOnEscape: true,
        }}
        captions={{ descriptionTextAlign: "center" }}
        thumbnails={{ position: "bottom", width: 64, height: 48, border: 2 }}
        zoom={{ maxZoomPixelRatio: 3 }}
        on={{ entering: handleEntered, exited: handleExited }}
      />
    </>
  );
}
