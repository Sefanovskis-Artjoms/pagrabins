"use client";

import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type AnimationEvent,
} from "react";
import { createPortal } from "react-dom";
import { getMenuNavItems, menuBlocks } from "@/content/menu";
import "./MenuCategoryNav.css";

export function MenuCategoryNav() {
  const t = useTranslations("MenuPage.categories");
  const tSections = useTranslations("MenuPage.sections");
  const [present, setPresent] = useState(false);
  const [closing, setClosing] = useState(false);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const panelId = useId();
  const navItems = [
    ...getMenuNavItems(menuBlocks),
    { id: "allergeni", level: 1 as const },
  ];

  const open = present && !closing;

  const handleOpen = useCallback(() => {
    setClosing(false);
    setPresent(true);
  }, []);

  const handleClose = useCallback(() => {
    if (!present || closing) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPresent(false);
      setClosing(false);
      return;
    }

    setClosing(true);
  }, [present, closing]);

  const handleDrawerAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLElement>) => {
      if (event.target !== event.currentTarget) return;
      if (!closing) return;
      setPresent(false);
      setClosing(false);
    },
    [closing],
  );

  useEffect(() => {
    if (!present) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [present, handleClose]);

  function scrollToSection(sectionId: string) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    handleClose();
  }

  if (!isClient) return null;

  const tab = (
    <button
      type="button"
      className={`menu-nav__tab${open ? " menu-nav__tab--hidden" : ""}`}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={handleOpen}
    >
      <span className="menu-nav__tab-text">{t("tab")}</span>
    </button>
  );

  const overlay = present ? (
    <>
      <button
        type="button"
        className={`menu-nav__backdrop${closing ? " menu-nav__backdrop--closing" : " menu-nav__backdrop--open"}`}
        aria-label={t("close")}
        onClick={handleClose}
      />

      <aside
        id={panelId}
        className={`menu-nav__drawer${closing ? " menu-nav__drawer--closing" : " menu-nav__drawer--open"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${panelId}-title`}
        onAnimationEnd={handleDrawerAnimationEnd}
      >
        <div className="menu-nav__drawer-header">
          <h2 id={`${panelId}-title`} className="menu-nav__drawer-title">
            {t("title")}
          </h2>
          <button
            type="button"
            className="menu-nav__close"
            aria-label={t("close")}
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="menu-nav__list" aria-label={t("title")}>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`menu-nav__link${item.level === 2 ? " menu-nav__link--sub" : ""}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {tSections(item.id)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  ) : null;

  return (
    <>
      {createPortal(tab, document.body)}
      {overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
