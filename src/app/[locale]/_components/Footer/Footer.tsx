import { getTranslations } from "next-intl/server";
import { company } from "@/content/restaurant";
import "./Footer.css";

const WEBSITE_AUTHOR = {
  name: "Artjoms Šefanovskis",
  email: "artjoms.sefanovskis@gmail.com",
};

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="footer">
      <div className="page__container footer__inner">
        <div className="footer__col footer__author">
          <p className="footer__author-name">
            {t("authorLabel")} — {WEBSITE_AUTHOR.name}
          </p>
          <a
            className="footer__author-email"
            href={`mailto:${WEBSITE_AUTHOR.email}`}
          >
            {WEBSITE_AUTHOR.email}
          </a>
        </div>

        <div className="footer__col footer__copyright">
          <p>&copy; 2026 Restorāns &quot;Pagrabiņš&quot;</p>
        </div>

        <address className="footer__col footer__company">
          <span>{company.legalName}</span>
          <span>{company.regNr}</span>
          <span>{company.address}</span>
          <span>{company.iban}</span>
        </address>
      </div>
    </footer>
  );
}
