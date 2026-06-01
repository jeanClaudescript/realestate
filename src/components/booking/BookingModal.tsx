import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, CreditCard, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { paymentMethods } from '@/lib/rwanda'
import { useToast } from '@/context/ToastContext'
import { useLocale } from '@/context/LocaleContext'
import type { Property } from '@/types/property'
import { formatPrice } from '@/lib/mock-data'

type ModalType = 'visit' | 'reserve' | null

interface BookingModalProps {
  type: ModalType
  property: Property | null
  onClose: () => void
}

export function BookingModal({ type, property, onClose }: BookingModalProps) {
  const { showToast } = useToast()
  const { t } = useLocale()
  const [paymentId, setPaymentId] = useState<string>(paymentMethods[0]?.id ?? 'mtn')

  useEffect(() => {
    if (!type) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [type, onClose])

  if (!type || !property) return null

  const deposit = Math.round(property.price * 0.05)
  const isVisit = type === 'visit'

  const handleConfirm = () => {
    showToast(
      isVisit ? t('toast.visitBooked') : t('toast.depositSubmitted')
    )
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto surface-card rounded-t-3xl sm:rounded-3xl shadow-luxury"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-brand-charcoal px-6 py-5 flex items-start justify-between sticky top-0 z-10">
            <div className="min-w-0 pr-4">
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-wider mb-1">
                {isVisit ? t('detail.bookVisit') : t('detail.reserve')}
              </p>
              <h3 className="font-display text-xl text-white font-semibold line-clamp-2">
                {property.title}
              </h3>
              <p className="text-white/50 text-sm mt-1">
                {property.location}, {property.city}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-white/10 text-white/70 min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
              aria-label={t('compare.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {isVisit ? (
              <>
                <div>
                  <label className="text-sm font-medium text-muted block mb-2">
                    Preferred date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm min-h-[48px] bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted block mb-2">Time slot</label>
                  <select className="w-full border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm min-h-[48px] bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold">
                    <option>09:00 — Morning</option>
                    <option>11:00 — Late morning</option>
                    <option>14:00 — Afternoon</option>
                    <option>16:00 — Late afternoon</option>
                  </select>
                </div>
                <p className="text-xs text-muted flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  SMS & WhatsApp reminders via +250
                </p>
              </>
            ) : (
              <>
                <div className="p-4 rounded-xl surface-muted">
                  <p className="text-sm text-muted">Listing price</p>
                  <p className="font-display text-2xl font-semibold text-brand-charcoal dark:text-white">
                    {formatPrice(property.price, property.currency, property.mode)}
                  </p>
                  <p className="text-sm text-brand-gold-dark mt-2 font-medium">
                    Deposit (5%): {formatPrice(deposit, property.currency)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted block mb-2">Payment method</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {paymentMethods.map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentId(pm.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-colors min-h-[48px] ${
                          paymentId === pm.id
                            ? 'border-brand-gold bg-brand-gold/10'
                            : 'border-black/10 dark:border-white/10 hover:border-brand-gold/50'
                        }`}
                      >
                        {pm.id === 'card' ? (
                          <CreditCard className="w-4 h-4 text-brand-gold shrink-0" />
                        ) : (
                          <Smartphone className="w-4 h-4 text-brand-gold shrink-0" />
                        )}
                        <span className="font-medium text-brand-charcoal dark:text-white">{pm.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-medium text-muted block mb-2">Your phone (+250)</label>
              <input
                type="tel"
                placeholder="788 000 000"
                className="w-full border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm min-h-[48px] bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <Button variant="primary" size="lg" fullWidth className="min-h-[48px]" onClick={handleConfirm}>
              {isVisit ? t('detail.bookVisit') : t('detail.reserve')}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
