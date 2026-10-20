import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EquipmentCard } from '@/components/equipment/EquipmentCard'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { TypewriterText } from '@/components/motion/TypewriterText'
import { SectionHeading } from '@/components/SectionHeading'
import { equipment } from '@/data/content'

type EquipmentCarouselProps = {
  compact?: boolean
}

export function EquipmentCarousel({ compact }: EquipmentCarouselProps) {
  const [selected, setSelected] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="relative overflow-hidden py-16 sm:py-20" id="equipment-preview">
      <div className="pointer-events-none absolute inset-x-0 top-24 h-64 bg-[radial-gradient(circle,rgba(135,194,50,0.12),transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Производство"
            title="Современный станочный парк"
            description="Одинаковый формат карточек — удобно листать и сравнивать станки."
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white shadow-sm transition hover:scale-105 hover:border-brand/30"
              aria-label="Предыдущий станок"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white shadow-sm transition hover:scale-105 hover:border-brand/30"
              aria-label="Следующий станок"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Reveal className="mt-4 min-h-[2.5rem]">
          <TypewriterText
            key={equipment[selected].id}
            text={equipment[selected].title}
            as="p"
            speedMs={10}
            className="text-sm font-semibold text-slate-700 sm:text-base"
          />
        </Reveal>

        <div className="mt-6 w-full">
          <div ref={emblaRef} className="w-full overflow-hidden">
            <div className="flex w-full">
              {equipment.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full min-w-0 shrink-0 grow-0 basis-full"
                >
                  <EquipmentCard
                    item={item}
                    index={index}
                    total={equipment.length}
                    paragraphLimit={compact ? 2 : 3}
                    showLink
                    animateTitle={selected === index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {equipment.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Показать ${item.title}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className="rounded-full transition-all"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  index === selected
                    ? 'w-8 bg-brand'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            </button>
          ))}
        </div>

        {compact ? (
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="outline">
              <Link to="/equipment">Все оборудование</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/contacts">Адрес производства</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
