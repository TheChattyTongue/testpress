import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type HighlightBit = string | { text: string; occurrence?: number }

type BlurHighlightProps = {
  children: string
  highlightedBits?: HighlightBit[]
  highlightColor?: string
  blurAmount?: number
  inactiveOpacity?: number
  className?: string
  once?: boolean
}

function splitWithHighlights(text: string, bits: HighlightBit[]) {
  if (!bits.length) return [{ text, highlight: false }]

  type Segment = { text: string; highlight: boolean }
  let segments: Segment[] = [{ text, highlight: false }]

  for (const bit of bits) {
    const needle = typeof bit === 'string' ? bit : bit.text
    const occurrence = typeof bit === 'string' ? undefined : bit.occurrence
    const next: Segment[] = []

    for (const seg of segments) {
      if (seg.highlight) {
        next.push(seg)
        continue
      }
      const parts = seg.text.split(needle)
      if (parts.length === 1) {
        next.push(seg)
        continue
      }
      let hit = 0
      parts.forEach((part, idx) => {
        if (part) next.push({ text: part, highlight: false })
        if (idx < parts.length - 1) {
          hit += 1
          const match =
            occurrence === undefined || occurrence === hit
          if (match) next.push({ text: needle, highlight: true })
          else next.push({ text: needle, highlight: false })
        }
      })
    }
    segments = next
  }

  return segments
}

export function BlurHighlight({
  children,
  highlightedBits = [],
  highlightColor = '#87C232',
  blurAmount = 8,
  inactiveOpacity = 0.35,
  className,
  once = true,
}: BlurHighlightProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once, amount: 0.45, margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const segments = useMemo(
    () => splitWithHighlights(children, highlightedBits),
    [children, highlightedBits],
  )

  const active = reduced || inView

  return (
    <p
      ref={ref}
      className={cn('text-base leading-relaxed text-slate-600 sm:text-lg', className)}
    >
      {segments.map((seg, i) =>
        seg.highlight ? (
          <motion.span
            key={`${i}-${seg.text}`}
            className="relative font-semibold text-slate-900"
            initial={false}
            animate={{
              opacity: active ? 1 : inactiveOpacity,
              filter: active ? 'blur(0px)' : `blur(${blurAmount}px)`,
              backgroundSize: active ? '100% 88%' : '0% 88%',
            }}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.35 }}
            style={{
              backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 88%',
            }}
          >
            {seg.text}
          </motion.span>
        ) : (
          <motion.span
            key={`${i}-${seg.text}`}
            initial={false}
            animate={{
              opacity: active ? 1 : inactiveOpacity,
              filter: active ? 'blur(0px)' : `blur(${blurAmount}px)`,
            }}
            transition={{ duration: reduced ? 0 : 0.75 }}
          >
            {seg.text}
          </motion.span>
        ),
      )}
    </p>
  )
}

export type { BlurHighlightProps }
