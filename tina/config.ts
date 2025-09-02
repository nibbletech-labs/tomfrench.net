import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Get this from tina.io
  token: process.env.TINA_TOKEN, // Get this from tina.io
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "attachments",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "content/pages",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "homepage",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "heroTitle",
            label: "Hero Title",
            required: true,
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
            required: true,
          },
          {
            type: "string",
            name: "heroDescription",
            label: "Hero Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "image",
            name: "profileImage",
            label: "Profile Image",
            description: "Upload your profile photo (will be cropped to circle)",
          },
          {
            type: "object",
            name: "ideasExploring",
            label: "Ideas I'm Exploring",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Idea Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "experienceHighlights",
            label: "Experience Highlights",
            list: true,
            fields: [
              {
                type: "string",
                name: "company",
                label: "Company",
                required: true,
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                required: true,
              },
              {
                type: "string",
                name: "period",
                label: "Time Period",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "achievement",
                label: "Key Achievement",
              },
            ],
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            fields: [
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn URL",
              },
              {
                type: "string",
                name: "github",
                label: "GitHub URL",
              },
              {
                type: "string",
                name: "twitter",
                label: "Twitter/X URL",
              },
            ],
          },
        ],
      },
      {
        name: "article",
        label: "Articles",
        path: "content/articles",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["Leadership", "Case Study", "Technology", "Product Management"],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "featuredImage",
            label: "Featured Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "company",
            label: "Company",
          },
          {
            type: "string",
            name: "role",
            label: "Role",
          },
          {
            type: "string",
            name: "duration",
            label: "Duration",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["Digital Transformation", "Product Development", "Team Building", "Strategy"],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "image",
            label: "Project Image",
          },
          {
            type: "object",
            name: "impact",
            label: "Impact",
            fields: [
              {
                type: "string",
                name: "revenue",
                label: "Revenue Impact",
              },
              {
                type: "string",
                name: "users",
                label: "Users Impacted",
              },
              {
                type: "string",
                name: "efficiency",
                label: "Efficiency Gains",
              },
            ],
          },
          {
            type: "string",
            name: "technologies",
            label: "Technologies",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "resource",
        label: "Resources",
        path: "content/resources",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});