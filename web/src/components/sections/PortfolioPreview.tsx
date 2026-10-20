import { Reveal } from '@/components/motion/Reveal'
import { ModalCards } from '@/components/effects/ModalCards'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/SectionHeading'
import { portfolio } from '@/data/content'

export function PortfolioPreview() {
  const items = portfolio.slice(0, 6)
  const modalItems = items.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.paragraphs.join(' '),
    imageUrl: item.image,
    gradientColor: '#87C232',
  }))

  return (
    <section className="bg-surface-soft py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Портфолио"
            title="Примеры работ"
            description="Нажмите на карточку — откроется полноэкранный просмотр. Изготовление, ремонт, мехобработка и литьё."
          />
        </Reveal>

        <Reveal className="mt-10">
          <ModalCards cards={modalItems} />
        </Reveal>

        <Reveal className="mt-8">
          <Button asChild variant="outline">
            <Link to="/portfolio">Смотреть все работы</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
