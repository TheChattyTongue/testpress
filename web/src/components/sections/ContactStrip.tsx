import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/content'
import { useQuoteDialog } from '@/context/QuoteDialogContext'

export function ContactStrip() {
  const { openQuote } = useQuoteDialog()

  return (
    <section className="bg-surface py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-8">
        <Reveal>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Готовы обсудить ваш проект?
            </h2>
            <p className="mt-3 max-w-xl text-slate-300">
              Расчёт стоимости от 1 дня. Согласуйте визит на производство заранее — мы
              покажем мощности и обсудим техническое задание.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={openQuote}>
                Оставить заявку
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white">
                <Link to="/contacts">Контакты и карта</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-brand" />
              <div>
                <p className="text-sm text-slate-400">Звоните</p>
                {site.phones.map((phone, i) => (
                  <a
                    key={phone}
                    href={site.phoneLinks[i]}
                    className="block font-semibold hover:text-brand"
                  >
                    {phone}
                  </a>
                ))}
                <p className="mt-1 text-xs text-slate-400">{site.hours}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-brand" />
              <div>
                <p className="text-sm text-slate-400">Производство</p>
                <p className="font-semibold">{site.fullAddress}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-brand" />
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <a href={`mailto:${site.email}`} className="font-semibold hover:text-brand">
                  {site.email}
                </a>
              </div>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
