import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type WaveLetteringProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  amplitude?: number
  duration?: number
}

export function WaveLettering({
  text,
  as: Tag = 'h2',
  className,
  amplitude = 6,
  duration = 2.4,
}: WaveLetteringProps) {
  const reduced = useReducedMotion()
  const chars = [...text]

  return (
    <Tag className={cn('inline-flex flex-wrap', className)} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block whitespace-pre"
          aria-hidden={char === ' ' ? undefined : true}
          animate={
            reduced
              ? { y: 0 }
              : { y: [0, -amplitude, 0] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.04,
                }
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  )
}
