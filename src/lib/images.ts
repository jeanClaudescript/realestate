import type { PropertyType } from '@/types/property'

/** Reliable picsum seeds — stable per listing, grouped by property type */
const SEEDS = {
  house: ['villa-kimihurura', 'villa-pool', 'villa-interior', 'family-home', 'suburban-rwanda'],
  apartment: ['apt-living', 'apt-bedroom', 'apt-building', 'penthouse-view', 'city-skyline'],
  land: ['land-plot', 'land-aerial', 'land-green', 'kigali-hills', 'development-plot'],
  commercial: ['office-tower', 'office-lobby', 'commercial-block', 'retail-space', 'business-park'],
  lakeside: ['lake-kivu', 'lake-view', 'waterfront'],
  volcano: ['musanze-hills', 'green-terrain', 'rural-plot'],
  kigali: ['kigali-city', 'kigali-hills', 'rwanda-modern'],
  ceo: 'ceo-innocent-portrait',
  hero: 'kigali-hero-hills',
  map: 'rwanda-map-aerial',
} as const

function picsum(seed: string, width = 1200, height = 800): string {
  const safe = seed.replace(/[^a-z0-9-]/gi, '-').toLowerCase()
  return `https://picsum.photos/seed/carhouse-${safe}/${width}/${height}`
}

/** Images matched to property type, location & listing id */
export function imagesForProperty(
  type: PropertyType,
  listingId: string,
  count = 3,
  location?: string
): string[] {
  const loc = location?.toLowerCase() ?? ''
  let pool: readonly string[]

  if (loc.includes('rubavu') || loc.includes('kivu')) {
    pool = SEEDS.lakeside
  } else if (loc.includes('musanze')) {
    pool = SEEDS.volcano
  } else if (loc.includes('nyarutarama') || loc.includes('garden') || loc.includes('gacuriro')) {
    pool = SEEDS.house
  } else if (loc.includes('rebero') || loc.includes('penthouse') || loc.includes('cbd')) {
    pool = SEEDS.apartment
  } else if (loc.includes('commercial') || loc.includes('kacyiru')) {
    pool = SEEDS.commercial
  } else {
    pool = SEEDS[type]
  }

  const offset =
    listingId.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % pool.length

  return Array.from({ length: count }, (_, i) =>
    picsum(`${pool[(offset + i) % pool.length]}-${listingId}-${i}`)
  )
}

export function imageForLocation(locationName: string, width = 800, height = 600): string {
  const key = locationName.toLowerCase()
  if (key.includes('musanze')) return picsum(SEEDS.volcano[0], width, height)
  if (key.includes('rubavu') || key.includes('kivu')) return picsum(SEEDS.lakeside[0], width, height)
  if (key.includes('kimihurura') || key.includes('nyarutarama')) return picsum(SEEDS.house[0], width, height)
  if (key.includes('kacyiru') || key.includes('rebero')) return picsum(SEEDS.apartment[3], width, height)
  if (key.includes('kicukiro') || key.includes('land')) return picsum(SEEDS.land[0], width, height)
  if (key.includes('remera')) return picsum(SEEDS.apartment[2], width, height)
  return picsum(SEEDS.kigali[1], width, height)
}

export function mapBackdropImage(): string {
  return picsum(SEEDS.map, 1400, 900)
}

export function heroPosterImage(): string {
  return picsum(SEEDS.hero, 1920, 1080)
}

export function ceoImage(width = 600, height = 750): string {
  return picsum(SEEDS.ceo, width, height)
}

export function agentAvatar(name: string, size = 150): string {
  return picsum(`agent-${name}`, size, size)
}

function hashCode(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
  return h
}

/** Generic fallback — stable image from seed */
const ALL_SEEDS = [
  ...SEEDS.house,
  ...SEEDS.apartment,
  ...SEEDS.land,
  ...SEEDS.commercial,
  ...SEEDS.lakeside,
  SEEDS.ceo,
  SEEDS.hero,
]

export function propertyImage(seed: string, width = 1200, height = 800): string {
  const pick = ALL_SEEDS[Math.abs(hashCode(seed)) % ALL_SEEDS.length]
  return picsum(`${pick}-${seed}`, width, height)
}
