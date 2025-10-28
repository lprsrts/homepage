# Quick Deployment Guide

## Before Deploying

1. **Add your profile picture**: Place `profile.jpg` in the `public/` folder
2. **Update personal info**: Edit `app/page.tsx` with your name, bio, and social links
3. **Customize content**: Update sample data in each page file

## Deploy to Vercel (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add your domain
vercel domains add yourdomain.com
```

Then in your domain registrar, add these DNS records:
- **A Record**: `76.76.21.21`
- **CNAME Record** (www): `cname.vercel-dns.com`

## Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Add domain in Netlify dashboard
```

## Manual Static Hosting

The `out/` folder contains your built site. Upload it anywhere:

```bash
# Build
npm run build

# The out/ folder is ready to upload
# Use FTP, rsync, or any file transfer method
```

### Example: Deploy to a VPS

```bash
# Build locally
npm run build

# Upload to server
rsync -avz out/ user@yourserver.com:/var/www/html/

# Or via SCP
scp -r out/* user@yourserver.com:/var/www/html/
```

## Test Locally

```bash
# Development mode
npm run dev
# Visit http://localhost:3000

# Production preview
npm run build
npx serve out/
# Visit http://localhost:3000
```

## DNS Configuration

Point your domain to your hosting:

**Vercel/Netlify**: Follow their dashboard instructions

**Traditional Host**: 
- A Record: Your server IP
- CNAME (www): Your server domain

Wait 24-48 hours for DNS propagation.
