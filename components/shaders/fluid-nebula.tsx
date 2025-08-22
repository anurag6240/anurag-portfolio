"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { ShaderMaterial } from "three"

const nebulaVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const nebulaFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  varying vec2 vUv;

  // Curl noise for fluid motion
  vec3 curl(vec2 p) {
    float eps = 0.1;
    float n1 = sin(p.x * 3.0 + uTime) * cos(p.y * 2.0 + uTime * 0.7);
    float n2 = sin(p.x * 2.0 + uTime * 1.1) * cos(p.y * 3.0 + uTime * 0.5);
    
    float dx = (n1 - sin((p.x + eps) * 3.0 + uTime) * cos(p.y * 2.0 + uTime * 0.7)) / eps;
    float dy = (n2 - sin(p.x * 2.0 + uTime * 1.1) * cos((p.y + eps) * 3.0 + uTime * 0.5)) / eps;
    
    return vec3(dy, -dx, 0.0);
  }

  void main() {
    vec2 uv = vUv;
    
    // Mouse interaction
    vec2 mouse = uMouse - 0.5;
    uv += mouse * 0.2;
    
    // Create fluid motion
    vec3 curlField = curl(uv * 2.0);
    uv += curlField.xy * 0.1;
    
    // Multiple layers of nebula
    float nebula1 = sin(length(uv - vec2(0.3, 0.7)) * 8.0 - uTime * 2.0) * 0.5 + 0.5;
    float nebula2 = sin(length(uv - vec2(0.7, 0.3)) * 6.0 - uTime * 1.5) * 0.5 + 0.5;
    float nebula3 = sin(length(uv - vec2(0.5, 0.5)) * 10.0 - uTime * 2.5) * 0.5 + 0.5;
    
    // Combine layers
    float combined = (nebula1 + nebula2 + nebula3) / 3.0;
    
    // Color palette
    vec3 color1 = vec3(0.2, 0.4, 1.0); // Deep blue
    vec3 color2 = vec3(0.8, 0.2, 0.8); // Purple
    vec3 color3 = vec3(0.4, 0.8, 0.9); // Cyan
    
    vec3 finalColor = mix(color1, color2, combined);
    finalColor = mix(finalColor, color3, sin(uTime + combined * 3.14159) * 0.5 + 0.5);
    
    // Distance fade
    float dist = length(uv - 0.5);
    float fade = 1.0 - smoothstep(0.3, 0.8, dist);
    
    gl_FragColor = vec4(finalColor * uIntensity, combined * fade * 0.6);
  }
`

interface FluidNebulaProps {
  quality: "high" | "medium" | "low"
}

export function FluidNebula({ quality }: FluidNebulaProps) {
  const meshRef = useRef<any>()
  const materialRef = useRef<ShaderMaterial>()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value = [(state.mouse.x + 1) / 2, (state.mouse.y + 1) / 2]
    }
  })

  const intensity = quality === "high" ? 1.2 : quality === "medium" ? 1.0 : 0.8

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: [0.5, 0.5] },
          uIntensity: { value: intensity },
        }}
        transparent
      />
    </mesh>
  )
}
