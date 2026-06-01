import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Phone } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useLocale } from '@/context/LocaleContext'
import { useToast } from '@/context/ToastContext'

export function RegisterPage() {
  const { t } = useLocale()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [role, setRole] = useState<'buyer' | 'owner' | 'agent'>('buyer')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast(t('toast.registered'))
    if (role === 'owner') navigate('/dashboard/owner')
    else if (role === 'agent') navigate('/dashboard/agent')
    else navigate('/properties')
  }

  return (
    <PageLayout hideFooter>
      <section className="min-h-screen flex items-center justify-center px-4 py-24 bg-brand-mist dark:bg-brand-charcoal">
        <Card className="w-full max-w-md p-6 sm:p-8">
          <h1 className="font-display text-2xl font-semibold text-brand-charcoal dark:text-white">
            {t('auth.registerTitle')}
          </h1>
          <p className="text-muted text-sm mt-2">{t('auth.registerSubtitle')}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(['buyer', 'owner', 'agent'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-full text-sm font-medium min-h-[44px] ${
                  role === r
                    ? 'bg-brand-charcoal text-white dark:bg-brand-gold dark:text-brand-charcoal'
                    : 'bg-brand-cream dark:bg-white/10 text-muted'
                }`}
              >
                {t(`auth.role.${r}`)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-muted">{t('auth.fullName')}</span>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold min-h-[48px]"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-muted">{t('auth.email')}</span>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold min-h-[48px]"
                />
              </div>
            </label>
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
            <label className="block">
              <span className="text-sm font-medium text-muted">{t('auth.password')}</span>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="password"
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-brand-slate text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-gold min-h-[48px]"
                />
              </div>
            </label>
            <Button type="submit" variant="primary" fullWidth size="lg" className="min-h-[48px]">
              {t('auth.createAccount')}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="text-brand-gold-dark font-semibold hover:underline">
              {t('auth.login')}
            </Link>
          </p>
        </Card>
      </section>
    </PageLayout>
  )
}
