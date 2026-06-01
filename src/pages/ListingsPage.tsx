import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, Map, GitCompare } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { MobileFilterBar } from '@/components/properties/MobileFilterBar'
import { MapPreview } from '@/components/properties/MapPreview'
import { CompareModal } from '@/components/properties/CompareModal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { properties } from '@/lib/mock-data'
import { sortPropertiesForDisplay } from '@/lib/property-order'
import { priceFilterMax } from '@/lib/rwanda'
import { useLocale } from '@/context/LocaleContext'
import type { PropertyType } from '@/types/property'

const SORT_OPTIONS = ['featured', 'price-asc', 'price-desc', 'trust', 'newest'] as const

export function ListingsPage() {
  const { t } = useLocale()
  const [searchParams] = useSearchParams()
  const [view, setView] = useState<'grid' | 'split'>('split')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [compare, setCompare] = useState<Set<string>>(new Set())
  const [compareOpen, setCompareOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, priceFilterMax])
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const modeParam = searchParams.get('mode')
  const typeParam = searchParams.get('type') as PropertyType | null
  const locationParam = searchParams.get('location')?.toLowerCase()

  useEffect(() => {
    const sort = searchParams.get('sort')
    if (sort && SORT_OPTIONS.includes(sort as (typeof SORT_OPTIONS)[number])) {
      setSortBy(sort)
    }
  }, [searchParams])

  useEffect(() => {
    if (typeParam) setSelectedTypes([typeParam])
  }, [typeParam])

  const filtered = useMemo(() => {
    let list = [...properties]
    if (modeParam) list = list.filter((p) => p.mode === modeParam)
    if (typeParam) list = list.filter((p) => p.type === typeParam)
    if (locationParam) {
      list = list.filter(
        (p) =>
          p.location.toLowerCase().includes(locationParam) ||
          p.city.toLowerCase().includes(locationParam)
      )
    }
    if (selectedTypes.length) list = list.filter((p) => selectedTypes.includes(p.type))
    if (verifiedOnly) list = list.filter((p) => p.verified)
    list = list.filter((p) => p.price <= priceRange[1])

    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'trust':
        return list.sort((a, b) => b.trustScore - a.trustScore)
      default:
        return sortPropertiesForDisplay(list)
    }
  }, [modeParam, typeParam, locationParam, selectedTypes, verifiedOnly, priceRange, sortBy])

  const compareProperties = useMemo(
    () => properties.filter((p) => compare.has(p.id)),
    [compare]
  )

  const filterProps = {
    priceRange,
    onPriceChange: setPriceRange,
    selectedTypes,
    onTypeToggle: (type: PropertyType) => {
      setSelectedTypes((prev) =>
        prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]
      )
    },
    verifiedOnly,
    onVerifiedToggle: () => setVerifiedOnly((v) => !v),
    sortBy,
    onSortChange: setSortBy,
    onClear: () => {
      setSelectedTypes([])
      setVerifiedOnly(false)
      setPriceRange([0, priceFilterMax])
      setSortBy('featured')
    },
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else if (next.size < 3) next.add(id)
      return next
    })
  }

  return (
    <PageLayout>
      <section className="pt-20 sm:pt-24 pb-8 bg-brand-charcoal dark:bg-brand-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('listings.eyebrow')}
            title={t('listings.title')}
            subtitle={`${filtered.length} ${t('listings.subtitle')}`}
            light
          />
        </div>
      </section>

      <section className="py-8 pb-24 sm:pb-28 bg-brand-mist dark:bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2 lg:mb-6">
            <p className="text-muted text-sm hidden lg:block">
              {t('listings.showing')}{' '}
              <strong className="text-brand-charcoal dark:text-white">{filtered.length}</strong>{' '}
              {t('listings.properties')}
            </p>
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => setView('grid')}
                className={`p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  view === 'grid'
                    ? 'bg-brand-charcoal text-white dark:bg-brand-gold dark:text-brand-charcoal'
                    : 'surface-card text-brand-charcoal dark:text-white'
                }`}
                aria-label={t('listings.gridView')}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setView('split')}
                className={`p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  view === 'split'
                    ? 'bg-brand-charcoal text-white dark:bg-brand-gold dark:text-brand-charcoal'
                    : 'surface-card text-brand-charcoal dark:text-white'
                }`}
                aria-label={t('listings.mapView')}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>
          </div>

          <MobileFilterBar
            open={filtersOpen}
            onOpenChange={setFiltersOpen}
            resultCount={filtered.length}
            {...filterProps}
          />

          <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">
            <aside className="hidden lg:block sticky top-20 z-30 self-start w-full max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain rounded-2xl surface-card shadow-card p-6">
              <PropertyFilters {...filterProps} />
            </aside>

            <div className="min-w-0">
              {view === 'split' && (
                <div className="mb-6">
                  <MapPreview compact />
                </div>
              )}
              <div
                className={`grid gap-4 sm:gap-6 ${
                  view === 'split'
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filtered.map((p) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    isFavorite={favorites.has(p.id)}
                    isCompared={compare.has(p.id)}
                    onFavorite={toggleFavorite}
                    onCompare={toggleCompare}
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-center text-muted py-16">
                  {t('listings.noResults')}{' '}
                  <button
                    type="button"
                    onClick={filterProps.onClear}
                    className="text-brand-gold-dark font-semibold underline"
                  >
                    {t('listings.clearFilters')}
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {compare.size > 0 && (
        <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] sm:bottom-6 left-1/2 -translate-x-1/2 z-40 glass-dark rounded-2xl px-3 sm:px-6 py-3 flex items-center gap-2 sm:gap-4 shadow-luxury w-[calc(100%-1rem)] max-w-md">
          <GitCompare className="w-5 h-5 text-brand-gold shrink-0" />
          <span className="text-white text-sm truncate flex-1">
            {compare.size} {t('compare.selected')}
          </span>
          <button
            type="button"
            className="text-brand-gold text-sm font-semibold hover:underline shrink-0 min-h-[44px] px-2"
            onClick={() => setCompareOpen(true)}
          >
            {t('compare.now')}
          </button>
        </div>
      )}

      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        properties={compareProperties}
        onRemove={(id) => {
          setCompare((prev) => {
            const next = new Set(prev)
            next.delete(id)
            if (next.size === 0) setCompareOpen(false)
            return next
          })
        }}
      />
    </PageLayout>
  )
}
