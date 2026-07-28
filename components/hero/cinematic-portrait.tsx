"use client"

import { useRef, useState, useEffect, type MouseEvent } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const layers = [
  { src: "/hero-layers/blazer.png", alt: "Blazer", delay: 0.15, yFrom: 40 },
  { src: "/hero-layers/tie.png", alt: "Tie", delay: 0.55, yFrom: -28 },
  { src: "/hero-layers/shirt.png", alt: "Shirt", delay: 0.95, yFrom: 22 },
  { src: "/hero-layers/face.png", alt: "Portrait", delay: 1.4, yFrom: -16 },
] as const

export default function CinematicPortrait() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [assembled, setAssembled] = useState(false)
  const [ready, setReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 80, damping: 18 })
  const springY = useSpring(my, { stiffness: 80, damping: 18 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    setReady(true)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => setAssembled(true), reduceMotion ? 100 : 2800)
    return () => clearTimeout(t)
  }, [ready, reduceMotion])

  const onMove = (e: MouseEvent) => {
    if (reduceMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const skipAnim = !ready || reduceMotion

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full max-w-[420px] mx-auto aspect-[2/3] select-none"
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-[12%] rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-[20%] rounded-full bg-sky-400/10 blur-2xl pointer-events-none animate-pulse-slow" />

      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-slate-900/40 via-transparent to-slate-950/80 border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.85)_100%)]" />
        </div>

        {layers.map((layer, i) => (
          <motion.div
            key={layer.src}
            className="absolute inset-0"
            style={{ zIndex: i + 1 }}
            initial={skipAnim ? false : { opacity: 0, y: layer.yFrom, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={
              skipAnim
                ? { duration: 0 }
                : {
                    duration: 0.85,
                    delay: layer.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            <Image
              src={layer.src}
              alt={layer.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </motion.div>
        ))}

        <motion.div
          className="absolute inset-0 z-20"
          initial={false}
          animate={{ opacity: assembled ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src="/hero-layers/full.png"
            alt="Pramod Chavhan"
            fill
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </motion.div>

        {assembled && !reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] ring-1 ring-teal-400/20"
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {ready && !assembled && !reduceMotion && (
        <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-slate-400">
          {["Blazer", "Tie", "Shirt", "Face"].map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: [0.25, 1, 0.35] }}
              transition={{ delay: layers[i].delay, duration: 0.8 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  )
}
