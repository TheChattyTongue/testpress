import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { appleEase } from '@/components/motion/presets'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.45, ease: appleEase }}
    >
      {children}
    </motion.div>
  )
}
