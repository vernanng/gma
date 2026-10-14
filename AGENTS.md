# AGENTS.md — Golden Mobil Auto

Static car-rental site. No build, no package.json, no tests/lint/CI.

## Run / verify
- Open `index.html` in a browser — that is the runnable page.
- Typecheck only: `npx -p typescript tsc --noEmit` (covers `src/` per `tsconfig.json`: ES2022, strict, `noEmit`).

## Triple-sync trap (agent will miss this)
- `index.html` inline `<script>` is the runtime truth, not `src/main.ts`.
- Fleet data exists 3x: inline `CARS` in `index.html` (~line 490), `CARS` in `src/main.ts`, `data/fleet.json`. Update all three on price/copy/car changes.
- `src/main.ts` is a simplified typed port (fleet + lang + dialog only); `src/types.ts` (`Car`, `PickupPoint`, `Place`, `BookingRequest`) is the shared shape for the future backend per `BACKEND.md`.

## i18n — duplicated files, not a framework
- EN root (`index.html`, `where-to-go.html`) + ID mirror (`id/index.html`, `id/where-to-go.html`). Every content edit needs both.
- Copy via `data-en` / `data-id` attributes; locale persisted as `localStorage` key `gm-lang` (`en`|`id`).
- Keep per-file SEO: `canonical` points at its own locale URL; `hreflang en/id/x-default` must stay on all four pages.

## Data / assets / booking
- Canonical data: `data/fleet.json` (8 cars, `price` = IDR start-from rate), `data/pickup-points.json` (10 values), `data/places.json` (6 places with `imgW/imgH`).
- Images stay local in `assets/` with relative paths; canonical/og URLs stay absolute to `https://vernanng.github.io/golden-mobil-auto/`.
- Booking is WhatsApp handoff only (`628117007717`), no backend. `BACKEND.md` is the proposal for `GET /api/fleet|pickup-points|places` + `POST /api/bookings` — do not implement unless asked.
