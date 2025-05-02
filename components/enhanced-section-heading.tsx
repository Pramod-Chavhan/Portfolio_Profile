"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface EnhancedSectionHeadingProps {
  subtitle?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export default function EnhancedSectionHeading({
  subtitle,
  title,
  description,
  centered = true,
  className = "",
}: EnhancedSectionHeadingProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`mb-16 ${centered ? "text-center" : "text-left"} ${className}`}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-primary mb-2 font-medium"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-4 relative inline-block"
      >
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-muted-foreground max-w-2xl mx-auto mt-4"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
