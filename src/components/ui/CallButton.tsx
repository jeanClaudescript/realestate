import type { MouseEvent } from 'react'
import { Phone } from 'lucide-react'
import { telHref } from '@/lib/phone'

type Variant = 'icon' | 'compact' | 'full'

interface CallButtonProps {
  phone: string
  variant?: Variant
  label?: string
  className?: string
  /** Stop click from bubbling (e.g. inside a card link) */
  stopPropagation?: boolean
  ariaLabel?: string
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 bg-brand-charcoal dark:bg-white text-white dark:text-brand-charcoal hover:bg-brand-slate dark:hover:bg-brand-cream active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2'

const variantStyles: Record<Variant, string> = {
  icon: 'rounded-full w-11 h-11 min-w-[44px] min-h-[44px] shadow-md',
  compact: 'rounded-full px-4 py-2.5 min-h-[44px] text-sm shadow-md flex-1 sm:flex-none',
  full: 'rounded-full w-full px-6 py-3.5 min-h-[48px] text-sm sm:text-base shadow-md',
}

export function CallButton({
  phone,
  variant = 'compact',
  label = 'Call',
  className = '',
  stopPropagation = false,
  ariaLabel,
}: CallButtonProps) {
  const href = telHref(phone)

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
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles.icon} ${className}`}
        aria-label={ariaLabel ?? `Call ${label}`}
      >
        <Phone className="w-5 h-5" />
      </a>
    )
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel ?? label}
    >
      <Phone className="w-5 h-5 shrink-0" />
      <span>{label}</span>
    </a>
  )
}
