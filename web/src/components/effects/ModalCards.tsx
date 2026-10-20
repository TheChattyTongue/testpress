import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn, media } from '@/lib/utils'

export type ModalCardData = {
  id: string
  title: string
  description: string
  imageUrl: string
  gradientColor?: string
}

type ModalCardsProps = {
  cards: ModalCardData[]
  className?: string
  gradientColor?: string
}

export function ModalCards({ cards, className, gradientColor = '#87C232' }: ModalCardsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const layoutScope = useId().replace(/:/g, '')
  const active = cards.find((c) => c.id === activeId) ?? null

  const close = useCallback(() => setActiveId(null), [])

  useEffect(() => {
    if (!activeId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeId, close])

  return (
    <>
      <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {cards.map((card) => (
          <motion.button
            key={card.id}
            type="button"
            layoutId={`${layoutScope}-card-${card.id}`}
            onClick={() => setActiveId(card.id)}
            className="group relative cursor-pointer overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.img
                layoutId={`${layoutScope}-img-${card.id}`}
                src={media(card.imageUrl)}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-40 mix-blend-multiply"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${card.gradientColor ?? gradientColor}, transparent 70%)`,
                }}
              />
            </div>
            <div className="p-5">
              <motion.h3
                layoutId={`${layoutScope}-title-${card.id}`}
                className="text-lg font-bold text-slate-900"
              >
                {card.title}
              </motion.h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{card.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {active ? (
                <motion.div
                  key="backdrop"
                  className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/70 p-4 sm:items-center sm:p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={close}
                >
                  <motion.article
                    layoutId={`${layoutScope}-card-${active.id}`}
                    className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[1.75rem] bg-white shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                    transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  >
                    <button
                      type="button"
                      onClick={close}
                      className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55"
                      aria-label="Закрыть"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <div className="relative max-h-[42vh] overflow-hidden sm:max-h-[48vh]">
                      <motion.img
                        layoutId={`${layoutScope}-img-${active.id}`}
                        src={media(active.imageUrl)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <div
                        className="absolute inset-0 opacity-50"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${active.gradientColor ?? gradientColor}, transparent 65%)`,
                        }}
                      />
                    </div>
                    <div className="overflow-y-auto p-6 sm:p-8">
                      <motion.h3
                        layoutId={`${layoutScope}-title-${active.id}`}
                        className="text-2xl font-bold text-slate-900"
                      >
                        {active.title}
                      </motion.h3>
                      <p className="mt-4 text-base leading-relaxed text-slate-600">
                        {active.description}
                      </p>
                    </div>
                  </motion.article>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  )
}
