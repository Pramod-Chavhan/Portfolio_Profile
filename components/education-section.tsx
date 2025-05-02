"use client"

import { motion } from "framer-motion"
import { GraduationCap, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EducationSection() {
  const education = [
    {
      degree: "Master of Computer Application",
      period: "2022 - 2024",
      institution: "KJ's Trinity Academy Of Engineering, Pune, Maharashtra",
    },
    {
      degree: "Bachelor of Computer Application",
      period: "2019 - 2021",
      institution: "Gopikabai Sitaram Gawande Mahavidhalaya, Umarkhed, Maharashtra",
    },
    {
      degree: "12th (Science)",
      period: "2017 - 2018",
      institution: "Gopikabai Sitaram Gawande Mahavidhalaya, Umarkhed, Maharashtra",
    },
    {
      degree: "10th (Marathi)",
      period: "2015 - 2016",
      institution: "SaiPrakash Vidhalaya Sakhara, Maharashtra",
    },
  ]

  const training = [
    {
      course: "Data Science & Data Analytics",
      period: "Feb 2021 - July 2021",
      institution: "360DigiTMG, India",
    },
  ]

  const experience = [
    {
      role: "Data Scientist Intern",
      period: "April 2022 - July 2022",
      company: "InnoDatatics, Hyderabad, India",
      projects: [
        {
          name: "Appointment Scheduler for Sample Collection",
          description: [
            "The project aims to streamline and give a proper schedule for sample collection.",
            "We see many times there is a delay in sample collection so this model will help them choose the right possible way to collect samples in the future.",
          ],
        },
      ],
    },
    {
      role: "Machine Learning Project",
      period: "March 2023 - July 2023",
      company: "KJ's Trinity, Pune, India",
      projects: [
        {
          name: "Face Recognition Based Attendance Systems",
          description: [
            "Developing a face recognition-based attendance system for a college to improve the accuracy and efficiency of the attendance process while reducing the time and resources required for manual tracking.",
          ],
        },
      ],
    },
    {
      role: "Machine Learning Project",
      period: "March 2024 - August 2024",
      company: "Freelancer",
      projects: [
        {
          name: "Advance Virtual Assistant (Jarvis)",
          description: [
            "Led development of a Jarvis-inspired virtual assistant project, integrating natural language processing and machine learning algorithms for voice recognition and task automation.",
            "Designed intuitive user interfaces and implemented backend systems for seamless interaction. Achieved streamlined workflows and enhanced productivity through personalized assistance and intelligent automation.",
          ],
        },
      ],
    },
    {
      role: "IOT",
      period: "July 2023 - Dec 2023",
      company: "Smart Indian Hackathon (SIH Portal)",
      projects: [
        {
          name: "Smart Irrigation system For Crop Using IoT",
          description: [
            "The innovative solution combines AI and real-time soil moisture monitoring to optimize irrigation in piped and micro irrigation networks.",
            "It addresses challenges such as dynamic water demand, data integration, algorithm precision, valve control, adaptability, user friendliness, and economic viability.",
            "The system predicts crop water needs, controls valves for precise irrigation, and offers a user-friendly interface.",
            "It aims to increase crop yield, conserve water, and minimize environmental impact in modern agriculture.",
          ],
        },
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
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">Education & Experience</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center text-purple-400">
              <GraduationCap className="mr-2" />
              Educational Background
            </h3>

            <div className="space-y-6">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-white">{item.degree}</h4>
                      <p className="text-purple-400 font-medium mt-1">{item.period}</p>
                      <p className="text-gray-400 mt-2">{item.institution}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center text-purple-400">
              <GraduationCap className="mr-2" />
              Training
            </h3>

            <div className="space-y-6">
              {training.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-white">{item.course}</h4>
                      <p className="text-purple-400 font-medium mt-1">{item.period}</p>
                      <p className="text-gray-400 mt-2">{item.institution}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center text-purple-400">
            <Briefcase className="mr-2" />
            Work Experience
          </h3>

          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-white">{item.role}</h4>
                    <p className="text-purple-400 font-medium mt-1">{item.period}</p>
                    <p className="text-gray-400 mt-2">{item.company}</p>

                    {item.projects.map((project, idx) => (
                      <div key={idx} className="mt-4">
                        <h5 className="font-medium text-white">{project.name}</h5>
                        <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                          {project.description.map((desc, descIdx) => (
                            <li key={descIdx} className="text-sm">
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
