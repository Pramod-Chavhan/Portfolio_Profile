"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { experiences } from "@/data/experience"
import EnhancedSectionHeading from "@/components/enhanced-section-heading"

export default function ExperienceSection() {
  return (
    <div className="container mx-auto px-4">
      <EnhancedSectionHeading
        subtitle="Career Path"
        title="Experience"
        description="Production ML, GenAI, and RAG delivery across product and consulting environments."
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500 via-sky-500/60 to-transparent md:-translate-x-1/2" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 z-10 ring-4 ring-slate-950" />

              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <Card className="bg-slate-900/60 border-slate-800 overflow-hidden hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-900/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-slate-400">
                      <span className="inline-flex items-center">
                        <Briefcase className="h-4 w-4 mr-1.5 text-teal-500" />
                        {exp.company}
                      </span>
                      <span className="inline-flex items-center">
                        <MapPin className="h-4 w-4 mr-1.5 text-sky-500" />
                        {exp.location}
                      </span>
                      <span className="inline-flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-slate-500" />
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2.5 text-slate-300 text-sm leading-relaxed">
                      {exp.description.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
