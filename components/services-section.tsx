"use client"

import { motion } from "framer-motion"
import { Code, Database, Cpu, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicesSection() {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-purple-500" />,
      title: "Web Development",
      description:
        "Crafting digital experiences, one line of code at a time: Your vision, our expertise in web development.",
    },
    {
      icon: <Database className="h-12 w-12 text-pink-500" />,
      title: "Data Science",
      description: "Transforming data into insights: Simplifying complexity with data science expertise.",
    },
    {
      icon: <Cpu className="h-12 w-12 text-blue-500" />,
      title: "IoT",
      description: "Bringing ideas to life with Arduino: Simple solutions, smart innovations.",
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-yellow-500" />,
      title: "Other Services",
      description: "Custom solutions tailored to your unique needs, leveraging cutting-edge technologies.",
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
        <p className="text-lg text-purple-400 mb-2">What I Do?</p>
        <h2 className="text-3xl font-bold mb-2">Services</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800/50 border-gray-700 h-full hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-gray-700/50">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
