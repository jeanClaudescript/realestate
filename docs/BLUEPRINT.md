# Implementation Blueprint — Car House Real Estate

## Executive Summary

Car House Real Estate is a premium property marketplace targeting **land investors**, **luxury buyers**, **renters**, and **commercial clients** in high-growth markets (UAE/Dubai-first positioning). The platform differentiates through **surveying intelligence**, **trust verification**, and **investor-grade analytics** — not just listings.

**Current deliverable:** High-fidelity React UI with design system, 6 primary screens, component library, and full documentation for backend integration.

---

## Phase 1 — Foundation (Complete in this repo)

- [x] React + TypeScript + Vite scaffold
- [x] Tailwind design tokens & typography
- [x] Framer Motion micro-interactions
- [x] Component library (UI, layout, property, dashboard)
- [x] Homepage with cinematic hero + premium search
- [x] Listings page (grid/map hybrid, filters, compare)
- [x] Property detail (gallery, survey, ROI, CTAs)
- [x] Owner, Agent, Admin dashboards
- [x] Mock data layer for demo

---

## Phase 2 — Backend & Auth (4–6 weeks)

### Stack
- **API:** Node.js (Express/Fastify) or Supabase Edge Functions
- **DB:** PostgreSQL with Prisma ORM
- **Auth:** Supabase Auth or Clerk — Google, Email, Phone OTP
- **Storage:** S3 / Supabase Storage for media & survey PDFs

### Priority endpoints
1. `CRUD /properties` with role-based access
2. `POST /media/upload` — presigned URLs
3. `POST /survey` — GeoJSON boundaries + PDF metadata
4. `POST /visits` + `POST /reservations`
5. `POST /payments/webhook` — Stripe + mobile money adapter

---

## Phase 3 — Maps & Surveying (3–4 weeks)

- Google Maps JavaScript API — listing pins, detail map
- **GIS layer:** Plot boundaries as GeoJSON polygons
- Coordinate display from survey records
- Terrain/elevation: Mapbox Terrain-RGB or Google Elevation API
- Survey PDF viewer (PDF.js) with download

---

## Phase 4 — Trust & Verification (3 weeks)

| Feature | Implementation |
|---------|----------------|
| Verified ownership | Document upload → admin review workflow |
| Legal doc check | OCR + manual review queue |
| Trust score | Algorithm: docs + inspection + history |
| Fraud detection | Price anomaly, duplicate deeds, velocity rules |
| Inspection badge | Third-party inspector integration |

---

## Phase 5 — Investor & AI (4 weeks)

- ROI / rental yield calculators (server-validated formulas)
- Area growth data feed (market API or internal analytics)
- **AI recommendations:** Embedding property features + user behavior → vector search (pgvector / Pinecone)
- Personalized home feed section

---

## Phase 6 — Booking & Payments (3 weeks)

| Provider | Use case |
|----------|----------|
| Stripe | Card deposits, international buyers |
| Mobile Money | M-Pesa, local UAE gateways |
| Cal.com / custom | Site visit scheduling |
| SendGrid + Twilio | Email/SMS reminders |

---

## Folder Structure (Production Target)

```
carhouse-realestate/
├── src/                    # Frontend (current)
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── jobs/           # Reminders, fraud scans
│   └── prisma/
├── docs/                   # This documentation
└── infra/                  # Docker, CI/CD
```

---

## Environment Variables

```env
# Frontend
VITE_API_URL=
VITE_GOOGLE_MAPS_KEY=
VITE_STRIPE_PUBLIC_KEY=

# Backend
DATABASE_URL=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
GOOGLE_MAPS_SERVER_KEY=
AWS_S3_BUCKET=
TWILIO_ACCOUNT_SID=
SENDGRID_API_KEY=
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| Lighthouse Performance | ≥ 90 |
| Image delivery | WebP/AVIF via CDN |
| Video hero | Lazy load on mobile |

---

## Security Checklist

- [ ] RBAC: owner / agent / admin roles
- [ ] Rate limiting on auth & payment endpoints
- [ ] PII encryption at rest
- [ ] Survey PDF access — signed URLs, expiry
- [ ] AML compliance page + transaction logging
- [ ] CSRF protection on forms

---

## Investor Pitch Highlights

1. **TAM:** Global luxury + land investment market; UAE as beachhead
2. **Moat:** Surveying intelligence + trust stack — hard to replicate
3. **Revenue:** Listing subscriptions, featured placements, transaction fees on deposits, agent SaaS
4. **Traction path:** Demo UI → pilot with 50 verified listings → agent partnerships
5. **Tech:** Modern React stack, API-ready, scales to mobile app (React Native)

---

## Next Steps for Development Team

1. Run `npm install && npm run dev` — review all 6 screens
2. Connect PostgreSQL + Prisma schema from `INFORMATION_ARCHITECTURE.md`
3. Replace `MapPreview` placeholder with Google Maps + GeoJSON layer
4. Implement auth gate on dashboard routes
5. Wire Stripe Checkout for "Reserve Property Online"
6. Deploy frontend to Vercel; API to Railway/Fly.io
