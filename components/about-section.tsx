"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { profile } from "@/data/profile"
import { experiences } from "@/data/experience"

export default function AboutSection() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3 sticky top-28">About</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-6 lg:sticky lg:top-36">
              Building AI that ships
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-300 text-lg md:text-xl leading-relaxed"
            >
              {profile.summary}
            </motion.p>

            <div className="grid sm:grid-cols-3 gap-4">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="surface p-5"
                >
                  <p className="text-[10px] uppercase tracking-widest text-teal-400 mb-2">{exp.period}</p>
                  <p className="font-display font-semibold text-slate-100 text-sm mb-1">{exp.company}</p>
                  <p className="text-xs text-slate-500">{exp.role}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {profile.education.map((ed) => (
                <div key={ed.degree} className="surface p-5">
                  <p className="font-display font-semibold text-slate-100 mb-1">{ed.degree}</p>
                  <p className="text-sm text-teal-400/90">
                    {ed.period}
                    {ed.detail ? ` · ${ed.detail}` : ""}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{ed.institution}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <p className="text-sm text-slate-500">
                Languages: {profile.languages.join(" · ")}
              </p>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full gradient-btn px-5 py-2.5 text-sm"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
