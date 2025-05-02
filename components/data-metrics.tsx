"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, BrainCircuit, Database, LineChart, Code, Award, BookOpen, Coffee } from "lucide-react"

export default function DataMetrics() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const metrics = [
    {
      title: "ML Models Trained",
      value: 30,
      icon: <BrainCircuit className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      lightColor: "from-purple-600 to-indigo-600",
    },
    {
      title: "Data Points Analyzed",
      value: 1500000,
      suffix: "+",
      icon: <Database className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      lightColor: "from-blue-600 to-cyan-600",
    },
    {
      title: "Accuracy Achieved",
      value: 97.8,
      suffix: "%",
      icon: <LineChart className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      lightColor: "from-green-600 to-emerald-600",
    },
    {
      title: "Code Commits",
      value: 1240,
      icon: <Code className="w-8 h-8" />,
      color: "from-amber-500 to-orange-500",
      lightColor: "from-amber-600 to-orange-600",
    },
    {
      title: "Certificates",
      value: 15,
      suffix: "+",
      icon: <Award className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      lightColor: "from-pink-600 to-rose-600",
    },
    {
      title: "Projects Completed",
      value: 12 ,
      suffix: "+",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-violet-500 to-purple-500",
      lightColor: "from-violet-600 to-purple-600",
    },
    {
      title: "Research Papers",
      value: 2,
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-teal-500 to-green-500",
      lightColor: "from-teal-600 to-green-600",
    },
    {
      title: "Coffee Consumed",
      value: 1820,
      suffix: " cups",
      icon: <Coffee className="w-8 h-8" />,
      color: "from-amber-500 to-yellow-500",
      lightColor: "from-amber-600 to-yellow-600",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-lg text-primary mb-2 font-medium">By The Numbers</p>
        <h2 className="text-4xl font-bold mb-4 relative inline-block">
          Data Science Metrics
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          Quantifying my journey and impact in the world of data science and machine learning
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Card
              className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10
              ${theme === "dark" ? "bg-gray-800/80 border-gray-700/50" : "bg-white/80 border-gray-200/50"} 
              backdrop-blur-sm`}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br 
                    ${theme === "dark" ? metric.color : metric.lightColor} text-white`}
                  >
                    {metric.icon}
                  </div>
                </div>

                <CountUpValue value={metric.value} suffix={metric.suffix || ""} duration={2000} delay={index * 100} />

                <h3 className="text-lg font-medium mt-2">{metric.title}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

interface CountUpValueProps {
  value: number
  suffix?: string
  duration?: number
  delay?: number
}

function CountUpValue({ value, suffix = "", duration = 2000, delay = 0 }: CountUpValueProps) {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const start = 0
    const end = value
    const startTime = Date.now()

    const timer = setTimeout(() => {
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

      requestAnimationFrame(animateCount)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, duration, delay, mounted])

  return (
    <div className="text-3xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}
