"use client"

import type { ReactNode } from "react"

interface AnimatedGradientBorderProps {
  children: ReactNode
  className?: string
  borderWidth?: number
  duration?: number
}

export default function AnimatedGradientBorder({
  children,
  className = "",
  borderWidth = 2,
  duration = 4,
}: AnimatedGradientBorderProps) {
  return (
    <div
      className={`relative rounded-lg p-[${borderWidth}px] overflow-hidden ${className}`}
      style={{
        padding: borderWidth,
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(var(--rotate), #8b5cf6, #ec4899, #3b82f6, #8b5cf6)`,
          backgroundSize: "200% 200%",
          animation: `gradient-animation ${duration}s linear infinite`,
          zIndex: -1,
        }}
      />

      {/* Content */}
      <div className="bg-gray-800 rounded-lg relative w-full h-full">{children}</div>
    </div>
  )
}
