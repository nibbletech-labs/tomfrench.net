import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkCallouts from './remark-callouts'

export interface TocHeading {
  id: string
  text: string
  level: number
}

// Extract headings from markdown content
export function extractHeadings(content: string): TocHeading[] {
  const tree = fromMarkdown(content)
  const headings: TocHeading[] = []
  
  function visit(node: any) {
    if (node.type === 'heading' && (node.depth === 2 || node.depth === 3)) {
      const text = toString(node)
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .trim()
      
      headings.push({
        id,
        text,
        level: node.depth
      })
    }
    
    if (node.children) {
      node.children.forEach(visit)
    }
  }
  
  visit(tree)
  return headings
}


// Enhanced markdown processing with custom plugins
export async function processMarkdownWithEnhancements(content: string): Promise<string> {
  // Process with remark -> rehype pipeline with directive support
  const result = await remark()
    .use(remarkDirective)               // parse ::: blocks
    .use(remarkCallouts)                // convert to HTML structure
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)                     // merge our icon <div> safely
    .use(rehypeStringify)
    .process(content)
  
  let htmlContent = result.toString()
  
  // Add IDs to headings for anchor links
  htmlContent = htmlContent.replace(/<h([23])>(.*?)<\/h\1>/g, (match, level, text) => {
    const cleanText = text.replace(/<[^>]*>/g, '') // Remove any HTML tags
    const id = cleanText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .trim()
    
    return `<h${level} id="${id}">${text}</h${level}>`
  })
  
  return htmlContent
}