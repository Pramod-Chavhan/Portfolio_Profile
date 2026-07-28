"use client"

import { useEffect, useState, type MouseEvent } from "react"

/** Soft spotlight that follows the pointer across the page */
export default function AmbientSpotlight() {
  const [pos, setPos] = useState({ x: 50, y: 30 })
  const [on, setOn] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return
    setOn(true)

    const move = (e: globalThis.MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener("mousemove", move, { passive: true })
    return () => window.removeEventListener("mousemove", move)
  }, [])

  if (!on) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-60 mix-blend-screen"
      style={{
        background: `radial-gradient(520px circle at ${pos.x}% ${pos.y}%, rgba(45,212,191,0.09), transparent 45%)`,
      }}
    />
  )
}
