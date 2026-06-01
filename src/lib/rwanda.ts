/** Rwanda locale — Car House Real Estate */

export const locale = {
  country: 'Rwanda',
  countryCode: 'RW',
  currency: 'RWF',
  currencySymbol: 'Frw',
  phonePrefix: '+250',
  capital: 'Kigali',
  mapCenter: { lat: -1.9403, lng: 30.0588 },
} as const

export const districts = [
  'Gasabo',
  'Kicukiro',
  'Nyarugenge',
  'Musanze',
  'Rubavu',
  'Huye',
  'Rwamagana',
  'Muhanga',
] as const

export const kigaliNeighborhoods = [
  'Kimihurura',
  'Kacyiru',
  'Nyarutarama',
  'Remera',
  'Gacuriro',
  'Kicukiro',
  'Niboye',
  'Rebero',
  'Kimironko',
  'Gisozi',
  'Nyamirambo',
  'Kabeza',
] as const

export const paymentMethods = [
  { id: 'mtn', name: 'MTN MoMo', desc: 'Mobile Money' },
  { id: 'airtel', name: 'Airtel Money', desc: 'Mobile Money' },
  { id: 'card', name: 'Visa / Mastercard', desc: 'Cards via Stripe' },
  { id: 'bank', name: 'Bank Transfer', desc: 'BK, Equity, I&M' },
] as const

/** Format Rwandan Franc amounts */
export function formatRWF(
  amount: number,
  options?: { compact?: boolean; monthly?: boolean }
): string {
  const { compact = true, monthly = false } = options ?? {}

  let formatted: string
  if (compact && amount >= 1_000_000_000) {
    formatted = `RWF ${(amount / 1_000_000_000).toFixed(2)}B`
  } else if (compact && amount >= 1_000_000) {
    formatted = `RWF ${(amount / 1_000_000).toFixed(1)}M`
  } else if (compact && amount >= 1_000) {
    formatted = `RWF ${(amount / 1_000).toFixed(0)}K`
  } else {
    formatted = `RWF ${amount.toLocaleString('en-RW')}`
  }

  return monthly ? `${formatted} /mo` : formatted
}

export const priceFilterMax = 2_000_000_000 // 2 billion RWF
