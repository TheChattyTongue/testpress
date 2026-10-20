import { Check } from 'lucide-react'
import { useState } from 'react'
import { FadeSwap } from '@/components/motion/FadeSwap'
import { Reveal } from '@/components/motion/Reveal'
import { SegmentedControl } from '@/components/motion/SegmentedControl'
import { TypewriterText } from '@/components/motion/TypewriterText'
import { BlurHighlight } from '@/components/effects/BlurHighlight'
import { PageHero } from '@/components/layout/PageHero'
import { ContactStrip } from '@/components/sections/ContactStrip'
import { Button } from '@/components/ui/Button'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { aboutContent } from '@/data/content'
import { useQuoteDialog } from '@/context/QuoteDialogContext'
import { cn, media } from '@/lib/utils'

const tabs = {
  why: { id: 'why', label: 'Почему мы', title: 'Почему выбирают нас' },
  adv: { id: 'adv', label: 'Преимущества', title: 'Наши преимущества' },
  cap: { id: 'cap', label: 'Возможности', title: 'Наши возможности' },
} as const

type TabId = (typeof tabs)[keyof typeof tabs]['id']

const tabMedia: Record<TabId, string[]> = {
  why: aboutContent.gallery,
  adv: ['uf_s/image/img2-1.jpg', 'uf_s/image/img2-2.jpg'],
  cap: ['uf_s/image/img2-3.jpg', 'uf_s/image/img2-4.jpg'],
}

export function AboutPage() {
  const { openQuote } = useQuoteDialog()
  const [tab, setTab] = useState<TabId>('why')
  const current = tabs[tab]

  const listItems =
    tab === 'why'
      ? aboutContent.whyUs
      : tab === 'adv'
        ? aboutContent.advantages
        : aboutContent.capabilities

  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Завод ПРЕСС-ОН"
        description={aboutContent.intro.join(' ')}
        image="uf_s/image/bg_info.jpg"
      />

      <section className="border-b border-slate-200/80 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <BlurHighlight
              highlightedBits={[
                'высокоточном изготовлении пресс-форм',
                'полный цикл производства',
                'высоких результатов',
              ]}
              highlightColor="rgba(135, 194, 50, 0.45)"
            >
              {aboutContent.intro.join(' ')}
            </BlurHighlight>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SegmentedControl
              layoutId="about-tab-pill"
              hint="Переключайте разделы — текст и акцент меняются"
              value={tab}
              onChange={(id) => setTab(id as TabId)}
              columns={3}
              options={Object.values(tabs).map((t) => ({ id: t.id, label: t.label }))}
            />
          </Reveal>

          <div className="mt-6 min-h-[2.5rem]">
            <TypewriterText
              key={current.id}
              text={current.title}
              as="h2"
              speedMs={14}
              className="text-2xl font-bold text-slate-900"
            />
          </div>

          <FadeSwap swapKey={tab} className="mt-8">
            <div
              className={cn(
                'grid overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_20px_50px_-30px_rgba(15,20,25,0.2)]',
                'min-h-[22rem] lg:h-[26rem] lg:grid-cols-2',
              )}
            >
              <div className="flex min-h-0 flex-col border-slate-200/80 p-6 sm:p-8 lg:border-r">
                <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed text-slate-700">
                  {listItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid min-h-[12rem] grid-cols-2 gap-2 bg-surface-soft p-3 sm:gap-3 sm:p-4 lg:min-h-0 lg:h-full">
                {tabMedia[tab].map((src) => (
                  <div
                    key={src}
                    className="relative min-h-0 overflow-hidden rounded-xl bg-slate-200"
                  >
                    <img
                      src={media(src)}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeSwap>
        </div>
      </section>

      <section className="bg-surface-soft py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              Компетенции
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.05}>
                <article className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <MediaFrame
                    src={pillar.image}
                    alt={pillar.title}
                    aspect="video"
                    reveal={false}
                    className="rounded-none ring-0"
                  />
                  <p className="flex flex-1 items-center p-4 text-sm font-semibold leading-snug text-slate-900">
                    {pillar.title}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="rounded-[1.75rem] border border-brand/20 bg-gradient-to-r from-brand-muted to-white p-8 text-center sm:text-left">
              <p className="text-lg font-medium text-slate-800">{aboutContent.closing}</p>
              <Button className="mt-5" onClick={openQuote}>
                Оставить заявку
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactStrip />
    </>
  )
}
