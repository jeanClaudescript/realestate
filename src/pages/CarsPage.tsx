import { useMemo, useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { VehicleCard } from '@/components/vehicles/VehicleCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { vehicles } from '@/lib/vehicles-mock-data'
import { useLocale } from '@/context/LocaleContext'
import type { VehicleBody } from '@/types/vehicle'

const bodyFilters: { id: VehicleBody | 'all'; labelKey: string }[] = [
  { id: 'all', labelKey: 'cars.filter.all' },
  { id: 'suv', labelKey: 'cars.filter.suv' },
  { id: 'luxury', labelKey: 'cars.filter.luxury' },
  { id: 'sedan', labelKey: 'cars.filter.sedan' },
  { id: 'electric', labelKey: 'cars.filter.electric' },
  { id: 'pickup', labelKey: 'cars.filter.pickup' },
]

export function CarsPage() {
  const { t } = useLocale()
  const [body, setBody] = useState<VehicleBody | 'all'>('all')

  const filtered = useMemo(() => {
    if (body === 'all') return vehicles
    return vehicles.filter((v) => v.bodyType === body)
  }, [body])

  return (
    <PageLayout>
      <section className="pt-20 sm:pt-24 pb-8 bg-brand-charcoal text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('cars.eyebrow')}
            title={t('cars.title')}
            subtitle={t('cars.subtitle')}
            light
          />
        </div>
      </section>
      <section className="py-8 pb-24 bg-brand-mist dark:bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-6">
            {bodyFilters.map(({ id, labelKey }) => (
              <button
                key={id}
                type="button"
                onClick={() => setBody(id)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-medium min-h-[44px] whitespace-nowrap ${
                  body === id
                    ? 'bg-brand-charcoal text-white dark:bg-brand-gold dark:text-brand-charcoal'
                    : 'surface-card text-muted'
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted py-16">{t('listings.noResults')}</p>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
