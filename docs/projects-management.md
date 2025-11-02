# Projects Management

## Overview

The projects feature allows you to showcase your work, side projects, and open source contributions through an easy-to-manage admin interface.

## Admin Interface

Access: `/admin/projects`

### Creating a Project

1. Click "New Project" button
2. Fill in the fields:
   - **Title**: Name of your project (required)
   - **Description**: Brief description of what the project does (required)
   - **Technologies**: Comma-separated list of tech used (e.g., "React, TypeScript, Node.js")
   - **Link**: URL to project (GitHub repo, live demo, etc.)
   - **Featured**: Toggle to mark as featured project (shows badge)
3. Click "Save"

### Editing a Project

1. Click "Edit" on any project card
2. Modify fields as needed
3. Click "Save"

### Deleting a Project

1. Click "Delete" on any project card
2. Confirm deletion

## Data Structure

Projects are stored in `data/projects.json`:

```json
{
  "projects": [
    {
      "id": "1",
      "title": "My Awesome Project",
      "description": "A cool thing I built",
      "tech": ["React", "Node.js"],
      "link": "https://github.com/username/project",
      "featured": true
    }
  ]
}
```

### Fields

- `id` (string): Auto-generated unique identifier
- `title` (string): Project name
- `description` (string): Project description
- `tech` (string[]): Array of technology names
- `link` (string): URL to project
- `featured` (boolean): Whether to show featured badge

## Public Display

Projects are displayed at `/projects` with:
- Project title and featured badge (if applicable)
- Description
- Technology tags
- Link to view project

## Deployment

### Local Development
- Changes are saved directly to `data/projects.json`
- Visible immediately (no build required)

### Production (Vercel)
- Changes commit to GitHub via API
- Triggers automatic redeployment
- New projects visible after deployment (~1-2 minutes)

## API Endpoints

### Public
- `GET /api/projects` - Get all projects

### Admin (requires authentication)
- `GET /api/admin/projects` - Get all projects
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects` - Update project
- `DELETE /api/admin/projects?id={id}` - Delete project

## Tips

- Keep descriptions concise (1-2 sentences)
- Use the featured flag for your best work
- Link to live demos when available (not just source code)
- Group related technologies together
- Order is preserved from admin interface
