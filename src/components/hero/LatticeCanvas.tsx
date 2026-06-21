import { Canvas } from '@react-three/fiber'
import Lattice from './Lattice'

/**
 * The code-split boundary: importing this module pulls in three +
 * @react-three/fiber, so it must only ever be reached through a lazy import.
 * Pauses rendering (frameloop "never") when the hero is off-screen.
 */
export default function LatticeCanvas({
  count = 2000,
  active = true,
  onReady,
}: {
  count?: number
  active?: boolean
  onReady?: () => void
}) {
  return (
    <Canvas
      style={{ pointerEvents: 'none' }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 4], fov: 45 }}
      frameloop={active ? 'always' : 'never'}
      onCreated={() => onReady?.()}
    >
      <Lattice count={count} />
    </Canvas>
  )
}
