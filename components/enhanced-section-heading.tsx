"use client"

import { motion } from "framer-motion"
import SplitHeading from "@/components/motion/split-heading"

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
    <div className={`mb-16 ${centered ? "text-center" : "text-left"} ${className}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.2em] uppercase text-teal-400 mb-3 font-medium"
        >
          {subtitle}
        </motion.p>
      )}

      <div className={`relative inline-block ${centered ? "" : ""}`}>
        <SplitHeading
          text={title}
          className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-50"
        />
        <motion.span
          className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-muted-foreground max-w-2xl mx-auto mt-7 text-base md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
