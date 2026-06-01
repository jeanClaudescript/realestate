import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface StatCardProps {
  label: string
  value: string | number
  change?: string
  icon: LucideIcon
}

export function StatCard({ label, value, change, icon: Icon }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-brand-charcoal/50 mb-1">{label}</p>
          <p className="font-display text-2xl font-semibold">{value}</p>
          {change && (
            <p className="text-xs text-emerald-600 mt-1 font-medium">{change}</p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center">
          <Icon className="w-5 h-5 text-brand-gold-dark" />
        </div>
      </div>
    </Card>
  )
}
