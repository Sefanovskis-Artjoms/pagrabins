export const CAFE_LOCATION = {
  lat: 56.967718,
  lng: 21.9710098,
  zoom: 17,
} as const;

export const contactDetails = {
  phone: "+371 63320034",
  mobile: "+371 29510809",
  email: "pagrabins@pagrabins.lv",
  facebookUrl: "https://www.facebook.com/KafejnicaPagrabins",
};

export const company = {
  legalName: "SIA Alekšupīte",
  regNr: "Reģ. nr. LV41203028038",
  address: "Mucenieku iela 30-31, Kuldīga, LV-3301",
  iban: "LV42HABA0551015133589",
};

/** Venue address shown to guests (not the legal entity address). */
export const venue = {
  streetAddress: "Baznīcas iela 5",
  addressLocality: "Kuldīga",
  postalCode: "LV-3301",
  addressCountry: "LV",
} as const;

export const openingHours = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "11:00",
    closes: "22:00",
  },
  {
    days: ["Friday", "Saturday"],
    opens: "11:00",
    closes: "00:00",
  },
  {
    days: ["Sunday"],
    opens: "11:00",
    closes: "21:00",
  },
] as const;
