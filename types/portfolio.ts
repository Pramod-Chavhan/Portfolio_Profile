export type ProjectMetric = {
  label: string
  value: string
}

export type ProjectCaseStudy = {
  problem: string
  approach: string
  highlights: string[]
}

export type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  github?: string
  demo?: string
  metrics: ProjectMetric[]
  technologies: string[]
  featured?: boolean
  company?: string
  period?: string
  iconKey: "brain" | "chart" | "database" | "code" | "bot" | "search"
  caseStudy?: ProjectCaseStudy
  nda?: boolean
}

export type Experience = {
  role: string
  company: string
  location: string
  period: string
  description: string[]
}

export type Skill = {
  name: string
  level: number
}

export type Education = {
  degree: string
  institution: string
  period: string
  detail?: string
}

export type Certificate = {
  id: number
  image: string
  alt: string
}

export type Profile = {
  name: string
  title: string
  roles: string[]
  summary: string
  heroTagline: string
  location: string
  phone: string
  email: string
  whatsapp?: string
  yearsExperience: string
  openToWork: boolean
  availability: string
  languages: string[]
  socials: {
    github: string
    linkedin: string
    portfolio?: string
  }
  cvUrl: string
  education: Education[]
}
