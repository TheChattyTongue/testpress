import { Link } from 'react-router-dom'
import { navItems, site } from '@/data/content'
import { Button } from '@/components/ui/Button'
import { useQuoteDialog } from '@/context/QuoteDialogContext'
import { media } from '@/lib/utils'

export function Footer() {
  const { openQuote } = useQuoteDialog()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-surface text-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(135,194,50,0.12),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/25">
            <img
              src={media('i/logo-v2.svg')}
              alt={site.name}
              className="h-9 w-auto sm:h-10"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Высокоточное изготовление пресс-форм, фильер, штампов и оснастки.
            Полный цикл — от проектирования до пуско-наладки.
          </p>
          <Button className="mt-5" onClick={openQuote}>
            Оставить заявку
          </Button>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Контакты
          </h3>
          <ul className="space-y-2 text-sm">
            {site.phones.map((phone, i) => (
              <li key={phone}>
                <a href={site.phoneLinks[i]} className="hover:text-brand">
                  {phone}
                </a>
              </li>
            ))}
            <li className="text-slate-400">{site.hours}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.telegramLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand"
              >
                {site.telegram}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Навигация
          </h3>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-400">{site.fullAddress}</p>
          <a
            href={`https://yandex.ru/maps/?pt=${site.coords.lng},${site.coords.lat}&z=16&l=map`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-sm text-brand hover:underline"
          >
            {site.coords.lat}, {site.coords.lng}
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {site.legalName}
          </p>
          <a
            href={site.privacyUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand"
          >
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  )
}
