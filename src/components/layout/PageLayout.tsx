import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PageLayoutProps {
  children: ReactNode
  hideFooter?: boolean
}

export function PageLayout({ children, hideFooter }: PageLayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col overflow-x-hidden w-full max-w-[100vw]">
      <Header />
      <main className="flex-1 w-full min-w-0 overflow-x-hidden">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  )
}
