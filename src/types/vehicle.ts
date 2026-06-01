export type VehicleCondition = 'new' | 'used' | 'certified'
export type VehicleBody = 'suv' | 'sedan' | 'pickup' | 'luxury' | 'electric'
export type VehicleStatus = 'available' | 'reserved' | 'sold'

export interface Vehicle {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  currency: string
  mileage: string
  transmission: 'automatic' | 'manual'
  fuel: string
  color: string
  location: string
  city: string
  country: string
  images: string[]
  verified: boolean
  trustScore: number
  specs: string[]
  description: string
  agentId: string
  featured?: boolean
  condition: VehicleCondition
  bodyType: VehicleBody
  status: VehicleStatus
}
