import { Link } from 'react-router-dom'
import { MapPin, Layers } from 'lucide-react'
import { locale } from '@/lib/rwanda'
import { mapBackdropImage } from '@/lib/images'

interface MapPreviewProps {
  compact?: boolean
  title?: string
  locationLabel?: string
}

export function MapPreview({
  compact,
  title = 'Kigali Property Map',
  locationLabel = 'Kigali, Rwanda',
}: MapPreviewProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-black/5 bg-brand-slate ${
        compact ? 'aspect-[16/10]' : 'aspect-[21/9] min-h-[280px]'
      }`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${mapBackdropImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,98,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,98,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/40 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-brand-gold/20 flex items-center justify-center mx-auto mb-4 border border-brand-gold/30">
            <Layers className="w-8 h-8 text-brand-gold" />
          </div>
          <p className="font-display text-xl text-white font-semibold mb-2">{title}</p>
          <p className="text-white/50 text-sm max-w-xs mx-auto">
            Google Maps · RDB plot boundaries · Survey coordinates ({locale.mapCenter.lat},{' '}
            {locale.mapCenter.lng})
          </p>
        </div>
      </div>

      {[
        { left: 22, top: 38, label: 'Kimihurura' },
        { left: 48, top: 32, label: 'Kacyiru' },
        { left: 65, top: 48, label: 'Kicukiro' },
        { left: 35, top: 55, label: 'Remera' },
      ].map((pin) => (
        <Link
          key={pin.label}
          to={`/properties?location=${encodeURIComponent(pin.label)}`}
          className="absolute z-10 flex flex-col items-center group/pin -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
          style={{ left: `${pin.left}%`, top: `${pin.top}%` }}
          aria-label={`Browse ${pin.label}`}
        >
          <div className="w-3 h-3 rounded-full bg-brand-gold border-2 border-white shadow-glow group-hover/pin:animate-pulse" />
          <span className="text-[10px] text-white/80 mt-1 font-medium whitespace-nowrap group-hover/pin:text-brand-gold">
            {pin.label}
          </span>
        </Link>
      ))}

      <div className="absolute bottom-4 left-4 flex items-center gap-2 glass-dark rounded-xl px-3 py-2 text-xs text-white/80 z-10">
        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
        {locationLabel} · Live listings
      </div>
    </div>
  )
}
