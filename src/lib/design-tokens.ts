/** Car House Real Estate — Design System Tokens */
export const brand = {
  name: 'Car House Real Estate',
  shortName: 'Car House',
  tagline: 'Rwanda\'s premium marketplace for land, homes & investments.',
  domain: 'carhouse.rw',
  headquarters: 'Kigali, Rwanda',
  ceo: {
    name: 'Innocent',
    fullTitle: 'Founder & CEO',
    company: 'Innocent Real Estate',
    tagline: 'Led by Innocent — trusted land, homes & investments across Rwanda.',
    bio: 'Innocent founded Innocent Real Estate to bring survey-grade transparency, verified titles, and premium service to every buyer, seller, and investor in Rwanda.',
    yearsExperience: 12,
    listingsSold: '850+',
  },
} as const

export const colors = {
  charcoal: '#0B0B0D',
  slate: '#161618',
  gold: '#C9A962',
  goldLight: '#E8D5B5',
  goldDark: '#A68B4B',
  mist: '#FAFAF8',
  cream: '#F5F3EF',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
} as const

export const typography = {
  display: '"Playfair Display", Georgia, serif',
  body: '"DM Sans", system-ui, sans-serif',
  scale: {
    hero: 'clamp(2.5rem, 5vw, 4.5rem)',
    h1: 'clamp(2rem, 4vw, 3rem)',
    h2: 'clamp(1.5rem, 3vw, 2.25rem)',
    h3: '1.25rem',
    body: '1rem',
    small: '0.875rem',
    caption: '0.75rem',
  },
} as const

export const spacing = {
  section: 'py-20 md:py-28 lg:py-32',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
} as const

export const radii = {
  card: '1rem',
  cardLg: '1.5rem',
  pill: '9999px',
} as const
