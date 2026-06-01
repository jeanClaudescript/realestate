import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ownerListings, type ListingStatus } from '@/lib/owner-mock-data'

const statusVariant: Record<ListingStatus, 'verified' | 'status' | 'outline' | 'gold'> = {
  live: 'verified',
  pending: 'status',
  draft: 'outline',
  sold: 'gold',
}

interface OwnerListingsProps {
  onUpload: () => void
}

export function OwnerListings({ onUpload }: OwnerListingsProps) {
  const [filter, setFilter] = useState<ListingStatus | 'all'>('all')

  const list =
    filter === 'all' ? ownerListings : ownerListings.filter((l) => l.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'live', 'pending', 'draft', 'sold'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium min-h-[40px] capitalize ${
                filter === s ? 'bg-brand-charcoal text-white' : 'bg-brand-cream text-brand-charcoal/70'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <Button variant="primary" icon={<Plus className="w-5 h-5" />} onClick={onUpload}>
          Add Listing
        </Button>
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-charcoal/50 border-b bg-brand-cream/50">
                <th className="p-4 font-medium">Property</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Views</th>
                <th className="p-4 font-medium">Inquiries</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((l) => (
                <tr key={l.id} className="border-b border-black/5 hover:bg-brand-cream/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={l.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">{l.title}</p>
                        <p className="text-xs text-brand-charcoal/50">{l.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 capitalize">{l.type}</td>
                  <td className="p-4 font-medium">{l.price}</td>
                  <td className="p-4">{l.views.toLocaleString()}</td>
                  <td className="p-4">{l.inquiries}</td>
                  <td className="p-4">
                    <Badge variant={statusVariant[l.status]}>{l.status}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button type="button" className="p-2 rounded-lg hover:bg-brand-cream" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <Link to={`/properties/${l.id.replace('ol', 'p')}`} className="p-2 rounded-lg hover:bg-brand-cream dark:hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="View">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button type="button" className="p-2 rounded-lg hover:bg-red-50 text-red-600" aria-label="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {list.map((l) => (
          <Card key={l.id} className="p-4">
            <div className="flex gap-3">
              <img src={l.image} alt={l.title} className="w-20 h-20 rounded-xl object-cover shrink-0" loading="lazy" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm line-clamp-2">{l.title}</p>
                  <Badge variant={statusVariant[l.status]}>{l.status}</Badge>
                </div>
                <p className="text-xs text-brand-charcoal/50 mt-1">{l.location}</p>
                <p className="font-medium text-brand-gold-dark mt-1">{l.price}</p>
                <div className="flex gap-3 text-xs text-brand-charcoal/60 mt-2">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {l.views}
                  </span>
                  <span>{l.inquiries} inquiries</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1" icon={<Pencil className="w-4 h-4" />}>
                Edit
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                View Live
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
