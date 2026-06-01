import { Shield } from 'lucide-react'

interface TrustScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function TrustScore({ score, size = 'md' }: TrustScoreProps) {
  const sizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }
  const color =
    score >= 95 ? 'text-emerald-500' : score >= 85 ? 'text-brand-gold' : 'text-amber-500'

  return (
    <div className={`inline-flex items-center gap-1.5 font-semibold ${sizes[size]} ${color}`}>
      <Shield className="w-4 h-4" />
      <span>Trust {score}</span>
    </div>
  )
}
