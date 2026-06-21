import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useFx } from '../../hooks/useFx'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { heroState } from './heroState'
import { cn } from '../../lib/cn'

// three + R3F live entirely in this lazy chunk — never on the critical path,
// never on mobile/touch/weak hardware or under reduced motion.
const LatticeCanvas = lazy(() => import('./LatticeCanvas'))

const CIRCLE_MASK = 'radial-gradient(closest-side, #000 58%, transparent 100%)'

/**
 * The one WebGL accent: a slow-drifting node lattice masked to a circle behind
 * the hero portrait. A static glow ring is the default; the canvas is pure
 * enhancement on capable desktops.
 */
export function HeroBackdrop() {
  const fx = useFx()
  const wide = useMediaQuery('(min-width: 768px)')
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [canvasUp, setCanvasUp] = useState(false)

  const mount = fx.allowHeavy && inView && wide
  const showCanvas = mount && canvasUp

  useEffect(() => {
    if (!fx.fine || fx.reduce) return
    const onMove = (e: PointerEvent) => {
      heroState.pointerX = (e.clientX / window.innerWidth) * 2 - 1
      heroState.pointerY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fx.fine, fx.reduce])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0">
      {/* Static fallback: soft glow ring (also the base under the canvas). */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(closest-side, rgba(91,140,255,0.10), transparent 76%)' }}
      />
      <div className="absolute inset-[14%] rounded-full border border-accent/10" />

      {mount && (
        <Suspense fallback={null}>
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-premium',
              showCanvas ? 'opacity-[0.45]' : 'opacity-0',
            )}
            style={{ maskImage: CIRCLE_MASK, WebkitMaskImage: CIRCLE_MASK }}
          >
            <LatticeCanvas count={1400} active={inView} onReady={() => setCanvasUp(true)} />
          </div>
        </Suspense>
      )}
    </div>
  )
}
