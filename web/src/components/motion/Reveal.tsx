import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { appleEase } from '@/components/motion/presets'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  y?: number
  blur?: boolean
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = true,
  className,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.55, delay, ease: appleEase }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
