import type { MouseEvent } from 'react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import type { Property } from '@/types/property'

type Variant = 'icon' | 'compact' | 'full' | 'floating'

interface WhatsAppButtonProps {
  phone: string
  property?: Property
  variant?: Variant
  label?: string
  className?: string
  /** Stop click from bubbling (e.g. inside a card link) */
  stopPropagation?: boolean
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 bg-[#25D366] text-white hover:bg-[#20BD5A] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2'

const variantStyles: Record<Variant, string> = {
  icon: 'rounded-full w-11 h-11 min-w-[44px] min-h-[44px] shadow-md',
  compact: 'rounded-full px-4 py-2.5 min-h-[44px] text-sm shadow-md flex-1 sm:flex-none',
  full: 'rounded-full w-full px-6 py-3.5 min-h-[48px] text-sm sm:text-base shadow-md',
  floating:
    'rounded-full w-14 h-14 min-w-[56px] min-h-[56px] shadow-luxury fixed z-50 bottom-20 right-4 md:bottom-6 md:right-6',
}

export function WhatsAppButton({
  phone,
  property,
  variant = 'compact',
  label = 'WhatsApp',
  className = '',
  stopPropagation = false,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(phone, property)

  const handleClick = (e: MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  if (variant === 'icon') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles.icon} ${className}`}
        aria-label={`Chat on WhatsApp about ${property?.title ?? 'this property'}`}
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    )
  }

  if (variant === 'floating') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles.floating} ${className}`}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <WhatsAppIcon className={variant === 'full' ? 'w-5 h-5' : 'w-5 h-5 shrink-0'} />
      <span>{label}</span>
    </a>
  )
}
