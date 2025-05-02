"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function ProfessionalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25

        // Different colors for light and dark mode
        if (theme === "dark") {
          this.color = "#7c3aed" // Purple for dark mode
        } else {
          this.color = "#6d28d9" // Darker purple for light mode
        }

        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      }
    }

    // Initialize canvas and particles
    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      particles = []
      const particleCount = Math.min(100, (window.innerWidth * window.innerHeight) / 15000)

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new Particle(x, y))
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections with different colors for light/dark mode
      if (theme === "dark") {
        ctx.strokeStyle = "rgba(124, 58, 237, 0.05)" // Purple for dark mode
      } else {
        ctx.strokeStyle = "rgba(109, 40, 217, 0.03)" // Darker purple for light mode
      }

      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Handle resize
    const handleResize = () => {
      init()
    }

    window.addEventListener("resize", handleResize)
    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <>
      {/* Gradient overlay - different for light/dark mode */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-background opacity-95 z-0 transition-colors duration-300"></div>

      {/* Animated gradient accent */}
      <div className="fixed inset-0 z-0 transition-colors duration-300">
        {/* Top gradient - different for light/dark mode */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/10 to-transparent transition-colors duration-300"></div>

        {/* Bottom gradient - different for light/dark mode */}
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-secondary/10 to-transparent transition-colors duration-300"></div>

        {/* Accent orbs - different for light/dark mode */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl transition-colors duration-300"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 filter blur-3xl transition-colors duration-300"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Particle network */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60" />

      {/* Subtle grid overlay - different for light/dark mode */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] z-0 transition-opacity duration-300 dark:opacity-[0.02] light:opacity-[0.01]"></div>

      {/* Light mode specific decorative elements */}
      <div className="fixed inset-0 z-0 light:block dark:hidden opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-200 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      {/* Dark mode specific decorative elements */}
      <div className="fixed inset-0 z-0 light:hidden dark:block opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-900 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-900 to-transparent rounded-full filter blur-3xl"></div>
      </div>
    </>
  )
}
