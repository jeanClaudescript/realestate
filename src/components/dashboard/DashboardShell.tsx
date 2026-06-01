import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Home, LogOut, Menu, X } from 'lucide-react'
import { brand } from '@/lib/design-tokens'

export interface DashboardNavItem {
  id: string
  label: string
  icon: LucideIcon
}

interface DashboardShellProps {
  title: string
  subtitle: string
  portalLabel?: string
  nav: DashboardNavItem[]
  activeTab: string
  onTabChange: (id: string) => void
  children: ReactNode
}

export function DashboardShell({
  title,
  subtitle,
  portalLabel = 'Owner Portal',
  nav,
  activeTab,
  onTabChange,
  children,
}: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const NavLinks = ({ onSelect }: { onSelect?: () => void }) => (
    <>
      {nav.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => {
            onTabChange(id)
            onSelect?.()
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
            activeTab === id
              ? 'bg-brand-gold text-brand-charcoal'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
          {label}
        </button>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-brand-mist dark:bg-brand-charcoal flex flex-col md:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-brand-charcoal text-white flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-5 h-5 text-brand-gold" />
            <span className="font-display font-semibold">{brand.shortName}</span>
          </Link>
          <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{portalLabel}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm px-4 py-2 min-h-[44px]"
          >
            <LogOut className="w-4 h-4" />
            Exit to site
          </Link>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <button
            type="button"
            className="flex-1 bg-black/50"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
          />
          <aside className="w-[min(280px,85vw)] bg-brand-charcoal text-white flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <span className="font-display font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <NavLinks onSelect={() => setMobileNavOpen(false)} />
            </nav>
            <div className="p-4 border-t border-white/10">
              <Link
                to="/"
                className="flex items-center gap-2 text-white/50 text-sm px-4 py-3"
                onClick={() => setMobileNavOpen(false)}
              >
                <LogOut className="w-4 h-4" />
                Exit to site
              </Link>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="surface-card border-b px-4 sm:px-6 py-4 sm:py-6 shrink-0">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-brand-cream min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold truncate">
                {title}
              </h1>
              <p className="text-muted mt-0.5 text-sm sm:text-base">{subtitle}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 pb-24 md:pb-6 overflow-auto">{children}</div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 surface-card border-t safe-bottom flex overflow-x-auto">
          {nav.slice(0, 5).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={`flex-1 min-w-[72px] flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[56px] ${
                activeTab === id ? 'text-brand-gold-dark' : 'text-brand-charcoal/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium truncate max-w-full">{label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
