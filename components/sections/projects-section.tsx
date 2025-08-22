"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/project-card"

export function ProjectsSection() {
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
      },
    },
  }

  const projects = [
    {
      title: "JobInsight",
      subtitle: "AI Resume Analyzer",
      description:
        "Developed an AI-powered resume matcher that improved compatibility predictions by 35%. Extracted skill gaps from job descriptions using Gemini Pro and provided resume enhancement tips.",
      technologies: ["React", "TypeScript", "Gemini API", "Tailwind CSS"],
      githubUrl: "https://github.com/anurag6240/JobInsight-",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jobinsight-JYRCNe2jn780Lw0Hnkr39nAkKHoTPg.png",
      color: "primary",
    },
    {
      title: "HashShield",
      subtitle: "File Integrity Checker",
      description:
        "Built a SHA-256 hash-based tool to verify file authenticity and integrity. Integrated drag-and-drop support, QR code generation, and achieved over 90% tamper detection accuracy.",
      technologies: ["React", "Web Crypto API", "JavaScript", "CSS3"],
      githubUrl: "https://github.com/anurag6240/HashShield",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hash-shield-psi-vercel-app-2025-08-22-19_45_50-hiedc1279e6bx1HQT2hblWat7wJJJ7.png",
      color: "accent",
    },
    {
      title: "PACO",
      subtitle: "Package Confuser",
      description:
        "Created a Chrome extension that scans GitHub repositories for dependency confusion risks. Increased detection precision by 70% using smart manifest parsing and custom filters.",
      technologies: ["Chrome Extension", "JavaScript", "Manifest V3", "GitHub API"],
      githubUrl: "https://github.com/anurag6240/PACO-Package-Confuser",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paco-MXtx5Kj4EutxSsAaEAQAd1BcDY811e.png",
      color: "secondary",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 relative bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              A showcase of my recent work, featuring AI-powered applications, cybersecurity tools, and innovative
              Chrome extensions built with modern technologies.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div key={project.title} variants={itemVariants}>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
