import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const allowedDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? ["192.168.8.150"];

const nextConfig: NextConfig = {
  // Allow phone/tablet on local network to load dev JS (/_next/*, HMR).
  // Update ALLOWED_DEV_ORIGINS in .env.local if your LAN IP changes.
  allowedDevOrigins,
};

export default withNextIntl(nextConfig);
