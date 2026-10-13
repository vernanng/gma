# Backend contract — Golden Mobil Auto

Design is file-based today (`index.html` + `id/` mirror); backend replaces the
data layer, not the markup. Single template, two locales — no duplicated HTML
once the backend renders.

## Source data (canonical, backend seeds or serves these)

- `data/fleet.json` — 8 cars, published "start from" daily rates (IDR). Types: `src/types.ts` → `Car`.
- `data/pickup-points.json` — 10 pickup options (office, 7 ferry points incl. Bengkong, airport, custom). Type: `PickupPoint`.
- `data/places.json` — 6 Where-to-Go places with image dims + EN/ID copy. Type: `Place`.

Images stay in `assets/` (local paths, no hotlinks).

## Suggested minimal API (any stack)

- `GET /api/fleet` → `Car[]`
- `GET /api/pickup-points` → `PickupPoint[]`
- `GET /api/places` → `Place[]`
- `POST /api/bookings` ← `BookingRequest` (carId, start/end `YYYY-MM-DD`,
  pickup/customPickup, tripNumber?, name, phone?) → `{ id, estimatedTotal, whatsappUrl }`

Booking rules (mirror the dialog today): START–END inclusive day count,
`min = today`, end ≥ start, phone optional, custom pickup text required only
when `pickup === "custom"`. WhatsApp handoff number: `628117007717`.

## i18n (replaces the `id/` duplicate)

- One template; locale via route (`/` vs `/id/`) or `?lang=`.
- Copy lives in `data-en`/`data-id` attributes today — backend can render
  either string server-side from the same JSON (`en`/`idn` fields).
- Persist choice in `localStorage` key `gm-lang` (`en`|`id`).
- `hreflang` stays: `en` → `/`, `id` → `/id/`, `x-default` → `/`.

## What backend owns vs design owns

- Backend: fleet/places/pickup data, booking persistence, availability, pricing.
- Design: markup, CSS tokens, slider/dialog/IG-app-link behaviors in `index.html`.
- `src/main.ts` is the typed port of the inline script; `src/types.ts` is the
  shared shape. Keep them in sync until the backend serves real endpoints.
