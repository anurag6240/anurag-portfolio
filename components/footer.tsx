"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [showSurprise, setShowSurprise] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/anurag6240",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/anurag6240",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:anurag.kumar6240@gmail.com",
      label: "Email",
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSurpriseClick = () => {
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)
    setShowSurprise(true)

    // Create floating emojis
    const emojis = ["🎉", "✨", "🚀", "💫", "🎊", "🌟", "🎁", "💝"]
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

    // Create multiple floating elements
    for (let i = 0; i < 5; i++) {
      const element = document.createElement("div")
      element.textContent = randomEmoji
      element.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        animation: floatUp 3s ease-out forwards;
      `
      document.body.appendChild(element)

      setTimeout(() => element.remove(), 3000)
    }

    // Console messages based on click count
    const messages = [
      "🎉 Thanks for clicking! Here's your first surprise!",
      "✨ You clicked again! I love curious minds like yours!",
      "🚀 Third time's the charm! You're persistent!",
      "💫 Still clicking? You're dedicated! Here's a secret: I debug with console.log too!",
      "🎊 Wow, you really love surprises! Fun fact: This portfolio has 60fps animations!",
      "🌟 You're unstoppable! Did you know I wrote custom shaders for this site?",
      "🎁 Legend! You've unlocked the ultimate easter egg! Keep being awesome! 🎉",
    ]

    const messageIndex = Math.min(newClickCount - 1, messages.length - 1)
    console.log(messages[messageIndex])

    setTimeout(() => setShowSurprise(false), 2000)
  }

  return (
    <footer className="relative py-16 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-neon-cyan">Anurag</span> <span className="text-foreground">Kumar</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Crafting fluid, fast experiences with code, design, and a dash of physics. Always learning, always
              building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {["about", "skills", "projects", "playground", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-muted-foreground hover:text-neon-cyan transition-colors duration-300 capitalize"
                  data-cursor-hover
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg glass-morphism border-border/50 hover:border-neon-cyan/30 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-neon-cyan transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Available for Fall '25 contracts
              <br />
              <a href="mailto:anurag.kumar6240@gmail.com" className="text-neon-cyan hover:underline" data-cursor-hover>
                anurag.kumar6240@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0 flex items-center gap-2">
            © {currentYear} Anurag Kumar. Made with <Heart className="w-4 h-4 text-red-500" /> and lots of coffee.
          </p>

          {/* Back to Top */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="bg-transparent border-border/50 hover:border-neon-cyan"
            data-cursor-hover
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>

        {/* Easter Egg */}
        <div className="text-center mt-8 relative">
          {showSurprise && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-neon-cyan to-neon-purple text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              🎉 Surprise! Check the console! 🎉
            </motion.div>
          )}

          <motion.button
            onClick={handleSurpriseClick}
            className="text-xs text-muted-foreground/50 hover:text-neon-cyan transition-colors duration-300"
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              showSurprise
                ? {
                    color: ["#06b6d4", "#8b5cf6", "#06b6d4"],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            Click me for a surprise 👀
          </motion.button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  )
}
