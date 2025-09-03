import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

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

// Get icon SVG for callout type
function getCalloutIcon(type: string): string {
  const icons: { [key: string]: string } = {
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    tip: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    note: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    caution: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
  }
  return icons[type] || icons.info
}

// Process callouts before markdown parsing
function preprocessCallouts(content: string): string {
  // Split content into lines for easier processing
  const lines = content.split('\n')
  const result: string[] = []
  let inCallout = false
  let calloutType = ''
  let calloutTitle = ''
  let calloutContent: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Check for callout start
    if (line.startsWith(':::') && !inCallout) {
      const match = line.match(/^:::(info|warning|tip|note|caution)(?:\s+(.+?))?$/)
      if (match) {
        inCallout = true
        calloutType = match[1]
        calloutTitle = match[2] || calloutType.charAt(0).toUpperCase() + calloutType.slice(1)
        calloutContent = []
        continue
      }
    }
    
    // Check for callout end
    if (line === ':::' && inCallout) {
      // Generate the callout HTML with Josh's structure
      const iconSvg = getCalloutIcon(calloutType)
      const calloutHtml = `<aside class="callout callout-${calloutType}" data-callout-type="${calloutType}">
<div class="callout-notch">
<svg xmlns="http://www.w3.org/2000/svg" width="28.5" height="34.5" fill="none" viewBox="0 0 57 69" preserveAspectRatio="none" class="callout-notch-svg">
<path fill="var(--color-page-background)" d="M54 0V0.716804C54 25.9434 35.0653 47.1517 10 50L0 57V0H54Z"></path>
<path fill="var(--callout-border-color)" d="M56.9961 4.15364C57.0809 2.49896 55.8083 1.08879 54.1536 1.00394C52.499 0.919082 51.0888 2.19168 51.0039 3.84636L56.9961 4.15364ZM9.09704 51.7557L8.49716 48.8163L9.09704 51.7557ZM6 69V59.2227H0V69H6ZM9.69692 54.6951L14.3373 53.7481L13.1375 47.8693L8.49716 48.8163L9.69692 54.6951ZM14.3373 53.7481C38.202 48.8777 55.7486 28.4783 56.9961 4.15364L51.0039 3.84636C49.8967 25.4384 34.3213 43.5461 13.1375 47.8693L14.3373 53.7481ZM6 59.2227C6 57.0268 7.54537 55.1342 9.69692 54.6951L8.49716 48.8163C3.55195 49.8255 0 54.1756 0 59.2227H6Z"></path>
</svg>
<div class="callout-border-cover"></div>
</div>
<div class="callout-spacer"></div>
<div class="callout-icon">${iconSvg}</div>
<strong class="callout-title">${calloutTitle}</strong>
<div class="callout-content">

${calloutContent.join('\n')}

</div>
</aside>`
      
      result.push(calloutHtml)
      inCallout = false
      calloutType = ''
      calloutTitle = ''
      calloutContent = []
      continue
    }
    
    // Collect content or pass through
    if (inCallout) {
      calloutContent.push(line)
    } else {
      result.push(line)
    }
  }
  
  // Handle unclosed callout
  if (inCallout && calloutContent.length > 0) {
    // Just add the content back as-is if callout wasn't closed
    result.push(`:::${calloutType} ${calloutTitle}`)
    result.push(...calloutContent)
  }
  
  return result.join('\n')
}

// Enhanced markdown processing with custom plugins
export async function processMarkdownWithEnhancements(content: string): Promise<string> {
  // First, process callouts
  const contentWithCallouts = preprocessCallouts(content)
  
  // Then process with remark -> rehype pipeline that preserves raw HTML
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // Parse raw HTML in markdown
    .use(rehypeStringify)
    .process(contentWithCallouts)
  
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