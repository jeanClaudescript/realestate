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

    const onScroll = () => setScrolled(window.scrollY > 24)

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

    { label: t('nav.buy'), href: '/properties?mode=buy' },

    { label: t('nav.rent'), href: '/properties?mode=rent' },

    { label: t('nav.land'), href: '/properties?type=land' },

    { label: t('nav.commercial'), href: '/properties?type=commercial' },

    { label: t('nav.invest'), href: '/#invest' },

  ]



  const textOnBar = overlay

    ? theme === 'dark'

      ? 'text-white'

      : 'text-brand-charcoal'

    : 'text-white'



  const subTextOnBar = overlay ? 'text-muted' : 'text-white/50'



  return (

    <header

      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${

        overlay ? 'glass-light shadow-sm' : 'bg-transparent'

      }`}

    >

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 gap-2">

          <Link to="/" className="flex items-center gap-2 group shrink-0 min-w-0" onClick={() => setOpen(false)}>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center border border-brand-gold/40 group-hover:bg-brand-gold/30 transition-colors shrink-0">

              <Home className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold" />

            </div>

            <div className="hidden sm:block min-w-0">

              <span className={`font-display text-base sm:text-lg font-semibold block leading-tight truncate ${textOnBar}`}>

                {brand.shortName}

              </span>

              <span className={`text-[10px] tracking-widest uppercase ${subTextOnBar}`}>Real Estate</span>

            </div>

          </Link>



          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">

            {nav.map((item) => (

              <Link

                key={item.href}

                to={item.href}

                className={`text-sm font-medium transition-colors hover:text-brand-gold ${textOnBar} opacity-80 hover:opacity-100`}

              >

                {item.label}

              </Link>

            ))}

          </nav>



          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">

            <LanguageSwitcher compact={!overlay && isHome} />

            <ThemeToggle inverted={!overlay && isHome} />

            <Link to="/dashboard/owner" className="hidden md:block">

              <Button variant={overlay ? 'outline' : 'ghost'} size="sm">

                {t('nav.listProperty')}

              </Button>

            </Link>

            <Link to="/properties" className="hidden sm:block">

              <Button variant="primary" size="sm">

                {t('nav.explore')}

              </Button>

            </Link>

            <button

              type="button"

              className={`lg:hidden p-2 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 ${

                overlay

                  ? 'text-brand-charcoal dark:text-white hover:bg-black/5 dark:hover:bg-white/10'

                  : 'text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm'

              }`}

              onClick={() => setOpen(!open)}

              aria-expanded={open}

              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}

            >

              {open ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}

            </button>

          </div>

        </div>

      </div>



      <AnimatePresence>

        {open && (

          <>

            <motion.button

              type="button"

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              exit={{ opacity: 0 }}

              className="fixed inset-0 top-14 sm:top-16 bg-black/50 z-[55] lg:hidden"

              onClick={() => setOpen(false)}

              aria-label={t('nav.closeMenu')}

            />

            <motion.div

              initial={{ opacity: 0, y: -8 }}

              animate={{ opacity: 1, y: 0 }}

              exit={{ opacity: 0, y: -8 }}

              className="lg:hidden relative z-[56] glass-light border-t border-black/5 dark:border-white/10 shadow-lg max-h-[calc(100vh-3.5rem)] overflow-y-auto"

            >

              <nav className="flex flex-col p-4 gap-1">

                {nav.map((item) => (

                  <Link

                    key={item.href}

                    to={item.href}

                    className="text-brand-charcoal dark:text-white py-3.5 px-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 min-h-[48px] flex items-center text-base font-medium"

                    onClick={() => setOpen(false)}

                  >

                    {item.label}

                  </Link>

                ))}

                <div className="pt-3 mt-2 border-t border-black/5 dark:border-white/10 flex flex-col gap-2">

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

              </nav>

            </motion.div>

          </>

        )}

      </AnimatePresence>

    </header>

  )

}

