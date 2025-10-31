# Personal Website

Minimal personal website built with Next.js 14, TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Generates static site in `out/` directory.

## Customization

1. Update personal info in `app/page.tsx`
2. Add profile picture to `public/profile.jpg`
3. Edit content in page files under `app/`
4. Modify themes in `config/themes.ts`

## Admin Panel

Access at `/admin/login`

Setup:
1. Generate password hash: `node scripts/generatePassword.js yourpassword`
2. Create `data/admin.json` with username and passwordHash
3. Create `.env.local` with `JWT_SECRET=your-secret-key`

Manage content pages, blog posts, and media through the admin dashboard.

## Security

- Never commit `.env.local` or `data/admin.json`
- Change default password immediately
- Use HTTPS in production
- Admin routes are JWT-protected

## Deployment

**Vercel:**
```bash
vercel
```

**Netlify:**
```bash
netlify deploy --prod
```

**Static Host:**
Upload `out/` directory contents.

## License

MIT
