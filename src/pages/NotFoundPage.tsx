import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/Button'
import { useLocale } from '@/context/LocaleContext'

export function NotFoundPage() {
  const { t } = useLocale()

  return (
    <PageLayout>
      <section className="min-h-[70vh] flex items-center justify-center px-4 py-24 bg-brand-mist dark:bg-brand-charcoal">
        <div className="text-center max-w-md">
          <p className="text-8xl font-display font-semibold text-brand-gold/30">404</p>
          <h1 className="font-display text-3xl font-semibold text-brand-charcoal dark:text-white mt-4">
            {t('notFound.title')}
          </h1>
          <p className="text-muted mt-3 leading-relaxed">{t('notFound.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link to="/">
              <Button variant="primary" size="lg" icon={<Home className="w-5 h-5" />}>
                {t('notFound.home')}
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="secondary" size="lg" icon={<Search className="w-5 h-5" />}>
                {t('notFound.properties')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
