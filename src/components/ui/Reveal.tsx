import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { duration, EASE_SIGNAL, viewportOnce } from '../../theme'
import { cn } from '../../lib/cn'

const ease = EASE_SIGNAL

/**
 * Scroll-triggered reveal. Rises 18px + fades, once, when it enters view.
 * Under reduced motion it renders statically (no animation at all) so content
 * is instant and accessible — Framer ignores the CSS transition override, so
 * we disable the effect here in JS rather than just shortening it.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Container that staggers direct <RevealItem> children into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={cn(className)}>{children}</div>
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

/** A staggered child for use inside <RevealGroup>. */
export function RevealItem({
  children,
  className,
  y = 18,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease } },
      }}
    >
      {children}
    </motion.div>
  )
}
