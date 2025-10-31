# Admin Panel

This website includes a hidden admin panel for managing content and site configuration.

## Setup

1. **Generate Admin Password Hash**
   ```bash
   node scripts/generatePassword.js yourpassword
   ```
   
   Copy the generated hash and update `data/admin.json`:
   ```json
   {
     "username": "admin",
     "passwordHash": "YOUR_GENERATED_HASH_HERE"
   }
   ```

2. **Set JWT Secret** (Optional but recommended for production)
   
   Create a `.env.local` file in the root directory:
   ```
   JWT_SECRET=your-super-secret-key-change-this
   ```

## Access

- **Login URL**: `/admin/login`
- **Dashboard**: `/admin/dashboard` (requires authentication)

## Features

### Page Management (`/admin/pages`)
- Enable or disable individual pages (Blog, Meditations, Projects, Updates, Media, Shop)
- When a page is disabled, it won't appear in navigation

### Blog Management (`/admin/blog`)
- Create, edit, and delete blog posts
- Set posts as published or draft
- Only published posts appear on the public blog page

### Media Management (`/admin/media`)
- Add and manage media files
- Support for images and videos
- Store media URLs (local paths or external URLs)

## Data Storage

All data is stored in JSON files in the `/data` directory:
- `admin.json` - Admin credentials
- `siteConfig.json` - Page enable/disable settings
- `blogPosts.json` - Blog post content
- `media.json` - Media file references

**Important**: The `admin.json` file is excluded from version control for security. Make sure to back it up separately.

## Security Notes

- Admin routes are protected by JWT authentication
- Tokens expire after 7 days
- Always use HTTPS in production
- Change the default password immediately after setup
- Keep your JWT_SECRET secure and never commit it to version control
