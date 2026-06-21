import { motion, useReducedMotion } from 'framer-motion'
import { NODES, EDGES } from './nodeTopology'

/**
 * Hero background — a hand-seeded, deterministic node network rendered as a
 * single inline SVG. A quiet engraving (low opacity, 1px hairlines), right-
 * biased so the text column stays clean. Only four nodes flicker; everything
 * else is static. Compositor-only opacity animation, ~6KB, zero new deps.
 *
 * Decorative: aria-hidden, fixed geometry (no layout shift), dual-gated by
 * prefers-reduced-motion via Framer's useReducedMotion + the global CSS rule.
 */

// Nodes that breathe, with staggered loop timings.
const FLICKER: ReadonlyArray<{ i: number; dur: number; delay: number }> = [
  { i: 2, dur: 7, delay: 0 },
  { i: 6, dur: 9, delay: 1.6 },
  { i: 10, dur: 8, delay: 3.1 },
  { i: 12, dur: 6.5, delay: 2.2 },
]

export function NodeNetwork() {
  const reduce = useReducedMotion()
  const flickerSet = new Set(FLICKER.map((f) => f.i))

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.55]"
        viewBox="0 0 1000 620"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="rgba(123,164,255,0.16)" strokeWidth={1} vectorEffect="non-scaling-stroke">
          {EDGES.map(([a, b], idx) => (
            <line
              key={idx}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
            />
          ))}
        </g>
        {NODES.map(([x, y], i) =>
          flickerSet.has(i) ? null : (
            <circle key={i} cx={x} cy={y} r={2.4} fill="rgba(155,180,255,0.30)" />
          ),
        )}
        {FLICKER.map(({ i, dur, delay }) => (
          <motion.circle
            key={`f-${i}`}
            cx={NODES[i][0]}
            cy={NODES[i][1]}
            r={3}
            fill="#5B8CFF"
            initial={{ opacity: 0.35 }}
            animate={reduce ? { opacity: 0.5 } : { opacity: [0.35, 0.85, 0.35] }}
            transition={
              reduce
                ? undefined
                : { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        ))}
      </svg>
      {/* Vignette: fade the network into the page background. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 95% at 78% 18%, transparent 0%, #07080C 68%)',
        }}
      />
    </div>
  )
}
