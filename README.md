# Personal Website

A minimal, monochromatic personal website built with Next.js 14, TypeScript, and Tailwind CSS.

## Use as Template

This repository has a `template` branch that you can use to create your own website:

```bash
# Clone the template branch
git clone -b template https://github.com/lprsrts/homepage.git my-website
cd my-website
```

Or fork this repository and switch to the `template` branch to get started.

## Features

- **Monochromatic Design**: Clean black and white aesthetic
- **Theme Switcher**: 8 pre-built themes (Default, Dark, Sepia, Forest, Ocean, Sunset, Midnight, Minimal Gray)
- **Content Pages**: Blog, Meditations, Projects, Updates, Media, Shop
- **Fully Responsive**: Mobile-friendly design
- **Static Export**: Fast loading and easy hosting

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **CSS Variables**: Dynamic theming system

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

### Customize Themes

See `THEMES.md` for detailed information on:
- Adding custom themes
- Modifying existing themes
- Using CSS variables in your components

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
│   ├── Navigation.tsx    # Shared navigation
│   ├── ThemeProvider.tsx # Theme context
│   └── ThemeSwitcher.tsx # Theme dropdown
├── config/
│   └── themes.ts      # Theme definitions
├── public/            # Static assets
└── package.json
```

## Documentation

- **GETTING_STARTED.md**: Step-by-step customization checklist
- **DEPLOY.md**: Deployment instructions for various platforms
- **THEMES.md**: Theme system documentation

## License

MIT
