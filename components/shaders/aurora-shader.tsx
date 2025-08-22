"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { ShaderMaterial } from "three"

const auroraVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const auroraFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  varying vec2 vUv;

  // Optimized noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    
    for(int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }

  void main() {
    vec2 uv = vUv;
    
    // Mouse interaction
    vec2 mouse = uMouse * 0.5;
    uv += mouse * 0.1;
    
    // Time-based animation
    float time = uTime * 0.3;
    
    // Create aurora bands
    float band1 = sin(uv.y * 3.0 + time) * 0.5 + 0.5;
    float band2 = sin(uv.y * 5.0 + time * 1.3) * 0.5 + 0.5;
    float band3 = sin(uv.y * 7.0 + time * 0.8) * 0.5 + 0.5;
    
    // Add noise for organic movement
    float n = fbm(uv * 2.0 + time * 0.5);
    
    // Combine bands with noise
    float aurora = (band1 + band2 + band3) * n;
    
    // Color gradient
    vec3 color1 = vec3(0.4, 0.8, 1.0); // Cyan
    vec3 color2 = vec3(0.8, 0.4, 1.0); // Purple
    vec3 color3 = vec3(1.0, 0.6, 0.8); // Pink
    
    vec3 finalColor = mix(color1, color2, uv.y);
    finalColor = mix(finalColor, color3, aurora * 0.3);
    
    // Apply intensity and fade edges
    float fade = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x);
    fade *= smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);
    
    gl_FragColor = vec4(finalColor * aurora * uIntensity * fade, aurora * fade * 0.8);
  }
`

interface AuroraShaderProps {
  quality: "high" | "medium" | "low"
}

export function AuroraShader({ quality }: AuroraShaderProps) {
  const meshRef = useRef<any>()
  const materialRef = useRef<ShaderMaterial>()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value = [(state.mouse.x + 1) / 2, (state.mouse.y + 1) / 2]
    }
  })

  const intensity = quality === "high" ? 1.0 : quality === "medium" ? 0.8 : 0.6

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={auroraVertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: [0, 0] },
          uIntensity: { value: intensity },
        }}
        transparent
      />
    </mesh>
  )
}
