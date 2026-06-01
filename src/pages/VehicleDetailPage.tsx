import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ChevronLeft, Share2, Gauge, Fuel, Settings2, Calendar, Palette } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { TrustScore } from '@/components/ui/TrustScore'
import { SafeImage } from '@/components/ui/SafeImage'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { vehicles, formatVehiclePrice } from '@/lib/vehicles-mock-data'
import { agents } from '@/lib/mock-data'
import { useLocale } from '@/context/LocaleContext'
import { useToast } from '@/context/ToastContext'
import { brand } from '@/lib/design-tokens'

export function VehicleDetailPage() {
  const { t } = useLocale()
  const { showToast } = useToast()
  const { id } = useParams()
  const vehicle = vehicles.find((v) => v.id === id)
  const [activeImage, setActiveImage] = useState(0)

  if (!vehicle) return <Navigate to="/404" replace />

  const agent = agents.find((a) => a.id === vehicle.agentId)
  const agentPhone = agent?.whatsapp ?? '788000000'

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: vehicle.title, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        showToast(t('toast.linkCopied'))
      }
    } catch {
      /* cancelled */
    }
  }

  return (
    <PageLayout>
      <section className="pt-16 sm:pt-20 bg-brand-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm min-h-[44px]"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('cars.back')}
          </Link>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-2 px-2 sm:px-4 max-w-[1600px] mx-auto pb-2">
          <div className="relative aspect-[4/3] lg:col-span-2 rounded-xl overflow-hidden">
            <SafeImage
              src={vehicle.images[activeImage]}
              alt={vehicle.title}
              fallbackSeed={vehicle.id}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="gold">{vehicle.year}</Badge>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide lg:flex-col lg:overflow-visible">
            {vehicle.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-24 h-16 lg:w-full lg:aspect-video rounded-lg overflow-hidden border-2 ${
                  activeImage === i ? 'border-brand-gold' : 'border-transparent'
                }`}
              >
                <SafeImage src={img} alt="" fallbackSeed={`${vehicle.id}-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 pb-24 bg-brand-mist dark:bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm uppercase tracking-wider text-brand-gold-dark mb-1">
                    {vehicle.make} · {vehicle.condition}
                  </p>
                  <h1 className="font-display text-2xl sm:text-3xl font-semibold text-brand-charcoal dark:text-white break-words">
                    {vehicle.title}
                  </h1>
                  <p className="text-2xl sm:text-3xl font-display font-semibold text-brand-gold-dark mt-2">
                    {formatVehiclePrice(vehicle)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="touch-target rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <TrustScore score={vehicle.trustScore} size="lg" />
              <p className="text-muted leading-relaxed">{vehicle.description}</p>
              <Card className="p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold mb-4">{t('cars.specs')}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { icon: Calendar, label: t('cars.year'), value: String(vehicle.year) },
                    { icon: Gauge, label: t('cars.mileage'), value: vehicle.mileage },
                    { icon: Settings2, label: t('cars.transmission'), value: vehicle.transmission },
                    { icon: Fuel, label: t('cars.fuel'), value: vehicle.fuel },
                    { icon: Palette, label: t('cars.color'), value: vehicle.color },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-2">
                      <Icon className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-muted text-xs">{label}</p>
                        <p className="font-medium capitalize">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {vehicle.specs.map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded-full surface-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="p-6 space-y-3">
                <h3 className="font-display text-lg font-semibold">{t('cars.contact')}</h3>
                <WhatsAppButton phone={agentPhone} variant="full" label={t('detail.whatsapp')} />
                <Button variant="primary" fullWidth size="lg" className="min-h-[48px]">
                  {t('cars.testDrive')}
                </Button>
                {agent && (
                  <p className="text-sm text-muted text-center pt-2">
                    {agent.name} · {brand.ceo.company}
                  </p>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
