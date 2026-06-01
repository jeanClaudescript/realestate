# Car House Real Estate — Design System

## Brand Identity

| Attribute | Value |
|-----------|--------|
| Brand name | Car House Real Estate |
| Short name | Car House |
| Tagline | Land. Homes. Investments. Verified. |
| Voice | Professional, premium, precise, trustworthy |

## Color Palette

### Primary — Dark Luxury
| Token | Hex | Usage |
|-------|-----|--------|
| `brand-charcoal` | `#0B0B0D` | Hero overlays, headers, dark sections |
| `brand-slate` | `#161618` | Cards on dark, map backgrounds |

### Accent — Gold Premium
| Token | Hex | Usage |
|-------|-----|--------|
| `brand-gold` | `#C9A962` | CTAs, highlights, active states |
| `brand-gold-light` | `#E8D5B5` | Gradients, hover accents |
| `brand-gold-dark` | `#A68B4B` | Text on light backgrounds |

### Neutral — Clean Premium
| Token | Hex | Usage |
|-------|-----|--------|
| `brand-mist` | `#FAFAF8` | Page background |
| `brand-cream` | `#F5F3EF` | Section alt, input backgrounds |

### Semantic
| Token | Usage |
|-------|--------|
| Emerald | Verified badges, trust indicators |
| Amber | Status warnings, under offer |
| Red | Fraud alerts, favorites |

## Typography

| Role | Family | Weight | Size |
|------|--------|--------|------|
| Display / H1 | Playfair Display | 600–700 | `clamp(2.5rem, 5vw, 4.5rem)` |
| H2 | Playfair Display | 600 | `clamp(1.5rem, 3vw, 2.25rem)` |
| Body | DM Sans | 400–500 | 16px |
| Caption | DM Sans | 500 | 12–14px |
| Eyebrow | DM Sans | 600 | 12px, tracking `0.15em`, uppercase |

## Spacing Scale

| Token | Value | Usage |
|-------|-------|--------|
| Section Y | `py-20 md:py-28` | Between major sections |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | Content width |
| Card padding | `p-5` / `p-6` / `p-8` | By hierarchy |
| Grid gap | `gap-6` / `gap-8` | Card grids |

## Border Radius

| Element | Radius |
|---------|--------|
| Buttons | `rounded-full` |
| Cards | `rounded-2xl` |
| Search bar | `rounded-3xl` |
| Images | `rounded-xl` |

## Shadows

| Token | Value |
|-------|--------|
| `shadow-card` | Subtle elevation for cards |
| `shadow-luxury` | Deep shadow for hero search, modals |
| `shadow-glow` | Gold glow on map pins |

## Motion

| Pattern | Spec |
|---------|------|
| Page enter | `fadeUp` 0.5–0.6s ease-out |
| Card hover | `y: -4`, shadow increase, 0.2s |
| Button | `scale: 1.02` hover, `0.98` tap |
| Hero stagger | 0.4s delay on search bar |

## Component Specs

### Button
- Variants: `primary` (gold), `secondary` (charcoal), `outline`, `ghost`, `whatsapp`
- Sizes: `sm`, `md`, `lg`
- Always `rounded-full`, semibold

### Badge
- Variants: `gold`, `verified`, `status`, `dark`, `outline`
- Pill shape, 12px semibold

### Property Card
- Aspect ratio 4:3 image
- Gradient overlay bottom
- Verified + status badges top-left
- Favorite + compare top-right
- Trust score in body

### Trust Score
- Shield icon + numeric score
- Color: emerald ≥95, gold ≥85, amber below

## Responsive Breakpoints

| Breakpoint | Layout behavior |
|------------|-----------------|
| `< md` | Single column, mobile nav drawer |
| `md` | 2-column grids |
| `lg` | Sidebar filters, 3-column property grid |
| `xl` | Full 3-column listings without map split |

## Accessibility

- Minimum contrast 4.5:1 on body text
- Focus rings on interactive elements (`focus:border-brand-gold`)
- Semantic HTML: `article`, `nav`, `header`, `main`
- Alt text on all property images
