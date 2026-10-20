import { Award, Clock, FileCheck, Layers, Shield, Sparkles, Wrench } from 'lucide-react'
import SplitText from '@/components/react-bits/SplitText'
import { Reveal } from '@/components/motion/Reveal'
import { facts } from '@/data/content'

const icons = [Award, Layers, Clock, Shield, Sparkles, FileCheck, Wrench]

export function FactsGrid() {
  return (
    <section className="relative overflow-hidden bg-surface-soft py-16 sm:py-20">
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              <span className="h-px w-8 bg-brand/60" aria-hidden />
              Почему нас выбирают
            </p>
            <SplitText
              text="Факты о компании"
              tag="h2"
              splitType="chars"
              effect="wave"
              trigger="view"
              hoverEffect="wave"
              textAlign="center"
              className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            />
            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              Опыт, стандарты качества и инфраструктура для сложных проектов по оснастке.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, index) => {
            const Icon = icons[index] ?? Award
            return (
              <Reveal key={fact.title} delay={index * 0.05}>
                <article className="h-full rounded-[1.35rem] border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-lg">
                  <div className="mb-4 inline-flex rounded-xl bg-brand-muted p-2.5 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{fact.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{fact.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
