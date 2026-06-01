# Car House Real Estate

Premium, investor-grade property marketplace for **land**, **houses**, **apartments**, and **commercial** properties — built for **Rwanda** with all prices in **RWF (Rwandan Franc)**.

## Rwanda-first

- **Locations:** Kigali (Kimihurura, Kacyiru, Kicukiro, Nyarutarama, Remera, Gacuriro…) plus Musanze, Rubavu
- **Currency:** RWF — formatted as `RWF 485M`, `RWF 1.8M /mo` for rent
- **Payments:** MTN MoMo, Airtel Money, cards, local bank transfer
- **Verification:** RDB cadastral & survey intelligence
- **Phone:** +250 format throughout

## Brand

- **Name:** Car House Real Estate
- **Personality:** Professional · Premium luxury · Trustworthy · Surveying precision
- **Aesthetic:** Dark luxury + clean white sections · Gold accents · Cinematic heroes

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Routing | React Router v7 |
| Icons | Lucide React |
| Backend (planned) | Node.js / Supabase |
| Database (planned) | PostgreSQL |
| Auth (planned) | Google + Email + Phone |
| Maps (planned) | Google Maps API (Kigali center) |
| Payments (planned) | MTN MoMo, Airtel Money, Stripe |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — cinematic hero, search, featured, trust, investor, testimonials |
| `/properties` | Listings — grid/map hybrid, filters, compare, favorites |
| `/properties/:id` | Detail — gallery, survey, ROI, mortgage, CTAs |
| `/dashboard/owner` | Owner portal — listings, uploads, visits, payments |
| `/dashboard/agent` | Agent portal — leads, funnel, messaging |
| `/dashboard/admin` | Admin — verification, fraud, revenue |
| `/login` | Sign in (demo — routes to dashboard) |
| `/register` | Create account (demo) |
| `/legal/privacy` | Privacy policy |
| `/legal/terms` | Terms of service |
| `/legal/compliance` | RDB compliance |
| `/404` | Not found |

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com) — framework preset **Vite** is auto-detected.
3. Build command: `npm run build` · Output directory: `dist` (configured in `vercel.json`).
4. Deploy. Client-side routes use SPA rewrites so `/properties`, `/dashboard/owner`, etc. work on refresh.

No environment variables are required for the current mock-data frontend.

## Documentation

- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — Tokens, typography, components
- [`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md) — Site structure & data model
- [`docs/USER_FLOWS.md`](docs/USER_FLOWS.md) — Buyer, owner, agent, admin journeys
- [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md) — Full implementation blueprint

## Component Library

```
src/components/
├── ui/          Button, Badge, Card, SectionHeader, TrustScore
├── layout/      Header, Footer, PageLayout
├── home/        HeroSearch
├── properties/  PropertyCard, PropertyFilters, MapPreview
└── dashboard/   DashboardShell, StatCard
```

## Differentiators

1. **Surveying Intelligence** — Plot boundaries, GIS map, coordinates, survey PDFs
2. **Trust & Fraud Prevention** — Verification, trust score, inspection badges
3. **Investor Mode** — ROI, rental yield, area growth, AI recommendations
4. **Booking & Payments** — Site visits, reservations, deposits (Stripe + mobile money)

## Build

```bash
npm run build
npm run preview
```
"# realestate" 
