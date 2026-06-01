import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  Play,
  MapPin,
  Maximize2,
  Bed,
  Bath,
  GitCompare,
  CheckCircle2,
  Gauge,
  Fuel,
  Settings2,
  Calendar,
} from 'lucide-react'
import type { Property } from '@/types/property'
import { formatPrice, agents } from '@/lib/mock-data'
import { SafeImage } from '@/components/ui/SafeImage'
import { Badge } from '@/components/ui/Badge'
import { TrustScore } from '@/components/ui/TrustScore'
import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { CallButton } from '@/components/ui/CallButton'
import { getPropertyOwnerPhone } from '@/lib/contact'
import { useLocale } from '@/context/LocaleContext'

interface PropertyCardProps {
  property: Property
  onFavorite?: (id: string) => void
  onCompare?: (id: string) => void
  isFavorite?: boolean
  isCompared?: boolean
}

export function PropertyCard({
  property,
  onFavorite,
  onCompare,
  isFavorite,
  isCompared,
}: PropertyCardProps) {
  const { t } = useLocale()
  const [hover, setHover] = useState(false)
  const agent = agents.find((a) => a.id === property.agentId)
  const statusKey = `status.${property.status}` as const
  const agentPhone = agent?.whatsapp ?? '788000000'
  const ownerPhone = getPropertyOwnerPhone(property, agents)
  const isCar = property.type === 'car'
  const v = property.vehicle
  const typeLabel = t(`filters.type.${property.type}` as 'filters.type.house')

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group surface-card rounded-2xl shadow-card overflow-hidden hover:shadow-luxury transition-shadow duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/properties/${property.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={property.images[0]}
          alt={property.title}
          fallbackSeed={property.id}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {property.videoUrl && (
          <motion.div
            animate={{ opacity: hover ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-brand-charcoal ml-1" fill="currentColor" />
            </div>
          </motion.div>
        )}

        <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[60%]">
          {property.verified && (
            <Badge variant="verified" icon={<CheckCircle2 className="w-3 h-3" />}>
              {t('card.verified')}
            </Badge>
          )}
          <Badge variant="status">{t(statusKey)}</Badge>
        </div>

        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onFavorite?.(property.id)
            }}
            className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            aria-label={t('card.save')}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onCompare?.(property.id)
            }}
            className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center ${
              isCompared
                ? 'bg-brand-gold text-brand-charcoal ring-2 ring-white shadow-lg scale-105'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            aria-label={t('card.compare')}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        </div>

        {/* Call & WhatsApp on image — always visible on mobile, hover on desktop */}
        <div
          className="absolute bottom-3 right-3 z-10 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.preventDefault()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          <CallButton
            phone={ownerPhone}
            variant="icon"
            stopPropagation
            ariaLabel={t('detail.call')}
          />
          <WhatsAppButton
            phone={agentPhone}
            property={property}
            variant="icon"
            stopPropagation
          />
        </div>

        <div className="absolute bottom-3 left-3 right-14 pr-2">
          <p className="text-lg sm:text-2xl font-display font-semibold text-white drop-shadow-sm truncate">
            {formatPrice(property.price, property.currency, property.mode)}
          </p>
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark mb-1">
              {typeLabel}
            </p>
            <h3 className="font-display text-base sm:text-lg font-semibold text-brand-charcoal dark:text-white line-clamp-2">
              {property.title}
            </h3>
          </div>
          <TrustScore score={property.trustScore} size="sm" />
        </div>

        <p className="flex items-center gap-1 text-sm text-muted mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {property.location}, {property.city}
          </span>
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-brand-charcoal/70 mb-3">
          {isCar && v ? (
            <>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {v.year} {t('card.year')}
              </span>
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" />
                {v.mileage}
              </span>
              <span className="flex items-center gap-1">
                <Settings2 className="w-3.5 h-3.5" />
                {v.transmission}
              </span>
              <span className="flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5" />
                {v.fuel}
              </span>
            </>
          ) : (
            <>
              {property.plotSize && (
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  {property.plotSize}
                </span>
              )}
              {property.bedrooms != null && (
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5" />
                  {property.bedrooms} {t('card.bed')}
                </span>
              )}
              {property.bathrooms != null && (
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5" />
                  {property.bathrooms} {t('card.bath')}
                </span>
              )}
            </>
          )}
        </div>

        <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
          {property.specs.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="text-xs px-2 py-1 rounded-full bg-brand-cream dark:bg-white/10 text-brand-charcoal/70 dark:text-white/70"
            >
              {spec}
            </span>
          ))}
        </div>

        <Link to={`/properties/${property.id}`} className="block">
          <Button variant="secondary" size="sm" fullWidth className="min-h-[44px]">
            {t('card.viewDetails')}
          </Button>
        </Link>
      </div>
    </motion.article>
  )
}
