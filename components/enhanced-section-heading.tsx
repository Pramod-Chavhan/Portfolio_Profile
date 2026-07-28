"use client"

import { motion } from "framer-motion"

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
          className="text-sm tracking-[0.2em] uppercase text-teal-400 mb-3 font-medium"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="font-display text-4xl md:text-5xl font-bold mb-4 relative inline-block tracking-tight"
      >
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-sky-500 rounded-full" />
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-muted-foreground max-w-2xl mx-auto mt-6 text-base md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
