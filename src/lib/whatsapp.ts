import { formatPrice } from '@/lib/mock-data'
import { rwandaPhoneE164 } from '@/lib/phone'
import type { Property } from '@/types/property'

/** Build wa.me link with optional pre-filled message */
export function buildWhatsAppUrl(
  phone: string,
  property?: Pick<Property, 'title' | 'price' | 'currency' | 'mode' | 'location' | 'id'>
): string {
  const digits = rwandaPhoneE164(phone)
  let text = 'Hello Car House Real Estate, I would like more information.'

  if (property) {
    const price = formatPrice(property.price, property.currency, property.mode)
    text = `Hello, I'm interested in this property on Car House:\n\n*${property.title}*\n${property.location} · ${price}\n\nhttps://carhouse.rw/properties/${property.id}`
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}
