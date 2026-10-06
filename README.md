# United Flowers website

Bilingual (EN/AR) site for United Flowers for Vegetable Oils Co. Ltd., built by Wavz Studio.

**Stack:** Next.js 14 (App Router), next-intl (`/en` and `/ar`, RTL), Tailwind, framer-motion.

```bash
npm run dev -- --port 3020
```

## Where things live

| What | File |
| --- | --- |
| Products, brands, categories (bilingual, from the old site) | `lib/catalog.ts` |
| Phone, email, address, WhatsApp, founding year | `lib/site.ts` |
| UI copy, English and Arabic | `messages/en.json`, `messages/ar.json` |
| Scroll-driven Sunflower Drop hero | `components/home/DropHero.tsx` |
| Golden thread story chapters | `components/home/StoryThread.tsx` |
| Step-by-step enquiry form | `components/ui/ProgressiveForm.tsx` |
| Brand-book icons and Sunflower Drop graphic | `components/ui/Icon.tsx`, `components/ui/SunflowerMark.tsx` |

## Pending from the client

- **WhatsApp business number:** set it in `lib/site.ts`. The floating button and product WhatsApp links turn on automatically.
- **Certifications actually held:** edit the `certs` list in `app/[locale]/about/page.tsx`. They currently show as "to confirm".
- **Founding year:** the code uses 2008, but their old site says 2009–10.
- **Pack sizes:** needed for Hanan Corn Oil and the UFVO bulk oils.
- **Product photos:** clean cutouts for every SKU. Several Hanan oils share one photo for now.
- **Factory photos:** for chapter 02 and the About page.
- **Form handling:** the form currently opens the visitor's email app (mailto). Swap it for a form backend or CRM before launch.

## Deploying

The site is published to GitHub Pages as a static export.

```bash
npm run deploy:pages   # builds with the /unitedflowers-website base path and pushes the gh-pages branch
```

Live site: https://kamalasify96-web.github.io/unitedflowers-website/

- `npm run build:pages` only builds (output in `.next-export/`).
- File URLs go through `lib/assets.ts` (`asset()`), which adds the base path. Use it for any new `/img/...` style URL.
- A normal host (Netlify, Vercel, your own domain) can run `npm run build` without any base path.
