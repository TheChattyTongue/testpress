import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { appleEase } from '@/components/motion/presets'
import { SegmentedControl } from '@/components/motion/SegmentedControl'
import { TypewriterText } from '@/components/motion/TypewriterText'
import { Button } from '@/components/ui/Button'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { services } from '@/data/content'
import { useQuoteDialog } from '@/context/QuoteDialogContext'
import LightRays from '@/components/react-bits/LightRays'
import { cn } from '@/lib/utils'

export function HeroServices() {
  const { openQuote } = useQuoteDialog()
  const [active, setActive] = useState(services[0].id)
  const [paused, setPaused] = useState(false)
  const activeIndex = services.findIndex((s) => s.id === active)
  const current = services[activeIndex >= 0 ? activeIndex : 0]

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      setActive((prev) => {
        const idx = services.findIndex((s) => s.id === prev)
        const next = services[(idx + 1) % services.length]
        return next.id
      })
    }, 9000)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <section
      className="relative overflow-hidden bg-surface text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <LightRays
          className="absolute inset-0 h-full w-full opacity-70"
          raysOrigin="top-center"
          raysColor="#87C232"
          lightSpread={0.85}
          rayLength={1.4}
          intensity={0.55}
          followMouse
          mouseInfluence={0.12}
          intro
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(135,194,50,0.28),transparent_42%),radial-gradient(circle_at_85%_0%,rgba(255,255,255,0.09),transparent_38%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        <div className="max-w-xl lg:max-w-none">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_12px_#87c232]" />
            Завод в Дедовске
          </p>

          <div className="min-h-[9.5rem] sm:min-h-[10.5rem]">
            <TypewriterText
              key={`title-${current.id}`}
              text={current.title}
              as="h1"
              speedMs={18}
              className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.35rem] lg:leading-[1.05]"
            />
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, delay: 0.15, ease: appleEase }}
                className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg"
              >
                {current.subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-7">
            <SegmentedControl
              variant="dark"
              layoutId="hero-service-pill"
              hint="Выберите направление — контент обновится"
              value={active}
              onChange={(id) => setActive(id as typeof active)}
              columns={4}
              options={services.map((s) => ({ id: s.id, label: s.title }))}
            />
            <div className="mt-3 flex gap-1.5">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  aria-label={service.title}
                  onClick={() => setActive(service.id)}
                  className={cn(
                    'h-1.5 flex-1 rounded-full transition-all duration-300',
                    service.id === active ? 'bg-brand' : 'bg-white/15 hover:bg-white/25',
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={openQuote}>
              Оставить заявку
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10"
            >
              <Link to="/portfolio">Реализованные проекты</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-6 rounded-[2rem] bg-brand/20 blur-3xl" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: appleEase }}
              className="relative grid grid-cols-6 gap-3 sm:gap-4"
            >
              <MediaFrame
                src={current.images[0]}
                alt={current.title}
                aspect="video"
                priority
                reveal={false}
                className="col-span-6 shadow-2xl ring-white/15"
              />
              {current.images.slice(1).map((src, index) => (
                <MediaFrame
                  key={src}
                  src={src}
                  alt=""
                  aspect="square"
                  reveal={false}
                  className={cn(
                    'col-span-3 shadow-xl ring-white/10',
                    index === 0 && 'sm:col-span-3',
                  )}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
