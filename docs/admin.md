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

## Features

- `/admin/pages` - Toggle pages on/off
- `/admin/blog` - Manage blog posts
- `/admin/media` - Upload and manage media
- `/admin/meditations` - Manage meditation posts

## Security

- JWT authentication (1 hour expiration)
- Never commit `.env.local` or `data/admin.json`
- Use HTTPS in production
- Change default password immediately

## Data Storage

All data stored in `/data` directory:
- `admin.json` - Admin credentials
- `siteConfig.json` - Page configuration
- `blogPosts.json` - Blog posts
- `media.json` - Media references
