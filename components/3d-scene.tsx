"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera, Text3D, MeshDistortMaterial, Sphere } from "@react-three/drei"

const AnimatedSphere = ({ position, color, speed, distort, scale = 1 }) => {
  const sphereRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t) * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <Sphere ref={sphereRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

const FloatingText = ({ text, position, color, rotation = [0, 0, 0] }) => {
  const textRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(t * 0.3) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={1.2}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={position}
        rotation={rotation}
      >
        {text}
        <meshStandardMaterial color={color} envMapIntensity={1} />
      </Text3D>
    </Float>
  )
}

export function ThreeDScene() {
  const { camera } = useThree()
  const groupRef = useRef()
  const cameraRef = useRef()

  useEffect(() => {
    if (camera) {
      camera.position.set(0, 0, 15)
      camera.lookAt(0, 0, 0)
    }
  }, [camera])

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()

    // Subtle camera movement based on mouse position
    if (cameraRef.current) {
      cameraRef.current.position.x += (mouse.x * 2 - cameraRef.current.position.x) * 0.05
      cameraRef.current.position.y += (-mouse.y * 2 - cameraRef.current.position.y) * 0.05
      cameraRef.current.lookAt(0, 0, 0)
    }

    // Rotate the entire scene slightly
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.2
    }
  })

  return (
    <>
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#070b24", 10, 30]} />

      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 15]} fov={75} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

      <group ref={groupRef}>
        {/* Animated spheres with distortion */}
        <AnimatedSphere position={[-6, 2, -2]} color="#8b5cf6" speed={0.8} distort={0.4} scale={1.5} />
        <AnimatedSphere position={[6, -2, -1]} color="#ec4899" speed={1.2} distort={0.6} scale={1.2} />
        <AnimatedSphere position={[0, 4, -3]} color="#3b82f6" speed={1} distort={0.3} scale={0.8} />

        {/* Floating text */}
        <FloatingText text="DATA SCIENTIST" position={[-6, 0, 0]} color="#8b5cf6" />
        <FloatingText text="WEB DEVELOPER" position={[0, -3, 0]} color="#ec4899" />
        <FloatingText text="PYTHON DEVELOPER" position={[-4, -6, 0]} color="#3b82f6" />
      </group>

      <Environment preset="city" />
    </>
  )
}
