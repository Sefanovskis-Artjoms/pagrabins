# Pagrabins

A visit-card style website for a local café in Kuldīga. The layout is minimal: a dim, cozy look that puts the essentials first—hours, location, contacts, and a feel for the place—so someone walking through town on a phone can decide quickly whether to stop in.

That matches how many of us actually choose where to eat: among several “good enough” options, we often pick the first one that looks decent and clear. Obvious information builds trust; hunting for basics does the opposite.

The site has two pages: a **home** page with general information and a **menu** page with the full offering.

**Demo:** [pagrabins.artjoms200.workers.dev](https://pagrabins.artjoms200.workers.dev/)

## Tech stack

- **Framework:** [Next.js](https://nextjs.org) (App Router) / React 19
- **Language:** TypeScript
- **Internationalisation:** [next-intl](https://next-intl.dev) — Latvian (default) and English, locale-aware routes (`/edienkarte` vs `/menu`)
- **Maps:** [Leaflet](https://leafletjs.com) / react-leaflet (lazy-loaded)
- **Gallery:** [yet-another-react-lightbox](https://yet-another-react-lightbox.com)
- **UI primitives:** [Radix UI](https://www.radix-ui.com) (language switcher dropdown)
- **Hosting:** [Cloudflare Workers](https://workers.cloudflare.com) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)

## Features

### Home

- Hero with café branding, taglines, and embedded YouTube video
- **Visit us** — opening hours, address with copy-to-clipboard, phone/email/Facebook links, “good to know” notes, interactive map
- **Gallery** — responsive masonry-style grid with lightbox

### Menu

- Long-form menu grouped into sections and nested categories
- Sticky category navigation and scroll progress indicator
- Allergen superscripts with a legend (EU-style allergen numbering)
- Localised item names and descriptions

### SEO & discoverability

- Per-locale metadata, Open Graph, and Twitter cards
- `hreflang` alternates and canonical URLs
- `Restaurant` JSON-LD, `sitemap.xml`, and `robots.txt`

## Project structure (high level)

| Path                                   | Purpose                                            |
| -------------------------------------- | -------------------------------------------------- |
| `src/app/[locale]/`                    | Localised pages and layout                         |
| `src/content/menu.ts`                  | Menu IDs, prices, allergens, structure             |
| `src/content/restaurant.ts`            | Coordinates, contacts, legal/venue details         |
| `src/content/gallery.json`             | Gallery layout and image metadata                  |
| `messages/lv.json`, `messages/en.json` | All user-facing copy and menu text                 |
| `public/gallery/`                      | Gallery image files (referenced by `gallery.json`) |

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Latvian is the default locale; English is available via the header language switcher or `/en`.

### Environment variables (optional)

| Variable               | Description                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata (default: `https://pagrabins.lv`)                                        |
| `ALLOWED_DEV_ORIGINS`  | Comma-separated origins allowed to load dev assets from other devices on your LAN (see `next.config.ts`) |

### Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Development server (`0.0.0.0` for LAN testing) |
| `npm run build`   | Production Next.js build                       |
| `npm run start`   | Serve production build locally                 |
| `npm run lint`    | ESLint                                         |
| `npm run preview` | Build and preview on Cloudflare (OpenNext)     |
| `npm run deploy`  | Build and deploy to Cloudflare Workers         |

Cloudflare configuration lives in `wrangler.jsonc`. Deploy expects Wrangler authentication and any secrets in `.dev.vars` (not committed).

## Updating content

1. **Menu prices / allergens / structure** — edit `src/content/menu.ts`, then add or adjust strings under `MenuPage` in `messages/lv.json` and `messages/en.json`.
2. **Hours, phone, email** — edit `src/content/restaurant.ts` and matching strings under `Home.visit` in the message files if labels change.
3. **Gallery** — add images under `public/gallery/`, update `src/content/gallery.json`, and add alt text keys in the message files.

## License

Private project for the Pagrabins café. Code in this repository is shared as a portfolio piece; please do not reuse branding, copy, or photos without permission from the business.
