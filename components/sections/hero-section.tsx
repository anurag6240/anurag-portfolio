"use client"

import { motion, easeInOut } from "framer-motion"
import { Button } from "@/components/ui/button"

import { Github, Linkedin, Mail, ExternalLink, Download, ChevronDown } from "lucide-react"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
  }

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/anurag6240",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anurag6240",
      icon: Linkedin,
    },
    {
      name: "Email",
      url: "mailto:anurag.kumar6240@gmail.com",
      icon: Mail,
    },
  ]

  const handleResumeDownload = () => {
    // Use Google Drive direct-download URL for the provided file ID so the browser opens/downloads the PDF.
    const driveFileId = "1gfV2WySrNdgukPUq6o2A3e_k3YCt3OMd";
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;
    window.open(downloadUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-12 md:pt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight font-sans"
        >
          <span className="text-gradient">Anurag</span> <span className="text-foreground">Kumar</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Self-driven Computer Science undergraduate crafting scalable full-stack applications
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-muted-foreground/80 mb-12 max-w-2xl mx-auto"
        >
          Proficient in React, TypeScript, Node.js, MongoDB, and REST APIs. Skilled at crafting responsive UIs and
          optimizing backend logic.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg transition-all duration-300 hover:shadow-lg border border-primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Work
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-black font-semibold text-lg transition-all duration-300 bg-transparent hover:shadow-[0_0_24px_8px_rgba(186,0,255,0.6)]"
            onClick={handleResumeDownload}
          >
            Download Resume
            <Download className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto px-6 py-4 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-transparent hover:border-primary/50 hover:shadow-lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact
            <Mail className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card hover:bg-muted transition-all duration-300 group border"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full shadow-sm mb-16"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50" />
          <span className="text-sm font-medium text-green-700 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Available for work
          </span>
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  )
}
