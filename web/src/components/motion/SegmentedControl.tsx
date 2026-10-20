import { motion } from 'framer-motion'
import { Hand } from 'lucide-react'
import { springSnappy } from '@/components/motion/presets'
import { cn } from '@/lib/utils'

export type SegmentOption = {
  id: string
  label: string
}

type SegmentedControlProps = {
  options: SegmentOption[]
  value: string
  onChange: (id: string) => void
  layoutId: string
  variant?: 'dark' | 'light'
  columns?: 2 | 3 | 4 | 5
  className?: string
  hint?: string
}

export function SegmentedControl({
  options,
  value,
  onChange,
  layoutId,
  variant = 'light',
  columns = 4,
  className,
  hint,
}: SegmentedControlProps) {
  const gridCols =
    columns === 2
      ? 'grid-cols-2'
      : columns === 3
        ? 'grid-cols-2 sm:grid-cols-3'
        : columns === 5
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
          : 'grid-cols-2 sm:grid-cols-4'

  const isDark = variant === 'dark'

  return (
    <div className={className}>
      {hint ? (
        <p
          className={cn(
            'mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide',
            isDark ? 'text-slate-400' : 'text-slate-500',
          )}
        >
          <Hand className={cn('h-3.5 w-3.5', isDark ? 'text-brand' : 'text-brand')} />
          {hint}
        </p>
      ) : null}
      <div
        className={cn(
          'relative grid gap-1.5 rounded-2xl p-1.5 backdrop-blur-md',
          gridCols,
          isDark
            ? 'border border-white/10 bg-white/[0.04]'
            : 'border border-slate-200/80 bg-white shadow-sm',
        )}
        role="tablist"
      >
        {options.map((option) => {
          const active = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(option.id)}
              className={cn(
                'relative z-[1] rounded-xl px-2 py-2.5 text-center text-[11px] font-semibold leading-tight transition-colors sm:text-xs',
                active
                  ? isDark
                    ? 'text-surface'
                    : 'text-slate-900'
                  : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900',
              )}
            >
              {active ? (
                <motion.span
                  layoutId={layoutId}
                  className={cn(
                    'absolute inset-0 rounded-xl shadow-lg',
                    isDark
                      ? 'bg-white shadow-black/20'
                      : 'bg-slate-100 shadow-slate-200/80 ring-1 ring-slate-200/60',
                  )}
                  transition={springSnappy}
                />
              ) : null}
              <span className="relative">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
