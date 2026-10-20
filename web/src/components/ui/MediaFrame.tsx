import { motion } from 'framer-motion'
import type { ComponentProps, ReactNode } from 'react'
import { cn, media } from '@/lib/utils'

type MediaFrameProps = {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  aspect?: 'video' | 'square' | 'portrait' | 'auto'
  overlay?: ReactNode
  priority?: boolean
  reveal?: boolean
}

const aspectClass = {
  video: 'aspect-[16/10]',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  auto: 'min-h-[12rem]',
} as const

export function MediaFrame({
  src,
  alt,
  className,
  imageClassName,
  aspect = 'video',
  overlay,
  priority,
  reveal = true,
}: MediaFrameProps) {
  const motionProps: ComponentProps<typeof motion.div> = reveal
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-8%' },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }
    : {}

  const frameClass = cn(
    'group relative overflow-hidden rounded-[1.35rem] bg-slate-200/80 shadow-[0_20px_50px_-24px_rgba(15,20,25,0.45)] ring-1 ring-black/5',
    aspect !== 'auto' && aspectClass[aspect],
    className,
  )

  const content = (
    <>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
      <img
        src={media(src)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          'h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]',
          aspect === 'auto' && 'min-h-[12rem] w-full',
          imageClassName,
        )}
      />
      {overlay ? (
        <div className="absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">{overlay}</div>
      ) : null}
    </>
  )

  if (!reveal) {
    return <div className={frameClass}>{content}</div>
  }

  return (
    <motion.div {...motionProps} className={frameClass}>
      {content}
    </motion.div>
  )
}
