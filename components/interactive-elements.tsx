"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Palette, Zap, Eye, Cpu } from "lucide-react"

export function InteractiveElements() {
  const [intensity, setIntensity] = useState([75])
  const [speed, setSpeed] = useState([50])
  const [enableBloom, setEnableBloom] = useState(true)
  const [enableVignette, setEnableVignette] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-md mx-auto">
      <Card className="p-6 glass-morphism border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-neon-cyan" />
          Visual Controls
        </h3>

        <div className="space-y-6">
          {/* Intensity Control */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-foreground">Intensity</label>
              <span className="text-sm text-muted-foreground">{intensity[0]}%</span>
            </div>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              max={100}
              step={1}
              className="w-full"
              data-cursor-hover
            />
          </motion.div>

          {/* Speed Control */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-foreground">Animation Speed</label>
              <span className="text-sm text-muted-foreground">{speed[0]}%</span>
            </div>
            <Slider value={speed} onValueChange={setSpeed} max={100} step={1} className="w-full" data-cursor-hover />
          </motion.div>

          {/* Post-processing Effects */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Eye className="w-4 h-4 text-neon-purple" />
              Post Effects
            </h4>

            <div className="flex justify-between items-center">
              <label className="text-sm text-foreground">Bloom Effect</label>
              <Switch checked={enableBloom} onCheckedChange={setEnableBloom} data-cursor-hover />
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm text-foreground">Vignette</label>
              <Switch checked={enableVignette} onCheckedChange={setEnableVignette} data-cursor-hover />
            </div>
          </motion.div>
        </div>
      </Card>

      {/* Performance Monitor */}
      <Card className="p-6 glass-morphism border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-neon-pink" />
          Performance
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">FPS</span>
            <span className="text-sm font-medium text-neon-cyan">60</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">GPU Usage</span>
            <span className="text-sm font-medium text-neon-purple">45%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Memory</span>
            <span className="text-sm font-medium text-neon-pink">128MB</span>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="bg-transparent border-neon-cyan/30 hover:border-neon-cyan"
          data-cursor-hover
        >
          <Zap className="w-4 h-4 mr-2" />
          Optimize
        </Button>
        <Button
          variant="outline"
          className="bg-transparent border-neon-purple/30 hover:border-neon-purple"
          data-cursor-hover
        >
          Reset
        </Button>
      </div>
    </motion.div>
  )
}
