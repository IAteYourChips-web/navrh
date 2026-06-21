import {
  Fragment,
  type ComponentType,
  type ElementType,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

interface SplitTextProps {
  children: string
  as?: ElementType
  className?: string
  /** 'chars' = per-character (hero name); 'lines' = per-word (headings). */
  variant?: 'chars' | 'lines'
  stagger?: number
  delay?: number
  /** Play on mount instead of on scroll into view. */
  immediate?: boolean
  /** For immediate mode: hold hidden until true (sync with the intro). */
  play?: boolean
  trailing?: ReactNode
}

/**
 * Kinetic split-text reveal built on Framer Motion. Accessible: the element
 * exposes its full text via aria-label and the split spans are aria-hidden.
 * Plain, instant text under reduced motion.
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
  type TagProps = PropsWithChildren<HTMLAttributes<HTMLElement>>
  const Tag = (as ?? 'span') as unknown as ComponentType<TagProps>
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <Tag className={className}>
        {children}
        {trailing}
      </Tag>
    )
  }

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger ?? (variant === 'chars' ? 0.02 : 0.06),
        delayChildren: delay,
      },
    },
  }
  const charV: Variants = {
    hidden: { opacity: 0, y: '45%', rotateX: -55 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: EASE } },
  }
  const wordV: Variants = {
    hidden: { opacity: 0, y: '60%' },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  const animateProps = immediate
    ? { animate: play ? ('show' as const) : ('hidden' as const) }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '-12% 0px' } }

  const words = children.split(' ')

  return (
    <Tag className={className} aria-label={children}>
      <motion.span
        aria-hidden="true"
        className="inline"
        variants={container}
        initial="hidden"
        {...animateProps}
      >
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap" style={{ perspective: 600 }}>
              {variant === 'lines' ? (
                <motion.span variants={wordV} className="inline-block will-change-transform">
                  {word}
                </motion.span>
              ) : (
                Array.from(word).map((ch, ci) => (
                  <motion.span
                    key={ci}
                    variants={charV}
                    className="inline-block will-change-transform"
                  >
                    {ch}
                  </motion.span>
                ))
              )}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </motion.span>
      {trailing}
    </Tag>
  )
}
