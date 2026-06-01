import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, Map, GitCompare } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { MobileFilterBar } from '@/components/properties/MobileFilterBar'
import { MapPreview } from '@/components/properties/MapPreview'
import { CompareModal } from '@/components/properties/CompareModal'
import { properties } from '@/lib/mock-data'
import { sortPropertiesForDisplay } from '@/lib/property-order'
import { priceFilterMax } from '@/lib/rwanda'
import { useLocale } from '@/context/LocaleContext'
import type { PropertyType } from '@/types/property'

const SORT_OPTIONS = ['featured', 'price-asc', 'price-desc', 'trust', 'newest'] as const

export function ListingsPage() {
  const { t } = useLocale()
  const [searchParams] = useSearchParams()
  const [showMap, setShowMap] = useState(false)
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
      <section className="pt-[4.25rem] sm:pt-20 pb-20 sm:pb-24 section-muted min-h-[calc(100dvh-4rem)]">
        <div className="max-w-[90rem] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Compact page header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 lg:mb-4">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-brand-gold-dark dark:text-brand-gold mb-0.5">
                {t('listings.eyebrow')}
              </p>
              <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-brand-charcoal dark:text-white truncate">
                {t('listings.title')}
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-0.5">
                {filtered.length} {t('listings.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className={`p-2 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors ${
                  !showMap
                    ? 'bg-brand-gold text-brand-charcoal shadow-sm'
                    : 'surface-card text-brand-charcoal dark:text-white'
                }`}
                aria-label={t('listings.gridView')}
                aria-pressed={!showMap}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className={`p-2 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors ${
                  showMap
                    ? 'bg-brand-gold text-brand-charcoal shadow-sm'
                    : 'surface-card text-brand-charcoal dark:text-white'
                }`}
                aria-label={t('listings.mapView')}
                aria-pressed={showMap}
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>

          <MobileFilterBar
            open={filtersOpen}
            onOpenChange={setFiltersOpen}
            resultCount={filtered.length}
            {...filterProps}
          />

          <div className="lg:grid lg:grid-cols-[11.5rem_minmax(0,1fr)] xl:grid-cols-[13rem_minmax(0,1fr)] gap-4 xl:gap-6 items-start">
            <aside className="hidden lg:block sticky top-[4.25rem] z-30 self-start w-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-xl surface-card shadow-card p-3">
              <PropertyFilters dense {...filterProps} />
            </aside>

            <div
              className={
                showMap
                  ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_min(280px,30%)] xl:gap-5 xl:items-start'
                  : ''
              }
            >
              {/* Listings first — images visible without extra scroll */}
              <div className={showMap ? 'xl:order-1 min-w-0' : 'min-w-0'}>
                {showMap && (
                  <div className="mb-3 xl:hidden">
                    <MapPreview embedded listings={filtered} title={t('listings.mapView')} />
                  </div>
                )}

                <div
                  className={`grid gap-3 sm:gap-4 lg:gap-5 ${
                    showMap
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
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
                  <p className="text-center text-muted py-12 text-sm">
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

              {showMap && (
                <aside className="hidden xl:block xl:order-2 sticky top-[4.25rem] self-start w-full">
                  <MapPreview embedded listings={filtered} title={t('listings.mapView')} />
                </aside>
              )}
            </div>
          </div>
        </div>
      </section>

      {compare.size > 0 && (
        <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] sm:bottom-6 left-1/2 -translate-x-1/2 z-40 glass-dark rounded-2xl px-3 sm:px-6 py-3 flex items-center gap-2 sm:gap-4 shadow-luxury w-[calc(100%-1rem)] max-w-md">
          <GitCompare className="w-5 h-5 text-brand-gold shrink-0" />
          <span className="text-sm truncate flex-1">
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
