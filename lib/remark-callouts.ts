import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Text } from 'mdast';

// Lucide SVG icons - clean, consistent design
const ICONS: Record<string, string> = {
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  tip: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
  important: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  danger: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
  success: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  // Legacy aliases - map to new types
  note: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  caution: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, (node: any) => {
      if (node.type !== 'containerDirective') return;
      const variant = node.name;
      if (!ICONS[variant]) return;

      // Handle both [Title] syntax and first line as title
      let title = node.label || node.attributes?.title;
      
      // If no label/title but has children, check if first child is text that could be title
      if (!title && node.children && node.children.length > 0) {
        const firstChild = node.children[0];
        if (firstChild.type === 'paragraph' && firstChild.children && firstChild.children.length > 0) {
          const firstTextChild = firstChild.children[0];
          if (firstTextChild.type === 'text') {
            // Use first line as title if it's short enough
            const firstLine = firstTextChild.value.split('\n')[0];
            if (firstLine.length < 50) {
              title = firstLine;
              // Remove title from content
              firstTextChild.value = firstTextChild.value.substring(firstLine.length).trim();
              if (!firstTextChild.value) {
                // Remove empty text node
                firstChild.children.shift();
                if (firstChild.children.length === 0) {
                  // Remove empty paragraph
                  node.children.shift();
                }
              }
            }
          }
        }
      }
      
      title = (title || cap(variant)).trim();

      node.data = node.data || {};
      node.data.hName = 'aside';
      node.data.hProperties = { 
        class: 'callout', 
        'data-variant': variant, 
        role: 'note' 
      };

      const iconHtml = { 
        type: 'html', 
        value: `<div class="callout__icon" aria-hidden="true">${ICONS[variant]}</div>` 
      };

      const titlePara: Paragraph = {
        type: 'paragraph',
        data: { 
          hName: 'p', 
          hProperties: { class: 'callout__title' } 
        },
        children: [{ type: 'text', value: title } as Text],
      };

      const bodyWrapper: any = {
        type: 'paragraph',
        data: { 
          hName: 'div', 
          hProperties: { class: 'callout__body' } 
        },
        children: node.children,
      };

      node.children = [iconHtml as any, titlePara, bodyWrapper];
    });
  };
}