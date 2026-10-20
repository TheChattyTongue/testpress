import { motion } from 'framer-motion'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { portfolio } from '@/data/content'
import { cn, media } from '@/lib/utils'

export type PortfolioItem = (typeof portfolio)[number]

type PortfolioCaseCardProps = {
  item: PortfolioItem
  index?: number
  className?: string
}

export function PortfolioCaseCard({ item, index = 0, className }: PortfolioCaseCardProps) {
  const hasGallery = 'gallery' in item && item.gallery && item.gallery.length > 0

  return (
    <motion.article
      id={item.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ delay: index * 0.03 }}
      className={cn(
        'scroll-mt-28 grid w-full overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_20px_50px_-30px_rgba(15,20,25,0.2)]',
        hasGallery
          ? 'grid-rows-[14rem_minmax(0,1fr)] lg:min-h-[36rem] lg:grid-cols-2 lg:grid-rows-1'
          : 'grid-rows-[14rem_minmax(0,1fr)] lg:h-[26rem] lg:grid-cols-2 lg:grid-rows-1',
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
        <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
          {item.category}
        </span>
      </div>

      <div className="flex min-h-0 flex-col justify-center p-6 sm:p-8">
        <h2 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
          {item.title}
        </h2>
        <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto text-sm leading-relaxed text-slate-700 sm:text-base">
          {item.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        {hasGallery ? (
          <div className="mt-4 grid shrink-0 grid-cols-3 gap-2">
            {item.gallery!.map((src, gIndex) => (
              <MediaFrame
                key={src}
                src={src}
                alt={`Пример ${gIndex + 1}`}
                aspect="square"
                reveal={false}
                className="ring-0"
              />
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  )
}
