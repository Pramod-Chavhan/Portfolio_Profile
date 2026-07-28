"use client"

import { motion } from "framer-motion"
import { languageSkills, mlAiSkills, toolsSkills } from "@/data/skills"

const groups = [
  { title: "Languages & Frameworks", items: languageSkills },
  { title: "Machine Learning & AI", items: mlAiSkills },
  { title: "Tools & Platforms", items: toolsSkills },
]

export default function SkillsSection() {
  return (
    <section className="section-pad border-t border-white/[0.04]">
      <div className="container-pro">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-3">Capabilities</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-4">
            Skills
          </h2>
          <p className="text-slate-400 text-lg">
            Stack used to deliver production RAG, LLM fine-tuning, and end-to-end ML systems.
          </p>
        </div>

        <div className="space-y-12">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
            >
              <h3 className="text-sm font-medium text-slate-300 mb-4 tracking-wide">{group.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.02 * i }}
                    whileHover={{ y: -2, borderColor: "rgba(45,212,191,0.45)" }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-sm text-slate-300"
                  >
                    {skill.name}
                    <span className="text-[10px] tabular-nums text-teal-400/80">{skill.level}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
