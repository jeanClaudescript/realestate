import { motion } from 'framer-motion'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}`}
    >
      {eyebrow && (
        <p
          className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
            light ? 'text-brand-gold' : 'text-brand-gold-dark'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ${
          light ? 'text-white' : 'text-brand-charcoal dark:text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-white/70' : 'text-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
