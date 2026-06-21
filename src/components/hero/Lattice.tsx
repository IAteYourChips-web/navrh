import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildLattice } from './latticeGeometry'
import { heroState } from './heroState'

const vertexShader = /* glsl */ `
  attribute vec3 aScatter;
  attribute float aPhase;
  attribute float aIsAnchor;
  uniform float uTime;
  uniform float uProgress;
  uniform float uPx;
  uniform vec2 uPointer;
  varying float vProg;
  void main() {
    float p = smoothstep(0.0, 1.0, uProgress);
    vec3 pos = mix(aScatter, position, p);
    float wob = (1.0 - p) * 0.06;
    pos += vec3(sin(uTime * 0.25 + aPhase), cos(uTime * 0.21 + aPhase * 1.3), sin(uTime * 0.18 + aPhase)) * wob;
    pos.xy += uPointer * (1.0 - p) * 0.05;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float size = aIsAnchor > 0.5 ? 7.0 : 3.0;
    gl_PointSize = size * uPx * (3.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vProg = p;
  }
`

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorThreat;
  uniform vec3 uColorTrust;
  varying float vProg;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = 1.0 - smoothstep(0.42, 0.5, d);
    if (disc <= 0.0) discard;
    float core = 1.0 - smoothstep(0.0, 0.22, d);
    vec3 col = mix(uColorThreat, uColorTrust, vProg);
    float a = disc * mix(0.45, 0.9, vProg);
    float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
    gl_FragColor = vec4(col + core * 0.35 + dither, a);
  }
`

export default function Lattice({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)
  const lineMat = useRef<THREE.LineBasicMaterial>(null)
  const progress = useRef(0)
  const { gl } = useThree()
  const data = useMemo(() => buildLattice(count), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPx: { value: Math.min(gl.getPixelRatio(), 1.75) },
      uColorThreat: { value: new THREE.Color('#3F63BF') },
      uColorTrust: { value: new THREE.Color('#5B8CFF') },
    }),
    [gl],
  )

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05)
    // Gently assemble scatter -> resolved lattice once on load, then hold.
    progress.current += (1 - progress.current) * Math.min(1, d * 0.55)
    const p = progress.current
    const m = mat.current
    if (m) {
      m.uniforms.uTime.value += d
      m.uniforms.uProgress.value = p
      const v = m.uniforms.uPointer.value as THREE.Vector2
      v.x += (heroState.pointerX - v.x) * 0.06
      v.y += (heroState.pointerY - v.y) * 0.06
    }
    if (lineMat.current) {
      lineMat.current.opacity = 0.18 * THREE.MathUtils.smoothstep(p, 0.5, 1.0)
    }
    const g = group.current
    if (g) {
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -heroState.pointerY * 0.06, 0.05)
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, heroState.pointerX * 0.06, 0.05)
    }
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.target, 3]} />
          <bufferAttribute attach="attributes-aScatter" args={[data.scatter, 3]} />
          <bufferAttribute attach="attributes-aPhase" args={[data.phase, 1]} />
          <bufferAttribute attach="attributes-aIsAnchor" args={[data.isAnchor, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMat}
          color="#7BA4FF"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}
