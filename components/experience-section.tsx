"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

export default function ExperienceSection() {
  const experiences = [
    {
      role: "jr Data Scientist",
      company: " Pipran Infotech Pvt.Ltd",
      location: "Pune, India",
      period: "March 2023 - Current",
      description: [
        
      ],
    },
    {
      role: "Angular Devloper Intern",
      company: "Assetcues Technologies",
      location: "Pune, India",
      period: "june 2023 - oct 2023",
      description: [
        
      ],
    },
    {
      role: "Data Science Intern",
      company: "InnoDatatics",
      location: "Hyderabad, India",
      period: "January 2022 - March 2022",
      description: [
        
      ],
    },
     
    {
      role: "Machine Learning Project",
      company: "Freelancer",
      location: "Remote",
      period: "March 2024 - August 2024",
      description: [
        
      ],
    },
    {
      role: "IoT Project",
      company: "Smart Indian Hackathon (SIH Portal)",
      location: "India",
      period: "July 2023 - December 2023",
      description: [
       
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-lg text-purple-400 mb-2">My Journey</p>
        <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gray-900"></div>
              </div>

              {/* Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <Card className="bg-gray-800/50 border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {exp.role}
                    </h3>
                    <div className="flex items-center mb-4">
                      <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">
                        {exp.company}, {exp.location}
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-400">{exp.period}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
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
