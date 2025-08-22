"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 ease-out shadow-[0_0_16px_4px_#00fff0cc]"
        style={{ boxShadow: '0 0 16px 4px #00fff0cc, 0 0 32px 8px #00fff055' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-neon-cyan/60 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-transform duration-300 ease-out"
        style={{ boxShadow: '0 0 32px 8px #00fff055' }}
      />
    </>
  )
}
