import type { Property, PropertyType } from '@/types/property'

/** Houses first, then cars, then other property types */
const TYPE_RANK: Record<PropertyType, number> = {
  house: 0,
  car: 1,
  apartment: 2,
  land: 3,
  commercial: 4,
}

export function sortPropertiesForDisplay(list: Property[]): Property[] {
  return [...list].sort((a, b) => {
    const typeDiff = TYPE_RANK[a.type] - TYPE_RANK[b.type]
    if (typeDiff !== 0) return typeDiff
    if (Boolean(b.featured) !== Boolean(a.featured)) {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
    return b.trustScore - a.trustScore
  })
}
