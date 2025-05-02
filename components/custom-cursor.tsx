"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button]").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()
    return () => removeEventListeners()
  }, [])

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 28,
      width: 28,
    },
    hovered: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
    },
  }

  const cursorInnerVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      height: 8,
      width: 8,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
    },
    hovered: {
      x: position.x - 12,
      y: position.y - 12,
      height: 24,
      width: 24,
      opacity: 0.5,
    },
  }

  return (
    <div className="cursor-container">
      <motion.div
        className={`cursor-outer ${hidden ? "opacity-0" : "opacity-100"}`}
        variants={cursorVariants}
        animate={clicked ? "clicked" : linkHovered ? "hovered" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className={`cursor-inner ${hidden ? "opacity-0" : "opacity-100"}`}
        variants={cursorInnerVariants}
        animate={clicked ? "clicked" : linkHovered ? "hovered" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
    </div>
  )
}
