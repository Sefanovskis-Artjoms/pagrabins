"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import "./LanguageSwitcher.css";

const HOVER_CLOSE_MS = 120;

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openFromHover() {
    if (!canHover()) return;
    clearCloseTimer();
    setOpen(true);
  }

  function closeFromHover() {
    if (!canHover()) return;
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), HOVER_CLOSE_MS);
  }

  function selectLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="lang-switch">
      <DropdownMenu.Root modal={false} open={open} onOpenChange={setOpen}>
        <div onPointerEnter={openFromHover} onPointerLeave={closeFromHover}>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="lang-switch__trigger"
              aria-label={`${t("label")}: ${t(`names.${locale}`)}`}
            >
              <Flag locale={locale} className="flag flag--trigger" />
            </button>
          </DropdownMenu.Trigger>
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="lang-switch__menu"
            sideOffset={4}
            align="end"
            aria-label={t("label")}
            onPointerEnter={openFromHover}
            onPointerLeave={closeFromHover}
          >
            {routing.locales.map((code) => {
              const selected = code === locale;

              return (
                <DropdownMenu.Item
                  key={code}
                  className={`lang-switch__option${selected ? " lang-switch__option--selected" : ""}`}
                  aria-label={t(`names.${code}`)}
                  onSelect={() => selectLocale(code)}
                >
                  <Flag locale={code} className="flag flag--option" />
                  <span className="lang-switch__name text--body-md">
                    {t(`names.${code}`)}
                  </span>
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

function Flag({ locale, className }: { locale: Locale; className?: string }) {
  if (locale === "lv") {
    return (
      <svg
        viewBox="0 0 20 10"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
      >
        <rect width="20" height="4" fill="#9E3039" />
        <rect y="4" width="20" height="2" fill="#FFFFFF" />
        <rect y="6" width="20" height="4" fill="#9E3039" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
