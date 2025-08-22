"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { AuroraShader } from "./aurora-shader"
import { ParticleGalaxy } from "./particle-galaxy"
import { FluidNebula } from "./fluid-nebula"

type ShaderType = "aurora" | "galaxy" | "nebula"
type QualityLevel = "high" | "medium" | "low"

interface ShaderBackgroundProps {
  shaderType?: ShaderType
  quality?: QualityLevel
  className?: string
}

export function ShaderBackground({ shaderType = "aurora", quality = "high", className = "" }: ShaderBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isLowPower, setIsLowPower] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)

    const checkDevice = () => {
      const isMobileDevice =
        window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      const isLowPowerDevice =
        navigator.hardwareConcurrency <= 4 ||
        (navigator as any).deviceMemory <= 4 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches

      setIsMobile(isMobileDevice)
      setIsLowPower(isLowPowerDevice)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener("resize", checkDevice)
      observer.disconnect()
    }
  }, [])

  if (!mounted || isMobile || quality === "low" || isLowPower) {
    const gradientMap = {
      aurora: `
        radial-gradient(circle at 20% 80%, rgba(120, 219, 255, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
      `,
      galaxy: `
        radial-gradient(ellipse at center, rgba(147, 51, 234, 0.3) 0%, transparent 70%),
        conic-gradient(from 0deg at 50% 50%, rgba(120, 219, 255, 0.2), rgba(236, 72, 153, 0.2), rgba(120, 219, 255, 0.2))
      `,
      nebula: `
        radial-gradient(circle at 30% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 60%),
        linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(120, 219, 255, 0.1))
      `,
    }

    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 ${className}`}
        style={{
          background: gradientMap[shaderType],
          animation: isMobile ? "none" : "pulse 8s ease-in-out infinite alternate",
        }}
      />
    )
  }

  const getPixelRatio = () => {
    const baseRatio = Math.min(window.devicePixelRatio, 2)
    switch (quality) {
      case "high":
        return baseRatio
      case "medium":
        return Math.min(baseRatio, 1.5)
      case "low":
        return 1
      default:
        return baseRatio
    }
  }

  const dpr = getPixelRatio()

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      {isInView && (
        <Canvas
          ref={canvasRef}
          dpr={dpr}
          camera={{ position: [0, 0, 1] }}
          gl={{
            antialias: quality === "high",
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: true,
            preserveDrawingBuffer: false,
          }}
          frameloop="always"
          resize={{ scroll: false }}
        >
          <Suspense fallback={null}>
            {shaderType === "aurora" && <AuroraShader quality={quality} />}
            {shaderType === "galaxy" && <ParticleGalaxy quality={quality} />}
            {shaderType === "nebula" && <FluidNebula quality={quality} />}

            {quality !== "low" && !isLowPower && (
              <EffectComposer>
                <Bloom intensity={quality === "high" ? 0.2 : 0.1} luminanceThreshold={0.9} luminanceSmoothing={0.9} />
                <Vignette offset={quality === "high" ? 0.1 : 0.15} darkness={quality === "high" ? 0.1 : 0.05} />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
