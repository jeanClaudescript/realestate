import { PageLayout } from '@/components/layout/PageLayout'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getBeautifulHouses } from '@/lib/catalog'
import { useLocale } from '@/context/LocaleContext'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function HousesPage() {
  const { t } = useLocale()
  const houses = getBeautifulHouses(12)

  return (
    <PageLayout>
      <section className="pt-20 sm:pt-24 pb-8 bg-brand-charcoal dark:bg-brand-slate text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('houses.eyebrow')}
            title={t('houses.title')}
            subtitle={t('houses.subtitle')}
            light
          />
        </div>
      </section>
      <section className="py-10 pb-24 bg-brand-mist dark:bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/properties?type=house">
              <Button variant="secondary" size="lg">
                {t('houses.allHouses')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
