import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield,
  Map,
  TrendingUp,
  Sparkles,
  Calendar,
  FileCheck,
  Star,
  ArrowRight,
  Play,
} from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { HeroSearch } from '@/components/home/HeroSearch'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { MapPreview } from '@/components/properties/MapPreview'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { properties, testimonials, nearbyLocations } from '@/lib/mock-data'
import { sortPropertiesForDisplay } from '@/lib/property-order'
import { useLocale } from '@/context/LocaleContext'
import { heroPosterImage } from '@/lib/images'
import { SafeImage } from '@/components/ui/SafeImage'
import { LeadershipSection } from '@/components/home/LeadershipSection'
import { StatsBar } from '@/components/home/StatsBar'
import { PaymentMethods } from '@/components/home/PaymentMethods'
import { AIRecommendations } from '@/components/home/AIRecommendations'
const trustFeatureKeys = [
  { icon: Shield, titleKey: 'home.trust.verified', descKey: 'home.trust.verifiedDesc' },
  { icon: Map, titleKey: 'home.trust.survey', descKey: 'home.trust.surveyDesc' },
  { icon: FileCheck, titleKey: 'home.trust.inspection', descKey: 'home.trust.inspectionDesc' },
  { icon: TrendingUp, titleKey: 'home.trust.investor', descKey: 'home.trust.investorDesc' },
] as const

export function HomePage() {
  const { t } = useLocale()
  const featured = sortPropertiesForDisplay(properties.filter((p) => p.featured))
  const topListings = sortPropertiesForDisplay(properties)

  return (
    <PageLayout>
      {/* Hero — compact on mobile so users reach listings faster */}
      <section className="relative overflow-hidden sm:min-h-[88vh] lg:min-h-[92dvh] sm:flex sm:items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroPosterImage()}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-neighborhood-42948-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/70 via-brand-charcoal/50 to-brand-charcoal" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-[4.5rem] pb-8 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="dark" icon={<Sparkles className="w-3 h-3" />}>
              {t('hero.badge')}
            </Badge>
            <h1 className="font-display text-xl leading-snug min-[380px]:text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mt-2 sm:mt-6 max-w-4xl mx-auto px-1">
              {t('hero.title')}
            </h1>
            <p className="mt-2 sm:mt-6 text-sm sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-snug sm:leading-relaxed px-1 line-clamp-2 sm:line-clamp-none">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          <div className="mt-4 sm:mt-10">
            <HeroSearch />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-10 max-w-md sm:max-w-none mx-auto sm:mx-0 px-0"
          >
            <Link to="/properties" className="col-span-2 sm:col-span-1 sm:w-auto">
              <Button variant="primary" size="md" fullWidth className="sm:!w-auto sm:min-h-[48px] min-h-[44px] text-sm sm:text-base" icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}>
                {t('hero.explore')}
              </Button>
            </Link>
            <Link to="/properties" className="sm:w-auto">
              <Button variant="outline" size="md" fullWidth className="sm:!w-auto sm:min-h-[48px] min-h-[44px] text-sm sm:text-base" icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}>
                <span className="truncate">{t('hero.bookVisit')}</span>
              </Button>
            </Link>
            <Link to="/dashboard/owner" className="sm:w-auto">
              <Button variant="ghost" size="md" fullWidth className="sm:!w-auto sm:min-h-[48px] min-h-[44px] text-sm sm:text-base px-2">
                {t('hero.list')}
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/40 text-xs">
          <span>{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-brand-gold to-transparent"
          />
        </div>
      </section>

      <StatsBar />

      {/* Featured Properties */}
      <section className="pt-12 pb-16 sm:pt-24 sm:pb-20 md:py-28 bg-brand-mist dark:bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('home.featured.eyebrow')}
            title={t('home.featured.title')}
            subtitle={t('home.featured.subtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.slice(0, 6).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/properties">
              <Button variant="secondary" size="lg">
                {t('home.featured.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-20 bg-brand-charcoal dark:bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('home.map.eyebrow')}
            title={t('home.map.title')}
            subtitle={t('home.map.subtitle')}
            light
            align="center"
          />
          <MapPreview />
        </div>
      </section>

      {/* Verified */}
      <section className="py-20 md:py-28 bg-white dark:bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SectionHeader
              eyebrow={t('home.verified.eyebrow')}
              title={t('home.verified.title')}
              subtitle={t('home.verified.subtitle')}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {topListings.slice(0, 4).map((p) => (
                <Link key={p.id} to={`/properties/${p.id}`}>
                  <Card hover className="p-4 flex gap-4 items-center">
                    <SafeImage
                      src={p.images[0]}
                      alt={p.title}
                      fallbackSeed={p.id}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-sm line-clamp-1">{p.title}</p>
                      <Badge variant="verified">Trust {p.trustScore}</Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LeadershipSection />

      {/* Why Trust Us */}
      <section id="trust" className="py-20 md:py-28 bg-brand-cream dark:bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('home.trust.eyebrow')}
            title={t('home.trust.title')}
            subtitle={t('home.trust.subtitle')}
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatureKeys.map(({ icon: Icon, titleKey, descKey }) => (
              <Card key={titleKey} hover className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-gold-dark" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-brand-charcoal dark:text-white">{t(titleKey)}</h3>
                <p className="text-sm text-muted leading-relaxed">{t(descKey)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Survey Intelligence */}
      <section id="survey" className="py-20 bg-brand-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow={t('home.survey.eyebrow')}
              title={t('home.survey.title')}
              subtitle={t('home.survey.subtitle')}
              light
            />
            <ul className="space-y-3 text-white/70">
              {[
                'RDB cadastral & GIS map interface',
                'Plot boundary visualization',
                'Land dimensions in m² & coordinates',
                'Survey PDF download',
                'Kigali elevation & terrain preview',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <MapPreview compact title="Plot Boundary GIS View" />
        </div>
      </section>

      {/* Investor */}
      <section id="invest" className="py-20 md:py-28 bg-brand-mist dark:bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('home.invest.eyebrow')}
            title={t('home.invest.title')}
            subtitle={t('home.invest.subtitle')}
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Avg. ROI Forecast', value: '10.2%', sub: 'Kigali verified listings' },
              { label: 'Rental Yield', value: '6.8%', sub: 'Residential avg. (RWF)' },
              { label: 'Kicukiro Growth', value: '+24%', sub: 'Fastest district YoY' },
            ].map((stat) => (
              <Card key={stat.label} className="p-8 text-center">
                <p className="text-sm text-brand-charcoal/60 mb-2">{stat.label}</p>
                <p className="font-display text-4xl font-semibold text-brand-gold-dark">
                  {stat.value}
                </p>
                <p className="text-xs text-brand-charcoal/50 mt-2">{stat.sub}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AIRecommendations />
      <PaymentMethods />

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('home.testimonials.eyebrow')}
            title={t('home.testimonials.title')}
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <Card key={item.id} className="p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-brand-charcoal/80 dark:text-white/80 leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <SafeImage src={item.avatar} alt={item.name} fallbackSeed={item.id} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-brand-charcoal dark:text-white">{item.name}</p>
                    <p className="text-sm text-muted">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      <section className="py-20 bg-brand-cream dark:bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('home.locations.eyebrow')}
            title={t('home.locations.title')}
            subtitle={t('home.locations.subtitle')}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyLocations.map((loc) => (
              <Link key={loc.name} to="/properties" className="group relative rounded-2xl overflow-hidden aspect-[4/5]">
                <SafeImage
                  src={loc.image}
                  alt={loc.name}
                  fallbackSeed={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-display text-xl font-semibold">{loc.name}</p>
                  <p className="text-sm text-white/70">{loc.count} {t('home.locations.count')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-brand-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-semibold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-white/60 mb-8">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/properties">
              <Button variant="primary" size="lg">
                {t('home.cta.explore')}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              icon={<Play className="w-5 h-5" />}
              onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('home.cta.tour')}
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
