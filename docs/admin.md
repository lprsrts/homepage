# Admin Panel

Access admin panel at `/admin/login`

## Setup

### Local Development

1. Generate password hash:
```bash
node scripts/generatePassword.js yourpassword
```

2. Create `data/admin.json`:
```json
{
  "username": "admin",
  "passwordHash": "generated_hash_here"
}
```

3. Create `.env.local`:
```
JWT_SECRET=your-random-secret-key
```

### Production (Vercel)

Set environment variables in Vercel dashboard:
- `ADMIN_USERNAME` - Your admin username
- `ADMIN_PASSWORD_HASH` - Generated password hash
- `JWT_SECRET` - Random secret key for JWT signing
- `GITHUB_TOKEN` - GitHub Personal Access Token with repo write access
- `GITHUB_OWNER` - Your GitHub username/organization
- `GITHUB_REPO` - Your repository name (e.g., "homepage")
- `GITHUB_BRANCH` - Branch to commit to (default: "main")

#### Creating a GitHub Token

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token with `repo` scope (full control of private repositories)
3. Copy the token and add it as `GITHUB_TOKEN` in Vercel environment variables

**Note**: On Vercel, the filesystem is read-only, so all content changes are committed directly to your GitHub repository via the GitHub API.

## Features

- `/admin/pages` - Toggle pages on/off
- `/admin/blog` - Manage blog posts
- `/admin/projects` - Manage projects
- `/admin/media` - Upload and manage media
- `/admin/meditations` - Manage meditation posts

## Security

- JWT authentication (1 hour expiration)
- Never commit `.env.local` or `data/admin.json`
- Use HTTPS in production
- Change default password immediately

## Data Storage

### Local Development
All data stored in `/data` directory:
- `admin.json` - Admin credentials
- `siteConfig.json` - Page configuration
- `projects.json` - Projects data
- `data/blog/` - Blog posts as markdown files
- `data/meditations/` - Meditation posts as markdown files
- `media.json` - Media references

### Production (Vercel)
- Content is read from the repository at build time
- All edits (JSON files and markdown) are committed directly to GitHub via GitHub API
- Changes trigger automatic redeployment on Vercel
- Supports: blog posts, meditations, projects, and page settings
