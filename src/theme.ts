/**
 * Motion tokens — shared timing primitives for Framer Motion. Durations
 * 0.4–0.7s, signature easing, single scroll-reveal viewport config.
 */

export const EASE_SIGNAL = [0.16, 1, 0.3, 1] as const

export const duration = {
  fast: 0.4,
  base: 0.5,
  slow: 0.6,
  slowest: 0.7,
} as const

/** Shared viewport config for scroll-triggered reveals (fires once). */
export const viewportOnce = { once: true, margin: '-12% 0px' } as const
