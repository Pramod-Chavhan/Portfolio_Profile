"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EnhancedSectionHeading from "@/components/enhanced-section-heading"
import EnhancedCard from "@/components/enhanced-card"
import { technicalSkills, toolsSkills, softSkills } from "@/data/skills"
import type { Skill } from "@/types/portfolio"

export default function SkillsSection() {
  const renderSkills = (skills: Skill[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <EnhancedCard key={skill.name} delay={index * 0.04}>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-slate-100">{skill.name}</h3>
              <span className="text-sm text-teal-400">{skill.level}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, delay: 0.08 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-teal-500 to-sky-500 rounded-full"
              />
            </div>
          </div>
        </EnhancedCard>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto px-4">
      <EnhancedSectionHeading
        subtitle="Capabilities"
        title="Skills"
        description="Languages, ML/GenAI stack, vector databases, and cloud tooling used to ship production AI systems."
      />

      <Tabs defaultValue="technical" className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="grid grid-cols-3 w-full max-w-md bg-slate-900/80 border border-slate-800">
            <TabsTrigger value="technical" className="text-base data-[state=active]:bg-teal-600/20">
              Technical
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-base data-[state=active]:bg-sky-600/20">
              Tools
            </TabsTrigger>
            <TabsTrigger value="soft" className="text-base data-[state=active]:bg-cyan-600/20">
              Soft Skills
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="technical" className="mt-0">
          {renderSkills(technicalSkills)}
        </TabsContent>
        <TabsContent value="tools" className="mt-0">
          {renderSkills(toolsSkills)}
        </TabsContent>
        <TabsContent value="soft" className="mt-0">
          {renderSkills(softSkills)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
