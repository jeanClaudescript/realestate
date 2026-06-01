import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  Calendar,
  MessageCircle,
  FileDown,
  MapPin,
  Maximize2,
  Shield,
  Play,
  View,
  Calculator,
  TrendingUp,
  School,
  Hospital,
  Route,
  CheckCircle2,
  ChevronLeft,
  Share2,
} from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { MapPreview } from '@/components/properties/MapPreview'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { TrustScore } from '@/components/ui/TrustScore'
import { properties, agents, formatPrice } from '@/lib/mock-data'
import { formatRWF } from '@/lib/rwanda'
import { BookingModal } from '@/components/booking/BookingModal'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { MobilePropertyBar } from '@/components/properties/MobilePropertyBar'
import { SafeImage } from '@/components/ui/SafeImage'
import { PhoneDisplay } from '@/components/ui/PhoneDisplay'
import { useLocale } from '@/context/LocaleContext'
import { useToast } from '@/context/ToastContext'
import { brand } from '@/lib/design-tokens'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function PropertyDetailPage() {
  const { t } = useLocale()
  const { showToast } = useToast()
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [mortgageAmount, setMortgageAmount] = useState(() => (property?.price ?? 0) * 0.8)
  const [roiYears, setRoiYears] = useState(5)
  const [bookingModal, setBookingModal] = useState<'visit' | 'reserve' | null>(null)

  if (!property) {
    return <Navigate to="/404" replace />
  }

  const agent = agents.find((a) => a.id === property.agentId)
  const annualRate = 0.165 // Typical Rwanda mortgage ~16.5%
  const monthlyPayment =
    (mortgageAmount * (annualRate / 12)) /
    (1 - Math.pow(1 + annualRate / 12, -240))
  const roiEstimate = property.investment
    ? ((property.investment.roiForecast / 100) * property.price * roiYears).toFixed(0)
    : '—'

  const agentPhone = agent?.whatsapp ?? agents[0]?.whatsapp ?? '788000000'

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        showToast(t('toast.linkCopied'))
      }
    } catch {
      /* user cancelled share */
    }
  }

  const handleVideo = () => {
    if (property.videoUrl) {
      window.open(property.videoUrl, '_blank', 'noopener,noreferrer')
    } else {
      showToast('Video tour coming soon for this listing.')
    }
  }

  const handleContactAgent = () => {
    window.open(buildWhatsAppUrl(agentPhone, property), '_blank', 'noopener,noreferrer')
  }

  const handleRequestDocs = () => {
    showToast(t('toast.documentsRequested'))
  }

  return (
    <PageLayout>
      {/* Gallery Hero */}
      <section className="pt-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('detail.back')}
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 gap-2 px-2 lg:px-4 max-w-[1600px] mx-auto">
          <div className="lg:col-span-2 relative aspect-[16/10] lg:aspect-auto lg:min-h-[500px] rounded-2xl overflow-hidden">
            <SafeImage
              src={property.images[activeImage]}
              alt={property.title}
              fallbackSeed={property.id}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {property.verified && (
                <Badge variant="verified" icon={<CheckCircle2 className="w-3 h-3" />}>
                  Verified
                </Badge>
              )}
              {property.has360Tour && (
                <Badge variant="dark" icon={<View className="w-3 h-3" />}>
                  360° Tour
                </Badge>
              )}
            </div>
            <button
              type="button"
              onClick={handleVideo}
              className="absolute bottom-4 left-4 flex items-center gap-2 glass-dark rounded-xl px-4 py-2.5 text-white text-sm min-h-[44px] hover:bg-white/10 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Video Walkthrough</span>
              <span className="sm:hidden">Video</span>
            </button>
            <div className="absolute bottom-4 right-4 z-10">
              <WhatsAppButton
                phone={agentPhone}
                property={property}
                variant="icon"
                className="w-12 h-12 min-w-[48px] min-h-[48px] shadow-luxury"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {property.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-colors ${
                  activeImage === i ? 'border-brand-gold' : 'border-transparent'
                }`}
              >
                <SafeImage src={img} alt="" fallbackSeed={`${property.id}-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 pb-mobile-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold-dark mb-2">
                      {property.type} · {property.mode}
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl font-semibold text-brand-charcoal dark:text-white">
                      {property.title}
                    </h1>
                    <p className="flex items-center gap-2 mt-2 text-muted">
                      <MapPin className="w-4 h-4" />
                      {property.location}, {property.city}, {property.country}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="p-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-brand-cream dark:hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Share property"
                    >
                      <Share2 className="w-5 h-5 text-brand-charcoal dark:text-white" />
                    </button>
                  </div>
                </div>
                <p className="font-display text-3xl font-semibold text-brand-gold-dark">
                  {formatPrice(property.price, property.currency, property.mode)}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <TrustScore score={property.trustScore} size="lg" />
                  <Badge variant="gold">Inspection Approved</Badge>
                  <Badge variant="verified">Legal Docs Verified</Badge>
                  <Badge variant="gold">{brand.ceo.company}</Badge>
                </div>
              </div>

              <p className="text-muted leading-relaxed text-lg">
                {property.description}
              </p>

              {/* Specs */}
              <Card className="p-6">
                <h2 className="font-display text-xl font-semibold mb-4">Specifications</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['Plot Size', property.plotSize],
                    ['Built Area', property.builtArea],
                    ['Bedrooms', property.bedrooms?.toString()],
                    ['Bathrooms', property.bathrooms?.toString()],
                    ['Status', property.status],
                    ['Type', property.type],
                  ]
                    .filter(([, v]) => v)
                    .map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between py-3 border-b border-black/5 last:border-0"
                      >
                        <span className="text-brand-charcoal/50">{label}</span>
                        <span className="font-medium capitalize">{value}</span>
                      </div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {property.specs.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full bg-brand-cream text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Survey */}
              {property.survey && (
                <Card className="p-6" id="survey-detail">
                  <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                    <Maximize2 className="w-5 h-5 text-brand-gold" />
                    Survey Intelligence
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-brand-cream">
                      <p className="text-xs text-brand-charcoal/50 mb-1">Plot Area</p>
                      <p className="font-semibold">{property.survey.plotArea}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-brand-cream">
                      <p className="text-xs text-brand-charcoal/50 mb-1">Dimensions</p>
                      <p className="font-semibold">{property.survey.dimensions}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-brand-cream">
                      <p className="text-xs text-brand-charcoal/50 mb-1">Boundaries</p>
                      <p className="font-semibold">{property.survey.boundaries}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-brand-cream">
                      <p className="text-xs text-brand-charcoal/50 mb-1">Coordinates</p>
                      <p className="font-semibold font-mono text-sm">
                        {property.survey.coordinates.lat.toFixed(4)},{' '}
                        {property.survey.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <MapPreview compact title="Plot Boundaries — GIS View" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    icon={<FileDown className="w-4 h-4" />}
                  >
                    Download Survey PDF
                  </Button>
                </Card>
              )}

              {/* Map & Nearby */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Location & Nearby</h2>
                <MapPreview />
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  {[
                    { icon: School, label: 'Schools', value: 'Green Hills Academy 1.5km' },
                    { icon: Hospital, label: 'Hospitals', value: 'King Faisal Hospital 2km' },
                    { icon: Route, label: 'Major Roads', value: 'KG 11 Ave · Airport Rd' },
                  ].map(({ icon: Icon, label, value }) => (
                    <Card key={label} className="p-4 flex items-center gap-3">
                      <Icon className="w-5 h-5 text-brand-gold" />
                      <div>
                        <p className="text-xs text-brand-charcoal/50">{label}</p>
                        <p className="text-sm font-medium">{value}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Investment */}
              {property.investment && (
                <Card className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-brand-gold" />
                    Investment Insights
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-brand-cream">
                      <p className="text-2xl font-display font-semibold text-brand-gold-dark">
                        {property.investment.roiForecast}%
                      </p>
                      <p className="text-xs text-brand-charcoal/50 mt-1">ROI Forecast</p>
                    </div>
                    {property.investment.rentalYield && (
                      <div className="text-center p-4 rounded-xl bg-brand-cream">
                        <p className="text-2xl font-display font-semibold">
                          {property.investment.rentalYield}%
                        </p>
                        <p className="text-xs text-brand-charcoal/50 mt-1">Rental Yield</p>
                      </div>
                    )}
                    <div className="text-center p-4 rounded-xl bg-brand-cream">
                      <p className="text-2xl font-display font-semibold">
                        {property.investment.areaGrowthTrend}
                      </p>
                      <p className="text-xs text-brand-charcoal/50 mt-1">Area Growth</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <Card className="p-6 shadow-luxury hidden lg:block">
                  <h3 className="font-display text-lg font-semibold mb-4">Book & Reserve</h3>
                  <div className="space-y-3">
                    <WhatsAppButton
                      phone={agentPhone}
                      property={property}
                      variant="full"
                      label={t('detail.whatsapp')}
                    />
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={<Calendar className="w-5 h-5" />}
                      onClick={() => setBookingModal('visit')}
                    >
                      {t('detail.bookVisit')}
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      fullWidth
                      onClick={() => setBookingModal('reserve')}
                    >
                      {t('detail.reserve')}
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      fullWidth
                      icon={<MessageCircle className="w-4 h-4" />}
                      onClick={handleContactAgent}
                    >
                      {t('detail.contact')}
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      fullWidth
                      icon={<FileDown className="w-4 h-4" />}
                      onClick={handleRequestDocs}
                    >
                      Request Documents
                    </Button>
                  </div>
                </Card>

                {agent && (
                  <Card className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <SafeImage
                        src={agent.avatar}
                        alt={agent.name}
                        fallbackSeed={agent.id}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{agent.name}</p>
                        <p className="text-sm text-brand-charcoal/50">
                          {brand.ceo.company} · {agent.listings} listings · ★ {agent.rating}
                        </p>
                      </div>
                    </div>
                    <PhoneDisplay phone={agent.phone} className="text-muted" size="md" />
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-brand-gold" />
                    Mortgage Estimator
                  </h3>
                  <label className="text-xs text-brand-charcoal/50">Loan amount (RWF)</label>
                  <input
                    type="range"
                    min={property.price * 0.5}
                    max={property.price}
                    value={mortgageAmount}
                    onChange={(e) => setMortgageAmount(Number(e.target.value))}
                    className="w-full accent-brand-gold mt-2"
                  />
                  <p className="text-2xl font-display font-semibold mt-2">
                    {formatRWF(monthlyPayment)}
                    <span className="text-sm font-sans text-brand-charcoal/50"> /mo est.</span>
                  </p>
                  <p className="text-xs text-brand-charcoal/40 mt-1">~16.5% p.a. · 20-year term</p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">ROI Calculator</h3>
                  <label className="text-xs text-brand-charcoal/50">Investment period (years)</label>
                  <input
                    type="number"
                    value={roiYears}
                    onChange={(e) => setRoiYears(Number(e.target.value))}
                    className="w-full border rounded-xl px-3 py-2 mt-2 text-sm"
                    min={1}
                    max={20}
                  />
                  <p className="mt-4 text-sm text-brand-charcoal/60">Estimated return</p>
                  <p className="text-2xl font-display font-semibold text-brand-gold-dark">
                    {formatRWF(Number(roiEstimate))}
                  </p>
                </Card>

                <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <p className="text-sm text-emerald-800">
                    Trust Score {property.trustScore} — Fraud-checked listing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobilePropertyBar
        property={property}
        agentPhone={agentPhone}
        onBookVisit={() => setBookingModal('visit')}
      />

      <BookingModal
        type={bookingModal}
        property={property}
        onClose={() => setBookingModal(null)}
      />
    </PageLayout>
  )
}
