import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { TypewriterText } from '@/components/motion/TypewriterText'
import { Button } from '@/components/ui/Button'
import { equipment } from '@/data/content'
import { cn, media } from '@/lib/utils'

export type EquipmentItem = (typeof equipment)[number]

type EquipmentCardProps = {
  item: EquipmentItem
  id?: string
  className?: string
  index?: number
  total?: number
  reverse?: boolean
  paragraphLimit?: number
  showLink?: boolean
  clampTitle?: boolean
  animateTitle?: boolean
  footer?: ReactNode
}

/** Fixed-size equipment card: same width/height in carousel and on /equipment */
export function EquipmentCard({
  item,
  id,
  className,
  index,
  total,
  reverse = false,
  paragraphLimit,
  showLink = false,
  clampTitle = true,
  animateTitle = false,
  footer,
}: EquipmentCardProps) {
  const paragraphs =
    paragraphLimit != null ? item.paragraphs.slice(0, paragraphLimit) : item.paragraphs

  return (
    <article
      id={id}
      className={cn(
        'grid w-full max-w-full overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-32px_rgba(15,20,25,0.35)]',
        'grid-rows-[14rem_minmax(0,1fr)] lg:h-[26rem] lg:grid-cols-2 lg:grid-rows-1',
        reverse && 'lg:[&>*:first-child]:order-2',
        id && 'scroll-mt-28',
        className,
      )}
    >
      <div className="relative min-h-0 overflow-hidden bg-slate-200">
        <img
          src={media(item.image)}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {index != null && total != null ? (
          <p className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
            Станок {index + 1} / {total}
          </p>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-col justify-center p-6 sm:p-8">
        {animateTitle ? (
          <TypewriterText
            key={item.id}
            text={item.title}
            as="h3"
            speedMs={12}
            className={cn(
              'text-lg font-bold leading-snug text-slate-900 sm:text-xl',
              clampTitle && 'line-clamp-3',
            )}
          />
        ) : (
          <h3
            className={cn(
              'text-lg font-bold leading-snug text-slate-900 sm:text-xl',
              clampTitle && 'line-clamp-3',
            )}
          >
            {item.title}
          </h3>
        )}
        <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </div>
        {showLink ? (
          <Button asChild variant="outline" className="mt-4 w-fit shrink-0" size="sm">
            <Link to={`/equipment#${item.id}`}>Подробнее о станке</Link>
          </Button>
        ) : null}
        {footer}
      </div>
    </article>
  )
}
