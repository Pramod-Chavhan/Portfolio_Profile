"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"

interface DataPoint {
  label: string
  value: number
  color: string
}

interface DataVisualizationProps {
  title: string
  data: DataPoint[]
  type: "bar" | "pie" | "line" | "radar"
  height?: number
}

export default function DataVisualization({ title, data, type, height = 300 }: DataVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Colors for light/dark mode
  const getColors = () => {
    return {
      background: theme === "dark" ? "#1f2937" : "#f9fafb",
      text: theme === "dark" ? "#f3f4f6" : "#1f2937",
      grid: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const colors = getColors()

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = height

    // Draw based on chart type
    switch (type) {
      case "bar":
        drawBarChart(ctx, data, canvas.width, canvas.height, colors)
        break
      case "pie":
        drawPieChart(ctx, data, canvas.width, canvas.height, colors)
        break
      case "line":
        drawLineChart(ctx, data, canvas.width, canvas.height, colors)
        break
      case "radar":
        drawRadarChart(ctx, data, canvas.width, canvas.height, colors)
        break
    }
  }, [data, type, height, theme, mounted])

  const drawBarChart = (
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    width: number,
    height: number,
    colors: any,
  ) => {
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const barWidth = chartWidth / data.length - 10

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value))

    // Draw axes
    ctx.strokeStyle = colors.text
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.strokeStyle = colors.grid
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      // Draw y-axis labels
      ctx.fillStyle = colors.text
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.fillText(((5 - i) * maxValue) / 5 + "", padding - 5, y + 4)
    }

    // Draw bars
    data.forEach((point, i) => {
      const barHeight = (point.value / maxValue) * chartHeight
      const x = padding + i * (barWidth + 10) + 5
      const y = height - padding - barHeight

      // Draw bar
      ctx.fillStyle = point.color
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add hover effect (gradient)
      const gradient = ctx.createLinearGradient(x, y, x, height - padding)
      gradient.addColorStop(0, point.color)
      gradient.addColorStop(1, point.color + "80") // Semi-transparent
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw x-axis labels
      ctx.fillStyle = colors.text
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(point.label, x + barWidth / 2, height - padding + 15)
    })

    // Draw title
    ctx.fillStyle = colors.text
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(title, width / 2, 20)
  }

  const drawPieChart = (
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    width: number,
    height: number,
    colors: any,
  ) => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Calculate total for percentages
    const total = data.reduce((sum, point) => sum + point.value, 0)

    // Draw pie slices
    let startAngle = 0
    data.forEach((point) => {
      const sliceAngle = (2 * Math.PI * point.value) / total

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = point.color
      ctx.fill()

      // Add slice border
      ctx.lineWidth = 2
      ctx.strokeStyle = colors.background
      ctx.stroke()

      // Calculate label position
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      // Draw label
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(point.label, labelX, labelY)

      // Update start angle for next slice
      startAngle += sliceAngle
    })

    // Draw title
    ctx.fillStyle = colors.text
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(title, width / 2, 20)

    // Draw legend
    const legendX = width - 100
    const legendY = 50
    data.forEach((point, i) => {
      // Draw color box
      ctx.fillStyle = point.color
      ctx.fillRect(legendX, legendY + i * 20, 15, 15)

      // Draw label
      ctx.fillStyle = colors.text
      ctx.font = "12px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`${point.label}: ${Math.round((point.value / total) * 100)}%`, legendX + 20, legendY + i * 20 + 12)
    })
  }

  const drawLineChart = (
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    width: number,
    height: number,
    colors: any,
  ) => {
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value))

    // Draw axes
    ctx.strokeStyle = colors.text
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.strokeStyle = colors.grid
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      // Draw y-axis labels
      ctx.fillStyle = colors.text
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.fillText(((5 - i) * maxValue) / 5 + "", padding - 5, y + 4)
    }

    // Draw line
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.strokeStyle = "#4c1d95"
    data.forEach((point, i) => {
      const x = padding + (i * chartWidth) / (data.length - 1)
      const y = height - padding - (point.value / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw x-axis labels
      ctx.fillStyle = colors.text
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(point.label, x, height - padding + 15)
    })
    ctx.stroke()

    // Draw area under the line
    ctx.lineTo(padding + chartWidth, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
    gradient.addColorStop(0, "rgba(76, 29, 149, 0.5)")
    gradient.addColorStop(1, "rgba(76, 29, 149, 0.1)")
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw data points
    data.forEach((point, i) => {
      const x = padding + (i * chartWidth) / (data.length - 1)
      const y = height - padding - (point.value / maxValue) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.fillStyle = "#4c1d95"
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw title
    ctx.fillStyle = colors.text
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(title, width / 2, 20)
  }

  const drawRadarChart = (
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    width: number,
    height: number,
    colors: any,
  ) => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40
    const angleStep = (2 * Math.PI) / data.length

    // Draw radar grid
    for (let r = 0.2; r <= 1; r += 0.2) {
      ctx.beginPath()
      for (let i = 0; i < data.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + radius * r * Math.cos(angle)
        const y = centerY + radius * r * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw radar axes
    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw labels
      const labelX = centerX + (radius + 20) * Math.cos(angle)
      const labelY = centerY + (radius + 20) * Math.sin(angle)
      ctx.fillStyle = colors.text
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(data[i].label, labelX, labelY)
    }

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value))

    // Draw data polygon
    ctx.beginPath()
    data.forEach((point, i) => {
      const angle = i * angleStep - Math.PI / 2
      const value = point.value / maxValue
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    gradient.addColorStop(0, "rgba(124, 58, 237, 0.8)")
    gradient.addColorStop(1, "rgba(124, 58, 237, 0.2)")
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.strokeStyle = "#7c3aed"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    data.forEach((point, i) => {
      const angle = i * angleStep - Math.PI / 2
      const value = point.value / maxValue
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = "#7c3aed"
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw title
    ctx.fillStyle = colors.text
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(title, width / 2, 20)
  }

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl">
      <canvas ref={canvasRef} className="w-full" style={{ height: `${height}px` }} />
    </Card>
  )
}
