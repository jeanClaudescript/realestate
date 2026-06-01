import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Property } from '@/types/property'
import { formatPrice } from '@/lib/mock-data'
import { SafeImage } from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/Button'
import { useLocale } from '@/context/LocaleContext'

interface CompareModalProps {
  open: boolean
  onClose: () => void
  properties: Property[]
  onRemove: (id: string) => void
}

export function CompareModal({ open, onClose, properties, onRemove }: CompareModalProps) {
  const { t } = useLocale()

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

  const rows: { key: string; label: string; render: (p: Property) => string }[] = [
    { key: 'price', label: t('compare.price'), render: (p) => formatPrice(p.price, p.currency, p.mode) },
    { key: 'type', label: t('compare.type'), render: (p) => p.type },
    { key: 'location', label: t('compare.location'), render: (p) => `${p.location}, ${p.city}` },
    {
      key: 'size',
      label: t('compare.size'),
      render: (p) => p.plotSize ?? p.builtArea ?? '—',
    },
    {
      key: 'beds',
      label: t('compare.beds'),
      render: (p) => (p.bedrooms != null ? String(p.bedrooms) : '—'),
    },
    {
      key: 'baths',
      label: t('compare.baths'),
      render: (p) => (p.bathrooms != null ? String(p.bathrooms) : '—'),
    },
    { key: 'trust', label: t('compare.trust'), render: (p) => `${p.trustScore}%` },
    { key: 'status', label: t('compare.status'), render: (p) => p.status.replace('_', ' ') },
  ]

  return (
    <AnimatePresence>
      {open && properties.length > 0 && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-label={t('compare.close')}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[90vh] overflow-hidden rounded-t-3xl surface-card shadow-luxury flex flex-col safe-bottom"
          >
            <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-black/5 dark:border-white/10 shrink-0">
              <h2 id="compare-title" className="font-display text-xl font-semibold text-brand-charcoal dark:text-white">
                {t('compare.title')}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={t('compare.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto flex-1 px-4 sm:px-6 pb-6">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-3 w-28 text-muted font-medium sticky left-0 surface-card z-10">
                        {t('compare.feature')}
                      </th>
                      {properties.map((p) => (
                        <th key={p.id} className="p-3 align-top min-w-[180px]">
                          <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3">
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
                          <p className="font-semibold text-brand-charcoal dark:text-white line-clamp-2 text-left">
                            {p.title}
                          </p>
                          <Link to={`/properties/${p.id}`} className="text-brand-gold-dark text-xs font-semibold mt-1 inline-block">
                            {t('card.viewDetails')} →
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.key} className="border-t border-black/5 dark:border-white/10">
                        <td className="p-3 font-medium text-muted sticky left-0 surface-card">{row.label}</td>
                        {properties.map((p) => (
                          <td key={p.id} className="p-3 text-brand-charcoal dark:text-white/90 capitalize">
                            {row.render(p)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 sm:hidden">
                {properties.map((p) => (
                  <Link key={p.id} to={`/properties/${p.id}`} className="flex-1 min-w-[140px]">
                    <Button variant="secondary" size="sm" fullWidth>
                      {p.title.slice(0, 20)}…
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
