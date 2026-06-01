import { useState } from 'react'

import {

  LayoutDashboard,

  Shield,

  Users,

  AlertTriangle,

  BarChart3,

  DollarSign,

  CreditCard,

  Flag,

} from 'lucide-react'

import { DashboardShell } from '@/components/dashboard/DashboardShell'

import { StatCard } from '@/components/dashboard/StatCard'

import { Card } from '@/components/ui/Card'

import { Badge } from '@/components/ui/Badge'

import { Button } from '@/components/ui/Button'



const nav = [

  { id: 'overview', label: 'Overview', icon: LayoutDashboard },

  { id: 'verification', label: 'Verification', icon: Shield },

  { id: 'users', label: 'Users', icon: Users },

  { id: 'fraud', label: 'Fraud Alerts', icon: AlertTriangle },

  { id: 'revenue', label: 'Revenue', icon: DollarSign },

  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },

  { id: 'moderation', label: 'Moderation', icon: Flag },

]



const tabMeta: Record<string, { title: string; subtitle: string }> = {

  overview: { title: 'Admin Panel', subtitle: 'Verification workflow, fraud detection, analytics & revenue' },

  verification: { title: 'Verification Queue', subtitle: 'Review pending property titles and surveys' },

  users: { title: 'User Management', subtitle: 'Owners, agents, buyers & roles' },

  fraud: { title: 'Fraud Detection', subtitle: 'Alerts and anomaly review' },

  revenue: { title: 'Revenue', subtitle: 'Platform fees, MoMo settlements & MRR' },

  subscriptions: { title: 'Subscriptions', subtitle: 'Premium listing plans' },

  moderation: { title: 'Moderation', subtitle: 'Flagged listings and content review' },

}



const verificationQueue = [

  { title: 'Niboye Plot — RDB survey pending', status: 'review' },

  { title: 'CBD Office — Docs uploaded', status: 'pending' },

  { title: 'Nyarutarama Villa', status: 'approved' },

]



export function AdminPanel() {

  const [activeTab, setActiveTab] = useState('overview')

  const meta = tabMeta[activeTab] ?? tabMeta.overview



  const VerificationList = () => (

    <div className="space-y-3">

      {verificationQueue.map((item) => (

        <div

          key={item.title}

          className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl border border-black/5 dark:border-white/10"

        >

          <p className="text-sm font-medium">{item.title}</p>

          <div className="flex items-center gap-2">

            <Badge

              variant={

                item.status === 'approved' ? 'verified' : item.status === 'review' ? 'status' : 'outline'

              }

            >

              {item.status}

            </Badge>

            {item.status !== 'approved' && (

              <Button variant="primary" size="sm">

                Review

              </Button>

            )}

          </div>

        </div>

      ))}

    </div>

  )



  const renderContent = () => {

    switch (activeTab) {

      case 'verification':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Property Verification Queue</h3>

            <VerificationList />

          </Card>

        )

      case 'users':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Users</h3>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="text-left text-muted border-b border-black/5 dark:border-white/10">

                    <th className="pb-3">Name</th>

                    <th className="pb-3">Role</th>

                    <th className="pb-3">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {[

                    ['Innocent R.', 'Owner', 'Active'],

                    ['Marie Uwase', 'Agent', 'Active'],

                    ['James W.', 'Buyer', 'Active'],

                  ].map(([name, role, status]) => (

                    <tr key={name} className="border-b border-black/5 dark:border-white/10">

                      <td className="py-3 font-medium">{name}</td>

                      <td className="py-3">{role}</td>

                      <td className="py-3">{status}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </Card>

        )

      case 'fraud':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Fraud Detection</h3>

            <div className="space-y-3">

              {[

                { id: 'F-102', desc: 'Duplicate title deed detected', severity: 'high' },

                { id: 'F-098', desc: 'Price anomaly — 40% below market', severity: 'medium' },

              ].map((alert) => (

                <div

                  key={alert.id}

                  className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50"

                >

                  <p className="text-sm font-medium text-red-900 dark:text-red-200">{alert.id}</p>

                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">{alert.desc}</p>

                  <div className="mt-2">

                    <Badge variant="status">{alert.severity}</Badge>

                  </div>

                </div>

              ))}

            </div>

          </Card>

        )

      case 'revenue':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Revenue Summary</h3>

            <div className="grid sm:grid-cols-3 gap-4">

              {[

                { label: 'MRR', value: 'RWF 48M' },

                { label: 'MoMo volume', value: 'RWF 312M' },

                { label: 'Fees (MTD)', value: 'RWF 4.2M' },

              ].map((s) => (

                <div key={s.label} className="p-4 rounded-xl surface-muted text-center">

                  <p className="text-xs text-muted">{s.label}</p>

                  <p className="font-display text-xl font-semibold mt-1">{s.value}</p>

                </div>

              ))}

            </div>

          </Card>

        )

      case 'subscriptions':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Subscription Plans</h3>

            <div className="space-y-3">

              {[

                { plan: 'Premium Listing', count: 124, price: 'RWF 50K/mo' },

                { plan: 'Agent Pro', count: 38, price: 'RWF 120K/mo' },

              ].map((p) => (

                <div

                  key={p.plan}

                  className="flex justify-between items-center p-4 rounded-xl border border-black/5 dark:border-white/10"

                >

                  <div>

                    <p className="font-medium">{p.plan}</p>

                    <p className="text-sm text-muted">{p.count} active</p>

                  </div>

                  <p className="font-semibold text-brand-gold-dark">{p.price}</p>

                </div>

              ))}

            </div>

          </Card>

        )

      case 'moderation':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Flagged Content</h3>

            <div className="space-y-3">

              {[

                { id: 'L-44', reason: 'Misleading plot size', action: 'Review' },

                { id: 'L-39', reason: 'Unverified title claim', action: 'Review' },

              ].map((f) => (

                <div

                  key={f.id}

                  className="flex flex-wrap justify-between gap-2 p-4 rounded-xl surface-muted"

                >

                  <div>

                    <p className="font-medium text-sm">{f.id}</p>

                    <p className="text-sm text-muted">{f.reason}</p>

                  </div>

                  <Button variant="outline" size="sm">

                    {f.action}

                  </Button>

                </div>

              ))}

            </div>

          </Card>

        )

      default:

        return (

          <>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

              <StatCard label="Pending Verification" value={14} icon={Shield} />

              <StatCard label="Total Users" value="2,840" change="+124 this month" icon={Users} />

              <StatCard label="Fraud Flags" value={3} icon={AlertTriangle} />

              <StatCard label="MRR Revenue" value="RWF 48M" icon={DollarSign} />

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

              <Card className="p-6">

                <h3 className="font-display text-lg font-semibold mb-4">Verification Queue</h3>

                <VerificationList />

              </Card>

              <Card className="p-6">

                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">

                  <BarChart3 className="w-5 h-5 text-brand-gold" />

                  Platform Analytics

                </h3>

                <div className="h-48 rounded-xl surface-muted flex items-center justify-center text-muted text-sm text-center px-4">

                  Listings · Bookings · Revenue · Subscriptions

                </div>

              </Card>

            </div>

          </>

        )

    }

  }



  return (

    <DashboardShell

      portalLabel="Admin Panel"

      title={meta.title}

      subtitle={meta.subtitle}

      nav={nav}

      activeTab={activeTab}

      onTabChange={setActiveTab}

    >

      {renderContent()}

    </DashboardShell>

  )

}

