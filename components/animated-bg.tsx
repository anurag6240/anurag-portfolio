"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // Quality control: off | low | med | high
  const stored = typeof window !== "undefined" ? localStorage.getItem("animatedBgQuality") : null
  const quality = stored || "med"

    // Basic low-power detection
    const connection = (navigator as any).connection
    const saveData = connection && typeof connection.saveData === "boolean" ? connection.saveData : false
    const deviceMemory = (navigator as any).deviceMemory || 4
    const hwConcurrency = navigator.hardwareConcurrency || 4

    // Determine effective quality when device requests low-power or save-data
    const effectiveQuality = ((): "off" | "low" | "med" | "high" => {
      if (saveData) return "off"
      if (deviceMemory < 1 || hwConcurrency <= 2) return "low"
      if (quality === "high") return "high"
      if (quality === "low") return "low"
      return "med"
    })()

    // Map quality to rendering parameters
    const settings = {
      off: { lines: 0, targetFPS: 0, alphaScale: 0, maxShadowMult: 0 },
      low: { lines: 6, targetFPS: 15, alphaScale: 0.3, maxShadowMult: 2 },
      med: { lines: 12, targetFPS: 30, alphaScale: 0.5, maxShadowMult: 3 },
      high: { lines: 30, targetFPS: 45, alphaScale: 0.8, maxShadowMult: 4 },
    }[effectiveQuality]

    // If disabled, don't start the heavy loop
    if (settings.lines === 0 || settings.targetFPS === 0) {
      // still listen for resize to keep canvas full-size
      const handleResize = () => {
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = width
        canvas.height = height
      }
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    // Create lines based on computed settings
    const lines = Array.from({ length: settings.lines }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 60 + Math.random() * 120,
      speed: 0.4 + Math.random() * 1.8,
      angle: Math.random() * Math.PI * 2,
      width: 1 + Math.random() * 3,
      opacity: 0.04 + Math.random() * 0.18,
      color: `hsl(${170 + Math.random() * 80}, 85%, ${40 + Math.random() * 25}%)`,
    }))

    const targetFPS = settings.targetFPS
    const frameDuration = 1000 / targetFPS
    let lastFrameTime = performance.now()
    let rafId: number | null = null

    function draw(now?: number) {
      if (!ctx) return
      const ts = now ?? performance.now()
      const delta = ts - lastFrameTime
      if (delta < frameDuration) {
        rafId = requestAnimationFrame(draw)
        return
      }
      lastFrameTime = ts

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = "source-over"
      for (const line of lines) {
        ctx.save()
        ctx.globalAlpha = (line.opacity || 0.05) * settings.alphaScale
        ctx.strokeStyle = line.color
        ctx.lineWidth = line.width
        ctx.shadowColor = line.color
        ctx.shadowBlur = Math.max(1, line.width * settings.maxShadowMult)
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        )
        ctx.stroke()
        ctx.restore()

        // Animate
        line.x += Math.cos(line.angle) * line.speed
        line.y += Math.sin(line.angle) * line.speed
        // Wrap around
        if (line.x > width) line.x = 0
        if (line.x < 0) line.x = width
        if (line.y > height) line.y = 0
        if (line.y < 0) line.y = height
      }

      if (!document.hidden) rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener("resize", handleResize)
    const handleVisibility = () => {
      if (document.hidden) {
        if (typeof rafId === "number" && rafId !== null) cancelAnimationFrame(rafId)
      } else {
        lastFrameTime = performance.now()
        rafId = requestAnimationFrame(draw)
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)
    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibility)
      if (typeof rafId === "number" && rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[5]"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 5,
        }}
      />
      {/* Quality control placeholder: users can toggle via localStorage key `animatedBgQuality` = off|low|med|high */}
    </>
  )
}
