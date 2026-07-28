"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import type { Mesh } from "three"

function Orb({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number]
  color: string
  scale: number
  speed: number
}) {
  const ref = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.25
  })
  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.4}>
      <Sphere ref={ref} args={[1, 48, 48]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.35}
          speed={1.4}
          roughness={0.35}
          metalness={0.55}
          transparent
          opacity={0.45}
        />
      </Sphere>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 2]} intensity={0.8} color="#5eead4" />
      <Orb position={[-2.2, 0.4, -2]} color="#0f766e" scale={1.1} speed={0.6} />
      <Orb position={[2.4, -0.6, -3]} color="#0369a1" scale={1.4} speed={0.45} />
      <Orb position={[0.2, 1.6, -4]} color="#164e63" scale={0.7} speed={0.8} />
    </>
  )
}

export default function HeroDepthScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
    </div>
  )
}
