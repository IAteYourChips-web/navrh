/**
 * The canonical node-network topology — ONE source of truth shared by the 2D
 * SVG engraving (NodeNetwork) and the 3D hero lattice. 15 hand-seeded, right-
 * biased nodes + 20 edges, in a 1000 × 620 viewBox space.
 */
export const NODES: ReadonlyArray<readonly [number, number]> = [
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

export const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [4, 8],
  [5, 9], [6, 10], [9, 10], [7, 11], [10, 11], [8, 12], [11, 12], [9, 13],
  [13, 14], [14, 12], [1, 5],
]

export const VIEWBOX = { w: 1000, h: 620 } as const
