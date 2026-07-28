"use client"

import { motion } from "framer-motion"
import { Home, User, Code, Briefcase, Award, Mail, Layers, BarChart2, PieChart } from "lucide-react"
import Link from "next/link"

const navItems = [
  { id: "home", icon: <Home className="w-5 h-5" />, label: "Home" },
  { id: "about", icon: <User className="w-5 h-5" />, label: "About" },
  { id: "skills", icon: <Code className="w-5 h-5" />, label: "Skills" },
  { id: "projects", icon: <Layers className="w-5 h-5" />, label: "Projects" },
  { id: "datascience", icon: <BarChart2 className="w-5 h-5" />, label: "Data Science" },
  { id: "metrics", icon: <PieChart className="w-5 h-5" />, label: "Metrics" },
  { id: "experience", icon: <Briefcase className="w-5 h-5" />, label: "Experience" },
  { id: "certificates", icon: <Award className="w-5 h-5" />, label: "Certificates" },
  { id: "contact", icon: <Mail className="w-5 h-5" />, label: "Contact" },
]

export default function SideNavigation({ activeSection }: { activeSection: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed left-5 top-1/4 -translate-y-1/2 transform z-40 hidden md:block"
    >
      <div className="flex flex-col items-center space-y-6">
        {navItems.map((item) => (
          <Link key={item.id} href={`#${item.id}`} className="group relative flex items-center" aria-label={item.label}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-lg shadow-teal-900/30"
                  : "bg-slate-800/60 text-slate-400 hover:bg-slate-700/80 hover:text-white dark:bg-slate-800/60 light:bg-white/80 light:text-gray-600"
              }`}
            >
              {item.icon}
            </div>
            <div className="absolute left-14 origin-left scale-0 rounded-md px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 group-hover:scale-100 bg-slate-900 text-white border border-slate-700">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
