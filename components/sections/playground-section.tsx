"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShaderDemo } from "@/components/shader-demo"
import { Play, Pause, Settings, Zap } from "lucide-react"

type QualityLevel = "high" | "medium" | "low"
type ShaderType = "aurora" | "galaxy" | "nebula"

export function PlaygroundSection() {
  const [globalQuality, setGlobalQuality] = useState<QualityLevel>("high")
  const [isPaused, setIsPaused] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const shaderDemos = [
    {
      type: "aurora" as ShaderType,
      title: "Aurora Gradient",
      description: "Flowing aurora bands with FBM noise and organic movement patterns",
      color: "neon-cyan",
      features: ["FBM Noise", "Time Animation", "Mouse Interaction"],
    },
    {
      type: "galaxy" as ShaderType,
      title: "Particle Galaxy",
      description: "Instanced particle system creating a rotating spiral galaxy",
      color: "neon-purple",
      features: ["Instanced Rendering", "Spiral Pattern", "Additive Blending"],
    },
    {
      type: "nebula" as ShaderType,
      title: "Fluid Nebula",
      description: "Curl noise-based fluid simulation with dynamic color mixing",
      color: "neon-pink",
      features: ["Curl Noise", "Fluid Motion", "Color Mixing"],
    },
  ]

  return (
    <section id="playground" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Shader <span className="text-neon-blue">Playground</span>
            </h2>
            <div className="w-20 h-1 bg-neon-blue mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Interactive WebGL shader demonstrations showcasing GPU-accelerated graphics and real-time visual effects.
            </p>
          </motion.div>

          {/* Global Controls */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            <Card className="p-4 glass-morphism border-border/50">
              <div className="flex items-center gap-4">
                <Settings className="w-5 h-5 text-neon-blue" />
                <div className="flex gap-2">
                  <span className="text-sm text-muted-foreground">Quality:</span>
                  {(["high", "medium", "low"] as QualityLevel[]).map((quality) => (
                    <Button
                      key={quality}
                      size="sm"
                      variant={globalQuality === quality ? "default" : "outline"}
                      onClick={() => setGlobalQuality(quality)}
                      className={
                        globalQuality === quality ? "bg-neon-blue text-background" : "bg-transparent border-border/50"
                      }
                      data-cursor-hover
                    >
                      {quality.charAt(0).toUpperCase() + quality.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-4 glass-morphism border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="bg-transparent border-border/50 hover:border-neon-cyan"
                data-cursor-hover
              >
                {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                {isPaused ? "Resume All" : "Pause All"}
              </Button>
            </Card>
          </motion.div>

          {/* Shader Demos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shaderDemos.map((demo, index) => (
              <motion.div key={demo.type} variants={itemVariants}>
                <ShaderDemo
                  shaderType={demo.type}
                  title={demo.title}
                  description={demo.description}
                  color={demo.color}
                  features={demo.features}
                  quality={globalQuality}
                  isPaused={isPaused}
                  index={index}
                />
              </motion.div>
            ))}
          </div>

          {/* Performance Note */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Card className="p-6 glass-morphism border-border/50 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-neon-cyan" />
                <h3 className="text-lg font-semibold text-foreground">Performance Optimized</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All shaders are optimized for 60fps performance with automatic quality scaling, mobile fallbacks, and
                efficient GPU utilization. On mobile devices, CSS gradients provide graceful fallbacks.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
