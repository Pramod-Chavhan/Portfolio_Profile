"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { profile } from "@/data/profile"
import { cn } from "@/lib/utils"

const links = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
]

export default function SiteNav({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent",
      )}
    >
      <div className="container-pro flex h-16 md:h-18 items-center justify-between">
        <Link href="#home" className="font-display text-lg font-semibold tracking-tight">
          <span className="text-slate-100">Pramod</span>
          <span className="text-teal-400">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`#${l.id}`}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors",
                activeSection === l.id ? "text-teal-300" : "text-slate-400 hover:text-slate-100",
              )}
            >
              {l.label}
              {activeSection === l.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute left-1/2 -bottom-0.5 h-0.5 w-4 -translate-x-1/2 rounded-full bg-teal-400"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-sm text-slate-300 hover:text-teal-300 transition-colors"
          >
            Resume
          </a>
          <Link
            href="#contact"
            className="hidden sm:inline-flex rounded-full gradient-btn px-4 py-2 text-sm"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 text-slate-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/[0.06] bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="container-pro flex flex-col py-4 gap-1">
              {links.map((l) => (
                <Link
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm",
                    activeSection === l.id ? "bg-teal-500/10 text-teal-300" : "text-slate-300",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
