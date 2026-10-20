import { EquipmentCard } from '@/components/equipment/EquipmentCard'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { ContactStrip } from '@/components/sections/ContactStrip'
import { equipment } from '@/data/content'

export function EquipmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Оборудование"
        title="Современный станочный парк"
        description="Наше производство обладает следующим видом оборудования."
        image="uf_s/image/pon-main-2.jpg"
      />

      <section className="bg-surface-soft py-14 sm:py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {equipment.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.03}>
              <EquipmentCard
                id={item.id}
                item={item}
                reverse={index % 2 === 1}
                clampTitle={false}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactStrip />
    </>
  )
}
