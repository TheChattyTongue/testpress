import { useMemo, useState } from 'react'
import { FadeSwap } from '@/components/motion/FadeSwap'
import { Reveal } from '@/components/motion/Reveal'
import { SegmentedControl } from '@/components/motion/SegmentedControl'
import { TypewriterText } from '@/components/motion/TypewriterText'
import { PageHero } from '@/components/layout/PageHero'
import { PortfolioCaseCard } from '@/components/portfolio/PortfolioCaseCard'
import { ContactStrip } from '@/components/sections/ContactStrip'
import { portfolio, portfolioCategories, type PortfolioCategory } from '@/data/content'

const ALL = 'all'

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL)

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? portfolio
        : portfolio.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  const categoryLabel =
    activeCategory === ALL ? 'Все направления' : (activeCategory as PortfolioCategory)

  const segmentOptions = [
    { id: ALL, label: 'Все' },
    ...portfolioCategories.map((c) => ({ id: c, label: c })),
  ]

  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Примеры работ"
        description="Кейсы по изготовлению, ремонту, механической обработке и литью."
        image="catalog/partitions/55.jpg"
      />

      <section className="bg-surface-soft py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SegmentedControl
              layoutId="portfolio-filter-pill"
              hint="Переключите категорию — список обновится"
              value={activeCategory}
              onChange={setActiveCategory}
              columns={5}
              options={segmentOptions}
            />
          </Reveal>

          <div className="mt-6 min-h-[2.5rem]">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Сейчас показано
            </p>
            <TypewriterText
              key={`${activeCategory}-${filtered.length}`}
              text={`${categoryLabel} · ${filtered.length} ${projectWord(filtered.length)}`}
              as="p"
              speedMs={14}
              className="mt-1 text-lg font-bold text-slate-900"
            />
          </div>

          <FadeSwap swapKey={activeCategory} className="mt-8 space-y-8">
            {filtered.map((item, index) => (
              <PortfolioCaseCard key={item.id} item={item} index={index} />
            ))}
          </FadeSwap>
        </div>
      </section>

      <ContactStrip />
    </>
  )
}

function projectWord(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return 'проект'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'проекта'
  return 'проектов'
}
