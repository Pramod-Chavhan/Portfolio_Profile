"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

interface ThemeAwareCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hoverEffect?: boolean
  variant?: "default" | "elevated" | "bordered" | "glass" | "neumorphic" | "animated"
}

export default function ThemeAwareCard({
  children,
  className = "",
  delay = 0,
  hoverEffect = true,
  variant = "default",
}: ThemeAwareCardProps) {
  const { theme } = useTheme()

  // Get variant-specific classes
  const getVariantClasses = () => {
    switch (variant) {
      case "elevated":
        return "shadow-lg dark:shadow-gray-900/30 light:shadow-gray-300/30"
      case "bordered":
        return "border-2 dark:border-primary/20 light:border-primary/20"
      case "glass":
        return "backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/20 dark:border-gray-800/50"
      case "neumorphic":
        return theme === "dark"
          ? "shadow-[8px_8px_16px_#131a27,-8px_-8px_16px_#1f2937] bg-gradient-to-br from-gray-800 to-gray-900"
          : "shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] bg-gradient-to-br from-white to-gray-50"
      case "animated":
        return "animated-border"
      default:
        return "bg-card/80 backdrop-blur-sm border border-primary/20"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={
        hoverEffect
          ? {
              y: -10,
              transition: { duration: 0.3 },
            }
          : undefined
      }
      className="theme-transition"
    >
      <Card
        className={`overflow-hidden transition-all duration-300 ${
          hoverEffect ? "hover:shadow-lg hover:shadow-primary/10" : ""
        } ${getVariantClasses()} ${className}`}
      >
        <CardContent className="p-6 relative">
          {/* Subtle gradient accent in the corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>

          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}
