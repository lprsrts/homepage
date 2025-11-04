# Image Upload Guide

## Overview
You can now upload images directly through your website's admin panel and insert them into blog posts and meditations without manually pushing files to GitHub.

## How to Upload Images

### Step 1: Upload to Media Library
1. Go to `/admin/media` in your admin panel
2. Click "Add Media"
3. Choose "Upload File" (default)
4. Click "Select File" and choose an image from your computer
5. The file will be uploaded to `/public/sketches/` directory
6. Once uploaded, the filename and URL fields will be auto-filled
7. Click "Save" to add it to your media library

**Note:** Files are saved with a timestamp prefix to avoid naming conflicts (e.g., `1730664000000_my-image.jpg`)

### Step 2: Insert Image into Blog/Meditation
1. Go to `/admin/blog` or `/admin/meditations`
2. Create a new post or edit an existing one
3. In the content editor, click the "📷 Insert Image" button above the text area
4. A modal will appear showing all your uploaded images
5. Click on any image to insert it into your content
6. The markdown code will be automatically added: `![filename](url)`

## Alternative: Manual URL Entry
If you prefer to host images externally or reference existing images:
1. In the media admin page, choose "Enter URL" instead of "Upload File"
2. Manually enter the filename and URL
3. Click "Save"

## File Organization
- Uploaded images are stored in `/public/sketches/`
- Images are accessible at `/sketches/[filename]`
- You can also manually create subdirectories in `/public/` and reference them

## Example Workflow
1. Upload `wave-diagram.png` via admin panel
2. It gets saved as `/public/sketches/1730664000000_wave-diagram.png`
3. In your blog editor, click "Insert Image"
4. Select the wave diagram
5. It inserts: `![wave-diagram.png](/sketches/1730664000000_wave-diagram.png)`

## Important Notes

### Local Development
- Images are saved directly to your filesystem at `/public/sketches/`
- Changes are immediate - refresh to see them

### Production (Vercel)
- Images are automatically uploaded to your GitHub repository
- Requires these environment variables in Vercel:
  - `GITHUB_TOKEN` - Personal access token with repo permissions
  - `GITHUB_OWNER` - Your GitHub username
  - `GITHUB_REPO` - Your repository name
  - `GITHUB_BRANCH` - Branch to commit to (default: `main`)
- After upload, Vercel will automatically redeploy with the new image
- The image becomes available after the deployment completes (~1-2 minutes)

### Required GitHub Token Permissions
Your GitHub token needs:
- `repo` scope (full control of private repositories)
- Or `public_repo` scope (for public repositories only)

Create a token at: https://github.com/settings/tokens
