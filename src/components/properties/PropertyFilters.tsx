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
  dense?: boolean
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
  dense = false,
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
    <div
      className={`text-brand-charcoal dark:text-white ${dense ? 'space-y-3.5' : 'space-y-6'}`}
    >
      {!compact && (
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`font-display font-semibold flex items-center gap-2 ${
              dense ? 'text-base' : 'text-lg'
            }`}
          >
            <SlidersHorizontal className={`text-brand-gold ${dense ? 'w-4 h-4' : 'w-5 h-5'}`} />
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
            className={`text-brand-gold-dark hover:text-brand-gold flex items-center gap-1 px-1 ${
              dense ? 'text-xs min-h-[36px]' : 'text-sm min-h-[44px] px-2'
            }`}
          >
            <X className="w-3.5 h-3.5" />
            {t('filters.clear')}
          </button>
        </div>
      )}

      <div>
        <label className={`font-medium text-muted block ${dense ? 'text-xs mb-1.5' : 'text-sm mb-3'}`}>
          {t('filters.price')}
        </label>
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
        <label className={`font-medium text-muted block ${dense ? 'text-xs mb-1.5' : 'text-sm mb-3'}`}>
          {t('filters.type')}
        </label>
        <div className={`flex flex-wrap ${dense ? 'gap-1.5' : 'gap-2'}`}>
          {types.map(({ id, labelKey }) => (
            <button
              key={id}
              type="button"
              onClick={() => onTypeToggle(id)}
              className={`rounded-full font-medium transition-colors ${
                dense ? 'px-2.5 py-1.5 text-xs min-h-[36px]' : 'px-4 py-2.5 text-sm min-h-[44px]'
              } ${
                selectedTypes.includes(id)
                  ? 'bg-brand-gold text-brand-charcoal shadow-sm'
                  : 'bg-brand-cream dark:bg-white/10 text-brand-charcoal/70 dark:text-white/80 hover:bg-brand-gold/20'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      <label
        className={`flex items-center gap-2 cursor-pointer ${dense ? 'min-h-[36px]' : 'min-h-[44px]'}`}
      >
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={onVerifiedToggle}
          className={`rounded accent-brand-gold ${dense ? 'w-4 h-4' : 'w-5 h-5'}`}
        />
        <span className={`font-medium ${dense ? 'text-xs' : 'text-sm'}`}>{t('filters.verified')}</span>
      </label>

      <div>
        <label className={`font-medium text-muted block ${dense ? 'text-xs mb-1' : 'text-sm mb-2'}`}>
          {t('filters.sort')}
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className={`w-full border border-black/10 dark:border-white/10 rounded-lg px-3 focus:outline-none focus:border-brand-gold surface-card text-brand-charcoal dark:text-white ${
            dense ? 'py-2 text-xs min-h-[36px]' : 'py-3 text-sm min-h-[44px] rounded-xl px-4'
          }`}
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
