import { motion } from 'framer-motion'
import { Award, Building2, Shield, Quote } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SafeImage } from '@/components/ui/SafeImage'
import { PhoneDisplay } from '@/components/ui/PhoneDisplay'
import { brand } from '@/lib/design-tokens'
import { ceoImage } from '@/lib/images'
import { formatRwandaPhone } from '@/lib/phone'
import { useLocale } from '@/context/LocaleContext'

export function LeadershipSection() {
  const { t } = useLocale()
  const { ceo } = brand

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-brand-slate border-y border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-luxury">
              <SafeImage
                src={ceoImage(800)}
                alt={`${ceo.name} — ${ceo.fullTitle}, ${ceo.company}`}
                fallbackSeed="ceo-innocent"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-1">
                  {ceo.company}
                </p>
                <h3 className="font-display text-3xl font-semibold">{ceo.name}</h3>
                <p className="text-white/80 text-sm mt-1">{ceo.fullTitle}</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 lg:right-8 glass-dark rounded-2xl px-5 py-4 hidden sm:block">
              <p className="text-2xl font-display font-semibold text-brand-gold">{ceo.listingsSold}</p>
              <p className="text-xs text-white/60">{t('ceo.listingsSold')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-gold-dark dark:text-brand-gold mb-3">
              {t('ceo.eyebrow')}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-charcoal dark:text-white leading-tight mb-4">
              {t('ceo.title')}
            </h2>
            <p className="text-muted leading-relaxed mb-6">{ceo.bio}</p>

            <div className="flex items-start gap-3 p-4 rounded-2xl surface-muted mb-8">
              <Quote className="w-8 h-8 text-brand-gold shrink-0 opacity-60" />
              <p className="text-sm italic text-brand-charcoal/80 dark:text-white/80 leading-relaxed">
                {t('ceo.quote')}
              </p>
            </div>

            <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3 sm:gap-4 mb-8">
              {[
                { icon: Award, label: t('ceo.stat1'), value: `${ceo.yearsExperience}+` },
                { icon: Shield, label: t('ceo.stat2'), value: '100%' },
                { icon: Building2, label: t('ceo.stat3'), value: ceo.listingsSold },
              ].map(({ icon: Icon, label, value }) => (
                <Card key={label} className="p-4 text-center">
                  <Icon className="w-5 h-5 text-brand-gold mx-auto mb-2" />
                  <p className="font-display text-xl font-semibold text-brand-charcoal dark:text-white">
                    {value}
                  </p>
                  <p className="text-xs text-muted mt-1">{label}</p>
                </Card>
              ))}
            </div>

            <p className="text-sm text-muted">
              {t('ceo.contact')}{' '}
              <PhoneDisplay phone={formatRwandaPhone('788000000')} className="inline text-brand-gold-dark" />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
