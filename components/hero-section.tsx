"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight, Linkedin, MapPin } from "lucide-react"
import Link from "next/link"
import { profile } from "@/data/profile"
import CinematicPortrait from "@/components/hero/cinematic-portrait"

const HeroDepthScene = dynamic(() => import("@/components/hero/hero-depth-scene"), {
  ssr: false,
})

export default function HeroSection() {
  const typeSequence = profile.roles.flatMap((role) => [role, 1600])

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <HeroDepthScene />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.1),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 hero-grid opacity-[0.12] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-teal-400 mb-4"
            >
              {profile.title}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.05] tracking-tight"
            >
              <span className="gradient-text">{profile.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="text-xl md:text-2xl font-semibold text-slate-200 mb-5 h-10"
            >
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="text-slate-400 text-base md:text-lg mb-6 leading-relaxed"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.42 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500 mb-8"
            >
              <MapPin className="h-4 w-4 text-teal-500" />
              {profile.location} · {profile.yearsExperience} years experience
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <Button asChild size="lg" className="gradient-btn text-white">
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-600 bg-slate-900/40 hover:bg-slate-800/80 text-slate-100"
              >
                <Link href="#contact">Contact Me</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800/60"
              >
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800/60"
              >
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Cinematic portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <CinematicPortrait />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
