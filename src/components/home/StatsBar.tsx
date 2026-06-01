import { motion } from 'framer-motion'
import { platformStats } from '@/lib/mock-data'

export function StatsBar() {
  return (
    <section className="relative z-20 -mt-16 mx-4 sm:mx-6 lg:mx-8 max-w-5xl lg:mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-gold/20 rounded-2xl overflow-hidden shadow-luxury border border-brand-gold/30"
      >
        {platformStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-brand-charcoal px-6 py-6 text-center"
          >
            <p className="font-display text-2xl md:text-3xl font-semibold text-brand-gold">
              {stat.value}
            </p>
            <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
