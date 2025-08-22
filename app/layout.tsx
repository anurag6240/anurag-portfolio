import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatedBackground } from "@/components/animated-bg"
import { CustomCursor } from "@/components/custom-cursor"
import { GlobalBackground } from "@/components/global-bg"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Anurag Kumar - Full-Stack Developer",
  description:
    "Self-driven Computer Science undergraduate with experience in building scalable full-stack applications. Proficient in React, TypeScript, Node.js, and modern web technologies.",
  generator: "v0.app",
  keywords: [
    "Anurag Kumar",
    "Full-Stack Developer",
    "React",
    "TypeScript",
    "Next.js",
    "Web Developer",
    "Computer Science",
    "Parul University",
  ],
  authors: [{ name: "Anurag Kumar" }],
  openGraph: {
    title: "Anurag Kumar - Full-Stack Developer",
    description: "Self-driven Computer Science undergraduate specializing in scalable full-stack applications.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: ${spaceGrotesk.variable};
  --font-mono: ${dmSans.variable};
}
        `}</style>
      </head>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
        {/* Canvas-based animated background (subtle neon lines) */}
        <AnimatedBackground />

        {/* Reusable layered background that shows gradient orbs, particles and grid on all pages */}
        <GlobalBackground />

        <CustomCursor />

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
