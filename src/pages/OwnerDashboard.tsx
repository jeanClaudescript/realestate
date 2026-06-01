import { useState } from 'react'
import {
  LayoutDashboard,
  Image,
  Plus,
  MessageSquare,
  Calendar,
  CreditCard,
  BarChart3,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { OwnerOverview } from '@/components/dashboard/owner/OwnerOverview'
import { OwnerListings } from '@/components/dashboard/owner/OwnerListings'
import { OwnerUploadForm } from '@/components/dashboard/owner/OwnerUploadForm'
import { OwnerInquiries } from '@/components/dashboard/owner/OwnerInquiries'
import { OwnerVisits } from '@/components/dashboard/owner/OwnerVisits'
import { OwnerPayments } from '@/components/dashboard/owner/OwnerPayments'
import { OwnerAnalytics } from '@/components/dashboard/owner/OwnerAnalytics'

const nav = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'listings', label: 'My Listings', icon: Image },
  { id: 'upload', label: 'Upload Property', icon: Plus },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { id: 'visits', label: 'Visits', icon: Calendar },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

const tabMeta: Record<string, { title: string; subtitle: string }> = {
  overview: {
    title: 'Owner Dashboard',
    subtitle: 'Welcome back — manage your Rwanda properties in one place',
  },
  listings: {
    title: 'My Listings',
    subtitle: 'Edit, publish, and track all your properties',
  },
  upload: {
    title: 'Upload Property',
    subtitle: 'Add a new listing with photos, video & survey documents',
  },
  inquiries: {
    title: 'Inquiries',
    subtitle: 'Messages from buyers, renters & investors',
  },
  visits: {
    title: 'Site Visits',
    subtitle: 'Confirm and manage booked property viewings',
  },
  payments: {
    title: 'Payments',
    subtitle: 'Deposits & reservations — MTN MoMo, Airtel, bank',
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Views, saves, inquiries & performance by listing',
  },
}

export function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const meta = tabMeta[activeTab] ?? tabMeta.overview

  const renderContent = () => {
    switch (activeTab) {
      case 'listings':
        return <OwnerListings onUpload={() => setActiveTab('upload')} />
      case 'upload':
        return <OwnerUploadForm />
      case 'inquiries':
        return <OwnerInquiries />
      case 'visits':
        return <OwnerVisits />
      case 'payments':
        return <OwnerPayments />
      case 'analytics':
        return <OwnerAnalytics />
      default:
        return <OwnerOverview onNavigate={setActiveTab} />
    }
  }

  return (
    <DashboardShell
      portalLabel="Owner Portal"
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
