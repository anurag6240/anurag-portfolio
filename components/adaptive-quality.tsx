"use client"

import { useEffect, useState } from "react"

type QualityLevel = "high" | "medium" | "low"

interface AdaptiveQualityConfig {
  quality: QualityLevel
  particleCount: number
  enablePostProcessing: boolean
  targetFPS: number
}

export function useAdaptiveQuality() {
  const [config, setConfig] = useState<AdaptiveQualityConfig>({
    quality: "high",
    particleCount: 2000,
    enablePostProcessing: true,
    targetFPS: 60,
  })

  const [currentFPS, setCurrentFPS] = useState(60)
  const [frameCount, setFrameCount] = useState(0)
  const [lastTime, setLastTime] = useState(performance.now())

  useEffect(() => {
    let animationId: number

    const measureFPS = () => {
      const currentTime = performance.now()
      setFrameCount((prev) => prev + 1)

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setCurrentFPS(fps)
        setFrameCount(0)
        setLastTime(currentTime)

        // Adaptive quality adjustment
        if (fps < 30 && config.quality !== "low") {
          setConfig((prev) => ({
            ...prev,
            quality: "low",
            particleCount: Math.floor(prev.particleCount * 0.3),
            enablePostProcessing: false,
            targetFPS: 30,
          }))
        } else if (fps < 45 && config.quality === "high") {
          setConfig((prev) => ({
            ...prev,
            quality: "medium",
            particleCount: Math.floor(prev.particleCount * 0.6),
            enablePostProcessing: true,
            targetFPS: 45,
          }))
        } else if (fps > 55 && config.quality !== "high") {
          setConfig((prev) => ({
            ...prev,
            quality: "high",
            particleCount: 2000,
            enablePostProcessing: true,
            targetFPS: 60,
          }))
        }
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    measureFPS()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [config.quality, frameCount, lastTime])

  // Device-based initial quality
  useEffect(() => {
    const setInitialQuality = () => {
      const isMobile = window.innerWidth < 768
      const isLowEnd = navigator.hardwareConcurrency <= 4
      const hasLimitedMemory = (navigator as any).deviceMemory <= 4

      if (isMobile || isLowEnd || hasLimitedMemory) {
        setConfig((prev) => ({
          ...prev,
          quality: "medium",
          particleCount: 1000,
          enablePostProcessing: false,
        }))
      }
    }

    setInitialQuality()
  }, [])

  return { config, currentFPS }
}
