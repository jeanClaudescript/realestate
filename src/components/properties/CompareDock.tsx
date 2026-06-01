import { motion, AnimatePresence } from 'framer-motion'
import { GitCompare, X, ArrowRight } from 'lucide-react'
import type { Property } from '@/types/property'
import { SafeImage } from '@/components/ui/SafeImage'
import { useLocale } from '@/context/LocaleContext'
import { MAX_COMPARE } from '@/lib/compare'

interface CompareDockProps {
  properties: Property[]
  onRemove: (id: string) => void
  onOpen: () => void
  onClear: () => void
}

export function CompareDock({ properties, onRemove, onOpen, onClear }: CompareDockProps) {
  const { t } = useLocale()
  const slots = Array.from({ length: MAX_COMPARE }, (_, i) => properties[i] ?? null)

  return (
    <AnimatePresence>
      {properties.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="fixed bottom-[calc(0.5rem+env(safe-area-inset-bottom))] sm:bottom-5 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 max-w-lg sm:w-full"
        >
          <div className="rounded-2xl border border-brand-gold/30 bg-white/95 dark:bg-brand-slate/95 backdrop-blur-xl shadow-luxury overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold" />
            <div className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
                  <GitCompare className="w-4 h-4 text-brand-gold-dark dark:text-brand-gold" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-brand-charcoal dark:text-white">
                    {t('compare.dockTitle')}
                  </p>
                  <p className="text-[11px] text-muted">
                    {properties.length}/{MAX_COMPARE} {t('compare.slots')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClear}
                  className="text-xs text-muted hover:text-brand-charcoal dark:hover:text-white px-2 min-h-[36px]"
                >
                  {t('compare.clearAll')}
                </button>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex gap-2 flex-1 min-w-0">
                  {slots.map((p, i) => (
                    <div
                      key={p?.id ?? `empty-${i}`}
                      className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                        p
                          ? 'border-brand-gold shadow-md'
                          : 'border-dashed border-black/15 dark:border-white/20 bg-brand-cream/80 dark:bg-white/5'
                      }`}
                    >
                      {p ? (
                        <>
                          <SafeImage
                            src={p.images[0]}
                            alt=""
                            fallbackSeed={p.id}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => onRemove(p.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-charcoal text-white flex items-center justify-center shadow"
                            aria-label={t('compare.remove')}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] text-muted font-medium">
                          {i + 1}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onOpen}
                  disabled={properties.length < 2}
                  className="shrink-0 flex items-center gap-1.5 px-4 sm:px-5 min-h-[48px] rounded-xl bg-brand-gold text-brand-charcoal font-semibold text-sm shadow-md disabled:opacity-45 disabled:cursor-not-allowed hover:bg-brand-gold-light transition-colors"
                >
                  {t('compare.now')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {properties.length === 1 && (
                <p className="text-[11px] text-muted mt-2 text-center">{t('compare.addOneMore')}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
