import {
  Fragment,
  useEffect,
  useRef,
  type ComponentType,
  type ElementType,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
} from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from '../../lib/gsap'

interface SplitTextProps {
  children: string
  as?: ElementType
  className?: string
  /** 'chars' = per-character flip (hero moment); 'lines' = per-word rise (headings). */
  variant?: 'chars' | 'lines'
  /** Per-unit stagger (s). */
  stagger?: number
  /** Initial delay (s). */
  delay?: number
  /** Play immediately on mount instead of on scroll into view. */
  immediate?: boolean
  /** For immediate mode: hold hidden until this is true (sync with the intro). */
  play?: boolean
  /** Optional trailing node (e.g. an accent-gradient word) rendered after. */
  trailing?: ReactNode
}

/**
 * Kinetic split-text reveal. 'chars' flips characters up (the hero name);
 * 'lines' rises words (section headings — per-char there reads carnival).
 * Accessible: the element exposes full text via aria-label, split spans are
 * aria-hidden. Under reduced motion it renders plain, instant text.
 */
export function SplitText({
  children,
  as,
  className,
  variant = 'chars',
  stagger,
  delay = 0,
  immediate = false,
  play = true,
  trailing,
}: SplitTextProps) {
  type TagProps = PropsWithChildren<HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }>
  const Tag = (as ?? 'span') as unknown as ComponentType<TagProps>
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduce || !ref.current) return
    const sel = variant === 'chars' ? '[data-char]' : '[data-word]'
    const units = ref.current.querySelectorAll<HTMLElement>(sel)
    if (!units.length) return

    const ctx = gsap.context(() => {
      // Immediate reveals can be held hidden until the intro hands off.
      if (immediate && !play) {
        gsap.set(
          units,
          variant === 'chars'
            ? { yPercent: 100, opacity: 0, rotateX: -70, transformPerspective: 600, transformOrigin: '50% 100%' }
            : { yPercent: 60, opacity: 0 },
        )
        return
      }
      const trigger = immediate
        ? {}
        : { scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } }
      if (variant === 'chars') {
        gsap.set(units, { transformPerspective: 600 })
        gsap.from(units, {
          yPercent: 100,
          opacity: 0,
          rotateX: -70,
          transformOrigin: '50% 100%',
          duration: 0.7,
          ease: 'power3.out',
          stagger: stagger ?? 0.022,
          delay,
          ...trigger,
        })
      } else {
        gsap.from(units, {
          yPercent: 60,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: stagger ?? 0.07,
          delay,
          ...trigger,
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [reduce, variant, stagger, delay, immediate, play])

  if (reduce) {
    return (
      <Tag className={className}>
        {children}
        {trailing}
      </Tag>
    )
  }

  const words = children.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={children}>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {variant === 'lines' ? (
                <span data-word className="inline-block will-change-transform">
                  {word}
                </span>
              ) : (
                Array.from(word).map((ch, ci) => (
                  <span key={ci} data-char className="inline-block will-change-transform">
                    {ch}
                  </span>
                ))
              )}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </span>
      {trailing}
    </Tag>
  )
}
