# Tina CMS Setup Guide

## Overview
Your website is now configured with Tina CMS for visual editing of markdown content. This allows non-technical users to edit articles and projects through a user-friendly interface.

## Current Status
✅ Obsidian syntax removed from content files
✅ Clean markdown processor implemented
✅ MDX support enabled for embedding React components
✅ Tina CMS installed and configured
✅ Admin interface available at `/admin`

## Getting Started

### For Local Development
1. The admin interface works locally without authentication
2. Visit `http://localhost:3000/admin` to access the CMS
3. You can create, edit, and preview content directly

### For Production Setup (Required for your wife to edit)
1. Create a Tina Cloud account at https://app.tina.io
2. Create a new project and connect your GitHub repository
3. Get your Client ID and Token from the Tina dashboard
4. Add these to your environment variables:
   ```
   NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
   TINA_TOKEN=your-token
   ```
5. Deploy to Vercel/Netlify with these environment variables
6. Your wife can then access `yoursite.com/admin` to edit content

## How to Use Tina CMS

### Accessing the Admin
- Navigate to `/admin` on your website
- In production, you'll need to authenticate with Tina Cloud

### Editing Articles
1. Click on "Articles" in the sidebar
2. Select an article to edit or click "Create New"
3. Edit using the visual editor or markdown mode
4. Preview changes in real-time
5. Click "Save" to commit changes to Git

### Adding Images
- Use the media manager in the editor
- Images are stored in `/public/attachments`
- Drag and drop or browse to upload

### Embedding Components (MDX)
When you need to embed iframes or widgets:
1. Save your file with `.mdx` extension instead of `.md`
2. You can then embed React components directly:
   ```mdx
   # My Article
   
   Regular markdown content here.
   
   <iframe src="https://example.com/widget" width="100%" height="400" />
   
   More content...
   ```

## Features Available
- ✅ Visual editing with live preview
- ✅ Markdown and rich text modes
- ✅ Image upload and management
- ✅ Frontmatter editing (dates, tags, categories)
- ✅ MDX support for embedding components
- ✅ Git-based version control
- ✅ Draft/published status

## Next Steps
1. Set up Tina Cloud account
2. Configure authentication
3. Create custom MDX components for common embeds
4. Train your wife on using the admin interface

## Troubleshooting
- If admin page doesn't load, ensure `npm run dev` is running
- For production issues, check environment variables are set
- Content changes are saved directly to Git repository