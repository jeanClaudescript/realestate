import { useState } from 'react'
import { MessageCircle, Reply } from 'lucide-react'
import { PhoneDisplay } from '@/components/ui/PhoneDisplay'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ownerInquiries, type InquiryStatus } from '@/lib/owner-mock-data'

export function OwnerInquiries() {
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all')
  const [selected, setSelected] = useState(ownerInquiries[0]?.id)

  const list = filter === 'all' ? ownerInquiries : ownerInquiries.filter((i) => i.status === filter)
  const active = list.find((i) => i.id === selected) ?? list[0]

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6 min-h-[480px]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'new', 'replied', 'closed'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
                filter === s ? 'bg-brand-charcoal text-white' : 'bg-brand-cream'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {list.map((inq) => (
            <button
              key={inq.id}
              type="button"
              onClick={() => setSelected(inq.id)}
              className={`w-full text-left p-4 rounded-xl border transition-colors ${
                selected === inq.id ? 'border-brand-gold bg-brand-gold/10' : 'border-black/5 bg-white'
              }`}
            >
              <div className="flex justify-between gap-2 mb-1">
                <p className="font-semibold text-sm">{inq.name}</p>
                <Badge variant={inq.status === 'new' ? 'gold' : 'outline'}>{inq.status}</Badge>
              </div>
              <p className="text-xs text-brand-charcoal/50 truncate">{inq.property}</p>
              <p className="text-xs text-brand-charcoal/40 mt-1">{inq.date}</p>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <Card className="p-5 sm:p-6 flex flex-col">
          <div className="border-b border-black/5 pb-4 mb-4">
            <h3 className="font-display text-lg font-semibold">{active.name}</h3>
            <p className="text-sm text-brand-charcoal/50">{active.property}</p>
            <PhoneDisplay phone={active.phone} className="text-brand-gold-dark mt-2 block" size="md" />
          </div>
          <div className="flex-1 bg-brand-cream rounded-xl p-4 mb-4">
            <p className="text-sm leading-relaxed">{active.message}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="whatsapp" className="flex-1" icon={<MessageCircle className="w-4 h-4" />}>
              Reply on WhatsApp
            </Button>
            <Button variant="primary" className="flex-1" icon={<Reply className="w-4 h-4" />}>
              Mark as Replied
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
