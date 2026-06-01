import { motion } from 'framer-motion'
import { Smartphone, CreditCard, Building2 } from 'lucide-react'
import { paymentMethods } from '@/lib/rwanda'

const icons = {
  mtn: Smartphone,
  airtel: Smartphone,
  card: CreditCard,
  bank: Building2,
}

export function PaymentMethods() {
  return (
    <section className="py-16 section-emphasis">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-gold-dark dark:text-brand-gold mb-2">
            Secure Payments
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-brand-charcoal dark:text-white">
            Pay in Rwandan Francs — Your Way
          </h2>
          <p className="text-muted mt-2 max-w-xl mx-auto text-sm">
            Deposits, reservations & site visits via MTN MoMo, Airtel Money, cards, or local bank transfer.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paymentMethods.map(({ id, name, desc }, i) => {
            const Icon = icons[id as keyof typeof icons]
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-5 rounded-2xl surface-card hover:border-brand-gold/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-brand-gold-dark dark:text-brand-gold" />
                </div>
                <div>
                  <p className="font-semibold text-brand-charcoal dark:text-white text-sm">{name}</p>
                  <p className="text-xs text-muted">{desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
