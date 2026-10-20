import { CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/SectionHeading'
import { processSteps } from '@/data/content'
import { useQuoteDialog } from '@/context/QuoteDialogContext'

type ProcessTimelineProps = {
  showCta?: boolean
  showHeader?: boolean
}

export function ProcessTimeline({ showCta = true, showHeader = true }: ProcessTimelineProps) {
  const { openQuote } = useQuoteDialog()

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
        {showHeader ? (
          <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Прозрачный процесс"
            title="Этапы сотрудничества"
            description="От заявки и согласования ТЗ до отгрузки оснастки и передачи документации."
            className="mx-auto"
          />
          </Reveal>
        ) : null}

        <ol className={`relative space-y-5 ${showHeader ? 'mt-12' : 'mt-0'}`}>
          <div
            aria-hidden
            className="absolute bottom-2 left-[1.125rem] top-2 w-px bg-gradient-to-b from-brand via-brand/30 to-transparent"
          />
          {processSteps.map((step, index) => (
            <li key={index} className="relative list-none pl-12">
              <span className="absolute left-0 top-5 z-[1] flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand bg-white text-xs font-bold text-brand shadow-sm">
                {index + 1}
              </span>
              <Reveal delay={index * 0.04} y={12}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-soft/80">
                  <div className="border-b border-slate-200/80 p-5">
                    <ul className="space-y-2 text-sm text-slate-700">
                      {step.tasks.map((task) => (
                        <li key={task} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-brand-muted/70 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                      Результат
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">{step.result}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-10">
        <div className="rounded-3xl border border-brand/20 bg-gradient-to-r from-brand-muted to-white p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Рекомендуем
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              Заключение договора на обслуживание
            </p>
          </div>
          {showCta ? (
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
              <Button onClick={openQuote}>Оставить заявку</Button>
              <Button asChild variant="outline">
                <Link to="/process">Подробнее об этапах</Link>
              </Button>
            </div>
          ) : null}
        </div>
        </Reveal>
        </div>
      </div>
    </section>
  )
}
