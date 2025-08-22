"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"

export default function CustomCursor(_props: Record<string, unknown>): React.ReactElement | null {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // show only on devices with a fine pointer (mouse) and hover support
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)")
    const update = () => setEnabled(Boolean(mq.matches))
    update()
    if (mq.addEventListener) mq.addEventListener("change", update)
    else mq.addListener(update)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update)
      else mq.removeListener(update)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 ease-out shadow-[0_0_16px_4px_#00fff0cc]"
        style={{ boxShadow: "0 0 16px 4px #00fff0cc, 0 0 32px 8px #00fff055" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-neon-cyan/60 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-transform duration-300 ease-out"
        style={{ boxShadow: "0 0 32px 8px #00fff055" }}
      />
    </>
  )
}
