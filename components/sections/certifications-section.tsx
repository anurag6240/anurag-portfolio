"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, Network, Code } from "lucide-react"

export function CertificationsSection() {
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

  const certifications = [
    {
      title: "Full-Stack Development",
      organization: "Infosys Springboard",
      description:
        "Comprehensive certification covering JavaScript, TypeScript, Angular, and Bootstrap for modern web development.",
      skills: ["JavaScript", "TypeScript", "Angular", "Bootstrap"],
      icon: Code,
      color: "neon-cyan",
      year: "2024",
    },
    {
      title: "Cybersecurity Fundamentals",
      organization: "Cisco Networking Academy",
      description:
        "Essential cybersecurity concepts, threat analysis, and security best practices for web applications.",
      skills: ["Network Security", "Threat Analysis", "Security Protocols"],
      icon: Shield,
      color: "neon-purple",
      year: "2024",
    },
    {
      title: "Computer Networks",
      organization: "NPTEL",
      description:
        "In-depth understanding of networking protocols, architecture, and implementation in modern systems.",
      skills: ["TCP/IP", "Network Architecture", "Protocol Design"],
      icon: Network,
      color: "neon-pink",
      year: "2023",
    },
  ]

  return (
    <section id="certifications" className="py-20 px-4 relative">
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
              <span className="text-neon-purple">Certifications</span>
            </h2>
            <div className="w-20 h-1 bg-neon-purple mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Professional certifications and courses that have enhanced my technical expertise and industry knowledge.
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div key={cert.title} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group">
                <Card className="p-6 glass-morphism border-border/50 hover:border-neon-cyan/30 transition-all duration-300 h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg bg-${cert.color}/20 group-hover:scale-110 transition-transform duration-300`}
                      style={{
                        backgroundColor: `var(--color-${cert.color})/0.2`,
                      }}
                    >
                      <cert.icon
                        className="w-6 h-6"
                        style={{
                          color: `var(--color-${cert.color})`,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1">{cert.title}</h3>
                      <p
                        className="text-sm font-medium"
                        style={{
                          color: `var(--color-${cert.color})`,
                        }}
                      >
                        {cert.organization}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: `var(--color-${cert.color})/0.3`,
                        color: `var(--color-${cert.color})`,
                      }}
                    >
                      {cert.year}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cert.description}</p>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs bg-background/50 text-muted-foreground rounded-md border border-border/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="p-8 glass-morphism border-border/50 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-8 h-8 text-neon-cyan" />
                <h3 className="text-2xl font-bold text-foreground">Continuous Learning</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Committed to staying current with industry trends and technologies through ongoing professional
                development and certification programs.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
