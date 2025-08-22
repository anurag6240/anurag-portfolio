"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface MobileOptimizations {
  reducedMotion: boolean
  touchDevice: boolean
  lowPowerMode: boolean
  smallScreen: boolean
}

export function useMobileOptimizations() {
  const [optimizations, setOptimizations] = useState<MobileOptimizations>({
    reducedMotion: false,
    touchDevice: false,
    lowPowerMode: false,
    smallScreen: false,
  })

  useEffect(() => {
    const checkOptimizations = () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const touchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
      const smallScreen = window.innerWidth < 768

      // Detect low power mode (iOS Safari)
      let lowPowerMode = false
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl")
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            lowPowerMode = renderer.includes("Apple") && renderer.includes("GPU")
          }
        }
      } catch {
        // Fallback detection
        lowPowerMode = /iPhone|iPad/.test(navigator.userAgent) && window.devicePixelRatio < 2
      }

      setOptimizations({
        reducedMotion,
        touchDevice,
        lowPowerMode,
        smallScreen,
      })
    }

    checkOptimizations()
    window.addEventListener("resize", checkOptimizations)

    return () => {
      window.removeEventListener("resize", checkOptimizations)
    }
  }, [])

  return optimizations
}

export function MobileOptimizationProvider({ children }: { children: React.ReactNode }) {
  const optimizations = useMobileOptimizations()

  useEffect(() => {
    // Apply CSS custom properties for mobile optimizations
    const root = document.documentElement

    if (optimizations.reducedMotion) {
      root.style.setProperty("--animation-duration", "0s")
      root.style.setProperty("--transition-duration", "0s")
    } else {
      root.style.setProperty("--animation-duration", "1s")
      root.style.setProperty("--transition-duration", "0.3s")
    }

    if (optimizations.touchDevice) {
      root.classList.add("touch-device")
    }

    if (optimizations.lowPowerMode) {
      root.classList.add("low-power-mode")
    }

    if (optimizations.smallScreen) {
      root.classList.add("small-screen")
    }
  }, [optimizations])

  return <>{children}</>
}
