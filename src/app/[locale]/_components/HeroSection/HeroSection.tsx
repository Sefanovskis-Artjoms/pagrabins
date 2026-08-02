import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./HeroSection.css";

const YOUTUBE_ID = "STZyW9SDx7g";

export async function HeroSection() {
  const t = await getTranslations("Home");

  return (
    <section className="hero page__container">
      <div className="hero__grid">
        <div className="hero__content">
          <p className="hero__label">{t("label")}</p>
          <h1 className="hero__title">{t("title")}</h1>
          <div className="hero__hashtags">
            <p className="hero__hashtag">{t("hashtag1")}</p>
            <p className="hero__hashtag">{t("hashtag2")}</p>
          </div>
          <Link href="/menu" className="btn btn--primary hero__cta">
            {t("ctaMenu")}
          </Link>
        </div>

        <div className="hero__video">
          <iframe
            className="hero__video-frame"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
            title={t("videoTitle")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
