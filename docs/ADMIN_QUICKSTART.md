# Admin Panel - Quick Start Guide

## 🔐 First Time Setup

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Access the hidden admin login**
   - Navigate to: `http://localhost:3000/admin/login`
   - **Username**: `admin`
   - **Password**: `admin123`
   
   ⚠️ **IMPORTANT**: Change this password immediately for production!

3. **Change the admin password** (Recommended)
   ```bash
   node scripts/generatePassword.js YourNewSecurePassword
   ```
   
   Then update `data/admin.json` with the new hash.

## 📋 What You Can Do

### 1. Page Management (`/admin/pages`)
- Toggle pages on/off (Blog, Meditations, Projects, Updates, Media, Shop)
- Disabled pages won't show in navigation
- Changes reflect immediately on the public site

### 2. Blog Management (`/admin/blog`)
- ✍️ Create new blog posts
- ✏️ Edit existing posts
- 🗑️ Delete posts
- 📝 Mark as published/draft (only published posts show on site)

### 3. Media Management (`/admin/media`)
- 📸 Add images and videos
- Enter filename and URL (can be local `/images/...` or external `https://...`)
- View and delete media items

## 🔒 Security Features

- ✅ JWT-based authentication (7-day expiration)
- ✅ Protected API routes
- ✅ Client-side authentication checks
- ✅ Admin credentials stored securely (excluded from git)

## 📁 Data Location

All data stored in `/data/`:
- `admin.json` - Your credentials
- `siteConfig.json` - Page enable/disable settings
- `blogPosts.json` - All blog posts
- `media.json` - Media references

## 🚀 For Production

1. Set a strong JWT secret in `.env.local`:
   ```
   JWT_SECRET=your-very-long-random-secret-string
   ```

2. Change the default password

3. Use HTTPS (required for secure authentication)

4. Back up your `/data` directory regularly

## 🆘 Troubleshooting

- **Can't login?** Check that `data/admin.json` has a valid password hash
- **Changes not showing?** Refresh the page (hard refresh with Cmd+Shift+R)
- **Lost password?** Run the password generation script again

## 🎯 Access URLs

- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Pages: `/admin/pages`
- Blog: `/admin/blog`
- Media: `/admin/media`

---

**Note**: The admin login is intentionally "hidden" (no links to it on the public site). Bookmark the URL or remember the path!
