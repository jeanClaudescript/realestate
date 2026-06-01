import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { PropertyFilters, type PropertyFiltersProps } from '@/components/properties/PropertyFilters'
import { useLocale } from '@/context/LocaleContext'

interface MobileFilterBarProps extends PropertyFiltersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resultCount: number
}

export function MobileFilterBar({
  open,
  onOpenChange,
  resultCount,
  onClear,
  ...filterProps
}: MobileFilterBarProps) {
  const { t } = useLocale()
  const activeCount =
    filterProps.selectedTypes.length +
    (filterProps.verifiedOnly ? 1 : 0) +
    (filterProps.priceRange[1] < 2_000_000_000 ? 1 : 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="lg:hidden flex items-center gap-2 mb-3 -mx-0.5">
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="flex-1 flex items-center justify-center gap-1.5 min-h-[40px] px-3 rounded-lg bg-brand-gold text-brand-charcoal text-xs font-semibold shadow-sm"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {t('filters.title')}
          {activeCount > 0 && (
            <span className="bg-brand-charcoal/10 dark:bg-brand-charcoal text-brand-charcoal dark:text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </button>
        <select
          value={filterProps.sortBy}
          onChange={(e) => filterProps.onSortChange(e.target.value)}
          className="min-h-[40px] flex-1 max-w-[9.5rem] border border-black/10 dark:border-white/10 rounded-lg px-2 text-xs surface-card text-brand-charcoal dark:text-white"
          aria-label={t('filters.sort')}
        >
          <option value="featured">{t('filters.sort.featured')}</option>
          <option value="price-asc">{t('filters.sort.priceAsc')}</option>
          <option value="price-desc">{t('filters.sort.priceDesc')}</option>
          <option value="trust">{t('filters.sort.trust')}</option>
          <option value="newest">{t('filters.sort.newest')}</option>
        </select>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[60] bg-black/50"
              onClick={() => onOpenChange(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="lg:hidden fixed inset-x-0 bottom-0 z-[70] max-h-[80vh] flex flex-col rounded-t-2xl surface-card shadow-luxury safe-bottom"
              role="dialog"
              aria-modal="true"
              aria-label={t('filters.title')}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-subtle shrink-0">
                <h3 className="font-display text-base font-semibold flex items-center gap-2 text-brand-charcoal dark:text-white">
                  <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
                  {t('filters.title')}
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={onClear}
                    className="text-xs text-brand-gold-dark font-medium min-h-[40px] px-2"
                  >
                    {t('filters.clear')}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="p-2 rounded-full surface-muted min-w-[40px] min-h-[40px] flex items-center justify-center"
                    aria-label={t('compare.close')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto overscroll-contain px-4 py-4 flex-1">
                <PropertyFilters compact dense {...filterProps} onClear={onClear} />
              </div>
              <div className="p-3 border-t border-subtle shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="w-full min-h-[44px] rounded-full bg-brand-gold text-brand-charcoal font-semibold text-sm"
                >
                  {t('listings.showing')} {resultCount} {t('listings.properties')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
