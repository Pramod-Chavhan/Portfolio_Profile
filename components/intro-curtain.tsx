"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { profile } from "@/data/profile"

export default function IntroCurtain() {
  const [show, setShow] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) {
      setShow(false)
      return
    }
    try {
      if (localStorage.getItem("portfolio-intro-seen")) {
        setShow(false)
        return
      }
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => {
      setShow(false)
      try {
        localStorage.setItem("portfolio-intro-seen", "1")
      } catch {
        /* ignore */
      }
    }, 1900)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070A0F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 film-grain opacity-25 pointer-events-none" />
          <div className="text-center px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="eyebrow mb-5"
            >
              Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl md:text-6xl font-bold tracking-tight"
            >
              <span className="text-slate-100">{profile.name.split(" ")[0]} </span>
              <span className="gradient-text">{profile.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>
            <motion.div
              className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
