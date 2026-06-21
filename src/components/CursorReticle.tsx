import { useEffect, useRef } from 'react'
import { useFx } from '../hooks/useFx'

/**
 * A precise 1px accent ring that trails the cursor and opens up over
 * interactive elements — a SOC reticle, not a blob, no trail. Brighten-only
 * blend so it never inverts content. Native cursor stays visible (a11y).
 * Desktop only; never mounts on touch or under reduced motion.
 */
export function CursorReticle() {
  const { fine, reduce } = useFx()
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fine || reduce) return
    const el = ring.current
    if (!el) return
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let cx = mx
    let cy = my
    let over = false
    let raf = 0

    const loop = () => {
      cx += (mx - cx) * 0.16
      cy += (my - cy) * 0.16
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${over ? 2.1 : 1})`
      el.style.opacity = over ? '0.55' : '0.85'
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      const t = e.target as HTMLElement | null
      over = !!t?.closest('a, button, [data-cursor]')
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [fine, reduce])

  if (reduce || !fine) return null

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-3 w-3 rounded-full border border-accent/80 transition-[opacity] duration-200"
      style={{ mixBlendMode: 'plus-lighter', willChange: 'transform' }}
    />
  )
}
