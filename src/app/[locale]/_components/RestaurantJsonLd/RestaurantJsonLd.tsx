import {
  CAFE_LOCATION,
  contactDetails,
  openingHours,
  venue,
} from "@/content/restaurant";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  locale: string;
  name: string;
  description: string;
};

export function RestaurantJsonLd({ locale, name, description }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "CafeOrCoffeeShop"],
    name,
    description,
    url: absoluteUrl(locale === "en" ? "/en" : "/"),
    image: absoluteUrl(siteConfig.ogImage),
    telephone: contactDetails.phone,
    email: contactDetails.email,
    sameAs: [contactDetails.facebookUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.streetAddress,
      addressLocality: venue.addressLocality,
      postalCode: venue.postalCode,
      addressCountry: venue.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CAFE_LOCATION.lat,
      longitude: CAFE_LOCATION.lng,
    },
    openingHoursSpecification: openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    servesCuisine: ["Latvian", "European"],
    acceptsReservations: true,
    priceRange: "€€",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
