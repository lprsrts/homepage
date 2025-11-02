# Changelog

## [Unreleased] - 2025-11-02

### Added

#### GitHub API Integration for Vercel
- Created `GitHubStorage` class to handle file commits via GitHub API
- Enables content management on Vercel's read-only filesystem
- Automatic redeployment trigger on content changes
- Supports both markdown files and JSON data files

#### Projects Management
- New admin interface at `/admin/projects` for managing project portfolio
- Full CRUD operations (Create, Read, Update, Delete)
- Featured project flag to highlight important work
- Technology tags for each project
- Public display at `/projects` page
- API endpoints for both admin and public access

#### Updates/Timeline Management
- New admin interface at `/admin/updates` for managing activity timeline
- Full CRUD operations (Create, Read, Update, Delete)
- Optional category tagging (Release, Update, Announcement, News)
- Automatic date sorting (newest first)
- Public display at `/updates` page
- API endpoints for both admin and public access

#### Enhanced Admin Panel
- Fixed save/edit functionality for blog posts and meditations
- Added proper validation for required fields
- Better error handling and user feedback
- Support for language field in content

### Changed

#### Storage Architecture
- Dual storage system: filesystem (local) and GitHub API (production)
- Automatic detection of Vercel environment
- All admin operations now async-compatible
- JSON files (siteConfig, projects) now support GitHub commits

#### Data Management
- `lib/data.ts` updated with GitHub storage support
- `lib/content.ts` now handles both local and remote storage
- Better file matching by frontmatter slug instead of filename
- Improved error logging for debugging

### Fixed

#### Admin Panel Issues
- Fixed 500 errors when saving content on Vercel
- Fixed 400 errors for empty slug validation
- Fixed YAML serialization errors from undefined values
- Fixed permanent file updates (files now properly located and updated)
- Fixed async operation handling in API routes

#### Content Management
- Slug validation now trims whitespace
- Frontmatter properly filters undefined values
- File lookup now checks frontmatter instead of just filename
- Delete operations now find files by content slug

### Documentation

#### New Docs
- `docs/vercel-deployment.md` - Complete Vercel setup guide
- `docs/projects-management.md` - Projects feature documentation

#### Updated Docs
- `docs/admin.md` - Added projects management and GitHub setup
- Updated environment variables list
- Clarified local vs production workflows

## Environment Variables Required

### For All Deployments
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD_HASH` - Bcrypt hash of admin password
- `JWT_SECRET` - Secret key for JWT token signing

### For Vercel Production
- `GITHUB_TOKEN` - Personal Access Token with repo scope
- `GITHUB_OWNER` - GitHub username/org name
- `GITHUB_REPO` - Repository name
- `GITHUB_BRANCH` - Branch to commit to (default: main)

## Admin Features Summary

### Page Management (`/admin/pages`)
- Toggle pages on/off
- Changes saved to `siteConfig.json`
- Works on Vercel via GitHub API

### Blog Management (`/admin/blog`)
- Create, edit, delete blog posts
- Markdown content with frontmatter
- Saved to `data/blog/` as `.md` files
- Full Vercel support

### Projects Management (`/admin/projects`)
- Create, edit, delete projects
- Technology tags and featured flag
- Saved to `data/projects.json`
- Full Vercel support

### Updates Management (`/admin/updates`)
- Create, edit, delete timeline updates
- Optional category tagging
- Automatic date sorting
- Saved to `data/updates.json`
- Full Vercel support

### Meditations Management (`/admin/meditations`)
- Create, edit, delete meditation posts
- Markdown content with frontmatter
- Saved to `data/meditations/` as `.md` files
- Full Vercel support

## Technical Details

### Storage Strategy

**Local Development:**
- Direct filesystem access
- Immediate changes
- Standard Node.js `fs` module

**Production (Vercel):**
- GitHub API commits
- Automatic redeployment
- 1-2 minute deployment time

### API Routes

**Public:**
- `GET /api/config` - Site configuration
- `GET /api/blog` - Blog posts
- `GET /api/meditations` - Meditations
- `GET /api/projects` - Projects
- `GET /api/updates` - Timeline updates

**Admin (authenticated):**
- `/api/admin/login` - Authentication
- `/api/admin/verify` - Token verification
- `/api/admin/config` - Site configuration management
- `/api/admin/blog` - Blog post management
- `/api/admin/meditations` - Meditation management
- `/api/admin/projects` - Projects management
- `/api/admin/updates` - Timeline updates management

## Migration Notes

If you have existing content:
1. All existing markdown files are preserved
2. Projects should be migrated to `projects.json`
3. Page settings remain in `siteConfig.json`
4. No breaking changes to existing URLs

## Next Steps

1. Set up GitHub Personal Access Token
2. Configure environment variables in Vercel
3. Push changes to GitHub
4. Verify automatic deployment works
5. Test content creation/editing on production
