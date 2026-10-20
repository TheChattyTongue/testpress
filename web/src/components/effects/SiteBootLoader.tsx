import { useEffect, useState, type ReactNode } from 'react'
import { StairsPreloader } from '@/components/effects/StairsPreloader'
import { site } from '@/data/content'

const SESSION_KEY = 'presson-boot-loaded'

type SiteBootLoaderProps = {
  children: ReactNode
}

export function SiteBootLoader({ children }: SiteBootLoaderProps) {
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem(SESSION_KEY) !== '1'
  })

  useEffect(() => {
    if (!loading) return
    const minMs = 1600
    const start = performance.now()
    const finish = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, minMs - elapsed)
      window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, '1')
        setLoading(false)
      }, wait)
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    return () => window.removeEventListener('load', finish)
  }, [loading])

  return (
    <StairsPreloader
      loading={loading}
      loadingText={`${site.name} — загрузка`}
      bgColor="#0f1419"
      stairCount={12}
      duration={2000}
    >
      {children}
    </StairsPreloader>
  )
}
