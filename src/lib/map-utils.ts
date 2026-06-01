import type { Property } from '@/types/property'
import { locale } from '@/lib/rwanda'

/** Kigali bounding box for map pin projection */
const BOUNDS = {
  north: -1.915,
  south: -1.995,
  west: 30.02,
  east: 30.14,
}

/** Approximate pin positions for neighborhoods (percent on map) */
export const NEIGHBORHOOD_MAP: Record<string, { left: number; top: number; lat: number; lng: number }> = {
  Kimihurura: { left: 28, top: 32, lat: -1.9361, lng: 30.0892 },
  Kacyiru: { left: 52, top: 28, lat: -1.939, lng: 30.095 },
  Nyarutarama: { left: 38, top: 48, lat: -1.9523, lng: 30.1056 },
  Remera: { left: 58, top: 52, lat: -1.958, lng: 30.112 },
  Gacuriro: { left: 42, top: 22, lat: -1.928, lng: 30.102 },
  Kicukiro: { left: 72, top: 58, lat: -1.9892, lng: 30.1124 },
  Niboye: { left: 78, top: 65, lat: -1.995, lng: 30.118 },
  Rebero: { left: 48, top: 62, lat: -1.965, lng: 30.098 },
  Kimironko: { left: 68, top: 38, lat: -1.948, lng: 30.108 },
  Gisozi: { left: 35, top: 18, lat: -1.922, lng: 30.085 },
  Nyamirambo: { left: 22, top: 58, lat: -1.972, lng: 30.042 },
  Kabeza: { left: 82, top: 48, lat: -1.978, lng: 30.125 },
  'Nyarugenge CBD': { left: 18, top: 42, lat: -1.95, lng: 30.058 },
  Musanze: { left: 12, top: 12, lat: -1.4998, lng: 29.6344 },
  Rubavu: { left: 8, top: 8, lat: -1.7, lng: 29.33 },
}

export interface MapPinData {
  id: string
  label: string
  left: number
  top: number
  count: number
  href: string
  featured?: boolean
}

export function coordsToMapPercent(lat: number, lng: number): { left: number; top: number } {
  const left = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100
  const top = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * 100
  return {
    left: Math.min(92, Math.max(8, left)),
    top: Math.min(88, Math.max(12, top)),
  }
}

export function getPropertyMapPosition(property: Property): { left: number; top: number } {
  if (property.survey?.coordinates) {
    return coordsToMapPercent(property.survey.coordinates.lat, property.survey.coordinates.lng)
  }
  const hood = NEIGHBORHOOD_MAP[property.location]
  if (hood) return { left: hood.left, top: hood.top }
  return coordsToMapPercent(locale.mapCenter.lat, locale.mapCenter.lng)
}

export function buildLocationPins(listings: Property[]): MapPinData[] {
  const groups = new Map<string, Property[]>()
  for (const p of listings) {
    const key = p.location
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(p)
  }

  return Array.from(groups.entries()).map(([label, props]) => {
    const pos = getPropertyMapPosition(props[0])
    return {
      id: label,
      label,
      left: pos.left,
      top: pos.top,
      count: props.length,
      href: `/properties?location=${encodeURIComponent(label)}`,
      featured: props.some((p) => p.featured),
    }
  })
}

export const kigaliMapEmbedUrl =
  'https://www.openstreetmap.org/export/embed.html?bbox=30.0180%2C-1.9920%2C30.1280%2C-1.9180&layer=mapnik&marker=-1.9403%2C30.0588'

export const googleMapsKigaliUrl =
  'https://www.google.com/maps/search/real+estate/@-1.9403,30.0588,12z'
