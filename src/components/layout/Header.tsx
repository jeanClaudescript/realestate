import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useLocale } from '@/context/LocaleContext'
import { useTheme } from '@/context/ThemeContext'
import { brand } from '@/lib/design-tokens'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { t } = useLocale()
  const { theme } = useTheme()
  const isHome = pathname === '/'
  const overlay = open || scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const nav = [
    { label: t('nav.houses'), href: '/houses' },
    { label: t('nav.cars'), href: '/cars' },
    { label: t('nav.buy'), href: '/properties?mode=buy' },
    { label: t('nav.rent'), href: '/properties?mode=rent' },
    { label: t('nav.land'), href: '/properties?type=land' },
    { label: t('nav.invest'), href: '/#invest' },
  ]

  const textOnBar = overlay
    ? theme === 'dark'
      ? 'text-white'
      : 'text-brand-charcoal'
    : 'text-white'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] safe-top transition-all duration-300 ${
        overlay ? 'glass-light shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-2 min-w-0 shrink max-w-[45%] sm:max-w-none"
            onClick={() => setOpen(false)}
          >
            <div className="w-9 h-9 rounded-xl bg-brand-gold/20 flex items-center justify-center border border-brand-gold/40 shrink-0">
              <Home className="w-4 h-4 text-brand-gold" />
            </div>
            <div className="min-w-0 hidden min-[380px]:block">
              <span className={`font-display text-sm sm:text-base font-semibold block truncate ${textOnBar}`}>
                {brand.shortName}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium whitespace-nowrap hover:text-brand-gold ${textOnBar} opacity-80`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 shrink-0">
            <LanguageSwitcher inverted={!overlay && isHome} />
            <ThemeToggle inverted={!overlay && isHome} />
            <Link to="/properties" className="hidden min-[480px]:block">
              <Button variant="primary" size="sm" className="!px-3 !py-2 text-xs sm:text-sm">
                {t('nav.explore')}
              </Button>
            </Link>
            <button
              type="button"
              className={`lg:hidden touch-target flex items-center justify-center rounded-xl shrink-0 ${
                overlay
                  ? 'text-brand-charcoal dark:text-white'
                  : 'text-white bg-black/40'
              }`}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/60 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[56] w-[min(100vw,320px)] glass-light shadow-luxury flex flex-col safe-top safe-bottom lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/10 shrink-0">
                <span className="font-display font-semibold text-brand-charcoal dark:text-white">
                  {brand.shortName}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="touch-target rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center"
                  aria-label={t('nav.closeMenu')}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block py-3.5 px-4 rounded-xl text-base font-medium text-brand-charcoal dark:text-white hover:bg-black/5 dark:hover:bg-white/10 min-h-[48px] flex items-center"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t border-black/5 dark:border-white/10 space-y-2 shrink-0">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" fullWidth className="min-h-[48px] !text-brand-charcoal dark:!text-white">
                    {t('auth.login')}
                  </Button>
                </Link>
                <Link to="/dashboard/owner" onClick={() => setOpen(false)}>
                  <Button variant="outline" fullWidth className="min-h-[48px]">
                    {t('nav.listProperty')}
                  </Button>
                </Link>
                <Link to="/properties" onClick={() => setOpen(false)}>
                  <Button variant="primary" fullWidth className="min-h-[48px]">
                    {t('nav.explore')}
                  </Button>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
