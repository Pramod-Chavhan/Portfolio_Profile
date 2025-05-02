"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

interface AnimatedFeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export default function AnimatedFeatureCard({ icon, title, description, delay = 0 }: AnimatedFeatureCardProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <Card
        className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10
        ${theme === "dark" ? "bg-gray-800/80 border-gray-700/50" : "bg-white/80 border-gray-200/50"} 
        backdrop-blur-sm`}
      >
        <CardContent className="p-6 relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>

          <div className="relative z-10">
            {/* Icon with animated background */}
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md transform scale-150 animate-pulse"></div>
              <div
                className={`relative flex items-center justify-center w-16 h-16 rounded-full 
                ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} text-primary`}
              >
                {icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{description}</p>
          </div>

          {/* Interactive hover effect */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-secondary/50 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
