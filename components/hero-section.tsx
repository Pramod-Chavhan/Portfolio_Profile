"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { ArrowDownRight, Github, Linkedin } from "lucide-react"
import { profile } from "@/data/profile"
import CinematicPortrait from "@/components/hero/cinematic-portrait"
import Magnetic from "@/components/motion/magnetic"

const HeroDepthScene = dynamic(() => import("@/components/hero/hero-depth-scene"), { ssr: false })

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const typeSequence = profile.roles.flatMap((r) => [r, 1500])

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden pt-20">
      <HeroDepthScene />
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="container-pro relative z-10 w-full pb-16 md:pb-0">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-end lg:items-center min-h-[78svh]">
          {/* Brand-first copy */}
          <motion.div style={{ y, opacity }} className="lg:col-span-6 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="eyebrow mb-5"
            >
              {profile.location} · {profile.yearsExperience} yrs
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-6"
            >
              <span className="block text-slate-100">{profile.name.split(" ")[0]}</span>
              <span className="block gradient-text">{profile.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="h-8 mb-5 text-lg md:text-xl font-medium"
            >
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={48}
                repeat={Number.POSITIVE_INFINITY}
                className="text-slate-300"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed mb-8"
            >
              Production ML & GenAI — RAG pipelines, LLM apps, and measurable automation for real products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Link
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full gradient-btn px-6 py-3 text-sm"
                >
                  View selected work
                  <ArrowDownRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-slate-200 hover:border-teal-400/40 hover:bg-white/[0.06] transition-colors"
                >
                  Contact
                </Link>
              </Magnetic>
              <div className="flex gap-1 ml-1">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full text-slate-400 hover:text-teal-300 hover:bg-white/5 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full text-slate-400 hover:text-teal-300 hover:bg-white/5 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Cinematic 3D portrait — dominant visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[440px] relative">
              <div className="absolute -inset-8 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
              <CinematicPortrait />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
