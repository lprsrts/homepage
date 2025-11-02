# Vercel Deployment Setup

## Overview

This project uses a hybrid storage approach:
- **Local Development**: Content is saved as markdown files in `data/blog/` and `data/meditations/`
- **Production (Vercel)**: Content changes are committed directly to GitHub via the GitHub API

## Environment Variables

Set these in your Vercel project settings:

### Authentication
- `ADMIN_USERNAME` - Your admin username
- `ADMIN_PASSWORD_HASH` - Bcrypt hash of your password (generate with `node scripts/generatePassword.js`)
- `JWT_SECRET` - Random secret key for JWT signing (use a strong random string)

### GitHub Integration
- `GITHUB_TOKEN` - Personal Access Token with `repo` scope
- `GITHUB_OWNER` - Your GitHub username or organization name
- `GITHUB_REPO` - Repository name (e.g., "homepage")
- `GITHUB_BRANCH` - Branch to commit to (default: "main")

## Creating a GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Vercel CMS"
4. Select the `repo` scope (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't be able to see it again)
7. Add it as `GITHUB_TOKEN` in Vercel environment variables

## How It Works

### On Vercel
1. User edits content in the admin panel (`/admin/blog` or `/admin/meditations`)
2. Changes are committed to GitHub via the GitHub API
3. Vercel detects the commit and automatically triggers a new deployment
4. New content is visible after the deployment completes (usually 1-2 minutes)

### Locally
1. Content is saved directly to the filesystem
2. Changes are immediately visible (no deployment needed)
3. Commit and push changes to GitHub manually

## Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Import your repository in Vercel
   - Vercel will auto-detect Next.js configuration

3. **Set Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add all required variables listed above

4. **Deploy**
   - Vercel will automatically deploy your project
   - Future commits will trigger automatic redeployments

## Troubleshooting

### "Failed to save" errors
- Check that `GITHUB_TOKEN` has the correct `repo` scope
- Verify `GITHUB_OWNER` and `GITHUB_REPO` match your repository
- Check Vercel function logs for detailed error messages

### Changes not appearing
- Wait for Vercel deployment to complete (check deployment status)
- Clear your browser cache
- Check that the commit was successful in your GitHub repository

### Build failures
- Check Vercel build logs
- Ensure all markdown files have valid frontmatter
- Verify that dependencies are properly installed
