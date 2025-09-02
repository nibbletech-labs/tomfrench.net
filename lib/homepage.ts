import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Homepage {
  title: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  profileImage?: string
  ideasExploring?: {
    title: string
    description?: string
  }[]
  experienceHighlights?: {
    company: string
    role: string
    period?: string
    description?: string
    achievement?: string
  }[]
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export async function getHomepage(): Promise<Homepage> {
  const filePath = path.join(process.cwd(), 'content/pages/homepage.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  
  return data as Homepage
}