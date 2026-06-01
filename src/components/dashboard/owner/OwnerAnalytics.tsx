import { Eye, Heart, MessageSquare, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { StatCard } from '@/components/dashboard/StatCard'
import { analyticsData } from '@/lib/owner-mock-data'

export function OwnerAnalytics() {
  const maxViews = Math.max(...analyticsData.weeklyViews.map((d) => d.views))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Views" value={analyticsData.viewsThisMonth.toLocaleString()} change={analyticsData.viewsChange} icon={Eye} />
        <StatCard label="Saves" value={analyticsData.saves} change={analyticsData.savesChange} icon={Heart} />
        <StatCard label="Inquiries" value={analyticsData.inquiries} change={analyticsData.inquiriesChange} icon={MessageSquare} />
        <StatCard label="Conversion" value={analyticsData.conversionRate} icon={TrendingUp} />
      </div>

      <Card className="p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold mb-6">Views — Last 7 Days</h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {analyticsData.weeklyViews.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full max-w-[48px] rounded-t-lg bg-brand-gold transition-all"
                style={{ height: `${(d.views / maxViews) * 100}%`, minHeight: '8px' }}
              />
              <span className="text-xs text-brand-charcoal/50">{d.day}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Top Performing Listings</h3>
        <div className="space-y-4">
          {analyticsData.topListings.map((l, i) => (
            <div key={l.title}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium truncate pr-2">
                  {i + 1}. {l.title}
                </span>
                <span className="text-brand-charcoal/50 shrink-0">{l.views} views</span>
              </div>
              <div className="h-2 rounded-full bg-brand-cream overflow-hidden">
                <div
                  className="h-full bg-brand-gold rounded-full"
                  style={{ width: `${(l.views / analyticsData.topListings[0].views) * 100}%` }}
                />
              </div>
              <p className="text-xs text-brand-charcoal/40 mt-1">{l.inquiries} inquiries</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
