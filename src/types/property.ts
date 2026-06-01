export type PropertyType = 'land' | 'house' | 'apartment' | 'commercial'
export type ListingMode = 'buy' | 'rent'
export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'under_offer'

export interface Coordinates {
  lat: number
  lng: number
}

export interface SurveyData {
  plotArea: string
  dimensions: string
  boundaries: string
  coordinates: Coordinates
  elevation?: string
  surveyPdfUrl?: string
}

export interface InvestmentInsight {
  roiForecast: number
  rentalYield?: number
  appreciationRate: number
  areaGrowthTrend: string
}

export interface Property {
  id: string
  title: string
  type: PropertyType
  mode: ListingMode
  status: PropertyStatus
  price: number
  currency: string
  location: string
  city: string
  country: string
  plotSize?: string
  builtArea?: string
  bedrooms?: number
  bathrooms?: number
  images: string[]
  videoUrl?: string
  has360Tour: boolean
  verified: boolean
  trustScore: number
  specs: string[]
  description: string
  survey?: SurveyData
  investment?: InvestmentInsight
  agentId: string
  featured?: boolean
  /** Premium / beautiful homes showcase */
  luxury?: boolean
}

export interface Agent {
  id: string
  name: string
  avatar: string
  phone: string
  whatsapp: string
  rating: number
  listings: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  avatar: string
  rating: number
}
