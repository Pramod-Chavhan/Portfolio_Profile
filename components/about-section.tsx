"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, BookOpen, Award, Briefcase } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profile } from "@/data/profile"
import { experiences } from "@/data/experience"
import EnhancedSectionHeading from "@/components/enhanced-section-heading"

export default function AboutSection() {
  const downloadCV = () => {
    window.open(profile.cvUrl, "_blank")
  }

  const stats = [
    { icon: <Briefcase className="h-6 w-6 text-teal-400" />, value: profile.yearsExperience, label: "Years Exp." },
    { icon: <Award className="h-6 w-6 text-sky-400" />, value: "15+", label: "Certificates" },
    { icon: <BookOpen className="h-6 w-6 text-cyan-400" />, value: "19+", label: "Projects" },
  ]

  return (
    <div className="container mx-auto px-4">
      <EnhancedSectionHeading subtitle="Get To Know" title="About Me" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="relative"
          style={{ perspective: 1000 }}
        >
          <div className="relative w-full max-w-md mx-auto aspect-[3/4]">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-teal-500/30 via-transparent to-sky-500/20 blur-sm" />
            <motion.div
              className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 z-10"
              whileHover={{ rotateY: -4, rotateX: 2 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/hero-layers/full.png"
                alt={profile.name}
                width={600}
                height={800}
                className="object-cover object-top w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 bg-slate-900/80 border border-slate-800">
              <TabsTrigger value="about" className="text-base data-[state=active]:bg-teal-600/20">
                About Me
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-base data-[state=active]:bg-sky-600/20">
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center p-4 rounded-xl bg-slate-900/60 border border-slate-800"
                  >
                    {stat.icon}
                    <span className="text-2xl font-display font-bold mt-2">{stat.value}</span>
                    <span className="text-xs text-slate-500">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-300 leading-relaxed">{profile.summary}</p>
              <p className="text-slate-400 leading-relaxed">
                Currently building RAG chatbots and GenAI workflows at Rutamsoft, after shipping 7+ ML models and
                cloud-hosted LLM apps at Pipran Infotech. Comfortable across Python, Hugging Face, FastAPI, and vector
                databases (Qdrant, Pinecone).
              </p>

              <Button onClick={downloadCV} className="mt-4 gradient-btn text-white relative overflow-hidden group">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-teal-400">Education</h3>
                  <ul className="space-y-4">
                    {profile.education.map((ed) => (
                      <li key={ed.degree} className="pl-5 border-l-2 border-teal-500/60 relative">
                        <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-teal-400" />
                        <h4 className="font-medium text-slate-100">{ed.degree}</h4>
                        <p className="text-sm text-slate-500">
                          {ed.period}
                          {ed.detail ? ` · ${ed.detail}` : ""}
                        </p>
                        <p className="text-sm text-slate-400">{ed.institution}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-sky-400">Roles</h3>
                  <ul className="space-y-4">
                    {experiences.map((exp) => (
                      <li key={exp.role + exp.company} className="pl-5 border-l-2 border-sky-500/60 relative">
                        <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-sky-400" />
                        <h4 className="font-medium text-slate-100">{exp.role}</h4>
                        <p className="text-sm text-slate-500">{exp.period}</p>
                        <p className="text-sm text-slate-400">
                          {exp.company}, {exp.location}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
