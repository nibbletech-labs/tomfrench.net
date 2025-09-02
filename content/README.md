# Content Directory Structure

This directory contains all markdown content for tomfrench.net.

## Directory Structure

```
content/
├── articles/       # Blog posts and articles
├── projects/       # Project portfolio items  
├── resources/      # Curated resources
└── templates/      # Content templates
```

## Image Storage

**Images should be placed in `/public/attachments/`** (not in `/content/attachments/`).

### Using Images in Content

#### In Markdown Files:
```markdown
![Image description](/attachments/my-image.png)
```

#### In Project Frontmatter:
```yaml
---
title: My Project
image: /attachments/project-image.jpg
# Or use external URLs:
image: https://example.com/image.jpg
---
```

### Image Organization

Recommended structure in `/public/attachments/`:
- Name images descriptively: `digital-transformation-dashboard.png`
- Use lowercase and hyphens
- Keep project images prefixed: `project-analytics-screenshot.png`
- Keep article images prefixed: `article-team-dynamics-diagram.png`

## Content Templates

See the templates directory for standard formats for articles and projects.