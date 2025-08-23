import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AIAssistant from "@/components/ai-assistant"
import { AnimatedBackground } from "@/components/animated-bg"
import CustomCursor from "@/components/custom-cursor"
import { GlobalBackground } from "@/components/global-bg"
import ThemeToggle from "@/components/theme-toggle"
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
        <script dangerouslySetInnerHTML={{ __html: `(${String(() => {
          try {
            const theme = localStorage.getItem('theme')
            if (theme === 'dark') document.documentElement.classList.add('dark')
            else if (theme === 'light') document.documentElement.classList.remove('dark')
            else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark')
          } catch (e) {
            // ignore
          }
        })})()` }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
  <script
    dangerouslySetInnerHTML={{
      __html: `try{const cs=getComputedStyle(document.documentElement);const sample=document.querySelector('[data-theme-sample]')||document.body;console.log('THEME DEBUG -> html.class:',document.documentElement.className);console.log('THEME DEBUG -> --color-background:',cs.getPropertyValue('--color-background'));console.log('THEME DEBUG -> --color-foreground:',cs.getPropertyValue('--color-foreground'));console.log('THEME DEBUG -> sample element:', sample.tagName, sample.className);const sc=getComputedStyle(sample);console.log('THEME DEBUG -> sample color:', sc.color);console.log('THEME DEBUG -> sample background:', sc.backgroundColor);}catch(e){console.log('theme-debug-error',e)}`,
    }}
  />
        {/* Canvas-based animated background (subtle neon lines) */}
        <AnimatedBackground />

        {/* Reusable layered background that shows gradient orbs, particles and grid on all pages */}
        <GlobalBackground />

        <CustomCursor />

  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange>
          {children}
          <ThemeToggle />
          <AIAssistant />
        </ThemeProvider>
      </body>
    </html>
  )
}
