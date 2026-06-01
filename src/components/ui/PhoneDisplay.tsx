import { formatRwandaPhone, telHref } from '@/lib/phone'

interface PhoneDisplayProps {
  phone: string
  className?: string
  link?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

/** Rwanda numbers with consistent spacing and readable font */
export function PhoneDisplay({ phone, className = '', link = true, size = 'md' }: PhoneDisplayProps) {
  const formatted = formatRwandaPhone(phone)
  const classes = `font-phone tabular-nums tracking-wide text-inherit ${sizes[size]} ${className}`

  if (!link) {
    return <span className={classes}>{formatted}</span>
  }

  return (
    <a href={telHref(phone)} className={`${classes} hover:text-brand-gold transition-colors`}>
      {formatted}
    </a>
  )
}
