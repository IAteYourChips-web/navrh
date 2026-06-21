import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery'

/**
 * Lenis smooth scrolling on its own rAF loop. Desktop only — native momentum
 * is better on touch, and it's disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const fine = useFinePointer()

  useEffect(() => {
    if (reduce || !fine) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduce, fine])

  return <>{children}</>
}
