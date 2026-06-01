# User Flows — Car House Real Estate

## 1. Buyer / Renter Journey

```mermaid
flowchart TD
    A[Landing Page] --> B{Intent?}
    B -->|Browse| C[Property Listings]
    B -->|Search| D[Hero Search]
    D --> C
    C --> E[Apply Filters / Map]
    E --> F[Property Detail]
    F --> G{Action?}
    G -->|Explore| H[360 Tour / Video]
    G -->|Trust| I[Survey PDF / Trust Score]
    G -->|Invest| J[ROI Calculator]
    G -->|Visit| K[Book Site Visit]
    G -->|Buy| L[Reserve + Deposit]
    K --> M[Calendar + Confirmation]
    L --> N[Stripe / Mobile Money]
    N --> O[Automated Reminders]
```

**Key conversion points:**
1. Hero search → listings (≤2 clicks)
2. Detail page sticky CTAs always visible
3. WhatsApp for instant agent contact
4. Trust score visible before financial commitment

---

## 2. Land Investor Journey

```mermaid
flowchart TD
    A[Home — Investor Section] --> B[Filter: Land]
    B --> C[Listings with Survey Badge]
    C --> D[Detail — Survey Intelligence]
    D --> E[Plot Boundaries GIS]
    E --> F[Download Survey PDF]
    D --> G[ROI + Area Growth]
    G --> H{Decision}
    H -->|Proceed| I[Book Site Visit]
    H -->|Research| J[AI Recommendations]
```

---

## 3. Property Owner Journey

```mermaid
flowchart TD
    A[List Your Property CTA] --> B[Owner Dashboard]
    B --> C[Upload Property Form]
    C --> D[Add Photos / Videos]
    D --> E[Upload Survey Plans]
    E --> F[Submit for Verification]
    F --> G[Admin Review Queue]
    G -->|Approved| H[Listing Live]
    H --> I[Track Inquiries]
    H --> J[Visits Booked]
    H --> K[Payment Management]
```

---

## 4. Agent Journey

```mermaid
flowchart TD
    A[Agent Dashboard] --> B[View Leads]
    B --> C[Qualify Lead]
    C --> D[Schedule Site Visit]
    D --> E[Sales Funnel Update]
    E --> F{Stage}
    F -->|Offer| G[Reservation Flow]
    F -->|Lost| H[Archive Lead]
    B --> I[Messaging]
    I --> J[WhatsApp / In-app]
```

---

## 5. Admin Verification Flow

```mermaid
flowchart TD
    A[New Listing Submitted] --> B[Verification Queue]
    B --> C[Review Legal Documents]
    C --> D[Review Survey Data]
    D --> E{Fraud Check}
    E -->|Flag| F[Fraud Alert]
    E -->|Pass| G[Assign Trust Score]
    G --> H[Approve Listing]
    H --> I[Notify Owner]
    F --> J[Moderation Action]
```

---

## 6. Booking & Payment Flow

| Step | User action | System response |
|------|-------------|-----------------|
| 1 | Click "Book Site Visit" | Open calendar modal |
| 2 | Select date/time | Check agent availability |
| 3 | Confirm | Create visit record + email/SMS |
| 4 | Click "Reserve Online" | Deposit amount display |
| 5 | Pay (Card / Mobile Money) | Stripe / local gateway |
| 6 | Success | Reservation locked + reminders scheduled |

**Reminder schedule:** T-24h, T-2h before visit; payment receipt immediately.

---

## 7. AI Smart Experience (Planned)

1. User browses + saves favorites
2. System builds preference profile (type, budget, location)
3. Home page shows "Recommended for you"
4. Investor mode surfaces high-ROI matches
5. Email digest of new matching listings
