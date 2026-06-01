/** Rwanda phone formatting — display + tel/WhatsApp links */

export function normalizeRwandaDigits(input: string): string {
  let d = input.replace(/\D/g, '')
  if (d.startsWith('250')) d = d.slice(3)
  if (d.startsWith('0')) d = d.slice(1)
  return d
}

/** Display: +250 788 123 456 */
export function formatRwandaPhone(input: string): string {
  const d = normalizeRwandaDigits(input)
  if (d.length !== 9) {
    return input.trim() || '+250 — — —'
  }
  return `+250 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)}`
}

/** E.164 for tel: / wa.me */
export function rwandaPhoneE164(input: string): string {
  const d = normalizeRwandaDigits(input)
  return d.length === 9 ? `250${d}` : input.replace(/\D/g, '')
}

export function telHref(input: string): string {
  return `tel:+${rwandaPhoneE164(input)}`
}
