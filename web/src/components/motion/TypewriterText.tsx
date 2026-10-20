import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type TypewriterTextProps = {
  text: string
  className?: string
  speedMs?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TypewriterText({
  text,
  className,
  speedMs = 22,
  as: Tag = 'span',
}: TypewriterTextProps) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? text : '')
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) {
      setValue(text)
      setDone(true)
      return
    }
    setValue('')
    setDone(false)
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setValue(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(timer)
        setDone(true)
      }
    }, speedMs)
    return () => window.clearInterval(timer)
  }, [text, speedMs, reduced])

  return (
    <Tag className={cn(className)}>
      {value}
      {!reduced ? (
        <span
          aria-hidden
          className={cn(
            'ml-0.5 inline-block w-[2px] translate-y-[0.08em] bg-brand align-middle',
            done ? 'opacity-0' : 'h-[0.85em] opacity-100',
          )}
        />
      ) : null}
    </Tag>
  )
}
