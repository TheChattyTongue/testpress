import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type TileRevealProps = {
  children: ReactNode
  rows?: number
  cols?: number
  className?: string
  tileClassName?: string
  once?: boolean
}

export function TileReveal({
  children,
  rows = 5,
  cols = 10,
  className,
  tileClassName,
  once = true,
}: TileRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.35, margin: '0px 0px -8% 0px' })
  const reduced = useReducedMotion()
  const tiles = useMemo(() => Array.from({ length: rows * cols }, (_, i) => i), [rows, cols])
  const [revealed, setRevealed] = useState(reduced)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduced) {
      setRevealed(true)
      return
    }
    if (inView && !started) setStarted(true)
  }, [inView, started, reduced])

  const stagger = 0.022
  const duration = 0.55
  const totalMs = (stagger * (tiles.length - 1) + duration) * 1000 + 60

  useEffect(() => {
    if (!started || revealed) return
    const t = window.setTimeout(() => setRevealed(true), totalMs)
    return () => window.clearTimeout(t)
  }, [started, revealed, totalMs])

  const showMask = !reduced && !revealed

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className={cn(showMask && 'select-none')}>{children}</div>
      {showMask ? (
        <div
          className="pointer-events-none absolute inset-0 z-20 grid gap-0"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
          aria-hidden
        >
          {tiles.map((i) => {
            const row = Math.floor(i / cols)
            const col = i % cols
            const delay = (row + col) * stagger
            return (
              <motion.div
                key={i}
                className={cn('bg-white shadow-[inset_0_0_0_1px_rgba(15,20,25,0.04)]', tileClassName)}
                initial={{ y: 0, opacity: 1 }}
                animate={started ? { y: '-108%', opacity: 1 } : { y: 0, opacity: 1 }}
                transition={{
                  duration,
                  delay: started ? delay : 0,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
