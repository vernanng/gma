# Golden Mobil Auto — Car Rental in Batam

Single-page website for Golden Mobil Auto (goldenmobilauto.com): real fleet with published daily rates, EN/ID language toggle, Golden Promo offers, booking via WhatsApp, and a Where to Go in Batam guide.

## Stack

TypeScript + Vite. No framework.

```
index.html       Page markup (sections, booking dialog)
src/main.ts      UI logic: fleet rendering, filters, language toggle, booking
src/data.ts      Typed fleet data and categories
src/styles.css   Design tokens and component styles
public/assets/   Fleet and Batam location photos, logos
```

## Develop

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit (strict)
npm run build      # typecheck + production build to dist/
npm run preview    # preview the production build
```

Fleet data and images: goldenmobilauto.com. Office: Komplek Limindo Trade Centre Blok A No. 12A, Taman Baloi, Batam.
