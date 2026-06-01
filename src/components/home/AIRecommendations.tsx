import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { properties } from '@/lib/mock-data'

export function AIRecommendations() {
  const recommended = properties
    .filter((p) => p.investment && p.trustScore >= 93)
    .slice(0, 3)

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-brand-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Smart Match"
          title="Recommended for Investors"
          subtitle="Personalized picks based on ROI, trust score, and growth trends across Kigali & Rwanda."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {recommended.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-brand-charcoal text-brand-gold text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                AI Pick
              </div>
              <PropertyCard property={p} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/properties?sort=trust"
            className="inline-flex items-center gap-2 text-brand-gold-dark font-semibold hover:text-brand-gold transition-colors"
          >
            View all smart matches
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
