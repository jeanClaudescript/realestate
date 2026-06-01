import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Layers, Maximize2, Navigation, Home, Car } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Property } from '@/types/property'
import { locale } from '@/lib/rwanda'
import {
  buildLocationPins,
  googleMapsKigaliUrl,
  kigaliMapEmbedUrl,
  NEIGHBORHOOD_MAP,
} from '@/lib/map-utils'
import { useLocale } from '@/context/LocaleContext'

interface MapPreviewProps {
  compact?: boolean
  title?: string
  locationLabel?: string
  /** Listings to plot — defaults to Kigali neighborhood pins */
  listings?: Property[]
}

const DEFAULT_PINS = Object.entries(NEIGHBORHOOD_MAP)
  .filter(([name]) => !['Musanze', 'Rubavu', 'Nyarugenge CBD'].includes(name))
  .slice(0, 8)
  .map(([label, pos]) => ({
    id: label,
    label,
    left: pos.left,
    top: pos.top,
    count: 0,
    href: `/properties?location=${encodeURIComponent(label)}`,
    featured: false,
  }))

export function MapPreview({
  compact,
  title,
  locationLabel = 'Kigali, Rwanda',
  listings = [],
}: MapPreviewProps) {
  const { t } = useLocale()
  const [activePin, setActivePin] = useState<string | null>(null)
  const [layer, setLayer] = useState<'listings' | 'areas'>('listings')

  const pins = useMemo(() => {
    if (listings.length > 0) return buildLocationPins(listings)
    return DEFAULT_PINS
  }, [listings])

  const houseCount = listings.filter((p) => p.type === 'house').length
  const carCount = listings.filter((p) => p.type === 'car').length
  const totalCount = listings.length || pins.length

  const mapTitle = title ?? t('home.map.title')

  return (
    <div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-gold/20 bg-brand-charcoal shadow-luxury ${
        compact ? 'min-h-[320px] sm:min-h-[360px]' : 'min-h-[380px] sm:min-h-[420px]'
      }`}
    >
      {/* Real map base */}
      <iframe
        title="Kigali map"
        src={kigaliMapEmbedUrl}
        className="absolute inset-0 w-full h-full border-0 pointer-events-none scale-[1.02] origin-center"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Premium tint & vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal/55 via-brand-charcoal/35 to-brand-charcoal/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,169,98,0.12),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top toolbar */}
      <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="glass-dark rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 max-w-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30">
              <Layers className="w-4 h-4 text-brand-gold" />
            </div>
            <p className="font-display text-sm sm:text-base font-semibold text-white leading-tight">
              {mapTitle}
            </p>
          </div>
          <p className="text-[11px] sm:text-xs text-white/55 pl-10 sm:pl-0 sm:ml-0">
            {locationLabel} · {totalCount} {listings.length ? t('listings.properties') : 'areas'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="glass-dark rounded-xl p-1 flex gap-0.5">
            <button
              type="button"
              onClick={() => setLayer('listings')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium min-h-[36px] transition-colors ${
                layer === 'listings' ? 'bg-brand-gold text-brand-charcoal' : 'text-white/70 hover:text-white'
              }`}
            >
              {t('listings.mapView')}
            </button>
            <button
              type="button"
              onClick={() => setLayer('areas')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium min-h-[36px] transition-colors ${
                layer === 'areas' ? 'bg-brand-gold text-brand-charcoal' : 'text-white/70 hover:text-white'
              }`}
            >
              {t('listings.mapAreas')}
            </button>
          </div>
          <a
            href={googleMapsKigaliUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-dark rounded-xl p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-brand-gold transition-colors"
            aria-label="Open in Google Maps"
          >
            <Maximize2 className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Pins */}
      <div className="absolute inset-0 z-10 pt-24 sm:pt-20 pb-16">
        <AnimatePresence>
          {pins.map((pin) => {
            const isActive = activePin === pin.id
            return (
              <Link
                key={pin.id}
                to={pin.href}
                className="absolute z-10 -translate-x-1/2 -translate-y-full group/pin"
                style={{ left: `${pin.left}%`, top: `${pin.top}%` }}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
                onFocus={() => setActivePin(pin.id)}
                onBlur={() => setActivePin(null)}
                aria-label={`${pin.label}${pin.count ? `, ${pin.count} listings` : ''}`}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`relative flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-full border-2 shadow-lg transition-all duration-200 ${
                      isActive || pin.featured
                        ? 'bg-brand-gold border-white text-brand-charcoal scale-110'
                        : 'bg-brand-charcoal/90 border-brand-gold/60 text-white group-hover/pin:bg-brand-gold group-hover/pin:text-brand-charcoal group-hover/pin:border-white'
                    }`}
                  >
                    {pin.count > 0 ? (
                      <span className="text-xs font-bold tabular-nums">{pin.count}</span>
                    ) : (
                      <MapPin className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div
                    className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent -mt-px ${
                      isActive || pin.featured
                        ? 'border-t-brand-gold'
                        : 'border-t-brand-charcoal/90 group-hover/pin:border-t-brand-gold'
                    }`}
                  />
                  <span
                    className={`mt-2 text-[10px] sm:text-xs font-semibold whitespace-nowrap px-2 py-0.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-white text-brand-charcoal shadow-md'
                        : 'text-white/90 group-hover/pin:text-brand-gold'
                    }`}
                  >
                    {pin.label}
                  </span>
                </motion.div>
              </Link>
            )
          })}
        </AnimatePresence>

        {/* Kigali center marker */}
        <div
          className="absolute z-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/30 bg-brand-gold/5 pointer-events-none"
          style={{ left: '48%', top: '42%' }}
        />
      </div>

      {/* Bottom legend */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex flex-wrap items-end justify-between gap-2">
        <div className="glass-dark rounded-xl px-3 py-2 flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-white/75">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold border border-white" />
            {t('listings.mapView')}
          </span>
          <span className="flex items-center gap-1">
            <Navigation className="w-3 h-3 text-brand-gold" />
            {locale.mapCenter.lat.toFixed(2)}°, {locale.mapCenter.lng.toFixed(2)}°
          </span>
        </div>

        {listings.length > 0 && (
          <div className="glass-dark rounded-xl px-3 py-2 flex items-center gap-3 text-[11px] sm:text-xs text-white/80">
            {houseCount > 0 && (
              <span className="flex items-center gap-1">
                <Home className="w-3 h-3 text-brand-gold" />
                {houseCount} {t('filters.type.house')}
              </span>
            )}
            {carCount > 0 && (
              <span className="flex items-center gap-1">
                <Car className="w-3 h-3 text-brand-gold" />
                {carCount} {t('filters.type.car')}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
