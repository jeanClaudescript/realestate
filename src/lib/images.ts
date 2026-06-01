import type { PropertyType } from '@/types/property'

/** Curated Unsplash photos — real house & car imagery per listing */
function unsplash(photoId: string, width = 1200, height = 800): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`
}

const CURATED_LISTING_IMAGES: Record<string, string[]> = {
  // Houses — 6 photos each
  p1: [
    unsplash('photo-1613490493576-7fde63acd811'),
    unsplash('photo-1600585154340-be6161a56a0c'),
    unsplash('photo-1512917774080-9991f1c4c750'),
    unsplash('photo-1600607687939-ce8a6c25118c'),
    unsplash('photo-1600566753190-17f0baa2a6c3'),
    unsplash('photo-1600047509807-ba8f99d2cd7a'),
  ],
  h1: [
    unsplash('photo-1600596542815-ffad4c1539a9'),
    unsplash('photo-1600607687939-ce8a6c25118c'),
    unsplash('photo-1613979617046-2637f8b47b38c'),
    unsplash('photo-1600585154526-990dcee4fd0f'),
    unsplash('photo-1600210492493-0946911133fb'),
    unsplash('photo-1600585152915-d208bec867a1'),
  ],
  h2: [
    unsplash('photo-1564013799919-ab600027ffc6'),
    unsplash('photo-1605276374104-de2d026b19b2'),
    unsplash('photo-1580587771525-78b9dba3b914'),
    unsplash('photo-1600607687644-c7171b42498f'),
    unsplash('photo-1613490493576-7fde63acd811'),
    unsplash('photo-1600047509807-ba8f99d2cd7a'),
  ],
  p5: [
    unsplash('photo-1600047509807-ba8f99d2cd7a'),
    unsplash('photo-1600566753190-17f0baa2a6c3'),
    unsplash('photo-1600585154526-990dcee4fd0f'),
    unsplash('photo-1512917774080-9991f1c4c750'),
    unsplash('photo-1600585154340-be6161a56a0c'),
    unsplash('photo-1600210492493-0946911133fb'),
  ],
  p7: [
    unsplash('photo-1600210492493-0946911133fb'),
    unsplash('photo-1600607687644-c7171b42498f'),
    unsplash('photo-1600585152915-d208bec867a1'),
    unsplash('photo-1600596542815-ffad4c1539a9'),
    unsplash('photo-1564013799919-ab600027ffc6'),
    unsplash('photo-1605276374104-de2d026b19b2'),
  ],
  // Cars — 6 photos each
  c1: [
    unsplash('photo-1519641471654-76ce0107-468'),
    unsplash('photo-1549317661-bd32c8ce0db2'),
    unsplash('photo-1533473359331-0135ef1b58bf'),
    unsplash('photo-1503376780353-7ebb838a9229'),
    unsplash('photo-1492144534655-ae79c964c9d7'),
    unsplash('photo-1541899481282-53bfc4a0b0b0'),
  ],
  c2: [
    unsplash('photo-1618843479313-40f8afb4b4d8'),
    unsplash('photo-1617531653332-bd46c8974d79'),
    unsplash('photo-1617814076367-f77f3a07c2f8'),
    unsplash('photo-1617531653520-bd466a28b8ad'),
    unsplash('photo-1556189250-aa0b47d477a2'),
    unsplash('photo-1502877338535-766e1452684a'),
  ],
  c3: [
    unsplash('photo-1559416523-140ddc4d249c'),
    unsplash('photo-1590362891998-a27e248552a7'),
    unsplash('photo-1494973769469-69c44f611851'),
    unsplash('photo-1558618666-fcd25c85cd64'),
    unsplash('photo-1533473359331-0135ef1b58bf'),
    unsplash('photo-1544636331-e26879cd4d9c'),
  ],
  c4: [
    unsplash('photo-1560958089-b8a1929cea89'),
    unsplash('photo-1617788138017-80ad40651399'),
    unsplash('photo-1621007947382-bcb3e783fbca'),
    unsplash('photo-1593941707882-a5bba14938b7'),
    unsplash('photo-1619767886550-ef32d4f4b3b2'),
    unsplash('photo-1617788138017-80ad40651399', 1200, 800),
  ],
  c5: [
    unsplash('photo-1555215695-3004980ad54e'),
    unsplash('photo-1556189250-aa0b47d477a2'),
    unsplash('photo-1617531653520-bd466a28b8ad'),
    unsplash('photo-1606664515524-ed2f786a0bd6'),
    unsplash('photo-1618843479313-40f8afb4b4d8'),
    unsplash('photo-1544636331-e26879cd4d9c'),
  ],
  c6: [
    unsplash('photo-1606664515524-ed2f786a0bd6'),
    unsplash('photo-1609521263047-f8f205293f24'),
    unsplash('photo-1544636331-e26879cd4d9c'),
    unsplash('photo-1519641471654-76ce0107-468'),
    unsplash('photo-1549317661-bd32c8ce0db2'),
    unsplash('photo-1555215695-3004980ad54e'),
  ],
}

/** Mixkit preview MP4s — house & car walkthroughs per listing */
export const LISTING_VIDEOS: Record<string, string> = {
  p1: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-neighborhood-42948-large.mp4',
  h1: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-residential-neighborhood-5195-large.mp4',
  h2: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-4258-large.mp4',
  p5: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-neighborhood-42948-large.mp4',
  p7: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-4258-large.mp4',
  c1: 'https://assets.mixkit.co/videos/preview/mixkit-white-sports-car-driving-on-a-highway-4045-large.mp4',
  c2: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-luxury-car-4205-large.mp4',
  c3: 'https://assets.mixkit.co/videos/preview/mixkit-a-man-driving-a-car-from-the-passenger-side-4289-large.mp4',
  c4: 'https://assets.mixkit.co/videos/preview/mixkit-sport-car-driving-on-a-highway-in-the-mountains-4313-large.mp4',
  c5: 'https://assets.mixkit.co/videos/preview/mixkit-red-sport-car-driving-on-a-highway-4044-large.mp4',
  c6: 'https://assets.mixkit.co/videos/preview/mixkit-urban-traffic-at-night-4304-large.mp4',
}

export function listingVideo(listingId: string): string | undefined {
  return LISTING_VIDEOS[listingId]
}

/** Reliable picsum seeds — fallback for land, apartments, commercial */
const SEEDS = {
  house: ['villa-kimihurura', 'villa-pool', 'villa-interior', 'family-home', 'suburban-rwanda'],
  apartment: ['apt-living', 'apt-bedroom', 'apt-building', 'penthouse-view', 'city-skyline'],
  land: ['land-plot', 'land-aerial', 'land-green', 'kigali-hills', 'development-plot'],
  commercial: ['office-tower', 'office-lobby', 'commercial-block', 'retail-space', 'business-park'],
  car: ['luxury-sedan', 'suv-kigali', 'pickup-4x4', 'electric-car', 'sports-coupe', 'classic-ride'],
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
  const curated = CURATED_LISTING_IMAGES[listingId]
  if (curated?.length) {
    if (curated.length >= count) return curated.slice(0, count)
    return [...curated, ...curated].slice(0, count)
  }

  const loc = location?.toLowerCase() ?? ''
  let pool: readonly string[]

  if (type === 'car') {
    pool = SEEDS.car
  } else if (loc.includes('rubavu') || loc.includes('kivu')) {
    pool = SEEDS.lakeside
  } else if (loc.includes('musanze')) {
    pool = SEEDS.volcano
  } else if (loc.includes('nyarutarama') || loc.includes('garden') || loc.includes('gacuriro')) {
    pool = SEEDS.house
  } else if (loc.includes('rebero') || loc.includes('penthouse') || loc.includes('cbd')) {
    pool = SEEDS.apartment
  } else if (loc.includes('commercial') || (loc.includes('kacyiru') && type === 'commercial')) {
    pool = SEEDS.commercial
  } else {
    pool = SEEDS[type]
  }

  const offset = listingId.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % pool.length

  return Array.from({ length: count }, (_, i) =>
    picsum(`${pool[(offset + i) % pool.length]}-${listingId}-${i}`)
  )
}

export function imageForLocation(locationName: string, width = 800, height = 600): string {
  const key = locationName.toLowerCase()
  if (key.includes('musanze')) return picsum(SEEDS.volcano[0], width, height)
  if (key.includes('rubavu') || key.includes('kivu')) return picsum(SEEDS.lakeside[0], width, height)
  if (key.includes('kimihurura') || key.includes('nyarutarama')) {
    return unsplash('photo-1613490493576-7fde63acd811', width, height)
  }
  if (key.includes('kacyiru') || key.includes('rebero')) return picsum(SEEDS.apartment[3], width, height)
  if (key.includes('kicukiro') || key.includes('land')) return picsum(SEEDS.land[0], width, height)
  if (key.includes('remera')) return picsum(SEEDS.apartment[2], width, height)
  return picsum(SEEDS.kigali[1], width, height)
}

export function mapBackdropImage(): string {
  return picsum(SEEDS.map, 1400, 900)
}

export function heroPosterImage(): string {
  return unsplash('photo-1600585154340-be6161a56a0c', 1920, 1080)
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

const ALL_SEEDS = [
  ...SEEDS.house,
  ...SEEDS.apartment,
  ...SEEDS.land,
  ...SEEDS.commercial,
  ...SEEDS.car,
  ...SEEDS.lakeside,
  SEEDS.ceo,
  SEEDS.hero,
]

export function propertyImage(seed: string, width = 1200, height = 800): string {
  const pick = ALL_SEEDS[Math.abs(hashCode(seed)) % ALL_SEEDS.length]
  return picsum(`${pick}-${seed}`, width, height)
}
