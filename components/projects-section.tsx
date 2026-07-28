"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Github,
  ExternalLink,
  Code,
  BarChart2,
  Database,
  BrainCircuit,
  ChevronRight,
  ChevronDown,
  Bot,
  Search,
  Star,
} from "lucide-react"
import EnhancedSectionHeading from "@/components/enhanced-section-heading"
import { projects, projectFilters, getSortedProjects } from "@/data/projects"
import type { Project } from "@/types/portfolio"
import type { ReactNode } from "react"

const iconMap: Record<Project["iconKey"], ReactNode> = {
  brain: <BrainCircuit className="h-4 w-4 text-teal-400" />,
  chart: <BarChart2 className="h-4 w-4 text-sky-400" />,
  database: <Database className="h-4 w-4 text-cyan-400" />,
  code: <Code className="h-4 w-4 text-teal-300" />,
  bot: <Bot className="h-4 w-4 text-sky-300" />,
  search: <Search className="h-4 w-4 text-cyan-300" />,
}

function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateXRaw = useTransform(my, [-0.5, 0.5], [6, -6])
  const rotateYRaw = useTransform(mx, [-0.5, 0.5], [-8, 8])
  const rx = useSpring(rotateXRaw, { stiffness: 120, damping: 16 })
  const ry = useSpring(rotateYRaw, { stiffness: 120, damping: 16 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [visibleProjects, setVisibleProjects] = useState(6)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const sorted = getSortedProjects(projects)

  const filteredProjects =
    activeFilter === "all"
      ? sorted
      : activeFilter === "featured"
        ? sorted.filter((p) => p.featured)
        : sorted.filter((p) => p.tags.includes(activeFilter) || p.category === activeFilter)

  const currentProjects = filteredProjects.slice(0, visibleProjects)
  const hasMoreProjects = visibleProjects < filteredProjects.length

  const loadMoreProjects = () => setVisibleProjects((prev) => prev + 6)

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    setVisibleProjects(6)
  }

  return (
    <div className="container mx-auto px-4 py-16" ref={containerRef}>
      <EnhancedSectionHeading
        subtitle="Selected Work"
        title="Projects"
        description="Featured production work from my resume — RAG, computer vision, IoT, and predictive ML — plus earlier experiments across GenAI and data science."
      />

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {projectFilters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`
              rounded-full px-4 transition-all duration-300 text-sm
              ${
                activeFilter === filter.id
                  ? "gradient-btn text-white border-transparent"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800/60"
              }
            `}
            onClick={() => handleFilterChange(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        style={{ perspective: 1000 }}
      >
        <AnimatePresence mode="popLayout">
          {currentProjects.map((project, index) => (
            <TiltCard key={project.id} className="h-full">
              <motion.div
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-teal-900/20 group">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-slate-950/80 backdrop-blur-sm text-teal-300 border border-teal-500/20">
                          {iconMap[project.iconKey]}
                          <span className="ml-1 capitalize">{project.category.replace("-", " ")}</span>
                        </Badge>
                        {project.featured && (
                          <Badge className="bg-teal-500/20 text-teal-200 border border-teal-400/30 backdrop-blur-sm">
                            <Star className="h-3 w-3 mr-1 fill-teal-300 text-teal-300" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-display text-xl font-bold mb-2 text-slate-100">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 flex-grow leading-relaxed">{project.description}</p>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="text-center p-2 rounded-lg bg-slate-800/70 border border-slate-700/50">
                            <p className="text-teal-300 font-bold text-sm md:text-base">{metric.value}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{metric.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs border-slate-700 bg-slate-800/40 text-slate-300"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        {project.demo ? (
                          <Button
                            className="flex-1 gradient-btn text-white"
                            onClick={() => window.open(project.demo, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </Button>
                        ) : (
                          <Button className="flex-1" variant="secondary" disabled>
                            Demo soon
                          </Button>
                        )}
                        {project.github ? (
                          <Button
                            variant="outline"
                            className="flex-1 border-slate-700 hover:bg-slate-800"
                            onClick={() => window.open(project.github, "_blank")}
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        ) : (
                          <Button variant="outline" className="flex-1 border-slate-700" disabled>
                            Private
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TiltCard>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMoreProjects && (
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button className="group gradient-btn text-white px-8" onClick={loadMoreProjects}>
            Load More
            <ChevronDown className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
        </motion.div>
      )}

      <div className="flex justify-center mt-8">
        <Button
          className="group border border-slate-700 bg-transparent hover:bg-slate-800/60 text-slate-200 px-8"
          variant="outline"
          onClick={() => window.open("https://github.com/Pramod-Chavhan", "_blank")}
        >
          View GitHub
          <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
