export const appleEase = [0.22, 1, 0.36, 1] as const

export const springSnappy = { type: 'spring' as const, stiffness: 380, damping: 32 }

export const springSoft = { type: 'spring' as const, stiffness: 260, damping: 28 }

export const fadeUp = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)' },
}
