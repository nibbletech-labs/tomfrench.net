import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ContentItem {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  htmlContent?: string
  category?: string
  tags?: string[]
  published?: boolean
  readingTime?: string
  featuredImage?: string
  [key: string]: any
}

// Convert Obsidian wikilinks [[Link]] to markdown links
function convertWikiLinks(content: string): string {
  // Handle image embeds ![[image.png]]
  content = content.replace(
    /!\[\[([^\]]+)\]\]/g,
    (match, filename) => {
      // Check if it's an image
      if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(filename)) {
        return `![${filename}](/attachments/${filename})`
      }
      // Otherwise treat as embedded content (we'll just link to it)
      return `[${filename}](/${filename})`
    }
  )

  // Handle regular wikilinks [[Link|Display Text]] or [[Link]]
  content = content.replace(
    /\[\[([^\]|]+)(\|([^\]]+))?\]\]/g,
    (match, link, _, displayText) => {
      const text = displayText || link
      // Convert to a regular markdown link
      const slug = link.toLowerCase().replace(/\s+/g, '-')
      return `[${text}](/articles/${slug})`
    }
  )

  return content
}

// Convert Obsidian callouts
function convertCallouts(content: string): string {
  // Match Obsidian callouts like > [!note] Title
  return content.replace(
    /^>\s*\[!(\w+)\](.*)$/gm,
    (match, type, title) => {
      const calloutTypes: { [key: string]: string } = {
        note: '📝',
        tip: '💡',
        warning: '⚠️',
        danger: '🚨',
        info: 'ℹ️',
        success: '✅',
        question: '❓',
        quote: '💬'
      }
      const emoji = calloutTypes[type.toLowerCase()] || '📌'
      return `> **${emoji} ${type.toUpperCase()}${title}**`
    }
  )
}

// Process Obsidian markdown
export async function processObsidianContent(content: string): Promise<string> {
  // Convert Obsidian-specific syntax
  content = convertWikiLinks(content)
  content = convertCallouts(content)
  
  // Convert to HTML
  const result = await remark()
    .use(html)
    .process(content)
  
  return result.toString()
}

// Get all content files from a directory
export async function getContentFromDirectory(directory: string): Promise<ContentItem[]> {
  const dirPath = path.join(contentDirectory, directory)
  
  if (!fs.existsSync(dirPath)) {
    return []
  }

  const files = fs.readdirSync(dirPath)
  const items = await Promise.all(
    files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(dirPath, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        
        const slug = file.replace(/\.(md|mdx)$/, '')
        const processedContent = await processObsidianContent(content)
        const stats = readingTime(content)
        
        return {
          slug,
          content,
          htmlContent: processedContent,
          readingTime: stats.text,
          title: data.title || slug.replace(/-/g, ' '),
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || content.slice(0, 200) + '...',
          ...data
        } as ContentItem
      })
  )

  // Sort by date (newest first) and filter published
  return items
    .filter(item => item.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a single content item by slug
export async function getContentBySlug(
  directory: string, 
  slug: string
): Promise<ContentItem | null> {
  const filePath = path.join(contentDirectory, directory, `${slug}.md`)
  const mdxPath = path.join(contentDirectory, directory, `${slug}.mdx`)
  
  let fullPath = ''
  if (fs.existsSync(filePath)) {
    fullPath = filePath
  } else if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else {
    return null
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContent)
  const processedContent = await processObsidianContent(content)
  const stats = readingTime(content)
  
  return {
    slug,
    content,
    htmlContent: processedContent,
    readingTime: stats.text,
    title: data.title || slug.replace(/-/g, ' '),
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || content.slice(0, 200) + '...',
    ...data
  }
}

// Specific helpers for different content types
export const getArticles = () => getContentFromDirectory('articles')
export const getProjects = () => getContentFromDirectory('projects')  
export const getResources = () => getContentFromDirectory('resources')

export const getArticle = (slug: string) => getContentBySlug('articles', slug)
export const getProject = (slug: string) => getContentBySlug('projects', slug)
export const getResource = (slug: string) => getContentBySlug('resources', slug)

// Get all unique tags from articles
export async function getAllTags(): Promise<string[]> {
  const articles = await getArticles()
  const tags = new Set<string>()
  
  articles.forEach(article => {
    article.tags?.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

// Get articles by tag
export async function getArticlesByTag(tag: string): Promise<ContentItem[]> {
  const articles = await getArticles()
  return articles.filter(article => 
    article.tags?.includes(tag)
  )
}

// Define Article type for better type safety
export type Article = ContentItem