import { motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type Phase = 'loading' | 'exit' | 'done'

type StairsPreloaderProps = {
  loading: boolean
  duration?: number
  stairCount?: number
  loadingText?: string
  bgColor?: string
  onLoadingComplete?: () => void
  children?: ReactNode
  className?: string
}

function stairShade(hex: string, index: number, total: number) {
  const t = index / Math.max(1, total - 1)
  const parse = (h: string) => {
    const raw = h.replace('#', '')
    const full =
      raw.length === 3
        ? raw
            .split('')
            .map((c) => c + c)
            .join('')
        : raw.slice(0, 6)
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ] as const
  }
  try {
    const [r, g, b] = parse(hex)
    const mix = 0.88 + t * 0.14
    const nr = Math.min(255, Math.round(r * mix))
    const ng = Math.min(255, Math.round(g * mix))
    const nb = Math.min(255, Math.round(b * mix))
    return `rgb(${nr} ${ng} ${nb})`
  } catch {
    return hex
  }
}

export function StairsPreloader({
  loading,
  duration = 2200,
  stairCount = 10,
  loadingText = 'Загрузка…',
  bgColor = '#0f1419',
  onLoadingComplete,
  children,
  className,
}: StairsPreloaderProps) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(() => (loading ? 'loading' : 'done'))
  const [progress, setProgress] = useState(0)

  const exitStagger = 0.06
  const exitDuration = 0.78

  useEffect(() => {
    if (loading) {
      setPhase('loading')
      setProgress(0)
      return
    }
    if (reduced) {
      setPhase('done')
      onLoadingComplete?.()
      return
    }
    setPhase('exit')
  }, [loading, reduced, onLoadingComplete])

  useEffect(() => {
    if (phase !== 'exit') return
    const totalMs = (exitStagger * (stairCount - 1) + exitDuration) * 1000 + 100
    const t = window.setTimeout(() => {
      setPhase('done')
      onLoadingComplete?.()
    }, totalMs)
    return () => window.clearTimeout(t)
  }, [phase, stairCount, exitStagger, exitDuration, onLoadingComplete])

  useEffect(() => {
    if (phase !== 'loading' || reduced) return
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / duration) * 100)
      setProgress(p)
      if (p < 100) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [phase, duration, reduced])

  const showOverlay = phase === 'loading' || phase === 'exit'
  const showContent = phase === 'exit' || phase === 'done'
  const exiting = phase === 'exit'
  const loadingPhase = phase === 'loading'

  return (
    <>
      {showContent ? children : null}
      {showOverlay ? (
        <div
          className={cn('fixed inset-0 z-[100] overflow-hidden', className)}
          role="status"
          aria-live="polite"
          aria-label={loadingText}
        >
          {loadingPhase ? (
            <div className="absolute inset-0" style={{ backgroundColor: bgColor }} aria-hidden />
          ) : null}

          {loadingPhase ? (
            <motion.p
              className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-6 text-center text-sm font-medium uppercase tracking-[0.35em] text-white/80 sm:text-base"
              animate={{ opacity: progress > 88 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {loadingText}
            </motion.p>
          ) : null}

          {(loadingPhase || exiting) && (
            <div className="absolute inset-0 z-10 flex h-full w-[102%] max-w-none">
              {Array.from({ length: stairCount }, (_, i) => (
                <motion.div
                  key={i}
                  className="h-full shrink-0 will-change-transform"
                  style={{
                    width: `${100 / stairCount + 0.35}%`,
                    marginLeft: i === 0 ? 0 : -1,
                    backgroundColor: stairShade(bgColor, i, stairCount),
                    boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.07)',
                  }}
                  initial={{ y: '0%' }}
                  animate={{ y: exiting ? '-110%' : '0%' }}
                  transition={{
                    duration: reduced ? 0.01 : exitDuration,
                    delay: exiting ? i * exitStagger : 0,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}
