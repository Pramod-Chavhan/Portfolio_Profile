"use client"

import { motion } from "framer-motion"
import { profile } from "@/data/profile"
import { experiences } from "@/data/experience"
import { projects } from "@/data/projects"
import { certificates } from "@/data/certificates"

const featuredCount = projects.filter((p) => p.featured).length

const signals = [
  { label: "Experience", value: `${profile.yearsExperience} yrs` },
  { label: "Featured work", value: `${featuredCount} projects` },
  { label: "Certifications", value: `${certificates.length} earned` },
  { label: "Current role", value: experiences[0]?.company ?? "—" },
]

export default function SignalStrip() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015]">
      <div className="container-pro py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {signals.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="md:border-l md:border-white/[0.06] md:pl-6 first:md:border-0 first:md:pl-0"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5">{s.label}</p>
              <p className="font-display text-sm md:text-base font-semibold text-slate-100 truncate">{s.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
