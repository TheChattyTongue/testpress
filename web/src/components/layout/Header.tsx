import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { navItems, site } from '@/data/content'
import { useQuoteDialog } from '@/context/QuoteDialogContext'
import { cn, media } from '@/lib/utils'

export function Header() {
  const { openQuote } = useQuoteDialog()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-white',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src={media('i/logo-v2.svg')}
            alt={site.name}
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-6 lg:flex">
          <div className="hidden text-right text-xs text-slate-600 xl:block">
            <p className="font-semibold text-slate-900">{site.city}</p>
            <p>{site.address}</p>
          </div>
          <div className="hidden text-right text-sm xl:block">
            <a
              href={site.phoneLinks[0]}
              className="font-semibold text-slate-900 hover:text-brand"
            >
              {site.phones[0]}
            </a>
            <p className="text-xs text-slate-500">{site.hours.split(',')[0]}</p>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-muted text-brand-dark'
                      : 'text-slate-700 hover:bg-slate-100',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Button onClick={openQuote} size="sm">
            Связаться
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <a
            href={site.phoneLinks[0]}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-muted text-brand"
            aria-label="Позвонить"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200"
            aria-label="Меню"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            aria-label="Закрыть меню"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col bg-white p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-bold text-slate-900">Меню</span>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-3 py-3 text-base font-medium',
                      isActive ? 'bg-brand-muted text-brand-dark' : 'text-slate-800',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto space-y-3 border-t border-slate-100 pt-4 text-sm">
              <p className="font-semibold">{site.fullAddress}</p>
              <a href={site.phoneLinks[0]} className="block font-semibold text-brand">
                {site.phones[0]}
              </a>
              <a href={`mailto:${site.email}`} className="block text-slate-600">
                {site.email}
              </a>
              <Button
                className="w-full"
                onClick={() => {
                  setMobileOpen(false)
                  openQuote()
                }}
              >
                Оставить заявку
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
