import { CreditCard, Smartphone, Building2, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatCard } from '@/components/dashboard/StatCard'
import { ownerPayments } from '@/lib/owner-mock-data'

export function OwnerPayments() {
  const total = 'RWF 29M'
  const pending = ownerPayments.filter((p) => p.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Total Received" value={total} change="All time" icon={CreditCard} />
        <StatCard label="Pending" value={pending} icon={Smartphone} />
        <StatCard label="MTN MoMo" value="RWF 24.25M" icon={Smartphone} />
        <StatCard label="Bank Transfer" value="RWF 4.75M" icon={Building2} />
      </div>

      <Card className="overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold">Transaction History</h3>
          <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
            Export CSV
          </Button>
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-charcoal/50 bg-brand-cream/50">
                <th className="p-4 font-medium">Property</th>
                <th className="p-4 font-medium">Buyer</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Method</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ownerPayments.map((p) => (
                <tr key={p.id} className="border-t border-black/5">
                  <td className="p-4 font-medium">{p.property}</td>
                  <td className="p-4">{p.guest}</td>
                  <td className="p-4 text-brand-gold-dark font-semibold">{p.amount}</td>
                  <td className="p-4">{p.method}</td>
                  <td className="p-4 text-brand-charcoal/60">{p.date}</td>
                  <td className="p-4">
                    <Badge variant={p.status === 'completed' ? 'verified' : 'status'}>{p.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden divide-y divide-black/5">
          {ownerPayments.map((p) => (
            <div key={p.id} className="p-4">
              <div className="flex justify-between mb-1">
                <p className="font-semibold text-sm">{p.property}</p>
                <Badge variant={p.status === 'completed' ? 'verified' : 'status'}>{p.status}</Badge>
              </div>
              <p className="text-lg font-display font-semibold text-brand-gold-dark">{p.amount}</p>
              <p className="text-xs text-brand-charcoal/50 mt-1">
                {p.guest} · {p.method} · {p.date}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
