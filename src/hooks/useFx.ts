import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useFinePointer } from './useMediaQuery'

export interface FxLevel {
  /** User asked for reduced motion — disable all non-essential animation. */
  reduce: boolean
  /** Precise pointer (desktop/mouse) — enables cursor-reactive accents. */
  fine: boolean
  /** Safe to mount the heavy WebGL hero (desktop, capable hardware, motion ok). */
  allowHeavy: boolean
}

/**
 * Single gate for "how much motion/3D is appropriate here". The heavy WebGL
 * scene only mounts on a capable desktop (WebGL2, enough cores/memory, no
 * data-saver) with motion allowed; everything else gets the static fallback.
 * Capability is decided on idle so it never blocks first paint — `capable`
 * starts false, so the 3D is never on the critical path.
 */
export function useFx(): FxLevel {
  const reduce = useReducedMotion() ?? false
  const fine = useFinePointer()
  const [capable, setCapable] = useState(false)

  useEffect(() => {
    const compute = () => {
      const nav = navigator as Navigator & {
        deviceMemory?: number
        connection?: { saveData?: boolean }
      }
      const cores = nav.hardwareConcurrency ?? 4
      const mem = nav.deviceMemory ?? 4
      const saveData = nav.connection?.saveData === true
      const webgl2 = (() => {
        try {
          return !!document.createElement('canvas').getContext('webgl2')
        } catch {
          return false
        }
      })()
      setCapable(cores >= 4 && mem >= 4 && webgl2 && !saveData)
    }

    const ric = window.requestIdleCallback
    if (typeof ric === 'function') {
      const id = ric(compute, { timeout: 400 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(compute, 200)
    return () => window.clearTimeout(id)
  }, [])

  return { reduce, fine, allowHeavy: !reduce && fine && capable }
}
