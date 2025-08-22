"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShaderBackground } from "@/components/shaders/shader-background"
import { Play, Pause, Maximize2, Code } from "lucide-react"

type QualityLevel = "high" | "medium" | "low"
type ShaderType = "aurora" | "galaxy" | "nebula"

interface ShaderDemoProps {
  shaderType: ShaderType
  title: string
  description: string
  color: string
  features: string[]
  quality: QualityLevel
  isPaused: boolean
  index: number
}

export function ShaderDemo({
  shaderType,
  title,
  description,
  color,
  features,
  quality,
  isPaused,
  index,
}: ShaderDemoProps) {
  const [isLocalPaused, setIsLocalPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    setIsHovered(false)
  }

  const isShaderPaused = isPaused || isLocalPaused

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      data-cursor-hover
    >
      <Card className="overflow-hidden glass-morphism border-border/50 hover:border-neon-cyan/30 transition-all duration-500 h-full">
        {/* Shader Preview */}
        <div className="relative h-48 overflow-hidden">
          {!isShaderPaused && <ShaderBackground shaderType={shaderType} quality={quality} className="opacity-80" />}

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="outline"
              className="bg-background/80 backdrop-blur-sm border-neon-cyan/30"
              onClick={(e) => {
                e.stopPropagation()
                setIsLocalPaused(!isLocalPaused)
              }}
              data-cursor-hover
            >
              {isShaderPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-background/80 backdrop-blur-sm border-neon-cyan/30"
              data-cursor-hover
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Shader Type Badge */}
          <div className="absolute bottom-4 left-4">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full bg-${color}/20 text-${color} border border-${color}/30`}
              style={{
                backgroundColor: `var(--color-${color})/0.2`,
                color: `var(--color-${color})`,
                borderColor: `var(--color-${color})/0.3`,
              }}
            >
              {shaderType.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Demo Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>

          {/* Features */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Features:</h4>
            <div className="flex flex-wrap gap-2">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-1 text-xs bg-background/50 text-muted-foreground rounded-md border border-border/50"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button
            size="sm"
            className={`w-full bg-${color} text-background hover:bg-${color}/90`}
            data-cursor-hover
            style={{
              backgroundColor: `var(--color-${color})`,
            }}
          >
            <Code className="w-4 h-4 mr-2" />
            View Source
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
