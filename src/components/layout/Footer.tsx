import { Link } from 'react-router-dom'

import { Home, Mail, Phone, MapPin } from 'lucide-react'

import { brand } from '@/lib/design-tokens'

import { locale } from '@/lib/rwanda'

import { useLocale } from '@/context/LocaleContext'

import { PhoneDisplay } from '@/components/ui/PhoneDisplay'

import { formatRwandaPhone } from '@/lib/phone'



export function Footer() {

  const { t } = useLocale()



  const columns = [

    {

      title: t('footer.properties'),

      links: [

        { label: t('nav.buy'), href: '/properties?mode=buy' },

        { label: t('nav.rent'), href: '/properties?mode=rent' },

        { label: t('nav.land'), href: '/properties?type=land' },

        { label: t('nav.commercial'), href: '/properties?type=commercial' },

      ],

    },

    {

      title: t('footer.platform'),

      links: [

        { label: t('home.trust.survey'), href: '/#survey' },

        { label: t('home.invest.eyebrow'), href: '/#invest' },

        { label: t('home.verified.title'), href: '/#trust' },

        { label: 'MTN MoMo', href: '/#payments' },

      ],

    },

    {

      title: t('footer.dashboards'),

      links: [

        { label: 'Owner Portal', href: '/dashboard/owner' },

        { label: 'Agent Portal', href: '/dashboard/agent' },

        { label: 'Admin Panel', href: '/dashboard/admin' },

      ],

    },

  ]



  return (

    <footer className="bg-brand-charcoal text-white" id="payments">

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20 safe-bottom">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

          <div className="sm:col-span-2 lg:col-span-2">

            <div className="flex items-center gap-2 mb-6">

              <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center border border-brand-gold/40 shrink-0">

                <Home className="w-5 h-5 text-brand-gold" />

              </div>

              <div className="min-w-0">

                <span className="font-display text-lg sm:text-xl font-semibold">{brand.name}</span>

              </div>

            </div>

            <p className="text-white/60 max-w-sm leading-relaxed mb-6">{t('footer.tagline')}</p>

            <div className="space-y-3 text-sm text-white/50">

              <p className="flex items-start gap-2">

                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />

                KN 3 Rd, {brand.headquarters} · {locale.country}

              </p>

              <div className="flex items-center gap-2">

                <Phone className="w-4 h-4 text-brand-gold shrink-0" />

                <PhoneDisplay phone={formatRwandaPhone('788000000')} className="text-white/50 hover:text-white" />

              </div>

              <p className="flex items-center gap-2 break-all">

                <Mail className="w-4 h-4 text-brand-gold shrink-0" />

                hello@{brand.domain}

              </p>

            </div>

          </div>



          {columns.map((col) => (

            <div key={col.title}>

              <h4 className="font-semibold text-brand-gold mb-4">{col.title}</h4>

              <ul className="space-y-2">

                {col.links.map((link) => (

                  <li key={link.href + link.label}>

                    <Link

                      to={link.href}

                      className="text-white/60 hover:text-white text-sm transition-colors inline-block py-1"

                    >

                      {link.label}

                    </Link>

                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>



        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/40">

          <p>

            © {new Date().getFullYear()} {brand.name}. {t('footer.ceo')}. Registered in{' '}

            {locale.country}. Prices in {locale.currency}.

          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6">

            <Link to="/legal/privacy" className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/legal/terms" className="hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/legal/compliance" className="hover:text-white transition-colors">
              {t('footer.compliance')}
            </Link>

          </div>

        </div>

      </div>

    </footer>

  )

}

