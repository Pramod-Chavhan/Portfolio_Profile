"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, BookOpen, Award, Coffee } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutSection() {
  const downloadCV = () => {
    window.open("https://raw.githubusercontent.com/Pramod-Chavhan/Resume/main/DS_EXperience.pdf", "_blank");
  }

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1])

  const stats = [
    { icon: <Coffee className="h-6 w-6 text-purple-400" />, value: "500+", label: "Coffee Cups" },
    { icon: <Award className="h-6 w-6 text-pink-400" />, value: "15+", label: "Certificates" },
    { icon: <BookOpen className="h-6 w-6 text-blue-400" />, value: "10+", label: "Projects" },
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
        <p className="text-lg text-purple-400 mb-2">Get To Know</p>
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
          style={{ scale, opacity }}
        >
          <div className="relative w-full max-w-md mx-auto aspect-square">
            {/* Background shapes */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-xl bg-gradient-to-br from-purple-500 to-transparent"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-xl bg-gradient-to-tl from-pink-500 to-transparent"></div>

            {/* Main image */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border-4 border-gray-800 z-10">
              <Image
                src="/pic1.png?height=600&width=600"
                alt="Pramod Chavhan"
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="about" className="text-base">
                About Me
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-base">
                Experience
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                  >
                    {stat.icon}
                    <span className="text-2xl font-bold mt-2">{stat.value}</span>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed">
              I am a passionate and results-oriented Data Scientist and Machine Learning Engineer with over two years of hands-on experience in building and deploying AI-driven solutions. My expertise lies in designing robust machine learning models, developing intelligent systems, and transforming complex data into actionable insights that drive business efficiency.
              </p>

              <p className="text-gray-300 leading-relaxed">
              With a strong foundation in Python, deep learning, and end-to-end data science pipelines, I have successfully led projects ranging from real-time facial recognition systems to AI-powered scheduling and smart irrigation platforms. My technical proficiency extends across frameworks such as TensorFlow, Scikit-Learn, and OpenCV, and I’m equally adept at backend integration using Flask and FastAPI.
              </p>

              <p className="text-gray-300 leading-relaxed">
              I hold a Master’s in Computer Applications and have earned multiple certifications in Data Science, AI, and Web Development. As a dedicated problem-solver and team collaborator, I’m committed to continuous learning and applying emerging technologies to real-world challenges.
              </p>

              <Button
                onClick={downloadCV}
                className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 relative overflow-hidden group"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Education</h3>
                  <ul className="space-y-4">
                    <li className="pl-6 border-l-2 border-purple-500 relative">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-purple-500"></div>
                      <h4 className="font-medium">Master of Computer Application</h4>
                      <p className="text-sm text-gray-400">2022 - 2024</p>
                      <p className="text-sm text-gray-300">KJ's Trinity Academy Of Engineering, Pune</p>
                    </li>
                    <li className="pl-6 border-l-2 border-purple-500 relative">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-purple-500"></div>
                      <h4 className="font-medium">Bachelor of Computer Application</h4>
                      <p className="text-sm text-gray-400">2019 - 2021</p>
                      <p className="text-sm text-gray-300">Gopikabai Sitaram Gawande Mahavidhalaya, Umarkhed</p>
                    </li>
                    <li className="pl-6 border-l-2 border-purple-500 relative">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-purple-500"></div>
                      <h4 className="font-medium">HSC ( 12th ) </h4>
                      <p className="text-sm text-gray-400">2017 - 2018</p>
                      <p className="text-sm text-gray-300">Gopikabai Sitaram Gawande Mahavidhalaya, Umarkhed</p>
                    </li>
                    <li className="pl-6 border-l-2 border-purple-500 relative">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-purple-500"></div>
                      <h4 className="font-medium">SSC ( 10th )</h4>
                      <p className="text-sm text-gray-400">2015 - 2016</p>
                      <p className="text-sm text-gray-300">Sai-Prakash vidhalaya, Sakhara</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-pink-400">Experience</h3>
                  <ul className="space-y-4">
                    <li className="pl-6 border-l-2 border-pink-500 relative">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-pink-500"></div>
                      <h4 className="font-medium">Jr. Data Scientist</h4>
                      <p className="text-sm text-gray-400">March 2023 - Current</p>
                      <p className="text-sm text-gray-300"> Pipran Infotech Pvt.Ltd,Pune, India</p>
                    </li>
                    <li className="pl-6 border-l-2 border-pink-500 relative">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-pink-500"></div>
                      <h4 className="font-medium">Data Scientist Intern</h4>
                      <p className="text-sm text-gray-400">march 2022 - july 2022</p>
                      <p className="text-sm text-gray-300">Innodatatics - USA </p>
                    </li>
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
