import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from '../lib/gsap'

/**
 * "Signal lock" intro — operational, not a spinner. A mono telemetry line and
 * an accent hairline resolve, the status flips to SIGNAL ACQUIRED, then the
 * panel clip-wipes upward to hand off to the hero. The hero H1 lives OUTSIDE
 * this overlay (a sibling), so it is already painted underneath — the overlay
 * is short and first-visit-only, keeping LCP honest. Skipped under reduced
 * motion; hard 1300ms failsafe; once per session.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  const [seen] = useState(() => {
    try {
      return sessionStorage.getItem('introSeen') === '1'
    } catch {
      return false
    }
  })
  const skip = reduce || seen
  const doneRef = useRef(false)

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    onDone()
  }, [onDone])

  useEffect(() => {
    if (skip) {
      finish()
      return
    }
    try {
      sessionStorage.setItem('introSeen', '1')
    } catch {
      /* ignore */
    }

    document.body.style.overflow = 'hidden'
    const failsafe = window.setTimeout(() => {
      finish()
      document.body.style.overflow = ''
      setGone(true)
    }, 1300)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          window.clearTimeout(failsafe)
          document.body.style.overflow = ''
          setGone(true)
        },
      })
      tl.from('[data-pl-node]', { scale: 0, opacity: 0, transformOrigin: 'center', duration: 0.4, stagger: 0.05 }, 0)
        .from('[data-pl-line]', { scaleX: 0, transformOrigin: 'left', duration: 0.5 }, 0.05)
        .from('[data-pl-text]', { opacity: 0, y: 8, duration: 0.4 }, 0.15)
        .to('[data-pl-init]', { opacity: 0, duration: 0.2 }, 0.72)
        .to('[data-pl-ack]', { opacity: 1, duration: 0.26 }, 0.8)
        .add(finish, '+=0.12')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'power4.inOut' }, '+=0.02')
    }, root)

    return () => {
      window.clearTimeout(failsafe)
      document.body.style.overflow = ''
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip])

  if (skip || gone) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-bg"
      style={{ clipPath: 'inset(0 0 0 0)' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
        <g stroke="#5B8CFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85">
          <line x1="13" y1="18" x2="24" y2="12" />
          <line x1="24" y1="12" x2="35" y2="21" />
          <line x1="13" y1="18" x2="21" y2="35" />
          <line x1="21" y1="35" x2="35" y2="21" />
          <line x1="24" y1="12" x2="21" y2="35" />
        </g>
        <circle data-pl-node cx="24" cy="12" r="2.6" fill="#9B7CFF" />
        <circle data-pl-node cx="35" cy="21" r="2.4" fill="#5B8CFF" />
        <circle data-pl-node cx="13" cy="18" r="2.2" fill="#7FA4FF" />
        <circle data-pl-node cx="21" cy="35" r="2.2" fill="#5B8CFF" />
      </svg>

      <div data-pl-line className="h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div data-pl-text className="font-mono text-2xs uppercase tracking-eyebrow text-ink-muted">
        <span className="text-ink-faint">Signal Room //</span>{' '}
        <span className="relative">
          <span data-pl-init>Initializing</span>
          <span data-pl-ack className="absolute left-0 top-0 text-accent opacity-0">
            Signal Acquired
          </span>
        </span>
        <span className="ml-1 inline-block h-3 w-1.5 -translate-y-px animate-pulse bg-accent align-middle" />
      </div>
    </div>
  )
}
