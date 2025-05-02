"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, Instagram, Briefcase, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/Pramod-Chavhan/",
      label: "GitHub",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      href: "mailto:pramodchavhanm@gmail.com",
      label: "Portfolio",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/pramod-chavhan-65a88525b/",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:pramodchavhanm@gmail.com",
      label: "Email",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "#",
      label: "Instagram",
    },
  ]

  return (
    <footer className="bg-gray-900/80 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <Link
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Pramod Chavhan
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex space-x-4 mb-6"
          >
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-sm"
          >
            <p className="flex items-center justify-center">
              &copy; {currentYear} Pramod Chavhan. Made with <Heart className="h-4 w-4 mx-1 text-pink-500" /> All rights
              reserved.
            </p>
            <p className="mt-1">Data Scientist | Python Developer | Web Developer</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
