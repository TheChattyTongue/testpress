import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { PageTransition } from '@/components/layout/PageTransition'
import { QuoteDialog } from '@/components/QuoteDialog'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <QuoteDialog />
    </div>
  )
}
