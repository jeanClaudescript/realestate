import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gauge, Fuel, Settings2, MapPin, CheckCircle2 } from 'lucide-react'
import type { Vehicle } from '@/types/vehicle'
import { formatVehiclePrice } from '@/lib/vehicles-mock-data'
import { SafeImage } from '@/components/ui/SafeImage'
import { Badge } from '@/components/ui/Badge'
import { TrustScore } from '@/components/ui/TrustScore'
import { Button } from '@/components/ui/Button'
import { useLocale } from '@/context/LocaleContext'

interface VehicleCardProps {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { t } = useLocale()

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group surface-card rounded-2xl shadow-card overflow-hidden hover:shadow-luxury transition-shadow"
    >
      <Link to={`/cars/${vehicle.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={vehicle.images[0]}
          alt={vehicle.title}
          fallbackSeed={vehicle.id}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {vehicle.verified && (
            <Badge variant="verified" icon={<CheckCircle2 className="w-3 h-3" />}>
              {t('card.verified')}
            </Badge>
          )}
          <Badge variant="gold">{vehicle.year}</Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-lg sm:text-xl font-display font-semibold text-white drop-shadow-sm line-clamp-1">
            {formatVehiclePrice(vehicle)}
          </p>
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark mb-1">
              {vehicle.make} · {vehicle.bodyType}
            </p>
            <h3 className="font-display text-base sm:text-lg font-semibold text-brand-charcoal dark:text-white line-clamp-2">
              {vehicle.title}
            </h3>
          </div>
          <TrustScore score={vehicle.trustScore} size="sm" />
        </div>

        <p className="flex items-center gap-1 text-sm text-muted mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{vehicle.location}, {vehicle.city}</span>
        </p>

        <div className="flex flex-wrap gap-2 text-xs text-muted mb-4">
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            {vehicle.mileage}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="w-3.5 h-3.5" />
            {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5" />
            {vehicle.fuel}
          </span>
        </div>

        <Link to={`/cars/${vehicle.id}`} className="block">
          <Button variant="secondary" size="sm" fullWidth className="min-h-[44px]">
            {t('cars.viewDetails')}
          </Button>
        </Link>
      </div>
    </motion.article>
  )
}
