"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight, Lock } from "lucide-react"
import { getSortedProjects } from "@/data/projects"
import type { Project } from "@/types/portfolio"

const iconMap: Record<Project["iconKey"], string> = {
  brain: "CV",
  chart: "ML",
  database: "IoT",
  code: "NLP",
  bot: "GenAI",
  search: "RAG",
}

export default function ProjectsSection() {
  const featured = getSortedProjects().filter((p) => p.featured)
  const more = getSortedProjects().filter((p) => !p.featured).slice(0, 6)

  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="mb-14 md:mb-20 max-w-2xl">
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-4">
            Projects that shipped
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Case studies from production — RAG chatbots, computer vision, IoT, and predictive ML with measurable impact.
          </p>
        </div>

        <div className="space-y-8 md:space-y-14">
          {featured.map((project, index) => (
            <ProjectCase key={project.id} project={project} index={index} />
          ))}
        </div>

        {more.length > 0 && (
          <div className="mt-20">
            <p className="eyebrow mb-6">More experiments</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {more.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.06 }}
                  className="group surface overflow-hidden hover:border-teal-400/25 transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <ProjectImage project={p} variant="card" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 rounded-full bg-slate-950/75 text-teal-300 border border-teal-400/20">
                      {iconMap[p.iconKey]}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display font-semibold text-slate-100 group-hover:text-teal-200 transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label="Demo">
                            <ExternalLink className="h-4 w-4 text-slate-400 hover:text-teal-300" />
                          </a>
                        )}
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="Code">
                            <Github className="h-4 w-4 text-slate-400 hover:text-teal-300" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectImage({ project, variant }: { project: Project; variant: "hero" | "card" }) {
  const sizes = variant === "hero" ? "(max-width:768px) 100vw, 40vw" : "(max-width:768px) 100vw, 33vw"

  return (
    <Image
      src={project.image}
      alt={project.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      sizes={sizes}
      quality={80}
      priority={variant === "hero"}
    />
  )
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group grid md:grid-cols-12 gap-6 md:gap-10 items-stretch surface overflow-hidden p-4 md:p-6"
    >
      <div
        className={`md:col-span-5 relative aspect-[16/10] md:aspect-auto md:min-h-[280px] rounded-xl overflow-hidden bg-slate-900 ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <ProjectImage project={project} variant="hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06] rounded-xl pointer-events-none" />
        <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-teal-300 border border-teal-400/20">
          Featured · {iconMap[project.iconKey]}
        </span>
        {project.nda && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-950/85 backdrop-blur-sm text-amber-200/90 border border-amber-400/20">
            <Lock className="h-3 w-3" />
            Enterprise · NDA
          </span>
        )}
      </div>

      <div className={`md:col-span-7 flex flex-col ${reverse ? "md:order-1" : ""}`}>
        {(project.company || project.period) && (
          <p className="text-xs text-teal-400/90 mb-2">
            {[project.company, project.period].filter(Boolean).join(" · ")}
          </p>
        )}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-50 mb-3 tracking-tight">
          {project.title}
        </h3>
        <p className="text-slate-400 leading-relaxed mb-5 max-w-xl">{project.description}</p>

        {project.caseStudy && (
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Problem</p>
              <p className="text-sm text-slate-300 leading-relaxed">{project.caseStudy.problem}</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Approach</p>
              <p className="text-sm text-slate-300 leading-relaxed">{project.caseStudy.approach}</p>
            </div>
            <ul className="sm:col-span-2 space-y-2">
              {project.caseStudy.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-slate-400">
                  <span className="text-teal-400 mt-1 shrink-0">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-6 max-w-md">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2.5">
              <p className="font-display text-lg font-semibold text-teal-300">{m.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 6).map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-white/[0.08] text-slate-400">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-auto">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-teal-300 hover:text-teal-200"
            >
              Live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : project.nda ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-amber-200/70">
              <Lock className="h-3.5 w-3.5" /> Production · available on request
            </span>
          ) : (
            <span className="text-sm text-slate-600">Demo coming soon</span>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200"
            >
              <Github className="h-4 w-4" /> Code
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
