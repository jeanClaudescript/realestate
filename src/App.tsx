import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { HomePage } from '@/pages/HomePage'
import { ListingsPage } from '@/pages/ListingsPage'
import { PropertyDetailPage } from '@/pages/PropertyDetailPage'
import { OwnerDashboard } from '@/pages/OwnerDashboard'
import { AgentDashboard } from '@/pages/AgentDashboard'
import { AdminPanel } from '@/pages/AdminPanel'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { LegalPage } from '@/pages/LegalPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<ListingsPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/dashboard/owner" element={<OwnerDashboard />} />
        <Route path="/dashboard/agent" element={<AgentDashboard />} />
        <Route path="/dashboard/admin" element={<AdminPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/legal/:slug" element={<LegalPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
