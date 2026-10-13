import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Html, Lightformer, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { thaliParts } from '../data/menu'

/**
 * A stylised, procedurally modelled Assamese thali (plate, bowls, rice, papad).
 * It is an illustration built from primitives, NOT a scan of the restaurant's food.
 * Replace with a real GLB (useGLTF) if/when an optimised model is available.
 */

const bowlColors: Record<string, string> = {
  khar: '#8a5a2b',
  tenga: '#d9822b',
  dal: '#e0b43c',
  pitika: '#efe4c8',
  xaak: '#2f5a2a',
  chutney: '#b3361f',
}

const plateGeo = (() => {
  const pts = [
    [0.001, 0],
    [1.9, 0],
    [2.1, 0.05],
    [2.22, 0.17],
    [2.17, 0.18],
    [2.03, 0.08],
    [0.001, 0.07],
  ].map(([x, y]) => new THREE.Vector2(x, y))
  return new THREE.LatheGeometry(pts, 72)
})()

const bowlGeo = (() => {
  const pts = [
    [0.001, 0],
    [0.28, 0],
    [0.33, 0.06],
    [0.46, 0.27],
    [0.47, 0.29],
    [0.43, 0.29],
    [0.3, 0.1],
    [0.001, 0.1],
  ].map(([x, y]) => new THREE.Vector2(x, y))
  return new THREE.LatheGeometry(pts, 40)
})()

const brass = { color: '#c9a24f', metalness: 0.85, roughness: 0.32, envMapIntensity: 1.3 }

function Thali({
  active,
  onSelect,
  progress,
  reduced,
}: {
  active: string | null
  onSelect: (id: string) => void
  progress: MutableRefObject<number>
  reduced: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const bowls = useMemo(() => thaliParts.filter((p) => p.id !== 'rice'), [])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const target = reduced ? 0 : (progress.current - 0.5) * 1.1
    g.rotation.y += (target - g.rotation.y) * 0.06
  })

  return (
    <group ref={group}>
      {/* banana leaf */}
      <mesh position={[0, -0.03, 0]} receiveShadow>
        <cylinderGeometry args={[2.75, 2.75, 0.03, 64]} />
        <meshStandardMaterial color="#2f6b3a" roughness={0.85} />
      </mesh>
      {/* brass plate */}
      <mesh geometry={plateGeo} castShadow receiveShadow>
        <meshStandardMaterial {...brass} side={THREE.DoubleSide} />
      </mesh>
      {/* rice */}
      <mesh position={[-0.2, 0.07, 0.1]} scale={[1, 0.62, 1]} castShadow>
        <sphereGeometry args={[0.58, 40, 24]} />
        <meshStandardMaterial color="#f4eddc" roughness={0.92} />
      </mesh>
      {/* papad */}
      <mesh position={[0.3, 0.42, -0.4]} rotation={[0.9, 0.4, 0.2]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.025, 36]} />
        <meshStandardMaterial color="#d8b27a" roughness={0.8} />
      </mesh>
      {/* bowls */}
      {bowls.map((p) => (
        <group key={p.id} position={[p.position[0], 0.07, p.position[2]]}>
          <mesh geometry={bowlGeo} castShadow receiveShadow>
            <meshStandardMaterial {...brass} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, p.id === 'pitika' ? 0.2 : 0.18, 0]} scale={p.id === 'pitika' ? [1, 1.6, 1] : 1}>
            {p.id === 'pitika' ? (
              <sphereGeometry args={[0.28, 24, 16]} />
            ) : (
              <cylinderGeometry args={[0.38, 0.38, 0.03, 32]} />
            )}
            <meshStandardMaterial color={bowlColors[p.id]} roughness={0.55} />
          </mesh>
        </group>
      ))}
      {/* hotspots */}
      {thaliParts.map((p) => {
        const on = active === p.id
        return (
          <Html key={p.id} position={p.position} center zIndexRange={[20, 0]}>
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              aria-label={`${p.name}: show details`}
              aria-pressed={on}
              className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-semibold shadow-lg transition-all ${
                on
                  ? 'scale-125 border-ivory bg-terracotta text-ivory'
                  : 'border-ivory/80 bg-midnight/70 text-ivory hover:scale-110 hover:bg-terracotta'
              }`}
            >
              {thaliParts.indexOf(p) + 1}
            </button>
          </Html>
        )
      })}
    </group>
  )
}

function Controls({ resetKey }: { resetKey: number }) {
  const ref = useRef<React.ComponentRef<typeof OrbitControls>>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    c.saveState()
    // Allow vertical page scroll on touch while horizontal drags rotate the dish.
    if (c.domElement) c.domElement.style.touchAction = 'pan-y'
  }, [])
  useEffect(() => {
    if (resetKey > 0) ref.current?.reset()
  }, [resetKey])
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableDamping
      minDistance={4.2}
      maxDistance={9}
      maxPolarAngle={Math.PI / 2.15}
      minPolarAngle={0.35}
    />
  )
}

export interface FoodScene3DProps {
  active: string | null
  onSelect: (id: string) => void
  resetKey: number
  progress: MutableRefObject<number>
  reduced: boolean
}

export default function FoodScene3D({ active, onSelect, resetKey, progress, reduced }: FoodScene3DProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 4.2, 5.4], fov: 38 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      <color attach="background" args={['#0f1d16']} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 7, 3]}
        intensity={2.2}
        color="#ffe2b0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <pointLight position={[-4, 2, -3]} intensity={12} color="#b5532f" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, -3]} scale={[10, 3, 1]} color="#ffe9c4" />
        <Lightformer form="rect" intensity={1.2} position={[-5, 2, 3]} scale={[4, 4, 1]} color="#ffffff" />
      </Environment>
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.08} floatIntensity={reduced ? 0 : 0.35} floatingRange={[-0.05, 0.08]}>
        <Thali active={active} onSelect={onSelect} progress={progress} reduced={reduced} />
      </Float>
      <ContactShadows position={[0, -0.12, 0]} opacity={0.55} scale={9} blur={2.6} far={2.5} />
      <Controls resetKey={resetKey} />
    </Canvas>
  )
}
