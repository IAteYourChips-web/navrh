/**
 * Tiny mutable bridge between the scroll choreography (which writes `progress`)
 * and the WebGL render loop (which reads it). A plain object, not React state,
 * so neither side triggers re-renders. `progress` 0 = threat/scatter, 1 = trust/lattice.
 */
export const heroState = {
  progress: 0,
  pointerX: 0,
  pointerY: 0,
}
