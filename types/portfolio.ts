export type ProjectMetric = {
  label: string
  value: string
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
  iconKey: "brain" | "chart" | "database" | "code" | "bot" | "search"
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
  location: string
  phone: string
  email: string
  yearsExperience: string
  socials: {
    github: string
    linkedin: string
    portfolio?: string
  }
  cvUrl: string
  education: Education[]
}
