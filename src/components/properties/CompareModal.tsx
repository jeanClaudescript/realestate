import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, GitCompare, Sparkles } from 'lucide-react'
import type { Property } from '@/types/property'
import { formatPrice } from '@/lib/mock-data'
import { SafeImage } from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useLocale } from '@/context/LocaleContext'
import { buildCompareRows, getRowHighlight } from '@/lib/compare'

interface CompareModalProps {
  open: boolean
  onClose: () => void
  properties: Property[]
  onRemove: (id: string) => void
}

function highlightClass(kind: 'min' | 'max' | null) {
  if (kind === 'min') return 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-semibold'
  if (kind === 'max') return 'bg-brand-gold/15 text-brand-gold-dark dark:text-brand-gold font-semibold'
  return 'text-brand-charcoal dark:text-white/90'
}

export function CompareModal({ open, onClose, properties, onRemove }: CompareModalProps) {
  const { t } = useLocale()
  const rows = useMemo(() => buildCompareRows(t, properties), [t, properties])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && properties.length > 0 && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm"
            onClick={onClose}
            aria-label={t('compare.close')}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-title"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed z-[80] flex flex-col bg-white dark:bg-brand-slate shadow-luxury safe-bottom
              inset-x-0 bottom-0 max-h-[92dvh] rounded-t-3xl
              sm:inset-x-4 sm:bottom-auto sm:top-[50%] sm:-translate-y-1/2 sm:max-h-[88vh] sm:rounded-3xl
              md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[min(100%,56rem)]"
          >
            {/* Header */}
            <div className="shrink-0 px-4 sm:px-6 pt-4 pb-3 border-b border-subtle">
              <div className="w-10 h-1 rounded-full bg-black/10 dark:bg-white/20 mx-auto mb-3 sm:hidden" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
                    <GitCompare className="w-5 h-5 text-brand-gold-dark dark:text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <h2
                      id="compare-title"
                      className="font-display text-lg sm:text-xl font-semibold text-brand-charcoal dark:text-white"
                    >
                      {t('compare.title')}
                    </h2>
                    <p className="text-xs text-muted mt-0.5">{t('compare.subtitle')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2.5 rounded-xl surface-muted hover:bg-black/5 dark:hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
                  aria-label={t('compare.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4">
              {/* Mobile & tablet: card carousel */}
              <div className="lg:hidden -mx-1">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 px-1">
                  {properties.map((p) => (
                    <article
                      key={p.id}
                      className="snap-center shrink-0 w-[min(100%,280px)] sm:w-[300px] rounded-2xl surface-card border border-brand-gold/20 overflow-hidden shadow-card"
                    >
                      <div className="relative aspect-[16/10]">
                        <SafeImage
                          src={p.images[0]}
                          alt={p.title}
                          fallbackSeed={p.id}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => onRemove(p.id)}
                          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm"
                          aria-label={t('compare.remove')}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {p.verified && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="verified">{t('card.verified')}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-wider text-brand-gold-dark dark:text-brand-gold font-semibold mb-1">
                          {t(`filters.type.${p.type}` as 'filters.type.house')}
                        </p>
                        <h3 className="font-display text-base font-semibold line-clamp-2 mb-2">
                          {p.title}
                        </h3>
                        <p className="text-lg font-display font-semibold text-brand-gold-dark dark:text-brand-gold mb-4">
                          {formatPrice(p.price, p.currency, p.mode)}
                        </p>
                        <dl className="space-y-2.5">
                          {rows
                            .filter((r) => r.key !== 'price' && r.key !== 'type')
                            .map((row) => {
                              const hl = getRowHighlight(row, properties, p.id)
                              return (
                                <div
                                  key={row.key}
                                  className={`flex justify-between gap-2 text-sm py-1.5 px-2 rounded-lg ${highlightClass(hl)}`}
                                >
                                  <dt className="text-muted shrink-0">{row.label}</dt>
                                  <dd className="text-right capitalize font-medium">{row.render(p)}</dd>
                                </div>
                              )
                            })}
                        </dl>
                        <Link to={`/properties/${p.id}`} className="block mt-4">
                          <Button variant="secondary" size="sm" fullWidth>
                            {t('card.viewDetails')}
                          </Button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
                <p className="text-[11px] text-muted text-center mt-2 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  {t('compare.swipeHint')}
                </p>
              </div>

              {/* Desktop: comparison table */}
              <div className="hidden lg:block overflow-x-auto rounded-2xl border border-subtle">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-brand-cream/80 dark:bg-white/5">
                      <th className="text-left p-4 w-36 text-muted font-medium sticky left-0 z-10 bg-inherit rounded-tl-2xl">
                        {t('compare.feature')}
                      </th>
                      {properties.map((p, i) => (
                        <th
                          key={p.id}
                          className={`p-4 align-top min-w-[200px] ${i === properties.length - 1 ? 'rounded-tr-2xl' : ''}`}
                        >
                          <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 ring-1 ring-brand-gold/30">
                            <SafeImage
                              src={p.images[0]}
                              alt={p.title}
                              fallbackSeed={p.id}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => onRemove(p.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                              aria-label={t('compare.remove')}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="font-semibold text-brand-charcoal dark:text-white line-clamp-2 text-left text-sm">
                            {p.title}
                          </p>
                          <p className="text-brand-gold-dark dark:text-brand-gold font-display font-semibold text-left mt-1">
                            {formatPrice(p.price, p.currency, p.mode)}
                          </p>
                          <Link
                            to={`/properties/${p.id}`}
                            className="text-brand-gold-dark text-xs font-semibold mt-2 inline-block hover:underline"
                          >
                            {t('card.viewDetails')} →
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr
                        key={row.key}
                        className={ri % 2 === 0 ? 'bg-white dark:bg-brand-slate' : 'bg-brand-mist/50 dark:bg-white/[0.02]'}
                      >
                        <td className="p-4 font-medium text-muted sticky left-0 z-10 bg-inherit">
                          {row.label}
                        </td>
                        {properties.map((p) => {
                          const hl = getRowHighlight(row, properties, p.id)
                          return (
                            <td key={p.id} className={`p-4 capitalize ${highlightClass(hl)}`}>
                              {row.render(p)}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="hidden lg:flex items-center gap-2 text-xs text-muted mt-4 justify-center">
                <span className="inline-block w-3 h-3 rounded bg-emerald-500/20" />
                {t('compare.bestValue')}
                <span className="inline-block w-3 h-3 rounded bg-brand-gold/20 ml-2" />
                {t('compare.bestScore')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
