"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EnhancedSectionHeading from "@/components/enhanced-section-heading"
import EnhancedCard from "@/components/enhanced-card"

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("technical")

  const technicalSkills = [
    { name: "Python", level: 90 },
    { name: "Machine Learning", level: 85 },
    { name: "Data Science", level: 85 },
    { name: "NLP", level: 80 },
    { name: "SQL", level: 80 },
    { name: "NumPy", level: 90 },
    { name: "Pandas", level: 90 },
    { name: "Matplotlib", level: 85 },
    { name: "Seaborn", level: 80 },
    { name: "Plotly", level: 75 }, 
    { name: "Flask", level: 75 },
    { name: "FastAPI", level: 70 },
    { name: "TensorFlow", level: 75 },
    { name: "PyTorch", level: 80 },
    { name: "OpenCV", level: 80 },
    { name: "Scikit-learn", level: 85 },
    { name: "HTML/CSS", level: 80 }, 
  ]

  const toolsSkills = [
    { name: "Tableau", level: 80 },
    { name: "Power BI", level: 75 },
    { name: "Excel", level: 85 },
    { name: "Git", level: 70 },
    { name: "Jupyter Notebook", level: 90 },
    { name: "VS Code", level: 85 },
    { name: "Arduino", level: 75 },
    { name: "Docker", level: 65 },
    { name: "AWS", level: 60 },
    { name: "Anaconda", level: 80 },
    { name: "Postman", level: 75 },
    { name: "Heroku", level: 70 },
    

  ]

  const softSkills = [
    { name: "Problem Solving", level: 90 },
    { name: "Communication", level: 85 },
    { name: "Teamwork", level: 90 },
    { name: "Time Management", level: 80 },
    { name: "Adaptability", level: 85 },
    { name: "Critical Thinking", level: 90 },
    { name: "Creativity", level: 80 },
    { name: "Leadership", level: 75 },
    { name: "Negotiation", level: 70 },
    { name: "Emotional Intelligence", level: 85 },
    { name: "Decision Making", level: 80 },
  ]

  const renderSkills = (skills) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <EnhancedCard key={index} delay={index * 0.05}>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{skill.name}</h3>
                <span className="text-sm text-purple-400">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                ></motion.div>
              </div>
            </div>
          </EnhancedCard>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <EnhancedSectionHeading
        subtitle="What I Know"
        title="My Skills"
        description="I've developed expertise in various technologies and tools throughout my career, allowing me to deliver comprehensive solutions across multiple domains."
      />

      <Tabs defaultValue="technical" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-12">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="technical" className="text-base">
              Technical
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-base">
              Tools
            </TabsTrigger>
            <TabsTrigger value="soft" className="text-base">
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
