import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { useLocale } from '@/context/LocaleContext'

const sections: Record<string, string[]> = {
  privacy: [
    'We collect contact details, property preferences, and payment references only to facilitate real estate transactions in Rwanda.',
    'Your data is stored securely and never sold to third parties. Survey documents and title information are shared only with verified agents and RDB-compliant partners.',
    'You may request access, correction, or deletion of your personal data by contacting hello@carhouse.rw.',
    'Cookies are used for language preference, theme, and session continuity.',
  ],
  terms: [
    'Car House Real Estate and Innocent Real Estate provide a marketplace platform. Listings are submitted by owners and agents who warrant accuracy of title and survey information.',
    'Prices are displayed in RWF. Deposits and reservations are subject to agent confirmation and applicable Rwandan law.',
    'The platform is not a licensed bank or insurer. Mortgage and ROI tools are estimates only.',
    'Disputes shall be governed by the laws of the Republic of Rwanda.',
  ],
  compliance: [
    'Car House aligns with Rwanda Development Board (RDB) cadastral and land registration standards.',
    'Verified listings undergo title deed review, survey PDF validation, and on-site inspection where applicable.',
    'Fraud prevention includes duplicate title checks, price anomaly detection, and trust scoring.',
    'Agents and owners must provide accurate plot coordinates and dimensions in square metres (m²).',
  ],
}

export function LegalPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useLocale()
  const key = slug && sections[slug] ? slug : 'privacy'
  const titleKey = `legal.${key}.title` as const
  const items = sections[key]

  return (
    <PageLayout>
      <article className="pt-24 pb-20 bg-brand-mist dark:bg-brand-charcoal min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted hover:text-brand-gold-dark text-sm mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('detail.back')}
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-brand-charcoal dark:text-white mb-6">
            {t(titleKey)}
          </h1>
          <div className="surface-card rounded-2xl p-6 sm:p-8 space-y-6">
            {items.map((paragraph, i) => (
              <p key={i} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="text-sm text-muted pt-4 border-t border-black/5 dark:border-white/10">
              {t('legal.updated')}: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}
