# Personal Website

A minimal, monochromatic personal website built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Static Export**: Pre-rendered HTML for fast hosting

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

This generates a static site in the `out/` directory.

## Customization

### Update Personal Information

1. **Home Page** (`app/page.tsx`): Update your name, bio, and social links
2. **Profile Picture**: Add your image to `public/profile.jpg`
3. **Content**: Edit the sample data in each page file

### Add Real Content

Each page contains sample data arrays at the top:
- `app/blog/page.tsx` - Blog posts
- `app/meditations/page.tsx` - Meditations
- `app/projects/page.tsx` - Projects
- `app/updates/page.tsx` - Updates
- `app/media/page.tsx` - Videos and photos
- `app/shop/page.tsx` - Products

For a full CMS, consider integrating:
- Markdown files with gray-matter
- Headless CMS (Contentful, Sanity, etc.)
- Database (Postgres, MongoDB, etc.)

## Deployment

### Option 1: GitHub Pages

1. Update `next.config.mjs` to add your repo name as basePath (if not using custom domain)
2. Run `npm run build`
3. Push the `out/` folder to a `gh-pages` branch
4. Enable GitHub Pages in repository settings
5. Point your domain to GitHub Pages

## Domain Setup

After deploying, point your domain to the hosting provider:

1. **Vercel/Netlify**: Add domain in dashboard, update DNS records as instructed
2. **GitHub Pages**: Add CNAME record pointing to `<username>.github.io`
3. **Traditional Host**: Update A record to server IP

## Project Structure

```
homepage/
├── app/
│   ├── blog/          # Blog page
│   ├── meditations/   # Meditations page
│   ├── projects/      # Projects page
│   ├── updates/       # Updates page
│   ├── media/         # Media page
│   ├── shop/          # Shop page
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/
│   └── Navigation.tsx # Shared navigation
├── public/            # Static assets
└── package.json
```

## License

MIT
