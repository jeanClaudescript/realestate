import { Plus, Image, FileText, Eye, MessageSquare, Calendar, ArrowRight } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  ownerListings,
  ownerInquiries,
  ownerVisits,
  analyticsData,
} from '@/lib/owner-mock-data'

interface OwnerOverviewProps {
  onNavigate: (tab: string) => void
}

export function OwnerOverview({ onNavigate }: OwnerOverviewProps) {
  const newInquiries = ownerInquiries.filter((i) => i.status === 'new').length

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Button variant="primary" icon={<Plus className="w-5 h-5" />} onClick={() => onNavigate('upload')}>
          Upload Property
        </Button>
        <Button variant="outline" icon={<Image className="w-4 h-4" />} onClick={() => onNavigate('listings')}>
          Manage Listings
        </Button>
        <Button variant="outline" icon={<FileText className="w-4 h-4" />} onClick={() => onNavigate('upload')}>
          Survey Plans
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Active Listings" value={ownerListings.filter((l) => l.status === 'live').length} change="+2 this month" icon={Image} />
        <StatCard label="New Inquiries" value={newInquiries} change="Needs reply" icon={MessageSquare} />
        <StatCard label="Visits This Week" value={ownerVisits.filter((v) => v.status !== 'completed').length} icon={Calendar} />
        <StatCard label="Revenue" value="RWF 29M" change="Deposits via MoMo" icon={Eye} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Recent Listings</h3>
            <button type="button" onClick={() => onNavigate('listings')} className="text-sm text-brand-gold-dark font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {ownerListings.slice(0, 3).map((l) => (
              <div key={l.id} className="flex gap-3 p-3 rounded-xl bg-brand-cream">
                <img src={l.image} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{l.title}</p>
                  <p className="text-xs text-brand-charcoal/50">{l.price} · {l.views} views</p>
                </div>
                <Badge variant={l.status === 'live' ? 'verified' : 'status'}>{l.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Latest Inquiries</h3>
            <button type="button" onClick={() => onNavigate('inquiries')} className="text-sm text-brand-gold-dark font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {ownerInquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="p-3 rounded-xl border border-black/5">
                <div className="flex justify-between gap-2 mb-1">
                  <p className="font-medium text-sm">{inq.name}</p>
                  <Badge variant={inq.status === 'new' ? 'gold' : 'outline'}>{inq.status}</Badge>
                </div>
                <p className="text-xs text-brand-charcoal/50 line-clamp-2">{inq.message}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Upcoming Visits</h3>
            <button type="button" onClick={() => onNavigate('visits')} className="text-sm text-brand-gold-dark font-medium flex items-center gap-1">
              Calendar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {ownerVisits.filter((v) => v.status !== 'completed').slice(0, 3).map((v) => (
              <div key={v.id} className="flex justify-between p-3 rounded-xl bg-brand-cream gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{v.property}</p>
                  <p className="text-xs text-brand-charcoal/50">{v.date} · {v.time}</p>
                </div>
                <Badge variant={v.status === 'confirmed' ? 'verified' : 'status'}>{v.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Performance Snapshot</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-2xl font-display font-semibold text-brand-gold-dark">{analyticsData.viewsThisMonth.toLocaleString()}</p>
              <p className="text-xs text-brand-charcoal/50">Views this month ({analyticsData.viewsChange})</p>
            </div>
            <div>
              <p className="text-2xl font-display font-semibold">{analyticsData.conversionRate}</p>
              <p className="text-xs text-brand-charcoal/50">Inquiry conversion</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" fullWidth onClick={() => onNavigate('analytics')}>
            Full Analytics
          </Button>
        </Card>
      </div>

      <Card className="p-5 sm:p-6 bg-brand-charcoal text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-wider mb-1">Verification</p>
            <h3 className="font-display text-lg font-semibold">Boost trust with survey upload</h3>
            <p className="text-white/60 text-sm mt-1">Upload RDB survey plans to earn verified badge & higher trust score.</p>
          </div>
          <Button variant="primary" onClick={() => onNavigate('upload')}>
            Upload Survey
          </Button>
        </div>
      </Card>
    </div>
  )
}
