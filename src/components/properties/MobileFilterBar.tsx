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
      <div className="lg:hidden sticky top-[3.5rem] sm:top-16 z-40 -mx-3 sm:-mx-6 px-3 sm:px-6 py-3 mb-4 bg-brand-mist/95 dark:bg-brand-charcoal/95 backdrop-blur-md border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(true)}
            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-xl bg-brand-gold text-brand-charcoal text-sm font-semibold shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t('filters.title')}
            {activeCount > 0 && (
              <span className="bg-brand-charcoal/10 dark:bg-brand-charcoal text-brand-charcoal dark:text-white text-xs px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </button>
          <select
            value={filterProps.sortBy}
            onChange={(e) => filterProps.onSortChange(e.target.value)}
            className="min-h-[44px] flex-1 max-w-[140px] border border-black/10 dark:border-white/10 rounded-xl px-3 text-sm surface-card text-brand-charcoal dark:text-white"
            aria-label={t('filters.sort')}
          >
            <option value="featured">{t('filters.sort.featured')}</option>
            <option value="price-asc">{t('filters.sort.priceAsc')}</option>
            <option value="price-desc">{t('filters.sort.priceDesc')}</option>
            <option value="trust">{t('filters.sort.trust')}</option>
            <option value="newest">{t('filters.sort.newest')}</option>
          </select>
        </div>
        <p className="text-xs text-muted mt-2 text-center">
          {resultCount} {t('listings.properties')}
        </p>
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
              className="lg:hidden fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] flex flex-col rounded-t-3xl surface-card shadow-luxury safe-bottom"
              role="dialog"
              aria-modal="true"
              aria-label={t('filters.title')}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/10 shrink-0">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2 text-brand-charcoal dark:text-white">
                  <SlidersHorizontal className="w-5 h-5 text-brand-gold" />
                  {t('filters.title')}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClear}
                    className="text-sm text-brand-gold-dark font-medium min-h-[44px] px-3"
                  >
                    {t('filters.clear')}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="p-2.5 rounded-full surface-muted min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={t('compare.close')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto overscroll-contain px-5 py-5 flex-1">
                <PropertyFilters compact {...filterProps} onClear={onClear} />
              </div>
              <div className="p-4 border-t border-black/5 dark:border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="w-full min-h-[48px] rounded-full bg-brand-gold text-brand-charcoal font-semibold"
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
