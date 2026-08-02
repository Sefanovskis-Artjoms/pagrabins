import { getTranslations } from "next-intl/server";
import { contactDetails } from "@/content/restaurant";
import { CopyAddressButton } from "../CopyAddressButton/CopyAddressButton";
import { VisitMapLazy } from "../VisitMap/VisitMapLazy";
import "./VisitSection.css";

export async function VisitSection() {
  const t = await getTranslations("Home.visit");

  const address = t("address");
  const hours = [
    { days: t("hours.monThu.days"), time: t("hours.monThu.time") },
    { days: t("hours.friSat.days"), time: t("hours.friSat.time") },
    { days: t("hours.sun.days"), time: t("hours.sun.time") },
  ];

  const goodToKnowPoints = t.raw("goodToKnow.points") as string[];

  const contacts = [
    {
      label: t("contacts.phoneLabel"),
      value: contactDetails.phone,
      href: `tel:${contactDetails.phone.replace(/\s+/g, "")}`,
    },
    {
      label: t("contacts.mobileLabel"),
      value: contactDetails.mobile,
      href: `tel:${contactDetails.mobile.replace(/\s+/g, "")}`,
    },
    {
      label: t("contacts.emailLabel"),
      value: contactDetails.email,
      href: `mailto:${contactDetails.email}`,
    },
    {
      label: t("contacts.facebookLabel"),
      value: contactDetails.facebookUrl
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, ""),
      href: contactDetails.facebookUrl,
      external: true,
    },
  ];

  return (
    <section className="visit page__container" aria-labelledby="visit-heading">
      <h2 id="visit-heading" className="visit__title">
        {t("title")}
      </h2>

      <div className="visit__grid">
        <div className="visit__map-cell">
          <VisitMapLazy ariaLabel={t("mapLabel")} />
        </div>

        <div className="visit__sidebar">
          <div className="visit__hours-card">
            <div className="visit__hours-header">
              <svg className="visit__hours-icon" aria-hidden>
                <use href="/icons/clock.svg#clock" />
              </svg>
              <span className="visit__hours-label">{t("hoursLabel")}</span>
            </div>
            <ul className="visit__hours-list">
              {hours.map((row) => (
                <li key={row.days} className="visit__hours-row">
                  <span className="visit__hours-text">{row.days}</span>
                  <span className="visit__hours-text">{row.time}</span>
                </li>
              ))}
            </ul>

            <div className="visit__divider" />

            <div className="visit__contacts">
              <div className="visit__hours-header">
                <svg
                  className="visit__contacts-icon"
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="visit__hours-label">
                  {t("contacts.title")}
                </span>
              </div>
              <ul className="visit__contacts-list">
                {contacts.map((contact) => (
                  <li key={contact.label} className="visit__contacts-row">
                    <span className="visit__contacts-key">
                      {contact.label}:
                    </span>
                    <a
                      className="visit__contacts-value"
                      href={contact.href}
                      {...(contact.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {contact.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="visit__divider" />

            <div className="visit__address">
              <div className="visit__address-info">
                <div className="visit__hours-header">
                  <svg
                    className="visit__contacts-icon"
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span className="visit__hours-label">
                    {t("addressLabel")}
                  </span>
                </div>
                <p className="visit__address-text">{address}</p>
              </div>
              <CopyAddressButton address={address} />
            </div>
          </div>

          <article className="visit__note" aria-labelledby="visit-note-heading">
            <span className="visit__note-accent" aria-hidden />
            <svg
              className="visit__note-icon"
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <div className="visit__note-inner">
              <h3 id="visit-note-heading" className="visit__note-title">
                {t("goodToKnow.title")}
              </h3>
              <ul className="visit__note-body">
                {goodToKnowPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
