import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  icon?: ReactNode
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-gold text-brand-charcoal hover:bg-brand-gold-light shadow-lg shadow-brand-gold/20',
  secondary:
    'bg-brand-charcoal text-white hover:bg-brand-slate dark:bg-white dark:text-brand-charcoal dark:hover:bg-brand-cream',
  outline:
    'border-2 border-brand-gold text-brand-gold-dark hover:bg-brand-gold hover:text-brand-charcoal dark:text-brand-gold',
  ghost:
    'text-brand-charcoal hover:bg-black/5 dark:text-white dark:hover:bg-white/10',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BD5A]',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-full
        transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
