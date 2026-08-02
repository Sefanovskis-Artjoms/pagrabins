"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import "./CopyAddressButton.css";

type Props = {
  address: string;
};

export function CopyAddressButton({ address }: Props) {
  const t = useTranslations("Home.visit");
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [address]);

  return (
    <button
      type="button"
      className="copy-address-btn"
      onClick={copy}
      aria-label={copied ? t("copied") : t("copyAddress")}
      title={copied ? t("copied") : t("copyAddress")}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </button>
  );
}
