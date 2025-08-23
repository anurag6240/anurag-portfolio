"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface Project {
  title: string
  subtitle: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  image: string
  color: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    setIsHovered(false)
  }

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
  <Card className="overflow-hidden glass-morphism visible-border hover:strong-border transition-all duration-500 h-full">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          {/* Overlay Links */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center p-2 rounded bg-background/80 backdrop-blur-sm visible-border hover:strong-border"
                aria-label={`Open ${project.title} live demo`}
                data-cursor-hover
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : null}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center p-2 rounded bg-background/80 backdrop-blur-sm visible-border hover:strong-border"
                aria-label={`Open ${project.title} GitHub repository`}
                data-cursor-hover
              >
                <Github className="w-4 h-4" />
              </a>
            ) : null}
          </div>
        </div>

  {/* Project Content */}
          <div className="p-6 pt-8 md:pt-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-1">{project.title}</h3>
            <p className={`text-sm font-medium ${project.color.replace('bg-','text-')}`}>{project.subtitle}</p>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-background/50 text-muted-foreground rounded-md subtle-border"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  role="button"
                  className={`w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150`}
                  style={{
                    backgroundColor: `var(--color-${project.color})`,
                    color: `var(--color-${project.color}-foreground)`,
                  }}
                  data-cursor-hover
                  aria-label={`Open ${project.title} live preview`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Preview
                </a>
              ) : project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  role="button"
                  className={`w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150`}
                  style={{
                    backgroundColor: `var(--color-${project.color})`,
                    color: `var(--color-${project.color}-foreground)`,
                  }}
                  data-cursor-hover
                  aria-label={`Open ${project.title} GitHub repository`}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              ) : (
                <div className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded bg-gray-100 text-muted-foreground">
                  No Live Preview
                </div>
              )}
            </div>

            <div className="w-12 flex-shrink-0">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-center w-12 h-10 rounded visible-border hover:strong-border bg-transparent border"
                  data-cursor-hover
                  aria-label={`Open ${project.title} GitHub repository`}
                >
                  <Github className="w-4 h-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
