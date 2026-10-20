import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { appleEase, fadeUp } from '@/components/motion/presets'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type FadeSwapProps = {
  swapKey: string
  children: ReactNode
  className?: string
}

export function FadeSwap({ swapKey, children, className }: FadeSwapProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={swapKey}
        className={className}
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        exit={fadeUp.exit}
        transition={{ duration: 0.4, ease: appleEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
