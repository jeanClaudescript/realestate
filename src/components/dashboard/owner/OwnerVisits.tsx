import { Calendar, Check, X, Clock } from 'lucide-react'
import { PhoneDisplay } from '@/components/ui/PhoneDisplay'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ownerVisits, type VisitStatus } from '@/lib/owner-mock-data'

const statusStyle: Record<VisitStatus, 'verified' | 'status' | 'outline' | 'gold'> = {
  confirmed: 'verified',
  pending: 'status',
  completed: 'outline',
  cancelled: 'gold',
}

export function OwnerVisits() {
  const upcoming = ownerVisits.filter((v) => v.status === 'confirmed' || v.status === 'pending')
  const past = ownerVisits.filter((v) => v.status === 'completed' || v.status === 'cancelled')

  return (
    <div className="space-y-8">
      <Card className="p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-brand-gold" />
          Upcoming Site Visits
        </h3>
        <div className="space-y-4">
          {upcoming.map((v) => (
            <div
              key={v.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-black/5"
            >
              <div>
                <p className="font-semibold">{v.property}</p>
                <p className="text-sm text-brand-charcoal/60 dark:text-white/60 mt-1">{v.guest}</p>
                <PhoneDisplay phone={v.phone} className="text-sm mt-1" size="sm" />
                <p className="text-sm font-medium text-brand-gold-dark mt-2 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {v.date} at {v.time}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={statusStyle[v.status]}>{v.status}</Badge>
                {v.status === 'pending' && (
                  <>
                    <Button variant="primary" size="sm" icon={<Check className="w-4 h-4" />}>
                      Confirm
                    </Button>
                    <Button variant="outline" size="sm" icon={<X className="w-4 h-4" />}>
                      Decline
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Past Visits</h3>
        <div className="space-y-3">
          {past.map((v) => (
            <div key={v.id} className="flex justify-between items-center p-3 rounded-xl bg-brand-cream gap-2">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{v.property}</p>
                <p className="text-xs text-brand-charcoal/50">{v.date} · {v.guest}</p>
              </div>
              <Badge variant={statusStyle[v.status]}>{v.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
