"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { toolLogos } from "@/components/tool-logos"
import { useState } from "react"

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
  duration: 0.5,
      },
    },
  }

  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { name: "JavaScript", level: 90, experience: "3+ years", projects: 15 },
        { name: "TypeScript", level: 85, experience: "2+ years", projects: 12 },
        { name: "React", level: 90, experience: "3+ years", projects: 20 },
        { name: "Next.js", level: 85, experience: "2+ years", projects: 8 },
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 80, experience: "2+ years", projects: 10 },
        { name: "Express", level: 75, experience: "2+ years", projects: 8 },
        { name: "MongoDB", level: 80, experience: "2+ years", projects: 12 },
        { name: "REST APIs", level: 85, experience: "2+ years", projects: 15 },
      ],
    },
  ]

  const tools = [
    { name: "Tailwind CSS", key: "tailwind", category: "Styling", color: "bg-cyan-500" },
    { name: "Redux", key: "redux", category: "State Management", color: "bg-purple-500" },
    { name: "GitHub", key: "github", category: "Version Control", color: "bg-gray-700" },
    { name: "Supabase", key: "supabase", category: "Database", color: "bg-green-500" },
    { name: "OpenAI API", key: "openai", category: "AI Integration", color: "bg-blue-500" },
    { name: "Framer Motion", key: "framer", category: "Animation", color: "bg-pink-500" },
    { name: "Vercel", key: "vercel", category: "Deployment", color: "bg-black" },
    { name: "Postman", key: "postman", category: "API Testing", color: "bg-orange-500" },
  ]

  const getSkillColor = (level: number) => {
    if (level >= 85) return "from-green-400 to-emerald-500"
    if (level >= 75) return "from-blue-400 to-cyan-500"
    return "from-yellow-400 to-orange-500"
  }

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Technical{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </motion.h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crafting digital experiences with modern technologies and best practices
            </p>
          </motion.div>

          {/* Skills Categories */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="group cursor-pointer"
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-foreground text-lg">{skill.name}</span>
                          {hoveredSkill === skill.name && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex gap-2 text-sm text-muted-foreground"
                            >
                              <span className="bg-background/10 px-2 py-1 rounded-full">{skill.experience}</span>
                              <span className="bg-background/10 px-2 py-1 rounded-full">{skill.projects} projects</span>
                            </motion.div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-muted-foreground bg-background/10 px-3 py-1 rounded-full">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-3 bg-background/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} rounded-full relative`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1.2,
                            delay: categoryIndex * 0.2 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          <div className="absolute inset-0 bg-background/20 rounded-full animate-pulse" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools & Technologies */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-3xl font-bold mb-8 text-foreground">
              Tools &{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                Technologies
              </span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer"
                >
      <Card className="p-6 bg-card/90 backdrop-blur-sm border border-border/50 hover:border-border/70 transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-shadow duration-300">
                        <img src={toolLogos[tool.key as keyof typeof toolLogos]} alt={`${tool.name} logo`} className="w-10 h-10 object-contain" />
                      </div>
                      <div>
        <h4 className="font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                          {tool.name}
                        </h4>
        <p className="text-xs text-muted-foreground mt-1">{tool.category}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
