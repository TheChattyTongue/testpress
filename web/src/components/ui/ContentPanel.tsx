import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ContentPanelProps = {
  title: string
  children: ReactNode
  className?: string
  delay?: number
}

export function ContentPanel({ title, children, className, delay = 0 }: ContentPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        'rounded-[1.35rem] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-brand/20 hover:shadow-md',
        className,
      )}
    >
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <div className="mt-4">{children}</div>
    </motion.div>
  )
}
