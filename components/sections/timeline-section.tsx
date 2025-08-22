"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GraduationCap, Trophy, Users, Calendar } from "lucide-react"

export function TimelineSection() {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const timelineEvents = [
    {
      year: "2022 - 2026",
      title: "Computer Science Engineering",
      organization: "Parul University",
      description:
        "Pursuing Bachelor's degree in Computer Science with focus on full-stack development and modern web technologies.",
      type: "education",
      icon: GraduationCap,
      color: "neon-cyan",
    },
    {
      year: "2024",
      title: "Web Development Bootcamp",
      organization: "Tech Workshop Series",
      description: "Intensive workshop series covering React, Node.js, and modern development practices.",
      type: "workshop",
      icon: Users,
      color: "neon-purple",
    },
    {
      year: "2024",
      title: "Hackathon Participation",
      organization: "CodeFest 2024",
      description:
        "Built innovative solutions using AI and web technologies, focusing on user experience and performance.",
      type: "hackathon",
      icon: Trophy,
      color: "neon-pink",
    },
    {
      year: "2023",
      title: "First Full-Stack Project",
      organization: "Personal Development",
      description:
        "Developed first complete web application using MERN stack, marking the beginning of serious development journey.",
      type: "milestone",
      icon: Calendar,
      color: "neon-blue",
    },
  ]

  return (
    <section id="timeline" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-neon-cyan">Journey</span>
            </h2>
            <div className="w-20 h-1 bg-neon-cyan mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              A timeline of my educational background, achievements, and key milestones in my development journey.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink opacity-30" />

            {/* Timeline Events */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div key={index} variants={itemVariants} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-${event.color}/20 border-2 border-${event.color} flex-shrink-0`}
                    style={{
                      backgroundColor: `var(--color-${event.color})/0.2`,
                      borderColor: `var(--color-${event.color})`,
                    }}
                  >
                    <event.icon
                      className="w-6 h-6"
                      style={{
                        color: `var(--color-${event.color})`,
                      }}
                    />
                  </div>

                  {/* Event Content */}
                  <motion.div className="flex-1 pb-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="p-6 glass-morphism border-border/50 hover:border-neon-cyan/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                        <span
                          className="text-sm font-medium px-3 py-1 rounded-full bg-${event.color}/20 text-${event.color} border border-${event.color}/30 mt-2 sm:mt-0 self-start"
                          style={{
                            backgroundColor: `var(--color-${event.color})/0.2`,
                            color: `var(--color-${event.color})`,
                            borderColor: `var(--color-${event.color})/0.3`,
                          }}
                        >
                          {event.year}
                        </span>
                      </div>
                      <p className="text-neon-purple font-medium mb-2">{event.organization}</p>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
