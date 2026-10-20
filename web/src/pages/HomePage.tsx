import { ContactStrip } from '@/components/sections/ContactStrip'
import { EquipmentCarousel } from '@/components/sections/EquipmentCarousel'
import { FactsGrid } from '@/components/sections/FactsGrid'
import { HeroServices } from '@/components/sections/HeroServices'
import { PortfolioPreview } from '@/components/sections/PortfolioPreview'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'

export function HomePage() {
  return (
    <>
      <HeroServices />
      <FactsGrid />
      <EquipmentCarousel compact />
      <ProcessTimeline />
      <PortfolioPreview />
      <ContactStrip />
    </>
  )
}
