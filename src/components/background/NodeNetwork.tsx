import { motion, useReducedMotion } from 'framer-motion'

/**
 * Hero background — a hand-seeded, deterministic node network rendered as a
 * single inline SVG. A quiet engraving (low opacity, 1px hairlines), right-
 * biased so the text column stays clean. Only four nodes flicker; everything
 * else is static. Compositor-only opacity animation, ~6KB, zero new deps.
 *
 * Decorative: aria-hidden, fixed geometry (no layout shift), dual-gated by
 * prefers-reduced-motion via Framer's useReducedMotion + the global CSS rule.
 */

// Right-biased coordinates in a 1000 x 620 viewBox (slice-fit to the hero).
const NODES: ReadonlyArray<readonly [number, number]> = [
  [560, 120], // 0
  [664, 74], // 1
  [770, 150], // 2
  [882, 92], // 3
  [952, 206], // 4
  [620, 232], // 5
  [722, 300], // 6
  [842, 262], // 7
  [930, 344], // 8
  [582, 384], // 9
  [690, 444], // 10
  [800, 412], // 11
  [900, 482], // 12
  [662, 540], // 13
  [792, 560], // 14
]

const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [4, 8],
  [5, 9], [6, 10], [9, 10], [7, 11], [10, 11], [8, 12], [11, 12], [9, 13],
  [13, 14], [14, 12], [1, 5],
]

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
