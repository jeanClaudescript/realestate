import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Home, LogOut, Menu, X, MoreHorizontal } from 'lucide-react'
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
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[48px] ${
            activeTab === id
              ? 'bg-brand-gold text-brand-charcoal'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span className="text-left">{label}</span>
        </button>
      ))}
    </>
  )

  const primaryMobileTabs = nav.slice(0, 4)
  const moreTabs = nav.slice(4)

  return (
    <div className="min-h-[100dvh] bg-brand-mist dark:bg-brand-charcoal flex flex-col md:flex-row overflow-x-hidden w-full">
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

      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <button
            type="button"
            className="flex-1 bg-black/50"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
          />
          <aside className="w-[min(300px,88vw)] bg-brand-charcoal text-white flex flex-col safe-top safe-bottom">
            <div className="p-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <span className="font-display font-semibold">{portalLabel}</span>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="touch-target rounded-lg hover:bg-white/10 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto overscroll-contain">
              <NavLinks onSelect={() => setMobileNavOpen(false)} />
            </nav>
            <div className="p-4 border-t border-white/10 shrink-0">
              <Link
                to="/"
                className="flex items-center gap-2 text-white/50 text-sm px-4 py-3 min-h-[48px]"
                onClick={() => setMobileNavOpen(false)}
              >
                <LogOut className="w-4 h-4" />
                Exit to site
              </Link>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <header className="surface-card border-b px-3 sm:px-6 py-3 sm:py-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-start gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden touch-target rounded-xl surface-muted flex items-center justify-center shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-lg sm:text-2xl md:text-3xl font-semibold truncate text-brand-charcoal dark:text-white">
                {title}
              </h1>
              <p className="text-muted mt-0.5 text-xs sm:text-sm line-clamp-2">{subtitle}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-3 sm:p-6 pb-dashboard-mobile overflow-x-hidden overflow-y-auto min-w-0">
          {children}
        </div>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 surface-card border-t safe-bottom flex items-stretch shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          {primaryMobileTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[56px] ${
                activeTab === id
                  ? 'text-brand-gold-dark dark:text-brand-gold'
                  : 'text-brand-charcoal/50 dark:text-white/50'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-medium truncate max-w-full px-0.5">
                {label.split(' ')[0]}
              </span>
            </button>
          ))}
          {moreTabs.length > 0 ? (
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[56px] ${
                moreTabs.some((t) => t.id === activeTab)
                  ? 'text-brand-gold-dark dark:text-brand-gold'
                  : 'text-brand-charcoal/50 dark:text-white/50'
              }`}
            >
              <MoreHorizontal className="w-5 h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium">More</span>
            </button>
          ) : null}
        </nav>
      </div>
    </div>
  )
}
