"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, MapPin, Calendar, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setStatusMessage("Message sent successfully! I'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
        setStatusMessage(data.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
        setStatusMessage("")
      }, 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "anurag.kumar6240@gmail.com",
      href: "mailto:anurag.kumar6240@gmail.com",
      color: "neon-cyan",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Vadodara, India",
      color: "neon-purple",
    },
    {
      icon: Calendar,
      label: "Availability",
      value: "Available for Fall '25 contracts",
      color: "neon-pink",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/anurag6240",
      color: "neon-cyan",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/anurag6240",
      color: "neon-purple",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 relative">
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
              Get In <span className="text-neon-blue">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-neon-blue mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's discuss how we can bring your ideas to life with modern
              web technologies.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 glass-morphism border-border/50">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>

                {submitStatus !== "idle" && (
                  <div
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                      submitStatus === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <p className="text-sm">{statusMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background/50 border-border/50 focus:border-neon-cyan"
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                      data-cursor-hover
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background/50 border-border/50 focus:border-neon-cyan"
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                      data-cursor-hover
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-background/50 border-border/50 focus:border-neon-cyan min-h-32"
                      placeholder="Tell me about your project..."
                      required
                      disabled={isSubmitting}
                      data-cursor-hover
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-neon-blue text-background hover:bg-neon-blue/90 font-semibold disabled:opacity-50"
                    disabled={isSubmitting}
                    data-cursor-hover
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div key={info.label} variants={itemVariants} whileHover={{ scale: 1.02 }}>
                    <Card className="p-4 glass-morphism border-border/50 hover:border-neon-cyan/30 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg bg-${info.color}/20`}
                          style={{
                            backgroundColor: `var(--color-${info.color})/0.2`,
                          }}
                        >
                          <info.icon
                            className="w-5 h-5"
                            style={{
                              color: `var(--color-${info.color})`,
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="font-medium text-foreground hover:text-neon-cyan transition-colors duration-300"
                              data-cursor-hover
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-medium text-foreground">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Connect With Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-lg glass-morphism border-border/50 hover:border-neon-cyan/30 transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor-hover
                    >
                      <social.icon
                        className="w-6 h-6 text-muted-foreground group-hover:text-neon-cyan transition-colors duration-300"
                        style={{
                          color: `var(--color-${social.color})`,
                        }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <motion.div variants={itemVariants} className="pt-6">
                <Card className="p-6 glass-morphism border-neon-cyan/20 bg-neon-cyan/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <h4 className="text-lg font-semibold text-foreground">Currently Available</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Open to new opportunities and exciting projects for Fall 2025. Let's build something amazing
                    together!
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
