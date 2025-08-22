"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Smartphone, Monitor, Zap } from "lucide-react"

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  deviceType: "mobile" | "tablet" | "desktop"
  connectionSpeed: "slow" | "fast"
  batteryLevel?: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    deviceType: "desktop",
    connectionSpeed: "fast",
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const detectDevice = (): "mobile" | "tablet" | "desktop" => {
      const width = window.innerWidth
      if (width < 768) return "mobile"
      if (width < 1024) return "tablet"
      return "desktop"
    }

    const detectConnection = (): "slow" | "fast" => {
      const connection = (navigator as any).connection
      if (connection) {
        return connection.effectiveType === "4g" ? "fast" : "slow"
      }
      return "fast"
    }

    const getBatteryLevel = async (): Promise<number | undefined> => {
      try {
        const battery = await (navigator as any).getBattery?.()
        return battery ? Math.round(battery.level * 100) : undefined
      } catch {
        return undefined
      }
    }

    const updateMetrics = async () => {
      const currentTime = performance.now()
      frameCount++

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        const memoryInfo = (performance as any).memory
        const memoryUsage = memoryInfo ? Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) : 0

        const batteryLevel = await getBatteryLevel()

        setMetrics({
          fps: Math.min(fps, 60),
          memoryUsage,
          deviceType: detectDevice(),
          connectionSpeed: detectConnection(),
          batteryLevel,
        })

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(updateMetrics)
    }

    updateMetrics()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const getPerformanceColor = (fps: number) => {
    if (fps >= 55) return "text-green-400"
    if (fps >= 30) return "text-yellow-400"
    return "text-red-400"
  }

  const getDeviceIcon = () => {
    switch (metrics.deviceType) {
      case "mobile":
        return Smartphone
      case "tablet":
        return Smartphone
      default:
        return Monitor
    }
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 p-2 glass-morphism border-border/50 rounded-lg hover:border-neon-cyan/30 transition-all duration-300 z-40"
        data-cursor-hover
      >
        <Activity className="w-4 h-4 text-muted-foreground" />
      </button>
    )
  }

  const DeviceIcon = getDeviceIcon()

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <Card className="p-4 glass-morphism border-border/50 min-w-48">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Performance</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-cursor-hover
          >
            ×
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">FPS</span>
            <span className={`font-medium ${getPerformanceColor(metrics.fps)}`}>{metrics.fps}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Memory</span>
            <span className="font-medium text-foreground">{metrics.memoryUsage}MB</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Device</span>
            <div className="flex items-center gap-1">
              <DeviceIcon className="w-3 h-3 text-muted-foreground" />
              <span className="font-medium text-foreground capitalize">{metrics.deviceType}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Connection</span>
            <Badge variant={metrics.connectionSpeed === "fast" ? "default" : "secondary"} className="text-xs">
              {metrics.connectionSpeed}
            </Badge>
          </div>

          {metrics.batteryLevel && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Battery</span>
              <span className="font-medium text-foreground">{metrics.batteryLevel}%</span>
            </div>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-border/50">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Zap className="w-3 h-3" />
            <span>Auto-optimized</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
