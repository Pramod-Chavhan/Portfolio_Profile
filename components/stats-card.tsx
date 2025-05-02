"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface StatsCardProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  icon?: React.ReactNode
  description?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  delay?: number
}

export default function StatsCard({
  title,
  value,
  suffix = "",
  prefix = "",
  icon,
  description,
  trend,
  trendValue,
  delay = 0,
}: StatsCardProps) {
  const { theme } = useTheme()
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animate the counter
  useEffect(() => {
    if (!mounted) return

    const start = 0
    const end = value
    const duration = 1500
    const startTime = Date.now()

    const animateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4)
      const easedProgress = easeOutQuart(progress)

      setCount(Math.floor(easedProgress * end))

      if (progress < 1) {
        requestAnimationFrame(animateCount)
      } else {
        setCount(end)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animateCount)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay, mounted])

  // Get trend color
  const getTrendColor = () => {
    if (!trend) return ""
    if (trend === "up") return "text-green-500"
    if (trend === "down") return "text-red-500"
    return "text-gray-500"
  }

  // Get trend icon
  const getTrendIcon = () => {
    if (!trend) return null
    if (trend === "up") return "↑"
    if (trend === "down") return "↓"
    return "→"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
              <h3 className="text-3xl font-bold">
                {prefix}
                {count.toLocaleString()}
                {suffix}
              </h3>
              {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
              {trend && (
                <div className={`flex items-center mt-2 text-sm ${getTrendColor()}`}>
                  <span className="mr-1">{getTrendIcon()}</span>
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            {icon && <div className="text-primary/80">{icon}</div>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
