"use client"

import { useEffect, useState, useRef } from "react"
import CustomCursor from "@/components/custom-cursor"
import HeroSection from "@/components/hero-section"
import SignalStrip from "@/components/signal-strip"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import CertificatesSection from "@/components/certificates-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import SiteNav from "@/components/site-nav"
import ScrollToTop from "@/components/scroll-to-top"
import ScrollProgress from "@/components/scroll-progress"
import IntroCurtain from "@/components/intro-curtain"
import AmbientSpotlight from "@/components/ambient-spotlight"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    work: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    certificates: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120
      for (const id of Object.keys(sectionRefs) as (keyof typeof sectionRefs)[]) {
        const el = sectionRefs[id].current
        if (!el) continue
        if (y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden md:cursor-none">
      <IntroCurtain />
      <AmbientSpotlight />
      <CustomCursor />
      <ScrollProgress />
      <SiteNav activeSection={activeSection} />

      <div className="relative z-[2]">
        <section ref={sectionRefs.home} id="home">
          <HeroSection />
          <SignalStrip />
        </section>

        <section ref={sectionRefs.work} id="work">
          <ProjectsSection />
        </section>

        <section ref={sectionRefs.about} id="about">
          <AboutSection />
        </section>

        <section ref={sectionRefs.experience} id="experience">
          <ExperienceSection />
        </section>

        <section ref={sectionRefs.skills} id="skills">
          <SkillsSection />
        </section>

        <section ref={sectionRefs.certificates} id="certificates">
          <CertificatesSection />
        </section>

        <section ref={sectionRefs.contact} id="contact">
          <ContactSection />
        </section>

        <Footer />
      </div>

      <ScrollToTop />
      <div className="pointer-events-none fixed inset-0 z-[3] film-grain opacity-[0.03]" aria-hidden />
    </main>
  )
}
