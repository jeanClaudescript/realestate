import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Phone } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { brand } from '@/lib/design-tokens'
import { useLocale } from '@/context/LocaleContext'
import { useToast } from '@/context/ToastContext'

export function LoginPage() {
  const { t } = useLocale()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [method, setMethod] = useState<'email' | 'phone'>('email')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast(t('toast.signedIn'))
    navigate('/dashboard/owner')
  }

  return (
    <PageLayout hideFooter>
      <section className="min-h-screen flex items-center justify-center px-4 py-24 bg-brand-mist dark:bg-brand-charcoal">
        <Card className="w-full max-w-md p-6 sm:p-8">
          <h1 className="font-display text-2xl font-semibold text-brand-charcoal dark:text-white">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-muted text-sm mt-2">{t('auth.loginSubtitle')}</p>

          <div className="flex gap-2 mt-6 p-1 rounded-xl bg-brand-cream dark:bg-white/10">
            {(['email', 'phone'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium min-h-[44px] ${
                  method === m
                    ? 'bg-brand-gold text-brand-charcoal'
                    : 'text-muted hover:text-brand-charcoal dark:hover:text-white'
                }`}
              >
                {m === 'email' ? t('auth.email') : t('auth.phone')}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {method === 'email' ? (
              <label className="block">
                <span className="text-sm font-medium text-muted">{t('auth.email')}</span>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold min-h-[48px]"
                  />
                </div>
              </label>
            ) : (
              <label className="block">
                <span className="text-sm font-medium text-muted">{t('auth.phone')}</span>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="tel"
                    required
                    placeholder="788 000 000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold min-h-[48px]"
                  />
                </div>
              </label>
            )}
            <label className="block">
              <span className="text-sm font-medium text-muted">{t('auth.password')}</span>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold min-h-[48px]"
                />
              </div>
            </label>
            <Button type="submit" variant="primary" fullWidth size="lg" className="min-h-[48px]">
              {t('auth.login')}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-brand-gold-dark font-semibold hover:underline">
              {t('auth.register')}
            </Link>
          </p>
          <p className="text-center text-xs text-muted mt-4">
            {brand.name} · {t('footer.ceo')}
          </p>
        </Card>
      </section>
    </PageLayout>
  )
}
