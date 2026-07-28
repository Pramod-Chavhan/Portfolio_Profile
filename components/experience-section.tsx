"use client"

import { motion } from "framer-motion"
import { experiences } from "@/data/experience"

export default function ExperienceSection() {
  return (
    <section className="section-pad border-t border-white/[0.04]">
      <div className="container-pro">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-3">Career</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-50">
            Experience
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[15px] md:left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-400/60 via-sky-500/30 to-transparent" />

          <div className="space-y-10 md:space-y-14">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="relative grid md:grid-cols-12 gap-4 md:gap-8 pl-10 md:pl-16"
              >
                <div className="absolute left-2 md:left-4 top-1.5 h-4 w-4 rounded-full border-2 border-teal-400 bg-slate-950 shadow-[0_0_20px_rgba(45,212,191,0.35)]" />

                <div className="md:col-span-4">
                  <p className="text-xs text-teal-400 mb-1">{exp.period}</p>
                  <h3 className="font-display text-xl font-bold text-slate-50">{exp.company}</h3>
                  <p className="text-sm text-slate-400 mt-1">{exp.role}</p>
                  <p className="text-xs text-slate-600 mt-1">{exp.location}</p>
                </div>

                <ul className="md:col-span-8 space-y-3">
                  {exp.description.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-400 text-sm md:text-base leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
