import type { Property } from '@/types/property'
import { formatPrice } from '@/lib/mock-data'

export interface CompareRow {
  key: string
  label: string
  render: (p: Property) => string
  /** Highlight lowest numeric value in row (e.g. price) */
  highlightMin?: boolean
  /** Highlight highest numeric value in row (e.g. trust) */
  highlightMax?: boolean
}

export function buildCompareRows(
  t: (key: string) => string,
  properties: Property[]
): CompareRow[] {
  const rows: CompareRow[] = [
    {
      key: 'price',
      label: t('compare.price'),
      render: (p) => formatPrice(p.price, p.currency, p.mode),
      highlightMin: true,
    },
    {
      key: 'type',
      label: t('compare.type'),
      render: (p) => t(`filters.type.${p.type}` as 'filters.type.house'),
    },
    {
      key: 'location',
      label: t('compare.location'),
      render: (p) => `${p.location}, ${p.city}`,
    },
  ]

  const hasCar = properties.some((p) => p.type === 'car')
  const hasHome = properties.some((p) => p.type !== 'car')

  if (hasCar) {
    rows.push(
      {
        key: 'year',
        label: t('compare.year'),
        render: (p) => (p.vehicle ? String(p.vehicle.year) : '—'),
      },
      {
        key: 'mileage',
        label: t('compare.mileage'),
        render: (p) => p.vehicle?.mileage ?? '—',
      }
    )
  }

  if (hasHome) {
    rows.push(
      {
        key: 'size',
        label: t('compare.size'),
        render: (p) => (p.type === 'car' ? '—' : p.plotSize ?? p.builtArea ?? '—'),
      },
      {
        key: 'beds',
        label: t('compare.beds'),
        render: (p) => (p.bedrooms != null ? String(p.bedrooms) : '—'),
      },
      {
        key: 'baths',
        label: t('compare.baths'),
        render: (p) => (p.bathrooms != null ? String(p.bathrooms) : '—'),
      }
    )
  }

  rows.push(
    {
      key: 'trust',
      label: t('compare.trust'),
      render: (p) => `${p.trustScore}%`,
      highlightMax: true,
    },
    {
      key: 'status',
      label: t('compare.status'),
      render: (p) => p.status.replace('_', ' '),
    }
  )

  return rows
}

export function getRowHighlight(
  row: CompareRow,
  properties: Property[],
  propertyId: string
): 'min' | 'max' | null {
  if (!row.highlightMin && !row.highlightMax) return null
  const p = properties.find((x) => x.id === propertyId)
  if (!p) return null

  const numeric = properties
    .map((prop) => {
      if (row.key === 'price') return prop.price
      if (row.key === 'trust') return prop.trustScore
      return NaN
    })
    .filter((n) => !Number.isNaN(n))

  if (numeric.length < 2) return null
  const val = row.key === 'price' ? p.price : row.key === 'trust' ? p.trustScore : NaN
  if (Number.isNaN(val)) return null

  if (row.highlightMin && val === Math.min(...numeric)) return 'min'
  if (row.highlightMax && val === Math.max(...numeric)) return 'max'
  return null
}

export const MAX_COMPARE = 3
