"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"

export function BlogSection() {
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

  const blogPosts = [
    {
      title: "Building Performant WebGL Shaders",
      excerpt: "A deep dive into optimizing GLSL shaders for 60fps performance across different devices and browsers.",
      date: "Coming Soon",
      readTime: "8 min read",
      category: "WebGL",
      color: "neon-cyan",
    },
    {
      title: "Modern React Patterns",
      excerpt: "Exploring advanced React patterns and hooks for building scalable and maintainable applications.",
      date: "Coming Soon",
      readTime: "6 min read",
      category: "React",
      color: "neon-purple",
    },
    {
      title: "Full-Stack TypeScript",
      excerpt: "End-to-end TypeScript development with Next.js, covering both frontend and backend best practices.",
      date: "Coming Soon",
      readTime: "10 min read",
      category: "TypeScript",
      color: "neon-pink",
    },
  ]

  return (
    <section id="blog" className="py-20 px-4 relative">
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
              <span className="text-neon-pink">Blog</span>
            </h2>
            <div className="w-20 h-1 bg-neon-pink mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development, performance optimization, and modern
              technologies.
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <motion.div key={post.title} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group">
                <Card className="p-6 glass-morphism border-border/50 hover:border-neon-cyan/30 transition-all duration-300 h-full cursor-pointer">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full bg-${post.color}/20 text-${post.color} border border-${post.color}/30`}
                      style={{
                        backgroundColor: `var(--color-${post.color})/0.2`,
                        color: `var(--color-${post.color})`,
                        borderColor: `var(--color-${post.color})/0.3`,
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-sm font-medium text-neon-cyan group-hover:gap-3 transition-all duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <motion.div variants={itemVariants} className="text-center">
            <Card className="p-8 glass-morphism border-border/50 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-neon-pink" />
                <h3 className="text-2xl font-bold text-foreground">Blog Coming Soon</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm currently working on creating high-quality technical content. Stay tuned for in-depth articles about
                web development, performance optimization, and modern JavaScript frameworks.
              </p>
              <Button
                variant="outline"
                className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-background bg-transparent"
                data-cursor-hover
              >
                Subscribe for Updates
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
