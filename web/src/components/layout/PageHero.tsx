import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TypewriterText } from '@/components/motion/TypewriterText'
import { Reveal } from '@/components/motion/Reveal'
import LightRays from '@/components/react-bits/LightRays'
import { media } from '@/lib/utils'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  image?: string
}

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-surface py-14 text-white sm:py-16 lg:py-20"
    >
      {image ? (
        <motion.img
          src={media(image)}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          style={{ y: imageY, scale: imageScale }}
        />
      ) : null}
      <LightRays
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
        raysOrigin="top-center"
        raysColor="#618930"
        lightSpread={0.75}
        rayLength={1.25}
        intensity={0.45}
        followMouse={false}
        intro
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(135,194,50,0.22),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.07),transparent_38%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/80" />
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <Reveal y={12} blur={false}>
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            <span className="h-px w-8 bg-brand/60" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <TypewriterText
          key={title}
          text={title}
          as="h1"
          speedMs={16}
          className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        />
        <Reveal delay={0.12} className="mt-4 max-w-3xl">
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>
        </Reveal>
      </motion.div>
    </section>
  )
}
