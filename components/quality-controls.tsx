"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play, Settings } from "lucide-react"

type QualityLevel = "high" | "medium" | "low"
type ShaderType = "aurora" | "galaxy" | "nebula"

interface QualityControlsProps {
  quality: QualityLevel
  onQualityChange: (quality: QualityLevel) => void
  shaderType: ShaderType
  onShaderChange: (type: ShaderType) => void
  isPaused: boolean
  onPauseToggle: () => void
}

export function QualityControls({
  quality,
  onQualityChange,
  shaderType,
  onShaderChange,
  isPaused,
  onPauseToggle,
}: QualityControlsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-40">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-morphism border-neon-cyan/30 hover:border-neon-cyan"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 p-4 glass-morphism rounded-lg border border-neon-cyan/30 min-w-48">
          <div className="space-y-4">
            {/* Quality Controls */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Quality</label>
              <div className="flex gap-1">
                {(["high", "medium", "low"] as QualityLevel[]).map((q) => (
                  <Button
                    key={q}
                    variant={quality === q ? "default" : "outline"}
                    size="sm"
                    onClick={() => onQualityChange(q)}
                    className={quality === q ? "bg-neon-cyan text-background" : ""}
                  >
                    {q.charAt(0).toUpperCase() + q.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Shader Type Controls */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Shader</label>
              <div className="space-y-1">
                {(["aurora", "galaxy", "nebula"] as ShaderType[]).map((type) => (
                  <Button
                    key={type}
                    variant={shaderType === type ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onShaderChange(type)}
                    className={`w-full justify-start ${shaderType === type ? "bg-neon-cyan text-background" : ""}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Pause Control */}
            <Button variant="outline" size="sm" onClick={onPauseToggle} className="w-full bg-transparent">
              {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
              {isPaused ? "Resume" : "Pause"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
