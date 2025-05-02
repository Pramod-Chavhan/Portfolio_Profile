"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface EnhancedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hoverEffect?: boolean
}

export default function EnhancedCard({ children, className = "", delay = 0, hoverEffect = true }: EnhancedCardProps) {
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
    >
      <Card
        className={`bg-gray-800/50 border-gray-700 overflow-hidden transition-all duration-300 ${
          hoverEffect ? "hover:shadow-lg hover:shadow-purple-500/10" : ""
        } ${className}`}
      >
        <CardContent className="p-6 relative">
          {/* Subtle gradient accent in the corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full"></div>

          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}
