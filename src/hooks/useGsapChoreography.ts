import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from '../lib/gsap'
import { heroState } from '../components/hero/heroState'

/**
 * All scroll-scrubbed choreography. Gated to desktop + motion via
 * gsap.matchMedia so touch / reduced-motion register nothing (Framer Motion
 * still handles in-view reveals there). `enabled` waits until after the intro.
 *
 * - The ONE pinned beat: pin the hero for ~130vh while the WebGL field
 *   collapses scatter → lattice (threat → trust) and the eyebrow + thesis
 *   resolve in lockstep.
 * - clip-path geometric dividers wipe between sections.
 * - a whisper of parallax depth on non-hero eyebrows.
 */
export function useGsapChoreography(enabled: boolean) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!enabled || reduce) return

    const mm = gsap.matchMedia()
    mm.add(
      '(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        // 1) The pinned threat → trust beat.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '+=130%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
              heroState.progress = self.progress
            },
          },
        })
        tl.to('[data-hero-lift]', { yPercent: -16, opacity: 0.55, ease: 'none' }, 0)
          .fromTo('[data-eyebrow-threat]', { opacity: 1 }, { opacity: 0, ease: 'none' }, 0.35)
          .fromTo('[data-eyebrow-trust]', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.5)
          .fromTo(
            '[data-thesis-underline]',
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', transformOrigin: 'left' },
            0.65,
          )

        // 2) clip-path geometric reveal on section dividers.
        gsap.utils.toArray<HTMLElement>('[data-divider]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              ease: 'power3.inOut',
              duration: 1.1,
              onStart: () => (el.style.willChange = 'clip-path'),
              onComplete: () => (el.style.willChange = 'auto'),
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })

        // 3) subtle parallax depth (non-hero).
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || '6')
          gsap.fromTo(
            el,
            { yPercent: amt },
            {
              yPercent: -amt,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      },
    )

    return () => mm.revert()
  }, [enabled, reduce])
}
