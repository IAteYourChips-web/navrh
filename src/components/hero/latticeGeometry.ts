import { NODES, EDGES, VIEWBOX } from '../background/nodeTopology'

/**
 * Pure, three-free geometry baking for the hero lattice. Produces a stable 1:1
 * pairing of a "scatter" (threat) position and a "target" (trust) lattice
 * position for every point, so the collapse animation is just a mix(). The
 * target is seeded from the site's own 15 NODES + 20 EDGES (provenance), with
 * the remaining points distributed along the edges to give the network body.
 * Deterministic: mulberry32(0x5B8C) → identical every load (0x5B8C ≈ the accent).
 */

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const SCALE_X = 3.25
const SCALE_Y = 2.05
const Z_DEPTH = 1.6

export interface LatticeData {
  /** N*3 — resolved "trust" lattice positions (the built-in `position` attr). */
  target: Float32Array
  /** N*3 — scattered "threat" positions, paired 1:1 with target. */
  scatter: Float32Array
  /** N — per-point phase for the idle wobble. */
  phase: Float32Array
  /** N — 1 for the 15 brand anchor nodes, else 0. */
  isAnchor: Float32Array
  /** 20*2*3 — anchor world coords for the edge LineSegments. */
  edges: Float32Array
  count: number
}

export function buildLattice(N: number): LatticeData {
  const rng = mulberry32(0x5b8c)

  // 15 brand anchors, mapped from viewBox → right-biased world space (+ depth).
  const anchors: Array<[number, number, number]> = NODES.map(([x, y]) => {
    const wx = ((x / VIEWBOX.w) * 2 - 1) * SCALE_X
    const wy = -((y / VIEWBOX.h) * 2 - 1) * SCALE_Y
    const wz = (rng() * 2 - 1) * Z_DEPTH
    return [wx, wy, wz]
  })

  const count = Math.max(N, anchors.length)
  const target = new Float32Array(count * 3)
  const scatter = new Float32Array(count * 3)
  const phase = new Float32Array(count)
  const isAnchor = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    let tx: number
    let ty: number
    let tz: number
    if (i < anchors.length) {
      ;[tx, ty, tz] = anchors[i]
      isAnchor[i] = 1
    } else {
      // distribute along a random edge with jitter → a network with body
      const e = EDGES[(rng() * EDGES.length) | 0]
      const a = anchors[e[0]]
      const b = anchors[e[1]]
      const t = rng()
      const j = 0.3
      tx = a[0] + (b[0] - a[0]) * t + (rng() * 2 - 1) * j
      ty = a[1] + (b[1] - a[1]) * t + (rng() * 2 - 1) * j
      tz = a[2] + (b[2] - a[2]) * t + (rng() * 2 - 1) * 0.9
    }
    target[i * 3] = tx
    target[i * 3 + 1] = ty
    target[i * 3 + 2] = tz

    // scatter: a wider, shallower, right-biased dome (the chaotic "threat" state)
    const ang = rng() * Math.PI * 2
    const rad = 1.4 + rng() * 3.3
    scatter[i * 3] = Math.cos(ang) * rad * 1.15 + 0.6
    scatter[i * 3 + 1] = Math.sin(ang) * rad * 0.6
    scatter[i * 3 + 2] = (rng() * 2 - 1) * 2.4 - 0.4

    phase[i] = rng() * Math.PI * 2
  }

  const edges = new Float32Array(EDGES.length * 2 * 3)
  EDGES.forEach((e, k) => {
    const a = anchors[e[0]]
    const b = anchors[e[1]]
    edges.set([a[0], a[1], a[2], b[0], b[1], b[2]], k * 6)
  })

  return { target, scatter, phase, isAnchor, edges, count }
}
