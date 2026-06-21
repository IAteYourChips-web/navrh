import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useFinePointer } from '../hooks/useMediaQuery'

/**
 * Lenis smooth scrolling, driven by the GSAP ticker and kept in sync with
 * ScrollTrigger. Disabled entirely under prefers-reduced-motion (native scroll,
 * instant). Mounted high in the tree so every section shares one scroller.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const fine = useFinePointer()

  useEffect(() => {
    // Native momentum is better on touch; smooth-scroll desktop only.
    if (reduce || !fine) return

    const lenis = new Lenis({
      duration: 1.05,
      // ease-out expo — settled, never floaty
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [reduce, fine])

  return <>{children}</>
}
