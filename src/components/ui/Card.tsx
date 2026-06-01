import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  dark?: boolean
  onClick?: () => void
  id?: string
}

export function Card({
  children,
  className = '',
  hover = false,
  dark = false,
  onClick,
  id,
}: CardProps) {
  const base = dark
    ? 'bg-brand-slate border-white/10 text-white'
    : 'surface-card text-brand-charcoal dark:text-white'

  const Component = hover || onClick ? motion.div : 'div'
  const motionProps =
    hover || onClick
      ? {
          whileHover: { y: -4, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' },
          transition: { duration: 0.2 },
          onClick,
          className: `cursor-pointer ${onClick ? '' : ''}`,
        }
      : {}

  return (
    <Component
      id={id}
      className={`rounded-2xl border shadow-card overflow-hidden ${base} ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  )
}
