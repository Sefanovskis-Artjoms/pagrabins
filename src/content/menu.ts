export type MenuItemData = {
  id: string;
  price: number;
  allergens?: number[];
};

export type MenuSectionData = {
  id: string;
  items: MenuItemData[];
};

export type MenuGroupData = {
  id: string;
  sections: MenuSectionData[];
};

export type MenuBlock = MenuSectionData | MenuGroupData;

export function isMenuGroup(block: MenuBlock): block is MenuGroupData {
  return "sections" in block;
}

/** Nav targets: top-level blocks, then nested subsections for groups. */
export function getMenuNavItems(blocks: MenuBlock[]) {
  const items: { id: string; level: 1 | 2 }[] = [];

  for (const block of blocks) {
    items.push({ id: block.id, level: 1 });

    if (isMenuGroup(block)) {
      for (const section of block.sections) {
        items.push({ id: section.id, level: 2 });
      }
    }
  }

  return items;
}

export const allergenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

export const menuBlocks: MenuBlock[] = [
  {
    id: "pagrabina-izlase",
    sections: [
      {
        id: "kuldigas-garsa",
        items: [
          { id: "kurzemes-skabputra", price: 5.0, allergens: [1, 7] },
          { id: "podins-zirnitis", price: 8.0, allergens: [1, 7] },
          { id: "bukstinputra-ar-bekonu", price: 13.0, allergens: [1, 7] },
          {
            id: "silke-ar-biezpienu-un-kartupeliem",
            price: 12.0,
            allergens: [3, 4, 7],
          },
          { id: "biguzis", price: 7.0, allergens: [1, 7] },
        ],
      },
      {
        id: "pagrabina-klasika",
        items: [
          { id: "ugunigais-huanito", price: 15.0, allergens: [1, 7] },
          { id: "laimigais-paris", price: 15.0, allergens: [1, 3, 7] },
          { id: "karbonade-ar-sitake-senem", price: 15.0, allergens: [1, 3, 7] },
          { id: "ermanitis", price: 17.0 },
        ],
      },
    ],
  },
  {
    id: "aukstas-uzkodas",
    items: [
      {
        id: "kiploku-grauzdini-ar-siera-merci",
        price: 5.0,
        allergens: [1, 3, 7],
      },
      { id: "pirma-palidziba", price: 7.0, allergens: [1, 3, 4, 7] },
      { id: "olivu-mix", price: 8.0 },
      { id: "melite-ar-merci", price: 9.0, allergens: [1, 3, 7, 9] },
      { id: "garneles-caula", price: 10.0, allergens: [2, 3, 7] },
      {
        id: "zacene-pie-jeb-ka",
        price: 25.0,
        allergens: [1, 3, 4, 6, 7, 10],
      },
    ],
  },
  {
    id: "salati",
    items: [
      {
        id: "svaigie-salati-ar-burrata",
        price: 9.0,
        allergens: [1, 3, 7],
      },
      { id: "klukste-darza", price: 9.0, allergens: [1, 3, 7] },
      { id: "melisu", price: 9.0, allergens: [3, 7] },
      { id: "ratsnama", price: 11.0, allergens: [1, 2, 3, 7, 9] },
      {
        id: "ar-garnelem-pildits-avokado",
        price: 12.0,
        allergens: [2, 3, 7],
      },
    ],
  },
  {
    id: "zupas",
    items: [
      { id: "dienas-zupa", price: 6.0 },
      { id: "gulaszupa-pagrabina-gaume", price: 8.0, allergens: [6, 9, 10] },
      { id: "garnelu-zupa", price: 9.0, allergens: [1, 2, 3, 4, 7] },
      { id: "azijas-vira", price: 9.0, allergens: [2, 3, 6] },
    ],
  },
  {
    id: "vegetarie",
    items: [
      {
        id: "darzenu-rullisi-ar-siera-merci",
        price: 8.0,
        allergens: [1, 3, 7],
      },
      { id: "burrata-ar-svaigajiem-salatiem", price: 9.0, allergens: [5, 7] },
      { id: "avokado-tartars", price: 10.0, allergens: [1, 5] },
      {
        id: "kvinoja-ar-darzeniem-un-tofu",
        price: 10.0,
        allergens: [1, 10],
      },
    ],
  },
  {
    id: "siltie-galas",
    items: [
      { id: "vistas-galas-sasliks", price: 14.0, allergens: [6, 9] },
      { id: "vista-ar-terijaki-merci", price: 14.0, allergens: [1, 6] },
      { id: "gulbja-laboratorija", price: 15.0, allergens: [3, 7] },
      { id: "dusmiga-karbonade", price: 15.0, allergens: [3, 7] },
      { id: "gredzena-pavelnieks", price: 16.0 },
      {
        id: "bifsteks-ar-dizonas-sinepju-merci",
        price: 18.0,
        allergens: [3, 7, 9],
      },
      { id: "tels-kunga-prata", price: 22.0, allergens: [6, 7] },
      { id: "steiks", price: 26.0 },
    ],
  },
  {
    id: "siltie-zivju",
    items: [
      { id: "ceptas-tigergarneles", price: 15.5 },
      { id: "grilleta-forele", price: 15.5, allergens: [1, 4] },
      { id: "bute-garnelu-merce", price: 17.0, allergens: [1, 2, 3, 4, 7] },
      {
        id: "zandarts-ar-sitake-brokoli-risu-makaroniem",
        price: 17.0,
        allergens: [1, 2, 3, 6, 7],
      },
      { id: "zandarts-krejuma-merce", price: 18.0, allergens: [1, 4, 7] },
    ],
  },
  {
    id: "saldie",
    items: [
      { id: "saldejums-ar-ogu-merci", price: 5.0, allergens: [1, 7] },
      { id: "citronu-maskarpones-krems", price: 8.0, allergens: [1, 7] },
      { id: "karstais-saldejums", price: 8.0, allergens: [1, 3, 5, 7] },
      { id: "pagrabina-gardais", price: 8.0, allergens: [1, 3, 7] },
    ],
  },
  {
    id: "piedevas",
    items: [
      { id: "variti-kartupeli", price: 3.5 },
      { id: "variti-cepti-kartupeli", price: 3.5 },
      { id: "fri-kartupeli", price: 3.5 },
      { id: "risi", price: 3.5 },
      { id: "svaigi-darzeni", price: 5.0 },
      { id: "rivetu-kartupelu-kroketes", price: 5.0 },
      { id: "cepti-darzeni", price: 6.0 },
    ],
  },
  {
    id: "mercites",
    items: [
      { id: "kecups", price: 1.5 },
      { id: "majoneze", price: 1.5, allergens: [3, 5] },
      { id: "kiploku-merce", price: 2.0 },
      { id: "steika-merce", price: 2.5 },
      { id: "silta-siera-merce", price: 2.5, allergens: [1, 3, 7] },
    ],
  },
  {
    id: "dzerieni",
    items: [
      { id: "kafija", price: 2.5 },
      { id: "espresso", price: 2.5 },
      { id: "kafija-ar-pienu", price: 3.0, allergens: [7] },
      { id: "kafija-latte", price: 3.5 },
      { id: "kapucino", price: 3.5, allergens: [7] },
      { id: "mineraludens-vichy", price: 2.0 },
      { id: "mineraludens-lielbata", price: 4.5 },
      { id: "pagrabina-galda-udens", price: 3.0 },
      { id: "liepziedu-teja", price: 4.0 },
      { id: "melna-zala-teja", price: 4.0 },
      { id: "piparmetru-teja", price: 4.0 },
      { id: "auglu-teja", price: 4.0 },
      { id: "kumelisu-teja", price: 4.0 },
      { id: "ingvera-teja-ar-citronu", price: 4.0 },
      { id: "ledus-teja", price: 4.0 },
      { id: "medus", price: 1.0 },
      { id: "sula", price: 2.0 },
      { id: "dabiga-sula", price: 5.0 },
      { id: "saldejuma-kokteilis", price: 5.0, allergens: [7] },
      { id: "cola-fanta-sprite-kvass", price: 2.5 },
      { id: "kvass-0-3", price: 3.0 },
      { id: "kvass-0-5", price: 4.0 },
      { id: "energijas-dzeriens", price: 3.5 },
      { id: "kefirs", price: 1.5, allergens: [7] },
      { id: "pikantais-kefirs", price: 2.0, allergens: [7] },
      { id: "sidrs-0-3", price: 4.0 },
      { id: "sidrs-0-5", price: 5.0 },
      { id: "bezalkoholiskais-alus", price: 4.0, allergens: [1] },
      { id: "piebalgas-alus-0-3", price: 4.0, allergens: [1] },
      { id: "piebalgas-alus-0-5", price: 5.0, allergens: [1] },
      { id: "duna-kuldigas-pilsner", price: 5.0, allergens: [1] },
    ],
  },
];
