import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { NodeNetwork } from '../background/NodeNetwork'
import { useFx } from '../../hooks/useFx'
import { heroState } from './heroState'
import { cn } from '../../lib/cn'

// Lazy boundary — three + R3F live entirely inside this chunk and never load
// on the critical path, on mobile/touch, on weak hardware, or under reduced motion.
const LatticeCanvas = lazy(() => import('./LatticeCanvas'))

const VIGNETTE = 'radial-gradient(120% 95% at 78% 18%, transparent 0%, #07080C 70%)'

/**
 * Hero backdrop: the 2D node SVG is first paint and the permanent fallback;
 * the 3D lattice fades in over it only when the device can carry it.
 */
export function HeroBackdrop() {
  const fx = useFx()
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [canvasUp, setCanvasUp] = useState(false)

  // Derived: mount the 3D only on a capable desktop while the hero is in view.
  // Leaving the hero unmounts it and frees the GPU.
  const mount = fx.allowHeavy && inView
  const showCanvas = mount && canvasUp

  // Pointer → heroState (desktop only). No React state, no re-renders.
  useEffect(() => {
    if (!fx.fine || fx.reduce) return
    const onMove = (e: PointerEvent) => {
      heroState.pointerX = (e.clientX / window.innerWidth) * 2 - 1
      heroState.pointerY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fx.fine, fx.reduce])

  // Pause the canvas render loop when the hero scrolls away.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: '200px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700 ease-premium',
          showCanvas ? 'opacity-0' : 'opacity-100',
        )}
      >
        <NodeNetwork />
      </div>

      {mount && (
        <Suspense fallback={null}>
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-premium',
              canvasUp ? 'opacity-100' : 'opacity-0',
            )}
          >
            <LatticeCanvas count={1800} active={inView} onReady={() => setCanvasUp(true)} />
            <div className="pointer-events-none absolute inset-0" style={{ background: VIGNETTE }} />
          </div>
        </Suspense>
      )}
    </div>
  )
}
