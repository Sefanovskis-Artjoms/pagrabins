"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import "./Header.css";

const navItems = [
  { href: "/" as const, key: "home" as const },
  { href: "/menu" as const, key: "menu" as const },
];

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();

  return (
    <header id="site-header" className="header">
      <div className="page__container header__inner">
        <div className="header__bar">
          <Link href="/" className="header__logo-link">
            <Image
              src="/icons/logo-2.svg"
              alt="Pagrabiņš"
              width={183}
              height={40}
              priority
              className="header__logo-image"
            />
          </Link>
          <LanguageSwitcher />
        </div>

        <nav className="header__nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={t(item.key)}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: "/" | "/menu";
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`header__nav-link${active ? " header__nav-link--active" : ""}`}
    >
      {label}
    </Link>
  );
}
