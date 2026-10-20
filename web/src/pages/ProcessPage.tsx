import { PageHero } from '@/components/layout/PageHero'
import { ContactStrip } from '@/components/sections/ContactStrip'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'

export function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Процесс"
        title="Этапы сотрудничества"
        description="От заявки и согласования ТЗ до отгрузки оснастки и передачи документации."
        image="uf_s/image/pon-main-4.jpg"
      />
      <ProcessTimeline showCta={false} showHeader={false} />
      <ContactStrip />
    </>
  )
}
