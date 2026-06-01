import type { ReactNode } from 'react'

type BadgeVariant = 'gold' | 'verified' | 'status' | 'dark' | 'outline'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  icon?: ReactNode
}

const styles: Record<BadgeVariant, string> = {
  gold: 'bg-brand-gold/20 text-brand-gold-dark border-brand-gold/30',
  verified: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
  status: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
  dark: 'bg-white/10 text-white border-white/20',
  outline: 'bg-transparent text-brand-charcoal border-brand-charcoal/20',
}

export function Badge({ children, variant = 'gold', icon }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${styles[variant]}`}
    >
      {icon}
      {children}
    </span>
  )
}
