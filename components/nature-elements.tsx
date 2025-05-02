"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

// Butterfly SVG paths
const butterflyPaths = {
  body: "M12,18 C12,18 9,14 9,10 C9,6 12,4 12,4 C12,4 15,6 15,10 C15,14 12,18 12,18 Z",
  leftWing: "M12,4 C12,4 4,-2 1,6 C-2,14 12,18 12,18 C12,18 6,12 6,10 C6,8 8,4 12,4 Z",
  rightWing: "M12,4 C12,4 20,-2 23,6 C26,14 12,18 12,18 C12,18 18,12 18,10 C18,8 16,4 12,4 Z",
}

const Butterfly = ({ delay = 0, duration = 20, startPosition = { x: 0, y: 0 } }) => {
  const colors = [
    ["#9c27b0", "#673ab7"], // Purple
    ["#e91e63", "#9c27b0"], // Pink-Purple
    ["#2196f3", "#03a9f4"], // Blue
    ["#ff9800", "#ff5722"], // Orange
  ]

  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const wingColor1 = randomColor[0]
  const wingColor2 = randomColor[1]

  const pathVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  }

  const wingVariants = {
    rest: { rotate: 0 },
    flutter: {
      rotate: [0, 40, 0, -40, 0],
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  }

  // Random flight path
  const getRandomPath = () => {
    const points = []
    const numPoints = 10
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1000
    const screenHeight = typeof window !== "undefined" ? window.innerHeight * 2 : 1000

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * screenWidth,
        y: Math.random() * screenHeight,
      })
    }
    return points
  }

  const flightPath = getRandomPath()

  return (
    <motion.div
      className="absolute z-10 pointer-events-none"
      initial={{ x: startPosition.x, y: startPosition.y, opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: flightPath.map((p) => p.x),
        y: flightPath.map((p) => p.y),
        scale: [0.5, 0.7, 0.6, 0.8, 0.7, 0.5],
      }}
      transition={{
        duration: duration,
        times: [0, 0.1, 0.9, 1],
        delay: delay,
        ease: "easeInOut",
      }}
      style={{ width: "40px", height: "40px" }}
    >
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <motion.g variants={pathVariants} initial="hidden" animate="visible">
          <motion.path
            d={butterflyPaths.leftWing}
            fill={`url(#gradient-left-${delay})`}
            variants={wingVariants}
            initial="rest"
            animate="flutter"
          />
          <motion.path
            d={butterflyPaths.rightWing}
            fill={`url(#gradient-right-${delay})`}
            variants={wingVariants}
            initial="rest"
            animate="flutter"
          />
          <path d={butterflyPaths.body} fill="#111" />

          <defs>
            <radialGradient id={`gradient-left-${delay}`} cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor={wingColor1} stopOpacity="0.9" />
              <stop offset="100%" stopColor={wingColor2} stopOpacity="0.6" />
            </radialGradient>
            <radialGradient id={`gradient-right-${delay}`} cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor={wingColor1} stopOpacity="0.9" />
              <stop offset="100%" stopColor={wingColor2} stopOpacity="0.6" />
            </radialGradient>
          </defs>
        </motion.g>
      </svg>
    </motion.div>
  )
}

const Flower = ({ x, y, size = 1, color = "#e91e63", delay = 0 }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: `${size * 40}px`, height: `${size * 40}px` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Petals */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.ellipse
            key={i}
            cx="50"
            cy="50"
            rx="20"
            ry="35"
            fill={color}
            opacity="0.9"
            transform={`rotate(${angle} 50 50)`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + i * 0.1 }}
          />
        ))}
        {/* Center */}
        <motion.circle
          cx="50"
          cy="50"
          r="15"
          fill="#ffeb3b"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.6 }}
        />
      </svg>
    </motion.div>
  )
}

export default function NatureElements() {
  const containerRef = useRef(null)

  // Generate random positions for flowers
  const flowers = []
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * 100
    const y = Math.random() * 200 + 100
    const size = Math.random() * 0.5 + 0.7
    const colors = ["#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#ff9800"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    flowers.push({ x: `${x}%`, y: y, size, color, delay: i * 0.2 })
  }

  // Generate butterflies with different delays
  const butterflies = []
  for (let i = 0; i < 6; i++) {
    const delay = i * 3
    const duration = Math.random() * 10 + 15
    const startX = Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000)
    const startY = Math.random() * (typeof window !== "undefined" ? window.innerHeight : 500)
    butterflies.push({ delay, duration, startPosition: { x: startX, y: startY } })
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {flowers.map((flower, i) => (
        <Flower key={i} x={flower.x} y={flower.y} size={flower.size} color={flower.color} delay={flower.delay} />
      ))}

      {butterflies.map((butterfly, i) => (
        <Butterfly
          key={i}
          delay={butterfly.delay}
          duration={butterfly.duration}
          startPosition={butterfly.startPosition}
        />
      ))}
    </div>
  )
}
