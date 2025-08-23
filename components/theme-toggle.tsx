"use client"

import React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  // Keep a local mounted flag to avoid mismatch before hydration
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Sync documentElement.classList as a defensive fallback
  // rely on next-themes to update the document class; keep a debug log
  React.useEffect(() => {
  if (typeof window === "undefined") return
  console.log("theme:resolved", { resolvedTheme, theme })
  }, [resolvedTheme, theme])

  const handleToggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(next)
    // small delayed debug to show DOM class after next-themes runs
    setTimeout(() => {
      if (typeof document !== "undefined") {
        console.log("after-toggle", {
          next,
          htmlClass: document.documentElement.className,
          bodyClass: document.body.className,
          computedColor: getComputedStyle(document.body).color,
        })
      }
    }, 50)
  }

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        aria-label="Toggle theme"
        onClick={handleToggle}
        className="p-2 rounded-full bg-background/60 backdrop-blur-sm border border-border shadow-sm"
      >
        {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  )
}
