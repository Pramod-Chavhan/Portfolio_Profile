"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-lg md:text-xl font-medium text-primary mb-2"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              <span className="gradient-text glow-text">Pramod Chavhan</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-6 h-12"
            >
              <TypeAnimation
                sequence={[
                  "Data Scientist",
                  1500,
                  "Python Developer",
                  1500,
                  "ML Engineer",
                  1500,
                  "AI Enthusiast",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-muted-foreground text-lg mb-8 max-w-lg"
            >
              Transforming complex data into actionable insights and building innovative AI solutions. Passionate about
              creating impactful technology that solves real-world problems through data-driven approaches.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="gradient-btn text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                onClick={() => window.open("https://github.com/Pramod-Chavhan", "_blank")}
              >
                <Github className="mr-2 h-5 w-5" />
                View My Work
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 relative overflow-hidden group shadow-lg shadow-primary/10"
                asChild
              >
                <Link href="#contact">
                  <span className="absolute top-0 left-0 w-full h-full bg-primary/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

          
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="animated-border p-1 w-80 h-100 rounded-lg">
            <div
              className={`w-full h-full rounded-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } flex items-center justify-center transition-colors duration-300`}
            >
              <img
                src="/pic1.jpg"
                alt="Transparent Image"
                className="h-full object-contain z-10 relative"
              />
                <div className="text-center">
                  

                  {/* Animated data points */}
                  <div className="relative w-full h-20 mt-4 overflow-hidden z-0">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${
                          theme === "dark" ? "bg-primary/30" : "bg-primary/20"
                        }z-0`}
                        initial={{
                          x: Math.random() * 200 - 100,
                          y: Math.random() * 100 - 50,
                          opacity: 0,
                        }}
                        animate={{
                          x: Math.random() * 200 - 100,
                          y: Math.random() * 100 - 50,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: Math.random() * 5,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
            <div
              className={`w-6 h-10 border-2 rounded-full flex justify-center ${
                theme === "dark" ? "border-gray-400" : "border-gray-500"
              } transition-colors duration-300`}
            >
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className={`w-1.5 h-1.5 rounded-full mt-2 ${
                  theme === "dark" ? "bg-white" : "bg-gray-800"
                } transition-colors duration-300`}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
