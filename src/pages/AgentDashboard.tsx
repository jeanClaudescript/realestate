import { useState } from 'react'

import {

  LayoutDashboard,

  Users,

  Building2,

  MessageSquare,

  Filter,

  Calendar,

  TrendingUp,

} from 'lucide-react'

import { Link } from 'react-router-dom'

import { DashboardShell } from '@/components/dashboard/DashboardShell'

import { StatCard } from '@/components/dashboard/StatCard'

import { Card } from '@/components/ui/Card'

import { Button } from '@/components/ui/Button'

import { properties } from '@/lib/mock-data'



const nav = [

  { id: 'overview', label: 'Overview', icon: LayoutDashboard },

  { id: 'leads', label: 'Leads', icon: Users },

  { id: 'properties', label: 'Properties', icon: Building2 },

  { id: 'messages', label: 'Messages', icon: MessageSquare },

  { id: 'funnel', label: 'Funnel', icon: Filter },

  { id: 'appointments', label: 'Appointments', icon: Calendar },

]



const funnel = [

  { stage: 'Inquiry', count: 48, pct: 100 },

  { stage: 'Qualified', count: 32, pct: 67 },

  { stage: 'Site Visit', count: 18, pct: 38 },

  { stage: 'Offer', count: 8, pct: 17 },

  { stage: 'Closed', count: 3, pct: 6 },

]



const tabMeta: Record<string, { title: string; subtitle: string }> = {

  overview: { title: 'Agent Dashboard', subtitle: 'Leads, property performance, messaging & sales funnel' },

  leads: { title: 'Leads', subtitle: 'Active buyers, renters & investors in your pipeline' },

  properties: { title: 'Properties', subtitle: 'Listings you manage across Kigali & Rwanda' },

  messages: { title: 'Messages', subtitle: 'WhatsApp and in-app conversations' },

  funnel: { title: 'Sales Funnel', subtitle: 'Conversion from inquiry to closed deal' },

  appointments: { title: 'Appointments', subtitle: 'Scheduled site visits and calls' },

}



export function AgentDashboard() {

  const [activeTab, setActiveTab] = useState('overview')

  const meta = tabMeta[activeTab] ?? tabMeta.overview



  const renderContent = () => {

    switch (activeTab) {

      case 'leads':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Active Leads</h3>

            <div className="space-y-3">

              {[

                { name: 'James W.', interest: 'Kimihurura Villa', status: 'Hot' },

                { name: 'Sarah M.', interest: 'Kicukiro Land', status: 'Warm' },

                { name: 'Paul K.', interest: 'Remera Apartment', status: 'New' },

              ].map((lead) => (

                <div

                  key={lead.name}

                  className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl surface-muted"

                >

                  <div>

                    <p className="font-medium">{lead.name}</p>

                    <p className="text-sm text-muted">{lead.interest}</p>

                  </div>

                  <Button variant="outline" size="sm">

                    {lead.status}

                  </Button>

                </div>

              ))}

            </div>

          </Card>

        )

      case 'properties':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Your Listings</h3>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="text-left text-muted border-b border-black/5 dark:border-white/10">

                    <th className="pb-3 font-medium">Property</th>

                    <th className="pb-3 font-medium">Status</th>

                    <th className="pb-3 font-medium">Views</th>

                    <th className="pb-3 font-medium"></th>

                  </tr>

                </thead>

                <tbody>

                  {properties.slice(0, 5).map((p) => (

                    <tr key={p.id} className="border-b border-black/5 dark:border-white/10">

                      <td className="py-3 font-medium">{p.title}</td>

                      <td className="py-3 capitalize">{p.status.replace('_', ' ')}</td>

                      <td className="py-3">
                        {(p.id.charCodeAt(1) || 1) * 137 + 200}
                      </td>

                      <td className="py-3">

                        <Link to={`/properties/${p.id}`} className="text-brand-gold-dark text-xs font-semibold">

                          View →

                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </Card>

        )

      case 'messages':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Recent Messages</h3>

            <div className="space-y-3">

              {[

                { from: 'James W.', msg: 'Interested in Kimihurura Villa viewing', time: '2h ago' },

                { from: 'Grace I.', msg: 'Request survey PDF for Kicukiro plot', time: '5h ago' },

                { from: 'Jean-Pierre N.', msg: 'ROI details for Nyarutarama', time: '1d ago' },

              ].map((m) => (

                <div key={m.from} className="p-4 rounded-xl surface-muted">

                  <div className="flex justify-between gap-2">

                    <p className="font-medium text-sm">{m.from}</p>

                    <span className="text-xs text-muted shrink-0">{m.time}</span>

                  </div>

                  <p className="text-sm text-muted mt-1">{m.msg}</p>

                  <Button variant="ghost" size="sm" className="mt-2">

                    Reply

                  </Button>

                </div>

              ))}

            </div>

          </Card>

        )

      case 'funnel':

        return (

          <Card className="p-6 max-w-xl">

            <h3 className="font-display text-lg font-semibold mb-4">Sales Funnel</h3>

            <div className="space-y-3">

              {funnel.map((step) => (

                <div key={step.stage}>

                  <div className="flex justify-between text-sm mb-1">

                    <span>{step.stage}</span>

                    <span className="font-medium">{step.count}</span>

                  </div>

                  <div className="h-2 rounded-full bg-brand-cream dark:bg-white/10 overflow-hidden">

                    <div

                      className="h-full bg-brand-gold rounded-full transition-all"

                      style={{ width: `${step.pct}%` }}

                    />

                  </div>

                </div>

              ))}

            </div>

          </Card>

        )

      case 'appointments':

        return (

          <Card className="p-6">

            <h3 className="font-display text-lg font-semibold mb-4">Upcoming Appointments</h3>

            <div className="space-y-3">

              {[

                { date: 'Fri 30 May, 10:00', property: 'Kimihurura Executive Villa', client: 'James W.' },

                { date: 'Sat 31 May, 14:00', property: 'Kicukiro Development Land', client: 'Paul K.' },

              ].map((a) => (

                <div key={a.date} className="p-4 rounded-xl border border-black/5 dark:border-white/10">

                  <p className="text-sm font-semibold text-brand-gold-dark">{a.date}</p>

                  <p className="font-medium mt-1">{a.property}</p>

                  <p className="text-sm text-muted">{a.client}</p>

                </div>

              ))}

            </div>

          </Card>

        )

      default:

        return (

          <>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

              <StatCard label="Active Leads" value={24} change="+5 today" icon={Users} />

              <StatCard label="Listings" value={42} icon={Building2} />

              <StatCard label="Conversion" value="12.5%" change="+2.1%" icon={TrendingUp} />

              <StatCard label="Appointments" value={9} icon={Calendar} />

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

              <Card className="p-6">

                <h3 className="font-display text-lg font-semibold mb-4">Sales Funnel</h3>

                <div className="space-y-3">

                  {funnel.map((step) => (

                    <div key={step.stage}>

                      <div className="flex justify-between text-sm mb-1">

                        <span>{step.stage}</span>

                        <span className="font-medium">{step.count}</span>

                      </div>

                      <div className="h-2 rounded-full bg-brand-cream dark:bg-white/10 overflow-hidden">

                        <div

                          className="h-full bg-brand-gold rounded-full"

                          style={{ width: `${step.pct}%` }}

                        />

                      </div>

                    </div>

                  ))}

                </div>

              </Card>

              <Card className="p-6">

                <h3 className="font-display text-lg font-semibold mb-4">Recent Messages</h3>

                <div className="space-y-3">

                  {[

                    { from: 'James W.', msg: 'Kimihurura Villa viewing', time: '2h ago' },

                    { from: 'Paul K.', msg: 'Survey documents', time: '5h ago' },

                  ].map((m) => (

                    <div key={m.from} className="p-4 rounded-xl surface-muted">

                      <div className="flex justify-between">

                        <p className="font-medium text-sm">{m.from}</p>

                        <span className="text-xs text-muted">{m.time}</span>

                      </div>

                      <p className="text-sm text-muted mt-1">{m.msg}</p>

                    </div>

                  ))}

                </div>

              </Card>

            </div>

          </>

        )

    }

  }



  return (

    <DashboardShell

      portalLabel="Agent Portal"

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

