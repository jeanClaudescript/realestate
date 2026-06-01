# Information Architecture — Car House Real Estate

## Site Map

```
Car House Real Estate
├── Public
│   ├── Home (/)
│   ├── Properties (/properties)
│   │   ├── Buy | Rent | Land | Commercial (query filters)
│   │   └── Property Detail (/properties/:id)
│   ├── Book Visit (modal / flow from detail)
│   ├── Reserve Online (checkout flow)
│   └── Auth (login / register) — planned
├── Owner Dashboard (/dashboard/owner)
│   ├── Overview
│   ├── Listings CRUD
│   ├── Media Upload (photos, video, 360)
│   ├── Survey Plans
│   ├── Inquiries
│   ├── Visits Calendar
│   ├── Analytics
│   └── Payments
├── Agent Dashboard (/dashboard/agent)
│   ├── Overview
│   ├── Leads
│   ├── Properties
│   ├── Messages
│   ├── Sales Funnel
│   └── Appointments
└── Admin Panel (/dashboard/admin)
    ├── Verification Queue
    ├── User Management
    ├── Fraud Detection
    ├── Analytics
    ├── Revenue
    ├── Subscriptions
    └── Moderation
```

## Entity Relationship (Core)

```
User ──┬── owns ──► Property
       ├── books ──► Visit
       ├── pays ──► Reservation / Deposit
       └── (role) ──► Owner | Agent | Admin

Property ──┬── has ──► Media (images, video, 360)
           ├── has ──► Survey (boundaries, coords, PDF)
           ├── has ──► TrustScore + Verification
           ├── has ──► InvestmentInsight
           └── assigned ──► Agent

Verification ──► Property (workflow: pending → review → approved)
FraudAlert ──► Property | User
```

## Property Taxonomy

| Dimension | Values |
|-----------|--------|
| Type | `land`, `house`, `apartment`, `commercial` |
| Mode | `buy`, `rent` |
| Status | `available`, `reserved`, `sold`, `under_offer` |

## Content Types per Page

| Page | Primary content | Secondary |
|------|-----------------|-----------|
| Home | Hero video, search, featured | Map, trust, investor, testimonials |
| Listings | Filtered grid + map | Compare bar, sort |
| Detail | Gallery, specs, survey | ROI, mortgage, agent, CTAs |
| Owner | Stats, listings, visits | Upload actions |
| Agent | Funnel, leads, messages | Property table |
| Admin | Verification queue, fraud | Analytics chart |

## Search & Filter Schema

```typescript
interface SearchParams {
  mode?: 'buy' | 'rent'
  type?: PropertyType
  location?: string
  budgetMin?: number
  budgetMax?: number
  sizeMin?: number
  sizeMax?: number
  verified?: boolean
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'trust' | 'newest'
}
```

## API Routes (Planned — Backend)

```
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PATCH  /api/properties/:id
POST   /api/properties/:id/media
POST   /api/properties/:id/survey
POST   /api/visits
POST   /api/reservations
POST   /api/payments/deposit
GET    /api/investor/insights/:propertyId
GET    /api/ai/recommendations
POST   /api/admin/verify/:propertyId
GET    /api/admin/fraud-alerts
```

## Database Tables (PostgreSQL — Planned)

- `users`, `properties`, `property_media`, `surveys`
- `verifications`, `trust_scores`, `fraud_alerts`
- `visits`, `reservations`, `payments`
- `investment_insights`, `subscriptions`
- `messages`, `leads`, `analytics_events`
