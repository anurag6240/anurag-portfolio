"use client"

import { motion, easeInOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { MapPin, GraduationCap, Code, Calendar } from "lucide-react"

export function AboutSection() {
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
        ease: easeInOut,
      },
    },
  }

  const facts = [
    {
      icon: MapPin,
      label: "Location",
      value: "Vadodara, India",
      color: "text-neon-cyan",
    },
    {
      icon: Code,
      label: "Focus",
      value: "Full-Stack",
      color: "text-neon-purple",
    },
    {
      icon: GraduationCap,
      label: "University",
      value: "Parul University",
      color: "text-neon-pink",
    },
    {
      icon: Calendar,
      label: "Availability",
      value: "Available",
      color: "text-neon-blue",
    },
  ]

  const handleResumeDownload = () => {
    // Use Google Drive direct-download URL for the provided file ID so the browser opens/downloads the PDF.
    const driveFileId = "1gfV2WySrNdgukPUq6o2A3e_k3YCt3OMd";
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;
    window.open(downloadUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="about" className="py-20 px-4 relative">
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
              About <span className="text-neon-purple">Me</span>
            </h2>
            <div className="w-20 h-1 bg-neon-purple mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Self-driven Computer Science undergraduate with experience in building scalable full-stack applications.
                Proficient in React, TypeScript, Node.js, MongoDB, and REST APIs.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Skilled at crafting responsive UIs, optimizing backend logic, and collaborating within agile teams.
                Currently pursuing B.Tech in Computer Science & Engineering at Parul University (2022–2026).
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Seeking challenging software development opportunities to contribute to impactful products and grow
                professionally. Experienced in building AI-powered applications, cybersecurity tools, and browser
                extensions.
              </p>

              
            </motion.div>

            {/* Quick Facts Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facts.map((fact, index) => (
                <motion.div key={fact.label} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group">
                  <Card className="p-6 glass-morphism border-border/50 hover:border-neon-cyan/30 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg bg-background/50 ${fact.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <fact.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{fact.label}</p>
                        <p className="font-semibold text-foreground">{fact.value}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
