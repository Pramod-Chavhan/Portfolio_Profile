"use client"

import { useEffect, useState, useRef } from "react"

// Components
import CustomCursor from "@/components/custom-cursor"
import ProfessionalBackground from "@/components/professional-background"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import CertificatesSection from "@/components/certificates-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import SideNavigation from "@/components/side-navigation"
import ScrollToTop from "@/components/scroll-to-top"
import ScrollProgress from "@/components/scroll-progress"
import ThemeToggle from "@/components/theme-toggle"
import DataScienceShowcase from "@/components/data-science-showcase"
import DataMetrics from "@/components/data-metrics"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    datascience: useRef(null),
    metrics: useRef(null),
    experience: useRef(null),
    certificates: useRef(null),
    contact: useRef(null),
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + 100

      for (const section in sectionRefs) {
        const element = sectionRefs[section].current
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden cursor-none transition-colors duration-300">
      <CustomCursor />
      <ProfessionalBackground />
      <ScrollProgress />
      <ThemeToggle />

      <SideNavigation activeSection={activeSection} />

      <div className="relative">
        <section ref={sectionRefs.home} id="home" className="min-h-screen">
          <HeroSection />
        </section>

        <section ref={sectionRefs.about} id="about" className="py-20">
          <AboutSection />
        </section>

        <section ref={sectionRefs.skills} id="skills" className="py-20">
          <SkillsSection />
        </section>

        <section ref={sectionRefs.projects} id="projects" className="py-20">
          <ProjectsSection />
        </section>

        <section ref={sectionRefs.datascience} id="datascience" className="py-20">
          <DataScienceShowcase />
        </section>

        <section ref={sectionRefs.metrics} id="metrics" className="py-20">
          <DataMetrics />
        </section>

        <section ref={sectionRefs.experience} id="experience" className="py-20">
          <ExperienceSection />
        </section>

        <section ref={sectionRefs.certificates} id="certificates" className="py-20">
          <CertificatesSection />
        </section>

        <section ref={sectionRefs.contact} id="contact" className="py-20">
          <ContactSection />
        </section>

        <Footer />
      </div>

      <ScrollToTop />
    </main>
  )
}
