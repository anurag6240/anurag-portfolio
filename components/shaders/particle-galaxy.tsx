"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

interface ParticleGalaxyProps {
  quality: "high" | "medium" | "low"
}

export function ParticleGalaxy({ quality }: ParticleGalaxyProps) {
  const pointsRef = useRef<any>()

  const particleCount = quality === "high" ? 2000 : quality === "medium" ? 1000 : 500

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Create spiral galaxy pattern
      const radius = Math.random() * 4
      const angle = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 0.5

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius

      // Color based on distance from center
      const distance = radius / 4
      colors[i * 3] = 0.4 + distance * 0.6 // R
      colors[i * 3 + 1] = 0.8 - distance * 0.3 // G
      colors[i * 3 + 2] = 1.0 // B
    }

    return [positions, colors]
  }, [particleCount])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={quality === "high" ? 0.02 : 0.03}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}
