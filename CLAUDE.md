# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Development (starts both Tina CMS and Next.js)
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Start production server
npm run start
```

**Important:** Always use `npm run dev` for development as it starts both Tina CMS and Next.js together. The admin interface is available at `/admin`.

## Critical Tina CMS Integration Pattern

**⚠️ IMPORTANT: Preventing Build Failures When Editing Tina Config**

**When modifying Tina schema (tina/config.ts):**
1. Make changes to `tina/config.ts`
2. Run `npm run dev` or `npm run build` locally to regenerate types
3. **ALWAYS commit both `tina/config.ts` AND `tina/__generated__/**` files together**
4. Failure to commit generated files will cause Vercel build failures

**Common Scenario That Causes Failures:**
- Adding a new field to a collection (e.g., `profileImage` to homepage)
- Using the field in components (e.g., `homepage.profileImage`)
- Committing only the config and component changes
- **Result:** TypeScript error "Property does not exist on type" in Vercel

**Correct Workflow:**
```bash
# After editing tina/config.ts
npm run dev                           # Regenerates types

# TEST BUILD BEFORE COMMITTING (requires env vars)
export NEXT_PUBLIC_TINA_CLIENT_ID=<your-id>
export TINA_TOKEN=<your-token>
npm run build                         # Test production build locally

# If build succeeds, commit everything
git add tina/config.ts tina/__generated__
git commit -m "feat: Add new field with generated types"

# Final build test before pushing (optional but recommended)
npm run build
git push
```

**Files That Must Be Committed Together:**
- `tina/config.ts` (your changes)
- `tina/__generated__/types.ts` (TypeScript types)
- `tina/__generated__/client.ts` (GraphQL client)
- `tina/__generated__/*.gql` (GraphQL schemas)
- `tina/__generated__/*.json` (Schema definitions)

The generated files in `tina/__generated__/` are essential for TypeScript compilation and must be treated as source code, not build artifacts. Think of them like a `package-lock.json` - auto-generated but required for builds.

## Architecture Overview

This is a Next.js 15 personal portfolio site with Tina CMS integration for content management.

### Content Flow
1. **Content Storage**: Markdown files with frontmatter in `/content/` subdirectories
2. **CMS Schema**: Defined in `/tina/config.ts` with four collections:
   - `homepage`: Single editable homepage (`content/pages/homepage.md`)
   - `article`: Blog posts (`content/articles/*.md`)
   - `project`: Portfolio items (`content/projects/*.md`)
   - `resource`: Resources (`content/resources/*.md`)
3. **Content Processing**: Server-side via `/lib/content.ts` utilities using gray-matter and remark
4. **Type Safety**: Generated TypeScript types in `/tina/__generated__/types.ts`

### Key Architectural Decisions
- **Server Components First**: All content rendering uses React Server Components
- **Git-Based CMS**: Tina writes directly to markdown files, changes tracked in git
- **Static Generation**: Content pre-rendered at build time for performance
- **Type-Safe Content**: All content has TypeScript interfaces matching Tina schema

### Environment Variables Required
```bash
NEXT_PUBLIC_TINA_CLIENT_ID=<from-tina-cloud>  # Required for CMS
TINA_TOKEN=<from-tina-cloud>                  # Required for CMS
```

### Content Management Patterns

**Adding/Editing Content via CMS:**
- Navigate to `/admin` in development
- Changes save to markdown files and auto-commit with Tina attribution

**Adding Content Manually:**
- Create markdown file in appropriate `/content/` subdirectory
- Include required frontmatter fields as defined in `tina/config.ts`
- Fields marked `required: true` in schema must be present

**Modifying Content Schema:**
1. Update collection fields in `/tina/config.ts`
2. Run dev server to regenerate types
3. Update any TypeScript interfaces if needed
4. Commit both config and generated files

### Deployment Considerations

**Vercel Deployment:**
- Automatic deployments on push to main branch
- Environment variables must be set in Vercel dashboard
- Build failures often due to missing generated Tina files

**Common Build Issues:**
- "Property does not exist on type" → Generated Tina types not committed
- "Client not configured properly" → Missing environment variables
- "Cannot find module" → Dependencies issue, check package-lock.json

### Theme and Styling

- **Dark Mode Default**: Set in `/app/providers.tsx` via `defaultTheme="dark"`
- **Tailwind CSS v4**: Using latest alpha version with CSS custom properties
- **Theme Toggle**: Available in navigation, persists user preference
- **Responsive Breakpoints**: Mobile-first with md (768px) and lg (1024px) breakpoints

### Homepage Customization

The homepage pulls all content from `/content/pages/homepage.md` via Tina:
- Hero section (title, subtitle, description, profile image)
- Ideas exploring section (dynamic list)
- Experience highlights (company history)
- Social links

Profile image uploads to `/public/attachments/` and is automatically cropped to circle with gradient border.