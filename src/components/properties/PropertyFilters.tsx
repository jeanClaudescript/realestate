import { SlidersHorizontal, X } from 'lucide-react'
import type { PropertyType } from '@/types/property'
import { priceFilterMax } from '@/lib/rwanda'
import { useLocale } from '@/context/LocaleContext'

export interface PropertyFiltersProps {
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  selectedTypes: PropertyType[]
  onTypeToggle: (type: PropertyType) => void
  verifiedOnly: boolean
  onVerifiedToggle: () => void
  sortBy: string
  onSortChange: (sort: string) => void
  onClear: () => void
  compact?: boolean
}

export function PropertyFilters({
  priceRange,
  onPriceChange,
  selectedTypes,
  onTypeToggle,
  verifiedOnly,
  onVerifiedToggle,
  sortBy,
  onSortChange,
  onClear,
  compact = false,
}: PropertyFiltersProps) {
  const { t } = useLocale()

  const types: { id: PropertyType; labelKey: string }[] = [
    { id: 'land', labelKey: 'filters.type.land' },
    { id: 'house', labelKey: 'filters.type.house' },
    { id: 'apartment', labelKey: 'filters.type.apartment' },
    { id: 'commercial', labelKey: 'filters.type.commercial' },
    { id: 'car', labelKey: 'filters.type.car' },
  ]

  const activeCount =
    selectedTypes.length + (verifiedOnly ? 1 : 0) + (priceRange[1] < priceFilterMax ? 1 : 0)

  return (
    <div className="space-y-6 text-brand-charcoal dark:text-white">
      {!compact && (
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-brand-gold" />
            {t('filters.title')}
            {activeCount > 0 && (
              <span className="text-xs font-sans bg-brand-gold text-brand-charcoal px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </h3>
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-brand-gold-dark hover:text-brand-gold flex items-center gap-1 min-h-[44px] px-2"
          >
            <X className="w-3.5 h-3.5" />
            {t('filters.clear')}
          </button>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-muted block mb-3">{t('filters.price')}</label>
        <input
          type="range"
          min={0}
          max={priceFilterMax}
          step={5_000_000}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-brand-gold touch-pan-y"
        />
        <div className="flex justify-between text-sm text-muted mt-2">
          <span>RWF 0</span>
          <span className="font-semibold text-brand-charcoal dark:text-white">
            Up to RWF {(priceRange[1] / 1_000_000).toFixed(0)}M
          </span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-muted block mb-3">{t('filters.type')}</label>
        <div className="flex flex-wrap gap-2">
          {types.map(({ id, labelKey }) => (
            <button
              key={id}
              type="button"
              onClick={() => onTypeToggle(id)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                selectedTypes.includes(id)
                  ? 'bg-brand-charcoal text-white dark:bg-brand-gold dark:text-brand-charcoal'
                  : 'bg-brand-cream dark:bg-white/10 text-brand-charcoal/70 dark:text-white/80 hover:bg-brand-gold/20'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={onVerifiedToggle}
          className="w-5 h-5 rounded accent-brand-gold"
        />
        <span className="text-sm font-medium">{t('filters.verified')}</span>
      </label>

      <div>
        <label className="text-sm font-medium text-muted block mb-2">{t('filters.sort')}</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold min-h-[44px] surface-card text-brand-charcoal dark:text-white"
        >
          <option value="featured">{t('filters.sort.featured')}</option>
          <option value="price-asc">{t('filters.sort.priceAsc')}</option>
          <option value="price-desc">{t('filters.sort.priceDesc')}</option>
          <option value="trust">{t('filters.sort.trust')}</option>
          <option value="newest">{t('filters.sort.newest')}</option>
        </select>
      </div>
    </div>
  )
}
