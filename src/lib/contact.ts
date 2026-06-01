import type { Property, Agent } from '@/types/property'
import { normalizeRwandaDigits } from '@/lib/phone'

/** Raw 9-digit Rwanda mobile for tel: / wa.me */
export function getPropertyOwnerPhone(property: Property, agents: Agent[]): string {
  if (property.ownerPhone) return normalizeRwandaDigits(property.ownerPhone)
  const agent = agents.find((a) => a.id === property.agentId)
  if (agent?.whatsapp) return normalizeRwandaDigits(agent.whatsapp)
  if (agent?.phone) return normalizeRwandaDigits(agent.phone)
  return '788000000'
}

export function getPropertyOwnerName(property: Property, agents: Agent[]): string {
  if (property.ownerName) return property.ownerName
  const agent = agents.find((a) => a.id === property.agentId)
  return agent?.name ?? 'Property owner'
}
