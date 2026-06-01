import { properties } from '@/lib/mock-data'
export { vehicles, featuredVehicles, formatVehiclePrice } from '@/lib/vehicles-mock-data'

/** Premium beautiful homes — featured first on the website */
export const beautifulHouses = properties
  .filter((p) => p.type === 'house' && (p.luxury || p.featured))
  .sort((a, b) => {
    if (a.luxury !== b.luxury) return (b.luxury ? 1 : 0) - (a.luxury ? 1 : 0)
    return b.trustScore - a.trustScore
  })

export function getBeautifulHouses(limit = 6) {
  return beautifulHouses.slice(0, limit)
}
