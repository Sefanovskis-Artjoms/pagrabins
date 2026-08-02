"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./ScrollProgressBar.css";

const HEADER_ID = "site-header";

export function ScrollProgressBar() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    setMounted(true);

    const header = document.getElementById(HEADER_ID);
    if (!header) return;

    const measureHeader = () => {
      const height = header.getBoundingClientRect().height;
      if (height > 0) {
        document.documentElement.style.setProperty(
          "--site-header-height",
          `${height}px`,
        );
      }
    };

    const updateProgress = () => {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      const scrollTop = root.scrollTop || window.scrollY;
      const next =
        scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0;
      setProgress(next);
    };

    measureHeader();
    updateProgress();

    const resizeObserver = new ResizeObserver(() => {
      measureHeader();
      updateProgress();
    });
    resizeObserver.observe(header);

    const onScroll = () => updateProgress();
    const onResize = () => {
      measureHeader();
      updateProgress();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="scroll-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Lapas ritināšanas progress"
    >
      <div
        className="scroll-progress__fill"
        style={{ height: `${progress * 100}%` }}
      />
    </div>,
    document.body,
  );
}
