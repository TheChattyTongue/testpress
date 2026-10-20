import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { ContactStrip } from '@/components/sections/ContactStrip'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/content'
import { useQuoteDialog } from '@/context/QuoteDialogContext'

export function ContactsPage() {
  const { openQuote } = useQuoteDialog()
  const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${site.coords.lng}%2C${site.coords.lat}&z=15&pt=${site.coords.lng}%2C${site.coords.lat},pm2grm`

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        description="Пожалуйста, согласуйте визит на производство заранее."
        image="uf_s/image/img1-1.jpg"
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
            <div className="space-y-4">
              <Reveal>
                <ContactCard
                  icon={Phone}
                  title="Звоните"
                  body={
                    <>
                      {site.phones.map((phone, i) => (
                        <a
                          key={phone}
                          href={site.phoneLinks[i]}
                          className="block font-semibold text-slate-900 hover:text-brand"
                        >
                          {phone}
                        </a>
                      ))}
                    </>
                  }
                  footer={site.hours}
                />
              </Reveal>
              <Reveal delay={0.05}>
                <ContactCard
                  icon={MapPin}
                  title="Приезжайте на производство"
                  body={<p className="font-semibold text-slate-900">{site.fullAddress}</p>}
                  footer={
                    <a
                      href={`https://yandex.ru/maps/?pt=${site.coords.lng},${site.coords.lat}&z=16&l=map`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand hover:underline"
                    >
                      {site.coords.lat}, {site.coords.lng}
                    </a>
                  }
                />
              </Reveal>
              <Reveal delay={0.1}>
                <ContactCard
                  icon={Mail}
                  title="Напишите"
                  body={
                    <>
                      <a
                        href={`mailto:${site.email}`}
                        className="font-semibold text-slate-900 hover:text-brand"
                      >
                        {site.email}
                      </a>
                      <a
                        href={site.telegramLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block text-sm text-brand hover:underline"
                      >
                        {site.telegram}
                      </a>
                    </>
                  }
                  footer="О вашем проекте или через форму заявки"
                />
              </Reveal>
              <Reveal delay={0.15}>
                <ContactCard
                  icon={Clock}
                  title="Режим работы"
                  body={<p className="font-semibold text-slate-900">{site.hours}</p>}
                />
              </Reveal>
              <Reveal delay={0.2}>
                <Button size="lg" className="w-full sm:w-auto" onClick={openQuote}>
                  Оставить заявку
                </Button>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="min-h-[22rem] lg:min-h-full">
              <div className="h-full min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-100 shadow-[0_20px_50px_-30px_rgba(15,20,25,0.25)] sm:min-h-[28rem] lg:min-h-[32rem]">
                <iframe
                  title="Карта производства ПРЕСС-ОН"
                  src={mapSrc}
                  className="h-full min-h-[22rem] w-full sm:min-h-[28rem] lg:min-h-[32rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  )
}

function ContactCard({
  icon: Icon,
  title,
  body,
  footer,
}: {
  icon: typeof Phone
  title: string
  body: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-brand/20 hover:shadow-md">
      <div className="flex gap-3">
        <div className="rounded-xl bg-brand-muted p-2 text-brand">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900">{title}</h3>
          <div className="mt-2 text-sm text-slate-700">{body}</div>
          {footer ? <div className="mt-2 text-xs text-slate-500">{footer}</div> : null}
        </div>
      </div>
    </div>
  )
}
