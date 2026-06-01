import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Car, Building2, ArrowRight } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

const categories = [
  {
    key: 'houses',
    href: '/houses',
    icon: Home,
    gradient: 'from-brand-gold/30 to-brand-charcoal',
    featured: true,
  },
  {
    key: 'cars',
    href: '/cars',
    icon: Car,
    gradient: 'from-slate-600/40 to-brand-charcoal',
    featured: true,
  },
  {
    key: 'all',
    href: '/properties',
    icon: Building2,
    gradient: 'from-brand-charcoal to-brand-slate',
    featured: false,
  },
] as const

export function CategoryShowcase() {
  const { t } = useLocale()

  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-brand-gold-dark dark:text-brand-gold mb-4">
          {t('home.categories.eyebrow')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {categories.map(({ key, href, icon: Icon, gradient }, i) => (
            <Link
              key={key}
              to={href}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl min-h-[120px] sm:min-h-[140px] flex flex-col justify-end p-5 sm:p-6 bg-gradient-to-br ${gradient} border border-brand-gold/20 shadow-luxury ${
                i < 2 ? 'ring-2 ring-brand-gold/40' : ''
              }`}
            >
              {i < 2 && (
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-charcoal px-2 py-1 rounded-full">
                  {t('home.categories.popular')}
                </span>
              )}
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-brand-gold mb-2" />
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
                {t(`home.categories.${key}.title`)}
              </h2>
              <p className="text-white/60 text-xs sm:text-sm mt-1 line-clamp-2">
                {t(`home.categories.${key}.subtitle`)}
              </p>
              <span className="inline-flex items-center gap-1 text-brand-gold text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
                {t('home.categories.explore')}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
